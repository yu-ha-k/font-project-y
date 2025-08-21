/**
 * Copyright (c) 2008,2009,2010,2011,2012,2013 AimToG. All rights reserved.
 * Code licensed under the AimToG License
 * Version 1.6.7 (ibk_edition)
 *
 * @author jacojang<jacojang@aimtog.co.kr>
 * @author sora87<sora87@aimtog.co.kr>
 */
var NetFunnel = new Object();NetFunnel.Skin = new Object();

//EditZoneStart ----------------------------------------------------------------
//NetFunnel.TS_HOST			= "203.227.232.185";	// Default TS host - 운영
NetFunnel.TS_HOST			= "203.227.232.189";	// Default TS host - 개발
NetFunnel.TS_PORT			= 80;					// Default TS port - 개발
NetFunnel.TS_PROTO			= 'http';				// Default TS protocol [http|https]
NetFunnel.TS_QUERY			= "ts.wseq";			// Default request query
NetFunnel.TS_MAX_TTL		= 30;					// Default max ttl (second) 5~30
NetFunnel.TS_CONN_TIMEOUT	= 3;					// Default connect timeout (second)
NetFunnel.TS_CONN_RETRY		= 1;					// Default connect retry count
NetFunnel.TS_COOKIE_ID		= "NetFunnel_ID";		// Default Cookie ID
NetFunnel.TS_COOKIE_TIME	= 0;					// Default Cookie Time (minute)
NetFunnel.TS_COOKIE_DOMAIN	= "";					// Default Cookie Domain
NetFunnel.TS_BYPASS			= false;				// NetFunnel Routine Bypass [true|false]
NetFunnel.TS_POPUP_TOP		= false;				// Popup Top Position ( "false" is center )
NetFunnel.TS_POPUP_LEFT		= false;				// Popup Left Position ( "false" is center )
NetFunnel.TS_AUTO_COMPLETE	= false;					// Auto setComplete [true|false]
NetFunnel.TS_DEBUG_MODE		= false;				// Debug Mode

NetFunnel.TS_SHOWTIME_LIMIT	= 300;					// Show WaitTime Limit
NetFunnel.TS_SHOWCNT_LIMIT	= 2000;					// Show WaitUser Limit
NetFunnel.TS_IFRAME_RESIZE	= false;				// true | false	
NetFunnel.TS_SKIN_ID		= "";					// Skin ID ( default )
NetFunnel.TS_USE_UNFOCUS	= true;					// object unfocus after netfunnel call
NetFunnel.TS_VIRT_WAIT		= 10000;				// virtual wait time (millisecond)
NetFunnel.TS_USE_MOBILE_UI	= true;				// Mobile UI
NetFunnel.TS_POPUP_TARGET	= window;				// Popup target window
NetFunnel.TS_USE_FRAME_BLOCK= false;				// Block FrameSet Page
NetFunnel.TS_FRAME_BLOCK_LIST = [];					// Frame Block Window List
NetFunnel.TS_USE_PRE_WAIT	= false;				// Pre waiting popup use
NetFunnel.TS_VERSION_DISPLAY= false;					// JS Version Display

// Variable for MProtect
NetFunnel.MP_USE			= false;				// 매크로방지기능 사용유무 (true|false)
NetFunnel.MP_TIMELIMIT		= 20000;				// 사용자의 요청을 체크하기 위한 단위 시간 (ms)
NetFunnel.MP_MAXREQLIMIT	= NetFunnel.MP_TIMELIMIT/1100;	// TIMELIMIT 시간 내에 getTidChkEnter를 요청가능한 최대값
NetFunnel.MP_DEVLIMIT		= 20;					// 요청주기의 표준편차 제한값 (ms)
NetFunnel.MP_DEVCNTLIMIT	= 7;					// 표준편차 계산을 위한 item숫자
NetFunnel.MP_REQONLYLIMIT	= 10;					// setComplete 없이 getTidChkEnter만 요청한 횟수 제한값(횟수)
NetFunnel.MP_MINCOUNT		= 5;					// 계산을 하지 않는 자료개수

// Logo Image Data -------------------------------------------------------------
//   - height:16 pixel
//   - GIF Format Data (Base64 Encoding)
NetFunnel.gLogoData         = "";
NetFunnel.gLogoText			= "";
NetFunnel.gLogoURL 			= "";

NetFunnel.gPreWaitData		= "R0lGODlhKAAoALMMAPj4+MTExPT09NTU1NPT08XFxcbGxsLCwtXV1cPDw/X19b+/v////wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSAABcv0qQRLvwQCyc73C5YGxB5BgkwuS4nk4iCJJqlQKdZKxJII0ifYaRLwfECJmZg2AQaFwqA2ecfnrry+dJvR80NoRi5NRE8uXD5eLYk9iyxjhnprgnt2cn97mpucnZ6foKGio3oRACH5BAkFAAwALAAAAAAoACgAAASAkMlJq7046827/2AojmRpnmiqrmwLAohhIAAFy/SpBEu/BALJzvcLlgbEHkGCTC5LieTiIIkmqVAp1krEkgjSJ9hpEvB8QImZmDYBBoXCoDZ5x+euvP4Vm9HzQ2hGLk1ETy5cPl4tiT2LLGOGemuCe3Zyf3uam5ydnp+goaKjnREAIfkECQUADAAsAAAAACgAKAAABICQyUmrvTjrzbv/YCiOZGmeaKqubAsCiGEgAAXL9KkES78EAsnO9wuWBsQeQYJMLkuJ5OIgiSapUCnWSsSSCNIn2GkS8HxAiZmYNgEGhcKgNnnH5668fnOb0fNDaEYuTURPLlw+Xi2JPYssY4Z6a4J7dnJ/e5qbnJ2en6ChoqOiEQAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkQJTEY7CXK7ngQn1JoAg0JhUJMEj1GX8dhUL9uk6azMeKJN3KyPce3uSWdCaWBiZCdrQnAsiDuKK3aCP316PwyEY3SVmpucnZ6foKGio6IRACH5BAkFAAwALAAAAAAoACgAAAR9kMlJq7046827/2AojmRpnmiqrmwLAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRtBGWRJsgt+v9GIBBoTCoXb/gDUxGo4xn3hJOaGWsq75S8BidC6Mk47GpFzbzS3yBJk90EoV3JlNscYtwJ1lbXWZaXGlhmJmam5ydnp+goBEAIfkECQUADAAsAAAAACgAKAAABH2QyUmrvTjrzbv/YCiOZGmeaKqubFsCiGEggDspwaIvgWAzg92O8EsIdYficZG0EZZEmyC36/0YgEGhMKhdv2ALTEajjGfeEk5oZayrvlLwGJ0LoyTjsakXNvNLfIEmT3QShXcmU2xxi3AnWVtdZlpcaWGYmZqbnJ2en6CgEQAh+QQJBQAMACwAAAAAKAAoAAAEfZDJSau9OOvNu/9gKI5kaZ5oqq5sqwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkSbILfr/RiAQaEwqF2/YGxs5pXAZLQTTmhlrKu+UvAYnQujJOOxqRc280t8gSZPdBKFdyZTbHGLcCdZW10UkVxlYZiZmpucnZ6foKARACH5BAUFAAwALAAAAAAoACgAAASBkMlJq7046827/2AojmRpnmiqrmyrAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRNMFktAlhSSzhhD2JILfLloLHKgMwKBQGNZPx2HSthe3WNDx5ztKlLdbHuHb5JWRmaBNgQmItbztxLIpIP3OHP3p/P2NlZ3iWm5ydnp+goaKjpD8RADs=";
  
//EditZoneEnd ------------------------------------------------------------------
function exclude_ip(in_str){ var patt = new RegExp("&ip=.*&port=[0-9]+"); return in_str.replace(patt,""); }

/*
 * Request Type.
 */
NetFunnel.RTYPE_NONE				= 0;		/**< 0:Type 없음				*/
NetFunnel.RTYPE_GET_TID				= 5001;		/**< 5001:티켓ID 요청			*/
NetFunnel.RTYPE_CHK_ENTER			= 5002;		/**< 5002:진입요청				*/
NetFunnel.RTYPE_ALIVE_NOTICE		= 5003;		/**< 5003:Alive Notice 			*/
NetFunnel.RTYPE_SET_COMPLETE		= 5004;		/**< 5004:완료 요청				*/
NetFunnel.RTYPE_GET_TID_CHK_ENTER	= 5101;		/**< 5101:ID요청 + 진입요청		*/
NetFunnel.RTYPE_INIT				= 5105;		/**< 5106:초기화 요청 			*/
NetFunnel.RTYPE_STOP				= 5106;		/**< 5107:정지 요청				*/

/**
 * Return Codes constants
 */
NetFunnel.RET_NORMAL				= 200;		/**< 200:정상					*/
NetFunnel.RET_CONTINUE				= 201;		/**< 201:계속 진행				*/
NetFunnel.RET_E_SYSTEM				= 500;		/**< 500:시스템 에러 			*/
NetFunnel.RET_E_SECURITY			= 501;		/**< 501:보안 에러				*/
NetFunnel.RET_E_IO					= 502;		/**< 502:I/O 에러				*/
NetFunnel.RET_E_CONN_TIMEOUT		= 503;		/**< 503:접속 시간 초과 		*/
NetFunnel.RET_E_ARUNNING			= 504;		/**< 504:이미 실행중			*/
NetFunnel.RET_E_NOINIT				= 505;		/**< 505:초기화 되지 않음		*/
NetFunnel.RET_E_INSERT				= 506;		/**< 506:입력 실패				*/
NetFunnel.RET_E_NOPERM				= 507;		/**< 507:권한이 없음.			*/
NetFunnel.RET_E_KEY_EXPIRE			= 508;		/**< 508:Key 유효시간 초과		*/
NetFunnel.RET_E_PARAM				= 509;		/**< 505:올바르지 않은 파라메터	*/
NetFunnel.RET_E_NOT_STARTED			= 510;		/**< 507:서비스가 아직 시작전임	*/
NetFunnel.RET_E_NO_ACTION			= 511;		/**< 508:사용자의 Action이 없음 */

/**
 * Process Status Constants
 */
NetFunnel.PS_N_RUNNING				= 0;		/**< 0:실행중이지 않은 상태		*/
NetFunnel.PS_RUNNING				= 1;		/**< 1:실행중 상태				*/
NetFunnel.PS_CONTINUE				= 2;		/**< 2:계속 실행중 상태			*/
NetFunnel.PS_TIMEOUT				= 3;		/**< 3:접속 제한시간 초과 		*/
NetFunnel.PS_ERROR					= 99;		/**< 99:에러 상태				*/

/**
 * NetFUNNEL JS Info
 */
NetFunnel.VERSION = "1.6.7";
/**
 * Etc
 */
NetFunnel.CONN_TIMEOUT_KEY			= "connection_timeout";

/**
 * Easy interface를 위한 Global 객체
 */
NetFunnel.gControl			= null;
NetFunnel.gShowtimeLimit	= false;
NetFunnel.gShowcntLimit		= false;
NetFunnel.gSkinId			= "";
NetFunnel.gPopupTop			= false;
NetFunnel.gPopupLeft		= false;
NetFunnel.gTotWait			= -1;
NetFunnel.gPrevWaitTime		= -1;		// Do not change !!!
NetFunnel.gLastSkinID		= "default";
NetFunnel.gUseMobileUI		= false;
NetFunnel.gUseUnfocus		= false;
NetFunnel.gAlreadyProc 		= 0;
NetFunnel.gWaitPop			= null;

/**
 * NetFunnel Utilities
 *  Static functions
 */
