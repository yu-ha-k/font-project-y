includeJs("com/comScrUtil.js");

var _scraping_var = {
	"id"						: ""
	,"module"					: "" //HomeTax(국세청), MinWon(정부24), Cardsales(여신금융협회)
	,"thisSForm"				: ""
	,"parentThis"				: ""
	,"parentId"					: ""
	,"parentStepNo"				: ""
	,"hometaxStepNo"			: 1001
	,"minwonStepNo"				: 1002
	,"cardsalesStepNo"			: 1003
	,"certListStepNo"			: 1004
	,"failResultStepNo"			: 1005
	,"vidVerifyYn"				: "N"// vid 검증 (default : N)
	,"certType"					: "" // 인증서 종류 = C:공동, F:금융, I:ID
	,"certFlag"					: "" // 인증서 사용 용도 구분 = R:인증서 등록, G:데이터 요청
	,"personalFlag"				: "" // 인증서 개인/사업자 구분 = P:개인, C:사업자용, A:모두
	,"retryCnt"					: 0
	,"hometax"			: {
		"params"				: ""
		,"successCallback"		: ""
		,"failCallback"			: ""
		,"dummy"				: ""
		,"isShowIdPw"			: false //비대면대면인증 
	},"minwon"			: {
		"params"				: ""
		,"successCallback"		: ""
		,"failCallback"			: ""
		,"dummy"				: ""
		,"area"			: {
			"isShowArea"		: false //주민등록초본 job 요청이 있으면 자동으로 true로 변경됌
			,"areaType"			: ""
			,"areaList"			: [] //행정구역목록 데이터
			,"wideArea"			: "" //시도
			,"localArea"		: "" //시군구
		}
	},"cardsales"				: {
		"params"				: ""
		,"successCallback"		: ""
		,"failCallback"			: ""
		,"dummy"				: ""
		,"isShowCardMerchant"	: false // 카드가맹점 선택 출력 여부
		,"cardMerchant"			: true // 카드가맹점 여부
		,"noCardMerchantCallback": "" // 카드가맹점 아니오 선택시 실행되는 함수
		,"noCardMerchantMessage" : "" // 카드가맹점 아니오 선택시 나오는 메시지
	}
	,"signParam"				: "" // 금융인증서 로그인 시 스크래핑 모듈에 요청한 값
	,"certSign"					: [{ // 금융인증서 로그인 시 금융인증서 모듈에서 받은 사인 값
			"signedVals"				: []
			,"certificate"				: ""
			,"rValue"					: ""
			,"certSeqNum"				: ""
	}]
	,"certInfo"					: { // 공동인증서 로그인 시 인증서 선택하고 받은 값
			"rnn"						: ""
			,"rdn"						: ""
			,"expyYmd"					: ""
			,"password"					: ""
			,"inputlength"				: ""
			,"signedMsg"				: ""
			,"vidRandom"				: ""
			,"display"					: ""
			,"subject_rdn"				: ""
			,"issuercn"					: ""
			,"key_data"					: ""
			,"cert_data"				: ""
	}
	,"rpprRrn"					: "" // 공동인증서 인증서 등록 시 사용되는 실명번호
	,"bzn"						: "" // 사업자 번호
	,"isSetBzn"					: false // setBzn 실행 여부
	,"rpprKrnNm"				: "" // 공동인증서 인증서 등록 시 사용되는 성명
	,"onlyPersonalCert"			: false // 공동인증서/금융인증서 모두 개인용 인증서만 보여줌
	,"onlyCorpCert"				: false // 공동인증서/금융인증서 모두 사업자용 인증서만 보여줌
	,"hideFinCert"				: false // 금융인증서 버튼 숨김
	,"isFailRetry"					: false // 조회 실패 후 재조회 여부
	,"failRetryIndexList"			: []
	,"termsTargetId"			: ""
	,"appInfo"					: {	// 금융인증서 SDK 로드시 필요한 앱 정보
		    "appId"						: ""
		    ,"deviceId"					: ""
    		,"appVer"					: ""
	    	,"orgCode"					: ""
		    ,"apiKey"					: ""
		    ,"deviceOS"					: _isIphone() ? "IOS" : "ANDROID" // OS
	}
	,"params" : [] // 스크래핑 결과 조회 시 사용
	,"finCertSign" : false // 금융인증서 sign 화면에서 뒤로가기 버튼 막기위함
	,"jobList" : [] // 조회하는 정보 정의할 시 사용
};

