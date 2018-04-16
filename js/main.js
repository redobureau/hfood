(function(){
    var $body = $('body');
    var $html = $('html');

    function init() {
        toggleMenu();
        initSlider();
        scrollArrow();
    }

    function toggleMenu(){
        var $toggle = $('.js-header-toggle'),
            $nav = $('.js-header-nav');

        $toggle.on('click', function(){
            if($nav.hasClass('active')){
                $nav.removeClass('active').parent().removeClass('active');
                removeLockClass();
            } else {
                $nav.addClass('active').parent().addClass('active');
                addLockClass();
            }
        });
    }

    function addLockClass(){
        $body.addClass('g-lockscroll');
        $html.addClass('g-lockscroll');
    }

    function removeLockClass(){
        $body.removeClass('g-lockscroll');
        $html.removeClass('g-lockscroll');
    }

    function initSlider(){
        var $slider = $('.js-slider');

        if($slider.length > 0){
            $slider.slick({
                infinite: false,
                speed: 700,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            });

            $slider.on('setPosition', function () {
                var $slide = $(this).find('.slick-slide');
                var slickTrackHeight = $(this).find('.about-slider__inner').height();

                $slide.height('auto').css('height', slickTrackHeight + 'px');
            });
        }
    }

    function scrollArrow(){
        var $arrow = $('.js-arrow-down'),
            $block = $('.js-arrow-down-block');

        $arrow.on('click', function(e){
            $('html, body').stop().animate({
                scrollTop: $block.offset().top
            }, 1000);
            e.preventDefault();
        });
    }

    init();

})();