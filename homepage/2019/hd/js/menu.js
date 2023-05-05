//main-menu
$('#main-menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').stop().slideDown();
});
$('#main-menu > ul > li').mouseleave(function(){	
	$(this).children('.sub-menu').stop().slideUp();
});
/*
//mobile-menu
$('.ham').click(function(){
	$('#main-menu ul li').off();
	$('.m-menu-wrap').animate({'right':'0'});
	$('.m-menu-wrap').addClass('menu-shadow');
	$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});
});*/



 //mobile-menu
$('.ham').click(function(){
	$('#main-menu ul li').off();
	$('.m-menu-wrap').animate({'right':'0'});
	//$('.m-menu-wrap').addClass('menu-shadow');
	$('.blind').show();
	$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});
	return false;
});

$('.blind').click(function(){
	$('.m-menu-wrap').animate({'right':'-100%'});
	$('.blind').css('display','none');
});
//menu 외에 영역 클릭
/*$(document).click(function(e){ 
	if(e.target.className == "m-menu-wrap"){return false} 
	//$('.m-menu-wrap').removeClass('menu-shadow');
	$('.m-menu-wrap').animate({'right':'-100%'});
});*/
/*$(document).click(function(e){ 
	if(!$(e.target).is('.m-menu-wrap')){
	$('.m-menu-wrap').removeClass('menu-shadow');
	$('.m-menu-wrap').animate({'right':'-100%'});
	} 
});*/



//scroll-menu
$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#menu').addClass('scroll-menu');
	        	 $('.btn-up').fadeIn();
	        } else {
	        	 $('#menu').removeClass('scroll-menu');
	        	 $('.btn-up').fadeOut();
	        }
	    });

//btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
});
