var JexMobileSearchDateForm_parameters = {
	"vStartDateTarget" : "",
	"vEndDateTarget"   : "",
	"vStartOption"     : "",
	"vEndOption"       : "",
	"today"            : ""
};

(function() {
	var sForm_attrs = {
		"id"                  : "data-jx-searchdate",                    //호출할 svc 명
		"type"                : "data-jx-searchdate-type",               //날짜 검색 타입 ('future' or 'past')
		"calendarTarget"      : "data-jx-searchdate-cal-target",         //달력 노출 영역 ID
		"calendarStep"        : "data-jx-searchdate-cal-step",           //달력 노출 스텝
		"calendarStartOption" : "data-jx-searchdate-cal-startOption",    //달력 선택 옵션
		"calendarEndOption"   : "data-jx-searchdate-cal-endOption",      //달력 선택 옵션
		"startTarget"         : "data-jx-searchdate-start-target",       //시작 날짜 노출 id
		"endTarget"           : "data-jx-searchdate-end-target",         //종료 날짜 노출 id
		"defaultStartDtOpt"   : "data-jx-searchdate-default-start-date", //디폴트 시작일
		"defaultEndDtOpt"     : "data-jx-searchdate-default-end-date",   //디폴트 종료일
		"buttonOption"        : "data-jx-searchdate-btn-option"          //날짜 버튼 option 예) 1개월,2개월,3개월,4개월,5개월
	};
	
	var JexMobileSearchDateForm = JexPlugin.extend({
		init: function() {
			JexMobileSearchDateForm_parameters.today = g_getDate("yyyy-mm-dd");
		},
		load: function(attr, $jq) {
			this.$jq = $jq;
			
			this.type = this.$jq.attr(sForm_attrs.type);
			if(!this.type || !(this.type == "future" || this.type == "past")) {
				return;
			}
			else {
				if(this.type == "future") {
					this.isPast = false;
				}
				else {
					this.isPast = true;
				}
			}
			
			this.calendarTargetId = this.$jq.attr(sForm_attrs.calendarTarget);
			this.calendarStep     = this.$jq.attr(sForm_attrs.calendarStep);
			this.dStartDtOpt      = this.$jq.attr(sForm_attrs.defaultStartDtOpt);
			this.dEndDtOpt        = this.$jq.attr(sForm_attrs.defaultEndDtOpt);
			this.startOption      = this.$jq.attr(sForm_attrs.calendarStartOption);
			this.endOption        = this.$jq.attr(sForm_attrs.calendarEndOption);
			this.startTargetId    = this.$jq.attr(sForm_attrs.startTarget);
			this.endTargetId      = this.$jq.attr(sForm_attrs.endTarget);
			this.buttonOption     = this.$jq.attr(sForm_attrs.buttonOption);
			
			JexMobileSearchDateForm_parameters.vStartOption     = this.$jq.attr(sForm_attrs.calendarStartOption);
			JexMobileSearchDateForm_parameters.vEndOption       = this.$jq.attr(sForm_attrs.calendarEndOption);
			JexMobileSearchDateForm_parameters.vStartDateTarget = this.$jq.attr(sForm_attrs.startTarget);
			JexMobileSearchDateForm_parameters.vEndDateTarget   = this.$jq.attr(sForm_attrs.endTarget);
			
			if(isEmpty(this.buttonOption)) {
				this.isButtonOption = false;
			}
			else {
				this.buttonOption = this.buttonOption.split(",");
				
				if(this.buttonOption.length < 4) { //버튼은 최소 4개 이상
					this.isButtonOption = false;
				}
				else {
					this.isButtonOption = true;
				}
			}
			
			var ui = this.getHtml();
			
			this.$jq.attr("class", "search_group").html(ui);
			
			if(this.isButtonOption && this.buttonOption.length >= 5) { //버튼이 5개 이상일 경우 첫번째 두번째 버튼에 half class 적용
				this.$jq.find(".btn_area > button").eq(0).attr("class", "half");
				this.$jq.find(".btn_area > button").eq(1).attr("class", "half");
			}
			
			var vStartTargetId = this.$jq.attr(sForm_attrs.startTarget);
			var vEndTargetId   = this.$jq.attr(sForm_attrs.endTarget);
			
			this.$jq.find("#"+vStartTargetId + ",#" + vEndTargetId).on("change", function() {
				$jq.find(".btn_area > button").attr("aria-checked", "false").removeClass("active");
			});
			
			this.setEvent(this.$jq, this.isPast, this.startTargetId, this.endTargetId);
			
			var sObj      = $('#'+this.startTargetId)
			var sObjTagNm = sObj.get(0).tagName;
			var eObj      = $('#'+this.endTargetId);
			var eObjTagNm = eObj.get(0).tagName;
			
			var dStartDtOpt = this.dStartDtOpt.split(",");
			var dEndDtOpt   = this.dEndDtOpt.split(",");
			
			if(this.isPast) {
				if(sObjTagNm=='INPUT') {
					$('#'+this.endTargetId).val(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today, parseInt(dEndDtOpt[0]), parseInt(dEndDtOpt[1]), parseInt(dEndDtOpt[2]))));
					$('#'+this.startTargetId).val(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today, parseInt(dStartDtOpt[0]), parseInt(dStartDtOpt[1]), parseInt(dStartDtOpt[2]))));
				}
				else {
					$('#'+this.endTargetId).text(JexMobileSearchDateForm_parameters.today);
					$('#'+this.startTargetId).text(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today, 0, -1, 1)));
				}
			}
			else {
				if(sObjTagNm=='INPUT') {
					$('#'+this.startTargetId).val(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today,parseInt(dStartDtOpt[0]), parseInt(dStartDtOpt[1]), parseInt(dStartDtOpt[2]))));
					$('#'+this.endTargetId).val(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today, parseInt(dEndDtOpt[0]), parseInt(dEndDtOpt[1]), parseInt(dEndDtOpt[2]))));
				}
				else {
					$('#'+this.startTargetId).text(JexMobileSearchDateForm_parameters.today);
					$('#'+this.endTargetId).text(formatter.date(dateUtility().addShiftDate(JexMobileSearchDateForm_parameters.today, 0, 1, -1)));
				}
			}
			
			MobValidation.start();
			
			setTimeout(function() {
				jex.setJexObj($jq.find("#btnSearchDate_startBtn"));
				jex.setJexObj($jq.find("#btnSearchDate_endBtn"));
			}, 300);
		},
		getHtml : function() {
			var html = "";
			
			if(this.isButtonOption) {
				var arrBtn = this.buttonOption;
				
				html += '<div class="btn_area clickable ty2" role="radiogroup">';
				
				for(var i = 0; i < arrBtn.length; i++) {
					html += '	<button type="button" role="radio" aria-checked="false"><span class="text">' + arrBtn[i] + '</span></button>';
				}
				
				html += '</div>';
			}
			
			html += '<div class="comp_wrap from_to">';
			html += '	<div class="input">';
			html += '		<input type="tel" id="' + this.startTargetId + '" title="시작일 입력" maxlength="8" data-jx-chk-opt=\'{"name":"시작일","charType":"num","userChar":"-"}\' data-jx-chk="true" />';
			html += '		<button type="button" id="btnSearchDate_startBtn" class="btn calendar" title="달력으로 시작일 선택" data-jx-execute="click"';
			html += '			data-jx-calendar="#'+ this.calendarTargetId +'"';
			html += '			data-jx-calendar-target="#' + this.startTargetId + '"';
			html += '			data-jx-calendar-option=\'' + this.startOption + '\'';
			html += '			data-jx-calendar-format="yyyy-mm-dd"></button>';
			html += '	</div>';
			html += '	<span>~</span>';
			html += '	<div class="input">';
			html += '		<input type="tel" id="' + this.endTargetId + '" title="마지막일 입력" maxlength="8" data-jx-chk-opt=\'{"name":"종료일","charType":"num","userChar":"-"}\' data-jx-chk="true" />';
			html += '		<button type="button" id="btnSearchDate_endBtn" class="btn calendar" title="달력으로 마지막일 선택" data-jx-execute="click"';
			html += '			data-jx-calendar="#'+ this.calendarTargetId +'"';
			html += '			data-jx-calendar-target="#' + this.endTargetId + '"';
			html += '			data-jx-calendar-option=\'' + this.endOption + '\'';
			html += '			data-jx-calendar-format="yyyy-mm-dd"></button>';
			html += '	</div>';
			html += '</div>';
			
			return $(html);
		},
		setEvent : function($jq,isPast,startTargetId,endTargetId) {
			function onBtnAddDate(type){
				var sObj = $jq.find('#' +startTargetId);
				var sObjTagNm = sObj.get(0).tagName;
				var eObj = $jq.find('#' +endTargetId);
				var eObjTagNm = eObj.get(0).tagName;
				
				if(type=='당월' || type=='이번달'){
					var ndate = new Date(Date.parse(JexMobileSearchDateForm_parameters.today));
					ndate.setDate(1);
					if(sObjTagNm=="INPUT"){
						$jq.find('#'+endTargetId).val(JexMobileSearchDateForm_parameters.today);
						$jq.find('#'+startTargetId).val(ndate.format('yyyy-mm-dd'));
					}else{
						$jq.find('#'+endTargetId).text(JexMobileSearchDateForm_parameters.today);
						$jq.find('#'+startTargetId).text(ndate.format('yyyy-mm-dd'));
					}
				}else{
					if(isPast){
						var rDate;
						
						if(sObjTagNm=="INPUT"){
							$jq.find('#'+endTargetId).val(JexMobileSearchDateForm_parameters.today);
							rDate = new Date($jq.find('#'+endTargetId).val());
						}else{
							$jq.find('#'+endTargetId).text(JexMobileSearchDateForm_parameters.today);
							rDate = new Date($jq.find('#'+endTargetId).text());
						}
							
						if(type.match('일')){
							if(type == '당일'){
							
							}else if(type.match('전일')){
								rDate.setDate(rDate.getDate() - 1);
							}else if(type.match('주일')){
								var day = Number(type.replace('주일','')) * 7;
								rDate.setDate(rDate.getDate() - day);
							}else{
								var day = Number(type.replace('일','')) -1;
								rDate.setDate(rDate.getDate() - day);
							}
						}else if(type.match('개월')){
							var month = Number(type.replace('개월',''));
							rDate.setMonth(rDate.getMonth() - month);
							rDate.setDate(rDate.getDate() + 1);
						}else if(type.match('년')){
							var year = Number(type.replace('년',''));
							rDate.setYear(rDate.getFullYear() - year);
							rDate.setDate(rDate.getDate() + 1);
						}else if(type=='오늘') {
							
						}
						if(sObjTagNm=="INPUT"){
							$jq.find('#' +startTargetId).val(rDate.format('yyyy-mm-dd'));
						}else{
							$jq.find('#' +startTargetId).text(rDate.format('yyyy-mm-dd'));
						}	
					}else{
						var rDate;
						
						if(sObjTagNm=="INPUT"){
							$jq.find('#'+startTargetId).val(JexMobileSearchDateForm_parameters.today);
							rDate = new Date($jq.find('#'+startTargetId).val());
						}else{
							$jq.find('#'+startTargetId).text(JexMobileSearchDateForm_parameters.today);
							rDate = new Date($jq.find('#'+startTargetId).text());
						}
						
						if(type.match('일')){
							if(type == '당일'){
								
							}else if(type.match('주일')){
								var day = Number(type.replace('주일','')) * 7;
								rDate.setDate(rDate.getDate() + day);
							}else{
								var day = Number(type.replace('일',''));
								rDate.setDate(rDate.getDate() + day);
							}
						}else if(type.match('개월')){
							var month = Number(type.replace('개월',''));
							rDate.setMonth(rDate.getMonth() + month);
							rDate.setDate(rDate.getDate() - 1);
						}else if(type.match('년')){
							var year = Number(type.replace('년',''));
							rDate.setYear(rDate.getFullYear() + year);
							rDate.setDate(rDate.getDate() - 1);
						}else if(type=='오늘') {
							
						}
						if(eObjTagNm=="INPUT"){
							$jq.find('#' +endTargetId).val(rDate.format('yyyy-mm-dd'));
						}else{
							$jq.find('#' +endTargetId).text(rDate.format('yyyy-mm-dd'));
						}	
					}
				}
			}
			$jq.find(".btn_area > button").on("click", function(e) {
				onBtnAddDate($(e.target).text());
//				$(e.target).siblings().removeClass('on').attr('aria-checked', 'false');
//				$(e.target).addClass('on').attr('aria-checked', 'true');
			});
		}
	});
	
	jex.plugin.add("JEX_MOBILE_SEARCHDATE", JexMobileSearchDateForm, "data-jx-searchdate");
})();

