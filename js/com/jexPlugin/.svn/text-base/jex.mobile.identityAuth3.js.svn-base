/******************************************************************************
* @ 업 무 명    	: 신분증인증
* @ 업무설명		: 신분증인증(인증센터)
* @ 파 일 명    	: /js/mobcom/jexUiPlugin/jex.mobile.identityAuth3.js
* @ 작 성 자    	: 김미형
* @ 작 성 일    	: 2024. 02. 21.
************************** 변 경 이 력 *******************************************
* 번호  작 업 자    작  업  일                       	변경내용
*******************************************************************************
*    1  김미형 		2024. 02. 21.  					 최초 작성
******************************************************************************/
(function() {

	var idtDocAuthAttr = {
		"id"			: "data-jx-IdtDocAuth3-id",			//ID
		"iap"			: "data-jx-IdtDocAuth3-iap",			//첫계좌거래		
		"callBack"		: "data-jx-IdtDocAuth3-callBack",	//콜백함수
	};

	var JexMobileIdtDocAuth3 = JexPlugin.extend({
		init: function () {

		}
		/**
		 * @method load
		 * data-jx-identityAuth 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		,load: function (attr, $jq) {
			this.initSetConfig($jq);
		}
		,initSetConfig : function($jq) {
			idtDocAuth.config.id 		= $jq;
			idtDocAuth.config.iap  		= $jq.attr(idtDocAuthAttr.iap);			
			idtDocAuth.config.callBack 	= $jq.attr(idtDocAuthAttr.callBack);
		}
		/**
		* @description 고객정보 가져오기
		*/
		,getUserData : function() {
			try {
				var ajax = jex.createAjaxUtil("nff_acn_011901_6");
				ajax.setAsync(false);
				ajax.set("task_package"		,"nff" );//[필수]업무 package
				ajax.set("task_subpackage"	,"acn" );//[필수]업무 package
				ajax.set("iapYN"			,idtDocAuth.config.iap) // 첫계좌여부

				return ajax.execute(function(dat) {
					var returnData = dat["_tran_res_data"][0];

					idtDocAuth.userData.RNN1 	= returnData.RNN1;
					idtDocAuth.userData.RNN2 	= returnData.RNN2;
					idtDocAuth.userData.CSM 	= returnData.CSM;
					idtDocAuth.userData.OCV_USE_YN 	= returnData.OCV_USE_YN; // 신분증사본검증 사용여부 넵소아프로퍼티에 등록
				
				});
			} catch(e) {bizException(e, "idtDocAuth.userData Exception");}
		}
		,execute : function(action, $jq) {
			
		}
		
		,drawOcrInfo : function($jq) {
			var html = '';
			html +='	<div class="container_wrap">';
			html +='		<h1 class="blind">신분증 촬영</h1>';

			html +='		<div class="group full">';
			html +='			<div class="idCard_wrap">';
			html +='				<h1>주민등록증 또는 운전면허증을<br>촬영해주세요.</h1>';
			html +='				<div class="motion_area">';
			html +='					<div class="motion_inner">';
			html +='						<img src="/img/csb/img_card.png" alt="바닥에 위치한 신분증">';
			html +='						<span class="step01"></span>';
			html +='						<span class="step02"></span>';
			html +='						<span class="step03"></span>';
			html +='					</div>';
			html +='				</div>';
			html +='				<div class="check_list_area">';
			html +='					<ul class="check_list">';
			html +='						<li>신분증의 앞면이 보이도록 <strong class="txt_blue">약간 어두운 조명</strong>과 <strong class="txt_blue">어두운 배경</strong>에 놓아주세요.</li>';
			html +='						<li><strong class="txt_blue">빛 반사가 되지 않도록 방향을 조절</strong>해 주시거나, 약간 <strong class="txt_blue">기울여서 촬영</strong>하시면 빛 반사를 최소화 할 수 있어요.</li>';
			html +='						<li>가이드 영역에 맞추어 신분증 원본을 세로로 촬영해 주세요.</li>';
			html +='						<li>정보 확인이 어렵거나, 훼손/유효하지 않은 신분증은 거절될 수 있어요.</li>';
			html +='					</ul>';
			html +='				</div>';
			html +='			</div>';
			html +='		</div>';
			html +='	</div>';
			html +='	<div class="btn_b_wrap">';
			html +='		<div class="btn_b_area">';
			html +='			<button type="button" class="btn_blue" onClick="idtDocAuth.doOcr()">신분증 촬영</button>';
			html +='	</div>';
			html +='</div>';
			
			$jq.html(html);
			
		}
		,drawIdentityInfo : function($jq){
			// img, 발급년월일, 운전면허번호 처리
			img = new Image;
			var ymd = "";
			var ICTV_DRLC_NO1_HIDDEN = "";
			var ICTV_DRLC_NO1 = "";
			var ICTV_DRLC_NO2 = "";
			var ICTV_DRLC_NO3 = "";

			if(idtDocAuth.ocrData.MANUAL){//수기입력
				img.src = "data:image/jpeg;base64," + idtDocAuth.ocrData.img64MaskData;
			}else{//촬영데이터 추출
				img.src = "data:image/jpeg;base64," + idtDocAuth.ocrData.img64MaskData;
				if(idtDocAuth.ocrData.ISS_YMD){
					ymd = idtDocAuth.ocrData.ISS_YMD;
				}

				if(idtDocAuth.ocrData.ICTV_DRLC_NO && idtDocAuth.ocrData.ICTV_DRLC_NO.length >= 7){
					ICTV_DRLC_NO1 = idtDocAuth.ocrData.ICTV_DRLC_NO.substring(0,2);
					ICTV_DRLC_NO2 = idtDocAuth.ocrData.ICTV_DRLC_NO.substring(2,4);
					ICTV_DRLC_NO3 = idtDocAuth.ocrData.ICTV_DRLC_NO.substring(4,7);

					//지역번호
					switch(ICTV_DRLC_NO1){
						case '서울' :
							ICTV_DRLC_NO1_HIDDEN ='11';
							break;
						case '부산' :
							ICTV_DRLC_NO1_HIDDEN ='12';
							break;
						case '경기' :
							ICTV_DRLC_NO1_HIDDEN ='13';
							break;
						case '경기' :
							ICTV_DRLC_NO1_HIDDEN ='28';
							break;
						case '강원' :
							ICTV_DRLC_NO1_HIDDEN ='14';
							break;
						case '충북' :
							ICTV_DRLC_NO1_HIDDEN ='15';
							break;
						case '충남' :
							ICTV_DRLC_NO1_HIDDEN ='16';
							break;
						case '전북' :
							ICTV_DRLC_NO1_HIDDEN ='17';
							break;
						case '전남' :
							ICTV_DRLC_NO1_HIDDEN ='18';
							break;
						case '경북' :
							ICTV_DRLC_NO1_HIDDEN ='19';
							break;
						case '경남' :
							ICTV_DRLC_NO1_HIDDEN ='20';
							break;
						case '제주' :
							ICTV_DRLC_NO1_HIDDEN ='21';
							break;
						case '대구' :
							ICTV_DRLC_NO1_HIDDEN ='22';
							break;
						case '인천' :
							ICTV_DRLC_NO1_HIDDEN ='23';
							break;
						case '광주' :
							ICTV_DRLC_NO1_HIDDEN ='24';
							break;
						case '대전' :
							ICTV_DRLC_NO1_HIDDEN ='25';
							break;
						case '울산' :
							ICTV_DRLC_NO1_HIDDEN ='26';
							break;
						default:
							ICTV_DRLC_NO1_HIDDEN = ICTV_DRLC_NO1;
							break;
					}
				}
			}

			var html = '';

			// 신분증진위확인
			html +='<div id="com_sec_080101_1"';
			html +='	data-jx-svc-package="com_sec"'
			html +='	data-jx-svc="com_sec_080101_1"';
			html +='	data-jx-svc-handler-in="com_sec_080101_1.uf_in()"';
			html +='	data-jx-svc-handler-out="com_sec_080101_1.uf_out()"';
			html +='	data-jx-svc-execute="com_sec_080101_1.uf_exec()">';
			html +='</div>';
			
			// 신분증원본확인
			html +='<div id="com_sec_080101_5"';
			html +='	data-jx-svc-package="com_sec"'
			html +='	data-jx-svc="com_sec_080101_5"';
			html +='	data-jx-svc-handler-in="com_sec_080101_5.uf_in()"';
			html +='	data-jx-svc-handler-out="com_sec_080101_5.uf_out()"';
			html +='	data-jx-svc-execute="com_sec_080101_5.uf_exec()">';
			html +='</div>';

			// EFM 전송
			html +='<div id="com_sec_080101_6"';
			html +='	data-jx-svc-package="com_sec"'
				html +='	data-jx-svc="com_sec_080101_6"';
			html +='	data-jx-svc-handler-in="com_sec_080101_6.uf_in()"';
			html +='	data-jx-svc-handler-out="com_sec_080101_6.uf_out()"';
			html +='	data-jx-svc-execute="com_sec_080101_6.uf_exec()">';
			html +='</div>';

			// Bpr 전송
			html +='<div id="com_sec_080101_2"';
			html +='	data-jx-svc-package="com_sec"'
			html +='	data-jx-svc="com_sec_080101_2"';
			html +='	data-jx-svc-handler-in="com_sec_080101_2.uf_in()"';
			html +='	data-jx-svc-handler-out="com_sec_080101_2.uf_out()"';
			html +='	data-jx-svc-execute="com_sec_080101_2.uf_exec()">';
			html +='</div>';


			html +='<div class="container_wrap">';
			html +='	<h1 class="blind">신분증 촬영 확인</h1>';
		
			html +='	<div class="group">';
			html +='		<div class="bx_content2">';
			html +='			<div class="lgn_img_wrap lgn_img_border">';
			html +='				<img src="'+ img.src +'" alt="촬영된 신분증">';
			html +='			</div>';
			html +='			<div class="list_bul_wrap bx_smltxt">';
			html +='				<ul>';
			html +='					<li class="txt_bul">인식된 신분증 정보를 확인해주세요.</li>';
			html +='					<li class="txt_bul">실제 정보와 다른 경우 거래가 제한될 수 있습니다.</li>';
			html +='				</ul>';
			html +='			</div>';
			html +='			<div class="hd_depth2">';
			html +='				<div class="bx_list">';
			html +='					<div class="bx_input bx_input_r">';
			html +='						<label for="name" class="bx_input_tit">이름</label>';
			html +='						<input type="text" class="w60 tr txt_gray" id="name" value="' + idtDocAuth.userData.CSM + '"  >';
			html +='					</div>';
			html +='					<div class="bx_inpcell typ2">';
			html +='						<label for="social_num" class="bx_inpcell_item bx_input_tit">주민등록번호</label>';
			html +='						<span class="bx_inpcell_item">';
			html +='							<input type="text" id="social_num" value="' + idtDocAuth.userData.RNN1 + '" disabled title="주민등록번호 앞 6자리" class="txt_gray tr">';
			html +='						</span>';
			html +='						<span class="bx_inpcell_item">';
			html +='							<input type="text" id="" value="' + idtDocAuth.userData.RNN2 + '" class="tr txt_gray" style="width:14px" title="주민등록번호 뒷자리 1번째번호" disabled>';
			html +='							<input type="password" value="******" style="width:calc(100% - 26px)" title="주민등록번호 뒷자리 두번째부터 마지막번호" class="txt_gray tr" disabled>';
			html +='						</span>';
			html +='					</div>';
						
						
						
			if(idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD == "02"){	// 운전면허증일 경우만
						
				html +='				<div class="bx_inpcell typ2 license_num">';
				html +='					<label for="license1" class="bx_inpcell_item bx_input_tit">면허번호</label>';
				html +='					<span class="bx_inpcell_item license_num_item_1">';
				html +='						<span class="bx_select_sml w100"  onClick="uf_goStep(9001)">';
				html +='							<input type="text" id="ictvDrlcNM" class="select" value="'+ ICTV_DRLC_NO1 +'" >';
				html +='							<input type="hidden" id="driverLicenseNo1"  value="'+ ICTV_DRLC_NO1_HIDDEN +'" maxlength="2" >';
				html +='							<button type="button" class="btn_select" onClick="idtDocAuth.setDriverNumList()"><span class="blind">면허번호 선택</span></button>';
				html +='						</span>';
				html +='					</span>';
				html +='					<span class="bx_inpcell_item license_num_item_2 no_hyphen"><input type="tel" maxlength="2" class="tc w100"  id="driverLicenseNo2" value="'+ ICTV_DRLC_NO2 +'" ></span>';
				html +='					<span class="bx_inpcell_item">';
				html +='						<span class="license_num_item_3">';
				html +='							<input type="tel" id="driverLicenseNo3"   value="'+ ICTV_DRLC_NO3 +'" class="tr" maxlength="3" ><span><input type="password"  id="driverLicenseNo4" maxlength="3" class="tl" readonly></span>';
				
				html +='						</span>';
				html +='					</span>';
				html +='					<span class="bx_inpcell_item license_num_item_4"><input type="password"  id="driverLicenseNo5" class="tc w100" maxlength="2"  readonly></span>';
				html +='				</div>';
						
						
			}
	
			html +='					<div class="bx_input bx_input_r clearable">';
			html +='						<label for="issue_date" class="bx_input_tit">발급일자</label>';
			html +='						<input type="tel"  class="w60 tr"  data-jx-formatter="date"  id="issue_date" value="'+ymd+'">';
			html +='					</div>';
			html +='				</div>';
			html +='			</div>';
			html +='		</div>';
			html +='	</div>';
		
		
			html +='</div>';
			html +='<div class="btn_b_wrap">';
			html +='	<div class="btn_b_area">';
			html +='		<button type="button" class="btn_blue" onClick="idtDocAuth.doOcr()">재촬영</button>';
			html +='		<button type="button" class="btn_blue" onClick="idtDocAuth.confirmBtn()">다음</button>';
			html +='	</div>';
			html +='</div>';
	
	
	
			$jq.html(html);
			idtDocAuth.addEvent();
		}
	});

	jex.plugin.add("JEX_MOBILE_IDTDOCAUTH3", JexMobileIdtDocAuth3, idtDocAuthAttr.id);

})();


