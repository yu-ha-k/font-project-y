var _display = new Array(4);
var _thisSForm_ExeBtn;	//W클릭 방지 2013.05.10 [secretForm이체성거래 Button able] ==> true : click 가능, false : click 불가
var _wClickCertSign;	//인증서팝업 확인버튼 W클릭 방지

var _hp_no_history;	// hp_no history
var sf_delay_gubn; //지연이체서비스 여부

var complete_loading_ssc_form = false;
var ssc_form_param = {}; // native에서 받아온 값

var afterFunc;//iframe 콜백함수

var nonApprCancel = {
	movePage : function(arg1){
		comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
			var basicInfo = this; //JSON data
			_this.trnform_cusInfo = basicInfo.cus_info;
		});
		
		var usr_no    = _this.trnform_cusInfo["USR_NO"         ]; //이용자번호(현재로그인한)
		var trn_scd   = $.trim(_this.snctData["TRN_SCD"       ]); //TRN_SCD  거래상태코드(1:결재대기(등록), 2:결재대기(진행), 3:실행대기(등록), 4:실행대기(진행))
		var bswr_dcd  = $.trim(_this.snctData["W_BSWR_DSNC_CD"]); //BSWR_DCD           업무구분코드
		var rymd      = $.trim(_this.snctData["W_RYMD"        ]); //RGSN_YMD           결재실행내역 등록년월일
		var rgsn_hms  = $.trim(_this.snctData["W_RGSN_HMS"    ]); //EBNK_EFNC_RGSN_HMS 결재실행내역 등록시분초
		var appr_user = $.trim(_this.snctData["EFNC_USER_ID"  ]); //EFNC_USER_ID       이용자번호(기안'등록한)
		
		if( usr_no != appr_user){ // 현재로그인한 이용자가 기안올린건이 아닐경우..
			MobPopup.showAlertPopup("미결재내역취소는 직접거래를 올리신 이용자만 가능합니다.");
			return;
		}
		
		//이미 취소된건일 경우
		if(trn_scd == "D"){
			MobPopup.showAlertPopup("이미 기안취소된 건입니다.");
			return;
		}
		else {
			if(bswr_dcd != 'A0' && bswr_dcd != 'A1' && bswr_dcd != 'A2' && bswr_dcd != 'A3' && bswr_dcd != 'AC' && bswr_dcd != 'AD' && bswr_dcd != 'AE' && bswr_dcd != 'AF'){
				MobPopup.showAlertPopup("미결재내역취소 거래는 즉시이체(당.타행), 여러계좌이체, 그룹이체, 급여,대량(즉시,예약)이체만 가능합니다.");
			}
			else {
				if(trn_scd != "1"){
					if(trn_scd == "2"){
						MobPopup.showAlertPopup("이미 다른 결재자가 결재를 하여 취소가 불가능합니다.");
						return;
					} else {
						MobPopup.showAlertPopup("미결재내역취소 거래는 거래상태가 '결재대기'인 경우만 취소가능합니다.");
						return;
					}
				} else {
					var url = "../trn/fnt_trn_060101_1.html?rymd="+rymd+"&rgsn_hms="+rgsn_hms;
					comWebkey_goMenu("5005", "fnt_trn_060101_1", url.split("?")[1]); // 이체 > 미결재내역조회/취소
				}
			}
		}
	}

	//미결재내역취소'버튼show(가능한업무)
	, checkShowBtn : function(){
		var bswr_dcd  = $.trim(_this.snctData["W_BSWR_DSNC_CD"]); //BSWR_DCD 업무구분코드
		var bool      = false;
		switch(bswr_dcd) {
			case "A0": //당행이체
			case "A1": //타행이체
			case "A7": //예약이체 등록
			case "A2": //여러계좌이체 (부분/전체)
			case "AC": //대량즉시
			case "AE": //급여즉시
			case "AF": //급여예약
				bool = true;
				break;
			default:
				bool = false; //서비스 준비중입니다. 인터넷뱅킹에서 확인하시기 바랍니다.
				break;
		}
		if(bool) $("#secretform_btn_reg_end_SCNT_CANCEL").show(); //미결재내역취소
		else     $("#secretform_btn_reg_end_SCNT_CANCEL").hide();
	}
};

//authform 플러그인에서 사용하는 변수정의
var _secretform_var = {
	  isDelayTrn          : false //지연이체여부 (true 인경우 불능시 연락처 문구 내용을 바꿔 준다.)
	, isUseDrotAcntPwd    : false //출금계좌 비밀번호를 사용하는 경우
	, isUseTrnPwd         : false //이체 비밀번호를 사용하는 경우(이용자비밀번호)
	, isUseImptmCtctTpn   : false //불능시연락처리를 사용하는경우 (입력여부가 비필수 임)
	, isUseSecuMedia      : true  //보안매체를 사용하는경우 (특정거래는 보안매체 검증을 하지 않을 수 있음)
	, isUseSignedMsg      : true  //전자서명을 사용하는경우 (특정거래는 전자서명을 하지 않을 수 있음)
	, isCheckImptmCtctTpn : false //불능시 연락처를 필수 값으로 체크
	//결재함 정보
	, isSnct              : false
	, isExcuteSNBC        : false //반송 버튼을 클릭했는지 여부(전자서명을 하면 안되기 때문에 클릭했을 때 식별자가 있어야함)
	, snctData            : {}    //결재함 Key
		//W_RYMD              //등록년월일   yyyyMMdd
		//W_RGSN_HMS          //등록시분초   HH:mm:ss
		//W_BSWR_DSNC_CD      //업무구분코드
		//W_GRP_TCNT          //총건수
		//W_TRNS_TOT_AMT      //총금액
		//EBNK_SNCT_EXCN_SRN  //결재일련번호
	, isUseFds            : false //FDS 탐지결과조회 사용여부
	, isLoadInqyFds       : false //로드 후 FDS탐지조회 여부
	, fdsAcn              : ""    //FDS 검증계좌번호
	, fdsAcnList          : []    //FDS 검증계좌번호목록
	, fdsMnrcUserNm       : ""    //FDS멘트 입금계좌예금명
	, fdsBankNm           : ""    //FDS ARS멘트 은행명
	, fdsTranAmt          : ""    //FDS ARS멘트 거래총금액
	, fdsTranCnt          : ""    //FDS ARS멘트 거래총건수
	, fdsTrSvc            : ""    //FDS ARS 목적 서비스
	, fdsBswrDscd         : ""    //FDS ARS 목적 서비스에 대한 업무구분(멘트 내용)
	//시크릿폼에서 저장하고 있어야 할 변수
	, callBackFunc        : ""  //
	, confirmButtonName   : ""  //실행버튼의 title을 변경하고 싶을 경우 title 값이 있으면 해당 title로 변경함
	, cancelButtonName    : ""  //취소버튼의 title을 변경하고 싶을 경우 title 값이 있으면 해당 title로 변경함
	, thisSForm           : ""  //secretform 객체
	, parentThis          : ""  //업무의 _this 객체
	, parentObj           : ""  //secretform 플러그인이 그려져 있는 <div>의 상위 Id  한 html 파일에서 여러 step에서 사용할 경우필요
	, preFunction         : ""  //secretform 실행버튼 클릭시 먼저 실행해야 할 function
	, isPreFunctionExec   : false //전처리 함수 정상 수행되었는지 상태 관리 
	, isHideCancelButton  : false //취소버튼을 숨길지 여부
	, isExecuted          : false //중복클릭 방지 플래그  (false : 실행가능한 상태,  true : 이미실행한 상태(클릭하면 안됨))
	, isCertSignExecuted  : false //중복클릭 방지 플래그  (false : 실행가능한 상태,  true : 이미실행한 상태(클릭하면 안됨))
	, snbcSvcId           : ""    //반송실행 서비스ID
	
	//금융인증서
	, SMBK_LGN_DCD        : ""  // 스마트뱅킹로그인구분코드(01:인증서로그인, 08:금융인증서, 09: IBK인증서(전자서명용) 10: IBK인증서(본인확인용))
	, appId               : ""  //앱ID
	, deviceId            : ""  //디바이스ID
	, appVer              : ""  //앱버전
	, deviceOS            : ""  //디바이스OS
	, orgCode             : ""  //finance_code
	, apiKey              : ""  //finance_key
	//조회용이용자
	, ENBK_MNGR_YN        : ""  //기업뱅킹관리자여부(Y:관리자, N:이용자, S:조회용이용자)
	, CORP_CERT_LOGIN_YN  : ""  //사업자용인증서로그인여부[Y:사업자용 공동/금융인증서 로그인, N:개인용 공동/금융인증서 로그인]
	, autho_sc			  : "O"	// 보안매체 구분(O:OTP카드, L:디지털OTP(개인), B:디지털OTP(중소개인))
	, skipCardStatusSerialNoHashAppUniq: false	// SscRequestCardStatus, SscGetSerialNo 스킵여부, 기본값은 스킵아님
	, usr_no: ""	// 이용자번호
	, basicBtnDisplay	  : "Y" //하단 고정 버튼 노출 여부, secretform_area_btn_basic
	, isUseCardPwd    	  : false	//카드비밀번호를 사용하는 경우
	, isLoad			  : false	//시크릿폼 getSecretForm() 실행해서 초기화 되었는지 여부 관리용, authform 단독실행시 분기 처리 하기 위해
	, isBottomLayerPop    : false  //이체 업무등 시크릿폼이 바텀시트 레이어팝업으로 뜨는 경우 하단 버튼 클래스(mt_40) 삭제를 위해서..
	, fdsCheck            : false  //fds 실행 완료 여부
	
	
};