(function() {
	var sForm_attrs = {
		"id"			: "data-jx-scraping"					// [required] 스크래핑 Element ID
		,"parentId"		: "data-jx-scraping-parent-id"			// [required] 상위 Step ID
		,"termsTargetId": "data-jx-scraping-terms-target-id"	// [required] 약관 파일 ID (관리자사이트 > 공통관리 > 파일URL 관리 메뉴연동)
		,"module"		: "data-jx-scraping-module"				// [required] hometax(국세청), minwon(민원24), cardsales(여신금융협회)
		,"vidVerifyYn"	: "data-jx-scraping-vidVerify-yn"		// [option]   vid 검증 여부  (default : N)
	};

	var JexMobileScraping = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			this.$object = $jq;
		},
		execute : function(evt, $jq) {
		},
		initVar : function() {
			_scraping_var = {
					"id"						: ""
					,"module"					: "" //HomeTax(국세청), MinWon(정부24), Cardsales(여신금융협회)
					,"thisSForm"				: ""
					,"parentThis"				: ""
					,"parentId"					: ""
					,"parentStepNo"				: ""
					,"hometaxStepNo"			: 1001
					,"minwonStepNo"				: 1002
					,"cardsalesStepNo"			: 1003
					,"certListStepNo"			: 1004
					,"failResultStepNo"			: 1005
					,"vidVerifyYn"				: "N"// vid 검증 (default : N)
					,"certType"					: "" // 인증서 종류 = C:공동, F:금융, I:ID
					,"certFlag"					: "" // 인증서 사용 용도 구분 = R:인증서 등록, G:데이터 요청
					,"personalFlag"				: "" // 인증서 개인/사업자 구분 = P:개인, C:사업자용, A:모두
					,"retryCnt"					: 0
					,"hometax"			: {
						"params"				: ""
						,"successCallback"		: ""
						,"failCallback"			: ""
						,"dummy"				: ""
						,"isShowIdPw"			: false //비대면대면인증 
					},"minwon"			: {
						"params"				: ""
						,"successCallback"		: ""
						,"failCallback"			: ""
						,"dummy"				: ""
						,"area"			: {
							"isShowArea"		: false //주민등록초본 job 요청이 있으면 자동으로 true로 변경됌
							,"areaType"			: ""
							,"areaList"			: [] //행정구역목록 데이터
							,"wideArea"			: "" //시도
							,"localArea"		: "" //시군구
						}
					},"cardsales"				: {
						"params"				: ""
						,"successCallback"		: ""
						,"failCallback"			: ""
						,"dummy"				: ""
						,"isShowCardMerchant"	: false // 카드가맹점 선택 출력 여부
						,"cardMerchant"			: true // 카드가맹점 여부
						,"noCardMerchantCallback": "" // 카드가맹점 아니오 선택시 실행되는 함수
						,"noCardMerchantMessage" : "" // 카드가맹점 아니오 선택시 나오는 메시지
					}
					,"signParam"				: "" // 금융인증서 로그인 시 스크래핑 모듈에 요청한 값
					,"certSign"					: [{ // 금융인증서 로그인 시 금융인증서 모듈에서 받은 사인 값
						"signedVals"				: []
						,"certificate"				: ""
						,"rValue"					: ""
						,"certSeqNum"				: ""
					}]
					,"certInfo"					: { // 공동인증서 로그인 시 인증서 선택하고 받은 값
						"rnn"						: ""
						,"rdn"						: ""
						,"expyYmd"					: ""
						,"password"					: ""
						,"inputlength"				: ""
						,"display"					: ""
						,"subject_rdn"				: ""
						,"issuercn"					: ""
						,"key_data"					: ""
						,"cert_data"				: ""
					}
					,"rpprRrn"					: "" // 공동인증서 인증서 등록 시 사용되는 실명번호
					,"bzn"						: "" // 사업자 번호
					,"isSetBzn"					: false // setBzn 실행 여부
					,"rpprKrnNm"				: "" // 공동인증서 인증서 등록 시 사용되는 성명
					,"onlyPersonalCert"			: false // 공동인증서/금융인증서 모두 개인용 인증서만 보여줌
					,"onlyCorpCert"				: false // 공동인증서/금융인증서 모두 사업자용 인증서만 보여줌
					,"hideFinCert"				: false // 금융인증서 버튼 숨김
					,"isFailRetry"					: false // 조회 실패 후 재조회 여부
					,"failRetryIndexList"			: []
					,"termsTargetId"			: ""
					,"appInfo"					: {	// 금융인증서 SDK 로드시 필요한 앱 정보
						"appId"						: ""
						,"deviceId"					: ""
						,"appVer"					: ""
						,"orgCode"					: ""
						,"apiKey"					: ""
						,"deviceOS"					: _isIphone() ? "IOS" : "ANDROID" // OS
					}
					,"params" : [] // 스크래핑 결과 조회 시 사용
					,"finCertSign" : false // 금융인증서 sign 화면에서 뒤로가기 버튼 막기위함
					,"jobList" : [] // 조회하는 정보 정의할 시 사용
			}
			
			this.loadFinSdk();
			this.setVar();
		},
		setVar : function() {
			var moduleName = {
				"hometax" : "국세청",
				"minwon" : "정부24",
				"cardsales" : "여신금융협회"
			}
			_scraping_var.thisSForm  = this;
			_scraping_var.parentThis = _this;
			_scraping_var.id = _scraping_var.thisSForm.$object.attr(sForm_attrs.id);
			_scraping_var.termsTargetId = _scraping_var.thisSForm.$object.attr(sForm_attrs.termsTargetId);
			_scraping_var.parentId = "#" + _scraping_var.thisSForm.$object.attr(sForm_attrs.parentId);
			_scraping_var.parentStepNo = _scraping_var.parentId.substring(5);
			_scraping_var.module = _scraping_var.thisSForm.$object.attr(sForm_attrs.module).toLowerCase();
			_scraping_var.moduleName = moduleName[_scraping_var.module];
			_scraping_var.vidVerifyYn = _scraping_var.thisSForm.$object.attr(sForm_attrs.vidVerifyYn) == undefined ? _scraping_var.vidVerifyYn : _scraping_var.thisSForm.$object.attr(sForm_attrs.vidVerifyYn);
			
			var ajax = jex.createAjaxUtil("com_utl_080101_1"); //고객정보조회
			ajax.set("task_package",    "com");
			ajax.set("task_subpackage", "utl");
			ajax.set("USER_INFO_TYPE",  "SCRP");
			ajax.setAsync(false);
			ajax.errorTrx = false;
			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];
				_scraping_var.rpprRrn = res_data["RPPR_RRN"];
				//업무에서 사업자번호를 설정한 경우에는 (setBzn함수-비로그인) 사업자번호를 세션에서 가져오지 않음.
				if(_scraping_var.isSetBzn == false){
					_scraping_var.bzn = res_data["BZN"];
				}
				_scraping_var.rpprKrnNm = res_data["RPPR_KRN_NM"];
			});
		},
		drawScrapingForm : function(func) {
			var formFilePath = "../../com/scrapingform.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/scrapingform.html";
			}
			$.ajax({
				url:formFilePath,
				type:'get',
				async: false,
				success: function(dat){
					if(_scraping_var.module == "hometax"){
						_scraping_var.thisSForm.drawHometaxForm(dat);
						_scraping_var.thisSForm.addHometaxFormEvent();
					}
					if(_scraping_var.module == "minwon"){
						_scraping_var.thisSForm.drawMinwonForm(dat);
						_scraping_var.thisSForm.addMinwonFormEvent();
					}
					if(_scraping_var.module == "cardsales"){
						_scraping_var.thisSForm.drawCardsalesForm(dat);
						_scraping_var.thisSForm.addCardsalesFormEvent();
					}
				}
			});
			
			_scraping_var.thisSForm.overrideUfBack();
			
			if(typeof func == "function") {
				func.apply();
			}
		},
		drawHometaxForm : function(dat) {
			$scrapingform_html = $(dat);
			_scraping_var.thisSForm.$object.html($scrapingform_html.find("#scraping_hometax").html());
			
			jex.setJexObj($(_scraping_var.parentId));
			
			//조회하는 정보
			var inq_list = [];
			$(_scraping_var.hometax.params).each(function(i, param) {
				var job = param['Job'];
				inq_list.push({"job":job});
			});
			if(_scraping_var.jobList.length > 0){
				inq_list = [];
				$(_scraping_var.jobList).each(function(i, job) {
					inq_list.push({"job":job});
				});
			}
			var ul_inq_list = jex.getJexObj($(_scraping_var.parentId + " #ul_inq_list"), "JEX_MOBILE_LIST");
			ul_inq_list.setAll(inq_list);
			
			if($("#step"+_scraping_var.hometaxStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.hometaxStepNo));
				jex.setJexObj($("#step"+_scraping_var.hometaxStepNo));
			}
			
			if($("#scraping_term_pop").length == 0) {
				$("#step").append($scrapingform_html.find("#scraping_term_pop"));
			}
			$("#scraping_terms span").attr("data-jx-terms-target-id", _scraping_var.termsTargetId);
			jex.setJexObj($("#scraping_term_pop"));

			
			if($("#step"+_scraping_var.certListStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.certListStepNo));
				jex.setJexObj($("#step"+_scraping_var.certListStepNo));
			}

			if($("#step"+_scraping_var.failResultStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.failResultStepNo));
				jex.setJexObj($("#step"+_scraping_var.failResultStepNo));
			}
		},
		drawMinwonForm : function(dat) {
			$scrapingform_html = $(dat);
			_scraping_var.thisSForm.$object.html($scrapingform_html.find("#scraping_minwon").html());
			
			jex.setJexObj($(_scraping_var.parentId));
			
			//조회하는 정보
			var inq_list = [];
			$(_scraping_var.minwon.params).each(function(i, param) {
				var job = param['Job'];
				if(job == "주민등록표등초본교부"){
					_scraping_var.thisSForm.showMinwonArea();
				}
				inq_list.push({"job":job});
			});
			if(_scraping_var.jobList.length > 0){
				inq_list = [];
				$(_scraping_var.jobList).each(function(i, job) {
					inq_list.push({"job":job});
				});
			}
			var ul_inq_list = jex.getJexObj($(_scraping_var.parentId + " #ul_inq_list"), "JEX_MOBILE_LIST");
			ul_inq_list.setAll(inq_list);
			
			if($("#step"+_scraping_var.minwonStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.minwonStepNo));
				jex.setJexObj($("#step"+_scraping_var.minwonStepNo));
			}

			if($("#scraping_term_pop").length == 0) {
				$("#step").append($scrapingform_html.find("#scraping_term_pop"));
			}
			$("#scraping_terms span").attr("data-jx-terms-target-id", _scraping_var.termsTargetId);
			jex.setJexObj($("#scraping_term_pop"));

			if($("#step"+_scraping_var.certListStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.certListStepNo));
				jex.setJexObj($("#step"+_scraping_var.certListStepNo));
			}

			if($("#step"+_scraping_var.failResultStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.failResultStepNo));
				jex.setJexObj($("#step"+_scraping_var.failResultStepNo));
			}

			if($("#step"+_scraping_var.loadingStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.loadingStepNo));
				jex.setJexObj($("#step"+_scraping_var.loadingStepNo));
			}
			
			//------------행정구역-----------
			if(_scraping_var.minwon.area.isShowArea){
				if($("#scraping_sido_pop").length == 0) {
					$("#step").append($scrapingform_html.find("#scraping_sido_pop"));
					jex.setJexObj($("#scraping_sido_pop"));
				}
				
				if($("#scraping_sigun_pop").length == 0) {
					$("#step").append($scrapingform_html.find("#scraping_sigun_pop"));
					jex.setJexObj($("#scraping_sigun_pop"));
				}
			}
			//------------------------------
		},
		drawCardsalesForm : function(dat) {
			$scrapingform_html = $(dat);
			_scraping_var.thisSForm.$object.html($scrapingform_html.find("#scraping_cardsales").html());
			
			jex.setJexObj($(_scraping_var.parentId));
			
			//조회하는 정보
			var inq_list = [];
			$(_scraping_var.cardsales.params).each(function(i, param) {
				var job = param['Job'];
				inq_list.push({"job":job});
			});
			if(_scraping_var.jobList.length > 0){
				inq_list = [];
				$(_scraping_var.jobList).each(function(i, job) {
					inq_list.push({"job":job});
				});
			}
			var ul_inq_list = jex.getJexObj($(_scraping_var.parentId + " #ul_inq_list"), "JEX_MOBILE_LIST");
			ul_inq_list.setAll(inq_list);
			
			if($("#step"+_scraping_var.cardsalesStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.cardsalesStepNo));
				jex.setJexObj($("#step"+_scraping_var.cardsalesStepNo));
			}
			
			if($("#scraping_term_pop").length == 0) {
				$("#step").append($scrapingform_html.find("#scraping_term_pop"));
			}
			$("#scraping_terms span").attr("data-jx-terms-target-id", _scraping_var.termsTargetId);
			jex.setJexObj($("#scraping_term_pop"));

			if($("#step"+_scraping_var.certListStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.certListStepNo));
				jex.setJexObj($("#step"+_scraping_var.certListStepNo));
			}

			if($("#step"+_scraping_var.failResultStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.failResultStepNo));
				jex.setJexObj($("#step"+_scraping_var.failResultStepNo));
			}
			
			if($("#step"+_scraping_var.loadingStepNo).length == 0) {
				$("#step").append($scrapingform_html.find("#step"+_scraping_var.loadingStepNo));
				jex.setJexObj($("#step"+_scraping_var.loadingStepNo));
			}
		},
		addHometaxFormEvent : function() {
			var stepId = "#step"+_scraping_var.hometaxStepNo;
			$(_scraping_var.parentId).find("#btn_get_cert").off("click").on("click", function(e) {
				_scraping_var.thisSForm.initHometaxFormEvent(stepId);
				uf_goStep(_scraping_var.hometaxStepNo);
			});
			
			if(_scraping_var.hideFinCert){
				$("#step"+_scraping_var.hometaxStepNo).find("#btn_fincert").hide();
			}
			
			$(stepId).find("#btn_cert").off("click").on("click", function(e) {
				_scraping_var.certType = "C";
				_scraping_var.personalFlag = "A";
				_scraping_var.certFlag = "";

				$(stepId).find("#btn_reg_y").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_reg_n").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_personal").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_corp").prop("aria-checked", "false").removeClass("btn_blue active");

				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_sido").hide();
				$(stepId).find("#scraping_opt_type").hide();
				$(stepId).find("#scraping_opt_type_btn").hide();
				$(stepId).find("#scraping_opt_select").show();
				$(stepId).find("#scraping_opt_select_btn").show();
				$(stepId).find("#scraping_inp_form").hide();
				$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			});

			$(stepId).find("#btn_fincert").off("click").on("click", function(e) {
				_scraping_var.certType = "F";
				_scraping_var.personalFlag = "";
				_scraping_var.certFlag = "";

				$(stepId).find("#btn_reg_y").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_reg_n").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_personal").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_corp").prop("aria-checked", "false").removeClass("btn_blue active");

				if(_scraping_var.onlyPersonalCert){
					$(stepId).find("#scraping_opt_type").hide();
					$(stepId).find("#scraping_opt_type_btn").hide();
					_scraping_var.personalFlag = "P";
				}else if(_scraping_var.onlyCorpCert){
					$(stepId).find("#scraping_opt_type").hide();
					$(stepId).find("#scraping_opt_type_btn").hide();
					_scraping_var.personalFlag = "C";
				}else{
					$(stepId).find("#scraping_opt_type").show();
					$(stepId).find("#scraping_opt_type_btn").show();
				}

				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_inp_form").hide();
				$(stepId).find("#scraping_opt_select").show();
				$(stepId).find("#scraping_opt_select_btn").show();
				$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			});

			$(stepId).find("#btn_hometax_id_pw").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.certType = "I";
				$(stepId).find("#hometax_id").val("");
				$(stepId).find("#hometax_pwd").val("");
				$(stepId).find("#hometax_pwd").attr("realValue","");
				$(stepId).find("#btn_hometax_pwd").text("비밀번호 입력");
				
				$(stepId).find("#selectRegCert").hide();
				$(stepId).find("#scraping_opt_select").hide();
				$(stepId).find("#scraping_inp_form").show();
				$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			});
			
			$(stepId).find("#btn_hometax_pwd").off("click").on("click",function(e) {
				_callXecureKeypad_withCallback('hometax_pwd', "0", "9", "15", "비밀번호", null, "Y", null, null, function() {
			        var hometaxPwd = $(stepId).find("#hometax_pwd").val();
			        var maskingStr = "***************";
			        if(isEmpty(hometaxPwd) == false) {
			        	$(stepId).find("#btn_hometax_pwd").text(maskingStr.substring(0,hometaxPwd.length));
			        	$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
			        }else{
			        	$(stepId).find("#btn_hometax_pwd").text("비밀번호 입력");
			        }
			    })
			});

			$(stepId).find("#btn_go_join").off("click").on("click", function(e) {
				var app_name = "";
				var scheme   = "";
				var url      = "";

				if(_isAndroid()) {
					app_name = "kr.go.nts.android";
					scheme   = "kr.go.nts.android";
					url      = "https://play.google.com/store/apps/details?id=kr.go.nts.android";
				}
				else if(_isIphone()) {
					url      = "https://itunes.apple.com/kr/app/id495157796";
				}

				MobPopup.showConfirmQckPopup("홈택스로 이동할게요", "안내", function(){nativeCallApp(app_name, scheme, url);}, null, "다음에", "이동하기", null);
			});
			
			$(stepId).find("#btn_personal").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.personalFlag = "P";
				$(stepId).find("#btn_personal").attr("class", "btn_blue");
				$(stepId).find("#btn_corp").attr("class", "btn_gray");

				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});
			
			$(stepId).find("#btn_corp").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.personalFlag = "C";
				$(stepId).find("#btn_personal").attr("class", "btn_gray");
				$(stepId).find("#btn_corp").attr("class", "btn_blue");

				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});

			$(stepId).find("#btn_reg_y").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.certFlag = "G"; // 테스트용
				$(stepId).find("#btn_reg_y").attr("class", "btn_blue");
				$(stepId).find("#btn_reg_n").attr("class", "btn_gray");
				
				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});
			
			$(stepId).find("#btn_reg_n").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.certFlag = "R"; // 테스트용
				
				$(stepId).find("#btn_reg_y").attr("class", "btn_gray");
				$(stepId).find("#btn_reg_n").attr("class", "btn_blue");
				
				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});

			$(stepId).find("#btn_get_term_pop").off("click").on("click", function(e) {
				if(_scraping_var.certType == "I"){
					
					var hometaxId = $("#hometax_id").val().trim();
					var hometaxPwd = $("#hometax_pwd").val().trim();
					if(hometaxId == ""){
						MobPopup.showAlertPopup("홈텍스 ID를 입력해주시기 바랍니다.","안내",function(){$("#hometax_id").focus();});
						return;
					}
					if(hometaxPwd == ""){
						MobPopup.showAlertPopup("홈텍스 비밀번호를 입력해주시기 바랍니다.","안내",function(){$("#btn_hometax_pwd").focus();});
						
						return;
					}
				}
				
				comLayerPopUtil.open("scraping_term_pop");
			});

			$("#scraping_term_pop").find("#btn_get_scraping").off("click").on("click", function(e) {
				var checkVal1 = $("#scraping_term_pop").find("input[id=termHtmlChk01]:checked").val();
				if(!checkVal1){
					MobPopup.showAlertPopup("고객정보조회 위임에 동의해주시기 바랍니다.");
					return;
				}

				if(_scraping_var.certType == "F"){
					_scraping_var.thisSForm.getFinCertList();
				}else if(_scraping_var.certType == "C"){
					_scraping_var.thisSForm.getCertList();
				}else{
					_scraping_var.thisSForm.startLoading();
					_scraping_var.thisSForm.getScrapingData();
				}
				comLayerPopUtil.close("scraping_term_pop");
			});

			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_fail_scraping").off("click").on("click", function(e) {
				if((!_isRealApp) && _scraping_var[_scraping_var.module].dummy){
					_scraping_var.isFailRetry = false;
					_scraping_var.retryCnt++;
					_scraping_var.thisSForm.startLoading();
					_scraping_var.thisSForm.getScrapingData();
					return;
				}
				_scraping_var.isFailRetry = true;
				_scraping_var.retryCnt++;
				_scraping_var.failRetryIndexList = [];
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_all_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt++;
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_fail_callback").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var[_scraping_var.module].failCallback();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_go_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var.thisSForm.initHometaxFormEvent(stepId);
				uf_goStep(_scraping_var.parentStepNo);
			});
		},
		initHometaxFormEvent: function(stepId) {
			$(stepId).find("#btn_cert").attr("aria-checked",false);
			$(stepId).find("#btn_cert").removeClass("active");
			$(stepId).find("#btn_fincert").attr("aria-checked",false);
			$(stepId).find("#btn_fincert").removeClass("active");
			
			$("#scraping_term_pop").find("#termHtmlChk01").prop("checked", false);
			$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			
			if(_scraping_var.hometax.isShowIdPw){
				$("#btn_hometax_id_pw").show();
				$("#hometax_id").val('');
				$("#hometax_pwd").val('');
				$(stepId).find("#btn_hometax_id_pw").attr("aria-checked",false);
				$(stepId).find("#btn_hometax_id_pw").removeClass("active");
			}else{
				$("#btn_hometax_id_pw").hide();
			}
			$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			$(stepId).find("#scraping_join_box").show();
			$(stepId).find("#scraping_opt_type").hide();
			$(stepId).find("#scraping_opt_type_btn").hide();
			$(stepId).find("#scraping_opt_select").hide();
			$(stepId).find("#scraping_opt_select_btn").hide();
			$(stepId).find("#scraping_inp_form").hide();
			$("#step"+_scraping_var.failResultStepNo).find("#div_retry_btn").show();
			$("#step"+_scraping_var.failResultStepNo).find("#div_fail_btn").hide();
		},
		addMinwonFormEvent : function() {
			var stepId = "#step"+_scraping_var.minwonStepNo;
			$(_scraping_var.parentId).find("#btn_get_cert").off("click").on("click", function(e) {
				_scraping_var.thisSForm.initMinwonFormEvent(stepId);
				uf_goStep(_scraping_var.minwonStepNo);
			});
			
			if(_scraping_var.hideFinCert){
				$("#step"+_scraping_var.minwonStepNo).find("#btn_fincert").hide();
			}
			
			$(stepId).find("#btn_cert").off("click").on("click", function(e) {
				_scraping_var.certType = "C";
				_scraping_var.personalFlag = "A";
				_scraping_var.certFlag = "";
				_scraping_var.minwon.area.wideArea = "";
				_scraping_var.minwon.area.localArea = "";
				$("#spn_wide_area").text("선택");
				$("#spn_local_area").text("선택");
				comSelectPopUtil.initActiveClass($("#ul_wide_area"));
				comSelectPopUtil.initActiveClass($("#ul_local_area"));
				
				$(stepId).find("#btn_reg_y").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_reg_n").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_personal").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_corp").prop("aria-checked", "false").removeClass("btn_blue active");
				
				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_inp_form").hide();
				$(stepId).find("#scraping_sido").hide();
				$(stepId).find("#scraping_opt_type").hide();
				$(stepId).find("#scraping_opt_type_btn").hide();
				$(stepId).find("#scraping_opt_select").show();
				$(stepId).find("#scraping_opt_select_btn").show();
				$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			});

			$(stepId).find("#btn_fincert").off("click").on("click", function(e) {
				_scraping_var.certType = "F";
				_scraping_var.personalFlag = "";
				_scraping_var.certFlag = "";
				_scraping_var.minwon.area.wideArea = "";
				_scraping_var.minwon.area.localArea = "";
				$("#spn_wide_area").text("선택");
				$("#spn_local_area").text("선택");
				comSelectPopUtil.initActiveClass($("#ul_wide_area"));
				comSelectPopUtil.initActiveClass($("#ul_local_area"));

				$(stepId).find("#btn_reg_y").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_reg_n").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_personal").prop("aria-checked", "false").removeClass("btn_blue active");
				$(stepId).find("#btn_corp").prop("aria-checked", "false").removeClass("btn_blue active");
				if(_scraping_var.onlyPersonalCert){
					$(stepId).find("#scraping_opt_type").hide();
					$(stepId).find("#scraping_opt_type_btn").hide();
					_scraping_var.personalFlag = "P";
				}else if(_scraping_var.onlyCorpCert){
					$(stepId).find("#scraping_opt_type").hide();
					$(stepId).find("#scraping_opt_type_btn").hide();
					_scraping_var.personalFlag = "C";
				}else{
					$(stepId).find("#scraping_opt_type").show();
					$(stepId).find("#scraping_opt_type_btn").show();
				}

				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_inp_form").hide();
				$(stepId).find("#scraping_sido").hide();
				$(stepId).find("#scraping_opt_select").show();
				$(stepId).find("#scraping_opt_select_btn").show();
				$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			});

			$(stepId).find("#btn_go_join").off("click").on("click", function(e) {
				var app_name = "";
				var scheme   = "";
				var url      = "";
				
				if(_isAndroid()) {
					app_name = "kr.go.minwon.m";
					scheme   = "kr.go.minwon.m";
					url      = "https://play.google.com/store/apps/details?id=kr.go.minwon.m";
				}
				else if(_isIphone()) {
					url      = "https://itunes.apple.com/kr/app/id586454505";
				}
				
				MobPopup.showConfirmQckPopup("정부24로 이동할게요", "안내", function(){nativeCallApp(app_name, scheme, url);}, null, "다음에", "이동하기", null);
			});
			
			$(stepId).find("#btn_personal").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.personalFlag = "P";
				$(stepId).find("#btn_personal").attr("class", "btn_blue");
				$(stepId).find("#btn_corp").attr("class", "btn_gray");

				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});
			
			$(stepId).find("#btn_corp").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				_scraping_var.personalFlag = "C";
				$(stepId).find("#btn_personal").attr("class", "btn_gray");
				$(stepId).find("#btn_corp").attr("class", "btn_blue");

				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});

			$(stepId).find("#btn_reg_y").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_inp_form").hide();

				_scraping_var.certFlag = "G";
				$(stepId).find("#btn_reg_y").attr("class", "btn_blue");
				$(stepId).find("#btn_reg_n").attr("class", "btn_gray");
				if(_scraping_var.minwon.area.isShowArea){
					$(stepId).find("#scraping_sido").show();
				}
				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});

			$(stepId).find("#btn_reg_n").off("click").on("click", function(e) {
				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_sido").hide();
				_scraping_var.certFlag = "R";
				
				$(stepId).find("#btn_reg_y").attr("class", "btn_gray");
				$(stepId).find("#btn_reg_n").attr("class", "btn_blue");
				
				if(_scraping_var.certType == "C"){
					$(stepId).find("#scraping_inp_form").show();
				}
				if(_scraping_var.certType == "F"){
					_scraping_var.certFlag = "";
					$(stepId).find("#scraping_join_box").show();
					$(stepId).find("#scraping_join_box_text").html("금융인증서는 정부24 홈페이지에서<br>직접 등록하셔야 이용이 가능합니다.공동인증서로 진행하시거나<br>금융인증서 등록 후 이용해 주세요.");
					$(stepId).find("#btn_go_join").html("금융인증서 등록");
					$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
				}

				if(_scraping_var.certType != "" && _scraping_var.personalFlag != "" && _scraping_var.certFlag != ""){
					$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
				}
			});

			$(stepId).find("#rppr_krn_nm").val(_scraping_var.rpprKrnNm);
			$(stepId).find("#scraping_rnn_1").val(_scraping_var.rpprRrn.substring(0,6));

			$(stepId).find("#scraping_rnn_2").off("click").on("click",function(e) {
				_callXecureKeypad("scraping_rnn_2", "1", "7", "7", "주민번호 뒤 7자리", null, "Y", null, null, true);
			});
			$(stepId).find("#btn_scraping_rnn_2").off("click").on("click", function(e) {
				_callXecureKeypad_withCallback('step'+_scraping_var.minwonStepNo+' #scraping_rnn_2', "1", "7", "7", "주민번호 뒤 7자리", null, "N", null, null, function() {
					var scrapingRnn2 = $(stepId).find("#scraping_rnn_2").val();
			        if(isEmpty(scrapingRnn2) == false && scrapingRnn2.length == 7) {
			        	$(stepId).find("#btn_scraping_rnn_2").text("*******");
			        }else{
			        	$(stepId).find("#btn_scraping_rnn_2").text("");
			        }
			    })
			});

			$(stepId).find("#btn_minwon_pwd").off("click").on("click",function(e) {
				_callXecureKeypad_withCallback('minwon_pwd', "0", "9", "12", "비밀번호", null, "Y", null, null, function() {
			        var minwonPwd = $("#minwon_pwd").val();
			        var maskingStr = "************";
			        if(isEmpty(minwonPwd) == false) {
			        	$(stepId).find("#btn_minwon_pwd").text(maskingStr.substring(0,minwonPwd.length));
			        }else{
			        	$(stepId).find("#btn_minwon_pwd").text("");
			        }
			    })
			});

			if(_scraping_var.minwon.area.isShowArea){
				_scraping_var.thisSForm.getMinwonArea();
				$(stepId).find("#get_sido_pop").off("click").on("click", function(e) {
					comLayerPopUtil.open("scraping_sido_pop");
				});
				$(stepId).find("#get_sigun_pop").off("click").on("click", function(e) {
					comLayerPopUtil.open("scraping_sigun_pop");
				});
			}

			$(stepId).find("#btn_get_term_pop").off("click").on("click", function(e) {
				if(_scraping_var.minwon.area.isShowArea && _scraping_var.certFlag == "G"){
					if(_scraping_var.minwon.area.wideArea == ""){
						MobPopup.showAlertPopup("주민등록상 행정구역 시도를 선택해주세요","안내",function(){$("#spn_wide_area").focus();});
						return;
					}
					if(_scraping_var.minwon.area.localArea == ""){
						MobPopup.showAlertPopup("주민등록상 행정구역 시군구를 선택해주세요","안내",function(){$("#get_sigun_pop").focus();});
						return;
					}
				}
				
				if(_scraping_var.certType == "C" && _scraping_var.certFlag == "R"){
					var scraping_rnn = $("#scraping_rnn_2").val().trim();
					var minwonId = $("#minwon_id").val().trim();
					var minwonPwd = $("#minwon_pwd").val().trim();

					if(scraping_rnn == ""){
						MobPopup.showAlertPopup("주민등록번호 뒷자리를 입력해주시기 바랍니다.","안내",function(){$("#btn_scraping_rnn_2").focus();});
						return;
					}
					if(minwonId == ""){
						MobPopup.showAlertPopup("정부24 ID를 입력해주시기 바랍니다.","안내",function(){$("#minwon_id").focus();});
						return;
					}
					if(minwonPwd == ""){
						MobPopup.showAlertPopup("정부24 비밀번호를 입력해주시기 바랍니다.","안내",function(){$("#btn_minwon_pwd").focus();});
						return;
					}
				}

				comLayerPopUtil.open("scraping_term_pop");
			});

			$("#scraping_term_pop").find("#btn_get_scraping").off("click").on("click", function(e) {
				var checkVal1 = $("#scraping_term_pop").find("input[id=termHtmlChk01]:checked").val();
				if(!checkVal1){
					MobPopup.showAlertPopup("고객정보조회 위임에 동의해주시기 바랍니다.");
					return;
				}

				if(_scraping_var.certType == "F"){
					_scraping_var.thisSForm.getFinCertList();
				}else if(_scraping_var.certType == "C"){
					_scraping_var.thisSForm.getCertList();
				}else{
					_scraping_var.thisSForm.startLoading();
					_scraping_var.thisSForm.getScrapingData();
				}
				comLayerPopUtil.close("scraping_term_pop");
			});

			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_fail_scraping").off("click").on("click", function(e) {
				if((!_isRealApp) && _scraping_var[_scraping_var.module].dummy){
					_scraping_var.isFailRetry = false;
					_scraping_var.retryCnt++;
					_scraping_var.thisSForm.startLoading();
					_scraping_var.thisSForm.getScrapingData();
					return;
				}
				_scraping_var.isFailRetry = true;
				_scraping_var.retryCnt++;
				_scraping_var.failRetryIndexList = [];
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_all_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt++;
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_fail_callback").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var[_scraping_var.module].failCallback();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_go_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var.thisSForm.initMinwonFormEvent(stepId);
				uf_goStep(_scraping_var.parentStepNo);
			});
		},
		initMinwonFormEvent: function(stepId) {
			$(stepId).find("#btn_cert").attr("aria-checked",false);
			$(stepId).find("#btn_cert").removeClass("active");
			$(stepId).find("#btn_fincert").attr("aria-checked",false);
			$(stepId).find("#btn_fincert").removeClass("active");

			_scraping_var.minwon.area.wideArea = "";
			_scraping_var.minwon.area.localArea = "";
			$("#spn_wide_area").text("선택");
			$("#spn_local_area").text("선택");
			comSelectPopUtil.initActiveClass($("#ul_wide_area"));
			comSelectPopUtil.initActiveClass($("#ul_local_area"));
			
			$("#scraping_term_pop").find("#termHtmlChk01").prop("checked", false);
			$(stepId).find("#btn_get_term_pop").prop("disabled", "disabled");
			$(stepId).find("#btn_reg_y").prop("aria-checked", "false").removeClass("btn_blue active");
			$(stepId).find("#btn_reg_n").prop("aria-checked", "false").removeClass("btn_blue active");
			$(stepId).find("#btn_personal").prop("aria-checked", "false").removeClass("btn_blue active");
			$(stepId).find("#btn_corp").prop("aria-checked", "false").removeClass("btn_blue active");

			$(stepId).find("#scraping_join_box").show();
			$(stepId).find("#scraping_sido").hide();
			$(stepId).find("#scraping_opt_type").hide();
			$(stepId).find("#scraping_opt_type_btn").hide();
			$(stepId).find("#scraping_opt_select").hide();
			$(stepId).find("#scraping_opt_select_btn").hide();
			$(stepId).find("#scraping_inp_form").hide();
			
			$(stepId).find("#scraping_join_box_text").html("정부24 회원이 아니시라면 신청하신 거래를 더 이상 진행할 수 없습니다.");
			$(stepId).find("#btn_go_join").html("회원가입");
			$("#step"+_scraping_var.failResultStepNo).find("#div_retry_btn").show();
			$("#step"+_scraping_var.failResultStepNo).find("#div_fail_btn").hide();
		},
		addCardsalesFormEvent : function() {
			var stepId = "#step"+_scraping_var.cardsalesStepNo;
			$(_scraping_var.parentId).find("#btn_get_cert").off("click").on("click", function(e) {
				_scraping_var.thisSForm.initCardsalesFormEvent(stepId);
				uf_goStep(_scraping_var.cardsalesStepNo);
			});
			
			$(stepId).find("#btn_cardsales_pwd").off("click").on("click",function(e) {
				_callXecureKeypad_withCallback('cardsales_pwd', "0", "8", "20", "비밀번호", null, "Y", null, null, function() {
			        var cardsalesPwd = $("#cardsales_pwd").val();
			        var maskingStr = "********************";
			        if(isEmpty(cardsalesPwd) == false) {
			        	$(stepId).find("#btn_cardsales_pwd").text(maskingStr.substring(0,cardsalesPwd.length));
			        	$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
			        }else{
			        	$(stepId).find("#btn_cardsales_pwd").text("비밀번호 입력");
			        }
			    })
			});


			$(stepId).find("#btn_go_join").off("click").on("click", function(e) {
				var url = "https://www.cardsales.or.kr/";
				MobPopup.showConfirmQckPopup("여신금융협회 회원가입 화면으로 이동할게요", "안내", function(){$.nativeCall('openExBrowser',[url]);}, null, "다음에", "이동하기", null);
			});
			
			$(stepId).find("#btn_get_term_pop").off("click").on("click", function(e) {
				if(_scraping_var.cardsales.isShowCardMerchant){
					if(!_scraping_var.cardsales.cardMerchant){
						_scraping_var.cardsales.noCardMerchantCallback();
						return;
					}
				}
				var cardsales_id = $("#cardsales_id").val().trim();
				var cardsales_pwd = $("#cardsales_pwd").val().trim();
				if(cardsales_id == ""){
					MobPopup.showAlertPopup("여신금융협회 ID를 입력해주시기 바랍니다.");
					$("#cardsales_id").focus();
					return;
				}
				if(cardsales_pwd == ""){
					MobPopup.showAlertPopup("여신금융협회 비밀번호를 입력해주시기 바랍니다.");
					$("#cardsales_pwd").focus();
					return;
				}
				
				comLayerPopUtil.open("scraping_term_pop");
			});

			$("#scraping_term_pop").find("#btn_get_scraping").off("click").on("click", function(e) {
				var checkVal1 = $("#scraping_term_pop").find("input[id=termHtmlChk01]:checked").val();
				if(!checkVal1){
					MobPopup.showAlertPopup("고객정보조회 위임에 동의해주시기 바랍니다.");
					return;
				}
				_scraping_var.certType = "I";
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
				comLayerPopUtil.close("scraping_term_pop");
			});

			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_fail_scraping").off("click").on("click", function(e) {
				if((!_isRealApp) && _scraping_var[_scraping_var.module].dummy){
					_scraping_var.isFailRetry = false;
					_scraping_var.retryCnt++;
					_scraping_var.thisSForm.startLoading();
					_scraping_var.thisSForm.getScrapingData();
					return;
				}
				_scraping_var.isFailRetry = true;
				_scraping_var.retryCnt++;
				_scraping_var.failRetryIndexList = [];
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_retry_all_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt++;
				_scraping_var.thisSForm.startLoading();
				_scraping_var.thisSForm.getScrapingData();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_fail_callback").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var[_scraping_var.module].failCallback();
			});
			$("#step"+_scraping_var.failResultStepNo).find("#btn_go_scraping").off("click").on("click", function(e) {
				_scraping_var.isFailRetry = false;
				_scraping_var.retryCnt = 0;
				_scraping_var.thisSForm.initCardsalesFormEvent(stepId);
				uf_goStep(_scraping_var.parentStepNo);
			});
		},
		initCardsalesFormEvent: function(stepId) {
			$("#scraping_term_pop").find("#termHtmlChk01").prop("checked", false);
			$(stepId).find("#btn_cardmerchant_y").prop("aria-checked", "false").removeClass("btn_blue active");
			$(stepId).find("#btn_cardmerchant_n").prop("aria-checked", "false").removeClass("btn_blue active");
			$(stepId).find("#btn_get_term_pop").prop("disabled", false).removeClass("disabled");
			$(stepId).find("#scraping_msg_box").hide();
			
			$("#cardsales_id").val('');
			$("#cardsales_pwd").val('');
			
			if(_scraping_var.cardsales.isShowCardMerchant){
				$(stepId).find("#btn_cardmerchant_y").attr("aria-checked",false);
				$(stepId).find("#btn_cardmerchant_y").removeClass("active");
				$(stepId).find("#btn_cardmerchant_n").attr("aria-checked",false);
				$(stepId).find("#btn_cardmerchant_n").removeClass("active");
				
				$(stepId).find("#btn_get_term_pop").prop("disabled", true);
				$(stepId).find("#scraping_opt_select").show();
				$(stepId).find("#scraping_join_box").hide();
				$(stepId).find("#scraping_inp_form").hide();
				$(stepId).find("#scraping_msg_box_text").html(_scraping_var.cardsales.noCardMerchantMessage);

				$(stepId).find("#btn_cardmerchant_y").off("click").on("click", function(e) {
					_scraping_var.cardsales.cardMerchant = true;
					$(stepId).find("#scraping_inp_form").show();
					$(stepId).find("#scraping_join_box").show();
					$(stepId).find("#scraping_msg_box").hide();
					$(stepId).find("#btn_get_term_pop").prop("disabled", true);
				});
				$(stepId).find("#btn_cardmerchant_n").off("click").on("click", function(e) {
					_scraping_var.cardsales.cardMerchant = false;
					$(stepId).find("#scraping_inp_form").hide();
					$(stepId).find("#scraping_join_box").hide();
					$(stepId).find("#scraping_msg_box").show();
					$(stepId).find("#btn_get_term_pop").prop("disabled", false);
				});
			}else{
				$(stepId).find("#scraping_opt_select").hide();
				$(stepId).find("#scraping_inp_form").show();
				$(stepId).find("#scraping_join_box").show();
				$(stepId).find("#btn_get_term_pop").prop("disabled", true);
			}
			$("#step"+_scraping_var.failResultStepNo).find("#div_retry_btn").show();
			$("#step"+_scraping_var.failResultStepNo).find("#div_fail_btn").hide();
		},
		/**
		 * 공동인증서 리스트 가져오기
		 */
		getCertList : function(){
			var certType = "A";
			if(_scraping_var.onlyCorpCert) {
				certType = "C";
			}
			if(_scraping_var.onlyPersonalCert) {
				certType = "P";
			}
			//인증서 목록 출력
			comUtil_showPuclibCertList(_scraping_var.certListStepNo, "scraping_cert_list", certType,"FUNC@_scraping_var.thisSForm.getCertInfo();","Y", "2");
		},
		/**
		 * 공동인증서 선택
		 */
		getCertInfo : function() {
			_scraping_var.certType = "C";
			var row_data = $(event.target).parents("li[data-rownum]").data("_JEX_GETALL_DATA_");
			var expy_ymd = row_data.sm_cert_to_date.replace(/-/g, "");

			if(expy_ymd.length > 8) {
				expy_ymd = expy_ymd.substring(0, 8);
			}
			
			//만료된 인증서 체크
			var sm_cert_to_date = new Date(Date.parse(row_data["sm_cert_to_date"].substring(0, 10))); //yyyy-mm-dd
			var nowDate         = new Date(Date.parse(g_getDate('yyyy-mm-dd')));
			var diffDay         = (sm_cert_to_date.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000);
			
			if(diffDay < 0) {
				return;
			}
//			// @DESC 
//			// plain_text, cert_info, show_cert_list_yn, use_cert_info_yn, use_ibksignedtime_yn, callback
			comWebkey_signWithCertificate("scraping", row_data, "N", "Y", "Y", function(dat) {
				if (!_isRealApp) {
						dat = {
							'signed_msg': 'test',
							'_encryptdata': 'test',
							'_inputlength': 'test',
							"vidRandom":"test"
						};
				}

				if(row_data["sm_cert_subject_rdn"].indexOf("personal") > 0) {
					_scraping_var.certInfo.rnn = _scraping_var.rpprRrn;
					_scraping_var.personalFlag = "P";
				} else {
					_scraping_var.certInfo.rnn = _scraping_var.bzn;
					_scraping_var.personalFlag = "C";
				}

				_scraping_var.certInfo.rdn = row_data["sm_cert_subject_rdn"];
				_scraping_var.certInfo.expyYmd = expy_ymd;
				_scraping_var.certInfo.password = dat["_encryptdata"];
				_scraping_var.certInfo.inputlength =  dat["_inputlength"];
				_scraping_var.certInfo.signedMsg =  dat["signed_msg"];
				_scraping_var.certInfo.vidRandom =  dat["vidRandom"];

				_scraping_var.certInfo.display = dat["display"];
				_scraping_var.certInfo.subject_rdn = dat["subject_rdn"];
				_scraping_var.certInfo.issuercn = dat["issuercn"];
				_scraping_var.certInfo.key_data = dat["key_data"];
				_scraping_var.certInfo.cert_data = dat["cert_data"];
				
				if((dat.signed_msg).toLowerCase() == "cancel") {
					return;
				}
				
				_scraping_var.thisSForm.startLoading();
				if(_scraping_var.vidVerifyYn == "Y"){
					if(_scraping_var.thisSForm.vidVerify() == false){
						_scraping_var.thisSForm.endLoading();
						return; //vid 검증에 실패하면 중지
					}
				}
				
				if(_scraping_var.certFlag == "R") { 
					//인증서등록
					_scraping_var.thisSForm.regCertScraping();
				}
				else { 
					//정보 가져오기
					_scraping_var.thisSForm.getScrapingData();
				}
			});
		},
		//vid 검증
		vidVerify : function() {
			var result = false;
			var ajax = jex.createAjaxUtil("com_utl_080101_3"); //VID 검증
			ajax.set("task_package",    "com");
			ajax.set("task_subpackage", "utl");
			ajax.set("certType",  _scraping_var.certType);
			ajax.set("personalFlag", _scraping_var.personalFlag);
			if("C" == _scraping_var.certType){
				ajax.set("signed_msg",  _scraping_var.certInfo.signedMsg);
				ajax.set("vidRandom",  _scraping_var.certInfo.vidRandom);
			}
			if("F" == _scraping_var.certType){
				if(_scraping_var.module == "hometax"){
					ajax.set("signed_msg",  _scraping_var.certSign.signedVals[0]);
					ajax.set("vidRandom",  _scraping_var.certSign.rValue);
					ajax.set("certificate",  _scraping_var.certSign.certificate);
					ajax.set("binary",  _scraping_var.signParam.content.binary.binaries[0]);
				}else if(_scraping_var.module == "minwon"){
					ajax.set("signed_msg",  _scraping_var.certSign.signedVals[0]);
				}
			}
			
			ajax.setAsync(false); //동기
			ajax.errorTrx = true; //에러페이지 호출
			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];
				if(res_data["RSLT_DCD"] == "0000"){
					result = true;
				}
			});
			return result;
		},
		/**
		 * 금융인증서 SDK load
		 */
		loadFinSdk : function() {
			comWebkey_getFinAppInfo(function() {
				var result   = this;
				//스크래핑 테스트 할땐 운영 정보가 필요함
				_scraping_var.appInfo.appId = result["app_id"];
				_scraping_var.appInfo.deviceId = result["device_id"];
				_scraping_var.appInfo.appVer = result["app_ver"];
				_scraping_var.appInfo.orgCode = result["finance_code"];
				_scraping_var.appInfo.apiKey = result["finance_key"];
				
				FinCertCorpSdkScraping.loadSdk();
				FinCertSdkScraping.loadSdk();
			});
		},
		/**
		 * Params 세팅 (업무단 호출, 필수)
		 * @param {Array} data - params
		 */
		setParams : function(data) {
			if(_scraping_var.module == "hometax"){
				_scraping_var.hometax.params = data;
			}
			if(_scraping_var.module == "minwon"){
				_scraping_var.minwon.params = data;
			}
			if(_scraping_var.module == "cardsales"){
				_scraping_var.cardsales.params = data;
			}
		},
		/**
		 * Dummy 세팅 (업무단 호출, 옵션)
		 * @param {Array} data - dummy
		 */
		setDummy : function(data){
			if(_scraping_var.module == "hometax"){
				_scraping_var.hometax.dummy = data;
			}
			if(_scraping_var.module == "minwon"){
				_scraping_var.minwon.dummy = data;
			}
			if(_scraping_var.module == "cardsales"){
				_scraping_var.cardsales.dummy = data;
			}
		},
		/**
		 * SuccessCallback 세팅 (업무단 호출, 필수)
		 * @param {func} callback - 성공콜백
		 */
		setSuccessCallback : function(callback){
			if(_scraping_var.module == "hometax"){
				_scraping_var.hometax.successCallback = callback;
			}
			if(_scraping_var.module == "minwon"){
				_scraping_var.minwon.successCallback = callback;
			}
			if(_scraping_var.module == "cardsales"){
				_scraping_var.cardsales.successCallback = callback;
			}
		},
		/**
		 * FailCallback 세팅 (업무단 호출, 옵션)
		 * @param {func} callback - 실패콜백
		 */
		setFailCallback : function(callback){
			if(_scraping_var.module == "hometax"){
				_scraping_var.hometax.failCallback = callback;
			}
			if(_scraping_var.module == "minwon"){
				_scraping_var.minwon.failCallback = callback;
			}
			if(_scraping_var.module == "cardsales"){
				_scraping_var.cardsales.failCallback = callback;
			}
		},
		/**
		 * 사업자등록번호 세팅(비로그인일 경우) (업무단 호출, 옵션)
		 * @param {string} data - 사업자등록번호
		 */
		setBzn : function(data){
			_scraping_var.isSetBzn = true;
			_scraping_var.bzn = data;
		},
		setJobList : function(data){
			_scraping_var.jobList = data;
		},
		showOnlyPersonalCert : function() {
			_scraping_var.onlyPersonalCert = true;
		},
		showOnlyCorpCert : function() {
			_scraping_var.onlyCorpCert = true;
		},
		hideFinCert : function() {
			_scraping_var.hideFinCert = true;
		},
		setNoCardMerchant : function(callback, message) {
			_scraping_var.cardsales.isShowCardMerchant = true;
			_scraping_var.cardsales.noCardMerchantCallback = callback;
			_scraping_var.cardsales.noCardMerchantMessage = message;
		},
		/**
		 * 금융인증서 리스트 가져오기
		 */
		getFinCertList : function(){
			nativeIndicator.show();
			_scraping_var.certType = "F";
			var params = [];
			var param = {};
			if(_scraping_var.certFlag == "R"){
				if(_scraping_var.module == "hometax"){
					param = {
						"Module":"HomeTax",
						"Class" :"PC조회발급서비스",
						"Job" : "공인인증서등록",
						"Input" : {
							"로그인방식":"FIN_CERT",
							"주민사업자번호":_scraping_var.personalFlag == "C" ? _scraping_var.bzn :_scraping_var.rpprRrn,
						}
					}
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					// 쿠콘 스크래핑에서 금융인증서 등록 기능없음.
				}
			}else if(_scraping_var.certFlag == "G"){
				if(_scraping_var.module == "hometax"){
					param = {
						"Module":"HomeTax",
						"Class" :"PC조회발급서비스",
						"Job" : "로그인",
						"Input" : {
							"로그인방식":"FIN_CERT"
						}
					}
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					param = {
						"Module":"MinWon",
						"Class" :"민원신청조회",
						"Job" : "로그인",
						"Input" : {
							"로그인방식":"FIN_CERT"
						}
					}
					params.push(param);
				}
			}
			
			comScrUtil.doScraping(params, function(dat){
				if(dat["Output1"]["ErrorCode"] == "00000000"){
					var signParam = dat["Output1"]["Result"]["req"]["SignParam"][0];
					_scraping_var.signParam = signParam;
					
					// 개발환경
					if(!_isRealApp) {
						_scraping_var.certSign = {
							"signedVals":'test',
							"certificate":'test',
							"rValue":'test',
							"certSeqNum":'1234'
						};
						if(_scraping_var.certFlag == "R"){
							_scraping_var.thisSForm.regCertScraping();
						}else{
							_scraping_var.thisSForm.getScrapingData();
						}
						return;
					}
					_scraping_var.thisSForm.finCertSign();
				}else{
					nativeIndicator.hide();
					MobPopup.showAlertPopup(dat["ErrorMessage"] + "<br>[오류코드:" + dat["ErrorCode"] + "]");
				}
			},function (){
				nativeIndicator.hide();
				MobPopup.showAlertPopup("금융인증서 로드 시 예기치 않은 오류가 발생하였습니다.<br>[오류코드:99999999]");
			});
		},
		/**
		 * 금융인증서 전자서명 callback 설정
		 */
		finCertSign : function(){
			var fincertSdk;
			if(_scraping_var.personalFlag == "C"){
				fincertSdk = FinCertCorp;
			}else{
				fincertSdk = FinCert;
			}
			
			if(typeof fincertSdk !== "undefined"){
				_scraping_var.finCertSign = true;
				fincertSdk.Sdk.sign({
					success : function(result){
						_scraping_var.finCertSign = false;
						_scraping_var.certSign = result;
						nativeIndicator.hide();
						_scraping_var.thisSForm.startLoading();
						if(_scraping_var.vidVerifyYn == "Y"){
							if(_scraping_var.thisSForm.vidVerify() == false){
								_scraping_var.thisSForm.endLoading();
								return; //vid 검증에 실패하면 중지
							}
						}
						if(_scraping_var.certFlag == "R"){
							//인증서 발급 요청
							_scraping_var.thisSForm.regCertScraping();
						}else{
							//JOB 요청
							_scraping_var.thisSForm.getScrapingData();
						}
					},
					fail : function(err){
						nativeIndicator.hide();
						if (String(err.code) == "800000") { //사용자가 금융인증서비스 창을 종료하였습니다.
//							uf_goStep(_scraping_var.parentStepNo);
						} else {
							MobPopup.showErrorPopup(String(err.code), err.message, function() {
//								uf_goStep(_scraping_var.parentStepNo);
							});
						}
						_scraping_var.finCertSign = false;
					},
					"algorithms" : "RSASSA-PKCS1-v1_5_SHA256",
					"withoutContent" : false,
					"encoding" : "UTF-8",
					"signFormat" : _scraping_var.signParam["signFormat"],
					"info" : _scraping_var.signParam["info"],
					"content" : _scraping_var.signParam["content"],
					"view" : _scraping_var.signParam["view"]
				});
			} else {
				MobPopup.showAlertPopup("금융인증서가 로드되지 않았습니다.");
			}
		},
		regCertScraping : function() {
			var params = [];
			var param  = {};
			var scb, fcb;
			if(_scraping_var.certType == "C"){
				//공동인증서 인증서등록
				if(_scraping_var.module == "hometax"){
					param = {
						Module : "HomeTax",
						Class  : "PC조회발급서비스",
						Job    : "공인인증서등록",
						Input  : {
							"주민사업자번호" : "",
							"인증서" : {
								"이름"     : "",
								"만료일자" : "",
								"비밀번호" : ""
							}
						}
					};
					param.Input["주민사업자번호"]         = _scraping_var.certInfo.rnn;
					param.Input["인증서"]["이름"]        = _scraping_var.certInfo.rdn;
					param.Input["인증서"]["만료일자"]     = _scraping_var.certInfo.expyYmd;
					param.Input["인증서"]["비밀번호"]     = _scraping_var.certInfo.password;
					param.Input["인증서"]["_inputlength"] = _scraping_var.certInfo.inputlength;
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					param = {
						Module: 'MinWon',
						Class : '민원신청조회',
						Job   : '로그인',
						Input : {
							'로그인방식': 'ID',
							'사용자아이디': '',
							'사용자비밀번호': '',
							"_inputlength": '',
							"보안문자": 'ID',
							"보안문자자동제출": '',
						}
					};
					param.Input['로그인방식'    ] = "ID"; //“CERT” : 인증서 로그인, “ID” : 아이디 로그인, “FIDO” : 생체인증 로그인
					param.Input['사용자아이디'  ] = $("#minwon_id").val();  //아이디
					param.Input['사용자비밀번호'] = $("#minwon_pwd").attr("realValue"); //비밀번호
					param.Input["_inputlength"  ] = $("#minwon_pwd").val().length; //비밀번호
					param.Input['보안문자'] = "ID";
					param.Input["보안문자자동제출"  ] = "Y";
					
					params.push(param);

					param = {
						Module: 'MinWon',
						Class : '민원신청조회',
						Job   : '공인인증서등록',
						Input : {
							'주민등록번호': '',
							'인증서': {
								'이름': '',
								'만료일자': '',
								'비밀번호': '',
								"_inputlength": '',
							}
						}
					};
					var rnn_1 = $("#scraping_rnn_1").val();
					var rnn_2 = $("#scraping_rnn_2").attr('realvalue');
					param.Input["주민등록번호"]         = rnn_1 + rnn_2;
					param.Input["인증서"]["이름"]        = _scraping_var.certInfo.rdn;
					param.Input["인증서"]["만료일자"]     = _scraping_var.certInfo.expyYmd;
					param.Input["인증서"]["비밀번호"]     = _scraping_var.certInfo.password;
					param.Input["인증서"]["_inputlength"] = _scraping_var.certInfo.inputlength;

					params.push(param);
					
					param = {
						Module: 'MinWon',
						Class : '민원신청조회',
						Job   : '로그아웃',
						Input : {}
					};
					params.push(param);
				}
				
				scb = function(dat){
					var output1       = dat["Output1"];
					var output2       = dat["Output2"];
					if(isEmpty(output1) == false) {

						if(output1.ErrorCode == "00000000") { //정상
							if(_scraping_var.module == "hometax"){
								_scraping_var.certFlag="G";
								_scraping_var.thisSForm.getScrapingData();
							}
							if(_scraping_var.module == "minwon"){
								if(isEmpty(output2) == false && output2.ErrorCode == "00000000") {
									if(_scraping_var.minwon.area.isShowArea){
										_scraping_var.thisSForm.endLoading();
										MobPopup.showAlertPopup("정부24 공동인증서 등록이 완료되었습니다.", "안내", function() {
											$("#step"+_scraping_var.minwonStepNo).find("#btn_reg_y").click();
											uf_goStep(_scraping_var.minwonStepNo);
										});
									}else{
										_scraping_var.certFlag="G";
										_scraping_var.thisSForm.getScrapingData();
									}
								}else{
									_scraping_var.thisSForm.endLoading();
									MobPopup.showAlertPopup(output2.ErrorMessage + "<br>[오류코드:" + output2.ErrorCode + "]", "안내", function() {
										uf_goStep(_scraping_var.minwonStepNo);
									});
								}
							}
						}
						else {
							_scraping_var.thisSForm.endLoading();
							MobPopup.showAlertPopup(output1.ErrorMessage + "<br>[오류코드:" + output1.ErrorCode + "]", "안내", function() {
								uf_goStep(_scraping_var.parentStepNo);
							});
						}
					}
					else {
						_scraping_var.thisSForm.endLoading();
						MobPopup.showAlertPopup("일시적인 서버장애로 공동인증서 등록에 실패했습니다. 잠시 후 다시 거래해주시기 바랍니다." + "<br>[오류코드:99999998]", "안내", function() {
							uf_goStep(_scraping_var.parentStepNo);
						});
					}
				};
				
				fcb = function(dat) {
					_scraping_var.thisSForm.endLoading();
					MobPopup.showAlertPopup("일시적인 서버장애로 공동인증서 등록에 실패했습니다. 잠시 후 다시 거래해주시기 바랍니다." + "<br>[오류코드:99999998]", "안내", function() {
						uf_goStep(_scraping_var.parentStepNo);
					});
				}
			} else if(_scraping_var.certType == "F") {
				//금융인증서 인증서등록
				if(_scraping_var.module == "hometax"){
					param = {
						Module : "HomeTax",
						Class  : "PC조회발급서비스",
						Job    : "FIN_CERT",
						Input  : {
							"res"     : [{
								"signedVals":_scraping_var.certSign.signedVals,
								"certificate":_scraping_var.certSign.certificate,
								"rValue":_scraping_var.certSign.rValue,
								"certSeqNum":_scraping_var.certSign.certSeqNum.toString()
							}],
							"로그인방식": "FIN_CERT",
						}
					}
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					// 쿠콘 스크래핑에서 금융인증서 등록 기능없음.
				}

				scb = function(dat){
					var output1       = dat["Output1"];
					if(isEmpty(output1) == false) {
						if(output1.ErrorCode == "00000000") { //정상
							if(_scraping_var.module == "hometax"){
								_scraping_var.thisSForm.endLoading();
								MobPopup.showAlertPopup("금융인증서 등록이 완료되었습니다.<br>조회를 위해 인증서 비밀번호를 한번 더 입력해주시기 바랍니다.", "안내", function() {
									_scraping_var.certFlag="G";
									_scraping_var.thisSForm.getFinCertList();
								});
							}
							if(_scraping_var.module == "minwon"){
								// 쿠콘 스크래핑에서 금융인증서 등록 기능없음.
							}
						}
						else {
							_scraping_var.thisSForm.endLoading();
							MobPopup.showAlertPopup(output1.ErrorMessage + "<br>[오류코드:" + output1.ErrorCode + "]", "안내", function() {
								uf_goStep(_scraping_var.parentStepNo);
							});
						}
					}
					else {
						_scraping_var.thisSForm.endLoading();
						MobPopup.showAlertPopup("일시적인 서버장애로 금융인증서 등록에 실패했습니다. 잠시 후 다시 거래해주시기 바랍니다." + "<br>[오류코드:99999998]", "안내", function() {
							uf_goStep(_scraping_var.parentStepNo);
						});
					}
				};

				fcb = function(dat){
					_scraping_var.thisSForm.endLoading();
					MobPopup.showAlertPopup("일시적인 서버장애로 금융인증서 등록에 실패했습니다. 잠시 후 다시 거래해주시기 바랍니다." + "<br>[오류코드:99999998]", "안내", function() {
						uf_goStep(_scraping_var.parentStepNo);
					});
				}
			}
			comScrUtil.doScraping(params, scb, fcb);
		},
		getScrapingData : function() {
			var params = [];
			var param  = {};
			var errorCode    = "99999998";
			var errorMessage = "일시적인 서버장애로 정보 조회에 실패했습니다. 잠시 후 다시 거래해주시기 바랍니다.";
			if(_scraping_var.certType == "C"){
				if(_scraping_var.module == "hometax"){
					param = {
						Module : "HomeTax",
						Class : "PC조회발급서비스",
						Job : "로그인",
						Input : {
							"로그인방식" : "CERT",
							"사용자아이디" : "",
							"사용자비밀번호" : "",
							"인증서" : {
								"이름" : "",
								"만료일자" : "",
								"비밀번호" : "",
								"_inputlength" : "",
							}
						}
					}
					param.Input["인증서"]["이름"]         = _scraping_var.certInfo.rdn;
					param.Input["인증서"]["만료일자"]     = _scraping_var.certInfo.expyYmd;
					param.Input["인증서"]["비밀번호"]     = _scraping_var.certInfo.password;
					param.Input["인증서"]["_inputlength"] = _scraping_var.certInfo.inputlength;
	
					params.push(param);
					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.hometax.params, '*BZN*', _scraping_var.bzn);
						params = params.concat(JSON.parse(JSON.stringify(_scraping_var.hometax.params)));
					}
					param = {
						Module : "HomeTax",
						Class : "PC조회발급서비스",
						Job : "로그아웃",
						Input : {}
					}
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					param = {
						Module: 'MinWon',
						Class : '민원신청조회',
						Job   : '로그인',
						Input : {
							'로그인방식': 'CERT',
							'인증서': {
								'이름': '',
								'만료일자': '',
								'비밀번호': ''
							}
						}
					}
					param.Input["인증서"]["이름"]         = _scraping_var.certInfo.rdn;
					param.Input["인증서"]["만료일자"]     = _scraping_var.certInfo.expyYmd;
					param.Input["인증서"]["비밀번호"]     = _scraping_var.certInfo.password;
					param.Input["인증서"]["_inputlength"] = _scraping_var.certInfo.inputlength;
					params.push(param);

					$(_scraping_var.minwon.params).each(function(i, param) {
						var job = param['Job'];
						
						if(job == "주민등록표등초본교부"){
							param.Input['시도'] = _scraping_var.minwon.area.wideArea;
							param.Input['시군구'] = _scraping_var.minwon.area.localArea;
						}
					});

					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.minwon.params, '*BZN*', _scraping_var.bzn);
						params = params.concat(JSON.parse(JSON.stringify(_scraping_var.minwon.params)));
					}
					param = {
						Module : "MinWon",
						Class : "민원신청조회",
						Job : "로그아웃",
						Input : {}
					}
					params.push(param);
				}

			} else if(_scraping_var.certType == "F") {
				if(_scraping_var.module == "hometax"){
					param = {
						Module : "HomeTax",
						Class  : "PC조회발급서비스",
						Job    : "FIN_CERT",
						Input  : {
							"res"     : [{
								"signedVals":_scraping_var.certSign.signedVals,
								"certificate":_scraping_var.certSign.certificate,
								"rValue":_scraping_var.certSign.rValue,
								"certSeqNum":_scraping_var.certSign.certSeqNum.toString()
							}],
							"로그인방식":"FIN_CERT"
						}
					};
					params.push(param);
					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.hometax.params, '*BZN*', _scraping_var.bzn);
						params = params.concat(JSON.parse(JSON.stringify(_scraping_var.hometax.params)));
					}
					param = {
						Module : "HomeTax",
						Class : "PC조회발급서비스",
						Job : "로그아웃",
						Input : {}
					}
					params.push(param);
				}
				if(_scraping_var.module == "minwon"){
					param = {
						Module : "MinWon",
						Class  : "민원신청조회",
						Job    : "FIN_CERT",
						Input  : {
							"res"     : [{
								"signedVals":_scraping_var.certSign.signedVals,
								"certSeqNum":_scraping_var.certSign.certSeqNum.toString()
							}],
							"로그인방식":"FIN_CERT"
						}
					};
					params.push(param);

					$(_scraping_var.minwon.params).each(function(i, param) {
						var job = param['Job'];
						
						if(job == "주민등록표등초본교부"){
							param.Input['시도'] = _scraping_var.minwon.area.wideArea;
							param.Input['시군구'] = _scraping_var.minwon.area.localArea;
						}
					});

					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.minwon.params, '*BZN*', _scraping_var.bzn);
						params = params.concat(JSON.parse(JSON.stringify(_scraping_var.minwon.params)));
					}
					param = {
						Module : "MinWon",
						Class : "민원신청조회",
						Job : "로그아웃",
						Input : {}
					}
					params.push(param);
				}
			} else if(_scraping_var.certType == "I") {
				if(_scraping_var.module == "hometax"){
					var hometaxId = $("#hometax_id").val();
					var hometaxPwd = $("#hometax_pwd").attr("realValue");
					var hometaxLength = $("#hometax_pwd").val().length;
					param = {
						Module : "HomeTax",
						Class  : "PC조회발급서비스",
						Job    : "로그인",
						Input  : {
							"로그인방식":"ID",
							"사용자아이디": hometaxId,
							"사용자비밀번호": hometaxPwd,
							"_inputlength": hometaxLength,
						}
					};
					params.push(param);
					
					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.hometax.params, '*BZN*', _scraping_var.bzn);
						//홈텍스 id/pw 제외 job:개인사업자업종조회,부가가치세과세표준증명원,납부내역증명
						var tempParams = [];
						$(_scraping_var.hometax.params).each(function(i, param){
							var exceptJobList = ["개인사업자업종조회","부가가치세과세표준증명원","납부내역증명"];
							if(!exceptJobList.includes(param.Job)){
								tempParams.push(param);
							}
						});

						params = params.concat(tempParams);
					}
					param = {
						Module : "HomeTax",
						Class : "PC조회발급서비스",
						Job : "로그아웃",
						Input : {}
					}
					params.push(param);
				}
				if(_scraping_var.module == "cardsales"){
					var cardsalesId = $("#cardsales_id").val();
					var cardsalesPwd = $("#cardsales_pwd").attr("realValue");
					var cardsalesLength =  $('#cardsales_pwd').val().length;
					param = {
						Module : "cardsales",
						Class : "가맹점카드매출",
						Job : "로그인",
						Input : {
							"로그인방식" : "ID",
							"사용자아이디" : cardsalesId,
							"사용자비밀번호" : cardsalesPwd,
							"_inputlength" : cardsalesLength,
							"인증서" : {
								"이름" : "",
								"만료일자" : "",
								"비밀번호" : ""
							}
						}
					};
					params.push(param);

					if(_scraping_var.isFailRetry){
						var failParams = [];
						$(_scraping_var.params).each(function(i, param){
							if((i != 0 && i != _scraping_var.params.length -1 ) && 
							param.Output.successYn == "N"){
								var tmpParam = JSON.parse(JSON.stringify(param));
								_scraping_var.failRetryIndexList.push(param.Output.Index);
								delete tmpParam['Output'];
								delete tmpParam['Set'];

								failParams.push(tmpParam);
							}
						});
						params = params.concat(failParams);
					}else{
						uf_replaceValue(_scraping_var.cardsales.params, '*BZN*', _scraping_var.bzn);
						params = params.concat(JSON.parse(JSON.stringify(_scraping_var.cardsales.params)));
					}

					param = {
						Module : "cardsales",
						Class : "가맹점카드매출",
						Job : "로그아웃",
						Input : {}
					};
					params.push(param);					
				}
			}
			
			if(!_scraping_var.isFailRetry){
				_scraping_var.params = JSON.parse(JSON.stringify(params));
				$(params).each(function(i, param) {
					delete param['Set'];
				});
			}

			var dummy = _scraping_var[_scraping_var.module].dummy;

			function scb (dat){
				if(Object.keys(dat).length == 1){
					var res_data = JSON.parse(JSON.stringify(dat["Output1"]));

					if(res_data["ErrorCode"] == "80004016" && (_scraping_var.module == "hometax" || _scraping_var.module == "minwon")){
						//해당 사이트에 회원등록 안됌
						_scraping_var.thisSForm.endLoading();
						var moduleName = "";
						if(_scraping_var.module == "hometax"){
							moduleName = "홈택스";
						}
						if(_scraping_var.module == "minwon"){
							moduleName = "정부24";
						}
						MobPopup.showAlertPopup(moduleName+" 회원만 정보 조회를 할 수 있어요. "+moduleName+" 회원가입 후 이용해 주세요.", "안내", function() {
							$(_scraping_var.parentId).find("#btn_get_cert").click();
						});
						return;
					}else if(res_data["ErrorCode"] == "80004107" && (_scraping_var.module == "hometax" || _scraping_var.module == "minwon")){
						//인증서 등록 안됌
						_scraping_var.thisSForm.endLoading();
						MobPopup.showAlertPopup("인증서가 등록되지 않았습니다.<br>인증서 등록 여부를 '아니요'로 선택하신 후 이용해 주시기 바랍니다.", "안내", function() {
							if(_scraping_var.module == "hometax"){
								$("#step"+_scraping_var.hometaxStepNo).find("#btn_reg_n").click();
								if(_scraping_var.certType == "C"){
									uf_goStep(_scraping_var.hometaxStepNo);
								}
							}
							if(_scraping_var.module == "minwon"){
								$("#step"+_scraping_var.minwonStepNo).find("#btn_reg_n").click();
								uf_goStep(_scraping_var.minwonStepNo);
							}
						});
						return;
					}else if(res_data["ErrorCode"] != "00000000"){
						for(var i = 0; i < _scraping_var.params.length; i++){
							dat["Output" + (i+1)] = res_data;
						}
					}
				}

				for(var i = 0; i < Object.keys(dat).length; i++) {
					var isSkip = false;
					var exceptionCode = [];
					
					var res_data = JSON.parse(JSON.stringify(dat["Output" + (i+1)]));
					
					if(_scraping_var.isFailRetry){
						if((i != 0 && i != Object.keys(dat).length - 1 )){
							res_data["Index"] = _scraping_var.failRetryIndexList[i-1];
							if(isEmpty(res_data)) {
								res_data["ErrorCode"] = errorCode;
								res_data["ErrorMessage"] = errorMessage;
								res_data["successYn"] = "N";
								_scraping_var.params[res_data["Index"]]["Output"] = res_data;
							} else if(isSkip){
								res_data["successYn"] = "Y";
							}else if(!exceptionCode.includes(res_data["ErrorCode"]) && res_data["ErrorCode"] != "00000000") { //정상거래가 아닐경우
								res_data["successYn"] = "N";
							} else{
								res_data["successYn"] = "Y";
							}
							
							_scraping_var.params[res_data["Index"]]["Output"] = res_data;
						} else {
							if(isEmpty(res_data)) {
								res_data["ErrorCode"] = errorCode;
								res_data["ErrorMessage"] = errorMessage;
								res_data["successYn"] = "N";
								_scraping_var.params[i]["Output"] = res_data;
							}else if(res_data["ErrorCode"] != "00000000") { //정상거래가 아닐경우
								res_data["successYn"] = "N";
							}
							var loginOutIndex = i == 0 ? 0 : _scraping_var.params.length - 1;
							res_data["Index"] = loginOutIndex;
							_scraping_var.params[loginOutIndex]["Output"] = res_data;
						}
					}else{
						res_data["Job"] = _scraping_var.params[i]["Job"];
						res_data["Index"] = i;
						
						if(_scraping_var.params[i]["Set"]){
							if(_scraping_var.params[i]["Set"]["스킵여부"]){
								isSkip = _scraping_var.params[i]["Set"]["스킵여부"] == "Y" ? true : false;
							}
							if(_scraping_var.params[i]["Set"]["예외코드"]){
								exceptionCode = _scraping_var.params[i]["Set"]["예외코드"];
							}
						}

						if(isEmpty(res_data)) {
							res_data["ErrorCode"] = errorCode;
							res_data["ErrorMessage"] = errorMessage;
							res_data["successYn"] = "N";
							_scraping_var.params[i]["Output"] = res_data;
						} else if(isSkip){
							res_data["successYn"] = "Y";
						} else if(exceptionCode.includes(res_data["ErrorCode"])){
							res_data["successYn"] = "Y";
						} else if(res_data["ErrorCode"] != "00000000") { //정상거래가 아닐경우
							res_data["successYn"] = "N";
						} else{
							res_data["successYn"] = "Y";
						}
						
						_scraping_var.params[i]["Output"] = res_data;
					}
				}

				var isSuccess = true;
				$(_scraping_var.params).each(function(i, param){
					if((i != 0 && i != _scraping_var.params.length - 1 )){
						if(param.Output != null && param.Output.successYn == "N"){
							isSuccess = false;
						}
					}
				});
	
				_scraping_var.thisSForm.endLoading();
				if(isSuccess){
					_scraping_var[_scraping_var.module].successCallback(dat);
				}else{
					_scraping_var.thisSForm.drawFailResult();
				}
			}
			function fcb (dat){
				_scraping_var.thisSForm.endLoading();
				var res_data = {};
				res_data["ErrorCode"] = errorCode;
				res_data["ErrorMessage"] = errorMessage;
				res_data["successYn"] = "N";
				for(var i = 0; i < _scraping_var.params.length; i++){
					_scraping_var.params[i]["Output"] = res_data;
				}
				_scraping_var.thisSForm.drawFailResult();
			};
			
			comScrUtil.doScraping(params, scb, fcb, dummy);
		},
		drawFailResult : function() {
			$("#scraping_result_module").html(_scraping_var.moduleName);
			var scraping_result_list = [];
			$(_scraping_var.params).each(function(i, param){
				if(i != 0 && i != _scraping_var.params.length -1 ){
					var scraping_result = {
						"result_job":param.Job
						,"success_yn":param.Output.successYn
						,"result_error":"오류코드:" + param.Output.ErrorCode + "<br>" + param.Output.ErrorMessage
					}
					scraping_result_list.push(scraping_result);
				}
			});
			var scraping_result_ul = jex.getJexObj($("#scraping_result_ul"), "JEX_MOBILE_LIST");
			scraping_result_ul.setAll(scraping_result_list);
			var successCnt = 0;
			$(_scraping_var.params).each(function(i, param){
				if(i != 0 && i != _scraping_var.params.length -1 ){
					if(param.Output.successYn == "Y"){
						successCnt++;
						$("#result_y_"+(i-1)).show();
						$("#result_n_"+(i-1)).hide();
					}else{
						$("#result_y_"+(i-1)).hide();
						$("#result_n_"+(i-1)).show();
					}
				}
			});
			
			if(_scraping_var.retryCnt > 1 || successCnt == 0 || _scraping_var.certType == "F"){
				$("#step"+_scraping_var.failResultStepNo).find("#div_retry_btn").hide();
				$("#step"+_scraping_var.failResultStepNo).find("#div_fail_btn").show();
				$("#step"+_scraping_var.failResultStepNo).find("#scraping_fail_msg").html("정보를 조회할 수 없습니다<br>다시 조회해 주세요.");
			}else{
				$("#step"+_scraping_var.failResultStepNo).find("#scraping_fail_msg").html("조회하지 못한 정보가 있어요<br>다시 조회해 주세요.");
			}
			
			if(jex.plugin.get("JEX_MOBILE_STEP").getStepNo() != _scraping_var.failResultStepNo){
				uf_goStep(_scraping_var.failResultStepNo);
				comLottieUtil.play("scraping_fail_lottie");
			}
		},
		showMinwonArea : function(data) {
			_scraping_var.minwon.area.areaType = data == null ? "" : data;
			_scraping_var.minwon.area.isShowArea = true;
		},
		showHometaxIdPw : function() {
			_scraping_var.hometax.isShowIdPw = true;
		},
		startLoading : function() {
			$.nativeCall("showLoading", [{"type" : "2", "message" : "정보를 가져오는 중입니다.\n잠시만 기다려 주세요", "time_out": 180 }]);
		},
		endLoading : function(func) {
			$.nativeCall("hideLoading", [{}]);
		},
		getMinwonArea : function() {
			var params = [];
			var param  = {};
			var scb, fcb;
			param = {
				Module: 'MinWon',
				Class : '민원신청조회',
				Job   : '행정구역검색',
				Input : {
					'조회구분': _scraping_var.minwon.area.areaType,
				}
			}
			params.push(param);
			scb = function(dat){
				_scraping_var.minwon.area.areaList = dat["Output1"]["Result"]["행정구역목록"];
			
				var wide_area_list = [];
				$.each(_scraping_var.minwon.area.areaList, function(idx, obj){
					wide_area_list.push({"code":idx, "code_nm":obj['시도']});
				});
				var ul_wide_area = jex.getJexObj($("#ul_wide_area"), "JEX_MOBILE_LIST");
				ul_wide_area.setAll(wide_area_list);
				var ul_local_area = jex.getJexObj($("#ul_local_area"), "JEX_MOBILE_LIST");
				ul_local_area.setAll([]);
			};
			fcb = function(dat){
				MobPopup.showAlertPopup("[오류메시지]"+dat["ErrorMessage"]);
			};
			comScrUtil.doScraping(params, scb, fcb);
		},
		//기존 업무 페이지의 uf_back 유지하면서 uf_back 재정의하기
		overrideUfBack : function() {
			var scraping_prev_uf_back = uf_back;
			if(scraping_prev_uf_back.toString().indexOf("scraping_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
					
					if(_scraping_var.finCertSign){
						if(_scraping_var.personalFlag == "C"){
							FinCertCorpSdkScraping.abort();
						}else{
							FinCertSdkScraping.abort();
						}
						_scraping_var.finCertSign = false;
						return;
					}else if(curStepNo == _scraping_var.hometaxStepNo ||
							curStepNo == _scraping_var.minwonStepNo ||
							curStepNo == _scraping_var.cardsalesStepNo ||
							curStepNo == _scraping_var.certListStepNo ||
							curStepNo == _scraping_var.failResultStepNo){
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
						return;
					}
					scraping_prev_uf_back.apply(this, arguments);
				}
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_SCRAPING", JexMobileScraping, "data-jx-scraping");
})();



