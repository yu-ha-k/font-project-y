//authform 플러그인에서 사용하는 변수정의
var _authform_var = {
	  isArsError       : false //ARS인증 에러여부
	, isSmsError       : false //SMS인증 에러여부
	, isNotSamePhoneNo : false //단말기의전화번호와 일치하는지여부 (안드로이드일경우 단말기의 전화번호와 일치하지않으면 true,  default : false)   radio는 보여주고 alert을 표시
	, isFdsAddtCrtc    : false //FDS 추가인증 여부
	, fdsCertOtpYn     : "N"   //FDS OTP추가인증 사용여부
	, isLogin          : true  //로그인여부
	, callBackFunc     : ""    //callback function
	, thisSForm        : ""    //authform 객체
	, parentThis       : ""    //업무의 _this 객체
	, parentObj        : ""    //authform을 포함하고 있는 부모객체
	, arsNo            : ""    //ARS인증 전화번호
	, arsNoList        : []    //ARS인증 전화번호 목록
	, fdsMnrcUserNm    : ""    //FDS멘트 입금계좌예금명
	, fdsBankNm        : ""    //FDS멘트 은행명
	, fdsTranAmt       : ""    //FDS멘트 거래총금액
	, fdsTranCnt       : ""    //FDS멘트 거래총건수
	, arsNoSelYn       : "Y"   //ARS인증 전화번호 선택가능 여부
	, trSvc            : ""    //목적 서비스
	, bswrDscd         : ""    //목적 서비스에 대한 업무구분(멘트 내용)
	, succCallBack     : ""    //정상처리 Callback
	, isStandAlone     : false	//authform callback을 먼저 실행해야 하는 경우
};

//추가인증이 완료여부(jex.mobile.secretform.js 에서 검증)
var _isAuthComplete = false;

