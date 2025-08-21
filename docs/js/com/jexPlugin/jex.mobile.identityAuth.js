var IdtFormObjId;
var idtFormCallBack;
var idtFormStep;     //plugin step

(function() {
	/**
	 * Date: 2020.05.12
	 * 
	 * 신분증인증
	 * 
	 * @namespace JexMobileIdentityAuth
	 */
	window._idtForm;
	var sForm_attrs = {
		  "id"                    : "data-jx-identityAuth"                  // ID
	};
	
	var JexMobileIdentityAuth = JexPlugin.extend({
		init: function () {
			window._idtForm = this;
		},
		
		/**
		 * @method load
		 * data-jx-identityAuth 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this._this  = this;
			this.id     = $jq.attr('id');
		}
		
		/**
		 *[신분증 촬영] 영역
		 */
		, drawIdtArea : function($jq, step, callBack) {
			IdtFormObjId = $jq;
			if(undefined != step && undefined != callBack) {
				idtFormStep = step;
				idtFormCallBack = callBack;
			}
			
			var _html = "";
			_html +='<div class="group first">';
			_html +='	<p class="tit_h3">신분증 촬영</p>';
			_html +='	<ul class="dot_txt_s">';
			_html +='		<li>본인확인을 위해 <b class="txt13 color_black2">&lsquo;주민등록증&rsquo;</b> 혹은 <b class="txt13 color_black2">&lsquo;운전면허증&rsquo;</b>을 준비해주세요.</li>';
			_html +='		<li>신분증 촬영 시, 신분증을 네모 영역에 잘 맞춰주세요.</li>';
			_html +='	</ul>';
			_html +='	<div class="colum_visual">';
			_html +='		<div class="nff_img_box02">';
			_html +='			<image id="img_photo" src="" style="display:none"></image>';
			_html +='			<input id="camera" style="display:none" accept="image/*" capture="camera" type="file" ></input>';
			_html +='		</div>';
			_html +='	</div>';
			_html +='</div>';
			_html +='<div class="group">';
			_html +='	<div class="notice_wrap">';
			_html +='		<p class="tit">유의사항</p>';
			_html +='		<div class="notice_con">';
			_html +='			<p class="dot_txt_s">주요 정보에 불빛이 반사되거나 신분증의 일부만 촬영되는 경우 신분증 인식이 실패할 수 있습니다.</p>';
			_html +='		</div>';
			_html +='	</div>';
			_html +='</div>';
			_html +='<!-- 하단 고정 버튼 -->';
			_html +='<div class="btn_b_wrap">';
			_html +='	<div class="btn_b_area">';
			_html +='		<button type="button" class="btn_blue">신분증 촬영하기</button>';
			_html +='	</div>';
			_html +='</div>';
			_html = $(_html);
			
			$jq.html(_html);
			jex.setJexObj($jq);
			
			jex.plugin.get("JEX_MOBILE_STEP").showStep(idtFormStep);
			
//			if(_isDevMode) { //개발(테스트) 모드
//				_this.cusInfo["input_RPPR_RNN"  ] = prompt("#주민등록번호 13자리 입력요망!! \n (신분증검증)") || "";
//				_this.cusInfo["RPPR_KRN_SRNM_NM"] = prompt("#성명_대표자' 이름 입력요망!! \n (신분증검증)") || _this.cusInfo["RPPR_KRN_SRNM_NM"];
//				
//				if(""!=_this.cusInfo["input_RPPR_RNN"  ]){ //prompt입력받은값(테스트용도)
//					_this.cusInfo.RPPR_RNN = _this.cusInfo["input_RPPR_RNN"  ].substring(0, 7) + "******";
//				}
//			}
			
			objIdtShootingAreaHtml.init();
		}
		
		/**
		 *[신분증 확인] 영역
		 */
		, drawIdtArea2 : function($jq) {
			var _html = "";
			_html +='<div class="group first">';
			_html +='	<p class="tit_h3">신분증 확인</p>';
			_html +='	<div class="pd15">';
			_html +='		<p class="dot_txt_s">신분증 정보가 정확하게 입력되었는지 확인해 주시고, <b class="txt13 color_black2">[재촬영]</b> 버튼을 누르시거나, <b class="txt13 color_black2">잘못 인식된 정보는 수정</b>해 주시기 바랍니다.</p>';
			_html +='		<p class="mt10 alignR">';
			_html +='			<button type="button" class="btn_white_small"><i class="reload">재촬영</i></button>';
			_html +='		</p>';
			_html +='	</div>';
			_html +='	<div class="colum_visual">';
			_html +='		<div class="nff_img_box02 mt-5">';
			_html +='			<!-- 촬영된 사진 보여지는 영역입니다. -->';
			_html +='			<image id="img_photo2" src="" style="display:none"></image>';
			_html +='		</div>';
			_html +='	</div>';
			_html +='</div>';
			_html +='<form action="">';
			_html +='	<fieldset>';
			_html +='		<legend>필수정보 입력</legend>';
			_html +='		<div class="group">';
			_html +='			<ul class="list_form01">';
			_html +='				<li>';
			_html +='					<div class="dt"><label for="nff3">성명</label></div>';
			_html +='					<div class="dd">';
			_html +='						<input type="text" id="nff3" title="성명" readonly="readonly">';
			_html +='					</div>';
			_html +='				</li>';
			_html +='				<li>';
			_html +='					<div class="dt"><label for="nff4">주민등록번호</label></div>';
			_html +='					<div class="dd">';
			_html +='						<div class="floatW">';
			_html +='							<input type="tel" title="주민등록번호 앞6자리" id="txt_jumin1" class="wid49" readonly="readonly">';
			_html +='							<input type="tel" title="주민등록번호 뒤7자리" value="*******" class="wid49 floatR" readonly="readonly">';
			_html +='						</div>';
			_html +='					</div>';
			_html +='				</li>';
			_html +='				<li style="display: none" id="li_id_type">';
			_html +='					<div class="dt">신분증 종류</div>';
			_html +='					<div class="dd">';
			_html +='						<div class="btn_area2 param_key" role="radiogroup" data-valid-check=\'{"radio":"신분증 종류를 선택해주시기 바랍니다."}\'>';
			_html +='							<button type="button" id="btn_type1" role="radio" aria-checked="false" data-id-type="01">주민등록증</button>';
			_html +='							<button type="button" id="btn_type2" role="radio" aria-checked="false" data-id-type="02">운전면허증</button>';
			_html +='						</div>';
			_html +='					</div>';
			_html +='				</li>';
			_html +='				<li>';
			_html +='					<div class="dt"><label for="nff4">발급일자</label></div>';
			_html +='					<div class="dd">';
			_html +='						<input type="tel" id="issue_date" title="발급일자" placeholder="숫자만 입력" class="param_key" maxlength="8" data-valid-check=\'{"pastDate":"올바른 발급일자가 아닙니다.<br>예) 20190101"}\'>';
			_html +='					</div>';
			_html +='				</li>';
			_html +='				<li id="li_driver">';
			_html +='					<div class="dt"><label for="nff5">면허번호</label></div>';
			_html +='					<div class="dd">';
			_html +='						<!--input type="tel" id="nff5" title="면허번호"-->';
			_html +='						<div class="placeholder_multi_group">';
			_html +='							<div class="placeholder_wrap" style="width:20%">';
			_html +='								<input type="text" placeholder="2자리" title="면허번호 첫번째칸 입력" class="param_key" maxlength="2"';
			_html +='									data-valid-check=\'{"required":"면허번호 앞 7자리를 입력해주세요.", "koOrNumber":"올바른 면허번호가 아닙니다. 다시 입력해주세요.", "digit":"올바른 면허번호가 아닙니다. 다시 입력해주세요."}\'>';
			_html +='							</div>';
			_html +='							<div class="placeholder_wrap" style="width:19%">';
			_html +='								<input type="tel" placeholder="2자리" title="면허번호 두번째칸 입력" class="param_key" maxlength="2"';
			_html +='									data-valid-check=\'{"required":"면허번호 앞 7자리를 입력해주세요.", "numberAndDigit":"올바른 면허번호가 아닙니다. 다시 입력해주세요."}\'>';
			_html +='							</div>';
			_html +='							<div class="placeholder_wrap" style="width:21%">';
			_html +='								<input type="tel" placeholder="3자리" title="면허번호 세번째칸 입력" class="param_key" maxlength="3"';
			_html +='									data-valid-check=\'{"required":"면허번호 앞 7자리를 입력해주세요.", "numberAndDigit":"올바른 면허번호가 아닙니다. 다시 입력해주세요."}\'>';
			_html +='							</div>';
			_html +='							<div class="placeholder_wrap" style="width:21%">';
			_html +='								<input type="password" placeholder="3자리" title="면허번호 네번째칸 입력" id="driver4" readonly="readonly" class="param_key" maxlength="3"';
			_html +='									data-valid-check=\'{"required":"면허번호 뒤 5자리를 입력해주세요."}\'>';
			_html +='							</div>';
			_html +='							<div class="placeholder_wrap" style="width:19%">';
			_html +='								<input type="password" placeholder="2자리" title="면허번호 다섯번째칸 입력" id="driver5" readonly="readonly" class="param_key" maxlength="2"';
			_html +='									data-valid-check=\'{"required":"면허번호 뒤 5자리를 입력해주세요."}\'>';
			_html +='							</div>';
			_html +='						</div>';
			_html +='					</div>';
			_html +='				</li>';
			_html +='			</ul>';
			_html +='		</div>';
			_html +='	</fieldset>';
			_html +='</form>';
			_html +='<!-- 하단 고정 버튼 -->';
			_html +='<div class="btn_b_wrap">';
			_html +='	<div class="btn_b_area">';
			_html +='		<button type="button" class="btn_gray">취소</button>';
			_html +='		<button type="button" class="btn_blue">다음</button>';
			_html +='	</div>';
			_html +='</div>';
			_html = $(_html);
			
			$jq.html(_html);
			jex.setJexObj($jq);
			
			//comUi_initBtnClassEvent();
			
			//신분증 종류
			_html.find('.btn_area2').off('click').on('click', function(evt) {
				var target = $(evt.target);
				if (!target.hasClass('on')) {
					
					target.addClass('on');
					
					if (target.attr('id') == 'btn_type1') {
						$('#btn_type2').removeClass('on');
					} else {
						$('#btn_type1').removeClass('on');
					}
				}
			});
			
			// 보안키패드
			$(':password').off('click').on('click', function(evt) {
				var $this = $(this),
					//$this = $(evt.target),
					id= $this.attr('id'),
					len = $this.attr('maxlength'),
					title = $this.attr('title');
				_callXecureKeypad(id, '1', len, len, title, null, 'N', null);
			});
			
			jex.plugin.get("JEX_MOBILE_STEP").showStep(idtFormStep);
			
			objIdtConfirmAreaHtml.init();
		}
	});
	jex.plugin.add("JEX_MOBILE_IDENTITY_AUTH", JexMobileIdentityAuth, sForm_attrs.id);
})();