var FinCertSdkScraping = {
	loadSdk : function(){
		if (_isRealApp) {
			var elemSrc = "";
			if (_isDevMode) {
				elemSrc = "https://t-4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
			} else {
				elemSrc = "https://4user.yeskey.or.kr/v1/fincert.js?dt=" + g_getDate("yyyymmdd");
			}
			
			var reqData = {};
			if (!document.getElementById("fincertSdk")) {
				var scriptElem = document.createElement("script");
				scriptElem.src = elemSrc;
				scriptElem.id = "fincertSdk";

				document.querySelector('body').appendChild(scriptElem);

				scriptElem.onerror = function(){
					MobPopup.showAlertPopup("금융결제원과의 통신에 실패하였습니다. 고객센터에 문의해주세요.", "안내", function () {});
					return;
				};

				scriptElem.onload = function() {
					FinCertSdkScraping.init();
				}
			}
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
			orgCode : _scraping_var.appInfo.orgCode,
			apiKey : _scraping_var.appInfo.apiKey,
			clientOrigin : _scraping_var.appInfo.appId,
			uniqVal : _scraping_var.appInfo.deviceId,
			clientType : _scraping_var.appInfo.deviceOS,
			cssUrls : ["/css/phone/cert2.css"],
		});
	},
	abort: function() {
		FinCert.Sdk.abort({
			callback : function() {
//				uf_goStep(1);
			}
		});
	}
}

