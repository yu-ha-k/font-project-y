(function() {
	/**
	 * Date: 2020.07.15
	 * 
	 * 주소검색
	 * 
	 *  (사용ID)
	 *    #BSUN_ZPCD       우편번호
	 *    #BSUN_BSC_ADR    기본주소
	 *    #BSUN_DTL_ADR    상세주소
	 *    #BSUN_RDND_DCD   도로명주소구분코드 [1:지번(구주소), 2:도로명]
	 *    
	 *  (예시)
	 *    $("#div_search_home #BSUN_ZPCD"   ).val(); //우편번호
	 *    $("#div_search_home #BSUN_BSC_ADR").val(); //기본주소
	 *    $("#div_search_home #BSUN_DTL_ADR").val(); //상세주소
	 * 
	 * @namespace JexMobileAddressForm2
	 */
	window._addressForm2;
	window._addressForm2_lang;
	var sForm_attrs = {
		  "id"               : "data-jx-addressform2"              // [선언] 호출할 svc 명
		, "addressAreaId"    : "data-jx-addressform2-area-id"      // [필수] area id
		, "addressTit"       : "data-jx-addressform2-title"        // [선택] title
		, "addressLang"      : "data-jx-addressform2-lang"
		, "checkChanageYn"	 : "data-jx-addressform2-check-change-yn"	//주소검색 후 확인버튼 클릭시 은행주소 변경 안내 팝업을 띄우기 위한 옵션
		, "titleDisplayYn" 	 : "data-jx-addressform2-title-display-yn"	//주소 입력 항목 제목 출력 여부
		, "checkSkipYn"      : "data-jx-addressform2-check-skip-yn" //상세주소 입력 필수 여부, N이면 상세주소 검증 skip
		, "nextFunction"	 : "data-jx-addressform2-next-execute-function"	// [required] 인증서 '다음' 버튼 처리 완료 후 사용자 처리 콜백 함수
	};
	
	var JexMobileAddressForm2 = JexPlugin.extend({
		init : function() {
			window._addressForm2 = this;
		},
		
		/**
		 * @method load data-jx-addressform2 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			this._this  = this;
			this.$jq    = $jq;
			this.id     = $jq.attr('id');
			this.stepNo = $jq.attr('data-jx-step-no');

			
			//this.preapreSvcDiv($jq);
			
			this.getAddressForm($jq);
			
			//draw주소검색
			var adrsObj = $jq.parent().find('[' + sForm_attrs.addressAreaId + ']');
			if (adrsObj.length > 0) {
				for(var i=0; i< adrsObj.length; i++) {
					this.drawAdrsAreaHtml($(adrsObj[i]));
				}
			}
			
						
		},
		
		getAddressForm : function($jq) {
			
			$.get('../../com/addressform.html').done(function(dat)	{
				
				$addressform_html = $(dat);
				
				//step 하위에 html 추가
				$("#step").append($addressform_html.find("#addressform_area").html());
				jex.setJexObj($('#step2400'));
				
				
				
				
				step2400.add_event();
			});
			
		},
		
		/**
		 * 필요한 서비스 영역 append
		 */
		preapreSvcDiv : function($jq) {
			//도로명주소 조회
//			var fnt_lon_080112_1 = '<div id="fnt_lon_080112_1" '
//				+ 'data-jx-svc="fnt_lon_080112_1" '
//				+ 'data-jx-svc-package="fnt_lon" '
//				+ 'data-jx-svc-target="#step2400@_tran_res_data[0]" '
//				+ 'data-jx-svc-errtrx="false" '
//				+ 'data-jx-svc-handler-in="adrsForm.searchAddr.fnt_lon_080112_1.uf_in()" '
//				+ 'data-jx-svc-handler-out="adrsForm.searchAddr.fnt_lon_080112_1.uf_out()" '
//				+ 'data-jx-svc-execute="FUNC@adrsForm.searchAddr.fnt_lon_080112_1.uf_exec()" style="display:none"></div>';
//			$('body').append(fnt_lon_080112_1);
			
			
			//도로명주소처리(계정계 온라인 서비스)
			//  2023.03.23 비대면채널 內 도로명 검색 기능 개선
			var com_add_020101_3 = '<div id="com_add_020101_3" '
				+ 'data-jx-svc="com_add_020101_3" '
				+ 'data-jx-svc-package="com_add" '
				+ 'data-jx-svc-target="#step2400@_tran_res_data[0]" '
				+ 'data-jx-svc-errtrx="false" '
				+ 'data-jx-svc-handler-in="adrsForm.searchAddr.com_add_020101_3.uf_in()" '
				+ 'data-jx-svc-handler-out="adrsForm.searchAddr.com_add_020101_3.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@adrsForm.searchAddr.com_add_020101_3.uf_exec()" style="display:none"></div>';
			$('body').append(com_add_020101_3);
		},
		
		/**
		 * 주소검색 & 우편번호 찾기(주소찾기)
		 */
		drawAdrsAreaHtml : function($jq) {
			//window._addressForm2.adrsAreaId = $jq.attr(sForm_attrs.addressAreaId);
			
			var adrsAreaId = $jq.attr(sForm_attrs.addressAreaId);
			var adrsTitle  = $jq.attr(sForm_attrs.addressTit) ? $jq.attr(sForm_attrs.addressTit) : "주소검색";
			var adrsLang = $jq.attr(sForm_attrs.addressLang);

			var checkYN = $jq.attr(sForm_attrs.checkChanageYn);
			var checkSkipYN = $jq.attr(sForm_attrs.checkSkipYn);
			var nextFunction = $jq.attr(sForm_attrs.nextFunction);
			var titleDisplayStyle = "";
			
			if($jq.attr(sForm_attrs.titleDisplayYn) == "N") {
				titleDisplayStyle = 'style="display:none"';
			}
			
			var acntAreaHtml = ""
			+ '<div class="input_label ty2" id="adrsTitle" ' + titleDisplayStyle + '>' + adrsTitle + '</div>'
			+ '<!-- e: 24-07-05 문구 변경 -->'
			+ '<div class="comp_wrap address" id="' + adrsAreaId + '">'
			+ '    <input type="hidden" id="BSUN_RDND_DCD" value="2"><!-- 도로명주소구분코드 [1:지번(구주소), 2:도로명] -->'
//			+ '    <input type="text" id="BSUN_ZPCD" class="wid67 ZIPCODE param_key copy_key" title="우편번호 입력" readonly="readonly" data-valid-check=\'{"required":"본사/사업장 주소를입력해주세요."}\' data-id="MNOF_RDNM_ZPCD">'
			+ '    <input type="hidden" class="BLDN_MNGM_NO copy_key" data-id="MOMO_NO" id="BSUN_BLDN_MNGM_NO">'
			+ '    <div class="input has_search has_value readonly">'
			+ '    <input type="text" id="BSUN_ZPCD" class="wid67 ZIPCODE param_key copy_key" title="우편번호 입력" readonly="readonly" data-valid-check=\'{"required":"본사/사업장 주소를입력해주세요."}\' data-id="MNOF_RDNM_ZPCD">'
//			+ '        <input type="text" name="" id="" placeholder="우편번호" readonly="true" />'
			+ '        <button type="button" id="addr_find" class="search" data-step="2400" data-jx-addressform2-lang="' + adrsLang + '" data-jx-addressform2-check-change-yn="' + checkYN + '" data-jx-addressform2-check-skip-yn="' + checkSkipYN +  '" data-jx-addressform2-next-execute-function="' + nextFunction + '">검색</button>'
			+ '        <button type="button" class="del" tabindex="0" aria-hidden="true">텍스트삭제</button>'
			+ '    </div>'
			+ '    <div class="input">'
			+ '        <input type="text" name="" id="BSUN_BSC_ADR" class="ADDR" placeholder="주소입력" data-valid-check=\'{"required":"본사/사업장 주소를 입력해주세요."}\' data-id="MNOF_RDNM_BSC_ADR" readonly="true" />'
			+ '    </div>'
			+ '    <div class="input">'
			+ '        <input type="text" name="" id="BSUN_DTL_ADR" class="ADDR_DTL" placeholder="상세주소 입력" data-valid-check=\'{"required":"본사/사업장 주소를 입력해주세요."}\' data-id="MNOF_RDNM_DTL_ADR" readonly="true" />'
			+ '    </div>'
			+ '</div>'
            
			acntAreaHtml = $(acntAreaHtml);
			
			acntAreaHtml.find("#addr_find").off("click").on('click', function(evt) { //우편번호 찾기 버튼 Click Event
				
				var $this = $(this);
				var target_id = $(this).attr('id');
				_addressForm2_lang = $(this).attr('data-jx-addressform2-lang');
				//step2400
				adrs_com.goNext($this.attr('data-step'), $this.closest('.address'));
				_addressForm2.overrideUfBack();
			});
			$jq.html(acntAreaHtml);
			jex.setJexObj($jq);
		},
		overrideUfBack : function (){
			var address_prev_uf_back = uf_back;
			if(address_prev_uf_back.toString().indexOf("address_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
					
					if(curStepNo == 2400 ){ // 주소검색
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
						return;
					}
					address_prev_uf_back.apply(this, arguments);
				}
			}
		}
		
	});
	jex.plugin.add("JEX_MOBILE_ADDRESSFORM2", JexMobileAddressForm2, "data-jx-addressform2");
})();

