//main js
$(document).ready(function(){
	
	accToggleBox();
	switchTab();
	blindAcc();
	layerBtmType();
	alramChange();

});

function bannerSlide() {
	var swiper = new Swiper('.main_banner .swiper-container', {
		loop:true,
    observer:true,
    observeParents:true,
		pagination:{
			el:'.swiper-pagination'
		},
		autoplay:{
			delay : 3000,
			disableOnInteraction:false,
		}
	});

	setTimeout(function(){
		swiper.init();
		swiper.update();
	}, 100);
}

function bannerSlide2() {      
	var bannerListLeng = $(".main_banner .swiper-slide").length;
	if(bannerListLeng > 1) {
		var myswiper = new Swiper('.main_banner .swiper-container', {
			slidesPerView: 1,
			spaceBetween: 10,
			a11y: {
				enabled: true,						
			},
			autoplay: {
				delay: 3500,
				disableOnInteraction:true,
			},					
			loop:true,					
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				type: 'bullets',						
			},					
			on: {
				init: function() {
					var slideCount = this.activeIndex + 1;
					var slideCountTotal = $(".main_banner").find('.swiper-slide').length;							
					$(".main_banner").find('.swiper-slide').prop('tabindex' , '-1').attr({'role': 'button', 'aria-hidden': 'true'});
					$(".main_banner").find('.swiper-slide').eq(this.activeIndex).prop('tabindex' , '0').attr('aria-hidden' , 'false');
					$(".swiper-play-stop").find(".swiper-control").hide();
					var btnPlay = $(".swiper-play-stop").find(".swiper-control.play").attr({"aria-label": "슬라이드 시작"});
					var btnStop = $(".swiper-play-stop").find(".swiper-control.stop").attr({"aria-label": "슬라이드 정지"});
					btnStop.show();
					btnPlay.on("click", function(e){
						myswiper.autoplay.start();
						$(this).hide();
						btnStop.show().focus();
						e.preventDefault();
					});
					btnStop.on("click", function(e){
						myswiper.autoplay.stop();
						$(this).hide();
						btnPlay.show().focus();
						e.preventDefault();
					});
					$(".main_banner").find('.swiper-slide a').on("focusin", function(e){
						var banIndex = $(this).parent().index();
						myswiper.slideTo(banIndex);
						e.preventDefault();
					});
				},
				slideChange: function() {
					var slideCount = this.activeIndex + 1;
					var slideCountTotal = $(".main_banner").find('.swiper-slide').length;							
					$(".main_banner").find('.swiper-slide').prop('tabindex' , '-1').attr({'role': 'button', 'aria-hidden': 'true'});
					$(".main_banner").find('.swiper-slide').eq(this.activeIndex).prop('tabindex' , '0').attr('aria-hidden' , 'false');
					$(".main_banner").find('.swiper-slide a').on("focusin", function(e){
						var banIndex = $(this).parent().index();
						myswiper.slideTo(banIndex);
						e.preventDefault();
					});
				},						
			},					
			//continuous:true
		});
	}else{
		$(".main_banner").find('.swiper-paginate').hide();
	}
}

function accToggleBox() {
	//toggle
	$('a.account_open').attr("aria-expanded", "false");
	$('a.account_open').find('span').text("닫기");
	$('a.account_open.on').attr("aria-expanded", "true");
	$('a.account_open.on').find('span').text("열기");
	$('a.account_open').each(function(){
		$(this).on('click',function(e){
			e.preventDefault();
			$(this).next('.toggle_info').focus();
			$(this).toggleClass('on').attr("aria-expanded", "true");
			$(this).find('span').text("열기");
			$(this).next('.toggle_info').toggleClass('close');
			$(this).prev('.account_state').toggleClass('on');
			if($(this).hasClass("on")==false){
				$(this).attr("aria-expanded", "false");
				$(this).find('span').text("닫기");
				$(this).next('.toggle_info').removeClass('close');
				$(this).prev('.account_state').removeClass('on');
			}
			$(this).next('.toggle_info').slideToggle(300);
		});
	});
}

function switchTab() {
	//탭
	$('.tab_wrap').each(function(){
		$(".switch_tab button.on").attr("aria-selected","true").siblings().attr("aria-selected","false");
		$(".tab_wrap > .tabcon:first-child").attr("aria-expanded", "true");
		$(".switch_tab button").click(function(){
			$(this).addClass("on").attr("aria-selected","true").siblings().removeClass("on").attr("aria-selected","false");
			
			var txt = $(this).text();
			var onTab = $(this).attr("name");
			var onTabSum = $("#"+ onTab).show().find('.balance:visible').html();
			$("#"+ onTab).show().attr("aria-expanded", "true").siblings().hide().attr("aria-expanded", "false");

			//console.log(onTabSum);
			
			$(this).parents('.account_con').find('.account_state .tab_sel').text(txt);
			if( onTabSum == null ){
				$(this).parents('.account_con').find('.account_state p').addClass('no_data');
				$(this).parents('.account_con').find('.account_state .sum').html('계좌 내역이 없습니다.');
			} else {
				$(this).parents('.account_con').find('.account_state p').removeClass('no_data');
				
				if($("#"+onTab).find(".total_box").find(".dimmed_loading").length == 0){
					$(this).parents('.account_con').find('.account_state .sum').html(onTabSum);
				}
			}
		});
	});
}

