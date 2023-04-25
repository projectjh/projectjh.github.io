//menu
$('.menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').show();
	$(this).children('.sub-menu').css('opacity','1');
});
$('.menu > ul > li').mouseleave(function(){
	$(this).children('.sub-menu').hide();
	$(this).children('.sub-menu').css('opacity','0');
});


//mobile-menu
$('.ham').click(function(){
	$('.menu ul li').off();
	$(this).toggleClass('active');
	$('.m-menu').toggleClass('on');
	$('.blind').toggle();
	$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});
	return false;
});

$('.blind').click(function(){
	$('.ham').toggleClass('active');
	$('.m-menu').toggleClass('on');
	$('.blind').css('display','none');
});


//sub-navi
$('.m-sub-nav > button').click(function(){
	$('.m-sub-nav ul li').removeClass('selected');
	$(this).toggleClass('on');
	$('.m-sub-nav ul').stop().slideToggle();
});


//scroll-menu
$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#header').addClass('scroll-menu');
	        	$('.btn-up').css('opacity','1');
	        	$('.scrollMotion').addClass('active');
	        } else {
	        	$('#header').removeClass('scroll-menu');
	        	$('.btn-up').css('opacity','0');
	        	$('.scrollMotion').removeClass('active');
	        }
	    });

//sub-top
	$('.sub-top-bg').addClass('bg-loaded')	 
	 
//btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
	
	//wow
	new WOW().init();
	
	var winW = $(window).width();
	if(winW <= 767){		
		$('.b-contents ul li').removeClass('fadeInRight');
		$('.b-contents ul li').addClass('fadeInUp');
		return false;
	}
});




