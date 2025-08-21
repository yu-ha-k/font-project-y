var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );
var isIphoneApp = false;
if( ios && !standalone && !safari ) { isIphoneApp = true; } 

window._isRealApp = true;

console.log("IS IPhone App :: ", isIphoneApp);


/**
 * Android | IPhone App의 경우
 */
if (window.NativeCall || isIphoneApp) {
	if (!window['_app']) window['_app'] = {
		 _cbks		: {
		 },service	: function(svc, input, callback, flag, isArr) {
			try {
				nativeBridge.exec(		function(dat) {		// on success
//										 alert(dat);
										if (!dat || dat == "")	dat = "{}";
										console.log("App result :: ", dat);
										
										var ddd = dat;
										// alert("0 : 1" + JSON.parse(dat)['_iweb_key'][0]);
										var tmpDat = JSON.parse(dat);
										
										//signWithCertificate 리던값 체크
										if(svc == "wizvera"){
											if(tmpDat.signed_msg == "cancel"){
												return false; 
											}
											else{
												callback(JSON.parse(dat));
											}
										}
										else{
											callback(JSON.parse(dat));
										}
										
									},	function(dat) {		// on error
										if (!dat || dat == "")	dat = "{}";
										
										//alert("타 시스템 연결중 오류가 발생 하였습니다. \n잠시 후 다시 시도해 주십시오.");
										
										console.log("App result Error :: ", dat);
										// jnut.ajaxOption()['onError'](result['HEAD']);
											
									}
								, svc									// svc
								, flag ? isArr? input : [input] : [JSON.stringify(input)]
								// , [input]
								// , [JSON.stringify(input)]								// input
								);
			} catch(error) {
				console.log("==================================================>", error);
			}
		 },'createFnNm'	:	function() {
		    function _p8(s) {
		    	function secureRandom(wordCount){
		    	    var randomWords;
		    	  
		    	    randomWords = new Int32Array(wordCount);
		    	    window.crypto.getRandomValues(randomWords);

		    	    var result = randomWords[0] * Math.pow(2, -31);
		    	    result = Math.abs(result);
		    	    
		    	    return result;
		    	}
		    	
		        var		p = (secureRandom(1).toString(16)+"000000000").substr(2,8);
		        return	s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p ;
		    }
		    return "fn"+_p8() + _p8(true) + _p8(true) + _p8();
		},'backKey' : function(callback) {
			this.bcbk = callback;
		},'parent_close' : function(callback) {
			this.prntclose = callback;
		}
	};

	window.uf_back = function(dat) {
		(window._app.bcbk && window._app.bcbk());
	}
	
	
	window.uf_parent_webview_close = function(dat) {
		(window._app.prntclose && window._app.prntclose());
	}
	

	/**
	 * Android 의 경우 숨김처리.
	 */
	var style	= document.createElement('style');
	style.type	='text/css';
	var custom	= ".hideAndApp {display:none !important;}";
	if (style.styleSheet)	style.styleSheet.cssText=custom;
	else					style.appendChild(document.createTextNode(custom));
	document.getElementsByTagName('head')[0].appendChild(style);
}


if (!window._app) {
	var mapping = {
			 "CERT_LIST"	:"/svc/app/app_0001_01"	
			,"GET_CERT"		:"/svc/app/app_0001_02"
			,"EXIT"			:function(input, callback) {
			},"NOTI":function(input, callback) {
				callback({"NOTI_YN":"Y"});
			},"VERSION":function(input, callback) {
				callback({"SYSDV":"D", "VERSION":"D-123123"});
			},"OPEN_BROWSER":function(input, callback) {
			}, "alphaBriefingToDetailView" : function(input, callback) {
				console.log(input);
				location.href="/"+input["url"];
			}, "exit" : function(input, callback) {
				location.href="/mac/dash/dash_0001_01.html"
			} 
	};
	
	window['_app'] = {
			 _cbks		: {
			 },service	: function(svc, input, callback,flag) {
				 try {
					 if (mapping[svc]) {
						 mapping[svc](input, callback);
					 } else {
						callback({});
					 }
					} catch(error) {
						console.log(error);
					}
			 },'backKey' : function(callback) {
				 window.evtBackkey = callback;
//				$(document).bind("backbutton", function (event, data) {
//					event.preventDefault();
//					callback(); 
//				});
				
//				 $(document).on('keydown', function(event) {
//					 if (event.keyCode == 8) { event.preventDefault(); callback(); }
//				 });
			},'parent_close' : function(callback) {
				this.prntclose = callback;
			}
		};

	/**
	 * back button에 대한 이벤트 처리 추가.
	 */
	$(function() {
		window.history.pushState({page: 1}, "", "");
		$(window).on('popstate', function (e) {
			if(window.evtBackkey) {
				var ret = window.evtBackkey();
				console.log(ret);
				if (ret != "exit") window.history.pushState({page: 1}, "", "");
			}
		});
	});


	
	/**
	 * windows App의 경우 cursor처리 css가 추가된다.
	 */
	var style	= document.createElement('style');
	style.type	='text/css';
	var custom	= "[data-jns],.modal-close {cursor:pointer;} .hidewinApp {display:none !important;}";
	if (style.styleSheet)	style.styleSheet.cssText=custom;
	else					style.appendChild(document.createTextNode(custom));
	document.getElementsByTagName('head')[0].appendChild(style);
	
}

