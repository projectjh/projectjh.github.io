
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
					breakpoint: 1141,
					settings: {
						centerMode:true,
						centerPadding:"0px",
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2, 
						slidesToScroll: 1
					}
				},
              {
					breakpoint: 640,
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


});