/******************************************************************************
* @ 업 무 명        : VID검증
* @ 업무설명        : 본인확인(공동인증서, 금융인증서)
* @ 파 일 명        : /js/mobcom/jexUiPlugin/jex.mobile.vidform.js
* @ 작 성 자        : 이종영
* @ 작 성 일        : 2024.03.29
************************** 변 경 이 력 *******************************************
* 번호  작 업 자    작  업  일                          변경내용
*******************************************************************************
*    1  이재영      2024.07.10                          최초 작성
******************************************************************************/
/**
 * @description VID검증(본인확인) Jex Plugin에 사용될 변수
 */

var _vidform_var = {
		isCertAuth         : false
		, isLogin          : true  	//로그인여부
		, callBackFunc     : ""    	//callback function
		, thisSForm        : ""    	//authform 객체
		, parentThis       : ""    	//업무의 _this 객체
		, parentObj        : ""    	//authform을 포함하고 있는 부모객체
		, succCallBack     : ""    	//정상처리 Callback
		, rppr_nm     	   : ""    	//성명
	    , sms_send_hp_no   : ""    	// 핸드폰번호
		, jumin1 	   	   : ""    	//주민등록번호 앞자리(6자리)
		, jumin2 	   	   : ""    	//주민등록번호 뒷자리(7자리) 보안키패드 realValue값
		, bzn1			   : ""		//사업자번호1
		, bzn2			   : ""		//사업자번호2
		, bzn3			   : ""		//사업자번호3
		, hp_no			   : ""		//휴대폰번호
		, nameDisplayYn	   : ""    	//이름 출력여부
		, bznDisplayYn     : ""    	//사업자번호 출력여부
		, hpNoDisplayYn    : ""    	//휴대폰번호 출력여부
		, loginCheckYn     : ""		//로그인 체크 여부
		, authCertType     : "cert"		// 공동 : cert, 개인금융 : fin
		, elemSrc		   : ""		//금융인증서 연결 URL
		, signed_msg	   : ""		//전자서명값
		, vidRandom		   : ""		//vidRandom
		, finCertSign	   : false // 금융인증서 sign 화면에서 뒤로가기 버튼 막기위함
};


