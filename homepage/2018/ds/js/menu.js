$('.main_menu ul li').click(function(){
	$(this).children('.sub_menu').stop().slideToggle(500);
});

$('.ham img').click(function(){
	$('.left_menu_wrap').css('display','block');
});

$('.close').click(function(){
	$('.left_menu_wrap').css('display','none');
});