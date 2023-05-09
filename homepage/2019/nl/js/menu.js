//main-menu
$('#main-menu > ul > li').mouseover(function(){
	$(this).children('.sub-menu').show();
});
$('#main-menu > ul > li').mouseleave(function(){	
	$(this).children('.sub-menu').hide();
});

//btn-up
$('.btn-up').click(function(){
    $('html, body').animate({scrollTop : 0},600);
    return false;
});

//mobile-menu
$('.ham').click(function(){
	$('#main-menu ul li').off();
	$('.m-menu-wrap').animate({'right':'0'});
	//$('.m-menu-wrap').addClass('menu-shadow');
	$('.blind').show();
	$('.m-menu ul li').click(function(){
		$(this).children('.sub-menu').stop().slideToggle();
	});
	return false;
});
$('.blind').click(function(){
	$('.m-menu-wrap').animate({'right':'-100%'});
	$('.blind').css('display','none');
});


/*$('#sub-nav ul li.selected a').click(function(){
	var winW = $(window).width();
	if(winW <= 767){
		$(this).closest('ul').toggleClass('on')
		$('#sub-nav ul li').not($(this).parent()).toggle();
		$('#sub-nav ul li.selected').toggleClass('after')
		return false;
	}
})*/