(function() {
	/**
	 * Date: 13. 5. 25
	 *
	 * @namespace JexMobileSecretForm
	 */
	var sForm_attrs = {
		"id"               : "data-jx-secretform"            //호출할 svc 명
		,"parentId"        : "data-jx-secretform-parent-id"  //secretform 영역을 담고 있는 상위 ID (보통 stepid)

		,"sf_pre_function" : "data-jx-secretform-pre-execute-function"  //secretform에 있는 실행을 하기전에 호출하고 싶은 function
		,"sf_btn_text"     : "data-jx-secretform-btn-text"              //실행 버튼의 title을 변경하고 싶을 경우
		,"sf_btn_cancel"   : "data-jx-secretform-btn-cancel-title"      //취소 버튼의 title을 변경하고 싶을 경우
		,"sf_no_cancel"    : "data-jx-secretform-no-cancel"             //취소버튼을 안보이게 하고 싶을경우
		,"sf_basic_btn_display"     : "data-jx-secretform-basic-btn-display"              //하단 고정 버튼(secretform_area_btn_basic) 노출 여부
	};

	var JexMobileSecretForm = JexPlugin.extend({

		init: function () {
			
		}
		/**
		 * @method load
		 * data-jx-secretform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		, load: function (attr, $jq) {
			this.$object = $jq;
		}
		, execute	: function(evt,$jq) {
			
		}
		, initDraw : function() {
			
		}
		, initVar : function() {
			_secretform_var = {
				  isDelayTrn          : false //지연이체여부 (true 인경우 불능시 연락처 문구 내용을 바꿔 준다.)
				, isUseDrotAcntPwd    : false //출금계좌 비밀번호를 사용하는 경우
				, isUseTrnPwd         : false //이체 비밀번호를 사용하는 경우
				, isUseImptmCtctTpn   : false //불능시연락처리를 사용하는경우 (입력여부가 비필수 임)
				, isUseSecuMedia      : true  //보안매체를 사용하는경우 (특정거래는 보안매체 검증을 하지 않을 수 있음)
				, isUseSignedMsg      : true  //전자서명을 사용하는경우 (특정거래는 전자서명을 하지 않을 수 있음)
				, isCheckImptmCtctTpn : false //불능시 연락처를 필수 값으로 체크
				//결재함 정보 추가 필요
				, isUseFds            : false //FDS 탐지결과조회 사용여부
				, isLoadInqyFds       : false //로드 후 FDS탐지조회 여부
				, fdsAcn              : ""    //FDS 검증계좌번호
				, fdsAcnList          : []    //FDS 검증계좌번호목록
				, fdsMnrcUserNm       : ""    //FDS멘트 입금계좌예금명
				, fdsBankNm           : ""    //FDS ARS멘트 은행명
				, fdsTranAmt          : ""    //FDS ARS멘트 거래총금액
				, fdsTranCnt          : ""    //FDS ARS멘트 거래총건수
				, fdsTrSvc            : ""    //FDS ARS 목적 서비스
				, fdsBswrDscd         : ""    //FDS ARS 목적 서비스에 대한 업무구분(멘트 내용)
				//시크릿폼에서 저장하고 있어야 할 변수
				, callBackFunc        : ""  //
				, confirmButtonName   : ""  //실행버튼의 title을 변경하고 싶을 경우 title 값이 있으면 해당 title로 변경함
				, cancelButtonName    : ""  //취소버튼의 title을 변경하고 싶을 경우 title 값이 있으면 해당 title로 변경함
				, thisSForm           : ""  //secretform 객체
				, parentThis          : ""  //업무의 _this 객체
				, parentObj           : ""  //secretform 플러그인이 그려져 있는 <div>의 상위 Id  한 html 파일에서 여러 step에서 사용할 경우필요
				, preFunction         : ""  //secretform 실행버튼 클릭시 먼저 실행해야 할 function
				, isPreFunctionExec   : false //전처리 함수 정상 수행되었는지 상태 관리
				, isHideCancelButton  : false //취소버튼을 숨길지 여부
				, isExecuted          : false //중복클릭 방지 플래그  (false : 실행가능한 상태,  true : 이미실행한 상태(클릭하면 안됨))
				, isCertSignExecuted  : false //중복클릭 방지 플래그  (false : 실행가능한 상태,  true : 이미실행한 상태(클릭하면 안됨))
				, snbcSvcId           : ""    //반송실행 서비스ID
					
				//금융인증서
				, SMBK_LGN_DCD        : ""  // 스마트뱅킹로그인구분코드(01:인증서로그인, 08:금융인증서, 09: IBK인증서(전자서명용) 10: IBK인증서(본인확인용))
				, appId               : ""  //앱ID
				, deviceId            : ""  //디바이스ID
				, appVer              : ""  //앱버전
				, deviceOS            : _isIphone() ? "IOS" : "ANDROID"  //디바이스OS
				, orgCode             : ""  //finance_code
				, apiKey              : ""  //finance_key
				//조회용이용자
				, ENBK_MNGR_YN        : ""  //기업뱅킹관리자여부(Y:관리자, N:이용자, S:조회용이용자)
				, autho_sc			  : "O"	// 보안매체 구분(O:OTP카드, L:디지털OTP(개인), B:디지털OTP(중소개인))
				, usr_no: ""	// 이용자번호
				, basicBtnDisplay	  : "Y" //하단 고정 버튼 노출 여부, secretform_area_btn_basic
				, isUseCardPwd        : false
				, isBottomLayerPop    : false  //이체 업무등 시크릿폼이 바텀시트 레이어팝업으로 뜨는 경우 하단 버튼 클래스(mt_40) 삭제를 위해서..
				, fdsCheck            : false  //fds 실행 완료 여부
			};
		}
		, getSecretForm : function(func) {
			_secretform_var.thisSForm  = this ;//this of jex.mobile.secretform.js
			_secretform_var.parentThis = _this;//업무단 js 파일에서 정의되어 있는 _this
			_secretform_var.isExecuted = false ;//중복클릭 방지   thisSForm_ExeBtn
			
			if(typeof func == "function") {
				_secretform_var.callBackFunc = func;
			}
			$.get('../../com/secretform.html').done(function(dat)	{
				$secretform_html = $(dat);
				_secretform_var.thisSForm.$object.html($secretform_html.find("#secretform_area").html());

				jex.setJexObj(_secretform_var.thisSForm.$object);

				//기안일 경우 결재라인 step을 그린다.
				if(_secretform_var.W_SNCT_DSNC == "1") {  //결재실행구분 (0:기본값, 1:기안, 2:전결실행, 3:승인)
					_secretform_var.thisSForm.drawSnctLine($secretform_html);
					//step30 결재요청 등록  (기안자가 등록후 등록 완료 화면)
					$("#step").append($secretform_html.find("#step30"));
					// 추가할 수 있는 펀드 목록을 보여준다.
					jex.setJexObj($("#step30"));
				} else if(_secretform_var.isSnct) { //결재대상 (결재, 실행) 일경우 반송사유 입력(step98)을 그린다
					//반송사유 입력(step98)을 그림
					_secretform_var.thisSForm.drawSnbcRsn($secretform_html);

					//반송사유 입력(step98)을 그림
					_secretform_var.thisSForm.drawSnbcRsn($secretform_html);

					//step39 결재함 승인/결재 처리완료 화면을 그린다
					$("#step").append($secretform_html.find("#step39"));
					// 추가할 수 있는 펀드 목록을 보여준다.
					jex.setJexObj($("#step39"));

					//실행결과화면을 그린다
					$("#step").append($secretform_html.find("#step33"));
					// 추가할 수 있는 펀드 목록을 보여준다.
					jex.setJexObj($("#step33"));
				}

				try {
					var _parentId = _secretform_var.thisSForm.$object.attr(sForm_attrs.parentId);	//상위 Step 이나 영역 Id
					_parentId =  _parentId == undefined ? "#step" : "#" + _parentId;	//상위 Object id
					_secretform_var.parentObj = $(_parentId);

					_secretform_var.preFunction        = _secretform_var.thisSForm.$object.attr(sForm_attrs.sf_pre_function); // 씨크리트폼 실행버튼시 전처리(콜백함수 Name)
					_secretform_var.confirmButtonName  = _secretform_var.thisSForm.$object.attr(sForm_attrs.sf_btn_text    ); //[각업무별 실행Button이름다를경우]
					_secretform_var.cancelButtonName   = _secretform_var.thisSForm.$object.attr(sForm_attrs.sf_btn_cancel  ); //[각업무별 취소Button이름다를경우] 추가
					_secretform_var.isHideCancelButton = _secretform_var.thisSForm.$object.attr(sForm_attrs.sf_no_cancel   ); //버튼hide

					if(_secretform_var.thisSForm.$object.is('['+sForm_attrs.sf_no_cancel+']')){
						$("#secretform_btn_CANCEL").hide();
					}

					//secretform 실행버튼시 전처리(콜백함수	존재여부) :: 각업무에서정의한다.
					_secretform_var.preFunction = (_secretform_var.preFunction == undefined || _secretform_var.preFunction == "") ? "" : _secretform_var.preFunction;
					//secretform 실행버튼의 title을 변경할경우 사용한다.
					_secretform_var.confirmButtonName = (_secretform_var.confirmButtonName == undefined || _secretform_var.confirmButtonName == "") ? "" : _secretform_var.confirmButtonName;
					//secretform 취소버튼의 title을 변경할경우 사용한다.
					_secretform_var.cancelButtonName = (_secretform_var.cancelButtonName == undefined || _secretform_var.cancelButtonName == "") ? "" : _secretform_var.cancelButtonName;

					if(_secretform_var.W_SNCT_DSNC == "1") {  //결재실행구분 (0:기본값, 1:기안, 2:전결실행, 3:승인)
						_secretform_var.parentObj.find("#secretform_btn_SUBMIT").text("결재요청");
					} else {
						if(_secretform_var.confirmButtonName != "") {
							_secretform_var.parentObj.find("#secretform_btn_SUBMIT").text(_secretform_var.confirmButtonName); //실행
						}
						
						if(_secretform_var.cancelButtonName != "") {
							_secretform_var.parentObj.find("#secretform_btn_CANCEL").text(_secretform_var.cancelButtonName); //취소
						}
					}
					//결재인경우  결재 / 실행 버튼명 바꿔줌
					if(_secretform_var.isSnct) {
						if(_secretform_var.snctData["SNCT_ATHR_DCD"] == "01") {
							_secretform_var.parentObj.find("#secretform_btn_SCNT").text("결재");
						} else {
							_secretform_var.parentObj.find("#secretform_btn_SCNT").text("실행");
						}
					}
					//secretform 취소버튼을 숨길지 여부를 세팅한타
					_secretform_var.isHideCancelButton = (_secretform_var.isHideCancelButton == undefined || _secretform_var.isHideCancelButton == "") ? false:true;
					if(_secretform_var.isHideCancelButton) {
						_secretform_var.parentObj.find("#secretform_btn_CANCEL").hide();
					}

					//계좌비밀번호 보안키패드 적용
					_secretform_var.parentObj.find("#secretform_DROT_ACNT_PWD").off('click').on("click", function(e) {
						$(this).parent().addClass("on");
						var parentId = _secretform_var.parentObj.attr("id");
						_callXecureKeypad(parentId + ' #secretform_DROT_ACNT_PWD', '1', '4', '4', '계좌비밀번호 4자리', null, 'Y');
					});
					//OTP카드 보안키패드 적용(디지털OTP카드 [기업디지털 채널 혁신 사업] 2022-05-19 추가)
					_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").off('click').on("click", function(e) {
						$(this).parent().addClass("on");
						var parentId = _secretform_var.parentObj.attr("id");
						
						if("B" == _secretform_var.autho_sc){
							_callXecureKeypad(parentId + ' #secretform_W_OTP_OCRN_NO', '1', '6', '6', '디지털OTP PIN번호 6자리', null, _secretform_var.isLogin, null, null, false, 'ssc'); //디지털OTP카드 보안키패드 적용
						}
						else{
							_callXecureKeypad(parentId + ' #secretform_W_OTP_OCRN_NO', '1', '6', '6', 'OTP발생번호 6자리', null, _secretform_var.isLogin);
						}
					});
					
					//이용자비밀번호 보안키패드 적용
					_secretform_var.parentObj.find("#secretform_W_TRAN_PWD").off("click").on("click", function(e) {
						$(this).parent().addClass("on");
						var parentId = _secretform_var.parentObj.attr("id");
						_callXecureKeypad(parentId + " #secretform_W_TRAN_PWD", "0", "8", "8", "이용자비밀번호 8자리", null, _secretform_var.isLogin);
					});


					//[불능시연락처] 변경 BUTTON
					_secretform_var.parentObj.find("#secretform_btn_IMPTM_CTCT_TPN").off('click').on("click", function(e) {
						tts_text("변경");

						var hp_no01 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_1").val());
						var hp_no02 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_2").val());
						var hp_no03 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_3").val());
						var hp_no = hp_no01 + hp_no02 + hp_no03;
						if(hp_no == ""){
							MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 번호를 확인하신 후 다시 입력해주시기 바랍니다.");
							return;
						}
						else if(hp_no.length < 10){
							MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 번호를 확인하신 후 다시 입력해주시기 바랍니다.");
							return;
						}
						if(_hp_no_history == hp_no){
							MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 변경전 전화번호와 동일합니다. <br />전화번호를 확인해주세요.");
							return;
						}
						if(!(hp_no01 == "010" || hp_no01 == "011" || hp_no01 == "016"
							|| hp_no01 == "017" || hp_no01 == "018" || hp_no01 == "019"))
						{
							MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 번호를 확인하신 후 다시 입력해주시기 바랍니다.");
							return;
						}

						MobPopup.showConfirmPopup("[거래 오류시 통지 연락처] 변경하시겠습니까?","안내",function(){
							_secretform_var.thisSForm.com_utl_010101_0();
						});
					});

					//[실행] BUTTON (씨크리트카드 및 OTP카드)
					_secretform_var.parentObj.find("#secretform_btn_SUBMIT").off('click').on("click", function(e) {
						if(!_secretform_var.isExecuted){
							_secretform_var.isExecuted = true;	//중복클릭 방지
							_secretform_var.thisSForm.secret_execute();
						}
					});

					//[취소] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_CANCEL").off('click').on("click", function(e) {
						_secretform_var.parentThis.call_uf_cancel();
					});

					//[반송] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_SNBC").off('click').on("click", function(e) {
						if(!_secretform_var.isExecuted){
							_secretform_var.isExecuted = true;	//중복클릭 방지
							_secretform_var.isExcuteSNBC = true; //반송실행 여부
							_secretform_var.thisSForm.secret_execute();
						}
					});

					//[결재 / 실행] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_SCNT").off('click').on("click", function(e) {
						if(!_secretform_var.isExecuted){
							_secretform_var.isExecuted = true;	//중복클릭 방지
							_secretform_var.thisSForm.secret_execute();
						}
					});

					//[결재선조회] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_SCNT_LINE_LIST").off('click').on("click", function(e) {
						jex.setJexObj($("#secretform_com_snt_010101_1").attr("data-jx-svc-onload", "true"));
					});

					//[목록] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_SCNT_LIST").off('click').on("click", function(e) {
						//결재대기 목록으로 이동
						comUtil_goMenuSnctList("", "close");
					});
					//[목록] BUTTON  결재일경우 버튼(등록, 완료)
					_secretform_var.parentObj.find("#secretform_btn_SNBC_REG_END").off('click').on("click", function(e) {
						if(_isRealApp) {
							_webViewExit();
						} else {
							//결재/실행 등록 조회 목록으로 이동
							if(_secretform_var.snctFromPage == "SNCT_REG") { //결재/실행 등록 조회
								comUtil_goMenuSnctList("SNCT_REG", "close");
							} else { //결재/실행 완료 조회
								comUtil_goMenuSnctList("SNCT_END", "close");
							}
						}
					});

					//[결재선조회] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_reg_end_SCNT_LINE_LIST").off('click').on("click", function(e) {
						//결재선조회
						jex.setJexObj($("#secretform_com_snt_010101_1").attr("data-jx-svc-onload", "true"));
					});

					//[미결재내역취소] BUTTON
					_secretform_var.parentObj.find("#secretform_btn_reg_end_SCNT_CANCEL").off('click').on("click", function(e) {
						//이체 > 미결재 내역 조회/취소 화면으로 이동 처리
						nonApprCancel.movePage();
					});

					if(_secretform_var.snctFromPage == "SNCT_REG" || _secretform_var.snctFromPage == "SNCT_END") {
						_secretform_var.parentObj.find("#secretform_area_data_btn_scnt_reg_end").show();
						_secretform_var.parentObj.find("#secretform_area_btn_scnt_reg_end"     ).show();
					} else {
						_secretform_var.parentObj.find("#secretform_area_data_btn_scnt_reg_end").hide();
						_secretform_var.parentObj.find("#secretform_area_btn_scnt_reg_end"     ).hide();
					}


					//보안매체 정보 조회 전문 실행
					_secretform_var.thisSForm.com_sec_010101_2();

					//화면 로드 후 FDS탐지결과 조회 수행
					if(_secretform_var.isLoadInqyFds) {
						jex.setJexObj($("#secretform_com_utl_999999_2").attr("data-jx-svc-onload", "true")); //FDS 탐지결과조회
					}
					else if(_secretform_var.isUseFds == true && _secretform_var.isLoadInqyFds == false) {
						authform_initDraw(); //추가인증화면 초기화
					}
				} catch(e) {bizException(e, "JEX_MOBILE getSecretForm");}

			});
		}
		, drawSnctLine : function($secretform_html) {
			//_secretform_var 에 있는 변수를 사용해서 결재선 화면을 그린다.
				//list_snct
			//step99 결재선 step이 그려져 있지 않으면 그린다.
			if($("#step99").val() == undefined) {
				$("#step").append($secretform_html.find("#step99"));
				// 추가할 수 있는 펀드 목록을 보여준다.
				jex.setJexObj($("#step99"));
			}
			if(!isEmptyArray(_secretform_var.list_snct)) {
				var list_snct = jex.getJexObj($("#secretform_list_snct"), "JEX_MOBILE_LIST");
				list_snct.setAll(_secretform_var.list_snct);

				//list_snct    결재선목록   GatewayUtil.setSactionListAddInfo 에서 세팅됨
					//SNCT_ATHR_DCD                결재권한구분코드
					//SNPN_ID                      결재자ID
					//EBNK_ENPR_DVRS_BNKN_USER_NM  E뱅킹기업전용뱅킹사용자명
					//DVM                          부서명
					//EBNK_ENBK_USER_JBTT_NM       E뱅킹기업뱅킹사용자직위명
					//EBNK_CLPH_NO                 E뱅킹휴대폰번호
					//MOBLIE_DIST                  모바일권한
					//EFNC_MNGM_USER_ID            E금융관리사용자ID
				//추가세팅되는 필드 (AP에 사용할 필드)
					//LAST_SNPN_DCD                한도차감여부   Y 한도차감등록자, N 한도차감처리하지 않음
				//추가세팅되는 필드 (화면에 사용할 필드)
					//SNCT_ATHR_DCD_NM             결재권한구분코드명
					//EBNK_MBL_DSNC_NO             E뱅킹모바일구분번호  (A : ARS, M : 모바일)
					//EBNK_MBL_CMCM_KIND_DSNC_NO   E뱅킹모바일통신사종류구분번호 (안씀)
					//SNCT_MBL_ATHR_YN             결재모바일권한여부 (userSession에 있는 권한(MBL_ATHR_YN) && 결재자 개별권한(MOBLIE_DIST))
					//MBL_SNCT_DCD                 모바일결재구분코드 (아무것도 선택하지 않은 상태로 초기화 함)
					//SNCT_SMS_USE_YN              SMS체크박스활성화 여부
					//SNCT_ARS_USE_YN              ARS체크박스활성화 여부
					//SNCT_MOBILE_USE_YN           MOBILE체크박스활성화 여부
					//SNCT_SHOW_YN                 해당레코드를 보여줄지 여부(마지막 레코드가 N이냐로 변경하기 위한 필드)
				$("#secretform_list_snct > li").each(function (idx) {
					var row_data = $(this).data("_JEX_GETALL_DATA_");
					var $snctLiObj = $(this);
					//순번 세팅
					$snctLiObj.find("#SNCT_ODR").text(idx + 1);
					//결재/실행 아이콘 세팅
					if(row_data["SNCT_ATHR_DCD"] == "02" || row_data["SNCT_ATHR_DCD_NM"] == "실행") { //결재권한구분코드  01 결재  02  실행
						//아이콘 모양과 text를 변경해 준다.
						//$snctLiObj.find(".badge_approval").addClass("sky");
						$("#SNCT_ATHR_DCD_NM").removeClass("colorB5");
						$("#SNCT_ATHR_DCD_NM").addClass("colorA1");
					}
					//체크박스의 id, name 세팅
					$inputs = $snctLiObj.find("input");
					$lables = $snctLiObj.find("label");
					//음성세팅
					$inputs.eq(0).attr("id"  , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_ARS");
					$inputs.eq(0).attr("name", "secreteform_chk_SNCT_NTC_WAY_" + idx + "_ARS");
					$lables.eq(0).attr("for" , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_ARS");
					//EBNK_MBL_DSNC_NO mbl_knd == "A" && mbck == "Y" >> 음성
					//모바일세팅
					$inputs.eq(1).attr("id"  , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_MOBILE");
					$inputs.eq(1).attr("name", "secreteform_chk_SNCT_NTC_WAY_" + idx + "_MOBILE");
					$lables.eq(1).attr("for" , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_MOBILE");
					//문자세팅
					$inputs.eq(2).attr("id"  , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_SMS");
					$inputs.eq(2).attr("name", "secreteform_chk_SNCT_NTC_WAY_" + idx + "_SMS");
					$lables.eq(2).attr("for" , "secreteform_chk_SNCT_NTC_WAY_" + idx + "_SMS");
					
					
					//TODO 대직자 부분 추가 20220819 KMG
					if(row_data["EBK_PRX_USER_ID"] == ""){	//대직자가 없을 경우 가려줌
						
						$(this).find('#EBNK_ENPR_DVRS_BNKN_USER_NM').text(row_data['EBNK_ENPR_DVRS_BNKN_USER_NM'] + '(' + row_data['SNPN_ID'] + ')');
						
						$(this).find('#P_PRX_YN').hide();
						
						if(row_data["SNCT_ARS_USE_YN"] == "Y") {  //음성체크박스에 활성 비활성 세팅
							$inputs.eq(0).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(0).attr("disabled", "disabled");
						}
						
						if(row_data["SNCT_MOBILE_USE_YN"] == "Y") { //모바일체크박스에 활성 비활성 세팅
							$inputs.eq(1).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(1).attr("disabled", "disabled");
						}
						
						if(row_data["SNCT_SMS_USE_YN"] == "Y") { //SMS체크박스에 활성 비활성 세팅
							$inputs.eq(2).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(2).attr("disabled", "disabled");
						}
						
					} else {
						//대직자가 있을 경우 해당 부분 보여주고 원결재자 표시 > 대직자를 결재자로
						//결재자 정보에 대직자 정보넣음
						$(this).find('#EBNK_ENPR_DVRS_BNKN_USER_NM').text(row_data['EBK_PRX_USER_NM'] + '(' + row_data['EBK_PRX_USER_ID'] + ')');
						//$(this).find('#SNPN_ID').text(row_data['EBK_PRX_USER_ID']);
						$(this).find('#DVM').text(row_data['EBK_PRX_DVM']);
						
						$(this).find('#P_PRX_YN').show();
						
						//원결재자 정보 세팅
						var prxUserSet = "";
						prsUserSet = row_data["EBNK_ENPR_DVRS_BNKN_USER_NM"] + "(" + row_data["SNPN_ID"] + ")";
						$(this).find('#EBK_PRX_USER_NM_SET').text(prsUserSet);
						
						if(row_data["EBK_PRX_SNCT_ARS_USE_YN"] && row_data["EBK_PRX_SNCT_ARS_USE_YN"] == "Y") {  //음성체크박스에 활성 비활성 세팅
							$inputs.eq(0).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(0).attr("disabled", "disabled");
						}
						
						if(row_data["EBK_PRX_SNCT_MOBILE_USE_YN"] && row_data["EBK_PRX_SNCT_MOBILE_USE_YN"] == "Y") { //모바일체크박스에 활성 비활성 세팅
							$inputs.eq(1).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(1).attr("disabled", "disabled");
						}
						
						if(row_data["EBK_PRX_SNCT_SMS_USE_YN"] && row_data["EBK_PRX_SNCT_SMS_USE_YN"] == "Y") { //SMS체크박스에 활성 비활성 세팅
							$inputs.eq(2).removeAttr("disabled", "disabled");
						} else {
							$inputs.eq(2).attr("disabled", "disabled");
						}
					}
					//MBL_SNCT_DCD   모바일결재구분코드  화면의 체크박스에 의해서 만들어짐
					//                        ARS   모바일   SMS
					//ARS 권한이 있는상태    			O      -       X         A     ARS를 체크한경우
					//                         X      -       O         S     SMS를 체크한경우
					//                         X      -       X         P     아무것도 체크하지 않은경우
					//MOBILE 권한이 있는상태   -      O       X         M     MOBILE를 체크한경우
					//                         -      X       O         S     SMS를 체크한경우
					//                         -      X       X         P     아무것도 체크하지 않은경우
					//모바일서비스(ARS, MOBILE)권한이 없는 상태
					//                         -      -       O         O     SMS를 체크한경우
					//                         -      -       X         N     아무것도 체크하지 않은경우

					//                     모바일서비스
					//MBL_SNCT_DCD         (ARS, MOBILE)권한
					//모바일결재구분코드   보유여부
					//     A                Y                 ARS
					//     M                Y                 MOBILE
					//     S                Y                 SMS
					//     P                Y                 X  (아무것도 선택하지 않음)
					//-------------------------------------------------------------------
					//     O                N                 SMS
					//     N                N                 X  (아무것도 선택하지 않음)

					//체크박스에 대한 초기값 세팅  모바일권한이 있는데 아무것도 선택하지 않은 상태
					//체크박스의 이벤트 세팅
					//음성세팅
					$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + idx + "_ARS").on("click", function(){
						var inner_idx = idx;
						if($(this).is(":checked")){
							_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "Y"; //모바일결재권한이 있고 ARS를 체크한경우
							$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + inner_idx + "_SMS").prop("checked", false);
						} else {
							_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "P"; //모바일결재권한이 있고 ARS를 체크를 해제한경우
						}
					});
					//모바일세팅
					$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + idx + "_MOBILE").on("click", function(){
						var inner_idx = idx;
						if($(this).is(":checked")){
							_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "M"; //모바일결재권한이 있고 모바일을 체크한경우
							$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + inner_idx + "_SMS").prop("checked", false);
						} else {
							_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "P"; //모바일결재권한이 있고 모바일을 체크를 해제한경우
						}
					});
					//문자세팅
					$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + idx + "_SMS").on("click", function(){
						var inner_idx = idx;
						if($(this).is(":checked")){ //SMS 체크
							//모바일권한이 있는 상태  (userSession에 있는 권한(MBL_ATHR_YN) && 결재자 개별권한(MOBLIE_DIST))
							if(_secretform_var.list_snct[idx]["SNCT_MBL_ATHR_YN"] == "Y") {
								_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "S"; //모바일결재권한이 있고 SMS를 체크한경우
							} else { //모바일권한이 없는상태
								_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "O"; //모바일결재권한이 없고 SMS를 체크한경우
							}
							$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + inner_idx + "_ARS"   ).prop("checked", false);
							$snctLiObj.find("#secreteform_chk_SNCT_NTC_WAY_" + inner_idx + "_MOBILE").prop("checked", false);
						} else { //SMS 체크 해제
							//모바일권한이 있는 상태  (userSession에 있는 권한(MBL_ATHR_YN) && 결재자 개별권한(MOBLIE_DIST))
							if(_secretform_var.list_snct[idx]["SNCT_MBL_ATHR_YN"] == "Y") {
								_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "P"; //모바일결재권한이 있고 아무것도 선택하지 않은경우
							} else { //모바일권한이 없는상태
								_secretform_var.list_snct[idx]["MBL_SNCT_DCD"] = "N"; //모바일결재권한이 없고 아무것도 선택하지 않은경우
							}
						}
					});

					//3. 승인자가 기안자와 같다면 해당레코드를 보여주지 않음
					//마지막 레코드가 사라지는 조건 (기본은 결재라인의 승인자가 기안자 본인일경우)
					//승인자가 등록자(기안자)와 같을것              userSession                     USR_NO    이용자번호
					//                                              list_snct[list_snct.length -1]  SNPN_ID   결재자ID
					//마지막 결재자가 모바일 결재권한이 없을 것     list_snct[list_snct.length -2]  모바일결재권한(ARS, MOBILE)이 있는지 여부
					//기안자가 관계사구분이(승인) P가 아닐것        header에서 세팅  W_RLTN_DSNC    관계사거래구분   P (승인)
					//결재라인의 레코드수가 2건 이상일것            list_snct        length         결재라인건수
					if(_secretform_var.list_snct[idx]["SNCT_SHOW_YN"] == "N") {
						$(this).hide();
					}
				});
				//목록화면에서 확인버튼 클릭시  입력확인 step(보안매체 입력)으로 보냄
				$("#secretform_btn_SNCT_LINE_OK").off().on("click", function() {
					_secretform_var.isExecuted = true;
					_secretform_var.parentThis.call_uf_submit(); 		//실행
					_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
				});
				//이전화면으로 보냄
				$("#secretform_btn_SNCT_LINE_CANCEL").off().on("click", function() {
					uf_back();
					_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
				});


			}
		}
		//[반송] BUTTON : 반송사유입력(step98)화면을 그림
		,drawSnbcRsn : function($secretform_html) {
			//반송사유입력(step98)이 그려져 있지 않으면 그린다.
			if($("#step98").length == 0) {
				$("#step").append($secretform_html.find("#step98"));
				jex.setJexObj($("#step98"));

				//반송실행 BUTTON
				$("#step98").find("#secretform_btn_SNBC_RSN_OK").off('click').on("click", function(e) {
					if(!MobUtil.isEmpty(_secretform_var.snbcSvcId)) { //사용자 정의 반송서비스 실행
						jex.setJexObj($("#" + _secretform_var.snbcSvcId).attr("data-jx-svc-onload", "true"));
					} else { //공통 반송서비스 실행
						jex.setJexObj($("#secretform_com_snt_030101_SNBC").attr("data-jx-svc-onload", "true"));
					}
				});

				//반송취소 BUTTON
				$("#step98").find("#secretform_btn_SNBC_RSN_CANCEL").off('click').on("click", function(e) {
					var prevStepNo = jex.plugin.get("JEX_MOBILE_STEP").getPrevStepNo(); //이전스텝
					_secretform_var.isExecuted = false;	//중복클릭 방지
					_secretform_var.isExcuteSNBC = false; //반송실행 여부
					comUtil_back(prevStepNo); //이전스텝으로 이동
				});
			}
		}
		//반송사유 입력
		,goStepSnbcRsn:function() {
			$("#secretform_txt_SNBC_RSN").val("");
			uf_goStep(98);
		}

		//[실행] BUTTON (씨크리트카드 및 OTP카드)
		,secret_execute:function() {
			if(("09" == _secretform_var.SMBK_LGN_DCD || "10" == _secretform_var.SMBK_LGN_DCD) && (_target_yn != undefined && _target_yn == true)) { //전자어음/전자채권 거래 IBK인증서 불가
				$('#b2b_popup').find("#divCookie").remove();
				$('#b2b_popup').find('#close_popup').attr("data-jx-execute-target", "FUNC@uf_closePop(2)");
				jex.setJexObj($('#b2b_popup'));
				comLayerPopUtil.open('b2b_popup');
				_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
				_secretform_var.isExcuteSNBC = false; //반송실행 여부
				return false;
			}
			
			try {
				// 씨크리트폼 실행버튼시 전처리(콜백함수 존재여부) :: 각업무에서정의한다.
				if(_secretform_var.preFunction != ""){
					var break_Bool = true;

					// return true  ==> 이후진행
					// return false ==> stop
					break_Bool = eval(_secretform_var.preFunction);	//각 업무단 에서 필요한 작업 수행..
					if(! break_Bool) {
						_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
						_secretform_var.isExcuteSNBC = false; //반송실행 여부
						return false;
					}
				}
				
				//if($("#authform_area_ars").is(':visible') || $("#authform_area_otp").is(':visible')) {
				//if($("#authform_exec_yn") != undefined && $("#authform_exec_yn").val("N")) {
				if(_authform_var.trSvc != undefined && _authform_var.trSvc != "" && _isAuthComplete != true) {
					//if(_isAuthComplete != true) {
						//MobPopup.showAlertPopup("추가 인증을 완료해 주세요.");
						_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
						_secretform_var.isExcuteSNBC = false; //반송실행 여부
						_authform_var.thisSForm.execAuth();
						//여기서 리턴하면 authform 에서 추가인증 정상 완료 후 시크릿 폼 call_uf_submit 또는 submitSignData 실행됨
						return false;
					//}
				}

				//불능시 연락처 필수값 체크
				if (_secretform_var.isCheckImptmCtctTpn) {
					var hp_no01 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_1").val());
					var hp_no02 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_2").val());
					var hp_no03 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_3").val());
					var hp_no = hp_no01 + hp_no02 + hp_no03;

					if(hp_no == ""){
						MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 필수 입력 사항입니다.");
						_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
						_secretform_var.isExcuteSNBC = false; //반송실행 여부
						return;
					}else if(hp_no.length < 10){
						MobPopup.showAlertPopup("[거래 오류시 통지 연락처] 자릿수를 확인하세요.");
						_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
						_secretform_var.isExcuteSNBC = false; //반송실행 여부
						return;
					}
				}

				//이용자비밀번호 사용일경우 체크
				if(_secretform_var.isUseTrnPwd) {
					if(_secretform_var.parentObj.find("#secretform_W_TRAN_PWD").val().length != 8) {
						MobPopup.showAlertPopup("[이용자비밀번호]필수 입력 사항입니다.");
						_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
						_secretform_var.isExcuteSNBC = false; //반송실행 여부
						return false;
					}
				}

				if(_secretform_var.fdsCheck == false) {
					//FDS 탐지결과조회 실행
					if(_secretform_var.isUseFds && _secretform_var.isLoadInqyFds == false && _isAuthComplete == false) {
						jex.setJexObj($("#secretform_com_utl_999999_1").attr("data-jx-svc-onload", "true")); //FDS 탐지결과조회
						_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
						return;
					}
				}
				execAcntPwd().done(function(){
					
					//console.log("계좌비번 검증 성공");
					
					 execSecuMedia().done(function(){
						 
						//반송처리
						if(_secretform_var.isExcuteSNBC) {
							_secretform_var.thisSForm.goStepSnbcRsn();

							_secretform_var.isExecuted = false;
							_secretform_var.isExcuteSNBC = false;
						}
						//결재요청
						else if(_secretform_var.W_SNCT_DSNC == "1") {
							_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
							
							
							comLayerPopUtil.closeAll(function() {
								uf_goStep(99); //결재선 목록 step으로 이동
							});
							
							
						}
						//결재실행
						else if(_secretform_var.isSnct && _secretform_var.snctData["SNCT_ATHR_DCD"] == "01") {
							jex.setJexObj($("#secretform_com_snt_020101_SNCT").attr("data-jx-svc-onload", "true"));
							_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
						}
						else {
							//추가인증을 비밀번호 이전에 체크하는것으로 변경
							/**FDS 탐지결과조회 실행
							if(_secretform_var.isUseFds && _secretform_var.isLoadInqyFds == false && _isAuthComplete == false) {
//								jex.setJexObj($("#secretform_com_utl_999999_1").attr("data-jx-svc-onload", "true")); //FDS 탐지결과조회
//								_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
								
							}
							else {
							**/
								//전자서명을 사용하지 않을경우 바로 실행처리를 호출한다.
								if(!_secretform_var.isUseSignedMsg) {
									_secretform_var.parentThis.call_uf_submit(); //실행
									_secretform_var.isExecuted = false; //중복클릭 방지를 풀어 줌
								}
								else {
									_secretform_var.thisSForm.submitSignData(); //전자서명을 처리하고 실행
								}
								_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
							//}
						}
					 }).fail(function() {
						 _secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
						 _secretform_var.isExcuteSNBC = false;//반송 버튼 클릭 후 otp 취소의 경우 초기화
					 });
				}).fail(function() {
					_secretform_var.isExecuted   = false; //중복클릭 방지를 풀어 줌
					_secretform_var.isExcuteSNBC = false  //중복클릭 방지를 풀어 줌
				});
			} catch(e) {
				bizException(e, "secret_otp_execute");
				_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
			}

			//확인 클릭후 보안값을 초기화
			$("#otp_num").val("");
		}
		//보안매체 처리에서 세팅된 값 설정
		, makeSubmitDataFormSecretform : function(jsonData) {
			//불능시연락처가 사용중일때
			if(_secretform_var.isUseImptmCtctTpn) {
				jsonData["IMPTM_CTCT_TPN"] = _secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN").val();
			}
			//출금계좌 비밀번호
			if(_secretform_var.isUseDrotAcntPwd) {
				jsonData["DROT_ACNT_PWD"] = _secretform_var.parentObj.find("#secretform_DROT_ACNT_PWD").attr("realValue");
			}
			//카드 비밀번호
			if(_secretform_var.isUseCardPwd) {
				jsonData["CARD_PWD"] = _secretform_var.parentObj.find("#secretform_CARD_PWD").attr("realValue");
			}
			//이용자비밀번호(이체비밀번호)
			if(_secretform_var.isUseTrnPwd) {
				jsonData["W_TRAN_PWD"] = _secretform_var.parentObj.find("#secretform_W_TRAN_PWD").attr("realValue");
			}
			//OTP가 사용일때
			if(_secretform_var.isUseSecuMedia) {
				jsonData["web_otp_ocrn_no"] = _secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").attr("realValue");
			}
			//인증서가 사용일때
			if(_secretform_var.isUseSignedMsg) {
				jsonData["signed_msg"] = _secretform_var.parentObj.find("#secretform_cert_signed_msg").val();
				
				if(undefined != _secretform_var.signed_msg_list) { //2019.01.11 비대면전자약정서'관련 :: 다건처리
					jsonData["signed_msg_list"] = _secretform_var.signed_msg_list;
				}
			}
			//화면에서 값 초기화 처리 (다시 이 화면으로 왔을 때 재 입력해야 하는 값들 초기화)
			_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN" ).val("");
			_secretform_var.parentObj.find("#secretform_DROT_ACNT_PWD"  ).val("");
			_secretform_var.parentObj.find("#secretform_W_TRAN_PWD"     ).val("");
			_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO"  ).val("");
			_secretform_var.parentObj.find("#secretform_cert_signed_msg").val("");

			return jsonData;

		}
		// TODO: 개인 공동/금융인증서 전자서명 부분 필요
		//전자서명 및 실행
		, submitSignData : function() {
			var signData = "";
			try {
				signData = _secretform_var.parentThis.getSignData();
			} catch (e) {
				MobPopup.showAlertPopup("getSignData() function이 없습니다. ");
			}

			_secretform_var.isCertSignExecuted = false; //인증서팝업 확인버튼 W클릭 방지

			//if(_isMobile() || _secretform_var.SMBK_LGN_DCD == "10"){
			if(_isMobile()){
				//전자서명에 시간값을 추가하면 안되는 페이지 세팅
				var loc_path = $(location).attr("pathname");
				//전자어음발행           : fnt_b2b_041101_1.html
				//전자어음수령거부및반환 : fnt_b2b_043201_1.html
				//전자어음배서           : fnt_b2b_043101_1.html
				var noSessionTimeFiles = ["fnt_b2b_041101_1.html","fnt_b2b_043201_1.html","fnt_b2b_043101_1.html"];
				var use_ibksignedtime_yn = "Y";
				for(var signed_i = 0; signed_i < noSessionTimeFiles.length; signed_i++) {
					if(loc_path.indexOf(noSessionTimeFiles[signed_i]) != -1) {
						use_ibksignedtime_yn = "N";
					}
				}

				//2019.01.11 비대면전자약정서'관련 :: PDF hash값 전자서명 :: 대상메뉴 check
				if(undefined != signData && signData.indexOf("signFileInfo") != -1) {
					
					var signDataList = _secretform_var.parentThis.getSignDataList(); //다시
					
					if("08" == _secretform_var.SMBK_LGN_DCD) { //08: 금융인증서
						//주메세지, title, callback[확인], 서브메세지
						//MobPopup.showAlertPopup("금융인증서로 로그인하셨습니다. 해당 거래는 공동인증서로 로그인 시 이용 가능합니다. 공동인증서가 없는 경우 발급 후 이용해주세요.", undefined, function () {
						//	_webViewExit();
						//});
						//return;
						
						var req_list = [];
						signDataList.forEach(function(element, index) {
							//req_list.push(element.pdfkey); //전체
							
							//(약정서류)hash 값만 전자서명.
							//var _tmpVal = comm2.hexToBase64(element.pdfkey.split("|")[2]); // hex -> base64
							var _tmpVal = comm2.encodeBase64(comm2.hexToBytes(element.pdfkey.split("|")[2])); // hex -> Bytes(binary) -> Base64
							req_list.push(_tmpVal);
						});
						
						//약정서류 다건 : req_list
						if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
							FinCertCorpSdk.convertBase64ToBase64UrlSafe(req_list, function(res_list) {
								//FinCertCorpSdk.fin_sign2(this); //apply
								FinCertCorpSdk.fin_sign2(res_list);
							});
						} else {
							FinCertSdk.convertBase64ToBase64UrlSafe(req_list, function(res_list) {
								//FinCertCorpSdk.fin_sign2(this); //apply
								FinCertSdk.fin_sign2(res_list);
							});
						}
					} else if("09" == _secretform_var.SMBK_LGN_DCD) { //IBK인증서
						
						try {

							var result = null;
							var errorObj = null;
							
							var certAlias = "";
							var ref_token = "";
							var nConsentSize = signDataList.length;
							var _delimiter = "^";
							var req_list = [];	
							var _mdConsent	= "";
							
							signDataList.forEach(function(element, index) {		
								var _tmpVal = element.pdfkey.split("|")[2];	
								
								if($.trim(_mdConsent) != ""){
									_mdConsent += _delimiter;											
									_mdConsent += _tmpVal;
								}
								else {
									_mdConsent = _tmpVal;
								}
								
							});		

							
							var ajax = jex.createAjaxUtil("lgn_ibk_010101_1");
							ajax.setAsync(false);
							ajax.errorTrx = false;
							
							ajax.set("task_package"   , "lgn");
							ajax.set("task_subpackage", "ibk");
							ajax.set("methodName", "regExtRelayCertTran");
							ajax.set("tran_dcd", "5"); // 본인인증(로그인):1, 전자서명:2, PDF서명:5
							ajax.set("consentSize", nConsentSize);
							ajax.set("consent", _mdConsent);
							
							ajax.execute(function(dat) {
								
								errorObj = dat["_tran_res_data"][0];
								
								if(errorObj["_is_error"] != "true"){
									result = JSON.parse(dat["_tran_res_data"][0].result);
									certAlias = dat["_tran_res_data"][0].certAlias;
									ref_token = dat["_tran_res_data"][0].ref_token;
								}
								
							});
							
							if(errorObj["_is_error"] == "true"){
								
								MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
								
								return false;
							}
							
							if(result.rsp_code !== '00000'){
								
								MobPopup.showAlertPopup(result.rsp_msg, null, function(){});
								
								return false;
							}
							
							var iframeParam = {};
							iframeParam.sign_tx_id = result.sign_tx_id;
							iframeParam.cert_tx_id = result.cert_tx_id;
							iframeParam.certAlias = certAlias;
							iframeParam.ref_token = ref_token;
							iframeParam.consent = result.consent_list; 
							iframeParam.rqst_chnl_dcd = "CSB";
							
							var messageFunc = function(event){
								
								if(event.data.savePartner && event.data.refToken){
							        sessionStorage.setItem(event.data.savePartner, event.data.refToken);
							    }
								
								//전자서명 성공했을 때 처리
							    if(event.data.requestVerify == 'Y'){
							    	
							    	var cert_tx_id = event.data.cert_tx_id;
									var sign_tx_id = event.data.sign_tx_id;
							    	
									var ajax = jex.createAjaxUtil("lgn_ibk_010101_1");
									
									ajax.setAsync(false);
									ajax.errorTrx = false;
									
									ajax.set("task_package"   , "lgn");
									ajax.set("task_subpackage", "ibk");
									ajax.set("methodName", "verifyInTran");
									ajax.set("cert_tx_id",        cert_tx_id);
									ajax.set("sign_tx_id",        sign_tx_id);
									
									ajax.execute(function(dat) {
										
										errorObj = dat["_tran_res_data"][0];
										
										if(errorObj["_is_error"] != "true"){
											result = JSON.parse(dat["_tran_res_data"][0].result);
										}
										
									});
							    	
									if(errorObj["_is_error"] == "true"){
										
										afterFunc();
										MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
										
										return false;
									}
									
									if(result.rsp_code !== '00000'){
										
										afterFunc();
										MobPopup.showAlertPopup(result.rsp_msg, null, function(){
										});
										
										return false;
									}else{
										_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(result.signed_consent_list[0].signed_consent);
	
										var result_signed_list = [];				
										result.signed_consent_list.forEach(function(element, index) {				
											var tmp_json = {};			
														
											tmp_json["signed_msg"] = $.trim(element.signed_consent); 			
											result_signed_list.push(tmp_json);			
										});	
										
										afterFunc();
										_secretform_var.signed_msg_list = result_signed_list; //2019.01.11 비대면전자약정서'관련 :: 다건처리
										_secretform_var.parentThis.call_uf_submit(); //실행
									}
							    	
									
								}else if (event.data.requestVerify == 'N'){
									afterFunc();
									MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
							    }
							    
							    if("Y" == event.data.pinFail) {//발급/재발급이동
							    	$.nativeCall('deleteSessionData',[]).done(function(data){//로그아웃 후 이동
							    		comWebkey_goMenu("5009", "cmc_dsa_010101_0", "");
							    	});
							    }
							    
							    if("Y" == event.data.finFailClose) {//화면닫기
							    	afterFunc();
							    }
							    					
							}
							
							afterFunc = ibkCertCom.wsafeboxIframe("/regSign", iframeParam, messageFunc);
						
						} catch(e) {
							bizException(e, "submitSignData");
						}
					} else if("10" == _secretform_var.SMBK_LGN_DCD) { //IBK인증서(본인확인용)
						_this.openType = 'KICA';
						//console.log('### IBK 인증서 (본인확인용-PDF서명) ------- 전자서명 start');
						try {
							
							var result = null;
							var errorObj = null;
							
							if (typeof _this.GID === 'undefined') {
								_this.GID = '';
							}
							
							var nConsentSize = signDataList.length;
							var _delimiter = "^";
							var req_list = [];	
							var _mdConsent	= "";
							
							signDataList.forEach(function(element, index) {		
								var _tmpVal = element.pdfkey.split("|")[2];	
								
								if($.trim(_mdConsent) != ""){
									_mdConsent += _delimiter;											
									_mdConsent += _tmpVal;
								}
								else {
									_mdConsent = _tmpVal;
								}
								
							});	
							
							var ajax = jex.createAjaxUtil("lgn_ids_010101_1");
							ajax.setAsync(false);
							ajax.errorTrx = false;
							
							ajax.set("task_package"   , "lgn");
							ajax.set("task_subpackage", "ids");
							ajax.set("methodName", "regExtRelayCertTran");
							ajax.set("tran_dcd", "50"); // 본인인증(로그인):10, 금융거래(내부거래):20, PDF거래(내부거래)서명:50
							ajax.set("consentSize", nConsentSize);
							ajax.set("consent", _mdConsent);
							
							//console.log('### IBK 인증서 (본인확인용-PDF서명) params[nConsentSize]', nConsentSize);
							//console.log('### IBK 인증서 (본인확인용-PDF서명) params[_mdConsent]', _mdConsent);
							
							ajax.execute(function(dat) {
								
								var dataList = dat._tran_res_data[0];
								var result = JSON.parse(dataList.result);
								
								//console.log('## ids-regExtRelayCertTran sign result ', result);
								
								if(result._is_error == "true"){
					
									afterFunc();
									MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
									
									return false;
								}
								
								if(result.rsp_code !== '00000'){
								
									afterFunc();
									MobPopup.showAlertPopup(result.rsp_msg, null, function(){});
									
									return false;
								}
								
								var certAlias = dataList.certAlias;
								var accountkey = dataList.accountkey;
								var cust_id = dataList.cust_id;
								
								var iframeParam = {};
								iframeParam.sign_tx_id = result.sign_tx_id;
								iframeParam.cert_tx_id = result.cert_tx_id;
								iframeParam.certSerl = certAlias;
								iframeParam.cust_id = cust_id;
								iframeParam.accountkey = accountkey;
								iframeParam.consent = result.consent_list; 
								
								if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
									iframeParam.rqst_chnl_dcd = "CSB";
									iframeParam.cust_type = '20';
								} else {
									iframeParam.rqst_chnl_dcd = "IBS";
									iframeParam.cust_type = '10';
								}
								
								
								var messageFunc = function(event) {
									//console.log('#### IBK 인증서 (본인확인용-PDF서명) 서버저장형 event', event);
									
									if(event.data.savePartner && event.data.accountkey){
								        sessionStorage.setItem(event.data.savePartner, event.data.accountkey);
								    }
								    
								    // 전자서명 완료 후
									if('Y' == event.data.requestVerify) {
										
										var cert_tx_id = event.data.cert_tx_id;
										var sign_tx_id = event.data.sign_tx_id;
										var cust_id = event.data.cust_id; // 2023.08.17. RA7200 조치
										
										var ajax = jex.createAjaxUtil("lgn_ids_010101_1");
										ajax.setAsync(false);
										ajax.errorTrx = false;
										
										ajax.set("task_package"   , "lgn");
										ajax.set("task_subpackage", "ids");
										ajax.set("methodName", "verifyInTran");
										ajax.set("cert_tx_id",        cert_tx_id);
										ajax.set("sign_tx_id",        sign_tx_id);
										ajax.set("RA_CUST_ID",           cust_id); // 2023.08.17. RA7200 조치
										ajax.set("gid"		 , _this.GID);
										
										ajax.execute(function(dat) {
											var dataList = dat._tran_res_data[0];
											var result = JSON.parse(dataList.result);
											
											_this.GID = result.GID;
											//console.log('## ids-verifyInTran 전자서명 ', result);
						
											if(result._is_error == "true"){
											
												afterFunc();
												MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
												
												return false;
											}
											
											if(result.rsp_code !== '00000'){
												
												afterFunc();
												MobPopup.showAlertPopup(result.rsp_msg, null, function(){});
												
												return false;
											}
											
											_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(result.signed_consent_list[0].signed_consent);
		
											var result_signed_list = [];				
											//result.signed_consent_list.forEach(function(element, index) {
											event.data.elsg_data.forEach(function(element, index) {	  
												var tmp_json = {};			
															
												tmp_json["signed_msg"] = $.trim(element.consent); 			
												result_signed_list.push(tmp_json);			
											});	
	
											
											afterFunc();
											_secretform_var.signed_msg_list = result_signed_list; //2019.01.11 비대면전자약정서'관련 :: 다건처리
											_secretform_var.parentThis.call_uf_submit(); //실행
											
											
										});
									} else if (event.data.requestVerify == 'N'){ //서버저장형인증서 내부 프로세스 진행 중 에러발생시
										afterFunc();
										MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
										
										return false;
								    }
								    
								    //서버저장형iframe에서 단순 닫힘일 경우	
									if('Y' == event.data.close) {
										//iframe 삭제
										afterFunc();
									}
									
									//비밀번호 5회 오류 등 갱신 외의 케이스로 인증서 폐기돼서 솔루션 화면 닫힐 시 호출되는 로직
									if("Y" == event.data.pinFail) {
										comWebkey_goMenu("5009", "cmc_ids_010101_0", "");
							        }
							        
							        // 5번 틀려서 인증서 재발급으로 안내 팝업에서 아니오 누르면 로그인 페이지로 이동 이벤트
								    if("Y" == event.data.pinFailClose) {
										afterFunc();
										comWebkey_goMenu("5009", "lgn_lgn_010101_1", "");
							        }
							        
								}
								
								afterFunc = ibkCertCom.wsafeboxIframe("/regSign", iframeParam, messageFunc);
								
								
							});
							
						} catch(e) {
							bizException(e, "submitSignData SMBK_LGN_DCD(10)");
						}
					} else { //Default
						comWebkey_signFileInfo(signDataList, function() {
							$sign_result = this;
							//인증서팝업 확인버튼 W클릭 방지
							if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
							else return;
							
							_secretform_var.signed_msg_list = $sign_result.signed_msg_list; //2019.01.11 비대면전자약정서'관련 :: 다건처리
							_secretform_var.parentThis.call_uf_submit(); //실행
						});
					}
				}
				else { //Default 기존로직(전자서명)
					
					// 스마트뱅킹로그인구분코드  01 : 인증서로그인, 08: 금융인증서
					if("08" == _secretform_var.SMBK_LGN_DCD) { //08: 금융인증서
						//금융인증서' 로그인했다면 앱버전충족 했으므로, 버전체크 skip.
						//   -안드로이드 : 2.4.2
						//   -iOS        : 2.2.8
						if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
							FinCertCorpSdk.fin_sign(signData, use_ibksignedtime_yn); //금융인증서 전자서명
						} else {
							FinCertSdk.fin_sign(signData, use_ibksignedtime_yn); //금융인증서 전자서명
						}
					} else if("09" == _secretform_var.SMBK_LGN_DCD) { //IBK인증서
						
						try {
							
							var result = null;
							var errorObj = null;
							var certAlias = "";
							var ref_token = "";
							
							var ajax = jex.createAjaxUtil("lgn_ibk_010101_1");
							ajax.setAsync(false);
							ajax.errorTrx = false;
							ajax.set("task_package"   , "lgn");
							ajax.set("task_subpackage", "ibk");
							ajax.set("methodName", "regExtRelayCertTran");
							ajax.set("tran_dcd", "2");
							ajax.set("consentSize", "1");
							ajax.set("consent", signData);
							
							ajax.execute(function(dat) {
								errorObj = dat["_tran_res_data"][0];
								
								if(errorObj["_is_error"] != "true"){
									result = JSON.parse(dat["_tran_res_data"][0].result);
									certAlias = dat["_tran_res_data"][0].certAlias;
									ref_token = dat["_tran_res_data"][0].ref_token;
								}
								
							});
							
							if(errorObj["_is_error"] == "true"){
								
								MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
								
								return false;
							}
							
							if(result.rsp_code !== '00000'){
								
								MobPopup.showAlertPopup(result.rsp_msg, null, function(){
								});
								
								return false;
							}
							
							var iframeParam = {};
							iframeParam.sign_tx_id = result.sign_tx_id;
							iframeParam.cert_tx_id = result.cert_tx_id;
							iframeParam.certAlias = certAlias;
							iframeParam.ref_token = ref_token;
							iframeParam.consent = result.consent_list; 
							iframeParam.rqst_chnl_dcd = "CSB";
							
							var messageFunc = function(event){
								
								if(event.data.savePartner && event.data.refToken){
							        sessionStorage.setItem(event.data.savePartner, event.data.refToken);
							    }
								
								//전자서명 성공했을 때 처리
							    if(event.data.requestVerify == 'Y'){
							    	
							    	var cert_tx_id = event.data.cert_tx_id;
									var sign_tx_id = event.data.sign_tx_id;
							    	
									var ajax = jex.createAjaxUtil("lgn_ibk_010101_1");
									ajax.setAsync(false);
									ajax.errorTrx = false;
									ajax.set("task_package"   , "lgn");
									ajax.set("task_subpackage", "ibk");
									ajax.set("methodName", "verifyInTran");
									ajax.set("cert_tx_id",        cert_tx_id);
									ajax.set("sign_tx_id",        sign_tx_id);
									
									ajax.execute(function(dat) {
										errorObj = dat["_tran_res_data"][0];
										
										if(errorObj["_is_error"] != "true"){
											result = JSON.parse(dat["_tran_res_data"][0].result);
										}
										
									});
							    	
									if(errorObj["_is_error"] == "true"){
										
										afterFunc();
										MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
										
										return false;
									}
									
									if(result.rsp_code !== '00000'){
										
										afterFunc();
										MobPopup.showAlertPopup(result.rsp_msg, null, function(){
										});
										
										return false;
									}else{
										afterFunc();
										_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(result.signed_consent_list[0].signed_consent);
										_secretform_var.parentThis.call_uf_submit(); //실행
									}
							    	
									
								}else if (event.data.requestVerify == 'N'){
									afterFunc();
									MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
							    }
							    
							    if("Y" == event.data.pinFail) {//발급/재발급이동
							    	$.nativeCall('deleteSessionData',[]).done(function(data){//로그아웃 후 이동
							    		comWebkey_goMenu("5009", "cmc_dsa_010101_0", "");
							    	});
							    }
							    
							    if("Y" == event.data.finFailClose) {//화면닫기
							    	afterFunc();
							    }
							    					
							}
							
							afterFunc = ibkCertCom.wsafeboxIframe("/regSign", iframeParam, messageFunc);
						
						} catch(e) {
							bizException(e, "submitSignData");
						}
						
					}  else if("10" == _secretform_var.SMBK_LGN_DCD) { //IBK인증서(본인확인용)
						_this.openType = 'KICA';
						//console.log('### IBK 인증서 (본인확인용-전자서명) ------- 전자서명 start');
						try {
							
							var result = null;
							var errorObj = null;
							
							if (typeof _this.GID === 'undefined') {
								_this.GID = '';
							}
							
							var ajax = jex.createAjaxUtil("lgn_ids_010101_1");
							ajax.setAsync(false);
							ajax.errorTrx = false;
							
							ajax.set("task_package"   , "lgn");
							ajax.set("task_subpackage", "ids");
							ajax.set("methodName", "regExtRelayCertTran");
							ajax.set("tran_dcd", "20"); // 본인인증(로그인):10, 금융거래(내부거래):20, PDF거래(내부거래)서명:50
							ajax.set("consentSize", "1");
							ajax.set("consent", signData);
							ajax.set("gid", _this.GID);
							if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
								ajax.set("RQST_CHNL_DCD", "CBS");
							} else {
								ajax.set("RQST_CHNL_DCD", "IBS");
							}
							//console.log('### IBK 인증서 (본인확인용-전자서명) params[consent]', signData);
							
							ajax.execute(function(dat) {
								
								var dataList = dat._tran_res_data[0];
								var result = JSON.parse(dataList.result);
								_this.GID = result.GID;
								
								//console.log('## ids-regExtRelayCertTran sign result ', result);
								
								if(result._is_error == "true"){
					
									MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
									
									return false;
								}
								
								if(result.rsp_code !== '00000'){
								
									MobPopup.showAlertPopup(result.rsp_msg, null, function(){});
									
									return false;
								}
								
								var certAlias = dataList.certAlias;
								var accountkey = dataList.accountkey;
								var cust_id = dataList.cust_id;
								
								var iframeParam = {};
								iframeParam.sign_tx_id = result.sign_tx_id;
								iframeParam.cert_tx_id = result.cert_tx_id;
								iframeParam.certSerl = certAlias;
								iframeParam.accountkey = accountkey;
								iframeParam.cust_id = cust_id;
								iframeParam.consent = result.consent_list; 
								if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
									iframeParam.rqst_chnl_dcd = "CSB";
								} else {
									iframeParam.rqst_chnl_dcd = "IBS";
								}
								
								
								
								var messageFunc = function(event) {
									//console.log('#### IBK 인증서 (본인확인용-전자서명) 서버저장형 event', event);
									
									if(event.data.savePartner && event.data.accountkey){
								        sessionStorage.setItem(event.data.savePartner, event.data.accountkey);
								    }
								    
								    // 전자서명 완료 후
									if('Y' == event.data.requestVerify) {
										
										var cert_tx_id = event.data.cert_tx_id;
										var sign_tx_id = event.data.sign_tx_id;
										var cust_id = event.data.cust_id; // 2023.08.17. RA7200 조치
										
										var ajax = jex.createAjaxUtil("lgn_ids_010101_1");
										ajax.setAsync(false);
										ajax.errorTrx = false;
										
										ajax.set("task_package"   , "lgn");
										ajax.set("task_subpackage", "ids");
										ajax.set("methodName", "verifyInTran");
										ajax.set("cert_tx_id",        cert_tx_id);
										ajax.set("sign_tx_id",        sign_tx_id);
										ajax.set("RA_CUST_ID",           cust_id); // 2023.08.17. RA7200 조치
										ajax.set("gid"		 , _this.GID);
										if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
											ajax.set("RQST_CHNL_DCD", "CBS");
										} else {
											ajax.set("RQST_CHNL_DCD", "IBS");
										}
										
										ajax.execute(function(dat) {
											var dataList = dat._tran_res_data[0];
											var result = JSON.parse(dataList.result);
											
											_this.GID = result.GID;
											//console.log('## ids-verifyInTran 전자서명 ', result);
						
											if(result._is_error == "true"){
											
												afterFunc();
												MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
												
												return false;
											}
											
											if(result.rsp_code !== '00000'){
												
												afterFunc();
												MobPopup.showAlertPopup(result.rsp_msg, null, function(){});
												
												return false;
											}
											
											afterFunc();
											_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(result.signed_consent_list[0].signed_consent);
											_secretform_var.parentThis.call_uf_submit(); //실행
											
											
										});
									} else if (event.data.requestVerify == 'N'){ //서버저장형인증서 내부 프로세스 진행 중 에러발생시
										afterFunc();
										MobPopup.showAlertPopup("서비스 상태가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바라며, 이체성 거래의 경우 반드시 관련 거래내역을 확인하여 주시기 바랍니다.", null, function(){});
										
										return false;
								    }
								    
								    //서버저장형iframe에서 단순 닫힘일 경우	
									if('Y' == event.data.close) {
										//iframe 삭제
										afterFunc();
									}
									
									//비밀번호 5회 오류 등 갱신 외의 케이스로 인증서 폐기돼서 솔루션 화면 닫힐 시 호출되는 로직
									if("Y" == event.data.pinFail) {
										comWebkey_goMenu("5009", "cmc_ids_010101_0", "");
							        }
									
									// 5번 틀려서 인증서 재발급으로 안내 팝업에서 아니오 누르면 로그인 페이지로 이동 이벤트
								    if("Y" == event.data.pinFailClose) {
										afterFunc();
							        }
									
								}
								
								
								afterFunc = ibkCertCom.wsafeboxIframe("/regSign", iframeParam, messageFunc);
								
								
								
								
								
							});
							
							
							
							
							
							
						} catch(e) {
							bizException(e, "submitSignData SMBK_LGN_DCD(10)");
						}
					} 
					
					
					else { //Default                           //01: 인증서로그인
						
						//전자어음 전자서명 subType 분기 처리
						var kftcSign = "";
						if(use_ibksignedtime_yn == "N") {
							kftcSign = "kftcSign";
						}
						
						//앱으로 구동할 경우 콜백함수에서 전자서명값을 세팅함
						comWebkey_signWithCertificate(signData, {}, "N", "N", use_ibksignedtime_yn, function() {
							$sign_result = this;
							//인증서팝업 확인버튼 W클릭 방지
							if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
							else return;
							
							//간편인증 취소/오류시 처리, 간편인증 오류시 _errcode 내려옴
							
							if($sign_result["_errcode"] == "-1001" ) {
								MobPopup.showAlertPopup("공동인증서 간편비밀번호가 다릅니다<br>다시 입력해 주세요.","",null, "");
								return;

							}
							
							if(_isAndroid()) {
								
								if($sign_result["_errcode"] != undefined) {
									if($sign_result["_errcode"] == "-907" || $sign_result["_errcode"] == "-908") {
										//사용자 취소
										console.log("사용자취소");
										return;
									}
									
									//바이오 변경
									else if($sign_result["_errcode"] == "-902" ) {
										MobPopup.showAlertPopup("바이오인증 정보가 변경되었습니다<br><br>[인증.보안 > 간편인증수단관리 >바이오인증 재설정] 메뉴에서 다시 설정해 주세요.","",null, "");
										return;
										
									}
									
									else if($sign_result["_errcode"] == "-915" ) {
										MobPopup.showAlertPopup("바이오인증 오류로 일시 잠겼습니다. 잠시후 이용해 주세요,",null, "");
										return;
										
									}
									
									else if($sign_result["_errcode"] == "-917") {
										MobPopup.showAlertPopup("기기에서 발생한 오류 횟수 초과로 i-ONE뱅크 기업의 바이오 인증을 사용하실 수 없습니다.<br><br>기기 설정에서 오류 초기화 진행 후 다시 이용해 주세요",null,null,null);
										return;
									}
									
									else if($sign_result["_errcode"] == "-919" ) {
										MobPopup.showAlertPopup("휴대폰에 등록 된 지문정보가 정보가 존재하지 않습니다.<br><br>지문 등록 후 다른 방법으로 로그인 후 인증.보안 > 공동인증서> 간편인증수단관리 메뉴에서 다시 설정해 주세요.","",null, "");
										return;
										
									} else {
										MobPopup.showAlertPopup("바이오인증시 오류가 발생하였습니다.\n" + $sign_result["_errmsg"] + "(" + $sign_result["_errcode"] + ")","",null, "");
										return;
									}
									_secretform_var.isExecuted = false;	//W클릭 방지
									
									
								}
								
							}
							
							if(_isIphone()) {
								if($sign_result["_errcode"] != undefined) {
									
									if($sign_result["_errcode"] == "-906") {
										MobPopup.showAlertPopup("기기에서 발생한 오류 횟수 초과로 i-ONE뱅크 기업의 바이오 인증을 사용하실 수 없습니다.<br><br>기기 설정에서 오류 초기화 진행 후 다시 이용해 주세요",null,null,null);
										return;
									}
									
									if($sign_result["_errcode"] == "-907" || $sign_result["_errcode"] == "-908") {
										return;
									}
									
									//바이오 변경
									else if($sign_result["_errcode"] == "-902" ) {
										MobPopup.showAlertPopup("바이오인증 정보가 변경되었습니다<br><br>[인증.보안 > 간편인증수단관리 >바이오인증 재설정] 메뉴에서 다시 설정해 주세요.","",null, "");
										return;
									} else {
										MobPopup.showAlertPopup("바이오인증시 오류가 발생하였습니다.\n" + $sign_result["_errmsg"] + "(" + $sign_result["_errcode"] + ")","",null, "");
										return;
									}
									_secretform_var.isExecuted = false;	//W클릭 방지
									
								}
								
							}
							
							if($sign_result.signed_msg == "cancel" || $sign_result.signed_msg == "CANCEL"){ //2013.07.18
								//인증서팝업 취소 button  click 시
								_secretform_var.isExecuted = false;	//W클릭 방지
								return;
							} else if($sign_result.signed_msg == "block") {
								
								MobPopup.showConfirmQckPopup('간편인증 5회 잘못 입력했습니다.\재설정 할까요?', "",
									function(){ //재설정
											
										comWebkey_goMenu("5005","cmc_sim_010101_1");
										
										
									},
									function(){//다음에
										_secretform_var.isExecuted = false;	//W클릭 방지
										return;
									},
									"다음에",
									"재설정",
									""
									);
								
								
							} else { //정상
								_secretform_var.parentObj.find("#secretform_cert_signed_msg").val($sign_result.signed_msg);
								_secretform_var.parentThis.call_uf_submit(); //실행
							}
						}, kftcSign );
					
					}
				}
				
			} else {
				
				var testFlag = true; //전자서명 테스트
				
				if(testFlag) {
					alert("TEST일 경우 : " + signData);
					_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(signData);
					_secretform_var.parentThis.call_uf_submit(); //실행
					_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
				} else {
				//임시 개발용
				
					if("08" == _secretform_var.SMBK_LGN_DCD) { //08: 금융인증서
					
						if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
							FinCertCorpSdk.fin_sign(signData, use_ibksignedtime_yn); //금융인증서 전자서명
						} else {
							FinCertSdk.fin_sign(signData, use_ibksignedtime_yn); //금융인증서 전자서명
						}
						
						
					} else {
						var signOptions = {
								encoding : "euckr"
						};
						
						Delfino.sign(signData, signOptions,function(result) {
							//console.log("signed_msg [" + result.signData + "]");
							_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(result.signData);
							_secretform_var.parentThis.call_uf_submit(); //실행
							_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
							
						});
					}
				
				}
			}
		}
		, com_sec_010101_2:function() {  //secretform을 표현하기 위한 데이터 조회
			try {
				var ajax = jex.createAjaxUtil("com_sec_010101_2");
				var autho_sc = "";

				//공통부
				ajax.set("task_package"   , "com" );
				ajax.set("task_subpackage", "sec" );

				ajax.execute(function(dat) {
					try{
						//result data
						var resultData = dat["_tran_res_data"][0];		//result data
						_secretform_var.autho_sc       		= $.trim(resultData["autho_sc"]);
						_secretform_var.cert_serialkey 		= $.trim(resultData["cert_serialkey"]);
						_secretform_var.IMPTM_CTCT_TPN_1	= $.trim(resultData["IMPTM_CTCT_TPN_1"]); //불능시연락처전화번호 1
						_secretform_var.IMPTM_CTCT_TPN_2	= $.trim(resultData["IMPTM_CTCT_TPN_2"]); //불능시연락처전화번호 2
						_secretform_var.IMPTM_CTCT_TPN_3	= $.trim(resultData["IMPTM_CTCT_TPN_3"]); //불능시연락처전화번호 3
						if(resultData["LOGIN_YN"] == "Y") {
							_secretform_var.isLogin = true;
							_secretform_var.SMBK_LGN_DCD = resultData["SMBK_LGN_DCD"]; // 스마트뱅킹로그인구분코드(01:인증서로그인, 08:금융인증서)
							_secretform_var.ENBK_MNGR_YN = resultData["ENBK_MNGR_YN"]; // 기업뱅킹관리자여부(Y:관리자, N:이용자, S:조회용이용자)
							_secretform_var.CORP_CERT_LOGIN_YN = resultData["CORP_CERT_LOGIN_YN"]; // 사업자용인증서로그인여부[Y:사업자용 공동/금융인증서 로그인, N:개인용 공동/금융인증서 로그인]
							
							if("S" == _secretform_var.ENBK_MNGR_YN) { //조회용이용자
								//‘조회용이용자’의 이용범위 제한
								//  계좌 조회 등 OTP발생기 및 전자서명이 불필요한 거래만 가능(단, 다단계결재 기안등록 업무는 불가능)
								//  ‘조회용 이용자’가 OTP발생기 및 전자서명을 요하는 업무 이용 시
								MobPopup.showAlertPopup("조회용 이용자는 해당 거래를 수행할 수 없습니다.", undefined, function() {
									_webViewExit();
								});
								return;
							}
							
							// 스마트뱅킹로그인구분코드  01 : 인증서로그인, 08: 금융인증서
							if("08" == _secretform_var.SMBK_LGN_DCD && _secretform_var.isUseSignedMsg) { //08: 금융인증서 && (전자서명을 사용하는경우)
								//금융인증서' 로그인했다면 앱버전충족 했으므로, 버전체크 skip.
								//   -안드로이드 : 2.4.2
								//   -iOS        : 2.2.8
								
								//(금융인증서) 앱정보 : [getFinAppInfo]
								comWebkey_getFinAppInfo(function() {
									var result   = this;
									//-데이터 설명
									//   * app_id : 앱 패키지명
									//   * device_id : 기기 고유값
									//   * app_ver : 현재 앱 버전 
									//   * imei: 디바이스고유값(Android OS 10버전 미만)
									//   * android_id: 디바이스고유값(Android OS 10버전 이상)
									
									_secretform_var.appId    = result["app_id"      ]; //[운영:com.ibk.scbs, 개발(QA):com.ibk.scbs.dev]
									_secretform_var.deviceId = result["device_id"   ]; //'android_id 혹은 imei'
									_secretform_var.appVer   = result["app_ver"     ]; //'2.4.2'
									_secretform_var.orgCode  = result["finance_code"];
									_secretform_var.apiKey   = result["finance_key" ];
									
									
									if("Y" == _secretform_var.CORP_CERT_LOGIN_YN) {
										
										FinCertCorpSdk.fin_loadSdk(); // 사엽자용 금융인증서 로드 (sdk연동)
										
									} else {
										
										FinCertSdk.fin_loadSdk(); // 개인용 금융인증서 로드 (sdk연동)
									} 
								});
							}
							
						} else {
							_secretform_var.isLogin = false;
							_secretform_var.SMBK_LGN_DCD = ""; // 스마트뱅킹로그인구분코드(01:인증서로그인, 08:금융인증서)
						}
						//불능시연락처 setting
						_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_1").val($.trim(resultData["IMPTM_CTCT_TPN_1"]));	//hidden
						_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_2").val($.trim(resultData["IMPTM_CTCT_TPN_2"]));	//hidden
						_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_3").val($.trim(resultData["IMPTM_CTCT_TPN_3"]));	//hidden

						//불능시연락처를 사용하는 경우
						if(_secretform_var.isUseImptmCtctTpn) {
							_secretform_var.parentObj.find("#secretform_area_IMPTM_CTCT_TPN").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_IMPTM_CTCT_TPN").hide();
						}
						//출금계좌 비밀번호를 사용하는 경우
						if(_secretform_var.isUseDrotAcntPwd) {
							_secretform_var.parentObj.find("#secretform_area_DROT_ACNT_PWD").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_DROT_ACNT_PWD").hide();
						}
						
						//카드 비밀번호를 사용하는 경우
						if(_secretform_var.isUseCardPwd) {
							_secretform_var.parentObj.find("#secretform_area_CARD_PWD").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_CARD_PWD").hide();
						}
						
						
						//이체 비밀번호를 사용하는 경우
						if(_secretform_var.isUseTrnPwd) {
							_secretform_var.parentObj.find("#secretform_area_W_TRAN_PWD").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_W_TRAN_PWD").hide();
						}
						//불능시연락처를 사용하는경우
						if(_secretform_var.isUseImptmCtctTpn) {
							_secretform_var.parentObj.find("#secretform_area_IMPTM_CTCT_TPN").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_IMPTM_CTCT_TPN").hide();
						}
						//보안매체를 사용하는경우
						if(_secretform_var.isUseSecuMedia) {
							_secretform_var.parentObj.find("#secretform_area_SECU_MEDIA_OTP").show();
						} else {
							_secretform_var.parentObj.find("#secretform_area_SECU_MEDIA_OTP").hide();
						}
						//결재일 경우 결재관련 버튼 (반송, 결재, 결재선조회, 목록) show
						if(_secretform_var.isSnct) {
							_secretform_var.parentObj.find("#secretform_area_btn_basic").hide();
							_secretform_var.parentObj.find("#secretform_area_btn_scnt" ).show();

						} else {
							_secretform_var.parentObj.find("#secretform_area_btn_basic").show();
							_secretform_var.parentObj.find("#secretform_area_btn_scnt" ).hide();
							
							//이체관련 업무에서 실행시 레이어팝업으로 뜨는 경우 버튼의 클래시 제거
							if(_secretform_var.isBottomLayerPop) {
								$("#secretform_area_btn_basic").removeClass("mt_40");
							}
						}
						//결재관련 버튼만 보여주는 화면일경우
						if(_secretform_var.isUseSecuMedia == false && _secretform_var.isUseDrotAcntPwd == false && _secretform_var.isUseCardPwd == false && _secretform_var.isUseTrnPwd == false) {
							$("#secretform_area_div").hide();
						}
						//결재/실행 완료 조회, 결재실행 등록 조회
						if(_secretform_var.snctFromPage == "SNCT_REG" || _secretform_var.snctFromPage == "SNCT_END") {
							_secretform_var.parentObj.find("#secretform_area_data_btn_scnt_reg_end").show();
							_secretform_var.parentObj.find("#secretform_area_btn_scnt_reg_end"     ).show();
							_secretform_var.parentObj.find("#secretform_area_btn_basic").hide();
							_secretform_var.parentObj.find("#secretform_area_btn_scnt" ).hide();
						} else {
							_secretform_var.parentObj.find("#secretform_area_data_btn_scnt_reg_end").hide();
							_secretform_var.parentObj.find("#secretform_area_btn_scnt_reg_end"     ).hide();
						}
						
						//휴대폰 본인인증 후 OTP 검증만 사용하는 경우 버튼 중복으로 미노출 
						if(_secretform_var.basicBtnDisplay == "N") {
							_secretform_var.parentObj.find("#secretform_area_btn_basic").hide();
						}
						
						if(_secretform_var.autho_sc == "B") {	// 2022.05.09 스마트보안카드 인앱 추가(디지털 OTP 인앱)
							$("#secretform_area_SECU_MEDIA_OTP label").text("디지털OTP PIN번호");
							_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").attr("title","디지털OTP PIN번호 입력");
							
							_secretFormDigitalOtpInApp.makeSmartcardInappInit(function() {});
			    		}else{
			    			$("#secretform_area_SECU_MEDIA_OTP label").text("OTP발생번호");
			    			_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").attr("title","OTP발생번호 입력");
			    		}
						
						if(typeof _secretform_var.callBackFunc == "function") {
							_secretform_var.callBackFunc.apply();
						}
						MobValidation.start();

					} catch(e) {bizException(e, "com_sec_010101_2");}
				});
			} catch(e) {bizException(e, "com_sec_010101_2");}
		}


		//불능시연락처 등록/변경
		,com_utl_010101_0:function() {
			try {
				var ajax = jex.createAjaxUtil("com_utl_010101_0");

				var hp1 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_1").val());
				var hp2 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_2").val());
				var hp3 = $.trim(_secretform_var.parentObj.find("#secretform_IMPTM_CTCT_TPN_3").val());

				//공통부
				ajax.set("task_package",    "com" ); //[필수]업무 package
				ajax.set("task_subpackage", "utl" );

				//변경한 전화번호
				ajax.set("ctct_tlno1",      hp1);
				ajax.set("ctct_tlno2",      hp2);
				ajax.set("ctct_tlno3",      hp3);

				//변경전 전화번호
				ajax.set("pre_ctct_tlno1", _secretform_var.IMPTM_CTCT_TPN_1);
				ajax.set("pre_ctct_tlno2", _secretform_var.IMPTM_CTCT_TPN_2);
				ajax.set("pre_ctct_tlno3", _secretform_var.IMPTM_CTCT_TPN_3);

				ajax.execute(function(dat) {
					try{
						MobPopup.showAlertPopup("거래 오류시 통지 연락처가 [등록/변경] 되었습니다.","",function(){
							//_thisSForm.displayAllHide();
							//_thisSForm.com_SECRET_FORM();
						});

					} catch(e) {bizException(e, "com_utl_010101_0");}
				});
			} catch(e) {bizException(e, "com_utl_010101_0");}
		}
		//결재선조회 팝업
		, com_snt_010101_1 : {
			uf_in : function($jq, data) {
				data = _secretform_var.snctData;
				//W_RYMD              //등록년월일   yyyyMMdd
				//W_RGSN_HMS          //등록시분초   HH:mm:ss
				//W_BSWR_DSNC_CD      //업무구분코드
				return data;
			}
			, uf_out : function ($jq, data, index) {
				if(data["list"] && data["list"].length > 0) {
					$.each(data["list"], function(ii,v){
						if(v["EBK_EXST_SNCT_USER_ID"] && v["EBK_EXST_SNCT_USER_ID"] != "") {
							//v["SNCT_WRPX_NM"] = '<span class="badge small blue_line txt_middle mr5">원결재자</span>' + v["EBK_EXST_SNCT_USER_NM"] + "(" + v["EBK_EXST_SNCT_USER_ID"] + ")";
							v["SNCT_WRPX_NM"] =  v["EBK_EXST_SNCT_USER_NM"] + "(" + v["EBK_EXST_SNCT_USER_ID"] + ")";
						}
					});
				}
				var secretform_ul_snct_line = jex.getJexObj($("#secretform_ul_snct_line"), "JEX_MOBILE_LIST");
				secretform_ul_snct_line.setAll(data["list"]);
				$('#secretform_ul_snct_line li').each(function(){
					var dat = $(this).data('_JEX_GETALL_DATA_');
					if(dat["EBK_EXST_SNCT_USER_ID"] != ""){
						$(this).find('#SNCT_WRPX_NM_DIV').show();
					}
				});
				//jex.getJexObj($("#secretform_pop_snct_line"), "JEX_MOBILE_DIALOG").execute();
				comLayerPopUtil.open("secretform_pop_snct_line");

				return data;
			}
			, uf_exec : function () {
				
			}
		}
		//결재 처리
		, com_snt_020101_SNCT : {
			uf_in : function($jq, data) {
				data = _secretform_var.snctData;
					//W_RYMD              //등록년월일   yyyyMMdd
					//W_RGSN_HMS          //등록시분초   HH:mm:ss
					//W_BSWR_DSNC_CD      //업무구분코드
					//W_GRP_TCNT          //총건수
					//W_TRNS_TOT_AMT      //총금액
					//EBNK_SNCT_EXCN_SRN  //결재일련번호

				data = _secretform_var.thisSForm.makeSubmitDataFormSecretform(data);
					//이용자비밀번호 (이체비밀번호)
					//보안매체
				return data;
			}
			, uf_out : function ($jq, data, index) {
				//$("#secretform_snct_msg").text("결재처리완료");
				$("#secretform_snct_msg").html("결재를 실행했어요");
				
				comLottieUtil.play("secret_lottie_1");

				$("#secretform_btn_go_snct_list").on("click", function() {
					//2019.04.25 (결재함)결재대기 건 (결재, 승인, 반송)처리 후 화면연결 수정
					comUtil_goMenuSnctList("SNCT_END"); //결재/실행완료조회'화면으로 이동
				});

				return data;
			}
			, uf_exec : function () {
				uf_goStep(39);
			}
		}
		//반송 처리
		, com_snt_030101_SNBC : {
			uf_in : function($jq, data) {
				var $secretform_txt_SNBC_RSN = $("#secretform_txt_SNBC_RSN");

				if(MobUtil.isEmpty($secretform_txt_SNBC_RSN.val())) {
					MobPopup.showAlertPopup("반송사유를 입력해주세요.", null, function(){
						$secretform_txt_SNBC_RSN.focus();
					});
					return "ALLSTOP";
				}

				if(MobStringUtil.getByte($secretform_txt_SNBC_RSN.val()) > 30) {
					MobPopup.showAlertPopup("한글 15자, 영문 숫자 30자를 초과할수 없습니다.", null, function(){
						$secretform_txt_SNBC_RSN.focus();
					});
					return "ALLSTOP";
				}

				data = _secretform_var.snctData;
				//W_RYMD                       //등록년월일   yyyyMMdd
				//W_RGSN_HMS                   //등록시분초   HH:mm:ss
				//W_BSWR_DSNC_CD               //업무구분코드
				//W_GRP_TCNT                   //총건수
				//W_TRNS_TOT_AMT               //총금액
				//EBNK_SNCT_EXCN_SRN           //결재일련번호

				data["EBNK_SNCT_EXCN_SNBC_RSN_CON"] = $secretform_txt_SNBC_RSN.val(); //반송사유

				data = _secretform_var.thisSForm.makeSubmitDataFormSecretform(data);
				//이용자비밀번호 (이체비밀번호)
				//보안매체
				return data;
			}
			, uf_out : function ($jq, data, index) {
				//$("#secretform_snct_msg").text("반송처리완료");
				$("#secretform_snct_msg").html("반송을 실행했어요");
				
				$("#secretform_btn_go_snct_list").on("click", function() {
					//2019.04.25 (결재함)결재대기 건 (결재, 승인, 반송)처리 후 화면연결 수정
					comUtil_goMenuSnctList("SNCT_END"); //결재/실행완료조회'화면으로 이동
				});

				return data;
			}
			, uf_exec : function () {
				uf_goStep(39);
				comLottieUtil.play("secret_lottie_1");
			}
		}
		//FDS 탐지결과조회
		, com_utl_999999_1 : {
			uf_in : function($jq, data) {
				var req_data = {};

				if(!MobUtil.isEmpty(_secretform_var.fdsAcnList) && $.isArray(_secretform_var.fdsAcnList)) {
					req_data["ACN_LIST"] = _secretform_var.fdsAcnList; //FDS탐지 계좌번호목록
				}
				else {
					req_data["CUS_ACN"] = _secretform_var.fdsAcn; //FDS탐지 계좌번호
				}

				return req_data;
			}
			, uf_out : function($jq, data, index) {
				var fds_flag            = $.trim(data["FDS_FLAG"]);            //FDS 탐지결과(0:세션차단, 1:거래차단, 2:추가인증)
				var fds_cert_otp_use_yn = $.trim(data["FDS_CERT_OTP_USE_YN"]); //FDS OTP추가인증 사용여부
				var show_msg            = "";

				if(fds_flag == "0") { //세션차단
					show_msg = "요청하신 거래가 평소에 이용하신 거래 유형과 달라 고객님의 금융자산 보호를 위해 접속을 차단하였습니다.";
					MobPopup.showAlertPopup(show_msg, undefined, function() {
						$.nativeCall('logout');
					});
					return "STOP_SVC";
				}
				else if(fds_flag == "1") { //거래차단
					//show_msg = "금융자산 보호 및 안전한 거래를 위하여 요청하신 거래는 처리가 제한되었습니다.";
					//2018.12.11 FDS 거래차단시 안내문구 수정(해외고객센터 번호 추가)
					show_msg = "고객님! 금융자산보호 및 안전한 거래를 위하여 요청하신 거래는 처리가 제한되었습니다. 계속해서 해당 계좌의 정상적인 거래를 원하실 경우 고객센터(국내 1566-2566, 해외 82-31-888-8000) 또는 거래 영업점으로 문의하시기 바랍니다."; //2018.12.11
					MobPopup.showAlertPopup(show_msg, undefined, function() {
						uf_back();
					});
					return "STOP_SVC";
				}
				else if(fds_flag == "2") { //추가인증
					_secretform_var.parentObj.find("#secretform_W_TRAN_PWD").val("");
					_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").val("");

					var pluginAuthForm = jex.getJexObj(_secretform_var.parentObj.find("#comAuthForm"), "JEX_MOBILE_AUTHFORM");

					pluginAuthForm.initVar();

					_authform_var.isFdsAddtCrtc = true;                          //FDS 추가인증
					_authform_var.fdsCertOtpYn  = fds_cert_otp_use_yn;           //FDS OTP추가인증여부
					_authform_var.fdsMnrcUserNm = _secretform_var.fdsMnrcUserNm; //FDS ARS멘트 은행명
					_authform_var.fdsBankNm     = _secretform_var.fdsBankNm;     //FDS ARS멘트 은행명
					_authform_var.fdsTranAmt    = _secretform_var.fdsTranAmt;    //FDS ARS멘트 거래총금액
					_authform_var.fdsTranCnt    = _secretform_var.fdsTranCnt;    //FDS ARS멘트 거래총건수
					_authform_var.trSvc         = _secretform_var.fdsTrSvc;      //FDS ARS 목적 서비스
					_authform_var.bswrDscd      = _secretform_var.fdsBswrDscd;   //FDS ARS 목적 서비스에 대한 업무구분(멘트 내용)


					//jylee todo : 추가인증 알림 팝업 띄우지 않고 otp 키보트 호출시 추가인증 메세지 보여줄거
//					show_msg = "안전한 금융거래를 위해 추가인증절차를 진행 합니다.<br/><br/>아래 확인 버튼을 누르시어 거래를 계속하여 진행하시기 바랍니다.";
//					MobPopup.showAlertPopup(show_msg);
					
					
					//추가인증 폼
					pluginAuthForm.getAuthForm(function() {
						
						//console.log("test111");
						_authform_var.thisSForm.execAuth();
					});
					
					//jylee 필요 없다.
					//tobe는 추가인증(ars/otp)는 실행거래시 필요하면 바로 화면에 바텀시트로 거래 진행 후 바로 실행됨
					
					return "STOP_SVC";

				}
				
				return data; //정상
			}
			, uf_exec : function() {
				_secretform_var.fdsCheck = true;
				
				if(!_secretform_var.isExecuted) {
					_secretform_var.isExecuted = true; //중복클릭 방지
					_secretform_var.thisSForm.secret_execute();
				}
			}
		}
		//FDS 탐지결과조회
		, com_utl_999999_2 : {
			uf_in : function($jq, data) {
				return {};
			}
			, uf_out : function($jq, data, index) {
				var fds_flag            = $.trim(data["FDS_FLAG"]);            //FDS 탐지결과(0:세션차단, 1:거래차단, 2:추가인증)
				var fds_cert_otp_use_yn = $.trim(data["FDS_CERT_OTP_USE_YN"]); //FDS OTP추가인증 사용여부
				var show_msg            = "";

				if(fds_flag == "0") { //세션차단
					show_msg = "요청하신 거래가 평소에 이용하신 거래 유형과 달라 고객님의 금융자산 보호를 위해 접속을 차단하였습니다.";
					MobPopup.showAlertPopup(show_msg, undefined, function() {
						$.nativeCall('logout');
					});
					return "STOP_SVC";
				}
				else if(fds_flag == "1") { //거래차단
					//show_msg = "금융자산 보호 및 안전한 거래를 위하여 요청하신 거래는 처리가 제한되었습니다.";
					//2018.12.11 FDS 거래차단시 안내문구 수정(해외고객센터 번호 추가)
					show_msg = "고객님! 금융자산보호 및 안전한 거래를 위하여 요청하신 거래는 처리가 제한되었습니다. 계속해서 해당 계좌의 정상적인 거래를 원하실 경우 고객센터(국내 1566-2566, 해외 82-31-888-8000) 또는 거래 영업점으로 문의하시기 바랍니다."; //2018.12.11
					MobPopup.showAlertPopup(show_msg, undefined, function() {
						uf_back();
					});
					return "STOP_SVC";
				}
				else if(fds_flag == "2") { //추가인증
					var pluginAuthForm = jex.getJexObj(_secretform_var.parentObj.find("#comAuthForm"), "JEX_MOBILE_AUTHFORM");

					pluginAuthForm.initVar();

					_authform_var.isFdsAddtCrtc = true;                        //FDS 추가인증
					_authform_var.fdsCertOtpYn  = fds_cert_otp_use_yn;         //FDS OTP추가인증여부
					_authform_var.trSvc         = _secretform_var.fdsTrSvc;    //FDS ARS 목적 서비스
					_authform_var.bswrDscd      = _secretform_var.fdsBswrDscd; //FDS ARS 목적 서비스에 대한 업무구분(멘트 내용)

					/* 추가인증폼 load */
					pluginAuthForm.getAuthForm(function() {
						_authform_var.thisSForm.execAuth();
					});

					return "STOP_SVC";
				}

				return data;
			}
			, uf_exec : function() {
			}
		}
		, setSecretformVarVal : function(key, val) {
			try{
				_secretform_var[key] = val;
			} catch(e) {alert(e)}//임시
			
		}

	});
	
	jex.plugin.add("JEX_MOBILE_SECRETFORM", JexMobileSecretForm, "data-jx-secretform");
})();