function blindAcc() {
	$('.blind_chk input:checkbox').each(function(){
		if($(this).prop('checked') == false){
			$(this).next().find('span').text('계좌 보기');
			
			$(this).parents('.account_con').find('.toggle_info > *:not(.blind_state)').hide();
			$(this).parents('.account_con').find('.account_state p span:not(.sum)').hide();
			$(this).parents('.account_con').find('.account_state .sum').html('계좌 숨김상태 입니다.');
		}

		$(this).click(function(){
			if($(this).prop('checked') == true){
				var onTab = $(this).parents('.account_con').find('.switch_tab button.on').attr("name");
				var onTabSum = $("#"+ onTab).show().find('.balance').html();

				$(this).next().find('span').text('계좌 숨기기');
				$(this).parents('.account_con').find('.toggle_info > *:not(.blind_state)').show();
				$(this).parents('.account_con').find('.toggle_info > .blind_state').hide();
				$(this).parents('.account_con').find('.account_state p span:not(.sum)').removeAttr('style');
				$(this).parents('.account_con').find('.account_state .sum').html(onTabSum);
			} else {
				$(this).next().find('span').text('계좌 보기');
				$(this).parents('.account_con').find('.toggle_info > *:not(.blind_state)').hide();
				$(this).parents('.account_con').find('.toggle_info > .blind_state').show();
				$(this).parents('.account_con').find('.account_state p span:not(.sum)').hide();
				$(this).parents('.account_con').find('.account_state .sum').html('계좌 숨김상태 입니다.');
			}
		});
	});
}

function layerBtmType() {
	//레이어 팝업
	$('.bookmark_sheet').click(function(){
		$('.layer_bottom').show();
		$('html').css('overflow','hidden');
		setTimeout(function(){
			$('.layer_bottom').addClass('active');
			$('.layer_bt_dim').fadeIn();
		}, 300);
	});

	$('.bookmark_set .nav_open').click(function(e){
		e.preventDefault();

		var $this = $(this).next('.layer_bottom');
		//var acc_tit = $(this).parents('.top').next('.acc_name').text();

		$this.show();
		//$this.find('.tit').text(acc_tit);
		$('html').css('overflow','hidden');
		setTimeout(function(){
			//console.log(this);
			$this.addClass('active');
			$('.layer_bt_dim').fadeIn();
		}, 300);
	});


	$(".layer_close").click(function(e){
		e.preventDefault();
		$('.layer_bottom').removeClass('active');
		$('.layer_bt_dim').fadeOut();
		$('html').removeAttr('style');
		$(this).parents('.bookmark_set').find('.nav_open').attr('aria-hidden','false');
		setTimeout(function(){
			$('.layer_bottom').hide();
		}, 500);
	});
}

function alramChange() {
	//알림함
	$(".alram_scroll a").click(function(e){
		e.preventDefault();

		var alramHeight = $('.branch_list .list_alram li:first-child').innerHeight();

		$(this).toggleClass('open');
		if($(this).hasClass('open') == true){
			$('.branch_list').css('height', alramHeight);
		} else {
			$('.branch_list').css('height','75vh');
			
		}
	});
}

function icMainSwiper() { 
	var slides_count = $('.swiper_on .swiper-slide');
	var slides_count_dub = $('.swiper_on .swiper-slide-duplicate');
	var icSwiper = new Swiper('.ecb_ic_main_wrap .swiper-container.swiper_on', {
		loop: true,
		observer: true,
		observeParents: true,
		pagination: {
			el: '.swiper-pagination'
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		on: {
			slideChange: function(){
				var offer = document.querySelector('#numberSlides');
				offer.innerHTML = '<strong>' + (this.realIndex + 1) + '</strong>' + '/' + (slides_count.length - slides_count_dub.length);
			}
		}
	});

	setTimeout(function () {
		icSwiper.init();
		icSwiper.update();
	}, 100);

	$('.ic_swiper .swiper-button-start').click(function () {
		$(this).next().show();
		$(this).next().focus();
		$(this).hide();
		icSwiper.autoplay.start();
	});

	$('.ic_swiper .swiper-button-stop').click(function () {
		$(this).prev().show();
		$(this).prev().focus();
		$(this).hide();
		icSwiper.autoplay.stop();
	});
}