NetFunnel.Util = {
	/**
	 * Event 에 의해 전달된 Data를 Debug 메세지 형태의 문자열로 만들어준다.
	 *
	 * @memberOf NetFunnel.Util
	 * @param {String} callback Callback Event 이름
	 * @param {Number} rtype Request Type
	 * @param {Number} code Return Code
	 * @param {Object} data Return Data
	 * @param {Boolean} is_html HTML 형태 여부
	 * @return {String} 입력값에 의해 작성된 문자열
	 */
	makeDebugMsg: function (callback, rtype, code, data, is_html) {
		var nl = "\n";
		var space = "       ";
		if(is_html == true){
			nl = "<br>";
			space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		}

		switch (rtype) {
			case NetFunnel.RTYPE_GET_TID: rtype_s 				= "getTicketID"; 		break;
			case NetFunnel.RTYPE_CHK_ENTER: rtype_s 			= "chkEnter"; 			break;
			case NetFunnel.RTYPE_ALIVE_NOTICE: rtype_s	 		= "aliveNotice"; 		break;
			case NetFunnel.RTYPE_SET_COMPLETE: rtype_s 			= "setComplete"; 		break;
			case NetFunnel.RTYPE_GET_TID_CHK_ENTER: rtype_s 	= "getTID+ChkEnter";	break;
			case NetFunnel.RTYPE_INIT: rtype_s 					= "Init"; 				break;
			case NetFunnel.RTYPE_STOP: rtype_s 					= "stop"; 				break;
			default: rtype_s 									= "Unknown"; 			break;
		}

		switch(code){
			case NetFunnel.RET_NORMAL: code_s 					= "Normal"; 			break;
			case NetFunnel.RET_CONTINUE: code_s 				= "Continue"; 			break;
			case NetFunnel.RET_E_SYSTEM: code_s 				= "System Error"; 		break;
			case NetFunnel.RET_E_SECURITY: code_s 				= "Security Error"; 	break;
			case NetFunnel.RET_E_IO: code_s 					= "I/O Error"; 			break;
			case NetFunnel.RET_E_CONN_TIMEOUT: code_s 			= "Connection Timeout"; break;
			case NetFunnel.RET_E_ARUNNING: code_s 				= "Already Running"; 	break;
			case NetFunnel.RET_E_NOINIT: code_s 				= "Init Error"; 		break;
			case NetFunnel.RET_E_INSERT: code_s 				= "Insert Error"; 		break;
			case NetFunnel.RET_E_NOPERM: code_s 				= "No Permission"; 		break;
			case NetFunnel.RET_E_KEY_EXPIRE: code_s 			= "Key Expire"; 		break;
			case NetFunnel.RET_E_PARAM: code_s 					= "Parameter Error"; 	break;
			case NetFunnel.RET_E_NOT_STARTED: code_s 			= "No service time"; 	break;
			case NetFunnel.RET_E_NO_ACTION: code_s 				= "No action Error"; 	break;
			default: code_s 					= "Unknown Error"; 		break;
		}

		var tStr = callback+" "+nl+nl+"  - type : "+rtype_s+" ("+rtype+")"+nl+" - Code : "+code_s+" ("+code+")"+nl+" - Params"+nl;
		for (var i in data)
		{
			tStr += space+i+" ---> "+data[i]+nl;
		}
		return tStr;
	},

	/**
	 * Event 에 의해 전달된 Data를 다음 url 로 전달
	 *
	 * @memberOf NetFunnel.Util
	 * @param {String} url 이동할 URL
	 * @param {Object} data Return Data
	 * @return {null}
	 */
	goNextPage:function(url,data){
		var tUrl = url;
		for(var i in data){
			tUrl += "&"+i+"="+data[i];
		}
		document.location.href = tUrl;
	},

	/**
	 * 디버그 메세지를 출력한다. ( flash 에 의해 호출 된다. )
	 *
	 * @memberOf NetFunnel.Util
	 * @param {String} msg 출력될 문자열
	 */
	alertDebugMsg:function(msg){
		alert(msg);
	},

	decodeBase64:function(input) {
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		do {
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		} while (i < input.length);
		return output;
	},
	getParam:function(input){
		input = input.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+input+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( document.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	},
	isSmartPhone:function()
	{
        var mobileKeyWords = new Array('iPhone', 'iPod', 'BlakBerry', 'Android', 'WindowsCE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'Nokia', 'Webos', 'Opera mini', 'Opera mobi', 'Iemobile');
        try{
            for(var i=0 ; i < mobileKeyWords.length ; i++){
                if(navigator.userAgent.match(mobileKeyWords[i])!=null){
                    return true;
                }
            }
        }catch(e){
        }
        return false;
	},
	calcStdDev:function(inArr,s)
	{
		if ( typeof inArr != "object"){ return false; }
		if ( inArr.length < 2 ){ return false; }
		if ( s > 1 || s < 0 ) { s = 0; }

		// Calc Mean Value
		var sum = 0, i = 0 ;
		for (i=0 ; i < inArr.length ; i++){
			sum = sum + parseInt(inArr[i]);	
		}
		var mean = sum / inArr.length;

		// Calc stdDiv
		var temp = 0;
		for (i=0 ; i < inArr.length ; i++){
			temp = temp + ((parseInt(inArr[i]) - mean)*(parseInt(inArr[i]) - mean));
		}
		var stdDiv = Math.sqrt(temp/(inArr.length-s));
		return stdDiv;
	},
	delFocus:function(win)
	{
		try{
			var doc = document;
			if(typeof win == "object" && typeof win.document == "object"){
				doc = win.document;
			}
			var body = doc.getElementsByTagName("body")[0];
			var ifrm = doc.createElement("iframe");
			ifrm.style.position = "absolute";
			ifrm.style.width = "0px";
			ifrm.style.height = "0px";
			ifrm.style.border = "0px";
			ifrm.style.top = NetFunnel.PopupUtil.getScrollTop(doc);
			ifrm.style.left = NetFunnel.PopupUtil.getScrollLeft(doc);
			body.appendChild(ifrm);
			ifrm.focus();

			var pNode = ifrm.parentNode;
			if(pNode && typeof pNode == "object" ){
				pNode.removeChild(ifrm);
			}
		}catch(e){
		}
	},
	isVirtualWait:function(obj)
	{
		if(typeof obj != "object"){ return false; }
		if(typeof obj.mprotect == "number" && obj.mprotect > 0){
			return true;
		}
		return false;
	},
	getTimeStr:function(inTime){
		var tTime = parseInt(inTime);	
		if(tTime < 60){
			return tTime+"초";
		}else if(tTime < 3600){
			var tMin = Math.floor(tTime / 60);
			var tSec = tTime % 60;
			return tMin+"분 "+tSec+"초";
		}else{
			var tHour = Math.floor(tTime / 3600);
			var tMin = Math.floor((tTime % 3000)/60);
			var tSec = tTime % 60;
			return tHour+"시간 "+tMin+"분 "+tSec+"초";
		}
	},
	getFrameWindowList:function(popup_target){
		var list = new Array();

		for(var i=0 ; i < top.frames.length ; i++){
			var tframe = top.frames[i];
			if (tframe === popup_target){
				continue
			}
			list.push({"win":tframe,"popup":null});
		}
		return list;
	}
};

/**
 * Detect Browser
 */
NetFunnel.BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
		return "";
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return 0;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
		{ string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
		{ string: navigator.vendor, subString: "Apple", identity: "Safari" },
		{ prop: window.opera, identity: "Opera" },
		{ string: navigator.vendor, subString: "iCab", identity: "iCab" },
		{ string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
		{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{ string: navigator.vendor, subString: "Camino", identity: "Camino" },
		// for newer Netscapes (6+)
		{ string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
		{ string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
		{ string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
		// for older Netscapes (4-)
		{ string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
	],
	dataOS : [
		{ string: navigator.platform, subString: "Win", identity: "Windows" },
		{ string: navigator.platform, subString: "Mac", identity: "Mac" },
		{ string: navigator.platform, subString: "Linux", identity: "Linux" }
	]
};
NetFunnel.BrowserDetect.init();

/**
 * IE5 는 Array 에 pop/push 함수가 없다.
 */
if(NetFunnel.BrowserDetect.browser == "Explorer"){
	if(typeof Array.push != "function"){
		Array.prototype.push = function() {
			var n = this.length >>> 0;
			for (var i = 0; i < arguments.length; i++) {
			this[n] = arguments[i];
			n = n + 1 >>> 0;
			}
			this.length = n;
			return n;
		};
	}

	if(typeof Array.pop != "function"){
		Array.prototype.pop = function() {
			var n = this.length >>> 0, value;
			if (n) {
			value = this[--n];
			delete this[n];
			}
			this.length = n;
			return value;
		};
	}
}

/**
 * Debug Mode Function
 *  - mode
 *     : send,recv
 */
NetFunnel.getCommandStr = function(mode,msg)
{
	var cmd = "";
	var code = 0;
	if(mode == "recv"){
		code = parseInt(msg.substring(0,4));
	}else{
		var myre = /opcode=([0-9]+)&/;
		var rr = myre.exec(msg);
		if(rr.length > 1){ code = parseInt(rr[1]); }
	}

	switch (code){
		case 5101: cmd = "getTidchkEnter"; break;
		case 5001: cmd = "getTid        "; break;
		case 5002: cmd = "chkEnter      "; break;
		case 5003: cmd = "aliveNotice   "; break;
		case 5004: cmd = "setComplete   "; break;
		default: cmd = "Unknown       ";
	}
	return cmd;
};

NetFunnel.writeDebugMsg = function(win,mode,msg)
{
	var d = new Date();
	var hour = parseInt(d.getHours());
	var min = parseInt(d.getMinutes());
	var sec = parseInt(d.getSeconds());
	var msec = parseInt(d.getMilliseconds());

	var tstr = "";
	if(hour < 10){ tstr += "0";} ; tstr += hour+":";
	if(min < 10){ min += "0";} ; tstr += min+":";
	if(sec < 10){ sec += "0";} ; tstr += sec;
	tstr += "."+msec;

	var ptop = ""; var bgc = ""; var arrow= "";
	if(mode == "recv"){
		ptop = "padding-left:1px;"; bgc = "#9E9E9E;"; arrow=tstr+" | Recv | <b>" + NetFunnel.getCommandStr(mode,msg) + "</b> | ";
	}else{
		ptop = "margin-top:5px;"; bgc = "#EEEEEE;"; arrow=tstr+" | Send | <b>" + NetFunnel.getCommandStr(mode,msg) + "</b> | ";
	}
	win.document.write("<div onload='this.focus()' style='width:650;overflow:hidden;padding:1px;border:1px solid #eeeeee;margin:0px;font-size:10px;font-family:monospace;background-color:"+bgc+ptop+"'>"+arrow+msg.substring(0,50)+"</div>");
};

NetFunnel.printDebugMsg = function(mode,url,msg)
{
	NetFunnel.debugWindow = window.open("", "NetFunnel_debugWindow", "status=1,width=700,height=300,resizable=1,scrollbars=1");
	if(typeof(NetFunnel.debugWindow) == 'object'){
		NetFunnel.writeDebugMsg(NetFunnel.debugWindow,mode,url);	
	}
};


NetFunnel.Storage = function(inType){
	this.html5Support = this.supportsHtml5Storage();	

	if(typeof inType == "number"){
		this.type = inType;
	}
};

NetFunnel.Storage.prototype.supportsHtml5Storage = function() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
};

NetFunnel.Storage.prototype.html5Support 	= false;
NetFunnel.Storage.prototype.length 			= 0;
NetFunnel.Storage.prototype.type 			= 1; // 1:local(Default) | 2:session

NetFunnel.Storage.prototype.setStorageType  = function ( inType )
{
	if(inType < 1 || inType > 2){
		this.type = 1;
	}else{
		this.type = inType;
	}
};

NetFunnel.Storage.prototype.getStorage  = function ( )
{
	if(this.type == 1){
		return localStorage;
	}else if(this.type == 2){
		return sessionStorage;
	}else{
		return localStorage;
	}
};

NetFunnel.Storage.prototype.setItem  = function ( key , value )
{
	try{
		if(this.html5Support){
			this.getStorage().setItem(key,value);
		}else{
			NetFunnel.Cookie.set(key,value);
		}
		return true;
	}catch(e){
		return false;
	}
};

NetFunnel.Storage.prototype.getItem  = function ( key )
{
	var retval=false;
	try{
		if(this.html5Support){
			retval = this.getStorage().getItem(key);
		}else{
			retval = NetFunnel.Cookie.get(key);
		}
		return retval;
	}catch(e){
		return false;
	}
};

NetFunnel.Storage.prototype.removeItem = function ( key )
{
	try{
		if(this.html5Support){
			this.getStorage().removeItem(key);
		}else{
			NetFunnel.Cookie.del(key);
		}
		return true;
	}catch(e){
		return false;
	}
};

NetFunnel.Storage.prototype.clear = function ( )
{
	try{
		if(this.html5Support){
			this.getStorage().clear();
		}
		return true;
	}catch(e){
		return false;
	}
};


NetFunnel.MProtect=function()
{
	try {
		var Storage 	= new NetFunnel.Storage();

		// Get Current Time
		var dt			= new Date();
		var ct			= dt.getTime();

		// Get Stored Data
		var data		= Storage.getItem("NFMPT.data");
		if ( data == null) data = "";

		var stdData		= Storage.getItem("NFMPT.stdData");
		if ( stdData == null) stdData = "";
		//debug_print(stdData);

		var lastTime	= parseInt(Storage.getItem("NFMPT.lastTime"));
		if ( isNaN(lastTime) || lastTime == null || lastTime == "") lastTime = 0;

		var reqCnt		= parseInt(Storage.getItem("NFMPT.reqCnt"));
		if ( isNaN(reqCnt) || reqCnt == null || reqCnt == "" ) reqCnt = 0;

		// Insert New Data
		var arrData		= new Array();
		var arrStdData	= new Array();
		if(data != ""){ arrData = data.split(','); }
		if(stdData != ""){ arrStdData = stdData.split(','); }
		if( lastTime != 0 ){
			arrData[arrData.length] = ct - lastTime;
			arrStdData[arrStdData.length] = ct - lastTime;
		}
		lastTime = ct;

		// Remove Old Data
		var i = arrData.length - 1;
		var tsum = 0;
		for(;i>=0;i--){
			tsum = tsum + parseInt(arrData[i]);
			if(tsum > NetFunnel.MP_TIMELIMIT){
				break;
			}
		}

		var j = arrStdData.length - NetFunnel.MP_DEVCNTLIMIT;
		if(j < 0){ j = 0; }

		var tArrStdData = arrStdData.slice(j);
		var tArrData = arrData.slice(i+1);
		Storage.setItem("NFMPT.data",tArrData.join(","));
		Storage.setItem("NFMPT.stdData",tArrStdData.join(","));
		Storage.setItem("NFMPT.lastTime",lastTime+"");
		Storage.setItem("NFMPT.reqCnt",(++reqCnt)+"");

		var stdDev = NetFunnel.Util.calcStdDev(tArrStdData,0);

		// check standard deviation limit
		if ( stdDev != false && stdDev < NetFunnel.MP_DEVLIMIT ){
			return 2;	// Small Standard Deviation over
		}

		if (tArrData.length < NetFunnel.MP_MINCOUNT){
			return 0;	// Noraml
		}

		// check count per unit time
		if ( tArrData.length + 1 > NetFunnel.MP_MAXREQLIMIT ){
			return 1;	// Request/UnitTime Exceed
		}

		// check reqonly count
		if(reqCnt > NetFunnel.MP_REQONLYLIMIT){
			Storage.setItem("NFMPT.reqCnt",0+"");
			return 3;	// Request Only, No Complete
		}
	}catch(e){
	}
	return 0;
};


/**
 * Busy Alert Box
 */
NetFunnel.ProgressBarObj = new Object();
NetFunnel.ProgressBarCnt = 0;
NetFunnel.ProgressBar = function(oID,oConfig,doc){
    this._bar 		= null;
    this._bar2 		= null;
    this._config 	= new Object();

	this._totWaitCnt= 0;
	this._wflag		= 0;

    if(typeof oID == "string"){
        this._obj = doc.getElementById(oID);
    }else{
        this._obj = oID;
    }

    this._id = NetFunnel.ProgressBarCnt;
    NetFunnel.ProgressBarObj[this._id] = this;
    NetFunnel.ProgressBarCnt++;

    this._config["width"]       = 360;
    this._config["height"]      = 5;
    this._config["count"]       = 50;
    this._config["interval"]    = 50;
    this._config["color"]		= this._color;
    this._config["bgcolor"]		= this._bgcolor;
    if(typeof oConfig == "object"){
        for(var i in oConfig){
            this._config[i] = oConfig[i];
        }
    }
    if(this._config["count"] <= 0){
        this._config["count"] = 50;
    }

    this._oTable    = doc.createElement("table");
    this._oTable.style.width = this._config["width"]+"px";
    this._oTable.style.height = this._config["height"]+"px";
	this._oTable.cellPadding = 0;
	this._oTable.cellSpacing = 0;		

    var tTbody  = doc.createElement("tbody");
    var tRow    = doc.createElement("tr");

	var tCell = doc.createElement("td");
    tCell.style.height  = this._config["height"]+"px";
	tCell.style.backgroundColor  = this._config["bgcolor"];

	var tCell2 = doc.createElement("td");
	tCell2.style.backgroundColor  = this._config["bgcolor"];

	tRow.appendChild(tCell);
	tRow.appendChild(tCell2);
    tTbody.appendChild(tRow);
    this._oTable.appendChild(tTbody);
    this._obj.appendChild(this._oTable);

	this._bar 	= tCell;
	this._bar2 	= tCell2;

    this.show = function(){
        this._obj.style.visibility = "visible";
        this._timer = setInterval("NetFunnel.ProgressBar._action("+this._id+")",this._config["interval"]);
        return;
    };

    this.hide = function(){
        this._obj.style.visibility = "hidden";
        if(this._timer){
            clearInterval(this._timer);
            this._timer = null;
        }
        return;
    };

    this._action = function(id){
		var waitingCount = NetFunnel.gLastData.nwait;

		if( this._wflag == 0  && NetFunnel.retryData == null){
			this._wflag = 1;
		}

		if(this != NetFunnel.ProgressBarObj[id]){
			return this._action.apply(NetFunnel.ProgressBarObj[id],arguments);
		}

        this._oTable.style.width = this._config["width"]+"px";
		if(NetFunnel.gTotWait <= 0){
			NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
		}
		if(parseInt(NetFunnel.gLastData.nwait) > parseInt(NetFunnel.gTotWait)){
			NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
		}
		bar_size 	=  this._config["width"] - Math.round((NetFunnel.gLastData.nwait / NetFunnel.gTotWait)*this._config["width"]);
		bar_size2 	=  this._config["width"] - bar_size;
		
		this._bar.style.width = bar_size+"px";
		//this._bar.style.border = "2px solid green";
		//this._bar.style.backgroundColor = "red";
		this._bar.style.backgroundColor = this._config["color"];

		this._bar2.style.width = bar_size2+"px";
		this._bar2.style.backgroundColor = this._config["bgcolor"];
		return true;
    };
};

NetFunnel.ProgressBar.prototype._mmm    = 0;
NetFunnel.ProgressBar.prototype._id     = 0;
NetFunnel.ProgressBar.prototype._curr   = 0;
NetFunnel.ProgressBar.prototype._direct = 0;
NetFunnel.ProgressBar.prototype._obj    = null;
NetFunnel.ProgressBar.prototype._cells  = null;
NetFunnel.ProgressBar.prototype._timer  = null;
NetFunnel.ProgressBar.prototype._oTable = null;
NetFunnel.ProgressBar.prototype._config = null;
NetFunnel.ProgressBar.prototype._color = "#2a509b";
NetFunnel.ProgressBar.prototype._bgcolor = "#b6dffd";


NetFunnel.ProgressBar._action = function(id){
    NetFunnel.ProgressBarObj[id]._action(id);
};

/**
 * Cookie 관리
 */
NetFunnel.Cookie = {
	set: function(key,value,minutes,domain) {
		var tStr=key+ "=" +escape(value);

		if(typeof minutes != "undefined"  && (minutes.constructor == Number) && minutes > 0 ) {
			var expire=new Date();
			expire.setMinutes(expire.getMinutes() + minutes);	
			tStr += ";expires="+expire.toGMTString();
		}
		if(typeof domain != "undefined"  && domain.constructor == String && domain != "" ) {
			tStr += ";domain="+domain;
		}else if(NetFunnel.TS_COOKIE_DOMAIN != ""){
			tStr += ";domain="+NetFunnel.TS_COOKIE_DOMAIN;
		}
		tStr +=";path=/;";
		document.cookie=tStr;
	},

	del: function(key) {
		NetFunnel.Cookie.set(key,"",-1);
	},

	get: function(key){
		if (document.cookie.length>0) {
			var c_start=document.cookie.indexOf(key + "=");
			if (c_start!=-1)
			{
				c_start=c_start + key.length+1;
				var c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	}
};

/**
 * Complete from URL Parameters
 **/
NetFunnel.getUrlParameters = function(key)
{
    if (typeof key != "string" || key == ""){
        return "";
    }

    var strReturn = "";
    var strHref = document.location.href;
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?"));
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (aQueryString[iParam].indexOf(key + "=") > -1) {
                var idx = aQueryString[iParam].indexOf(key+"=")+key.length+1;
                strReturn = aQueryString[iParam].substr(idx);
                break;
            }
        }
    }
    return unescape(strReturn);
};


NetFunnel.paramNetFunnelID = NetFunnel.getUrlParameters(NetFunnel.TS_COOKIE_ID);
if(NetFunnel.paramNetFunnelID  != ""){
    var done_value = NetFunnel.Cookie.get(NetFunnel.TS_COOKIE_ID+"_done");
    if(done_value != NetFunnel.paramNetFunnelID){
        NetFunnel.Cookie.set(NetFunnel.TS_COOKIE_ID,NetFunnel.paramNetFunnelID,NetFunnel.TS_COOKIE_TIME,NetFunnel.TS_COOKIE_DOMAIN);
        NetFunnel.Cookie.set(NetFunnel.TS_COOKIE_ID+"_done",NetFunnel.paramNetFunnelID,NetFunnel.TS_COOKIE_TIME,NetFunnel.TS_COOKIE_DOMAIN);
    }
}


/**
 * Default Callback Function
 */
NetFunnel.gPop = null;
NetFunnel.gTimer = null;
NetFunnel.gLastData = null;

NetFunnel.countdown_stop = function()
{
	try{
		if(!NetFunnel.Util.isVirtualWait(NetFunnel.gLastData)){
			
			NetFunnel.gControl.fireEvent(null,NetFunnel.gControl,'onStop',
					{ next:NetFunnel.gControl.next.stop });
			
			NetFunnel_sendStop();
			if(NetFunnel.gPop) {
				NetFunnel.gPop.hide();
				NetFunnel.gPop.destroy();
				delete NetFunnel.gPop;
				NetFunnel.gPop = null;
			}

			// Block List Process
			if(NetFunnel.gControl.getConfig("use_frame_block") == true){
				NetFunnel.PopupUtil.hideBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
			}
		}
	}catch(e){
	}
};

NetFunnel.countdown = function()
{
    if(NetFunnel.gLastData && NetFunnel.gLastData.time_left >= 0)
    {
        // 대기 정보를 출력한다.
		if(NetFunnel.gPop){
			var tTime = NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_TimeLeft");
			var tCount = NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_Count");
			  
			if (NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_Count")){
				if(NetFunnel.gLastData.nwait > NetFunnel.gShowcntLimit ){
					tCount.innerHTML="다수";
				}else{
					tCount.innerHTML=String(NetFunnel.gLastData.nwait);
				}
			} 
		
			if (NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_TimeLeft")){
				if(NetFunnel.gLastData.real_time_left > NetFunnel.gShowtimeLimit ){
					if(tTime.innerHTML.length >= 5){
						tTime.innerHTML= ".";
					}else{
						tTime.innerHTML+=".";
					}
				}else{
					tTime.innerHTML=NetFunnel.Util.getTimeStr(NetFunnel.gLastData.real_time_left);
				}
			} 
			
			try{
				if(typeof tTime == "object"){
					if (tTime.style.textDecoration == "none"){
						tTime.style.textDecoration = "underline";
					}else{
						tTime.style.textDecoration = "none";
					}
				}
				if(typeof tCount == "object"){
					if (tCount.style.textDecoration == "none"){
						tCount.style.textDecoration = "underline";
					}else{
						tCount.style.textDecoration = "none";
					}
				}
			}catch(e){	
			}
		}
    }

	if(NetFunnel.gLastData.time_left <=0 && NetFunnel.gTimer)
	{
		if(NetFunnel.gPop){
			//NetFunnel.gPop.hide();
		}
		return;
	}

	var skinObj = NetFunnel.SkinUtil.get(NetFunnel.gSkinId,NetFunnel.Util.isSmartPhone());
	var left_perc = "";
	
	if(typeof skinObj.updateCallback == "function"){
		if(parseInt(NetFunnel.gTotWait) <= 0){
			left_perc = 0;
		}else{
			if(parseInt(NetFunnel.gTotWait) < parseInt(NetFunnel.gLastData.nwait)){
				NetFunnel.gTotWait = parseInt(NetFunnel.gLastData.nwait);
			}
			left_perc = parseInt(((NetFunnel.gTotWait - NetFunnel.gLastData.nwait)*100)/NetFunnel.gTotWait);
		}
		skinObj.updateCallback(left_perc,NetFunnel.gLastData.nwait,NetFunnel.gTotWait,NetFunnel.gLastData.real_time_left,true);
	}

	NetFunnel.gLastData.time_left--;
	 
 
	var self = this;
	NetFunnel.gTimer = setTimeout(function(){ self.countdown(); },1000);
};

NetFunnel.SkinUtil = {
	prevID:"",
	add:function(id,obj,type)
	{
		'use strict';
		try{
			if(typeof id != "string" || id == ""){ return false; }
			if(typeof obj != "object"){ return false; }
			if(typeof type != "string" || type == ""){ type = "normal"; }

			if(typeof NetFunnel.Skin[id] != "object"){
				NetFunnel.Skin[id] = new Object();
			}	
			NetFunnel.Skin[id][type] 	= obj;
			NetFunnel.gLastSkinID 		= id;
			return true;
		}catch(e){
			return false;
		}
	},
	get:function(id,isMobile)
	{
		'use strict';
		try{
			if(typeof id != "string" || id == ""){ id=NetFunnel.gLastSkinID; }
			var type = "normal";
			if(NetFunnel.gUseMobileUI == true && isMobile == true){
				type="mobile";
			}
			
			if(typeof NetFunnel.Skin[id] == "object" && typeof NetFunnel.Skin[id][type] == "object") {
				return NetFunnel.Skin[id][type];
			}

			if(NetFunnel.TS_SKIN_ID != "" && NetFunnel.TS_SKIN_ID != id){
				if(typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID] == "object" && typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type] == "object") {
					return NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type];
				}
			}
			return NetFunnel.Skin["default"][type];
		}catch(e){
		}
		return NetFunnel.Skin["default"]["normal"];
	}
};

NetFunnel.SkinUtil.add('default',{
		htmlStr:' \
			<div id="NetFunnel_Skin_Top" style="background-color:#ffffff;border:1px solid #9ab6c4;overflow:hidden;width:250px;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;" > \
				<div style="background-color:#ffffff;border:6px solid #eaeff3;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> \
					<div style="text-align:right;padding-top:5px;padding-right:5px;line-height:25px;"> \
					</div>\
					<div style="padding-top:5px;padding-left:5px;padding-right:5px"> \
						<div style="text-align:center;font-size:12pt;color:#001f6c;height:22px"><b><span style="color:#013dc1">접속대기 중</span>입니다.</b></div> \
						<div style="text-align:right;font-size:9pt;color:#4d4b4c;padding-top:4px;height:17px;" ><b>예상대기시간 : <span id="NetFunnel_Loading_Popup_TimeLeft"></span></b></div> \
						<div style="padding-top:6px;padding-bottom:6px;vertical-align:center;width:228px" id="NetFunnel_Loading_Popup_Progressbar"></div> \
						<div style="background-color:#ededed;padding-bottom:8px;overflow:hidden;width:228px"> \
							<div style="padding-left:5px"> \
								<div style="text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;padding-top:10px;padding-bottom:10px;height:10px">대기고객 : <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_Count"></span></span></b> 명</div> \
								<div style="text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:12px">현재 이용고객이 많아 대기 중입니다.</div> \
								<div style="text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">잠시만 기다리시면</div> \
								<div style="text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">자동으로 연결됩니다.</div> \
							</div> \
						</div> \
					<div style="height:5px;"></div> \
				</div> \
			</div>'
	},'mobile');

NetFunnel.tstr = '\
	<div id="NetFunnel_Skin_Top" style="background-color:#ffffff;border:1px solid #9ab6c4;width:458px;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> \
		<div style="background-color:#ffffff;border:6px solid #eaeff3;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> \
			<div style="text-align:right;padding-top:5px;padding-right:5px;line-height:25px;"> \
				<a href="'+NetFunnel.gLogoURL+'" target="_blank" style="cursor:pointer;text-decoration:none;"> \
';

if(NetFunnel.BrowserDetect.browser == "Explorer" && NetFunnel.BrowserDetect.version == "6" ){
	NetFunnel.tstr += '<b>'+NetFunnel.gLogoText+'</b></a>';
}else{
	NetFunnel.tstr += '<b>'+NetFunnel.gLogoText+'</b></a>';
}
NetFunnel.tstr +=	'<b><span id="netfunnel_version_display" style="font-size:7pt;color:gray"></span></b></div> \
			<div style="padding-top:0px;padding-left:25px;padding-right:25px"> \
				<div style="text-align:left;font-size:12pt;color:#001f6c;height:22px"><b>서비스 <span style="color:#013dc1">접속대기 중</span>입니다.</b></div> \
				<div style="text-align:right;font-size:9pt;color:#4d4b4c;padding-top:4px;height:17px" ><b>예상대기시간 : <span id="NetFunnel_Loading_Popup_TimeLeft"></span></b></div> \
				<div style="padding-top:6px;padding-bottom:6px;vertical-align:center;width:400px" id="NetFunnel_Loading_Popup_Progressbar"></div> \
				<div style="background-color:#ededed;width:400px;padding-bottom:8px;overflow:hidden"> \
					<div style="padding-left:5px"> \
						<div style="text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;padding-top:10px;height:10px">고객님, <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_Count"></span></span></b> 명의 접속 대기자가 있습니다.  </div> \
						<div style="text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;height:10px">현재 이용고객이 많아 대기 중입니다.</div> \
						<div style="text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">잠시만 기다리시면 자동으로 연결됩니다.</div> \
						<div style="text-align:center;font-size:9pt;color:#2a509b;padding-top:10px;"> \
							<b>※ 재 접속하시면 대기시간이 더 길어집니다.</b><br /> \
							<b>예상대기 시간동안 기다려 주시기 바랍니다.</b> \
						</div> \
					</div> \
				</div> \
				<div style="height:5px;"></div> \
			</div> \
		</div> \
	</div>';
NetFunnel.SkinUtil.add('default',{htmlStr:NetFunnel.tstr},'normal');



NetFunnel.DefaultCallback =
{
	"onSuccess": function(ev,ret){
		if(NetFunnel.gTimer){
			clearInterval(NetFunnel.gTimer);
		}
		if(NetFunnel.gPop){
			NetFunnel.gPop.hide();
			NetFunnel.gPop.destroy();
			delete NetFunnel.gPop;
			NetFunnel.gPop = null;
		}

		// Block List Process
		if(NetFunnel.gControl.getConfig("use_frame_block") == true){
			NetFunnel.PopupUtil.hideBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
		}

	
		if(typeof ret.next == "string" && ret.next != ""){
			document.location.href=ret.next;
		}else if(typeof ret.next == "function"){
			ret.next(ev,ret);
		}
	},
	"onContinued": function(ev,ret) {

		if(typeof ret.next == "string"){
			document.location.href=ret.next;
			return;
		}else if(typeof ret.next == "function"){
			ret.next(ev,ret);
			return;
		}

		if(ret.rtype == NetFunnel.RTYPE_CHK_ENTER || ret.rtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER){
			if(NetFunnel.gTimer){
				clearInterval(NetFunnel.gTimer);
			}
			
			var skinObj = NetFunnel.SkinUtil.get(NetFunnel.gSkinId,NetFunnel.Util.isSmartPhone());
			
			delete NetFunnel.gLastData;
			NetFunnel.gLastData = ret.data;
			NetFunnel.gLastData.time_left     = parseInt(ret.data.ttl);
			NetFunnel.gLastData.tps = parseInt(ret.data.tps);
			if(NetFunnel.gLastData.tps == 0) NetFunnel.gLastData.tps = 1;
			
			// wait time adjust
			// ------------------------------------------------
			NetFunnel.gLastData.real_time_left     = Math.round(parseInt(ret.data.nwait)/NetFunnel.gLastData.tps);
			if(NetFunnel.gLastData.real_time_left < 1){
				NetFunnel.gLastData.real_time_left = 1;
			}
			if(NetFunnel.gPrevWaitTime > -1 && NetFunnel.gLastData.real_time_left > NetFunnel.gPrevWaitTime){
				NetFunnel.gLastData.real_time_left = NetFunnel.gPrevWaitTime;
			}
			NetFunnel.gPrevWaitTime = NetFunnel.gLastData.real_time_left;
			// ------------------------------------------------


			//var is_new = NetFunnel.SkinUtil.draw(NetFunnel.gSkinId,skinObj);
			//if(is_new == true && typeof skinObj.prepareCallback == "function"){
			//	skinObj.prepareCallback();
			//}
			if(NetFunnel.gTotWait < 0){
				NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
			}
			
			if(!NetFunnel.gPop){
				NetFunnel.gPop = new NetFunnel.Popup(skinObj.htmlStr,NetFunnel.gPopupTop,NetFunnel.gPopupLeft,NetFunnel.gControl.getConfig("popup_target"));
				if(skinObj.prepareCallback == "function"){
					skinObj.prepareCallback();
				}
			}
			NetFunnel.gPop.show();
			
			if(NetFunnel.gControl.getConfig("version_display")){ 
				if(NetFunnel.gPop.getObj("netfunnel_version_display")){
					if(NetFunnel.gDebugflag){
						var tDAlert = NetFunnel.gPop.getObj("netfunnel_version_display");
						tDAlert.innerHTML=NetFunnel.VERSION;
					}else{
						var tDAlert = NetFunnel.gPop.getObj("netfunnel_version_display");
						tDAlert.innerHTML=NetFunnel.VERSION;
					}
				}
			}
			
			// Block List Process
			if(NetFunnel.gControl.getConfig("use_frame_block") == true){
				NetFunnel.PopupUtil.showBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
			}
			NetFunnel.countdown();
		}
	},
	"onError":function(ev,ret) {
        if(NetFunnel.gPop){
            NetFunnel.gPop.hide();
            NetFunnel.gPop.destroy();
            delete NetFunnel.gPop;
            NetFunnel.gPop = null;
        }

		// Block List Process
		if(NetFunnel.gControl.getConfig("use_frame_block") == true){
			NetFunnel.PopupUtil.hideBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
		}
	
		if(typeof ret.next == "string" && ret.next != ""){
			document.location.href=ret.next;
			return;
		}else if(typeof ret.next == "function"){
			ret.next(ev,ret);
			return;
		}
	},
	"onStop":function(ev,ret){
		if(typeof ret.next == "string" && ret.next != ""){
			document.location.href=ret.next;
			return;
		}else if(typeof ret.next == "function"){
			ret.next(ev,ret);
			return;
		}
	}

};

/**
 * Event Class 의 생성자
 *
 * @classDescription	새로운 Event클래스를 생성한다.
 * @return {Object}	새로생성된 Event객체
 * @constructor
 */
NetFunnel.Event = function()
{
	this.events = [];
	this.builtinEvts = [];
};

/**
 * 해당 Element에 대한 주어진 Action의 번호를 얻어온다.
 *
 * @memberOf NetFunnel.Event
 * @param {Object} obj action 이 연결된 element
 * @param {String} evt 이벤트 이름
 * @param {Function} action 이벤트가 발생했을때 실행된 action
 * @param {Object} binding The object to scope the action to.
 * @return {Number} 정수값
 */
NetFunnel.Event.prototype.getActionIdx = function(obj,evt,action,binding)
{
	if(obj && evt)
	{

		var curel = this.events[obj][evt];
		if(curel)
		{
			var len = curel.length;
			for(var i = len-1;i >= 0;i--)
			{
				if(curel[i].action == action && curel[i].binding == binding)
				{
					return i;
				}
			}
		}
		else
		{
			return -1;
		}
	}
	return -1;
};

/**
 * Listener 추가
 *
 * @memberOf NetFunnel.Event
 * @param {Object} obj action 이 연결된 element
 * @param {String} evt 이벤트 이름
 * @param {Function} action 이벤트가 발생했을때 실행된 action
 * @param {Object} binding The object to scope the action to.
 * @return {null} 없음.
 */
NetFunnel.Event.prototype.addListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			if(this.getActionIdx(obj,evt,action,binding) == -1)
			{
				var curevt = this.events[obj][evt];
				curevt[curevt.length] = {action:action,binding:binding};
			}
		}
		else
		{
			this.events[obj][evt] = [];
			this.events[obj][evt][0] = {action:action,binding:binding};
		}
	}
	else
	{
		this.events[obj] = [];
		this.events[obj][evt] = [];
		this.events[obj][evt][0] = {action:action,binding:binding};
	}
};

