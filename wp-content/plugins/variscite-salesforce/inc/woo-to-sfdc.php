<?php
class wooToSFDC_api_to_lead{
    private $sfdcIntegration;
	private $alertCount;
    function __construct(){
    	$this->sfdcIntegration = new newsletterSFDCIntegration();
		$this->alertCount = 3;
		
        # WP information
        $this->admin_email = array( get_option('admin_email'), 'lena.g@variscite.com', 'eden.d@variscite.com', 'roi@designercoded.com','allonsacks@gmail.com', 'michal@designercoded.com','avihu.h@variscite.com' );

        $this->postdata = $_POST;

        //Remove and update WooCommerce irrelevant countries according to the wp-admin page
        add_action( 'woocommerce_countries', array( $this, 'variscite_custom_woocommerce_countries' ), 10, 1 );

        //Remove and update WooCommerce states for countries
        add_action( 'woocommerce_states', array( $this, 'variscite_custom_woocommerce_states' ), 10, 1 );

        //Pass new lead info on order creation
        add_action( 'woocommerce_checkout_order_processed', array( $this, 'create_new_lead' ) );

        // Pass 'Payment Approval' on payment approval from PayPal
        // PayPal Express - woocommerce_paypal_express_checkout_valid_ipn_request
        add_action( 'valid-paypal-standard-ipn-request', array( $this, 'update_lead_data' ) );
		
		if( function_exists( 'acf_add_options_page' ) ){
			add_action( 'admin_menu', array( $this, 'SFDC_options_page' ) );
		}
    }

    // Insert new lead into SFDC
    function create_new_lead( $order_id ){
        global $woocommerce;

        $order_full = new WC_Order( $order_id );
		$alert_count = (int)get_post_meta( $order_id, 'alert_count', true );
        $order_data = $order_full->get_data();
        $order_items = $order_full->get_items();
        $order_number = $order_full->get_order_number();


        // Privacy Policy field
        if( isset( $_POST['privacy-policy'] ) ){
            $order_data['privacy_policy'] = date( 'c', time() );
        }

        $sfdc_key_pairs = $this->ordered_sfdc_key_pairs();
        $sfdc_fields_filled = $this->fill_sfdc_lead_array( $order_id, $order_number, $order_items, $sfdc_key_pairs, $order_data );

        try {
            $url = $this->sfdcIntegration->baseUrl."services/data/v56.0/sobjects/Lead/";
            $response = $this->sfdcIntegration->call_sfdc_api( $url, $sfdc_fields_filled, 'POST' );
            if( isset( $response->success ) && $response->success == true ){
                $lead_id = $response->id;
                update_post_meta( $order_id, "_lead_id", $lead_id );
            }else{
				if( $alert_count <= $this->alertCount ){
					wp_mail( $this->admin_email, "Variscite Store: Salesforce Integration Failure", $response. "\n" . json_encode( $sfdc_fields_filled ) );
					update_post_meta( $order_id, 'alert_count', $alert_count+1 );
				}
            }

        }catch( Exception $e ){
            # Catch and send out email to support if there is an error
            $errmessage =  "Exception ".$e->faultstring."<br/><br/>\n";
			if( $alert_count <= $this->alertCount ){
				wp_mail($this->admin_email, "Variscite Store: Salesforce Integration Failure", json_encode($errmessage));
				update_post_meta( $order_id, 'alert_count', $alert_count+1 );
			}
        }
    }

