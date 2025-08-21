var _ocrSubmit_var = {
	id                     : ""
	,thisSForm        	   : ""
	,parentId        	   : ""
	,checkId        	   : ""
	,documentId            : ""
	,topTitle          	   : ""
	,bprIdxNo              : ""
	,type		           : ""
	,position              : ""
	,exeMsg                : ""
	,errMsg                : ""
	,text                  : ""
	,maxImgCnt             : ""
	,serviceId	           : ""
	,isChkTime             : false
};
(function() {
	var sForm_attrs = {
		"id"            : "data-jx-ocrSubmit"				// [required] 서류촬영 Element ID
	    ,"parentId"     : "data-jx-ocrSubmit-parent-id"		// [required] 상위 Step ID
		,"documentId"   : "data-jx-ocrSubmit-document-id"	// [required] 서류촬영 문서이름
		,"bprIdxNo"     : "data-jx-ocrSubmit-bpr-idx-no"	// [required] 서류촬영 사진저장 시 bpr index 번호
		,"type"			: "data-jx-ocrSubmit-type"			// [required] 서류촬영 카메라 화면 type 값 (native)
		,"position"		: "data-jx-ocrSubmit-position"		// [required] 서류촬영 카메라 화면 position 값 (native)
		,"maxImgCnt"    : "data-jx-ocrSubmit-max-img-cnt"	// [required] 서류촬영 카메라 화면 사진 저장 최대 개수 (native)
		,"serviceId"    : "data-jx-ocrSubmit-service-id"	// [required] 서류촬영 후 실행되는 서비스 ID
		,"checkId"      : "data-jx-ocrSubmit-check-id"		// [option]   제출여부 확인 span ID
		,"topTitle"		: "data-jx-ocrSubmit-top-title"		// [option]   서류촬영 카메라 화면 상단 title 값 (native)
		,"exeMsg"       : "data-jx-ocrSubmit-exe-msg"		// [option]   서류촬영 카메라 화면 확인 버튼 실행 시 메시지 (native)
		,"errMsg"       : "data-jx-ocrSubmit-err-msg"		// [option]   서류촬영 카메라 화면 에러 발생 시 메시지 (native)
		,"text"         : "data-jx-ocrSubmit-text"			// [option]   서류촬영 카메라 화면 안내 메시지 (native)
		,"isChkTime"    : "data-jx-ocrSubmit-chk-time"		// [option]   서류촬영 시간 제한 (09:00~18:00)
	};
	
	var JexMobileOcrSubmit = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			_ocrSubmit_var.thisSForm  = this;
			$jq.off("click").on("click", function() {
				_ocrSubmit_var.thisSForm.initVar($jq);
				_ocrSubmit_var.thisSForm.callOcr();
			});
		},
		execute : function(evt, $jq) {
		},
		initVar : function(target){
			_ocrSubmit_var.id=target.attr(sForm_attrs.id);
			_ocrSubmit_var.parentId=target.attr(sForm_attrs.parentId);
			_ocrSubmit_var.checkId=target.attr(sForm_attrs.checkId);
			_ocrSubmit_var.documentId=target.attr(sForm_attrs.documentId);
			_ocrSubmit_var.type=target.attr(sForm_attrs.type);
			
			_ocrSubmit_var.position=target.attr(sForm_attrs.position);
			_ocrSubmit_var.topTitle=target.attr(sForm_attrs.topTitle) == null ? _ocrSubmit_var.documentId + " 촬영" : target.attr(sForm_attrs.topTitle);
			_ocrSubmit_var.exeMsg=target.attr(sForm_attrs.exeMsg) == null ? _ocrSubmit_var.documentId + " 촬영 이미지를 최종 제출하시겠습니까?" : target.attr(sForm_attrs.exeMsg);
			_ocrSubmit_var.errMsg=target.attr(sForm_attrs.errMsg) == null ? _ocrSubmit_var.documentId + " 촬영 중 오류가 발생했습니다." : target.attr(sForm_attrs.errMsg);
			_ocrSubmit_var.text=target.attr(sForm_attrs.text) == null ? "촬영할 서류를 한 장씩 놓고 세로로 촬영해주세요." : target.attr(sForm_attrs.text);
			_ocrSubmit_var.maxImgCnt=target.attr(sForm_attrs.maxImgCnt);
			_ocrSubmit_var.bprIdxNo=target.attr(sForm_attrs.bprIdxNo);
			_ocrSubmit_var.serviceId=target.attr(sForm_attrs.serviceId);
			_ocrSubmit_var.isChkTime=target.attr(sForm_attrs.isChkTime);
		},
		callOcr : function() {
			if(_ocrSubmit_var.isChkTime == "true" && _ocrSubmit_var.thisSForm.chkTime() == false) {
				MobPopup.showAlertPopup("서류제출 거래 가능시간은 은행영업일 09:00~18:00 입니다.");
				return false;
			}
			
			if(_isAndroid() && _ocrSubmit_var.thisSForm.getAndVer() < 7) {
				MobPopup.showAlertPopup("사진촬영 기능은 Android 7.0 이상부터 사용 가능합니다. Android업데이트 후 이용해주세요.");
				return false;
			}
			
			if(_isAndroid() || _isIphone()) {
				$.nativeCall("ocrProcess", [{
					"BPR_IDX_NO" : _ocrSubmit_var.bprIdxNo,
					"type"       : _ocrSubmit_var.type,
					"position"   : _ocrSubmit_var.position,
					"top_title"  : _ocrSubmit_var.topTitle,
					"exe_msg"    : _ocrSubmit_var.exeMsg,
					"text"       : _ocrSubmit_var.text,
					"maxImgCnt"  : _ocrSubmit_var.maxImgCnt
				}]).done(function(data) {
					if(data.error == "0") { //정상
						var req_data = {
							"BPR_IDX_NO": data._imgUniqueId,
							"imgType" : _ocrSubmit_var.type
						};
						jex.setJexObj($("#" + _ocrSubmit_var.serviceId).attr("data-jx-svc-source-direct", JSON.stringify(req_data)).attr("data-jx-svc-onload", "true"));
					}
					else {
			
						var error_code = data.error;
			
						if(MobUtil.isEmpty(error_code)) {
							error_code = "9999";
							alert('MobUtil.isEmpty:'+data.error)
						}
			
						MobPopup.showAlertPopup(_ocrSubmit_var.errMsg + "<br>[오류코드:" + error_code + "]");
					}
				}).fail(function(data) {
					MobPopup.showAlertPopup(_ocrSubmit_var.errMsg);
				});
			} else {
				var req_data = {
					"BPR_IDX_NO": 'test',
					"imgType" : _ocrSubmit_var.type // 00 : 임대차계약서(자택), 01 : 임대차계약서(사업장)
				};
				
				jex.setJexObj($("#" + _ocrSubmit_var.serviceId).attr("data-jx-svc-source-direct", JSON.stringify(req_data)).attr("data-jx-svc-onload", "true"));
			}
		},
		chkTime : function () {
			//서류제출 가능시간 체크(영업일 9시 ~ 18시)
			var now_time     = g_getDate("HHmi"); //서버에서 현재시간 가지고 옴
			var abl_sttg_hms = "0900";
			var abl_fnsh_hms = "1800";
		
			if(_this.isHoliday == "true" || Number(now_time) < Number(abl_sttg_hms) || Number(now_time) > Number(abl_fnsh_hms)) {
				return false;
			}
			
			return true;
		},
		getAndVer : function () {
			var and_ver = "";
			var userAgent = navigator.userAgent.toLowerCase();
			var check = userAgent.match(/nma-plf-ver=([0-9\.]*)/);
			and_ver = check ? check[1] : false;
			
			if(and_ver) {
				and_ver = and_ver.substring(0, and_ver.indexOf('\.') + 1) + (and_ver.substring(and_ver.indexOf('\.') + 1)).replace(/\./g, '');
			}
			
			return and_ver;
		}
	});

	jex.plugin.add("JEX_MOBILE_OCRSUBMIT", JexMobileOcrSubmit, "data-jx-ocrSubmit");
})();