/**
 * [신분증 촬영] 영역
 */
var objIdtShootingAreaHtml = {
	// 초기화
	init: function() {
		var $step = $('#step' + idtFormStep);
		
		this.add_event();

		$step.find('#img_photo').attr('src', '');

		ocr.initImg();
	},

	// 이벤트
	add_event: function() {
		var $step = $('#step' + idtFormStep);

		// 신분증 촬영하기
		$step.find('.btn_blue').click(function() {
			
			if (!_isRealApp) {
				var pluginIdtForm = jex.getJexObj(IdtFormObjId, "JEX_MOBILE_IDENTITY_AUTH");
				return pluginIdtForm.drawIdtArea2(IdtFormObjId);
			}

			ocr.goOcr();
		});
	}
};

/**
 * 신분증 촬영 시작
 */
var ocr = {
	strImage: null,

	// 신분증 특징점 추출 3회 미추출시 고객센터 수기확인
	fail_cnt: 0,
	
	ocr_alert_msg: '신분증 확인을 하고 있습니다. 약 1분 정도가 소요될 수 있습니다. \n잠시만 기다려주세요.',

	//사진촬영 준비
	initImg: function() {
		ocr.fail_cnt = 0;
		ocr.add_event(); // 사진촬영
	},

	//사진 이미지 서버전송
	sendServer: function() {
		var $step = $('#step' + idtFormStep),
			param = {
				task_package   : 'svc',
				task_subpackage: 'bnk',
				input_RPPR_RNN : _this.cusInfo["input_RPPR_RNN"  ] || "", //개발(테스트) 모드 :: prompt입력받은값(테스트용도)
				nReqNumber     : ocr.fail_cnt + 1,
				encrypted      : ocr.strImage
			},
			origin_func = jex.ajaxBeforeData;

		idt_com.setAjaxBeforeData(ocr.ocr_alert_msg);

		idt_com.callAjax('svc_bnk_130101_1', param, function(dat) { //nff_acn_011901_2
			
			// 공통으로 복구
			jex.setAjaxBeforeData(origin_func);

			dat = dat || {};

			objIdtConfirmAreaHtml.picture_dat = dat;
			// BPR_IDX_NO        이미지인덱스키
			// _FACE_Feature
			// _FACE_Score
			// _ID_LICENSE_NO
			// _ID_TYPE
			// _ID_NAME
			// _ID_DATE
			// _OCR_JOB_ID
			// img64MaskData

			var sp_err_cd = dat.sp_err_cd,
				sp_err_msg = dat.sp_err_msg;

			if (sp_err_cd || dat._FACE_Score == 0) {
				ocr.fail_cnt++;
				
				//alert("#ocr.fail_cnt : "+ocr.fail_cnt);

				if (sp_err_cd) {
					//불특정한 에러로 OCR에 세번연속 실패했을 때, 계속 촬영하도록
					if (sp_err_cd == 'NFF_ERR_012') {
						ocr.fail_cnt = 0;
					}
				} else if (dat._FACE_Score == 0) {
					sp_err_cd = '9990';
				}

				return idt_com.popup({
					txt: '신분증 인식이 정확하지 않습니다.'
						+ '<br>빛 반사, 흔들림이 없게끔 촬영해주세요.'
						+ '<br>배경이 어두운 바닥에서 촬영해주세요.'
						+ '<br>[' + sp_err_cd + ']'
				});

			} else {
				//정상
				var pluginIdtForm = jex.getJexObj(IdtFormObjId, "JEX_MOBILE_IDENTITY_AUTH");
				pluginIdtForm.drawIdtArea2(IdtFormObjId);
			}
		});
	},

	//사진촬영
	goOcr: function() {
		if (_isAndroid()) {
			idt_com.nativeCall('requestPermission', [
					'android.permission.WRITE_EXTERNAL_STORAGE',
					'android.permission.READ_EXTERNAL_STORAGE',
					'android.permission.CAMERA'
				],
				// 성공 콜백
				function(dat) {
					$("#camera").trigger('click');
				}, 
				// 실패 콜백
				function() {
					idt_com.popup({
						txt: '해당 서비스를 사용하기 위해 저장공간, 카메라 사용 권한을 허용해주시기 바랍니다.<br>'
							+ ' [설정]-[애플리케이션관리]-[i-ONE뱅크 기업]-[권한 선택]-[동의]'
					});
				}
			);
		} else {
			$("#camera").trigger('click');
		}
	},

	add_event: function() {

		var camera = document.getElementById("camera");

		camera.addEventListener('change', function(e) {
			
			nativeIndicator.show(undefined, ocr.ocr_alert_msg);
			try {
				var files = e.target.files,
					frame = document.getElementById("img_photo");

				if (files && files.length > 0) {
					var file = files[0];
					var url = URL.createObjectURL(file);

					frame.src = url;

					URL.revokeObjectURL(url);

					var reader = new FileReader();

					reader.addEventListener('load', function(e) {
						
						var dataUrl = "";

						//========= 이미지 리사이징 추가 =========
						var originImg = new Image();
						originImg.src = e.target.result;

						originImg.addEventListener("load", function () {

							var canvas = document.createElement('canvas');

							//최대 사이즈
							var max_width = 1280;
							//원본 사이즈
							var origin_width  = originImg.width;
							var origin_height = originImg.height;
							//리사이징
							var resize_width;
							var resize_height;

							if (origin_width > max_width){
								// 가로가 세로보다 크면 가로는 최대사이즈로, 세로는 비율 맞춰리사이징
								if(origin_width > origin_height){
									resize_width = max_width;
									resize_height = (origin_height * resize_width) / origin_width;
								}else{
									resize_width  = max_width;
									resize_height = max_width;
								}
							}else{
								resize_width  = origin_width;
								resize_height = origin_height;
							}

							canvas.width  = resize_width;
							canvas.height = resize_height;
							canvas.getContext('2d').drawImage(originImg, 0, 0, resize_width, resize_height);
							dataUrl = canvas.toDataURL('image/jpeg');
							//========= 이미지 리사이징 추가 끝. =========

							//SEED 암호화
							var vKey =  'iBk' + _this.cusInfo.RPPR_RNN.substring(0, 6)  + 'iBk';
							var encrypted = CryptoJS.SEED.encrypt(dataUrl, vKey).toString();
							ocr.strImage = encrypted;
							ocr.sendServer();
						});
					}, false);

					reader.readAsDataURL(file);
				}
			} catch(e) {
				idt_com.popup({
					txt: '사진 촬영 중 오류가 발생했습니다. [오류코드:OCR0001]'
				});
			} finally{
				nativeIndicator.hide();
			}
		});
	}
}; //var ocr [신분증 촬영 시작]


