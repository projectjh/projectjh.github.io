// customer start

/** gnb menu **/
var gn_speed = 3;
function gnb(gn,lm1,lm2){

	$("#gnb > li > .subdepth").hide();

	if(gn == '100'){
		var gn1 = 5-parseInt('1');
	}else	if(gn == '101'){
		var gn1 = 5+parseInt('1');
	}else{
	//메뉴 check
	var gn1 = gn-parseInt('1');
	}


	$("#gnb > li").hover(function(){
		var gnaa = jQuery(this)
		$("#gnb > li > .subdepth").hide();
		$(gnaa).find(" > .subdepth").stop().show();
		$("#gnb > li").removeClass("active").addClass("");
		$(gnaa).find(" > .subdepth").parent().toggleClass("active");
			} , function() {
				$("#gnb > li > .subdepth").hide();
				$("#gnb > li").eq(gn1).find(" > .subdepth").stop().show();
				$("#gnb > li").removeClass("active").addClass('');
				$("#gnb > li").eq(gn1).find(" > .subdepth").parent().toggleClass("active");
    });

	if(gn == '100'){
		lm_check(5,lm1);
	}else	if(gn == '100'){
		lm_check(6,lm1);
	}else{
		//메뉴 check
		lm_check(gn,lm1);
	}

	if(gn == '5'){
		$("body").addClass("sub05");
	} else if(gn =='6'){
		$("body").addClass("sub06");
	} else if(gn =='4'){
		$("body").addClass("sub04");
	} else if(gn == '3'){
		$("body").addClass("sub03");
	} else if(gn == '2'){
		$("body").addClass("sub02");
	} else if(gn == '1'){
		$("body").addClass("sub01");
	};
}


function gn_2th_show(data){

	$("#gnb > li > .subdepth").hide();
	//$("#gnb > li > .subdepth").animate({opacity:0},gn_speed);


	if($(data).find(">.subdepth").length > 0){

		$(data).find(">.subdepth").animate(
			{
				height:$(data).find(" > .subdepth").height()},gn_speed,
				function(){
					$(data).find(" > .subdepth").stop().show();
					//$("#gnb > li > .subdepth").animate({opacity:1});
				}
		);
	} else {

    $("#gnb > li > .subdepth").hide();
	//$("#gnb > li > .subdepth").animate({opacity:0},gn_speed);
	}
}

function gn_close(){
	$("#gnb > li").eq(gn).find(">.subdepth").animate(
		{
			height:$("#gnb > li").eq(gn).find(" > .subdepth").height()},gn_speed,
			function(){
				$("#gnb > li").eq(gn).find(" > .subdepth").stop().show();
				$("#gnb > li > .subdepth").animate({opacity:1});
			}
	);
}

function lm_check(gn,lm1,lm2){
	gn--;
	lm1--;
	lm2--;
	if($("#gnb > li").eq(gn).find(">.subdepth").length > 0){
		$("#gnb > li").eq(gn).find(">.subdepth").animate(
			{
				height:$("#gnb > li").eq(gn).find(" > .subdepth")},gn_speed,
				function(){
					$("#gnb > li").eq(gn).find(" > .subdepth").show();					
					$(".gnb-bg").show();
				}
		);
	}
	var lm0 = lm1+parseInt('1');
	var gn0 = gn+parseInt('1');
	if(lm0 != "0"){
		$("#lm > li").eq(lm1).toggleClass("active");
		$("#lm > li").eq(lm1).find("ul>li").eq(lm2).toggleClass("link_3th_ov");
	}
	if(gn0 != "0"){
		$("#gnb > li").eq(gn).toggleClass("active");
		if(gn0 == '100'){
			$("#gnb > li").eq(gn).find(".subdepth li").eq(lm2).toggleClass("active");
		}else{
			$("#gnb > li").eq(gn).find(".subdepth li").eq(lm1).toggleClass("active");
		}
	}
}

