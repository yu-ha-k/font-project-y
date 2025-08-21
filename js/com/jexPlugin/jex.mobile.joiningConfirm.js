var _joiningConfirm = null;

(function() {
	var JexMobileJoingConfirm = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			console.log('JexMobileJoingConfirm load');
			this.$this = $jq;
		},
		execute	: function(evt,$jq) {
			_joiningConfirm = this;
			_joiningConfirm.id         	   = this.$this.attr('data-jx-joingConfirm');
			_joiningConfirm.stepNo     	   = this.$this.attr('data-jx-joingConfirm-stepNo');
			_joiningConfirm.cusInfoSvcNm   = this.$this.attr("data-jx-joingConfirm-cusInfoSvcNm"); 	// 고객정보조회 서비스(ex:서비스명@패키지@서브패키지)
			_joiningConfirm.callBackFunc   = this.$this.attr('data-jx-joingConfirm-callback');
			
			_joiningConfirm.stpl_rcep_way_dcd = "3";
			
			$.get("../../../../html/phone/com/joiningConfirm.html").done(function(data) {
				
				// 가입권유확인서 화면그리기
				_joiningConfirm.$this.html($(data));
				jex.setJexObj(_joiningConfirm.$this);

				var $step = $('#joingConfirm_area');
				//------------------------------------------------------------------
				//	고객정보 조회
				//------------------------------------------------------------------
				var _svcNm      = 'com_cus_010101_1',
				    _package    = 'com',
				    _subpackage = 'cus';
						
				if (!isEmpty(_joiningConfirm.cusInfoSvcNm)) {
					var arr_svcNm = _joiningConfirm.cusInfoSvcNm.split("@");
					_svcNm 		= arr_svcNm[0];
					_package 	= arr_svcNm[1];
					_subpackage = arr_svcNm[2];
				}
				var ajax = jex.createAjaxUtil(_svcNm);
				ajax.setAsync(false);
				ajax.setErrTrx(false);
				ajax.set("task_package",    _package );
				ajax.set("task_subpackage", _subpackage );
				ajax.execute(function(_data) {
					var result = _data["_tran_res_data"][0];
					
					// 공통영역
					_joiningConfirm.eml    		= result["EAD"]; 		// 이메일ID
					_joiningConfirm.clph_lln	= result["CLPH_LLN_1"];	// 고객정보에서 조회한  전화번호 CLPH_LLN_1 - CLPH_TON_1 - CLPH_SRN_1 순
					_joiningConfirm.clph_ton	= result["CLPH_TON_1"];	// 고객정보에서 조회한  전화번호 CLPH_LLN_1 - CLPH_TON_1 - CLPH_SRN_1 순
					_joiningConfirm.clph_srn	= result["CLPH_SRN_1"];	// 고객정보에서 조회한  전화번호 CLPH_LLN_1 - CLPH_TON_1 - CLPH_SRN_1 순
					
					// 외환의 경우 사업자등록번호 세팅
					if (_svcNm == 'fnc_fxm_010301_1'){
						_joiningConfirm.bzn = result["BZN"];
					}
					
					//이메일 도메인 설정
					var email_domain_list = [];
					email_domain_list.push({"code":"","code_nm":"직접입력"});
					email_domain_list.push({"code":"naver.com","code_nm":"naver.com"});
					email_domain_list.push({"code":"daum.net","code_nm":"daum.net"});
					email_domain_list.push({"code":"gmail.com","code_nm":"gmail.com"});
					email_domain_list.push({"code":"hanmail.net","code_nm":"hanmail.net"});
					email_domain_list.push({"code":"nate.com","code_nm":"nate.com"});
					email_domain_list.push({"code":"yahoo.co.kr","code_nm":"yahoo.co.kr"});
					email_domain_list.push({"code":"hotmail.com","code_nm":"hotmail.com"});
					email_domain_list.push({"code":"dreamwiz.com","code_nm":"dreamwiz.com"});
					email_domain_list.push({"code":"empal.com","code_nm":"empal.com"});
					email_domain_list.push({"code":"freechal.com","code_nm":"freechal.com"});
					email_domain_list.push({"code":"hanafos.com","code_nm":"hanafos.com"});
					email_domain_list.push({"code":"kebi.com","code_nm":"kebi.com"});
					email_domain_list.push({"code":"korea.com","code_nm":"korea.com"});
					email_domain_list.push({"code":"shinbiro.com","code_nm":"shinbiro.com"});

					var ul_email_domain = jex.getJexObj($step.find("#ul_email_domain"), "JEX_MOBILE_LIST");
					ul_email_domain.setAll(email_domain_list);
					
					var ul_stpl_rcep_way_list = [];
					ul_stpl_rcep_way_list.push({"code":"3","code_nm":"이메일"});
					ul_stpl_rcep_way_list.push({"code":"4","code_nm":"문자(LMS)"});
					ul_stpl_rcep_way_list.push({"code":"5","code_nm":"카카오 알림톡"});
					
					var ul_stpl_rcep_way = jex.getJexObj($step.find("#ul_stpl_rcep_way"), "JEX_MOBILE_LIST");
					ul_stpl_rcep_way.setAll(ul_stpl_rcep_way_list);
					
					if(!isEmpty(_joiningConfirm.eml)){
						var ead_arr  = _joiningConfirm.eml.split("@");

						$step.find("#EAD_1").val(ead_arr[0]);
						$step.find('#EAD_2_1').val(ead_arr[1]);
						$step.find("#spn_email_domain").text(ead_arr[1]);	
					}
					
					if(!isEmpty(_joiningConfirm.clph_lln) && !isEmpty(_joiningConfirm.clph_ton) && !isEmpty(_joiningConfirm.clph_srn)){
						$step.find("#TPN_1").val(_joiningConfirm.clph_lln);
						$step.find("#TPN_2").val(_joiningConfirm.clph_ton);
						$step.find("#TPN_3").val(_joiningConfirm.clph_srn);
					}

					// lemon 알림톡으로 변경
					joiningConfirmObj.uf_setStplRcepWay(null, ul_stpl_rcep_way_list[2]);
				});	
					
				//------------------------------------------------------------------
				//	적합성 판단 조회(금융소비자상세구분코드)
				//------------------------------------------------------------------
				var ajaxDpm = jex.createAjaxUtil("fnc_dpm_010201_2");
				ajaxDpm.setAsync(false);
				ajaxDpm.setErrTrx(false);
				ajaxDpm.set("task_package",    "fnc" );
				ajaxDpm.set("task_subpackage", "dpm" );

				ajaxDpm.execute(function(_data) {
					var result = _data["_tran_res_data"][0];

					_joiningConfirm.fnlc_dtl_dcd = result["FNLC_DTL_DCD"];
					
					var fnlc_dtl_map = {};
					fnlc_dtl_map["01"] =   {"fnlc_dtl_nm1":"일반금융 소비자","fnlc_dtl_nm2":"만19세 미만"};
					fnlc_dtl_map["02"] =   {"fnlc_dtl_nm1":"일반금융 소비자","fnlc_dtl_nm2":"피성년후견인"};
					fnlc_dtl_map["03"] =   {"fnlc_dtl_nm1":"일반금융 소비자","fnlc_dtl_nm2":"피한정후견인"};
					fnlc_dtl_map["04"] =   {"fnlc_dtl_nm1":"일반금융 소비자","fnlc_dtl_nm2":"만65세 이상"};
					fnlc_dtl_map["05"] =   {"fnlc_dtl_nm1":"전문금융 소비자","fnlc_dtl_nm2":"만19세 이상 및 만65세 미만 성인"};
					fnlc_dtl_map["06"] =   {"fnlc_dtl_nm1":"전문금융 소비자","fnlc_dtl_nm2":"법인/조합 등 단체"};
					
					$step.find("#fnlc_dtl_nm1").text(fnlc_dtl_map[_joiningConfirm.fnlc_dtl_dcd]["fnlc_dtl_nm1"]);
					$step.find("#fnlc_dtl_nm2").text(fnlc_dtl_map[_joiningConfirm.fnlc_dtl_dcd]["fnlc_dtl_nm2"]);
				});	
				
				uf_goStep(_joiningConfirm.stepNo);
				
				//------------------------------------------------------------------
				// 이벤트 세팅 (전화번호 , 버튼 활성화 상태 체크)
				//------------------------------------------------------------------
				$step.find('input[type=tel]').keyup(function(e) {
					$(this).val($(this).val().replace(/[^0-9]/g, ''));
				});
				$step.find('#EAD_2_2').keyup(function(e) {
					comBtnStateUtil.update();
				});
				comBtnStateUtil.init($step, $("#btn_next_joining"), function() {
					var ead_domain = isEmpty($step.find('#EAD_2_1').val()) ? $step.find('#EAD_2_2').val() : $step.find('#EAD_2_1').val(),
					    blnOk = true; //사용자 체크 유효성 결과
					
					//이메일 유효성 체크
					if (_joiningConfirm.stpl_rcep_way_dcd == '3') {
						if(isEmpty(ead_domain)){
							blnOk = false;
						}
					} else {
						var tpn1 = $.trim($step.find("#TPN_1").val());
						var tpn2 = $.trim($step.find("#TPN_2").val());
						var tpn3 = $.trim($step.find("#TPN_3").val());
						
						if(isEmpty(tpn1) || isEmpty(tpn2) || isEmpty(tpn3) ) {
							blnOk = false;
						}
					}
					return blnOk;
				});
				
				// 최초 버튼 활성화
				/*if (!isEmpty($step.find("#EAD_1").val()) && !isEmpty($step.find("#EAD_2_1").val())) {
					comBtnStateUtil.update();
				}*/
				if (!isEmpty($step.find("#TPN_1").val()) && !isEmpty($step.find("#TPN_2").val()) && !isEmpty($step.find("#TPN_3").val())) {
					comBtnStateUtil.update();
				}
				
			});	
		}
	});
	
	jex.plugin.add("JEX_MOBILE_JOININGCONFIRM", JexMobileJoingConfirm, "data-jx-joingConfirm");
})();


