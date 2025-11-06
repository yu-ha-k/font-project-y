(function ($) {
	const $DOC = $(document);
	const $WIN = $(window);

	// open menu notice swiper
	if ($("#notice_swiper").find(".swiper-slide").length > 1) {
		const noticeSwiper = new Swiper("#notice_swiper", {
			direction: "vertical",
			loop: true,
			slidesPerView: 1,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
		});
	}

	// selectbox change
	$DOC.on("change", ".display_change", function () {
		const $value = $(this).val();
		$(this).closest(".comp_wrap.email").find(".direct").hide();
		if ($(this).val() === "direct") {
			$(this).closest(".comp_wrap.email").find(".direct").show();
		}
	});

	// input button delete
	// 인풋 del 기능 관련 스크립트
	$DOC.on("focus", ".input > input, .input > .del", function () {
		// focus
		const $this = $(this);
		const $wrap = $(this).parent();
		const $inputForm = $wrap.closest(".input_form");
		const $del = $wrap.find(".del");
		const $comp_wrap = $wrap.closest(".comp_wrap");

		if ($del.length) {
			$del.attr("tabindex", "0");
		}

		let timer1 = $wrap.data("input-timer");
		if (typeof timer1 !== "undefined") {
			clearTimeout(Number(timer1));
			$wrap.removeData("input-timer");
		}

		$wrap.addClass("focus");

		if ($comp_wrap.hasClass("column") === false) {
			if ($comp_wrap.hasClass("comp_wrap") === true) {
				if ($comp_wrap.is(".with_count") === true) {
					$comp_wrap.find(".count_wrap").addClass("focusin");
				} else if ($comp_wrap.is(".float_num") === true) {
					$this.closest(".input").parent("div").addClass("focusin");
				} else if ($comp_wrap.is(".email") === true) {
					$comp_wrap.removeClass("focusin");
					if ($this.parent().is("direct") === false) {
						$this.parent("div").addClass("focusin");
					}
					$this.closest(".select_domain").addClass("focusin");
				} else if ($comp_wrap.is(".phone, .business_num, .license, .birth") === true) {
					$comp_wrap.addClass("focusin").find(".input").removeClass("focusin");
				} else if ($comp_wrap.is(".address") === true) {
					$comp_wrap.find(".input").removeClass("focusin");
					$wrap.addClass("focusin");
				} else {
					$comp_wrap.removeClass("focusin").find(".input").addClass("focusin");
				}
			} else {
				$wrap.addClass("focusin");
			}
		} else {
			$wrap.addClass("focusin");
		}

		if (this.value) {
			$wrap.addClass("has_value");
			$del.attr("aria-hidden", "false");
			if ($inputForm.length) {
				$inputForm.addClass("has_value");
			}
		}
	})
		.on("input", ".input > input", function () {
			const $this = $(this);
			const $wrap = $(this).parent();
			const $del = $wrap.find(".del");
			if (this.value) {
				$wrap.addClass("focus").addClass("has_value");
				$del.attr("aria-hidden", "false");
			} else {
				$wrap.removeClass("has_value");
			}
		})
		.on("blur", ".input > input, .input > .del", function (e) {
			const $wrap = $(this).parent();
			const $del = $wrap.find(".del");
			const $comp_wrap = $wrap.closest(".comp_wrap");

			$wrap.removeClass("focusin");
			$comp_wrap.removeClass("focusin");

			if ($comp_wrap.hasClass("float_num")) {
				$comp_wrap.children("div").removeClass("focusin");
			} else if ($comp_wrap.hasClass("email")) {
				$comp_wrap.children("div").removeClass("focusin");
			}
			$comp_wrap.removeClass("focusin");
			// $comp_wrap.closest('.count_wrap, .with_btn, .with_btn2, .with_txt, .email, .select_domain').removeClass('focusin');

			$wrap.data(
				"input-timer",
				setTimeout(() => {
					$wrap.removeClass("focus");
					$wrap.removeClass("focusin");
					$del.attr("aria-hidden", "true");
				}, 200),
			);
		})
		.on("click", ".input > .del", function (e) {
			e.preventDefault();
			const $wrap = $(this).siblings("input").parent();
			const $del = $wrap.find(".del");
			const $comp_wrap = $wrap.closest(".comp_wrap");

			$wrap.removeClass("focusin");
			$comp_wrap.removeClass("focusin");
			$del.attr("aria-hidden", "true");

			let timer1 = $wrap.data("input-timer");
			if (typeof timer1 !== "undefined") {
				clearTimeout(Number(timer1));
				$wrap.removeData("input-timer");
			}

			$(this)
				.siblings("input")
				.each(function () {
					this.value = "";
					$(this).trigger("keyup");
					$(this).focus().parent().removeClass("has_value");
				});
		});
	// 인풋 del 기능 관련 스크립트 - 사용 확정

	//전체선택 - 약관동의 기능 - 기업은행 사용 확정 스크립트
	const $chkAll = function (click) {
		chkDisabled();

		// console.log('$chkAll $chkAll $chkAll');
		const $group = click.closest(".chk_group_wrap"),
			$total = $group.find(".chk_point:not(:disabled)").length,
			$chked = $group.find(".chk_point:not(:disabled):checked").length,
			$total_sub = $group.find(".chk_point_sub:not(:disabled)").length,
			$chked_sub = $group.find(".chk_point_sub:not(:disabled):checked").length;

		if ($total === $chked && $total_sub === $chked_sub) {
			// console.log('all 1 : ', $total, $chked, $total_sub, $chked_sub);
			$group.find(".chk_point_all").prop("checked", true);
		} else {
			// console.log('all 2 : ', $total, $chked, $total_sub, $chked_sub);
			$group.find(".chk_point_all").prop("checked", false);
		}

		$group.find(".chk_point:not(:disabled)").each(function () {
			if ($(this).is(":checked") && $(this).closest(".chk_middle").hasClass("active")) {
				// $(this).closest('.chk_middle').find('.box_ty').click();
				$(this).closest(".chk_middle").not(".chk_middle_exception").find(".box_ty").click();
			}
		});

		if (typeof comUiCallbackChkAll == "function") {
			comUiCallbackChkAll($group.find(".chk_point_all"));
		}
	};

	$DOC.on("change", ".chk_group_wrap .chk_point", function () {
		const $sub_status = $(this).is(":checked"),
			$sub_list = $(this).closest(".chk_middle").next(".chk_list");

		if ($sub_status) {
			$sub_list.find(".chk_point_sub:not(:disabled)").prop("checked", true);
			$sub_list.find(".chk_point_sub:not(:disabled)").each(function (i) {
				if ($(this).hasClass("chk_point_sub_exception")) {
					// chk_point_sub_exception
					$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop({ disabled: false, checked: true });
				} else {
					$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop("checked", true);
				}
			});
		} else {
			$sub_list.find(".chk_point_sub:not(:disabled)").prop("checked", false);
			$sub_list.find(".chk_point_sub:not(:disabled)").each(function (i) {
				if ($(this).hasClass("chk_point_sub_exception")) {
					// chk_point_sub_exception
					$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop({ disabled: true, checked: false });
				} else {
					$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop("checked", false);
				}
			});
		}

		// 아코디언 버튼 클릭 이벤트
		if (!$sub_status && !$(this).closest(".chk_middle").hasClass("active")) {
			// console.log('조건 1');
			$(this).closest(".chk_middle").find(".box_ty").click();
		}

		$chkAll($(this));
	})
		.on("change", ".chk_group_wrap .chk_point_sub", function () {
			const $point_sub_status = $(this).is(":checked"),
				$point_sub_status_has = $(this).hasClass("chk_point_sub_exception"),
				$point_sub_status_list = $(this).closest(".label").next(".chk_list_dept");
			const $group_sub = $(this).closest(".chk_list"),
				$sub_total = $group_sub.find(".chk_point_sub:not(:disabled)").length,
				$sub_chked = $group_sub.find(".chk_point_sub:not(:disabled):checked").length;

			if ($sub_chked === $sub_total) {
				$group_sub.prev(".chk_middle").find(".chk_point").prop("checked", true);
			} else {
				$group_sub.prev(".chk_middle").find(".chk_point").prop("checked", false);
			}

			if ($point_sub_status) {
				if ($point_sub_status_has) {
					$point_sub_status_list.find(".chk_point_sub_dept").prop({ disabled: false, checked: true });
				} else {
					$point_sub_status_list.find(".chk_point_sub_dept:not(:disabled)").prop("checked", true);
				}
			} else {
				if ($point_sub_status_has) {
					$point_sub_status_list.find(".chk_point_sub_dept").prop({ disabled: true, checked: false });
				} else {
					$point_sub_status_list.find(".chk_point_sub_dept:not(:disabled)").prop("checked", false);
				}
			}

			$chkAll($(this));
		})

		// 4dept
		.on("change", ".chk_group_wrap .chk_point_sub_dept", function () {
			const $group_sub_dept = $(this).closest(".chk_list_dept"),
				$group_sub_dept_exception = $group_sub_dept.prev(".label").find(".chk_point_sub").hasClass("chk_point_sub_exception"),
				$sub_dept_total = $group_sub_dept.find(".chk_point_sub_dept:not(:disabled)").length,
				$sub_dept_chked = $group_sub_dept.find(".chk_point_sub_dept:not(:disabled):checked").length;

			// console.log('체크목록 갯수 : ' + $sub_dept_total + ' 체크된 갯수 :  ' + $sub_dept_chked);

			// 변경 전 체크 파악 스크립트
			// if ($sub_dept_chked === $sub_dept_total) {
			//     $group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", true);
			// } else {
			//     $group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", false);
			// }

			// if ($sub_dept_chked === $sub_dept_total) {

			// console.log('부모가 chk_point_sub_exception class 유무 : ', $group_sub_dept_exception);

			// chk_point_sub_exception 가 있으면 한개만 조건을 성립되어도 부모의 체크박스는 풀리지 않고 모두 해지 시 풀리고 disabled
			// chk_point_sub_exception 가 없으면 모두 만족시에만 부모의 체크박스가 걸리고 하나라도 모지라면 풀린다.

			if ($group_sub_dept_exception) {
				// console.log('chk_point_sub_exception가 있다.');
				if ($sub_dept_chked) {
					// console.log('0개 이상이면');
					$group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", true);
				} else {
					// console.log('0개면');
					$group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", false);
					$(this).closest(".chk_list_dept").find(".chk_point_sub_dept").prop("disabled", true);
				}
			} else {
				// console.log('chk_point_sub_exception가 없다.');
				if ($sub_dept_chked === $sub_dept_total) {
					$group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", true);
				} else {
					$group_sub_dept.prev(".label").find(".chk_point_sub").prop("checked", false);
				}
			}

			const $group_sub = $(this).closest(".chk_list"),
				$sub_total = $group_sub.find(".chk_point_sub:not(:disabled)").length,
				$sub_chked = $group_sub.find(".chk_point_sub:not(:disabled):checked").length;

			if ($sub_chked === $sub_total) {
				$group_sub.prev(".chk_middle").find(".chk_point").prop("checked", true);
			} else {
				$group_sub.prev(".chk_middle").find(".chk_point").prop("checked", false);
			}

			$chkAll($(this));
		})

		.on("change", ".chk_group_wrap .chk_point_all", function () {
			const allChked = $(this).is(":checked");
			const ableCheck = $(this).closest(".chk_group_wrap").find(".chk_middle_exception").length;

			if (allChked) {
				$(this).closest(".chk_group_wrap").find("input[type=checkbox]:not(:disabled)").prop("checked", true);
				$(this)
					.closest(".chk_group_wrap")
					.find(".chk_point_sub:not(:disabled)")
					.each(function (i) {
						if ($(this).hasClass("chk_point_sub_exception")) {
							$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop({ disabled: false, checked: true });
						} else {
							$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop("checked", true);
						}
					});
			} else {
				$(this).closest(".chk_group_wrap").find("input[type=checkbox]:not(:disabled)").prop("checked", false);
				$(this)
					.closest(".chk_group_wrap")
					.find(".chk_point_sub:not(:disabled)")
					.each(function (i) {
						if ($(this).hasClass("chk_point_sub_exception")) {
							$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop({ disabled: true, checked: false });
						} else {
							$(this).closest(".label").next(".chk_list_dept").find(".chk_point_sub_dept").prop("checked", false);
						}
					});
			}

			if (allChked) {
				// console.log('조건 머임? 1');

				if (!ableCheck) {
					console.log("자식으로 chk_middle_exception가 존재하지 않는 경우는 아코디언 닫음");
					$(this)
						.closest(".chk_group_wrap")
						.find(".chk_point:not(:disabled)")
						.each(function () {
							if ($(this).closest(".chk_middle").hasClass("active")) {
								$(this).closest(".chk_middle").find(".box_ty").click();
							}
						});
				}
			} else {
				// console.log('조건 머임? 2');
				$(this)
					.closest(".chk_group_wrap")
					.find(".chk_point:not(:disabled)")
					.each(function () {
						if (!$(this).closest(".chk_middle").hasClass("active")) {
							$(this).closest(".chk_middle").find(".box_ty").click();
						}
					});
			}
		});

	//전체선택 - 약관동의 기능 - 기업은행 사용 확정 스크립트

	// textarea byte check - 기업은행 사용 확정 스크립트 - 사용여부 확인 후 미사용시 삭제 필요
	$DOC.on("blur keyup", ".textarea textarea", function () {
		const $textarea = $(this).parents(".textarea");
		const isCheckLetter = Boolean($textarea.find(".counter").data("counter-type"));
		const limit = $textarea.find("[data-count-limit]").data("count-limit");
		const limitUnit = isCheckLetter ? "자" : "byte";
		const text = $(this).val();
		const $counterNumber = $textarea.find(".counter em");
		let textLength = 0;

		function calculateByte(text) {
			const koreanChineseJapaneseRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣一-龥ぁ-ゔァ-ヴー々〆〤]/;
			return text.split("").reduce((byte, char) => byte + (koreanChineseJapaneseRegex.test(char) ? 2 : 1), 0);
		}

		textLength = isCheckLetter ? text.length : calculateByte(text);

		$textarea.addClass("on");
		$counterNumber.text(textLength);

		if (!textLength) {
			$textarea.find(".msg").text("내용을 입력해 주세요.");
		} else if (textLength > limit) {
			$textarea.find(".status").addClass("alert");
			$textarea.find(".msg").text(`${limit}${limitUnit} 이내로 작성해 주세요.`);
		} else {
			$textarea.find(".status").removeClass("alert");
			$textarea.find(".msg").text("");
		}
	});

	// 팝업 열기
	let scrollPosition;
	$.fn.openPop = function () {
		const $this = $(this);
		scrollPosition = $(window).scrollTop();
		$("html").addClass("scroll_lock").css("scroll-behavior", "auto");
		$("body").css("top", `-${scrollPosition}px`);
		$(this).addClass("active");
		$(".content_wrap").attr("aria-hidden", "true");
		$(this).attr("aria-hidden", "false");
		$(this).find(".bottom_popup").attr("tabindex", "0");
		setTimeout(function () {
			$this.find(".bottom_popup").focus();
		}, 100);
	};

	// 팝업 닫기
	$.fn.closePop = function () {
		$(this).removeClass("active");
		$(this).closest(".layer_popup_wrap").removeClass("active");
		$(".content_wrap").attr("aria-hidden", "false");
		$(this).attr("aria-hidden", "true");
		$("html").removeClass("scroll_lock");
		$("body").css("top", "0px");
		$(window).scrollTop(scrollPosition);
		$("html").css("scroll-behavior", "smooth");
		$(this).find(".bottom_popup").removeAttr("tabindex");
		$("body").attr("tabindex", "-1").focus().removeAttr("tabindex");
	};

	// 페이지 클릭시 추천 툴팁 숨기기
	$DOC.on("click", function (e) {
		const $tooltip = $(e.target).closest("[data-jx-step-no]").find(".favorite_tooltip");
		if ($tooltip.hasClass("visible")) return;
		$tooltip.fadeOut();
	}).on("click", ".favorite_tooltip", function (e) {
		e.stopPropagation();
	});

	// 예외 토스트
	$DOC.on("click", ".click_tooltip_close", function () {
		$(this).fadeOut();
	});

	// item, sld_trigger, cont
	$(".sld_trigger").each(function () {
		const $item = $(this).closest(".item.active");

		if ($item.length > 0) {
			$item.find(".cont").css("display", "block");
		}
	});

	$DOC.on("click", ".sld_trigger", function (e) {
		// const slideTime = 300;
		const slideTime = 0;
		e.preventDefault();
		const $this = $(this);
		const $item = $this.closest(".item");
		if ($item.hasClass("active")) {
			$item.removeClass("active").find(".cont").slideUp(slideTime);
		} else {
			$item.siblings(".active").removeClass("active").find(".cont").slideUp(slideTime);
			$item.addClass("active").find(".cont").slideDown(slideTime);
		}

		setTimeout(function () {
			const $thisTop = e.target.parentElement.offsetTop;
			$("main").scrollTop($thisTop - 55);
		}, 100);
	});

	// 스크롤 탭 - 탭 클릭 후 위치 이동 기능
	$DOC.on("click", ".tab_list.scrollable button", function () {
		const $this = $(this);

		$this.addClass("active").siblings().removeClass("active");
		if ($this.is("[aria-selected]")) {
			$this.attr("aria-selected", true).siblings().attr("aria-selected", false);
		}

		const $scrollBox = $this.closest(".scrollable");
		const scrollBoxHalfWidth = $scrollBox.width() / 2;
		const $activeTabPos = Number($this.attr("data-posX")) + $this.outerWidth() / 2;
		$scrollBox.scrollLeft($activeTabPos - scrollBoxHalfWidth);
	});

	$WIN.on("load", function () {
		const $tabBtn = $(".tab_list.scrollable button");
		$tabBtn.each(function () {
			$(this).attr("data-posX", $(this).offset().left);
		});
		positionTab();
	});

	// select_radio role="radiogroup" button role="radio"로 사용가능 스크립트
	$DOC.on("click", ".select_radio button", function (e) {
		$(this).closest(".select_radio").find("button").removeClass("active").attr("aria-checked", "false");
		$(this).addClass("active").attr("aria-checked", "true");
	});
	$DOC.on("click", ".btn_area.clickable button", function (e) {
		$(this).closest(".btn_area").find("button").removeClass("active").attr("aria-checked", "false");
		$(this).addClass("active").attr("aria-checked", "true");
	});
	$DOC.on("click", ".btn_area.toggleable button", function (e) {
		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			$(this).attr("aria-checked", "true");
		} else {
			$(this).attr("aria-checked", "false");
		}
	});
	$DOC.on("click", ".select_cert.clickable button", function (e) {
		$(this).closest(".select_cert").find("button").removeClass("active").attr("aria-checked", "false");
		$(this).addClass("active").attr("aria-checked", "true");
	});
	// select_radio role="radiogroup" button role="radio"로 사용가능 스크립트

	// 툴팁 활성화 기능
	$DOC.on("click", ".tooltip_open", function () {
		const tooltipContent = $(this).closest(".tooltip_wrap").find(".tooltip_wrap_container").is(":visible");
		if (tooltipContent) {
			$(this).attr("aria-expanded", "false");
			$(this).closest(".tooltip_wrap").removeClass("active");
		} else {
			$(this).attr("aria-expanded", "true");
			$(this).closest(".tooltip_wrap").addClass("active");
		}
	});

	$DOC.on("click", ".tooltip_close", function () {
		$(this).closest(".tooltip_wrap").removeClass("active");
		$(this).closest(".tooltip_wrap").find(".tooltip_open").attr("aria-expanded", "false");
	});
	// 툴팁 활성화 기능

	// accodian 스크립트
	// $DOC.on("click", ".acd_wrap .acd_btn", function (e) {
	$DOC.on("click", ".acd_btn", function (e) {
		var slideTime = 300;
		e.preventDefault();

		if (!$(this).closest(".acd_wrap").hasClass("ty2")) {
			if ($(this).closest(".acd_head").next(".acd_cont").children(".inner").css("display") === "block") {
				// console.log('1');
				$(this).closest(".acd_wrap > .acd_head").removeClass("active");
				$(this).closest(".acd_wrap > .acd_head").find(".acd_btn").attr("aria-expanded", "false");
				$(this).closest(".acd_wrap > .acd_head").next(".acd_cont").children(".inner").slideUp(slideTime);
				$(this).closest(".acd_wrap").removeClass("active");
			} else {
				// console.log('2');
				$(this).closest(".acd_wrap > .acd_head").removeClass("active");
				$(this).closest(".acd_wrap > .acd_head").find(".acd_btn").attr("aria-expanded", "false");
				$(this).closest(".acd_head").addClass("active");
				$(this).attr("aria-expanded", "true");
				$(this).closest(".acd_head").next(".acd_cont").children(".inner").slideDown(slideTime);
				$(this).closest(".acd_wrap").addClass("active");
			}
		}

		if ($(this).closest(".acd_wrap").hasClass("ty2")) {
			if ($(this).closest(".acd_head").prev(".acd_cont").children(".inner").css("display") === "block") {
				// console.log('1');
				$(this).closest(".acd_wrap > .acd_head").removeClass("active");
				$(this).closest(".acd_wrap > .acd_head").find(".acd_btn").attr("aria-expanded", "false");
				$(this).closest(".acd_wrap > .acd_head").prev(".acd_cont").children(".inner").slideUp(slideTime);
				$(this).closest(".acd_wrap").removeClass("active");
				$(this).closest(".acd_head").prev(".acd_cont").removeAttr("tabindex");
			} else {
				// console.log('2');
				// $(this).closest(".acd_head").prev(".acd_cont").removeAttr('tabindex');
				$(this).closest(".acd_wrap > .acd_head").removeClass("active");
				$(this).closest(".acd_wrap > .acd_head").find(".acd_btn").attr("aria-expanded", "false");
				$(this).closest(".acd_head").addClass("active");
				$(this).attr("aria-expanded", "true");
				$(this).closest(".acd_head").prev(".acd_cont").children(".inner").slideDown(slideTime);
				$(this).closest(".acd_wrap").addClass("active");
				const $this = $(this);
				setTimeout(function () {
					$this.closest(".acd_head").prev(".acd_cont").attr("tabindex", "-1");
					// $this.closest(".acd_head").prev(".acd_cont").css('background','#ddd');
					$this.closest(".acd_head").prev(".acd_cont").focus();
				}, 300);
			}
		}
	});
	// accodian 스크립트

	// 숫자 콤마 처리
	$DOC.on("input", ".input > .comma", function () {
		$(this).val(function (index, value) {
			return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		});
	});

	// 탭
	$DOC.on("click", ".tab_list:not(.not_event) > button", function () {
		// 일반탭
		function initTab($tabMenu, idx) {
			const $tabCont = $tabMenu.parent().nextAll(".tab_cont").eq(idx);
			const $tabContNoti = $tabMenu.closest(".common_noti_box_tab").nextAll(".tab_cont").eq(idx); // 알림함 > 목록 - 관리자 탭
			const $tabContScroll = $tabMenu.closest(".tab_list_scroll_wrap").nextAll(".tab_cont").eq(idx); // 공통 - 스크롤탭

			showTab($tabMenu, $tabCont);
			showTab($tabMenu, $tabContNoti);
			showTab($tabMenu, $tabContScroll);
		}

		// 데이터추적탭
		function initDataTab($tabMenu, $tabCont) {
			showTab($tabMenu, $tabCont);
		}

		function showTab($tabMenu, $tabCont) {
			$tabMenu.addClass("active").attr("aria-selected", "true").siblings().removeClass("active").attr("aria-selected", "false");
			$tabCont.addClass("active").attr("aria-expanded", "true").siblings().removeClass("active").attr("aria-expanded", "false");
		}

		const idx = $(this).index();
		const getData = $(this).data("opentab");

		if ($(this).is("[data-opentab]")) {
			initDataTab($(this), $(`[data-expendtab="${getData}"]`));
		} else {
			initTab($(this), idx);
		}
	});

	// selectlist 선택 스크립트
	$DOC.on("click", ".select_list > li", function (e) {
		const $this = $(this);
		if ($this.is("[aria-selected]")) {
			$this.closest(".select_list").children('li[role="option"]').attr("aria-selected", "false").removeClass("active");
			$this.attr("aria-selected", "true").addClass("active");
		}
		// role button 의 경우
		if ($this.is('[role="button"]')) {
			$this.closest(".select_list").children('li[role="button"]').attr("aria-selected", "false").removeClass("active");
			$this.attr("aria-selected", "true").addClass("active");
		}
	});

	// card_item_wrap 스타일을 위한 active toggle
	$DOC.on("change", ".card_item_wrap .card_chkbox input", function (e) {
		const checked = $(this).is(":checked");
		const isRadio = $(this).attr("type") === "radio";
		const name = $(this).attr("name");
		if (isRadio) {
			$(`input[name=${name}]`).closest(".card_item_wrap").removeClass("active");
			$(this).closest(".card_item_wrap").addClass("active");
		}
		if (checked) {
			$(this).closest(".card_item_wrap").addClass("active");
		} else {
			$(this).closest(".card_item_wrap").removeClass("active");
		}
	});

	// input_range 제어
	$DOC.ready(function () {
		const $rangeInputs = $('.input_range input[type="range"]');
		function setProgress($target) {
			const $rangeBar = $target;
			const thumbWidth = $rangeBar.height();
			const rangeBarWidth = $rangeBar.width() - thumbWidth;
			const progressPosition = ($target.val() - $target.attr("min")) / ($target.attr("max") - $target.attr("min"));
			const rangePosition = rangeBarWidth * progressPosition + thumbWidth / 2;
			$rangeBar.css("background", `linear-gradient(to right, #2873e3 ${rangePosition}px, #e1e3ea ${rangePosition}px)`);
		}
		$rangeInputs
			.on("input", function () {
				setProgress($(this));
			})
			.each(function () {
				setProgress($(this));
			});
	});

	// icon button active
	$DOC.on("click", ".btn_ico", function (e) {
		const $this = $(this);
		if ($this.length > 0) {
			$this.toggleClass("active");
		}
	});

	// My메뉴 설정 아코디언 메뉴 제어
	function initMyMenu() {
		$(".mymenu_list .sub").hide();
		$(".mymenu_list li.on").removeClass("on");
	}

	function handleMyMenu(e) {
		e.stopPropagation();
		const $this = $(this);
		if (!$this.find(">.sub").length) return;
		if ($this.find(">.sub").is(":visible")) {
			$this.removeClass("on");
			$this.find("li").removeClass("on");
			$this.find(".sub").slideUp(0);
			$this.find(">.tit").attr("aria-expanded", false);
		} else {
			$this.find(">.tit").attr("aria-expanded", true);
			$this.addClass("on").find(">.sub").slideDown(0);
		}
	}

	$DOC.ready(initMyMenu);
	$DOC.on("click", ".mymenu_list li", handleMyMenu);

	$DOC.on("click", ".inp_reset_event", function (e) {
		const $this = $(this);
		$this.closest(".comp_wrap").find("input").removeAttr("readonly").val("");
	});
})(jQuery);

