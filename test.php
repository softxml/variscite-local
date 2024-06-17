<?php
require_once( 'wp-config.php' );

$settings = get_option( 'variscite_sfdc_settings' );
$sfdc_uname = ( isset( $settings['variscite_sfdc_username'] ) ) ? $settings['variscite_sfdc_username'] : '';
$sfdc_pass = ( isset( $settings['variscite_sfdc_password'] ) ) ? $settings['variscite_sfdc_password'] : '';
$sfdc_client_id = ( isset( $settings['variscite_sfdc_client_id'] ) ) ? $settings['variscite_sfdc_client_id'] : '';
$sfdc_client_secret = ( isset( $settings['variscite_sfdc_client_secret'] ) ) ? $settings['variscite_sfdc_client_secret'] : '';
$sfdc_sfdc_url = ( isset( $settings['variscite_sfdc_url'] ) ) ? $settings['variscite_sfdc_url'] : '';

$sfdc_pass = vari_decrypt_data( $sfdc_pass );
$sfdc_client_id = vari_decrypt_data( $sfdc_client_id );
$sfdc_client_secret = vari_decrypt_data( $sfdc_client_secret );

echo '<pre>';

/* echo 'sfdc_uname - '.$sfdc_uname;
echo '<br />';
echo 'sfdc_pass - '.$sfdc_pass;
echo '<br />';
echo 'sfdc_client_id - '.$sfdc_client_id;
echo '<br />';
echo 'sfdc_client_secret - '.$sfdc_client_secret;
echo '<br />'; */
$url = $sfdc_sfdc_url."services/oauth2/token";
$data = array(
	'grant_type'	=>	'password',
	'client_id'		=>	$sfdc_client_id,
	'client_secret'	=>	$sfdc_client_secret,
	'username'		=>	$sfdc_uname,
	'password'		=>	$sfdc_pass
);
$response = wp_remote_post( $url, array(
	'body'    => $data,
) );

print_r( wp_remote_retrieve_body( $response ) );