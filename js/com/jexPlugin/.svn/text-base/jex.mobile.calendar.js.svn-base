var JexMobileOneSearchDateForm_parameters = {
	"vStartDateTarget" : "",
	"vStartOption" : []
};

(function() {
	var calendar_attr = {
		calendarId : "data-jx-calendar",        //달력이 표시될 위치
		target     : "data-jx-calendar-target", //선택한 날짜가 들어갈 영역
		format     : "data-jx-calendar-format", //[option] 날짜 형식 (def:"yyyy-mm-dd MMM") ex) 2013-05-10 금요일
		option     : "data-jx-calendar-option", //[option] 달력 옵션
		title      : "data-jx-calendar-title"   //[option] 달력 제목 (def:날짜선택)
	};
	
	var class_name = {
		today           : "today",    //오늘
		selected        : "on",       //선택일
		saturday        : "sat",      //토요일
		sunday          : "sun",      //일요일
		holiday         : "sun",      //휴일
		term            : "term",     //기간
		preSunday       : "btn_prev", //전달 일요일
		preMonth        : "btn_prev", //전달
		nextSaturday    : "btn_next", //다음달 토요일
		nextSunday      : "btn_next", //다음달 일요일
		nextMonth       : "btn_next", //다음달
		disableSunday   : "off",      //비활성화된 일요일
		disableSaturday : "off",      //비활성화된 토요일
		disableDay      : "off"       //비활성화된 평일
	};
	
	var baseDt = {
		year : 0000,
		mon  : 1,
		dt   : 1,
		week : 5
	};
	
	var jexMobileCalendar = JexPlugin.extend({
		init : function() {
			this.getMonLen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			this.getWeek   = ["일", "월", "화", "수", "목", "금", "토"];
			
			if($("#calendarPopup").length == 0) {
				var html = '';
				html += '<div class="bottom_popup_wrap" id="calendarPopup" data-log-desc="날짜선택 팝업" aria-hidden="true">';
				html += '	<div class="bottom_popup">';
				html += '		<div class="bottom_popup_header">';
				html += '			<h2 class="tit" id="calendarTitle">날짜선택</h2>';
				html += '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'calendarPopup\');">닫기</button>';
				html += '		</div>';
				html += '		<div class="bottom_popup_body">';
				html += '			<div id="calendarArea" class="group calendar_box"></div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				
				$(".container_wrap").append(html);
			}
		},
		load : function(attr, $jq) {
			this.$object = $jq;
			
			JexMobileOneSearchDateForm_parameters.vStartOption.push({"target": this.$object.attr(calendar_attr.target), "option": this.$object.attr(calendar_attr.option)});
			
			this.$calendarObj    = $("#calendarArea");
			this.option          = this.parseOption(this.$object.attr(calendar_attr.option));
			this.$targetObjs     = this.parseTargetObjList(this.$object.attr(calendar_attr.target));
			this.target          = this.$targetObjs[0].getTagValue();
			this.format          = !this.$object.attr(calendar_attr.format) ? "yyyy-mm-dd EEE" : this.$object.attr(calendar_attr.format);
			this.curDate         = this.getParseDate(this.target, this.format);
			this.curSelectedDate = this.getParseDate(this.target, this.format);
			this.fixDay          = this.curDate.day;
			this.inputObj        = this.$object.attr(calendar_attr.target);
			this.term            = this.getTerm(this.option);
			this.calendarTag     = this.getCalendarTag();
			this.title           = !this.$object.attr(calendar_attr.title) ? "날짜선택" : this.$object.attr(calendar_attr.title);
			
			$(this.inputObj).on("focus", function(e) {
				$(e.target).val($(e.target).val().replace(/[-]/g, ""));
			});
			
			$(this.inputObj).on("blur", function(e) {
				var val = mobFormatter.date($(e.target).val());
				
				$(e.target).val(val);
				
				if(!MobDate.isValidDate(val.replace(/[-]/g,""))) {
					MobPopup.showAlertPopup("날짜를 확인해주세요.", undefined, function() {
						$(e.target).val("");
						$(e.target).focus();
					});
				}
			});
		},
		execute : function() {
			var $target   = this.$targetObjs[0];
			var targetVal = $target.getTagValue();
			
			if(!MobDate.isValidDate(targetVal.replace(/[-]/g,""))) {
				MobPopup.showAlertPopup("날짜를 확인해주세요.", undefined, function() {
					$target.val("");
					$target.focus();
				});
				return;
			}
			
			this.target          = targetVal;
			this.option          = this.parseOption(this.$object.attr(calendar_attr.option));
			this.format          = !this.$object.attr(calendar_attr.format) ? "yyyy-mm-dd EEE" : this.$object.attr(calendar_attr.format);
			this.curDate         = this.getParseDate(this.target,this.format);
			this.curSelectedDate = this.getParseDate(this.target, this.format);
			this.fixDay          = this.curDate.day;
			this.term            = this.getTerm(this.option);
			
			this.draw(this.curDate);
			
			comLayerPopUtil.open("calendarPopup");
		},
		draw : function(newCurDate) {
			this.curDate = newCurDate;
			var _this = this;
			
			var $calendarPopup = $("#calendarPopup");
			
			$calendarPopup.attr("data-log-desc", _this.title + " 팝업");
			$calendarPopup.find("#calendarTitle").text(_this.title);
			
			if(this.notCalendar()) {
				this.$calendarObj.append(this.calendarTag);
			}
			
			/* 일달력에서 이전달버튼 클릭시 이전달로 이동 */
			this.$calendarObj.find("#preMon").off("click").on("click", function() {
				var preDate = MobCalendar.getPreMonth(_this.curDate);
				_this.drawCalendar({ year : preDate.year, mon : preDate.mon, day : -1 });
			});
			
			/* 일달력에서 다음달버튼 클릭시 다음달로 이동 */
			this.$calendarObj.find("#nextMon").off("click").on("click", function() {
				var nextDate = MobCalendar.getNextMonth(_this.curDate);
				_this.drawCalendar({ year : nextDate.year, mon : nextDate.mon, day : -1 });
			});
			
			/* 일달력에서 전년도 버튼 클릭시 전년으로 이동 */
			this.$calendarObj.find("#preYear").off("click").on("click", function() {
				_this.drawCalendar({ year :_this.curDate.year - 1, mon : _this.curDate.mon, day : -1 });
			});
			
			/* 일달력에서 다음년도 버튼 클릭시 다음년으로 이동 */
			this.$calendarObj.find("#nextYear").off("click").on("click", function() {
				_this.drawCalendar({ year :_this.curDate.year + 1, mon : _this.curDate.mon, day : -1 });
			});
			
			this.drawCalendar(this.curDate);
		},
		drawCalendar : function(newCurDate) {
			this.curDate = newCurDate;
			var _this = this;
			
			if(this.notCalendar()) {
				this.$calendarObj.append(this.calendarTag);
			}
			
			//년도 와 월 셋팅.
			this.$calendarObj.find("#year").html(parseInt(this.curDate.year));
			this.$calendarObj.find("#mon").html(parseFloat(this.curDate.mon));
			this.$calendarObj.find("table").find("tbody").find("tr").remove();
			
			var fDt = this.getFirstDay({ year : this.curDate.year, mon : this.curDate.mon });
			var eDt = this.getMonEndDate({ year : this.curDate.year, mon : this.curDate.mon });
			var preEDt = this.getMonEndDate(MobCalendar.getPreMonth(this.curDate));	//전달 종료일
			var preSDt = preEDt - (fDt - 1);									//전달 시작일
			var nextSDt = 1;													//다음달 시작일
			
			var tr = $("<tr></tr>");
			var dd = 0; //일자를 보관
			var cw = 0; //요일을 보관

			var cs = 5 * 7; //1달이 5주
			if(fDt + eDt > cs) {
				cs = 6 * 7; //1달이 6주
			}
			var tmpFixDay = -1;
			if(this.option.fixDay) {
				tmpFixDay = this.getCalculatorFixDay(this.curDate,this.fixDay); //고정일
				this.curDate.day = tmpFixDay;
			}
			var compareDate = {};
			compareDate.year = this.curDate.year;
			compareDate.mon = this.curDate.mon;
			compareDate.day = this.curDate.day;
			var strCompareDate = undefined;														//그려지고있는 년월일
			var strToday =  MobCalendar.getFormatDate(MobCalendar.getToday(),"yyyymmdd");		//오늘날짜
			var strSelectedDate = MobCalendar.getFormatDate(this.curSelectedDate, "yyyymmdd");	//최종선택되었던 날짜
			
			for( var i = 0; i < cs; i++) {
				var td = $("<td></td>");
				if(i >= fDt) {
					dd++;
				}
				//그려지고 있는 달력의 년월일
				compareDate.day = dd;
				strCompareDate = MobCalendar.getFormatDate(compareDate,"yyyymmdd");
				
				if(cw == 0 || cw == 6) {
					//모든날짜 비활성화 시키도록 한경우 or 주말 비활성화하도록 옵션처리한 경우 or 비활성화기간옵션을 지정한경우에만 비활성화 or 년월이 변경되어도 일자는 변경되지 않아야 하는경우
					if(this.option.disableAll || this.option.disableHoliday
						|| strCompareDate < this.option.availableDateStart || strCompareDate > this.option.availableDateEnd
						|| (this.option.fixDay && tmpFixDay != compareDate.day)) {
						switch(cw) {
							case 0:td.attr("class", class_name.disableSunday);break;
							case 6:td.attr("class", class_name.disableSaturday);break;
						}
					}
					else {
						if(cw == 6) {
							td.attr("class", class_name.saturday);
						}
						else {
							td.attr("class", class_name.holiday);
						}
					}
				}
				if(dd <= 0 ) {
					td.attr("class", class_name.disableDay);
				}
				if(dd > eDt) {
					td.attr("class", class_name.disableDay);
				}
				if(strToday == strCompareDate) {
					td.attr("class", class_name.today);
				}
				if(strSelectedDate == strCompareDate) {
					td.attr("class", class_name.selected);
				}
				if(dd > 0 && dd <= eDt) {
					var disabledStr = "";
					
					if(this.option.disableAll || strCompareDate < this.option.availableDateStart || strCompareDate > this.option.availableDateEnd
							|| (this.option.fixDay && tmpFixDay != compareDate.day)) {
						td.addClass(class_name.disableDay);
						disabledStr = " disabled='disabled'";
					}
					//시작일, 종료일이 함께 사용하는 달력만 기간 표시
					if("undefined" != typeof(this.option.type)) {
						if(strCompareDate >= this.term.start && strCompareDate <= this.term.end) {
							td.addClass(class_name.term);
						}
						if(strSelectedDate == strCompareDate) {
							td.html(td.html() + "<button type='button' title='선택된 날짜'" + disabledStr + ">" + dd + "</button>");
						}
						else if(strToday == strCompareDate) {
							td.html(td.html() + "<button type='button' title='오늘 날짜'" + disabledStr + ">" + dd + "</button>");
						}
						else {
							td.html(td.html() + "<button type='button'" + disabledStr + ">" + dd + "</button>");
						}
					}
					else {
						td.html(td.html() + "<button type='button' title='선택된 날짜'" + disabledStr + ">" + dd + "</button>");
					}
				}
				tr.append(td);
				if(cw == 6) {
					tr.clone(true).appendTo(this.$calendarObj.find("table").find("tbody"));
					tr = $("<tr></tr>");
					cw = 0;
					continue;
				}
				cw++;
			}
			
			/* 이전달 토요일, 다음달 토요일,일요일 css 처리 */
			var preFirstSunObj  = this.$calendarObj.find("table tbody").find("td:first");
			var nextLastSatObj  = this.$calendarObj.find("table tbody").find("td:last");
			var nextFirstSunObj = this.$calendarObj.find("table tbody tr").eq(4).find("td:first");
			
			if(preFirstSunObj.is('[class="'+class_name.preMonth+'"]')) {
				preFirstSunObj.removeClass(class_name.sunday);
				preFirstSunObj.addClass(class_name.preSunday);
			}
			if(nextLastSatObj.is('[class="'+class_name.nextMonth+'"]')) {
				nextLastSatObj.removeClass(class_name.nextMonth);
				nextLastSatObj.addClass(class_name.nextSaturday);
			}
			if(nextFirstSunObj.is('[class="'+class_name.nextMonth+'"]')){
				nextFirstSunObj.removeClass(class_name.nextMonth);
				nextFirstSunObj.addClass(class_name.nextSunday);
			}
			
			/* 일달력에서 일자 클릭시 */
			this.$calendarObj.find("table").find("tbody").find("tr").find("td").off("click").on("click", function() {
				//disable 되어있지 않은 요일만 일자클릭시 동작하도록 함
				if(!$(this).is('[class~="'+class_name.disableSunday+'"]')
					&& !$(this).is('[class~="'+class_name.disableSaturday+'"]')
					&& !$(this).is('[class~="'+class_name.disableDay+'"]')) {
					//today 클래스 제거후 추가
					_this.$calendarObj.find("table").find("tbody").find('td[class~="'+class_name.selected+'"]').removeClass(class_name.selected);
					$(this).addClass(class_name.selected);
					
					//현재 클릭한 날짜 저장
					var year = parseInt(_this.$calendarObj.find("#year").html(),10);
					var mon = parseFloat(_this.$calendarObj.find("#mon").html(),10);
					$(this).find("em").remove();
					
					var day = parseFloat($(this).find("button").text(), 10);
					_this.curDate = {
						"year" : year,
						"mon"  : mon,
						"day"  : day
					};
					_this.curSelectedDate = _this.curDate;
					
					if(_this.option.setDateOneClick) {
						_this.clickBtnComplate();
					}
				}
			});
		},
		/* 달력의 완료버튼 클릭 */
		clickBtnComplate : function() {
			//모든 날짜 disable 인경우는 완료버튼 클릭시 값이 들어가도록 설정
			if(this.option.disableAll) {
				//현재 클릭한 날짜 저장
				var year = parseInt(this.$calendarObj.find("#year").html(), 10);
				var mon  = parseFloat(this.$calendarObj.find("#mon").html(), 10);
				var day  = this.curSelectedDate.day;
				
				this.curDate = {
					"year" : year,
					"mon"  : mon,
					"day"  : day
				};
				
				this.curSelectedDate = this.curDate;
			}
			
			comLayerPopUtil.close("calendarPopup");

			//target에 날짜시간 data 넣음
			this.setDateTimeTarget();
			
			//사용자함수가 있는 경우에 함수 호출
			if("undefined" != typeof(this.option.execute)) {
				var executeFunc = this.option.execute;
				executeFunc = executeFunc.substring(0, executeFunc.indexOf("(")) + "(" + '{"date":this.curSelectedDate}' + ")";
				eval(executeFunc);
			}
		},
		/* calendar data set*/
		setDateTimeTarget : function() {
			var formattedDate = MobCalendar.getFormatDate(this.curSelectedDate, this.format);
			
			for(var i = 0; i < this.$targetObjs.length; i++) {
				this.$targetObjs[i].val(formattedDate);
				this.$targetObjs[i].change();
			}
		},
		/* calendar 디자인 */
		getCalendarTag : function() {
			var tag = '';
			tag += '<div class="calendar_select_wrap">';
			tag += '	<div class="calendar_select">';
			tag += '		<button id="preYear" type="button" class="btn_prev"><span class="t_hidden">이전 년도</span></button>';
			tag += '		<span><em id="year"></em>년</span>';
			tag += '		<button id="nextYear" type="button" class="btn_next"><span class="t_hidden">다음 년도</span></button>';
			tag += '	</div>';
			tag += '	<div class="calendar_select">';
			tag += '		<button id="preMon" type="button" class="btn_prev"><span class="t_hidden">이전 달</span></button>';
			tag += '		<span><em id="mon"></em>월</span>';
			tag += '		<button id="nextMon" type="button" class="btn_next"><span class="t_hidden">다음 달</span></button>';
			tag += '	</div>';
			tag += '</div>';
			tag += '<div class="wrap_calendar">';
			tag += '	<table class="calendar weekday">';
			tag += '		<caption class="hidden">상세기간 달력</caption>';
			tag += '		<colgroup>';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '			<col style="width: 14.28%" />';
			tag += '		</colgroup>';
			tag += '		<thead>';
			tag += '			<tr>';
			tag += '				<th scope="col" class="sun">일</th>';
			tag += '				<th scope="col">월</th>';
			tag += '				<th scope="col">화</th>';
			tag += '				<th scope="col">수</th>';
			tag += '				<th scope="col">목</th>';
			tag += '				<th scope="col">금</th>';
			tag += '				<th scope="col" class="sat">토</th>';
			tag += '			</tr>';
			tag += '		</thead>';
			tag += '		<tbody>';
			tag += '			<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tag += '			<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tag += '			<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tag += '			<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tag += '			<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tag += '		</tbody>';
			tag += '	</table>';
			tag += '</div>';
			
			return tag;
		},
		/* calendar가 그려져있는지 여부 return */
		notCalendar : function() {
			var notCalendar = true;
			if(0 < this.$calendarObj.find("table.calendar").length) {
				notCalendar = false;
			}
			return notCalendar;
		},
		/* 날짜를 파싱하여 return  */
		getParseDate : function(curDate, inFormat) {
			var result = {};
			var strDate = curDate;
			var format = inFormat;
			
			//날짜가 없는 경우 defulat는 today
			if("" == strDate) {
				return MobCalendar.getToday();
			}
			
			strDate = strDate.replace(/[^0-9]/g, "");
			format = format.replace(/[^a-z]/g, "");
			format = format.replace("EEE", "");

			if(-1 < format.indexOf("yyyy")) {
				result.year = parseInt(strDate.substr(format.indexOf("yyyy"), 4));
			}
			if(-1 < format.indexOf("mm")) {
				result.mon = parseFloat(strDate.substr(format.indexOf("mm"), 2));
			}
			if(-1 < format.indexOf("dd")) {
				result.day = parseFloat(strDate.substr(format.indexOf("dd"), 2));
			}
			
			return result;
		},
		/* 월의 말일 구하기 */
		getMonEndDate : function(curDate) {
			if(curDate.mon == 2 && (curDate.year % 4 == 0 && (curDate.year % 100 != 0 || curDate.year % 400 == 0))) return 29;
			else return this.getMonLen[curDate.mon - 1];
		},
		/* 월의 시작요일구하기 */
		getFirstDay : function(curDate) {
			var yearlen = curDate.year - baseDt.year;
			var yun_yearlen = parseInt((curDate.year - 1) / 4, 10) - parseInt((curDate.year - 1) / 100, 10) + parseInt((curDate.year - 1) / 400, 10);
			var dt_cnt = yearlen + yun_yearlen + 1;
			
			for(var i = 0; i < curDate.mon - 1; i++) {
				dt_cnt = dt_cnt + this.getMonEndDate({ "year" : curDate.year, "mon" : i + 1 });
			}
			
			var week = (baseDt.week + dt_cnt + 1) % 7;
			
			return week;
		},
		parseOption: function(uOption) {
			var userOption = uOption;
			var option = {
				calendarType       : "absolute",
				type               : undefined,  //시작일,종료일 달력일경우만 사용 ex) start, end
				coupleTarget       : undefined,  //시작일 종료일인경우, 서로 상대방의 date가 표시될 영역의 id ex) #startDate 
				execute            : undefined,  //달력값이 셋팅전에 개별 처리해주기위해 사용하는 함수
				disableHoliday     : false,      //휴일을 disable 시킬지 여부, disable된 날짜 클릭시 아무 동작 안함
				disableAll         : false,      //모든 날짜 disable 여부
				availableDateStart : "00000101", //선택가능한 날짜 시작
				availableDateEnd   : "99991231", //선택가능한 날짜 끝
				targetStep         : undefined,  //되돌아갈 step 지정.
				fixDay             : false,      //해당일만 고정. 년월이 변경되어도 일은 해당일만 선택가능. 2월달인경우는 다른달 31일경우는 말일선택,그외에 2월달에 없는 일인경우에는 1일선택함.
				setDateOneClick    : true,       //날짜클릭시 값이 들어가도록 설정.
				hide               : true        //달력을 닫을지여부
			};
			
			if("undefined" == typeof(userOption)) {
				return option;
			}
			else {
				userOption = JSON.parse(userOption);
			}
			
			if("step" == userOption.calendarType){option.calendarType = userOption.calendarType;}
			if("undefined" != typeof(userOption.type)){option.type = userOption.type;}
			if("undefined" != typeof(userOption.coupleTarget)){option.coupleTarget = userOption.coupleTarget;}
			if("undefined" != typeof(userOption.execute)){option.execute = userOption.execute;}
			if(true == userOption.disableHoliday){option.disableHoliday = true;}
			if(true == userOption.disableAll){option.disableAll = true;}
			if("undefined" != typeof(userOption.availableDateStart)){option.availableDateStart = this.getAvaliableDateAboutOption(userOption.availableDateStart);}
			if("undefined" != typeof(userOption.availableDateEnd)){option.availableDateEnd = this.getAvaliableDateAboutOption(userOption.availableDateEnd);;}
			if("undefined" != typeof(userOption.targetStep)){option.targetStep = userOption.targetStep;}
			if(true == userOption.fixDay){option.fixDay = true;}
			if(true == userOption.setDateOneClick){option.setDateOneClick = true;}
			if(false == userOption.hide){option.hide = false;}
			return option;
		},
		/* target을 List형태로 parsing */
		parseTargetObjList : function(strTarget) {
			var targetList = [];
			if("undefined" == typeof(strTarget)) {
				targetList[0] = undefined;
			}
			else {
				strTarget = strTarget.split(",");
				
				for(var i = 0; i < strTarget.length; i++) {
					targetList[i] = $(strTarget[i]);
				}
			}
			
			return targetList;
		},
		/* 오늘을 기준으로 입력받은 parameter에 대한 날짜구함 */
		getAvaliableDateAboutOption : function(uOptionDate) {
			var params = uOptionDate.split(",");
			var strDate = undefined;
			
			if(1 == params.length) { //날짜를 직접 입력받은경우
				strDate = params[0];
			}
			else if(3 == params.length) { //오늘을 기준으로 상대값을 입력받은 경우
				if("end" == $.trim(params[2])) { //일이 end인경우 항상 해당월의 마지막 일자로 표시
					strDate = MobDate.getBoundDate(params[0], params[1], "0");
					var year = strDate.substring(0,4);
					var mon = strDate.substring(4,6);
					var day = MobDate.getLastDay(year, mon, "01");
					strDate = year + mon +day.toString();
				}
				else {
					strDate = MobDate.getBoundDate(params[0], params[1], params[2]);
				}
			}
			else if(2 == params.length) { //년만 상대값, 월일은 정해져있는 경우
				var tmpDate = MobDate.getBoundDate(params[0], "0", "0");
				strDate = tmpDate.substring(0,4)+params[1];
			}
			
			return strDate;
		},
		getTerm : function(option) {
			var term = {};
			
			if("start" == option.type) {
				var endDate = this.getParseDate($(this.option.coupleTarget).text(), this.format);
				
				term.start = MobCalendar.getFormatDate(this.curSelectedDate, "yyyymmdd");
				term.end   = MobCalendar.getFormatDate(endDate, "yyyymmdd");
			}
			else if("end" == option.type) {
				var startDate = this.getParseDate($(this.option.coupleTarget).text(), this.format);
				
				term.start = MobCalendar.getFormatDate(startDate, "yyyymmdd");
				term.end   = MobCalendar.getFormatDate(this.curSelectedDate, "yyyymmdd");
			}
			
			return term;
		},
		/* 휴일여부 체크 */
		isHoliday : function(curDate){
			var week = this.getWeek[new Date(curDate.year, new Number(curDate.mon)-1, new Number(curDate.day)).getDay()];
			if("토" == week || "일" == week){
				return true;
			}
			return false;
		},
		/* 날짜(일)가 고정되어있는 경우 말일관련 처리 */
		getCalculatorFixDay : function(iCurDate, ifixDay) {
			var curDate = {};
			curDate = iCurDate;
			curDate.day = 1;
			var fixDay = -1;
			var endDay = MobCalendar.getMonEndDate(curDate);
			//fixDay가 31일 경우에는 다른달로 이동시 해당 말일 선택
			if(31 == Number(ifixDay)) {
				fixDay = endDay;
			}
			else {
				if(ifixDay > endDay) {
					fixDay =  1;
				}
				else {
					fixDay = this.fixDay;
				}
			}
			return fixDay;
		}
	});
	
	jex.plugin.add("JEX_MOBILE_CALENDAR", jexMobileCalendar, calendar_attr.calendarId);
})();