(function() {
	var sForm_attrs = {
		"id"            	: "data-jx-vidform"         		// VID검증
		, "step"        	: "data-jx-vidform-step"    		// VID검증 step 번호
		, "authCertType"	: "data-jx-vidform-cert-type"		// 공동 : cert, 개인금융 : fin
		, "name_display_yn" : "data-jx-vidform-name-display-yn"	//이름 입력항목 출력여부
		, "bzn_display_yn"  : "data-jx-vidform-bzn-display-yn" 	//사업자번호 입력항목 출력여부
		, "hpno_display_yn" : "data-jx-vidform-hpno-display-yn"	//휴대폰번호 입력항목 출력여부
		, "login_check_yn"  : "data-jx-vidform-login-check-yn"	//로그인 체크 여부
		, "nextFunction"	: "data-jx-vidform-next-execute-function"	// [required] 인증서 '다음' 버튼 처리 완료 후 사용자 처리 콜백 함수
		
			
	};
	
	var JexMobileVidForm = JexPlugin.extend({
		init: function () {
			console.log('JexMobileVidForm init');
		}
		/**
		 * @method load
		 * data-jx-vidform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		, load: function (attr, $jq) {
			console.log('JexMobileVidForm load');
			this.$object = $jq;
		}
		, execute : function(action, $jq) {
			console.log('JexMobileVidForm execute');
		}
		
		, initVar : function() {
			_vidform_var = {
					  isCertAuth       : false
					, isLogin          : false  	//로그인여부
					, callBackFunc     : ""    	//callback function
					, thisSForm        : ""    	//authform 객체
					, parentThis       : ""    	//업무의 _this 객체
					, parentObj        : ""    	//authform을 포함하고 있는 부모객체
					, succCallBack     : ""    	//정상처리 Callback
						
					, rppr_nm     		: ""    //성명
					, sms_send_hp_no   	: ""    	// 핸드폰번호
					, jumin1 	   		: ""    //주민등록번호 앞자리(6자리)
					, jumin2 	   		: ""    //주민등록번호 뒷자리(7자리) 보안키패드 realValue값
					, bzn1				: ""	//사업자번호1
					, bzn2				: ""	//사업자번호2
					, bzn3				: ""	//사업자번호3
					, hp_no				: ""	//휴대폰번호
						
					, nameDisplayYn	   : "N"    	//이름 출력여부
					, bznDisplayYn     : "N"    	//사업자번호 출력여부
					, hpNoDisplayYn    : "N"    	//휴대폰번호 출력여부
					, loginCheckYn     : "N"		//로그인 체크 출력여부
					, authCertType     : "cert"		// 공동 : cert, 개인금융 : fin
					, elemSrc		   : ""		//금융인증서 연결 URL
					, signed_msg	   : ""		//전자서명값
					, vidRandom		   : ""		//vidRandom
					, finCertSign	   : false // 금융인증서 sign 화면에서 뒤로가기 버튼 막기위함
			};
		}
		
		, getVidAuthForm : function(func) {
			_vidform_var.thisSForm  = this;		//this of jex.mobile.vidform.js 		
			_vidform_var.parentThis = _this; //업무단 js 파일에서 정의되어 있는 _this
			_vidform_var.thisSForm.overrideUfBack();
			
			if(typeof func == "function") {
				_vidform_var.callBackFunc = func;
			}
						
			var formFilePath = "../../com/vidform.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/vidform.html";
			}
			$.get(formFilePath).done(function(dat)	{
				
				$vidform_html = $(dat);
				_vidform_var.thisSForm.$object.html($vidform_html.find("#vidform_area").html());
				jex.setJexObj(_vidform_var.thisSForm.$object);
				
				$("#step").append($vidform_html.find("#step9000"));
				jex.setJexObj($("#step9000"));
				
				if(undefined == jex.getJexObj($("#com_sec_100101_1"))){
					$("#step").append($vidform_html.find("#com_sec_100101_1"));
					jex.setJexObj($("#com_sec_100101_1"));
				}
				
				
				if(undefined == jex.getJexObj($("#com_app_020201_1"))){
					$("#step").append($vidform_html.find("#com_app_020201_1"));
					jex.setJexObj($("#com_app_020201_1"));
				}
				
				
				if($("#vidauth_term_pop").length == 0) {
					$("#step").append($vidform_html.find("#vidauth_term_pop"));
					jex.setJexObj($("#vidauth_term_pop"));
				}
				
				//try {
					var parentId = _vidform_var.thisSForm.$object.attr(sForm_attrs.step); //상위 Step 이나 영역 Id
					parentId = parentId == undefined ? "#step" : "#" + parentId; //상위 Object id
					_vidform_var.parentStep = parentId;
					_vidform_var.parentObj = $(parentId);
					
					
					_vidform_var.nameDisplayYn =  _vidform_var.thisSForm.$object.attr(sForm_attrs.name_display_yn);
					_vidform_var.bznDisplayYn =  _vidform_var.thisSForm.$object.attr(sForm_attrs.bzn_display_yn);
					_vidform_var.hpNoDisplayYn =  _vidform_var.thisSForm.$object.attr(sForm_attrs.hpno_display_yn);
					_vidform_var.loginCheckYn =  _vidform_var.thisSForm.$object.attr(sForm_attrs.login_check_yn) == undefined ? "Y" : _vidform_var.thisSForm.$object.attr(sForm_attrs.login_check_yn);
					
					_vidform_var.authCertType =  _vidform_var.thisSForm.$object.attr(sForm_attrs.authCertType);
					
					if(_vidform_var.authCertType == "cert") {
						$("#vid_check_title").text("공동인증서 본인 인증");
					} else {
						$("#vid_check_title").text("금융인증서 본인 인증");
					}
					
					_vidform_var.nextFunction = _vidform_var.thisSForm.$object.attr(sForm_attrs.nextFunction);
					
					if(_vidform_var.loginCheckYn == "Y"){
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
									_vidform_var.jumin1 = res_data["RPPR_RRN"].substring(0,6);
									_vidform_var.jumin2 = res_data["RPPR_RRN"].substring(6,13);
									_vidform_var.rppr_nm = res_data["RPPR_KRN_NM"];
									_vidform_var.sms_send_hp_no =  hpNo;//휴대폰번호
								});
							}else{
								_vidform_var.isLogin = false;
							}
				        });
					}
					
					
					
					//로그인여부에 따른 노출처리
					if(!_vidform_var.isLogin){ //비로그인
						
						//disabled, false
						if(_vidform_var.nameDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_name_area").show();
							_vidform_var.parentObj.find("#vidform_rppr_nm").attr('disabled', false); 			//성명
	
						} else {
							_vidform_var.parentObj.find("#vidform_name_area").hide();
						}
						
						if(_vidform_var.bznDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_bzn_area").show();
							//사업자번호 disabled false
							_vidform_var.parentObj.find("#vidform_rnn1").attr('disabled', false); 			//성명
							_vidform_var.parentObj.find("#vidform_rnn2").attr('disabled', false); 			//성명
							_vidform_var.parentObj.find("#vidform_rnn3").attr('disabled', false); 			//성명
							
							_vidform_var.parentObj.find("#vidform_rnn1").off("keyup").on("keyup", function(e) {
								$(this).val(vidform_numberOnly($(this).val()));
								if ($(this).val().length == 3 && isEmpty(_vidform_var.parentObj.find("#vidform_rnn2").val())) {
									_vidform_var.parentObj.find("#vidform_rnn1").blur();
									_vidform_var.parentObj.find("#vidform_rnn2").focus();
								}
							});
							
							
							_vidform_var.parentObj.find("#vidform_rnn2").off("keyup").on("keyup", function(e) {
								$(this).val(vidform_numberOnly($(this).val()));
								if ($(this).val().length == 2 && isEmpty(_vidform_var.parentObj.find("#vidform_rnn3").val())) {
									_vidform_var.parentObj.find("#vidform_rnn2").blur();
									_callXecureKeypad_withCallback(_vidform_var.parentStep.substring(1)+' #vidform_rnn3', "1", "5", "5", "사업자번호 뒤 5자리.", null, "N", null, null, function() {
								        var vidformRnn3 = _vidform_var.parentObj.find("#vidform_rnn3").val();
								        if(isEmpty(vidformRnn3) == false && vidformRnn3.length == 5) {
								        	_vidform_var.parentObj.find("#btn_vidform_rnn3").text("*****");
								        	if(isEmpty(_vidform_var.parentObj.find("#vidform_jumin1").val())){
								        		_vidform_var.parentObj.find("#vidform_jumin1").focus();
								        	}
								        }else{
								        	_vidform_var.parentObj.find("#btn_vidform_rnn3").text("");
								        }
								        vidAuthformBtnStateUpdate();
								    })
								}
							});
							_vidform_var.parentObj.find("#btn_vidform_rnn3").off("click").on("click", function(e) {
								_callXecureKeypad_withCallback(_vidform_var.parentStep.substring(1)+' #vidform_rnn3', "1", "5", "5", "사업자번호 뒤 5자리.", null, "N", null, null, function() {
							        var vidformRnn3 = _vidform_var.parentObj.find("#vidform_rnn3").val();
							        if(isEmpty(vidformRnn3) == false && vidformRnn3.length == 5) {
							        	_vidform_var.parentObj.find("#btn_vidform_rnn3").text("*****");
							        	if(isEmpty(_vidform_var.parentObj.find("#vidform_jumin1").val())){
							        		_vidform_var.parentObj.find("#vidform_jumin1").focus();
							        	}
							        }else{
							        	_vidform_var.parentObj.find("#btn_vidform_rnn3").text("");
							        }
							        vidAuthformBtnStateUpdate();
							    })
							});
							
						} else {
							_vidform_var.parentObj.find("#vidform_bzn_area").hide();
						}
						
						if(_vidform_var.hpNoDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_hpno_area").show();
							//휴대폰 disabled false
							
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").attr('disabled', false); 			//성명
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").attr('disabled', false); 			//성명
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").attr('disabled', false); 			//성명
							
							//휴대폰번호 입력시 특수문자 제거
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").off("keyup").on("keyup", function(e) {
								$(this).val(vidform_numberOnly($(this).val()));
								if ($(this).val().length == 3 && isEmpty(_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").val())) {
									_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").focus();
								}
							});
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").off("keyup").on("keyup", function(e) {
								$(this).val(vidform_numberOnly($(this).val()));
								if ($(this).val().length == 4 && isEmpty(_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").val())) {
									_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").focus();
								}
							});
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").off("keyup").on("keyup", function(e) {
								$(this).val(vidform_numberOnly($(this).val()));
								if ($(this).val().length == 4) {
									_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").blur();
								}
							});
						} else {
							_vidform_var.parentObj.find("#vidform_hpno_area").hide();
						}
						
						
						
						
					} else {//로그인
						
						if(_vidform_var.nameDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_name_area").show();
							//이름 disabled true
							//이름 정보 설정
							_vidform_var.parentObj.find("#vidform_rppr_nm").attr('disabled', true); 			//성명
							_vidform_var.parentObj.find("#vidform_rppr_nm").val(_vidform_var.rppr_nm); 				//성명
							
						} else {
							_vidform_var.parentObj.find("#vidform_name_area").hide();
						}
						
						//로그인의 경우 사업자 번호 안 보여 줌
						/**
						if(_vidform_var.bznDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_bzn_area").show();
							//사업자번호 disabled true
							//사업자번호 설정
							
						} else {
							_vidform_var.parentObj.find("#vidform_bzn_area").hide();
						}
						**/
						
						_vidform_var.parentObj.find("#vidform_bzn_area").hide();
						
						if(_vidform_var.hpNoDisplayYn == "Y") {
							_vidform_var.parentObj.find("#vidform_hpno_area").show();
							//휴대폰 disabled true
							//휴대폰번호 설정
							
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").attr('disabled', true); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").attr('disabled', true); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").attr('disabled', true); 	//휴대폰번호
							_vidform_var.parentObj.find(".phone").addClass('disabled');
							
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").val(_vidform_var.sms_send_hp_no.substring(0,3)); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").val(_vidform_var.sms_send_hp_no.substring(3,7)); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").val(_vidform_var.sms_send_hp_no.substring(7,11)); 	//휴대폰번호
							
							
							
						} else {
							_vidform_var.parentObj.find("#vidform_hpno_area").hide();
						}
						
						//주민번호 설정
						/**
						_vidform_var.parentObj.find("#vidform_jumin1").val(_vidform_var.jumin1); 					//주민등록번호 앞자리
						_vidform_var.parentObj.find("#vidform_jumin2").val(_vidform_var.jumin2); 					//주민등록번호 뒷자리
						_vidform_var.parentObj.find("#vidform_jumin2").attr('realValue',_vidform_var.jumin2); 		//주민등록번호 뒷자리
						**/
						
						//핸드폰 번호 노출처리
						if(_vidform_var.sms_send_hp_no != ""){
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").val(_vidform_var.sms_send_hp_no.substring(0,3)); 	//휴대폰번호
							if(_vidform_var.sms_send_hp_no.length == 10) {
								_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").val(_vidform_var.sms_send_hp_no.substring(3,6)); 	//휴대폰번호
								_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").val(_vidform_var.sms_send_hp_no.substring(6,10)); 	//휴대폰번호
							}
							if(_vidform_var.sms_send_hp_no.length == 11) {
								_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").val(_vidform_var.sms_send_hp_no.substring(3,7)); 	//휴대폰번호
								_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").val(_vidform_var.sms_send_hp_no.substring(7,11)); 	//휴대폰번호
								
							}
							
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").attr('disabled', true); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no2").attr('disabled', true); 	//휴대폰번호
							_vidform_var.parentObj.find("#vidform_sms_send_hp_no3").attr('disabled', true); 	//휴대폰번호
						}
						
					}
					
					
					//주민번호 이벤트 설정
					_vidform_var.parentObj.find("#vidform_jumin1").off("keyup").on("keyup", function(e) {
						$(this).val(vidform_numberOnly($(this).val()));
						if ($(this).val().length == 6) {
							_vidform_var.parentObj.find("#vidform_jumin1").blur();
							_callXecureKeypad_withCallback(_vidform_var.parentStep.substring(1)+' #vidform_jumin2', "1", "7", "7", "주민번호 뒤 7자리", null, "N", null, null, function() {
						        var vidformJumin2 = _vidform_var.parentObj.find("#vidform_jumin2").val();
						        if(isEmpty(vidformJumin2) == false && vidformJumin2.length == 7) {
						        	_vidform_var.parentObj.find("#btn_vidform_jumin2").text("*******");
						        	if(_vidform_var.hpNoDisplayYn == "Y") {
						        		_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").focus();
						        	}
						        }else{
						        	_vidform_var.parentObj.find("#btn_vidform_jumin2").text("");
						        }
						        vidAuthformBtnStateUpdate();
						    })
						}
					});
					
					_vidform_var.parentObj.find("#btn_vidform_jumin2").off("click").on("click", function(e) {
						_callXecureKeypad_withCallback(_vidform_var.parentStep.substring(1)+' #vidform_jumin2', "1", "7", "7", "주민번호 뒤 7자리", null, "N", null, null, function() {
					        var vidformJumin2 = _vidform_var.parentObj.find("#vidform_jumin2").val();
					        if(isEmpty(vidformJumin2) == false && vidformJumin2.length == 7) {
					        	_vidform_var.parentObj.find("#btn_vidform_jumin2").text("*******");
					        	if(_vidform_var.hpNoDisplayYn == "Y") {
					        		_vidform_var.parentObj.find("#vidform_sms_send_hp_no1").focus();
					        	}
					        }else{
					        	_vidform_var.parentObj.find("#btn_vidform_jumin2").text("");
					        }
					        vidAuthformBtnStateUpdate();
					        
					    })
					});
					
					//MobValidation.start();
					
					if(typeof _vidform_var.callBackFunc == "function") {
						_vidform_var.callBackFunc.apply();
						/**
						 * 버튼 활성화 여부 초기화
						 * 
						 * @param $target  검증영역 대상 객체
						 * @param $btn     활성화여부 버튼 객체
						 * @param userFunc 사용자 체크 함수(return true or false)
						 */
						comBtnStateUtil.init($(_vidform_var.parentStep), $("#vid_btn_next"), vidAuthformBtnStateUpdate);
					}
					comLayerPopUtil.open("vidauth_term_pop");
					
					
				//} catch(e) {					bizException(e, "JEX_MOBILE getVidForm")					}
				
			});
			
		},
		overrideUfBack : function() {
			var vid_prev_uf_back = uf_back;
			if(vid_prev_uf_back.toString().indexOf("vid_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					if(_vidform_var.finCertSign){
						FinCertSdkVid.abort();
						_vidform_var.finCertSign = false;
						return;
					}
					
					vid_prev_uf_back.apply(this, arguments);
				}
			}
		}
	});
	
	jex.plugin.add("JEX_MOBILE_VIDFORM", JexMobileVidForm, "data-jx-vidform");
})();