/** gnb end **/

function adjustScript() {
	
	if ($( window ).width() > 1025) {

		var fTel = $('div.footer-tel>div');
		fTel.hide().filter(':first').show();
		$('div.footer-tel button.tel').addClass('active');
		$('div.footer-tel button.tel').click(function () {
			fTel.hide();
			$('div.footer-tel .tel-tx').show();
			$("div.footer-tel button").removeClass('active');
			$(this).addClass('active');
			return false;
		});
		$('div.footer-tel button.fax').click(function () {
			fTel.hide();
			$('div.footer-tel .fax-tx').show();
			$("div.footer-tel button").removeClass('active');
			$(this).addClass('active');
			return false;
		});
		
		var hei = $(window).height();
		var heiH = $('#header').height();
		$("#container .index-wrap").css({minHeight:hei});
		$("#container #contents").css({minHeight:hei});

		//사업영역
		$(".area01>.item").hover(function () {
			$(this).addClass("active").siblings().removeClass("active");
		//}).filter(':first').click();
		}).filter(':first').addClass("active");

	} else if($( window ).width() > 768 && $( window ).width() <= 1024) {
		//$(".area01>.item").removeClass("active");
		//사업영역
		$(".area01>.item").click(function () {
			$(this).addClass("active").siblings().removeClass("active");
		}).filter(':first').click();
	} else {
		$(".area01>.item").removeClass("active");
	}

}

$(function() {
	
	popSlide = new Swiper('.pop-slide .slide', {
		pagination: '.pop-slide .swiper-pagination',
		paginationClickable: true,
		paginationElement:'button',
		autoplay: 2500,
		autoplayDisableOnInteraction: false	
	});  

	$(".location .ic-home").click(function () {
		location.href="../main/"
	});

	// 전체메뉴
	$("#wrap").append("<div class='dim'></div>");

	$("#header .bt-all").click(function () {
		$(".all_menu").stop().animate({left : '0'}, 250);
		$(".dim").fadeIn(200);
	});
	$(".all_menu .bt-close").click(function () {
		$(".all_menu").stop().animate({left : '-640px'}, 250);
		$(".dim").fadeOut(200);
	});

    $( ".datepicker" ).datepicker({
		showOn: "button",
		buttonText:"달력",
		buttonImageOnly: false,
		dateFormat: 'yy-mm-dd'
	});

    //adjustScript
    $(window).resize(function() {
        adjustScript();
    });
	adjustScript();

	
	//언어 선택 
	$("#header .lang > button, .all_menu .lang > button").click(function () {
		$(this).next().slideToggle(200);
	});
	$("#header .lang, .all_menu .lang").each(function(){
		$(this).bind({
			"mouseleave ":function(){
				$("#header .lang > ul").slideUp(200);
				$(".all_menu .lang > ul").slideUp(200);
			}
		});
	});	
	//모바일 언어 선택 
	$(".m-hd .lang > button").click(function () {
		$(this).next().slideToggle(200);
	});
	$(".m-hd .lang").each(function(){
		$(this).bind({
			"mouseleave focusout":function(){
				$(".m-hd .lang > ul").slideUp(200);
			}
		});
	});	

	//언어 선택 
	$("#footer .family-bx> button").click(function () {
		$(this).next("ul").slideToggle(200);
	});

	//ci	
	$(".ci-hd>.sel-dv>button").click(function () {
		$(this).next().slideToggle(200);
	});
	$(".ci-hd>.sel-dv").each(function(){
		$(this).bind({
			"mouseleave":function(){
				$(".ci-hd>.sel-dv>ul").slideUp(200);
			}
		});
	});	

   var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        if(window.FileReader){
            // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 

        else {
            // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload-name').val(filename);
    });

	var tabContainers = $('div.tab-wrap .tc');
	tabContainers.hide().filter(':first').show();
	$('div.tab-wrap .div-tab a').click(function () {
		tabContainers.hide();
		tabContainers.filter(this.hash).show();
		$('div.tab-wrap .div-tab a').parent().removeClass('active');
		$(this).parent().addClass('active');
		return false;
	}).filter(':first').click();

	// main slide
	main01Slide = new Swiper('.main-con .main-tech', {
		pagination: '.main-con .swiper-pagination',
		paginationClickable: true,
		paginationElement:'button',
        autoplay: 2500,
        autoplayDisableOnInteraction: false	
	});  
	mainNoti = new Swiper('.main-con .main-noti .noti-bx', {
		nextButton: '.next',
        prevButton: '.prev',
        direction: 'vertical',
		loop:true
	});  
});