/**
 * 보안매체 - 디지털 OTP(구 스마트 보안카드)
 */
var _secretFormDigitalOtp = new (Jex.extend({
	// 2017.05.16 디지털OTP(구 스마트보안카드) 추가
    // 디지털OTP(구 스마트보안카드) 활성화 요청
    makeSmartcardActive: function(callback, cancel_callback) {
    	
    	if (!_isRealApp) {
			if (callback) {
				return callback();
			}
		}
    	
    	var ajax = jex.createAjaxUtil(_secretform_var.isLogin === false ? 'svc_bnk_150601_2' : 'svc_bnk_150601_1'),
    		 $smrt_usr_no = $("#data-smrt-crd-h-usr-idnt-no"),
    		 jsonDat = {};

    	if ($smrt_usr_no.val()) {
    		ajax.set('H_USR_IDNT_NO', $smrt_usr_no.val());
    	}
    	
    	ajax.set('SERVICE_FUNC', '601'); // 서비스기능유형 : 활성화
    	ajax.set('ETIF_RMRK_CON', '기업은행 스마트뱅킹 거래를 위한 인증번호 생성');
    	ajax.set('task_package'   , 'svc');
    	ajax.set('task_subpackage', 'bnk');
    	ajax.setErrTrx(false);

		ajax.execute(function(dat) {
			var result = dat['_tran_res_data'][0],
			    undefined_err_msg = '디지털OTP 활성화 중 에러가 발생하였습니다.';

			if (!result || result['_is_error'] == 'true') {
				_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").val("").attr("realValue", "");
				
				MobPopup.showErrorPopup(result['_error_cd'], result['_error_msg'] || undefined_err_msg, cancel_callback);
				return false;
			} else {
				if (result['CD_GRP_DATA_CON']) {

					if (callback) {
						callback();
					}
				} else {
					MobPopup.showAlertPopup(undefined_err_msg, null, cancel_callback);
					return false;
				}
			}
		});
    }
}))();