/**
 * Listener 제거
 *
 * @memberOf NetFunnel.Event
 * @param {Object} obj action 이 연결된 element
 * @param {String} evt 이벤트 이름
 * @param {Function} action 이벤트가 발생했을때 실행된 action
 * @param {Object} binding The object to scope the action to.
 * @return {null} 없음
 */
NetFunnel.Event.prototype.removeListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			var idx = this.actionExists(obj,evt,action,binding);
			if(idx >= 0)
			{
				this.events[obj][evt].splice(idx,1);
			}
		}
	}
};

/**
 * 이벤트 발생
 *
 * @memberOf NetFunnel.Event
 * @param e [(event)] 내장 이벤트객체 전달
 * @param {Object} obj action 이 연결된 element
 * @param {String} evt 이벤트 이름
 * @param {Object} args 이벤트에 전달된 인자
 * @return {null} 없음.
 */
NetFunnel.Event.prototype.fireEvent = function(e,obj,evt,args)
{
	if(!e){e = window.event;}
	if(obj && this.events)
	{
		var evtel = this.events[obj];
		if(evtel)
		{
			var curel = evtel[evt];
			if(curel)
			{
				for(var act = 0; curel.length > act; act ++)
				{
					var action = curel[act].action;
					if(curel[act].binding)
					{
						action = action.bind(curel[act].binding);
					}
					action(e,args);
				}
			}
		}
	}
};