var joiningConfirmObj = {
	checkValidNextStep : function() {
		var $step   = $("#joingConfirm_area");
		
		if(_joiningConfirm.stpl_rcep_way_dcd == "3"){
			var email_id     = $.trim($step.find("#EAD_1").val());
			var email_domain = isEmpty($step.find('#EAD_2_1').val()) ? $.trim($step.find('#EAD_2_2').val()) : $.trim($step.find('#EAD_2_1').val());
			_joiningConfirm.cus_elcr_adr = email_id + "@" + email_domain;
			_joiningConfirm.sms_tpn = "";
			
			if(isEmpty(email_id) || isEmpty(email_domain)) {
				MobPopup.showAlertPopup("이메일 주소를 입력해주세요.");
				return;
			}

			if(!joiningConfirmObj.isValidEmail(_joiningConfirm.cus_elcr_adr)){		
				MobPopup.showAlertPopup("이메일 형식에 맞지 않습니다.");
				return;
			}
			
			// 이메일이 변경되었을 경우
			if(_joiningConfirm.eml != _joiningConfirm.cus_elcr_adr){
				MobPopup.showConfirmPopup("이메일 주소를 수정하셨습니다. 계약체결 후 해당 이메일로 관련서류등이 발송될 예정입니다.<br><br>E-mail : "+_joiningConfirm.cus_elcr_adr+"<br><br>입력하신 주소가 맞으십니까?", "알림"
					, function() {
					eval(_joiningConfirm.callBackFunc)(_joiningConfirm);
					}
					, function(){}
				);
			}else{
				eval(_joiningConfirm.callBackFunc)(_joiningConfirm);
			}
		}else{
			
			var tpn1 = $.trim($step.find("#TPN_1").val());
			var tpn2 = $.trim($step.find("#TPN_2").val());
			var tpn3 = $.trim($step.find("#TPN_3").val());
			_joiningConfirm.cus_elcr_adr = "";
			_joiningConfirm.sms_tpn = tpn1 + "" + tpn2 + "" + tpn3;
			
			if(isEmpty(tpn1) || isEmpty(tpn2) || isEmpty(tpn3) ) {
				MobPopup.showAlertPopup("휴대전화번호를 입력해주세요.");
				return;
			}
			
			if(!("010" == tpn1 || "011" == tpn1 || "016" == tpn1 || "017" == tpn1 || "018" == tpn1 || "019" == tpn1)){
				MobPopup.showAlertPopup("휴대전화번호 앞자리를 정확히 입력해주십시요.");
				return;
			}

			if (_joiningConfirm.sms_tpn.length < 10 || _joiningConfirm.sms_tpn.length >11) {		
				MobPopup.showAlertPopup("휴대전화번호를 정확히 입력해주십시요.");
				return;
			}
			
			// 휴대폰이 변경되었을 경우
			if( tpn1 != _joiningConfirm.clph_lln || tpn2 != _joiningConfirm.clph_ton || tpn3 != _joiningConfirm.clph_srn ){
				MobPopup.showConfirmPopup("휴대전화번호를 수정하셨습니다. 계약체결 후 해당 휴대전화번호로 관련서류등이 발송될 예정입니다.<br><br>휴대전화번호 : "+mobFormatter.phone(_joiningConfirm.sms_tpn)+"<br><br>입력하신 번호가 맞으십니까?", "알림"
					, function() {
						eval(_joiningConfirm.callBackFunc)(_joiningConfirm);
					}
					, function(){}
				);
			}else{
				eval(_joiningConfirm.callBackFunc)(_joiningConfirm);
			}
		}
		
	},
	
	// 올바른 EMAIL 인지 검증
	isValidEmail: function(EMAIL) {
	    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
		if (EMAIL.search(format) == -1) {
		   return false;
		}
		return true;
	},

	// 계약서류 제공방법 
	uf_setStplRcepWay($jq, data) {
		var $step   = $("#joingConfirm_area");
		var code    = $.trim(data["code"]);
		var code_nm = $.trim(data["code_nm"]);	
		
		if(code == "3"){
			$step.find(".stpl_rcep_way_part1").show();
			$step.find(".stpl_rcep_way_part2").hide();
		}else{
			$step.find(".stpl_rcep_way_part1").hide();
			$step.find(".stpl_rcep_way_part2").show();
		}	
		
		$step.find("#spn_stpl_rcep_way").text(code_nm);
		_joiningConfirm.stpl_rcep_way_dcd = code;
		
		if($jq != null){
			comSelectPopUtil.setActiveClass($jq);
			comBtnStateUtil.update();
			comLayerPopUtil.close('bottomStplrcepWay');
		}
	},
	/* 이메일 도메인 설정 */
	uf_setEmailDomain: function($jq, data) {
		var $step   = $("#joingConfirm_area");
		var code    = $.trim(data["code"]);
		var code_nm = $.trim(data["code_nm"]);
		
		//직접입력 선택시
		if(code == ""){
			$step.find('#EAD_2_1').val('');
			$step.find('.selectMailDomain').show();
		}else{
			$step.find('#EAD_2_1').val(code);
			$step.find('.selectMailDomain').hide();
		}
		$step.find("#spn_email_domain").text(code_nm);	
		$step.find('#EAD_2_2').val('');

		comSelectPopUtil.setActiveClass($jq);
		comBtnStateUtil.update();
		comLayerPopUtil.close('bottomEmailList');
	}

		
}
