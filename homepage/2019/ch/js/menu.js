//main-menu
$('#menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').show();
});
$('#menu > ul > li').mouseleave(function(){	
	$(this).children('.sub-menu').hide();
});

/*$('.sub-menu').mouseover(function(){
	$(this).parent('#menu > ul > li').addClass('selected');
});
$('.sub-menu').mouseleave(function(){
	$(this).parent('#menu > ul > li').removeClass('selected');
});*/
$('.sub-menu').hover(function(){
	$(this).parent('#menu > ul > li').toggleClass('selected');
});

//$('.sub-menu.active').parent('#menu > ul > li').addClass('selected');


$('.lang-btn').click(function(){
	$('.lang-menu').stop().slideToggle();
});
