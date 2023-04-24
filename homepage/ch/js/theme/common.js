$('.menu > .gnb > li').mouseover(function(){
	$('#header').addClass('on');
	//$('.sub-menu').css('display','block');
});
$('#header').mouseleave(function(){
	//$('.sub-menu').css('display','none');
	$(this).removeClass('on');
});

$('.sub-menu').mouseover(function(){
	$(this).parents('.gnb > li').addClass('on');
});
$('.sub-menu').mouseleave(function(){
	$(this).parents('.gnb > li').removeClass('on');
});


//mobile-menu
$('.ham').click(function(){
	$('.menu ul li').off();
	$(this).toggleClass('active');
	$('.m-menu').toggleClass('on');
	$('.blind').toggle();
	/*$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});*/
	return false;
});

$('.blind').click(function(){
	$('.ham').toggleClass('active');
	$('.m-menu').toggleClass('on');
	$('.blind').css('display','none');
});


//scroll-menu
$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#header').addClass('fixed');
	        	$('.btn-up').css('opacity','1');
	        	$('.scrollMotion').addClass('active');
	        } else {
	        	 $('#header').removeClass('fixed');
	        	 $('.btn-up').css('opacity','0');
	        	 $('.scrollMotion').removeClass('active');
	        }
	        
	    });
	 
	//sub-top
	$('.sub-top-bg').addClass('active')	 

	//btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
});


$(document).ready(function() {
	$('#mixedSlider').multislider({
		duration: 750,
		interval: 4000
	});

	//aos
	AOS.init({
		duration: 1200
		//once: false
	});
	
});