/**
 * [신분증 확인] 영역
 */
var objIdtConfirmAreaHtml = {
	picture_dat: {},

	// 초기화
	init: function() {
		var $step = $('#step' + idtFormStep),
			info = _this.cusInfo,
			dat = this.picture_dat,
			driver_no = dat._ID_LICENSE_NO || '',
			$li_driver = $step.find('#li_driver'),
			$li_id_type = $step.find('#li_id_type');
		
		$step.find('#nff3').val(dat._ID_NAME);
		$step.find('#txt_jumin1').val(_this.cusInfo.RPPR_RNN.substring(0, 6));
		$step.find('#issue_date').val(dat._ID_DATE || ''); //발급일자
		$step.find('#li_driver').find('input').val('').attr('realValue', '');

		$li_id_type.find('button').removeClass('on');
		$li_driver.hide();
		$li_id_type.hide();

		// _ID_TYPE, 10: 주민등록증  11: 운전면허증
		if (dat._ID_TYPE == '10') {
			//
		} else if (dat._ID_TYPE == '11') {
			$li_driver.show();

			$step.find('#li_driver input').each(function(idx) {

				if (idx > 2) {
					return false;
				}

				$(this).val(driver_no.substr(idx * 2, idx == 2 ? 3 : 2));
			});
		} else {
			// 신분증 타입값이 없을 경우, 타입 선택 버튼 표시
			$li_id_type.show();
		}

		if (_isRealApp) {
			//마스킹 이미지 셋팅
			$step.find('#img_photo2').attr('src', "data:image/jpeg;base64," + dat.img64MaskData).show();
		}
		
		this.add_event();
	},

	// 고객정보 세팅
	setCusInfo: function(dat) {
		if (!dat) {
			return;
		}
	},

	// 신분증촬영 데이터 저장
	savePicture: function(callback) {
		var $step = $('#step' + idtFormStep),
			picture_dat	= this.picture_dat || {},
			param = {
				task_package      : 'svc',
				task_subpackage   : 'bnk',
				BPR_IDX_NO        : picture_dat.BPR_IDX_NO || '',
				ISS_YMD           : $step.find('#issue_date').val(), //발급일자
				CSM               : _this.cusInfo.RPPR_KRN_SRNM_NM,
				input_RPPR_RNN    : _this.cusInfo["input_RPPR_RNN"  ] || "", //개발(테스트) 모드 :: prompt입력받은값(테스트용도)
				IDCR_PHTG_CHRC_SHP_SCR: picture_dat._FACE_Score,
				_OCR_JOB_ID       : picture_dat._OCR_JOB_ID,
				NOFC_CRTC_CHNL_DCD: '01',
				ICTV_PHTG_INFO_CON: picture_dat._FACE_Feature,
				ICTV_PHTG_INFO_LEN: '4668' // 고정값
			},
			self = this,
			driver_no = '',
			picture_kind = ''; //신분증 종류

		// _ID_TYPE, 10: 주민등록증  11: 운전면허증
		if (picture_dat._ID_TYPE == '10') {
			picture_kind = '01';
		} else if (picture_dat._ID_TYPE == '11') {
			picture_kind = '02';
		} else {
			picture_kind = $step.find('#li_id_type button.on').attr('data-id-type');
		}

		param.ICTV_IDCR_DCD = picture_kind;

		if (!_isRealApp) {
			param.TEST_KIND = 'CHROME';
			param.BPR_IDX_NO = '1234';
		}

		// 운전면허인 경우
		if (picture_dat._ID_TYPE == '11') {

			$step.find('#li_driver input').each(function(idx) {

				if (idx > 2) {
					return false;
				}

				var val = $(this).val();

				if (idx == 0) {
					// 운전먼허 앞 두글자 한글인 경우 숫자로 변경
					$(drv_license_area).each(function(idx, obj) {
						if (val == obj.text) {
							val = obj.value;
						}
					});
				}

				driver_no += val;
			});

			param.ICTV_DRLC_NO = driver_no;
			param.ICTV_DRLC_NO2 = $step.find('#driver4').attr('realValue') || '';
			param.ICTV_DRLC_NO3 = $step.find('#driver5').attr('realValue') || '';
		}

		// 신분증 진위확인 & 이미지 BPR서버로 전송
		idt_com.callAjax('svc_bnk_130101_2', param, function(dat) { //nff_acn_011701_1
			dat = dat || {};
			//SYS_ERR_YN
			//NOFC_RLNC_PGRS_SCD
			
			var sp_err_cd = dat.sp_err_cd,
				sp_err_msg = dat.sp_err_msg || '신분증 진위 확인 실패 [7777]';

			// 오류가 발생한 경우
			if (sp_err_cd) {
				return idt_com.popup({
					txt: sp_err_msg + '[' + sp_err_cd + ']'
				});
			}

			// 신분증 진위확인 실패
			// 행안부 응답결과[실패]. 실패 사유가 진위확인결과 에러인 경우 신분증 촬영화면으로 이동
			if (dat.NOFC_RLNC_PGRS_SCD == '11' && dat.SYS_ERR_YN == 'N') {
				return idt_com.popup({
					txt: '신분증 정보가 유효하지 않습니다.<br>' +
						 '신분증 정보를 확인해주세요.<br><br>' +
						 '사진에 빛 반사가 없도록 재촬영해주세요. 면허번호, 발급일자가 올바른지 확인해주세요.',
					callback: function() {
						// 사진 재촬영으로
						var pluginIdtForm = jex.getJexObj(IdtFormObjId, "JEX_MOBILE_IDENTITY_AUTH");
						return pluginIdtForm.drawIdtArea(IdtFormObjId);
					}
				});
			}
			
			dat.BPR_IDX_NO = picture_dat.BPR_IDX_NO; //이미지인덱스키
			
			//브라우저일경우
			if (!_isRealApp) {
				dat.SYS_ERR_YN = 'N';
			}
			
			if (dat.SYS_ERR_YN == 'Y') {
				idt_com.popup({
					txt: '고객님 신분증 확인이 원활하지 않습니다.<br>'
						+ '다시 촬영해주세요.',
					callback: function() {
						var pluginIdtForm = jex.getJexObj(IdtFormObjId, "JEX_MOBILE_IDENTITY_AUTH");
						return pluginIdtForm.drawIdtArea(IdtFormObjId);
					}
				});
			} else {
				// 고객정보저장 (대체번호)
				self.setCusInfo(dat);

				callback(dat);
			}
		});
	},
	
	// 이벤트
	add_event: function() {
		var $step = $('#step' + idtFormStep),
			self = this;

		// 재촬영 버튼
		$step.find('.btn_white_small').click(function() {
			idt_com.popup({
				kind: 'confirm',
				txt: '재촬영 하시겠습니까?<br>먼저 촬영한 사진은 저장되지 않고 삭제됩니다.',
				callback: function() {
					var pluginIdtForm = jex.getJexObj(IdtFormObjId, "JEX_MOBILE_IDENTITY_AUTH");
					return pluginIdtForm.drawIdtArea(IdtFormObjId);
				}
			});
		});
	
		// 취소 버튼
		$step.find('.btn_gray').click(function() {
			idt_com.popup({
				kind: 'confirm2',
				btn_left: '아니오',
				btn_right: '예',
				txt: '취소하시겠습니까?',
				callback: function() {
					uf_reLoad(); //EDD 첫화면으로 이동
				}
			});
		});
		
		// 다음 버튼
		$step.find('.btn_blue').click(function() {
			if (idt_com.checkValid($step.find('li:visible'))) {
				idt_com.popup({
					kind: 'confirm2',
					btn_left: '아니오',
					btn_right: '예',
					txt: '촬영한 신분증과 화면에 표시된 정보가 일치합니까? 일치하면 [예] 버튼을 선택해주세요.',
					callback: function() {
						self.savePicture(function(dat) {
							
							var returnParam = {};
							returnParam["SYS_ERR_YN"        ] = dat["SYS_ERR_YN"        ]; //행안부신분증진위확인에러결과구분(Y:시스템에러/N:진위확인결과에러)
							returnParam["NOFC_RLNC_PGRS_SCD"] = dat["NOFC_RLNC_PGRS_SCD"]; //비대면실명확인진행상태코드
							returnParam["ICTV_RUCD"         ] = dat["ICTV_RUCD"         ]; //진위확인결과(Y/N)
							returnParam["ICTV_IDCR_DCD"     ] = dat["ICTV_IDCR_DCD"     ]; //신분증 구분코드(01:주민등록증, 02:운전면허증)
							returnParam["BPR_IDX_NO"        ] = dat["BPR_IDX_NO"        ]; //이미지인덱스키
							idtFormCallBack.apply(this,[returnParam]);
						});
					}
				});
			}
		});
	}
};


