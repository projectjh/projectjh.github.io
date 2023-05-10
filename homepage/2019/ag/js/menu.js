//main-menu
$('.main-menu > ul > li').mouseover(function(){
	//$(this).css('border-bottom','2px solid #8cc640')
	$(this).children('.sub-menu').stop().slideDown();
});
$('.main-menu > ul > li').mouseleave(function(){	
	//$(this).css('border-bottom','0')
	$(this).children('.sub-menu').stop().slideUp();
});

//lang
$('.lang > button').click(function(){
	$('.lang ul').stop().slideToggle();
});

//mobile-menu
$('.open').click(function(){
	$('.main-menu ul li').off();
	$(this).hide();
	$('.close').show();
	$('.m-menu').animate({'right':'0'});
	$('.m-menu').css('display','block');
	$('.blind').show();
	//$('.scroll-menu').off();
	$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});
	return false;
});

$('.blind').click(function(){
	$('.close').hide();
	$('.open').show();
	$('.m-menu').animate({'right':'-100%'});
	$('.blind').css('display','none');
});

$('.close').click(function(){
	$(this).hide();
	$('.open').show();
	$('.m-menu').animate({'right':'-100%'});
	$('.blind').css('display','none');
});

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

$('#sub-nav ul li.selected a').click(function(){
	var winW = $(window).width();
	if(winW <= 767){
		$(this).closest('ul').toggleClass('on')
		$('#sub-nav ul li').not($(this).parent()).toggle();
		$('#sub-nav ul li.selected').toggleClass('after')
		return false;
	}
});