var adrs_com = {
	// 팝업
	popup: function(msg) {
		var kind            = msg.kind || 'alert',
			txt             = msg.txt,
			title           = msg.title,
			btn_left        = msg.btn_left,
			btn_right       = msg.btn_right,
			callback        = msg.callback,
			cancel_callback = msg.cancel_callback;

		if (kind === 'alert') {
			return !!MobPopup.showAlertPopup(
					txt, 
					title, 
					callback);
		} else if (kind === 'confirm') {
			return !!MobPopup.showConfirmPopup(
					txt, 
					title, 
					callback, 
					cancel_callback);
		} else if (kind === 'confirm2') {
			return !!MobPopup.showConfirmQckPopup(
					txt, 
					title, 
					callback, 
					cancel_callback,
					btn_left, 
					btn_right);
		}
	},
	// 다음스텝으로 이동
	goNext: function(step, param) {
		adrs_com.executeFunctionByName('step' + step + '.init', window, param);
		uf_goStep(Number(step));
	},
	// String 함수명으로 전달된 함수 실행
	executeFunctionByName: function(funcName, context) {
		var args = Array.prototype.slice.call(arguments, 2),
			namespaces = funcName.split('\.'),
			func = namespaces.pop();
		
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		
		if (!context[func]) {
			return;
		}
		
		return context[func].apply(context, args);
	},
	animate: function(target_id) {
		$('html, body').animate({
			scrollTop: $(target_id).offset().top
		}, 500);
	}
};


