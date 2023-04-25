
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



$(function(){
	
	//menu
	$('.menu > ul > li').hover(function(){
		$('#header').addClass("on");
		$(this).addClass("active");
	}, function() {
		$('#header').removeClass("on");
		$(this).removeClass("active");
	});
	
	//scroll-menu
	 $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	        	$('#header').addClass('scroll-menu');
	        	$('.btn-up').fadeIn();
	        	$('.gr-intro').addClass('active');
		        $('.scrollMotion').addClass('active');
	        } else {
	        	 $('#header').removeClass('scroll-menu');
	        	 $('.btn-up').fadeOut();
	        	 $('.gr-intro').removeClass('active');
	        	 $('.scrollMotion').removeClass('active');
	        }
	    });
	 
	 
	 
	 $(window).scroll(function () {
		 if ($(this).scrollTop() > 100) {
			 $('.history').addClass('active');
			 $('#ht-1 .title .intro').addClass('active');	        	 	        	
		 } else {
			 $('.history').removeClass('active');
			 $('#ht-1 .title .intro').removeClass('active');
        }
	 });
	 
	 $(window).scroll(function () {
		 if ($(this).scrollTop() > 1000) {
			 $('#ht-2 .title .intro').addClass('active');	        	 	        	
		 } else {
			 $('#ht-2 .title .intro').removeClass('active');
        }
	 });

	 //btn-up
	$('.btn-up').click(function(){
	    $('html, body').animate({scrollTop : 0},600);
	    return false;
	});
	
	//sub-top
	$('.sub-top-bg').addClass('bg-loaded')
	
	//nav-menu
	$('.nav-menu').click(function(){
		$(this).children('ul').stop().slideToggle();
		$(this).toggleClass('nav-active');
		//return false;
	});
	
});



//스크롤값 확인
//$(window).scroll(function () { var scrollValue = $(document).scrollTop(); console.log(scrollValue); });