    function update_lead_data( $formdata ){
        if( !empty( $formdata['invoice'] ) && ! empty( $formdata['custom'] ) ){
            if( $formdata['payment_status'] == 'Completed' ){

                $order_data = json_decode(str_replace('\"', '"', $formdata['custom']));
                $order_id = $order_data->order_id;
				$alert_count = (int)get_post_meta( $order_id, 'alert_count', true );
                try{
                    $dataArr = array(
                        'Payment_approval__c'=> 'true'
                    );

                    $lead_id = get_post_meta( $order_id, '_lead_id', true );
                    $url = $this->sfdcIntegration->baseUrl."services/data/v56.0/sobjects/Lead/".$lead_id;
            		$response = $this->sfdcIntegration->call_sfdc_api( $url, $dataArr, 'PATCH' );
                    if( isset( $response->success ) && $response->success != true ){
						if( $alert_count <= $this->alertCount ){
							wp_mail( $this->admin_email, "Variscite Store: Salesforce Integration Failure - After Payment", json_encode( !$response ) );
							update_post_meta( $order_id, 'alert_count', $alert_count+1 );
						}
                    }

                }catch( Exception $e ){
                    # Catch and send out email to support if there is an error
                    $errmessage =  "Exception ".$e->faultstring."<br/><br/>\n";
                    if( $alert_count <= $this->alertCount ){
						wp_mail($this->admin_email, "Variscite Store: Salesforce Integration Failure - After Payment", json_encode($errmessage));
						update_post_meta( $order_id, 'alert_count', $alert_count+1 );
					}
                }
            }
        }

    }

    function fill_sfdc_lead_array($order_id, $order_number, $order_items, $sfdc_key_pairs, $order_data) {

        $sfdc_fields = array();
        $sfdc_fields['leadSource'] = __('Woocommerce', 'variscite-checkout');

        $order = new WC_Order($order_id);

        foreach($sfdc_key_pairs as $sfdc_field_key => $sfdc_key_pair) {

            switch($sfdc_field_key) {

                case 'billing':

                    foreach($sfdc_key_pairs['billing'] as $woo_name => $sfdc_name) {

                        if($woo_name === 'country') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars(WC()->countries->countries[$order_data['billing'][$woo_name]]);
                        } else if($woo_name === 'state') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars(WC()->countries->get_states($order_data['billing']['country'])[$order_data['billing'][$woo_name]]);
                        } else if($woo_name === 'address_1') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars($order_data['billing']['address_1'] . ' ' . $order_data['billing']['address_2']);
                        } else if($woo_name == 'address_2') {
                            continue;
                        } else {

                            if(strpos($woo_name, 'dup_') !== false) {
                                $woo_name = str_replace('dup_', '', $woo_name);
                            }

                            $sfdc_fields[$sfdc_name] = htmlspecialchars($order_data['billing'][$woo_name]);
                        }
                    }

                    break;

                case 'shipping':

