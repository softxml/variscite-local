/* dbrekalo/simpleLightbox : http://dbrekalo.github.io/simpleLightbox/ */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(a){this.init.apply(this,arguments)}var c=0,d=a("html"),e=a(document),f=a(window);return b.defaults={elementClass:"",elementLoadingClass:"slbLoading",htmlClass:"slbActive",closeBtnClass:"",nextBtnClass:"",prevBtnClass:"",loadingTextClass:"",closeBtnCaption:"Close",nextBtnCaption:"Next",prevBtnCaption:"Previous",loadingCaption:"Loading...",bindToItems:!0,closeOnOverlayClick:!0,closeOnEscapeKey:!0,nextOnImageClick:!0,showCaptions:!0,captionAttribute:"title",urlAttribute:"href",startAt:0,loadingTimeout:100,appendTarget:"body",beforeSetContent:null,beforeClose:null,beforeDestroy:null,videoRegex:new RegExp(/youtube.com|vimeo.com/)},a.extend(b.prototype,{init:function(d){this.options=a.extend({},b.defaults,d),this.ens=".slb"+ ++c,this.items=[],this.captions=[];var e=this;this.options.$items?(this.$items=this.options.$items,this.$items.each(function(){var b=a(this);e.items.push(b.attr(e.options.urlAttribute)),e.captions.push(b.attr(e.options.captionAttribute))}),this.options.bindToItems&&this.$items.on("click"+this.ens,function(b){b.preventDefault(),e.showPosition(e.$items.index(a(b.currentTarget)))})):this.options.items&&(this.items=this.options.items),this.options.captions&&(this.captions=this.options.captions)},next:function(){return this.showPosition(this.currentPosition+1)},prev:function(){return this.showPosition(this.currentPosition-1)},normalizePosition:function(a){return a>=this.items.length?a=0:a<0&&(a=this.items.length-1),a},showPosition:function(a){return this.currentPosition=this.normalizePosition(a),this.setupLightboxHtml().prepareItem(this.currentPosition,this.setContent).show()},loading:function(a){var b=this;a?this.loadingTimeout=setTimeout(function(){b.$el.addClass(b.options.elementLoadingClass),b.$content.html('<p class="slbLoadingText '+b.options.loadingTextClass+'">'+b.options.loadingCaption+"</p>"),b.show()},this.options.loadingTimeout):(this.$el&&this.$el.removeClass(this.options.elementLoadingClass),clearTimeout(this.loadingTimeout))},prepareItem:function(b,c){var d=this,e=this.items[b];if(this.loading(!0),this.options.videoRegex.test(e))c.call(d,a('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allowfullscreen src="'+e+'"></iframe></div>'));else{var f=a('<div class="slbImageWrap"><img class="slbImage" src="'+e+'" /></div>');this.$currentImage=f.find(".slbImage"),this.options.showCaptions&&this.captions[b]&&f.append('<div class="slbCaption">'+this.captions[b]+"</div>"),this.loadImage(e,function(){d.setImageDimensions(),c.call(d,f),d.loadImage(d.items[d.normalizePosition(d.currentPosition+1)])})}return this},loadImage:function(a,b){if(!this.options.videoRegex.test(a)){var c=new Image;b&&(c.onload=b),c.src=a}},setupLightboxHtml:function(){var b=this.options;return this.$el||(this.$el=a('<div class="slbElement '+b.elementClass+'"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="'+b.closeBtnCaption+'" class="slbCloseBtn '+b.closeBtnClass+'">×</button></div></div></div></div>'),this.items.length>1&&a('<div class="slbArrows"><button type="button" title="'+b.prevBtnCaption+'" class="prev slbArrow'+b.prevBtnClass+'">'+b.prevBtnCaption+'</button><button type="button" title="'+b.nextBtnCaption+'" class="next slbArrow'+b.nextBtnClass+'">'+b.nextBtnCaption+"</button></div>").appendTo(this.$el.find(".slbContentOuter")),this.$content=this.$el.find(".slbContent")),this.$content.empty(),this},show:function(){return this.modalInDom||(this.$el.appendTo(a(this.options.appendTarget)),d.addClass(this.options.htmlClass),this.setupLightboxEvents(),this.modalInDom=!0),this},setContent:function(b){var c=a(b);return this.loading(!1),this.setupLightboxHtml(),this.options.beforeSetContent&&this.options.beforeSetContent(c,this),this.$content.html(c),this},setImageDimensions:function(){this.$currentImage&&this.$currentImage.css("max-height",f.height()+"px")},setupLightboxEvents:function(){var b=this;this.lightboxEventsSetuped||(this.$el.on("click"+this.ens,function(c){var d=a(c.target);d.is(".slbCloseBtn")||b.options.closeOnOverlayClick&&d.is(".slbWrap")?b.close():d.is(".slbArrow")?d.hasClass("next")?b.next():b.prev():b.options.nextOnImageClick&&b.items.length>1&&d.is(".slbImage")&&b.next()}),e.on("keyup"+this.ens,function(a){b.options.closeOnEscapeKey&&27===a.keyCode&&b.close(),b.items.length>1&&((39===a.keyCode||68===a.keyCode)&&b.next(),(37===a.keyCode||65===a.keyCode)&&b.prev())}),f.on("resize"+this.ens,function(){b.setImageDimensions()}),this.lightboxEventsSetuped=!0)},close:function(){this.modalInDom&&(this.options.beforeClose&&this.options.beforeClose(this),this.$el&&this.$el.off(this.ens),e.off(this.ens),f.off(this.ens),this.lightboxEventsSetuped=!1,this.$el.detach(),d.removeClass(this.options.htmlClass),this.modalInDom=!1)},destroy:function(){this.close(),this.options.beforeDestroy&&this.options.beforeDestroy(this),this.$items&&this.$items.off(this.ens),this.$el&&this.$el.remove()}}),b.open=function(a){var c=new b(a);return a.content?c.setContent(a.content).show():c.showPosition(c.options.startAt)},a.fn.simpleLightbox=function(c){var d,e=this;return this.each(function(){a.data(this,"simpleLightbox")||(d=d||new b(a.extend({},c,{$items:e})),a.data(this,"simpleLightbox",d))})},a.simpleLightbox=a.SimpleLightbox=b,a});


