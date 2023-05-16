/*var mq = window.matchMedia("screen and (min-width:1200px)");
mq.addListener(function(e){

	if(e.matches){	
	
		$('.main-menu ul li').mouseover(function(){	
			$('.sub-menu').stop().slideDown();
			$('.sub-menu-wrap').stop().slideDown();
		});
		
		$('.main-menu ul li').mouseleave(function(){	
			$('.sub-menu').stop().slideUp();
			$('.sub-menu-wrap').stop().slideUp();
		});
		
		$('.sub-menu').mouseover(function(){
			$(this).parents('.main-menu ul li').css('border-bottom', '2px solid #1c2951');
		});
		
		$('.sub-menu').mouseleave(function(){
			$(this).parents('.main-menu ul li').css('border-bottom', '0');
		});
	
	} else {
		//mobile-menu
		$('.ham').click(function(){
			$('.mobile-menu').stop().slideToggle(500);
			$('.mobile-menu ul li').click(function(){
				$(this).children('.mobile-sub').stop().slideToggle(500);
			});
		});
	}

});*/


$('.main-menu > ul > li').mouseover(function(){	
	$(this).css('border-bottom', '2px solid #1c2951');
	$('.sub-menu').stop().slideDown();
	$('.sub-menu-wrap').stop().slideDown();
});

$('.main-menu > ul > li').mouseleave(function(){	
	$(this).css('border-bottom', '0');
	$('.sub-menu').stop().slideUp();
	$('.sub-menu-wrap').stop().slideUp();
});

$('.sub-menu').mouseover(function(){
	$(this).parents('.main-menu ul li').css('border-bottom', '2px solid #1c2951');
});

$('.sub-menu').mouseleave(function(){
	$(this).parents('.main-menu ul li').css('border-bottom', '0');
});

//mobile-menu
$('.ham').click(function(){
	$('.mobile-menu').stop().slideToggle(500);
	$('div').removeClass('sub-menu-wrap');
	$('.mobile-menu ul li').click(function(){
		$(this).children('.mobile-sub').stop().slideToggle(500);
	});
});







