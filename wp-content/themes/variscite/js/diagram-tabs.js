jQuery(function($){
    var caption = $('.vrs-diagram-tab-caption');

    if($('.vrs-diagrams-wrap').length > 0) {
        if (window.matchMedia('(max-width: 767px)').matches) {
            caption.first().addClass('current');
            $('.vrs-diagram-tab-caption.current').next('.vrs-diagram-image-wrap-mobile').children('.vrs-diagram-tab-image').addClass('current');

            caption.click(function(){
                $(this).toggleClass('current');
                if($(this).hasClass('current')) {
                    console.log($(this));
                    $(this).next('.vrs-diagram-image-wrap-mobile').children('.vrs-diagram-tab-image').addClass('current');
                } else {
                    $(this).next('.vrs-diagram-image-wrap-mobile').children('.vrs-diagram-tab-image').removeClass('current');
                }
            });
        } else {
            caption.first().addClass('current');
            $('.vrs-diagram-image-wrap-desktop .vrs-diagram-tab-image:first-child').addClass('current');

            caption.click(function(){
                var tab_id = $(this).attr('data-tab');

                caption.removeClass('current');
                $('.vrs-diagram-tab-image').removeClass('current');

                $(this).addClass('current');
                $("#"+tab_id).addClass('current');

            });

        }
    }
});