// REMOVE ITEM FROM JAVASCRIPT ARRAY
Array.prototype.remove = function() { var what, a = arguments, L = a.length, ax; while (L && this.length) { what = a[--L]; while ((ax = this.indexOf(what)) !== -1) { this.splice(ax, 1); } } return this; };


// CHECK IF ITEM IS EMPTY (ALL CASES: STR, OBJ, ARR)
function empty( val ) { if (val === undefined) return true; if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]') return false; if (val == null || val.length === 0)        if (typeof (val) == "object") {  var r = true; for (var f in val) r = false; return r; } return false; }


/*! Project home: http://jedfoster.github.io/Readmore.js */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function e(t,e,i){var o;return function(){var n=this,a=arguments,s=function(){o=null,i||t.apply(n,a)},r=i&&!o;clearTimeout(o),o=setTimeout(s,e),r&&t.apply(n,a)}}function i(t){var e=++h;return String(null==t?"rmjs-":t)+e}function o(t){var e=t.clone().css({height:"auto",width:t.width(),maxHeight:"none",overflow:"hidden"}).insertAfter(t),i=e.outerHeight(),o=parseInt(e.css({maxHeight:""}).css("max-height").replace(/[^-\d\.]/g,""),10),n=t.data("defaultHeight");e.remove();var a=o||t.data("collapsedHeight")||n;t.data({expandedHeight:i,maxHeight:o,collapsedHeight:a}).css({maxHeight:"none"})}function n(t){if(!d[t.selector]){var e=" ";t.embedCSS&&""!==t.blockCSS&&(e+=t.selector+" + [data-readmore-toggle], "+t.selector+"[data-readmore]{"+t.blockCSS+"}"),e+=t.selector+"[data-readmore]{transition: height "+t.speed+"ms;overflow: hidden;}",function(t,e){var i=t.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),t.getElementsByTagName("head")[0].appendChild(i)}(document,e),d[t.selector]=!0}}function a(e,i){this.element=e,this.options=t.extend({},r,i),n(this.options),this._defaults=r,this._name=s,this.init(),window.addEventListener?(window.addEventListener("load",c),window.addEventListener("resize",c)):(window.attachEvent("load",c),window.attachEvent("resize",c))}var s="readmore",r={speed:100,collapsedHeight:200,heightMargin:16,moreLink:'<a href="#">Read More</a>',lessLink:'<a href="#">Close</a>',embedCSS:!0,blockCSS:"display: block; width: 100%;",startOpen:!1,blockProcessed:function(){},beforeToggle:function(){},afterToggle:function(){}},d={},h=0,c=e(function(){t("[data-readmore]").each(function(){var e=t(this),i="true"===e.attr("aria-expanded");o(e),e.css({height:e.data(i?"expandedHeight":"collapsedHeight")})})},100);a.prototype={init:function(){var e=t(this.element);e.data({defaultHeight:this.options.collapsedHeight,heightMargin:this.options.heightMargin}),o(e);var n=e.data("collapsedHeight"),a=e.data("heightMargin");if(e.outerHeight(!0)<=n+a)return this.options.blockProcessed&&"function"==typeof this.options.blockProcessed&&this.options.blockProcessed(e,!1),!0;var s=e.attr("id")||i(),r=this.options.startOpen?this.options.lessLink:this.options.moreLink;e.attr({"data-readmore":"","aria-expanded":this.options.startOpen,id:s}),e.after(t(r).on("click",function(t){return function(i){t.toggle(this,e[0],i)}}(this)).attr({"data-readmore-toggle":s,"aria-controls":s})),this.options.startOpen||e.css({height:n}),this.options.blockProcessed&&"function"==typeof this.options.blockProcessed&&this.options.blockProcessed(e,!0)},toggle:function(e,i,o){o&&o.preventDefault(),e||(e=t('[aria-controls="'+this.element.id+'"]')[0]),i||(i=this.element);var n=t(i),a="",s="",r=!1,d=n.data("collapsedHeight");n.height()<=d?(a=n.data("expandedHeight")+"px",s="lessLink",r=!0):(a=d,s="moreLink"),this.options.beforeToggle&&"function"==typeof this.options.beforeToggle&&this.options.beforeToggle(e,n,!r),n.css({height:a}),n.on("transitionend",function(i){return function(){i.options.afterToggle&&"function"==typeof i.options.afterToggle&&i.options.afterToggle(e,n,r),t(this).attr({"aria-expanded":r}).off("transitionend")}}(this)),t(e).replaceWith(t(this.options[s]).on("click",function(t){return function(e){t.toggle(this,i,e)}}(this)).attr({"data-readmore-toggle":n.attr("id"),"aria-controls":n.attr("id")}))},destroy:function(){t(this.element).each(function(){var e=t(this);e.attr({"data-readmore":null,"aria-expanded":null}).css({maxHeight:"",height:""}).next("[data-readmore-toggle]").remove(),e.removeData()})}},t.fn.readmore=function(e){var i=arguments,o=this.selector;return e=e||{},"object"==typeof e?this.each(function(){if(t.data(this,"plugin_"+s)){var i=t.data(this,"plugin_"+s);i.destroy.apply(i)}e.selector=o,t.data(this,"plugin_"+s,new a(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var o=t.data(this,"plugin_"+s);o instanceof a&&"function"==typeof o[e]&&o[e].apply(o,Array.prototype.slice.call(i,1))}):void 0}});