NetFunnel.gPopup = new Array();
NetFunnel.PopupUtil = {
	getViewportHeight:function (win,doc) {
		if (win.innerHeight!=win.undefined) return win.innerHeight;
		if (doc.compatMode=='CSS1Compat') return doc.documentElement.clientHeight;
		if (doc.body) return doc.body.clientHeight;
		return win.undefined;
	},
	 getViewportWidth:function(win,doc) {
		var offset = 17;
		var width = null;
		if (win.innerWidth!=win.undefined) return win.innerWidth;
		if (doc.compatMode=='CSS1Compat') return doc.documentElement.clientWidth;
		if (doc.body) return doc.body.clientWidth;
		return 0;
	},
	getScrollTop:function(doc) {
		if (doc.pageYOffset) {
			return doc.pageYOffset;
		} else if (doc.documentElement && typeof doc.documentElement.scrollTop == "number"){
			return doc.documentElement.scrollTop;
		} else if (doc.body) {
			return doc.body.scrollTop;
		}
		return 0;
	},
	getScrollLeft:function(doc) {
		if (doc.pageXOffset) {
			return doc.pageXOffset;
		} else if (doc.documentElement && typeof doc.documentElement.scrollLeft == "number"){
			return doc.documentElement.scrollLeft;
		} else if (doc.body) {
			return doc.body.scrollLeft;
		}
		return 0;
	},
	resizePopup:function(){
		for(var i = 0; NetFunnel.gPopup.length > i; i++){
			NetFunnel.gPopup[i]._centerPopWin();
		}
	},
	getObjWidth:function(obj){
		if(!obj) return 0;
		var width = null;

		if(parseInt(obj.style.width) > parseInt(obj.offsetWidth)){
			width = parseInt(obj.style.width);
		}else{
			width = obj.offsetWidth;
		}
		return width;
	},
	getObjHeight:function(obj){
		if(!obj) return 0;
		var height = null;

		if(parseInt(obj.style.height) > parseInt(obj.offsetHeight)){
			height = parseInt(obj.style.height);
		}else{
			height = obj.offsetHeight;
		}
		return height;
	},
	showBlockList:function(block_list){
		for(var i=0;i < block_list.length;i++){
			try{
				var tdata = block_list[i];
				tdata.popup = new NetFunnel.Popup("",NetFunnel.gPopupTop,NetFunnel.gPopupLeft,tdata.win);				
				tdata.popup.show();
			}catch(e){
			}
		}
	},
	hideBlockList:function(block_list){
		for(var i=0;i < block_list.length;i++){
			try{
				var tdata =block_list[i];
				if(tdata.popup){
					tdata.popup.hide();
					tdata.popup.destroy();
					delete tdata.popup;
					tdata.popup = null;
				}
			}catch(e){
			}
		}
	},
	hideWaitPopup:function(){
		if(typeof NetFunnel == "object"){
			if(NetFunnel.gWaitPop){
				NetFunnel.gWaitPop.hide();
				NetFunnel.gWaitPop.destroy();
				NetFunnel.gWaitPop = null;
			}
		}
	},
	showWaitPopup:function(){
		if(typeof NetFunnel == "object"){
			var tstr = '<div style="padding:2px;border:1px solid darkgray;"> \
				<table> \
					<tr>';
			if(NetFunnel.BrowserDetect.browser == "Explorer" && NetFunnel.BrowserDetect.version == "6" ){
						tstr += '<td></td>'
			}else{
						tstr += '<td><img style="" border=0 src="data:image/gif;base64,'+NetFunnel.gPreWaitData+'" ></td>'
			}
			tstr += '	<td style="valign:middle;font-size:9pt">wait...</td> \
					</tr> \
				</table> \
			</div>';

			NetFunnel.gWaitPop = new NetFunnel.Popup(tstr,false,false,NetFunnel.gControl,true,"NetFunnel_Waiting_Popup");
			NetFunnel.gWaitPop.show();
		}
	},
	getDocumentEntireHeight:function(doc){
		var body = doc.body, html = doc.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight,
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	
		return height;
	}

};

/**
 * Modal Popup Window
 */
NetFunnel.Popup = function (content,top,left,winobj,waiting,obj_id) {
	// Window/Document setting
	if ( typeof winobj == "object"){
		this._mWin = winobj
		if( typeof winobj.document == "object"){
			this._mDoc = winobj.document;
		}else{
			this._mWin = window;
			this._mDoc = document;
		}
	}else{
		this._mWin = window;
		this._mDoc = document;
	}

	if(typeof waiting != "boolean"){
		waiting = false;
	}

	if(typeof obj_id != "string"){
		obj_id = "NetFunnel_Loading_Popup";	
	}


	// Find Document Body
	var theBody = this._mDoc.getElementsByTagName('BODY')[0];
	if(!theBody){ return; }

	// Content Div Create
	var tObj = this._mDoc.getElementById(obj_id);
	if(!tObj || NetFunnel.SkinUtil.prevID != NetFunnel.gSkinId)
	{
		tObj = this._mDoc.createElement('div');
		tObj.id = obj_id;
		tObj.style.display= "none";
		tObj.style.top	= 0;
		tObj.style.left	= 0;
		tObj.innerHTML 	= content;

		theBody.appendChild(tObj);

		var tObj_ct_busy = this._mDoc.getElementById("NetFunnel_Loading_Popup_Progressbar");
		if(tObj_ct_busy){
			var busyWidth = parseInt(tObj_ct_busy.style.width);
			var busybox = new NetFunnel.ProgressBar(tObj_ct_busy, { width:(busyWidth), count:50, interval:50 },this._mDoc);
			busybox.show();
			this._mProgress = busybox;
		}

		var tObj_stop_btn = this._mDoc.getElementById("NetFunnel_Countdown_Stop");
		if(tObj_stop_btn){
			tObj_stop_btn.onclick = NetFunnel.countdown_stop;
		}
		this.new_draw = true;
	}
	NetFunnel.SkinUtil.prevID = NetFunnel.gSkinId;
	

	var popmask = this._mDoc.getElementById('mpopup_bg');
	var popiframe = this._mDoc.getElementById('pop_iframe');
	
	if(!popmask){
		popmask = this._mDoc.createElement('div');
		popmask.id = 'mpopup_bg';
		//popmask.innerHTML="<table width='100%' height='100%'><tr><td>&nbsp;</td></tr></table>";
		popmask.innerHTML="<div style='width:100%; height=100%'>&nbsp;</div>";
		
		popmask.style.position="absolute";
		popmask.style.zIndex="1200";
		popmask.style.top="0px";
		popmask.style.left="0px";
		popmask.style.width="100%";
		//popmask.style.height="100%";
		popmask.style.height=NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc)+"px";
		popmask.style.margin="0";
		popmask.style.padding="0";
		popmask.style.border="0px solid black";
		popmask.fontSize="0";
		theBody.appendChild(popmask);
	}
	
	if(!popiframe){
		//IE 6.0 Select 처리
		popiframe = this._mDoc.createElement('iframe');
		popiframe.id = 'pop_iframe';
		popiframe.frameborder="0";
		popiframe.border="0";
		popiframe.framespacing="0";
		popiframe.marginheight="0";
		popiframe.marginwidth="0";
		if(waiting){
        	popiframe.style.opacity="0";
			popiframe.style.filter="alpha(opacity=0)";
		}else{
        	popiframe.style.opacity="0.5";
			popiframe.style.filter="alpha(opacity=50)";
		}
		popiframe.style.zIndex="1199";
		popiframe.style.top="0px";
		popiframe.style.left="0px";
		popiframe.style.width="100%";
		//popiframe.style.height="100%";
		popiframe.style.height=NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc)+"px";
		popiframe.style.position="absolute";
		popiframe.style.border="0px solid #FFFFFF";
		popiframe.style.backgroundColor="#FFFFFF";
		
		theBody = this._mDoc.getElementsByTagName('BODY')[0];
		theBody.appendChild(popiframe);
	}
	
	tObj.style.position 	= "absolute";
	tObj.style.visibility 	= "hidden";

	this._mCount++;	
	this._mMask 	= popmask;
	this._mPopIFrame= popiframe;
	this._mObj 		= tObj;

	this._mTop		= top;
	this._mLeft		= left;
	this.mid		= "mpopup_"+this._mCount;

    this.addListener(this._mWin,"resize",NetFunnel.PopupUtil.resizePopup);
	NetFunnel.gPopup.push(this);
};

NetFunnel.Popup.prototype           		= new NetFunnel.Event();
NetFunnel.Popup.prototype._mCount 			= 0;
NetFunnel.Popup.prototype._mid 				= "";
NetFunnel.Popup.prototype._mWin				= window;
NetFunnel.Popup.prototype._mDoc				= document;
NetFunnel.Popup.prototype._mObj				= null;
NetFunnel.Popup.prototype._mMask			= null;
NetFunnel.Popup.prototype._mPopIFrame    	= null;
NetFunnel.Popup.prototype._mIsShown			= false;
NetFunnel.Popup.prototype._mIframeResize	= NetFunnel.TS_IFRAME_RESIZE;
NetFunnel.Popup.prototype._mProgress		= null;