var comUi = {
	initAll: function ($tg) {
		this.initCheckGroup($tg); //체크그룹(.chk_group_wrap) UI 초기화
		this.initCheckGroupEvent($tg); //체크그룹(.chk_group_wrap) Event 초기화

		//초기화 함수 추가 시 initAll에 추가
	},
	/* 체크그룹(.chk_group_wrap) UI 초기화 */
	initCheckGroup: function ($tg) {
		if ($tg == undefined || $tg == null || $tg.length == 0) {
			//영역 미지정 시
			$tg = $(".wrap");
		}
		$tg.find(".acd_wrap,.acd_head").addClass("active");
		$tg.find("input[type='checkbox']").prop("checked", false);
		$tg.find(".inner").show();
		$tg.find("button").attr("aria-expanded", true);

		//$tg 영역 체크그룹 UI 초기화
	},
	/* 체크그룹(.chk_group_wrap) Event 초기화 */
	initCheckGroupEvent: function ($tg) {
		if ($tg == undefined || $tg == null || $tg.length == 0) {
			//영역 미지정 시
			$tg = $(document);
		}

		//$tg 영역 체크그룹 Event 초기화
	}
};

// 페이지 이동 후 탭 위치 이동 기능
function positionTab() {
	const targetDom = $(".tab_list.ty1.scrollable");
	const $this = targetDom.find(".active");
	const $scrollBox = targetDom;
	const scrollBoxHalfWidth = $scrollBox.width() / 2;
	const $activeTabPos = Number($this.attr("data-posX")) + $this.outerWidth() / 2;
	$scrollBox.scrollLeft($activeTabPos - scrollBoxHalfWidth);
}