/*! https://github.com/dbrekalo/simpleLightbox */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(a){this.init.apply(this,arguments)}var c=0,d=a("html"),e=a(document),f=a(window);return b.defaults={elementClass:"",elementLoadingClass:"slbLoading",htmlClass:"slbActive",closeBtnClass:"",nextBtnClass:"",prevBtnClass:"",loadingTextClass:"",closeBtnCaption:"Close",nextBtnCaption:"Next",prevBtnCaption:"Previous",loadingCaption:"Loading...",bindToItems:!0,closeOnOverlayClick:!0,closeOnEscapeKey:!0,nextOnImageClick:!0,showCaptions:!0,captionAttribute:"title",urlAttribute:"href",startAt:0,loadingTimeout:100,appendTarget:"body",beforeSetContent:null,beforeClose:null,beforeDestroy:null,videoRegex:new RegExp(/youtube.com|vimeo.com/)},a.extend(b.prototype,{init:function(d){this.options=a.extend({},b.defaults,d),this.ens=".slb"+ ++c,this.items=[],this.captions=[];var e=this;this.options.$items?(this.$items=this.options.$items,this.$items.each(function(){var b=a(this);e.items.push(b.attr(e.options.urlAttribute)),e.captions.push(b.attr(e.options.captionAttribute))}),this.options.bindToItems&&this.$items.on("click"+this.ens,function(b){b.preventDefault(),e.showPosition(e.$items.index(a(b.currentTarget)))})):this.options.items&&(this.items=this.options.items),this.options.captions&&(this.captions=this.options.captions)},next:function(){return this.showPosition(this.currentPosition+1)},prev:function(){return this.showPosition(this.currentPosition-1)},normalizePosition:function(a){return a>=this.items.length?a=0:a<0&&(a=this.items.length-1),a},showPosition:function(a){return this.currentPosition=this.normalizePosition(a),this.setupLightboxHtml().prepareItem(this.currentPosition,this.setContent).show()},loading:function(a){var b=this;a?this.loadingTimeout=setTimeout(function(){b.$el.addClass(b.options.elementLoadingClass),b.$content.html('<p class="slbLoadingText '+b.options.loadingTextClass+'">'+b.options.loadingCaption+"</p>"),b.show()},this.options.loadingTimeout):(this.$el&&this.$el.removeClass(this.options.elementLoadingClass),clearTimeout(this.loadingTimeout))},prepareItem:function(b,c){var d=this,e=this.items[b];if(this.loading(!0),this.options.videoRegex.test(e))c.call(d,a('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allowfullscreen src="'+e+'"></iframe></div>'));else{var f=a('<div class="slbImageWrap"><img class="slbImage" src="'+e+'" /></div>');this.$currentImage=f.find(".slbImage"),this.options.showCaptions&&this.captions[b]&&f.append('<div class="slbCaption">'+this.captions[b]+"</div>"),this.loadImage(e,function(){d.setImageDimensions(),c.call(d,f),d.loadImage(d.items[d.normalizePosition(d.currentPosition+1)])})}return this},loadImage:function(a,b){if(!this.options.videoRegex.test(a)){var c=new Image;b&&(c.onload=b),c.src=a}},setupLightboxHtml:function(){var b=this.options;return this.$el||(this.$el=a('<div class="slbElement '+b.elementClass+'"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="'+b.closeBtnCaption+'" class="slbCloseBtn '+b.closeBtnClass+'">×</button></div></div></div></div>'),this.items.length>1&&a('<div class="slbArrows"><button type="button" title="'+b.prevBtnCaption+'" class="prev slbArrow'+b.prevBtnClass+'">'+b.prevBtnCaption+'</button><button type="button" title="'+b.nextBtnCaption+'" class="next slbArrow'+b.nextBtnClass+'">'+b.nextBtnCaption+"</button></div>").appendTo(this.$el.find(".slbContentOuter")),this.$content=this.$el.find(".slbContent")),this.$content.empty(),this},show:function(){return this.modalInDom||(this.$el.appendTo(a(this.options.appendTarget)),d.addClass(this.options.htmlClass),this.setupLightboxEvents(),this.modalInDom=!0),this},setContent:function(b){var c=a(b);return this.loading(!1),this.setupLightboxHtml(),this.options.beforeSetContent&&this.options.beforeSetContent(c,this),this.$content.html(c),this},setImageDimensions:function(){this.$currentImage&&this.$currentImage.css("max-height",f.height()+"px")},setupLightboxEvents:function(){var b=this;this.lightboxEventsSetuped||(this.$el.on("click"+this.ens,function(c){var d=a(c.target);d.is(".slbCloseBtn")||b.options.closeOnOverlayClick&&d.is(".slbWrap")?b.close():d.is(".slbArrow")?d.hasClass("next")?b.next():b.prev():b.options.nextOnImageClick&&b.items.length>1&&d.is(".slbImage")&&b.next()}),e.on("keyup"+this.ens,function(a){b.options.closeOnEscapeKey&&27===a.keyCode&&b.close(),b.items.length>1&&((39===a.keyCode||68===a.keyCode)&&b.next(),(37===a.keyCode||65===a.keyCode)&&b.prev())}),f.on("resize"+this.ens,function(){b.setImageDimensions()}),this.lightboxEventsSetuped=!0)},close:function(){this.modalInDom&&(this.options.beforeClose&&this.options.beforeClose(this),this.$el&&this.$el.off(this.ens),e.off(this.ens),f.off(this.ens),this.lightboxEventsSetuped=!1,this.$el.detach(),d.removeClass(this.options.htmlClass),this.modalInDom=!1)},destroy:function(){this.close(),this.options.beforeDestroy&&this.options.beforeDestroy(this),this.$items&&this.$items.off(this.ens),this.$el&&this.$el.remove()}}),b.open=function(a){var c=new b(a);return a.content?c.setContent(a.content).show():c.showPosition(c.options.startAt)},a.fn.simpleLightbox=function(c){var d,e=this;return this.each(function(){a.data(this,"simpleLightbox")||(d=d||new b(a.extend({},c,{$items:e})),a.data(this,"simpleLightbox",d))})},a.simpleLightbox=a.SimpleLightbox=b,a});


