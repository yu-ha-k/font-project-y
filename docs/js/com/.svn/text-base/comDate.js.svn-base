/**
 * <pre>
 * SMARTCIB PROJECT
 * @COPYRIGHT (c) 2011 WebCash, Inc. All Right Reserved.
 *
 * @File Name    : comDate.js
 * @File path    : js/com
 * @author       : 이태웅
 * @Description  : 날짜관련함수
 * @History      :
 * </pre>
 **/
var _yy_ = 'y';
var _mm_ = 'm';
var _dd_ = 'd';
var _1d_ = 'f';

var _dtdm_ = "-";
var _tmdm_ = ":";

function getCurDate(dm) {
	try {
		if(isNull(dm)) dm = _dtdm_;
		
		var today 	= new Date();
		var year 	= today.getFullYear();
		var month 	= today.getMonth()+1;
		var day 	= today.getDate();

		if(month < 10) {month = "0"+month;}
		if(day < 10) {day = "0"+day;}
	
		return year+dm+month+dm+day;
	} catch(e) {
		bizException(e, "getCurDate");
	}	
} /* end of getCurDate */

// 요일 체크
function getDayOfWeek(time) {
    var now = toTimeObject(time);

    var day = now.getDay(); //일요일=0,월요일=1,...,토요일=6
    var week = new Array('일','월','화','수','목','금','토');

    return week[day];
}

function getFirstDate(dm) {
	try {
		if(isNull(dm)) dm = _dtdm_;
		
		var today 	= new Date();
		var year 	= today.getFullYear();
		var month 	= today.getMonth()+1;
		var day 	= 1;

		if(month < 10) {month = "0"+month;}
		if(day < 10) {day = "0"+day;}
	
		return year+dm+month+dm+day;
	} catch(e) {
		bizException(e, "getCurDate");
	}	
} /* end of getCurDate */

function getCurTime(dm) {
	try {
		if(isNull(dm)) dm = _tmdm_;
		
		var today 	= new Date();
		var hour 	= today.getHours();		
		var minute 	= today.getMinutes();
		var second 	= today.getSeconds();
		
		if(hour < 10) {hour = "0"+hour;}
		if(minute < 10) {minute = "0"+minute;}
		if(second < 10) {second = "0"+second;}
		
		return hour+dm+minute+dm+second;
		
	} catch(e) {
		bizException(e, "getCurTime");
	}	
} /* end of getCurTime */

function toDayString(date, dm) {
	if(isNull(dm)) dm = _dtdm_;
	
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return ("" + year+dm+month+dm+day);
}

function toTimeObject(time) {
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1;
    var day   = time.substr(6,2);
    var hour  = time.substr(8,2);
    var min   = time.substr(10,2);

    return new Date(year,month,day,hour,min);
}

function shiftDay(dt, cls, val, dm) {
	if(isNull(dm)) dm = _dtdm_;
	
    var date = toTimeObject(dt);
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
}

function shiftMonth(dt, val, dm) {
	if(isNull(dm)) dm = _dtdm_;
	if(dt.length != 8) return "";
	
    var yy  = dt.substr(0,4);
    var mm = dt.substr(4,2) - 1;
    var dd   = 1; var hour  = 0; var min   = 0;
    
    //날짜 생성
	var date = new Date(yy,mm+val,dd,hour,min);
	
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;

    if (("" + month).length == 1) { month = "0" + month; }

    return ("" + year+dm+month);
}

function setTermObjYear(obj1, obj2, val, dm) {
	setTermObj(obj1, obj2, _yy_, val, dm);
}
function setTermObjMonth(obj1, obj2, val, dm) {
	setTermObj(obj1, obj2, _mm_, val, dm);
}
function setTermObjDay(obj1, obj2, val, dm) {
	setTermObj(obj1, obj2, _dd_, val, dm);
}
function setTermObjFirst(obj1, obj2, val, dm) {
	setTermObj(obj1, obj2, _1d_, val, dm);
}
function setTermObj(obj1, obj2, cls, val, dm) {
	try {
		if(isNull(dm)) dm = _dtdm_;
		
		var bDate = getCurDate("");
		var eDate = "";
		
		if(cls == _1d_)
			eDate = getFirstDate();
		else if(cls == _dd_)
			eDate = shiftDay(bDate, cls, val);
		else eDate = shiftDay(shiftDay(bDate, cls, val, ""), _dd_, 1);
		
		obj1.val(eDate);
		obj2.val(getCurDate(dm));
	} catch(e) {
		bizException(e, "setTermObj");
	}
}