var idtDocAuth = {
	callNativeOcrCount : 0
	,prdAthData : {}	// 신분증진위확인 Data
	,idCertifyData : {}	// 신분증원본검증 Data
	,icctData : {}		// 신분증사본검증 Data
	,ocrData : {}		// Native로 받은 ocr결과 Data
	,config : {
		"id"		:	null,
		"iap"		:	false,		
		"callBack"	:	null,
	}
	,drawOcrInfo : function(){
		var that = this;
		var pluginIdent = jex.getJexObj(that.config.id, "JEX_MOBILE_IDTDOCAUTH3");
		pluginIdent.drawOcrInfo(that.config.id);
	}
	,userData : {
		"RNN1"	: null,
		"RNN2"	: null,
		"CSM"	: null,
	}
	,ocrErrorMsg : {
		"errorMessage" : {
			"qa_1" : "신분증 사진이 흐릿하지 않도록\n재촬영해 주세요."
			,"qa_2" : "신분증 사진에 반사광이 없도록\n재촬영해 주세요."
			,"qa_3" : "신분증 사진에 홀로그램이 없도록\n재촬영해 주세요."
			,"qa_4" : "신분증 원본으로 다시 촬영해주세요"
		}
	}
	,driverNumData : {}

	,addEvent : function($jq) {
		// 면허번호 4번째
		$("#driverLicenseNo4").click(function (){
			_callXecureKeypad('driverLicenseNo4', '1', '3', '3', '**-**-***번호-**', null, 'Y', null, 'driverLicenseNo5', "");
		});

		// 면허번호 5번째
		$("#driverLicenseNo5").click(function (){
			_callXecureKeypad('driverLicenseNo5', '1', '2', '2', '**-**-******-번호', null, 'Y');
		});
	}
	,doOcr : function(){
		
		var that = this;
		
		// 2020.12.03 로컬테스트를 위한 소스(신분증진위확인 수동으로 처리됨)
		if (!_isRealApp && that.config.iap == "Y") {
			//2022.12.01(문서번호 183117) 수기검증로직 삭제 - 웹 테스트용으로 코드만 살려둠.
			that.ocrData.MANUAL = true;
			//신분증 선택 삭제(수기검증 삭제) -> 주민등록증으로 임의 하드코딩
			that.ocrData.PLNM_CNFA_CRTI_CD = "01"; // 01 : 주민등록증, 02 : 운전면허증
			that.showOcrData();
		}
		
		that.callNativeOcr(function(result){
			if(result){	// OCR결과가 성공인경우
				that.callNativeOcrCount = 0;	// 횟수 초기화
				that.showOcrData();
			}else{	// 실패
				
				// 아직 2회 미만이라면 한번 더 신분층 촬영로직 호출
				// 카메라호출 앱 플러그인에서 3회 촬영, 3회 * 2 = 6회 촬영 시 팝업
				if(that.callNativeOcrCount < 2){
					MobPopup.showAlertPopup("신분증 인식이 정확하지 않습니다.<br>다시 촬영해주세요", "", function(){
						that.doOcr();
					});
				}else{	// 2회 이상 OCR실패하였을 경우
					that.callNativeOcrCount = 0;
					
					//2022.12.01(문서번호 183117) 수기검증로직 삭제
					MobPopup.showConfirmQckPopup('신분증 인증처리에 실패하였습니다.<br>신분증을 검정색 바탕에 올려놓고 빛<br>반사에 주의하여 다시 촬영해주세요.', "안내", function(){
						that.doOcr();
					},function(){
						MobPopup.showConfirmPopup('거래를 취소하시겠습니까?', "신분증진위확인", function(){
							uf_back(-1);
						},function(){

						});
					},"닫기","재촬영");
				}
			}
		},function(result){
			// fail에 대한 callBack

		});
	}


	/* ocrIdentification 결과값
		성공 시)
			"img64ENCData" : (string) 암호화된 신분증사진
			"img64MaskData " : (string) 화면에 보여질 마스킹된 사진
			"CMS : (string) 고객명
			"PLNM_CNFA_CRTI_CD" : (String) 신분증 진위 확인 신분증 구분코드
			"ICTV_DRLC_NO": (String)  운전면허증 번호
			"ISS_YMD" : (String)  신분증 진위확인 신분증 발급년원일
			"IDCR_PHTG_CHRC_SHP_SCR" : (integer)   신분증 사진 특징점 점수
			"ICTV_PHTG_INFO_CON": (String)  신분증 진위확인 사진 정보 내용
			"ICTV_PHTH_INFO_LEN: (integer)  신분증 진위확인 사진 정보 길이
			"QA_RESULT_CD" : (integer)  신분증 진위확인 결과
		실패 시)
			"errorMessage": (String)에러메세지
	*/
	,callNativeOcr : function(callBackSuccess, callBackFail){
		var that = this;
		that.callNativeOcrCount++;
		$.nativeCall("ocrIdentification",[JSON.stringify(that.ocrErrorMsg)]).done(function(data){	//신분증스캔
			//IDCR_PHTG_CHRC_SHP_SCR = -1 특징점 실패(마스킹된 이미지 받을 수 있음)
			//IDCR_PHTG_CHRC_SHP_SCR = -2 데이터 추출 실패(원본이미지만 받을 수 있음)
			that.ocrData = data;

			//수동여부 초기화 - 수기검증 삭제로 웹테스트환경이 아니면 무조건 여기로 안넘어옴
			that.ocrData.MANUAL = false;

			that.savaNativeOcrReturnData();	// OCR 및 특징점 추출 결과값 저장

			if(!that.ocrData.img64ENCData){
				callBackSuccess(false);
			}else if(!that.ocrData.img64MaskData){
				callBackSuccess(false);
			}
			//2022.12.01(문서번호 183117) - 특징점 점수 70점 미만인 경우 요건 삭제
			else if(eval(that.ocrData.IDCR_PHTG_CHRC_SHP_SCR) < 0){
				callBackSuccess(false);
			}else{
				callBackSuccess(true);
			}

		}).fail(function(data){
			callBackFail(data);
		});
	}
	,savaNativeOcrReturnData : function(){
		try{
			var ajax = jex.createAjaxUtil("nff_acn_011901_7");
			ajax.setAsync(true);
			ajax.setErrTrx(false);
			ajax.set("task_package"				,"nff" );
			ajax.set("task_subpackage"			,"acn" );
			ajax.set("os"						, (_isIphone() ? "I" : "A"));
			ajax.set("iapYN"					, idtDocAuth.config.iap ? "Y" : "N");
			ajax.set("IDCR_PHTG_CHRC_SHP_SCR"	, String(idtDocAuth.ocrData.IDCR_PHTG_CHRC_SHP_SCR));
			ajax.set("PLNM_CNFA_CRTI_CD"		, idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD);
			ajax.set("ICTV_IDCR_DCD"			, idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD);// 로그찍는 공통함수에서 사용하는 필드

			ajax.execute();
		} catch(e) {
			console.error('prd_ath_010101_0 Error');
		}
	}
	,showOcrData : function(){
		var that = this;
		that.callNativeOcrCount = 0;
		var pluginIdent = jex.getJexObj(that.config.id, "JEX_MOBILE_IDTDOCAUTH3");
		pluginIdent.drawIdentityInfo(that.config.id);
		that.setDriverNumList();
	}
	,cancelBtn : function(){
		MobPopup.showConfirmPopup('거래를 취소하시겠습니까?', "신분증진위확인", function(){
			uf_back(-1);
		},function(){

		});
	}
	,confirmBtn : function(){
		var that = this;
		var optionConfirm = {leftBtnName : "다시입력", rightBtnName : "확인"};
		
		MobPopup.showConfirmPopup('촬영한 신분증과 화면에 표시된 정보가 일치합니까?', "신분증진위확인", function(){
			//2022.12.01(문서번호 183117)
			//윗단에서 MANUAL 설정을 웹테스트환경 외에는 삭제해서 MANUAL이 있다는건 테스트환경이란 뜻 혹시몰라 WEB체크 로직도 넣음
			if(!_isRealApp && that.ocrData.MANUAL && that.config.iap == "Y"){	// OCR 실패 Or 특징점 점수가 낮거나 추출 실패하여 수동승인 진행일 경우. 현재는 첫계좌개설만 수동승인이 존재하지만 나중을 위해 첫계좌개설 판단 조건추가
				that.prdAthData.ICTV_RUCD = "N";
				that.prdAthData.NOFC_RLNC_PGRS_SCD = "11";
				
				if(idtDocAuth.userData.OCV_USE_YN == "Y"){ // 신분증사본검증 사용여부가 Y일때 신분증사본검증 실행후 BPR사진 전송
					that.certifyIdentification();
				}
				else {	// Y가 아닐때(N) BPR사진 전송만 실행
					that.sendOcrDataToBpr();				
				}
				
			}else{
				that.authIdentification();
			}
		},
		function(){
			return false;
		},optionConfirm);
	}
	/**
	* @description 신분증 진위확인
	*/
	,authIdentification : function(){
		com_sec_080101_1.load();
		
	}
	/**
	* @description 신분증 원본확인
	*/
	,certifyIdentification : function(){
		com_sec_080101_5.load();
	}
	/**
	 * @description EFM 전송
	 */
	,sendCertifyIdentification : function(){
		com_sec_080101_6.load();
	}
	/**
	* @description 이미지 전송
	*/
	,sendOcrDataToBpr : function(){	// 이미지 전송
		com_sec_080101_2.load();
	}
	
	,setDriverNumList : function(){

		idtDocAuth.driverNumData = [{"optionKey":"11", "optionValue":"11"}, {"optionKey":"12", "optionValue":"12"}, {"optionKey":"13","optionValue":"13"}, {"optionKey":"14","optionValue":"14"},
	        {"optionKey":"15", "optionValue":"15"}, {"optionKey":"16", "optionValue":"16"}, {"optionKey":"17","optionValue":"17"}, {"optionKey":"18","optionValue":"18"},
	        {"optionKey":"19", "optionValue":"19"}, {"optionKey":"20", "optionValue":"20"}, {"optionKey":"21","optionValue":"21"}, {"optionKey":"22","optionValue":"22"},
	        {"optionKey":"23", "optionValue":"23"}, {"optionKey":"24", "optionValue":"24"}, {"optionKey":"25","optionValue":"25"}, {"optionKey":"26","optionValue":"26"}, {"optionKey":"28","optionValue":"28"},
	        {"optionKey":"서울","optionValue":"11"}, {"optionKey":"부산","optionValue":"12"}, {"optionKey":"경기","optionValue":"13"}, {"optionKey":"강원","optionValue":"14"},
			{"optionKey":"충북","optionValue":"15"}, {"optionKey":"충남","optionValue":"16"}, {"optionKey":"전북","optionValue":"17"}, {"optionKey":"전남","optionValue":"18"},
			{"optionKey":"경북","optionValue":"19"}, {"optionKey":"경남","optionValue":"20"}, {"optionKey":"제주","optionValue":"21"}, {"optionKey":"대구","optionValue":"22"},
			{"optionKey":"인천","optionValue":"23"}, {"optionKey":"광주","optionValue":"24"}, {"optionKey":"대전","optionValue":"25"}, {"optionKey":"울산","optionValue":"26"}];

		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		
		var driverNumListHtml = '<div id="driverNumListPopUp"  data-jx-step-no="9001" data-jx-effect="slide" style="display:none;">'
			+ '<h2 class="bd_t">면허번호 선택</h2>'
			+ '<div class="group">'
			+ '	<ul class="list_ty02 arr" id="driverNumList" data-jx-list="driverNumList">'
			+ '		<li data-jx-execute="click" '
			+ '			data-jx-setter="" '
			+ '			data-jx-setter-source="this" '
			+ '			data-jx-setter-handler="idtDocAuth.setDriverNum()" '
			+ '			data-jx-setter-target="#ictvDrlcNM" '
			+ '			data-jx-setter-execute="FUNC@uf_goStep('+cur_step+')" > '
			+ '		<a href="#" role="button"> '
			+ '			<span class="txt_accout" id="optionKey"></span> '
			+ '		</a>'
			+ '	</li>'
			+ '</ul>'
			+ '</div>'
		+ '</div>';

		$('#step').append(driverNumListHtml);
		jex.setJexObj($('#driverNumListPopUp'));

		var driverNumListTbl = jex.getJexObj($("#driverNumList"), "JEX_MOBILE_LIST");
		driverNumListTbl.setAll(idtDocAuth.driverNumData);
	}
	,setDriverNum : function($jq, data){
		data['ictvDrlcNM'] = data['optionKey'];
		$("#driverLicenseNo1").val(data.optionValue);
		return data;
	}
	,validateBeforeSend : function(){
		var whiteList = ["nff_acn_010102_1", "nff_acn_040101_1", "svc_bnk_130101_1", "svc_bnk_150301_1"]
		
		var flag = false;
		var len = 0;
		var uriArr = idtDocAuth.config.id.context.baseURI.split("/");
		len = uriArr.length;
		var tempSvcNo = uriArr[len-1];
		var svcNoArr = tempSvcNo.split(".");
		var svcNo = svcNoArr[0];
		
		$.each(whiteList, function(i, value){
			if(svcNo == value){
				flag = true;
			}
		    
		});
		
		return flag;
	}
	//모바일 신분증
	,doMobileId : function(){
		 alert("추후 적용 예정");
	}
	
}


	