                    foreach($sfdc_key_pairs['shipping'] as $woo_name => $sfdc_name) {

                        if($woo_name === 'country') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars(WC()->countries->countries[$order_data['shipping'][$woo_name]]);
                        } else if($woo_name === 'state') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars(WC()->countries->get_states($order_data['shipping']['country'])[$order_data['shipping'][$woo_name]]);
                        } else if($woo_name === 'address_1') {
                            $sfdc_fields[$sfdc_name] = htmlspecialchars($order_data['shipping']['address_1'] . ', ' . $order_data['shipping']['address_2']);
                        } else if($woo_name == 'address_2') {
                            continue;
                        } else {
                            if(strpos($woo_name, 'dup_') !== false) {
                                $woo_name = str_replace('dup_', '', $woo_name);
                            }

                            $sfdc_fields[$sfdc_name] = htmlspecialchars($order_data['shipping'][$woo_name]);
                        }
                    }

                    break;

                case 'terms_conditions':
                    $sfdc_fields[$sfdc_key_pair] = date('c', time());
                    break;

                case 'estimated_project_quantities':
                    $sfdc_fields[$sfdc_key_pair] = htmlspecialchars(get_post_meta($order_id, '_estimated_product_quantities', true));
                    break;

                case 'order_details':
                    $sfdc_fields[$sfdc_key_pair] = htmlspecialchars($this->fill_order_info_field($order_items));
                    break;

                case 'order_id';
                    $sfdc_fields[$sfdc_key_pair] = htmlspecialchars($order_number);
                    break;

                case 'order_page_link':
                    $the_url = get_home_url() . '/checkout/order-received/' . $order_id . '/?key=' . $order_data['order_key'] . '&utm_nooverride=1&count=no';
                    $sfdc_fields[$sfdc_key_pair] = htmlspecialchars($the_url);
                    break;

                case 'payment_approval':
                    $sfdc_fields[$sfdc_key_pair] = 'false';
                    break;

                default:

                    if( $order_data[$sfdc_field_key] && !empty( $order_data[$sfdc_field_key] ) ){
                        $sfdc_fields[$sfdc_key_pair] = htmlspecialchars( $order_data[$sfdc_field_key] );
                    }else{
                        $value = $order->get_meta( "_$sfdc_field_key" );
                        $utm_fields = array(
                            'Campaign_medium__c', 'Campaign_source__c', 'Campaign_term__c', 'Page_url__c',
                            'Paid_Campaign_Name__c', 'curl', 'Campaign_content__c', 'GA_id__c'
                        );

                        if( $value && ! empty( $value ) && $value != 'undefined' ){
                            $sfdc_fields[$sfdc_key_pair] = htmlspecialchars( $value );
                        }else if( in_array( $sfdc_key_pair, $utm_fields ) ){
                            $sfdc_fields[$sfdc_key_pair] = 'not_specified';
                        }
                    }
                    break;
            }
        }
        return $sfdc_fields;
    }

    function fill_order_info_field( $order_items ){
        $order_info = '';
        foreach( $order_items as $item_key => $item_value ){
            $item_data = $item_value->get_data();
            if( $item_data['variation_id'] != 0 ){
                $product_vari = wc_get_product( $item_data['variation_id'] );
                $sku = $product_vari->get_sku();
                $order_info .= $sku . " | ";
                $order_info .= "QTY: " . $item_data['quantity'] . "\n";
            }else{
                $_product = wc_get_product( $item_data['product_id'] );
                $sku = $_product->get_sku();
                $order_info .= $sku . " | ";
                $order_info .= "QTY: " . $item_data['quantity'] . "\n";
            }
            $order_info = substr( $order_info, 0, 255 );
        }

        return $order_info;
    }

    public function ordered_sfdc_key_pairs(){
        $sfdc_key_pairs = get_field('woo_to_sfdc_field_ids', 'option');
        $ordered_key_pairs = array();
		if( $sfdc_key_pairs ){
			foreach( $sfdc_key_pairs as $key_pair ){
				if( strpos( $key_pair['woo_to_sfdc_woo_field_name'], 'billing_') !== false ){
					$billing_key = str_replace('billing_', '', $key_pair['woo_to_sfdc_woo_field_name']);
					$ordered_key_pairs['billing'][$billing_key] = $key_pair['woo_to_sfdc_sfdc_field_id'];
				}else if( strpos( $key_pair['woo_to_sfdc_woo_field_name'], 'shipping_' ) !== false ){
					$billing_key = str_replace('shipping_', '', $key_pair['woo_to_sfdc_woo_field_name']);
					$ordered_key_pairs['shipping'][$billing_key] = $key_pair['woo_to_sfdc_sfdc_field_id'];
				}else{
					$ordered_key_pairs[$key_pair['woo_to_sfdc_woo_field_name']] = $key_pair['woo_to_sfdc_sfdc_field_id'];
				}
			}
		}
        return $ordered_key_pairs;
    }
	
	function SFDC_options_page(){
		acf_add_options_page( array(
			'page_title' => 'Woo to SFDC',
			'menu_title' => 'Woo to SFDC',
			'menu_slug'  => 'woo-to-sfdc-settings',
			'capability' => 'edit_posts',
			'redirect'	 => false,
			'icon_url'	 => 'dashicons-analytics',
			'position'	 => 58
		) );
	}
	
	function variscite_custom_woocommerce_countries($country) {
		$country = array();
		$countries_from_SFDC_list = get_field('woo_to_sfdc_countries', 'option');
		$countries_from_SFDC = explode("\n", $countries_from_SFDC_list);
		foreach($countries_from_SFDC as $the_country) {
			$country_exploded = explode(' : ', $the_country);
			$cc = rtrim($country_exploded[0]);
			$cn = rtrim($country_exploded[1]);
			$country[$cc] = $cn;
		}
		return $country;
	}
}