/**
 * 보안매체 - 디지털 OTP(스마트 보안카드) 
 */
var _secretFormDigitalOtpInApp = new (Jex.extend({
	// 2022.05.09 스마트보안카드 인앱 초기화
	makeSmartcardInappInit: function(callback) {
		if (!_isRealApp) {
			complete_loading_ssc_form = true;
			return callback();
		}
		
		complete_loading_ssc_form = false;
		
		var loadParam = [];
		if(_secretform_var.usr_no == "" && _secretform_var.isLogin){
			comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
				_secretform_var.usr_no = this.cus_info["USR_NO"]; //이용자번호(현재로그인한);
				
				if(this.cus_info["INDV_CORP_DTL_DCD"] == "5"){
					loadParam = [_secretform_var.usr_no, "B"];
				}else{
					loadParam = [_secretform_var.usr_no, "E"];
				}
			});
		}else{
			var ajax = jex.createAjaxUtil("svc_bnk_150201_1");
			ajax.setAsync(false);
			ajax.set("task_package"   , "svc");
			ajax.set("task_subpackage", "bnk");
			ajax.set("usr_no", _secretform_var.usr_no);
			
			ajax.execute(function(dat) {
				loadParam = [_secretform_var.usr_no, dat["_tran_res_data"][0].SMAT_SCCD_SVC_DCD];
			});
		}
		
		// 1. 스마트보안카드 API 커넥션 10분 스타트
		ssc_native.call('sscLoad', loadParam, true, function() {
			
			//디지털OTP 온라인재등록(svc_bnk_150601_1)에서는 설정 변경 후 sscRequestCardStatus, sscGetSerialNo 스킵
			if(_secretform_var.skipCardStatusSerialNoHashAppUniq){

				// 3. 기기토큰 정보요청
				ssc_native.call('sscGetDeviceToken', [], true, function(dat1) {
					ssc_form_param.MCTL_TKN_NO = dat1 ? dat1.deviceToken : ''; // 기기 토큰 번호

					complete_loading_ssc_form = true;
					
					if (callback) {
						callback();
					}
				});
			}else{
				// 2. 스마트보안카드 상태확인
				ssc_native.call('sscRequestCardStatus', [], true, function() {
					// 3. 기기토큰 정보요청
					ssc_native.call('sscGetDeviceToken', [], true, function(dat1) {
						ssc_form_param.MCTL_TKN_NO = dat1 ? dat1.deviceToken : ''; // 기기 토큰 번호

						// 4. 앱검증정보 계산
						ssc_native.call('sscGetHashAppUniq', [], true, function(dat2) {
							ssc_form_param.VRFC_CON = dat2 ? dat2.hash : ''; // 앱검증정보

							// 5. 보안카드 일련번호 획득
							ssc_native.call('sscGetSerialNo', [], true, function(dat3) {
								ssc_form_param.ICCR_SRN = dat3 ? dat3.serial : ''; // 보안카드 일련번호
	
								complete_loading_ssc_form = true;
								
								if (callback) {
									callback();
								}
							});
						});
					});
				});
			}

		});

	},
	// 2022.05.09 스마트보안카드 인앱 활성화
	makeSmartcardInappActive: function(_key, callback) {
		if(_key && !_key.startsWith("#")){
			_key = "#"+_key;
		}
		var $smart_card_inapp_num = $(_key),
			secretform_W_OTP_OCRN_NO = $smart_card_inapp_num.attr('realValue'),
			tran_auth_num;
		
		if (!$smart_card_inapp_num.val()) {
			return !!MobPopup.showAlertPopup("[PIN 비밀번호]필수 입력 사항입니다.");
		}
		
		var ajax = jex.createAjaxUtil(_secretform_var.isLogin === false ? 'svc_bnk_150401_1' : 'svc_bnk_150501_1');
				
		ajax.set('task_package'   , 'svc');
		ajax.set('task_subpackage', 'bnk');
		ajax.set('SERVICE_FUNC'   , '606'); // 인앱 보안카드 활성화
		ajax.set('MCTL_TKN_NO'    , ssc_form_param.MCTL_TKN_NO); // 기기 토큰 번호
		ajax.set('VRFC_CON'       , ssc_form_param.VRFC_CON   ); // 앱검증정보
		ajax.set('ICCR_SRN'       , ssc_form_param.ICCR_SRN   ); // 보안카드 일련번호
		ajax.setErrTrx(false);
		
		// 1. 디지털OTP 활성화
		_secretFormDigitalOtp.makeSmartcardActive(function() {
			
			if (!_isRealApp) {
				if (callback) {
					return callback();
				}
			}
	
			// 2. 인앱  활성화
			ajax.execute(function(dat1) {
				var result = dat1['_tran_res_data'][0],
					undefined_err_msg = '디지털OTP 활성화 중 에러가 발생하였습니다.';

				if (!result || result['_is_error'] == 'true') {
					
//					$("#secretform_W_OTP_OCRN_NO").val("").attr("realValue", "");
					_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").val("").attr("realValue", "");
					
					MobPopup.showErrorPopup(result['_error_cd'], result['_error_msg'] || undefined_err_msg, _webViewExit);
					return false;
				} else {
					
					// 3. 기기토큰 정보요청
					ssc_native.call('sscRequestTranInfo', ['', secretform_W_OTP_OCRN_NO], false, function(dat2) {

						// 4. 인증번호 요청 (네이티브에서 인증번호 받아와 세팅)
						ssc_native.call('sscRequestTranAuthNum', [dat2.tranCode, secretform_W_OTP_OCRN_NO], false, function(dat3) {

							tran_auth_num = dat3.tranAuthNumStr; // 인증번호
							
							
							if (!tran_auth_num) {
								MobPopup.showAlertPopup("디지털OTP 인증번호 생성 중 오류가 발생하였습니다.");
								return false;
							}

//							$("#secretform_W_OTP_OCRN_NO").attr("realValue", tran_auth_num);	// 여러 js 소스 수정 피하기 위해 기존에 쓰는 otp_num에 smart_card_num 카피
							_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").attr("realValue", tran_auth_num);	// 여러 js 소스 수정 피하기 위해 기존에 쓰는 otp_num에 smart_card_num 카피
							
							if (callback) {
								callback();
							}
						});
					});
				}
			});
		}, function() {
			_webViewExit();
		});
	}
}))();

