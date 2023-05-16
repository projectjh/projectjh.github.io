$('.main-menu ul li').mouseover(function(){
	$('#sub-menu').stop().slideDown();
});

$('.main-menu ul li').mouseleave(function(){
	$('#sub-menu').stop().slideUp();
});

$('#sub-menu').mouseover(function(){
	$('#sub-menu').stop().slideDown();
});
$('#sub-menu').mouseleave(function(){
	$('#sub-menu').stop().slideUp();
});

$('.sub-menu1').mouseover(function(){
	$('.menu1').css('border-bottom','3px solid #e91c23');
});
$('.sub-menu1').mouseleave(function(){
	$('.menu1').css('border-bottom','0');
});
$('.sub-menu2').mouseover(function(){
	$('.menu2').css('border-bottom','3px solid #e91c23');
});
$('.sub-menu2').mouseleave(function(){
	$('.menu2').css('border-bottom','0');
});
$('.sub-menu3').mouseover(function(){
	$('.menu3').css('border-bottom','3px solid #e91c23');
});
$('.sub-menu3').mouseleave(function(){
	$('.menu3').css('border-bottom','0');
});
$('.sub-menu4').mouseover(function(){
	$('.menu4').css('border-bottom','3px solid #e91c23');
});
$('.sub-menu4').mouseleave(function(){
	$('.menu4').css('border-bottom','0');
});
$('.sub-menu5').mouseover(function(){
	$('.menu5').css('border-bottom','3px solid #e91c23');
});
$('.sub-menu5').mouseleave(function(){
	$('.menu5').css('border-bottom','0');
});