(function() {
	var sForm_attrs = {
		"id"        : "data-jx-authform"           //호출할 svc 명
		,"parentId" : "data-jx-authform-parent-id" //authform 영역을 포함하고 있는 객체의 ID
	};

	var JexMobileAuthForm = JexPlugin.extend({
		init : function() {
		},
		/**
		 * @method load data-jx-secretform 에 해당하는 속성 값이 읽혀질 때 framework에
		 *         의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			this.$object = $jq;
		},
		execute : function(evt, $jq) {
		},
		initDraw : function() {
		},
		initVar : function() {
			_authform_var = {
				  isArsError       : false //ARS인증 에러여부
				, isSmsError       : false //SMS인증 에러여부
				, isNotSamePhoneNo : false //단말기의전화번호와 일치하는지여부 (안드로이드일경우 단말기의 전화번호와 일치하지않으면 true,  default : false)   radio는 보여주고 alert을 표시
				, isFdsAddtCrtc    : false //FDS 추가인증 여부
				, fdsCertOtpYn     : "N"   //FDS OTP추가인증 사용여부
				, isLogin          : true  //로그인여부
				, callBackFunc     : ""    //callback function
				, thisSForm        : ""    //authform 객체
				, parentThis       : ""    //업무의 _this 객체
				, parentObj        : ""    //authform을 포함하고 있는 부모객체
				, arsNo            : ""    //ARS인증 전화번호
				, arsNoList        : []    //ARS인증 전화번호 목록
				, fdsMnrcUserNm    : ""    //FDS멘트 입금계좌예금명
				, fdsBankNm        : ""    //FDS멘트 은행명
				, fdsTranAmt       : ""    //FDS멘트 거래총금액
				, fdsTranCnt       : ""    //FDS멘트 거래총건수
				, arsNoSelYn       : "Y"   //ARS인증 전화번호 선택가능 여부
				, trSvc            : ""    //목적 서비스
				, bswrDscd         : ""    //목적 서비스에 대한 업무구분(멘트 내용)
				, succCallBack     : ""    //정상처리 Callback
				, isStandAlone     : false
			};
		},
		getAuthForm : function(func) {
			_authform_var.thisSForm  = this;  //this of jex.mobile.authform.js
			_authform_var.parentThis = _this; //업무단 js 파일에서 정의되어 있는 _this

			if(typeof func == "function") {
				_authform_var.callBackFunc = func;
			}

			_isAuthComplete = false;

			$.get('../../com/authform.html').done(function(dat) {
				$authform_html = $(dat);
				_authform_var.thisSForm.$object.html($authform_html.find("#authform_area").html());

				jex.setJexObj(_authform_var.thisSForm.$object);

				try {
					var parentId = _authform_var.thisSForm.$object.attr(sForm_attrs.parentId);
					parentId = parentId == undefined ? "#step" : "#" + parentId;
					_authform_var.parentObj = $(parentId);

					if(_authform_var.fdsCertOtpYn == "Y") { //FDS OTP추가인증
//						_authform_var.parentObj.find("#authform_area_otp").show();
//						_authform_var.parentObj.find("#authform_area_ars").hide();
					}
					else {
						//ARS인증 전화번호 목록(step70)을 그림
						_authform_var.thisSForm.drawArsNoList($authform_html);
					}

					_authform_var.parentObj.find("#authform_btn_call_ars").off("click").on("click", function(e) {
						_authform_var.thisSForm.callArs(); //ARS인증 요청
					});

					_authform_var.parentObj.find("#authform_btn_cert_ars").off("click").on("click", function(e) {
						_authform_var.thisSForm.certArs(); //ARS인증 확인
					});
					
					
					_authform_var.parentObj.find("#authform_btn_cert_close").off("click").on("click", function(e) {
					
						/**
						//_authform_var.thisSForm.certArs(); //ARS인증 창 닫기
						if(_isAuthComplete != true) {
							MobPopup.showAlertPopup("추가 인증을 완료해 주세요.");
							_secretform_var.isExcuted = false; //중복클릭 방지를 풀어 줌
							_secretform_var.isExcuteSNBC = false; //반송실행 여부
							return ;
						}
						**/
						comLayerPopUtil.close('authform_area_ars_popup');
					
					});
					
					_authform_var.parentObj.find("#authform_btn_cert_cancel").off("click").on("click", function(e) {
						/**
						//_authform_var.thisSForm.certArs(); //ARS인증 창 닫기
						if(_isAuthComplete != true) {
							MobPopup.showAlertPopup("추가 인증을 완료해 주세요.");
							_secretform_var.isExcuted = false; //중복클릭 방지를 풀어 줌
							_secretform_var.isExcuteSNBC = false; //반송실행 여부
							return ;
							//comLayerPopUtil.close('authform_area_ars_popup');
						}
						**/
						comLayerPopUtil.close('authform_area_ars_popup');
					
					});
						
					//초기화시에는 추가인증창 띄우지 않는다,
					//필요시 직접 호출 또는 시크릿폼에서 실행시 띄움
					//_authform_var.thisSForm.execAuth();
						
					/** 
					 * execAuth 로 이동
					//FDS OTP추가인증
					if(_authform_var.fdsCertOtpYn == "Y") {
						//OTP번호 보안키패드 적용
						//jylee todo : 추후 키보드 노출시 안전한 금융거래를 위해 추가인증절차를 진행 합니다. 추가 할것
						_callXecureKeypad_withCallback('authform_w_otp_ocrn_no', '1', '6', '6', 'OTP발생번호 6자리', null, _authform_var.isLogin,null,null, function() {
							console.log("authform_w_otp_ocrn_no done!!");
							//otp 추가 인증 완료
							//$("#authform_exec_yn").val("Y");
							_isAuthComplete = true;
						});
						
						
					} else {
						//jylee 여기서 흘러 버린다.
						console.log("authform ars init");
						comLayerPopUtil.open("authform_area_ars_popup");
						console.log("authform ars done");
					}
					**/
					
				} catch(e) {bizException(e, "JEX_MOBILE getAuthForm");}
			});

			//FDS OTP추가인증이 아닌경우 ARS인증 전화번호 조회
			if(_authform_var.fdsCertOtpYn == "N") {
				_authform_var.thisSForm.getArsNoList(); //ARS인증 전화번호 조회
			}
			else {
				if(typeof _authform_var.callBackFunc == "function") {
					_authform_var.callBackFunc.apply();
				}
			}
		},
		
		//추가인증 실행 함수 
		execAuth : function() {
			
			//FDS OTP추가인증
			if(_authform_var.fdsCertOtpYn == "Y") {
				//OTP번호 보안키패드 적용
				//jylee todo : 추후 키보드 노출시 안전한 금융거래를 위해 추가인증절차를 진행 합니다. 추가 할것
				_callXecureKeypad_withCallback('authform_w_otp_ocrn_no', '1', '6', '6', 'OTP발생번호 6자리', null, _authform_var.isLogin,null,null, function() {
					console.log("authform_w_otp_ocrn_no done!!");
					//otp 추가 인증 완료
					//$("#authform_exec_yn").val("Y");
					_isAuthComplete = true;
				});
				
				
			} else {
				//jylee 여기서 흘러 버린다.
				
				//화면만 띄우고 확인/취소/닫기 버튼에서 로직 처리
				comLayerPopUtil.open("authform_area_ars_popup");
				
			}
			
		},
		//ARS인증 전화번호 목록(step70)을 그려줌
		drawArsNoList : function($authform_html) {
			//ARS인증 전화번호 목록(step70)이 그려져 있지 않으면 그린다.
			if($("#step70").length == 0) {
				$("#step").append($authform_html.find("#div_ars_tel_pop"));
				jex.setJexObj($("#div_ars_tel_pop"));
			}
			
//			//2019.04.05 추가인증시 '뒤로가기'후 다시 추가인증 화면에서 '전화번호Select Box'로 바뀌는 문제대응.
//			if(_authform_var.arsNoSelYn == "N") {
//				$("#authform_input_ars_no").show();
//				$("#authform_div_sel_ars_no").hide();
//			} else {
//				$("#authform_input_ars_no").hide();
//				$("#authform_div_sel_ars_no").show();
//			}
		},
		//ARS인증 전화번호 목록(step70)을 보여줌
		showArsNoList : function() {
			if(_authform_var.arsNoList.length > 0) {
				uf_goStep(70);
			}
		},
		//ARS인증 전화번호 선택
		setArsNo : function($jq, data) {
			_authform_var.arsNo = $.trim(data["ARS_NO"]);
			_authform_var.parentObj.find("#authform_sel_ars_no").text($.trim(data["DP_ARS_NO"]));
			_authform_var.parentObj.find("#authform_sel_ars_no").focus();
			comLayerPopUtil.close('div_ars_tel_pop');
			return _authform_var.arsNo;
		},
		//ARS인증 전화번호 조회
		getArsNoList : function() {
			var service_id = "com_sec_060101_1";

			if(!_authform_var.isLogin) { //비로그인
				service_id = "com_sec_060102_1";
			}

			var ajax = jex.createAjaxUtil(service_id); //서비스아이디

			ajax.set("task_package",    "com");                    //업무패키지코드
			ajax.set("task_subpackage", "sec");                    //업무서브패키지코드
			ajax.set("ars_no_sel_yn",   _authform_var.arsNoSelYn); //ARS인증 전화번호 선택가능 여부

			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];

				_authform_var.arsNoList = result["list"];

				if(_authform_var.arsNoSelYn == "N") {
					if(_authform_var.arsNoList.length > 0) {
						$("#authform_input_ars_no").val(_authform_var.arsNoList[0]["ARS_NO"]);
						$("#authform_input_ars_no2").text(_authform_var.arsNoList[0]["ARS_NO"]);//화면 출력용
						
						$("#authform_sel_ars_no").text(_authform_var.arsNoList[0]["DP_ARS_NO"]);
						_authform_var.arsNo = _authform_var.arsNoList[0]["ARS_NO"];
						$("#arsNoSelYn_Y").hide();
						$("#arsNoSelYn_N").show();
					}
				}
				else {
					$("#arsNoSelYn_Y").show();
					$("#arsNoSelYn_N").hide();
					if(_authform_var.arsNoList.length > 0) {
						var authform_ars_no_list = jex.getJexObj($("#authform_ars_no_list"), "JEX_MOBILE_LIST");
						authform_ars_no_list.setAll(_authform_var.arsNoList);
					}
					else {
						_authform_var.parentObj.find("#authform_sel_ars_no").text("ARS인증 전화번호가 존재하지 않습니다.");
					}

					_authform_var.parentObj.find("#authform_area_ars").show();
					_authform_var.parentObj.find("#authform_area_otp").hide();

					if(typeof _authform_var.callBackFunc == "function") {
						_authform_var.callBackFunc.apply();
					}
				}
			});
		},
		
		//전화번호 호출
		selectArsTelNo : function() {
			comLayerPopUtil.open('div_ars_tel_pop');
		},
		
		//ARS인증 요청
		callArs : function() {
			var service_id       = "com_sec_060101_2";
			var tr_svc           = "";
			var bswr_dscd        = "";
			var clph_no          = "";
			var fds_mnrc_user_nm = "";
			var fds_bank_nm      = "";
			var fds_tran_amt     = "";
			var fds_tran_cnt     = "";

			clph_no = $.trim(_authform_var.arsNo);

			if(MobUtil.isEmpty(clph_no)) {
				var msg = "ARS인증을 진행할 전화번호를 선택해 주세요."; //Default
				if(window.location.pathname.indexOf('/jsp/phone/fnt/qck/') > -1){ //[간편송금]'은 대표자휴대폰번호'만 보여주기때문..
					msg = "ARS인증을 위한 대표자휴대폰번호 정보가 없습니다. 영업점에 문의하여주시기 바랍니다.";
				}
				
				MobPopup.showAlertPopup(msg, "", function(){
					if (_authform_var.succCallBack != undefined && _authform_var.succCallBack != "") {
						eval(_authform_var.succCallBack);
					}
				});

				return;
			}

			if(!_authform_var.isLogin) { //비로그인
				service_id = "com_sec_060102_2";
			}

			//목적 서비스(01:공인인증서관리,02:단말기지정관리,03:PC지정서비스,05:ARS인증)
			if(MobUtil.isEmpty(_authform_var.trSvc)) {
				tr_svc = "05";
			} else {
				tr_svc = _authform_var.trSvc;
			}

			if(MobUtil.isEmpty(_authform_var.bswrDscd)) {
				bswr_dscd = "54";
			} else {
				bswr_dscd = _authform_var.bswrDscd;
			}

			if(_authform_var.isFdsAddtCrtc) { //FDS 추가인증
				if(MobUtil.isEmpty(_authform_var.bswrDscd)) {
					bswr_dscd = "83";
				} else {
					bswr_dscd = _authform_var.bswrDscd;
				}

				fds_mnrc_user_nm = _authform_var.fdsMnrcUserNm;
				fds_bank_nm      = _authform_var.fdsBankNm;
				fds_tran_amt     = _authform_var.fdsTranAmt;
				fds_tran_cnt     = _authform_var.fdsTranCnt;
			}

			var ajax = jex.createAjaxUtil(service_id); //서비스아이디

			ajax.errorTrx = false;

			ajax.set("task_package",     "com");            //업무패키지코드
			ajax.set("task_subpackage",  "sec");            //업무서브패키지코드
			ajax.set("tr_svc",           tr_svc);           //목적 서비스
			ajax.set("bswr_dscd",        bswr_dscd);        //목적 서비스에 대한 업무구분(멘트 내용)
			ajax.set("clph_no",          clph_no);          //전화번호
			ajax.set("fds_mnrc_user_nm", fds_mnrc_user_nm); //FDS멘트 입금계좌예금주명
			ajax.set("fds_bank_nm",      fds_bank_nm);      //FDS멘트 은행명
			ajax.set("fds_tran_amt",     fds_tran_amt);     //FDS멘트 거래총금액
			ajax.set("fds_tran_cnt",     fds_tran_cnt);     //FDS멘트 거래총건수

			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];

				if(result["_is_error"] == "true") {
					MobPopup.showAlertPopup("ARS인증 요청에 실패하였습니다.<br />다시 요청해주시기 바랍니다.");
					return;
				}
				else {
					var check_yn = result["CHECK_YN"];

					if(check_yn == "Y") {
						var cert_num_1 = result["CERT_NUM_1"];
						var cert_num_2 = result["CERT_NUM_2"];

						$("#authform_ars_cert_num").text(cert_num_1 + " " + cert_num_2);
						//$("#authform_ars_cert_num_2").text(cert_num_2);

						//jex.getJexObj($("#authform_pop_ars_cert"), "JEX_MOBILE_DIALOG").execute(); //ARS인증 팝업 실행
						$("#authform_pop_ars_cert").show();
					} else {
						MobPopup.showAlertPopup("ARS인증 요청에 실패하였습니다.<br />다시 요청해주시기 바랍니다.");
					}
				}
			});
		},
		//ARS인증 확인
		certArs : function() {
			//jex.getJexObj($("#authform_pop_ars_cert"), "JEX_MOBILE_DIALOG").close();
			
			if($("#authform_ars_cert_num").text() == "") {
				MobPopup.showAlertPopup("ARS 인증을 요청하세요.");
				return;
			}
			
			var service_id = "com_sec_060101_3";

			if(!_authform_var.isLogin) { //비로그인
				service_id = "com_sec_060102_3";
			}

			var ajax = jex.createAjaxUtil(service_id); //서비스아이디

			ajax.errorTrx = false;

			ajax.set("task_package",    "com"); //업무패키지코드
			ajax.set("task_subpackage", "sec"); //업무서브패키지코드

			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];

				if(result["_is_error"] == "true") {
					_isAuthComplete = false;
					MobPopup.showAlertPopup("ARS 인증에 실패하였습니다.<br />ARS 인증을 다시 진행해 주십시오");
					return;
				}
				else {
					if(result["RMTN_SCD"] == "T") {
						_isAuthComplete = false;
						MobPopup.showAlertPopup("ARS 인증이 진행중입니다.", "안내", function(){
							jex.getJexObj($("#authform_pop_ars_cert"), "JEX_MOBILE_DIALOG").execute(); //ARS인증 팝업 실행
						});
						return;
					}
					else if(result["RMTN_SCD"] == "7") {
						MobPopup.showAlertPopup("ARS인증 검증이 완료 되었습니다.", "안내", function(){
							_isAuthComplete = true;
							comLayerPopUtil.close('authform_area_ars_popup');
							
							
							//시크릿 폼이 초기화 되어 있는 경우
							if(_secretform_var.thisSForm != undefined && _secretform_var.thisSForm != "" && _authform_var.isStandAlone == false) {
								
								_secretform_var.thisSForm.secret_execute();
							} else {
								//시크릿폼이 초기화 되지 않고 단독으로 사용하는 경우 콜백 실행
								if (_authform_var.succCallBack != undefined && _authform_var.succCallBack != "") {
									eval(_authform_var.succCallBack);
								}
							}
							
							
						});
					}
					else if(result["RMTN_SCD"] != "7") {
						_isAuthComplete = false;
						MobPopup.showAlertPopup("ARS 인증에 실패하였습니다.<br />ARS 인증을 다시 진행해 주십시오");
						return;
					}
				}
			});
		},
		//OTP인증 확인
		certOtp : function() {
			var $authform_w_otp_ocrn_no = _authform_var.parentObj.find("#authform_w_otp_ocrn_no");

			if($authform_w_otp_ocrn_no.val().length != 6) {
				MobPopup.showAlertPopup("OTP발생번호를 입력해 주세요.");
				return false;
			}

			var web_otp_ocrn_no = $authform_w_otp_ocrn_no.attr("realValue"); //OTP발생번호
			var service_id      = "com_sec_060101_4";

			if(!_authform_var.isLogin) { //비로그인
				service_id = "com_sec_060102_4";
			}

			var ajax = jex.createAjaxUtil(service_id); //서비스아이디

			ajax.errorTrx = false;

			ajax.set("task_package",    "com");           //업무패키지코드
			ajax.set("task_subpackage", "sec");           //업무서브패키지코드
			ajax.set("web_otp_ocrn_no", web_otp_ocrn_no); //OTP발생번호

			ajax.execute(function(dat) {
				$authform_w_otp_ocrn_no.val("");

				var result = dat["_tran_res_data"][0];

				if(result["_is_error"] == "true") {
					MobPopup.showAlertPopup(result["_error_msg"]);
					return;
				}
				else {
					if(result["CHECK_YN"] == "Y") {
						MobPopup.showAlertPopup("OTP추가인증 검증이 완료 되었습니다.", "안내", function(){
							_isAuthComplete = true;
							_authform_var.parentObj.find("#authform_area_complete_msg").show();
							_authform_var.parentObj.find("#authform_area_otp").hide();
							_authform_var.parentObj.find("#authform_btn_confirm_otp").text("인증완료");
							_authform_var.parentObj.find("#authform_btn_confirm_otp").attr("disabled", true);
							
							//jylee todo : 여기서 시크리트 폼 실행거래 호출 필요
						});
					}
					else {
						_isAuthComplete = false;
						MobPopup.showAlertPopup("OTP추가인증에 실패하였습니다.<br />OTP추가인증을 다시 진행해 주십시오.");
						return;
					}
				}
			});
		}
	});

	jex.plugin.add("JEX_MOBILE_AUTHFORM", JexMobileAuthForm, "data-jx-authform");
})();

