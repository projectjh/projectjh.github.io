
$(document).ready(function(){
  //gallery-slider01
	$('.gallery-slider01').slick({
		centerMode: true,
		infinite:true,
		autoplay:true,
		autoplaySpeed:3500,
		dots:false,
		arrows:true,
		slidesToShow: 2,
		slidesToScroll: 1,
		 responsive: [
			 {
					breakpoint: 767,
					settings: {
						centerMode:true,
						centerPadding:"30px", 
						slidesToShow: 1, 
						slidesToScroll: 1
					}
				}
			]
	});
		
	// arrow 
	$('.gallery-slider01').mouseover(function(){
		$(this).children('.slick-arrow').css('opacity', '1');	
	});
	$('.gallery-slider01').mouseleave(function(){
		$(this).children('.slick-arrow').css('opacity', '0');	
	});
	
	
	//banner-slider
	$('.banner-slider').slick({
		centerMode: false,
		infinite:true,
		autoplay:true,
		autoplaySpeed:350000,
		dots:false,
		arrows:true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
					breakpoint: 767,
					settings: {
						centerMode:false,
						//centerPadding:"30px", 
						slidesToShow: 2, 
						slidesToScroll: 1
					}
				}
			]
	});
		
	// arrow 
	$('.banner-slider').mouseover(function(){
		$(this).children('.slick-arrow').css('opacity', '1');	
	});
	$('.banner-slider').mouseleave(function(){
		$(this).children('.slick-arrow').css('opacity', '0');	
	});


});