/**
 * 우편번호 검색
 */
var step2400 = {
	STEP: 2400,
	target: null,

	// 초기화
	init: function($target) {
		this.target = $target;
		var $step = $('#step' + this.STEP);
		adrsForm.searchAddr.init($step);
	},

	// 이벤트
	add_event: function() {
		var $step = $('#step' + this.STEP),
			self = this;

		// 조회 버튼
		$step.find('#btn_search_addr').off("click").on("click", function(e) {
			adrsForm.searchAddr.search($step);
		});

		// 확인 버튼
		$('#btn_confirm_addr').off("click").on("click", function() {
			var target_id = self.target.attr('id'),
				msg;
			
			if (self.target.find("#addr_find").attr("data-jx-addressform2-check-skip-yn") != "Y") {
				if (!$.trim($('#addr03').val())) {
					return adrs_com.popup({
						txt: '나머지주소를 입력해주세요.'
					});
				}
			}

			// 사업자당행고객일 경우
			if (self.target.find("#addr_find").attr("data-jx-addressform2-check-change-yn") == "Y") {
				msg = '은행에 등록된 주소가 변경됩니다.<br>계속 진행하시겠습니까?'
			}

			var nextFunction = self.target.find("#addr_find").attr("data-jx-addressform2-next-execute-function")
			if (msg) {
				return adrs_com.popup({
					kind: 'confirm',
					txt: msg,
					callback: function() {
						adrsForm.searchAddr.setAddr(self.target, self.target.find("#addr_find").attr("data-jx-addressform2-check-skip-yn"));
						adrs_com.animate('#' + self.target.attr('id'));
						
						if (nextFunction != undefined && nextFunction != "") {
							eval(nextFunction);
						}
						
						
					},
					cancel_callback: function() {


						if (nextFunction != undefined && nextFunction != "") {
							eval(nextFunction);
						}
						uf_back();
						
					}
				});
			}

			
			
			adrsForm.searchAddr.setAddr(self.target, self.target.find("#addr_find").attr("data-jx-addressform2-check-skip-yn"));
			adrs_com.animate('#' + self.target.attr('id'));
			if (nextFunction != undefined && nextFunction != "") {
				eval(nextFunction);
			}
		});
	}
};