// auth.html에서 개인사업자중에 otp로 추가인증을 해야 하는 사용자인 경우 otp 인증 처리
function fds_otp() {
	var fds_otp_number = $("#otp_num_fds").val();
	if (fds_otp_number == "" || fds_otp_number.length < 6) {
		MobPopup.showAlertPopup("OTP 번호 6자리를 입력해 주세요.");
		return;
	} else {
		jex.setJexObj($("#auth_com_otp_fds").attr("data-jx-svc-onload", "true")); // FDS OTP
	}
}

// 개인사업자중 OTP로 추가인증을 해야 하는경우 보안매체검증  scc_das_050101_1.jsp
var auth_com_otp_fds = {
	uf_in : function($jq, data) {

		$jq.attr("data-jx-svc-iscall", true); // return 해제
		var sendDat = {};

		sendDat["web_otp_ocrn_no"] = $("#otp_num_fds").attr("realValue");
		sendDat["gubun"] = "trn010101";
		$jq.attr("data-jx-svc-source-direct", JSON.stringify(sendDat));
	},

	uf_out : function($jq, data) {
		var resultData = data["_tran_res_data"][0]; // result data
		var fds_otp_flag = resultData["_error_cd"]; //
		var _error_msg = resultData["_error_msg"];

		if (fds_otp_flag == null || fds_otp_flag == undefined
				|| fds_otp_flag == "") {
			$('#otp_fds_fail').hide();
			$('#otp_form_fds').hide();
			$('#otp_fds_complete').show();
			$("#otp_num_fds").val("");
			_isAuthComplete = true;
		} else {
			MobPopup.showAlertPopup(_error_msg); // OTP관련 계정계 에러 메시지 그대로 출력
			$('#otp_fds_complete').hide();
			$("#otp_num_fds").val("");
		}
	}
}