// GET BASE URL
function getBaseURL() { var loc = window.location; var baseURL = loc.protocol + "//" + loc.hostname; if (typeof loc.port !== "undefined" && loc.port !== "") baseURL += ":" + loc.port; var pathname = loc.pathname; if (pathname.length > 0 && pathname.substr(0,1) === "/") pathname = pathname.substr(1, pathname.length - 1); var pathParts = pathname.split("/"); if (pathParts.length > 0) { for (var i = 0; i < pathParts.length; i++) { if (pathParts[i] !== "") baseURL += "/" + pathParts[i]; } } return baseURL; }


// LOCAL STORAGE EASY FUNC FOR OBJECTS
Storage.prototype.setObj = function(key, obj) { return this.setItem(key, JSON.stringify(obj)); }
Storage.prototype.getObj = function(key) { return JSON.parse(this.getItem(key)); }



jQuery(function($){


    $('body').tooltip({ selector: '.tip' });
	$('.post-body img').simpleLightbox({ captionAttribute: 'alt', urlAttribute: 'src', });
    $('.videoLightbox').simpleLightbox({ urlAttribute: 'href', });


	$('.scroll').click(function() {
		var scrollto 	= '#' + $(this).data('to'); 
		var distance 	= $(scrollto).offset().top - 220;
		$('html, body').animate({ scrollTop: distance }, 1000);
        return false;
        window.location.hash = $(this).data('to');
    });	

    
    // share hover with other element
    function shareHoverState(initiator, receiver, parent, addclass) {
        $(initiator).hover(function(e) {
            $(this).parents(parent).find(receiver).toggleClass(addclass);
        });
    }

    shareHoverState('.home-recent .img-wrap', '.rm-wrap a', '.item', 'hover');
    shareHoverState('.home-recent .item-title', '.rm-wrap a', '.item', 'hover');
    shareHoverState('.sitBuilderServicesWidget .img-box', '.rm', '.sitBuilderServicesWidget', 'hover');
    shareHoverState('.cat-loop .item-thumb', '.item-rmore a', '.post-item', 'hover');
    shareHoverState('.cat-loop .item-title', '.item-rmore a', '.post-item', 'hover');
    shareHoverState('.helpcenter-blocks-row .fullink', '.text-box a', '.panel-grid-cell', 'hover');
    shareHoverState('.innerprod-box img', '.text-box a', '.innerprod-box', 'hover');


    /*************************************************
    ** TOP MENU AFFIX
    *************************************************/
    $('.top-menu-box').affix();
    $( '.top-menu-box' ).on( 'affix.bs.affix', function(){
        if( !$( window ).scrollTop() ) return false;
    });



    /*********************************************
    ** MOBILE MENU: ADD CLASS TO PARENT
    ** WHEN MOBILE MENU IS OPEN
    *********************************************/
    $('#mobileMenuWrap .navbar-toggle').click(function() {
        if( $('#mobileMenuWrap').hasClass('openMobileMenu') ) { $('#mobileMenuWrap').removeClass('openMobileMenu').addClass('closedMobileMenu'); }
        else { $('#mobileMenuWrap').addClass('openMobileMenu').removeClass('closedMobileMenu'); }
    });


    /*********************************************
    ** FLOATING LABELS FOR CF7
    *********************************************/
	$(".wpcf7 .form-control").focus(function(){
		$(this).parent().parent().addClass('active');
	}).blur(function(){
		var cval = $(this).val()
		if(cval.length < 1) {$(this).parent().parent().removeClass('active');}
    })


    /*********************************************
    ** FLOATING LABELS FOR CF7
    *********************************************/
	$(".sitMailchimpSubscribeWidget .form-control").focus(function(){
		$(this).parent().addClass('active');
	}).blur(function(){
		var cval = $(this).val()
		if(cval.length < 1) {$(this).parent().removeClass('active');}
    })
    

    /*************************************************
    ** VIDEO BUTTON
    *************************************************/
    $('.videoButton').simpleLightbox();


    
    /*********************************************
    ** APPEND "OPEN" STATE TO COLLAPSE BOXES
    *********************************************/
    if( $('.doc-box-collapse').length > 0 ) {
        $('.doc-box-collapse').on('show.bs.collapse', function() {
            $(this).toggleClass('open').removeClass('closed');
        });
        $('.doc-box-collapse').on('hide.bs.collapse', function() {
            $(this).toggleClass('closed').removeClass('open');
        });
    }



    /*************************************************
    ** SIDE STRIP
    *************************************************/
    if( $('#globalSideStripMenu').length > 0 ) {
        $('#globalSideStripMenu, #globalSideStripMenu.slide-in .closeStrip').click(function() {
            $('#globalSideStripMenu .open').fadeIn('fast');
            $('#globalSideStripMenu').toggleClass('slide-in').toggleClass('slide-out');
        });
    }



    /*************************************************
    ** CLEAR COMPARE CHECKBOXES
    *************************************************/
    function clear_compare_checkboxes() {
        $('.addToCompare').each(function() {
            $(this).prop('checked', false);
        });
    }




    /*************************************************
    ** COMPARE URL BUILDER
    *************************************************/
    function compareUrlBuilder(curl) {
        if( typeof curl !== 'undefined' ) {
            curl    = curl.split('?');
            vals    = localStorage.getObj('compare');

            if(vals) { newurl  = curl[0] + '?c=' + vals; } else { newurl  = curl[0]; }

            $('#productsCompare').attr('href', newurl);
        }
    }


    /*********************************************
    ** COMPARE CHECKBOX VALUES TO LOCAL STORAGE
    *********************************************/
    $('.addToCompare').click(function() {

        var compareVals = localStorage.getObj('compare');

        // if first time or empty
        if( empty(compareVals) ) {
            compareVals = [];
            compareVals.push( $(this).val() ); 
            localStorage.setObj('compare', compareVals);
            $('#productsCompare .cnum').text( compareVals.length );
            $('#clearCompare').fadeIn();
            compareUrlBuilder( $('#productsCompare').attr('href') );
        }

        // if already has values in compare key
        else {
            if( $(this).is(':checked') ) {
                compareVals.push( $(this).val() );
                localStorage.setObj('compare', compareVals);
                $('#productsCompare .cnum').text( compareVals.length );
                $('#clearCompare').fadeIn();
                compareUrlBuilder( $('#productsCompare').attr('href') );
            }
            else {
                compareVals.remove( $(this).val() );
                localStorage.setObj('compare', compareVals);

                if( empty(compareVals) ) { $('#productsCompare .cnum').text( '0' ); $('#clearCompare').fadeOut(); clear_compare_checkboxes();  }
                else { $('#productsCompare .cnum').text( compareVals.length ); $('#clearCompare').fadeIn(); }

                compareUrlBuilder( $('#productsCompare').attr('href') );
            }
        }

    });



    /*********************************************
    ** ADD TO COMPARE LINK INSIDE EACH SPEC
    *********************************************/
    $('.specsComapre').click(function() {
        var compareVals = localStorage.getObj('compare');
        var cVal        = $(this).val();

        if( empty(compareVals) ) {
            compareVals = [];
            compareVals.push( $(this).val() ); 
            localStorage.setObj('compare', compareVals);
            compareUrlBuilder( $('#productsCompare').attr('href') );
            window.location.href = $('#productsCompare').attr('href');
        }
        else {
            compareVals.push(cVal);
            localStorage.setObj('compare', compareVals);
            compareUrlBuilder( $('#productsCompare').attr('href') );
            window.location.href = $('#productsCompare').attr('href');
        }
    });



    /*************************************************
    ** SHOW "CLEAR COMPARE" IF VALUE > 0
    *************************************************/
    $('#productsCompare .cnum').change(function() {
        var cval = parseInt( $(this).text() );

        if(cval > 0) { $('#clearCompare').fadeIn(); } else { $('#clearCompare').fadeOut();  }
    });


    /*************************************************
    ** CLEAR COMPARE VALUES FROM LOCALSTORAGE
    *************************************************/
    $('#clearCompare').click(function() {
        localStorage.removeItem('compare');
        $('#productsCompare .cnum').text('0');
        $('#clearCompare').fadeOut();
        clear_compare_checkboxes();
        compareUrlBuilder( $('#productsCompare').attr('href') );
    });


    /*************************************************
    ** REMOVE TABLE COLOMN IN COMPARE PAGE
    *************************************************/
    $('#page-compare-wrap .removeItem').click(function ( event ) {
       
        var compareVals = localStorage.getObj('compare');
        var itemid      = $(this).attr('data-itemid');
        var ndx         = $(this).parents('th').index() + 1;         // Get index of parent TD among its siblings (add one for nth-child)

        // Find all TD elements with the same index
        $('.compare-table td:nth-child(' + ndx + '), .compare-table th:nth-child(' + ndx + ')').remove();

        // save new compare values
        compareVals.remove( itemid );
        localStorage.setObj('compare', compareVals);
        
        // update url with new structure
        curl            = location.href.split("?")[0];
        vals            = localStorage.getObj('compare');
        newurl          = curl + '?c=' + vals;
        
        window.history.pushState('object', document.title, newurl);
        $('.comcount').text(vals.length);

    });



    /*************************************************
    ** REPLACE BUTTON IMAGE IN FILTER SIDEBAR
    *************************************************/
    $('.filterBtnIconHover').hover(function() {
        var oldUrl = $('img', this).attr('src');
        var newUrl = oldUrl.replace('.png', '-active.png');
        $('img', this).attr('src', newUrl);
    }, function() {
        var oldUrl = $('img', this).attr('src');
        var newUrl = oldUrl.replace('-active.png', '.png');
        $('img', this).attr('src', newUrl);
    });


    $('.filterBtnIconHover').change(function() {
        if($(this).hasClass('active')) {
            var oldUrl = $('img', this).attr('src');
            var newUrl = oldUrl.replace('.png', '-active.png');
            $('img', this).attr('src', newUrl);
        }
        else {
            var oldUrl = $('img', this).attr('src');
            var newUrl = oldUrl.replace('-active.png', '.png');
            $('img', this).attr('src', newUrl);
        }
    });



    /*************************************************
    ** SLOW TOOLTIP (GIVE PEOPLE CHANGE TO COPY)
    *************************************************/
    var originalLeave = $.fn.tooltip.Constructor.prototype.leave;
    $.fn.tooltip.Constructor.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
        var container, timeout;
    
        originalLeave.call(this, obj);
    
        if (obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.tooltip')
        timeout = self.timeout;
        container.one('mouseenter', function() {
            //We entered the actual popover – call off the dogs
            clearTimeout(timeout);
            //Let's monitor popover content instead
            container.one('mouseleave', function() {
                $('.tooltip')
            $.fn.tooltip.Constructor.prototype.leave.call(self, self);
            });
        })
        }
    };
   
   
    $('.slow-tip').tooltip({
        trigger: 'click hover',
        placement: 'auto',
        delay: {
            show: 50,
            hide: 1000
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents(".tooltip").length === 0) {
            $('.tooltip').tooltip('hide');
        }
    });


    /*************************************************
    ** PUSH EVENT ON SUCCESFULL SUBSCRIBE
    *************************************************/
    $('#mc-embedded-subscribe').click(function() {
        setTimeout( function(){ 
            if( $('#mce-success-response').text().length > 10 ) {
                dataLayer.push({'event': 'newsletterSignupBlog'});
            }
        }, 2000 );
    })




    /********************************************************
    **  DOWNLOAD TABLE INSIDE COMAPRE PAGE
    ********************************************************/
    if( $('#dlXls').length > 0 ) {
        

        var tableInstance = $("#compare-table").tableExport({
                headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
                formats: ['xlsx'],                          // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
                filename: 'Variscite-Products-Compare',     // (id, String), filename for the downloaded file, (default: 'id')
                bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
                exportButtons: false,                       // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
                ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
                ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
                trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
        });

        console.log(tableInstance.getExportData());

        var exportData  = tableInstance.getExportData()['compare-table']['xlsx'];
        var dlXls       = document.getElementById('dlXls');
        
        dlXls.addEventListener('click', function (e) {
            //                   // data          // mime              // name              // extension
            tableInstance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
        });
    }


});


