var _lfncform_var = {
	
};

(function() {
	/**
	 * Date: 22. 5. 06
	 * gearhead89
	 * @namespace JexMobileLfncform
	 */
	
	var sForm_attrs = {
		"id"          : "data-jx-lfncform"              //호출할 svc 명
		,"stepNo"     : "data-jx-lfncform-step-no"      //적합성적정성 진행 stepNo
		,"prevStepNo" : "data-jx-lfncform-prev-step-no" //적합성적정성 이전 stepNo
		,"callback"   : "data-jx-lfncform-callback"     //판단결과 이후 진행
		,"type"	      : "data-jx-lfncform-type"
	};
	
	var JexMobileLfncform = JexPlugin.extend({
		init: function () {
			
		},
		/**
		 * @method load
		 * data-jx-lfncform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			_lfncform_var = this;
			_lfncform_var.parentObj = $jq ;
			
			//모듈 호출하는 stepNo
			_lfncform_var.id         = _lfncform_var.parentObj.attr('id');
			_lfncform_var.stepNo     = _lfncform_var.parentObj.attr('data-jx-lfncform-step-no');
			_lfncform_var.prevStepNo = _lfncform_var.parentObj.attr('data-jx-lfncform-prev-step-no');
			_lfncform_var.callback   = _lfncform_var.parentObj.attr('data-jx-lfncform-callback');
			_lfncform_var.type   	 = _lfncform_var.parentObj.attr('data-jx-lfncform-type');
			
			//화면 마지막 step 추가
			_lfncform_var.lastStepNo = jex.plugin.get("JEX_MOBILE_STEP").getLastStepNo();
			
			var formFilePath = "../../com/lfncform.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/lfncform.html";
			}
			$.get(formFilePath).done(function(dat) {
				$lfncform_html = $(dat);
				
				//평가기관 step 추가
				var scrVainUi = $lfncform_html.find("#vainStep").html();
				$('#step').append(scrVainUi);
				jex.setJexObj($('#vainPopup'));
	
				//이메일 주소 step 추가
				var emailAddrUi =  $lfncform_html.find("#emailStep").html();
				$('#step').append(emailAddrUi);
				jex.setJexObj($('#emailOptPopup'));
				
				//유의사항 step 추가
				_lfncform_var.noticeStep = ++_lfncform_var.lastStepNo;
				var noticeUi =  $lfncform_html.find("#noticeStep").html();
				$('#step').append(noticeUi);
				
				$("#step div[name=noticeId]").attr("id", "step"+_lfncform_var.noticeStep);
				$("#step div[name=noticeId]").attr("data-jx-step-no", _lfncform_var.noticeStep);
				
				jex.setJexObj($('#step'+_lfncform_var.noticeStep));
	
				//체크리스트 화면그리기
				var chklistUi =  $lfncform_html.find("#lfncform_chklistStep").html();
				_lfncform_var.parentObj.html(chklistUi);
				
				$("#lfncSecretForm").attr("data-jx-secretform-parent-id", "step"+_lfncform_var.stepNo);
				
				jex.setJexObj($('#lfncSecretForm'));
				
				// 유의사항
				jex.setJexObj($('#div_guide_lfnc'));
				
				var plgnLfncGuideTip = jex.getJexObj($("#div_guide_lfnc"), "JEX_MOBILE_GUIDETIP");
				plgnLfncGuideTip.execute();
				
				var resultUi =  $lfncform_html.find("#lfncform_resultStep").html();
				_lfncform_var.parentObj.append(resultUi);
				jex.setJexObj($('#lfncform_result'));
			});	

		},
		//정합성, 적정성 고객정보 확인서 체크리스트 시작
		execute	: function(evt,$jq) {
			
			//이벤트 바인딩
			_lfncform_var.setEvent();
			
			if (_lfncform_var.type == 'pdfMall') {
				_lfncform_var.inqLfncInfo2();
			} else {
				_lfncform_var.inqLfncInfo();
			}
		},
		setEvent : function(){
			
			//이메일주소 리스트 셋
			var email_dcd_list = [];
			email_dcd_list.push({"code":"","code_nm":"직접입력"});
			email_dcd_list.push({"code":"naver.com","code_nm":"naver.com"});
			email_dcd_list.push({"code":"daum.net","code_nm":"daum.net"});
			email_dcd_list.push({"code":"gmail.com","code_nm":"gmail.com"});
			email_dcd_list.push({"code":"hanmail.net","code_nm":"hanmail.net"});
			email_dcd_list.push({"code":"nate.com","code_nm":"nate.com"});
			email_dcd_list.push({"code":"yahoo.co.kr","code_nm":"yahoo.co.kr"});
			email_dcd_list.push({"code":"hotmail.com","code_nm":"hotmail.com"});
			email_dcd_list.push({"code":"dreamwiz.com","code_nm":"dreamwiz.com"});
			email_dcd_list.push({"code":"empal.com","code_nm":"empal.com"});
			email_dcd_list.push({"code":"freechal.com","code_nm":"freechal.com"});
			email_dcd_list.push({"code":"hanafos.com","code_nm":"hanafos.com"});
			email_dcd_list.push({"code":"kebi.com","code_nm":"kebi.com"});
			email_dcd_list.push({"code":"korea.com","code_nm":"korea.com"});
			email_dcd_list.push({"code":"shinbiro.com","code_nm":"shinbiro.com"});
			
			var $step        = $("#emailOptPopup");
			var ul_lfncform_email_dcd = jex.getJexObj($step.find("#ul_lfncform_email_dcd"), "JEX_MOBILE_LIST");
			ul_lfncform_email_dcd.setAll(email_dcd_list);
			
			//전문금융소비자 선택 이벤트
			_lfncform_var.parentObj.find('input:radio[name=lfnc_ra_01]').off("click").on("click", function(e) {
				if(this.value == '02'){
					
					if (_lfncform_var.type == 'pdfMall') {
						MobPopup.showAlertPopup("전문금융소비자는 신청대상 고객이 아닙니다.", "", function() {
							$('input:radio[name=lfnc_ra_01]').prop('checked',false);
						});
					} else {
						MobPopup.showConfirmPopup("전문금융소비자가 맞으십니까? 전문금융소비자는 청약철회권을 행사할 수 없습니다. *전문금융소비자 : 국가, 금융회사, 주권상장법인 등.", "", function() {
							$("#div_lfnc_acm_dcd").hide();
						},function() {
							//form 초기화
							_lfncform_var.initForm();
							$("#div_lfnc_acm_dcd").show();
						});
					}
					
				}
				else{
					$("#div_lfnc_acm_dcd").show();
				}
			});
			
			_lfncform_var.parentObj.find('input:radio[name=lfnc_ra_02]').off("click").on("click", function(e) {
				var scrVainVal = $(this).val();
				
				if(scrVainVal == "07"){
					if (_lfncform_var.type == 'pdfMall') {
						MobPopup.showConfirmPopup("시설자금이 맞으십니까?<br/>시설자금은 비대면 대출 대상이 아닙니다.<br/> *시설자금 : 부동산의 매입, 신축, 증축 등<br/>대출상품 목록 화면으로 이동하시겠습니까?", ""
						, function() { //예
							uf_pdfMall();
						}
						, function(){ //아니오
							$("input:radio[name=lfnc_ra_02]").prop("checked", false);
						});
					} else {
						MobPopup.showConfirmPopup("시설자금이 맞으십니까?<br/>시설자금은 비대면 대출 대상이 아닙니다.<br/> *시설자금 : 부동산의 매입, 신축, 증축 등.", ""
								, function() { //예
									uf_reLoad();
								}
								, function(){ //아니오
									$("input:radio[name=lfnc_ra_02]").prop("checked", false);
								});
					}
					return;
				}
			});
			
			//신용점수 선택 이벤트
			_lfncform_var.parentObj.find('input:radio[name=lfnc_ra_09]').off("click").on("click", function(e) {
				if(this.value == 'Y'){ //잘모름
					$('#lfnc_cbScore').val('').prop('disabled', true);
					$('#lfnc_cbScore').prop('disabled', true);
					$('#lfnc_gigan').text('평가기관 선택');
					$('#lfnc_scrVain').val('');
				}
				else{
					$('#lfnc_cbScore').prop('disabled', false);
					$('#lfnc_cbScore').prop('disabled', false);
					$('#lfnc_gigan').text('평가기관 선택');
					$('#lfnc_scrVain').val('');
				}
			});
			
			//평가기관 step이동 이벤트
			_lfncform_var.parentObj.find('#div_lfnc_scr_vain').off("click").on("click", function(e) {
				if(!$('#lfnc_ra_09_01').prop('checked')) return false;
				comLayerPopUtil.open('vainPopup');
			});

			//평가기관 선택 이벤트
			$('#vainPopup').find('li[name=btn_scr_vain]').each(function(idx, obj){
				$(obj).off("click").on("click", function(e) {
					var scrVainVal = $(this).attr('data-scr-vain-val');
					if(scrVainVal == '01'){
						_lfncform_var.parentObj.find("#lfnc_gigan").text('KCB');
						_lfncform_var.parentObj.find("#lfnc_scrVain").val('01');
					}
					else if(scrVainVal == '02'){
						_lfncform_var.parentObj.find("#lfnc_gigan").text('NICE');
						_lfncform_var.parentObj.find("#lfnc_scrVain").val('02');
					}
					
					comLayerPopUtil.close('vainPopup');
					return {};
				});
			});

			//유의사항 step이동 이벤트
			_lfncform_var.parentObj.find('#btn_lfnc_notice').off("click").on("click", function(e) {
				uf_goStep(_lfncform_var.noticeStep);
			});
			
			_lfncform_var.parentObj.find("#chk_lfnc_notice").off("click").on("click", function(e){
				if($("#chk_lfnc_notice").is(":checked")) { 
					uf_goStep(_lfncform_var.noticeStep);
				}
			});
			
			//유의사항step 동의 버튼 이벤트
			$('#step'+_lfncform_var.noticeStep).find('#btn_lfnc_notice_agree').off("click").on("click", function(e) {
				$("#chk_lfnc_notice").prop("checked", true);
				comUtil_back(_lfncform_var.stepNo);
			});
			
			//적합성, 적정성 판단결과 이후 진행 callback 이벤트
			_lfncform_var.parentObj.find('#btn_lfnc_callback').off("click").on("click", function(e) {
				eval(_lfncform_var.callback);
			});
		},
		initForm : function($jq){
			/* form영역 초기화 */
			
			//radio 선택 초기화
			_lfncform_var.parentObj.find('input[type=radio]').each(function(idx, obj){
				var eleId = $(obj).attr("id");
				$("#"+eleId).prop("checked",false);

				//disabled 해제
				if($("#"+eleId).prop("disabled")){
					$("#"+eleId).prop('disabled', false);
				}
			});
			
			//text, tel 초기화
			_lfncform_var.parentObj.find('input[type=text], input[type=tel]').each(function(idx, obj){
				var eleId = $(obj).attr("id");
				$("#"+eleId).val("");

				//disabled 해제
				if($("#"+eleId).prop("disabled")){
					$("#"+eleId).prop('disabled', false);
				}
			});

			//유의사항 동의 해제
			$("#chk_lfnc_notice").prop("checked", false);

			//체크리스트 화면 호출
			_lfncform_var.parentObj.find("#lfncform_chklist").show();
			_lfncform_var.parentObj.find("#lfncform_result").hide();

			//여신금융상담관리번호 초기화
			_lfncform_var.lfnc_mngm_no == "";
		},
		//금소법 결과 조회
		inqLfncInfo : function(){
			var ajax = jex.createAjaxUtil('fnt_lon_010002_1'); //서비스아이디

			//ajax.errorTrx = false;
			
			ajax.set("task_package",     "fnt"); //업무패키지코드
			ajax.set("task_subpackage",  "lon"); //업무서브패키지코드
			
			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];
				
				//통과
				if(result["LFNC_JDGM_RSLT_DCD"] == "01"){
					_lfncform_var.parentObj.find('#lfnc_lb_001').val(result["EAD_1"]);
					_lfncform_var.parentObj.find('#lfnc_lb_002').val(result["EAD_2"]);
					
					if (!isEmpty(result["EAD_2"])) {
						_lfncform_var.parentObj.find('#spn_lfnc_email').text(result["EAD_2"]);
					}
					
					_this.pluginSecretForm = jex.getJexObj($('#lfncSecretForm'), "JEX_MOBILE_SECRETFORM");
					_this.pluginSecretForm.initVar();
					
					_secretform_var.W_SNCT_DSNC      = "2";   //결재실행구분 (0:기본값, 1:기안, 2:전결실행, 3:승인)
					_secretform_var.isUseSecuMedia   = false; //보안검증(X)
					_secretform_var.isUseDrotAcntPwd = false; //출금계좌비밀번호(X)
					_secretform_var.isUseTrnPwd      = false; //이용자비밀번호(X)

					// /* 보안검증 load */
					_this.pluginSecretForm.getSecretForm(function() {
						//테스트용
//						if(_isDevMode){
//							for(var i=1; i<12; i++){
//								_lfncform_var.parentObj.find("input[name=lfnc_ra_"+uf_lpad(i,2,0)+"]:first").prop('checked', true);
//							}
//							_lfncform_var.parentObj.find("#lfnc_age").val('30');
//							_lfncform_var.parentObj.find("#lfnc_cbScore").val('1000');
//							_lfncform_var.parentObj.find("#gigan").val('1000');
//							_lfncform_var.parentObj.find("#lfnc_scrVain").val('01');
//							_lfncform_var.parentObj.find("#lfnc_gigan").text('KCB');
//							_lfncform_var.parentObj.find("#lfnc_lb_001").val('abc');
//							_lfncform_var.parentObj.find("#lfnc_lb_002").val('ibk.co.kr');
//							_lfncform_var.parentObj.find("#chk_lfnc_notice").prop("checked", true);
//						}
						
						if(_lfncform_var.stepNo == 1){
							$('#step').show();
						}
						else{
							uf_goStep(_lfncform_var.stepNo);
						}
					});
				}
				else{
					var msg = "당일 부적합판정을 받은 고객으로 오늘은 대출신청이 불가합니다. 익영업일에 다시 적합성·적정성 고객정보 확인단계를 다시 수행해주시기 바랍니다. (문의: 고객센터(1566-2566))";
					//주메세지, title, callback[확인], 서브메세지
					MobPopup.showAlertPopup(msg, "", function() {
						_webViewExit();
					});
					return "STOP_SVC";
				}
			});
		},
		// 적합성적정성실행검증내역 조회
		inqLfncInfo2 : function(){
			var ajax = jex.createAjaxUtil('fnc_dpm_030101_1'); //서비스아이디

			//ajax.errorTrx = false;

			ajax.set("task_package",     "fnc"); //업무패키지코드
			ajax.set("task_subpackage",  "dpm"); //업무서브패키지코드

			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];
				
				//통과
				if(result["LFNC_JDGM_RSLT_DCD"] == "02"){
					var msg = "당일 부적합판정을 받은 고객으로 오늘은 대출신청이 불가합니다. 익영업일에 다시 적합성·적정성 고객정보 확인단계를 다시 수행해주시기 바랍니다. (문의: 고객센터(1566-2566))";
					MobPopup.showAlertPopup(msg, "", function() {
						_webViewExit();
					});
					return "STOP_SVC";
				}
				else{
					_lfncform_var.inqLfncInfo3();
				}
			});			
		},
		// 적합성적정성실행검증내역 조회
		inqLfncInfo3 : function(){
			var ajax = jex.createAjaxUtil('fnc_dpm_030101_2'); //서비스아이디

			//ajax.errorTrx = false;

			ajax.set("task_package",     "fnc"); //업무패키지코드
			ajax.set("task_subpackage",  "dpm"); //업무서브패키지코드

			ajax.execute(function(dat) {
				var result = dat["_tran_res_data"][0];
				
				_lfncform_var.parentObj.find('#lfnc_lb_001').val(result["strEmlId"]);
				_lfncform_var.parentObj.find('#lfnc_lb_002').val(result["strEmlSrvrAdr"]);
				
				if (!isEmpty(result["strEmlSrvrAdr"])) {
					_lfncform_var.parentObj.find('#spn_lfnc_email').text(result["strEmlSrvrAdr"]);
				}
				
				_this.pluginSecretForm = jex.getJexObj($('#lfncSecretForm'), "JEX_MOBILE_SECRETFORM");
				_this.pluginSecretForm.initVar();
				
				_secretform_var.W_SNCT_DSNC      = "2";   //결재실행구분 (0:기본값, 1:기안, 2:전결실행, 3:승인)
				_secretform_var.isUseSecuMedia   = false; //보안검증(X)
				_secretform_var.isUseTrnPwd      = false; //이용자비밀번호(X)
				_secretform_var.isUseSignedMsg	 = true;  //전자서명(O)

				// /* 보안검증 load */
				_this.pluginSecretForm.getSecretForm(function() {
//					if(_lfncform_var.stepNo == 1){
//						$('#step').show();
//					}
//					else{
//						uf_goStep(_lfncform_var.stepNo);
//					}
				});
				
			});			
		},
		// 체크리스트 정합성 체크
		lfnc_pre_call_submit : function(){
			
			var lfnc_ra_01 = $('input[name=lfnc_ra_01]:checked').val();     //전문금융 소비자여부
			var lfnc_age   = $("#lfnc_age").val();                          //연령
			var lfnc_ra_02 = $('input[name=lfnc_ra_02]:checked').val();     //대출용도
			var lfnc_ra_03 = $('input[name=lfnc_ra_03]:checked').val();     //보유자산
			var lfnc_ra_04 = $('input[name=lfnc_ra_04]:checked').val();     //현재소득
			var lfnc_ra_05 = $('input[name=lfnc_ra_05]:checked').val();     //미래예상소득
			var lfnc_ra_06 = $('input[name=lfnc_ra_06]:checked').val();     //부채
			var lfnc_ra_07 = $('input[name=lfnc_ra_07]:checked').val();     //고정지출
			var lfnc_ra_08 = $('input[name=lfnc_ra_08]:checked').val();     //연체정보
			var lfnc_ra_09 = $('input[name=lfnc_ra_09]:checked').val();     //신용점수
			var lfnc_cbScore = _lfncform_var.parentObj.find('#lfnc_cbScore').val(); //신용점수
			var lfnc_scrVain = _lfncform_var.parentObj.find("#lfnc_scrVain").val(); //평가기관
			var lfnc_ra_11 = $('input[name=lfnc_ra_11]:checked').val();     //변제방법

			var e_mail_1 = _lfncform_var.parentObj.find("#lfnc_lb_001").val().trim();
			var e_mail_2 = _lfncform_var.parentObj.find("#lfnc_lb_002").val().trim();
			e_mail_2 = isEmpty(e_mail_2) ? _lfncform_var.parentObj.find("#lfnc_lb_002_2").val().trim() : e_mail_2;
			
			var lfnc_email = e_mail_1 + "@" + e_mail_2;                       //이메일
		
			if(isEmpty(lfnc_ra_01)){
				MobPopup.showAlertPopup("전문금융 소비자여부를 선택하시기 바랍니다" , "알림", function () {
				});
				return;
			}

			//일반금융소비자
			if(lfnc_ra_01 == "01"){
				
				if(isEmpty(lfnc_age)){
					MobPopup.showAlertPopup("연령을 입력하시기 바랍니다.");
					return;
				}

				if(isEmpty(lfnc_ra_02)){
					MobPopup.showAlertPopup("대출용도를 선택하시기 바랍니다.");
					return;
				}
				else if(lfnc_ra_02 == "07"){
					MobPopup.showConfirmPopup("시설자금이 맞으십니까? 시설자금은 비대면 대출 대상이 아닙니다. *시설자금 : 부동산의 매입, 신축, 증축등.", ""
					, function() { //예
						uf_reLoad();
					}
					, function(){ //아니오
						$("#lfnc_ra_02_01").prop("checked", false);
						$("#lfnc_ra_02_02").prop("checked", false);
					});
					return;
				}

				if(isEmpty(lfnc_ra_03)){
					MobPopup.showAlertPopup("보유자산을 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_04)){
					MobPopup.showAlertPopup("현재소득을 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_05)){
					MobPopup.showAlertPopup("미래예상소득을 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_06)){
					MobPopup.showAlertPopup("부채를 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_07)){
					MobPopup.showAlertPopup("고정지출을 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_08)){
					MobPopup.showAlertPopup("연체정보를 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				if(isEmpty(lfnc_ra_09)){
					MobPopup.showAlertPopup("신용점수를 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
				else if(lfnc_ra_09 == "N"){
					if(isEmpty(lfnc_cbScore)){
						MobPopup.showAlertPopup("신용점수를 입력하시기 바랍니다." , "알림", function(){
						});
						return;
					}
					if(lfnc_cbScore > 1000 || lfnc_cbScore == "" || lfnc_cbScore < 1){
						MobPopup.showAlertPopup("신용점수를 1~1000 점 사이로 입력해 주십시오.", "알림", function() {
						});
						return;
					}
					if(isEmpty(lfnc_scrVain)){
						MobPopup.showAlertPopup("평가기관을 선택해 주세요." , "알림", function () {
						});
						return;
					}
				}

				if(isEmpty(lfnc_ra_11)){
					MobPopup.showAlertPopup("변제방법을 선택하시기 바랍니다." , "알림", function(){
					});
					return;
				}
			}
			
			//E-mail 유효성검증
			if(isEmpty(e_mail_1) || isEmpty(e_mail_2) || lfnc_email.indexOf("@") < 1 || !isValidEmail($.trim(lfnc_email))){
				MobPopup.showAlertPopup("올바른 이메일 주소가 아닙니다.");
				return;
			}
			
			if(_lfncform_var.parentObj.find("#chk_lfnc_notice").is(":checked") == false){
				MobPopup.showAlertPopup("유의사항 내용보기를 클릭하세요.");
				return;
			}

			function isValidEmail(EMAIL) {
				var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
				if (EMAIL.search(format) == -1) {
					return false;
				}
				return true;
			}

			return true;
		},
		//금소법 결과 조회 및 등록
		regLfncInfo : function(){ //여기서부터 시작
			var lfnc_ra_01 = $('input[name=lfnc_ra_01]:checked').val();     //전문금융 소비자여부
			var lfnc_age   = $("#lfnc_age").val();                          //연령
			var lfnc_ra_02 = $('input[name=lfnc_ra_02]:checked').val();     //대출용도
			var lfnc_ra_03 = $('input[name=lfnc_ra_03]:checked').val();     //보유자산
			var lfnc_ra_04 = $('input[name=lfnc_ra_04]:checked').val();     //현재소득
			var lfnc_ra_05 = $('input[name=lfnc_ra_05]:checked').val();     //미래예상소득
			var lfnc_ra_06 = $('input[name=lfnc_ra_06]:checked').val();     //부채
			var lfnc_ra_07 = $('input[name=lfnc_ra_07]:checked').val();     //고정지출
			var lfnc_ra_08 = $('input[name=lfnc_ra_08]:checked').val();     //연체정보
			var lfnc_ra_09 = $('input[name=lfnc_ra_09]:checked').val();     //신용점수
			var lfnc_cbScore = _lfncform_var.parentObj.find('#lfnc_cbScore').val(); //신용점수
			var lfnc_scrVain = _lfncform_var.parentObj.find('#lfnc_scrVain').val(); //평가기관
			var lfnc_ra_11 = $('input[name=lfnc_ra_11]:checked').val();     //변제방법

			var e_mail_1 = _lfncform_var.parentObj.find("#lfnc_lb_001").val().trim();
			var e_mail_2 = _lfncform_var.parentObj.find("#lfnc_lb_002").val().trim();
			e_mail_2 = isEmpty(e_mail_2) ? _lfncform_var.parentObj.find("#lfnc_lb_002_2").val().trim() : e_mail_2;
			
			var lfnc_email = e_mail_1 + "@" + e_mail_2;                       //이메일

			MobPopup.showConfirmPopup("대출 실행 후 관련 계약서류를 아래 고객님 이메일로 보내드리니 한 번 더 확인해 주세요.</br>e-mail : " + lfnc_email, "이메일 주소 확인", function() {
				
				var sendData = {
						'task_package' : 'fnt'               //업무패키지코드
						,'task_subpackage' : 'lon'           //업무서브패키지코드
						,'LFNC_APLC_DCD' : '02'              //신청구분코드
						,'LFNC_ACM_DCD' : lfnc_ra_01         //소비자구분코드(01 :일반금융소비자 02:전문금융소비자)
						,'AGE' : ''                          //연령
						,'LFNC_LNUG_DCD' : ''                //대출용도구분코드
						,'LFNC_HLAS_DCD' : ''                //보유자산구분코드
						,'LFNC_ENPR_PSNT_INCM_DCD' : ''      //기업현재소득구분코드
						,'LFNC_FTR_ANTC_ANIC_DCD' : ''       //미래예상연간소득구분코드
						,'LFNC_LBLT_DCD' : ''                //부채구분코드
						,'LFNC_OVDU_DCD' : ''                //연체구분코드
						,'LFNC_FXNG_EXPD_DCD' : ''           //고정지출구분코드
						,'LFNC_CRDT_SCR_CNFA_YN' : ''        //신용점수확인여부
						,'CDBU_SCR' : ''                     //CB점수
						,'LFNC_CRDT_SCR_VAIN_DCD' : ''       //신용점수평가기관구분코드
						,'LFNC_REPM_WAY_DCD' : ''            //변제방법구분코드(01 : 근로소득 02 : 사업소득 03 : 임대소득 04 : 금융소득 05 : 연금소득 06 : 기타소득)
						,'LFNC_JDGM_RPT_DCD' : ''            //판단보고서구분코드(01 : 보증부 02 : 그 외)
						,'CUS_EAD' : lfnc_email                  //고객이메일주소
					};
				
				if(sendData['LFNC_ACM_DCD'] == '01'){ //일반금융소비자
					sendData['AGE'] = lfnc_age;
					sendData['LFNC_LNUG_DCD'] = lfnc_ra_02;
					sendData['LFNC_HLAS_DCD'] = lfnc_ra_03;
					sendData['LFNC_ENPR_PSNT_INCM_DCD'] = lfnc_ra_04;
					sendData['LFNC_FTR_ANTC_ANIC_DCD'] = lfnc_ra_05;
					sendData['LFNC_LBLT_DCD'] = lfnc_ra_06;
					sendData['LFNC_FXNG_EXPD_DCD'] = lfnc_ra_07;
					sendData['LFNC_OVDU_DCD'] = lfnc_ra_08;
					sendData['LFNC_CRDT_SCR_CNFA_YN'] = lfnc_ra_09;
				}
				if(sendData['LFNC_CRDT_SCR_CNFA_YN'] == 'N'){ //여신금융상담신용점수확인여부 Y : 확인  N : 기타 ==> "Y일때는 빈값" "N 값 세팅해주면됨"
					sendData['CDBU_SCR'] = lfnc_cbScore;
					sendData['LFNC_CRDT_SCR_VAIN_DCD'] = lfnc_scrVain;
				}
				sendData['LFNC_REPM_WAY_DCD'] = lfnc_ra_11; // 여신금융상담변제방법구분코드 01 : 근로소득 02 : 사업소득 03 : 임대소득 04 : 금융소득 05 : 연금소득 06 : 기타소득
				sendData['LFNC_JDGM_RPT_DCD'] = "02"; //여신금융상담판단보고서구분코드(보증부 : "01"  그외는 "02")
				sendData['CUS_EAD'] = lfnc_email;
				
				//secretform에서 처리되는 데이터를 세팅
				sendData = _this.pluginSecretForm.makeSubmitDataFormSecretform(sendData);
	
				var ajax = jex.createAjaxUtil('fnt_lon_010001_2'); //서비스아이디
				
				ajax.errorTrx = false;
	
				for (var k in sendData) {
					ajax.set(k, sendData[k]);
				}
	
				ajax.execute(function(dat) {
					var result = dat["_tran_res_data"][0];
					
					// 결과값
					_lfncform_var.lfnc_mngm_no = result["LFNC_MNGM_NO"]; // 여신금융상담관리번호
					
					//판단결과 세팅
					if(result["LFNC_JDGM_RSLT_DCD"] == "01"){  // 적합
						_lfncform_var.parentObj.find("#span_lfnc_result").text("적합");
						_lfncform_var.parentObj.find("#span_lfnc_result").removeClass("fail");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").hide(); 
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").hide();	// 상품몰일 경우
					}
					else if(result["LFNC_JDGM_RSLT_DCD"] == "02"){ // 비적합
						_lfncform_var.parentObj.find("#span_lfnc_result").text("비적합");
						_lfncform_var.parentObj.find("#span_lfnc_result").addClass("fail");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").show();
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").hide();	// 상품몰일 경우
					}
					else if(result["LFNC_JDGM_RSLT_DCD"] == "03"){ // 전문금융인
						_lfncform_var.parentObj.find("#span_lfnc_result").text("대상외");
						_lfncform_var.parentObj.find("#span_lfnc_result").removeClass("fail");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").hide();
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").hide(); // 상품몰일 경우
					}
					
					//일반인 전문가 영역 세팅
					if(lfnc_ra_01 == "01"){ // 일반인
						_lfncform_var.parentObj.find("li[name=lfnc_expert_hide_area]").show();
					}
					else if(lfnc_ra_01 == "02"){ //전문가
						_lfncform_var.parentObj.find("li[name=lfnc_expert_hide_area]").hide();
					}
					
					//선택값 결과화면에 세팅
					for(var i=1; i<12; i++){
						var chk_el_id = _lfncform_var.parentObj.find("input[name=lfnc_ra_"+uf_lpad(i,2,0)+"]:checked").attr('id');
						var chkTxt = $('label[for='+chk_el_id+']').text();
						$('#span_lfnc_ra_'+uf_lpad(i,2,0)).text($.trim(chkTxt));
					}
					
					//연령
					_lfncform_var.parentObj.find("#span_lfnc_age").text(lfnc_age);
					
					//신용점수 세팅
					if($('#lfnc_ra_09_01').is(':checked')){
						$('#span_lfnc_cbScore').text(mobFormatter.number(lfnc_cbScore));
						$('#li_lfnc_cbscore').show();
						$('#span_lfnc_scrVain').text(_lfncform_var.parentObj.find("#lfnc_gigan").text());
						$('#li_lfnc_lfnc_scrVain').show();
					}
					else{
						//잘모름 선택시 결과화면 신용점수, 평가기관 숨김
						$('#li_lfnc_cbscore').hide();
						$('#li_lfnc_lfnc_scrVain').hide();
					}
					
					//이메일 세팅
					_lfncform_var.parentObj.find("#span_lfnc_email").text(lfnc_email);

					//결과화면 호출
					_lfncform_var.parentObj.find("#lfncform_chklist").hide();
					_lfncform_var.parentObj.find("#lfncform_result").show();
					jex.plugin.get("JEX_MOBILE_STEP").showStep(_lfncform_var.stepNo, 'slide@left');
				});
			}, null, "", "Y");
		},
		regLfncInfo2 : function(){ //여기서부터 시작
			var lfnc_ra_01 = $('input[name=lfnc_ra_01]:checked').val();     //전문금융 소비자여부
			var lfnc_age   = $("#lfnc_age").val();                          //연령
			var lfnc_ra_02 = $('input[name=lfnc_ra_02]:checked').val();     //대출용도
			var lfnc_ra_03 = $('input[name=lfnc_ra_03]:checked').val();     //보유자산
			var lfnc_ra_04 = $('input[name=lfnc_ra_04]:checked').val();     //현재소득
			var lfnc_ra_05 = $('input[name=lfnc_ra_05]:checked').val();     //미래예상소득
			var lfnc_ra_06 = $('input[name=lfnc_ra_06]:checked').val();     //부채
			var lfnc_ra_07 = $('input[name=lfnc_ra_07]:checked').val();     //고정지출
			var lfnc_ra_08 = $('input[name=lfnc_ra_08]:checked').val();     //연체정보
			var lfnc_ra_09 = $('input[name=lfnc_ra_09]:checked').val();     //신용점수
			var lfnc_cbScore = _lfncform_var.parentObj.find('#lfnc_cbScore').val(); //신용점수
			var lfnc_scrVain = _lfncform_var.parentObj.find('#lfnc_scrVain').val(); //평가기관
			var lfnc_ra_11 = $('input[name=lfnc_ra_11]:checked').val();     //변제방법

			var e_mail_1 = _lfncform_var.parentObj.find("#lfnc_lb_001").val().trim();
			var e_mail_2 = _lfncform_var.parentObj.find("#lfnc_lb_002").val().trim();
			e_mail_2 = isEmpty(e_mail_2) ? _lfncform_var.parentObj.find("#lfnc_lb_002_2").val().trim() : e_mail_2;
			
			var lfnc_email = e_mail_1 + "@" + e_mail_2;                       //이메일

			MobPopup.showConfirmPopup("대출 실행 후 관련 계약서류를 아래 고객님 이메일로 보내드리니 한 번 더 확인해 주세요.</br>e-mail : " + lfnc_email, "이메일 주소 확인", function() {
				
				var dateFormat = g_getDate("yyyy") + "년 " + g_getDate("mm") + "월 " + g_getDate("dd") + "일";
				
				var sendData = {
					'task_package' : 'fnc'             //업무패키지코드
					,'task_subpackage' : 'dpm'         //업무서브패키지코드
					,'rd1' : lfnc_ra_01         		//소비자구분코드(01 :일반금융소비자 02:전문금융소비자)
					,'rd2' : '06'                		//대출용도구분코드
					,'rd3' : ''                			//보유자산구분코드
					,'rd4' : ''      					//기업현재소득구분코드
					,'rd5' : ''      		 			//미래예상연간소득구분코드
					,'rd6' : ''                			//부채구분코드
					,'rd8' : ''                			//연체구분코드
					,'rd7' : ''           				//고정지출구분코드
					,'rd9' : ''        					//신용점수확인여부
					,'rd9_1_in' : ''                    //CB점수
					,'rd9_v' : ''       				//신용점수평가기관구분코드
					,'rd10' : ''            			//변제방법구분코드(01 : 근로소득 02 : 사업소득 03 : 임대소득 04 : 금융소득 05 : 연금소득 06 : 기타소득)
					,'cmht' : ''                        //연령	
					,'eml_url' : lfnc_email             //고객이메일주소
					,'dateFormat' : dateFormat            
				};
				
				if(sendData['rd1'] == '01'){ //일반금융소비자
					sendData['cmht'] = lfnc_age;
					sendData['rd3'] = lfnc_ra_03;
					sendData['rd4'] = lfnc_ra_04;
					sendData['rd5'] = lfnc_ra_05;
					sendData['rd6'] = lfnc_ra_06;
					sendData['rd7'] = lfnc_ra_07;
					sendData['rd8'] = lfnc_ra_08;
					sendData['rd9'] = lfnc_ra_09;
				}
				if(sendData['rd9'] == 'N'){ //여신금융상담신용점수확인여부 Y : 확인  N : 기타 ==> "Y일때는 빈값" "N 값 세팅해주면됨"
					sendData['rd9_1_in'] = lfnc_cbScore;
					sendData['rd9_v'] = lfnc_scrVain;
				}
				sendData['rd10'] = lfnc_ra_11; // 여신금융상담변제방법구분코드 01 : 근로소득 02 : 사업소득 03 : 임대소득 04 : 금융소득 05 : 연금소득 06 : 기타소득
				sendData['eml_url'] = lfnc_email;
				
				//secretform에서 처리되는 데이터를 세팅
				sendData = _this.pluginSecretForm.makeSubmitDataFormSecretform(sendData);
	
				var ajax = jex.createAjaxUtil('fnc_dpm_030101_5'); //서비스아이디
				
				ajax.errorTrx = false;
	
				for (var k in sendData) {
					ajax.set(k, sendData[k]);
				}
	
				ajax.execute(function(dat) {
					var result = dat["_tran_res_data"][0];
					
					if(result["lfnc_jdgm_rslt_dcd"] == "02"){
						//var dateFormat = g_getDate("yyyy") + "년 " + g_getDate("mm") + "월 " + g_getDate("dd") + "일";
						
						_lfncform_var.parentObj.find('#KRN_CSM').text( _this.cusInfo["KRN_CSM"]);
						_lfncform_var.parentObj.find('#today').text(dateFormat);
						
						MobPopup.showAlertPopup("본인은 적합성&#183;적정성 판단에 대한 설명을 듣고 이해하였으며, 적정성 검토 보고서 및 상품설명서를 수령하였음을 확인합니다.", "", function() {
							return false;
						});
					}
					
					// 결과값
					_lfncform_var.lfnc_mngm_no = result["LFNC_MNGM_NO"]; // 여신금융상담관리번호
					
					//판단결과 세팅
					if(result["lfnc_jdgm_rslt_dcd"] == "01"){  // 적합
						_lfncform_var.parentObj.find("#span_lfnc_result").text("적합");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").hide(); 
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").hide();	// 상품몰일 경우
					}
					else if(result["lfnc_jdgm_rslt_dcd"] == "02"){ // 비적합
						_lfncform_var.parentObj.find("#span_lfnc_result").text("부적합(대출신청 불가)");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").show();
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").show();	// 상품몰일 경우
					}
					else if(result["lfnc_jdgm_rslt_dcd"] == "03"){ // 전문금융인
						_lfncform_var.parentObj.find("#span_lfnc_result").text("대상외");
						_lfncform_var.parentObj.find("#lfnc_fail_notice").hide();
						_lfncform_var.parentObj.find("#lfnc_fail_notice2").hide();	// 상품몰일 경우
					}
					
					//일반인 전문가 영역 세팅
					if(lfnc_ra_01 == "01"){ // 일반인
						_lfncform_var.parentObj.find("li[name=lfnc_expert_hide_area]").show();
					}
					else if(lfnc_ra_01 == "02"){ //전문가
						_lfncform_var.parentObj.find("li[name=lfnc_expert_hide_area]").hide();
					}
					
					//선택값 결과화면에 세팅
					for(var i=1; i<12; i++){
						var chk_el_id = _lfncform_var.parentObj.find("input[name=lfnc_ra_"+uf_lpad(i,2,0)+"]:checked").attr('id');
						var chkTxt = $('label[for='+chk_el_id+']').text();
						$('#span_lfnc_ra_'+uf_lpad(i,2,0)).text($.trim(chkTxt));
					}
					
					//연령
					_lfncform_var.parentObj.find("#span_lfnc_age").text(lfnc_age);
					
					//신용점수 세팅
					if($('#lfnc_ra_09_01').is(':checked')){
						$('#span_lfnc_cbScore').text(mobFormatter.number(lfnc_cbScore));
						$('#li_lfnc_cbscore').show();
						$('#span_lfnc_scrVain').text(_lfncform_var.parentObj.find("#lfnc_gigan").text());
						$('#li_lfnc_lfnc_scrVain').show();
					}
					else{
						//잘모름 선택시 결과화면 신용점수, 평가기관 숨김
						$('#li_lfnc_cbscore').hide();
						$('#li_lfnc_lfnc_scrVain').hide();
					}
					
					//이메일 세팅
					_lfncform_var.parentObj.find("#span_lfnc_email").text(lfnc_email);

					//결과화면 호출
					_lfncform_var.parentObj.find("#lfncform_chklist").hide();
					_lfncform_var.parentObj.find("#lfncform_result").show();
					jex.plugin.get("JEX_MOBILE_STEP").showStep(_lfncform_var.stepNo, 'slide@left');
				});
			}, null, "", "Y");
		},
		isLfncformStep : function(){
			var curStepNo  = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();     //현재스텝
			
			if(_lfncform_var.stepNo == curStepNo) return true;
			else if(_lfncform_var.scrVainStep == curStepNo) return true;
			else if(_lfncform_var.emailAddrStep == curStepNo) return true;
			else if(_lfncform_var.noticeStep == curStepNo) return true;

			return false;
		},
		uf_back_lfncform : function(){
			var curStepNo  = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();     //현재스텝

			//적합성적정성 step
			if(_lfncform_var.stepNo == curStepNo){
				if(!isEmpty(_lfncform_var.prevStepNo)){
					_lfncform_var.initForm();
					uf_goStep(_lfncform_var.prevStepNo);
				}
				else{
					_webViewExit();
					//uf_goStep(curStepNo - 1);
				}
			}
			else if(_lfncform_var.scrVainStep == curStepNo || _lfncform_var.emailAddrStep == curStepNo || _lfncform_var.noticeStep == curStepNo){ //적합성적정성 평가기관, 이메일주소, 유의사항 step
				comUtil_back(_lfncform_var.stepNo);
			}
		}
	});
	
	jex.plugin.add("JEX_MOBILE_LFNCFORM", JexMobileLfncform, "data-jx-lfncform");
})();


//이메일 선택 시
function uf_setLfncformEmail($jq, data) {
	
	var code = $.trim(data["code"]);
	var code_nm = $.trim(data["code_nm"]);
	
	//직접입력 선택시
	if(code == ""){
		_lfncform_var.parentObj.find('#lfnc_lb_002').val('');
		_lfncform_var.parentObj.find('.selectMailDomain').show();
	}else{
		_lfncform_var.parentObj.find('#lfnc_lb_002').val(code);
		_lfncform_var.parentObj.find('.selectMailDomain').hide();
	}
	_lfncform_var.parentObj.find("#spn_lfnc_email").text(code_nm);	
	_lfncform_var.parentObj.find('#lfnc_lb_002_2').val('');

	comSelectPopUtil.setActiveClass($jq);
	return {};
}