var _mobCalendar = function(){
	/* 오늘 */
	this.getToday = function() {
		var result = {};
			
		var strDate = g_getDate("yyyymmdd");
		result.year = parseInt(strDate.substring(0,4));
		result.mon = parseFloat(strDate.substring(4,6));
		result.day = parseFloat(strDate.substring(6,8));
		
		return result;
	},
	/* 현재시간 */
	this.getTime = function(){
		var result = {};
		var strTime = g_getDate("HH");
		result.hour = parseFloat(strTime);
		
		return result;
	},
	/* 이전달 */
	this.getPreMonth = function(curDate) {
		var result = {};
		if (curDate.mon == 1) {
			result.year = curDate.year - 1;
			result.mon = 12;
		} else {
			result.year = curDate.year;
			result.mon = curDate.mon - 1;
		}
		return result;
	},
	/* 다음달 */
	this.getNextMonth = function(curDate) {
		var result = {};
		if (curDate.mon == 12) {
			result.year = curDate.year + 1;
			result.mon = 1;
		} else {
			result.year = curDate.year;
			result.mon = curDate.mon + 1;
		}
		return result;
	},
	/* 다음날 구하기 */
	this.getNextDate = function(curDate){
		var newDate  = new Date();
		var nextDate = new Date();
		var result = {};
		newDate.setFullYear(curDate.year);
		newDate.setMonth(curDate.mon - 1);
		newDate.setDate(curDate.day);
		
		nextDate = newDate;
		nextDate.setDate(nextDate.getDate()+1);
		
		result.year = Number(nextDate.getFullYear());
		result.mon =  Number(nextDate.getMonth() + 1);
		result.day = Number(nextDate.getDate());
		return result;
	},
	/* 설정한 format 대로 날짜를 셋팅 합니다.*/
	this.getFormatDate = function(curDate,format){
		var getWeek = [ "일", "월", "화", "수", "목", "금", "토" ];
		var strDate = format;
		var year = curDate.year;
		var mon = (1==curDate.mon.toString().length)?"0"+curDate.mon:curDate.mon;
		var day = (1==curDate.day.toString().length)?"0"+curDate.day:curDate.day;
		var week = getWeek[new Date(year, new Number(mon)-1, new Number(day)).getDay()];
		
		strDate = strDate.replace("yyyy",year);
		strDate = strDate.replace("mm",mon);
		strDate = strDate.replace("dd",day);
		strDate = strDate.replace("EEE",week);
		return strDate;
	},
	/** 설정한 format 대로 시간을 셋팅 합니다.
	 * @example MobCalendar.getFormatTime({"hour":1,"apm":"오후"},"hh24") => 13;
	 * 			MobCalendar.getFormatTime({"hour":13},"apmhh12") => 오후01
	 */
	this.getFormatTime = function(curDate,format){
		var strTime = format;
		var hour = curDate.hour;
		var apm  = ("undefined" == typeof(curDate.apm))?"오전":curDate.apm;
		
		if(-1 < format.indexOf("hh24")){
			if("undefined" != typeof(curDate.apm)){
				if("오후" == curDate.apm){
					hour = hour+12;
				}
			}
			hour = (1==hour.toString().length)?"0"+hour:hour;
			strTime = strTime.replace("hh24",hour);
		}else if(-1 < format.indexOf("hh12")){
			if(12 < curDate.hour){
				hour = hour-12;
				apm = "오후";
			}
			hour = (1==hour.toString().length)?"0"+hour:hour;
			strTime = strTime.replace("hh12",hour);
			strTime = strTime.replace("apm",apm);
		}
		return strTime;
	},
	/** 설정한 format 대로 시간을 셋팅 합니다.
	 * @example MobCalendar.getFormatTime({"hour":1,"apm":"오후"},"hh24") => 13;
	 * 			MobCalendar.getFormatTime({"hour":13},"apmhh12") => 오후01
	 */
	this.getFormatTime2 = function(hour,format,apm){
		var strTime = format;;
		var apm  = ("undefined" == typeof(apm))?"오전":apm;
		
		if(-1 < format.indexOf("hh24")){
			if("undefined" != typeof(curDate.apm)){
				if("오후" == curDate.apm){
					hour = hour+12;
				}
			}
			hour = (1==hour.toString().length)?"0"+hour:hour;
			strTime = strTime.replace("hh24",hour);
		}else if(-1 < format.indexOf("hh12")){
			if(12 < hour){
				hour = hour-12;
				apm = "오후";
			}
			hour = (1==hour.toString().length)?"0"+hour:hour;
			strTime = strTime.replace("hh12",hour);
			strTime = strTime.replace("apm",apm);
		}
		return strTime;
	},
	/**
	 * 월의 끝날짜 구해줌
	 */
	this.getMonEndDate = function(curDate) {
		var getMonLen = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if(curDate.mon == 2 && (curDate.year % 4 == 0 && (curDate.year % 100 != 0 || curDate.year % 400 == 0))) return 29;
		else return getMonLen[curDate.mon - 1];
	};
};

