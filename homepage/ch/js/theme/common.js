//menu
/*$('.menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').show();
	$(this).children('.sub-menu').css('opacity','1');
});
$('.menu > ul > li').mouseleave(function(){
	$(this).children('.sub-menu').hide();
	$(this).children('.sub-menu').css('opacity','0');
});*/
$('.menu > .gnb > li').mouseover(function(){
	$('#header').addClass('on');
});
$('#header').mouseleave(function(){
	$(this).removeClass('on');
});

$('.sub-menu').mouseover(function(){
	$(this).parents('.gnb > li').addClass('on');
});
$('.sub-menu').mouseleave(function(){
	$(this).parents('.gnb > li').removeClass('on');
});



/*
$('#header a').mouseover(function(){
	$('#header').css('background','#fff');
});
$('#header a').mouseleave(function(){
	$('#header').css('background','rgba(255,255,255,0.95)');
});*/


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


/*//sub-navi
$('.m-sub-nav > button').click(function(){
	$('.m-sub-nav ul li').removeClass('selected');
	$(this).toggleClass('on');
	$('.m-sub-nav ul').stop().slideToggle();
});
*/

//scroll-menu
$(function(){
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#header').addClass('scroll-menu');
	        	$('.btn-up').css('opacity','1');
	        } else {
	        	 $('#header').removeClass('scroll-menu');
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




