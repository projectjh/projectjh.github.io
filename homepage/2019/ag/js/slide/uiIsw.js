var uiIsw = {
	init:function(){ // 초기구동
		this.cm.init();  // 공통
		this.ly.init();  // 레이아웃
		this.mn.init();  // 메인페이지 
		this.dp.init();  // 시공사례(맞춤검색)
		this.ct.init();  // 커뮤니티
		this.mg.init();  // 제휴점관리
		this.it.init();  // 인테리어스타
		this.pt.init();  // 공간별 사진
		this.datePick.init();  // 달력피커
 		this.tabNav.init();  // 탬메뉴
		this.tooltip.init(); // 툴팁
		this.event.init(); // 이벤트_181002
		this.fb.init(); // 페이스북 트래픽 광고 랜딩
	},
	cm:{ // 공통
		init:function(){
			$(document).on("change",".contain.et.terms .termLink .link select",function(){ // 약관내 select 이동 /resources/front/html/et/terms1.jsp
				window.location.href = $(this).val();
			});
		}
	},
	ly:{ // 레이아웃
		init:function(){
			$("#container .contain .popMoHd").length && $("body").addClass("popMo");
			this.inst();
		},
		inst:function(){

			$(window).on("scroll load resize",function(){  //  /resources/front/html/st/stMain.jsp
				if( $("#btmFixMenu_iu .btnTop").hasClass("active") ) {
					$(".ctnBox.main .bbsInfo .bts , .contain.st .bbsInfo .opts .bts").addClass("active");
				}else{
					$(".ctnBox.main .bbsInfo .bts , .contain.st .bbsInfo .opts .bts").removeClass("active");
				}
			});
		}
	},
	mn:{ // 메인  /resources/front/html/mn/main.jsp
		init:function(){
			var that = this;
            $(that.visual.els).length && that.visual.using();
            setTimeout(function(){
				$(that.slides.info.els).length		&& that.slides.info.using();
                $(that.slides.esti.els).length		&& that.slides.esti.using();
                $(that.slides.port.els).length		&& that.slides.port.using();
                $(that.slides.review.els).length	&& that.slides.review.using();
                $(that.slides.request.els).length	&& that.slides.request.using();
			},0);
			this.easyStep.init();
			this.keyword.init();
			//$(this.slides.pop.els).length	&& this.slides.pop.using();
		},
		visual:{ // 메인 비쥬얼
			els:"section.msect.visual .slide",
			opt:{
				autoplay:true,
				autoplaySpeed : 3500,
				infinite:true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows:true,
				speed: 500,
				dots: true,
				pauseOnDotsHover: true,
				pauseOnHover:true,
				slide:'div',
				appendDots:$(".btn_section"),
				appendArrows:$(".move_btn"),
				cssEase: 'linear' 
			},
			using:function(){
				this.slide = $(this.els).slick(this.opt);
				$(document).on("ready", function(){
					$("section.msect.visual").removeClass("on")
				})
			}
		},
		slides:{  
			info:{//메인 3가지 요소 영역
				els:"section.msect.infos .ins_section .slide",
				opt:{
                    speed: 500,
					autoplay: true,
					cssEase: 'linear',
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows:false,
					swipeToSlide:true,
					swipe:true,
					draggable: true,
					fade: true,
					cssEase: 'linear',
					dots: true 
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
					var navi = ["다양한 포트폴리오", "탑클래스 파트너", "시공 후 AS 보장"];
					var control = $("section.msect.infos .ins_section .slick-dots li").length;
					for(var i = 0; i < control; i ++){
						$("section.msect.infos .ins_section .slick-dots li #slick-slide-control1"+i).text(navi[i]);
					}
				}
			},
			esti:{ // 메인 견적신청현황
				els:"section.msect.infos .esti_inner .est .slide",
				opt:{
					speed: 5000,
					autoplay: true,
					autoplaySpeed: 0,
					cssEase: 'linear',
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
					infinite:true,
					arrows:false,
					swipe:false,
					swipeToSlide:false,
					draggable: false,
					pauseOnHover:false
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			},
            port:{ // 메인 포트폴리오
				els:".slide",
				opt:{
					autoplay:true,
					autoplaySpeed: 2500,
					infinite:true,
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows:true,
					speed: 500,
					cssEase: 'linear',
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
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
					$(".slide").on('afterChange', function(slick, changeIndex){//PC버전일 때 좌우 이미지 흑백처리
						var isMobile = $(document).width() <= 768;
						var changeIndex = $(".slide .slick-slide").attr("aria-hidden");
						if( changeIndex !== false && !isMobile){
							$(".slide .slick-slide[aria-hidden='true']").css({'-webkit-filter': 'grayscale(80%)', 'filter': 'grayscale(80%)'})
							$(".slide .slick-slide[aria-hidden='false']").css({'-webkit-filter': 'none', 'filter': 'none'})
						} 
					});
				}
			},
			review: {// 메인 후기
                els:"section.msect.review .tab_cont .slide",
                opt:{
                    mobileFirst:true, 
                    autoplay:false,
                    infinite:true,
                    arrows:false,
                    draggable: true,
                    swipe:true,
                    speed: 300,
                    slidesToShow: 1,
					slidesToScroll: 1,
					dots:true,
                    responsive: [
                         {
							breakpoint: 640,
							settings: "unslick"
						}
					]
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
                    $(window).on('resize orientationchange', function() {
                      var mySlider = $('section.msect.review .slide');
                      if(!mySlider.hasClass('slick-initialized')){
                           mySlider.slick({
                               	mobileFirst:true, 
                                autoplay:false,
                                infinite:true,
                                arrows:false,
                                draggable: true,
                                swipe:true,
								speed: 300,
								dots:true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                responsive: [
                                     {
                                        breakpoint: 640,
                                        settings: "unslick"
                                    }
                                ]
                           });
                      }
                    });
                    $("section.msect.review .slide").on('afterChange', function(event, slick, currentSlide){
                        var slickIndex = $('section.msect.review .slick-slide[data-slick-index="0"]').attr("aria-hidden");
                        //console.log(slickIndex);
                        if( slickIndex !== false ){
                           $(this).parent().find(".panel_more").css({"opacity":0});
                        } 
                    });
                    
                    var con = $("section.msect.review .box .img_tab li"); //refresh할 때 후기 이미지 변경
					var num = con.length;
					var ran = Math.floor(Math.random() * num);
					//console.log(num, ran)
                    con.eq(ran).addClass("on").siblings("li").removeClass("on");
                    var aId = $('section.msect.review .box .img_tab li.on span').attr("id");
                    if (aId.indexOf('#') > -1) {
                        $(aId).addClass('on').siblings('.cont').removeClass('on');
                    }                   
                    
                    $(document).on('click', 'section.msect.review .box .img_tab li.tab span', function () { //click 시 후기 이미지 변경
                        $(this).closest('li').addClass('on').siblings('li').removeClass('on');
                        var thisId = $(this).attr("id");
                        if (thisId.indexOf('#') > -1) {
                            $(thisId).addClass('on').siblings('.cont').removeClass('on');
                        }
                    });
                }
            },
            /*18.10.04 수정*/
            request:{//메인 리퀘스트 영역 롤링
                els:"section.msect.request ul.slide",
                opt:{
                    accessibility:false,
                    autoplay:true,
				    autoplaySpeed : 3000,
					infinite:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows:false,
					speed: 500,
                    dots: true,
                    swipeToSlide:true,
                    pauseOnHover:true
                },
                using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
            },
            /*pop:{ //메인팝업 롤링할 경우 사용
				els:".container .layer_popup .slide",
				opt:{
					accessibility:false,
                    autoplay:true,
					autoplaySpeed : 3500,
					infinite:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows:false,
					speed: 500,
                     dots: true
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			},*/
		},
		easyStep:{
			init:function(){
				var $step = $("section.msect.comnt ul.list>li");
				$step.on("mouseenter", function(){
					$step.removeClass("on")
					$(this).addClass("on")
				})
			}
		},
		keyword:{
			init:function(){
				// var ran = Math.floor(Math.random() * 5) +1;
				// var ran1 = Math.floor(Math.random() * 3) +1;
				// //console.log(ran, ran1)
				// $('section.msect.disp .dspList').find('.house'+ ran).css({display:"block"})
				// $('section.msect.disp .dspList').find('.building'+ ran1).css({display:"block"})
				
			}
		}
	},
	mg:{ // 제휴점관리  /resources/front/html/mg/comp_view.jsp
		init:function(){
			this.slides.init();
		},
		slides:{
			init:function(){
				$(this.thumb.els).find(".pic").length && this.thumb.using(); // uiIsw.mg.slides.thumb.using();
			},
			thumb:{ // /resources/front/html/mg/photo_mod.jsp
				els:".mgPicEdit>.pan.photo .photoNav .list",
				opt:{ //19.01.16  노출개수 수정
					infinite:true,
					slidesToShow: 8,
					slidesToScroll:8,
					speed: 200
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			}
		}
	},
	it:{ // 인테리어스타  /resources/front/html/it/itMain.jsp
		init:function(){
			this.slides.init();
		},
		slides:{
			init:function(){
				$(this.build.els).find(".sld").length && this.build.using();
				$(this.other.els).length && this.other.using();
				$(this.thumb.els).length && this.thumb.using();
			},
			build:{  //  /resources/front/html/it/introduce.jsp
				els:".contain.it.intro .buildList .slide",
				opt:{
					infinite:true,
					arrows:false,
					slidesToShow: 5,
					slidesToScroll:5,
					speed: 200,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow:3,
								slidesToScroll:3
							}
						},
						{
							breakpoint: 375,
							settings: {
								slidesToShow:2,
								slidesToScroll:2
							}
						}
					]
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			},
			other:{ // /resources/front/html/it/build_view.jsp
				els:".contain.it.build .conts.other .slide",
				opt:{
					infinite:true,
					arrows:true,
					slidesToShow: 5,
					slidesToScroll:5,
					speed: 200,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow:3,
								slidesToScroll:3
							}
						},
						{
							breakpoint: 520,
							settings: {
								slidesToShow:2,
								slidesToScroll:2
							}
						}
					]
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			},
			thumb:{ //  /resources/front/html/it/build_view.jsp
				els:".itPicVeiw>.pan.photo .photoNav .list",
				opt:{
					infinite:true,
					slidesToShow: 6,
					slidesToScroll:6,
					speed: 200,
					responsive: [
						{
							breakpoint: 521,
							settings: {
								slidesToShow:4,
								slidesToScroll:4
							}
						}
					]
				},
				using:function(){
					this.slide = $(this.els).slick(this.opt);
				}
			}
		}
	},
	pt:{ // 공간별사진  /resources/front/html/pt/pic_list_dwe.jsp
		init:function(){
			this.filter.init();
			this.filterPt.init();
		},
		filter:{  //  /resources/front/html/pt/pic_list_dwe.jsp
			init:function(){
				$(document).on("click",".uiPtFilter .disp .hds .close",function(){
					uiIsw.pt.filter.using("close");
				});
				$(document).on("click",".uiPtFilter .disp .pan dl>dd .btnMore",function(){
					$(this).closest(".pan").find("dd").addClass("open");
				});
			},
			using:function(opt){
				if(opt=="open"){
					$(".uiPtFilter").addClass("open");
					uiIsw.lock.using(true);
				}
				if(opt=="close"){
					$(".uiPtFilter").removeClass("open");
					$(".uiPtFilter .disp").find("dd").removeClass("open");
					uiIsw.lock.using(false);
				}
			}
		},
		filterPt:{  // /resources/front/html/pt/pic_list_dwe.jsp
			init:function(){
				$(document).on("click",".subHead.pt .btsFilterOpen .btnSch , .uiDpPtFilterMob>ul.list>li>a",function(){
					uiIsw.pt.filter.using("open");
				});
				$(document).on("click", ".subHead.pt .hdt .sels li:not(.empty) a", function(){
					$(".subHead.pt .hdt .sels li").removeClass("on")
					$(this).parent().addClass("on");
				})

				$(document).on("click", ".uiPtFilter .hds .section_select li:not(.empty) a", function(){
					$(".uiPtFilter .hds .section_select li").removeClass("on")
					$(this).parent().addClass("on");
				})

				// $(document).on("click",function(e){
				// 	if(!$(".uiDpPtFilter , .uiDpSearch, .btsFilterOpen").has(e.target).length) {
				// 		uiIsw.pt.filterPt.using("close");
				// 	}
				// });
				$(document).on("click",".uiDpSearch>.list>li>a",function(){
					var $this = $(".uiDpSearch");
					if( $this.hasClass("open") ) {
						uiIsw.pt.filterPt.using("close");
					}else{
						uiIsw.pt.filterPt.using("open");
					}
				});
				
				$(document).on("click",".uiDpPtFilter>.disp .botts .btnSch",function(){
					uiIsw.pt.filterPt.using("close");
				});
				$(document).on("click",".uiDpPtFilter>.disp .pan .hds .close",function(){
					uiIsw.pt.filterPt.using("close");
				});
			},
			using:function(opt){
				if(opt=="open"){
					$(".uiDpSearch").addClass("open");
					$(".uiDpSearch .disp").slideDown(300);
				}
				if(opt=="close"){
					$(".uiDpSearch").removeClass("open");
					$(".uiDpSearch .disp").slideUp(300);
				}
			}
		}
	},
	ct:{ // 커뮤니티  /resources/front/html/ct/review.jsp 
		init:function(){   
			$(document).on("click","button[data-ui-list-id]",function(){
				var list_id = $(this).data("ui-list-id");
				//console.log(list_id);
				if( $(this).is(".thumb") ){
					uiIsw.ct.list(list_id,"thumb");
				}
				if( $(this).is(".list") ){
					uiIsw.ct.list(list_id,"list");
				}
			});
			// uiIsw.ct.list("list");
		},
		list:function(list_id,opt){  //  리스트타입 썸네일 타입 토글
			// console.log(list_id,opt);
			$("ul[data-ui-list-id="+list_id+"]").removeClass("list thumb").addClass(opt);
			$("button[data-ui-list-id="+list_id+"]."+opt).addClass("active").siblings(".bt").removeClass("active");
		}
	},
	dp:{ // 시공사례  /resources/front/html/dp/list_dwe.jsp
		init:function(){
			$(document).on("click",".uiDpList .schOpt .sort>.bt",function(){
				if( $(this).is(".thumb") ){
					uiIsw.dp.list("thumb");
				}
				if( $(this).is(".list") ){
					uiIsw.dp.list("list");
				}
			});
			// uiIsw.dp.list("thumb");
			this.filter.init();
		},
		filter:{  //  필터 열고 닫기
			init:function(){
				$(document).on("click",".uiFilterMob>ul.list>li>a",function(){
					uiIsw.dp.filter.using("open");
				});

				$(document).on("click",function(e){
					if(!$(".uiDpFilter , .btsFilterOpen , .uiFilterMob").has(e.target).length) {
						uiIsw.dp.filter.using("close");
					}
				});
				$(document).on("click",".uiDpFilter>.list>li>a",function(){
					var $this = $(".uiDpFilter");
					if( $this.hasClass("open") ) {
						uiIsw.dp.filter.using("close");
					}else{
						uiIsw.dp.filter.using("open");
					}
				});
				
				$(document).on("click",".uiDpFilter>.disp .botts .btnSch",function(){
					uiIsw.dp.filter.using("close");
				});
				$(document).on("click",".uiDpFilter>.disp .pan .hds .close",function(){
					uiIsw.dp.filter.using("close");
				});
				$(document).on("click",".uiDpFilter>.disp .pan dl>dd .btnMore",function(){
					$(this).closest(".disp").find(".btnMore").hide();
					$(this).closest(".disp").find(".opt").addClass("open");
				});
			},
			using:function(opt){
				if(opt=="open"){
					$(".uiDpFilter").addClass("open");
				}
				if(opt=="close"){
					$(".uiDpFilter").removeClass("open");
					$(".uiDpFilter .disp").find(".opt").removeClass("open");
					$(".uiDpFilter .disp").find(".btnMore").show();
				}
			}
		},
		list:function(opt){   //  리스트형식, 썸네일형식 토글
			$(".uiDpList .dpList").removeClass("list thumb").addClass(opt);
			$(".uiDpList .schOpt .sort .bt."+opt).addClass("active").siblings(".bt").removeClass("active");
			if(opt === "thumb") {
				$(".uiItem.dp .slide:not(.slick-slider)").length &&  this.slides.thumb.using();
			}
			if(opt === "list") {
				$(".uiItem.dp .slide.slick-slider").length && $(".uiItem.dp .slide.slick-slider").slick("unslick");
			}
		},
		slides:{  //   /resources/front/html/dp/list_dwe.jsp
			init:function(){
				$(this.thumb.els).find(".pic").length && this.thumb.using();
			},
			thumb:{
				els:".uiItem.dp .slide:not(.slick-slider)",
				opt:{
					infinite:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 200
				},
				using:function(){
					//console.log(this.els);
					this.slide = $(this.els).slick(this.opt);
				}
			}
		}
	},
	lock: { // 스크롤 막기,풀기 
		sct: 0,
		stat: false,
		using: function(opt) {
			if(opt === true && this.stat === false) {
				this.stat = true;
				uiIsw.lock.sct = $(window).scrollTop();
				$(".wrap>#container .contain , .wrap>.footer_iu").css({ "transform": "translateY(" + (-uiIsw.lock.sct) + "px)" });
				$("body.popMo .contain .popMoHd").css({ "transform": "translateY(" + (uiIsw.lock.sct - 54) + "px)" });
				$("body,body #wrap ").addClass("lock").css( "height" , $(window).height() );
				$("body,html").scrollTop(0);
			}
			if(opt === false) {
				this.stat = false;
				$(".wrap>#container .contain , .wrap>.footer_iu ,body.popMo .contain .popMoHd").css({ "transform": "" });
				$("body,body #wrap").removeClass("lock").css( "height" , "" );
				$("body,html").scrollTop(uiIsw.lock.sct);
			}
		}
	},
	datePick:{ // 달력피커 jQuery-ui
		init:function(){
			$(".uiDatePick").length && this.using();
			$(".uiDatePick input[type='text']").on("click",function(){
				// console.log("D");
				// this.blur();
				$(this).next("button").trigger("click");
			});
			$(".uiDatePick input").attr("title","날짜 입력");
			
			$(document).on("click",".uiDateRange .choice button",function(){
				if( !$(this).closest("li").hasClass("active") ){
					$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				}
			});
			$(".uiDatePick input").on("focus",function(){
				this.blur();
				$(".ui-datepicker").attr("tabindex","-1").focus();
			});

		},
		using:function(){
			$(".uiDatePick>input").datepicker({ 
				// minDate: '-3M',
      			// maxDate: '+28D',
				showOn: "button",
				changeYear:true ,
				changeMonth:true,
				showMonthAfterYear: true,
				dateFormat:"yy-mm-dd",
				yearRange: 'c-100:c+100',
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames: [ "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
				monthNamesShort: [ "01","02","03","04","05","06","07","08","09","10","11","12"],
				beforeShow: function(els) { 
					uiIsw.datePick.update();
					sted = $(els).closest(".uiDatePick").attr("class").replace(" ","").replace("uiDatePick","");

					$("#ui-datepicker-div").removeClass("st , ed").addClass(sted);

					if( $(window).outerWidth() <=640 ) {
						$(".ui-datepicker").wrap('<div class="uiDatePickWrap"></div>');
						var wd = $(".ui-datepicker").outerWidth();
						var hd = $(".ui-datepicker").outerHeight();
						//console.log(wd,hd);
						$(".ui-datepicker").css({
							"margin-left": -(wd*0.5), "margin-top": -(hd*0.5),
						});							
					}

					$(".ui-datepicker").attr("tabindex","-1").focus();
				},
				onChangeMonthYear:function(ddd){
					uiIsw.datePick.update();
					// console.log("달,년  변경");
				},
				onSelect:function(ddd){
					//
				},
				onClose:function(date,els){
					// console.log(date,els);
					// console.log("닫기");
					$("#"+els.id).focus();
					$(".ui-datepicker").unwrap(".uiDatePickWrap");
				}
			});

		},
		update:function(){
			window.setTimeout(function(){
				$(".ui-datepicker").wrapInner('<div class="in"></div>');
				$(".ui-datepicker-year").attr("title","년도 선택");
				$(".ui-datepicker-month").attr("title","월 선택");
			},1);
		}
	},
	tabNav: { // 탭형식컨텐츠 (메인)
		init: function() {
			//var uiTabNav = $(".uiTabNav:not([data-ui*='link'])");

			this.using();
			//console.log(  $urlParam['tab'] );
			uiIsw_iu.tabNav.set($urlParam['tab']);
		},
		set: function(id) {

			$(".uiTabNav>li>a[href='#" + id + "']").closest("li").addClass("active").siblings("li").removeClass("active");
			$(".uiTabNav>li>label>input[type='radio'][data-href='#" + id + "']").attr("checked", true).closest("li").addClass("active").siblings("li").removeClass("active");
			//console.log(id);
			$("#" + id).addClass("active").siblings(".panel").removeClass("active");

		},
		using: function() {

			$(document).on("click", ".uiTabNav:not([data-ui*='link'])>li>a", function(e) {
                $(this).closest("li").addClass("active").siblings("li").removeClass("active");
                var thisId = $(this).attr("href");
                var thisData = $(this).attr("data-tab-menu");
                //console.log(thisId);
                if(thisId.indexOf("#") > -1) {
                    $(thisId).addClass("active").siblings(".panel").removeClass("active");
                    e.preventDefault();
                }
                $("[data-tab-panel="+thisData+"]").addClass("active").siblings("[data-tab-panel]").removeClass("active");
			});

			$(document).on("change", ".uiTabNav>li input[type='radio']", function(e) {
				$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				var thisId = $(this).attr("data-href");
				//console.log(thisId);
				$(thisId).addClass("active").siblings(".panel").removeClass("active");
				e.preventDefault();
			});
		}
	},
	tooltip:{ // 툴팁  /resources/front/html/dp/list_dwe.jsp
		init:function(){
			$(document).on("click",".tooltipWrap .btnTip",function(){
				var	myTooltip = $(this).closest(".tooltipWrap");
				var $wid = myTooltip.find('.contTip').outerWidth();
				var $contX = -(($wid / 2) - 19);
				if(!myTooltip.hasClass('active')){
					myTooltip.addClass('active');
					myTooltip.find(".contTip").css({'margin-left': $contX});
				}else{
					myTooltip.removeClass('active');
				}
			});
			$(document).on("click",function(e){
				if(!$(".tooltipWrap" ).has(e.target).length){
					$(".tooltipWrap").removeClass("active");
				}
			});
		}
	},
    event:{ //19.08.19 추가
        init:function(){
			this.eventView.init();
			this.event181002.init();
			this.event190301.init();
			this.eventHomestyling.init();
		},
		eventView:{
			init:function(){//190819 워터케어 솔루션 이벤트 맵 클릭 시 하단 앵커 추가
				var exti = $(".contain.et.event.view .estiBox"),
					button = $(".contain.et.event.view #estimate_focus");
				button.on("click", function(){
					var estiTop = exti.offset().top;
					$("html, body").stop().animate({scrollTop: estiTop - 54}, 500)
				})
			}
		},
        event181002:{ //181002 홈쇼핑 이벤트 추가
            init:function(){				
                $(document).on("click", ".contain.et.event.view .post_wrap .more", function(){
                    var articleOpen = $(".contain.et.event.view .post_wrap .post_open");
                    if(!articleOpen.hasClass("open")){
                        $(this).parent().parent().next().addClass("open").css({"display":"block"});
                    }else{
                        $(this).parent().parent().next().removeClass("open").css({"display":"none"});
                    }  
                });
                if(typeof $('.contain.et.event.view .post_wrap map').imageMapResize == 'function') {
                    $('.contain.et.event.view .post_wrap map').imageMapResize();
				}
                $(document).on("click", ".contain.et.event.view .winning_pop", function(){
                    var popOpen = $(".contain.et.event.view .post_wrap .winning_pop_img");
                    var th = $(this).parent().parent().find(".winning_pop_img");
                    if(!popOpen.hasClass("on")){
                        th.addClass("on").show();
                        $(document).on("click", ".contain.et.event.view .mobile_pop_img", function(){
                            th.removeClass("on").hide();
                        });
                    } else{
                        th.removeClass("on").hide();
                    }
                });
                $(document).on("click", ".contain.et.event.view .channel_pop", function(){
                    var popOpen = $(".contain.et.event.view .post_wrap .channel_pop_img");
                    var th = $(this).parent().parent().find(".channel_pop_img");
                    if(!popOpen.hasClass("on")){
                        th.addClass("on").show(); 
                        $(document).on("click", ".contain.et.event.view .mobile_pop_img", function(){
                            th.removeClass("on").hide();
                        });
                    } else{
                        th.removeClass("on").hide();
                    }
                });
            }
		},
		event190301:{//인스테리어 건강 케어 솔루션 퀵영역
			init:function(){
				var exti = $(".contain.et.event.view .estiBox"),
					quick = $(".contain.et.event.view.et-0301 .quick");
				quick.on("click", function(){
					var estiTop = exti.offset().top;
					$("html, body").stop().animate({scrollTop: estiTop - 54}, 500)
				})
				$(window).on("scroll",function(){
					var target = quick;
					if ( !target.length > 0 ) return;
					
					var estiTop = exti.offset().top;
					var qh = quick.offset().top,
						qhHeigt = quick.height();
					if((qh + qhHeigt) >= (estiTop)) {
						quick.addClass("on");
					} else if ((qh + qhHeigt) < (estiTop)){
						quick.removeClass("on");
					} 
				})
			}
		},
		eventHomestyling:{//홈스타일 이벤트
			init:function(){
				//before & after
				var $beforeAfter = $("main.homestyling #section1 .slide li");
				if(!$beforeAfter.length > 0){
					return false
				} else {$beforeAfter.twentytwenty({
					move_with_handle_only: true,
					no_overlay: true
				});}

				//button click 시 before & after 변경
				var $slide = $("main.homestyling #section1 .slide"),
					$slideImg = $("main.homestyling #section1 .slide li"),
					$slidePrev = $("main.homestyling #section1 .arrow_button .prev"),
					$slideNext = $("main.homestyling #section1 .arrow_button .next");
				var slideNum = 1;
				
				$slideNext.on('click', function(){
					$slideImg.removeClass('on');
					slideNum++;
					if(slideNum > $beforeAfter.length) {
						slideNum = 1;
					}
					$slide.find(".slide_img" + slideNum).addClass('on');
					$(window).trigger("resize.twentytwenty");
				});

				$slidePrev.on('click', function(){
					$slideImg.removeClass('on');
					slideNum--;
					if(slideNum <= 0) {
						slideNum = $beforeAfter.length;
					  }
					  $slide.find(".slide_img" + slideNum).addClass('on');
					$(window).trigger("resize.twentytwenty");
				});

				var $homestylingSlider = $('main.homestyling .tab_panel .slide');
				$homestylingSlider.slick({
					mobileFirst:true, 
                    autoplay:false,
                    infinite:true,
                    arrows:false,
                    draggable: true,
                    swipe:true,
                    speed: 300,
                    slidesToShow: 1,
					slidesToScroll: 1,
					dots:true,
                    responsive: [
                         {
							breakpoint: 640,
							settings: "unslick"
						}
					]
				})

				$(window).on('resize orientationchange', function() {
					if(!$homestylingSlider.hasClass('slick-initialized')){
						$homestylingSlider.slick({
						mobileFirst:true, 
							autoplay:false,
							infinite:true,
							arrows:false,
							draggable: true,
							swipe:true,
							speed: 300,
							dots:true,
							slidesToShow: 1,
							slidesToScroll: 1,
							responsive: [
								{
									breakpoint: 640,
									settings: "unslick"
								}
							]
						});
					}
				});

				

				//image click시, 큰 image 변경 및 랜덤
				var $con = $("main.homestyling #section3 .box .event_img_tab li"),
					$imgTab = $('main.homestyling #section3 .box .event_img_tab a');
					num = $con.length,
					ran = Math.floor(Math.random() * num);
				$con.eq(ran).addClass("on").siblings("li").removeClass("on");
				var aId = $('main.homestyling #section3 .box .event_tab.on a').attr("id");
				var $tabID = $('main.homestyling #section3 li'+ aId);
				//console.log(num, ran, aId, $tabID)
				if (aId.indexOf('#') > -1) {
					$tabID.addClass('on').siblings('.cont').removeClass('on');
				}
				            
				$imgTab.on('click', function () { 
					$(this).closest('li').addClass('on').siblings('li').removeClass('on');
					var thisID = $(this).attr("id"),
						$thisTabID = $('main.homestyling #section3' + ' ' + thisID);
						if (thisID.indexOf('#') > -1) {
                            $thisTabID.addClass('on').siblings('.cont').removeClass('on');
                        }
				});	
				
				$(".contain.event .phone .n2").keyup(function () {
					if (this.value.length == this.maxLength) {
						  $(".contain.event .phone .n3").focus();
					}
				});
	
				$(".contain.event .phone select.n1").on("change", function () {
					$(this).focusout()
					$(".contain.event .phone .n2").focus();
				});

				  //상담신청 click시, 하단 앵커
				  var $estiButton = $('main.homestyling #event_submit');
				  $estiButton.on('click', function(){
					var estiBoxTop = $('main.homestyling .estiBox').offset().top;
					$("html, body").stop().animate({scrollTop: estiBoxTop - 55 }, 500)
				})	
			}
		}
    },
    fb: {// 페북 트래픽광고
        init:function(){
            var that = this;
            $(that.landing.fbVisual.els).length && that.landing.fbVisual.using();
            $(that.landing.fbEsti.els).length && that.landing.fbEsti.using();
            $(that.landing.fbPort.els).length && that.landing.fbPort.using();
            this.rolling.init();
        },
        landing:{ // 페북 트래픽광고 랜딩페이지 상단 비주얼
        	fbVisual:{
	            els:"section.fsect.visual .slide",
	            opt:{
	                autoplay:true,
	                autoplaySpeed:2000,
	                infinite:true,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                arrows:false,
	                speed: 400,
	                slide:'div',
	                fade: true,
	                cssEase: 'linear',
	                draggable: false,
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                dots:true
	            },
	            using:function(){
	                this.slide = $(this.els).slick(this.opt);
	            }
        	},
        	fbEsti:{ // 페북 트래픽광고 랜딩페이지 견적
        		els:"section.ext_slide .est .slide",
	            opt:{
	                autoplay:true, 
			        autoplaySpeed:2500,
			        pauseOnHover:false,
			        infinite:true,
			        slidesToShow: 2,
			        slidesToScroll: 2,
			        vertical: true,
			        verticalSwiping: true,
			        arrows:false,
			        draggable: false,
			        swipe:false,
			        speed: 500,
			        adaptiveHeight:true,
			        responsive: [
			            {
			                breakpoint: 640,
			                settings: {
			                    slidesToShow:2,
			                    slidesToScroll:2,
			                }
			            }
			        ]
	            },
	            using:function(){
	                this.slide = $(this.els).slick(this.opt);
	            }
        	},
        	fbPort:{ // 페북 트래픽광고 랜딩페이지 포트폴리오
        		els:"section.ext_box .panel_box .slide",
        		opt:{
        			autoplay:true,
			        autoplaySpeed:3000,
			        infinite:true,
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        arrows:false,
			        speed: 500,
			        cssEase: 'linear',
			        pauseOnFocus: false,
			        pauseOnHover: true,
			        dots:true,
			        responsive: [
			            {
			                breakpoint: 768,
			                settings: {
			                    slidesToShow:2,
			                    slidesToScroll:2
			                }
			            },
			            {
			                breakpoint: 640,
			                settings: {
			                    slidesToShow: 1,
			                    slidesToScroll: 1,
			                    centerMode:true,
			                    centerPadding:"45px",
			                    dots:false,
			                    speed: 200,
			                }
			            }
			        ]
        		},
	            using:function(){
	                this.slide = $(this.els).slick(this.opt);
	            }
        	}
        },
        rolling:{
        	init: function(){
        		$("section.ext_visual .slick-dots li #slick-slide-control00").text("인스테리어 자신감");
			    $("section.ext_visual .slick-dots li #slick-slide-control01").text("디자인 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control02").text("안심 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control03").text("가격 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control04").text("원스탑 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control05").text("기업 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control06").text("고객 Power");
			    $("section.ext_visual .slick-dots li #slick-slide-control07").text("진정성 Power");
        	}
        }
    }
};


uiIsw.init();