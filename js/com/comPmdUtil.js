/**
 * @description 공공마이데이터 표준API연계
 * 공공마이데이터 API 후처리 로직은 각 화면에서 진행 : 화면마다 후처리 로직 다를 수 있음
 * 
 * 사용목적코드( 000 해당없음, 001 전송요구권, 002 신용평가가점부여, 011 여신-신용대출, 012 여신-담보대출, 013 여신-보험계약대출, 019 여신-여신기타, 021 수신-예적금, 022 수신-송금, 023 수신-퇴직연금, 024	 수신-중도인출, 025 수신-지급, 029 수신-수신기타, 031 카드-신용카드발급, 032 카드-체크카드발급, 033 카드-한도심사, 039 카드-카드기타, 041 보험-상품가입및계약체결, 042 보험-보험금지급심사, 049 보험-보험기타, 051 증권-증권계좌개설및연장, 059 증권-증권기타, 060 리스, 070 할부금융, 999 기타 )
 * 신청자구분코드( 01 개인, 02 기업 )
 * 소득금액증명코드( B1010 연말정산한 사업소득, B1013 근로소득, B1001 종합소득세신고자용, B1018 연말정산한 연금소득자용, B1020 연말정산한 종교인소득자용 )
 * 
 */

var comPmdUtil = {
	/**
	 * @description 공공마이데이터 여신 사업자정보 확인, 여신 개인자산 확인, 여신 납세현황 확인 데이터세트 조회
	 * 여신 사업자정보 확인(MDS0001621)
	 * 여신 개인자산 확인(MDS0001760)
	 * 여신 납세현황 확인(MDS0001742)
	 * @param PBMD_DTST_USOB_CD : 사용목적코드 ( 000 해당없음, 001 전송요구권, 002 신용평가가점부여, 011 여신-신용대출, 012 여신-담보대출, 013 여신-보험계약대출, 019 여신-여신기타
	 * 021 수신-예적금, 022 수신-송금, 023 수신-퇴직연금, 024	 수신-중도인출, 025 수신-지급, 029 수신-수신기타, 031 카드-신용카드발급, 032 카드-체크카드발급, 033 카드-한도심사, 039 카드-카드기타
	 * 041 보험-상품가입및계약체결, 042 보험-보험금지급심사, 049 보험-보험기타, 051 증권-증권계좌개설및연장, 059 증권-증권기타, 060 리스, 070 할부금융, 999 기타 )
	 * @param PBMD_INCM_AMT_PRF_DCD : 소득금액증명코드 ( B1010 연말정산한 사업소득, B1013 근로소득, B1001 종합소득세신고자용, B1018 연말정산한 연금소득자용, B1020 연말정산한 종교인소득자용 )
	 * @param TXTN_STTG_YY : 과세시작년 ( yyyy )
	 * @param TXTN_FNSH_YY : 과세종료년 ( yyyy )
	 * @param APCT_DCD_VL  : 신청자구분코드 ( 01 개인, 02 기업 )
	 */
	getLonBsnnIndvAstPytxInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010202_2', params, scb, fcb);
	},

	/**
	 * @description 공공마이데이터 여신 사업자정보 확인 데이터세트 조회
	 * 여신 사업자정보 확인 데이터세트(MDS0001621)
	 * @param PBMD_DTST_USOB_CD : 사용목적코드 ( 000 해당없음, 001 전송요구권, 002 신용평가가점부여, 011 여신-신용대출, 012 여신-담보대출, 013 여신-보험계약대출, 019 여신-여신기타
	 * 021 수신-예적금, 022 수신-송금, 023 수신-퇴직연금, 024	 수신-중도인출, 025 수신-지급, 029 수신-수신기타, 031 카드-신용카드발급, 032 카드-체크카드발급, 033 카드-한도심사, 039 카드-카드기타
	 * 041 보험-상품가입및계약체결, 042 보험-보험금지급심사, 049 보험-보험기타, 051 증권-증권계좌개설및연장, 059 증권-증권기타, 060 리스, 070 할부금융, 999 기타 )
	 */
	getLonBsnnInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010202_1', params, scb, fcb);
	},

	/**
	 * @description 공공마이데이터 여신 개인자산
	 * 여신 개인자산 확인(MDS0001760)
	 * @param PBMD_DTST_USOB_CD : 사용목적코드 ( 000 해당없음, 001 전송요구권, 002 신용평가가점부여, 011 여신-신용대출, 012 여신-담보대출, 013 여신-보험계약대출, 019 여신-여신기타
	 * 021 수신-예적금, 022 수신-송금, 023 수신-퇴직연금, 024	 수신-중도인출, 025 수신-지급, 029 수신-수신기타, 031 카드-신용카드발급, 032 카드-체크카드발급, 033 카드-한도심사, 039 카드-카드기타
	 * 041 보험-상품가입및계약체결, 042 보험-보험금지급심사, 049 보험-보험기타, 051 증권-증권계좌개설및연장, 059 증권-증권기타, 060 리스, 070 할부금융, 999 기타 )
	 * @param PBMD_INCM_AMT_PRF_DCD : 소득금액증명코드 ( B1010 연말정산한 사업소득, B1013 근로소득, B1001 종합소득세신고자용, B1018 연말정산한 연금소득자용, B1020 연말정산한 종교인소득자용 )
	 * @param TXTN_STTG_YY : 과세시작년 ( yyyy )
	 * @param TXTN_FNSH_YY : 과세종료년 ( yyyy )
	 */
	getLonIndvAstInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010203_1', params, scb, fcb);
	},

	/**
	 * @description 공공마이데이터 여신 납세현황
	 * 여신 납세현황 확인(MDS0001742)
	 * @param PBMD_DTST_USOB_CD : 사용목적코드 ( 000 해당없음, 001 전송요구권, 002 신용평가가점부여, 011 여신-신용대출, 012 여신-담보대출, 013 여신-보험계약대출, 019 여신-여신기타
	 * 021 수신-예적금, 022 수신-송금, 023 수신-퇴직연금, 024	 수신-중도인출, 025 수신-지급, 029 수신-수신기타, 031 카드-신용카드발급, 032 카드-체크카드발급, 033 카드-한도심사, 039 카드-카드기타
	 * 041 보험-상품가입및계약체결, 042 보험-보험금지급심사, 049 보험-보험기타, 051 증권-증권계좌개설및연장, 059 증권-증권기타, 060 리스, 070 할부금융, 999 기타 )
	 * @param APCT_DCD_VL  : 신청자구분코드 ( 01 개인, 02 기업 )
	 */
	getLonPytxInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010209_1', params, scb, fcb);
	},

	/**
	 * @description 공공마이데이터 신표준산업분류코드(업종코드) 조회
	 * 신표준산업분류코드(업종코드) 조회
	 */
	getSicLrcd : function(scb, fcb) {
		this.createAjaxUtil('com_pmd_010901_1', null, scb, fcb);
	},
	
	/**
	 * @description 개인용 인증서 연동 서비스 가입을 위한 검증용 정보조회
	 * 휴폐업 여부 조회
	 * 공동대표 여부 조회
	 * 대표자 정보 불일치 여부 조회
	 * @param 확인중
	 * @author 박성권(seton3@naver.com)
	 * @since 2024-07-10
	 */
	getIdcfVrfc : function(param, scb, call_run_scraping) {
		this.createAjaxUtil(param.service, param, scb, call_run_scraping);
	},

	/**********************************************************************************/

	/*
	 * 공공마이데이터 여신 본인정보 확인
	 * 
	 */
	// getCom_pmd_010210_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"          : "" //주민등록표등·초본(L001)
	// 		,"PBMD_DTST_USOB_CD" : "" //사용목적코드
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010210_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 사업자정보 확인
	 * 
	 */
	// getCom_pmd_010211_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"          : "" //사업자등록증명(L022), 폐업사실증명(L023), 휴업사실증명(L024)
	// 		,"PBMD_DTST_USOB_CD" : "" //사용목적코드
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010211_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 우대사항 확인
	 * 
	 */
	// getCom_pmd_010212_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"          : "" //납세사실증명(L070)
	// 		,"PBMD_DTST_USOB_CD" : "" //사용목적코드
	// 		,"TICD"              : "" //세목코드
	// 		,"TXTN_STTG_YY"      : "" //과세시작년
	// 		,"TXTN_STTG_MM"      : "" //과세시작월
	// 		,"TXTN_FNSH_YY"      : "" //과세종료년
	// 		,"TXTN_FNSH_MM"      : "" //과세종료월
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010212_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 개인자산 확인
	 * 
	 */
	// getCom_pmd_010213_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"              : "" //소득금액증명(L005)
	// 		,"PBMD_DTST_USOB_CD"     : "" //사용목적코드
	// 		//소득금액증명(L005)
	// 		,"TXTN_STTG_YY"          : "" //과세시작년
	// 		,"TXTN_FNSH_YY"          : "" //과세종료년
	// 		,"PBMD_INCM_AMT_PRF_DCD" : "B1001" //공공마이데이터소득금액증명구분코드
	// 		,"APLC_RVRN_YY"          : "" //신청귀속년
	// 		,"CRIC_APLC_INCM_DCD"    : "" //증명서발급신청소득구분코드(30 : 부동산임대소득 40 : 사업소득)
	// 		,"BANK_NM"               : "" //은행명
	// 		,"DPSR_NM"               : "" //예금주명
	// 		,"ACN"                   : "" //계좌번호
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010213_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 법인자산 확인
	 * 
	 */
	// getCom_pmd_010214_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"          : "" //부가가치세과세표준증명(L025), 부가가치세면세사업자수입금액증명(L028)
	// 		,"PBMD_DTST_USOB_CD" : "" //사용목적코드
	// 		,"OPBS_YMD"          : "" //개업년월일
	// 		//부가가치세과세표준증명(L025)
	// 		,"INSG_YM_1"         : "" //조회시작년월
	// 		,"INQ_FNSH_YM_1"     : "" //조회종료년월
	// 		//부가가치세면세사업자수입금액증명(L028)
	// 		,"TXTN_STTG_YY_2"    : "" //과세시작년
	// 		,"TXTN_FNSH_YY_2"    : "" //과세종료년
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010214_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 연금및보험확인 건강보험A
	 * 
	 */
	// getCom_pmd_010215_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"          : "" //건강보험자격득실확인서(L006)
	// 		,"PBMD_DTST_USOB_CD" : "" //사용목적코드
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010215_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 연금및보험확인 건강보험B
	 * 
	 */
	// getCom_pmd_010216_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"                 : "" //건강장기요양보험료납부확인서_지역가입자(L008), 건강장기요양보험료납부확인서_직장가입자(L010)
	// 		,"PBMD_DTST_USOB_CD"        : "" //사용목적코드
	// 		,"INQ_YY"                   : "" //조회년
	// 		,"HIFEE_PMNT_NTCF_BSWR_DCD" : "" //건강보험료납부확인서업무구분코드
	// 		,"HIFEE_PMNT_NTCF_INSN_DCD" : "" //건강보험료납부확인서보험구분코드
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010216_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 연금및보험확인 연금
	 * 
	 */
	// getCom_pmd_010217_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"              : "" //공무원연금내역서(L033)
	// 		,"PBMD_DTST_USOB_CD"     : "" //사용목적코드
	// 		,"GNPN_DTSM_OTPT_RNG_CD" : "" //공무원연금내역서출력범위코드
	// 		,"INSG_YY"               : "" //조회시작년
	// 		,"INQ_FNSH_YY"           : "" //조회종료년
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010217_1', sendData, scb, fcb);
	// },

	/*
	 * 공공마이데이터 여신 연금및보험확인 증명서
	 * 
	 */
	getCom_pmd_010218_1 : function(params, scb, fcb){
		var sendData = {
			 "DOC_TYPE"          : ""  //사대사회보험료완납증명서(L031)
			,"PBMD_DTST_USOB_CD" : ""  //사용목적코드
			,"INDV_BSNN_DCD"     : "5" //개인사업자구분코드
		};
		$.extend(sendData, params);
		this.createAjaxUtil('com_pmd_010218_1', sendData, scb, fcb);
	},
	
	/**
	 * @description 비대면계좌개설 공공마이데이터 사업자등록증명, 휴폐업사실증명 데이터세트 조회
	 * 수신 사업자정보조회 (MDS0000747)[비로그인]
	 * @param BZN : 사업자번호
	 * @param BZN1 : 사업자번호1
	 * @param BZN2 : 사업자번호2
	 * @param BZN3 : 사업자번호3
	 * @param RNN : 실명번호
	 * @param CI_FILE_NM : CI값
	 */
	getNofcAnopInfo1 : function(params, scb, fcb) {
		this.createAjaxUtil('com_nff_010102_1', params, scb, fcb);
	},
	
	/**
	 * @description 계좌개설 및 전자금융가입(사업자정보 확인, 법인자산 확인)
	 * 수신 사업자정보조회 (MDS0000778)[비로그인]
	 * @param RNN : 실명번호
	 * @param CI_FILE_NM : CI값
	 * @param BZN : 사업자번호
	 * @param OPBS_YMD_1 : 개업년월일
	 * @param INSG_YM_1 : 조회시작년월 = 개업년월
	 * @param INQ_FNSH_YM_1 : 조회종료년월 = 현재년월
	 * @param TXTN_STTG_YY_2 : 조회종료년월 = 현재년월
	 * @param TXTN_FNSH_YY_2 : 조회종료년월 = 현재년월
	 */
	getNofcAnopInfo2 : function(params, scb, fcb) {
		this.createAjaxUtil('com_nff_010102_2', params, scb, fcb);
	},
	

	/**
	 * @description 외환계좌개설(사업자정보 확인)
	 * 수신 MDS0000747(사업자정보조회)
	 */
	getFxmAnopInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010102_1', params, scb, fcb);
	},	

	/**
	 * @description OTP이용자추가(사업자정보 확인)
	 * 수신 MDS0000747(사업자정보조회)
	 */
	getUserAddAnopInfo : function(params, scb, fcb) {
		this.createAjaxUtil('svc_bnk_280102_1', params, scb, fcb);
	},
	
	/**
	 * @description  제신고 (사업자정보 확인)
	 * 수신 MDS0000747(사업자정보조회)[비로그인]
	 */
	getUserInfoManagementDepositBizInfo : function(params, scb, fcb) {
		this.createAjaxUtil('com_pmd_010401_1', params, scb, fcb);
	},
	/*
	 * 공공마이데이터 여신 납세현황 확인
	 * 
	 */
	// getCom_pmd_010219_1 : function(params, scb, fcb){
	// 	var sendData = {
	// 		 "DOC_TYPE"           : "" //국세납세증명서(L021), 지방세납세증명서(L014), 지방세세목별과세납세증명서_재산세(L002)
	// 		,"PBMD_DTST_USOB_CD"  : "" //사용목적코드
	// 		,"APCT_DCD_VL"        : "" //신청자구분코드값
	// 		//국세납세증명서(L021)
	// 		,"IDN_NO_DCD"         : "" //식별자번호구분코드
	// 		,"IDNT_NO"            : "" //식별번호
	// 		//지방세납세증명서(L014)
	// 		,"FRGN_RTN"           : "" //외국인등록번호
	// 		,"IDNT_NO1"           : "" //식별번호
	// 		//지방세세목별과세납세증명서_재산세(L002)
	// 		,"STTG_YY"            : "" //시작년
	// 		,"FNSH_YY"            : "" //종료년
	// 		,"ADMN_STND_ICD"      : "" //행정표준기관코드
	// 		,"BLNG_INTT_NM"       : "" //소속기관명
	// 	};
	// 	$.extend(sendData, params);
	// 	this.createAjaxUtil('com_pmd_010219_1', sendData, scb, fcb);
	// },
	isRetry: false,
	retryCnt: false,
	failStep: 119,
	/**
	 * @description 공공마이데이터 조회 ajax 처리
	 */
	createAjaxUtil : function(id, params, scb, fcb){
		comPmdUtil.isRetry = false;
		comPmdUtil.retryCnt = 0;
		//id 필수입력 검증
		if(isEmpty(id)) return;

		var ajax = new ajaxComUtil(id); //서비스아이디

		var idArr = id.split('_');
		ajax.set("task_package", idArr[0]);
		ajax.set("task_subpackage", idArr[1]);
		
		//공통 에러처리 x
		ajax.errorTrx = false;
		
		//params 세팅
		if(isEmpty(params)) params = {};
		if(typeof params == 'object' && Object.keys(params).length > 0){
			for(var i=0; i<Object.keys(params).length; i++){
				var objKey = Object.keys(params)[i];
				ajax.set(objKey, params[objKey]);
			}
		}
		
		comPmdUtil.drawPmdStep();
		comPmdUtil.overrideUfBack();
		
		$.nativeCall("showLoading", [{"type" : "1", "message" : "정보를 가져오는 중입니다.\n잠시만 기다려 주세요", "time_out": 180 }]);
		//결과값 처리
		ajax.execute(function(dat) {
			if(comPmdUtil.isRetry){
				comPmdUtil.retryCnt++;
			}
			var result_data = dat["_tran_res_data"][0];
			if(result_data["_is_error"] != "true"){
				//성공
				$.nativeCall("hideLoading", [{}]);
				scb(result_data);
			}
			else{
				//실패
				$.nativeCall("hideLoading", [{}]);
				comPmdUtil.failResult(fcb, result_data, ajax);
			}
		});
	},
	drawPmdStep : function(){
		$.get('../../com/pmdform.html').done(function(dat) {
			var $pmdform_html = $(dat);
			if($("#step"+comPmdUtil.failStep).length == 0) {
				$("#step").append($pmdform_html.find("#step"+comPmdUtil.failStep));
				jex.setJexObj($("#step"+comPmdUtil.failStep));
			}
			if($("#over_retry_popup").length == 0) {
				$("#step").append($pmdform_html.find("#over_retry_popup"));
				jex.setJexObj($("#over_retry_popup"));
			}
		});
	},
	failResult : function (fcb, result_data, ajax) {
		if(!comPmdUtil.isRetry){
			comPmdUtil.isRetry = true;
		}
		
		$("#step"+comPmdUtil.failStep).find("#bottom_btn_div").removeClass("ty1 ty5");
		if(!isEmpty(fcb) && typeof fcb == 'function'){
			$("#step"+comPmdUtil.failStep).find("#bottom_btn_div").addClass("ty5");
			$("#step"+comPmdUtil.failStep).find("#bottom_btn_area_div").addClass("ty2");
			$("#step"+comPmdUtil.failStep).find("#btn_go_scraping").show();
			$("#step"+comPmdUtil.failStep).find(".note_cmt").show();
		}else{
			$("#step"+comPmdUtil.failStep).find("#bottom_btn_div").addClass("ty1");
			$("#step"+comPmdUtil.failStep).find("#bottom_btn_area_div").removeClass("ty2");
			$("#step"+comPmdUtil.failStep).find("#btn_go_scraping").hide();
			$("#step"+comPmdUtil.failStep).find(".note_cmt").hide();
		}
		
		
		var errorCd = result_data["_error_cd"] ? result_data["_error_cd"] : "";
		var errorMsg = result_data["_error_msg"] ? result_data["_error_msg"] : "";
		$("#pmd_error_code").html(errorCd+' '+errorMsg);
		if( errorCd === "" && errorMsg === ""){
			$("#step"+comPmdUtil.failStep).find(".etc2").hide();
		}else{
			$("#step"+comPmdUtil.failStep).find(".etc2").show();
		}

		uf_goStep(comPmdUtil.failStep);
		comLottieUtil.play("pmd_fail_lottie");
		
		$("#btn_retry_pmd").off("click").on("click", function(e) {
			if(comPmdUtil.retryCnt < 2 || isEmpty(fcb)){
				$.nativeCall("showLoading", [{"type" : "1", "message" : "정보를 가져오는 중입니다.\n잠시만 기다려 주세요", "time_out": 180 }]);
				ajax.execute();
			}else{
				comPmdUtil.drawOverRetryPopup(fcb, result_data);
			}
		});
		$("#step"+comPmdUtil.failStep).find("#btn_go_scraping").off("click").on("click", function(e) {
			fcb(result_data);
		});
	},
	drawOverRetryPopup : function (fcb, result_data) {
		comLayerPopUtil.open("over_retry_popup");
		$("#over_retry_popup").find("#btn_go_scraping").off("click").on("click", function(e) {
			fcb(result_data);
			comLayerPopUtil.close('over_retry_popup');
		});
	},
	overrideUfBack : function () {
		var pmd_prev_uf_back = uf_back;
		if(pmd_prev_uf_back.toString().indexOf("pmd_prev_uf_back")==-1){
			uf_back = function(){
				if(comUtil_isBack() == false) {
					return;
				}
				
				var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
				
				if(curStepNo == comPmdUtil.failStep){
					jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
					return;
				}
				pmd_prev_uf_back.apply(this, arguments);
			}
		}
	}
}

