// 스와이퍼 ie11대응
if (!Math.sign) Math.sign = function(x) { return ((x > 0) - (x < 0)) || +x; };
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

var ui = {
  o: {
    direction: '',
    scrollDirection: ''
  },
  init: function () {
    this.gnb.init();
    this.appendField.init();
    this.accordion.init();
    this.tab.init();
    this.datepicker.init();
    this.selectBox.init();
    this.tooltip.init();
    this.inputbox.init();
    this.categoryFilters.init();
    this.modal.init();
    this.sideModal.init();
    this.anchorLink.init();
    this.addEvents.init();
    this.search.init();

    if($('.order-detail').length > 0) { this.cart.init(); }
    if($('.bread-crumb').length > 0) { this.breadCrumb.init(); }
    if($('.mainswiper').length > 0) { this.mainSwiper.init(); }
    if($('.wells-special').length > 0) { this.wellsSpecialSwiper.init(); }
    if($('.membership').length > 0) { this.membershipSwiper.init(); }
    if($('.masonry').length > 0) { this.mediaList.init(); }
    if($('.history').length > 0) { this.history.init(); }
    if($('.wave1').length > 0) { this.mainScrollTrigger.init(); }
    if($('.product-sticky').length > 0) { this.productSticky.init(); }
    if($('.review-list').length > 0) { this.reviewListMasonry.init(); }
    if($('[data-customselect').length > 0) { this.customSelect.init(); }
    if($('#thumb-btns').length > 0) { this.thumbSwiper.init(); }
  },
  // 개발에서 리소스 업데이트 후 사용함
  refresh: {
    // 제품 상세 페이지
    productDetail: function() {
      ui.thumbSwiper.init();
      ui.selectBox.init();
      ui.tab.init();
      ui.productSticky.init();
    }
  },
  compareBtn: {
    remove: function(_btnEl) {
      var $this = $(_btnEl),
          $li = $this.closest('li'),
          width = $li.outerWidth(true),
          $compareWrap = $('.compare-wrap');

      gsap.to($compareWrap, {
          width: '-=' + width,
          duration: 0.2,
          onStart: function() {
              $li.remove();
          }
      });
    }
  },
  search: {
    init: function() {
      var $html = $('html'),
          $header = $('header'),
          $searchPanel = $header.find('.search-panel');

      $header
        .on('mouseenter', '.shortcut-menus .search', function(e) {
          //e.preventDefault();
          $header.addClass('search-over');
        })
        .on('mouseleave', function() {
          $header.removeClass('search-over');
        })
        .on('click', '.shortcut-menus .search', function(e) {

          // 서치패널이 열려 있다면 무시함
          if($header.hasClass('search-opened')) return;

          $html.css({
            overflow: 'hidden',
            position: 'fixed',
            left: 0,
            right: ($html.width() > 1480) ? '0' : 'auto',
            top: -$(window).scrollTop() + 'px',
            'margin-right': ui.util.getScrollBarWidth() + 'px'
          });

          $header.css({ right: ui.util.getScrollBarWidth() + 'px' });
          $searchPanel.css({ right: -ui.util.getScrollBarWidth() + 'px' });

          gsap.to($searchPanel, {
            y: '0%',
            duration: 0.5,
            ease: Power1.easeOut,
            onStart: function() {
              $header.addClass('search-opened');
              $html.find('body').prepend('<span class="search-dim"></span>');
              gsap.to($html.find('.search-dim'), {
                opacity: 1,
                duration: 0.2
              });
            },
            onComplete: function() {
              $html.find('.search-dim').one('click', function() {
                $('body').find('.search-panel .btn.close').click();
              });
            }
          });

          e.preventDefault();
        });

        $('body').on('click', '.search-panel .btn.close', function(e) {
          gsap.to($searchPanel, {
            y: '-150%',
            duration: 0.3,
            ease: Power1.easeIn,
            onComplete: function() {
              var scrollY = $html.position().top;

              $header.removeClass('search-opened').css({ right: 0 });
              $html.attr('style', '');
              $('html, body').scrollTop(Math.abs(scrollY));

              gsap.to($html.find('.search-dim'), {
                opacity: 0,
                duration: 0.2,
                onComplete: function() {
                  $html.find('.search-dim').remove();
                }
              });

              // reset input
              $header.find('.search-box input').val('');
            }
          });

          //e.preventDefault();
        });
    }
  },
  thumbSwiper: {
    init: function() {
      // 썸네일 스와이퍼
      var thumbSlider = new Swiper('#thumb-btns .swiper-container', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 16,
        direction: 'vertical',
        watchSlidesVisibility: true,
        // centeredSlides: true,
        navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
        },
        allowTouchMove: false,
        on: {
          click: function() {
            var targetIdx = $(this.clickedSlide).index();

            if($(this.clickedSlide).hasClass('btn-video')) return;

            // if ($(this.clickedSlide).nextAll('.btn-video').length) {
            //   targetIdx = targetIdx;
            // } else if ($(this.clickedSlide).prevAll('.btn-video').length) {
            //   targetIdx = targetIdx - 1;
            // }
            prdSlider.slideTo(targetIdx);
          }
        }
      });

      var prdSlider = new Swiper('#show-prd .swiper-container', {
          effect: 'fade',
          allowTouchMove: false,
          noSwiping: true
      });
    }
  },
  productSticky: {
    init: function() {
      var $header = $('header');
      
      $('.prd-details').imagesLoaded().done(function() {
        // prdSticky.refresh();
        makeDummyTab();
        $(window).trigger('scroll');
      });

      function makeDummyTab() {
        var $stickyTab = $('.product-sticky');

        $stickyTab
          .parent()
          .addClass('has-fixed')
          .prepend('<div class="dummy-tab" style="height: 60px"></div>')
      }

      var $stickyTab = $('.product-sticky'),
          $prdBody = $('.prd-body'),
          $stickyTabTop = $stickyTab.offset().top;

      function stickyTab(scrollTop, viewPortHeight) {
        var stickyTriggerPos = Math.abs($prdBody.offset().top),
            offsetY = 0;

        if(ui.o.direction === 'up') {
          if(scrollTop <= stickyTriggerPos - 90) {
            $stickyTab
              .removeClass('tab-fixed tab-down tab-up');
          }
        }
        if(ui.o.direction === 'down') {
          if(scrollTop >= stickyTriggerPos) {
            $stickyTab.addClass('tab-fixed');
          }
        }

        if($stickyTab.hasClass('tab-fixed')) {
          if(ui.o.direction === 'up') {
            // console.log('tab down');
            $stickyTab.removeClass('tab-up').addClass('tab-down');
          }
          if(ui.o.direction === 'down') {
            // console.log('tab up');
            $stickyTab.removeClass('tab-down').addClass('tab-up');
          }
        }
      }

      var $window = $(window),
          $stickyBottom = $('.sticky-bottom'),
          $footer = $('footer');

      $window.off('scroll').on('scroll', function(e) {
        var scrollTop = $window.scrollTop(),
            viewPortHeight = $window.height(),
            triggerPos = Math.floor($('.prd-head .btn-box').offset().top);

        // prdSticky.refresh();
        stickyTab(scrollTop, viewPortHeight);

        // 익스에서 append시 항상 보이는 현상이 있어서 수정 스크롤이 맨 위에 있을 때는 안보이게 수정
        if(scrollTop <= 0) $stickyBottom.removeClass('active');
        
        if(scrollTop >= triggerPos) {
          $stickyBottom.addClass('active');
        } else {
          $stickyBottom.removeClass('active');
        }

        if(scrollTop + viewPortHeight >= Math.floor($footer.offset().top)) {
          if(!$footer.find('.sticky-bottom').length > 0) {
            $footer.addClass('relative');
            $stickyBottom.addClass('append-to-footer');
            $stickyBottom.clone().prependTo('footer');

            if($footer.find('#stickyPurchaseBtn').text() === '주문하기') {
              $footer.find('#stickyPurchaseBtn').on('click.purchase', function() {
                goPurchase();
              })
            }
          }
        } else {
          $footer.find('.sticky-bottom').remove();
          $footer.removeClass('relative');
          $stickyBottom.removeClass('append-to-footer');
          $stickyBottom.find('#stickyPurchaseBtn').off('click.purchase');
        }
      });

      // 제품 상세보기 스티키 탭의 내용이 짧을 경우 스티키가 풀어지지 않는 현상 수정
      $('.tab-box a').on('click', function() {
        if($('.tab-box').hasClass('tab-fixed') && $('.prd-body').height() < 400) {
          gsap.to(window, {
            duration: 0.2,
            scrollTo: 700,
            onStart: function() {
              $('.product-sticky').removeClass('tab-fixed tab-down tab-up');
            }
          });
        }
        if ($('.tab-box').hasClass('tab-fixed')) {
            $('html, body').animate({
                scrollTop: $('.prd-body').offset().top + 'px'
            }, 300);
        }
      });
    }
  },
  mainScrollTrigger: {
    init: function() {
      gsap.to('.wave1 img', {
        scrollTrigger: {
          trigger: '.mainswiper',
          start: 'top 50',
          // end: '+=800',
          scrub: true,
          // markers: true
        },
        x: -1000,
        duration: 3
      });

      gsap.to('.wave2 svg path', {
        scrollTrigger: {
          trigger: '.wave2',
          start: 'top center',
          scrub: true
        },
        attr: {
          d: 'M 1920 2641.945 L 1917.346 2643.885 C 1729.102 2670.875 1495.619 2629.36 1493.645 2629.05 C 1147 2574.68 857.762 2469.57 711.275 2454.687 C 506.626 2433.896 305.871 2438.525 9.01 2468.575 L 0 2469.494 L 0 147.08 C 20.852 148.68 218.05 148.848 362.328 147.977 C 555.706 147.977 863.905 144.913 1013.773 144.21 C 1163.641 143.507 1203.484 145.158 1410.578 143.879 C 1547.26 143.036 1714.434 141.982 1913.963 137.647 L 1920 138.22 L 1920 2641.944 L 1920 2641.945 Z'
        },
        duration: 3
      });

      gsap.to('.wave3 svg path', {
        scrollTrigger: {
          trigger: '.wave3',
          start: 'top center',
          scrub: true
        },
        attr: {
          d: 'M 1920 199.985 L 1917.346 201.924 C 1723.51 201.21 1516.42 202.039 1496.144 202.102 C 1416.033 202.352 859.229 203.507 711.483 202.36 C 505.787 200.763 113.086 196.748 3.323 197.944 L 0 197.913 L 0 544.45 L 1920 544.45 L 1920 199.985 Z'
        },
        duration: 3
      });

      gsap.to('.wave4 svg path', {
        scrollTrigger: {
          trigger: '.wave4',
          start: 'top center',
          scrub: true
        },
        attr: {
          d: 'M 1920 2641.945 L 1917.346 2643.885 C 1729.102 2670.875 1495.619 2629.36 1493.645 2629.05 C 1147 2574.68 857.762 2469.57 711.275 2454.687 C 506.626 2433.896 305.871 2438.525 9.01 2468.575 L 0 2469.494 L 0 147.08 C 20.852 148.68 218.05 148.848 362.328 147.977 C 555.706 147.977 863.905 144.913 1013.773 144.21 C 1163.641 143.507 1203.484 145.158 1410.578 143.879 C 1547.26 143.036 1714.434 141.982 1913.963 137.647 L 1920 138.22 L 1920 2641.944 L 1920 2641.945 Z'
        },
        duration: 3
      });

      gsap.to('.wave5 svg path', {
        scrollTrigger: {
          trigger: '.wave5',
          start: 'top center',
          scrub: true
        },
        attr: {
          d: 'M 1920 2641.945 L 1917.346 2643.885 C 1729.102 2670.875 1495.619 2629.36 1493.645 2629.05 C 1147 2574.68 857.762 2469.57 711.275 2454.687 C 506.626 2433.896 305.871 2438.525 9.01 2468.575 L 0 2469.494 L 0 147.08 C 20.852 148.68 218.05 148.848 362.328 147.977 C 555.706 147.977 863.905 144.913 1013.773 144.21 C 1163.641 143.507 1203.484 145.158 1410.578 143.879 C 1547.26 143.036 1714.434 141.982 1913.963 137.647 L 1920 138.22 L 1920 2641.944 L 1920 2641.945 Z'
        },
        duration: 3
      });
    }
  },
  reviewListMasonry: {
    o: {},
    init: function() {
      this.o.reviewList = $('.review-list').masonry({
        itemSelector: '.review-box',
        gutter: 20,
        columnWidth: 285,
        horizontalOrder: true
      });

      this.o.reviewList.imagesLoaded().done(function() {
        ui.reviewListMasonry.o.reviewList.masonry();
      });
    },
    reloadItems: function() {
      this.o.reviewList.masonry('reloadItems');
    },
    layout: function() {
      this.o.reviewList.masonry();
    }
  },
  mediaList: {
    o: {},
    init: function() {
      this.o.mediaList = $('.masonry').masonry({
        itemSelector: '.grid-item',
        columnWidth: 380,
        gutter: 30,
        horizontalOrder: true
      });

      this.o.mediaList.imagesLoaded().progress(function() {
        ui.mediaList.o.mediaList.masonry();
      });
    },
    reloadItems: function() {
      this.o.mediaList.masonry('reloadItems');
    },
    layout: function() {
      this.o.mediaList.masonry();
    }
  },
  gnb: {
    init: function() {
      var $window = $(window),
          $header = $('header'),
          lastScrollTop = 0;

      $window.on('scroll', function(e) {
        var scTop = $window.scrollTop();

        // if(scTop > $header.outerHeight(true)) {
        //   $header.addClass('shy');
        // } else {
        //   $header.removeClass('shy');
        // }

        if(scTop > 2) {
          $header.addClass('ty2');
        } else {
          $header.removeClass('ty2');
        }

        if(scTop === 0) {
          $header.removeClass('shy').addClass('top');
        } else {
          $header.removeClass('top');
        }

        if(lastScrollTop > scTop) {
          // console.log('up');
          ui.o.scrollDirection = 'up';
        } else {
          // console.log('down');
          ui.o.scrollDirection = 'down';
        }

        lastScrollTop = scTop;
      });

      $('body').on('mousewheel DOMMouseScroll wheel', function(e){

        // 온라인 체험관 썸네일 슬라이더 예외처리
        if($(e.target).parents('.swiper-thumb').length > 0) return;
        // 셀렉트박스에서 스크롤시 예외처리
        if($(e.target).parents('.selectize-control').length > 0) return;
        // 모달박스에서 스크롤시 예외처리
        if($(e.target).parents('.modal').length > 0) return;
        // 맞춤 솔루션 보기에서 스크롤시 예외처리
        if($(e.target).parents('.side-modal').length > 0) return;
        // 개인정보 처리 방침 커스텀 셀렉트 박스 예외처리
        if($(e.target).parents('.slt-link').length > 0) return;
        // 아코디언 메뉴에서 예외처리
        if($(e.target).parents('.accordion').length > 0) return;
        
        if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail == 0) {
          if(e.originalEvent.deltaY > 0) {
            // console.log('Down');
            ui.o.direction = 'down';
            // $header.removeClass('is-up').addClass('shy');
            
            if($window.scrollTop() > $header.outerHeight(true)) {
              $header.removeClass('is-up').addClass('shy');
            }

            if($header.hasClass('nav-over')) {
              $header.removeClass('nav-over');
            }
          } else if(e.originalEvent.deltaY < 0){
            // console.log('Up');
            ui.o.direction = 'up';
            $header.addClass('is-up');
          }
        } else if (typeof e.originalEvent.wheelDelta == 'number') {
          if(e.originalEvent.wheelDelta < 0) {
            // console.log('Down');
            ui.o.direction = 'down';
            $header.removeClass('is-up').addClass('shy');

            if($window.scrollTop() > $header.outerHeight(true)) {
              $header.removeClass('is-up').addClass('shy');
            }

            if($header.hasClass('nav-over')) {
              $header.removeClass('nav-over');
              gsap.to($header.find('.expand'), {
                y: '-150%',
                duration: 0.3
              });
            }
          } else if(e.originalEvent.wheelDelta > 0) {
            // console.log('Up');
            ui.o.direction = 'up';
            $header.removeClass('shy');

            if($window.scrollTop() > 0) {
              $header.addClass('is-up');
            }
          }
        }
      });

      if($window.scrollTop() > 0) { $header.addClass('ty2'); }

      this.addEvents();
    },
    addEvents: function() {
      var $header = $('header'),
          $depth1 = $('nav a'),
          $depth2 = $('header .depth2'),
          $expand = $('header .expand'),
          inTween, outTween;
      
      $header.find('.shortcut-menus a').on('mouseenter', function() {
        $header.addClass('shortcuct-over');
      });
      $header.on('mouseleave', function() {
        $header.removeClass('shortcuct-over');
      });

      $depth1.on('mouseenter', function(e) {
        var $this = $(this),
            targetDepth2 = $this.data('nav');

        $depth1.removeClass('active');
        $this.addClass('active');
        $header.addClass('nav-over');

        inTween = gsap.to($expand, {
          y: 0,
          duration: 0.3,
          ease: Power1.easeOut,
          onStart: function() {
            if(outTween) {
              outTween.kill();
            }
            $header.addClass('nav-over');
          },
          onComplete: function() {
            // $header.addClass('nav-over');
          }
        });

        $depth2.each(function() {
          var $self = $(this);

          if($self.data('nav') === targetDepth2) {
            $self.show();
          } else {
            $self.hide();
          }
        });
      });

      $header.on('mouseleave', function() {
        $depth1.removeClass('active');

        outTween = gsap.to($expand, {
          y: '-150%',
          duration: 0.3,
          ease: Power1.easeIn,
          onStart: function() {
            if(inTween) {
              inTween.kill();
            }
          },
          onComplete: function() {
            $header.removeClass('nav-over');
          }
        });
      });
    }
  },
  addEvents: {
    init: function() {
      var $window = $(window);

      $('body').on('click', '[class*=btn]', function(e) {
        var $this = $(this);

        if($this.data('bind')) {
          $this.parents('.' + $this.data('bind')).toggleClass($this.data('toggleclass'));
        }

        //e.preventDefault();
      });

      $('body').on('click', '.prd-strongpoint .btn-box', function(e) {
        var $this = $(this),
            currentScrollTop = $window.scrollTop(),
            $prdStrongpoint = $this.parents('.prd-strongpoint');
        
        if($prdStrongpoint.hasClass('open')) {
          $this.text('제품 상세 더보기');
          $prdStrongpoint.removeClass('open');
          $this.trigger('updateST');
          $window.scrollTop($this.offset().top - 400);
        } else {
          $this.text('제품 상세 접기');
          $prdStrongpoint.addClass('open');
          $this.trigger('updateST');
          $window.scrollTop(currentScrollTop).trigger('scroll');
        }

        e.preventDefault();
      });

      $('body').on('click', 'a.disabled', function(e) {
        e.preventDefault();
      });
    }
  },
  membershipSwiper: {
    init: function() {
      var membershipSlide = new Swiper('.homecare-membership', {
        slidesPerView: 3,
        spaceBetween: 60,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      });
    }
  },
  wellsSpecialSwiper: {
    init: function() {
      if($('.wells-special .swiper-slide').length > 1) {
        var wellsSpecialSlide = new Swiper('.wells-special', {
          slidesPerView: 1.29,
          setWrapperSize: true,
          spaceBetween: 60,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        });
      } else {
        $('.wells-special').addClass('single');
      }
    }
  },
  mainSwiper: {
    init: function() {
      var mainSliderTitles = [],
          mainVisualSwiper = null,
          activePagingEl = null,
          player = null,
          imgTween = null,
          progressRate = 0,
          isPaused = false,
          isClicked = false,
          evtClosed = $.Event('closed', { relatedTarget: this }),
          playerOpt = {
            muted: true,
            controls: false,
            textTrackSettings: false
          };

      $('.mainswiper .swiper-slide').each(function(idx) {
        mainSliderTitles[idx] = $(this).data('tit');
      });

      $('.mainswiper video').each(function() {
        var $this = $(this);
        $this.parent().prepend('<span class="video-bg"><video src=' + $this.attr('src') + '></video></span>');
      });

      mainVisualSwiper = new Swiper('.mainswiper', {
        autoplay: false,
        loop: true,
        init: false,
        simulateTouch: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
              return '<span class="' + className + '"><span class="pagenation-tit">' + mainSliderTitles[index] + '<em><i class="progress"></i></em></span></span>';
            }
        }
      });

      mainVisualSwiper.on('init', function() {
        $('.mainswiper').addClass('init');
        activePagingEl = mainVisualSwiper.pagination.bullets[mainVisualSwiper.realIndex];
        slidePlayer(mainVisualSwiper.slides[mainVisualSwiper.activeIndex]);
        this.pagination.$el.append('<button class="btn control" type="button">정지</button>');

        mainVisualSwiper.on('slideChangeTransitionEnd', function() {
          var $prevSlide = $(mainVisualSwiper.slides[mainVisualSwiper.previousIndex]);
              activeIdx = mainVisualSwiper.activeIndex;

          if(player !== null) {
            resetPlayer($prevSlide);
          } else {
            resetImgPlayer();
          }

          activePagingEl = mainVisualSwiper.pagination.bullets[mainVisualSwiper.realIndex];
          slidePlayer(mainVisualSwiper.slides[mainVisualSwiper.activeIndex]);
        });

        mainVisualSwiper.on('slideChangeTransitionStart', function() {
          if($(mainVisualSwiper.slides[mainVisualSwiper.activeIndex]).find('video').length > 0) {
            $(mainVisualSwiper.slides[mainVisualSwiper.activeIndex]).addClass('loading');
          }
        });

        $(mainVisualSwiper.pagination.bullets).on('mouseenter', function() { pause(); });
        $(mainVisualSwiper.pagination.bullets).on('mouseleave', function() {
          if(isPaused) return;
          play();
        });

        $('.mainswiper .btn-box').on('mouseenter', function() { pause(); });
        $('.mainswiper .btn-box').on('mouseleave', function() {
          if(isPaused) return;
          if(isClicked) return;
          play();
        });

        $('.mainswiper .btn-box').on('click', function() {
          pause();
          isClicked = true;
        });

        $('.mainswiper .btn-box').on('closed', function() {
          play();
          isClicked = false;
        });

        $('.mainswiper').on('click', '.control', function() {
          var $this = $(this);
          
          if(!isPaused) {
            if(player !== null && !player.paused()) {
              player.pause();
              $this.addClass('paused');
              isPaused = true;
            }
  
            if(imgTween !== null && !imgTween.paused()) {
              imgTween.pause();
              $this.addClass('paused');
              isPaused = true;
            }

            $this.text('재생');
          } else {
            if(player !== null && player.paused()) {
              player.play();
              $this.removeClass('paused');
              isPaused = false;
            }
  
            if(imgTween !== null && imgTween.paused()) {
              imgTween.play();
              $this.removeClass('paused');
              isPaused = false;
            }

            $this.text('정지');
          }
          
        });

        function play() {
          if(player !== null) {
            player.play();
          } else {
            imgTween.play();
          }
        }

        function pause() {
          if(player !== null) {
            player.pause();
          } else {
            imgTween.pause();
          }
        }
      });

      mainVisualSwiper.init();

      function slidePlayer(_slide) {
        var $activeSlide = $(_slide);

        if($activeSlide.find('.wrap > video').length > 0) {
          makeVideoPlayer($activeSlide.find('.wrap > video'), $activeSlide);
        } else {
          makeImgPlayer($activeSlide);
        }
      }

      function makeImgPlayer(_$activeSlide) {
        imgTween = gsap.to($(activePagingEl).find('.progress'), {
          width: '100%',
          duration: 7,
          onStart: function() {
            if(isPaused) {
              this.pause().seek(0);

              setTimeout(function() {
                $(activePagingEl).find('.progress').css({
                  width: '0'
                });
              }, 20);
            }
          },
          onComplete: function() {
            mainVisualSwiper.slideNext();
          }
        });
      }

      function resetImgPlayer() {
        if(imgTween !== null) {
          imgTween.kill();
        }
        imgTween = null;
        progressRate = 0;
        setProgress();
      }

      function makeVideoPlayer(_videoEl, _activeSlide) {
        var $video = $(_videoEl),
            $activeSlide = _activeSlide,
            duration = 0;

        player = videojs($video.get(0), playerOpt);
        player.src({type: 'video/mp4', src: $video.attr('src')});

        player.ready(function() {
          player.muted(true);

          if(!isPaused) {
            player.play();
          }

          player.on('canplay', function() {
            duration = this.duration();
            $activeSlide.removeClass('loading');

            player.on('timeupdate', function() {
              updateProgress(this.currentTime());
            });
          });

          player.on('ended', function() {
            resetPlayer($activeSlide);
            mainVisualSwiper.slideNext();
          });

          function updateProgress(_currentTime) {
            var progress = _currentTime / duration;

            progressRate = progress * 100;
            setProgress();
          }
        });
      }

      function resetPlayer(_$activeSlide) {
        var currentSrc = player.currentSrc(),
            $activeSlide = _$activeSlide;

        player.dispose();
        player = null;

        $('.mainswiper .swiper-slide').each(function(idx) {
          var $this = $(this),
              src = $this.find('.video-bg video').attr('src');

          $this.find('.wrap > video').remove();
          $this.find('.wrap').append('<video src=' + src + '></video>');
        });

        progressRate = 0;
        setProgress();
      }

      function setProgress() {
        $(activePagingEl).find('.progress').css({
          width: progressRate + '%'
        });
      }
    }
  },
  anchorLink: {
    init: function() {
      $('.slt-link')
        .on('click', 'button', function(e) {
          $(this).parent().toggleClass('open');
          // e.preventDefault();
        })
        .on('mouseleave', function(e) {
          $(this).removeClass('open');
          // e.preventDefault();
        });
    }
  },
  sideModal: {
    init: function() {
      $('body').on('click', 'button[data-sidemodalid], a[data-sidemodalid]', function() {
        var $this = $(this),
            sideModalID = $this.data('sidemodalid');
        
        ui.sideModal.open(sideModalID);
      });
    },
    open: function(_modalID) {
      var $targetSideModal = $('.side-modal[data-sidemodalid=' + _modalID + ']'),
          $html = $('html');
      
      $html.addClass('side-modal-opened');
      $html.css({
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        'max-width': '100%',
        'margin-right': ui.util.getScrollBarWidth() + 'px'
      });

      gsap.to($targetSideModal, {
        x: '-100%',
        duration: 0.5,
        ease: Power2.easeOut,
        onComplete: function() {
          $targetSideModal.find('.btn.close').one('click', function() {
            ui.sideModal.close(_modalID);
          });

          setTimeout(function() {
            new SimpleBar($targetSideModal.find('.scroll')[0]);
          }, 200);
          
        }
      });
    },
    close: function(_modalID) {
      var $targetSideModal = $('.side-modal[data-sidemodalid=' + _modalID + ']'),
          $html = $('html');

      gsap.to($targetSideModal, {
        x: '0',
        duration: 0.3,
        // ease: Power1.easeIn,
        onStart: function() {
          $html.attr('style', '');
          $('.mainswiper').find('.swiper-slide-active .btn-box').trigger('closed');
        },
        onComplete: function() {
          $html.removeClass('side-modal-opened');
        }
      });
    }
  },
  util: {
    getScrollBarWidth: function() {
      var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
            widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    },
    getCheckedFilters: function(_El) {
      var $filterWrap = $(_El),
          filterArray = [];
          
      $filterWrap.find('.radio-wrap').each(function() {
        var $this = $(this);

        // 첫번째 체크박스는 전체 보기임
        if($this.find('label').eq(0).hasClass('checked')){
          // 모두 가져옴
          getActiveCheckBox($this, true);
        } else {
          // 각자 가져옴
          getActiveCheckBox($this, false);
        }
      });

      function getActiveCheckBox($radioWrap, flag) {
        $radioWrap.find('label').each(function(idx) {
          var $this = $(this),
          inputID = '';
          
          // console.log($this.find('input')); 
          if(flag) {
            if(idx === 0) {
              return true;
            } else {
              if($this.find('input').data('select') !== 'all') {
                inputID = $this.find('input').attr('id');
                filterArray.push(inputID);
              }
            }
          } else {
            if($this.hasClass('checked')) {
              inputID = $this.find('input').attr('id');
              filterArray.push(inputID);
            }
          }
        });
      }

      return filterArray;
    }
  },
  modal: {
    init: function() {
      $('body').on('click', 'button[data-modalid], a[data-modalid]', function(e) {
        var $this = $(this),
            modalID = $this.data('modalid');
            
        ui.modal.open(modalID);
        e.preventDefault();
      });

      $('body').on('click', '.modal', function(e) {
        if($(e.target).hasClass('modal')) {
          ui.modal.close($(this).data('modalid'));
        }
      });

      $('.modal[data-modalstate="opened"]').each(function() {
        var $this = $(this),
            modalId = $this.data('modalid');

        if(ui.modal.getCookie(modalId)) {
          ui.modal.open(modalId);
        }
      });
    },
    open: function(_modalId) {
      var $targetModal = $('.modal[data-modalid=' + _modalId + ']'),
          $window = $(window),
          $html = $('html'),
          $header = $('header'),
          headerClass = $header.attr('class'),
          right = ($html.width() > 1480) ? '0' : 'auto',
          scrollY = $window.scrollTop();

      if($targetModal.data('modal-type') === 'videoplayer') {
        var $videoWrap = $targetModal.find('#video-player'),
            videoId = $videoWrap.data('videoid'),
            ytSrc = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&controls=0&modestbranding=1',
            iframe = '<iframe type="text/html" width="720" height="405" src="' + ytSrc + '" frameborder="0" allowfullscreen>';
        
        $videoWrap.append(iframe);
      }

      $html.addClass('modal-opened');
      $html.css({
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        right: right,
        top: -scrollY + 'px',
        'max-width': '100%',
        'margin-right': ui.util.getScrollBarWidth() + 'px'
      });
      $header.css({
        'right': ui.util.getScrollBarWidth() + 'px'
      });

      if($('html').find('.brandstory-wells').length > 0) {
        $html.find('#section-indicator').hide();
        $('#bs-brand').css({
          'visibility': 'hidden'
        });
        $html.css({
          'margin-right': 0
        });
        $html.find('.brandstory-wells').css({
          'padding-right': ui.util.getScrollBarWidth() + 'px'
        });
      }

      gsap.to($targetModal, {
        opacity: 1,
        duration: 0.15,
        onStart: function() {
          $targetModal.css({ 'opacity': '0', 'display': 'flex' });
          $header.addClass(headerClass);
          if($targetModal.hasClass('event')) return;

          setTimeout(function() {
            var height = $targetModal.find('.wrap').outerHeight(true),
              limitHeight = 476;

            if(height > limitHeight) {
              $targetModal.find('.body').addClass('scroll');
              $targetModal.find('.body').css({'max-height': $targetModal.find('.m-con').outerHeight() - 154 + 'px'});
              new SimpleBar($targetModal.find('.body')[0]);
            }
          }, 100);
        },
        onComplete: function() {
          $targetModal.addClass('active');
          $targetModal.find('.btn.close').one('click', function() {
            ui.modal.close(_modalId);
          });

          $targetModal.find('.btn[data-closebtn]').one('click', function() {
            ui.modal.close(_modalId);
          });

          $targetModal.find('.btn[data-todayclose]').one('click', function() {
            ui.modal.setCookie(_modalId, 'done', 1);
            ui.modal.close(_modalId);
          });
        }
      });
    },
    close: function(_modalId) {
      var $targetModal = $('.modal[data-modalid=' + _modalId + ']'),
          $window = $(window),
          $html = $('html');

      gsap.to($targetModal, {
        opacity: 0,
        duration: 0.15,
        onComplete: function() {
          var modalLength = 0,
              scrollY = $html.position().top;

          $html.attr('style', '');
          $('header').css({ 'right': '0' });
          $('html, body').scrollTop(Math.abs(scrollY));
          $targetModal.css({ 'display': 'none' });
          $targetModal.removeClass('active');

          setTimeout(function() {
            $('.modal').each(function() {
              var $this = $(this);

              if($this.hasClass('active')) {
                modalLength += 1;
              }
            });
          }, 200);

          if(modalLength <= 0) {
            $('html').removeClass('modal-opened');

            if($targetModal.data('modal-type') === 'videoplayer') {
              $targetModal.find('iframe').remove();
            }
          }
          
          if($('html').find('.brandstory-wells').length > 0) {
            $('#bs-brand').css({
              'visibility': 'visible'
            });
            $html.find('#section-indicator').show();
            $html.find('.brandstory-wells').attr('style', '');
          }

          $targetModal.find('.btn.close').off('click');
          $targetModal.find('.btn[data-closebtn]').off('click');
          $targetModal.find('.btn[data-todayclose]').off('click');
        }
      });
    },
    setCookie: function(name, value, expiredays) {
      var todayDate = new Date();

      todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
      if ( todayDate > new Date() ) {  
        expiredays = expiredays - 1;  
      }
      todayDate.setDate( todayDate.getDate() + expiredays );   
      document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    },
    getCookie: function(_modalId) {
      var cookiedata = document.cookie;

      return cookiedata.indexOf(_modalId + "=done") < 0;
    }
  },
  breadCrumb: {
    init: function() {
      $('.bread-crumb > li > a').on('click', function(e) {
        var $this = $(this);
        
        if($this.siblings('.menu').length > 0) {
          var menu = $this.siblings('.menu');

          if($this.hasClass('active')) {
            $this.removeClass('active');
            gsap.to(menu, { opacity: 0, marginTop: 0, duration: 0.2, onComplete: function() {
              menu.css({ 'visibility': 'hidden' });
            } });
          } else {
            $this.addClass('active');
            gsap.to(menu, {
              opacity: 1,
              marginTop: 6,
              duration: 0.2,
              onStart: function() {
                menu.css({ 'visibility': 'visible' });
              },
              onComplete: function() {
                $('body').one('click', function() {
                  $('.bread-crumb > li > .active').click();
                });
              }
            });
              
          }
        }

        e.preventDefault();
      });
    }
  },
  categoryFilters: {
    init: function() {
      $('body').on('click', '[data-filter-tab] a[data-tabid]', function(e) {
        var $this = $(this),
            $filterWrapper = $this.parents('.tab-container').find('.filter-wrapper');

        $filterWrapper.each(function() {
          var $self = $(this);

          if($self.data('tabid') !== $this.data('tabid')) {
            $self.find('input[data-category=all]').click();
          }
        });

        // e.preventDefault();
      });
      $('body').on('click', '.filter-wrapper [data-category]', function(e) {
        var $categoryBtn = $(this);
            targetCategory = $categoryBtn.data('category'),
            targetHeight = 0,
            $target = null,
            maxHeight = 0,
            /*jshint -W030 */
            $otherTargets = null;

        if(targetCategory == 'all') {
          $otherTargets = getTargets($categoryBtn, targetCategory);
          gsap.to($otherTargets, {
            height: 0,
            duration: 0.3,
            onComplete: function() {
              resetFilter($otherTargets);
            }
          });
        } else {
          $target = $categoryBtn.parents('.filter-wrapper').find('[data-category=' + targetCategory + ']');
          $otherTargets = getTargets($categoryBtn, targetCategory);
          targetHeight = $target.find('.wrap').outerHeight(true);

          for(var i = 0; i < $otherTargets.length; i++) {
            maxHeight += $otherTargets[i].outerHeight();
          }

          if(maxHeight == 0) {
            gsap.to($target, { height: targetHeight, duration: 0.3 });
          } else {
            gsap.to($otherTargets, { height: 0, duration: 0.3, onComplete: function() {
              resetFilter($otherTargets);
              gsap.to($target, { height: targetHeight, duration: 0.3, onComplete: function() {
                // do stuff
              }});
            }});
          }
        }

      });

      function resetFilter(_otherTargets) {
        var resetFilterArr = _otherTargets;

        for(var i = 0; i < resetFilterArr.length; i++) {
          /*jshint -W083 */
          resetFilterArr[i].find('input').each(function() {
            var $this = $(this);

            if($this.data('select') === 'all') {
              $this
                .prop('checked', true)
                .parent()
                .addClass('checked');
            } else {
              $this
                .prop('checked', false)
                .parent()
                .removeClass('checked');
            }
          });
        }
      }

      function getTargets(_$categoryBtn, _targetCategory) {
        var tempArr = [];

        _$categoryBtn.parents('.filter-wrapper').find('.category-filters').each(function() {
          var $this = $(this);

          if($this.data('category') !== _targetCategory) {
            tempArr.push($this);
          }
        });

        return tempArr;
      }
    }
  },
  inputbox: {
    init: function() {
      $('input[type=checkbox]:checked, input[type=radio]:checked').each(function() {
        var $this = $(this);

        $this.parent().addClass('checked');
      });

      // for checkbox
      $('body').on('click', '[data-bind=checkbox] input[type=checkbox]', function() {
        var $this = $(this);
    
        checkboxAll($this);
        $this.parent().toggleClass('checked');
      });

      // for radio
      $('body').on('click', '[data-bind=radio] input[type=radio]', function() {
        var $this = $(this);

          $this.parents('[data-bind=radio]').find('input[type=radio]').each(function() {
            var $self = $(this);
  
            $self.prop('checked', false).parent().removeClass('checked');
          });
          $this.prop('checked', true).parent().addClass('checked');
      });

      function checkboxAll(_$this) {
        var $checkboxContainer = _$this.parents('[data-bind=checkbox]');

        // 전체선택 체크박스
        if($checkboxContainer.find('input[data-select=all]').is(_$this)) {
          if(_$this.prop('checked')) {
            $checkboxContainer
              .find('input')
              .prop('checked', false)
              .end()
              .find('label')
              .removeClass('checked');
            _$this
              .prop('checked', true)
              .parent();
          }
        } else {
          $checkboxContainer.find('input[data-select=all]')
            .prop('checked', false)
            .parent()
            .removeClass('checked');
        }
      }
    }
  },
  cart: {
    init: function() {
      ScrollTrigger.create({
        trigger: '.order-detail',
        start: 'top 90',
        end: function() {
          var offset = 224,
              orderHeight = $('.order-detail .order').outerHeight(true) + $('.order-detail .order-info').outerHeight(true) + $('.order-detail .order-total').outerHeight(true);

          return "+=" + ($('.orderer-info').outerHeight(true) - orderHeight - offset);
          // return "+=" + ($('.orderer-info').outerHeight(true) - $('.order-detail').outerHeight(true) - offset);
        },
        onEnter: function(scTrigger) {
          $(scTrigger.pin).addClass('sticky-start');
        },
        onUpdate: function(scTrigger) {
          if(scTrigger.progress === 0) {
            $(scTrigger.pin).removeClass('sticky-start');
          }
        },
        // markers: true,
        pin: true
      });
      
      setTimeout(function() {
        ScrollTrigger.refresh();
      }, 30);
    }
  },
  accordion: {
    init: function () {
      $('[data-accordion]').each(function() {
        var $openEl = $(this).find('[data-open]').length > 0 ? $(this).find('[data-open]') : $(this).find('.open'),
            $expand = $openEl.find('.expand'),
            expandHeight = $openEl.find('.wrap').outerHeight(true);

        // 최대 400이상일 경우 스크롤을 붙여줌
        if(expandHeight > 400) {
          if(!!!$(this).parents('.order-form').length) {
            expandHeight = 400;
            $expand.addClass('scroll');
          }
        }

        if($expand.find('.wrap > div').length === 1) {
          $expand.find('.wrap > div').each(function() {
            if($(this).is('.goods')) {
              $(this).parents('li').addClass('single');
            }
          });
        }

        gsap.to($expand, {
          height: expandHeight,
          duration: 0,
          onStart: function() {
            $openEl.addClass('open');
          }
        });
        });

      $('[data-accordion]').on('click', 'li > a, li > button', function (e) {
        var $this = $(this).parent(),
          $expand = $this.find('.expand'),
          expandHeight = 0;

        $expand.removeClass('scroll');
        expandHeight = $this.find('.wrap').outerHeight(true);
        
        if($(e.target).is('label, input, em, i, strong')) {
          if(!$(e.target).parent().hasClass('order')) {
            return;
          }
          }
          
        // 주문내역 상세보기 예외처리
        if(!!$('.order-detail').length) {
          // 
        } else {
          if($expand.find('.goods-info li').length > 2) {
            $expand.find('.wrap').addClass('scroll');
          }
        }

        if($this.hasClass('open')) {
          gsap.to($expand, {
            height: 0,
            duration: 0.2,
            onStart: function () {
              $this.removeClass('open');
            },
            onUpdate: function() {
              if($this.parents('body').find('.order-detail').length > 0) {
                ScrollTrigger.refresh();
              }
            },
            onComplete: function() {
              $expand.removeClass('scroll');
            }
          });
        } else {
          $this
            .parent()
            .find('.open')
            .each(function () {
              var $this = $(this);

              gsap.to($this.find('.expand'), {
                height: 0,
                duration: 0.2,
                onStart: function () {
                  $this.removeClass('open');
                },
                onUpdate: function() {
                  if($this.parents('body').find('.order-detail').length > 0) {
                    ScrollTrigger.refresh();
                  }
                }
              });
            });

          if(expandHeight > 400) {
            if(!!!$(this).parents('.order-form').length) {
              expandHeight = 400;
              $expand.addClass('scroll');
            }
          }

          gsap.to($expand, {
            height: expandHeight,
            duration: 0.3,
            onStart: function () {
              $this.addClass('open');
            },
            onUpdate: function() {
              if($this.parents('body').find('.order-detail').length > 0) {
                ScrollTrigger.refresh();
              }
            }
          });
        }

        // e.preventDefault();
      });
    }
  },
  selectBox: {
    init: function() {
      var zidx = $('select').length + 30;
      
      $('select').each(function() {
        var $this = $(this);

        if($this.hasClass('styled')) {
          return true;
        } else {
          $this.selectize({
            // create: true,
            dropdownParent: null,
            allowEmptyOption: true,
            onInitialize: function() {
              this.$wrapper.css({
                'z-index': zidx--
              });
            }
          });
          $this.addClass('styled');
        }
      });
    },
    
    /*
    ** 셀렉트 박스 옵션 새로넣을때 사용
    ** id -> string
    ** data -> object or array of object { value: value, text: string }
    **
    ** ex)
    ** ui.selectBox.addOption("tset", [{value: 1, text: 'whatever'}, {value: 2, text: 'whatever2'}]);
    */
    addOption: function(id, data) {
      var $el = $('#' + id).find('select');

      $el[0].selectize.clearOptions();
      $el[0].selectize.addOption(data);
    }
  },
  customSelect: {
    init: function() {
      $('body').on('click', '[data-customselect]', function(e) {
        var $this = $(this),
            $selectObj = $this.find('>ul');

        if($this.hasClass('open')) {
          gsap.to($selectObj, {
            bottom: -20,
            opacity: 0,
            duration: 0.2,
            onComplete: function() {
              $this.removeClass('open');
              setTimeout(function() {
                $selectObj.css({
                  'opacity': 1,
                  'display': 'none'
                });
              }, 200);
            }
          });
        } else {
          gsap.to($selectObj, {
            bottom: 0,
            opacity: 1,
            duration: 0.2,
            onStart: function() {
              $selectObj.css({
                'bottom': '-20px',
                'opacity': '1',
                'display': 'inline-block'
              });
              $this.addClass('open');
            }
          });
        }

        // e.preventDefault();
      });
    }
  },
  tab: {
    init: function() {
      $('[data-bind-tab]').each(function(e) {
        var $this = $(this),
            $tabHeader = $this.find('a'),
            $tabBody = $this.find('.tab-body'),
            targetTab = null;
        // reset
        $tabBody.find('[data-tabid]').hide();
        $tabHeader.each(function() {
          var $this = $(this);

          if($this.hasClass('active')) {
            targetTab = $this.data('tabid');
          }
        });
        
        showTabBody($this, targetTab);

        $tabHeader.on('click', function(e) {
          var $self = $(this);

          if($self.parents('.as-head').length > 0) return;

          $tabHeader.removeClass('active');
          $self.addClass('active');
          targetTab = $self.data('tabid');
          showTabBody($this, targetTab);

          e.preventDefault();
        });
      });

      // 제품 상세 탭
      $('[data-bind-tabactive]').on('click', 'a', function(e) {
        var $this = $(this);

        $this.parents('.tab-box').find('a').removeClass('active');
        $this.addClass('active');
        // e.preventDefault();
      });

      function showTabBody(_context, _target) {
        var $this = _context;

        $this.find('.tab-body [data-tabid]').each(function() {
          var $this = $(this);

          if($this.data('tabid') === _target) {
            $this.show();
          } else if($this.data('tabid') === undefined ) {
            $this.find('.tab-body [data-tabid]').hide();
          } else {
            $this.hide();
          }
        });
        
        if (_target == 'all') {
          $this.find('.tab-body [data-tabid]').show();
        }
      }

      $('.tab-btns').on('click', 'a', function(e) {
        var $this = $(this);

        $this.parent().siblings('li').find('a').removeClass('active');
        $this.addClass('active');
        e.preventDefault();
      });
    }
  },
  appendField: {
    init: function() {
      var elements = {},
          count = 0;

      $('[data-append]').each(function() {
        var $this = $(this),
            key = $this.data('append'),
            target = $this.data('copytarget');

        elements[key] = $this.find('tbody ' + target).clone()[0];
      });

      $('body').on('click', '[data-append] .btn', function(e) {
        var $this = $(this),
            key = $this.parents('.append-wrap').data('append'),
            maxNum = parseInt($this.parents('.append-wrap').data('max'));
        
        if($this.parents('.append-wrap').find('tbody tr').length >= maxNum) return;
        $this.parents('.append-wrap').find('tbody').append($(elements[key]).clone());
        ui.selectBox.init();
        e.preventDefault();
      });
    }
  },
  datepicker: {
    init: function() {
      
      $('.date-picker').find('input').each(function() {
        var $this = $(this);

        $this.datepicker({
          dateFormat: 'yy-mm-dd',
          dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
          monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
          changeMonth: true,
          changeYear: true,
          yearRange: 'c-100:c+5',
          minDate: ($this.data('mindate') !== undefined) ? new Date($this.data('mindate')) : null,
          maxDate: (($this.data('maxdate') !== undefined)) ? new Date($this.data('maxdate')) : new Date(new Date().getFullYear(), 11, 31),
          showMonthAfterYear: true,
          beforeShow: function(input, inst) {
            var $input = $(input),
                inputOffset = $input.offset(),
                inputWidth = $input.outerWidth(true),
                gab = 10,
                calendar = inst.dpDiv;

            setTimeout(function() {
              if($input.parents('.modal').length > 0) {
                $input.parent().append(calendar);
                calendar.css({
                  'position': 'absolute',
                  'top': '100%',
                  'left': 'auto',
                  'right': '0',
                  'margin-top': '10px',
                  'font-size': '16px',
                  'width': '266px'
                });
              } else {
                calendar.css({
                  top: inputOffset.top,
                  left: inputOffset.left + inputWidth + gab
                });
              }
            }, 20);
          }
        });
      });

      $('.date-picker').on('click', '.btn', function(e) {
        var $this = $(this);

        $this.parents('.date-picker').find('input').datepicker('show');
        // e.preventDefault();
      });
    }
  },
  tooltip: {
    init: function() {
      $('body').on('click', '.tooltip .btn', function(e) {
        var $this = $(this);

        if(!$this.parent().hasClass('active')) {
          $('.tooltip').removeClass('active');
        }

        if($this.parents('.associated-card').length > 0) {
          $this.parents('.associated-card').toggleClass('tooltip-open');
        } else {
          $('body').find('.associated-card').removeClass('tooltip-open');
        }

        $this.parent().toggleClass('active');
      
        var offsetLeft = $this.offset().left;
        var targetWidth = $this.find('.tip-txt').outerWidth(true);

        if(offsetLeft + targetWidth / 2 > $('html').width()) {
          $this.find('.tip-txt').addClass('shift-right');
        }

      });

      $('body').on('click', function(e) {
        var $target = $(e.target);

        if($target.parents('.tooltip').length > 0) {
          return;
        } else {
          $('.tooltip').removeClass('active');
          $('.tooltip').parents('.associated-card').removeClass('tooltip-open');
        }
      });
    }
  },
  history: {
    init: function() {
      var $history = $('.history').masonry({
        itemSelector: 'dd',
        columnWidth: 270,
        gutter: 40,
        horizontalOrder: true,
      });

      $history.on('layoutComplete', function() {
        $('.history').prepend('<dt class="year-copy"><span>' + $('.year').eq(0).text() + '</span></dt>');
        
        $('.year').each(function(idx) {
          var $this = $(this);

            $this.css({ top: $this.next().position().top, opacity: 0 });

            ScrollTrigger.create({
              trigger: $this,
              start: '-150',
              // markers: true,
              onEnter: function() {
                $('.year-copy span').text($this.text());
              },
              onEnterBack: function() {
                $('.year-copy span').text($this.text());
              }
            });
        });

        ScrollTrigger.create({
          tirgger: $('.history'),
          start: function(self) {
            var offsetY = $('header').position().top + 90;

            if( $(window).scrollTop() >= $('.history').offset().top) {
              // console.log('in');
            }

            // return '-=' + offsetY;
            return 'top 90px'
          },
          end: '+=' + ($('.history').outerHeight(true) - 330),
          pin: $('.history').find('.year-copy'),
          onEnter: function(scrolltrigger) {
            $(scrolltrigger.pin).addClass('start-sticky');
          },
          onUpdate: function() {
            ScrollTrigger.update();
          }
        });

        ScrollTrigger.refresh();
      });

      $history.imagesLoaded(function() {
        $history.masonry();
      });
      
    }
  },
  loading: {
    show: function(){
      var $target = $('body');
      var $wrap = $('<div class="loader-wrap"></div>').appendTo($target);
      var $inner = '<div class="loader-inner">';
      $inner += '<div class="loader-box">';
      $inner += '<span></span>';
      $inner += '<span></span>';
      $inner += '<span></span>';
      $inner += '</div>';
      $inner += '</div>';

      $wrap.append($inner);
    },
    hide: function(){
      var $target = $('body');
      $target.find('.loader-wrap').addClass('fade-out');
      setTimeout(function(){
        $target.find('.loader-wrap').remove();
      }, 1000);
    }
  }
};

$(function () {
  ui.init();
});
