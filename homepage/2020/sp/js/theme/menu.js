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
$('.open').click(function(){
	$('.menu ul li').off();
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



//sub page
$(document).ready(function(){
	$('.sub-top-bg').addClass('bg-loaded');
	
	//scroll
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 900) {
	        	$('#header').addClass('minimize');
	        	$('#sub-nav').addClass('minimize');
	        	 //$('.btn-up').fadeIn();
	        	$('.btn-up').css('opacity','1');
	        } else {
	        	$('#header').removeClass('minimize');
	        	 $('#sub-nav').removeClass('minimize');
	        	 //$('.btn-up').fadeOut();
	        	 $('.btn-up').css('opacity','0');
	        }
	    });

	 //btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});	
	
	//nav-menu
	$('.nav-menu').click(function(){
		$(this).children('ul').stop().slideToggle();
		$(this).toggleClass('nav-active');
		//return false;
	});

});