var com_sec_080101_1 = {
	PHN:"",
	load : function(){
		var that = this;
		if(that.validation()){
			// validation 성공시
			jex.setJexObj($('#com_sec_080101_1').attr("data-jx-svc-onload", "true"));
		}else{
			// validation 실패시
		}
	}
	,validation : function(){
		
		if(!$("#issue_date").val() || $("#issue_date").val().length != 8){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
        }

		var date = ($("#issue_date").val()).substr(0,4)+'-'+($("#issue_date").val()).substr(4,2)+'-'+($("#issue_date").val()).substr(6,2);
		if(isNaN(Date.parse(date))){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}
		
		var ocr_iss_yyyy = idtDocAuth.ocrData.ISS_YMD.substr(0,4);
		var iss_yyyy = $("#issue_date").val().substr(0,4);
		
		//184993 타행계좌인증 개선
		//비대면 신분증 촬영 시 발급일자 비교 로직 추가
		if((ocr_iss_yyyy != iss_yyyy) && _isDevMode == false){
			MobPopup.showAlertPopup("유효한 신분증이 아닙니다. 유효한 신분증으로 촬영 부탁드립니다.",undefined, function(){});
			return false;
		}
		
		//2020.12.03 Date 에서 확인못하는 날짜 체크 ex )2월 30일, 4월 31일
		var mm = ($("#issue_date").val()).substr(4,2);
		var dd = ($("#issue_date").val()).substr(6,2);
		if((mm == "04" || mm == "06" || mm == "09" || mm == "11") && dd == "31"){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}else if(mm == "02" && (dd == "30" || dd == "31")){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}


	
		
		// 운전면허증인경우
		if(idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD == "02"){
			var firstNo = $("#driverLicenseNo4").attr("realValue");
			
			if (! firstNo) {
				MobPopup.showAlertPopup("면허번호 3자리를 확인하여주세요.",undefined, function(){});
				return false;
			}
			
			var secondNo = $("#driverLicenseNo5").attr("realValue");
			
			if (! secondNo) {
				MobPopup.showAlertPopup("면허번호 2자리를 확인하여주세요.",undefined, function(){});
				return false;
			}
			
			var driverLicenseNo1 = $("#driverLicenseNo1").val();
			var ictvDrlcNM = $("#ictvDrlcNM").val();

			if(idtDocAuth.driverNumData){
				var findSameOptionKeyFlag = false;
				for(var i=0; i<idtDocAuth.driverNumData.length; i++){
					
					if( (idtDocAuth.driverNumData[i].optionKey == ictvDrlcNM) && (idtDocAuth.driverNumData[i].optionValue == driverLicenseNo1)){
						findSameOptionKeyFlag = true;
						break;
					}
				}

				if(!findSameOptionKeyFlag){
					MobPopup.showAlertPopup("면허번호 앞 2자리를 확인하여주세요.",undefined, function(){});
					valid = false;
					return false;
				}
			}
		}
		return true;
	}
	,uf_in : function($jq, data){
		var inputData = {};
		inputData.RLNM_CNFA_CRTI_CD			= idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD;			// 신분증 진위확인 신분증 구분코드 01 : 주민등록증 , 02 : 운전면허증
		inputData.CSM						= idtDocAuth.userData.CSM;						// 성명
		inputData.ICTV_PHTG_INFO_LEN		= '4668';										//신분증 진위확인 사진 정보 길이(idtDocAuth.ocrData.ICTV_PHTG_INFO_LEN 이나 4668로 고정시킴. 고정값)
		inputData.ICTV_PHTG_INFO_CON		= idtDocAuth.ocrData.ICTV_PHTG_INFO_CON;		//신분증 진위확인 사진 정보 내용
		inputData.IDCR_PHTG_CHRC_SHP_SCR	= String(idtDocAuth.ocrData.IDCR_PHTG_CHRC_SHP_SCR);	//신분증 사진 특징점 점수
		inputData.PROGRAM_VER				= '1';											//js 캐싱으로 jsp 가 먼저반영되는 경우 체크하여 다시시도하도록함

		var that = this;
		if(that.PHN != ""){
			inputData.MOB_NO = that.PHN;
		}		
		
		if(idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD == "02"){	//운전면허증정보
			inputData.ICTV_DRLC_NO1			= $("#driverLicenseNo1").val()+$("#driverLicenseNo2").val()+$("#driverLicenseNo3").val();
			inputData.ICTV_DRLC_NO2			= $("#driverLicenseNo4").attr("realValue");
			inputData.ICTV_DRLC_NO3			= $("#driverLicenseNo5").attr("realValue");
			inputData.ISS_YMD				= $("#issue_date").val().replace(/-/g,"");
        }else{
			inputData.ISS_YMD				= $("#issue_date").val().replace(/-/g,"");
		}
				
		$jq.attr("data-jx-svc-source-direct",JSON.stringify(inputData));
	}
	,uf_out : function($jq,data){
		idtDocAuth.prdAthData = data["_tran_res_data"][0];
		if(idtDocAuth.prdAthData.ICTV_RUCD == "Y"){	// 진위확인 성공					
			idtDocAuth.certifyIdentification();
		}else{	// 진위확인 실패(타임아웃,, 거절 응답 등등)
			
			if(idtDocAuth.prdAthData.SYS_ERR_YN =="Y"){	// 다양한 사유로 인해 정상적인 응답이 안온 경우.(첫계좌가 아닌 경우)
				MobPopup.showAlertPopup("신분증진위확인  오류가 발생하였습니다. 잠시후 다시 진행하여주세요.",undefined, function(){
					// TODO 이경우 개별js로 보내서 처리하는 방식 정리 필요
					var returnParam = {};

					returnParam.id = "com_sec_080101_1";	// 넘기는 ID설정

					// returnParam["SYS_ERR_YN"] 			= "Y";
					// returnParam["ICTV_RUCD"] 			= "N";//진위확인결과
					// returnParam["RLNM_CNFA_CRTI_CD"]		= "";
					// returnParam["ISS_YMD"]				= "";//발행년월일
					// returnParam["RLNM_CNFA_CRTI_CD"	]	= "";// 신분증 진위확인 신분증 구분코드 01 : 주민등록증 , 02 : 운전면허증

					if(idtDocAuth.config.callBack)
						eval(idtDocAuth.config.callBack)(returnParam);

					return false;
				});
			}else if(idtDocAuth.prdAthData.SYS_ERR_YN =="N"){	// 행안부/경찰청에서 거절 응답을 준 경우 -> 재촬영
				MobPopup.showAlertPopup("신분증 정보가 유효하지 않습니다.\n신분증 정보를 확인 부탁 드립니다.\n\n사진에 빛 반사가 없도록 재촬영해 주세요.\n면허번호, 발급일자가 올바른지 확인해 주세요.",undefined, function(){
					idtDocAuth.doOcr();
					return false;
				});
			}
		}
		return;
	}
	,uf_exec : function(){

	}
}