//보안매체 공통 유틸
var _secretFormUtil = new (Jex.extend({
	//2017.05.16 스마트보안카드 추가
	//마스킹
	uf_util_replace_at : function(str, idx_arr, replacement) {
		if (typeof str === 'undefined' || str === null
				|| str.length == 0) {
			return '';
		}
		for (var i = 0; i < idx_arr.length; i++) {
			var idx = idx_arr[i] - 1;

			if (str.length - 1 < idx) {
				continue;
			}
			str = str.substr(0, idx) + replacement
					+ str.substr(idx + replacement.length);
		}
		return str;
	},
    getEncriptData : function() {
    	var result = {};
//    	result["smart_card_inapp_num"] =$("#secretform_W_OTP_OCRN_NO").attr("realValue");
    	result["smart_card_inapp_num"] =_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").attr("realValue");
    	
    	return result;
    }
}))();

//2022.05.09 스마트보안키패드 인앱 추가
//네이티브 플러그인 호출 및 스마트보안카드 에러 처리
var ssc_native = {
		
	errs: {},

	call: function(func, param, will_exit, callback) {
		if (!_isRealApp) {
			return callback ? !callback() : true;
		}

		//디지털OTP 네이티브 호출방식 변경
		//asis - $.nativecall('sscRequestPinReg', [이용자번호, 사업자번호]
		//tobe - $.nativecall('digitalOTP', [{'type:'sscRequestPinReg', 'param1':'이용자번호, 'param2':'사업자번호}]
		var paramJson = {};
		paramJson["type"] = func;
		if(param != undefined && param.length > 0){
			for(var i=0; i<param.length; i++){
				paramJson["param"+(i+1)] = param[i];
			}
		}
		
		$.nativeCall("digitalOTP", [paramJson]).done(function(dat) {
			if (callback) {
				callback(dat);
			}
		}).fail(function(dat) {
			try {
				if (dat && typeof(dat) === 'string') {
					dat = JSON.parse(dat);
				} else {
					dat = {};
				}
			} catch(e) {
				return alert(e);
			}

			_secretform_var.isExecuted = false;
//			$("#secretform_W_OTP_OCRN_NO").val("");
			
			_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").val("");
			
			var err_msg = ssc_native.get_msg(dat.errorCode,
							dat.errorMessage, dat.failCount, dat.restCount);

			//
			comWebkey_getAppInfo(function() {
	        	var result = this;
	        	var appVer = $.trim(result.current_version).replace(/\./g, ""); //현재 버전
				
				//2023.02.23 디지털OTP 복수사업장 이용 관련 오류메시지 개선
				if(dat.errorCode == "2176") {
					//주메세지, title, [확인], [취소], 서브메세지
					MobPopup.showConfirmPopup(err_msg, "", function() {
						//[확인]
						comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //뱅킹관리 >디지털OTP > 발급/재발급 메뉴로 이동.
					}, function(){
						//[취소]
					}, "");
				} else if( _isIphone() && dat.errorCode == "6102" ){//디지털OTP개선을위한 error 추가
					
					var errMessage = '디지털OTP는 휴대폰 기기 교체 시 재발급이 필요하며, 해당기기에서만 이용 가능합니다.';
		
					MobPopup.showAlertPopup(errMessage, null, function(){
						comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //뱅킹관리 >디지털OTP > 발급/재발급
					});
					
				} else if( 
						( _isIphone() && dat.errorCode == "6202" ) || 
						( !_isIphone() && dat.errorCode == "4301" ) 
						){//디지털OTP개선을위한 error 추가
					
					if(_secretform_var.isLogin){
						
						var nativeDeviceId = "";
						var serverSavedDeviceId = "";
						
						ssc_native.call('sscGetDeviceToken', [], true, function(data) {

							nativeDeviceId = data.deviceToken.split("$")[3];
							
							var ajax = jex.createAjaxUtil("svc_bnk_150701_2");
							ajax.setAsync(false);
							ajax.set("task_package"   , "svc");
							ajax.set("task_subpackage", "bnk");
							ajax.set("usr_no", _secretform_var.usr_no);
							
							ajax.execute(function(dat) {
								serverSavedDeviceId = dat["_tran_res_data"][0].MCTL_U_ID;
							});
							
							var errMessage = "";
							
							if(nativeDeviceId == serverSavedDeviceId){
								if(_pathName.indexOf("svc_bnk_150601_1") < 0){
									errMessage = '<div class="alignL"><b>디지털OTP 온라인재등록 안내</b></div>'+
									'<br>'+
									'<div class="alignL">디지털OTP가 업데이트되어 온라인재등록이 필요합니다.</div>'+
									'<br>'+
									'<div class="alignL pl6"><b>· 업데이트 내용</b>'+
									'<br>'+
									'<div class="alignL pl15">여러개의 사업자를 가진 경우 사업자별로 디지털OTP를 발급하여 사용할 수 있도록 개선 </div>'+
									'<div class="alignL pl15">(기존 1개 사업자를 가진 경우에도 온라인재등록 후 기존처럼 사용)</div>';
									
									MobPopup.showAlertPopup(errMessage, null, function(){
										comWebkey_goMenu("5009", "svc_bnk_150601_1", ""); //뱅킹관리 >디지털OTP > 온라인재등록.
									});
								}
							}else{
								errMessage = '디지털OTP는 휴대폰 기기 교체 시 재발급이 필요하며, 해당기기에서만 이용 가능합니다.';
				
								MobPopup.showAlertPopup(errMessage, null, function(){
									comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //뱅킹관리 >디지털OTP > 발급/재발급
								});
							}
							
						});
						
					} else {  //비로그인
                        if (_secretform_var.ENBK_MNGR_YN == "Y") { // 관리자
                        	MobPopup.showAlertPopup("i-ONE뱅크(기업) 앱 버전 업데이트가 진행되어 최초 1회 디지털OTP 재발급이 필요합니다.", "안내", function(){
                               	comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //뱅킹관리 >디지털OTP > 발급/재발급
                            });

                        } else if (_secretform_var.ENBK_MNGR_YN == "N" || _secretform_var.ENBK_MNGR_YN == "S"){ // 이용자, 조회용이용자
                        	MobPopup.showAlertPopup("디지털OTP는 관리자만 이용이 가능합니다.", "안내", function(){ 
                        		_webViewExit();
                            });

                        } 
					}
				}else if(dat.errorCode == "2163") {
					//보유하고 계신 디지털OTP가 없습니다.<br>발급 받으시겠어요?
					MobPopup.showConfirmQckPopup(err_msg, "", function() {
						//발급/재발급
						comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //뱅킹관리 >디지털OTP > 발급/재발급 메뉴로 이동.
					}, function(){
						//나중에
						_webViewExit("moveHome");	//메인화면으로 이동
					}, "나중에", "발급/재발급");

				} else { //Default
					MobPopup.showAlertPopup(
						err_msg,
						null,
						function() {
							if (will_exit
									|| dat.errorCode === '1001') { // 세션타임아웃
								setTimeout(_webViewExit, 100)
							}
						}
					);
				}
			});
			//
			
		});
	},
	
	get_msg: function(err_cd, err_msg, fail_cnt, rest_cnt) {
		var err_cd = err_cd || '9999',
		    err = this.errs[err_cd + ''],
			err_msg = err_msg || '';

		if (typeof err === 'function') {
			err = err(fail_cnt, rest_cnt);
		}
		
		if (!err) {
			if (err_cd) {
				err_msg += '[' + err_cd + ']';
			}
			
			if (err_msg) {
				err_msg += '<br>';
			}
				
			err_msg += '정의되어 있지 않은 에러입니다.';
		} else {
			err_msg = err.err_msg + '[' + err_cd + ']';
		}

		return err_msg;
	}
};

