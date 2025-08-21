//휴대폰명의인증(본인인증) hpAuthform 플러그인에서 사용하는 변수정의
var _hpAuthform_var = {};

(function() {
	var sForm_attrs = {
		"id"					: "data-jx-hpAuthform"							// [required] 휴대폰 본인인증 Element ID
		,"parentId" 			: "data-jx-hpAuthform-parent-id"				// [required] 상위 Step ID
		,"nextFunction"			: "data-jx-hpAuthform-next-execute-function"	// [required] 휴대폰 본인인증 '다음' 버튼 처리 함수
		,"bznDisplayYn"			: "data-jx-hpAuthform-bzn-display-yn"			// [option]   비로그인 시 사업자번호 입력항목 노출 여부  (default : Y)
		,"bznCheckFunction"		: "data-jx-hpAuthform-bzn-check-function"		// [option]   비로그인 시 사업자번호를 입력 받은 경우 '인증번호 요청하기' 버튼을 클릭 시 먼저 사업자번호를 확인하는 함수
		,"useOtherAuthYn"		: "data-jx-hpAuthform-use-other-auth-yn"		// [option]   다른 방법으로 인증 노출 여부  (default : Y)
		,"vidBznDisplayYn"		: "data-jx-hpAuthform-vid-bzn-display-yn"		// [option]   공동/금융인증서 인증 시 사업자번호 입력항목 노출 여부  (default : N)
		,"vidNameDisplayYn"		: "data-jx-hpAuthform-vid-name-display-yn"		// [option]   공동/금융인증서 인증 시 이름 입력항목 노출 여부  (default : N)
		,"vidHpNoDisplayYn"		: "data-jx-hpAuthform-vid-hpno-display-yn"		// [option]   공동/금융인증서 인증 시 휴대폰번호 입력항목 노출 여부  (default : N)
		,"edpsCsnDisplayYn"		: "data-jx-hpAuthform-edps-csn-display-yn"		// [option]   IBK인증서(본인확인) 테스트시 개인 전산번호 입력항목 노출 여부  (default : N)
		,"juminFullDisplayYn"	: "data-jx-hpAuthform-jumin-full-display-yn"	// [option]   비로그인 시 주민번호 전체 입력 여부 (default : Y)
		,"loginCheckYn"			: "data-jx-hpAuthform-login-check-yn"			// [option]   로그인 체크 여부 (default : Y), (N일 경우 로그인 여부를 확인하지 않음)
	};
	
	var JexMobileHpAuthForm = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			this.$object = $jq;
		},
		execute : function(evt, $jq) {
		},
		initVar : function() {
			_hpAuthform_var = {
				  isHpAuth				: false	//휴대폰명의인증(본인인증)여부
				, isLogin				: false	//로그인여부
				, thisSForm				: ""	//hpAuthform 객체
				, parentThis			: ""	//업무의 _this 객체
				, parentObj				: ""	//hpAuthform을 포함하고 있는 부모객체
				, parentStep			: ""	//hpAuthform을 포함하고 있는 부모step
				, rppr_nm				: ""	//성명
				, sms_send_hp_no		: ""	//핸드폰번호
				, jumin1				: ""	//주민등록번호 앞자리(6자리)
				, jumin2				: ""	//주민등록번호 뒷자리(7자리) 보안키패드 realValue값
				, is_send_sms			: false	//인증번호 발송여부
				, tlgr_msnm_rqst_no		: ""	//인증번호
				, cpn_dcd				: ""	//통신사코드
				, nextFunction			: ""	//hpAuthform 다음/확인 할 function
				, callBackFunc			: ""	//Callback
				, CI_FILE_NM			: ""	//CI 파일
				, DI_FILE_NM			: ""	//DI 파일
				, BIRT_YMD				: ""	// 생일
				, GNDR_DCD				: ""	// 성별
				, NATL_CLCD				: ""	// 국가
				, CLPH_SENM_CRTC_APCT_NM: ""	// 휴대폰본인명의인증신청자명
				, bznDisplayYn			: "Y"	// 비로그인 시 사업자번호 입력항목 노출 여부  (default : Y)
				, bznCheckFunction		: ""	// 비로그인 시 사업자번호를 입력 받은 경우 '인증번호 요청하기' 버튼을 클릭 시 먼저 사업자번호를 확인하는 함수
				, useOtherAuthYn		: "Y"	// 다른 방법으로 인증 노출 여부  (default : Y)
				, vidBznDisplayYn		: "N"	// 인증서 인증 시 사업자번호 입력항목 노출 여부  (default : N)
				, vidNameDisplayYn		: "N"	// 인증서 인증 시 이름 입력항목 노출 여부  (default : N)
				, vidHpNoDisplayYn		: "N"	// 인증서 안중 시 휴대폰번호 입력항목 노출 여부  (default : N)
				, edpsCsnDisplayYn		: "N"	// IBK인증서(본인확인) 테스트시 개인 전산번호 입력항목 노출 여부  (default : N)
				, juminFullDisplayYn	: "Y"	// 비로그인 시 주민번호 전체 입력 여부 (default : Y)
				, moauthYn				: "Y"	// 비로그인 시 mo인증 사용여부  (default : Y)
				, loginCheckYn			: "Y"	// 로그인 체크 여부  (default : Y)
				, isMoAuth				: false
				, formHtml				: ""
				, moAuthFailMsg			: ""
				, termCheckYn			: "N"
			};
			this.setVar();
		},
		setVar : function(){
			_hpAuthform_var.thisSForm  = this;  //this of jex.mobile.hpAuthform.js
			_hpAuthform_var.parentThis = _this; //업무단 js 파일에서 정의되어 있는 _this
			var parentId = _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.parentId); //상위 Step 이나 영역 Id
			parentId = parentId == undefined ? "#step" : "#" + parentId; //상위 Object id
			_hpAuthform_var.parentStep = parentId.substring(1);
			_hpAuthform_var.parentObj = $(parentId);
			
			_hpAuthform_var.nextFunction		= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.nextFunction); 	//휴대폰명의인증(본인인증) hpAuthform 다음/확인 할 function
			_hpAuthform_var.bznDisplayYn		= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.bznDisplayYn) == undefined ? _hpAuthform_var.bznDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.bznDisplayYn);
			_hpAuthform_var.useOtherAuthYn		= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.useOtherAuthYn) == undefined ? _hpAuthform_var.useOtherAuthYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.useOtherAuthYn);
			_hpAuthform_var.vidBznDisplayYn		= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidBznDisplayYn) == undefined ? _hpAuthform_var.vidBznDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidBznDisplayYn);
			_hpAuthform_var.bznCheckFunction	= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.bznCheckFunction); 	//비로그인 시 사업자번호를 입력 받은 경우 '인증번호 요청하기' 버튼을 클릭 시 먼저 사업자번호를 확인하는 함수
			_hpAuthform_var.vidNameDisplayYn	= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidNameDisplayYn) == undefined ? _hpAuthform_var.vidNameDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidNameDisplayYn);
			_hpAuthform_var.vidHpNoDisplayYn	= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidHpNoDisplayYn) == undefined ? _hpAuthform_var.vidHpNoDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.vidHpNoDisplayYn);
			_hpAuthform_var.edpsCsnDisplayYn 	= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.edpsCsnDisplayYn) == undefined ? _hpAuthform_var.edpsCsnDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.edpsCsnDisplayYn);
			_hpAuthform_var.juminFullDisplayYn 	= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.juminFullDisplayYn) == undefined ? _hpAuthform_var.juminFullDisplayYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.juminFullDisplayYn);
			_hpAuthform_var.loginCheckYn		= _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.loginCheckYn) == undefined ? _hpAuthform_var.loginCheckYn : _hpAuthform_var.thisSForm.$object.attr(sForm_attrs.loginCheckYn);

			if(_hpAuthform_var.loginCheckYn == "Y"){
				comUtil_getBasicInfo({"need_item" : "cus_info"}, function(data){
					var basicInfo = this; //JSON data
					if(basicInfo.LOGIN_YN == "Y"){
						var ajax = jex.createAjaxUtil("com_utl_080101_1"); //고객정보조회
						ajax.set("task_package",    "com");
						ajax.set("task_subpackage", "utl");
						ajax.set("USER_INFO_TYPE",  "AUTH");
						ajax.setAsync(false);
						ajax.errorTrx = false;
						ajax.execute(function(dat) {
							var res_data = dat["_tran_res_data"][0];
							var hpNo = res_data["CLPH_LLN_1"]+res_data["CLPH_TON_1"]+res_data["CLPH_SRN_1"];
							_hpAuthform_var.jumin1 = res_data["RPPR_RRN"].substring(0,6);
							_hpAuthform_var.jumin2 = res_data["RPPR_RRN"].substring(6,13);
							_hpAuthform_var.rppr_nm = res_data["RPPR_KRN_NM"];
							_hpAuthform_var.sms_send_hp_no =  hpNo;//휴대폰번호
							_hpAuthform_var.isLogin = true;
						});
					}
				});
			}
		},
		getHpAuthForm : function(func) {
			this.initVar();

			if(typeof func == "function") {
				_hpAuthform_var.callBackFunc = func;
			}
			
			if(_isRealApp && _isDevMode && !_hpAuthform_var.isLogin){
				MobPopup.showConfirmPopup("[개발] MO인증을 확인 하시겠습니까?", "", function() {
					_hpAuthform_var.moauthYn = "Y";
					_hpAuthform_var.thisSForm.getHpAuthFormHtml();
				},
				function() {
					_hpAuthform_var.moauthYn = "N";
					_hpAuthform_var.thisSForm.getHpAuthFormHtml();
				});
			}else{
				_hpAuthform_var.thisSForm.getHpAuthFormHtml();
			}
		},
		getHpAuthFormHtml : function() {
			var formFilePath = "../../com/hpAuthform.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/hpAuthform.html";
			}
			
			$.ajax({
				url:formFilePath,
				type:'get',
				async: false,
				success: function(dat){
					_hpAuthform_var.thisSForm.overrideUfBack();
					_hpAuthform_var.thisSForm.appendHpAuthForm(dat);
					_hpAuthform_var.thisSForm.moAuthCheck();
				}
			});
		},
		appendHpAuthForm : function(dat) {
			_hpAuthform_var.formHtml = $(dat);
			
			if($("#moauth_pop").length == 0) {
				$("#step").append(_hpAuthform_var.formHtml.find("#moauth_pop"));
				jex.setJexObj($("#moauth_pop"));
			}
			
			if($("#com_fnc_020101_1").length == 0) {
				$("#step").append(_hpAuthform_var.formHtml.find("#com_fnc_020101_1"));
				jex.setJexObj($("#com_fnc_020101_1"));
			}
			if($("#com_fnc_020101_2").length == 0) {
				$("#step").append(_hpAuthform_var.formHtml.find("#com_fnc_020101_2"));
				jex.setJexObj($("#com_fnc_020101_2"));
			}
			
			if($("#hpauth_term_pop").length == 0) {
				$("#step").prepend(_hpAuthform_var.formHtml.find("#hpauth_term_pop"));
				jex.setJexObj($("#hpauth_term_pop"));
			}else{
				//약관 체크박스 초기화
				$("#hpauth_term_pop input[id=chkHpAuthAll]").prop("checked", false);
				$("#hpauth_term_pop input[id=chkHpAuthAll]").trigger("change");
				$("#hpauth_term_pop #btn_term_next").prop("disabled", "disabled");
			}
			
			if($("#telecom_pop").length == 0) {
				$("#step").append(_hpAuthform_var.formHtml.find("#telecom_pop"));
				jex.setJexObj($("#telecom_pop"));
			}

			_hpAuthform_var.moAuthFailMsg = "고객님의 휴대폰번호를 조회할 수 없어 휴대폰 본인인증을 진행할 수 없습니다.";
			if("Y" == _hpAuthform_var.useOtherAuthYn){
				$(".other_auth").show();
			}else{
				$(".other_auth").hide();
			}
		},
		moAuthCheck : function(dat){
			if(!_hpAuthform_var.isLogin && _hpAuthform_var.moauthYn === "Y"){
				if(_isRealApp){
					if(_isAndroid()){//안드로이드 nativeCall
						$.nativeCall('mobileNumber',[]).done(function(data){
							if("" == data["mobileNumber"]){
								MobPopup.showAlertPopup(_hpAuthform_var.moAuthFailMsg,"안내",function(){_webViewExit();});
							}else{
								_hpAuthform_var.thisSForm.drawHpAuthForm();
								_hpAuthform_var.sms_send_hp_no = data["mobileNumber"];
								_hpAuthform_var.isMoAuth = true;
								_hpAuthform_var.thisSForm.addHpAuthEvent();
							}
						}).fail(function(data) {
							MobPopup.showAlertPopup(_hpAuthform_var.moAuthFailMsg,"안내",function(){_webViewExit();});
						});
					}else if(_isIphone()){//아이폰 MO인증
						comLayerPopUtil.open("moauth_pop");
						$("#moauth_pop").find("#btn_mo_call").off("click").on("click", function(e) {
							jex.setJexObj($('#com_fnc_020101_1').attr('data-jx-svc-onload','true'));
						});
						//com_fnc_020101_1 -> nativeCall("moCall") -> com_fnc_020101_2
					}
				}else{
					_hpAuthform_var.thisSForm.drawHpAuthForm();
					_hpAuthform_var.isMoAuth = true;
					_hpAuthform_var.thisSForm.addHpAuthEvent();
				}
			}else{
				_hpAuthform_var.thisSForm.drawHpAuthForm();
				_hpAuthform_var.thisSForm.addHpAuthEvent();
			}
		},
		drawHpAuthForm : function() {
			_hpAuthform_var.thisSForm.$object.html(_hpAuthform_var.formHtml.find("#hpAuthform_area").html());
			jex.setJexObj(_hpAuthform_var.thisSForm.$object);
			
			if(typeof _hpAuthform_var.callBackFunc == "function") {
				_hpAuthform_var.callBackFunc.apply();
			}
			
			if("Y" == _hpAuthform_var.useOtherAuthYn){
				$(".other_auth").show();
			}else{
				$(".other_auth").hide();
			}
		},
		addHpAuthEvent : function() {
			//로그인
			if(_hpAuthform_var.isLogin){
				_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").attr("disabled", true); 			//성명
				_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").attr("disabled", true); 			//주민등록번호 앞자리
				_hpAuthform_var.parentObj.find(".birth").addClass("disabled");
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find(".phone").addClass("disabled");
				_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_1").hide();
				_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_7").show();
				
				_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val(_hpAuthform_var.rppr_nm); 				//성명
				_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").val(_hpAuthform_var.jumin1); 					//주민등록번호 앞자리
				_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").text(_hpAuthform_var.jumin2); 					//주민등록번호 뒷자리
				_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").attr("disabled", true); 					//주민등록번호 뒷자리
				
				comLayerPopUtil.open("hpauth_term_pop");
			}else{
				//비로그인
				
				//MO인증
				if(_hpAuthform_var.moauthYn == "Y"){
					if(_isRealApp){
						_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").attr("disabled", true); 	//휴대폰번호
						_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").attr("disabled", true); 	//휴대폰번호
						_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").attr("disabled", true); 	//휴대폰번호
						_hpAuthform_var.parentObj.find(".phone").addClass("disabled");
						if(_hpAuthform_var.isMoAuth == false){
							MobPopup.showAlertPopup("현재 휴대폰의 번호를 불러올 수 없어\n'본인명의 휴대전화 인증'이\n불가합니다.\n\n번호 식별이 가능한 휴대폰을\n이용해주시기 바랍니다.","USIM/MO인증 실패 안내");
						}else{
							comLayerPopUtil.open("hpauth_term_pop");
						}
					}else{
						comLayerPopUtil.open("hpauth_term_pop");
					}
				}else{
					comLayerPopUtil.open("hpauth_term_pop");
				}
				
				_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").off("keyup").on("keyup", function(e) {
					hpAuthformBtnStateUpdate();
				});
				
				//사업자번호 노출 여부
				if(_hpAuthform_var.bznDisplayYn == "Y"){
					_hpAuthform_var.parentObj.find("#bzn_div").show();
					_hpAuthform_var.parentObj.find("#hpAuthform_bzn1").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						if ($(this).val().length == 3 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_bzn2").val())) {
							_hpAuthform_var.parentObj.find("#hpAuthform_bzn2").focus();
						}
						hpAuthformBtnStateUpdate();
					});
					_hpAuthform_var.parentObj.find("#hpAuthform_bzn2").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						if ($(this).val().length == 2 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_bzn3").val())) {
							_hpAuthform_var.parentObj.find("#hpAuthform_bzn3").focus();
						}
						hpAuthformBtnStateUpdate();
					});
					_hpAuthform_var.parentObj.find("#hpAuthform_bzn3").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						if ($(this).val().length == 5 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").val())) {
							if(_hpAuthform_var.juminFullDisplayYn == "Y"){
								_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").focus();
							}else{
								_hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").focus();
							}
						}
						hpAuthformBtnStateUpdate();
					});
				}
				
				//IBK인증서(본인확인) 테스트용
				if(_isDevMode && _hpAuthform_var.edpsCsnDisplayYn == "Y"){
					_hpAuthform_var.parentObj.find("#edpsCsn_div").show();
				}
				
				if(_hpAuthform_var.juminFullDisplayYn == "Y"){
					_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_1").hide();
					_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_7").show();
					
					//주민등록번호 앞자리 입력시 특수문자 제거
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						// 주민번호 앞자리 입력시 자동 키패드 호출
						if(!_hpAuthform_var.isLogin && $(this).val().length == 6 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_jumin2").val())) {
							_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").blur();
							_callXecureKeypad_withCallback(_hpAuthform_var.parentStep+' #hpAuthform_jumin2', "1", "7", "7", "주민번호 뒤 7자리", null, "N", null, null, function() {
								var hpAuthform_jumin2 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin2").val();
								if(isEmpty(hpAuthform_jumin2) == false && hpAuthform_jumin2.length == 7) {
									_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").text("*******");
									if(isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val())){
										_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();
									}
								}else{
									_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").text("");
								}
								hpAuthformBtnStateUpdate();
							})
						}
						hpAuthformBtnStateUpdate();
					});

					//주민등록번호 뒷자리
					_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").off("click").on("click", function(e) {
						_callXecureKeypad_withCallback(_hpAuthform_var.parentStep+' #hpAuthform_jumin2', "1", "7", "7", "주민번호 뒤 7자리", null, "N", null, null, function() {
							var hpAuthform_jumin2 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin2").val();
							if(isEmpty(hpAuthform_jumin2) == false && hpAuthform_jumin2.length == Number(7)) {
								_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").text("*******");
								if(isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val())){
									_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();
								}
							}else{
								_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").text("");
							}
							hpAuthformBtnStateUpdate();
						})
					});
				}else{
					//비로그인 IBK인증서(본인확인) 주민번호 뒷자리 1자리 설정
					_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_7").hide();
					_hpAuthform_var.parentObj.find("#div_hpAuthform_jumin2_1").show();
					
					//주민등록번호 앞자리 입력시 특수문자 제거
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						if ($(this).val().length == 6 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").val())) {
							_hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").focus();
						}
						hpAuthformBtnStateUpdate();
					});

					//주민등록번호 앞자리 입력시 특수문자 제거
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").off("keyup").on("keyup", function(e) {
						$(this).val(hpAuthform_numberOnly($(this).val()));
						if ($(this).val().length == 1 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val())) {
							_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();
						}
						hpAuthformBtnStateUpdate();
					});
				}
			}

			//핸드폰 번호 세팅
			if(_hpAuthform_var.sms_send_hp_no != ""){
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val(_hpAuthform_var.sms_send_hp_no.substring(0,3)); 	//휴대폰번호
				if(_hpAuthform_var.sms_send_hp_no.length == 10) {
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val(_hpAuthform_var.sms_send_hp_no.substring(3,6)); 	//휴대폰번호
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val(_hpAuthform_var.sms_send_hp_no.substring(6,10)); 	//휴대폰번호
				}
				if(_hpAuthform_var.sms_send_hp_no.length == 11) {
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val(_hpAuthform_var.sms_send_hp_no.substring(3,7)); 	//휴대폰번호
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val(_hpAuthform_var.sms_send_hp_no.substring(7,11)); 	//휴대폰번호
				}
			}
			
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").off("keyup").on("keyup", function(e) {
				$(this).val(hpAuthform_numberOnly($(this).val()));
				if ($(this).val().length == 3 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val())) {
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").focus();
				}
				hpAuthformBtnStateUpdate();
			});
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").off("keyup").on("keyup", function(e) {
				$(this).val(hpAuthform_numberOnly($(this).val()));
				if ($(this).val().length == 4 && isEmpty(_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val())) {
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").focus();
				}
				hpAuthformBtnStateUpdate();
			});
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").off("keyup").on("keyup", function(e) {
				$(this).val(hpAuthform_numberOnly($(this).val()));
				if ($(this).val().length == 4 && isEmpty(_hpAuthform_var.cpn_dcd)) {
					scrollFocus(_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div"));
					if(_hpAuthform_var.cpn_dcd == ""){
						_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").blur();
						_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div").click();
					}
				}
				hpAuthformBtnStateUpdate();
			});

			// 통신사 세팅
			var hpAuthform_ul_cpn_dcd = jex.getJexObj($("#hpAuthform_ul_cpn_dcd"), "JEX_MOBILE_LIST");
			hpAuthform_ul_cpn_dcd.setAll(hpAuthform_getTelecommunicationList());
			communicationSet();
			
			//인증번호
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").off("keyup").on("keyup", function(e) {
				$(this).val(hpAuthform_numberOnly($(this).val()));
				if ($(this).val().length > 0) {
					_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", false);
				}else{
					_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", true);
				}
			});
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").off("input").on("input", function(e) {
				$(this).val(hpAuthform_numberOnly($(this).val()));
				if ($(this).val().length > 0) {
					_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", false);
				}else{
					_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", true);
				}
			});
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").blur();
				}
			});
			
			//통신사 목록보기
			_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div").off("click").on("click", function(e) {
				comLayerPopUtil.open('telecom_pop');
			});
			
			//인증번호 발송 버튼 클릭
			_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").off("click").on("click", function(e) {
				if(_hpAuthform_var.isLogin == false && _hpAuthform_var.bznDisplayYn == "Y" && !MobUtil.isEmpty(_hpAuthform_var.bznCheckFunction)){
					eval(_hpAuthform_var.bznCheckFunction);
				}else{
					_hpAuthform_var.thisSForm.sendSms();
				}
			});
			
			//인증번호 확인 버튼 클릭
			_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").off("click").on("click", function(e) {
				if(_hpAuthform_var.isHpAuth){
					eval(_hpAuthform_var.nextFunction);
					return;
				}
				
				var sms_cert_no    = _hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").val();
				var sms_send_hp_no1 	= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val();
				var sms_send_hp_no2 	= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val();
				var sms_send_hp_no3 	= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val();
				var sms_send_hp_no 	= sms_send_hp_no1+sms_send_hp_no2+sms_send_hp_no3;
				var rppr_nm        = _hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val();
				
				var edps_csn = _hpAuthform_var.parentObj.find("#hpAuthform_edpsCsn").val();
				
				if(_isDevMode && _hpAuthform_var.edpsCsnDisplayYn == "Y" && MobUtil.isEmpty(edps_csn)){
					MobPopup.showAlertPopup("전산고객번호를 입력해주세요.");
					return;
				}
				
				if (hpAuthform_uf_obj_sms_countdown.isTimerChk()){//인증시간 진행중
					if(_hpAuthform_var.is_send_sms) {
						if(MobUtil.isEmpty(sms_cert_no)) {
							MobPopup.showAlertPopup("인증번호 6자리를 입력해주세요.");
						}
						else {
							hpAuthform_uf_confirmCertCpn(_hpAuthform_var.cpn_dcd, hpAuthform_numberOnly(sms_send_hp_no), rppr_nm, sms_cert_no, _hpAuthform_var.tlgr_msnm_rqst_no); //휴대폰 명의인증 검증
						}
					}
					else {
						MobPopup.showAlertPopup("[인증번호 요청하기] 버튼을 눌러 전송된 인증번호를 입력해주세요.");
					}
				}
				else{
					MobPopup.showAlertPopup("인증번호 입력시간이 초과되었습니다. [인증번호 다시 받기] 버튼을 눌러 받은 인증번호를 입력하세요.",undefined, function(){
						$("#hpAuthform_sms_cert_no").val("");
					});
					return false;
				}
			});
			
			MobValidation.start();
		},
		sendSms : function(){
			var spn_cpn_dcd		= $.trim(_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd").text());
			var sms_send_hp_no1		= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val();
			var sms_send_hp_no2		= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val();
			var sms_send_hp_no3		= _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val();
			var sms_send_hp_no		= sms_send_hp_no1+sms_send_hp_no2+sms_send_hp_no3;
			var rppr_nm				= _hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val();
			
			_hpAuthform_var.parentObj.find("#hpAuthform_timeover").hide();

			if(_hpAuthform_var.termCheckYn == "N"){
				comLayerPopUtil.open("hpauth_term_pop");
				return;
			} 

			//유효성검증
			if(!hpAuthform_uf_isValid()){
				return; 
			}
			else{
				hpAuthform_uf_sendCertCpn(_hpAuthform_var.cpn_dcd, hpAuthform_numberOnly(sms_send_hp_no), rppr_nm); // 인증번호 발송요청
			}
		},
		//기존 업무 페이지의 uf_back 유지하면서 uf_back 재정의하기
		overrideUfBack : function (){
			var hpauth_prev_uf_back = uf_back;
			if(hpauth_prev_uf_back.toString().indexOf("hpauth_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
					
					if(curStepNo == 8000 || //휴대폰  본인인증
							curStepNo == 8100 || //공동인증서 본인인증
							curStepNo == 9000 || //공동인증서 본인인증(리스트)
							curStepNo == 8200){ // 금융인증서 본인인증
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
						return;
					}
					hpauth_prev_uf_back.apply(this, arguments);
				}
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_HPAUTHFORM", JexMobileHpAuthForm, "data-jx-hpAuthform");
})();

/**
 * 휴대폰 명의인증(휴대폰본인인증) 요청
 * @param cpn_dcd : 통신사
 * @param cpn     : 휴대폰번호
 * @param user_nm : 성명
 */
function hpAuthform_uf_sendCertCpn(cpn_dcd, cpn, user_nm) {
	var ajax = jex.createAjaxUtil("com_sec_070101_1"); //서비스아이디 
	
	//비로그인인 경우
	if(!_hpAuthform_var.isLogin){
		ajax = jex.createAjaxUtil("com_sec_070101_3"); //서비스아이디
		
		if(_hpAuthform_var.juminFullDisplayYn == "Y"){
			ajax.set("RPPR_RNN1",   _hpAuthform_var.parentObj.find("#hpAuthform_jumin1").val().trim());     	//주민번호앞자리
			ajax.set("RPPR_RNN2",   _hpAuthform_var.parentObj.find("#hpAuthform_jumin2").attr("realValue")); //주민번호뒷자리
		}else{
			ajax.set("RPPR_RNN1",   _hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").val().trim());     	//주민번호앞자리
			ajax.set("RPPR_RNN2",   _hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").val().trim()); //주민번호뒷자리
		}
	}
	ajax.errorTrx = false;
	
	ajax.set("task_package",    "com");   //업무패키지코드
	ajax.set("task_subpackage", "sec");   //업무서브패키지코드
	ajax.set("TLFA_CMCM_DCD",   cpn_dcd); //통신사
	ajax.set("EBNK_CTCT_CPN",   cpn);     //휴대폰번호
	ajax.set("SPCT_SRNM_NM",    user_nm); //성명
	
	ajax.execute(function(dat) {
		var result = dat["_tran_res_data"][0];

		if(result["_is_error"] != "true") {
			_hpAuthform_var.is_send_sms = true;
			_hpAuthform_var.tlgr_msnm_rqst_no = result["TLGR_MSNM_RQST_NO"];
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").attr("disabled", false);
			_hpAuthform_var.parentObj.find(".with_count").removeClass("disabled");
			_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").text("인증번호 다시 받기");
			hpAuthform_uf_obj_sms_countdown.init('#hpAuthform_timer','#hpAuthform_sms_cert_no');
			_hpAuthform_var.parentObj.find("#hpAuthform_timer").show();
			_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").val("");
			_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", true);
			_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div").addClass("disabled");
			//입력정보 disable 처리
			if(!_hpAuthform_var.isLogin){
				_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").attr("disabled", true); 			//성명
				_hpAuthform_var.parentObj.find("#hpAuthform_bzn1").attr("disabled", true); 			//사업자등록번호 앞자리
				_hpAuthform_var.parentObj.find("#hpAuthform_bzn2").attr("disabled", true); 			//사업자등록번호 중간자리
				_hpAuthform_var.parentObj.find("#hpAuthform_bzn3").attr("disabled", true); 			//사업자등록번호 뒷자리
				_hpAuthform_var.parentObj.find("#btn_hpAuthform_bzn3").attr("disabled", true); 		//사업자등록번호 뒷자리 버튼
				_hpAuthform_var.parentObj.find(".business_num").addClass("disabled");
				_hpAuthform_var.parentObj.find(".birth").addClass("disabled");
				if(_hpAuthform_var.juminFullDisplayYn == "Y"){
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin1").attr("disabled", true); 			//주민등록번호 앞자리
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin2").attr("disabled", true); 			//주민등록번호 뒷자리
					_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").attr("disabled", true); 		//주민등록번호 뒷자리 버튼
				}else{
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").attr("disabled", true); 			//주민등록번호 앞자리
					_hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").attr("disabled", true); 			//주민등록번호 뒷자리
				}
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").attr("disabled", true); 	//휴대폰번호
				_hpAuthform_var.parentObj.find(".phone").addClass("disabled");
			}
			
			MobPopup.showAlertPopup("인증번호를 발송하였습니다.","안내",function(){
				scrollFocus(_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no"));
			});
		}
		else if(result["_is_error"] == "true" && result["_error_cd"] == "WEB014"){
			_hpAuthform_var.is_send_sms = false;
			MobPopup.showAlertPopup("보안 키패드 사용 중 오류가 발생했습니다.<br>주민등록번호 뒤 7자리를 다시 입력해 주세요.","안내",function(){_hpAuthform_var.parentObj.find("#btn_hpAuthform_jumin2").click();});
		}
		else {
			_hpAuthform_var.is_send_sms = false;
			MobPopup.showAlertPopup(result["_error_msg"]);
		}
	});
}

/**
 * 휴대폰 명의인증(휴대폰본인인증) 검증
 * @param cpn_dcd : 통신사
 * @param cpn     : 휴대폰번호
 * @param user_nm : 성명
 * @param cert_no : 인증번호
 * @param req_no  : 요청번호
 */
function hpAuthform_uf_confirmCertCpn(cpn_dcd, cpn, user_nm, cert_no, req_no) {
	var ajax = jex.createAjaxUtil("com_sec_070101_2"); //서비스아이디

	
	//비로그인인 경우
	if(!_hpAuthform_var.isLogin){
		ajax = jex.createAjaxUtil("com_sec_070101_4"); //서비스아이디
		
		if(_hpAuthform_var.juminFullDisplayYn == "Y"){
			ajax.set("RPPR_RNN1", _hpAuthform_var.parentObj.find("#hpAuthform_jumin1").val().trim()); //주민번호앞자리
			ajax.set("RPPR_RNN2", _hpAuthform_var.parentObj.find("#hpAuthform_jumin2").attr("realValue")); //주민번호뒷자리

			ajax.set("svcSel", "svcIds"); //TODO 본인확인서비스 오픈 전 적용으로 인한 임시 적용
		}else{
			ajax.set("RPPR_RNN1", _hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").val().trim()); //주민번호앞자리
			ajax.set("RPPR_RNN2", _hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").val().trim()); //주민번호뒷자리

			ajax.set("svcSel", "svcDsa"); //TODO 본인확인서비스 오픈 전 적용으로 인한 임시 적용
		}
		if(_hpAuthform_var.bznDisplayYn == "Y"){
			ajax.set("BZN", _hpAuthform_var.parentObj.find("#hpAuthform_bzn1").val().trim()+_hpAuthform_var.parentObj.find("#hpAuthform_bzn2").val().trim()+_hpAuthform_var.parentObj.find("#hpAuthform_bzn3").val().trim());
		}
		if(_isDevMode && _hpAuthform_var.edpsCsnDisplayYn == "Y"){
			ajax.set("EDPS_CSN", _hpAuthform_var.parentObj.find("#hpAuthform_edpsCsn").val()); //[개발테스트용] 개인전행번호
		}
	}
	ajax.errorTrx = false;
	
	ajax.set("task_package",      "com");   //업무패키지코드
	ajax.set("task_subpackage",   "sec");   //업무서브패키지코드
	ajax.set("TLFA_CMCM_DCD",     cpn_dcd); //통신사
	ajax.set("EBNK_CTCT_CPN",     cpn);     //휴대폰번호
	ajax.set("SPCT_SRNM_NM",      user_nm); //성명
	ajax.set("SMCF_NO",           cert_no); //인증번호
	ajax.set("TLGR_MSNM_RQST_NO", req_no);  //요청번호
	
	ajax.execute(function(dat) {
		var result = dat["_tran_res_data"][0];
		_hpAuthform_var.is_send_sms = true;
		_hpAuthform_var.tlgr_msnm_rqst_no = result["TLGR_MSNM_RQST_NO"];
		if(result["CI_FILE_NM"] && result["CI_FILE_NM"] != "") {	//CI값이 있을경우 넣어준다 2022.10.04
			_hpAuthform_var.CI_FILE_NM = result["CI_FILE_NM"];
		}
		if(result["DI_FILE_NM"] && result["DI_FILE_NM"] != "") {	//DI
			_hpAuthform_var.DI_FILE_NM = result["DI_FILE_NM"];
		}
		
		if(result["BIRT_YMD"] && result["BIRT_YMD"] != "") {	//생일
			_hpAuthform_var.BIRT_YMD = result["BIRT_YMD"];
		}
		if(result["GNDR_DCD"] && result["GNDR_DCD"] != "") {	//성별
			_hpAuthform_var.GNDR_DCD = result["GNDR_DCD"];
		}
		if(result["NATL_CLCD"] && result["NATL_CLCD"] != "") {	//내외국인
			_hpAuthform_var.NATL_CLCD = result["NATL_CLCD"];
		}
		if(result["CLPH_SENM_CRTC_APCT_NM"] && result["CLPH_SENM_CRTC_APCT_NM"] != "") {	//휴대폰본인명의인증신청자명
			_hpAuthform_var.CLPH_SENM_CRTC_APCT_NM = result["CLPH_SENM_CRTC_APCT_NM"];
		}
		
		if(result["_is_error"] != "true") {
			MobPopup.showAlertPopup("본인명의 휴대폰으로 확인되었습니다.", "안내", function() {
				_hpAuthform_var.isHpAuth = true;
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").attr("disabled", true);
				_hpAuthform_var.parentObj.find(".with_count").addClass("disabled");
				_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").attr("disabled", true);
				
				hpAuthform_uf_obj_sms_countdown.exitTimer();
				_hpAuthform_var.parentObj.find("#hpAuthform_timer").hide();
				_hpAuthform_var.parentObj.find("#hpAuthform_timeover").hide();
				
				eval(_hpAuthform_var.nextFunction);
			});
		}
		else if(result["_is_error"] == "true" && result["_error_cd"] == "WEB014"){
			_hpAuthform_var.is_send_sms = false;
			MobPopup.showAlertPopup("보안 키패드 사용 중 오류가 발생했습니다.","안내",function(){_webViewExit();});
		}
		else {
			MobPopup.showAlertPopup(result["_error_msg"], "안내", function() {
				_hpAuthform_var.isHpAuth = false;
				_hpAuthform_var.parentObj.find("#hpAuthform_sms_cert_no").val("");
			});
		}
	});
}

// timer카운트다운
var hpAuthform_uf_obj_sms_countdown = {
	//카운트다운을 위한 변수 선언
	varialbes : {
		isTimerChk   : true, //카운트다운 종료 확인	 ( true: 동작중 , flase : 종료 )
		time_init    : parseInt(20),
		tid 	     : '',
		is_smsCall   : '',
		timerId      : '',
		smsAuthNumId : ''
	}
	/**
	 * @description 카운트다운 Init
	 */
	,init : function(timerId, smsAuthNumId){
		this.varialbes.timerId = timerId;
		this.varialbes.smsAuthNumId = smsAuthNumId;
		this.varialbes.isTimerChk = true;
		this.varialbes.time_init = parseInt(180);
		//이미 Interval 되고 있으면 삭제
		if ( this.varialbes.tid != undefined && this.varialbes.tid != '' ){
			clearInterval(this.varialbes.tid);
		}
		this.varialbes.tid = setInterval("hpAuthform_uf_obj_sms_countdown.run()", 1000);
	}
	/**
	 * @description 카운트다운 실행
	 */
	,run : function(){
		$(this.varialbes.timerId).text(hpAuthform_uf_time_format(this.varialbes.time_init));

		this.varialbes.time_init--;

		if(this.varialbes.time_init < 0){


			clearInterval(this.varialbes.tid);

			$(this.varialbes.timerId).text("");
			$(this.varialbes.smsAuthNumId).val("");
			_hpAuthform_var.parentObj.find("#hpAuthform_timeover").show();
			_hpAuthform_var.parentObj.find("#hpAuthform_btn_confirm_sms").attr("disabled", true);
			this.varialbes.isTimerChk = false;
		}
	}
	/**
	 * @description 카운트다운 포맷팅
	 */
	,time_format : function(s){
		var nMin = 0;
		var nSec = 0;

		if(s > 0){
			nMin = parseInt(s/60);
			nSec = s%60;

			if(nMin > 60){
				nHour = parseInt(nMin / 60);
				nMin  = nMin % 60;
			}
		}

		if(nSec <10) nSec = "0" + nSec;
		if(nMin <10) nMin = "0" + nMin;

		return "" + nMin + ":" + nSec;
	}
	/**
	 * @description 타이머 종료 여부 확인
	 */
	,isTimerChk : function(){
		return this.varialbes.isTimerChk;
	}

	/**
	 * @description 타이머 종료
	 */
	,exitTimer : function(){
		if(this.varialbes.tid != undefined){
			clearInterval(this.varialbes.tid);
		}

		$(this.varialbes.timerId).text("");
		//$(this.varialbes.smsAuthNumId).val("");
	}
}

//timer시간포맷
function hpAuthform_uf_time_format(s){
	var nMin = 0;
	var nSec = 0;

	if(s > 0){
		nMin = parseInt(s/60);
		nSec = s%60;

		if(nMin > 60){
			nHour = parseInt(nMin / 60);
			nMin  = nMin % 60;
		}
	}

	if(nSec <10) nSec = "0" + nSec;
	if(nMin <10) nMin = "0" + nMin;

	return "" + nMin + ":" + nSec;
}

/* 명의인증 통신사 설정 */
function hpAuthform_uf_setCpnDcd($jq, data) {
	_hpAuthform_var.cpn_dcd = $.trim(data["code"]);
	_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd").text($.trim(data["code_nm"]));
	if(hpAuthformBtnStateUpdate()){
		_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").focus();
	};
	comSelectPopUtil.setActiveClass($jq);
	comLayerPopUtil.close('telecom_pop');
	return {};
}

function hpAuthformBtnStateUpdate(){
	var disabled = false;
	
	var rppr_nm = _hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val().trim();			//성명
	var jumin1;																					//주민번호앞자리
	var jumin2;																					//주민번호뒷자리
	if(_hpAuthform_var.juminFullDisplayYn == "Y"){
		jumin1 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin1").val().trim();
		jumin2 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin2").attr("realValue");
	}else{
		jumin1 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin1_1").val().trim();
		jumin2 = _hpAuthform_var.parentObj.find("#hpAuthform_jumin2_1").val().trim();
	}
	var sms_send_hp_no1 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val();	//휴대폰번호
	var sms_send_hp_no2 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val();	//휴대폰번호
	var sms_send_hp_no3 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val();	//휴대폰번호
	var spn_cpn_dcd = _hpAuthform_var.cpn_dcd; //통신사
	
	if(MobUtil.isEmpty(rppr_nm)){
		disabled = true;
	}
	if(MobUtil.isEmpty(jumin1)){
		disabled = true;
	}
	
	if(!_hpAuthform_var.isLogin){
		if(MobUtil.isEmpty(jumin1)){
			disabled = true;
		}

		if(MobUtil.isEmpty(jumin2)){
			disabled = true;
		}
		
		if(_hpAuthform_var.bznDisplayYn == "Y"){
			var rnn1 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn1").val().trim();			//주민번호앞자리
			var rnn2 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn2").val().trim();			//주민번호앞자리
			var rnn3 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn3").val().trim();			//주민번호뒷자리
			if(MobUtil.isEmpty(rnn1)){
				disabled = true;
			}
			if(MobUtil.isEmpty(rnn2)){
				disabled = true;
			}
			if(MobUtil.isEmpty(rnn3)){
				disabled = true;
			}
		}
	}
	
	if(MobUtil.isEmpty(sms_send_hp_no1)){
		disabled = true;
	}
	if(MobUtil.isEmpty(sms_send_hp_no2)){
		disabled = true;
	}
	if(MobUtil.isEmpty(sms_send_hp_no3)){
		disabled = true;
	}
	if(MobUtil.isEmpty(spn_cpn_dcd)){
		disabled = true;
	}
	
	_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").attr("disabled", disabled);
	if(!disabled){
		_hpAuthform_var.parentObj.find("#hpAuthform_btn_send_sms").show();
	}
	return !disabled;
}

//유효성 검증
function hpAuthform_uf_isValid(){
	var rppr_nm = _hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val().trim(); 			//성명
	var jumin1;																					//주민번호앞자리
	var jumin2;																					//주민번호뒷자리
	var jumin1Id;
	var jumin2Id;
	if(_hpAuthform_var.juminFullDisplayYn == "Y"){
		jumin1Id = "#hpAuthform_jumin1";
		jumin2Id = "#hpAuthform_jumin2";
		jumin1 = _hpAuthform_var.parentObj.find(jumin1Id).val().trim();
		jumin2 = _hpAuthform_var.parentObj.find(jumin2Id).attr("realValue");
	}else{
		jumin1Id = "#hpAuthform_jumin1_1";
		jumin2Id = "#hpAuthform_jumin2_1";
		jumin1 = _hpAuthform_var.parentObj.find(jumin1Id).val().trim();
		jumin2 = _hpAuthform_var.parentObj.find(jumin2Id).val().trim();
	}
	var spn_cpn_dcd = $.trim(_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd").text());	//통신사
	var sms_send_hp_no1 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").val();	//휴대폰번호
	var sms_send_hp_no2 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no2").val();	//휴대폰번호
	var sms_send_hp_no3 = _hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no3").val();	//휴대폰번호
	var sms_send_hp_no = sms_send_hp_no1+sms_send_hp_no2+sms_send_hp_no3;
	

	//비로그인인 경우
	if(!_hpAuthform_var.isLogin){
		if(MobUtil.isEmpty(rppr_nm)){
			MobPopup.showAlertPopup("이름을 입력해주세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").focus();});
			return false;
		}
		
		if(_hpAuthform_var.bznDisplayYn == "Y"){
			var rnn1 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn1").val().trim();				//주민번호앞자리
			var rnn2 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn2").val().trim();				//주민번호앞자리
			var rnn3 = _hpAuthform_var.parentObj.find("#hpAuthform_bzn3").val().trim();				//주민번호뒷자리
			if(MobUtil.isEmpty(rnn1) || MobUtil.isEmpty(rnn2) || MobUtil.isEmpty(rnn3)){
				MobPopup.showAlertPopup("사업자등록번호를 입력해주세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_bzn1").focus();});
				return false;
			}
		}
		
		if(MobUtil.isEmpty(jumin1) || MobUtil.isEmpty(jumin2)){
			MobPopup.showAlertPopup("주민등록번호를 입력해주세요.","안내",function(){_hpAuthform_var.parentObj.find(jumin1Id).focus();});
			return false;
		}
		
		if(!MobUtil.isEmpty(jumin1) && jumin1.length < 6){
			MobPopup.showAlertPopup("주민번호 앞 6자리를 입력해 주세요.","안내",function(){_hpAuthform_var.parentObj.find(jumin1).focus();});
			return false;
		}
		
		if(isEmpty(sms_send_hp_no1) || isEmpty(sms_send_hp_no2) || isEmpty(sms_send_hp_no3)) {
			MobPopup.showAlertPopup("휴대폰번호를 입력해주세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();});
			return false;
		}
	}

	if(spn_cpn_dcd == "선택하세요" || _hpAuthform_var.cpn_dcd == "") {
		MobPopup.showAlertPopup("통신사를 선택하세요.",function(){scrollFocus(_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div"));});
		return false;
	}
	
	var req_hp_no = hpAuthform_numberOnly(sms_send_hp_no);

	if(req_hp_no.length == 11 || req_hp_no.length == 10) {
		if(req_hp_no.startsWith("010") || req_hp_no.startsWith("011") || req_hp_no.startsWith("016") ||
				req_hp_no.startsWith("017") || req_hp_no.startsWith("018") || req_hp_no.startsWith("019")) {
				
		}
		else {
			MobPopup.showAlertPopup("휴대폰번호를 다시 확인하세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();});
			return false;
		}
	} else {
		MobPopup.showAlertPopup("휴대폰번호를 다시 확인하세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();});
		return false;
	}
	
	return true;
}

function hpAuthform_getTelecommunicationList(){ //통신사 목록
	var cpn_dcd_list = [];
	cpn_dcd_list.push({"code":"1","code_nm":"SKT"});
	cpn_dcd_list.push({"code":"2","code_nm":"KT"});
	cpn_dcd_list.push({"code":"3","code_nm":"LGU+"});
	cpn_dcd_list.push({"code":"4","code_nm":"SKT (알뜰폰)"});
	cpn_dcd_list.push({"code":"5","code_nm":"KT (알뜰폰)"});
	cpn_dcd_list.push({"code":"6","code_nm":"LGU+ (알뜰폰)"});
	
	return cpn_dcd_list;
}

function hpAuthform_numberOnly(dat) {
	var regex = /[^0-9]/g;
	return dat.replace(regex, '');
}


function hpAuthform_termClose() {
	comLayerPopUtil.close('hpauth_term_pop',function(){
		if(_hpAuthform_var.isLogin){
			scrollFocus(_hpAuthform_var.parentObj.find("#hpAuthform_spn_cpn_dcd_div"));
		}
//		else{
//			if("" == _hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").val().trim()){
//				_hpAuthform_var.parentObj.find("#hpAuthform_rppr_nm").focus();
//			}
//		}
	});
}

function hpAuthform_termNext(){
	_hpAuthform_var.termCheckYn = "Y";
	comLayerPopUtil.close('hpauth_term_pop');
}

function hpAuthformCallBack($jq) {
	var target =  $('#hpauth_term_pop');
	var chks = target.find('input[type=checkbox]').length;
	var termsChked = target.find('input:checkbox:checked').length;
	
	if($jq.id == "chkHpAuthAll"){
		chks = 1;
		termsChked = $('#hpauth_term_pop #chkHpAuthAll:checked').length;
	}else if($jq.id != null && $jq.id.indexOf("chkHpAuth") > -1){
		if($('#hpauth_term_pop #'+$jq.id+':checked').length == 1){
			termsChked++;
		}
	}
	
	if (chks == termsChked){
		$("#hpauth_term_pop #btn_term_next").prop("disabled", false).removeClass("disabled");
	} else {
		$("#hpauth_term_pop #btn_term_next").prop("disabled", "disabled");
	}
}

var hpAuthPopOpen = function() {
	if(_hpAuthform_var.isHpAuth){
		return;
	}
	var options = {
		callbackConfirm :_hpAuthform_var.nextFunction,
		curSelect : 1,			//현재 진행중인 본인인증 (필수) (1:휴대폰, 2:공동인증서, 3:금융인증서)
		loginCheckYn : _hpAuthform_var.loginCheckYn,		//(vid) 로그인 체크 여부
		bznDisplayYn : _hpAuthform_var.vidBznDisplayYn,		//(vid) 사업자등록번호 input 노출 여부
		nameDisplayYn : _hpAuthform_var.vidNameDisplayYn,	//(vid) 이름 input 노출 여부
		hpnoDisplayYn : _hpAuthform_var.vidHpNoDisplayYn	//(vid) 핸드폰번호 input 노출 여부
	};
	comAuthPopUtil.open(options);
}

//============MO인증==================
//mo인증키 생성
var com_fnc_020101_1 = {
	uf_in : function($jq, sourceData){
		$jq.attr("data-jx-svc-source-direct",JSON.stringify(com_fnc_020101_1.uf_data));
	},
	uf_out : function($jq, data, index){
		resParam = data["_tran_res_data"][0];
		if (resParam["_is_error"] != null || resParam["_is_error"] != undefined) { //에러발생
			MobPopup.showAlertPopup(_hpAuthform_var.moAuthFailMsg,"안내",function(){_webViewExit();});
			return "STOP_SVC";
		}else{ //정상처리
			com_fnc_020101_1.uf_data	= resParam;
		}

		return resParam;
	},
	uf_exec : function(){
		var param = {
				"msg" 		: com_fnc_020101_1.uf_data["MO_AUTH_KEY"],
				"telNumber"	: com_fnc_020101_1.uf_data["telNumber"]
		}
		$.nativeCall('moCall',[JSON.stringify(param)]).done(function(data){
			nativeIndicator.hide();
			jex.setJexObj($('#com_fnc_020101_2').attr('data-jx-svc-onload','true'));
		}).fail(function(data){
			nativeIndicator.hide();
			MobPopup.showAlertPopup(_hpAuthform_var.moAuthFailMsg,"안내",function(){_webViewExit();});
		});
	},
	uf_data :{}
}
//mo전화번호 조회
var com_fnc_020101_2 = {
	uf_in : function($jq, sourceData){
		$jq.attr("data-jx-svc-errtrx","false");
		$jq.attr("data-jx-svc-source-direct",JSON.stringify(com_fnc_020101_2.uf_data));
	},
	uf_out : function($jq, data, index){
		resParam = data["_tran_res_data"][0];
		if (resParam["_is_error"] != null || resParam["_is_error"] != undefined) { //에러발생
			MobPopup.showAlertPopup(_hpAuthform_var.moAuthFailMsg,"안내",function(){_webViewExit();});
			return "STOP_SVC";
		}
		else{ //정상처리
			com_fnc_020101_2.uf_data	= resParam;
		}	
		
		return resParam;
	},
	uf_exec : function(){
		_hpAuthform_var.thisSForm.drawHpAuthForm();
		_hpAuthform_var.isMoAuth = true;
		_hpAuthform_var.sms_send_hp_no = com_fnc_020101_2.uf_data["RPLY_TEL_NO"];
		comLayerPopUtil.close("moauth_pop");
		_hpAuthform_var.thisSForm.addHpAuthEvent();
	},
	uf_data :{}
}
//========================================


function communicationSet(){
	check_under_version_AUTH();
}

function check_under_version_AUTH () {
	// 버전체크
	var appVer           = comWebkey_getAppVersion();
	var _phoneType       = _getPhoneType();
	var numCheck_android = "110";
	var numCheck_ios     = "107";

	var scheme   = "";
	var url		 = "";

	appVer = String(appVer.replace(/\./g, ""));
	// 안드로이드
	if(_phoneType == "A"){
		$.nativeCall('getCarriers', []).done(function (dat) {
			var phoneType       = _getPhoneType();
			var communication = "";	// sk, kt, lg
			if(phoneType == "A") { // A : 안드로이드
				communication = dat.carriers;
			} else {
				communication = dat.carrier;
			}
			var communication_text ="";
			if(communication =="sk"){
				communication_text ="SKT";
				defaultSelected = "1";
			} else if(communication =="kt"){
				communication_text ="KT";
				defaultSelected = "2";
			} else if(communication =="lg"){
				communication_text ="LGU+";
				defaultSelected = "3";
			} else {
				communication_text ="SKT";
				defaultSelected = "1";	// default "sk"
			}
			$("#hpAuthform_ul_cpn_dcd li").each(function(){
				var row_data = $(this).data("_JEX_GETALL_DATA_");
				if(defaultSelected == row_data.code){ //OTP업체번호(IBK:디지털OTP)
					$(this).click();
				}
			})
		});
	}else if(_phoneType == "I"){
		if( Number(appVer) < Number(numCheck_ios) ) {
		} else {
			//아이폰은 12~16버전만 가능, ios에서 deprecated 됌
			$.nativeCall('getCarriers', []).done(function (dat) {
				var phoneType       = _getPhoneType();
				var communication = "";	// sk, kt, lg
				if(phoneType == "A") { // A : 안드로이드
					communication = dat.carriers;
				} else {
					communication = dat.carrier;
				}
				var communication_text ="";
				if(communication =="sk"){
					communication_text ="SKT";
					defaultSelected = "1";
				} else if(communication =="kt"){
					communication_text ="KT";
					defaultSelected = "2";
				} else if(communication =="lg"){
					communication_text ="LGU+";
					defaultSelected = "3";
				} else {
					communication_text ="SKT";
					defaultSelected = "1";	// default "sk"
				}
				$("#hpAuthform_ul_cpn_dcd li").each(function(){
					var row_data = $(this).data("_JEX_GETALL_DATA_");
					if(defaultSelected == row_data.code){ //OTP업체번호(IBK:디지털OTP)
						$(this).click();
					}
				})
			});
		}
	}
}

function scrollFocus(jq){
	//아이폰이거나 input태그가 아닐경우 스크롤이동.
	if(_isIphone() || "INPUT" != jq.prop('tagName')){
		$(window).scrollTop(jq.offset().top/2);
		jq.focus();
	}else{
		jq.focus();
	}
}
