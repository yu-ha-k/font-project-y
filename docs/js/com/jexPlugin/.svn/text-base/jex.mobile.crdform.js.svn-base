(function() {
	/**
	 * Date: 2024.07.01
	 * 
	 * 1. 카드공통
	 * 
	 * @namespace JexMobileCardForm
	 */
	window._cardForm;
	var sForm_attrs = {
		  "id"    : "data-jx-cardform" // 호출할 svc 명
		, "pvamt" : "data-jx-cardform-pvamt" // 계좌리스트 팝업에서 출금가능액 노출 여부
	};
	var sFormObj_attrs = {
		  "areaDrotCard"       : "data-jx-cardform-area-drot-card"        // [카드] 선택된 노출영역
		, "areaDrotEnpr"       : "data-jx-cardform-area-drot-enpr"        // [사업장] 선택된 노출영역
		, "areaDrotBilg"       : "data-jx-cardform-area-drot-bilg"        // [청구일] 선택된 노출영역
	};

	var JexMobileCardForm = JexPlugin
			.extend({
				init : function() {
					window._cardForm = this;
				},
				formIds : {
					  "drotCardInfoId"	: "drotCardInfo"	// 카드정보영역 ID
					, "cardListTbl"		: "cardListTbl"		// 카드리스트영역 ID
					, "drotEnprInfoId"	: "drotEnprInfo"	// 사업장정보영역 ID	
					, "enprListTbl"		: "enprListTbl"		// 사업장리스트영역 ID
					, "drotBilgInfoId"	: "drotBilgInfo"	// 청구일정보영역 ID	
					, "bilgListTbl"		: "bilgListTbl"		// 청구일리스트영역 ID
				},
				/**
				 * @method load data-jx-cardform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
				 */
				load : function(attr, $jq) {

					this._this = this;

					this.$jq = $jq;
					this.id = $jq.attr('id');
					this.stepNo = $jq.attr('data-jx-step-no');

					this.isPvamt = this.$jq.attr(sForm_attrs.pvamt) ? eval(this.$jq.attr(sForm_attrs.pvamt)) : false;

					// [카드정보] 영역 세팅
					var drotCardArea = $jq.find('[' + sFormObj_attrs.areaDrotCard + ']:first');
					if (drotCardArea.length > 0) {
						this.drawDrocCardAreaHtml(drotCardArea);
					}
					
					// [사업장정보] 영역 세팅
					var drotEnprArea = $jq.find('[' + sFormObj_attrs.areaDrotEnpr + ']:first');
					if (drotEnprArea.length > 0) {
						this.drawDrocEnprAreaHtml(drotEnprArea);
					}

					// [청구일정보] 영역 세팅
					var drotBilgArea = $jq.find('[' + sFormObj_attrs.areaDrotBilg + ']:first');
					if (drotBilgArea.length > 0) {
						this.drawDrocBilgAreaHtml(drotBilgArea);
					}
					
					// hr태그 전체 처리
					cardFormUtil.hrHide();

				},

				/**
				 * [카드정보 & 선택 리스트] 팝업
				 */
				drawDrocCardAreaHtml : function($jq) {					
					var cardListPopupHtml = 
						'<div class="bottom_popup_wrap" id="cardListPopup" title="카드 선택" data-log-desc="카드 선택">'
							+ '<div class="bottom_popup">'
							+ '	<div class="bottom_popup_header">'
							+ '		<h2 class="tit">카드 선택</h2>'
							+ '		<button type="button" class="btn_close" onclick="cardFormUtil.cardListPopClose()">닫기</button>'
							+ '	</div>'
							+ '	<div class="bottom_popup_body">'
							+ '		<ul class="select_list ty3" role="listbox" id="' + this.formIds.cardListTbl + '" data-jx-list="' + this.formIds.cardListTbl + '">'
							+ '			<li class="acount_select_item" role="option" '
										+ 'data-jx-execute="click" '
										+ 'data-jx-setter="" '
										+ 'data-jx-setter-source="this" '
										+ 'data-jx-setter-handler="cardListSetter()" '
										+ 'data-jx-setter-target="#bottomPop" '
										+ 'data-jx-setter-execute="FUNC@cardFormUtil.cardListPopClose()" > '
										+ '<div class="item"> '
										+ '	<div class="item_top" id="ACNT_NM"></div>'
										+ '	<div class="item_bottom" id="CDN"></div>'
										+ '</div>'
							+ '			</li>'
							+ '		</ul>'
							+ '	</div>'
							+ '</div>'
						+ '</div>';

						$('#step').append(cardListPopupHtml);
						jex.setJexObj($('#cardListPopup'));
						
						var cardAreaHtml =
							'<h3 class="input_label ty1">카드 선택</h3>'
						+   '<div class="dropdown ty2" role="button" title="카드 선택 목록보기" id="' + this.formIds.drotCardInfoId + '">' 
						+	'	<div id="CDNV" class="dropdown_text">선택하세요</div>'
						+	'</div>';
						cardAreaHtml = $(cardAreaHtml);
						
						$jq.on('click', function(evt) {
							if(_this.all_card_list.length > 0){
								comLayerPopUtil.open("cardListPopup");
							}
						});
						
						$jq.html(cardAreaHtml);
						jex.setJexObj($jq);
				},
				
				/**
				 * [사업장정보 & 선택 리스트] 팝업
				 */
				drawDrocEnprAreaHtml : function($jq) {
					var enprListPopupHtml = 
						'<div class="bottom_popup_wrap" id="enprListPopup" title="사업장 선택" data-log-desc="사업장 선택">'
							+ '<div class="bottom_popup">'
							+ '	<div class="bottom_popup_header">'
							+ '		<h2 class="tit">사업장 선택</h2>'
							+ '		<button type="button" class="btn_close" onclick="cardFormUtil.enprListPopClose()">닫기</button>'
							+ '	</div>'
							+ '	<div class="bottom_popup_body">'
							+ '		<ul class="select_list ty3" role="listbox" id="' + this.formIds.enprListTbl + '" data-jx-list="' + this.formIds.enprListTbl + '">'
							+ '			<li class="acount_select_item" role="option" '
										+ 'data-jx-execute="click" '
										+ 'data-jx-setter="" '
										+ 'data-jx-setter-source="this" '
										+ 'data-jx-setter-handler="enprListSetter()" '
										+ 'data-jx-setter-target="#bottomPop" '
										+ 'data-jx-setter-execute="FUNC@cardFormUtil.enprListPopClose()" > '
										+ '<div class="item"> '
										+ '	<div class="item_top">'
										+ ' 	<span id="ENPR_BSUN_NO"></span>&nbsp;'
										+ ' 	<span id="BSUN_NM"></span>'
										+ '	</div>'
										+ '	<div class="item_bottom">'
										+ ' 	<span>대표카드번호</span>&nbsp;'
										+ ' 	<span id="CDN"></span>'
										+ '	</div>'		
										+ '</div>'
							+ '			</li>'
							+ '		</ul>'
							+ '	</div>'
							+ '</div>'
						+ '</div>';

						$('#step').append(enprListPopupHtml);
						jex.setJexObj($('#enprListPopup'));
						
						var enprAreaHtml =
							'<h3 class="input_label ty1">사업장번호</h3>'
						+   '<div class="dropdown ty2" role="button" title="사업장번호 목록보기" id="' + this.formIds.drotEnprInfoId + '">' 
						+	'	<div id="ENPR_CDNV" class="dropdown_text">선택하세요</div>'
						+	'</div>';
						enprAreaHtml = $(enprAreaHtml);						
						
						$jq.on('click', function(evt) {
							if(_this.all_enpr_list.length > 0){
								comLayerPopUtil.open("enprListPopup");
							}
						});		
						
						$jq.html(enprAreaHtml);
						jex.setJexObj($jq);						
				},
				
				/**
				 * [청구일정보 & 선택 리스트] 팝업
				 */
				drawDrocBilgAreaHtml : function($jq) {
					var bilgListPopupHtml = 
						'<div class="bottom_popup_wrap" id="bilgListPopup" title="청구일 선택" data-log-desc="청구일 선택">'
							+ '<div class="bottom_popup">'
							+ '	<div class="bottom_popup_header">'
							+ '		<h2 class="tit">청구일 선택</h2>'
							+ '		<button type="button" class="btn_close" onclick="cardFormUtil.bilgListPopClose()">닫기</button>'
							+ '	</div>'
							+ '	<div class="bottom_popup_body">'
							+ '		<ul class="select_list ty1" role="listbox" id="' + this.formIds.bilgListTbl + '" data-jx-list="' + this.formIds.bilgListTbl + '">'
							+ '			<li role="option" '
										+ 'data-jx-execute="click" '
										+ 'data-jx-setter="" '
										+ 'data-jx-setter-source="this" '
										+ 'data-jx-setter-handler="bilgListSetter()" '
										+ 'data-jx-setter-target="#bottomPop" '
										+ 'data-jx-setter-execute="FUNC@cardFormUtil.bilgListPopClose()" > '
										+ '<span id="BILG_YMD" data-jx-formatter="date"></span>'
							+ '			</li>'
							+ '		</ul>'
							+ '	</div>'
							+ '</div>'
						+ '</div>';

						$('#step').append(bilgListPopupHtml);
						jex.setJexObj($('#bilgListPopup'));
						
					
					var bilgAreaHtml =
						   '<div class="dropdown ty2" role="button" title="청구일 선택 목록보기" id="' + this.formIds.drotBilgInfoId + '">' 
						+	'	<div id="BILG_YMDV" class="dropdown_text">청구일이 없어요</div>'
						+	'</div>';
					
					bilgAreaHtml = $(bilgAreaHtml);
					
					$jq.on('click', function(evt) {
						if(_this.all_bilg_list.length > 0){
							comLayerPopUtil.open("bilgListPopup");
						}
					});		
					
					$jq.html(bilgAreaHtml);
					jex.setJexObj($jq);
				},
			});
	

	jex.plugin.add("JEX_MOBILE_CARDFORM", JexMobileCardForm, "data-jx-cardform");
	
})();