NetFunnel.Popup.prototype._setMaskSize = function() {
    var theBody = this._mDoc.getElementsByTagName("BODY")[0];
	if(!theBody){ return; }

    var fullHeight = NetFunnel.PopupUtil.getViewportHeight(this._mWin,this._mDoc);
    var fullWidth = NetFunnel.PopupUtil.getViewportWidth(this._mWin,this._mDoc);
	var popHeight =0;
	var popWidth = 0;

    // Determine what's bigger, scrollHeight or fullHeight / width
    if (fullHeight > theBody.scrollHeight) {
        popHeight = fullHeight;
    } else {
        popHeight = theBody.scrollHeight;
    }

    if (fullWidth > theBody.scrollWidth) {
        popWidth = fullWidth;
    } else {
        popWidth = theBody.scrollWidth;
    }

    //this._mMask.style.height 	= popHeight + "px";
    //this._mMask.style.width 	= popWidth + "px";
};

NetFunnel.Popup.prototype._centerPopWin = function () {
	if (this._mIsShown){
		var theBody = this._mDoc.getElementsByTagName("BODY")[0];
		if(!theBody){ return; }

		var scTop = parseInt(NetFunnel.PopupUtil.getScrollTop(this._mDoc),10);
		var scLeft = parseInt(theBody.scrollLeft,10);

		this._setMaskSize();

		var fullHeight = NetFunnel.PopupUtil.getViewportHeight(this._mWin,this._mDoc);
		var fullWidth = NetFunnel.PopupUtil.getViewportWidth(this._mWin,this._mDoc);

		if( typeof this._mTop == "number" ){
			this._mObj.style.top = this._mTop + "px";
		}else{
			this._mObj.style.top = (scTop + ((fullHeight - NetFunnel.PopupUtil.getObjHeight(this._mObj)) / 2)) + "px";
		}

		if( typeof this._mLeft == "number" ){
		this._mObj.style.left = this._mLeft + "px";
		}else{
			this._mObj.style.left =  (scLeft + ((fullWidth - NetFunnel.PopupUtil.getObjWidth(this._mObj)) / 2)) + "px";
		}

		if(this._mIframeResize && typeof this._mPopIFrame == "object"){
			this._mPopIFrame.style.top 	= this._mObj.style.top;
			this._mPopIFrame.style.left	= this._mObj.style.left;

			this._mPopIFrame.style.width	= this._mObj.style.width;
			this._mPopIFrame.style.height	= parseInt(this._mObj.style.height) + 6;
		}
	}
};

NetFunnel.Popup.prototype.getObj = function(id){
	return this._mDoc.getElementById(id);
}

NetFunnel.Popup.prototype.show = function(){
	var theBody = this._mDoc.getElementsByTagName("BODY")[0];
	if(!theBody){ return; }
	theBody.style.overflow = "auto";
	this._mObj.style.zIndex 	= "1202";	
	this._mObj.style.visibility = "visible";
	this._mObj.style.display 	= "block";
	this._mMask.style.visiblity	= "visible";
	this._mMask.style.display	= "block";
	this._mPopIFrame.style.visiblity = "visible";
	this._mPopIFrame.style.display   = "block";
	this._mIsShown = true;
	this._centerPopWin();
};

NetFunnel.Popup.prototype.hide = function(){
	var theBody = this._mDoc.getElementsByTagName("BODY")[0];
	if(!theBody){ return; }
	theBody.style.overflow = "auto";
	this._mObj.style.visibility	= "hidden";
	this._mObj.style.display	= "none";
	this._mMask.style.visiblity	= "hidden";
	this._mMask.style.display	= "none";
	this._mPopIFrame.style.visiblity = "hidden";
	this._mPopIFrame.style.display   = "none";
	this._mIsShown = false;
};

NetFunnel.Popup.prototype.destroy = function(){
	// remove event handler;
	//removeEvent(window,"resize",NetFunnel.PopupUtil.resizePopup);
    //this.removeListener(window,"resize",NetFunnel.PopupUtil.resizePopup);
	//removeEvent(window,"scroll",NetFunnel.PopupUtil.resizePopup);

	// global list 에서 삭제
	var theBody = this._mDoc.getElementsByTagName("BODY")[0];
	if(!theBody){ return; }
	var tsize = NetFunnel.gPopup.length;

	try{
		var popmask = this._mDoc.getElementById('mpopup_bg');
		theBody.removeChild(popmask);
	}catch(e){
	}
	
	try{
		var popiframe = this._mDoc.getElementById('pop_iframe');
		theBody.removeChild(popiframe);
	}catch(e){
	}	

	for(var i = 0 ; i < tsize ; i++){
		var tObj = NetFunnel.gPopup.pop();
		if(tObj.mid == this.mid){
			try{
				theBody.removeChild(tObj._mObj);
			}catch(e){
			}
			delete tObj;
			continue;
		}
		NetFunnel.gPopup.push(tObj);	
	}
	if(this._mProgress){
		this._mProgress.hide();
	}
};

/**
 * RetVal Class 의 생성자.
 *
 * @classDescription NetFunnel에서 받아온 결과값을 Parsing해 준다.
 * @param {String} 결과 문자열
 */
NetFunnel.RetVal = function(str)
{
	this._mParam	= new Object();
	this._mRtype 	= parseInt(str.substr(0,4));
	this._mCode 	= parseInt(str.substr(5,3));
	this._mRetStr	= str.substr(9,str.length - 9);

	this._parse();
};

//-----------------------------------------------------------------------------
// NetFunnel.RetVal private variable
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// NetFunnel.RetVal public variable
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// NetFunnel.RetVal private member function
//-----------------------------------------------------------------------------
/**
 * left trim
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} str Input String
 * @return {String} processed String
 */
NetFunnel.RetVal.prototype._ltrim = function(str) {
	for(var k = 0; k < str.length && this._isWhitespace(str.charAt(k)); k++);
	return str.substring(k, str.length);
};
/**
 * right trim
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} str Input String
 * @return {String} processed String
 */
NetFunnel.RetVal.prototype._rtrim = function(str) {
	for(var j=str.length-1; j>=0 && this._isWhitespace(str.charAt(j)) ; j--) ;
	return str.substring(0,j+1);
};

/**
 * String trim
 *   - 문자열 앞뒤의 공백 제거
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} str Input String
 * @return {String} processed String
 */
NetFunnel.RetVal.prototype._trim = function(str) {
	return this._ltrim(this._rtrim(str));
};

/**
 * 공백문자 여부 판다.
 *    - 공백문자 = " \t\n\r\f"
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} charToCheck 테스트 char
 * @return {Boolean} 공백여부
 */
NetFunnel.RetVal.prototype._isWhitespace = function(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
};

/**
 * 입력된 결과값을 파싱해서 사용하기 편리한 형태로 저장 한다.
 *
 * @memberOf NetFunnel.RetVal
 * @return {null} 없음
 */
NetFunnel.RetVal.prototype._parse = function()
{
	var titem = this._mRetStr.split('&');
	var temp = null;
	for(var i = 0; titem.length > i; i++){
		temp=titem[i].split('=');

		if(temp.length > 1){
			var key=this._trim(temp[0]);
			var value=this._trim(temp[1]);

			this._mParam[key] = value;
		}
	}
};

//-----------------------------------------------------------------------------
// NetFunnel.RetVal public member function
//-----------------------------------------------------------------------------
/**
 * Return Code 전달
 *
 * @memberOf NetFunnel.RetVal
 * @return {Number} Return Code 값
 */
NetFunnel.RetVal.prototype.getRetCode = function(){
	return this._mCode;
};
NetFunnel.RetVal.prototype.setRetCode = function(inCode){
	return (this._mCode = inCode);
};
/**
 * 요청 타입 (Request Type) 전달
 *
 * @memberOf NetFunnel.RetVal
 * @return {Number} Request Type 값
 */
NetFunnel.RetVal.prototype.getReqType = function(){
	return this._mRtype;
};
NetFunnel.RetVal.prototype.setReqType = function(inType){
	return (this._mRtype = inType);
};
/**
 * 결과 문자열 전달
 *
 * @memberOf NetFunnel.RetVal
 * @return {String} 생성시 입력되었던 결과 문자열
 */
NetFunnel.RetVal.prototype.getRetStr = function(){
	return this._mRetStr;
};

/**
 * 결과값 요청
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} key 찾으려는 값의 key 문자열
 * @return {String} key에 해당하는 value 문자열
 */
NetFunnel.RetVal.prototype.getValue = function(key){
	try{
		return this._mParam[key];
	}catch(e){
		return null;
	}
};

/**
 * 결과값 설정
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} key 설정하려는 값의 key 문자열
 * @param {String} value 설정하려는 값의 value 문자열
 * @return {String} 이전 Value 값
 */
NetFunnel.RetVal.prototype.setValue = function(key,value){
	var oldValue = null;
	//try{
	//	
		if ( this.isKeyExist(key) ){
			oldValue = this.getValue(key);
		}

		this._mParam[key] = value;
		return oldValue;
	//}catch(e){
	//	return null;
	//}
};


/**
 * 숫자형 결과값 요청
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} key 찾으려는 값의 key 문자열
 * @return {Number} key에 해당하는 value 숫자
 */
NetFunnel.RetVal.prototype.getNumber = function(key){
	try{
		return parseInt(this._mParam[key]);
	}catch(e){
		return 0;
	}
};

/**
 * key 존재 여부 확인
 *
 * @memberOf NetFunnel.RetVal
 * @param {String} key 찾으려는 값의 key 문자열
 * @return {Boolean} key의 존재여부
 */
NetFunnel.RetVal.prototype.isKeyExist = function(key){
	try{
		if(this._mParam[key] != null){
			return true;
		}
	}catch(e){
	}
	return false;
};

/**
 * 전체 Parameter Object 요청
 *
 * @memberOf NetFunnel.RetVal
 * @return {Object} parameter들의 저장된 Object
 */
NetFunnel.RetVal.prototype.getParam = function(){
	return this._mParam;
};



/**
 * TsClient Contructor
 *
 */
NetFunnel.TsClient = function(oConfigs,oCallbacks)
{
	this.mConfig 					= new Object();
	this.mConfig["host"] 			= NetFunnel.TS_HOST;
	this.mConfig["port"]			= NetFunnel.TS_PORT;
	this.mConfig["proto"]			= NetFunnel.TS_PROTO;
	this.mConfig["query"]			= NetFunnel.TS_QUERY;
	this.mConfig["max_ttl"]			= NetFunnel.TS_MAX_TTL;
	this.mConfig["conn_timeout"]	= NetFunnel.TS_CONN_TIMEOUT;
	this.mConfig["conn_retry"]		= NetFunnel.TS_CONN_RETRY;
	this.mConfig["cookie_id"]		= NetFunnel.TS_COOKIE_ID;
	this.mConfig["cookie_time"]		= NetFunnel.TS_COOKIE_TIME;
	this.mConfig["cookie_domain"]	= NetFunnel.TS_COOKIE_DOMAIN;
	this.mConfig["showcnt_limit"]	= NetFunnel.TS_SHOWCNT_LIMIT;
	this.mConfig["showtime_limit"]	= NetFunnel.TS_SHOWTIME_LIMIT;
	this.mConfig["popup_top"]		= NetFunnel.TS_POPUP_TOP;
	this.mConfig["popup_left"]		= NetFunnel.TS_POPUP_LEFT;
	this.mConfig["skin_id"]			= NetFunnel.TS_SKIN_ID;
	this.mConfig["use_unfocus"]		= NetFunnel.TS_USE_UNFOCUS;
	this.mConfig["virt_wait"]		= NetFunnel.TS_VIRT_WAIT;
	this.mConfig["use_mobile_ui"]	= NetFunnel.TS_USE_MOBILE_UI;
	this.mConfig["mp_use"]			= NetFunnel.MP_USE;
	this.mConfig["use_frame_block"]	= NetFunnel.TS_USE_FRAME_BLOCK;
	this.mConfig["frame_block_list"]= NetFunnel.TS_FRAME_BLOCK_LIST;
	this.mConfig["use_pre_wait"]	= NetFunnel.TS_USE_PRE_WAIT;
	this.mConfig["popup_target"]	= NetFunnel.TS_POPUP_TARGET;
	this.mConfig["version_display"]	= NetFunnel.TS_VERSION_DISPLAY
	
    // Validate configs
    if(typeof oConfigs == "object") {
        for(var sConfig in oConfigs) {
            this.mConfig[sConfig] = oConfigs[sConfig];
        }
    }
            
   	NetFunnel.gShowcntLimit	= this.mConfig["showcnt_limit"];
   	NetFunnel.gShowtimeLimit= this.mConfig["showtime_limit"];
	NetFunnel.gPopupLeft	= this.mConfig["popup_left"];
   	NetFunnel.gPopupTop		= this.mConfig["popup_top"];
	NetFunnel.gPopupLeft	= this.mConfig["popup_left"];
	NetFunnel.gBlockList	= this.mConfig["block_list"];
	if(this.mConfig["skin_id"] == ""){
		NetFunnel.gSkinId		= NetFunnel.TS_SKIN_ID;	
	}else{
		NetFunnel.gSkinId		= this.mConfig["skin_id"];		
	}
	
	if ( typeof this.mConfig["use_unfocus"] != "boolean" ){
		if (typeof this.mConfig["use_unfocus"] == "string" && this.mConfig["use_unfocus"] == "true") {
			this.mConfig["use_unfocus"] = true;
		}else{
			this.mConfig["use_unfocus"] = false;
		}
	}
	NetFunnel.gUseUnfocus	= this.mConfig["use_unfocus"];
	
	if ( typeof this.mConfig["use_mobile_ui"] != "boolean" ){
		if (typeof this.mConfig["use_mobile_ui"] == "string" && this.mConfig["use_mobile_ui"] == "true") {
			this.mConfig["use_mobile_ui"] = true;
		}else{
			this.mConfig["use_mobile_ui"] = false;
		}
	}
	NetFunnel.gUseMobileUI	= this.mConfig["use_mobile_ui"];


	if ( typeof this.mConfig["use_frame_block"] != "boolean" ){
		if (typeof this.mConfig["use_frame_block"] == "string" && this.mConfig["use_frame_block"] == "true") {
			this.mConfig["use_frame_block"] = true;
		}else{
			this.mConfig["use_frame_block"] = false;
		}
	}

	if ( this.mConfig["use_frame_block"]  == true){
		//if(typeof this.mConfig["frame_block_list"] != "array" ){
		//	this.mConfig["frame_block_list"] = [];
		//}
		if(this.mConfig["frame_block_list"].length < 1){
			// Select All
			this.mConfig["frame_block_list"] = NetFunnel.Util.getFrameWindowList(this.mConfig["popup_target"]);
		}
	}else{
		this.mConfig["frame_block_list"] = [];
	}
	



	this.id				= 0;
	NetFunnel.TsClient._Objects[this.id] = this;
	NetFunnel.TsClient._Count = NetFunnel.TsClient._Count + 1;

	// Add Event Listener
	if(oCallbacks["onSuccess"])		{ this.addListener(this,"onSuccess",oCallbacks["onSuccess"]); }
	if(oCallbacks["onContinued"])	{ this.addListener(this,"onContinued",oCallbacks["onContinued"]); }
	if(oCallbacks["onError"])		{ this.addListener(this,"onError",oCallbacks["onError"]); }
	if(oCallbacks["onStop"])		{ this.addListener(this,"onStop",oCallbacks["onStop"]); }


	this.counter[NetFunnel.RTYPE_NONE]				= 0;
	this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER]	= 0;
	this.counter[NetFunnel.RTYPE_GET_TID]			= 0;
	this.counter[NetFunnel.RTYPE_CHK_ENTER]			= 0;
	this.counter[NetFunnel.RTYPE_ALIVE_NOTICE]		= 0;
	this.counter[NetFunnel.RTYPE_SET_COMPLETE]		= 0;
	this.counter[NetFunnel.RTYPE_INIT]				= 0;
	this.counter[NetFunnel.RTYPE_STOP]				= 0;


	this.connTimeout = function connTimeout(id)
	{
		if(this != NetFunnel.gControl){
			return connTimeout.apply(NetFunnel.gControl,arguments);
		}
		if(NetFunnel.gAlreadyProc != 0){
			return false;
		}
		this._resetScript();

		if(this.counter[this._mReqType] < this.mConfig["conn_retry"]){
			this._mStatus = NetFunnel.PS_TIMEOUT;
			this.counter[this._mReqType] += 1;
			switch(this._mReqType){
				case NetFunnel.RTYPE_GET_TID:
					this.getTicketID(this.user_id,this.user_tid,false);
					return true;
					break;
				case NetFunnel.RTYPE_CHK_ENTER:
					this.chkEnter(this.key,false);
					return true;
					break;
				case NetFunnel.RTYPE_GET_TID_CHK_ENTER:
					this.getTidChkEnter(this.user_id,this.user_tid,false);
					return true;
					break;
				case NetFunnel.RTYPE_ALIVE_NOTICE:
					this.aliveNotice(this.key,"","",false);
					return true;
					break;
				case NetFunnel.RTYPE_SET_COMPLETE:
					this.setComplete(this.key,"","",false);
					return true;
					break;
				default:
			}
		}
		NetFunnel.PopupUtil.hideWaitPopup();

		if(this._mReqType == NetFunnel.RTYPE_CHK_ENTER || this._mReqType == NetFunnel.RTYPE_GET_TID_CHK_ENTER ){
			NetFunnel.Cookie.set(this.mConfig["cookie_id"],"5002:200:key="+NetFunnel.CONN_TIMEOUT_KEY,1,this.mConfig["cookie_domain"]);
		}

		if ( NetFunnel.gAlreadyProc >= 1 ){
			return false;
		}

		this.fireEvent(null,this,'onError',{rtype:this._mReqType,code:NetFunnel.RET_E_CONN_TIMEOUT,data:{msg:"Connection Timeout"},next:this.next.success});
		this._mStatus = NetFunnel.PS_ERROR;
		return true;
	};
};