var com_sec_080101_2 = {
	load : function(){
		var that = this;
		if(that.validation()){
			// validation 성공시
			jex.setJexObj($('#com_sec_080101_2').attr("data-jx-svc-onload", "true"));
		}else{
			// validation 실패시
		}
	}
	,validation : function(){

		if(!$("#issue_date").val() || $("#issue_date").val().length != 8){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
        }

		var date = ($("#issue_date").val()).substr(0,4)+'-'+($("#issue_date").val()).substr(4,2)+'-'+($("#issue_date").val()).substr(6,2);
		if(isNaN(Date.parse(date))){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}
		
		//2020.12.03 Date 에서 확인못하는 날짜 체크 ex )2월 30일, 4월 31일
		var mm = ($("#issue_date").val()).substr(4,2);
		var dd = ($("#issue_date").val()).substr(6,2);
		if((mm == "04" || mm == "06" || mm == "09" || mm == "11") && dd == "31"){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}else if(mm == "02" && (dd == "30" || dd == "31")){
			MobPopup.showAlertPopup("발급일을 확인하여주세요.",undefined, function(){});
			return false;
		}

		// 운전면허증인경우
		if(idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD == "02"){
			
			var firstNo = $("#driverLicenseNo4").attr("realValue");
			
			if (! firstNo) {
				MobPopup.showAlertPopup("면허번호 3자리를 확인하여주세요.",undefined, function(){});
				return false;
			}
			
			var secondNo = $("#driverLicenseNo5").attr("realValue");
			
			if (! secondNo) {
				MobPopup.showAlertPopup("면허번호 2자리를 확인하여주세요.",undefined, function(){});
				return false;
			}
			
			var driverLicenseNo1 = $("#driverLicenseNo1").val();
			var ictvDrlcNM = $("#ictvDrlcNM").val();

			if(idtDocAuth.driverNumData){
				var findSameOptionKeyFlag = false;
				for(var i=0; i<idtDocAuth.driverNumData.length; i++){
					
					if( (idtDocAuth.driverNumData[i].optionKey == ictvDrlcNM) && (idtDocAuth.driverNumData[i].optionValue == driverLicenseNo1)){
						findSameOptionKeyFlag = true;
						break;
					}
				}

				if(!findSameOptionKeyFlag){
					MobPopup.showAlertPopup("면허번호 앞 2자리를 확인하여주세요.",undefined, function(){});
					valid = false;
					return false;
				}
			}
		}
		return true;
	}
	,uf_in : function($jq, data){
		var inputData = {};

		inputData.IDT_DOC_AUTH_IAP				=	idtDocAuth.config.iap;						// 첫계좌여부
		inputData.CSM							=	idtDocAuth.userData.CSM;					// 성명
		inputData.BPR_IDX_NO					=	idtDocAuth.prdAthData.BPR_IDX_NO;			// BprIdx 넘버
		inputData.NOFC_RLNC_PGRS_SCD			=	idtDocAuth.prdAthData.NOFC_RLNC_PGRS_SCD;	// 비대면실명확인진행상태코드(신분증진위확인 요청(직원 승인 필요))
		inputData.ICTV_RUCD						=	idtDocAuth.prdAthData.ICTV_RUCD;			// 신분증진위확인결과코드(Y: 진위확인성공, N:진위확인 실패))
		inputData.SYS_ERR_YN					=	idtDocAuth.prdAthData.SYS_ERR_YN;			// 신분증진위확인 실패 상세원인(Y: 거절외 모든 케이스 , N: 거절)
		inputData.RLNM_CNFA_CRTI_CD				=	idtDocAuth.ocrData.PLNM_CNFA_CRTI_CD;		// 신분증 진위확인 신분증 구분코드 01 : 주민등록증 , 02 : 운전면허증
		inputData.MANUAL_YN						=	(idtDocAuth.ocrData.MANUAL ? "Y" : "N");	// 수동승인여부
		inputData.img64ENCData					=	idtDocAuth.ocrData.img64ENCData;

		$jq.attr("data-jx-svc-source-direct",JSON.stringify(inputData));
	}
	,uf_out : function($jq, data){

		// 수동승인인 경우에는 이 단계에서 BPR_IDX_NO를 채워줌
		if(!idtDocAuth.prdAthData.BPR_IDX_NO)
			idtDocAuth.prdAthData.BPR_IDX_NO = data._tran_res_data[0].BPR_IDX_NO;

		var returnParam = {};

		returnParam.id = "com_sec_080101_2";	// 넘기는 ID설정

		// TODO new function으로 교체 필요
		if(idtDocAuth.config.callBack)
			eval(idtDocAuth.config.callBack)(returnParam);

		return;
	}
	,uf_exec : function(){

	}
}

