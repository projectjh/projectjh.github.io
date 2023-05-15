$('.main-menu > ul > li').mouseover(function(){
	$(this).css('background','rgba(34,42,122,0.1)')
	$(this).children('.sub-menu').stop().slideDown();
});
$('.main-menu > ul > li').mouseleave(function(){	
	$(this).css('background','none')
	$(this).children('.sub-menu').stop().slideUp();
});

//스크롤 메뉴 & top버튼
$(".btn-up").hide();
$('#menu').removeClass('scroll-menu');

$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#menu').css('position', 'fixed');
	        	$('#menu').addClass('scroll-menu');
	            $('.btn-up').fadeIn();
	        } else {
	        	 $('#menu').css('position', 'relative');
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


//mobile-menu
$('.ham').click(function(){
	$('.mobile-menu').stop().slideToggle(500);
	$('div').removeClass('sub-menu-wrap');
	$('.mobile-menu ul li').click(function(){
		$(this).children('.mobile-sub').stop().slideToggle(500);
	});
});