(function() {
	var com_temp = {};

	com_temp.msg = {
		'1001': {
			title: '세션 만료',
			err_msg: '10분 동안 서비스를 이용하지 않아 자동 로그아웃 되었습니다. 홈 화면으로 이동 후 이용해 주세요.'
		},

		'1211': {
			title: '보안키패드 내부 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1212': {
			title: '보안키패드 헤더정보 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1213': {
			title: '보안키패드 입력값 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1214': {
			title: '보안키패드 출력값 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1215': {
			title: '보안키패드 복호화 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1216': {
			title: '보안키패드 입력값 파싱 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1217': {
			title: '보안키패드 해시값 불일치',
			err_msg: '보안키패드입력값검증중오류가발생했습니다.고객센터로문의해 주세요.'
		},

		'1218': {
			title: '보안키패드 입력값 길이 오류',
			err_msg: '보안키패드 입력값 검증 중 오류가 발생했습니다. 고객센터로 문의해 주세요.'
		},

		'1232': {
			title: '이용자정보 오류',
			err_msg: '해당 금융기관의 이용자정보가 올바르지 않습니다.'
		},

		'2101': {
			title: 'APIKEY 불일치',
			err_msg: '허용되지 않은 접근입니다.'
		},

		'2102': {
			title: '미등록 APIKEY',
			err_msg: '허용되지 않은 접근입니다.'
		},

		'2153': {
			title: '휴대전화번호 소유자 변경',
			err_msg: '고객님이 기존에 등록하신 휴대전화번호가 다른 고객님이 소유하신 번호로 확인되었습니다.'
		},

		'2154': {
			title: '휴대전화번호 변경',
			err_msg: '고객님의 변경 전 휴대전화번호로 접속하셨습니다.'
		},

		'2155': {
			title: '앱 고유정보 검증 실패',
			err_msg: '고객님의 디지털OTP 앱 고유정보 검증에 실패했습니다.'
		},

		'2156': {
			title: '디지털OTP PIN번호 복호화 실패',
			err_msg: '디지털OTP PIN번호 복호화에 실패하였습니다.'
		},

		'2157': {
			title: '디지털OTP PIN번호 길이 오류',
			err_msg: '디지털OTP PIN번호는 6자리의 숫자로 입력하세요.'
		},

		'2158': {
			title: '디지털OTP PIN번호 연속동일숫자 포함',
			err_msg: '4자리 이상 동일한 숫자는 디지털OTP<br>PIN번호로 사용할 수 없습니다.'
		},

		'2159': {
			title: '기기정보 불일치',
			err_msg: '디지털OTP 정보가 일치하지 않습니다. 디지털OTP 재발급 후 이용바랍니다.<br>경로 : 뱅킹관리 > 디지털OTP > 발급/재발급'
		},

		'2160': {
			title: '비정상 앱상태',
			err_msg: '고객님의 디지털OTP 앱이 현재 비정상 상태입니다.'
		},

		'2163': {
			title: '앱 정보 없음',
			err_msg: '보유하고 계신 디지털OTP가 없습니다.<br>발급 받으시겠어요?'
		},

		'2168': function(fail_cnt, rest_cnt) {
			var msg = 'PIN 비밀번호 ' + fail_cnt + '회 오류입니다. PIN 비밀번호 재등록을 원하시면 ' +
			          'i-ONE뱅크(기업) > 뱅킹관리 > 디지털OTP > PIN번호 재등록을 이용해주시기 바랍니다.';

			if (fail_cnt == 9) {
				msg = 'PIN 비밀번호 9회 오류입니다. ' +
				      '추가 오류 시 디지털OTP를 재발급 하셔야 합니다. 비밀번호 다시 등록하시려면 ' +
				      'i-ONE뱅크(기업) > 뱅킹관리 > 디지털OTP > PIN번호 재등록을 이용해주시기 바랍니다.';
			} else if (fail_cnt == 10) {
				msg = '2169 PIN 비밀번호 오류횟수 초과 상태입니다. ' +
				      'i-ONE뱅크(기업) > 뱅킹관리 > 디지털OTP > 발급/재발급 에서 디지털OTP를 재발급해주시기 바랍니다.';
			}

			return {
				title: '디지털OTP PIN번호 불일치',
				err_msg: msg
			};
		},

		'2169': {
			title: '디지털OTP PIN번호 입력오류 허용횟수 초과',
			err_msg: '고객님의 디지털OTP는 PIN비밀번호 오류 초과 상태입니다. ' +
			         'i-ONE뱅크(기업) > 뱅킹관리 > 디지털OTP > 발급/재발급 에서 디지털OTP를 재발급해주시기 바랍니다.'
		},

		'2170': {
			title: '디지털OTP PIN번호 해시값 없음',
			err_msg: '디지털OTP PIN번호 확인에 실패했습니다.'
		},

		'2171': {
			title: '디지털OTP PIN번호 검증정보 없음',
			err_msg: '디지털OTP PIN번호 검증에 실패했습니다.'
		},

		'2173': {
			title: '앱 비활성화 상태',
			err_msg: '디지털OTP 앱이 활성화되지 않았습니다.'
		},

		'2174': {
			title: '인증번호 생성허용시간 초과',
			err_msg: '인증번호 생성허용시간 10분을 초과하였습니다.'
		},

		'2175': {
			title: '거래시간 없음',
			err_msg: '요청하신 거래시간정보가 올바르지 않습니다.'
		},

		'2176': {
			title: '거래코드 없음',
//			err_msg: '인터넷뱅킹에서 요청한 거래가 없습니다.'	// as-is 요청하신 거래코드정보가 올바르지 않습니다.
			
			//2023.02.23 디지털OTP 복수사업장 이용 관련 오류메시지 개선
			err_msg: '현재 이용 가능한 디지털OTP정보가 없습니다. ' 
				+ '디지털OTP는 1개의 기기에서 1개의 사업장에만 연결하여 사용이 가능합니다. '
				+ '계속 이용을 원하시면 디지털OTP 발급/재발급메뉴로 이동하여 재발급 하시기 바랍니다. '
				+ '디지털OTP를 재발급하시겠습니까?'
		},

		'2177': {
			title: '거래검증정보 없음',
			err_msg: '요청하신 거래검증정보가 올바르지 않습니다.'
		},

		'2178': {
			title: '거래기관정보 없음',
			err_msg: '요청하신 거래기관정보가 올바르지 않습니다.'
		},

		'2179': {
			title: '거래정보 없음',
			err_msg: '요청하신 거래정보가 올바르지 않습니다.'
		},

		'2180': {
			title: '거래기관 불일치',
			err_msg: '요청하신 거래기관 정보가 일치하지 않습니다.'
		},

		'2181': {
			title: '거래코드 불일치',
			err_msg: '요청하신 거래코드 정보가 일치하지 않습니다.'
		},

		'2182': {
			title: '등록불가 앱상태',
			err_msg: '고객님의 디지털OTP 앱이 현재 등록 불가능한 상태입니다.'
		},

		'2183': {
			title: '인증번호 생성된 거래정보',
			err_msg: '이미 인증번호 생성이 완료된 거래정보입니다.'
		},

		'2185': {
			title: '가입해지 상태',
			err_msg: '현재 고객님은 가입해지 상태입니다.'
		},

		'2186': {
			title: '디지털OTP PIN번호 연속증가숫자 포함',
			err_msg: '4자리 이상 연속된 숫자는 디지털OTP<br>PIN번호로 사용할 수 없습니다.'
		},

		'2187': {
			title: '디지털OTP PIN번호 연속감소숫자 포함',
			err_msg: '4자리 이상 연속된 숫자는 디지털OTP<br>PIN번호로 사용할 수 없습니다.'
		},

		'2188': {
			title: '디지털OTP PIN번호 생일 포함',
			err_msg: '생년월일이 포함된 숫자는 디지털OTP<br>PIN번호로 사용할 수 없습니다.'
		},

		'2189': {
			title: '디지털OTP PIN번호 전화번호 끝자리 포함',
			err_msg: '전화번호가 포함된 숫자는 디지털OTP<br>PIN번호로 사용할 수 없습니다.'
		},

		'2221': {
			title: '이용자정보 없음',
			err_msg: '금융기관을 통해 등록하신 이용자정보를 찾을 수 없습니다.'
		},

		'2224': {
			title: '등록 이용자상태 아님',
			err_msg: '해당 금융기관에서 등록을 신청하신 상태가 아닙니다.'
		},

		'2225': {
			title: '등록 미완료 이용자상태',
			err_msg: '해당 금융기관에서 등록절차가 완료되지 않았습니다.'
		},

		'2226': function(fail_cnt, rest_cnt) {
			var msg = '앱등록코드가 일치하지 않습니다. 다시 시도해 주세요. (현재 ' + fail_cnt +
			          '회 오류, 잔여 ' + rest_cnt + '회)';

			if (fail_cnt == 4) {
				msg = '앱등록코드가 일치하지 않습니다. (현재 ' + fail_cnt + '회 오류, 잔여 ' + rest_cnt +
				      '회) 추가 오류 시 디지털OTP를 재발급하셔야 합니다.';
			} else if (fail_cnt == 5) {
				msg = '앱등록코드 ' + fail_cnt + '회 오류입니다. 디지털OTP를 다시 발급하세요.';
			}

			return {
				title: '앱등록코드 불일치',
				err_msg: msg
			};
		},

		'2228': {
			title: '앱등록코드 만료',
			err_msg: '앱등록코드가 만료되었습니다. 금융기관을 방문하여 다시 등록 신청 후 이용해 주세요.'
		},

		'2230': {
			title: '앱등록코드 입력오류 허용횟수 초과',
			err_msg: '앱등록코드 오류횟수 초과입니다. 디지털OTP를 다시 발급하세요.'
		},

		'2231': {
			title: '앱등록코드 없음',
			err_msg: '해당 금융기관의 등록정보가 올바르지 않습니다.'
		},

		'2233': {
			title: '비정상 이용자상태',
			err_msg: '해당 금융기관의 이용자정보가 비정상상태입니다.'
		},

		'2234': {
			title: '디지털OTP 일련번호 불일치',
			err_msg: '디지털OTP 일련번호가 일치하지 않습니다.'
		},

		'1999': {
			title: '알 수 없는 오류',
			err_msg: '디지털OTP 서비스 이용중 오류가 발생했습니다.'
		},

		'9999': {
			title: '알 수 없는 오류 (APP)',
			err_msg: '디지털OTP 서비스 이용중 오류가 발생했습니다.(APP)'
		}

	};

	com_temp.android = {
		'4013': {
			title: '단말기 앱 환경 오류',
			err_msg: '디지털OTP서비스는 통화가 가능한 기기에서만 이용가능합니다.(전화번호읽기실패)'
		},

		'4014': {
			title: '단말기 앱 환경 오류',
			err_msg: '디지털OTP서비스는 통화가 가능한 기기에서만 이용가능합니다.(기기정보읽기실패)'
		},

		'4015': {
			title: '단말기 앱 환경 오류',
			err_msg: '디지털OTP서비스는 통화가 가능한 기기에서만 이용가능합니다.(유심정보읽기실패)'
		},

		'4016': {
			title: '단말기 앱 환경 오류',
			err_msg: '기기정보관련 오류가 발생했습니다.'
		},

        '4019': {
            title: '고유정보(광고ID) 불일치',
            err_msg: '현재 디지털OTP 등록이 불가능합니다. 앱 재설치 후 이용해 주세요.'
        },

		'4101': {
			title: '메시지 처리 실패',
			err_msg: '공동이용센터와 통신 메시지의 필수정보가 누락되었습니다.'
		},

		'4102': {
			title: '메시지 처리 실패',
			err_msg: '메시지 구문처리에 실패 하였습니다.'
		},

		'4103': {
			title: '메시지 처리 실패',
			err_msg: '잘못된응답메시지타입입니다.'
		},

		'4201': {
			title: '네트워크 오류',
			err_msg: '서버 연결에 실패 하였습니다.'
		},

		'4202': {
			title: '네트워크 오류',
			err_msg: '서버연결에서 HTTPS 오류가 발생하였습니다.'
		},

		'4204': {
			title: '네트워크 오류',
			err_msg: '서버에 연결되지 않았습니다.'
		},

		'4301': {
			title: '데이터 처리 오류',
			err_msg: '디지털OTP 정보를 찾을 수 없습니다. i-ONE뱅크(기업) 앱을 재설치 하신 경우 ' + 
		         	 '확인 버튼을 눌러 온라인재등록을 진행해주시기 바랍니다. (단, 휴대폰 기기나 번호 변경 시 재발급 필요)'
		},

		'4303': {
			title: '데이터 처리 오류',
			err_msg: '앱내데이터읽기에실패했습니다.'
		},

		'4304': {
			title: '데이터 처리 오류',
			err_msg: '앱내 데이터 저장에 실패했습니다.'
		},

		'4305': {
			title: '데이터 처리 오류',
			err_msg: '앱내 데이터 삭제에 실패했습니다.'
		},

		'4401': {
			title: '세션 관리 오류',
			err_msg: '서버로부터 랜덤값(Nonce) 획득에 실패하였습니다. 재시도하세요.'
		}

	};

	com_temp.ios = {
		'6000': {
			title: '난수 생성 실패',
			err_msg: '난수 생성 실패'
		},

		'6001': {
			title: '암복호화 실패',
			err_msg: '암복호화 실패'
		},

		'6002': {
			title: '네트워크 통신 실패',
			err_msg: '네트워크 통신 실패'
		},

		'6003': {
			title: '메시지 형식 오류',
			err_msg: '메시지 형식 오류'
		},

		'6004': {
			title: '디지털OTP 일련번호 없음',
			err_msg: '디지털OTP 일련번호 없음'
		},

		'6006': {
			title: '거래내용 형식 오류',
			err_msg: '거래내용 형식 오류'
		},

		'6100': {
			title: '키체인 없음',
			err_msg: '키체인 없음'
		},

		'6101': {
			title: '키체인 상태 오류',
			err_msg: '키체인 상태 오류'
		},

		'6102': {
			title: '키체인 읽기 실패',
			err_msg: '키체인 읽기 실패'
		},

		'6103': {
			title: '키체인 쓰기 실패',
			err_msg: '키체인 쓰기 실패'
		},

		'6104': {
			title: '키체인 갱신 실패',
			err_msg: '키체인 갱신 실패'
		},

		'6105': {
			title: '키체인 삭제 실패',
			err_msg: '키체인 삭제 실패'
		},

		'6106': {
			title: '파일 읽기 실패',
			err_msg: '파일 읽기 실패'
		},

		'6107': {
			title: '파일 쓰기 실패',
			err_msg: '파일 쓰기 실패'
		},

		'6108': {
			title: '파일 삭제 실패',
			err_msg: '파일 삭제 실패'
		},

		'6200': {
			title: '카드 토큰 형식 오류',
			err_msg: '카드 토큰 형식 오류'
		},

		'6201': {
			title: '함수 인수 오류',
			err_msg: '함수 인수 오류'
		},

		'6202': {
			title: '내부 상태 오류',
			err_msg: '내부 상태 오류'
		}
	};

	if (_isIphone()) {
		$.extend(ssc_native.errs, com_temp.msg, com_temp.ios);
	} else {
		$.extend(ssc_native.errs, com_temp.msg, com_temp.android);
	}
})();


/**
 * 인증서제출 콜백함수  uf_signdata
 */
function secretform_signdata(signData){
	//인증서팝업 확인버튼 W클릭 방지
	if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
	else return;

	if(signData == "cancel" || signData == "CANCEL"){	//2013.07.18
		//인증서팝업 취소 button  click 시
		_secretform_var.isExecuted = false;	//W클릭 방지
		return;
	}
	else {	//정상
		_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(signData);
		//결재일경우
		if(_secretform_var.isSnct && _secretform_var.snctData["SNCT_ATHR_DCD"] == "01") {
			//결재처리
			jex.setJexObj($("#secretform_com_snt_020101_SNCT").attr("data-jx-svc-onload", "true"));
		} else {
			_secretform_var.parentThis.call_uf_submit(); 		//실행
		}
	}
}

/**
 * 금융인증서
 *    -안드로이드 적용된 앱 버전 : 2.4.2
 *    -iOS        적용된 앱 버전 : 2.2.8
 */
var FinCertCorpSdk = {
	fin_loadSdk : function() {
		if(!_isIphone()) {
			var reqData = {};
			reqData["isEnabled"] = true;
			$.nativeCall('setDomStorageEnabled',[reqData]).done(function (dat) {});
		}
		
		if(!document.getElementById("fincertCorpSdk")) {
			var scriptElem = document.createElement("script");
			if (_isDevMode) {
				scriptElem.src = "https://t-4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd"); //(금융인증서) TEST인 경우
			} else {
				scriptElem.src = "https://4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd");   //(금융인증서) REAL인 경우
			}
			scriptElem.id = "fincertCorpSdk";
				
			document.querySelector('body').appendChild(scriptElem);
			
			scriptElem.onerror = function() {
				MobPopup.showAlertPopup("금융결제원과의 통신에 실패하였습니다. 고객센터에 문의해주세요.", undefined, function () {
					comUtil_back(jex.plugin.get("JEX_MOBILE_STEP").getPrevStepNo()); //이전스텝으로 이동
				});
				return;
			};
			
			scriptElem.onload = function() {
				FinCertCorpSdk.init();
			}
		}
		else {
			FinCertCorpSdk.init();
		}
	},
	
	init : function() {
		FinCertCorp.Sdk.init({
			success : function() {
				//초기화가 성공적으로 종료되었을때 호출되는 함수
			},
			fail : function(err) {
				if("100008" == err.code) { // [100008] 이미 다른 금융인증SDK의 함수를 호출 중입니다.
					// (W클릭)중복호출시 SDK내부UI 중복로드 막기위함..
					// 다른 금융인증SDK의 함수의 성공, 실패 콜백을 받은 후 재호출을 수행한다.
				} else {
					MobPopup.showAlertPopup("초기화에 실패하였습니다.<br>" + err.message, undefined, function () {
						comUtil_back(jex.plugin.get("JEX_MOBILE_STEP").getPrevStepNo()); //이전스텝으로 이동
					}, "("+err.code+")");
				}
				return;
			},
			raIssueAppFunc : function() {
				comWebkey_goMenu("5005", "cmc_fin_010101_1", null);
			},
			orgCode : _secretform_var.orgCode,
			apiKey : _secretform_var.apiKey,
			clientOrigin : _secretform_var.appId,
			uniqVal : _secretform_var.deviceId,
			clientType : _secretform_var.deviceOS,
			cssUrls : ["/css/phone/cert1.css"]
		});
	},
	
	//금융인증서 전자서명
	fin_sign : function(signData, use_ibksignedtime_yn) {
		FinCertCorp.Sdk.sign({
			success : function(result) { //전자서명 완료시 최종적으로 호출되는 함수
				//인증서팝업 확인버튼 W클릭 방지
				if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
				else return;
				
				// 전자서명값을 Array 형태로 리턴 ==>> 타입 : String[]  
				// CMS Signed-Data 형식의 전자서명값을 Base64 url-safe로 인코딩 한 값
				var _cert_sign = comm2.base64.decode(result.signedVals[0]);
				
				//console.log("fin_cert_sign_msg [" + _cert_sign + "]");
				_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(_cert_sign);
				_secretform_var.parentThis.call_uf_submit(); //실행
			
			},
			fail : function(err) {
				//if(err.code == "800000") { //사용자가 금융인증서비스 창을 종료하였습니다.
				//	
				//} else {
				//	alert(err);
				//}
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
				signType : "02"
			},
			"content" : {
				"plainText" : {
					//전자서명을 수행할 원문으로, 다중 전자서명의 경우에는 각 전자서명의 원문 JSON을 Array에 포함시켜 파라미터로 전달
					"plainTexts" : [signData], 
					"encoding": 'EUC-KR'
					//"encoding": 'UTF-8'
				}
			},
			"view" : {
				//마지막에 사용한 인증서를 자동 선택하여 사용할지 여부
				"lastAccessCert" : true
			},
			"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"withoutContent" : false,
			"encoding" : "EUC-KR",
			//"encoding" : "UTF-8",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : (undefined != use_ibksignedtime_yn && "N" == use_ibksignedtime_yn) ? "" : "dummy", //B2B관련 일때는 공백으로..
					"withoutContent" : false
				},
				"type" : "CMS"
			}
		});
	},
	
	//비대면전자약정서'관련 전자서명 :: (PDF hash 전자서명)
	fin_sign2 : function(signData) {
		FinCertCorp.Sdk.sign({
			success : function(result) { //전자서명 완료시 최종적으로 호출되는 함수
				//인증서팝업 확인버튼 W클릭 방지
				if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
				else return;
				
				// 전자서명값을 Array 형태로 리턴 ==>> 타입 : String[]  
				// CMS Signed-Data 형식의 전자서명값을 Base64 url-safe로 인코딩 한 값
//				var res_list = [];
//				result.signedVals.forEach(function(element, index) {
//					var tmp_json = {};
//					tmp_json["signed_msg"] = FinCertCorpSdk.convertBase64UrlToBase64(element);          //Base64 url-safe -->> Base64  <<-- 단건만 가능한 구조..
//					//tmp_json["signed_msg"] = comm2.binaryToHex(comm2.decodeBase64Url(element)); //Base64 url-safe -->> hex (현 구조에 맞게 hex변환)
//					res_list.push(tmp_json);
//				});
				FinCertCorpSdk.convertBase64UrlToBase64(result.signedVals, function(res_list){
					_secretform_var.signed_msg_list = res_list;
					_secretform_var.parentThis.call_uf_submit(); //실행
				});
				
			},
			fail : function(err) {
				
			},
			info : {
				//사용자 전자서명 거래 종류
				signType : "06" //증명서발급
			},
			"content" : { 
				"hash" : { //messageDigest (PKCS #9) 항목이 포함되기 때문에 hash
					//전자서명을 수행할 원문 (Base64 url-safe 인코딩으로 수록)으로,
					// 다중 전자서명의 경우에는 각 전자서명의 원문 String을 Array에 포함시켜 파라미터로 전달
					"hashes" : signData, //[]
					"hashAlgorithm" : "SHA-256"
				}
			},
			"view": {
				"enableTextView":false,
				"enableTextViewAddInfo": {
					"nameExclusionRegExp":{}
				},
				"lastAccessCert" : true  //마지막에 사용한 인증서를 자동 선택하여 사용할지 여부
			},
			"algorithm" : "RSASSA-PKCS1-v1_5_SHA256",
			//"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : "dummy",
					"time" : g_getDate("yyyymmddHHmiss"), //YYYYMMDDHHmmSS 
					"withoutContent" : true,   //content로 'hash'를 사용하는 경우 반드시 'true'여야 함
					"includeR":true
				},
				"type" : "CMS" //pkcs #7 와 유사
			}
		});
	},
	
	// Base64 Url-safe to Base64
	convertBase64UrlToBase64 : function(params, callback) {
		var res_list = [];
		var tmp_list = [];
		
		var _toBase64 = function(value) {
			return new Promise(function (resolve, reject) {
				FinCertCorp.Sdk.convertBase64UrlToBase64({
					base64Url: value,
					success: function(result) {
						//console.log("convertBase64UrlToBase64 :: success : " + result.base64);
						resolve(result["base64"]);
					},
					fail: function(err) {
						console.log(err.code + " : " + err.message);
						MobPopup.showAlertPopup("인코딩 변환에 실패하였습니다.<br>" + err.message, undefined, function () {
						}, "("+err.code+")");
						return;
					}
				});
			});
		}
		
		params.forEach(function(element, index) {
			_toBase64(element).then(function (res_dat) {
				var tmp_item = {};
				tmp_item["SEQ"] = index;
				tmp_item["res_dat"] = res_dat;
				tmp_list.push(tmp_item);
				
				if(tmp_list.length == params.length) {
					tmp_list.sort(function(a, b) {
						return a["SEQ"] - b["SEQ"];
					});
					
					for(var idx = 0; idx < tmp_list.length; idx++) {
						res_list.push({"signed_msg":tmp_list[idx]["res_dat"]});
					}
					
					//callback.apply(res_list); //return data: this
					callback(res_list);
				}
			}).catch(function(err) {
				//console.log("catch:"+err);
			});
		});
		
	},
	
	// base64 to base64 url-safe
	convertBase64ToBase64UrlSafe : function(params, callback) {
		var res_list = [];
		var tmp_list = [];
		var _toBase64Url = function(value) {
			return new Promise(function (resolve, reject) {
				FinCertCorp.Sdk.convertBase64ToBase64Url({
					base64: value, // 변경하고자 하는 base64 문자열
					success: function(result) {
						//console.log("base64Url : " + result.base64Url);
						resolve(result.base64Url);
					},
					fail: function(err) {
						//console.log("fail:"+err);
						MobPopup.showAlertPopup("Base64 Url-safe 변환에 실패하였습니다.<br>" + err.message, undefined, function () {
							//reject(new Error("error_"+err.code));
						}, "("+err.code+")");
						return;
					}
				});
			});
		};
		params.forEach(function(element, index) {
			_toBase64Url(element).then(function (res_dat) {
				var tmp_item = {};
				tmp_item["SEQ"] = index;
				tmp_item["res_dat"] = res_dat;
				tmp_list.push(tmp_item);
				
				if(tmp_list.length == params.length) {
					tmp_list.sort(function(a, b) {
						return a["SEQ"] - b["SEQ"];
					});
					
					for(var idx = 0; idx < tmp_list.length; idx++) {
						res_list.push(tmp_list[idx]["res_dat"]);
					}
					
					//callback.apply(res_list); //return data: this
					callback(res_list);
				}
			}).catch(function(err) {
				//console.log("catch:"+err);
			});
		});
	},
	
	abort : function() {
		FinCertCorp.Sdk.abort({
			callback : function() {
				uf_goStep(1);
			}
		});
	}
};