NetFunnel.connTimeout = function(id)
{
	try{
		setTimeout("NetFunnel.connTimeoutProc("+id+")",100);
	}catch(e){
	}
};

NetFunnel.connTimeoutProc = function(id)
{
	try{
		NetFunnel.gControl.connTimeout(id);
	}catch(e){
	}
};

 

NetFunnel.setComplete = function(id)
{
	try{
		var tRetVal = null;
		var tKey 	= NetFunnel.gControl.key;
		var tIp 	= NetFunnel.gControl.ip;
		var tPort 	= NetFunnel.gControl.port;

		if( typeof NetFunnel.gControl.retval == "object" ){
			tRetVal = NetFunnel.gControl.retval;
		}

		if(tRetVal && tRetVal.isKeyExist("key")){
			tKey = tRetVal.getValue("key");
		}
		if(tRetVal && tRetVal.isKeyExist("ip")){
			tIp = tRetVal.getValue("ip");
		}
		if(tRetVal && tRetVal.isKeyExist("port")){
			tPort = tRetVal.getValue("port");
		}

		NetFunnel.gControl.setComplete(tKey,tIp,tPort,true);
	}catch(e){
	}
};




//-----------------------------------------------------------------------------
// NetFunnelTsClient private variable
//-----------------------------------------------------------------------------
NetFunnel.TsClient._Count 				= 0;
NetFunnel.TsClient._Objects 			= new Object();

/**
 * NetFunnel.Event Class 상속
 */
NetFunnel.TsClient.prototype			= new NetFunnel.Event();

/**
 * Init Done flag
 */
NetFunnel.TsClient.prototype._initDone 	= false;



//-----------------------------------------------------------------------------
// NetFunnelTsClient public variable
//-----------------------------------------------------------------------------
/**
 * Object ID
 */
NetFunnel.TsClient.prototype.id 		= null;

/**
 * 설정정보

 */
NetFunnel.TsClient.prototype.mConfig	= null;

/**
 * TS 서버 접속을 위한 key
 */
NetFunnel.TsClient.prototype.key		= null;

/**
 * Script Object
 */
NetFunnel.TsClient.prototype.script		= null;

/**
 * Alarm Object
 */
NetFunnel.TsClient.prototype.alarm		= null;

/**
 * Alarm Object
 */
NetFunnel.TsClient.prototype._mReqType	= NetFunnel.RTYPE_NONE;

/**
 * Previous Mouse Position
 */
NetFunnel.TsClient.prototype._mMousePos	= 0;

/**
 * Action 이 없었던 누적 시간
 */
NetFunnel.TsClient.prototype._mNoActTime= 0;

/**
 * Process Status
 */
NetFunnel.TsClient.prototype._mStatus	= NetFunnel.PS_N_RUNNING;


NetFunnel.TsClient.prototype.counter	= new Object();

/**
 * 성공및 실패시 이동할 경로
 */
NetFunnel.TsClient.prototype.next		= {success:"",error:""};

//-----------------------------------------------------------------------------
// NetFunnel.TsClient Private member function
//-----------------------------------------------------------------------------
/**
 * 초기화
 *   - 객체를 생성한 후에 최초 1번 꼭 실행시켜 주어야 한다.
 *   - 초기화 성공여부는 isInitDone() 함수를 통해서 확인 활 수 있다.
 *
 * @memberOf NetFunnel.TsClient
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.init = function(){
	this._nCount++;
	this._initDone = true;
};

NetFunnel.TsClient.prototype.getConfig = function(key){
	return this.mConfig[key];
}

/**
 * 사용자의 Action 이 있는지 여부 확인
 *   - 마우스의 움직으로 확인한다.
 *
 * @memberOf NetFunnel.TsClient
 * @return {Boolean} Action여부.
 */
NetFunnel.TsClient.prototype._isNoAction = function(){
	if(this._mMousePos == NetFunnel.MouseX){
		return true;
	}
	this._mMousePos = NetFunnel.MouseX;
	return false;
};

/**
 * Connection Timeout 을 체크하기 위한 타이머를 Reset
 *
 * @memberOf NetFunnel.TsClient
 * @return {Null} 없음
 */
NetFunnel.TsClient.prototype._resetAlarm = function(){
	if(this.alarm != null){
		clearTimeout(this.alarm);
	}
	this.alarm = null;
};

/**
 * Continued 이벤트에 의한 재시도를 위한 타이머를 Reset
 *
 * @memberOf NetFunnel.TsClient
 * @return {Null} 없음
 */
NetFunnel.TsClient.prototype._resetRetryTimer = function(){
	if(this.retryTimer != null){
		clearTimeout(this.retryTimer);
	}
	this.retryTimer = null;
};

/**
 * Script Object를 초기화 한다.
 *
 * @memberOf NetFunnel.TsClient
 * @return {Null} 없음
 */
NetFunnel.TsClient.prototype._resetScript = function(){
	try{
		if(this.script && typeof this.script == "object" ){
			var pNode = this.script.parentNode;
			if(pNode && typeof pNode == "object" ){
				pNode.removeChild(this.script);
			}
		}
	}catch(e){
	}
	this.script = null;
};

/**
 * 사용자의 요청에 의한 결과 값을 Parsing 하고 알맞는 이벤트를 사용자에게
 * 돌려준다.
 *
 * @memberOf NetFunnel.TsClient
 * @return {Null} 없음
 */
NetFunnel.TsClient.prototype._showResult = function(){
	this._resetAlarm();
	if ( NetFunnel.gAlreadyProc == 1 && NetFunnel.gRtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER ){
		return;
	}
	NetFunnel.gAlreadyProc = 1;
	NetFunnel.PopupUtil.hideWaitPopup();
	this.retval = new NetFunnel.RetVal(this.result);
	
	// 받아온 값을 쿠키에 저장
	if(this.retval.getReqType() == NetFunnel.RTYPE_GET_TID_CHK_ENTER){
		this.retval.setReqType(NetFunnel.RTYPE_CHK_ENTER);	
	}

	if(NetFunnel.TS_DEBUG_MODE) NetFunnel.printDebugMsg("recv",this.result);

	NetFunnel.ttl = 0;
	this.counter[this._mReqType] = 0;
	switch(this.retval.getReqType()){
		case NetFunnel.RTYPE_GET_TID:
			this._showResultGetTicketID(this.retval);
			break;
		case NetFunnel.RTYPE_CHK_ENTER:
			this._showResultChkEnter(this.retval);
			break;
		case NetFunnel.RTYPE_ALIVE_NOTICE:
			this._showResultAliveNotice(this.retval);
			break;
		case NetFunnel.RTYPE_SET_COMPLETE:
			this._showResultSetComplete(this.retval);
			break;
		default:
			NetFunnel.Cookie.del(this.mConfig["cookie_id"]);
			this.fireEvent(null,this,'onError',
					{rtype:NetFunnel.RTYPE_NONE,code:this.retval.getRetCode(),data:this.retval.getParam(),next:this.next.error});
			this._mStatus = NetFunnel.PS_ERROR;
	}
};

NetFunnel.TsClient.prototype._showResultGetTicketID = function(retval){
	switch(retval.getRetCode()){
		case NetFunnel.RET_NORMAL:
			// Success Event
			NetFunnel.Cookie.set(this.mConfig["cookie_id"],exclude_ip(this.result),this.mConfig["cookie_time"],this.mConfig["cookie_domain"]);
			var tStorage     = new NetFunnel.Storage(2);
			tStorage.setItem(this.mConfig["cookie_id"],exclude_ip(this.result));
			this._mStatus = NetFunnel.PS_N_RUNNING;
			this.fireEvent(null,this,'onSuccess',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.success});
			break;
		default:
			// Fail Event
			NetFunnel.Cookie.del(this.mConfig["cookie_id"]);
			this._mStatus = NetFunnel.PS_ERROR;
			this.fireEvent(null,this,'onError',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.error});
			
	}
	return;
};

NetFunnel.TsClient.prototype._showResultChkEnter = function(retval){
	switch(retval.getRetCode()){
		case NetFunnel.RET_NORMAL:
			// Success Event
			NetFunnel.Cookie.set(this.mConfig["cookie_id"],exclude_ip(this.result),this.mConfig["cookie_time"],this.mConfig["cookie_domain"]);
			var tStorage     = new NetFunnel.Storage(2);
			tStorage.setItem(this.mConfig["cookie_id"],exclude_ip(this.result));
			this._mStatus = NetFunnel.PS_N_RUNNING;
			this.fireEvent(null,this,'onSuccess',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.success});
			break;
		case NetFunnel.RET_CONTINUE:
			// Continued Event
			this._mStatus = NetFunnel.PS_CONTINUE;

			// ReTry
			var ttl = retval.getNumber('ttl');
			if(ttl > this.mConfig["max_ttl"]){
				ttl = this.mConfig["max_ttl"];
				retval.setValue('ttl',ttl);
			}

			this.fireEvent(null,this,'onContinued',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.continued});
			NetFunnel.gAlreadyProc = 0;

			if(ttl > 0){
				if(this.retryTimer){
					clearTimeout(this.retryTimer);
				}
				NetFunnel.ttl = ttl;
				
				var self = this;
				this.retryTimer = setTimeout(function(){
					self.chkEnterCont(self.retval.getValue("key")); 
				}, ttl*1000);	
			}

			break;
		default:
			// Fail Event
			NetFunnel.Cookie.del(this.mConfig["cookie_id"]);
			this._mStatus = NetFunnel.PS_ERROR;
			this.fireEvent(null,this,'onError',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.error});
			
	}
	return;
};


NetFunnel.TsClient.prototype._showResultAliveNotice = function(retval){
	switch(retval.getRetCode()){
		case NetFunnel.RET_NORMAL:
			// Success Event
			this._mStatus = NetFunnel.PS_N_RUNNING;
			this.fireEvent(null,this,'onSuccess',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.success});
			break;
		case NetFunnel.RET_CONTINUE:
			// Continued Event
			this._mStatus = NetFunnel.PS_CONTINUE;
			if( this._mNoActTime > this.mConfig["no_action"]){
				this.fireEvent(null,this,'onError',
						{rtype:retval.getReqType(),code:NetFunnel.RET_E_NO_ACTION,data:retval.getParam(),next:this.next.error});
				this._mNoActTime = 0;
				this._mStatus = NetFunnel.PS_ERROR;
				break;
			}

			var ttl = retval.getNumber('ttl');
			if(ttl > this.mConfig["max_ttl"]){
				ttl = this.mConfig["max_ttl"];
				retval.setValue('ttl',ttl);
			}

			this.fireEvent(null,this,'onContinued',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.continued});
			NetFunnel.gAlreadyProc = 0;

			if(ttl > 0){
				if(this.retryTimer){
					clearTimeout(this.retryTimer);
				}
				if(this._isNoAction()){
					this._mNoActTime += ttl;
				}else{
					this._mNoActTime = 0;
				}

				var self = this;

				this.retryTimer = setTimeout(function (){
					self.aliveNoticeCont(self.retval.getValue("key"),self.retval.getValue("ip"),self.retval.getValue("port"),true)
				} ,ttl*1000);	 
			}

			break;
		default:
			// Fail Event
			if(retval.getRetCode() == NetFunnel.RET_E_KEY_EXPIRE){
				NetFunnel.Cookie.del(this.mConfig["cookie_id"]);
				var tStorage     = new NetFunnel.Storage(2);
				tStorage.removeItem(this.mConfig["cookie_id"]);
			}
			this._mStatus = NetFunnel.PS_ERROR;
			this.fireEvent(null,this,'onError',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.error});
			
	}
	return;
};

NetFunnel.TsClient.prototype._showResultSetComplete = function(retval){
	var tStorage     = new NetFunnel.Storage(2);
	tStorage.removeItem(this.mConfig["cookie_id"]);
	NetFunnel.Cookie.del(this.mConfig["cookie_id"]);

	switch(retval.getRetCode()){
		case NetFunnel.RET_NORMAL:
			// Success Event
			this._mStatus = NetFunnel.PS_N_RUNNING;
			this.fireEvent(null,this,'onSuccess',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.success});
			break;
		default:
			// Fail Event
			this._mStatus = NetFunnel.PS_ERROR;
			this.fireEvent(null,this,'onError',
					{rtype:retval.getReqType(),code:retval.getRetCode(),data:retval.getParam(),next:this.next.error});
	}
	return;
};




