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


//mobile-menu
$('.ham').click(function(){
	$('.menu ul li').off();
	$(this).toggleClass('active');
	$('.m-menu').toggleClass('on');
	$('.lang').toggleClass('on');
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


//nav-menu
$('.nav-menu').click(function(){
	$(this).children('ul').stop().slideToggle();
	$(this).toggleClass('nav-active');
	//return false;
});



//scroll-menu
$(function(){
	 $(window).scroll(function () {		 
		 	if ($(this).scrollTop() > 650){
	        	$('.scrollMotion').addClass('active');
		 	} else if ($(this).scrollTop() > 200) {
	        	$('#header').addClass('fixed');
	        	//$('.scroll').hide();
	        	$('.btn-up').css('opacity','1');
	        	$('.gr-intro').addClass('active');
	        } else {
	        	 $('#header').removeClass('fixed');
	        	 //$('.scroll').show();
	        	 $('.btn-up').css('opacity','0');
	        	 $('.gr-intro').removeClass('active')
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

/*$('.skip a').on('focus', function(){
    $(this).stop().animate({"top":0, "opacity":1});
});
$('.skip a').on('click', function(){
    $(this).stop().animate({"top":"-30px", "opacity":0});
});
$('.skip a').on('focusout', function(){
    $(this).stop().animate({"top":"-30px", "opacity":0});
});*/

//aos
AOS.init({
	duration: 1200,
	//once: true
});

//스크롤값 확인
//$(window).scroll(function () { var scrollValue = $(document).scrollTop(); console.log(scrollValue); });

