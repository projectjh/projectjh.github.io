	$('.main-menu ul li').mouseover(function(){
		$(this).children('.sub-menu').stop().slideDown();
	});
	
	$('.main-menu ul li').mouseleave(function(){
		$(this).children('.sub-menu').stop().slideUp();
	});
		
	
	//mobile-menu
	$('.ham').click(function(){
		$('.mobile-menu').stop().slideToggle(500);
		$('.main-menu ul li').click(function(){
			$(this).children('.sub-menu').stop().slideToggle(500);
		});
	});
	
	
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 200) {
	        $('#menu').css('position', 'fixed');
	        $('#menu').css('opacity', '0.9');
	    } else {
	    	 $('#menu').css('position', 'relative');        
	    }
	});