// 안드로이드인 경우 단말기의 핸드폰 번호와 고객정보에 있는 핸드폰번호가 일치하는지 검증
function checkSamePhoneNo() {
	var phoneType = _getPhoneType();

	if(phoneType != "I") {
		var telNum     = _hid_tlno      ;  // 세션에 있는 사용자 핸도픈번호
		var userTelNum = _devicePhoneNum;  // 단말기에서 추출한 핸드폰번호

		telNum      = $.trim(telNum.replace(/-/g, ""));
		userTelNum  = $.trim(userTelNum.replace(/-/g, ""));

		if(!(userTelNum == undefined || userTelNum == null || userTelNum == "")) {
			var telNumTemp = userTelNum.substring(0,3);

			if(telNumTemp == "+82") {
				userTelNum = userTelNum.replace("+82", "0");
			}
		}

		// 안드로이드 경우 디바이스 폰번호와 등록된 폰번호가 일치하지 않으면 SMS 추가인증 막음
		if(telNum !=  userTelNum) {
			_authform_var.isNotSamePhoneNo = true;
		}
	}
}

/* 추가인증폼 초기화 */
function authform_initDraw() {
	try {
		_isAuthComplete = false;
		_authform_var.arsNo = "";
		if($("#comAuthForm").length > 0) { $("#comAuthForm").empty(); }
	} catch(e) {}
}