var FinCertCorpSdkScraping = {
	    loadSdk : function() {
		if (_isRealApp) {
			var elemSrc = "";
			if (_isDevMode) {
				elemSrc = "https://t-4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd"); //(금융인증서) TEST인 경우
			} else {
				elemSrc = "https://4user.yeskey.or.kr/v1/fincertCorp.js?dt=" + g_getDate("yyyymmdd");   //(금융인증서) REAL인 경우
			}
			var reqData = {};
			if (!document.getElementById("fincertCorpSdk")) {
				var scriptElem = document.createElement("script");
				scriptElem.src = elemSrc;
				scriptElem.id = "fincertCorpSdk";
	
				document.querySelector('body').appendChild(scriptElem);
	
				scriptElem.onerror = function() {
					MobPopup.showAlertPopup("금융결제원과의 통신에 실패하였습니다. 고객센터에 문의해주세요.", undefined, function () {});
					return;
				};
	
				scriptElem.onload = function() {
					FinCertCorpSdkScraping.init();
				}
			}
		}
	},
	init : function() {
		FinCertCorp.Sdk.init({
			success : function(){
                if (typeof callback == "function") {
                    callback.apply();
                }
			},
			fail : function(err) {
                MobPopup.showErrorPopup(String(err.code), err.message);
			},
			raIssueAppFunc : function() {
				comWebkey_goMenu("5005", "cmc_fin_010101_1", null);
			},
			orgCode : _scraping_var.appInfo.orgCode,
			apiKey : _scraping_var.appInfo.apiKey,
			clientOrigin : _scraping_var.appInfo.appId,
			uniqVal : _scraping_var.appInfo.deviceId,
			clientType : _scraping_var.appInfo.deviceOS,
			cssUrls : ["/css/phone/cert2.css"],
		});
	},
	abort: function() {
		FinCertCorp.Sdk.abort({
			callback : function() {
//				uf_goStep(1);
			}
		});
	}
};

