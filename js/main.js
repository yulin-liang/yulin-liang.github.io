$(function() {
    if ($(window).scrollTop() > 50) {
        $('#back-to-top').show();
    }
    else {
        $('#back-to-top').hide();
    }
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#back-to-top').show();
        }
        else {
            $('#back-to-top').hide();
        }

        $('#navigation-bar').toggleClass('scrolled', $(window).scrollTop() > 100)
    });
});

$('#back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 200);
    console.log('hi');
});