/**
 * 신규 접속을 위한 접속정보 초기화
 *
 * @memberOf NetFunnelTsClient
 * @param {Number} rtype 요청 타입
 * @return {Boolean} 초기화 성공여부
 */
NetFunnel.TsClient.prototype._connInit = function(rtype)
{
	this.result 		= null;
	this._mReqType		= rtype;
	this._resetAlarm();
	this._resetScript();
	this._resetRetryTimer();

	this.alarm = setTimeout("NetFunnel.connTimeout("+this.id+")", parseInt(this.mConfig["conn_timeout"])*1000);


	if(!this.mConfig["host"] || this.mConfig["host"] == ""){
		return false;
	}
	if(!this.mConfig["port"] || this.mConfig["port"] == ""){
		return false;
	}
	if(!this.mConfig["query"] || this.mConfig["query"] == ""){
		return false;
	}
	this._mStatus = NetFunnel.PS_RUNNING;
	return true;
};

/**
 * TS 서버로 요청 전송
 *
 * @memberOf NetFunnelTsClient
 * @param {String} url 요청 URL
 * @return {Boolean} 요청 성공여부
 */
NetFunnel.TsClient.prototype._sendRequest = function(url){
	// 1. Script 객체 생성
	this.script = document.createElement ("script");
	
	// 2. Script 객체에 URL 등록, Head에 Script 등록
	this.script.src = url;
	var head = document.getElementsByTagName("head").item(0);

	if(NetFunnel.TS_DEBUG_MODE) NetFunnel.printDebugMsg("send",url);
	head.appendChild(this.script);
	return true;
};

/**
 * 에러 전달
 *
 * @memberOf NetFunnelTsClient
 * @param {Number} eRType 요청 타입
 * @param {Number} eCode 결과값 코드
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype._sendError = function(eRType,eCode)
{		
	var tMsg = "";
	switch(eCode){
		case NetFunnel.RET_E_ARUNNING:
			tMsg = "Already running";
			break;
		case NetFunnel.RET_E_NOINIT:
			tMsg = "Uninitialized object";
			break;
		case NetFunnel.RET_E_SYSTEM:
		default:
			tMsg = "System error";
			
	}
	this.fireEvent(null,this,'onError',{rtype:eRType,code:eCode,data:{msg:tMsg},next:this.next.error});
};


//-----------------------------------------------------------------------------
// NetFunnel.TsClient public member function
//-----------------------------------------------------------------------------

/**
 * 명령 성공시 이동하게될 URL를 설정한다.
 *   - DefaultCallback 을 사용할때만 유효하며 Callback 함수를 지정했다면
 *     사용되지 않는다.
 *
 * @memberOf NetFunnelTsClient
 * @param {String} success 명령 성공시 이동할 URL
 * @param {String} error 명령 실패시 이동할 URL
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.setNext = function(next){
	if( typeof next == "object"){
		this.next 	= next;
	}else{
		try{
			this.next.success = undefined;
			this.next.continued = undefined;
			this.next.error = undefined;
			this.next.stop = undefined;
		}catch(e){
			this.next.success = window.undefined;
			this.next.continued = window.undefined;
			this.next.error = window.undefined;
			this.next.stop = window.undefined;	
		}
	}
};

/**
 * 실행중인 명령 멈춤 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.sendStop = function(first){
	if(NetFunnel.TS_BYPASS == true) { this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success}); return true; }

	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_STOP]=0; }

	this._resetAlarm();
	this._resetRetryTimer();
	this._resetScript();
	this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success});

	this._mStatus = NetFunnel.PS_N_RUNNING;
	return true;
};


/**
 * TicketID 요청 명령 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @param {String} user_id 사용자ID
 * @param {String} user_tid 사용자TID (서비스에 사용되는 Ticket에 대한 식별자)
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.getTicketID = function(user_id,user_tid,first){
	NetFunnel.gPrevWaitTime = -1;	
	if(NetFunnel.TS_BYPASS == true) {
		this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success});
		return true;
	}

	if(this.mConfig["use_unfocus"] == true){ NetFunnel.Util.delFocus(this.getConfig("popup_target"));}

	NetFunnel.gTotWait = -1;
	NetFunnel.retryData = null;
	var ret = (this.mConfig["mp_use"] == true)?NetFunnel.MProtect():0;
	if(ret != 0){

		// Virtual Wait alert!!
		this.fireEvent(null,this,'onContinued',
				{
					rtype:NetFunnel.RTYPE_CHK_ENTER,code:NetFunnel.RET_CONTINUE,data:
					{
						tps:1,
						eps:2,
						nwait:(NetFunnel.gShowcntLimit*2),
						mprotect:ret,
						ttl:10
					}
				}
			);

		// retry Command
		if(this.retryTimer){
			clearTimeout(this.retryTimer);
		}
		NetFunnel.retryData = {
			user_id:user_id,
			user_tid:user_tid,
			first:first
		};
		this.retryTimer = setTimeout("NetFunnel.retryFunction("+NetFunnel.RTYPE_GET_TID+")",this.mConfig["virt_wait"]);	
		return false;
	}

	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_GET_TID]=0; }

	// 0. 실행중인지 여부 확인
	if ( this._mStatus == NetFunnel.PS_RUNNING ) {
		this._sendError(NetFunnel.RTYPE_GET_TID,NetFunnel.RET_E_ARUNNING);
		return false;
	}

	this.user_id = user_id;
	this.user_tid = user_tid;


	// 2. URL 생성
	var url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/"+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_GET_TID+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_GET_TID+";";
	url += "&js=yes";
	url += "&uid="+user_id;
	url += "&utid="+user_tid;

	var tdate = new Date();
	url += "&"+tdate.getTime();

	// 1. 초기화
	if(!this._connInit(NetFunnel.RTYPE_GET_TID)){
		this._sendError(NetFunnel.RTYPE_GET_TID,NetFunnel.RET_E_NOINIT);
		return false;
	}

	this._sendRequest(url);

	return true;
};


/**
 * 진입 요청 명령 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @param {String} key getTicketID를 통해 전달받은 식별자
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.chkEnter = function(key,first){
	// 0. 실행중인지 여부 확인
	if(NetFunnel.TS_BYPASS == true) { this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success}); return true; }

	if ( this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
		this._sendError(NetFunnel.RTYPE_CHK_ENTER,NetFunnel.RET_E_ARUNNING);
		return false;
	}
	return this.chkEnterProc(key,first);
};

NetFunnel.TsClient.prototype.chkEnterCont = function(key,first){
	// 0. 실행중인지 여부 확인
	if ( this._mStatus == NetFunnel.PS_RUNNING ) {
		this._sendError(NetFunnel.RTYPE_CHK_ENTER,NetFunnel.RET_E_ARUNNING);
		return false;
	}
	return this.chkEnterProc(key,first);
};

NetFunnel.TsClient.prototype.chkEnterProc = function(key,first){
	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_CHK_ENTER]=0; }

	if(!key || key == ""){
		if(this.key){
			key = this.key;	
		}else{
			this._sendError(NetFunnel.RTYPE_CHK_ENTER,NetFunnel.RET_E_PARAM);
			return false;
		}
	}
	this.key = key;

	var url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/"+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_CHK_ENTER+"&key="+key+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_CHK_ENTER+";";
	if(NetFunnel.ttl > 0){
		url = url+"&ttl="+NetFunnel.ttl;
	}
	url += "&js=yes";
	var tdate = new Date();
	url += "&"+tdate.getTime();

	// 1. 초기화
	if(!this._connInit(NetFunnel.RTYPE_CHK_ENTER)){
		this._sendError(NetFunnel.RTYPE_CHK_ENTER,NetFunnel.RET_E_NOINIT);
		return false;
	}

	this._sendRequest(url);
	return true;
};

/**
 * ID발급 + 진입 요청 명령 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @param {String} user_id 사용자ID
 * @param {String} user_tid 사용자TID (서비스에 사용되는 Ticket에 대한 식별자)
 * @return {null} 없음.
 */
NetFunnel.retryData = null;
NetFunnel.retryFunction = function(type)
{
	if(typeof NetFunnel.retryData == "object"){
		var t = NetFunnel.retryData;
		if(type == NetFunnel.RTYPE_GET_TID){
			NetFunnel.gControl.getTicketID(t.user_id,t.user_tid,t.first);
		}else if(type == NetFunnel.RTYPE_GET_TID_CHK_ENTER){
			NetFunnel.gControl.getTidChkEnter(t.user_id,t.user_tid,t.first);
		}
	}
};
NetFunnel.TsClient.prototype.getTidChkEnter = function(user_id,user_tid,first){
	NetFunnel.gPrevWaitTime = -1;
	if(NetFunnel.TS_BYPASS == true) { this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success}); return true; }

	// 0. 실행중인지 여부 확인
	if ( this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
		this._sendError(NetFunnel.RTYPE_CHK_ENTER,NetFunnel.RET_E_ARUNNING);
		return false;
	}

	if(this.mConfig["use_unfocus"] == true){ NetFunnel.Util.delFocus(this.getConfig("popup_target"));}

	NetFunnel.gTotWait = -1;
	NetFunnel.retryData = null;
	var ret = (this.mConfig["mp_use"] == true)?NetFunnel.MProtect():0;
	if(ret == 0){
		// Debug code --------------------------------------------------------
		//var mmm = document.getElementById("debug_print");
		//mmm.innerHTML = "";
		// Debug code --------------------------------------------------------

		if(this.getConfig("use_pre_wait")){
			NetFunnel.PopupUtil.showWaitPopup();
		}
		return this.getTidChkEnterProc(user_id,user_tid,first);
	}else{
		// Debug code --------------------------------------------------------
		//var mmm = document.getElementById("debug_print");
		//mmm.innerHTML = ret+"";
		// Debug code --------------------------------------------------------

		// Virtual Wait alert!!
		this.fireEvent(null,this,'onContinued',
				{
					rtype:NetFunnel.RTYPE_CHK_ENTER,code:NetFunnel.RET_CONTINUE,data:
					{
						tps:1,
						eps:2,
						nwait:(NetFunnel.gShowcntLimit*2),
						mprotect:ret,
						ttl:10
					}
				}
			);

		// retry Command
		if(this.retryTimer){
			clearTimeout(this.retryTimer);
		}
		NetFunnel.retryData = {
			user_id:user_id,
			user_tid:user_tid,
			first:first
		};
		this.retryTimer = setTimeout("NetFunnel.retryFunction("+NetFunnel.RTYPE_GET_TID_CHK_ENTER+")",this.mConfig["virt_wait"]);	
	}
	return false;
};

NetFunnel.TsClient.prototype.getTidChkEnterProc = function(user_id,user_tid,first){
	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER]=0; }

	this.user_id = user_id;
	this.user_tid = user_tid;

	var url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/"+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_GET_TID_CHK_ENTER+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_GET_TID_CHK_ENTER+";";
	if(NetFunnel.ttl > 0){
		url = url+"&ttl="+NetFunnel.ttl;
	}
	url += "&js=yes";
	var tdate = new Date();
	url += "&"+tdate.getTime();
	url += "&uid="+user_id;
	url += "&utid="+user_tid;

	// 1. 초기화
	if(!this._connInit(NetFunnel.RTYPE_GET_TID_CHK_ENTER)){
		this._sendError(NetFunnel.RTYPE_GET_TID_CHK_ENTER,NetFunnel.RET_E_NOINIT);
		return false;
	}

	this._sendRequest(url);

	return true;
};


/**
 * Alive Notice 요청 명령 전송
 *  - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
 *    client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
 *    알려 주게 되며 flash client에서 자동으로 재전송하게 된다.
 *
 *   - Event
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @param {String} key chkEnter를 통해 전달받은 식별자
 * @param {String} ip TS서버 IP 정보
 * @param {Number} port TS서버 Port 정보
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.aliveNoticeProc = function(key,ip,port,first){
	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_ALIVE_NOTICE]=0; }

	if(!key || key == ""){
		if(this.key){
			key = this.key;	
		}else{
			this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE,NetFunnel.RET_E_PARAM);
			return false;
		}
	}
	this.key 	= key;
	this.ip 	= ip;
	this.port 	= port;

	var url = "";

	if(ip && ip!="" && port && port != ""){
		url = this.mConfig['proto']+"://"+ip+":"+port+"/";
	}else{
		url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/";
	}
	url = url+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_ALIVE_NOTICE+"&key="+key+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_GET_TID+";";
	url += "&js=yes";
	var tdate = new Date();
	url += "&"+tdate.getTime();

	// 1. 초기화
	if(!this._connInit(NetFunnel.RTYPE_ALIVE_NOTICE)){
		this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE,NetFunnel.RET_E_NOINIT);
		return false;
	}

	this._sendRequest(url);
	return true;

};

NetFunnel.TsClient.prototype.aliveNotice = function(key,ip,port,first){
	// 0. 실행중인지 여부 확인
	if(NetFunnel.TS_BYPASS == true) { this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success}); return true; }
	if ( this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE ) {
		this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE,NetFunnel.RET_E_ARUNNING);
		return false;
	}
	return this.aliveNoticeProc(key,ip,port,first);
};

NetFunnel.TsClient.prototype.aliveNoticeCont = function(key,ip,port,first){
	// 0. 실행중인지 여부 확인
	if ( this._mStatus == NetFunnel.PS_RUNNING ) {
		this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE,NetFunnel.RET_E_ARUNNING);
		return false;
	}
	return this.aliveNoticeProc(key,ip,port,first);
};

/**
 * 완료 요청 명령 전송
 *   - 모든 프로세스가 종료 되었을때 호출 한다.
 *   - 완료 후 이명령을 호출하지 않으면 시스템의 가용성이 저하되며, 정확한 통계정보를 얻을 수 없다.
 *
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @memberOf NetFunnelTsClient
 * @param {String} key chkEnter를 통해 전달받은 식별자
 * @param {String} ip TS서버 IP 정보
 * @param {Number} port TS서버 Port 정보
 * @return {null} 없음.
 */