var vidformObj = {
	checkValidationAndGoNextStep : function() {
//		signData = _secretform_var.parentThis.getSignData();
		
		var checkVal = $("#vidauth_term_pop input[id=chkVidAuthAll]").prop("checked");
		
		if(!checkVal) {
			//약관 띄우고 
			comLayerPopUtil.open('vidauth_term_pop');
			return;
		} 
		
		//입력값 검증
		
		if(_vidform_var.nameDisplayYn == "Y") {
			
			if($(_vidform_var.parentStep).find("#vidform_rppr_nm").val() == "") {
				MobPopup.showAlertPopup("이름을 입력하세요.", undefined, function() {
					$(_vidform_var.parentStep).find("#vidform_rppr_nm").focus();
				});
				return false;
			}
		}
		
		if(!_vidform_var.isLogin && _vidform_var.bznDisplayYn == "Y") {
			
			if($(_vidform_var.parentStep).find("#vidform_rnn1").val().length < 3) {
				MobPopup.showAlertPopup("사업자번호 앞 3자리를 입력하세요.", undefined, function() {
					$(_vidform_var.parentStep).find("#vidform_rnn1").focus();
				});
				return false;
			}
			
			if($(_vidform_var.parentStep).find("#vidform_rnn2").val().length < 2) {
				MobPopup.showAlertPopup("사업자번호 가운데 2자리를 입력하세요.", undefined, function() {
					$(_vidform_var.parentStep).find("#vidform_rnn2").focus();
				});
				return false;
			}
			
			if($(_vidform_var.parentStep).find("#vidform_rnn3").val().length < 5) {
				MobPopup.showAlertPopup("사업자번호 뒤 5자리를 입력하세요.", undefined, function() {
					$(_vidform_var.parentStep).find("#vidform_rnn3").focus();
				});
				return false;
			}
			
		}
				
		if(_vidform_var.hpNoDisplayYn == "Y") {
			
			var sms_send_hp_no1 = $(_vidform_var.parentStep).find("#vidform_sms_send_hp_no1").val();
			var sms_send_hp_no2 = $(_vidform_var.parentStep).find("#vidform_sms_send_hp_no2").val();
			var sms_send_hp_no3 = $(_vidform_var.parentStep).find("#vidform_sms_send_hp_no3").val();
			
			if(!(sms_send_hp_no1.startsWith("010") || sms_send_hp_no1.startsWith("011") || sms_send_hp_no1.startsWith("016") ||
					sms_send_hp_no1.startsWith("017") || sms_send_hp_no1.startsWith("018") || sms_send_hp_no1.startsWith("019"))) {
				MobPopup.showAlertPopup("휴대폰번호를 다시 확인하세요.","안내",function(){_hpAuthform_var.parentObj.find("#hpAuthform_sms_send_hp_no1").focus();});
				return false;
			}
			
			if(isEmpty(sms_send_hp_no1) || isEmpty(sms_send_hp_no2) || isEmpty(sms_send_hp_no3)) {
				MobPopup.showAlertPopup("휴대폰번호를 입력해주세요.");
				return false;
			}
			
		}
		
		
		//주민등록번호 앞자리
		
		var jumin1 = $(_vidform_var.parentStep).find("#vidform_jumin1").val();
		var jumin2 = $(_vidform_var.parentStep).find("#vidform_jumin2").val();
		
		if($(_vidform_var.parentStep).find("#vidform_jumin1").val().length < 6) {
			MobPopup.showAlertPopup("주민번호를 입력하세요.", undefined, function() {
				$(_vidform_var.parentStep).find("#vidform_jumin1").focus();
			});
			return false;
		}
		
		if(MobUtil.isEmpty(jumin1) || MobUtil.isEmpty(jumin2)){
			MobPopup.showAlertPopup("주민등록번호를 입력해주세요.");
			return false;
		}
		
		
		
		
		if(_vidform_var.authCertType == "cert") {
			
			vidformObj.certValidation();
		} else if(_vidform_var.authCertType == "fin") {
			vidformObj.finValidation();
			
		} else {
			
			MobPopup.showAlertPopup("인증방법이 설정되지 않았습니다.",undefined, function(){});
		}
		

	}
	//공동인증서
	, certValidation : function() {
		
		//인증서 목록 출력
		comUtil_showPuclibCertList("9000", "vidcheck_cert_list", "P","FUNC@vidformObj.certSign()","N", "2");
		
	}
	
	, certSign : function() {
		
		$row_data = $(event.target).parents("li[data-rownum]").data("_JEX_GETALL_DATA_");
		//만료된 인증서 체크
		var sm_cert_to_date = new Date(Date.parse($row_data["sm_cert_to_date"].substring(0, 10))); //yyyy-mm-dd
		var nowDate         = new Date(Date.parse(g_getDate('yyyy-mm-dd')));
		var diffDay         = (sm_cert_to_date.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000);
		
		if(diffDay < 0) {
			return;
		}
		
		if(_isMobile()){
			
			//전자서명 호출해야 함
			comWebkey_signWithCertificate("vid_verify", $row_data, "N", "Y", "Y", function() {
				$sign_result = this;
				if($sign_result.signed_msg == "cancel" || $sign_result.signed_msg == "CANCEL"){	//2013.07.18
					return;
				}
				_this.loginData.signed_msg = $sign_result.signed_msg;
				if(!_isRealApp) {
					_this.loginData.signed_msg = prompt("전자서명값을 입력해 주세요.");
				}
				
				_vidform_var.signed_msg = $sign_result.signed_msg;
				_vidform_var.vidRandom = $sign_result.vidRandom;
				
				var vidCheckData = {};
				vidCheckData["certType"] = "CERT";//공동인증서
				//vidCheckData["signed_msg"] = $sign_result.signData;
				//vidCheckData["vidRandom"] = $sign_result.vidRandom;
				
				vidCheckData["vidform_jumin1"] = $("#vidform_jumin1").val();
				vidCheckData["vidform_jumin2"] = $("#vidform_jumin2").attr("realValue");
				
				jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-source-direct", JSON.stringify(vidCheckData)));
				
				uf_back();//인증서창을 닫기한다.
				
				if(_this.loginData.aaplus_verfication_yn == "Y") {
					//로그인
					jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true"));
				} else {
					//위변조 검증값이 있는지 체크후 없으면 다시 받아오는 AppPlugin호출 (callback으로 로그인 service 호출함)
					comWebkey_getAaPlus(function() {
						//로그인
						jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true"));
					});
				}
			});
			
		} else {
			/**
			var signOptions = {};
			
			Delfino.login("cert", signOptions,function(result) {
		
			
			var vidCheckData = {};
			vidCheckData["certType"] = "CERT";//공동인증서
			vidCheckData["signed_msg"] = result.signData;
			vidCheckData["vidRandom"] = result.vidRandom;
			
			vidCheckData["vidform_jumin1"] = $("#vidform_jumin1").val();
			vidCheckData["vidform_jumin2"] = $("#vidform_jumin2").attr("realValue");
			
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-source-direct", JSON.stringify(vidCheckData)));
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true"));
			
		});
		**/
			
			var vidCheckData = {};
			vidCheckData["certType"] = "CERT";//공동인증서
			vidCheckData["signed_msg"] = result.signData;
			vidCheckData["vidRandom"] = result.vidRandom;
			
			vidCheckData["vidform_jumin1"] = $("#vidform_jumin1").val();
			vidCheckData["vidform_jumin2"] = $("#vidform_jumin2").attr("realValue");
			
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-source-direct", JSON.stringify(vidCheckData)));
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true"));
		}
		
		
	}
	//금융인증서
	, finValidation : function() {
		//주민등록번호 앞자리
		if($(_vidform_var.parentStep).find("#vidform_jumin1").val().length < 6) {
			MobPopup.showAlertPopup("주민번호를 입력하세요.", undefined, function() {
				$(_vidform_var.parentStep).find("#vidform_jumin1").focus();
			});
			return false;
		}
		//주민등록번호 뒷자리
		if($(_vidform_var.parentStep).find("#vidform_jumin2").val().length < 1) {
			MobPopup.showAlertPopup("주민번호를 입력하세요.", undefined, function() {
				$(_vidform_var.parentStep).find("#vidform_jumin2").focus();
			});
			return false;
		}
		
		if(_isIphone()){
			_this.deviceOS = "IOS";
		} else{
			_this.deviceOS = "ANDROID"
		}
		
		if(_isMobile()){
			comWebkey_getFinAppInfo(function() {
				var result   = this;
				//-데이터 설명
				//   * app_id : 앱 패키지명
				//   * device_id : 기기 고유값
				//   * app_ver : 현재 앱 버전
				//   * imei: 디바이스고유값(Android OS 10버전 미만)
				//   * android_id: 디바이스고유값(Android OS 10버전 이상)
	
				_this.appId    = result["app_id"      ]; //[운영:com.ibk.scbs, 개발(QA):com.ibk.scbs.dev]
				_this.deviceId = result["device_id"   ]; //'android_id 혹은 imei'
				_this.appVer   = result["app_ver"     ]; //'2.4.2'
				_this.orgCode  = result["finance_code"];
				_this.apiKey   = result["finance_key" ];
				
				
				FinCertSdkVid.loadSdk();
			});
		} else {
			
			var vidCheckData = {};
			vidCheckData["certType"] = "FIN";//공동인증서
			vidCheckData["signed_msg"] = result.signData;
			vidCheckData["vidRandom"] = result.vidRandom;
			
			vidCheckData["vidform_jumin1"] = $("#vidform_jumin1").val();
			vidCheckData["vidform_jumin2"] = $("#vidform_jumin2").attr("realValue");
			
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-source-direct", JSON.stringify(vidCheckData)));
			
			jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true"));
			
		}
	}
	, base64: {
		encode: function(str) {
			return btoa(unescape(encodeURIComponent(str)));
		}
		, decode: function(str) {
			str = str.replace(/-/g,'+').replace(/_/g,'/');
			var pad = str.length % 4;
			if(pad){
				if(pad === 1){
					throw new Error('InvalidLengthError');
				}
				str += new Array(5-pad).join('=');
			}
			return str;
		}
	}
};