function setDateChk(opt){
	var dateAlertPopup = {
		popUp : function() {
			setTimeout(function() {
				MobPopup.showAlertPopup('조회종료일자를 확인하여 주세요.<br /> 조회 종료일자가 시작일자보다 과거일자입니다.');
			}, 300);
		},
		popUp_2 : function() {
			setTimeout(function() {
				MobPopup.showAlertPopup('다시 날짜를 입력해주세요.');
			}, 300);
		}
	}
	
	var vStartDateTarget = JexMobileSearchDateForm_parameters.vStartDateTarget;
	var vEndDateTarget   = JexMobileSearchDateForm_parameters.vEndDateTarget;
	var vStartDateOption = JSON.parse(JexMobileSearchDateForm_parameters.vStartOption);
	var vEndDateOption   = JSON.parse(JexMobileSearchDateForm_parameters.vEndOption);
	
	//동적으로 availableDate를 수정 할 때!!
	if(typeof(opt) != "undefined" && opt == true) {
		var _s_start = JSON.parse($("#"+vStartDateTarget).next().attr("data-jx-calendar-option"))["availableDateStart"];
		var _s_end   = JSON.parse($("#"+vStartDateTarget).next().attr("data-jx-calendar-option"))["availableDateEnd"];
		var _e_start = JSON.parse($("#"+vEndDateTarget).next().attr("data-jx-calendar-option"))["availableDateStart"];
		var _e_end   = JSON.parse($("#"+vEndDateTarget).next().attr("data-jx-calendar-option"))["availableDateEnd"];
		
		vStartDateOption["availableDateStart"] = _s_start;
		vEndDateOption["availableDateStart"]   = _e_start;
		vStartDateOption["availableDateEnd"]   = _s_end;
		vEndDateOption["availableDateEnd"]     = _e_end;
	}
	
	var toDay = g_getDate("yyyy-mm-dd");
	var strDate = Number($("#"+vStartDateTarget).val().replace(/-/g, ""));
	var endDate = Number($("#"+vEndDateTarget).val().replace(/-/g, ""));
	
	if(typeof vStartDateOption["availableDateStart"] != "undefined" && typeof vEndDateOption["availableDateStart"] != "undefined") {
		var vStartDateAvailableStartArr = vStartDateOption["availableDateStart"].split(",");
		if( vStartDateAvailableStartArr.length < 2 ){
			var vSDS = Number(vStartDateOption["availableDateStart"]);
		}else{
			var vSDS = Number(c_dateUtil.addShiftDate(toDay, Number(vStartDateAvailableStartArr[0]), Number(vStartDateAvailableStartArr[1]), Number(vStartDateAvailableStartArr[2])));
		}
		
		var vEndDateAvailableStartArr = vEndDateOption["availableDateStart"].split(",");
		
		if( vEndDateAvailableStartArr.length < 2 ){
			var vEDS = Number(vEndDateOption["availableDateStart"]);
		}else{
			var vEDS = Number(c_dateUtil.addShiftDate(toDay, Number(vEndDateAvailableStartArr[0]), Number(vEndDateAvailableStartArr[1]), Number(vEndDateAvailableStartArr[2])));
		}
		
		if(strDate < vSDS || endDate < vEDS) {
			dateAlertPopup.popUp_2();
			return false;
		}
	}
	
	if(typeof vStartDateOption["availableDateEnd"] != "undefined" && typeof vEndDateOption["availableDateEnd"] != "undefined") {
		var vStartDateAvailableEndArr = vStartDateOption["availableDateEnd"].split(",");
		
		if(vStartDateAvailableEndArr.length < 2) {
			var vSDE = Number(vStartDateOption["availableDateEnd"]);
		}
		else {
			var vSDE = Number(c_dateUtil.addShiftDate(toDay, Number(vStartDateAvailableEndArr[0]), Number(vStartDateAvailableEndArr[1]), Number(vStartDateAvailableEndArr[2])));
		}
		
		var vEndDateAvailalbeEndArr = vEndDateOption["availableDateEnd"].split(",");
		
		if(vEndDateAvailalbeEndArr.length < 2) {
			var vEDE = Number(vEndDateOption["availableDateEnd"]);
		}
		else {
			var vEDE = Number(c_dateUtil.addShiftDate(toDay, Number(vEndDateAvailalbeEndArr[0]), Number(vEndDateAvailalbeEndArr[1]), Number(vEndDateAvailalbeEndArr[2])));
		}
		
		if(strDate > vSDE || endDate > vEDE) {
			dateAlertPopup.popUp_2();
			return false;
		}
	}
	
	if(strDate > endDate) {
		dateAlertPopup.popUp();
		return false;
	}
	
	return true;
}