/* 시도 설정 */
function uf_setWideArea($jq, data) {
	_scraping_var.minwon.area.wideArea = $.trim(data["code_nm"]);
	$("#spn_wide_area").text(data["code_nm"]);
	$("#spn_wide_area").focus();
	comSelectPopUtil.setActiveClass($jq);
	//시군구 리스트 셋팅
	//행정구역 필터링
	var tmp_list = _scraping_var.minwon.area.areaList[data["code"]]['시군구'];
	var mw_area_list_detail = [];
	$.each(tmp_list, function(idx, obj){
		mw_area_list_detail.push(obj.split(' ')[0]);
	});
	$.unique(mw_area_list_detail);

	var local_area_list = [];
	if(!isEmpty(mw_area_list_detail) && mw_area_list_detail.length > 0){
		$.each(mw_area_list_detail, function(idx, obj){
			local_area_list.push({"code":idx, "code_nm":obj});
		});
	}
	else{
		//세종특별자치시 같은 경우
		local_area_list.push({"code":data["code_nm"], "code_nm":data["code_nm"]});
	}
	
	var ul_local_area = jex.getJexObj($("#ul_local_area"), "JEX_MOBILE_LIST");
	ul_local_area.setAll(local_area_list);

	_scraping_var.minwon.area.localArea = "";
	$("#spn_local_area").text("선택");

	return {};
}