var adrsForm = {
	// 우편번호 검색, 주소 찾기 (only 도로명 주소)
	searchAddr: {
		init: function($target) {
			$target.find('input').val('');
			$target.find('#div_addr_list').hide();
			$target.find('#etcAddr').hide();
		},
		// 도로명 주소 조회
		search: function() {
			var $rd_nm = $('#RD_NM');
			
			if(!$rd_nm.val().trim()){
				return adrs_com.popup({
					txt: '도로명은 필수 입력 사항입니다.',
					callback: function() {
						$rd_nm.focus();
					}
				});
			}

//			jex.setJexObj($('#fnt_lon_080112_1').attr('data-jx-svc-onload', 'true'));
			jex.setJexObj($('#com_add_020101_3').attr('data-jx-svc-onload', 'true'));
		},
		
		//도로명주소처리(계정계 온라인 서비스) 
		//  2023.03.23 비대면채널 內 도로명 검색 기능 개선
		//  @ 전    문    : UIB_COM_SP1710_000004 [UIBO00078030] 도로명주소처리 CBKCOM935040800
		com_add_020101_3: {
			uf_in: function($jq, dat) {
				dat.PAGE_NMB     = "50"; //페이지개수, 한 화면에 표시할 페이지 개수
				dat.RD_NM        = $.trim($('#RD_NM').val());        //도로명
				dat.OGNL_BLDN_NO = $.trim($('#OGNL_BLDN_NO').val()); //본건물번호
				dat.SB_BLDN_NO   = $.trim($('#SB_BLDN_NO').val());   //부건물번호
				return dat;
			},
			uf_out: function($jq, data, index) {
				var _error_cd = data._error_cd;
				if (data._is_error === 'true') {
					if(_error_cd !== 'SQL010') { //SQL010 - 조회내역이 없습니다.
						// 공통에러일경우 공통팝업으로 보내기
						_this.errfirst = true;
						return MobPopup.showErrorPopupForData(data);
					}
					data.list = [];
				}
				//data.resListData = data.list;
				
				if(data.list.length > 0) {
					$("#address_search_info").hide();
				} else {
					$("#address_search_info").show();
				}
				
				var address_search_rst_list = jex.getJexObj($("#address_search_rst_list"), "JEX_MOBILE_LIST");
				address_search_rst_list.setAll(data.list);
				
				
				return data;
			},
			uf_exec: function() {
				var $div_addr_list = $('#div_addr_list');
				$div_addr_list.show().removeAttr('style');
				
//				var authform_ars_no_list = jex.getJexObj($("#address_search_rst_list"), "JEX_MOBILE_LIST");
//				authform_ars_no_list.setAll(_authform_var.arsNoList);
				
				/**
				//zipcodeInit();
				//comUi.js 의 zipcodeInit() 함수를 가져옴
				for (var i = 0; i < $('.cnt_tbl.zipcode').length; i++) {
					$('.cnt_tbl.zipcode:eq('+i+') tbody').css('height','auto');
					var n = 5; // 결과 노출개수
					if ( $('.cnt_tbl.zipcode:eq('+i+') tbody tr').length > n ) {
						var result = 0;
						for (var j = 0; j < n; j++) {
							var trH = $('.cnt_tbl.zipcode:eq('+i+') tbody > tr:eq('+j+')').outerHeight();
							result = result + trH;
						}
						$('.cnt_tbl.zipcode:eq('+i+') tbody').css('height',result).addClass('scroll_on'); // 결과개수에 맞는 높이적용 및 스크롤활성화
					}
				}
				**/

				if ($('#EMPTY')) {
					$('#etcAddr').hide();
				}
				
				if(_addressForm2_lang == "eng") {
					$("#eng_address").show();
				} else {
					$("#eng_address").hide();
				}
				
				$(document.body).scrollTop($div_addr_list.offset().top);
			}
		},
		
//		//도로명 및 지번 주소 조회
//		fnt_lon_080112_1: {
//			uf_in: function($jq, dat) {
//				dat.RD_NM        = $.trim($('#RD_NM').val());
//				dat.OGNL_BLDN_NO = $.trim($('#OGNL_BLDN_NO').val());
//				dat.SB_BLDN_NO   = $.trim($('#SB_BLDN_NO').val());
//				return dat;
//			},
//			uf_out: function($jq, data, index) {
//				var _error_cd = data._error_cd;
//				if (data._is_error === 'true') {
//					if(_error_cd !== 'SQL010') { //SQL010 - 조회내역이 없습니다.
//						// 공통에러일경우 공통팝업으로 보내기
//						_this.errfirst = true;
//						return MobPopup.showErrorPopupForData(data);
//					}
//					data.list = [];
//				}
//				data.resListData = data.list;
//				return data;
//			},
//			uf_exec: function() {
//				var $div_addr_list = $('#div_addr_list');
//				$div_addr_list.show().removeAttr('style');
//				zipcodeInit();
//
//				if ($('#EMPTY')) {
//					$('#etcAddr').hide();
//				}
//				
//				$(document.body).scrollTop($div_addr_list.offset().top);
//			}
//		},
		
		// 도로명 주소 목록에서 주소 선택
		selectedAddr: function(e) {
			var row_data = $(e.target).parents('li').data('_JEX_GETALL_DATA_');
			
			_this.addr_data = row_data;
			_this.ZPCD      = row_data.ZPCD;
			
			if(_addressForm2_lang == "eng") {
				_this.ADR_CNVS_INPT_BSC_ADR = $.trim(row_data.ENSN_RDN1_ADR);
			} else {
				_this.ADR_CNVS_INPT_BSC_ADR = $.trim(row_data.MAIN_ADDRESS);
			}
			_this.EBNK_EFNC_SRN         = $.trim(row_data.BLDN_MNGM_NO); //건물관리번호

			var $etcAddr = $('#etcAddr');
			jex.setAll($('#etcAddr'), row_data);
			
			//상세주소 초기화
			$('#addr03').val('');

			$etcAddr.show().find('#addr03').val('');
			//$(document.body).scrollTop($etcAddr.offset().top);
			
			if(_addressForm2_lang == "eng") {
				$("#eng_address_etc").show();
			} else {
				$("#eng_address_etc").hide();
			}
			
			comLayerPopUtil.open("address_search_etc_pop");
			
		},

		// 도로명주소 조회값 설정
		setAddr: function($target,skipYn) {
			var $addr03 = $("#addr03");
			if("Y" != skipYn) {
				if (!$addr03.val().trim()) {
					return adrs_com.popup({
						txt: '나머지주소를 입력해주세요.',
						callback: function() {
							$addr03.focus();
						}
					});
				}
			}
			$target.find('.ZIPCODE').val(_this.addr_data.ZPCD);
			$target.find('.ADDR').val(_this.ADR_CNVS_INPT_BSC_ADR);
			$target.find('.ADDR_DTL').val($("#addr03").val());
			$target.find('.BLDN_MNGM_NO').val(_this.EBNK_EFNC_SRN);
			
			comLayerPopUtil.close("address_search_etc_pop");
			uf_goStep($target.closest('[data-jx-step-no]').attr('data-jx-step-no'));
			
			
			
		}
	}
};