NetFunnel.TsClient.prototype.setComplete = function(key,ip,port,first){
	var Storage 	= new NetFunnel.Storage();
	Storage.setItem("NFMPT.reqCnt","0");

	if(NetFunnel.TS_BYPASS == true) { this.fireEvent(null,this,'onSuccess',{rtype:this._mReqType,code:NetFunnel.RET_NORMAL,data:{},next:this.next.success}); return true; }

	if(first == 'undefined'){ first = true; }
	if(first){ this.counter[NetFunnel.RTYPE_SET_COMPLETE]=0; }

	// 0. 실행중인지 여부 확인
	if ( this._mStatus == NetFunnel.PS_RUNNING ) {
		this._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_ARUNNING);
		return false;
	}

	if(!key || key == ""){
		if(this.key){
			key = this.key;	
		}else{
			this._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_PARAM);
			return false;
		}
	}
	this.key 	= key;
	this.ip 	= ip;
	this.port 	= port;

	if(key == NetFunnel.CONN_TIMEOUT_KEY){
		var retval = new NetFunnel.RetVal(NetFunnel.RTYPE_SET_COMPLETE+':'+NetFunnel.RET_NORMAL+":utime=1");
		this._showResultSetComplete(retval);
		return true;
	}

	var url="";

	if(ip && ip!="" && port && port != ""){
		url = this.mConfig['proto']+"://"+ip+":"+port+"/";
	}else{
		url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/";
	}
	url = url+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_SET_COMPLETE+"&key="+key+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_SET_COMPLETE+";";
	url += "&js=yes";
	var tdate = new Date();
	url += "&"+tdate.getTime();

	// 1. 초기화
	if(!this._connInit(NetFunnel.RTYPE_SET_COMPLETE)){
		this._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_NOINIT);
		return false;
	}


	this._sendRequest(url);
	return true;
};

/**
 * NetFunnel 쿠키 존재 여부
 *
 * @memberOf NetFunnelTsClient
 * @return {boolean} 쿠키존재 여부
 */
NetFunnel.TsClient.prototype.cookieExist = function()
{
	var result = NetFunnel.Cookie.get(this.mConfig["cookie_id"]);
	if(result == ""){
		return false;
	}

	var retval = new NetFunnel.RetVal(result);
	var key = retval.getValue("key");
	if(!key){
		NetFunnel.Cookie.del(this.mConfig["cookie_id"]);
		var tStorage     = new NetFunnel.Storage(2);
		tStorage.removeItem(this.mConfig["cookie_id"]);
		return false;
	}
	return true;
};

/**
 * NetFunnel 구동중 여부
 *
 * @memberOf NetFunnelTsClient
 * @return {boolean} 구동중 여부
 */
NetFunnel.TsClient.prototype.isRunning = function()
{
	if ( this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE ) {
		return true;
	}
	return false;
};



/**
 * 초기화 요청
 *
 *  - CallBack
 *		* onSuccess   : 성공시 호출되는 함수
 *		* onContinued : ttl 이 전달된 경우 호출되는 함수 ( 호출후에 ttl 만큼 sleep 한다. )
 *		* onError     : 에러 발생시 호출되는 함수
 *
 *
 * @param {Object|String} oFlash Flash Object에 대한 이름이나 Object 객체
 * @param {Object} oConfigs 설정정보
 * @param {Object} oCallbacks 이벤트에 대한 Callback 함수 정의
 * @return {Boolean} 객체생성 성공 여부
 */
function NetFunnel_init(oFlash,oConfigs,oCallbacks){ 
	'use strict';
	//try{
		if(NetFunnel.gControl){
			NetFunnel.gControl._resetScript();
			NetFunnel.gControl = null;
		}
		
		if(typeof oCallbacks == "undefined"){
			oCallbacks = NetFunnel.DefaultCallback;
		}else{
			if(!oCallbacks["onSuccess"]) {
				 oCallbacks["onSuccess"] = NetFunnel.DefaultCallback["onSuccess"];
				  }
			if(!oCallbacks["onContinued"]) {
				 oCallbacks["onContinued"] = NetFunnel.DefaultCallback["onContinued"];
				  }
			if(!oCallbacks["onError"]) {
				 oCallbacks["onError"] = NetFunnel.DefaultCallback["onError"];
				 }
			if(!oCallbacks["onStop"]) {
				 oCallbacks["onStop"] = NetFunnel.DefaultCallback["onStop"];
				 }
		}

		NetFunnel.gControl = new NetFunnel.TsClient(oConfigs,oCallbacks);
		return true;
	//}catch(err){
	//	NetFunnel.gControl = null;
	//	return false;
	//}
}

/**
 * 실행중인 명령 멈춤 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @return {boolean} 성공여부
 */
function NetFunnel_sendStop(next){
	'use strict';
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }
		NetFunnel.gControl.setNext(next);
		NetFunnel.gControl.sendStop();
		return true;
	}catch(err){
		return false;
	}
}

/**
 * TicketID 요청 명령 전송
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @param {String} user_id 사용자 아이디
 * @param {String} user_tid 사용자 ticket 아이디
 * @return {boolean} 성공여부
 */
function NetFunnel_getTicketID(next,user_id,user_tid){
	'use strict';
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }

		NetFunnel.gAlreadyProc = 0;

		NetFunnel.gControl.setNext(next);
		NetFunnel.gControl.getTicketID(user_id,user_tid);
		return true;
	}catch(err){
		return false;
	}
}

/**
 * 진입 요청 명령 전송
 *   - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
 *     client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
 *     알려 주게 되며 flash client에서 자동으로 재전송하게 된다.
 *
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @param {Object} data 접속 Data (Optional)
 * @return {boolean} 성공여부
 */
function NetFunnel_chkEnter(next){
	'use strict';
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }

		var key;
		if(typeof data != "undefined" && data.constructor == Object){
			key = data["key"];
			if(!key){ return false; }
		}else{
			// Cookie 에서 값을 가져온다.
			var result = NetFunnel.Cookie.get(NetFunnel.gControl.mConfig["cookie_id"]);
			if(result == ""){
				return false;
			}

			var retval = new NetFunnel.RetVal(result);
			key = retval.getValue("key");
            if(!key){
                NetFunnel.Cookie.del(NetFunnel.gControl.mConfig["cookie_id"]);
				var tStorage     = new NetFunnel.Storage(2);
				tStorage.removeItem(this.mConfig["cookie_id"]);
                return false;
            }
		}

		NetFunnel.gControl.setNext(next);
		NetFunnel.gControl.chkEnter(key);

		return true;
	}catch(err){
		return false;
	}
}

/**
 * 발급요청 + 진입 요청 명령 전송
 *   - Key 발급요청과 chkEnter 요청을 동시에 수행한다.
 *   - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
 *     client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
 *     알려 주게 되며 client에서 자동으로 재전송하게 된다.
 *
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @param {String} user_id 사용자 아이디
 * @param {String} user_tid 사용자 ticket 아이디
 * @return {boolean} 성공여부
 */
function NetFunnel_getTidChkEnter(next,user_id,user_tid){
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }

		NetFunnel.gAlreadyProc = 0;

		NetFunnel.gControl.setNext(next);
		NetFunnel.gControl.getTidChkEnter(user_id,user_tid);
		return true;
	}catch(err){
		return false;
	}
}


/**
 * Alive Notice 요청 명령 전송
 *   - Event
 *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @param {Object} data 접속 Data (Optional)
 * @return {boolean} 성공여부
 */
function NetFunnel_aliveNotice(next,data){
	'use strict';
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }

		NetFunnel.gAlreadyProc = 0;		

		var key = "";
		var ip = "";
		var port = "";

		if(typeof data != "undefined" && data.constructor == Object){
			key = data["key"];
			if(!key){ return false; }
			ip = data["ip"];
			port = data["port"];
		}else{
			// Cookie 에서 값을 가져온다.
			var result = NetFunnel.Cookie.get(NetFunnel.gControl.mConfig["cookie_id"]);
			if(result == ""){
				return false;
			}

			var retval = new NetFunnel.RetVal(result);
			key = retval.getValue("key");
            if(!key){
                NetFunnel.Cookie.del(NetFunnel.gControl.mConfig["cookie_id"]);
				var tStorage     = new NetFunnel.Storage(2);
				tStorage.removeItem(this.mConfig["cookie_id"]);
                return false;
            }
			ip = retval.getValue("ip");
			port = retval.getValue("port");
		}

		NetFunnel.gControl.setNext(next);
		NetFunnel.gControl.aliveNotice(key,ip,port);
		return true;
	}catch(err){
		return false;
	}
}

/**
 * 완료 요청 명령 전송
 *   - 모든 프로세스가 종료 되었을때 호출 한다.
 *   - 완료 후 이명령을 호출하지 않으면 시스템의 가용성이 저하되며, 정확한 통계정보를 얻을 수 없다.
 *
 *   - Event
 *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
 *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
 *
 * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
 * @param {Object} data 접속 Data (Optional)
 * @return {boolean} 성공여부
 */
function NetFunnel_setComplete(next,data){
	'use strict';
	try{
		if(!NetFunnel.gControl){ NetFunnel_init();  }

		NetFunnel.gAlreadyProc = 0;

		NetFunnel.gControl.setNext(next);
		
		var key = "";
		var ip = "";
		var port = "";

		if(typeof data != "undefined" && data.constructor == Object){
			key = data["key"];
			if(!key){
				// call a ErrorCallback
				NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_SYSTEM);
				return false;
			}
			ip = data["ip"];
			port = data["port"];
		}else{
			// Cookie 에서 값을 가져온다.
			var result = NetFunnel.Cookie.get(NetFunnel.gControl.mConfig["cookie_id"]);

			var tStorage     = new NetFunnel.Storage(2);
			var result2 = tStorage.getItem(NetFunnel.gControl.mConfig["cookie_id"]);
			if(result2 && result != result2){
				result = result2;
			}

			if(result == ""){
				NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_SYSTEM);
				return false;
			}else{
				var retval = new NetFunnel.RetVal(result);
				key = retval.getValue("key");
				if(!key){
					NetFunnel.Cookie.del(NetFunnel.gControl.mConfig["cookie_id"]);
					var tStorage     = new NetFunnel.Storage(2);
					tStorage.removeItem(this.mConfig["cookie_id"]);
					// call a ErrorCallback
					NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE,NetFunnel.RET_E_SYSTEM);
					return false;
				}
				ip = retval.getValue("ip");
				port = retval.getValue("port");
			}
		}

		NetFunnel.gControl.setComplete(key,ip,port);
		return true;
	}catch(err){
		return false;
	}
}

/**
 * NetFunnel 쿠키 존재 여부
 *
 * @return {boolean} 쿠키존재 여부
 */
function NetFunnel_cookieExist(){
	if(!NetFunnel.gControl){ return false; }
	return NetFunnel.gControl.cookieExist();
}

/**
 * NetFunnel 구동중 여부
 *
 * @return {boolean} 구동중 여부
 */
function NetFunnel_isRunning(){
	if(!NetFunnel.gControl){ return false; }
	return NetFunnel.gControl.isRunning();
}

/**
 * NetFunnel IFRAME 사용 대기창 호출
*/

function NetFunnel_init_frame(oExecFrame,oConfigs,oCallbacks){
	NetFunnel._oFrame = null;
	
	if(typeof oExecFrame != "object" || oExecFrame == null){
  	oExecFrame = this;
  }

	NetFunnel._oFrame = oExecFrame;
	return NetFunnel._oFrame.NetFunnel_init(this,oConfigs,oCallbacks);
}

function NetFunnel_getTidChkEnter_frame(next,user_id,user_tid){
	if(NetFunnel._oFrame == null) return false;
	NetFunnel._oFrame.NetFunnel_getTidChkEnter(next,user_id,user_tid);
}



/**
 * NetFunnel EasyInterface
 */

/**
 * NetFunnel_goForm
 *   - NetFunnel 리소스 사용요청 후 입력된 form을 Submit 시켜준다.
 *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
 *
 * @param {Object} oConfig 설정정보
 * @param {Object|String} form Submit될 form의 객채나 객채의ID
 * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
 * @return {boolean} 항상 false를 반환한다.
 */
function NetFunnel_goForm(oConfig,form,stop)
{
	'use strict';
	var oForm = null;
	if( typeof form == "string" ){
		oForm = document.getElementById(form);
		if(typeof oForm != "object" || oForm == null){
			var tForm = document.getElementsByName(form);
			oForm = tForm[0];
			if(typeof oForm != "object" || oForm == null){
				alert("[NetFUNNEL] Invalid input form"); return false;
			}
		}
	}else if( typeof form == "object" ){
		oForm = form;
	}else{
		alert("[NetFUNNEL] Invalid input form"); return false;
	}

	if( typeof stop != "function" ){ stop = function(ev,ret){ return false; }; }

	NetFunnel_init(null,oConfig);
	NetFunnel_getTidChkEnter({
		success:function(ev,ret){ if(oForm != null){ oForm.submit(); } },
		error:function(ev,ret){	if(oForm != null){ oForm.submit(); } },
		stop:stop
	});
	return false;
}

/**
 * NetFunnel_goUrl
 *   - NetFunnel 리소스 사용요청 후 입력된 url로 이동시켜준다.
 *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
 *
 * @param {Object} oConfig 설정정보
 * @param {String} url NetFunnel 요청 후 이동할 경로
 * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
 * @return {boolean} 항상 false를 반환한다.
 */
function NetFunnel_goUrl(oConfig,url,stop)
{
	'use strict';
	if( typeof url != "string" ){ alert("[NetFUNNEL] Invalid input url"); return false; }
	if( typeof stop != "function" ){ stop = function(ev,ret){ return false; }; }
	NetFunnel_init(null,oConfig);
	NetFunnel_getTidChkEnter({success:url,error:url,stop:stop});
	return false;
}

/**
 * NetFunnel_goFunc
 *   - NetFunnel 리소스 사용요청 후 입력된 func을 실행시켜준다.
 *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
 *
 * @param {Object} oConfig 설정정보
 * @param {Function} func NetFunnel 요청 후 이동할 경로
 * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
 * @return {boolean} 항상 false를 반환한다.
 */
function NetFunnel_goFunc(oConfig,func,stop)
{
	'use strict';
	if( typeof func != "function" ){ alert("[NetFUNNEL] Invalid input function"); return false; }
	if( typeof stop != "function" ){ stop = function(ev,ret){ return false; }; }
	NetFunnel_init(null,oConfig);
	NetFunnel_getTidChkEnter({success:func,error:func,stop:stop});
	return false;
}

/**
 * NetFunnel_goComplete
 *   - NetFunnel 리소스 사용 완료요청 후 입력된 func을 실행시켜준다.
 *
 * @param {Object} oConfig 설정정보
 * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
 * @return {boolean} 항상 false를 반환한다.
 */
function NetFunnel_goComplete(oConfig,func)
{
	'use strict';
	if( typeof func != "function" ){ func = function(ev,ret){ return false; }; }
	NetFunnel_init(null,oConfig);
	NetFunnel_setComplete({success:func,error:func});
	return false;
}

/**
 * NetFunnel_goAliveNotice
 *   - NetFunnel 리소스 사용이 계속됨을 알려준다.
 *
 * @param {Object} oConfig 설정정보
 * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
 * @return {boolean} 항상 false를 반환한다.
 */
function NetFunnel_goAliveNotice(oConfig,func)
{
    'use strict';
    if( typeof func != "function" ){ func = function(ev,ret){ return false; }; }
    NetFunnel_init(null,oConfig);
    NetFunnel_aliveNotice({success:func,error:func});
    return false;
}


/**
 * Auto setComplete
 */
if(NetFunnel.TS_AUTO_COMPLETE == true){ NetFunnel_goComplete(); }