var idt_com = {
	// 초기화
	init: function(step) {
		var p = {
				txt: '본 서비스 이용을 위해서는 최신 버전 필요하니 앱을 업데이트하시기 바랍니다.',
				and_ver: 212,
				ios_ver: 204
			};
		return this.checkAppVersion(p); // 버전체크
	},
	
	// 앱 플러그인 호출
	nativeCall: function(func, param, callback, fail_callback, fake_data) {
		
		if (!_isRealApp) {
			return typeof callback === 'function' ? callback(fake_data) : false;
		}
		
		var self = this,
			msg = '';
		
		nativeIndicator.show(undefined, msg);

		$.nativeCall(func, param).done(function(data) {
			nativeIndicator.hide();
			
			//2019.03.27 비대면계좌개설 '(싱글쿼테이션) 존재시 파싱오류 대응
			if(typeof data === 'string') {
				data = data.replace(/'/g, "&#x27;"); // '(싱글쿼테이션) , 동일함[&#39;]
				data = JSON.parse(data);
			}
			
			if (typeof callback === 'function') {
				callback(data, { is_success: true });
			}
			
		}).fail(function(dat) {
			
			nativeIndicator.hide();
			
			try {
				dat = typeof data === 'string' ? JSON.parse(dat) : dat;
				
				if (typeof fail_callback === 'function') {
					return fail_callback(dat, { is_success: false });
				}
			} catch(e) {
				dat = {};
			}
			
			var err_cd, err_msg;
			
			err_cd = dat.ErrorCode || '8888';
			err_msg = dat.ErrorMessage || '예기치 않은 오류가 발생하였습니다.';
			
			self.popup({
				txt: err_msg + '[' + err_cd + ']'
			});
		});
	},

	// 팝업
	popup: function(msg) {
		var kind            = msg.kind || 'alert',
			txt             = msg.txt,
			title           = msg.title,
			btn_left        = msg.btn_left,
			btn_right       = msg.btn_right,
			callback        = msg.callback,
			cancel_callback = msg.cancel_callback;

		if (kind === 'alert') {
			return !!MobPopup.showAlertPopup(
					txt, 
					title, 
					callback);
		} else if (kind === 'confirm') {
			return !!MobPopup.showConfirmPopup(
					txt, 
					title, 
					callback, 
					cancel_callback);
		} else if (kind === 'confirm2') {
			return !!MobPopup.showConfirmQckPopup(
					txt, 
					title, 
					callback, 
					cancel_callback,
					btn_left, 
					btn_right);
		}
	},
	
	// 입력값 유효성 체크
	isValid: {
		// 필수 체크
		required: function(val, $obj) {
			
			if (!val || !val.trim().length) {
				return false;
			}
			
			if ($obj.attr('type') && 
					$obj.attr('type').toLowerCase() === 'password') {
				val = $obj.attr('realValue') || '';
				
				if (!val || !val.trim().length) {
					return false;
				}
			}
			
			return true;
		},
		
		// 영문, 공백만 허용
		english: function(val) {
			val = val ? val.trim() : '';
			
			if (!val) {
				return false;
			}
			
			var fmt = /^[A-Za-z\s]+$/;
			
			return fmt.test(val);
		},
		
		// 영문, 공백, 숫자 허용
		engAndNum: function(val) {
			val = val ? val.trim() : '';
			
			if (!val) {
				return false;
			}
			
			var fmt = /^[A-Za-z\s\d]+$/;
			
			return fmt.test(val);
		},
		
		// 숫자 체크
		number: function(val, $obj) {
			val = val ? val.trim() : '';
			
			if (!val) {
				return false;
			}
			
			var fmt = /^[0-9]+$/;
			
			return fmt.test(val);
		},
		
		// 자릿수 체크
		digit: function(val, $obj) {
			var len = $obj.attr('maxlength');
			val = val || '';
			
			return val.length != len ? false : true;
		},
		
		// 숫자 & 자릿수 체크 (maxlength가 attribute로 설정되어 있어야 함)
		numberAndDigit: function(val, $obj) {
			return this.number(val, $obj) 
				&& this.digit(val, $obj)
		},
		
		// 사업자번호 체크 (하이픈까지 12자리)
		bizId: function(val) {
			var fmt = /(^[0-9]{3})-?([0-9]{2})-?([0-9]{5})$/;
			
			if (fmt.test(val)) {
				return fmt.exec(val);
			}
			
			return false;
		},
		
		account: function(val, $obj) {
			val = val.replace(/-/g, '').trim();
			return this.number(val, $obj);
		},
		
		ibkAccount: function(val, $obj) {
			val = val.replace(/-/g, '').trim();
			
			if (!this.number(val, $obj)) {
				return false;
			}
			
			var len = val.length;
			
			if (!(len === 10 || len === 11 || len === 12 || len === 14)) {
				return false;
			}
			
			return true;
		},
		
		// 날짜 체크 (현재부터 이전 날짜)
		pastDate: function(val, $obj) {
			val = val ? val.trim() : '';
			
			if (!this.number(val) || !this.digit(val, $obj)) {
				return false;
			}
			
			var year  = val.substring(0, 4),
			    month = val.substring(4, 6),
			    day   = val.substring(6, 8),
			    d     = new Date(month + '/' + day + '/' + year),
			    last_day = (new Date(new Date(year, month, 1) - 1)).getDate(),
			    today = new Date();
			
			if (d > today) {
				return false;
			}
			
			if ((d.getFullYear() == year && 
					(d.getMonth() + 1) == month && d.getDate() == day)
					&& (day <= last_day)) {
				return true;
			}
			
			return false;
		},
		
		// 개인사업자 체크
		bizP: function(val) {
			val = val ? val.replace(/-/g, '').trim() : '';
			val = val.substring(3, 5);
			
			// 개인사업자
			if ((val >= 1 && val <=79) || (val >= 90 && val <=99)) {
				return true;
			}
			
			return false;
		},
		
		// 휴대전화번호 체크
		hp: function(val) {
			val = val ? val.replace(/-/g, '').trim() : '';
			
			if (!val) {
				return true;
			}
			
			var fmt = /(^01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/,
				arr;
			
			if (fmt.test(val)) {
				return fmt.exec(val);
			}
			
			return false;
		},
		
		// 전화번호 체크
		tel: function(val) {
			val = val ? val.replace(/-/g, '').trim() : '';
			
			if (!val) {
				return true;
			}
			
			var result = this.hp(val),
				fmt = /(^02|^[0-9]{3})([0-9]{3,4})([0-9]{4})$/,
				arr;
			// 휴대전화번호 체크
			if (result) {
				return result;
			}
			
			if (fmt.test(val)) {
				return fmt.exec(val);
			}
			
			return false;
		},
		
		// 전체동의 체크 
		// 두번째 매개변수 $obj는 모든 동의 버튼들의 가장 까까운 조상 엘리멘트일 것
		// $obj 하위에 동의 버튼과 관련된 on 클래스 외에 다른 on 클래스는 존재하지 않을 것
		agreeAll: function(val, $obj) {
			//return $obj.find('button').length == $obj.find('.on').length;
			var $terms_title = $obj.find('.terms_title:visible');
			
			if (!$terms_title.length) {
				$terms_title = $obj.find('[data-class=terms_title]');
			}
			
			if ($terms_title.length == $terms_title.filter('.on').length) {
				return true;
			}
			
			return false;
		},
		
		// 라디오버튼 미체크 체크
		radio: function(val, $obj) {
			if ($obj.find('button').length) {
				return $obj.find('button.on').length;
			} else {
				return $obj.find(':radio:checked').length;
			}
		},
		
		// 체크박스 미체크 체크
		checkbox: function(val, $obj) {
			return $obj.find(':checked').length;
		},
		
		// 한글 체크
		ko: function(val) {
			var fmt = /^[가-힣]+$/;
			
			return fmt.test(val);
		},
		
		// 한글 또는 숫자만 허용
		koOrNumber: function(val) {
			var fmt = /^[0-9]+$/,
				fmt2 = /^[가-힣]+$/;
			
			if (fmt.test(val) || fmt2.test(val)) {
				return true;
			}
			
			return false;
		},
		
		// 한글, 영대소문자, 공백, ()- 허용
		address: function(val) {
			var fmt = /^[가-힣0-9a-zA-Z\s\-()]+$/;
			
			return fmt.test(val);
		}
		
	},
	
	// 유효성 검사
	// param_key 클래스 지정된 것만 체크
	checkValid: function($target) {
		if (!$target) {
			return false;
		}
		
		var $params = $target.find('.param_key'),
			msg, 
			$obj, str, tag, type, val,
			self = this;

		$params.each(function(idx, obj) {
			$obj = $(obj);
			str  = $obj.attr('data-valid-check');
			tag  = $obj.prop('tagName').toLowerCase();
			type = $obj.attr('type') ? $obj.attr('type').toLowerCase() : '';
			val  = '';
			
			if (!str || $.isEmptyObject(str)) {
				return true;
			}
			
			if (type != 'hidden' && !$obj.is(':visible')) {
				return true;
			}
			
			str = $.parseJSON(str);
			
			if (tag === 'input') {
				val = $obj.val().trim();
			} else if (tag === 'span' || tag === 'div') { // dropdown 체크
				val = $obj.text().replace('선택하세요', '');
			}

			for (var key in str) {
				if (!self.isValid[key](val, $obj)) {
					msg = str[key];
					break;
				}
			}
			
			if (msg) {
				return false;
			}
		});
		
		if (msg) {
			return self.popup({
				txt: msg,
				callback: function() {
					if (tag === 'input') {
						$obj.val('');
						
						if (type === 'password') {
							$obj.attr('realValue', '');
						}
					}
					
					if (type !== 'password') {
						$obj.focus();
					}
				}
			});
		}
		
		return true;
	},

	// Ajax 호출
	callAjax: function(id, param, callback) {
		
		var ajax  = jex.createAjaxUtil(id);

		for (var k in param) {
			ajax.set(k, param[k]);
		}

		ajax.execute(function(dat) {
			dat = dat || {};
			
			var result = (dat._tran_res_data)[0] || {},
				is_back = result.is_back,
				sp_err_cd  = result.sp_err_cd,
				sp_err_msg = result.sp_err_msg 
					|| '현재 정상적으로 진행이 되지 않습니다. <br>잠시후 다시 이용해 주세요.';
		
			if (sp_err_cd == 'NFF_ERR_005' || is_back == 'main') {
				idt_com.popup({
					txt: sp_err_msg,
					callback: function() {
						// 세션 만료, 메인으로 이동하도록
						uf_back(-1);
					}
				});
			} else {
				callback((dat._tran_res_data)[0]);
			}
		});
	},
	
	// 앱버전 체크
	checkAppVersion: function(obj) {
		if (!_isRealApp) {
			return true;
		}

		var app_ver    = Number(comWebkey_getAppVersion().replace(/\./g, '')),
			phone_type = _getPhoneType(),
			url;
		
		if (phone_type == 'A' && (app_ver < obj.and_ver)) {
			url = 'market://details?id=com.ibk.scbs';
		} else if (phone_type == 'I'&& (app_ver < obj.ios_ver)) {
			url = 'https://itunes.apple.com/app/id504654394';
		}
		
		if (url) {
			return idt_com.popup({
				txt: obj.txt,
				callback: function() {
					window.open(url, '_system', 'location=yes');
					setTimeout(function () {
						uf_back(-1);
					}, 500);
				}
			});
		}
		
		return true;
	},
	
	//
	setAjaxBeforeData: function(msg) {
		jex.setAjaxBeforeData(function(dat,svc) {
			nativeIndicator.show(undefined, msg);

			if (!_XECURE) return dat;
		});
	}
};

//운전면허 코드
var drv_license_area=[];
drv_license_area.push({text:'11',value:'11'});
drv_license_area.push({text:'12',value:'12'});
drv_license_area.push({text:'13',value:'13'});
drv_license_area.push({text:'14',value:'14'});
drv_license_area.push({text:'15',value:'15'});
drv_license_area.push({text:'16',value:'16'});
drv_license_area.push({text:'17',value:'17'});
drv_license_area.push({text:'18',value:'18'});
drv_license_area.push({text:'19',value:'19'});
drv_license_area.push({text:'20',value:'20'});
drv_license_area.push({text:'21',value:'21'});
drv_license_area.push({text:'22',value:'22'});
drv_license_area.push({text:'23',value:'23'});
drv_license_area.push({text:'24',value:'24'});
drv_license_area.push({text:'25',value:'25'});
drv_license_area.push({text:'26',value:'26'});
drv_license_area.push({text:'28',value:'28'});
drv_license_area.push({text:'서울',value:'11'});
drv_license_area.push({text:'부산',value:'12'});
drv_license_area.push({text:'경기',value:'13'});
drv_license_area.push({text:'강원',value:'14'});
drv_license_area.push({text:'충북',value:'15'});
drv_license_area.push({text:'충남',value:'16'});
drv_license_area.push({text:'전북',value:'17'});
drv_license_area.push({text:'전남',value:'18'});
drv_license_area.push({text:'경북',value:'19'});
drv_license_area.push({text:'경남',value:'20'});
drv_license_area.push({text:'제주',value:'21'});
drv_license_area.push({text:'대구',value:'22'});
drv_license_area.push({text:'인천',value:'23'});
drv_license_area.push({text:'광주',value:'24'});
drv_license_area.push({text:'대전',value:'25'});
drv_license_area.push({text:'울산',value:'26'});