var com_tim_020101_1 = {
	uf_out : function($jq, data){
		var resData = data["_tran_res_data"][0];
		_this.time = resData.time;
		return resData;
	},
	uf_exec : function(){
		vidform_sdk.sign(_this.getSignData());
	}
};

var com_sec_100101_1 = {
	uf_in : function($jq, sourceData){
		
		
		//비로그인인 경우 이름,사업자번호,전화번호 항목 데이터 셋팅할것
		if(_vidform_var.nameDisplayYn == "Y") {
			sourceData["vidform_rppr_nm"] = $("#vidform_rppr_nm").val();
		}
		
		if(_vidform_var.bznDisplayYn == "Y") {
			//sourceData["vidform_rnn"] = $("#vidform_rnn1").val() + $("#vidform_rnn2").val() + $("#vidform_rnn3").val();
			
			sourceData["vidform_rnn1"] = $("#vidform_rnn1").val();
			sourceData["vidform_rnn2"] = $("#vidform_rnn2").val();
			sourceData["vidform_rnn3"] = $("#vidform_rnn3").attr("realValue");
			
			
		}
				
		if(_vidform_var.hpNoDisplayYn == "Y") {
			sourceData["vidform_sms_send_hp_no1"] = $("#vidform_sms_send_hp_no1").val();
			sourceData["vidform_sms_send_hp_no2"] = $("#vidform_sms_send_hp_no2").val();
			sourceData["vidform_sms_send_hp_no3"] = $("#vidform_sms_send_hp_no3").val();
		}
		
		sourceData["signed_msg"] = _vidform_var.signed_msg;
		sourceData["vidRandom"] = _vidform_var.vidRandom;
			
		return sourceData;
		
		
	}
	, uf_out : function($jq, data, index){
		var resData = data["_tran_res_data"][0];
		if(resData["_is_error"] == "true") {
			//MobPopup.showErrorPopup(resData["_error_cd"], resData["_error_msg"], "", false);
			
			MobPopup.showAlertPopup("입력하신 실명번호와 인증서의 실명번호가 일치하지 않습니다.", "안내", function() {
				if(_vidform_var.authCertType == "cert") {
//					uf_goStep(8100);
				}
				return "STOP_SVC";
			});
		}
		else { //정상처리
			com_sec_100101_1.uf_data = resData;
			
			MobPopup.showAlertPopup("본인명의 인증서로 확인되었습니다.", "안내", function() {
				
				if (_vidform_var.nextFunction != undefined && _vidform_var.nextFunction != "") {
					eval(_vidform_var.nextFunction);
				}
				
			});
			
			
			return resData;
		}
	}
	, uf_exec : function() { }
	, uf_data : {}
};

