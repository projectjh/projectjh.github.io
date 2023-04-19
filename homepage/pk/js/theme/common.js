/*//menu
$('.menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').show();
	$(this).children('.sub-menu').css('opacity','1');
});
$('.menu > ul > li').mouseleave(function(){
	$(this).children('.sub-menu').hide();
	$(this).children('.sub-menu').css('opacity','0');
});*/

//menu
$('.menu > ul > li').mouseover(function(){
	$(this).addClass('active');
	$(this).children('.sub-menu').show();
	$(this).children('.sub-menu').addClass('active');
});
$('.menu > ul > li').mouseleave(function(){
	$(this).removeClass('active');
	$(this).children('.sub-menu').hide();
	$(this).children('.sub-menu').removeClass('active');
});

/*$('.menu > ul > li').hover(function(){
	$(this).toggleClass('active');
	$(this).children('a').toggleClass('active');
	$(this).children('.sub-menu').toggleClass('active');
});*/

//lang
$('.btn-lang').click(function(){
	$('.lang-menu').stop().slideToggle();
	$('.btn-lang').toggleClass('on');
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
$('.m-sub-nav > button').not('button.no-list').click(function(){
	$('.m-sub-nav ul li').removeClass('selected');
	$(this).toggleClass('on');
	$('.m-sub-nav ul').stop().slideToggle();
});


//scroll-menu
$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 200) {
	        	$('#header').addClass('fixed');
	        	$('.scroll').hide();
	        	$('.btn-up').css('opacity','1');
	        	$('.scrollMotion').addClass('active');
	        } else {
	        	 $('#header').removeClass('fixed');
	        	 $('.scroll').show();
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


