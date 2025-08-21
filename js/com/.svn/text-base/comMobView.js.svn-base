var _mobPopup = function() {
	this.$errorPopupObj = $("#comErrorPopup");
	this.$alertPopupObj = $("#comAlertPopup");
	this.$confirmPopupObj = $("#comConfirmPopup");
	this.$confirmPopupObj3 = $("#comConfirmPopup3");
	this.$confirmPopupQckObj = $("#comConfirmQckPopup");
	this.$btnComErrorConfirm = $("#btnComErrorConfirm");
	this.$btnComAlertConfirm = $("#btnComAlertConfirm");
	this.$btnComConfirm = $("#btnComConfirm");
	this.isClickConfirm = undefined; //confirm 팝업에서 취소,확인버튼 클릭여부 - 취소:false,확인:true
	this.isWebViewExitForError = false; //Error팝업에서 확인버튼 눌렀을때 webViewExit호출해줄지의 여부
	/* 에러 팝업 태그 */
	this.getErrorTag = function() {
		var tag = '';
		tag += '<div class="full_popup_wrap active" id="comErrorPopup" style="z-index:15000;">';
		tag += '	<div class="content_wrap ty4">';
		tag += '		<div class="group">';
		tag += '			<div class="layout_error">';
		tag += '				<div class="ico_txt ty1 lottie_case1">';
		tag += '					<div class="lottie_box">';
		tag += '						<lottie-player src="../../../../lottie/complete_fail.json" background="transparent" speed="1" id="comErrorLottie"></lottie-player>';
		tag += '					</div>';
		tag += '					<div class="note_cmt" id="comErrorMsg"></div>';
		tag += '				</div>';
		tag += '				<div class="acd_wrap accodian_wrap ty2 etc2 active">';
		tag += '					<div class="acd_cont accodian_cont">';
		tag += '						<div class="inner" style="display: block">';
		tag += '							<div class="bg_box ty4" id="comErrorCode"></div>';
		tag += '						</div>';
		tag += '					</div>';
		tag += '					<div class="acd_head accodian_head active">';
		tag += '						<button type="button" aria-expanded="false" class="acd_btn">';
		tag += '							<span class="title">더보기</span>';
		tag += '							<span class="title sub">접기</span>';
		tag += '						</button>';
		tag += '					</div>';
		tag += '				</div>';
		tag += '			</div>';
		tag += '		</div>';
		tag += '		<div class="bottom_btn_area ty3">';
		tag += '			<div class="btn_area ty1">';
		tag += '				<button type="button" class="btn s_5 c_3 r_2" id="btnComErrorConfirm">확인</button>';
		tag += '			</div>';
		tag += '		</div>';
		tag += '	</div>';
		tag += '</div>';
		
		return tag;
	},
	/* alert 팝업 태그 */
	this.getAlertTag = function() {
		var tag = '';
		tag += '<div class="layer_popup_wrap" id="comAlertPopup">';
		tag += '	<div class="layer_popup">';
		tag += '		<div class="layer_popup_body">';
		tag += '			<p class="popup_msg_txt1" id="comAlertMsg"></p>';
		tag += '			<p class="popup_msg_txt2" id="comAlertMsg2"></p>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_footer">';
		tag += '			<button type="button" class="btn s_4 c_3 r_2" id="btnComAlertConfirm">확인</button>';
		tag += '		</div>';
		tag += '	</div>';
		tag += '</div>';
		
		return tag;
	},
	/* confirm 팝업 태그 */
	this.getConfirmTag = function() {
		var tag = '';
		tag += '<div class="layer_popup_wrap" id="comConfirmPopup">';
		tag += '	<div class="layer_popup">';
		tag += '		<div class="layer_popup_header">';
		tag += '			<h2 class="tit" id="comConfirmTitle">알림</h2>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_body">';
		tag += '			<p class="popup_msg_txt1" id="comConfirmMsg"></p>';
		tag += '			<p class="popup_msg_txt2 ta_c" id="comConfirmMsg2"></p>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_footer">';
		tag += '			<button type="button" class="btn s_4 c_1 r_2" id="btnComConfirmCancel">취소</button>';
		tag += '			<button type="button" class="btn s_4 c_3 r_2" id="btnComConfirm">확인</button>';
		tag += '		</div>';
		tag += '	</div>';
		tag += '</div>';
		
		return tag;
	},
	/* confirm3 팝업 태그 */
	this.getConfirmTag3 = function() {
		var tag = '';
		tag += '<div class="layer_popup_wrap" id="comConfirmPopup3">';
		tag += '	<div class="layer_popup">';
		tag += '		<div class="layer_popup_body">';
		tag += '			<p class="popup_msg_txt3" id="comConfirmMsg"></p>';
		tag += '			<p class="popup_msg_txt4" id="comConfirmMsg2"></p>';
		tag += '			<p class="bg_box ty1 hoursofuse" id="comConfirmMsg3"></p>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_footer">';
		tag += '			<button type="button" class="btn s_4 c_1 r_2" id="btnComConfirmCancel">취소</button>';
		tag += '			<button type="button" class="btn s_4 c_3 r_2" id="btnComConfirm">확인</button>';
		tag += '		</div>';
		tag += '	</div>';
		tag += '</div>';
		
		return tag;
	},
	/* confirm 팝업 태그 */
	this.getConfirmQckTag = function() {
		var tag = '';
		tag += '<div class="layer_popup_wrap" id="comConfirmQckPopup">';
		tag += '	<div class="layer_popup">';
		tag += '		<div class="layer_popup_header">';
		tag += '			<h2 class="tit" id="comConfirmTitle">알림</h2>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_body">';
		tag += '			<p class="popup_msg_txt1" id="comConfirmMsg"></p>';
		tag += '			<p class="popup_msg_txt2 ta_c" id="comConfirmMsg2"></p>';
		tag += '		</div>';
		tag += '		<div class="layer_popup_footer">';
		tag += '			<button type="button" class="btn s_4 c_1 r_2" id="btnComConfirmCancel">취소</button>';
		tag += '			<button type="button" class="btn s_4 c_3 r_2" id="btnComConfirm">확인</button>';
		tag += '		</div>';
		tag += '	</div>';
		tag += '</div>';
		
		return tag;
	},
	/* Popup 보여줌 */
	this.show = function($popupObj){
		$popupObj.hide();
		setTimeout(function(){
			$(".container_wrap").attr("aria-hidden", "true");
	
			//scroll 문제를 해결하기 위한 css 시작
			var winTH = $(window).height();
			var docuHT = $(window).height();
			$('body').height(docuHT);
			$('body').css({overflow:'hidden'});
			$('body').css({overflow:'hidden'}).height(winTH);
			$('#comPopupBackground').height(docuHT);
	//			$popupObj.show();
			$.nativeCall('redraw');
		},160);
		
	},
	/* Popup 숨김 */
	this.hide = function($popupObj) {
		nativeDimm.hide();
		$popupObj.hide();
		$popupObj.removeClass("active");
	},
	/* uf_back에서 사용하는 error popup 닫기 함수 */
	this.hideErrorPopupForBack = function() {
		if(0 != MobPopup.$errorPopupObj.length) {
			if("none" != MobPopup.$errorPopupObj.css("display")) {
				MobPopup.$errorPopupObj.hide();
				MobPopup.$errorPopupObj.removeClass("active");
			}
		}
	},
	/* error 팝업 */
	this.showErrorPopupForData = function(data, callback) {
		if(typeof data["_tran_res_data"] != "undefined") {
			var code = data["_tran_res_data"][0]["_error_cd"];
			var msg  = data["_tran_res_data"][0]["_error_msg"];
		}
		else {
			var code = data["_error_cd"];
			var msg  = data["_error_msg"];
		}
		
		this.showErrorPopup(code, msg, callback);
	},
	/* error 팝업 */
	this.showErrorPopup = function(code, msg, callback) {
		try {
			if(typeof _thisSForm_ExeBtn != "undefined") _thisSForm_ExeBtn = true;	//W클릭 방지 2013.05.10 [secretForm이체성거래 Button able]
			
			if($.trim(code) == "9992") { //서비스이용가능시간
				//서비스이용가능시간 check 링크
				if(_isIphone()) {
					setTimeout(function() {
						location.href = _HOST_NAME + "/jsp/com/comMobServiceTimeCheck.jsp?message=" + msg;
					}, 500);
				}
				else {
					location.href = _HOST_NAME + "/jsp/com/comMobServiceTimeCheck.jsp?message=" + msg;
				}
				return;
			}
			
			jex.plugin.get("JEX_MOBILE_STEP").hideAll();
			
			if(isEmpty(code)) {
				code = "";
			}
			
			if($.trim(code)=="svc_stop_err1"){		//거래 정지
				nativeIndicator.hide(); // location이 변경되므로 현재처리 되고 있는 indicator 은 hide 시킨다.
				//SWS > 공통관리 > 뱅킹관리 > 실시간거래제어에서 서비스 중지를 세팅 했을 떄
				if (_isIphone()) {
					setTimeout( function() {
						location.href = _HOST_NAME + "/jsp/com/comMobServiceStopMsg.jsp?message="+msg;
					},500);
				} else {
					location.href = _HOST_NAME + "/jsp/com/comMobServiceStopMsg.jsp?message="+msg;
				}
				return;
			}else if($.trim(code)=="err_prdc_error"){		//상품별 거래시간 제한
				nativeIndicator.hide(); // location이 변경되므로 현재처리 되고 있는 indicator 은 hide 시킨다.
				//SWS > 공통관리 > 뱅킹관리 > 상품별 거래시간제한에서 서비스 중지를 세팅 했을 떄
				if (_isIphone()) {
					setTimeout( function() {
						location.href = _HOST_NAME + "/jsp/com/comMobServicePrdcMsg.jsp?prdccode="+msg;
					},500);
				} else {
					location.href = _HOST_NAME + "/jsp/com/comMobServicePrdcMsg.jsp?prdccode="+msg;
				}
				return;
			}else if($.trim(code)=="trn_cntl_error"){		//기능별 거래 제어
				nativeIndicator.hide(); // location이 변경되므로 현재처리 되고 있는 indicator 은 hide 시킨다.
				if (_isIphone()) {
					setTimeout( function() {
						location.href = _HOST_NAME + "/jsp/com/comMobPfncTrnCntlMsg.jsp?param="+msg;
					},500);
				} else {
					location.href = _HOST_NAME + "/jsp/com/comMobPfncTrnCntlMsg.jsp?param="+msg;
				}
				return;
			}
			// 세션종료에 의한 에러는 바로 네이티브 메인으로 아웃
			else if($.trim(code)=="9999" || $.trim(code)=="100" || $.trim(code)=="CI1001") {
				_webViewExit('sessionOutWithAlert');
				return;
			}
			else if($.trim(code)=="702"){	//중복로그인
				_webViewExit('sessionOut2');
				return;
			}
			else if($.trim(code)=="WEB014") { //보안키패드 암호화 text를 복호화 할 때 발생하는 오류
				comWebKey_updateTempSecureKey();
			}
			else if($.trim(code)=="B00070"){	// 이체제한시간에 이체메뉴 접근 시
				location.href = _HOST_NAME + "/jsp/com/comMobTranStopMsg.jsp";
				
				return;
			}
	
			var _this = this;
			
			this.$errorPopupObj = {};
			this.$btnComErrorConfirm = {};
			this.isWebViewExitForError = false;
			$("#comErrorPopup").remove();
			
			$(".wrap").prepend(this.getErrorTag());
			this.$errorPopupObj = $("#comErrorPopup");
			this.$btnComErrorConfirm = $("#btnComErrorConfirm");
			
			this.$errorPopupObj.find("#comErrorMsg").html(msg);
			
			if(isEmpty(code) == false) {
				this.$errorPopupObj.find("#comErrorCode").html(code + "");
			}
			
			//에러팝업 확인버튼 클릭
			this.$errorPopupObj.find("#btnComErrorConfirm").off("click").on("click",function() {
				_this.$errorPopupObj.removeClass("active");
				
				_this.hideErrorPopup(callback);
			});
			
			setTimeout(function() {
				comLottieUtil.play("comErrorLottie");
			}, 500);
			
			//현제 stepNo 를 이전 stepNo로 설정
			var stepNo = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
			jex.plugin.get("JEX_MOBILE_STEP").setPrevStepNo(stepNo);
		} catch(e) {bizException(e, "showErrorPopup");}
	},
	/* alert 팝업 */
	this.showAlertPopup = function(msg, title, callback, msg2) {
		try {
			var _this = this;
			
			if(typeof _thisSForm_ExeBtn != "undefined") _thisSForm_ExeBtn = true;	//W클릭 방지 2013.05.10 [secretForm이체성거래 Button able]
			
			if(isEmpty(title)) {
				title = "안내";
			}
			
			if(this.$alertPopupObj.length == 0) {
				$("body").prepend(this.getAlertTag());
				this.$alertPopupObj = $("#comAlertPopup");
				this.$btnComAlertConfirm = $("#btnComAlertConfirm");
			}
			
			this.$alertPopupObj.find("#comAlertMsg").html(msg);
			
			if(isEmpty(msg2)) {
				this.$alertPopupObj.find("#comAlertMsg2").hide();
			}
			else {
				this.$alertPopupObj.find("#comAlertMsg2").show();
				this.$alertPopupObj.find("#comAlertMsg2").html(msg2);
			}
			
			//alert 팝업의 확인버튼 클릭
			this.$alertPopupObj.find("#btnComAlertConfirm").off("click").on("click", function() {
				_this.hideAlertPopup(callback); //alert 팝업 닫기
			});
			
			if(_getPhoneType() == "A") { //안드로이드
				setTimeout(function() {
					comLayerPopUtil.open("comAlertPopup");
				}, 300);
			}
			else {
				comLayerPopUtil.open("comAlertPopup");
			}
		} catch(e) {bizException(e, "showAlertPopUp");}
	},
	/* confirm 팝업 */
	this.showConfirmPopup3 = function(msg, title, cbConfirm, cbCancel, msg2, msg3) {
		try {
			var _this = this;
			
			this.isClickConfirm = undefined;
			
			if(isEmpty(title)) {
				title = "안내";
			}
			
			if(this.$confirmPopupObj3.length == 0) {
				$("body").prepend(this.getConfirmTag3());
				this.$confirmPopupObj3 = $("#comConfirmPopup3");
				this.$btnComConfirm = $("#btnComConfirm");
			}
			
			this.$confirmPopupObj3.find("#comConfirmMsg").html(msg);
			
			if(isEmpty(msg2)) {
				this.$confirmPopupObj3.find("#comConfirmMsg2").hide();
			}
			else {
				this.$confirmPopupObj3.find("#comConfirmMsg2").show();
				this.$confirmPopupObj3.find("#comConfirmMsg2").html(msg2);
			}
			
			if(isEmpty(msg3)) {
				this.$confirmPopupObj3.find("#comConfirmMsg3").hide();
			}
			else {
				this.$confirmPopupObj3.find("#comConfirmMsg3").show();
				this.$confirmPopupObj3.find("#comConfirmMsg3").html(msg3);
			}
			
			this.$confirmPopupObj3.find("#btnComConfirmCancel").off("click").on("click", function() {
				_this.isClickConfirm = false;
				_this.hideConfirmPopup3(cbCancel);
			});
			
			this.$confirmPopupObj3.find("#btnComConfirm").off("click").on("click",function() {
				_this.isClickConfirm = true;
				_this.hideConfirmPopup3(cbConfirm);
			});
			
			comLayerPopUtil.open("comConfirmPopup3");
		} catch(e) {bizException(e, "showConfirmPopup3");}
	},
	/* confirm 팝업 */
	this.showConfirmPopup = function(msg, title, cbConfirm, cbCancel, msg2, titleShowYn) {
		try {
			var _this = this;
			
			this.isClickConfirm = undefined;
			
			if(isEmpty(title)) {
				title = "안내";
			}
			
			if(isEmpty(titleShowYn)) {
				titleShowYn = "N";
			}
			
			if(this.$confirmPopupObj.length == 0) {
				$("body").prepend(this.getConfirmTag());
				this.$confirmPopupObj = $("#comConfirmPopup");
				this.$btnComConfirm = $("#btnComConfirm");
			}
			
			if(titleShowYn == "Y") {
				this.$confirmPopupObj.find("#comConfirmTitle").html(title);
				this.$confirmPopupObj.find("#comConfirmTitle").parent().show();
			}
			else {
				this.$confirmPopupObj.find("#comConfirmTitle").parent().hide();
			}
			
			this.$confirmPopupObj.find("#comConfirmMsg").html(msg);
			
			if(isEmpty(msg2)) {
				this.$confirmPopupObj.find("#comConfirmMsg2").hide();
			}
			else {
				this.$confirmPopupObj.find("#comConfirmMsg2").show();
				this.$confirmPopupObj.find("#comConfirmMsg2").html(msg2);
			}
			
			this.$confirmPopupObj.find("#btnComConfirmCancel").off("click").on("click", function() {
				_this.isClickConfirm = false;
				_this.hideConfirmPopup(cbCancel);
			});
			
			this.$confirmPopupObj.find("#btnComConfirm").off("click").on("click",function() {
				_this.isClickConfirm = true;
				_this.hideConfirmPopup(cbConfirm);
			});
			
			if(_getPhoneType() == "A") { //안드로이드
				setTimeout(function() {
					comLayerPopUtil.open("comConfirmPopup");
				}, 300);
			}
			else {
				comLayerPopUtil.open("comConfirmPopup");
			}
		} catch(e) {bizException(e, "showConfirmPopup");}
	},
	/* 버튼명 설정 confirm 팝업 */
	this.showConfirmQckPopup = function(msg, title, cbConfirm, cbCancel, btnTitleCancel, btnTitleConfirm, msg2, titleShowYn) {
		try {
			var _this = this;
			
			this.isClickConfirm = undefined;
			
			if(isEmpty(title)) {
				title = "안내";
			}
			
			if(isEmpty(titleShowYn)) {
				titleShowYn = "N";
			}
			
			//버튼명 설정 (확인)
			if(isEmpty(btnTitleConfirm)) {
				btnTitleConfirm = "확인";
			}
	
			//버튼명 설정 (취소)
			if(isEmpty(btnTitleCancel)) {
				btnTitleCancel = "서비스 재설정";
			}
			
			if(this.$confirmPopupQckObj.length == 0) {
				$("body").prepend(this.getConfirmQckTag());
				this.$confirmPopupQckObj = $("#comConfirmQckPopup");
				this.$btnComConfirm = $("#btnComConfirm");
			}
			
			if(titleShowYn == "Y") {
				this.$confirmPopupQckObj.find("#comConfirmTitle").html(title);
				this.$confirmPopupQckObj.find("#comConfirmTitle").parent().show();
			}
			else {
				this.$confirmPopupQckObj.find("#comConfirmTitle").parent().hide();
			}
			
			this.$confirmPopupQckObj.find("#comConfirmMsg").html(msg);
			
			if(isEmpty(msg2)) {
				this.$confirmPopupQckObj.find("#comConfirmMsg2").hide();
			}
			else {
				this.$confirmPopupQckObj.find("#comConfirmMsg2").show();
				this.$confirmPopupQckObj.find("#comConfirmMsg2").html(msg2);
			}
			
			this.$confirmPopupQckObj.find("#btnComConfirm").html(btnTitleConfirm);
			this.$confirmPopupQckObj.find("#btnComConfirmCancel").html(btnTitleCancel);
			
			this.$confirmPopupQckObj.find("#btnComConfirmCancel").off("click").on("click",function() {
				_this.isClickConfirm = false;
				_this.hideConfirmQckPopup(cbCancel);
			});
			
			this.$confirmPopupQckObj.find("#btnComConfirm").off("click").on("click",function() {
				_this.isClickConfirm = true;
				_this.hideConfirmQckPopup(cbConfirm);
			});
			
			comLayerPopUtil.open("comConfirmQckPopup");
		} catch(e) {bizException(e, "showConfirmQckPopup");}
	},
	/* 에러팝업 확인버튼 */
	/* ************************************************************************
	 * 	 Title : 이체성 거래중 에러가 발생시 페이지 이동 처리부분
	 * 	- 현재스텝 유지 : OTP 1~9회오류 / 계좌비밀번호 1~2회오류 / 이용자비밀번호 1~2회 오류
	 * 	- 첫페이지 이동 : OTP 10회 오류 / 이용자비밀번호 3회 오류 / 계좌비밀번호 3회 오류
	 *  - OTP시간 재설정 오류 발생시 : OTP시간재설정 화면으로 이동 처리
	 **************************************************************************/
	this.hideErrorPopup = function(errCallBackFunc) {
		var code = $.trim($("#comErrorCode").text());
		code = code.replace(/[^0-9a-zA-Z]/g,"");
		// webVeiw 나가도록 설정된 경우
		/*
		 * 9999	- 세션이 종료되었습니다.
		 * 9993 - 비정상적인 접근입니다!\n확인후 다시 거래 하여 주시길 바랍니다.
		 * 9995 - 개인이용시간제한
		 * 702  - 중복로그인되었습니다.
		 */
		if(code == "9999" || code == "9993" || code=='9995') {
			//_callAppAction("1002", "false"); 모바일에서는 1002 제거
			//_callAppAction("5101", "false");	//로그아웃 후 홈으로 이동
			_webViewExit('sessionOut');
		}
		else if(code == "EIISCOM00317"//펀드 거래 마감
			|| code == "ECBKTRA10012"	//처리중 오류가 밣생했습니다. 고객센터에 문의 바랍니다.
			){
			location.reload(true);
		}
		else if(code == "702") {
			_webViewExit('sessionOut2');
			return;
		}
		else if(this.isErrorCodeForExit()) {
			_webViewExit();
		}
		else {
			this.hide(this.$errorPopupObj);
	
			//결재함 반송에서 오류 발생 시 결재함 상세(step31)로 이동
			if(jex.plugin.get("JEX_MOBILE_STEP").getStepNo() == 98) {
				uf_goStep(31);
			}
			else if((code == "ECBKEBK01112") || (code == "ECBKEBK01199") ||	// OTP입력오류
					(code == "ECBKEBK01113") || (code == "ECBKEBK01200") ||
					(code == "ECBKEBK01114") || (code == "ECBKEBK01201") ||
					(code == "ECBKEBK01183") || (code == "ECBKEBK01202") ||
					(code == "ECBKEBK01203") ||
					(code == "ECBKEBK01185") || (code == "ECBKEBK01204") ||
					(code == "ECBKEBK01186") || (code == "ECBKEBK01205") ||
					(code == "ECBKEBK01187") || (code == "ECBKEBK01188") ||
					(code == "ECBKEBK01115") ||
					(code == "ECBKEBK00090") || (code == "ECBKEBK00091")){		// 이용자비밀번호 1~2회 오류
				jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
			}
			// 2013.07.30 계좌비밀오류시만 리로드
			// ECBKEBK00120, ECBKEBK00121 - 계좌비밀번호 1~2회 오류
			// EIISIIZ00001, EIISIIZ00002 계좌비밀번호 1,2회 오류
			else if(code == "ECBKEBK00120" || code == "ECBKEBK00121" ||
					code == "EIISIIZ00001" || code == "EIISIIZ00002") {
				jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
			}
			/*ECBKEBK01184
			 * WEB008 - 공휴일은 예약이체일로 지정할 수 없습니다.
			 * WEB009 - 예약이체는 현재시간에서 1시간 이후부터 가능합니다.
			 */
			else if(code == "WEB008" || code == "WEB009"){
				comWebkey_goMenu("5005", "fnt_trn_030101_1", "");
			}
			// 인증 관련 검증 실패 코드
			else if(code == "WEB9999"){
				_webViewExit();
			}
			else {
				//callback함수 호출
				if("function" == typeof(errCallBackFunc)) { //콜백함수: 에러팝업창 뜬후 [확인]이나 [백]버튼 클릭시 그후의 작업기술..
					errCallBackFunc.apply();
				}
				else {
					//이전 step으로 이동
					if($('[data-jx-step]').is(':visible')) {
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
					}
					else {
						_webViewExit();
					}
				}
			}
		}
	},
	/**
	 * 현재 에러팝업의 에러코드가 webViewExit 처리하는 에러인지 여부 반환
	 */
	
	this.isErrorCodeForExit = function(){
		var code = $.trim($("#comErrorCode").text());
		code = code.replace(/[^0-9a-zA-Z]/g,"");
		var errorCodeForExit = false;
		// webVeiw 나가도록 설정된 경우
		if(this.isWebViewExitForError){
			this.isWebViewExitForError = false;
			errorCodeForExit = true;
		}
		/* 9991	  - 일자전환중입니다.
		 * 100    - 장시간 사용하지 않아 접속이 종료되었습니다. 다시 로그인하여 주시기 바랍니다.
		 * BIZ992 - 거래응답시간 초과입니다. 확인후 다시 거래하시기 바랍니다.
		 * BC0219 - BC카드 미발급
		 * BC0067 - 신용카드 포인트조회 거래시간처리 경과
		 * FRS99999 - 시스템오류
		 * 00C021 - 데이터가 존재하지 않습니다. 문의전화 : 신탁사업단 02-6322-5394/5142/5329
		 * ECBKEBK00469 - 씨크릿카드 3회이상 오류입니다.
		 * SE0001 - 보안계좌로 등록할 계좌가 없습니다.
		 *
		 * 금융상품
		 * AR832 , AR833 : 이미 가입하신 회원입니다.
		 * ECBKEXT00775        : 미개시 상태입니다.
		 * ECBKARR03333		 : 대상계좌가 없거나 스마트 FUN정기적금 또는 정기예금 미가입 고객입니다.
		 * 910001	: 요청한 정보를 찾지 못했습니다．확인후 다시거래하세요
		 *
		 * ECBKEBK00124  - 계좌비밀번호 3회오류
		 * ECBKEBK01189  - OTP 10회오류
		 * ECBKEBK00034  - 보안카드 3회오류
		 * ECBKEBK00025  - 출금계좌오류횟수 초과입니다. 신분증 지참후 가까운 저희은행 영업점에 방문하셔서 계좌비밀번호 오류해제거래를 요청하신 후 사용하십시오.
		 * ECBKEBK01439   - OTP 10회이상오류
		 * EIISIIZ00003	- 계좌비밀번호 3회오류
		 * EIISIIZ00004	- 계좌비밀번호 오류초과
		 * BC0702  - 해지예정등록된 회원이므로 해지처리가 불가능합니다. 부득히 당일 해지를 원하실경우에는 가까운영업점에 방문해주십시요.
		 * MOB001 	- 죄송합니다. 고객님께서 선택하신 서비스는 현재 사용하실 수 없는 서비스입니다. 서비스이용 가능시간에 이용하여 주십시오.
		 */
	
		//TODO 테스트로 임시 코드 제거중  || code == "00C021"
		else if
		(	   code =="9991" 	|| code =="BC0219" 		|| code =="100" 	|| code=="BC0067"
			|| code == "BIZ992" || code == "FRS99999" 	|| code == "ECBKEBK00469"
			|| code == "SE0001"	|| code == "ECBKEBK00124" 	|| code == "ECBKEBK01439"
			|| code =="ECBKEBK01189"	|| code =="ECBKEBK00034"		|| code == "ECBKEBK00025" || code == "BC0702"
			|| code =="AR832" 	|| code =="AR833" 		|| code =="ECBKEXT00775"
			|| code =="ECBKARR03333"  || code == "MOB001"
			|| code == "EIISIIZ00003" || code == "EIISIIZ00004"
		){
			errorCodeForExit = true;
		}
		// ECRDCOM03528 - 거래의 해당 내역이 존재하지 않습니다.(신용카드 카드사용등록/해지)
		/*
		else if
		(			code =="ECRDCOM03528"
		){
			var pathName = $(location).attr("pathname");
	
			// 카드사용등록/해지 일경우 메인화면으로(신용카드)
			if(9 == pathName.indexOf("phone/crd/crd080")){
				errorCodeForExit = true;
			}
			// 다른 서비스일경우 이전화면으로
			else {
				jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
			}
		}
		*/
		/*
		 * ECBKEBK01685  - 이미  스마트  뱅킹에  가입되어  있습니다．
		 * ECBKEBK01208 - OTP 10회오류
	
		 * [com_CHECK_TRANERROR.jsp]이체성 거래의 보안매체및 이체비밀번호 관련 에러 처리
		 * W98000~W98003,W98017,W00095,W98016,W98018,W98007,W98008
		 * W00141 - 전자서명에러
		 * ECBKEBK10459 - ONE ID 비밀번호 5회오류
		 */
		else if(code=="ECBKEBK00222" 	|| code=="ECBKEBK01208"
			|| code=="ECBKEBK01251"	|| code=="ECBKEBK00092" || code=="ECBKEBK01685"
			|| code=="W98000" 	|| code=="W98001" || code=="W98002"
			|| code=="W98003"	|| code=="W98017" || code=="W00095"
			|| code=="W98016" 	|| code=="W98018" || code=="W98007"
			|| code=="W98008"	|| code == "W00141" || code =="ECBKEBK10459"
		){
			errorCodeForExit = true;
		}
		else {
			errorCodeForExit = false;
		}
	
		return errorCodeForExit;
	},
	/* alert 팝업 닫기 */
	this.hideAlertPopup = function(cbAlert) {
		if(!isEmpty(cbAlert) && (typeof(cbAlert) == "function")) { //콜백함수가 있을경우
			comLayerPopUtil.close("comAlertPopup", function() {
				cbAlert.apply();
			});
		}
		else {
			comLayerPopUtil.close("comAlertPopup");
		}
	},
	/* confirm 팝업 닫기 */
	this.hideConfirmPopup = function(cbConfirm) {
		if(!isEmpty(cbConfirm) && (typeof(cbConfirm) == "function")) { //콜백함수가 있을경우
			comLayerPopUtil.close("comConfirmPopup", function() {
				cbConfirm.apply();
			});
		}
		else {
			comLayerPopUtil.close("comConfirmPopup");
		}
	},
	this.hideConfirmPopup3 = function(cbConfirm) {
		if(!isEmpty(cbConfirm) && (typeof(cbConfirm) == "function")) { //콜백함수가 있을경우
			comLayerPopUtil.close("comConfirmPopup3", function() {
				cbConfirm.apply();
			});
		}
		else {
			comLayerPopUtil.close("comConfirmPopup3");
		}
	},
	/* confirm 팝업 hide*/
	this.hideConfirmQckPopup = function(cbConfirm) {
		if(!isEmpty(cbConfirm) && (typeof(cbConfirm) == "function")) { //콜백함수가 있을경우
			comLayerPopUtil.close("comConfirmQckPopup", function() {
				cbConfirm.apply();
			});
		}
		else {
			comLayerPopUtil.close("comConfirmQckPopup");
		}
	},
	/* error popup이 열렸는지 여부 알려줌*/
	this.isOpenErrorPopup = function(){
		var isOpenError = false;
		var code = "";
	
		if(this.$errorPopupObj.length > 0 && this.$errorPopupObj.hasClass("active")) {
			isOpenError = true;
			code = this.$errorPopupObj.find("#comErrorCode").html();
			code = code.replace(/[^0-9a-zA-Z]/g, "");
			this.hide(this.$errorPopupObj);
	
			/**
			 * 9992 - 서비스이용가능시간 아님
			 * 9993 - 비정상적접근
			 * 9999 - 세션종료
			 */
			if(code=="9999" || code=="9993"){
				//_callAppAction("5101", "false");	//로그아웃 후 홈으로 이동
				_webViewExit('sessionOut');
			}else if(code=="702"){
				_webViewExit('sessionOut2');
			}
			/**
			 * 9992 	- 서비스이용가능시간
			 */
			else if("9992" == code ){
				_webViewExit();
			}else if(this.isErrorCodeForExit()){
				_webViewExit();
			}else{
				jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
			}
		}
	
		return isOpenError;
	},
	/* alert popup이 열렸는지 여부 알려줌*/
	this.isOpenAlertPopup = function() {
		var isOpenAlert = false;
		if(this.$alertPopupObj.length > 0 && this.$alertPopupObj.hasClass("active")) {
			isOpenAlert = true;
			this.hideAlertPopup();
		}
		return isOpenAlert;
	},
	/* confirm popup이 열렸는지 여부 알려줌*/
	this.isOpenConfirmPopup = function() {
		var isOpenConfirm = false;
		if(this.$confirmPopupObj.length > 0 && this.$confirmPopupObj.hasClass("active")) {
			isOpenConfirm = true;
			this.hideConfirmPopup();
		}
		return isOpenConfirm;
	}
};

var MobPopup = new _mobPopup();