var com_sec_080101_5 = {
	load : function(){		
		jex.setJexObj($('#com_sec_080101_5').attr("data-jx-svc-onload", "true"));		
	}	
	,uf_in : function($jq, data){
		var inputData = {};
		
		inputData.image					=	idtDocAuth.ocrData.img64ENCData;
		inputData.request_id			=	idtDocAuth.prdAthData.RQST_ID;
		inputData.type					=	"CCS";
		
		$jq.attr("data-jx-svc-source-direct",JSON.stringify(inputData));
	}
	,uf_out : function($jq, data){
		idtDocAuth.idCertifyData = data["_tran_res_data"][0];
				
		if(idtDocAuth.idCertifyData.FAIL_YN == "Y") {
            MobPopup.showAlertPopup("신분증 진위확인 서비스가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바랍니다.", "", function(){
                return false;
            });
            
        }else{
            if(idtDocAuth.prdAthData.NFFACN_YN == "Y") {
                if(idtDocAuth.idCertifyData.REAL == "F") {
                    MobPopup.showAlertPopup("촬영된 신분증이 유효하지 않습니다.<br><b>원본 신분증</b>을 재촬영해주시기 바랍니다.", "", function(){
                        return false;
                    });
                }else{                                  
                    idtDocAuth.sendOcrDataToBpr();
                }
            }else{     
                idtDocAuth.sendOcrDataToBpr();
            }
        }
	}
	,uf_exec : function(){
		
	}
}

