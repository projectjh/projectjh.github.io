$(document).ready(function() {
	$('.popup-video').magnificPopup({
        //disableOn: 700,
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: 'embed/',
                    src: '//www.youtube.com/embed/%id%'
                }
            }
        },
        mainClass: 'mfp-fade',
        removalDelay: 0,
        closeOnContentClick: true,
        preloader: false,
        fixedContentPos: false
    });
});