var comm2 = {
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
	
	//hex to Base64
	, hexToBase64: function(hexstring) {
		return btoa(hexstring.match(/\w{2}/g).map(function(a) {
			return String.fromCharCode(parseInt(a, 16));
		}).join(""));
	}
	
	//hex to Bytes(binary)
	, hexToBytes: function(hex) {
		var rval = '';
		var i = 0;
		if(hex.length & 1 == 1) {
			// odd number of characters, convert first character alone
			i = 1;
			rval += String.fromCharCode(parseInt(hex[0], 16));
		}
		// convert 2 characters (1 byte) at a time
		for(; i < hex.length; i += 2) {
			rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return rval;
	}
	//binary to Base64
	, encodeBase64: function(binary) {
		return btoa(binary);
	}
	
	/**
	* @description BASE64URL 디코딩을 수행한다.
	* @param {string} str BASE64URL 인코딩된 문자열.
	* @returns {string} js binary string.
	*    Base64Url-safe -> binary string
	*/
	, decodeBase64Url: function(str) {
		function fromBase64Url(base64Url) {
			var base64Dec = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var padCount = (4 - (base64Dec.length % 4)) % 4;
			for (var i = padCount; i > 0; i--) {
				base64Dec += '=';
			}
			return base64Dec;
		}
		return atob(fromBase64Url(str));
	}
	/**
	* @description js binary string을 hexa 인코딩한다.
	* @param {string} str js binary string.
	* @returns {string} hex 인코딩된 문자열.
	*/
	, binaryToHex: function(bstr) {
		var rval = '';
		for(var i = 0; i < bstr.length; i++) {
			var b = bstr.charCodeAt(i);
			if(b < 16) {
				rval += '0';
			}
			rval += b.toString(16);
		}
		return rval;
	}
};

/**
 * @description 시스템에서 설정한 KEY(nma-plf-ver)로 OS버전 취득
 */
function get_nma_plf_ver() {
	var userAgent = navigator.userAgent.toLowerCase(),
	check = userAgent.match(/nma-plf-ver=([0-9\.]*)/);
	return check ? parseFloat(check[1]) : false;
}
 

var FinCertSdk = {
	fin_loadSdk : function(){
        
		if (_isAndroid()) {
			var reqData = {};
			reqData["isEnabled"] = true;
			$.nativeCall('setDomStorageEnabled',[reqData]).done(function (dat) {});
		}

		//$.nativeCall('showIndicator');
		nativeIndicator.show();

		if (!document.getElementById("fincertSdk")) {
			var scriptElem = document.createElement("script");
			if (_isDevMode) {
				scriptElem.src = "https://t-4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
			} else {
				scriptElem.src = "https://4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
			}
			scriptElem.id = "fincertSdk";

			document.querySelector('body').appendChild(scriptElem);

			scriptElem.onerror = function(){
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
								nativeIndicator.hide();
								return;
							}
						})
					});
				});
				return;
			};

			scriptElem.onload = function() {
				FinCertSdk.init(function() {
					nativeIndicator.hide();
				});
			}
		} else {
            FinCertSdk.init(function() {
            	nativeIndicator.hide();
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
			orgCode : _secretform_var.orgCode,
			apiKey : _secretform_var.apiKey,
			clientOrigin : _secretform_var.appId,
			uniqVal : _secretform_var.deviceId,
			clientType : _secretform_var.deviceOS,
			cssUrls : ["/css/phone/cert2.css"]
            //useAutoConnInfo : _this.useAutoConnInfo
		});
	},
	fin_sign : function(signData, use_ibksignedtime_yn){
        //uf_goStep(2);

		FinCert.Sdk.sign({
			success : function(result){
				//인증서팝업 확인버튼 W클릭 방지
				if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
				else return;
				
				// 전자서명값을 Array 형태로 리턴 ==>> 타입 : String[]  
				// CMS Signed-Data 형식의 전자서명값을 Base64 url-safe로 인코딩 한 값
				var _cert_sign = comm2.base64.decode(result.signedVals[0]);
				_secretform_var.parentObj.find("#secretform_cert_signed_msg").val(_cert_sign);
				_secretform_var.parentThis.call_uf_submit(); //실행
				
				
			},
			fail : function(err){
				if (String(err.code) == "800000") {
					uf_goStep(1);
				} else {
                    MobPopup.showErrorPopup(String(err.code), err.message, function() {
                        uf_goStep(1);
                    });
				}
			},
			info : {
				signType : "02"
			},
			"content" : {
				"plainText" : {
					//전자서명을 수행할 원문으로, 다중 전자서명의 경우에는 각 전자서명의 원문 JSON을 Array에 포함시켜 파라미터로 전달
					"plainTexts" : [signData], 
					"encoding": 'EUC-KR'
				}
			},
			"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"withoutContent" : false,
			"encoding" : "EUC-KR",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : (undefined != use_ibksignedtime_yn && "N" == use_ibksignedtime_yn) ? "" : "dummy", //B2B관련 일때는 공백으로..
					"withoutContent" : false
				},
				"type" : "CMS"
			}
		});
	},
	
	//비대면전자약정서'관련 전자서명 :: (PDF hash 전자서명)
	fin_sign2 : function(signData) {
		FinCert.Sdk.sign({
			success : function(result) { //전자서명 완료시 최종적으로 호출되는 함수
				//인증서팝업 확인버튼 W클릭 방지
				if(!_secretform_var.isCertSignExecuted) _secretform_var.isCertSignExecuted = true;
				else return;
				
				// 전자서명값을 Array 형태로 리턴 ==>> 타입 : String[]  
				// CMS Signed-Data 형식의 전자서명값을 Base64 url-safe로 인코딩 한 값
//				var res_list = [];
//				result.signedVals.forEach(function(element, index) {
//					var tmp_json = {};
//					tmp_json["signed_msg"] = FinCertCorpSdk.convertBase64UrlToBase64(element);          //Base64 url-safe -->> Base64  <<-- 단건만 가능한 구조..
//					//tmp_json["signed_msg"] = comm2.binaryToHex(comm2.decodeBase64Url(element)); //Base64 url-safe -->> hex (현 구조에 맞게 hex변환)
//					res_list.push(tmp_json);
//				});
				FinCertSdk.convertBase64UrlToBase64(result.signedVals, function(res_list){
					_secretform_var.signed_msg_list = res_list;
					_secretform_var.parentThis.call_uf_submit(); //실행
				});
				
			},
			fail : function(err) {
				
			},
			info : {
				//사용자 전자서명 거래 종류
				signType : "06" //증명서발급
			},
			"content" : { 
				"hash" : { //messageDigest (PKCS #9) 항목이 포함되기 때문에 hash
					//전자서명을 수행할 원문 (Base64 url-safe 인코딩으로 수록)으로,
					// 다중 전자서명의 경우에는 각 전자서명의 원문 String을 Array에 포함시켜 파라미터로 전달
					"hashes" : signData, //[]
					"hashAlgorithm" : "SHA-256"
				}
			},
			"view": {
				"enableTextView":false,
				"enableTextViewAddInfo": {
					"nameExclusionRegExp":{}
				},
				"lastAccessCert" : true  //마지막에 사용한 인증서를 자동 선택하여 사용할지 여부
			},
			"algorithm" : "RSASSA-PKCS1-v1_5_SHA256",
			//"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
			"signFormat" : {
				"CMSInfo" : {
					"ssn" : "dummy",
					"time" : g_getDate("yyyymmddHHmiss"), //YYYYMMDDHHmmSS 
					"withoutContent" : true,   //content로 'hash'를 사용하는 경우 반드시 'true'여야 함
					"includeR":true
				},
				"type" : "CMS" //pkcs #7 와 유사
			}
		});
	},
	
	convertBase64UrlToBase64 : function(params, callback) {
		var res_list = [];
		var tmp_list = [];
		
		var _toBase64 = function(value) {
			return new Promise(function (resolve, reject) {
				FinCert.Sdk.convertBase64UrlToBase64({
					base64Url: value,
					success: function(result) {
						//console.log("convertBase64UrlToBase64 :: success : " + result.base64);
						resolve(result["base64"]);
					},
					fail: function(err) {
						console.log(err.code + " : " + err.message);
						MobPopup.showAlertPopup("인코딩 변환에 실패하였습니다.<br>" + err.message, undefined, function () {
						}, "("+err.code+")");
						return;
					}
				});
			});
		}
		
		params.forEach(function(element, index) {
			_toBase64(element).then(function (res_dat) {
				var tmp_item = {};
				tmp_item["SEQ"] = index;
				tmp_item["res_dat"] = res_dat;
				tmp_list.push(tmp_item);
				
				if(tmp_list.length == params.length) {
					tmp_list.sort(function(a, b) {
						return a["SEQ"] - b["SEQ"];
					});
					
					for(var idx = 0; idx < tmp_list.length; idx++) {
						res_list.push({"signed_msg":tmp_list[idx]["res_dat"]});
					}
					
					//callback.apply(res_list); //return data: this
					callback(res_list);
				}
			}).catch(function(err) {
				//console.log("catch:"+err);
			});
		});
		
	},
	
	convertBase64ToBase64UrlSafe : function(params, callback) {
		var res_list = [];
		var tmp_list = [];
		var _toBase64Url = function(value) {
			return new Promise(function (resolve, reject) {
				FinCert.Sdk.convertBase64ToBase64Url({
					base64: value, // 변경하고자 하는 base64 문자열
					success: function(result) {
						//console.log("base64Url : " + result.base64Url);
						resolve(result.base64Url);
					},
					fail: function(err) {
						//console.log("fail:"+err);
						MobPopup.showAlertPopup("Base64 Url-safe 변환에 실패하였습니다.<br>" + err.message, undefined, function () {
							//reject(new Error("error_"+err.code));
						}, "("+err.code+")");
						return;
					}
				});
			});
		};
		params.forEach(function(element, index) {
			_toBase64Url(element).then(function (res_dat) {
				var tmp_item = {};
				tmp_item["SEQ"] = index;
				tmp_item["res_dat"] = res_dat;
				tmp_list.push(tmp_item);
				
				if(tmp_list.length == params.length) {
					tmp_list.sort(function(a, b) {
						return a["SEQ"] - b["SEQ"];
					});
					
					for(var idx = 0; idx < tmp_list.length; idx++) {
						res_list.push(tmp_list[idx]["res_dat"]);
					}
					
					//callback.apply(res_list); //return data: this
					callback(res_list);
				}
			}).catch(function(err) {
				//console.log("catch:"+err);
			});
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
				//console.log(error.code + " : " + error.message);
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
				FinCertSdk.getCertInfo(result.certificate);  
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
				//console.log("fincert abort");
				uf_goStep(1);
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

         FinCertSdk.makeAutoConnInfo().done(function(dat) {
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


function execAcntPwd(parentId) {
    var deferred = $.Deferred();
    if(_secretform_var.isUseDrotAcntPwd) {
    	var parentId = _secretform_var.parentObj.attr("id");
    	
    	_callXecureKeypad_withCallback(parentId + ' #secretform_DROT_ACNT_PWD', '1', '4', '4', '계좌비밀번호 4자리', null, 'Y',null,null, function(){
    		if(this._iweb_key[0]._errcode == "0000") {
    			deferred.resolve();
    		}
    		else {
    			deferred.reject();
    		}
	    });
    	
    	
    } else if(_secretform_var.isUseCardPwd) {
    	var parentId = _secretform_var.parentObj.attr("id");
    	_callXecureKeypad_withCallback(parentId + ' #secretform_CARD_PWD', '1', '4', '4', '카드비밀번호 4자리', null, 'Y',null,null, function(){
    		if(this._iweb_key[0]._errcode == "0000") {
    			deferred.resolve();
    		}
    		else {
    			deferred.reject();
    		}
	    });
    } else {
    	setTimeout(function() {deferred.resolve()},100);
    }

    return deferred.promise();
}


function execSecuMedia() {
    var deferred = $.Deferred();

    if(_secretform_var.isUseSecuMedia) {
        if(_secretform_var.autho_sc == "O"){		//OTP카드
            /**
            if(_secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO").val().length != 6){
                MobPopup.showAlertPopup("[OTP발생번호]필수 입력 사항입니다.");
                _secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
                _secretform_var.isExcuteSNBC = false; //반송실행 여부
                return false;
            }
            **/
            //jylee otp 폼 hidden 처리 후 실행 시 보안키패드 실행
            var parentId = _secretform_var.parentObj.attr("id");
        
            _callXecureKeypad_withCallback(parentId + ' #secretform_W_OTP_OCRN_NO', '1', '6', '6', 'OTP발생번호 6자리', null, _secretform_var.isLogin, null, null,function() {
            	//console.log("data");
            	if(this._iweb_key[0]._errcode == "0000") {
        			deferred.resolve();
        		}
        		else {
        			_secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
                    _secretform_var.isExcuteSNBC = false; //반송실행 여부
        			deferred.reject();
        		}
            });
            //console.log("otp 입력창 호출1");
        } 
        else if(_secretform_var.autho_sc == "B"){	//디지털OTP카드
            var $smart_card_inapp_num = _secretform_var.parentObj.find("#secretform_W_OTP_OCRN_NO");

            //jylee todo : reject 로 넘겨서 상위에서 처리하는것으로 변경
            if (!complete_loading_ssc_form) {
                return !!MobPopup.showAlertPopup(
//		    					"디지털OTP 입력폼 로딩 중 오류가 발생했습니다.",
                    "디지털OTP 발급(재발급)이 필요하여 디지털OTP 발급 메뉴로 이동합니다.",
                    null,
                    function() {
//		    						setTimeout(_webViewExit, 100);
                        setTimeout(function(){
                        	comWebkey_goMenu("5009", "svc_bnk_150301_1", ""); //디지털OTP 발급/재발급
                        }, 100);
                    }
                );
            /**	
            } else if (!$smart_card_inapp_num.val()) {
                MobPopup.showAlertPopup("[PIN 비밀번호]필수 입력 사항입니다.")
                _secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
                _secretform_var.isExcuteSNBC = false; //반송실행 여부
                return false;
            } 
            **/
            //jylee otp 폼 hidden 처리 후 실행 시 보안키패드 실행
            } else {
                var parentId = _secretform_var.parentObj.attr("id");
                _callXecureKeypad_withCallback(parentId + ' #secretform_W_OTP_OCRN_NO', '1', '6', '6', '디지털OTP PIN번호 6자리', null, _secretform_var.isLogin, null, null, function() {
                	if(this._iweb_key[0]._errcode == "0000") {
                		//console.log("디지털OTP 입력 완료!!");
            			deferred.resolve();
            		}
            		else {
            			deferred.reject();
            		}
                }, 'ssc'); //디지털OTP카드 보안키패드 적용
            }
        }
        else {
        	//jylee todo : reject 로 넘겨서 상위에서 처리하는것으로 변경
            MobPopup.showAlertPopup("사용할 수 없는 보안매체 입니다.");
            _secretform_var.isExecuted = false;//중복클릭 방지를 풀어 줌
            _secretform_var.isExcuteSNBC = false; //반송실행 여부
            return false;
        }
    } else {
    	setTimeout(function() {deferred.resolve()},500);
    }

    return deferred.promise();
}

function checkDOtpComplit() {
	
}