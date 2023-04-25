
$(document).ready(function(){
	//onepage-scroll
    $(".main").onepage_scroll({
      sectionContainer: "section",
      responsiveFallback: 525,      
      loop: false
    });
    
	//un- slider 
    $(".main_slider").unslider({
      animation: 'fade',
      autoplay: true,
      arrows: false,
      delay:5000
    });
	
	//cycle-slide
/*     $('.cycle-slide').cycle({
    	slides          : '> div',
		timeout         : 8000,
		//timeout         : 0,
		speed           : 1500,
		swipe           : true,
		fx              : 'crossfade',
		easing			: 'easeOutCubic',
		log			    : false,
		prev            : $parent_container.find('.cycle-slide-prev'),
		next            : $parent_container.find('.cycle-slide-next'),
		loader          : true,
		progressive     : progressive,
    }); */
    
  //news-slider
	$('.news-slider').slick({
		centerMode: true,
		infinite:true,
		autoplay:true,
		autoplaySpeed:3500,
		dots:false,
		arrows:true,
		slidesToShow: 2,
		slidesToScroll: 1,
		 responsive: [
//				{
//					breakpoint: 1199,
//					settings: {
//						centerMode:true,
//						centerPadding:"0px",
//						slidesToShow: 2,
//						slidesToScroll: 1
//					}
//				},
				{
					breakpoint: 767,
					settings: {
						centerMode:true,
						centerPadding:"30px", 
						slidesToShow: 1, 
						slidesToScroll: 1
					}
				}
//              {
//					breakpoint: 640,
//					settings: {
//                     centerMode:true,
//						centerPadding:"30px", 
//						slidesToShow: 1,
//						slidesToScroll: 1
//					}
//				}
			]
	});
	
	
	//slick-slide / 새소식 / arrow 
	$('.news-slider').mouseover(function(){
		$(this).children('.slick-arrow').css('opacity', '1');	
	});
	$('.news-slider').mouseleave(function(){
		$(this).children('.slick-arrow').css('opacity', '0');	
	});


});

//progress-slider
$(document).ready(function() {
	  var time = 2;
	  var $bar,
	    $slick,
	    isPause,
	    tick,
	    percentTime;

	  $slick = $('#progress-slider .slider');
	  $slick.slick({
	    arrows: false,
	    speed: 1200,
	    adaptiveHeight: false
	  });

	  $bar = $('.slider-progress .progress');

	  function startProgressbar() {
	    resetProgressbar();
	    percentTime = 0;
	    isPause = false;
	    tick = setInterval(interval, 30);
	  }

	  function interval() {
	    if (isPause === false) {
	      percentTime += 1 / (time + 0.1);
	      $bar.css({
	        width: percentTime + "%"
	      });
	      if (percentTime >= 100) {
	        $slick.slick('slickNext');
	        startProgressbar();
	      }
	    }
	  }

	  function resetProgressbar() {
	    $bar.css({
	      width: 0 + '%'
	    });
	    clearTimeout(tick);
	  }

	  startProgressbar();

	  $('.progress-slider-arrow').click(function() {
	    startProgressbar();
	  }); 
	  
	  
	  $('.progress-slider-prev').click(function(){
		  $('#progress-slider .slider').slick('slickPrev');
		});
		
		$('.progress-slider-next').click(function(){
		  $('#progress-slider .slider').slick('slickNext');
		});
	  
	});



