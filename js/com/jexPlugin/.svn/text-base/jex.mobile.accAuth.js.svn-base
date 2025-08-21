var _accAuthPlgn = null;

(function() {
	var JexMobileAccAuth = JexPlugin.extend({
		cusInfo : {}, //고객정보
		ibkAcno : "",
		reqCnt : 0,
		init : function() {
		},
		/**
		 * @method load
		 * data-jx-accAuth 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			this.$this = $jq;
		},
		execute : function(cbSuccess) {
			this.id         = this.$this.attr("data-jx-accAuth");            //계좌인증 플러그인ID
			this.stepNo     = this.$this.attr("data-jx-accAuth-stepNo");     //계좌인증 플러그인 스텝번호
			this.type       = this.$this.attr("data-jx-accAuth-type");       //계좌인증구분(01:당행+타행, 02:당행, 03:타행)
			this.taskType   = this.$this.attr("data-jx-accAuth-taskType");   //업무구분(01:첫계좌개설, 입출식/증권계좌/외화계좌)
			this.faceFuncNm = this.$this.attr("data-jx-accAuth-faceFuncNm"); //얼굴인증으로 변경 함수명
			this.nffYn      = this.$this.attr("data-jx-accAuth-nffYn");      //비대면계좌개설여부
			this.copYn      = this.$this.attr("data-jx-accAuth-copYn");      //법인여부
			this.loginYn    = this.$this.attr("data-jx-accAuth-loginYn");    //로그인여부
			
			if(isEmpty(this.type)) { //계좌인증구분 미설정 시 타행
				this.type = "03"; //타행
			}
			
			if(isEmpty(this.nffYn)) { //비대면계좌개설여부 미설정 시 'N'
				this.nffYn = "N";
			}
			
			if(isEmpty(this.copYn)) { //법인여부 미설정 시 'N'
				this.copYn = "N";
			}
			
			if(isEmpty(this.loginYn)) { //로그인여부 미설정 시 'Y'
				this.loginYn = "Y";
			}
			
			this.cbSuccess = cbSuccess; //계좌 인증 완료 후 수행하는 콜백함수
			
			_accAuthPlgn = this;
			
			$.get("../../../../html/phone/com/accAuthForm.html").done(function(data) {
				var $accAuthForm = $(data);
				
				if(_accAuthPlgn.type == "01") { //당행+타행
					_accAuthPlgn.$this.html($accAuthForm.find("#acc_auth_plgn_tab_area").html());
					_accAuthPlgn.$this.find("#acc_auth_tab_ibk").html($accAuthForm.find("#acc_auth_plgn_ibk_area").html());
					_accAuthPlgn.$this.find("#acc_auth_tab_other").html($accAuthForm.find("#acc_auth_plgn_other_area").html());
					_accAuthPlgn.$this.attr("class", "content_wrap");
				}
				else if(_accAuthPlgn.type == "02") { //당행
					_accAuthPlgn.$this.html($accAuthForm.find("#acc_auth_plgn_title_area").html());
					_accAuthPlgn.$this.find(".title_text").text("기업은행 계좌인증");
					_accAuthPlgn.$this.append($accAuthForm.find("#acc_auth_plgn_ibk_area").html());
					_accAuthPlgn.$this.attr("class", "content_wrap ty3");
				}
				else if(_accAuthPlgn.type == "03") { //타행
					_accAuthPlgn.$this.html($accAuthForm.find("#acc_auth_plgn_title_area").html());
					_accAuthPlgn.$this.append($accAuthForm.find("#acc_auth_plgn_other_area").html());
					_accAuthPlgn.$this.attr("class", "content_wrap ty3");
				}
				
				jex.setJexObj(_accAuthPlgn.$this);
				
				if(isEmpty(_accAuthPlgn.faceFuncNm) == false) {
					_accAuthPlgn.$this.find(".btn_area.tyTxt").show();
					
					_accAuthPlgn.$this.find(".btn_area.tyTxt").find("button").on("click", function() {
						eval(_accAuthPlgn.faceFuncNm)();
					});
				}
				
				if(_accAuthPlgn.nffYn != "Y" && _accAuthPlgn.loginYn == "Y") { //비대면계좌개설이 아니면서 로그인일 경우
					comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
						_accAuthPlgn.cusInfo = this["cus_info"];
					});
					
					if(_accAuthPlgn.cusInfo["INDV_CORP_DTL_DCD"] == "2") { //법인
						_accAuthPlgn.copYn = "Y";
					}
					else {
						_accAuthPlgn.copYn = "N";
					}
				}
				
				/* 꼭 알아두세요 설정 */
				if(_accAuthPlgn.copYn == "Y") { //법인
					if(_accAuthPlgn.type == "01") { //당행+타행
						jex.getJexObj($("#acc_auth_plgn_guide_3"), "JEX_MOBILE_GUIDETIP").execute(); //다른금융
						jex.getJexObj($("#acc_auth_plgn_guide_4"), "JEX_MOBILE_GUIDETIP").execute(); //기업은행
					}
					else if(_accAuthPlgn.type == "02") { //당행
						jex.getJexObj($("#acc_auth_plgn_guide_4"), "JEX_MOBILE_GUIDETIP").execute(); //기업은행
					}
					else if(_accAuthPlgn.type == "03") { //타행
						jex.getJexObj($("#acc_auth_plgn_guide_3"), "JEX_MOBILE_GUIDETIP").execute(); //다른금융
					}
				}
				else { //개인사업자
					if(_accAuthPlgn.type == "01") { //당행+타행
						jex.getJexObj($("#acc_auth_plgn_guide_1"), "JEX_MOBILE_GUIDETIP").execute(); //다른금융
						jex.getJexObj($("#acc_auth_plgn_guide_2"), "JEX_MOBILE_GUIDETIP").execute(); //기업은행
					}
					else if(_accAuthPlgn.type == "02") { //당행
						jex.getJexObj($("#acc_auth_plgn_guide_2"), "JEX_MOBILE_GUIDETIP").execute(); //기업은행
					}
					else if(_accAuthPlgn.type == "03") { //타행
						jex.getJexObj($("#acc_auth_plgn_guide_1"), "JEX_MOBILE_GUIDETIP").execute(); //다른금융
					}
				}
				
				if(_accAuthPlgn.type != "02") { //당행이 아닐경우 인증번호 확인 팝업 생성
					if($("#acc_auth_confirm_pop").length == 0) {
						$(".container_wrap").append($accAuthForm.find("#acc_auth_plgn_pop_area").html());
					}
					
					$("#acc_auth_plgn_org_acnt").on("keyup", function() {
						var orgAcnt = $(this).val();
						var orgList = _trn_comm_var.trn_banks.filter(org => org.pattern.test(orgAcnt) && org.code != "003");
						
						$("#acc_auth_plgn_org_btn_list").empty();
						
						var maxCnt = 3;
						var orgCnt = orgList.length;
						
						if(orgCnt > maxCnt) {
							orgCnt = maxCnt;
						}
						
						for(var i = 0; i < orgCnt; i++) {
							var orgCode = orgList[i].code;
							var orgName = orgList[i].name;
							
							var tag = '';
							
							tag += '<button type="button" class="btn badge ty2" onclick="_accAuthPlgn.setMatchOrg(\''+ orgCode + '\',\'' + orgName + '\');">';
							tag += '	<span class="ico_box ty3 ico_bank_' + orgCode + '"></span>' + orgName;
							tag += '</button>';
							
							$("#acc_auth_plgn_org_btn_list").append(tag);
						}
						
						_accAuthPlgn.checkStateReqBtn(); //1원 입금 요청버튼 활성여부 체크
					});
				}
				
				if(_accAuthPlgn.type != "03") { //타행이 아닐경우 당행계좌목록 조회 실행
					var plgnSelAcnt  = null;
					var $plgnSelAcnt = $("#plgn_sel_acnt");
					
					if(_accAuthPlgn.nffYn == "Y") { //비대면계좌개설
						_accAuthPlgn.getIbkAcntNFF(function(acntList) {
							$plgnSelAcnt.attr("data-jx-selAcnt-sessionId", "");
							
							plgnSelAcnt = jex.getJexObj($plgnSelAcnt, "JEX_MOBILE_SELACNT");
							
							plgnSelAcnt.setAcntList(acntList, {"ACNT_NO":"ACN", "ACNT_NM":"PDM"});
							
							plgnSelAcnt.execute(function(resData) {
								if(isEmpty(resData) == false && resData.length > 0) {
									_accAuthPlgn.selectIbkAcnt(resData[0]);
								}
								
								uf_goStep(_accAuthPlgn.stepNo);
							});
						});
					}
					else {
						if(_accAuthPlgn.loginYn == "Y") { //로그인
							$plgnSelAcnt.attr("data-jx-selAcnt-sessionId", "INQ_ACNT_LIST"); //조회권한이 있는 일반계좌
							
							plgnSelAcnt = jex.getJexObj($plgnSelAcnt, "JEX_MOBILE_SELACNT");
							
							plgnSelAcnt.execute(function(resData) {
								if(isEmpty(resData) == false && resData.length > 0) {
									_accAuthPlgn.selectIbkAcnt(resData[0]);
								}
								
								uf_goStep(_accAuthPlgn.stepNo);
							});
						}
						else { //비로그인
							_accAuthPlgn.getIbkAcnt(function(acntList) {
								$plgnSelAcnt.attr("data-jx-selAcnt-sessionId", "");
								
								plgnSelAcnt = jex.getJexObj($plgnSelAcnt, "JEX_MOBILE_SELACNT");
								
								plgnSelAcnt.setAcntList(acntList, {"ACNT_NO":"ACN", "ACNT_NM":"PDM"});
								
								plgnSelAcnt.execute(function(resData) {
									if(isEmpty(resData) == false && resData.length > 0) {
										_accAuthPlgn.selectIbkAcnt(resData[0]);
									}
									
									uf_goStep(_accAuthPlgn.stepNo);
								});
							});
						}
					}
				}
				else {
					uf_goStep(_accAuthPlgn.stepNo);
				}
			});
		},
		setMatchOrg : function(orgCode, orgName) {
			if(orgCode == "003") { //기업은행을 선택한 경우
				MobPopup.showAlertPopup("IBK기업은행 외 다른 기관을 선택해 주세요");
				return;
			}
			
			$("#acc_auth_plgn_org_name").text(orgName);
			$("#acc_auth_plgn_org_code").val(orgCode);
			
			_accAuthPlgn.checkStateReqBtn();
		},
		checkStateReqBtn : function() {
			var orgAcnt = $("#acc_auth_plgn_org_acnt").val();
			var orgCode = $("#acc_auth_plgn_org_code").val();
			
			if(isEmpty(orgAcnt) == false && isEmpty(orgCode) == false) {
				$("#acc_auth_plgn_req_btn").prop("disabled", false);
			}
			else {
				$("#acc_auth_plgn_req_btn").prop("disabled", true);
			}
		},
		openConfirmPop : function() {
			comLayerPopUtil.open("acc_auth_confirm_pop");
		},
		/* 기관 선택 팝업 */
		openOrgPop : function() {
			var options = {
				title           : "기관 선택",               //팝업제목
				selectedOrgName : "#acc_auth_plgn_org_name", //선택한 기관명을 적용할 Target Element ID
				selectedOrgCode : "#acc_auth_plgn_org_code", //선택한 기관코드를 적용할 Target Element ID
				excludeOrg      : "003",                     //제외할 기관코드
				callbackConfirm : function($jq, dat) {       //선택 후 호출할 콜백함수
					_accAuthPlgn.checkStateReqBtn();
				}
			}
			
			comOrgPopUtil.open(options);
		},
		selectIbkAcnt : function(data) {
			_accAuthPlgn.ibkAcno = data["EBNK_ACN"];
		},
		setCusInfo : function(cusInfo) {
			this.cusInfo = cusInfo;
		},
		getCusInfo : function(bzn_1, bzn_2, bzn_3, callback) {
			var ajax = jex.createAjaxUtil("com_sec_110101_3");
			
			ajax.set("task_package",    "com");
			ajax.set("task_subpackage", "sec");
			
			ajax.set("BZN_1", bzn_1);
			ajax.set("BZN_2", bzn_2);
			ajax.set("BZN_3", bzn_3);
			
			var cusInfo = {}; //고객정보
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				
				_accAuthPlgn.cusInfo = resData;
				
				callback(resData);
			});
		},
		/* 비대면 실명확인 계좌정보조회 */
		getIbkAcntNFF : function(callback) {
			var svcId   = "nff_acn_011101_1";
			var edpsCsn = _accAuthPlgn.cusInfo["RPPR_EDPS_CSN"];
			
			if(_accAuthPlgn.copYn == "Y") { //법인
				svcId   = "nff_acn_041101_1";
				edpsCsn = _accAuthPlgn.cusInfo["BSNN_EDPS_CSN"];
			}
			
			var ajax = jex.createAjaxUtil(svcId);
			
			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			
			ajax.set("EDPS_CSN", edpsCsn); //전산고객번호
			
			var acntList = [];
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				
				acntList = resData["list"];
				
				callback(acntList);
			});
		},
		getIbkAcnt : function(callback) {
			var ajax = jex.createAjaxUtil("com_sec_110101_1");
			
			ajax.set("task_package",    "com");
			ajax.set("task_subpackage", "sec");
			
			ajax.set("COP_YN", _accAuthPlgn.copYn); //법인여부
			
			var acntList = [];
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				
				acntList = resData["ACNT_LIST"];
				
				callback(acntList);
			});
		},
		/* 기업은행 계좌검증 */
		checkIbkAcnt : function(acno, acntPwd) {
			if(_accAuthPlgn.nffYn == "Y") { //비대면계좌개설
				var svcId   = "nff_acn_011801_1";
				var corpDcd = "5";
				
				if(_accAuthPlgn.copYn == "Y") { //법인
					svcId   = "nff_acn_041801_1";
					corpDcd = "2";
				}
				
				var ajax = jex.createAjaxUtil(svcId);
				
				ajax.set("task_package",    "nff");
				ajax.set("task_subpackage", "acn");
				
				ajax.set("DROT_ACN", acno);    //계좌번호
				ajax.set("ACNT_PWD", acntPwd); //계좌비밀번호
				
				ajax.execute(function(data) {
					var resData = data["_tran_res_data"][0];
					var errCd   = resData["sp_err_cd"];
					var errMsg  = resData["sp_err_msg"];
					
					if(isEmpty(errCd) == false) { //오류
						if(errCd == "NFF_ERR_005") {
							MobPopup.showErrorPopup(errCd, errMsg, function() {
								_webViewExit();
							});
						}
						else {
							MobPopup.showErrorPopup(errCd, errMsg);
						}
					}
					else {
						if(resData["RESULT"] == "OK") { //인증완료
							var param = _accAuthPlgn.cusInfo;
							
							param["INDV_CORP_DTL_DCD"]  = corpDcd;
							param["NOFC_RLNC_PGRS_SCD"] = "32";
							param["RMRK_CON"]           = "";
							param["ERR_CD"]             = "";
							
							_accAuthPlgn.saveStatusNFF(param, function() {
								MobPopup.showAlertPopup("본인명의 계좌로 확인되었습니다.", "", function() {
									if(typeof _accAuthPlgn.cbSuccess == "function") {
										var resData = {};
										
										resData["SCS_YN"] = "Y"; //성공여부
										
										_accAuthPlgn.cbSuccess.apply(this, [resData]); //계좌 인증 완료 후 수행하는 콜백함수 실행
									}
								});
							});
						}
					}
				});
			}
			else {
				if(_accAuthPlgn.loginYn == "Y") { //로그인
					var ajax = jex.createAjaxUtil("svc_bnk_130101_8");
					
					ajax.set("task_package",    "svc");
					ajax.set("task_subpackage", "bnk");
					
					ajax.set("DROT_ACN", acno);    //계좌번호
					ajax.set("ACNT_PWD", acntPwd); //계좌비밀번호
					
					ajax.execute(function(data) {
						var resData = data["_tran_res_data"][0];
						
						if(resData["SCS_YN"] == "Y") { //인증완료
							MobPopup.showAlertPopup("본인명의 계좌로 확인되었습니다.", "", function() {
								if(typeof _accAuthPlgn.cbSuccess == "function") {
									_accAuthPlgn.cbSuccess.apply(this, [resData]); //계좌 인증 완료 후 수행하는 콜백함수 실행
								}
							});
						}
					});
				}
				else { //비로그인
					var ajax = jex.createAjaxUtil("com_sec_110101_2");
					
					ajax.set("task_package",    "com");
					ajax.set("task_subpackage", "sec");
					
					ajax.set("DROT_ACN", acno);    //계좌번호
					ajax.set("ACNT_PWD", acntPwd); //계좌비밀번호
					
					ajax.execute(function(data) {
						var resData = data["_tran_res_data"][0];
						
						if(resData["SCS_YN"] == "Y") { //인증완료
							MobPopup.showAlertPopup("본인명의 계좌로 확인되었습니다.", "", function() {
								if(typeof _accAuthPlgn.cbSuccess == "function") {
									_accAuthPlgn.cbSuccess.apply(this, [resData]); //계좌 인증 완료 후 수행하는 콜백함수 실행
								}
							});
						}
					});
				}
			}
		},
		/* 당행/타행 계좌 확인 */
		confirmAcntNFF : function(param, cb) {
			var svcId = "nff_acn_011001_1";
			
			if(_accAuthPlgn.copYn == "Y") { //법인
				svcId = "nff_acn_041001_1";
			}
			
			var ajax = jex.createAjaxUtil(svcId);
			
			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			
			ajax.set("ACN",     param["ACN"]);     //계좌번호
			ajax.set("BNCD",    param["BNCD"]);    //은행코드
			ajax.set("BNCD_NM", param["BNCD_NM"]); //은행명
			
			if(_accAuthPlgn.copYn == "Y") { //법인
				ajax.set("RNN",          param["BZN"]);          //사업자번호
				ajax.set("GTHR_BSNN_NM", param["GTHR_BSNN_NM"]); //사업자명
			}
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				var errCd   = resData["sp_err_cd"];
				var errMsg  = resData["sp_err_msg"];
				
				if(isEmpty(errCd) == false) { //오류
					if(errCd == "NFF_ERR_005") {
						MobPopup.showErrorPopup(errCd, errMsg, function() {
							_webViewExit();
						});
					}
					else {
						MobPopup.showErrorPopup(errCd, errMsg);
					}
				}
				else {
					if(typeof cb == "function") {
						cb.apply(); //콜백함수 실행
					}
				}
			});
		},
		requestAuthNFF : function(param, cb) {
			var ajax = jex.createAjaxUtil("nff_acn_011001_1");
			
			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			
			ajax.set("ACN",  param["ACN"]);  //계좌번호
			ajax.set("BNCD", param["BNCD"]); //은행코드
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				var errCd   = resData["sp_err_cd"];
				var errMsg  = resData["sp_err_msg"];
				
				if(isEmpty(errCd) == false) { //오류
					if(errCd == "NFF_ERR_005") {
						MobPopup.showErrorPopup(errCd, errMsg, function() {
							_webViewExit();
						});
					}
					else {
						MobPopup.showErrorPopup(errCd, errMsg);
					}
				}
				else {
					if(typeof cb == "function") {
						cb.apply(); //콜백함수 실행
					}
				}
			});
		},
		saveStatusNFF : function(param, cb) {
			var ajax = jex.createAjaxUtil("nff_acn_011401_1");
			
			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			
			ajax.set("WBCS_RLNM_ALTR_NO",  param["WBCS_RLNM_ALTR_NO"]);  //전행고객실명대체번호
			ajax.set("INDV_CORP_DTL_DCD",  param["INDV_CORP_DTL_DCD"]);  //개인법인상세구분코드
			ajax.set("TRN_YMD",            param["TRN_YMD"]);            //거래년월일
			ajax.set("TRHS_SRN",           param["TRHS_SRN"]);           //거래내역일련번호
			ajax.set("NOFC_RLNC_PGRS_SCD", param["NOFC_RLNC_PGRS_SCD"]); //비대면실명확인진행상태코드
			ajax.set("RMRK_CON",           param["RMRK_CON"]);           //비고내용
			ajax.set("ERR_CD",             param["ERR_CD"]);             //오류코드
			
			ajax.execute(function(data) {
				var resData = data["_tran_res_data"][0];
				var errCd   = resData["sp_err_cd"];
				var errMsg  = resData["sp_err_msg"];
				var isBack  = resData["is_back"];
				
				if(isEmpty(errCd) == false) { //오류
					if(isBack == "main") {
						MobPopup.showErrorPopup(errCd, errMsg, function() {
							_webViewExit();
						});
					}
					else {
						MobPopup.showErrorPopup(errCd, errMsg);
					}
				}
				else {
					if(typeof cb == "function") {
						cb.apply(); //콜백함수 실행
					}
				}
			});
		},
		checkPwd : function() {
			if(isEmpty(_accAuthPlgn.ibkAcno)) {
				MobPopup.showAlertPopup("계좌번호를 선택해 주세요.");
				return;
			}
			
			_callXecureKeypad_withCallback("acc_auth_ibk_pwd", "1", "4", "4", "계좌비밀번호를 입력하세요.", null, "N", null, null, function() {
				var $acntPwd = $("#acc_auth_ibk_pwd");
				
				if(isEmpty($acntPwd.val()) == false && $acntPwd.val().length == 4) {
					var acntPwd = $acntPwd.attr("realValue");
					
					$acntPwd.val("").removeAttr("realValue"); //계좌비밀번호 초기화
					
					if(_accAuthPlgn.nffYn == "Y") { //비대면계좌개설
						var param = {};
						
						if(_accAuthPlgn.copYn == "Y") { //법인
							param = {"ACN":_accAuthPlgn.ibkAcno, "BNCD":"003", "BZN":_accAuthPlgn.cusInfo["BZN"], "GTHR_BSNN_NM":_accAuthPlgn.cusInfo["GTHR_BSNN_NM"]};
						}
						else {
							param = {"ACN":_accAuthPlgn.ibkAcno, "BNCD":"003"};
						}
						
						//당행/타행 계좌확인
						_accAuthPlgn.confirmAcntNFF(param, function() {
							_accAuthPlgn.checkIbkAcnt(_accAuthPlgn.ibkAcno, acntPwd); //기업은행 계좌검증
						});
					}
					else {
						_accAuthPlgn.checkIbkAcnt(_accAuthPlgn.ibkAcno, acntPwd); //기업은행 계좌검증
					}
				}
			});
		},
		/* 1원 입금 요청 */
		reqDeposit : function() {
			var orgAcnt = $("#acc_auth_plgn_org_acnt").val();  //계좌번호
			var orgCode = $("#acc_auth_plgn_org_code").val();  //기관코드
			var orgName = $("#acc_auth_plgn_org_name").text(); //기관명
			
			if(isEmpty(orgAcnt)) {
				MobPopup.showAlertPopup("계좌번호를 입력해 주세요.", "", function() {
					$("#acc_auth_plgn_org_acnt").focus();
				});
				return;
			}
			
			if(isEmpty(orgCode)) {
				MobPopup.showAlertPopup("기관을 선택해 주세요.");
				return;
			}
			
			if(_accAuthPlgn.nffYn == "Y") { //비대면계좌개설
				var param = {};
				
				if(_accAuthPlgn.copYn == "Y") { //법인
					param = {"ACN":orgAcnt, "BNCD":orgCode, "BNCD_NM":orgName, "BZN":_accAuthPlgn.cusInfo["BZN"], "GTHR_BSNN_NM":_accAuthPlgn.cusInfo["GTHR_BSNN_NM"]};
				}
				else {
					param = {"ACN":orgAcnt, "BNCD":orgCode, "BNCD_NM":orgName};
				}
				
				//당행/타행 계좌확인
				_accAuthPlgn.confirmAcntNFF(param, function() {
					var svcId   = "nff_acn_011201_1";
					var corpDcd = "5";
					
					if(_accAuthPlgn.copYn == "Y") { //법인
						svcId   = "nff_acn_041201_1";
						corpDcd = "2";
					}
					
					var ajax = jex.createAjaxUtil(svcId);
					
					ajax.set("task_package",    "nff");
					ajax.set("task_subpackage", "acn");
					
					ajax.set("WBCS_RLNM_ALTR_NO",  _accAuthPlgn.cusInfo["WBCS_RLNM_ALTR_NO"]); //전행고객실명대체번호
					ajax.set("TRN_YMD",            _accAuthPlgn.cusInfo["TRN_YMD"]);           //거래년월일
					ajax.set("TRHS_SRN",           _accAuthPlgn.cusInfo["TRHS_SRN"]);          //거래내역일련번호
					ajax.set("NOFC_RLNC_PGRS_SCD", "31");                                      //계좌인증요청
					ajax.set("BNCD",               orgCode);                                   //기관코드
					ajax.set("IOB_ACN",            orgAcnt);                                   //계좌번호
					
					ajax.execute(function(data) {
						var resData = data["_tran_res_data"][0];
						var errCd   = resData["sp_err_cd"];
						var errMsg  = resData["sp_err_msg"];
						
						if(isEmpty(errCd) == false) { //오류
							if(errCd == "FRS99999") {
								var msg = "입력하신 계좌에 1원 입금이 정상적으로 완료되지 않았습니다.<br>";
								msg += "해당계좌에 입금 내역을 확인하신 후, 이어가기로 다시 거래해주시기 바랍니다.";
								
								MobPopup.showAlertPopup(msg, "", function() {
									_webViewExit();
								});
							}
							else {
								MobPopup.showAlertPopup(errMsg);
							}
						}
						else {
							_accAuthPlgn.orgCode = orgCode;
							_accAuthPlgn.orgAcnt = orgAcnt;
							
							_accAuthPlgn.reqCnt++;
							
							_accAuthPlgn.openConfirmPop();
						}
					});
				});
			}
			else {
				var ajax = jex.createAjaxUtil("svc_bnk_130101_3");
				
				ajax.set("task_package",    "svc");
				ajax.set("task_subpackage", "bnk");
				
				ajax.set("BNCD",             orgCode);                                  //기관코드
				ajax.set("BNCD_NM",          orgName);                                  //기관명
				ajax.set("ACN",              orgAcnt);                                  //계좌번호
				ajax.set("RPPR_KRN_SRNM_NM", _accAuthPlgn.cusInfo["RPPR_KRN_SRNM_NM"]); //대표자고객명
				ajax.set("KRN_CSM",          _accAuthPlgn.cusInfo["KRN_CSM"]);          //기업명
				ajax.set("COP_YN",           _accAuthPlgn.copYn);                       //법인여부
				
				ajax.setErrTrx(false);
				
				ajax.execute(function(data) {
					var resData = data["_tran_res_data"][0];
					
					if(resData["_is_error"] == "true") { //오류발생
						var errorCd  = resData["_error_cd"];
						var errorMsg = resData["_error_msg"];
						
						if(errorCd == "NFF_ERR_003") { //실명확인 불가
							MobPopup.showAlertPopup("이용할 수 없는 계좌예요.");
						}
						else if(errorCd == "NFF_ERR_004") { //예금주 불일치
							MobPopup.showAlertPopup("계좌정보가 다릅니다.예금주와 계좌번호를 확인 후 다시 인증해 주세요.");
						}
						else {
							MobPopup.showErrorPopup(errorCd, errorMsg);
						}
					}
					else {
						orgCode = resData["BNCD"];
						orgAcnt = resData["ACN"];
						
						var accAuthText = "IBK";
						
						if(_accAuthPlgn.taskType == "01") { //계좌개설 업무
							accAuthText = "계좌개설기업";
						}
						
						var ajax = jex.createAjaxUtil("svc_bnk_130101_4");
						
						ajax.set("task_package",    "svc");
						ajax.set("task_subpackage", "bnk");
						
						ajax.set("BNCD",             orgCode);                                  //기관코드
						ajax.set("BNCD_NM",          orgName);                                  //기관명
						ajax.set("ACN",              orgAcnt);                                  //계좌번호
						ajax.set("RPPR_KRN_SRNM_NM", _accAuthPlgn.cusInfo["RPPR_KRN_SRNM_NM"]); //대표자고객명
						ajax.set("acc_auth_text",    accAuthText)
						ajax.set("COP_YN",           _accAuthPlgn.copYn);                       //법인여부
						
						ajax.execute(function(data) {
							var resData = data["_tran_res_data"][0];
							var errCd   = resData["sp_err_cd"];
							var errMsg  = resData["sp_err_msg"];
							
							if(isEmpty(errCd) == false) { //오류
								if(errCd == "ECBKEBK11879") { //타행 역계좌인증 최대횟수(5회) 초과시 에러메시지 코드
									MobPopup.showAlertPopup("당일 이용 가능한 타행 계좌 인증(최대 5회)이 모두 사용되었습니다.<br>타행 계좌인증이 필요한 경우 다음날 이용해 주시기 바랍니다.", "", function() {
										_webViewExit();
									});
								}
								else if(errCd == "FRS99999") {
									MobPopup.showAlertPopup("입력하신 계좌에 1원 입금이 정상적으로 완료되지 않았습니다.");
								}
								else {
									MobPopup.showAlertPopup(errMsg);
								}
							}
							else {
								_accAuthPlgn.orgCode = orgCode;
								_accAuthPlgn.orgAcnt = orgAcnt;
								
								_accAuthPlgn.reqCnt++;
								
								_accAuthPlgn.openConfirmPop();
							}
						});
					}
				});
			}
		},
		/* 인증번호 입력 초기화 */
		initInRnnmVl : function() {
			$("#acc_auth_in_rnnm_vl").text("숫자 4자리 입력");
			$("#acc_auth_rnnm_vl").val("").removeAttr("realValue");
		},
		callNumKeypad : function() {
			_callXecureKeypad_withCallback("acc_auth_rnnm_vl", "1", "4", "4", "인증번호 4자리를 입력하세요.", null, "N", null, null, function() {
				var accAuthRnnmVl = $("#acc_auth_rnnm_vl").val();
				
				if(isEmpty(accAuthRnnmVl) == false && accAuthRnnmVl.length == 4) {
					$("#acc_auth_in_rnnm_vl").text("****");
				}
				else {
					$("#acc_auth_in_rnnm_vl").text("");
				}
			});
		},
		checkOtherAcnt : function() {
			if(isEmpty($("#acc_auth_rnnm_vl").val())) {
				MobPopup.showAlertPopup("인증번호를 입력해 주세요.");
				return;
			}
			
			var accAuthRnnmVl = $("#acc_auth_rnnm_vl").attr("realValue");
			
			_accAuthPlgn.initInRnnmVl(); //인증번호 입력 초기화
			
			if(_accAuthPlgn.nffYn == "Y") { //비대면계좌개설
				var accAuthText = "IBK";
				
				if(_accAuthPlgn.taskType == "01") { //계좌개설 업무
					accAuthText = "계좌개설기업";
				}
				
				var svcId   = "nff_acn_011301_1";
				var corpDcd = "5";
				
				if(_accAuthPlgn.copYn == "Y") { //법인
					svcId   = "nff_acn_041301_1";
					corpDcd = "2";
				}
				
				var ajax = jex.createAjaxUtil(svcId);
				
				ajax.set("task_package",    "nff");
				ajax.set("task_subpackage", "acn");
				
				ajax.set("INDV_CORP_DTL_DCD", corpDcd);                                   //개인법인상세구분코드(2:법인, 5:개인사업자)
				ajax.set("WBCS_RLNM_ALTR_NO", _accAuthPlgn.cusInfo["WBCS_RLNM_ALTR_NO"]); //전행고객실명대체번호
				ajax.set("TRN_YMD",           _accAuthPlgn.cusInfo["TRN_YMD"]);           //거래년월일
				ajax.set("TRHS_SRN",          _accAuthPlgn.cusInfo["TRHS_SRN"]);          //거래내역일련번호
				ajax.set("RNNM_VL",           accAuthRnnmVl);                             //인증번호
				ajax.set("RNNM_TYPE",         accAuthText);                               //인증타입
				
				ajax.execute(function(data) {
					var resData  = data["_tran_res_data"][0];
					var errCd    = resData["sp_err_cd"];
					var errMsg   = resData["sp_err_msg"];
					var isUpdate = resData["sp_need_update_status"];
					
					if(isEmpty(errCd) == false) { //오류
						if(isUpdate == "true") { //상태값 업데이트
							var param = _accAuthPlgn.cusInfo;
							
							param["INDV_CORP_DTL_DCD"]  = corpDcd;
							param["NOFC_RLNC_PGRS_SCD"] = "92";
							param["RMRK_CON"]           = errMsg;
							param["ERR_CD"]             = errCd;
							
							_accAuthPlgn.saveStatusNFF(param, function() {
								_webViewExit();
							});
						}
						else if(errCd == "ECBKCUS10614") { //오류횟수 초과
							MobPopup.showAlertPopup(errMsg, "", function() {
								comLayerPopUtil.close("acc_auth_confirm_pop", function() {
									_webViewExit();
								});
							});
						}
						else {
							MobPopup.showAlertPopup(errMsg, "", function() {
								_accAuthPlgn.initInRnnmVl(); //인증번호 입력 초기화
							});
						}
					}
					else {
						var param = _accAuthPlgn.cusInfo;
						
						param["INDV_CORP_DTL_DCD"]  = corpDcd;
						param["NOFC_RLNC_PGRS_SCD"] = "32";
						param["RMRK_CON"]           = "";
						param["ERR_CD"]             = "";
						
						_accAuthPlgn.saveStatusNFF(param, function() {
							MobPopup.showAlertPopup("본인명의 계좌로 확인되었습니다.", "", function() {
								comLayerPopUtil.close("acc_auth_confirm_pop", function() {
									if(typeof _accAuthPlgn.cbSuccess == "function") {
										var resData = {};
										
										resData["SCS_YN"] = "Y"; //성공여부
										resData["BNCD"]   = _accAuthPlgn.orgCode;
										resData["ACN"]    = _accAuthPlgn.orgAcnt;
										
										_accAuthPlgn.cbSuccess.apply(this, [resData]); //계좌 인증 완료 후 수행하는 콜백함수 실행
									}
								});
							});
						});
					}
				});
			}
			else {
				var ajax = jex.createAjaxUtil("svc_bnk_130101_5");
				
				ajax.set("task_package",    "svc");
				ajax.set("task_subpackage", "bnk");
				
				ajax.set("ACNT_CRTC_RNNM_VL", accAuthRnnmVl); //인증번호
				
				ajax.execute(function(data) {
					var resData = data["_tran_res_data"][0];
					var errCd   = resData["sp_err_cd"];
					var errMsg  = resData["sp_err_msg"];
					var errCnt  = resData["err_cnt"];
					
					if(isEmpty(errCd) == false) { //오류
						if(errCd == "IAP008" && errCnt < 5) {
							MobPopup.showAlertPopup(errMsg, "", function() {
								_accAuthPlgn.initInRnnmVl(); //인증번호 입력 초기화
							});
						}
						else {
							MobPopup.showAlertPopup(errMsg, "", function() {
								comLayerPopUtil.close("acc_auth_confirm_pop", function() {
									uf_reLoad();
								});
							});
						}
					}
					else {
						MobPopup.showAlertPopup("본인명의 계좌로 확인되었습니다.", "", function() {
							comLayerPopUtil.close("acc_auth_confirm_pop", function() {
								if(typeof _accAuthPlgn.cbSuccess == "function") {
									var resData = {};
									
									resData["SCS_YN"] = "Y"; //성공여부
									resData["BNCD"]   = _accAuthPlgn.orgCode;
									resData["ACN"]    = _accAuthPlgn.orgAcnt;
									
									_accAuthPlgn.cbSuccess.apply(this, [resData]); //계좌 인증 완료 후 수행하는 콜백함수 실행
								}
							});
						});
					}
				});
			}
		},
		cancel : function() {
			MobPopup.showConfirmPopup("취소하시겠습니까?", "", function() {
				uf_back();
			});
		}
	});
	
	jex.plugin.add("JEX_MOBILE_ACC_AUTH", JexMobileAccAuth, "data-jx-accAuth");
})();