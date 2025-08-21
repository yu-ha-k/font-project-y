(function() {
	var sForm_attrs = {
		"id"	    			: "data-jx-terms",						// [required] 약관동의 적용
		"onload"				: "data-jx-terms-onload",				// [option]   onload시 처리 여부 true/false
		"groupagreeEventId"		: "data-jx-terms-groupagree-event-id",	// [option]   그룹동의 : group 전체동의 event id
		"groupagreeCheckedId"	: "data-jx-terms-groupagree-checked-id",// [option]   그룹동의 : group 전체동의 체크박스 target id
		"groupagreeTermId"		: "data-jx-terms-groupagree-term-id",	// [option]   그룹동의 : group 전체동의 term id
		"groupagreeTitle"		: "data-jx-terms-groupagree-title",		// [option]   그룹동의 : Viewer에서 보여질 제목
		"allagreeEventId"		: "data-jx-terms-allagree-event-id",	// [option]   전체동의 : PDF 뷰어 로딩 Event 추가할 Target ID - 없을 경우, 삭제
		"allagreeCheckedId"		: "data-jx-terms-allagree-checked-id",	// [option]   전체동의 : PDF 뷰어에서 동의할 경우, 체크할 Target ID
		"allagreeTitle"			: "data-jx-terms-allagree-title",		// [option]   전체동의 : Viewer에서 보여질 제목
		"targetEventId"    		: "data-jx-terms-target-event-id",		// [required] 개별약관 Target ID
		"targetCheckedId"    	: "data-jx-terms-target-checked-id",	// [option]   개별약관 체크박스 Target ID
		"targetTitle"			: "data-jx-terms-target-title",			// [required] HTML : 웹페이지제목@Native제목, PDF : Native제목, Default = 약관
		"targetUrl"				: "data-jx-terms-target-url",			// [required] 개별약관 파일 URL
		"targetId"				: "data-jx-terms-target-id",			// [required] 개별약관 파일 ID (관리자사이트 > 공통관리 > 파일URL 관리 메뉴연동)
		"callback"				: "data-jx-terms-callback",				// [option]   체크박스 상태 결과를 콜백함수로 반환
		"btnName"				: "data-jx-terms-btn-name",				// [option]   버튼명(HTML 에서 보여질 버튼명)
	};

	var JexMobileUiTerms = JexPlugin.extend({
		init: function () {
		},
		/**
		 * @method load
		 * data-jx-terms 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this.initSetData($jq);
			if (this.onload) {
				this.addEvent($jq);		// 약관 영역에 이벤트 바인딩
			}
		},
		initSetData : function($jq) {
			this.id = $jq.attr(sForm_attrs.id);								// 약관 ID
			this.onload = ("true"==$jq.attr(sForm_attrs.onload));			// onload 시 처리 여부
			this.allagreeEventId = $jq.attr(sForm_attrs.allagreeEventId);	// 전체 동의 Target ID
			this.allagreeCheckedId = $jq.attr(sForm_attrs.allagreeCheckedId);	// 전체 동의 체크할 Target ID
			this.allagreeTitle = $jq.attr(sForm_attrs.allagreeTitle);		// 뷰어에서 보여질 제목
			
			this.groupagreeEventId = $jq.attr(sForm_attrs.groupagreeEventId);	// 전체 동의 Target ID
			this.groupagreeCheckedId = $jq.attr(sForm_attrs.groupagreeCheckedId);	// 전체 동의 체크할 Target ID
			this.groupagreeTermId = $jq.attr(sForm_attrs.groupagreeTermId);	// 전체 동의 체크할 Target ID
			this.groupagreeTitle = $jq.attr(sForm_attrs.groupagreeTitle);		// 뷰어에서 보여질 제목
			
			this.callback = $jq.attr(sForm_attrs.callback);					// 클릭 시, 체크박스 상태를 콜백함수로 전달
			this.fileUrlList = new Array();
			this.targetCheckedIdList = new Array();
			this.allagreeCheckedIdList = new Array();

			var _jexObj = jex.getJexObj($jq, "JEX_MOBILE_UI_TERMS");
			_jexObj.fileUrlList = new Array();
			_jexObj.targetCheckedIdList = new Array();
		},
		addEvent : function($jq) {
			//cache데이터에서 약관 가져오기
			var targetIdList = [];
			var termsMap = {};
			$jq.children().each(function(){
				var targetId = $(this).attr(sForm_attrs.targetId);
				if(!isEmpty(targetId)) {
					targetIdList.push(targetId);
				}
			});
			var termsList = comCacheUtil.getTermUrlList(targetIdList.join(','));
			for(var i=0; i < termsList.length; i++){
				termsMap[termsList[i].term_id] = {term_url:termsList[i].term_url,term_title:termsList[i].term_title};
			}
			
			// 개별약관 이벤트 추가
			$jq.children().each(function(){ //원래
				var _this = jex.getJexObj($jq, "JEX_MOBILE_UI_TERMS");
				var targetEventId = $(this).attr(sForm_attrs.targetEventId);
				var targetCheckedId = $(this).attr(sForm_attrs.targetCheckedId);
				var targetTitle = $(this).attr(sForm_attrs.targetTitle);
				var targetUrl = $(this).attr(sForm_attrs.targetUrl);
				var targetId = $(this).attr(sForm_attrs.targetId);
				
				if(!isEmpty(targetId)) {
					var pdfInfo = termsMap[targetId];
					if(targetUrl == null && pdfInfo !== undefined && pdfInfo.term_url != ""){
						targetUrl = pdfInfo.term_url;
					}
					if(targetTitle == null && pdfInfo !== undefined && pdfInfo.term_title != ""){
						targetTitle = pdfInfo.term_title;
					}
				}
				
				var btnName = $(this).attr(sForm_attrs.btnName);

				if(!isEmpty(targetUrl)) {
					_this.fileUrlList.push(targetUrl);		// 전체동의 클릭 시, 보여질 병합 Viewer (URL이 없을 경우엔 삭제)
				}
				_this.targetCheckedIdList.push(targetCheckedId);		// check box Element ID 저장

				$(targetEventId).off("click").on("click", function() {
					var checkedResult = false;
					
					if($(this).prop("type") == "checkbox" && $(this).is(":checked")) { //체크박스인 경우엔, 비활성 상태일 때만 뷰어 실행
						if(!isEmpty(targetUrl)) {
							$(targetCheckedId).prop("checked", checkedResult); //comUI.js에서 실행한 체크 해제
						}
						if(!isEmpty(targetUrl)) {
							_termViewer.open(targetTitle, [targetUrl], function(dat) {
								if(dat.result == "true") {
									checkedResult = true;
								}
								
								$(targetCheckedId).prop("checked", checkedResult);
								$(targetCheckedId).trigger("change");
								
								_this.executeCallback(_this.callback);
							}, btnName);
						}else{
							_this.executeCallback(_this.callback);
						}
					} else if($(this).prop("type") == "" || $(this).prop("type") == "button") { //체크박스아닌 경우엔, 무조건 뷰어 실행
						$(targetCheckedId).prop("checked", checkedResult); //comUI.js에서 실행한 체크 해제
						_termViewer.open(targetTitle, [targetUrl], function(dat) {
							if(dat.result == "true") { //동의할 때만, 체크되도록 처리(X 버튼은 무반응)
								checkedResult = true;
							}
								
							$(targetCheckedId).prop("checked", checkedResult);
							$(targetCheckedId).trigger("change");
							_this.executeCallback(_this.callback);
						}, btnName);
					} else { //체크박스 비활성 상태일 때, 뷰어 실행 안함
						$(targetCheckedId).prop("checked", checkedResult);
						$(targetCheckedId).trigger("change");
						_this.executeCallback(_this.callback);
					}
				});
			});

			//전체동의 이벤트 추가
			if(!isEmpty(this.allagreeEventId)) {
				$(this.allagreeEventId).off("click").on("click", function() {
					var checkedResult = false;
					var _this = jex.getJexObj($jq, "JEX_MOBILE_UI_TERMS");
					if($(this).prop("type") == "checkbox" && $(this).is(":checked")) { //체크박스인 경우엔, 비활성 상태일 때만 뷰어 실행(X 버튼은 비동의 처리)
						if(_this.fileUrlList.length > 0){
							$(_this.allagreeCheckedId).prop("checked", checkedResult); //comUI.js에서 실행한 체크 해제
							_termViewer.open(_this.allagreeTitle, _this.fileUrlList, function(dat) {
								if(dat.result == "true") {
									checkedResult = true;
								}
								
								$(_this.allagreeCheckedId).prop("checked", checkedResult);
								$(_this.allagreeCheckedId).trigger("change");
								for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
									$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
									$(_this.targetCheckedIdList[i]).trigger("change");
								}
								
								_this.executeCallback(_this.callback);
							});
						}
					} else if($(this).prop("type") == "" || $(this).prop("type") == "button") { //체크박스아닌 경우엔, 무조건 뷰어 실행
						if(_this.fileUrlList.length > 0){
							$(_this.allagreeCheckedId).prop("checked", checkedResult); //comUI.js에서 실행한 체크 해제
							_termViewer.open(_this.allagreeTitle, _this.fileUrlList, function(dat) {
								if(dat.result == "true") { //동의할 때만, 체크되도록 처리(X 버튼은 무반응)
									checkedResult = true;
								}
									
								$(_this.allagreeCheckedId).prop("checked", checkedResult);
								$(_this.allagreeCheckedId).trigger("change");
								
								for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
									$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
									$(_this.targetCheckedIdList[i]).trigger("change");
								}
								
								_this.executeCallback(_this.callback);
							});
						}
					} else { //체크박스 비활성 상태일 때, 뷰어 실행 안함
						for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
							$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
							$(_this.targetCheckedIdList[i]).trigger("change");
						}
						
						_this.executeCallback(_this.callback);
					}
				});
			}
			//그룹동의 이벤트 추가
			if(!isEmpty(this.groupagreeEventId)) {
				$(this.groupagreeEventId).off("click").on("click", function() {
					var checkedResult = false;
					var _this = jex.getJexObj($jq, "JEX_MOBILE_UI_TERMS");
					if($(this).prop("type") == "checkbox" && $(this).is(":checked")) {//체크박스인 경우엔, 비활성 상태일 때만 뷰어 실행(X 버튼은 비동의 처리)
						$(_this.groupagreeEventId).prop("checked", checkedResult); //comUI.js에서 실행한 체크 해제
						_this.groupagreeTermId = $jq.attr(sForm_attrs.groupagreeTermId);
						
						_this.fileUrlList = [];
						_this.targetCheckedIdList = [];
						_this.allagreeCheckedIdList = [];
						var groupTerms = _this.groupagreeTermId.split(",").map(item => item.trim());
						for(var i = 0; i < groupTerms.length; i++) {
							var _terms = jex.getJexObj($(groupTerms[i]), "JEX_MOBILE_UI_TERMS");
							if(_terms.fileUrlList.length > 0){
								_this.fileUrlList.push(_terms.fileUrlList);
							}
							_this.targetCheckedIdList = _this.targetCheckedIdList.concat(_terms.targetCheckedIdList);
							_this.allagreeCheckedIdList.push(_terms.allagreeCheckedId);
						}
						
						if(_this.fileUrlList.length > 0){
							_termViewer.open(_this.groupagreeTitle, _this.fileUrlList, function(dat) {
								if(dat.result == "true") {
									checkedResult = true;
								}
								$(_this.groupagreeCheckedId).prop("checked", checkedResult);
								$(_this.groupagreeCheckedId).trigger("change");
								
								for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
									$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
									$(_this.targetCheckedIdList[i]).trigger("change");
								}
								for(var i = 0; i < _this.allagreeCheckedIdList.length; i++) {
									$(_this.allagreeCheckedIdList[i]).prop("checked", checkedResult);
									$(_this.allagreeCheckedIdList[i]).trigger("change");
								}
								
								_this.executeCallback(_this.callback);
							});
						}else{
							checkedResult = true;
							$(_this.groupagreeCheckedId).prop("checked", checkedResult);
							$(_this.groupagreeCheckedId).trigger("change");
							
							for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
								$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
								$(_this.targetCheckedIdList[i]).trigger("change");
							}
							for(var i = 0; i < _this.allagreeCheckedIdList.length; i++) {
								$(_this.allagreeCheckedIdList[i]).prop("checked", checkedResult);
								$(_this.allagreeCheckedIdList[i]).trigger("change");
							}
							
							_this.executeCallback(_this.callback);
						}
					}else {
						for(var i = 0; i < _this.targetCheckedIdList.length; i++) {
							$(_this.targetCheckedIdList[i]).prop("checked", checkedResult);
							$(_this.targetCheckedIdList[i]).trigger("change");
						}
						for(var i = 0; i < _this.allagreeCheckedIdList.length; i++) {
							$(_this.allagreeCheckedIdList[i]).prop("checked", checkedResult);
							$(_this.allagreeCheckedIdList[i]).trigger("change");
						}
						_this.executeCallback(_this.callback);
					}
				});
			}
		},
		executeCallback : function(callback) {
			if(callback != undefined && callback.length > 0) {
				var checkedYn = false;
				if(!isEmpty(this.allagreeCheckedId) && $(this.allagreeCheckedId).is(":checked")) {
					checkedYn = true;
				}
				var param = {
						allCkeckedYn : checkedYn
					};
				eval(callback)(param);
			}
		},
		execute : function(action, $jq) {
		}
	});
	jex.plugin.add("JEX_MOBILE_UI_TERMS", JexMobileUiTerms, "data-jx-terms");
})();

var _termViewer = {
	/**
	 * @description 약관뷰어로 PDF뷰어 풀팝업을 호출한다.
	 * @param title  : PDF뷰어에서 보여질 제목
	 * @param fileUrlList : PDF 파일 경로
	 * @param callback : PDF 뷰어가 닫힐때 호출될 콜백함수
	 * @param btnName : HTML 풀팝업 동의 버튼명
	 */
	open : function(title, fileUrlList, callback, btnName) {
		//pdfMerge -> pdfViewer
		comWebkey_showPdf(title, fileUrlList, callback, btnName);
	}
}