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