function getSize(){
	if(window.innerHeight){
		// Firefox, Webkit
		iW = window.innerWidth;
		//iH = window.innerHeight;
	}else{
		// Internet Explorer
		iW = document.documentElement.clientWidth;
		//iH = document.documentElement.clientHeight;
	}
	return iW;
}
// Document Width Variable
var dW;
var lm_open = false;
var lan_open = false;
var lo_open = false;
var ua = window.navigator.userAgent;
var mobileMenuAllHtml = "";
var winW = $(window).width();

$(window).bind('resize', function(){
	setTimeout(function(){
		if(winW != $(window).width()){
			winW = $(window).width();
		}
	}, 500);
	//resizeFix();
});


$(document).on("click", "#header .bt-menu", menuCtr);
$(document).on("click", ".m_lmenu .bt-close", menuClo);
$(document).on("click", ".left_menu > li > a", subMenu);


function menuCtr(e){
	e.preventDefault();
	
	$(".subdepth").slideUp(200);
	$(".left_menu li").removeClass("on");

	$(this).toggleClass("open");
	if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
		$("body").toggleClass("ovf_hdn");
	}else{
		$("html, body").toggleClass("ovf_hdn");
	}

	if(!$(this).hasClass("open")){
		$(".m_lmenu").stop().animate({right : '-100%'}, 250);
		$(".mbg").fadeOut(200);
		lm_open = false;

		if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
			$("html").css({"height" : "100%"});
			$("body").css({"height" : "100%", "overflow" : "visible", "position" : "static"});
		}
	}else{
		$(".m_lmenu").stop().animate({right : 0}, 250);
		$(".mbg").fadeIn(200);
		lm_open = true;

		if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
			$("html").css({"height":$(window).height() + "px"});
			$("body").css({"height":$(window).height() + "px", "overflow" : "hidden", "position" : "relative"});
		}
	}
}

function menuClo(e){
	e.preventDefault();
	
	$(".subdepth").slideUp(200);
	$(".left_menu li").removeClass("on");

	$("#header .bt-menu").removeClass("open");
	if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
		$("body").toggleClass("ovf_hdn");
	}else{
		$("html, body").toggleClass("ovf_hdn");
	}

	$(".m_lmenu").stop().animate({right : '-100%'}, 250);
	$(".mbg").fadeOut(200);
	lm_open = false;

	if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
		$("html").css({"height" : "100%"});
		$("body").css({"height" : "100%", "overflow" : "visible", "position" : "static"});
	}
}

function subMenu(e){
	$thisp = $(this).parent();

	var chk = false;
	$(".left_menu > li").removeClass("on");

	var dropDown = $(this).next(".subdepth");
	$(".subdepth").not(dropDown).slideUp("fast");
	dropDown.stop(false, true).slideToggle("fast", function(){
		if($(this).is(":hidden")){
			$thisp.removeClass("on");
			chk = false;
		}else{
			$thisp.addClass("on");
			chk = true;
		}
	});

	if(!chk){
		$(this).parent().find(".mdepth3").each(function(idx){
			if($(this).css("display") == "block"){
				$(this).parent().removeClass("on");
				$(this).parent().find(".mdepth3").hide();
			}
		});
	}
}