// 스크롤 탭 좌표 수급
function getScrollTabBtnPosX() {
	const $tabBtn = $(".tab_list.scrollable button");
	$tabBtn.each(function () {
		$(this).attr("data-posX", $(this).offset().left);
	});
}

// 페이지 진입 시 chk_group_wrap의 자식 중 부모가 display none 일 경우 checkbox checked 상태값을 카운트 하지 않게 하기 위한 함수
function chkDisabled() {
	$(".chk_group_wrap > .agree_check.tit_ty").each(function (e) {
		$this = $(this);
		if ($this.css("display") === "none") {
			$this.find("input[type=checkbox]").attr("disabled", true);
		}
	});
}


    //2501 투자위험 설명 추가 테이블 내 더보기 접기 구현(글자수단위 잘림)
    $(document).ready(function() {
      (function() {
        var showChar = 150;
        var ellipsestext = "...";

        $(".line_climp_tb").each(function() {
          var content = $(this).html();
          if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content;
            var html =
              '<div class="line_climp_tb-text" style="display:block">' +
              c +
              '<span class="moreellipses">' +
              ellipsestext +
              '&nbsp;&nbsp;<button type="button" class="moreless btn more_1"><span class="text">더보기</span></button></span></span></div><div class="line_climp_tb-text" style="display:none">' +
              h +
              '<button type="button" class="moreless btn less"><span class="text">접기</span></button></span></div>';

            $(this).html(html);
          }
        });

        $(".moreless").click(function() {
          var thisEl = $(this);
          var cT = thisEl.closest(".line_climp_tb-text");
          var tX = ".line_climp_tb-text";

          if (thisEl.hasClass("less")) {
            cT.prev(tX).toggle();
            cT.slideToggle();
          } else {
            cT.toggle();
            cT.next(tX).fadeToggle();
          }
          return false;
        });
        /* end iffe */
      })();
                                });

