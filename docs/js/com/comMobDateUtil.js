// date Utility
function dateUtility () {
	return {
		today : g_serverTime(),
//		today : g_today,
		formatter : dateFormatUtil(),
		nowDate : dateFormatUtil().dateFormattingWithParams(g_serverTime().getFullYear(), g_serverTime().getMonth()+1, g_serverTime().getDate()),	// 오늘일자
		
		checkFutureDate : function (input_year, input_month, input_day) {		// 미래일 일경우 true를 리턴
			var compareDate = this.formatter.dateFormattingWithParams(input_year, input_month, input_day);
			
			if (Number(compareDate) > Number(this.nowDate)) return true;
			return false;
		},
		checkpastDate : function (input_year, input_month, input_day) {		// 과거일 일경우 true를 리턴
			var compareDate = this.formatter.dateFormattingWithParams(input_year, input_month, input_day);
			
			if (Number(compareDate) < Number(this.nowDate)) return true;
			return false;
		},
		checkToday : function (input_year, input_month, input_day) {			// 현재일이 오늘일 경우 true를 리턴
			var compareDate = this.formatter.dateFormattingWithParams(input_year, input_month, input_day);
			if (Number(compareDate) == Number(this.nowDate)) return true;
			return false;
		},
		getNowDate : function () {		// 오늘일자 구하기 20130101 형식
			return this.nowDate;
		},
		addDay : function (dat) {			// 날짜 계산 ==> 단위는 day기준
			if (dat == null || dat == undefined) {
				dat = 0;
			}
			var nowday;
			var newday;
			nowday = newday = g_serverTime();
			newday.setDate(nowday.getDate() + dat);
			
			return this.formatter.dateFormattingWithParams(newday.getFullYear(), newday.getMonth() + 1, newday.getDate());
		},
		
		addFromDay : function (adat, aday) {
			/*
			 * 특정일로부터 날짜 더하기
			 * adat = 2013-01-01
			 * aday = 더할 날짜
			 * 반환 = 20130101
			 */
			
			var newday;
			var todate;
			
			adat = adat.split("-");
			
			newDate  = new Date();
			newDate.setDate(1);
			newDate.setFullYear(adat[0]);
			newDate.setMonth(adat[1]-1);
			newDate.setDate(adat[2]);
			
			newday = todate = newDate;
			
			newday.setDate(todate.getDate()+aday);
			
			return this.formatter.dateFormattingWithParams(newday.getFullYear(), newday.getMonth() + 1, newday.getDate());
		},
		addShiftDate : function (adat, _year, _month, _day) {
			/*
			 * 특정일로부터 날짜 더하기
			 * adat = 2013-01-01
			 * _year	: + 년도
			 * _month	: + 달
			 * _day		: + 일짜
			 * 반환 = 20130101
			 */
			
			adat = adat.split("-");
			
			var _newDate  = new Date();
			_newDate.setDate(1);
			_newDate.setFullYear(adat[0]);
			_newDate.setMonth(adat[1]-1);
			_newDate.setDate(adat[2]);
			
			var _rDate = new Date();
			_rDate.setDate(1);
			_rDate.setFullYear(_newDate.getFullYear() + _year);
			_rDate.setMonth(_newDate.getMonth() + _month);
			//Shift되는 달의 마지막날이 파라미터로 넘어온 날보다 작으면 Shft되는 달의 마지막날로 세팅 
			var lastDay = this.getLastDay(_rDate.getFullYear(), _rDate.getMonth());
			if(lastDay < (_newDate.getDate() + _day)) {
				_rDate.setDate(lastDay);
			} else {
				_rDate.setDate(_newDate.getDate() + _day);
			}
			
			return this.formatter.dateFormattingWithParams(_rDate.getFullYear(), _rDate.getMonth() + 1, _rDate.getDate());
			
		},
		getLastDay : function (year, month) {
			var date = new Date(year, month+1, 0);
			return date.getDate();
		},
		toTimeObject : function (time) {
			 var year  = time.substr(0,4);
			    var month = time.substr(4,2) - 1;
			    var day   = time.substr(6,2);
			    var hour  = time.substr(8,2);
			    var min   = time.substr(10,2);

			    return new Date(year,month,day,hour,min);
		},
		shiftDay : function (dt, cls, val, dm) {
			if(isNull(dm)) dm = _dtdm_;
			
		    var date = this.toTimeObject(dt);
		    var year = 0, mon = 0, day = 0;
		        
		    switch(cls){
		        case _yy_ : year = val; break;
		        case _mm_ : mon = val; break;
		        case _dd_ : day = val; break;
		    }
		        
		    date.setFullYear(date.getFullYear() + year);
		    date.setMonth(date.getMonth() + mon);
		    date.setDate(date.getDate() + day);

		    return toDayString(date, dm);
		},
		getWeekDay : function (dat) {		// 특정일자 요일 구하기
			var yymmdd = dat.replace(/-/g, "");
			var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
			var yyyy = yymmdd.substr(0, 4);
			var mm = yymmdd.substr(4, 2);
			var dd = yymmdd.substr(6, 2);
			var date = new Date(yyyy, mm - 1, dd);
			return week[date.getDay()];
		},
		getWeekDay_ko : function (dat) {
			var yymmdd = dat.replace(/-/g, "");
			var week = new Array('일', '월', '화', '수', '목', '금', '토');
			var yyyy = yymmdd.substr(0, 4);
			var mm = yymmdd.substr(4, 2);
			var dd = yymmdd.substr(6, 2);
			var date = new Date(yyyy, mm - 1, dd);
			return week[date.getDay()];
		},
		getWeekDayWithDate : function (dat, param) {
			if (dat == "9999-12-31") {
				return dat;
			}
			
			var _rweek = "";
			if (param == "ko") {
				_rweek = dat + " " + this.getWeekDay_ko(dat);
			}
			else {
				_rweek = this.getWeekDay(dat) + " " + dat;
			}
			return _rweek;
		}
	};
}

