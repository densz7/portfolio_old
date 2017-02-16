$(document).ready(function() {
    $(".menu__link[href='./']").addClass('menu__link--active');

    $('.menu__toggle').on('click', function() {
        $('.menu__items').slideToggle();
    });


    $(window).on('resize', function() {
        if(window.matchMedia('(min-width: 768px)').matches)
        {
            $('.menu__items').attr('style', 'display: block');
        } else {
            $('.menu__items').attr('style', 'display: none');
        }
    });
});

