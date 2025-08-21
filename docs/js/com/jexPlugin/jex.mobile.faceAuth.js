/*******************************************************************************
* @ 업 무 명    	: 안면인증
* @ 업무설명		: 안면인증
* @ 파 일 명    	: /js/com/jexPlugin/jex.mobile.faceAuth.js
* @ 작 성 자    	: 박성권(seton3@naver.com)
* @ 작 성 일    	: 2024. 06. 04.
************************** 변 경 이 력 *****************************************
* 번호  작 업 자    작  업  일			변경내용
********************************************************************************
*    1  박성권 		2024. 06. 04.   	최초 작성
*******************************************************************************/
(function() {
	/*
	 *	FACE_AUTH_RESULT
	 *	    1 : 정상완료 
	 *	    2 : 안면인증 취소
	 *	    3 : 계좌인증 이동
	 *	    4 : 수행불가(관리자 설정)
	 *		5 : '신분증 인증 정보' 미존재로 --> 신분증 촬영 재시도 권유
	 */
	window.faceAuth$ = {
		attrs : {
			id			: "data-jx-faceAuth-id",								// 안면인식 플러그인 ID
			idCardImg	: "data-jx-faceAuth-idCardImg",							// 신분증 이미지
			idCardDcd	: "data-jx-faceAuth-idCardDcd",							// 신분증 이미지 구분(1:주민등록증, 2:운전면허증)
			callback	: "data-jx-faceAuth-callBack"							// 플러그인 콜백 함수
		},
		object : null,
		data : {
			idCardImg	: null,
			idCardDcd	: "",
			callback	: null,
			faceUseYn	: "N"													// 넵소아 관리자 프로퍼티에 등록된 '안면인증 사용여부'
		},
		term : {
			title		: "생체(얼굴) 정보 수집·이용동의 및 민감정보 처리",
			uri			: "https://www.ibk.co.kr/fup/customer/form/2024031214382721400560320340326.pdf",
			isViewTerm	: false,												// 약관 내용확인 여부
			isAgree		: false													// 약관 동의 여부
		},
		init : function() {
		},
		load : function(attr, $jq) {
		},
		execute : function(action, $jq) {
		},
		service : serviceHandler,
		/*
		 * 안면인증 수행 가능여부 확인 및 화면 생성
		 */
		preBuildHtml : function($jq) {
			faceAuth$.object = $jq;

			faceAuth$.data.idCardImg	= faceAuth$.object.attr(faceAuth$.attrs.idCardImg);
			faceAuth$.data.idCardDcd	= faceAuth$.object.attr(faceAuth$.attrs.idCardDcd);
			faceAuth$.data.callback		= faceAuth$.object.attr(faceAuth$.attrs.callback) ? eval(faceAuth$.object.attr(faceAuth$.attrs.callback)) : function() {};

			//------------------------------------------------------------------
			//	관리자 설정 조회
			//------------------------------------------------------------------
			let result = this.service("com_utl_070101_0", {}, true);
			
			if(result) {
				//----------------------------------------------------------
				//	관리자 설정 및 법인사용자 여부 조회
				//----------------------------------------------------------
				faceAuth$.data.faceUseYn = result.FACE_USE_YN;

				switch(faceAuth$.data.faceUseYn) {
					case "Y" :
						//------------------------------------------------------
						//	안면인식 초기/약관 화면 구성
						//------------------------------------------------------
						faceAuth$.createPage("start");
						//------------------------------------------------------
						// 약관 URL 조회
						//------------------------------------------------------
						faceAuth$.term.uri = comCacheUtil.getTermUrlInfo("C117")["term_url"];
						if(faceAuth$.term.uri == "") {
							MobPopup.showAlertPopup("[" + faceAuth$.term.title + "] 약관 내역을 읽어오지 못했습니다. 계좌인증으로 진행합니다.", "", function() {
								faceAuth$.data.callback({
									FACE_AUTH_RESULT : 3,
									FACE_USE_YN		 : faceAuth$.data.faceUseYn
								});
							});
						}
						break;
					case "BEOBIN" :												// 법인사용자
						//------------------------------------------------------
						//	법인사용자 안면인증 불가
						//------------------------------------------------------
						faceAuth$.data.callback({
							FACE_AUTH_RESULT : 4,
							FACE_USE_YN      : faceAuth$.data.faceUseYn
						});
						break;
					default :
						//------------------------------------------------------
						//	안면인식 초기/약관 화면 구성
						//------------------------------------------------------
						faceAuth$.createPage("start");
						//------------------------------------------------------
						//	관리자 이용불가 설정 or 설정 읽기 실패
						//------------------------------------------------------
						MobPopup.showAlertPopup("얼굴인증 서비스가 점검 중입니다. 계좌인증으로 진행합니다.", "", function() {
							faceAuth$.data.callback({
								FACE_AUTH_RESULT : 4,
								FACE_USE_YN      : faceAuth$.data.faceUseYn
							});
						});
						break;
				}
			} // if(result) {
		},
		/*
		 * 안면인증 취소
		 */
/*
 * 기능 삭제됨.
		uf_cancelFaceAuth : function() {
			faceAuth$.data.callback({
				FACE_AUTH_RESULT : 2,
				FACE_USE_YN		 : faceAuth$.data.faceUseYn
			});
		},
*/
		/*
		 * 약관 진행(시작화면에서의 '다음'버튼 선택)
		 */
		uf_StartNext : function() {
			if(faceAuth$.data.idCardDcd || faceAuth$.data.idCardImg) {
				comLayerPopUtil.open('wndFaceAuth_Term');
			}
			else {
				MobPopup.showConfirmQckPopup("안면인식 전 신분증 사진과 고객님 얼굴을 비교하기 위해 신분증 촬영을 진행할게요.", "",
					function() {		// confirm callback
						faceAuth$.data.callback({
							FACE_AUTH_RESULT : 5,
							FACE_USE_YN		 : faceAuth$.data.faceUseYn
						});
					},
					function() {},		// cancel callback
					"다음에",				// cancel button-name
					"신분증촬영하기"		// confirm button-name
				);
			}
		},
		/*
		 * 약관 보기
		 */
		uf_viewTerm : function() {
			comWebkey_showPdf(faceAuth$.term.title, [faceAuth$.term.uri], function(dat) {
				if(dat.result == "true") {
					$("#checkboxFaceAuth_Term").prop("checked", true);
					faceAuth$.uf_agreeTrem(true);
				}
			}, "동의");
		},
		/*
		 * 약관 동의
		 */
		uf_agreeTrem : function(_checked) {
			$("#btnNext_Term").prop("disabled", _checked ? false : true);
		},
		/*
		 * 약관 닫기(취소)
		 *     - 약관 보기, 약관 동의 상태 유지
		 */
		uf_cancelTerm : function() {
			comLayerPopUtil.close('wndFaceAuth_Term');
		},
		/*
		 * 약관 동의 --> 다음
		 */
		uf_agreeTremNext : function() {
			if(! $("#checkboxFaceAuth_Term").prop("checked")) {
				MobPopup.showAlertPopup("[" + faceAuth$.term.title + "] 내용 확인 후 동의해 주십시요.");
				return false;
			}
			
			faceAuth$.uf_cancelTerm();

			$.nativeCall("startFacialRecognition", []).done(function(_ocrData) {
				_ocrData.timeFaceShot	= g_getDate("yyyymmddHHmiss");

				faceAuth$.uf_faceAuthorization(_ocrData);
			}).fail(function(data) {
				faceAuth$.uf_faceError("FACE99");
			});
		},
		/*
		 * 계좌인증 전환
		 */
		uf_changeAccAuth :  function() {
			faceAuth$.data.callback({
				FACE_AUTH_RESULT : 3,
				FACE_USE_YN		 : faceAuth$.data.faceUseYn
			});
		},
		/*
		 * 안면인식 본인확인 시작
		 *     - 생체여부 검사
		 */
		uf_faceAuthorization : function(_ocrData) {
			faceAuth$.createPage("continue");
			
			let arg = {
				zip				: _ocrData["best_shot_zip"],
				id_card_code	: faceAuth$.data.idCardDcd,
				id_card_data	: faceAuth$.data.idCardImg,
				selfie_datetime	: _ocrData.timeFaceShot,
				selfie_data		: _ocrData["best_shot_jpg"]
			};
			this.service("prd_ath_010103_1", arg, false, function(_result, _isError, _errorCd, _errorMsg) {
				if(_isError) {
					if("W01991" == _errorCd) {
						MobPopup.showAlertPopup("얼굴인증 서비스를 진행하기 어려운 상태입니다. 계좌인증으로 진행합니다.", "", function() {
							faceAuth$.data.callback({
								FACE_AUTH_RESULT : 4,
								FACE_USE_YN		 : "N"
							});
						});
					}
					else {
						faceAuth$.uf_faceError(_errorCd, _errorMsg);
					}
				}
				else {
					faceAuth$.data.callback({
						FACE_AUTH_RESULT : 1,
						FACE_BPR_IDX_NO	 : _result["FACE_BPR_IDX_NO"],
						FACE_USE_YN		 : faceAuth$.data.faceUseYn
					});
				}
			}, true);
		},
		/*
		 * 안면인증 오류 및 재시도
		 */
		uf_faceError : function(_errorCode, _errorMsg) {
			faceAuth$.createPage("error", _errorCode, _errorMsg);
		},
		createPage : function(_type, _errorCode, _errorMsg) {
			switch(_type) {
				case "start" :
					faceAuth$.object.html(faceAuth$.startPage);

					if(! $("#wndFaceAuth_Term").get().length) {					// '약관 팝업영역'이 존재하는 경우 skip
						$(".container_wrap").append(faceAuth$.termPage);	// 약관 팝업영역
					}
					break;
				case "continue" :
					faceAuth$.object.html(faceAuth$.continuePage);
					setTimeout(function() { comLottieUtil.play("continue_lottie"); }, 100);
					break;
				case "error" :
					let message	= "";
					
					if("FACE01,FACE02,FACE03".includes(_errorCode))	message = "생체인증에 실패했습니다.";				// 생체인증 오류
					else if(_errorCode == "FACE04") message = "촬영 이미지 전송에 문제가 발생했습니다.";				// BPR이미지서버 전송 오류
					else if(_errorCode == "FACE05") message = "얼굴인증에 실패했습니다.<br>(신분증/얼굴 판별 불일치)";	// 신분증/안면 불일치
					else if(_errorCode == "FACE06") message = "해당 기관 장애로 얼굴인증이 어렵습니다. 고객센터 문의 부탁드립니다.(1566-2566)";	// 신분증/안면 불일치
					else if(_errorCode == "FACE07") message = "얼굴인증 서비스가 원활하지 않습니다.";					// 기타 오류
					else if(_errorCode == "FACE99") message = "얼굴 촬영이 취소되었습니다.";								// 촬영 오류
					else 							message = _errorMsg;
		
					faceAuth$.object.html(faceAuth$.errorPage.replace("{message}", message));
					setTimeout(function() { comLottieUtil.play("error_lottie"); }, 100);
					break;
			}
		},
		startPage :
			`<div class="content_wrap">
				<div class="group">
					<div class="face_reco">
						<div class="face_reco_tit">
							직접거래인지 확인하기 위해
							<br />
							고객님 얼굴 촬영을
							<br />
							진행할게요
						</div>
					</div>
					<div class="bg_box ty1">
						<ul class="list_bullet ty1">
							<li>얼굴 촬영 영역에 맞춰 화면을 바라봐 주세요.</li>
							<li>조명이 강하거나 어두운 곳은 피해 주세요.</li>
							<li>신분증 사진과 현재 얼굴이 많이 다르면 인식이 안될 수 있습니다.</li>
						</ul>
					</div>
				</div>
				<div class="bottom_btn_area ty3">
					<div class="bottom_btn_area_box">
						<div class="btn_area tyTxt">
							<button type="button" class="btn ty_txt2 line_bttm" onclick="faceAuth$.uf_changeAccAuth();">계좌인증으로 변경하기</button>
						</div>
						<div class="btn_area ty1">
							<button type="button" class="btn s_5 c_3 r_2" onclick="faceAuth$.uf_StartNext();">다음</button>
						</div>
					</div>
				</div>
			</div>`,
		termPage :
			`<div class="bottom_popup_wrap" id="wndFaceAuth_Term"> <!-- active -->
				<div class="bottom_popup">
					<div class="bottom_popup_header">
						<h2 class="tit">정보제공 동의</h2>
						<button type="button" class="btn_close" onclick="faceAuth$.uf_cancelTerm()">닫기</button>
					</div>
					<div class="bottom_popup_body">
						<div class="label label_box more_add">
							<input type="checkbox" id="checkboxFaceAuth_Term" onclick="faceAuth$.uf_agreeTrem(this.checked);">
							<label for="checkboxFaceAuth_Term" class="checkbox">
								<i></i>
								<span>
									생체(얼굴)정보 수집 이용동의 및 민감정보 처리에 대한 동의
									<span class="ess_mark">필수</span>
								</span>
							</label>
							<button type="button" class="btn ty_txt3 line_bttm btn_view" onclick="faceAuth$.uf_viewTerm();">
								<span class="sr_only">생체(얼굴)정보 수집 이용동의 및 민감정보 처리에 대한 동의</span>
								보기
							</button>
						</div>
					</div>
					<div class="bottom_popup_footer">
						<button type="button" class="btn s_5 c_3 r_2" id="btnNext_Term" onclick="faceAuth$.uf_agreeTremNext();" disabled>다음</button>
					</div>
				</div>
			</div>`,
		continuePage :
			`<div class="content_wrap ty4">
				<div class="ico_txt ty1 lottie_case2">
					<div class="lottie_box">
						<lottie-player src="../../../../lottie/lottie_case8.json" background="transparent" speed="1" loop id="continue_lottie"></lottie-player>
					</div>
					<div class="tit">
				       	얼굴인증 정보를 확인하고 있어요<br>
				       	잠시만 기다려 주세요
					</div>
				</div>
			</div>`,
		errorPage :
			`<div class="content_wrap ty4">
				<div class="group">
					<div class="ico_txt ty1 lottie_case1">
						<div class="lottie_box">
							<lottie-player src="../../../../lottie/complete_fail.json" background="transparent" speed="1" id="error_lottie"></lottie-player>
						</div>
						{message}
						<div class="note_cmt">
							다시 시도하거나
							<br/>
							계좌인증으로 바꿔서 인증해 주세요.
						</div>
					</div>
				</div>
				<div class="bottom_btn_area ty3">
					<div class="bottom_btn_area_box">
						<div class="btn_area tyTxt">
							<button type="button" class="btn ty_txt2 line_bttm" onclick="faceAuth$.uf_changeAccAuth()">계좌인증으로 변경하기</button>
						</div>
						<div class="btn_area ty1">
							<button type="button" class="btn s_5 c_3 r_2" onclick="faceAuth$.uf_agreeTremNext();">얼굴인증 다시하기</button>
						</div>
					</div>
				</div>
			</div>`
	}

	jex.plugin.add("JEX_MOBILE_FACEAUTH", JexPlugin.extend(faceAuth$), faceAuth$.attrs.id);
})();