/* 시군구 설정 */
function uf_setLocalArea($jq, data) {
	_scraping_var.minwon.area.localArea = $.trim(data["code_nm"]);
	$("#spn_local_area").text(data["code_nm"]);
	$("#spn_local_area").focus();
	comSelectPopUtil.setActiveClass($jq);
	return {};
}

function uf_replaceValue(obj, targetValue, newValue){
	for (let key in obj) {
		if (obj.hasOwnProperty(key)){
			//현재 키의 값이 객체일 경우 재귀호출
			if(typeof obj[key] === 'object' && obj[key] !== null){
				uf_replaceValue(obj[key], targetValue, newValue);
			}
			//현재 키의 값이 targetValue일 경우, newValue로 치환
			else if (obj[key] === targetValue){
				obj[key] = newValue;
			}
		}
	}
}

function scrapTermCallBack() {
	var target =  $('#scraping_term_pop');
	var chks = target.find('input[type=checkbox]').length;
	var termsChked = target.find('input:checkbox:checked').length;
	if (chks == termsChked){
		$("#scraping_term_pop #btn_get_scraping").prop("disabled", false).removeClass("disabled");
	} else {
		$("#scraping_term_pop #btn_get_scraping").prop("disabled", true);
	}
}


var comm = {
	base64 : {
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