function vidAuthForm_termClose() {
	comLayerPopUtil.close('vidauth_term_pop');
	
}

//
function vidAuthformBtnStateUpdate() {
	
	var disabled = false;
	
	var jumin1 = _vidform_var.parentObj.find("#vidform_jumin1").val().trim(); 		 	//주민번호앞자리
	var jumin2 = _vidform_var.parentObj.find("#vidform_jumin2").attr("realValue");	 	//주민번호뒷자리
	
	var rppr_nm = _vidform_var.parentObj.find("#vidform_rppr_nm").val().trim(); 		 	//성명
	
	
	if(MobUtil.isEmpty(jumin1)){
		disabled = true;
	}
	if(MobUtil.isEmpty(jumin2)){
		disabled = true;
	}
	
	if(!_vidform_var.isLogin){
		
		if(_vidform_var.nameDisplayYn == "Y") {
			if(MobUtil.isEmpty(rppr_nm)){
				disabled = true;
			}
		}
		
		if(_vidform_var.bznDisplayYn == "Y") {
			
			var rnn1 = _vidform_var.parentObj.find("#vidform_rnn1").val();	//휴대폰번호
			var rnn2 = _vidform_var.parentObj.find("#vidform_rnn2").val();	//휴대폰번호
			var rnn3 = _vidform_var.parentObj.find("#vidform_rnn3").attr("realValue");	//휴대폰번호
			
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
		
		if(_vidform_var.hpNoDisplayYn == "Y") {
			var sms_send_hp_no1 = _vidform_var.parentObj.find("#vidform_sms_send_hp_no1").val();	//휴대폰번호
			var sms_send_hp_no2 = _vidform_var.parentObj.find("#vidform_sms_send_hp_no2").val();	//휴대폰번호
			var sms_send_hp_no3 = _vidform_var.parentObj.find("#vidform_sms_send_hp_no3").val();	//휴대폰번호
			
			if(MobUtil.isEmpty(sms_send_hp_no1)){
				disabled = true;
			}
			if(MobUtil.isEmpty(sms_send_hp_no2)){
				disabled = true;
			}
			if(MobUtil.isEmpty(sms_send_hp_no3)){
				disabled = true;
			}
			
		}
	}
	
	_vidform_var.parentObj.find("#vid_btn_next").attr("disabled", disabled);
	
	return !disabled
	
}


function vidform_numberOnly(dat) {
	var regex = /[^0-9]/g;
	return dat.replace(regex, '');		
}

function vidAuthformCallBack() {
	var target =  $('#vidauth_term_pop .inner:eq(0)');
	var chks = target.find('input[type=checkbox]');
	var termsChked = target.find('input:checkbox:checked').length;

	
	if (chks.length == termsChked){
		$("#vidauth_term_pop #btn_term_next").prop("disabled", false).removeClass("disabled");
	} else {
		$("#vidauth_term_pop #btn_term_next").prop("disabled", "disabled");
	}
}


var FinCertCorpSdkVid = {
	fin_loadSdk : function() {
		
		if(_isDevMode) {
			_vidform_var.thisSForm.elemSrc = "https://t-4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd"); //(금융인증서) TEST인 경우
		} else {
			_vidform_var.thisSForm.elemSrc = "https://4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd");   //(금융인증서) REAL인 경우
		}
		
		if(!_isIphone()) {
			var reqData = {};
			reqData["isEnabled"] = true;
			$.nativeCall('setDomStorageEnabled',[reqData]).done(function (dat) {});
		}
		

		if(!document.getElementById("fincertCorpSdk")) {
			var scriptElem = document.createElement("script");
				scriptElem.src = _vidform_var.thisSForm.elemSrc;
				scriptElem.id = "fincertCorpSdk";

			document.querySelector('body').appendChild(scriptElem);

			scriptElem.onerror = function() {
				MobPopup.showAlertPopup("금융결제원과의 통신에 실패하였습니다. 고객센터에 문의해주세요.", undefined, function () {
					uf_goStep(1);
				});
				return;
			};

			scriptElem.onload = function() {
				FinCertCorpSdkVid.init();
			}
		}
		else {
			FinCertCorpSdkVid.init();
		}
	},

	init : function() {
		FinCertCorp.Sdk.init({
			success : function() {
				//초기화가 성공적으로 종료되었을때 호출되는 함수
				
				_this.finCertType = "finCertCorp";
				jex.setJexObj($("#com_app_020201_1").attr("data-jx-svc-onload", "true")); //금융인증서 전자서명시간값 조회
			},
			fail : function(err) {
				if("100008" == err.code) { // [100008] 이미 다른 금융인증SDK의 함수를 호출 중입니다.
					// (W클릭)중복호출시 SDK내부UI 중복로드 막기위함..
					// 다른 금융인증SDK의 함수의 성공, 실패 콜백을 받은 후 재호출을 수행한다.
				} else {
					MobPopup.showAlertPopup("초기화에 실패하였습니다.<br>" + err.message, undefined, function () {
						uf_goStep(1);
					}, "("+err.code+")");
				}
				return;
			},
			raIssueAppFunc : function() {
				comWebkey_goMenu("5005", "cmc_fin_010101_1", null);
			},
			orgCode         : _this.orgCode,
			apiKey          : _this.apiKey,
			clientOrigin    : _this.appId,
			uniqVal         : _this.deviceId,
			clientType      : _this.deviceOS,
			cssUrls         : ["/css/phone/cert2.css"]
		});
	},

	fin_sign : function() {
		FinCertCorp.Sdk.sign({
			success : function(result) { //전자서명 완료시 최종적으로 호출되는 함수
				// 전자서명값을 Array 형태로 리턴 ==>> 타입 : String[]
				// CMS Signed-Data 형식의 전자서명값을 Base64 url-safe로 인코딩 한 값
				_this.cert_sign = comm.base64.decode(result.signedVals[0]);
				
				FinCertCorpSdkVid.getCertInfoList(result.certSeqNum, function(res_obj) {
					//인증서 상태
					//  0:정상
					//  1:만료까지 30일 미만
					//  2:폐기된 인증서(만료된..)
					var _cert_status = "0";
					if (g_getDate("yyyymmdd") <= mobFormatter.dateTime(res_obj["not_after_dtm"], {"format":"yyyymmdd"})) {
						//_cert_status = "0";
						if(shiftDay(g_getDate("yyyymmdd"), 'd', +30, "") > mobFormatter.dateTime(res_obj["not_after_dtm"], {"format":"yyyymmdd"})) {
							_cert_status = "1";
						}
					} else {
						_cert_status = "2";
					}
					
					var cert_subject_dn_cn = ""; //cert_subject_dn.cn
					try {
						if (res_obj["cert_subject_dn"].split(",")[0].indexOf("cn=") != -1) {
							cert_subject_dn_cn = res_obj["cert_subject_dn"].split(",")[0].split("=")[1];
						}
					} catch (e) { }
					
					//인증서정보
					var send_data = {};
					send_data["sm_cert_status"           ] = _cert_status;               //인증서 상태 (0:정상, 1:만료까지 30일 미만, 2:폐기된 인증서)
					send_data["sm_cert_serial"           ] = res_obj["cert_seq_num"];    //인증서 일련번호
					send_data["sm_cert_from_date"        ] = mobFormatter.dateTime(res_obj["not_before_dtm"], {"format":"yyyy-mm-dd hh24:mi:ss"}); //인증서 발급일 yyyy-MM-dd HH:mm:ss    인증서 유효기간 시작일시
					send_data["sm_cert_to_date"          ] = mobFormatter.dateTime(res_obj["not_after_dtm"], {"format":"yyyy-mm-dd hh24:mi:ss"});  //인증서 폐기일 yyyy-MM-dd HH:mm:ss    인증서 유효기간 만료일시
					send_data["sm_cert_policy_id"        ] = res_obj["policy_oid"];      //인증서 정책
					send_data["sm_cert_subject_rdn"      ] = res_obj["cert_subject_dn"]; //인증서 subject rdn
					send_data["sm_cert_display_cn"       ] = cert_subject_dn_cn;         //인증서 subject cn
					send_data["sm_cert_display_issuer_cn"] = res_obj["cert_issuer_dn"];  //인증서 issuer cn
					jex.setJexObj($("#lgn_lgn_010101_2").attr("data-jx-svc-source-direct", JSON.stringify(send_data)));
					
					//위변조 검증값이 있는지 체크
					if(_this.loginData.aaplus_verfication_yn == "Y") {
						jex.setJexObj($("#lgn_lgn_010101_2").attr("data-jx-svc-onload", "true")); //로그인(금융인증서)
					} else {
						//위변조 검증값이 있는지 체크후 없으면 다시 받아오는 AppPlugin호출 (callback으로 로그인 service 호출함)
						comWebkey_getAaPlus(function() {
							jex.setJexObj($("#lgn_lgn_010101_2").attr("data-jx-svc-onload", "true")); //로그인(금융인증서)
						});
					}
				});
			},
			fail : function(err) {
				if(err.code == "800000") { //사용자가 금융인증서비스 창을 종료하였습니다.
					//uf_goStep(1);
				} else {
					alert(err);
					uf_goStep(1);
				}
			},
			info : {
				//사용자 전자서명 거래 종류
				//(전자서명 목적과 가장 부합하는 종류로 셋팅할 것)
				//'01' : 로그인, 회원관리
				//'02' : 송금 (이체, 자동송금관리 등)
				//'03' : 금융상품가입/해지 (예적금, 대출, 보험, 펀드 등)
				//'04' : 전자계약체결/해지 (근로, 공급, 용역, 거래, 각종 동의서 등)
				//'05' : 납부/결제 (자동납부관리, 공과금 납부, 카드대금 결제 등)
				//'06' : 증명서발급
				//'07' : 자산연동 (오픈뱅킹, 마이데이터 등)
				//'08' : 인증수단관리 (인증서, 보안매체 폐지 등), 보안설정 (비밀번호 변경 등)
				//'11' : 로그인 (증권)
				//'99' : 기타
				signType : "06"
			},
			"content" : {
				"binary" : {
					//전자서명을 수행할 원문 (Base64 url-safe 인코딩으로 수록)으로,
					// 다중 전자서명의 경우에는 각 전자서명의 원문 String을 Array에 포함시켜 파라미터로 전달
					"binaries" : [comm.base64.encode(_this.time)]
				}
			},
			"view" : {
				//마지막에 사용한 인증서를 자동 선택하여 사용할지 여부
				"lastAccessCert" : true
			},
			"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"withoutContent" : false,
			"encoding" : "UTF-8",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : "dummy",
					"withoutContent" : false,
					"includeR" : true //VID 검증을 위한 R값 추출 여부
				},
				"type" : "CMS"
			}
		});
	},
	
	//인증서 목록 요청
	getCertInfoList : function(certSeqNum, callback) {
		var _ojb_cert_info_list = function() {
			return new Promise(function (resolve, reject) {
				FinCertCorp.Sdk.getCertInfoList({
					success: function(result) {
						resolve(result);
					},
					fail: function(error) {
						console.log(error.code + " : " + error.message);
						MobPopup.showAlertPopup("인증서 목록 조회에 실패하였습니다.<br>" + error.message, undefined, function () {
							//reject(new Error("error_"+err.code));
						}, "("+error.code+")");
					}
				});
			});
		};
		_ojb_cert_info_list().then(function (res_dat) {
			for(var i = 0; i < res_dat.certs_info.length; i++) {
				if(certSeqNum == res_dat.certs_info[i]["cert_seq_num"]) {
					//callback.apply(res_dat.certs_info[i]); //return data: this
					callback(res_dat.certs_info[i]);
					break;
				}
			}
		}).catch(function(err) {
			//console.log("catch:"+err);
		});
	},
	
	//인증서 정보 추출
	getCertInfo : function(param, callback) {
		FinCertCorp.Sdk.getCertInfo({
			certificate: param, //Base64 인코딩
			success: function(result) {
				//인증서 정보 추출 완료
				//console.log("인증서 일련번호 : " + result.certSeqNum 
				//			+ ", " + "DN : " + result.certSubjectDn
				//			+ ", " + "유효기간 시작일시 : " + result.notBeforeDtm
				//			+ ", " + "유효기간 만료일시 : " + result.notAfterDtm
				//			+ ", " + "정책 OID : " + result.policyOid);
			},
			fail: function(error) {
				console.log(error.code + " : " + error.message);
				MobPopup.showAlertPopup("인증서 정보 추출에 실패하였습니다.<br>" + error.message, undefined, function () {
					//reject(new Error("error_"+err.code));
				}, "("+error.code+")");
			}
		});
	},
	//CMS 포맷의 전자서명문으로부터 전자서명한 인증서 추출
	getSignerCertFromSignedVal : function(param, callback) {
		FinCertCorp.Sdk.getSignerCertFromSignedVal({
			signedVal: param,
			success: function(result) {
				//console.log("인증서 : " + result.certificate);
				//result.certificate    Base64 인코딩
				FinCertCorpSdkVid.getCertInfo(result.certificate);  
			},
			fail: function(error) {
				console.log(error.code + " : " + error.message);
				MobPopup.showAlertPopup("전자서명한 인증서 추출에 실패하였습니다.<br>" + error.message, undefined, function () {
					//reject(new Error("error_"+err.code));
				}, "("+error.code+")");
			}
		});
	},
	
	abort : function() {
		FinCertCorp.Sdk.abort({
			callback : function() {
				//uf_goStep(1);
			}
		});
	}
};