//dateFormatting Utility
function dateFormatUtil() {
	return {
		dateFormatting1 : function (dat) { // 리턴 20130101
			if (dat.match(new RegExp('-')) == false) {
				return dat;
			}
			
			var d = dat.split('-');
			var str = "";
			
			for (var i = 0; i < d.length; i++) {
				if (d[i].length == 1) 
					str += "0" + d[i];
				else 
					str += d[i];
			}
			return str;
		},
		dateFormatting2 : function (dat) { // 리턴 2013-1-1
			var dt = dat.replace(/-/g, "");
			var yy = dt.substr(0, 4);
			var mm = dt.substr(4, 2);
			var dd = dt.substr(6, 2);
			var str = Number(yy)+"-"+Number(mm)+"-"+Number(dd);
			return str;
		},
		dateFormattingWithParams : function (year, month, day) { // 리턴 20130101
			var d = new Array(year+"", month+"", day+"");
			var str = "";
			
			for (var i = 0; i < d.length; i++) {
				if (d[i].length == 1) 
					str += "0" + d[i];
				else 
					str += d[i];
			}
			return str;
		},
		dateFormatting3 : function (dat) {		// 리턴 2013-01-01
			var adt = dat.split("-");
			var rt = new Array();
			for (var i = 0; i < adt.length; i++) {
				if (adt[i].length == 1) 
					rt.push("0" + adt[i]);
				else 
					rt.push(adt[i]);
			}
			
			return (rt[0] + "-" + rt[1] + "-" + rt[2]);
		},
		dateFormatting4 : function (dat) { // 입력 20130101 / 리턴 2013-01-01
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
			
			return (rt[0] + "-" + rt[1] + "-" + rt[2]);
		},
	};
}

var c_dateUtil = dateUtility();