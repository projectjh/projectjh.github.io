

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


//sub-menu
$('.sub-nav-wrap ul li').click(function(){
	$(this).children('.nav-submenu').stop().slideToggle(500);
});