var comm = {
	base64: {
		encode: function(str) {

			return btoa(unescape(encodeURIComponent(str)));
		},

		decode: function(str) {

			str = str.replace(/-/g,'+').replace(/_/g,'/');
			var pad = str.length % 4;
			if(pad){
				if(pad === 1){
					throw new Error('InvalidLengthError');
				}
				str += new Array(5-pad).join('=');
			}
			return str;
		}
	}
};

/**
 * 금융인증서 전자서명시간값 조회
 */
var com_app_020201_1 = {
	uf_in : function($jq,dat) {
		//_this.finCertType = dat['finCertType'];
		//return dat;
	},
	uf_out : function($jq, data) {
		_this.time = data["_tran_res_data"][0]["IBK_SIGNED_TIME"];
		return data;
	},
	uf_exec : function() {
		if(_this.finCertType =="finCert" ) {
			FinCertSdkVid.sign(); //개인용 금융인증서 전자서명
		} else {
			FinCertCorpSdkVid.fin_sign(); //사업자용 금융인증서 전자서명
		}
	}
}


//금융인증서 개인
var FinCertSdkVid = {
	loadSdk : function(){
        if (_isDevMode) {
        	_vidform_var.thisSForm.elemSrc = "https://t-4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
        } else {
        	_vidform_var.thisSForm.elemSrc = "https://4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
        }

		if (_isAndroid()) {
			var reqData = {};
			reqData["isEnabled"] = true;
			$.nativeCall('setDomStorageEnabled',[reqData]).done(function (dat) {});
		}

		//$.nativeCall('showIndicator');
		nativeIndicator.show();

		if (!document.getElementById("fincertSdk")) {
			var scriptElem = document.createElement("script");
			scriptElem.src = _vidform_var.thisSForm.elemSrc;
			scriptElem.id = "fincertSdk";

			document.querySelector('body').appendChild(scriptElem);

			scriptElem.onerror = function(){
				//$.nativeCall('hideIndicator');
				nativeIndicator.hide();
				MobPopup.showAlertPopup("금융결제원과의 통신에 실패하였습니다. 고객센터에 문의해주세요.", "안내", function () {
					var SMBK_LGN_DCD = "50"; // 패턴 로그인

					$.nativeCall('setLoginTabSetting',[SMBK_LGN_DCD]).done(function(dat){ // 최근 로그인 세팅
						$.nativeCall('pctLogin', [{"type":"50"}]).done(function(data) {
							var resultCode = data["resultCode"];
							if (resultCode != "0000") {
								MobPopup.showErrorPopup("LOGIN001", "로그인 호출에 실패하였습니다.", function(){
									$("#finLoginBtn").hide();
									$("#other_login").click();
								});
								return;
							}
						})
					}).fail(function() {
						$.nativeCall('pctLogin', [{"type":"50"}]).done(function(data) {
							var resultCode = data["resultCode"];
							if (resultCode != "0000") {
								MobPopup.showErrorPopup("LOGIN001", "로그인 호출에 실패하였습니다.", function(){
									$("#finLoginBtn").hide();
									$("#other_login").click();
								});
								return;
							}
						})
					});
				});
				return;
			};

			scriptElem.onload = function() {
				FinCertSdkVid.init(function() {
                    //$.nativeCall('hideIndicator');
					nativeIndicator.hide();
                    $("#fin_login").attr("disabled", false);
                    
                    _this.finCertType = "finCert";
                    jex.setJexObj($("#com_app_020201_1").attr("data-jx-svc-onload", "true")); //금융인증서 전자서명시간값 조회
                    
				});
			}
		} else {
			FinCertSdkVid.init(function() {
                //$.nativeCall('hideIndicator');
				nativeIndicator.hide();
                $("#fin_login").attr("disabled", false);
                //sdk2.sign();
                //초기화가 성공적으로 종료되었을때 호출되는 함수
                _this.finCertType = "finCert";
                jex.setJexObj($("#com_app_020201_1").attr("data-jx-svc-onload", "true")); //금융인증서 전자서명시간값 조회
                
            });
		}
	},
	init : function(callback) {
		FinCert.Sdk.init({
			success : function(){
				
                if (typeof callback == "function") {
                    callback.apply();
                }
				
				
				
			},
			fail : function(err) {
                MobPopup.showErrorPopup(String(err.code), err.message);
			},
			raIssueAppFunc : function() { // SDK 화면안에서 발급버튼 클릭시
                var _isLogin = comSpbsUtil.getIsLogin()['_tran_res_data'][0]['resultDat'] == 'true' ? true : false;
                if (_isLogin) {
                	comWebkey_goMenu("5010", "cmc_fin_010000_1", null);
                } else {
                	comWebkey_goMenu("5010", "cmc_fin_010001_1", null);
                }
            },
			orgCode : _this.orgCode,
			apiKey : _this.apiKey,
			clientOrigin : _this.appId,
			uniqVal : _this.deviceId,
			clientType : _this.deviceOS,
			cssUrls : ["/css/phone/cert2.css"]
            //useAutoConnInfo : _this.useAutoConnInfo
		});
	},
	sign : function(){

		_vidform_var.finCertSign = true;
		FinCert.Sdk.sign({
			success : function(result){
				_vidform_var.finCertSign = false;
				var vidCheckData = {};
				vidCheckData["certType"] = "FIN";//공동인증서
				
				_vidform_var.signed_msg = comm.base64.decode(result.signedVals[0]);
				_vidform_var.vidRandom = result.rValue;
				
				vidCheckData["vidform_jumin1"] = $("#vidform_jumin1").val();
				vidCheckData["vidform_jumin2"] = $("#vidform_jumin2").attr("realValue");
				
				jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-source-direct", JSON.stringify(vidCheckData)));
				jex.setJexObj($("#com_sec_100101_1").attr("data-jx-svc-onload", "true")); //로그인(금융인증서)
				
			},
			fail : function(err){
				_vidform_var.finCertSign = false;
				if (String(err.code) == "800000") {
					//uf_goStep(1);
				} else {
                    MobPopup.showErrorPopup(String(err.code), err.message, function() {
                        uf_goStep(1);
                    });
				}
			},
			info : {
				signType : "06"
			},
			"content" : {
				"binary" : {
					"binaries" : [comm.base64.encode(_this.time)]
				}
			},
			"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"withoutContent" : false,
			"encoding" : "UTF-8",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : "dummy",
					"withoutContent" : false,
					"includeR" : true	//서명값에 vid 포함됨
				},
				"type" : "CMS"
			}
		});
	},
	
	//인증서 목록 요청
	getCertInfoList : function(certSeqNum, callback) {
		var _ojb_cert_info_list = function() {
			return new Promise(function (resolve, reject) {
				FinCert.Sdk.getCertInfoList({
					success: function(result) {
						resolve(result);
					},
					fail: function(error) {
						//console.log(error.code + " : " + error.message);
						MobPopup.showAlertPopup("인증서 목록 조회에 실패하였습니다.<br>" + error.message, undefined, function () {
							//reject(new Error("error_"+err.code));
						}, "("+error.code+")");
					}
				});
			});
		};
		_ojb_cert_info_list().then(function (res_dat) {
			for(var i = 0; i < res_dat.certInfos.length; i++) {
				if(certSeqNum == res_dat.certInfos[i]["certSeqNum"]) {
					//callback.apply(res_dat.certs_info[i]); //return data: this
					callback(res_dat.certInfos[i]);
					break;
				}
			}
		}).catch(function(err) {
			//console.log("catch:"+err);
		});
	},
	
	//인증서 정보 추출
	getCertInfo : function(param, callback) {
		FinCert.Sdk.getCertInfo({
			certificate: param, //Base64 인코딩
			success: function(result) {
				//인증서 정보 추출 완료
				//console.log("인증서 일련번호 : " + result.certSeqNum 
				//			+ ", " + "DN : " + result.certSubjectDn
				//			+ ", " + "유효기간 시작일시 : " + result.notBeforeDtm
				//			+ ", " + "유효기간 만료일시 : " + result.notAfterDtm
				//			+ ", " + "정책 OID : " + result.policyOid);
			},
			fail: function(error) {
				console.log(error.code + " : " + error.message);
				MobPopup.showAlertPopup("인증서 정보 추출에 실패하였습니다.<br>" + error.message, undefined, function () {
					//reject(new Error("error_"+err.code));
				}, "("+error.code+")");
			}
		});
	},
	//CMS 포맷의 전자서명문으로부터 전자서명한 인증서 추출
	getSignerCertFromSignedVal : function(param, callback) {
		FinCert.Sdk.getSignerCertFromSignedVal({
			signedVal: param,
			success: function(result) {
				//console.log("인증서 : " + result.certificate);
				//result.certificate    Base64 인코딩
				FinCertSdkVid.getCertInfo(result.certificate);  
			},
			fail: function(error) {
				//console.log(error.code + " : " + error.message);
				MobPopup.showAlertPopup("전자서명한 인증서 추출에 실패하였습니다.<br>" + error.message, undefined, function () {
					//reject(new Error("error_"+err.code));
				}, "("+error.code+")");
			}
		});
	},
	
	abort : function(){
		FinCert.Sdk.abort({
			callback : function(){
				//uf_goStep(1);
			}
		})
	},
	/*
	* 자동연결정보 생성
	*/
    makeAutoConnInfo : function() {
        var deferred = $.Deferred();

        FinCert.Sdk.makeAutoConnInfo({
            "success" : function(result) {
                 deferred.resolve(result);
             },
            "fail" : function(err) {
                 deferred.reject(err);
             }
        });

        return deferred.promise();
    },
    /*
    * 자동연결정보 등록
    * 등록 후 로그인에 성공하여야만 유효한 자동연결정보가 됨
    */
    setAutoConnInfo : function(autoConnInfo) {
        var deferred = $.Deferred();

        FinCert.Sdk.setAutoConnInfo({
            "autoConnInfo" : autoConnInfo,
            "success" : function(result) {
                 deferred.resolve(result);
            },
            "fail" : function(error) {
                 deferred.reject(error);
            }
        });

        return deferred.promise();
    },
    /*
    * 금융결제원에서 내려준 자동연결정보를 네이티브에 저장하는 함수
    */
    saveAutoConnInfo : function() {
         var deferred = $.Deferred();

         FinCertSdkVid.makeAutoConnInfo().done(function(dat) {
             var autoConnInfo = dat["autoConnInfo"];

             $.nativeCall("deleteWebData", ["web_kftc_fincert_autoConnInfo_enc"]).done(function() {
                 $.nativeCall("saveWebData",[{"web_kftc_fincert_autoConnInfo_enc" : autoConnInfo}]).done(function() {
                     sdk.setAutoConnInfo(autoConnInfo).done(function() {
                        deferred.resolve();
                     }).fail(function(error) {
                        _this.errorHandling_autoConnInfo_err_cd = String(error.code);
                        deferred.reject(error);
                     });
                 }).fail(function(error) {
                    _this.errorHandling_autoConnInfo_err_cd = "EFINSAV";
                    deferred.reject(error);
                 });
             }).fail(function(error) {
                _this.errorHandling_autoConnInfo_err_cd = "EFINDEL";
                deferred.reject(error);
             });
         }).fail(function(error) {
            _this.errorHandling_autoConnInfo_err_cd = String(error.code);
            deferred.reject(error);
         });

         return deferred.promise();
    }
}

var vidAuthPopOpen = function() {
	var options = {
		callbackConfirm : _vidform_var.nextFunction,
		curSelect : _vidform_var.authCertType == "cert" ? 2 : 3,			//현재 진행중인 본인인증 (필수) (1:휴대폰, 2:공동인증서, 3:금융인증서)
		loginCheckYn : _vidform_var.loginCheckYn,   //(vid) 로그인 체크 여부
		bznDisplayYn : _vidform_var.bznDisplayYn, 	//(vid) 사업자등록번호 input 노출 여부
		nameDisplayYn : _vidform_var.nameDisplayYn,	//(vid) 이름 input 노출 여부
		hpnoDisplayYn : _vidform_var.hpNoDisplayYn	//(vid) 핸드폰번호 input 노출 여부
	};
	comAuthPopUtil.open(options);
}
