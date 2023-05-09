//main-menu
$('.main-menu > ul > li').mouseover(function(){
	$(this).css('background','rgba(0,112,184,0.1)')
	$(this).children('.sub-menu').stop().slideDown();
});
$('.main-menu > ul > li').mouseleave(function(){	
	$(this).css('background','none')
	$(this).children('.sub-menu').stop().slideUp();
});

//lang
$('.lang > button').click(function(){
	$('.lang ul').stop().slideToggle();
});

//mobile-menu
$('.ham').click(function(){
	$('.main-menu ul li').off();
	$('.m-menu').stop().slideToggle();
	
	$('.m-menu ul li').click(function(){
		$(this).children('.m-sub-menu').stop().slideToggle();
	});
	
	$('.m-lang').click(function(){
		$('.m-sub-lang').stop().slideToggle();
	});
});


$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	//$('#menu').css('position', 'fixed');
	        	$('#menu').addClass('scroll-menu');
	        } else {
	        	// $('#menu').css('position', 'relative');
	        	 $('#menu').removeClass('scroll-menu');
	        }
	    });

//btn-up
	$('.top-btn').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
});







