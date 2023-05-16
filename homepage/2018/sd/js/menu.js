$('.main-menu > ul > li').mouseover(function(){
	$(this).css('background','#008dd6;')
	$(this).children('.sub-menu').css('display', 'block');
});
$('.main-menu > ul > li').mouseleave(function(){	
	$(this).css('background','none')
	$(this).children('.sub-menu').css('display', 'none');
});


//mobile-menu
$('.ham').click(function(){
	$('.mobile-menu').stop().slideToggle(500);
	$('div').removeClass('sub-menu-wrap');
	$('.mobile-menu ul li').click(function(){
		$(this).children('.mobile-sub').stop().slideToggle(500);
	});
});







