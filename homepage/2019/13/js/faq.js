$('.faq-box .faq-q').on('click', function(e) {
    e.preventDefault();

    // Add the correct active class
    if($(this).closest('.faq-box').hasClass('active')) {
        // Remove active classes
        $('.faq-box').removeClass('active');
    } else {
        // Remove active classes
        $('.faq-box').removeClass('active');

        // Add the active class
        $(this).closest('.faq-box').addClass('active');
    }

    // Show the content
    var $content = $(this).next();
    $content.slideToggle(200);
    $('.faq-box .faq-a').not($content).slideUp('fast');
});