var MobCalendar = new _mobCalendar();

function setOneDateChk(target,opt,msg) {
	var $msg;
	
	var dateAlertPopup = {
		popUp : function(target){
			setTimeout(function(){
				
				if( msg != "undefined" && msg != "" && msg != null ){
					$msg = msg;
				}else{
					$msg = "다시 날짜를 입력해주세요.";
				}
				
				MobPopup.showAlertPopup($msg,null, function(){
					$(target).focus();
					return false;
				});
				
			},300);
		}
	}
	
	var _targets = target.split(" ");  
	
	//동적으로 수정했을 때 
	if( typeof opt == "boolean" && opt == true ){
		$.each( JexMobileOneSearchDateForm_parameters.vStartOption, function(i,v) {
			if( v.target == _targets[_targets.length-1] ){
				v.option =  $(target).next("button").attr("data-jx-calendar-option");
			}
		});
	}
	
	var toDay = g_getDate("yyyy-mm-dd");
	var vStartDateTarget 	= JexMobileOneSearchDateForm_parameters.vStartDateTarget;
	var vStartDateOptions =  JexMobileOneSearchDateForm_parameters.vStartOption;
	var vStartDateOption = "";
	var vSDS, vSDE;
	
	$.each(vStartDateOptions, function(i, v) {
		if(v.target == _targets[_targets.length-1]) {
			vStartDateOption = JSON.parse(v.option);
			return;
		}
	});
	
	if( typeof vStartDateOption["availableDateStart"] != "undefined" ){
		var vStartDateAvailableStartArr = vStartDateOption["availableDateStart"].split(",");
		if( vStartDateAvailableStartArr.length != 3 ){
			vSDS = Number(vStartDateOption["availableDateStart"]);
		}else{
			vSDS = Number(c_dateUtil.addShiftDate(toDay, Number(vStartDateAvailableStartArr[0]), Number(vStartDateAvailableStartArr[1]), Number(vStartDateAvailableStartArr[2])));
		}
	}
	
	if( typeof vStartDateOption["availableDateEnd"] != "undefined" ){
		var vStartDateAvailalbeEndArr = vStartDateOption["availableDateEnd"].split(",");
		if( vStartDateAvailalbeEndArr.length != 3 ){
			vSDE = Number(vStartDateOption["availableDateEnd"]);
		}else{
			vSDE = Number(c_dateUtil.addShiftDate(toDay, Number(vStartDateAvailalbeEndArr[0]), Number(vStartDateAvailalbeEndArr[1]), Number(vStartDateAvailalbeEndArr[2])));
		}
	}
	
	var strDate = Number($(target).val().replace(/-/g, ""));
	
	if( (typeof vSDS != "undefined" && strDate < vSDS) || (typeof vSDE != "undefined" && strDate > vSDE) ){
		dateAlertPopup.popUp(target);
		return false;
	}
	
	return true;
}

function setCalDynamicDateOption(target,data,opt) {
	var $obj = $(target).next();
	var $obj_option = JSON.parse($obj.attr("data-jx-calendar-option"));
	
	if(typeof(opt) == "string") {
		if(opt == "false" || opt == "true") {
			opt = JSON.parse(opt);
		}
	}
	
	$obj_option[opt] = data;
	$obj.attr("data-jx-calendar-option", JSON.stringify($obj_option));
	
	return;
}