var com_sec_080101_6 = {
	load : function(){	
		jex.setJexObj($('#com_sec_080101_6').attr("data-jx-svc-onload", "true"));		
	}	
	,uf_in : function($jq, data){
		var inputData = {};
		var dataPart 	= idtDocAuth.idCertifyData;
		var scoreList 	= idtDocAuth.idCertifyData.list;
		var model 		= "";
		var threshold 	= "";
		var value 		= "";
		
		// P1920으로 보낼 데이터 변수
		var icctVrfcMdlCon = "";	// 신분증사본검증모델내용(model)
		var icctVrfcCrtlCon = "";	// 신분증사본검증임계내용(threshold)
		var icctVrfcVrrsCon = "";	// 신분증사본검증결과내용(value)
		
		if(scoreList != null){
			$.each(scoreList, function(index, key){
				inputData["MODEL"+(index+1)] = key.MODEL;
				inputData["THRESHOLD"+(index+1)] = key.THRESHOLD;
				inputData["VALUE"+(index+1)] = key.VALUE;
				
				icctVrfcMdlCon += key.MODEL + "Ø";
				icctVrfcCrtlCon += key.THRESHOLD + "Ø";
				icctVrfcVrrsCon += key.VALUE + "Ø";
			});
			
			icctVrfcMdlCon = icctVrfcMdlCon.slice(0,-1);
			icctVrfcCrtlCon = icctVrfcCrtlCon.slice(0,-1);
			icctVrfcVrrsCon = icctVrfcVrrsCon.slice(0,-1);
		}
		
		inputData.STATUS 		= dataPart.STATUS;
		inputData.MESSAGE 		= dataPart.MESSAGE;
		inputData.REQUEST_ID 	= dataPart.REQUEST_ID;
		inputData.REAL 			= dataPart.REAL;
		inputData.OCV_USE_YN	= idtDocAuth.userData.OCV_USE_YN; //신분증사본검증 사용여부
		
		idtDocAuth.icctData.icctVrfcMdlCon 	= icctVrfcMdlCon;
		idtDocAuth.icctData.icctVrfcCrtlCon = icctVrfcCrtlCon;
		idtDocAuth.icctData.icctVrfcVrrsCon = icctVrfcVrrsCon;
		idtDocAuth.icctData.icctVrfcRucdCon = dataPart.REAL;	//신분증사본검증결과코드내용
		
		$jq.attr("data-jx-svc-source-direct",JSON.stringify(inputData));
	}
	,uf_out : function($jq, data){
		
	}
	,uf_exec : function(){
		
	}
}

function btnOtpNext(){
	uf_goStep(44);
}