/* -------------------------------------------------------------
 * [접근성 공통 추가 영역 시작]
 * 금액입력 공통(네이티브 호출형 버튼) 접근성 보강 + 브리지 샘플
 * 대상 : .live_input_group .value[role="button"]

**커버하는 전체 케이스**
- “금액입력, 버튼. 숫자만 입력. 엔터 또는 스페이스로 키패드를 엽니다.”
- “금액입력, 버튼. 입력됨: 500,000,000 원. 숫자만 입력, 엔터 또는 스페이스로 키패드를 엽니다.”
- 입력 완료 (네이티브 키패드에서 숫자 입력 후) setValue() 호출
- 버튼 텍스트: 새 금액_state_xxx: "입력됨: [새 금액]" 로 갱신.TalkBack이 변경 사항을 live 영역으로 읽어줌.
- 입력값 삭제_네이티브에서 빈 값 리턴 → clearValue()
버튼 텍스트: 숫자만 입력
state_xxx: "입력값이 삭제되었습니다."
-오류 (숫자 외 입력 등)
setError($btn, '보낼 수 있는 금액이 부족해요.'); 형태로 호출 가능
state_xxx: "오류: 보낼 수 있는 금액이 부족해요."
 * ------------------------------------------------------------- */
(function ($, win) {
  "use strict";

  var A11yPriceInput = {
    // ==========================================================
    // 초기화
    // ==========================================================
    init: function () {
      var $btns = $('.live_input_group .value[role="button"]');
      if (!$btns.length) return;

      $btns.each(function () {
        var $btn = $(this);

        // 1) 기본 ARIA 구조 세팅 (label / hint / state)
        A11yPriceInput.setBaseAttr($btn);

        // 2) disabled 처리
        A11yPriceInput.setDisabled($btn);

        // 3) 화면 로딩 시 이미 값이 있는 경우 state에 한 번 반영
        A11yPriceInput.syncInitialValue($btn);

        // 4) 클릭 시 네이티브 키패드 호출
        $btn.off("click.a11yprice").on("click.a11yprice", function () {
          if ($btn.attr("aria-disabled") === "true") return;
          A11yPriceInput.callNativePad($btn);
        });

        // 5) 키보드 접근 (Enter / Space)
        $btn.off("keydown.a11yprice").on("keydown.a11yprice", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            $(this).trigger("click");
          }
        });
      });
    },

    // ----------------------------------------------------------
    // 기본 ARIA 속성 + hint/state 생성
    // ----------------------------------------------------------
    setBaseAttr: function ($btn) {
      // 주변 라벨 텍스트 찾기
      var labelText = "";
      var $label = $btn
        .closest(".live_input_group")
        .find(".input_label, .label, label")
        .first();

      if ($label.length) {
        labelText = $.trim($label.text());
      }
      if (!labelText) labelText = "금액입력";

      // 고유 ID
      var uid = Math.random().toString(36).substr(2, 8);
      var hintId = "hint_" + uid;
      var stateId = "state_" + uid;

      // hint (입력 방법 안내)
      if (!$btn.siblings("#" + hintId).length) {
        $btn.after(
          '<p id="' +
            hintId +
            '" class="blind">' +
            "숫자만 입력. 엔터 또는 스페이스로 키패드를 엽니다." +
            "</p>"
        );
      }

      // state (입력/오류/삭제 상태 안내)
      if (!$btn.siblings("#" + stateId).length) {
        $btn.after(
          '<p id="' + stateId + '" class="blind" aria-live="polite"></p>'
        );
      }

      // ★ state / hint id를 data-*로 저장해두고 공통 사용
      $btn.attr("data-a11y-state-id", stateId);
      $btn.attr("data-a11y-hint-id", hintId);

      $btn.attr({
        "aria-label": labelText,
        "aria-describedby": hintId + " " + stateId,
        role: "button",
      });
      // live 영역은 state <p aria-live="polite"> 만 사용
    },

    // ----------------------------------------------------------
    // disabled 처리
    // ----------------------------------------------------------
    setDisabled: function ($btn) {
      if ($btn.hasClass("disabled") || $btn.is("[disabled]")) {
        $btn.attr("aria-disabled", "true").removeAttr("tabindex");
      } else {
        $btn.attr({
          "aria-disabled": "false",
          tabindex: "0",
        });
      }
    },

    // ----------------------------------------------------------
    // 초기 상태 값 동기화
    //   - 버튼 텍스트에 숫자가 있으면 → "입력됨: [값]"
    //   - 숫자가 없으면(placeholder) → state 텍스트 비움
    // ----------------------------------------------------------
    syncInitialValue: function ($btn) {
      var rawText = $.trim($btn.text());
      var stateId = A11yPriceInput.getStateId($btn);
      if (!stateId) return;

      if (/[0-9]/.test(rawText)) {
        // 금액이 이미 들어있는 경우에만 상태 안내
        $("#" + stateId).text("입력됨: " + rawText);
      } else {
        // 값이 없으면 상태는 비워 두고, 힌트(hint_xxx)만 읽히게
        $("#" + stateId).text("");
      }
    },

    // ----------------------------------------------------------
    // 네이티브 키패드 호출 (Android / iOS / 웹 Fallback)
    // ----------------------------------------------------------
    callNativePad: function ($btn) {
      var currentVal = $.trim($btn.text()).replace(/[^0-9]/g, "");
      var params = {
        maxLength: 12,
        defaultValue: currentVal,
      };

      try {
        // [1] Android
        if (win.nativeBridge && typeof win.nativeBridge.exec === "function") {
          win.nativeBridge.exec("OPEN_NUMBER_PAD", params, function (result) {
            A11yPriceInput.setValue($btn, result);
          });

          // [2] iOS
        } else if (
          win.webkit &&
          win.webkit.messageHandlers &&
          win.webkit.messageHandlers.nativeBridge
        ) {
          win.webkit.messageHandlers.nativeBridge.postMessage({
            action: "OPEN_NUMBER_PAD",
            params: params,
          });
          // iOS 쪽에서 완료 시 JS의 setValue를 다시 호출해 주어야 함

          // [3] 웹 테스트용 (브리지 없는 환경)
        } else {
          var result = win.prompt("금액을 입력하세요", currentVal || "");
          if (result !== null) {
            A11yPriceInput.setValue($btn, result);
          }
        }
      } catch (e) {
        if (win.console && console.warn) {
          console.warn("Bridge 호출 오류:", e);
        }
      }
    },

    // ----------------------------------------------------------
    // 값 세팅 (입력 완료 시)
    // ----------------------------------------------------------
    setValue: function ($btn, val) {
      if (val === null || val === undefined || val === "") {
        A11yPriceInput.clearValue($btn);
        return;
      }

      var num = parseInt(String(val).replace(/[^0-9]/g, ""), 10);
      if (isNaN(num)) {
        A11yPriceInput.setError($btn, "숫자만 입력 가능합니다.");
        return;
      }

      var formatted = num.toLocaleString() + " 원";
      $btn.text(formatted);

      var stateId = A11yPriceInput.getStateId($btn);
      if (stateId) {
        $("#" + stateId).text("입력됨: " + formatted);
      }
    },

    // ----------------------------------------------------------
    // 값 삭제 (입력창에서 모두 지운 경우)
    // ----------------------------------------------------------
    clearValue: function ($btn) {
      // 시각용 placeholder 문구
      $btn.text("숫자만 입력");

      var stateId = A11yPriceInput.getStateId($btn);
      if (stateId) {
        $("#" + stateId).text("입력값이 삭제되었습니다.");
      }
    },

    // ----------------------------------------------------------
    // 오류 상태 (네이티브/검증 로직에서 호출 가능)
    // ----------------------------------------------------------
    setError: function ($btn, msg) {
      var stateId = A11yPriceInput.getStateId($btn);
      if (stateId) {
        $("#" + stateId).text("오류: " + msg);
      }
    },

    // ----------------------------------------------------------
    // state id 추출 : data-* 우선, 없으면 aria-describedby fallback
    // ----------------------------------------------------------
    getStateId: function ($btn) {
      var fromData = $btn.attr("data-a11y-state-id");
      if (fromData) return fromData;

      var desc = $btn.attr("aria-describedby") || "";
      var ids = $.trim(desc).split(/\s+/);
      return (ids.length > 1 ? ids[1] : ids[0]) || null;
    },
  };

  // DOM 준비 후 실행
  $(function () {
    A11yPriceInput.init();
  });
})(jQuery, window);
/* -------------------------------------------------------------
 * [접근성 공통 추가 영역 끝]
 * ------------------------------------------------------------- */