function isHidden(el) { var style = window.getComputedStyle(el); return (style.display === 'none') }

jQuery(document).ready(function($) {


    
    /*************************************************
    ** COMPARE URL BUILDER
    *************************************************/
    function compareUrlBuilder(curl) {
        if( typeof curl !== 'undefined' ) {
            curl    = curl.split('?');
            vals    = localStorage.getObj('compare');

            if(vals) { newurl  = curl[0] + '?c=' + vals; } else { newurl  = curl[0]; }

            $('#productsCompare').attr('href', newurl);
        }
    }
    

    $('.match-height > div').each(function() { var height = $(this).parent().height(); $(this).css('height', height); });   // easy compare of matching classes
    
    // for seo (push event)

    // USAGE: pushEvent('element-id', 'event-name');
    window.pushEvent = function(eleID, eventName){ 
        $('#' + eleID).click(function(){ 
            dataLayer.push({'event': eventName}); 
        });
    }


    /*************************************************
    ** FACEBOOK SHARE POPUP LINK
    *************************************************/
    $('.share-btn').click(function(){
        window.open($(this).attr('href'), "pop", "width=600, height=400, scrollbars=no");
        return false;
    });

    /*********************************************
    ** APPEND SEARCH ENGINE & MISC TO TOPMENU
    *********************************************/
    $('<li class="top-search"><input type="text" id="search-value" placeholder="Enter Search Term..."> <div class="closer-search"><i class="fa fa-times"></i></div></li>').insertBefore('li.search');

    $('.mega-search').live('click', function(e) {
        e.preventDefault();
        var search_query = $('#search-value').val(); 

        if(!$('#search-value').is(":visible")) { $('#search-value').addClass('open'); } 
        // else {$('#search-value').removeClass('open')}


        if( search_query.length > 1 ) {
            window.location.href = window.location.origin + '?s=' + search_query;
            return false;
        }
        else {
            $(this).toggleClass('active');
            $('.top-search').toggleClass('active');
            $('.top-search #search-value').focus();
        }
    });


    // listen to 'enter' if has value inside search
    $('#search-value').keypress(function(event){
        var searchval = $('#search-value').val();
        
        if( event.keyCode == 13 && searchval.length > 0 ){
            $('.mega-search').trigger('click');
        }
    });

    // close search field (keep value) on click
    $('.closer-search').live('click', function() {
        $('.top-search, .mega-search').removeClass('active');
        $('#search-value').val(' ').removeClass('open');
    });
    


    /*************************************************
    ** RESPONSIVE YOUTUBE VIDEOS
    *************************************************/
    if( $('body').hasClass('mobile') ) {
        $('iframe').each(function() {
            var curl        = $(this).attr('src');

            if(curl.indexOf("youtube.com") >= 0) {
                var vidwidth    = $(this).width();
                var vidheight   = Math.round( ((vidwidth / 16) * 9) + 35 );

                $(this).css({'height' : vidheight, 'width' : '100%'});
            }
        });
    }






    /*************************************************
    ** CHECK IF USER HAS COMPARE VALUES FROM OTHER SESSION
    *************************************************/
    var compareVals = localStorage.getObj('compare');
   
    if( !empty(compareVals) ) {

        var i;
        var a = ["a", "b", "c"];
        for (i = 0; i < compareVals.length; ++i) {
            $('#compare-' + compareVals[i]).prop('checked', true);
        }

        $('#productsCompare .cnum').text(compareVals.length);
        $('#clearCompare').fadeIn();
        compareUrlBuilder( $('#productsCompare').attr('href') );
    }

    (function($) {
        window.fnames = new Array(); 
        window.ftypes = new Array();
        fnames[0]="EMAIL";
        ftypes[0]="email";
        fnames[1]="FNAME";
        ftypes[1]="text";
        fnames[2]="LNAME";
        ftypes[2]="text";
    }(jQuery));
   //  var $mcj = jQuery.noConflict(true);





    /*********************************************
    ** SET CATEGORY LAYOUT ON CLICK INTO LOCAL STORAGE
    ** for it to work in 2nd page
    ** also need to set it func on load
    // var compareVals = localStorage.getObj('compare');
    *********************************************/
    $('.product-layout').click(function() {
        var grid = $(this).attr('id');
        localStorage.setObj('product-layout', grid);
    });



    /*********************************************
    ** GET CATEGORY LAYOUT FROM LOCAL STORAGE
    ** IF EXISTS APPLY IT TO CURRENT CATEGORY
    *********************************************/
    catGridLayout = localStorage.getObj('product-layout');
    
    if( catGridLayout ) {
        if (!$('body').hasClass('mobile')) {
            $('.filter-products-wrap').attr('data-viewstate', catGridLayout);               // add display settings to wrapper
            $('.btn.product-layout').each(function() { $(this).removeClass('active'); });   // remove .active from toolbar button
            $('.toolbar #'+catGridLayout).addClass('active');                               // add .active to correct button
        }
    }

    /************************************************
     ** Remove empty box spaces on LP's tablet view **
     ************************************************/

    if ($(window).width() < 1024) {

        if($('body').hasClass('landing-page') || $('body').hasClass('lp-2022')){
            if($('.product-card-section').length > 2){
                $('.product-card-section:last .product-card__box:first-of-type').appendTo('.product-card-section:eq(1)>div');
            } else {
                console.log($('.product-card-section').length);
                $('.product-card-section:last .product-card__box:first-of-type').appendTo('.product-card-section:first>div');
            }
        }

    }

    /************************************************
     ** Shorten the filter on website (Ofek) **
     ************************************************/
    $('.moreless-button').click(function() {
        $('.checkboxes-box').toggleClass("open");
        if ($(this).text() == "View more") {
            $(this).text("View less");
        } else {
            $(this).text("View more");
        }
    });


});