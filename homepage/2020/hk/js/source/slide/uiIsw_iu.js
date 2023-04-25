//////////////////////////////////////////////
// 김기현 : kimkee@naver.com         /////////
// Date : 2018-3-28 ~ 2018-08-31	 /////////
//////////////////////////////////////////////

// 사용자 , 커머스 PC,MO 공통 헤더푸터 퀵메뉴 관련
var uiIsw_iu = {
	init:function(){ // 초기구동
		this.common.init();  // 공통
		this.gnb.init();  // PC GNB
		this.lnb.init();  // MB LNB
		this.ly.init();   // 레이아웃
		this.tabNav.init();  // 탭메뉴
		this.star.init();  // 별점
		this.popLayer.init();  // 레이어팝업
		this.popWin.init();   // 윈도우 팝업
		this.form.init();   // 폼요소
		this.sch.init();   // 검색 영역
	},
	common:{  //  공통 기타등등
		init:function(){

			$urlParam = (function(a) { //URL에서 파라미터 읽어오기
				if (a == "") return {};
				var b = {};
				for (var i = 0; i < a.length; i++) {
					var p = a[i].split('=');
					if (p.length != 2) continue;
					b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); //공백으로 변환 후 디코딩
					//console.log(p[0]+" = "+b[p[0]]);
				}
				return b;
			})(window.location.search.substr(1).split('&')); //파라미터 정보만 분리
			//console.log(  $urlParam['tab'] );
		}
	},
	sch:{  //  상단 검색영역 열기
		init:function(){
			$(document).on("click","#header_iu .search .btnSch",function(){	
				var $schBox = $(this).closest(".search");
				if( $schBox.hasClass("open") ){
					$schBox.removeClass("open");
				}else{
					$schBox.addClass("open");
				}
			});
			$(document).on("focus","#header_iu .search input",function(){	
				$("#header_iu .search .history").show();
			});
			$(document).on("click","#header_iu .search .history_close button",function(){	
				$("#header_iu .search .history").hide();
				$("#header_iu .search").removeClass("open");
			});
			$(document).on("click",function(){
				$("#header_iu .search .history").hide();
				$("#header_iu .search").removeClass("open");
			});
			$(document).on("click","#header_iu .topArea>.in .search",function(e){
				e.stopPropagation();
			});
		}
	},
	lnb:{  //  모바일 햄버거메뉴  
		init:function(){
			// uiIsw_iu.lnb.using("open");
			$(document).on("click", "#header_iu .btnAllmenu", function() {
				uiIsw_iu.lnb.isOpen = true;
				uiIsw_iu.lnb.using("open");
			});
			$(document).on("click", "#allMenu_iu .btnClose", function() {
				uiIsw_iu.lnb.using("close");
				setTimeout(function(){
					uiIsw_iu.lnb.isOpen = false;
				},200);
			});
		},
		using:function(opt){
			if (opt==="open") {
				uiIsw_iu.lock.using(true);
				$("body").addClass("lnbOn");
			}
			if (opt==="close") {
				uiIsw_iu.lock.using(false);
				$("body").removeClass("lnbOn");
			}
		},
		isOpen:false
	},
	gnb:{  //  PC GNB 
		init:function(){
			var prevPosition = 0,
				bodyScroll = $("html, body").scrollTop(),
				$container = $("#container"),
				$header = $("#header_iu"),
				$topArea = $("#header_iu .topArea, #header_iu .gnb .nav"),
				$nav = $("#header_iu .gnb .nav .depth1 > li"),
				topHeight = $(".topArea").height();
			
			if($container.hasClass("on")){//sub페이지 이동 시 header bg 고정
				$header.addClass("on").addClass("btn_off")
			} else if (bodyScroll > 0){
				$header.addClass("on").addClass("btn_off")
			} 
			
			// 모바일 여부
			function isMobileCheck () {
				return $('.topArea').css('display') == 'none';
			}

			// header > nav에 mouse hover여부
			function isNavHover () {
				return $nav.hasClass("active")
			}

			$(window).on("scroll", function(event){ //스크롤 시 topArea 숨김
				// body scroll lock guard
				var scrollTop = $(document).scrollTop();
				var isMobile = isMobileCheck();

				if(uiIsw_iu.lock.stat || (prevPosition != 0 && prevPosition == scrollTop)) return;
				
				if(scrollTop === 0 || isMobile || prevPosition > scrollTop || scrollTop < 0) {
					$header.removeClass("active");
				} else {
					$header.addClass("active").addClass("btn_off");
				}
				if(scrollTop <= topHeight && !$container.hasClass("on")) {
					//$header.removeClass("on").removeClass("btn_off");
					if(isMobile){
						$header.css("position", "absolute");
						$header.removeClass("on").removeClass("btn_off");
					} else if (isNavHover()){//mouse hover시 top에서도 depth2 오픈, 견적 버튼만 on
						$header.removeClass("btn_off");
					} else {
						$header.removeClass("on").removeClass("btn_off");
					}
				} else {
					$header.addClass("on").addClass("btn_off");
					$header.css("position","fixed");
				}

				prevPosition = scrollTop;
			});
			
			//header 마우스 오버시 효과
			var $menu = $('#header_iu .gnb .depth1>li'),
				$smenuWrap = $('#header_iu .gnb .depth2');
			$topArea.on('mouseenter',function(){

				if(uiIsw_iu.lock.stat) return;

				if(!isMobileCheck()){
					$header.addClass("on")
				}
			});
			$topArea.on('mouseleave',function(){
				if(uiIsw_iu.lock.stat) return;

				if($(document).scrollTop() > topHeight){
					$header.addClass("on")
				} else if (!$container.hasClass("on")){
					$header.removeClass("on")
				}
			});
			// 2depth 슬라이드 다운
			$nav.on('mouseenter',function(){
				menuShow($(this));
			});
			$nav.on('mouseleave',function(){
				menuHide();
			});
			function menuShow(target){
				$menu.removeClass('active');
				target.addClass('active');
				$smenuWrap.stop().slideDown(300);
			}
			function menuHide(){
				$menu.removeClass('active');
				$smenuWrap.stop().slideUp(300);
			}

		},
		act:function(dep1,dep2){ // GNB 메뉴 활성화
			//console.log(dep1,dep2);
			this.gnb = $("nav.gnb");
			this.gnb.find("ul.depth1>li").removeClass("on");
			this.gnb.find("ul.depth2>li").removeClass("on");
			var dep1Set ;
			var $parentMenu;
			if(typeof dep1 == "number"){
                this.gnb.find("ul.depth1>li:nth-child("+dep1+")").addClass("on");
			}else{
				this.gnb.find("ul.depth1>li>*").each(function(){
					if( $(this).text() == dep1 ){ 
						dep1Set = $(this).parent("li").index()+1 ;
						$parentMenu = $(this).parent("li");
						$(this).parent("li").addClass("on");
					}
				});
			}
			
			if(typeof dep2 == "number"){
				$parentMenu.find("ul.depth2>li:nth-child("+dep2+")").addClass("on");
			}else{
				$parentMenu.find("ul.depth2>li>*").each(function(){
					if( $(this).text() == dep2 ){ 
						$(this).parent("li").addClass("on");
					}
				});
			}

		}
	},
	ly:{  //  레이아웃 
		init:function(){

			$("#container .contain.mb.join").length && $("body").addClass("popMo");
			$(window).on("load resize",this.conHeight);

			//페이지상단이동
			$('#quickBox_iu .menu>li.top a').on("click",function(){
				$('html, body').stop().animate({'scrollTop':'0'},'600','swing');
				return false;
			});

			$(document).on("click","#quickBox_iu .clipSet .clip dt a",function(){
				var $thisBox = $(this).closest(".clip");
				$thisBox.addClass("open").siblings(".clip").removeClass("open");
			});

			//페이지상단이동
			$('#btmFixMenu_iu .btnTop').on("click",function(){
				$('html, body').stop().animate({'scrollTop':'0'},'600','swing');
				return false;
			});
			
			var $quickBox = $("#btmFixMenu_iu"),
				$menu = $("#btmFixMenu_iu .btnQuick"),
				$quickMenu = $("#btmFixMenu_iu .quick"),
				$btnTop = $quickBox.find(".btnTop"),
            //180910추가
				$btnColor = $("#btmFixMenu_iu .list li.on");
			

			$menu.on("click",function(e){
				e.preventDefault();
				if(!$quickMenu.hasClass("show")){
					$quickBox.append('<div class="dim" tabIndex="-1"></div>');
					$quickMenu.addClass("show");
				}else{
					$quickBox.find(".dim").remove();
					$quickMenu.removeClass("show");
				}			
			});

			$(document).on("click","#btmFixMenu_iu .dim",function(){
				$quickMenu.removeClass("show");
				$(this).remove();
			});

			//하단 견적버튼 
			var prevPosition = 0;
			$(window).on("scroll", function(){
				var $scrollTop = $(document).scrollTop();
				var BottomHeight =  $("#btmFixMenu_iu").height()
				//스크롤 민감도				
				var isAction = Math.abs(prevPosition - $scrollTop) > 5;
				var ismobile = $(document).width() <= 768
				//모바일 lnb가 열리지 않았을 때만 이벤트 진행
				if(!uiIsw_iu.lnb.isOpen && isAction && ismobile) {
					if ($scrollTop > prevPosition && $scrollTop > BottomHeight){
						$quickBox.addClass("active");
					} else {
						$quickBox.removeClass("active");
					}
				}
				prevPosition = $scrollTop;
			});

			var lyCls = $("main.contain").attr("class");
			if (lyCls) {
				$("body").addClass(lyCls).removeClass("contain");
			}
            
            //18.09.10추가
            $(document).on("click","#btmFixMenu_iu .list li.listTab a",function(){
                if(!$(this).hasClass("on")){
                    $btnColor.removeClass("on");
                    $(this).parent().addClass("on");
               }              
			});
		},
		conHeight:function(){
			var winH =  $(window).outerHeight();
			var headH = $("#header_iu").outerHeight();
			var footH = $("#footer_iu").outerHeight();
			var containH = parseInt( $("#container").css("padding-top") );
			var minHt = winH - headH - footH + containH; 

			$("#container").css({"min-height": minHt });

			if(winH < 830){
				$("#quickBox_iu .clip").addClass("hide");
			}else{
				$("#quickBox_iu .clip").removeClass("hide");
			}
			if(winH < 580){
				$("#quickBox_iu .menu>li.info").addClass("hide");
			}else{
				$("#quickBox_iu .menu>li.info").removeClass("hide");
			}
		}
	},
	tabNav: { //탭형식컨텐츠
		init: function() {
			this.using();
			//console.log(  $urlParam['tab'] );
			uiIsw_iu.tabNav.set($urlParam['tab']);
		},
		set: function(id) {

			$(".uiTabNav_iu>li>a[href='#" + id + "']").closest("li").addClass("active").siblings("li").removeClass("active");
			$(".uiTabNav_iu>li>label>input[type='radio'][data-href='#" + id + "']").attr("checked", true).closest("li").addClass("active").siblings("li").removeClass("active");
			//console.log(id);
			$("#" + id).addClass("active").siblings(".panel").removeClass("active");

		},
		using: function() {

			$(document).on("click", ".uiTabNav_iu:not([data-ui*='link'])>li>a", function(e) {
				$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				var thisId = $(this).attr("href");
				//console.log(thisId);
				if (thisId.indexOf("#") > -1) {
					$(thisId).addClass("active").siblings(".panel").removeClass("active");
					e.preventDefault();
				}
			});

			$(document).on("change", ".uiTabNav_iu>li input[type='radio']", function(e) {
				$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				var thisId = $(this).attr("data-href");
				//console.log(thisId);
				$(thisId).addClass("active").siblings(".panel").removeClass("active");
				e.preventDefault();
			});
		}
	},
	star:{  // 별점
		init:function(){
			$(".uiStar").length && this.using();
			$(document).on("click",".uiStar ul>li>button.st",function(){
				var myVar =  $(this).closest("li").index()+1;
				//console.log(myVar);
				$(this).closest(".uiStar").data("star",myVar);
				$(this).closest(".uiStar").attr("data-star",myVar);

				// console.log( myVar , $(this).closest(".uiStar").data("star")  );
				uiIsw_iu.star.using();

			});
		},
		using:function(){
			$(".uiStar").each(function(){
				$(this).find("ul>li").removeClass();
				//$(this).find("ul>li").removeClass("f");
				var v = $(this).attr("data-star");
				//v = v;
				vt = Math.floor(v/1);
				//vt = v.replace(/0/gi, '^');
				vp = (v%1);
				$(this).find(".p").html(v);
				// console.log(v,vt,vp);
				for (var i = 0; i <= vt; i++) {
					$(this).find("ul>li:nth-child("+i+")").addClass("f");
					
					if(vp){
						if(vp > 0.5 ){
							// $(this).find("ul>li:nth-child(1)").addClass("h");
							$(this).find("ul>li:nth-child("+vt+")").next("li").addClass("h");
						}
						// if(vp <= 0.5 ){
						// 	$(this).find("ul>li:nth-child("+vt+")").next("li").addClass("h");
						// }
						
					}
				}
			});
		}
	},
	lock: { // 스크롤 막기,풀기 
		sct: 0,
		stat: false,
		using: function(opt) {

			if (opt === true && this.stat === false) {
				this.stat = true;
				uiIsw_iu.lock.sct = $(window).scrollTop();
				$(".wrap>#container .contain").css({ "transform": "translateY(" + (-uiIsw_iu.lock.sct) + "px)" });
				$("body.popMo .contain .popMoHd").css({ "transform": "translateY(" + (uiIsw_iu.lock.sct - 54) + "px)" });
				$("body,body #wrap ").addClass("lock").css( "height" , $(window).height() );
				$("body,html").scrollTop(0);

			}
			if (opt === false) {
				this.stat = false;
				$(".wrap>#container .contain , .wrap>.footer_iu ,body.popMo .contain .popMoHd").css({ "transform": "" });
				$("body,body #wrap").removeClass("lock").css( "height" , "" );
				$("body,html").scrollTop(uiIsw_iu.lock.sct);
			}
		}
	},
	form:{  // 폼요소
		init:function(){
			$(window).on("load", this.chkall);
			$(window).on("load", this.attach);
			$(window).on("load", this.inputFocus);
		},
		chkall: function() { // 전체 첵크 ui 
			$(document).on("change", "[data-check='check']", function() {
				var thisId = $(this).data("checkId");
				var thisNum = $("[data-check='check'][data-check-id='" + thisId + "']").length;
				var thisChkNum = $("[data-check='check'][data-check-id='" + thisId + "']:checked").length;
				//console.log(thisId,thisNum,thisChkNum);
				if (thisChkNum >= thisNum) {
					$("[data-check='all'][data-check-id='" + thisId + "']").prop("checked", true);
				} else {
					$("[data-check='all'][data-check-id='" + thisId + "']").prop("checked", false);
				}
			});
			$(document).on("change", "[data-check='all']", function() {
				var thisId = $(this).data("checkId");
				var thisCheck = $("[data-check='check'][data-check-id='" + thisId + "']");
				//console.log(thisId , thisCheck);
				if ($(this).is(":checked")) {
					thisCheck.prop("checked", true);
				} else {
					thisCheck.prop("checked", false);
				}
			});
		},
		attach: function() { // 파일 첨부
			$(document).on("change", ".uiAddFile .fileButton .fileInput", function() {
				var $thisFile = $(this).closest(".uiAddFile");
				var	fUrl = (this.value).split("\\");
				var	fName = fUrl[fUrl.length - 1];
				$thisFile.find(".file .loc").val(fName);
				var locVar = $thisFile.find(".file .loc").val();
				if (locVar) {
					$thisFile.addClass("on");
				}
			});
			$(document).on("click", ".uiAddFile .file .delete", function() {
				var $thisFile = $(this).closest(".uiAddFile");
				$thisFile.find(".file .loc").val("");
				$thisFile.find(".fileButton .fileInput").val("");
				$thisFile.removeClass("on");
			});
		},
		inputFocus: function(){
			$("section.popLayer .phone .n2").keyup(function () {
				if (this.value.length == this.maxLength) {
				  	$("section.popLayer .phone .n3").focus();
				}
			});

			//input 4자리 이상 입력시 다음 input 이동
			$(".contain .phone input.n2").keyup(function () {
				if (this.value.length == this.maxLength) {
					  $(".contain .phone input.n3").focus();
				}
			});

			$("section.popLayer .phone select.n1").on("change", function () {
				$(this).focusout()
				$("section.popLayer .phone .n2").focus();
			});
		}
	},
	popLayer:{ // 레이어팝업 
		init:function(paramCallback){ //레이어 팝업창
			if( typeof paramCallback  != "function" ){ paramCallback = function(){}; }
			this.pop = $(".popLayer");
			this.active = true;
			this.moreCallback = paramCallback;
			this.mcScroll();

			$(document).on("click","[data-ui='pop-layer']", function(e) {
				var id = $(this).attr("href").replace("#","");
				if( $("#"+id).length ){
					uiIsw_iu.popLayer.open(id);
					uiIsw_iu.lock.using(true);
					uiIsw_iu.popLayer.resize();
				}
				e.preventDefault();
			});

			$(document).on("click",this.pop.selector+":not(.win) .btnClose",function(){
				var id = $(this).closest(".popLayer").attr("id");
				uiIsw_iu.popLayer.close(id);
				uiIsw_iu.lock.using(false);
			});

			$(document).on("click",".popLayer:not(.win)",function(e){
				if(!$(".popLayer>.popBody" ).has(e.target).length){
					$(this).find(".btnClose").trigger("click");
				}				
			});

			$(document).on("keydown",function(event){
				if(event.keyCode == 27 &&  $(".popLayer:visible:not(.win)").length ){  
					uiIsw_iu.popLayer.close();
				}
			});
			
			//$(document).on("click",".popLayer>.popBody", function(e){ 
				//e.stopPropagation(); 
			//});
			
			$("body a").not(".popLayer *").on("focus", function(){ // 레이어팝업 포커스이동 웹접근성 UI 모듈
				$(".popLayer:visible").focus();
			});

			$(window).on("load resize",this.resize);
		},
		open:function(id){ 	// uiIsw_iu.popLayer.open("popLayerSample2");
			if( $("#"+id).length ){
				uiIsw_iu.lock.using(true);
				$("#"+id).attr("tabindex", "0").fadeIn(100).focus();
				this.resize();
				this.mcScroll();
			}
		},
		close:function(id){ // uiIsw_iu.popLayer.close("popLayerSample2");
			// console.log(id);
			if(id){
				$("#"+id).fadeOut(0,function(){
					$("[href='#"+id+"']").focus();
				});
			}else{
				$(".popLayer:visible").last().fadeOut(0);
			}

			uiIsw_iu.lock.using(false);
		},
		resize:function(){
			var popH = $(window).height() - $(".popHead:visible").outerHeight() - $(".popBot:visible").outerHeight() - 60;
			$(".popLayer .popCtn.scroll:visible").css({"max-height": popH });

		},
		mcScroll:function(){
			// $(".popLayer .popCtn.scroll:visible").mCustomScrollbar({
			//	scrollInertia:100, mouseWheel:{ scrollAmount:100 },
			//	callbacks:{
			//		onTotalScroll:function(){ uiIsw_iu.popLayer.moreCallback();	}
			// 	}
			// });
		}
	},
	popWin:{ // 윈도우팝업
		init:function(){
			var els = "[data-ui='pop-window']";
			$(document).on("click",els,function(e){
				e.preventDefault();
				var $this = $(this);
				var _href = $this.attr("href");
				var _width = $this.data("width");
				var _height = $this.data("height");
				var _scroll = $this.data("scroll");
				uiApc.popWin.open(_href, _width, _height, _scroll );
			});
			$(els).attr("target","_blank").attr("title","새창열림");
		},
		open:function(_href, _width, _height, _scroll){
			if (_scroll==false){ _scroll="no"; }
			if (_scroll==true ){ _scroll = "yes";}
			if (_scroll==undefined ) { _scroll = "yes";}
			var _left = parseInt((screen.width - _width) *0.5, 10);
			var _top = parseInt((screen.height - _height) *0.5, 10);
			var _name = "popup" + _href;
			var modalWin =  window.open(_href, _name, "top="+ _top +", left="+ _left +", width="+ _width +", height="+ _height +", scrollbars="+ _scroll +", toolbar=no, menubar=no, location=no, resizable=yes, status=no");
			modalWin.focus();
		}
	}
	
};

uiIsw_iu.init();