// 카드공통 함수.
var cardFormUtil = {				
		hrHide : function() {
			$("#step").find("hr").each(function (idx) {
				$(this).attr("aria-hidden", "true");
			});			
		},
		
		cardListPopClose : function() {
			comLayerPopUtil.close("cardListPopup");
		},
		
		enprListPopClose : function() {
			comLayerPopUtil.close("enprListPopup");
		},
		
		bilgListPopClose : function() {
			comLayerPopUtil.close("bilgListPopup");
		}		
};


//조회조건 날짜 포멧
function cardForm_uf_searchDateFormat(dat){
	var dt = dat.replace(/-/g, "");
	var adt = new Array();
	var rt = new Array();
	
	adt.push(dt.substr(0, 4));
	adt.push(dt.substr(4, 2));
	adt.push(dt.substr(6, 2));
	
	for (var i = 0; i < adt.length; i++) {
		if (adt[i].length == 1) 
			rt.push("0" + adt[i]);
		else 
		    rt.push(adt[i]);
	}	
	return (rt[0] + "." + rt[1] + "." + rt[2]);
}

//조회조건 요약부 바인딩
function cardForm_uf_setSearchCondition(conditionPopupId, setTagId){
	var searchDate = ""; // 조회 기간
	var condition = "";        // 조회 조건 요약
	 
	$("#calArea").find("input").each(function(idx, item){
		idx++;
	    var dat = $.trim($(item).val());
	    searchDate += cardForm_uf_searchDateFormat(dat);
	    
	    if($("#calArea").find("input").length > idx){
	            searchDate += "~";
	    }
	});
	 
	$("#searchDate").text(searchDate);
	 
	$("#"+conditionPopupId).find(".active").each(function(idx, item){
        idx++;
        condition += $.trim($(item).text());
	    
        if($("#"+conditionPopupId).find(".active").length > idx){
        	if(!$(this).hasClass("calendar")){
        		condition += " · ";
        	}
	    }
	});
	 
	// 조건 버튼이 없는 경우 마지막 .문자 제거
	if($("#"+conditionPopupId).find(".active").length <= 0){
		condition = condition.slice(0, -1)
	}
	 
	if(!isEmpty(condition)){
		$("#"+setTagId).text(condition);
	}
}


//조회조건 버튼 선택 이벤트
function b2bform_uf_setActiveBtn(e){
	var selTg =  $(e.target);
	 
	if($(selTg).is("span")){
	selTg = $(e.target).parent();
	}
	 
	$(selTg).attr("aria-checked", "true").addClass("active");
	$(selTg).siblings("button").attr("aria-checked", "false").removeClass("active");
}

