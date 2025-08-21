/******************************************************************************
* @ 업 무 명    	: 신분증인증
* @ 업무설명		: 신분증인증(앱방식)
* @ 파 일 명    	: /js/com/jexPlugin/jex.mobile.identityAuth2.js
* @ 작 성 자    	: 박준호
* @ 작 성 일    	: 2020. 09. 15.
************************** 변 경 이 력 *******************************************
* 번호  작 업 자    작  업  일			변경내용
*******************************************************************************
*    2  박성권 		2024. 06. 20.   	기업스마트뱅킹 전면 개편 추진사업
*    1  박준호 		2020. 09. 15.   	최초 작성
******************************************************************************/
window.idtDocAuth$ = {
	attrs : {
		id			: "data-jx-IdtDocAuth-id",									// ID
		iap			: "data-jx-IdtDocAuth-iap",									// 첫계좌거래		
		callBack	: "data-jx-IdtDocAuth-callBack"								// 콜백함수
	},
	data : {},
	userData : {},
	init: function() {
	},
	load: function(attr, $jq) {
		idtDocAuth$.data.id 		= $jq.attr(idtDocAuth$.attrs.id);
		idtDocAuth$.data.iap  		= $jq.attr(idtDocAuth$.attrs.iap);
		idtDocAuth$.data.callBack 	= eval($jq.attr(idtDocAuth$.attrs.callBack));
	},
	execute : function(action, $jq) {			
	},
	
	//--------------------------------------------------------------------------
	steps : new StepManager(),
	stepsSilmul : new StepManager(),
	stepsMobile : new StepManager(),
	service : serviceHandler,

	drawPreInfo : function($jq, _bizDivision) {
		idtDocAuth$.object				= $jq;
		idtDocAuth$.data.bizDivision	= _bizDivision || "X";					// 업무구분코드 설정
		
		// 앱 제목 추출
		try{
			$.nativeCall('getTitleName', []).done(function(_result){
				idtDocAuth$.data.nativeTitle = _result.title;
	        });
		}
		catch(e) { bizException(e, "nativeCall.getTitleName : "); }		

		// 공통 진행 절차
		idtDocAuth$.steps.clear();
		
		idtDocAuth$.steps.append(idtDocAuth$.step_1);							// 고객 정보 확인
		idtDocAuth$.steps.append(idtDocAuth$.step_2);							// 신분증 인증 방법 선택

		// 실물(주민증, 운전면허증) 진행 절차
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_3);						// 신분증 촬영
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_4);						// 촬영 정보 확인
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_5);						// 정보 일치 여부 안내
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_6);						// 신분증 진위확인
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_7);						// 신분증 원본확인
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_8);						// 이미지 전송
		idtDocAuth$.stepsSilmul.append(idtDocAuth$.step_9);						// callback return

		// 모바일 운전면허증 진행 절차
		idtDocAuth$.stepsMobile.append(idtDocAuth$.step_20);					// 모바일 운전면허증 안내
		idtDocAuth$.stepsMobile.append(idtDocAuth$.step_21);					// 모바일 운전면허증 앱 연계
		
		idtDocAuth$.steps.current().run();
	},
	
	//--------------------------------------------------------------------------
	//	고객 정보 확인
	//--------------------------------------------------------------------------
	step_1 : {
		name : "step-1 고객 정보 확인",
		run : function() {
			let result = idtDocAuth$.service("com_sec_120101_1", {iapYN : idtDocAuth$.data.iap}, true);

			if(result) {
				idtDocAuth$.userData.RNN1 				= result.RNN1;
				idtDocAuth$.userData.RNN2 				= result.RNN2;
				idtDocAuth$.userData.CSM 				= result.CSM;
				idtDocAuth$.userData.OCV_USE_YN			= result.OCV_USE_YN;
				idtDocAuth$.userData.MOBILEID_USE_YN	= result.MOBILEID_USE_YN;
	
				idtDocAuth$.steps.next().run();
			}
		}
	},
	//--------------------------------------------------------------------------
	//	신분증 인증 방법 선택
	//--------------------------------------------------------------------------
	step_2 : {
		name : "step-2 신분증 인증 방법 선택",
		run : function() {
			idtDocAuth$.object.html(idtDocAuth$.startPage);
		},
		silmulChwaryeong : function() {											// 실물(주민등록증 또는 운전면허증) 촬영 인증
			idtDocAuth$.steps.find(2);											// 진행단계를 강제로 2단계로 설정
			
			idtDocAuth$.steps.append(idtDocAuth$.stepsSilmul, idtDocAuth$.steps.current(), false); // 1->2->[3->9] 연결
			idtDocAuth$.steps.next().run();
		},
		mobileUnjeonMyeonheo : function() {										// 모바일 운전면허증 인증
			if(idtDocAuth$.userData.MOBILEID_USE_YN != "Y") {
				MobPopup.showAlertPopup("현재 모바일 신분증 앱이 정상 작동 불가합니다. 실물 신분증 촬영 수행 부탁드립니다.");
				return;
			}
			
			idtDocAuth$.steps.find(2);											// 진행단계를 강제로 2단계로 설정

			idtDocAuth$.steps.append(idtDocAuth$.stepsMobile, idtDocAuth$.steps.current(), false); // 1->2->[20->21] 연결
			idtDocAuth$.steps.next().run();
		},
	},
	//--------------------------------------------------------------------------
	//	신분증 촬영
	//--------------------------------------------------------------------------
	step_3 : {
		name : "step-3 신분증 촬영",
		countChwaryeong : 0,													// 촬영 횟수
		ocrErrorMsg : {															// Native 촬영 중 오류 출력 오류 메시지
			errorMessage : {
				qa_1 : "신분증 사진이 흐릿하지 않도록\n재촬영해 주세요.",
				qa_2 : "신분증 사진에 반사광이 없도록\n재촬영해 주세요.",
				qa_3 : "신분증 사진에 홀로그램이 없도록\n재촬영해 주세요.",
				qa_4 : "신분증 원본으로 다시 촬영해주세요"
			}
		},
		ocrData : {},
		run : function() {
			/* ocrIdentification 결과값
				성공 시)
					"img64ENCData" 			 : (string) 암호화된 신분증사진
					"img64MaskData " 		 : (string) 화면에 보여질 마스킹된 사진
					"CMS 					 : (string) 고객명
					"PLNM_CNFA_CRTI_CD" 	 : (String) 신분증 진위 확인 신분증 구분코드
					"ICTV_DRLC_NO"			 : (String) 운전면허증 번호
					"ISS_YMD" 				 : (String) 신분증 진위확인 신분증 발급년원일
					"IDCR_PHTG_CHRC_SHP_SCR" : (integer)신분증 사진 특징점 점수
					"ICTV_PHTG_INFO_CON"	 : (String) 신분증 진위확인 사진 정보 내용
					"ICTV_PHTH_INFO_LEN		 : (integer)신분증 진위확인 사진 정보 길이
					"QA_RESULT_CD" 			 : (integer)신분증 진위확인 결과
				실패 시)
					"errorMessage"			 : (String) 에러메세지
			*/
			$.nativeCall("ocrIdentification", [JSON.stringify(idtDocAuth$.step_3.ocrErrorMsg)]).done(function(_ocrData) {
				idtDocAuth$.step_3.countChwaryeong++;
				
				if(_ocrData.error == "1") {
					// 사용자 취소 (우상단 'X' 선택)
				}
				else if(_ocrData.error == "2") {
					// 촬영은 되었으나, Native오류가 발생한 경우
					idtDocAuth$.step_3.logOcr(_ocrData);
				
					MobPopup.showConfirmQckPopup(
						"신분증 인증처리에 실패하였습니다.<br>신분증을 검정색 바탕에 올려놓고 빛<br>반사에 주의하여 다시 촬영해주세요.",
						"안내",
						function() {
							idtDocAuth$.step_3.countChwaryeong = 0;
							idtDocAuth$.steps.find(3).run();
						},
						function() {
							MobPopup.showConfirmPopup('거래를 취소하시겠습니까?', "신분증 진위확인", function() {
								idtDocAuth$.steps.prev().run();
							}, function() {});
						},
						"닫기",
						"재촬영"
					);
				}
				else {
					idtDocAuth$.step_3.logOcr(_ocrData);
				
					// 이미지 정보가 없거나, 유효하지 않은 경우 --> 재촬영
					if((!_ocrData.img64ENCData) || (!_ocrData.img64MaskData) || (Number(_ocrData.IDCR_PHTG_CHRC_SHP_SCR) < 0)) {
						if(idtDocAuth$.step_3.countChwaryeong < 2) {
							MobPopup.showAlertPopup("신분증 인식이 정확하지 않습니다.<br>다시 촬영해주세요", "", function() {
								idtDocAuth$.steps.find(3).run();
							});
						}
						else {
							MobPopup.showConfirmQckPopup(
								"신분증 인증처리에 실패하였습니다.<br>신분증을 검정색 바탕에 올려놓고 빛<br>반사에 주의하여 다시 촬영해주세요.",
								"안내",
								function() {
									idtDocAuth$.step_3.countChwaryeong = 0;
									idtDocAuth$.steps.find(3).run();
								},
								function() {
									MobPopup.showConfirmPopup('거래를 취소하시겠습니까?', "신분증 진위확인", function() {
										idtDocAuth$.steps.prev().run();
									}, function() {});
								},
								"닫기",
								"재촬영"
							);
						}
						
						return;
					} // if((!_ocrData.img64ENCData) || (!_ocrData.img64MaskData) || (Number(_ocrData.IDCR_PHTG_CHRC_SHP_SCR) < 0)) {
				
					// 성공
					idtDocAuth$.step_3.ocrData	= _ocrData;
					idtDocAuth$.steps.next().run();
				}
			});
		},
		logOcr : function(_ocrData) {											// OCR 촬영정보 기록
			idtDocAuth$.service("nff_acn_011901_7", {
				os						: _isIphone() ? "I" : "A",
				iapYN					: idtDocAuth$.data.iap ? "Y" : "N",
				IDCR_PHTG_CHRC_SHP_SCR	: _ocrData.IDCR_PHTG_CHRC_SHP_SCR,
				PLNM_CNFA_CRTI_CD		: _ocrData.PLNM_CNFA_CRTI_CD,
				ICTV_IDCR_DCD			: _ocrData.PLNM_CNFA_CRTI_CD
			}, true);
		}
	},
	//--------------------------------------------------------------------------
	//	촬영 정보 확인
	//--------------------------------------------------------------------------
	step_4 : {
		name : "step-4 촬영 정보 확인",
		run : function() {
			idtDocAuth$.step_4.viewPage();
			idtDocAuth$.step_4.viewData();
		},
		viewPage : function() {													// 정보확인 화면 구성
			if("01" == idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD) {
				idtDocAuth$.object.html(idtDocAuth$.silmulJeongboPage.replace("{myeonheoBeonho}", idtDocAuth$.silmulJuminBeonhoPage));
			}
			else {
				idtDocAuth$.object.html(idtDocAuth$.silmulJeongboPage.replace("{myeonheoBeonho}", idtDocAuth$.silmulUnjeonBeonhoPage));

				// 보안키패드 이벤트핸들러 등록
				$("#btnIdtDocAuth_unjeon4").off("click").on("click", function() {
					_callXecureKeypad_withCallback('idtDocAuth_unjeon4', '4', '3', '3', '**-**-***번호-**', null, 'N', null, null, function() {
						$("#btnIdtDocAuth_unjeon4").html($('#idtDocAuth_unjeon4').attr('realValue') ? `<span class="marking_wrap"><span class="marking"></span><span class="marking"></span><span class="marking"></span></span>` : `<span class="marking_wrap">3자리</span>`);

						_callXecureKeypad_withCallback('idtDocAuth_unjeon5', '4', '2', '2', '**-**-******-번호', null, 'N', null, null, function() {
							$("#btnIdtDocAuth_unjeon5").html($('#idtDocAuth_unjeon5').attr('realValue') ? `<span class="marking_wrap"><span class="marking"></span><span class="marking"></span></span>` : `<span class="marking_wrap">2자리</span>`);
						});
					});
				});

				// 운전면허번호 지역 선택 팝업창 생성
				if(! $("#bp_selbeonho_step_4").get().length) {
					$(".container_wrap").append(idtDocAuth$.silmulUnjeonBeonhoSelect);
				}
			}
		},
		viewData : function() {
			// 촬영 이미지 출력
			$("#idtDocAuth_image").prop("src", "data:image/jpeg;base64," + idtDocAuth$.step_3.ocrData.img64MaskData);
			//성명
			$("#idtDocAuth_name").val(idtDocAuth$.userData.CSM);
			if("01" == idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD) {
				// 주민등록번호
				$("#idtDocAuth_jumin1").val(idtDocAuth$.userData.RNN1);
				$("#idtDocAuth_jumin2").val(idtDocAuth$.userData.RNN2 + "******");
			}
			else {
				let ictvDrlcNo = idtDocAuth$.step_3.ocrData.ICTV_DRLC_NO;
				
				// 운전면허번호
				if(ictvDrlcNo.length >= 7) {
					$("#idtDocAuth_lbl_unjeon1").parent().addClass("active");
					
					for(let elem of $("#bp_selbeonho_step_4 ul").children()) {
						if(ictvDrlcNo.substring(0, 2) == elem.innerHTML) {
							$("#idtDocAuth_lbl_unjeon1").html(elem.dataset.lable);
							break;
						}
					}
					
					$("#idtDocAuth_unjeon1").val(ictvDrlcNo.substring(0, 2));
					$("#idtDocAuth_unjeon2").val(ictvDrlcNo.substring(2, 4));
					$("#idtDocAuth_unjeon3").val(ictvDrlcNo.substring(4, 7));
				}
			}
			// 발급일자
			$("#idtDocAuth_balgeup").val(idtDocAuth$.step_3.ocrData.ISS_YMD);
		},
		openSelectArea : function() {
			let areaCurrent = $("#idtDocAuth_unjeon1").val();
			
			for(let elem of $("#bp_selbeonho_step_4 ul").children()) {
				if(areaCurrent == elem.innerHTML) {
					elem.classList.add("active");
					elem.setAttribute("aria-selected", "true");
				}
				else {
					elem.classList.remove("active");
					elem.setAttribute("aria-selected", "false");
				}
			}
			
			comLayerPopUtil.open("bp_selbeonho_step_4");
		},
		selectArea : function(_selectedLI) {
			$("#idtDocAuth_lbl_unjeon1").html(_selectedLI.dataset.value);
			$("#idtDocAuth_unjeon1").val(_selectedLI.dataset.value);
			
			comLayerPopUtil.close("bp_selbeonho_step_4");
		},
		validation : function() {
			var valid = true;
			
			if($("#idtDocAuth_balgeup").val().length != 8) {
				MobPopup.showAlertPopup("발급일을 확인해 주세요.", undefined, function(){});
				return false;
			}

			var date = ($("#idtDocAuth_balgeup").val()).substr(0,4)+'-'+($("#idtDocAuth_balgeup").val()).substr(4,2)+'-'+($("#idtDocAuth_balgeup").val()).substr(6,2);
			if(isNaN(Date.parse(date))){
				MobPopup.showAlertPopup("발급일을 확인해 주세요.", undefined, function(){});
				return false;
			}
			
			var ocr_iss_yyyy = idtDocAuth$.step_3.ocrData.ISS_YMD.substr(0,4);
			var iss_yyyy = $("#idtDocAuth_balgeup").val().substr(0,4);
			
			//184993 타행계좌인증 개선
			//비대면 신분증 촬영 시 발급일자 비교 로직 추가
			if((ocr_iss_yyyy != iss_yyyy) && _isDevMode == false){
				MobPopup.showAlertPopup("유효한 신분증이 아닙니다. 유효한 신분증으로 촬영 부탁드립니다.",undefined, function(){});
				return false;
			}
			
			//2020.12.03 Date 에서 확인못하는 날짜 체크 ex )2월 30일, 4월 31일
			var mm = ($("#idtDocAuth_balgeup").val()).substr(4, 2);
			var dd = ($("#idtDocAuth_balgeup").val()).substr(6, 2);
			if((mm == "04" || mm == "06" || mm == "09" || mm == "11") && dd == "31"){
				MobPopup.showAlertPopup("발급일을 확인해 주세요.", undefined, function(){});
				return false;
			}
			else if(mm == "02" && (dd == "30" || dd == "31")){
				MobPopup.showAlertPopup("발급일을 확인해 주세요.", undefined, function(){});
				return false;
			}

			if(idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD == "02") {						// 운전면허증인경우
				let unjeonNo = [];
				unjeonNo.push($("#idtDocAuth_unjeon1").val());
				unjeonNo.push($("#idtDocAuth_unjeon2").val());
				unjeonNo.push($("#idtDocAuth_unjeon3").val());
				unjeonNo.push($('#idtDocAuth_unjeon4').attr('realValue'));
				unjeonNo.push($('#idtDocAuth_unjeon5').attr('realValue'));
				
				for(let item of unjeonNo) {
					if(! item) {
						MobPopup.showAlertPopup("운전면허등록번호를 모두 입력해 주세요.", undefined, function(){});
						return false;
					}
				}
			}
			
			return valid;
		},
		dasiChwaryeong : function() {											// 다시 촬영
			idtDocAuth$.steps.prev(idtDocAuth$.steps.find(4)).run();			// 오류로 인해 해당 화면이 유지되는 경우 --> 버튼 작동을 위해
		},
		next : function() {														// 다음
			if(idtDocAuth$.step_4.validation()) {
				idtDocAuth$.steps.next(idtDocAuth$.steps.find(4)).run();		// 오류로 인해 해당 화면이 유지되는 경우 --> 버튼 작동을 위해
			}
		}
	},
	//--------------------------------------------------------------------------
	//	정보 일치 여부 안내
	//--------------------------------------------------------------------------
	step_5 : {
		name : "step-5 정보 일치 여부 안내",
		popupID : "wndIdtDocAuth_SilmulJeongboAnnae",
		run : function() {
			if(! $("#" + idtDocAuth$.step_5.popupID).get().length) {
				$(".container_wrap").append(idtDocAuth$.silmulJeongboAnnaePage);	// '신분증 정보 확인 안내' 팝업
			}
			setTimeout(function() { comLayerPopUtil.open(idtDocAuth$.step_5.popupID); }, 50);
		},
		dasi : function() {														// 다시 확인
			comLayerPopUtil.close(idtDocAuth$.step_5.popupID);
			idtDocAuth$.steps.prev().run();
		},
		ilchi : function() {													// 일치함 --> 신분증 진위확인
			comLayerPopUtil.close(idtDocAuth$.step_5.popupID);
			idtDocAuth$.steps.next().run();
		}
	},
	//--------------------------------------------------------------------------
	//	신분증 진위확인
	//--------------------------------------------------------------------------
	step_6 : {
		name : "step-6 신분증 진위확인",
		dataInput : {},
		dataReceive : {},
		run : function() {
			let isUnjeonMyeonheo = ("02" == idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD) ? true : false;
			
			idtDocAuth$.step_6.dataInput = {
				ICTV_DRLC_NO1	: isUnjeonMyeonheo ? $("#idtDocAuth_unjeon1").val() + $("#idtDocAuth_unjeon2").val() + $("#idtDocAuth_unjeon3").val() : "",
				ICTV_DRLC_NO2	: isUnjeonMyeonheo ? $("#idtDocAuth_unjeon4").attr("realValue") : "",
				ICTV_DRLC_NO3	: isUnjeonMyeonheo ? $("#idtDocAuth_unjeon5").attr("realValue") : "",
				ISS_YMD			: $("#idtDocAuth_balgeup").val().replace(/-/g, "")
			};
			
			let arg = {
				RLNM_CNFA_CRTI_CD		: idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD,			// 신분증 진위확인 신분증 구분코드 01 : 주민등록증 , 02 : 운전면허증
				CSM						: idtDocAuth$.userData.CSM,								// 성명
				ICTV_PHTG_INFO_LEN		: '4668',												// 신분증 진위확인 사진 정보 길이(idtDocAuth$.step_3.ocrData.ICTV_PHTG_INFO_LEN 이나 4668로 고정시킴. 고정값)
				ICTV_PHTG_INFO_CON		: idtDocAuth$.step_3.ocrData.ICTV_PHTG_INFO_CON,		// 신분증 진위확인 사진 정보 내용
				IDCR_PHTG_CHRC_SHP_SCR	: idtDocAuth$.step_3.ocrData.IDCR_PHTG_CHRC_SHP_SCR,	// 신분증 사진 특징점 점수
				PROGRAM_VER				: '1',													// js 캐싱으로 jsp 가 먼저반영되는 경우 체크하여 다시시도하도록함
				MOB_NO					: idtDocAuth$.step_6.MOB_NO || "",
				ICTV_DRLC_NO1			: idtDocAuth$.step_6.dataInput.ICTV_DRLC_NO1,
				ICTV_DRLC_NO2			: idtDocAuth$.step_6.dataInput.ICTV_DRLC_NO2,
				ICTV_DRLC_NO3			: idtDocAuth$.step_6.dataInput.ICTV_DRLC_NO3,
				ISS_YMD					: idtDocAuth$.step_6.dataInput.ISS_YMD
			}
			idtDocAuth$.step_6.dataReceive = idtDocAuth$.service("com_sec_080101_1", arg, true);
			
			if(idtDocAuth$.step_6.dataReceive) {
				if(idtDocAuth$.step_6.dataReceive.ICTV_RUCD == "Y") {				// 진위확인 성공
					idtDocAuth$.steps.next().run();									// 신분증 원본확인
				}
				else {																// 진위확인 실패(타임아웃,, 거절 응답 등등)
					if(idtDocAuth$.step_6.dataReceive.SYS_ERR_YN =="Y") {			// 다양한 사유로 인해 정상적인 응답이 안온 경우.(첫계좌가 아닌 경우)
						MobPopup.showAlertPopup("신분증진위확인  오류가 발생하였습니다. 잠시후 다시 진행하여주세요.", undefined, function() {
							if(idtDocAuth$.data.callBack) {
								idtDocAuth$.data.callBack({
									id : "com_sec_080101_1"
								});
							}
						});
					}
					else if(idtDocAuth$.step_6.dataReceive.SYS_ERR_YN =="N") {		// 행안부/경찰청에서 거절 응답을 준 경우 -> 재촬영
						MobPopup.showAlertPopup("신분증 정보가 유효하지 않습니다.\n신분증 정보를 확인 부탁 드립니다.\n\n사진에 빛 반사가 없도록 재촬영해 주세요.\n면허번호, 발급일자가 올바른지 확인해 주세요.", undefined, function() {
							idtDocAuth$.silmul.chwaryeong();
						});
					}
				}
			}
		}
	},
	//--------------------------------------------------------------------------
	//	신분증 원본확인
	//--------------------------------------------------------------------------
	step_7 : {
		name : "step-7 신분증 원본확인",
		data : {},
		run : function() {
			let arg = {
				image		: idtDocAuth$.step_3.ocrData.img64ENCData,
				request_id	: idtDocAuth$.step_6.dataReceive.RQST_ID,
				type		: "CCS"
			};
			idtDocAuth$.step_7.data = idtDocAuth$.service("com_sec_080101_5", arg);
		
			if(idtDocAuth$.step_7.data.FAIL_YN == "Y") {
	            MobPopup.showAlertPopup("신분증 진위확인 서비스가 원활하지 않습니다. 잠시 후 다시 시도해주시기 바랍니다.");
	        }
			else{
            	if(idtDocAuth$.data.bizDivision == "DO") {
	                if(idtDocAuth$.step_7.data.REAL == "F") {
	                    MobPopup.showAlertPopup("촬영된 신분증이 유효하지 않습니다.<br><b>원본 신분증</b>을 재촬영해주시기 바랍니다.");
	                }
	                else{
	                	idtDocAuth$.steps.next().run();							// 이미지 전송
	                }
	            }
	            else{
	            	idtDocAuth$.steps.next().run();								// 이미지 전송
	            }
	        }
		}
	},
	//--------------------------------------------------------------------------
	//	이미지 전송
	//--------------------------------------------------------------------------
	step_8 : {
		name : "step-8 이미지 전송",
		run : function() {
			let arg = {
				IDT_DOC_AUTH_IAP	: idtDocAuth$.data.iap,									// 첫계좌여부
				CSM					: idtDocAuth$.userData.CSM,								// 성명
				BPR_IDX_NO			: idtDocAuth$.step_6.dataReceive.BPR_IDX_NO,			// BprIdx 넘버
				NOFC_RLNC_PGRS_SCD	: idtDocAuth$.step_6.dataReceive.NOFC_RLNC_PGRS_SCD,	// 비대면실명확인진행상태코드(신분증진위확인 요청(직원 승인 필요))
				ICTV_RUCD			: idtDocAuth$.step_6.dataReceive.ICTV_RUCD,				// 신분증진위확인결과코드(Y: 진위확인성공, N:진위확인 실패))
				SYS_ERR_YN			: idtDocAuth$.step_6.dataReceive.SYS_ERR_YN,			// 신분증진위확인 실패 상세원인(Y: 거절외 모든 케이스 , N: 거절)
				RLNM_CNFA_CRTI_CD	: idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD,			// 신분증 진위확인 신분증 구분코드 01 : 주민등록증 , 02 : 운전면허증
				MANUAL_YN			: idtDocAuth$.step_3.ocrData.MANUAL ? "Y" : "N",		// 수동승인여부
				img64ENCData		: idtDocAuth$.step_3.ocrData.img64ENCData
			};
			idtDocAuth$.service("com_sec_080101_2", arg, true, function(_data, _isError) {
				if(! _isError) idtDocAuth$.steps.next().run();
			});
		}
	},
	//--------------------------------------------------------------------------
	//	callback return
	//--------------------------------------------------------------------------
	step_9 : {
		name : "step-9 callback return",
		run : function() {
			if(idtDocAuth$.data.callBack) {
				idtDocAuth$.data.callBack({
					id					: "com_sec_080101_2",
					ID_CARD_IMG			: idtDocAuth$.step_3.ocrData.byteFace,				// 2024.06.10 안면인증용 신분증 데이터 추가
					ID_CARD_DCD			: idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD,		// 2024.06.10 안면인증용 신분증 데이터 추가
					PLNM_CNFA_CRTI_CD	: idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD,
					ICTV_IDCR_DCD		: idtDocAuth$.step_3.ocrData.PLNM_CNFA_CRTI_CD,
					ISS_YMD				: idtDocAuth$.step_6.dataInput.ISS_YMD,
					ID_CARD_IDX_NO		: idtDocAuth$.step_6.dataReceive.BPR_IDX_NO,		// 2024.06.10 안면인증용 신분증 데이터 추가
					ICTV_RUCD			: idtDocAuth$.step_6.dataReceive.ICTV_RUCD,
					NOFC_RLNC_PGRS_SCD	: idtDocAuth$.step_6.dataReceive.NOFC_RLNC_PGRS_SCD
				});
			}
		}
	},
	//--------------------------------------------------------------------------
	//	모바일 운전면허증 안내
	//--------------------------------------------------------------------------
	step_20 : {
		name : "step-20 모바일 운전면허증 안내",
		popupID : "wndIdtDocAuth_MobileAnnae",
		run : function() {
			if(! $("#" + idtDocAuth$.step_20.popupID).get().length) {
				 $(".container_wrap").append(idtDocAuth$.mobileAnnaePage);		// '모바일 운전면허증 안내' 팝업
			}
			setTimeout(function() { comLayerPopUtil.open(idtDocAuth$.step_20.popupID); }, 50);
		},
		chwiso : function() {
			comLayerPopUtil.close(idtDocAuth$.step_20.popupID);
		},
		jechul : function() {
			comLayerPopUtil.close(idtDocAuth$.step_20.popupID);
			idtDocAuth$.steps.next().run();
		}
	},
	//--------------------------------------------------------------------------
	//	모바일 운전면허증 앱 연계
	//--------------------------------------------------------------------------
	step_21 : {
		name : "step-21 모바일 운전면허증 앱 연계",
		data : {},
		run : function() {
			let skipFunction = function() {
				// [모바일 운전면허증 앱 연계] SKIP
				idtDocAuth$.data.callBack({
					id					: "com_sec_080101_2",
					ID_CARD_DCD			: "10",
					PLNM_CNFA_CRTI_CD	: "10",
					ICTV_IDCR_DCD		: "10",									// 신분증 구분코드(10:모바일 신분증)
					ISS_YMD				: "20000101",							// 발행년월일
					BRP_IDX_NO			: "0603000866SO01732019031917490600",							// BPR인덱스번호
					ID_CARD_IDX_NO		: "0603000866SO01732019031917490600",							// BPR인덱스번호
					ICTV_RUCD			: "Y",									// 진위확인결과
					NOFC_RLNC_PGRS_SCD	: "12",									// 비대면 실명 확인 진행 상태코드
					trxcode				: "trxcode"
				});
			};
			let normalFunction = function() {
				// [모바일 운전면허증 앱 연계] 수행
				$.nativeCall("getUUID", []).done(function(_result_native_1) {
					idtDocAuth$.step_21.data.RLNM_CNFA_CRTI_CD	= "10";					// 신분증 구분코드(10:모바일 신분증)
					
					let arg_1 = {
						deviceId			: _result_native_1.ID,
						RLNM_CNFA_CRTI_CD	: idtDocAuth$.step_21.data.RLNM_CNFA_CRTI_CD,
						TITLENAME			: idtDocAuth$.data.nativeTitle
					};
					let result_1 = idtDocAuth$.service("prd_ath_020000_1", arg_1, true);

					if(result_1) {
						idtDocAuth$.step_21.data.trxCode	= result_1.trxCode;
						
						let arg_2 = {
							m200Base64	: result_1.m200Base64,
							str_scheme	: "mobileid://verify?data_type=byte&data="
						};
						$.nativeCall('reqMobileIDAuth', [arg_2]).done(function(_result_ntive_2) {
							let result_2 = idtDocAuth$.service("prd_ath_020000_2", {}, true);
							
							if(result_2) {
								idtDocAuth$.step_21.data.ICTV_RUCD			= "Y";				// 진위확인결과
								idtDocAuth$.step_21.data.NOFC_RLNC_PGRS_SCD	= "12";				// 비대면 실명 확인 진행 상태코드
								idtDocAuth$.step_21.data.ISS_YMD			= result_2.issude;	// 발행년월일
								
								let result_3 = idtDocAuth$.service("prd_ath_020000_3", {}, true);
								
								if(result_3) {
									idtDocAuth$.data.callBack({
										id					: "com_sec_080101_2",
										ID_CARD_DCD			: idtDocAuth$.step_21.data.RLNM_CNFA_CRTI_CD,
										PLNM_CNFA_CRTI_CD	: idtDocAuth$.step_21.data.RLNM_CNFA_CRTI_CD,
										ICTV_IDCR_DCD		: idtDocAuth$.step_21.data.RLNM_CNFA_CRTI_CD,	// 신분증 구분코드(10:모바일 신분증)
										ISS_YMD				: idtDocAuth$.step_21.data.ISS_YMD,				// 발행년월일
										BRP_IDX_NO			: result_3.BPR_IDX_NO,							// BPR인덱스번호
										ID_CARD_IDX_NO		: result_3.BPR_IDX_NO,							// BPR인덱스번호
										ICTV_RUCD			: idtDocAuth$.step_21.data.ICTV_RUCD,			// 진위확인결과
										NOFC_RLNC_PGRS_SCD	: idtDocAuth$.step_21.data.NOFC_RLNC_PGRS_SCD,	// 비대면 실명 확인 진행 상태코드
										trxcode				: idtDocAuth$.step_21.data.trxCode
									});
								}
							}
						}).fail(function(_result_ntive_2) {
							if(_result_ntive_2.isInstalled) {
								idtDocAuth$.service("prd_ath_020000_4", {}, true);
							}
							else {
								if(_isIphone()) {
									MobPopup.showAlertPopup("모바일 신분증 앱 설치 후 이용해주시기 바랍니다." , "안내" ,function () {});
								}
								else if(_isAndroid()) {
									MobPopup.showAlertPopup("모바일 신분증 앱(또는 삼성월렛 앱) 설치 후 이용해주시기 바랍니다." , "안내" ,function () {});
								}
							}
						});
					}
				}); // $.nativeCall("getUUID", []).done(function(_result_native_1) {
			};
			
			if(_isDevMode) {
				MobPopup.showConfirmPopup("[개발 모드] 모바일 운전면허증 앱 연계를 생략하시겠습니까?", "", skipFunction, normalFunction);			
			}
			else {
				normalFunction();
			}
		} // run : function() {
	},
	startPage :
		`<div class="content_wrap ty3">
			<div class="group">
				<div class="ocr_wrap">
					<h3 class="txt_style ty1">
						신분증인증 방법을
						<br>
						선택해 주세요
					</h3>
	
					<ul class="cert_ctr mt_16">
						<li>
							<a href="#" role="button" class="block" onclick="idtDocAuth$.step_2.silmulChwaryeong();">
								<div class="icon certificate_common"></div>
								<div class="txt">
									주민등록증
									<br>
									운전면허증 촬영
								</div>
							</a>
						</li>
						<li>
							<a href="#" role="button" class="block" onclick="idtDocAuth$.step_2.mobileUnjeonMyeonheo();">
								<div class="icon certificate_mobile"></div>
								<div class="txt">
									모바일
									<br>
									운전면허증
								</div>
							</a>
						</li>
					</ul>
					
					<!--s: 꼭 알아두세요! -->
					<div class="caution">
						<div data-jx-guideTip="identityAuth2_1"></div>
					</div>
					<!--e: 꼭 알아두세요! -->
				</div>
			</div>
		</div>`,
	mobileAnnaePage :
		`<div class="bottom_popup_wrap" id="wndIdtDocAuth_MobileAnnae">
			<div class="bottom_popup">
				<div class="bottom_popup_header">
					<h2 class="tit">모바일 운전면허증 안내</h2>
					<button type="button" class="btn_close" onclick="idtDocAuth$.step_20.chwiso();">닫기</button>
				</div>
				<div class="bottom_popup_body">
					<div class="popup_msg_txt1">
						행정안전부에서 제공하는
						<br>
						모바일 신분증 앱을 설치하고
						<br>
						등록한 고객님만 이용이 가능합니다.
					</div>
				</div>

				<div class="bottom_popup_footer ty2">
					<button type="button" class="btn s_5 c_1 r_2" onclick="idtDocAuth$.step_20.chwiso();">취소</button>
					<button type="button" class="btn s_5 c_3 r_2" onclick="idtDocAuth$.step_20.jechul();">모바일 신분증 제출</button>
				</div>
			</div>
		</div>`,
	silmulJeongboPage :
		`<div class="content_wrap ty3">
			<div class="group">
				<div class="ocr_wrap">
					<h4 class="title_text ty1">신분증 정보 확인</h4>
					<div class="ocr_wrap_photo">
						<img src="../../../../img/common/cert/img_cert_identification.png" alt="촬영된 신분증 사진" id="idtDocAuth_image" />
					</div>
					<div class="form_group">
						<div class="input_label ty2">이름</div>
						<div class="input no_del">
							<input type="text" name="" id="idtDocAuth_name" value="" title="이름 입력" readonly />
						</div>
						{myeonheoBeonho}
						<div class="input_label ty2">발급일자</div>
						<div class="input">
							<input type="tel" name="" id="idtDocAuth_balgeup" value="" title="발급일 입력" maxlength="8" />
							<button type="button" class="del">텍스트삭제</button>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom_btn_area">
				<div class="btn_area ty1">
					<button type="button" class="btn s_5 c_1 r_2" onclick="idtDocAuth$.step_4.dasiChwaryeong();">다시 촬영</button>
					<button type="button" class="btn s_5 c_3 r_2" onclick="idtDocAuth$.step_4.next();">다음</button>
				</div>
			</div>
		</div>`,
	silmulJuminBeonhoPage :
		`<div class="input_label ty2">주민등록번호</div>
		<div class="comp_wrap birth disabled">
			<div class="input no_del">
				<input type="tel" maxlength="6" name="" id="idtDocAuth_jumin1" title="주민등록번호 앞 6자리 입력" placeholder="생년월일 6자리" readonly/>
			</div>
			<span>-</span>
			<div class="birth_after full_value">
				<div class="input no_del">
					<input type="text" name="" id="idtDocAuth_jumin2" value="" title="주민등록번호 뒤 7자리 입력" readonly/>
				</div>
			</div>
		</div>`,
	silmulUnjeonBeonhoPage :
		`<div class="input_label ty2">운전면허번호</div>
		<div class="comp_wrap license">
			<div class="input license_sp4">
				<div class="dropdown ty2 active" role="button" title="지역명 선택 목록 보기" onclick="idtDocAuth$.step_4.openSelectArea();">
					<div class="dropdown_text" id="idtDocAuth_lbl_unjeon1"></div>
				</div>
				<input type="hidden" id="idtDocAuth_unjeon1"/>
			</div>
			<span>-</span>
			<div class="input license_sp2">
				<input type="tel" id="idtDocAuth_unjeon2" title="면허번호 두번째 2자리 입력" value="" maxlength="2" placeholder="2자리"/>
			</div>
			<span>-</span>
			<div class="input license_sp3">
				<input type="tel" id="idtDocAuth_unjeon3" title="면허번호 세번째 앞3자리 입력" value="" maxlength="3" placeholder="3자리"/>
			</div>
			<div class="input license_sp3">
				<button type="button" aria-label="면허번호 세번째 뒤3자리 입력" class="keypad_btn" id="btnIdtDocAuth_unjeon4">
					<span class="marking_wrap">3자리</span>
				</button>
				<input type="hidden" id="idtDocAuth_unjeon4"/>
			</div>
			<span>-</span>
			<div class="input license_sp2">
				<button type="button" aria-label="면허번호 마지막 2자리 입력" class="keypad_btn" id="btnIdtDocAuth_unjeon5">
					<span class="marking_wrap">2자리</span>
				</button>
				<input type="hidden" id="idtDocAuth_unjeon5"/>
			</div>
		</div>`,
	silmulUnjeonBeonhoSelect :
		`<div class="bottom_popup_wrap" id="bp_selbeonho_step_4">
			<div class="bottom_popup">
				<div class="bottom_popup_header">
					<h2 class="tit">&nbsp;</h2>
					<button type="button" class="btn_close" onclick="comLayerPopUtil.close('bp_selbeonho_step_4');">닫기</button>
				</div>
				<div class="bottom_popup_body">
					<ul class="select_list ty1" role="listbox">
						<li role="option" tabindex="-1" aria-selected="false" data-lable="서울[11]" data-value="11" onclick="idtDocAuth$.step_4.selectArea(this);">11</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="부산[12]" data-value="12" onclick="idtDocAuth$.step_4.selectArea(this);">12</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경기[13]" data-value="13" onclick="idtDocAuth$.step_4.selectArea(this);">13</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="강원[14]" data-value="14" onclick="idtDocAuth$.step_4.selectArea(this);">14</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="충북[15]" data-value="15" onclick="idtDocAuth$.step_4.selectArea(this);">15</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="충남[16]" data-value="16" onclick="idtDocAuth$.step_4.selectArea(this);">16</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="전북[17]" data-value="17" onclick="idtDocAuth$.step_4.selectArea(this);">17</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="전남[18]" data-value="18" onclick="idtDocAuth$.step_4.selectArea(this);">18</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경북[19]" data-value="19" onclick="idtDocAuth$.step_4.selectArea(this);">19</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경남[20]" data-value="20" onclick="idtDocAuth$.step_4.selectArea(this);">20</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="제주[21]" data-value="21" onclick="idtDocAuth$.step_4.selectArea(this);">21</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="대구[22]" data-value="22" onclick="idtDocAuth$.step_4.selectArea(this);">22</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="인천[23]" data-value="23" onclick="idtDocAuth$.step_4.selectArea(this);">23</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="광주[24]" data-value="24" onclick="idtDocAuth$.step_4.selectArea(this);">24</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="대전[25]" data-value="25" onclick="idtDocAuth$.step_4.selectArea(this);">25</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="울산[26]" data-value="26" onclick="idtDocAuth$.step_4.selectArea(this);">26</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경기[28]" data-value="28" onclick="idtDocAuth$.step_4.selectArea(this);">28</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="서울[11]" data-value="11" onclick="idtDocAuth$.step_4.selectArea(this);">서울</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="부산[12]" data-value="12" onclick="idtDocAuth$.step_4.selectArea(this);">부산</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경기[13]" data-value="13" onclick="idtDocAuth$.step_4.selectArea(this);">경기</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="강원[14]" data-value="14" onclick="idtDocAuth$.step_4.selectArea(this);">강원</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="충북[15]" data-value="15" onclick="idtDocAuth$.step_4.selectArea(this);">충북</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="충남[16]" data-value="16" onclick="idtDocAuth$.step_4.selectArea(this);">충남</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="전북[17]" data-value="17" onclick="idtDocAuth$.step_4.selectArea(this);">전북</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="전남[18]" data-value="18" onclick="idtDocAuth$.step_4.selectArea(this);">전남</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경북[19]" data-value="19" onclick="idtDocAuth$.step_4.selectArea(this);">경북</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="경남[20]" data-value="20" onclick="idtDocAuth$.step_4.selectArea(this);">경남</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="제주[21]" data-value="21" onclick="idtDocAuth$.step_4.selectArea(this);">제주</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="대구[22]" data-value="22" onclick="idtDocAuth$.step_4.selectArea(this);">대구</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="인천[23]" data-value="23" onclick="idtDocAuth$.step_4.selectArea(this);">인천</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="광주[24]" data-value="24" onclick="idtDocAuth$.step_4.selectArea(this);">광주</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="대전[25]" data-value="25" onclick="idtDocAuth$.step_4.selectArea(this);">대전</li>
						<li role="option" tabindex="-1" aria-selected="false" data-lable="울산[26]" data-value="26" onclick="idtDocAuth$.step_4.selectArea(this);">울산</li>
					</ul>
				</div>
			</div>
		</div>`,
	silmulJeongboAnnaePage :
		`<div class="bottom_popup_wrap" id="wndIdtDocAuth_SilmulJeongboAnnae">
			<div class="bottom_popup">
				<div class="bottom_popup_header">
					<h2 class="tit">신분증 정보 확인 안내</h2>
					<button type="button" class="btn_close" onclick="idtDocAuth$.step_5.dasi();">닫기</button>
				</div>
				<div class="bottom_popup_body">
					<div class="popup_msg_txt1">
						화면에 표시된 신분증 정보와
						<br>
						실제 신분증에 표시된 정보가
						<br>
						일치하는지 확인 하셨나요?
					</div>
				</div>
	
				<div class="bottom_popup_footer">
					<button type="button" class="btn s_5 c_1 r_2" onclick="idtDocAuth$.step_5.dasi()">다시 확인</button>
					<button type="button" class="btn s_5 c_3 r_2" onclick="idtDocAuth$.step_5.ilchi()">일치함</button>
				</div>
			</div>
		</div>`
};

(function() {
	jex.plugin.add("JEX_MOBILE_IDTDOCAUTH", JexPlugin.extend(idtDocAuth$), idtDocAuth$.attrs.id);
})();