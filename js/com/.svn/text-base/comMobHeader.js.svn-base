var _HOST_NAME = "";
var _HOST_IMG_NAME = "";
var _pathName = window.location.pathname;

function includeJs(url) {
	var base_path = "../../../../js/";
	document.write("<script type='text/javascript' src='" + base_path + url + "'></script>");
}

function includeCss(url) {
	var base_path = "../../../../css/";
	document.write("<link rel='stylesheet' type='text/css' href='" + base_path + url + "'></link>");
}

document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge" />');
document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />');

includeJs("lib/jquery-3.5.1.min.js");
includeJs("lib/jquery-ui-1.13.3.js");
includeJs("lib/lottie-player.js");
includeJs("lib/nativeBridge.js");
includeJs("lib/json2.js");
includeJs("lib/iscroll_old.js"); //@TODO ::: 삭제예정

if(_pathName.indexOf("/fnc/") > -1 || _pathName.indexOf("/nff/") > -1) {
//	includeCss("mall.css");
}

includeCss("normalize.css");
includeCss("common.css");
includeCss("content.css");
includeCss("popup.css");

function isEmpty(val) {
	var result = false;
	if(undefined == val || null == val || "" == val) result = true;
	return result;
}

function isEmptyArray(val) {
	var result = false;
	if(isEmpty(val) || (JSON.stringify(val) == "[]")) result = true;
	return result;
}

function isNull(val) {
	if(val == null || val == undefined) return true;
	return false;
}

function _isIphone() {
	var iFlag = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
	if(iFlag && navigator.userAgent.indexOf("Android") > -1) iFlag = false;
	return iFlag;
}

function _isAndroid() {
	return (/android/i).test(navigator.userAgent);
}

function _isMobile() {
	var Flag = false;
	if((/(ipod|iphone|ipad)/i).test(navigator.userAgent)){ Flag = true; }
	if((/android/i).test(navigator.userAgent)){ Flag = true; }
	return Flag;
}

var _isRealApp = false; //브라우저 / 앱 구분
var _userAgentObj = {};

if(navigator.userAgent.indexOf("nma-url=") != -1) {
	_isRealApp = true;
	var arrAgent = navigator.userAgent.split(";");
	var arrAgentKeyValue = [];
	for(var i = 0; i < arrAgent.length; i++) {
		arrAgentKeyValue = arrAgent[i].split("=");
		if(arrAgentKeyValue.length == 2) _userAgentObj[arrAgentKeyValue[0]] = arrAgentKeyValue[1];
	}
}

//console로그 사용 여부 (운영에서는 false로 해야함, 성능이슈 있음)
if(_isRealApp) {
	if(_userAgentObj["islog"] != undefined && _userAgentObj["islog"] == "false") {
		window.console = {
			log : function(){},
			debug : function(){},
			info : function(){},
			warn : function(){},
			error : function(){}
		}
	}
	
	_HOST_NAME = _userAgentObj["nma-url"];
	_HOST_IMG_NAME = _userAgentObj["nma-img"];
} else {
	if(location.protocol == "file:") {
		//_HOST_NAME = "http://192.168.224.212:25101";
		//_HOST_NAME = "http://192.168.224.212:26101";
		_HOST_NAME = "http://192.168.224.212:18001";

	} else {
		_HOST_NAME = location.protocol + "//" + location.host;
	}

	if(location.protocol == "file:" || location.host.match('192.168.224.212')) {
		_HOST_IMG_NAME = "http://192.168.224.75:80";
	} else {
		_HOST_IMG_NAME = location.protocol + "//" + location.host;
	}
}

document.write("<script type='text/javascript' src='" + _HOST_NAME + "/jsp/com/comJavascript.jsp" + "'></script>");

includeJs("com/jex/jex.core.js");
includeJs("com/jexPlugin/jex.formatter.js");
includeJs("com/jexPlugin/jex.mobile.msg.js");
includeJs("com/jexPlugin/jex.mobile.svc.js");
includeJs("com/jexPlugin/jex.mobile.setter.js");
includeJs("com/jexPlugin/jex.mobile.step.js");
includeJs("com/jexPlugin/jex.mobile.effect.js");
includeJs("com/jexPlugin/jex.mobile.procedure.js");
includeJs("com/jexPlugin/jex.mobile.formatter.js");
includeJs("com/jexPlugin/jex.mobile.session.js");
includeJs("com/jexPlugin/jex.mobile.position.js");
includeJs("com/jexPlugin/jex.mobile.calendar.js");
includeJs("com/jexPlugin/jex.mobile.executer.js");
includeJs("com/jexPlugin/jex.mobile.secretform.js");
includeJs("com/jexPlugin/jex.mobile.authform.js");
includeJs("com/jexPlugin/jex.mobile.searchdate.js");
includeJs("com/jexPlugin/jex.mobile.list.js");
includeJs("com/jexPlugin/jex.mobile.guideTip.js"); //유의사항
includeJs("com/jexPlugin/jex.mobile.terms.js");    //약관동의
includeJs("com/jexPlugin/jex.mobile.selAcnt.js");  //계좌선택

includeJs("com/comMobCommon.js");
includeJs("com/comMobView.js");
includeJs("com/comDate.js");
includeJs("com/comWebkey.js");
includeJs("com/comLoading.js");
includeJs("com/comMobDateUtil.js");
includeJs("com/comMobValidation.js");
includeJs("com/comUtil.js");
includeJs("com/comCacheUtil.js"); //캐시조회 유틸
includeJs("com/comUi.js");
/*
if(_pathName.indexOf("test_plugin_010101_1") > -1) { //테스트 파일
	includeJs("com/comMobCommon.js");
	includeJs("com/comMobView.js");
	includeJs("com/comDate.js");
	includeJs("com/comWebkey.js");
	includeJs("com/comLoading.js");
	includeJs("com/comMobDateUtil.js");
	includeJs("com/comMobValidation.js");
	includeJs("com/comUtil.js");
	includeJs("com/comCacheUtil.js"); //캐시조회 유틸	
//	includeJs("com/comUi.js");
}
else {
	includeJs("com/comMobCommon.js");
	includeJs("com/comMobView.js");
	includeJs("com/comDate.js");
	includeJs("com/comWebkey.js");
	includeJs("com/comLoading.js");
	includeJs("com/comMobDateUtil.js");
	includeJs("com/comMobValidation.js");
	includeJs("com/comUtil.js");
	includeJs("com/comCacheUtil.js"); //캐시조회 유틸
	includeJs("com/comUi.js");
}
*/

includeJs("com/comIbkCert.js"); //IBK 인증서 공통 JS

if(!_isRealApp) {
	includeJs("com/webDevUtil.js"); //웹개발용 유틸
}

var _isBreak = false;