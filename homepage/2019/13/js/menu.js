/*
//스크롤 메뉴 & top버튼
$(".btn-up").hide();
$('#main-menu').removeClass('scroll-menu');

$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 150) {
	        	$('#main-menu').css('position', 'fixed');
	        	$('#main-menu').addClass('scroll-menu');
	            $('.btn-up').fadeIn();
	        } else {
	        	 $('#main-menu').css('position', 'relative');
	        	 $('#main-menu').removeClass('scroll-menu');
	            $('.btn-up').fadeOut();
	        }
	    });

//btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
});*/

$(document).ready(function(){
	//PC MENU
	$('#main-menu ul li').mouseover(function(){
		$(this).children('a').css('background','rgba(0,0,0,0.2)');
		$(this).children('.sub-menu').stop().slideDown(0);
	});
	$('#main-menu ul li').mouseleave(function(){	
		$(this).children('a').css('background','none');
		$(this).children('.sub-menu').stop().slideUp(0);
	});
	
	//MOBILE-MENU
	$('.open').click(function(){
		$('#main-menu ul li').off();
		$(this).hide();
		$('.close').show();
		/*$('.m-menu').stop().slideToggle(500);*/
		$('.m-menu').animate({'left':'0'});
		$('.m-menu').addClass('menu-shadow');
		$('.m-menu ul li').click(function(){
			$(this).children('.sub-menu').stop().slideToggle(500);
		});
		
	});
	
	$('.close').click(function(){
		$(this).hide();
		$('.open').show();
		$('.m-menu').removeClass('menu-shadow');
		$('.m-menu').animate({'left':'-100%'});
	});
	
/*	if($(this).width() > 1199) {
		$('.ham').css('.display','none !important');
		$('#main-menu').animate({'left':'0'});
	}else{
		$('.ham').css('.display','block');
		$('#main-menu').css('.display','none');
	};*/
	
	//btn-up
	$(".btn-up").hide();
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
	
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 120) {
	        	$('#main-menu').addClass('menu-fixed');
	            $('.btn-up').fadeIn();
	        } else {
	        	 $('#main-menu').removeClass('menu-fixed');
	            $('.btn-up').fadeOut();
	        }
	    });
});

$('.mypage-menu ul li.selected a').click(function(){
	var winW = $(window).width();
	if(winW <= 767){
		$(this).closest('ul').toggleClass('on')
		$('.mypage-menu ul li').not($(this).parent()).toggle();
		$('.mypage-menu ul li.selected').toggleClass('after')
		return false;
	}
});



