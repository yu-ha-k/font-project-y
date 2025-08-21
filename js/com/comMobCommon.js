$.nativeCall = function(action,params) {
	if(typeof params == 'undefined'){
		params = [];
	}
	var dfd = $.Deferred();
	nativeBridge.exec(
		function(w){
			var result;
			try{
				result = JSON.parse(w);

				console.log("nativeBridge=>success");
			}catch(e){
				console.log("nativeBridge=>success=>parseJSON failed");
				result = w;
			}

			dfd.resolve(result);
		},
		function(e){
			dfd.reject(e);
		},
		action,
		params
	);
	return dfd.promise();
}

function uf_login(){
	$.nativeCall('login').done(function(){
		location.reload();
	});
}

function pluginCommon($jq) {
	//TO-BE로 구현 필요
}

var _mobStringUtil = function(){
	/**
	 * Left 빈자리 만큼 str 을 붙인다.
	 * @param src :Right에 붙을 원본 데이터
	 * @param len :str붙힐 데이터 길이
	 * @param str :대상 데이터
	 * @returns : str과 src가 붙은 데이터
	 * @예제 : MobStringUtil.lpad(src, len, str)
	 */
	 this.lpad = function(src, len, str){
	    var retStr = "";
	    var padCnt = Number(len) - String(src).length;
	    for(var i=0;i<padCnt;i++) retStr += String(str);
	    return retStr+src;
	},
	/**
	 * 데이터값 변경[정규식]
	 * @param strValue1 : 변경 원본 값
	 * @param strValue2 : 변경 후 값
	 * @예제 : "TESTAAA".MobStringUtil.replaceAll("AAA", "BBB")
	 */
	this.replaceAll = function (strValue1, strValue2) {
	    var strTemp = this;
	    strTemp = strTemp.replace(new RegExp(strValue1, "g"), strValue2);
	    return strTemp;
	},

	/**
	 * 한글 2byte, 영문 1byte로 계산하여 문자열의 byte길이를 return 한다.
	 * @param value : 계산할 string Value
	 * @return nbyte : byte 길이
	 */
	this.getByte = function(strValue){

		var nbytes = 0;

		    for (i=0; i<strValue.length; i++) {
		        var ch = strValue.charAt(i);

		        if(escape(ch).length > 4) {
		            nbytes += 2;
		        } else if (ch == '\n') {
		            if (strValue.charAt(i-1) != '\r') {
		                nbytes += 1;
		            }
		        } else if (ch == '<' || ch == '>') {
		            nbytes += 4;
		        } else {
		            nbytes += 1;
		        }
		    }
		    return nbytes;
	},

	/**
	 * 문자열을 전각문자열로 변환 ( 문자열의 반각문자를 전각문자로 변환)
	 */
	this.convert2ByteString = function(halfString){
		// 숫자는 전각처리 제외
		/*		if(numfullchar == "false") {
	        if(this.isNotKor(halfStr)){
	            return halfString;
	        }
	    }*/
	    var x_2byteString = ""; /* 컨버트된 문자 */
	    var isBeforeSpace = false;
	    for(i=0;i < halfString.length;i++) {
	        var c = halfString.charCodeAt(i);
	        if(32 <= c && c <= 126) { /* 전각으로 변환될수 있는 문자의 범위 */
	            if(c == 32) { /* 스페이스인경우 ascii 코드 32 */
	                /* 아래와 같이 변환시 깨짐. */
	                /* x_2byteString = x_2byteString + unescape("%uFFFC"); */
	                if(isBeforeSpace) { /*스페이스가 연속으로 2개 들어왔을경우 스페이스 하나로 처리하기 위함..*/
	                    x_2byteString = x_2byteString + "";
	                    isBeforeSpace = false;
	                } else {
	                    x_2byteString = x_2byteString + unescape("%u"+this.decToHex(12288));
	                    isBeforeSpace = true;
	                }
	            } else {
	                x_2byteString = x_2byteString + unescape("%u"+this.decToHex(c+65248));
	                isBeforeSpace = false;
	            }
	        }else{
	            x_2byteString = x_2byteString + halfString.charAt(i);
	            isBeforeSpace = false;
	        }
	    }
	    return  x_2byteString;
	},

	/**
	 * 반각문자를 전각문자로 변환
	 * @param x_char : 반각문자
	 * @retrun x_2byteChar : 전각문자
	 */
	this.convert2ByteChar = function(x_char) {
	    var x_2byteChar = ""; /* 컨버트된 문자 */
	    var c = x_char.charCodeAt(0);
	    if(32 <= c && c <= 126) { /* 전각으로 변환될수 있는 문자의 범위 */
	        if(c == 32) { /* 스페이스인경우 ascii 코드 32 */
	            /* 아래와 같이 변환시 깨짐. */
	            /* x_2byteChar = unescape("%uFFFC"); */
	            x_2byteChar = unescape("%u"+this.decToHex(12288));
	        } else {
	            x_2byteChar = unescape("%u"+this.decToHex(c+65248));
	        }
	    }
	    return  x_2byteChar;
	},

	this.decToHex = function(dec){
		return dec.toString(16);
	};

};

var _mobDate = function(){

	/**
	 * 오늘로 부터 입력된 년월일을 계산하여 "yyyymmdd"로 리턴
	 *
	 * @param Number :년
	 * @param Number :월
	 * @param Number :일
	 * @param setday :기준년월일
	 * @returns : yyyymmdd
	 * @예제 : MobDate.getBoundDate( 1, 0, 0); // 1년후
	 * @예제 : MobDate.getBoundDate(-1, 0, 0); // 1년전
	 * @예제 : MobDate.getBoundDate( 0, 1, 0); // 1달후
	 * @예제 : MobDate.getBoundDate( 0, -1, 0); // 1달전
	 * @예제 : MobDate.getBoundDate( 0, 0, 1); // 1일후
	 * @예제 : MobDate.getBoundDate( 0, 0, -1,); // 1일전
	 */
	this.getBoundDate = function(yy, mm, dd, setday){
		//var today = cf_getToday();
		var today = g_getDate("yyyymmdd");
		if(setday!=null && setday!=undefined && setday!=""){
			today = setday;
		}

	    var date = new Date(today.substring(0,4),Number(today.substring(4,6))-1,today.substring(6,8));
	    t_yy = MobStringUtil.lpad(new String(date.getFullYear()),4,'0');
	    t_mm = MobStringUtil.lpad(new String(date.getMonth()+1),2,'0');
	    t_dd = MobStringUtil.lpad(new String(date.getDate()),2,'0');

	    yy = Number(yy);
	    mm = Number(mm);
	    dd = Number(dd);
	    if ( yy != 0 ){
	        from=date.getFullYear()+yy;
	        date.setYear(from);

	        /* 기존 소스는 일에 +1일 해주었음 */
	        // from=date.getDate()+1;
	        // date.setDate(from);
	    }
	    if ( mm != 0 ){
	        var lastDate = "";
	        var day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	        for(var i=0; i<12; i++){
	            day.setMonth(i, 1);// modified on 2009.10.26
	            if(date.getMonth()==day.getMonth()){
	                lastDate = this.getLastDay(day.getFullYear(), (day.getMonth() + 1), day.getDate());
	            }
	        }
	        if(date.getDate() ==lastDate){
	            t_yy = date.getFullYear();
	            t_mm = (date.getMonth());
	            t_dd = date.getDate();

	            t_mm = t_mm+mm;

	            if(t_mm>12){
	                t_yy = t_yy+1;
	                t_mm = t_mm-12;
	            }else if(t_mm<0){
	                t_yy = t_yy-1;
	                t_mm = t_mm+12;
	            }else{
	                t_yy = t_yy;
	            }
	            var lastDate2 = "";

	            var day2 = new Date(t_yy,t_mm, 1);
	            for(var i=0; i<12; i++){
	              day2.setMonth(i, 1);// modified on 2009.10.26
	                if(i==(t_mm)){
	                    lastDate2 = this.getLastDay(day2.getFullYear(), (day2.getMonth() + 1), day2.getDate());
	                }
	            }
	            t_dd = lastDate2;
	            date = new Date(t_yy, t_mm, lastDate2);

	        }else{
	            from=date.getMonth()+mm;
	            date.setMonth(from);
	        }
	        /* 기존 소스는 일에 +1일 해주었음 */
	        // from=date.getDate()+1;
	        // date.setDate(from);
	    }
	    if ( dd != 0 ){
	        from=date.getDate()+dd;
	        date.setDate(from);
	    }
	    return MobStringUtil.lpad(new String(date.getFullYear()),4,'0') + MobStringUtil.lpad(new String(date.getMonth()+1),2,'0') + MobStringUtil.lpad(new String(date.getDate()),2,'0');
	},

	/**
	 * 유효하는(존재하는) Date 인지 체크
	 * @param strDate :검증할 string형식의 날짜(날짜형식"20090101") yyyymmdd
	 * @returns : true, false
	 * @example : if (!MobDate.isValidDate(strDate)) alert("올바른 날짜가 아닙니다.");
	 */
	this.isValidDate = function (strDate){
		var year = "";
		var month = "";
		var day = "";
		if(strDate == "") return true;
		if(strDate.length == 8){
		    year  = strDate.substring(0,4);
		    month = strDate.substring(4,6);
		    day   = strDate.substring(6,8);
		    if (parseInt(year,10) >= 1900  && this.isValidMonth(month) && this.isValidDay(year,month,day) ) {
		        return true;
		    }
		}else if(strDate.length == 6){
			 year  = strDate.substring(0,4);
			 month = strDate.substring(4,6);
			 if (parseInt(year,10) >= 1900  && this.isValidMonth(month)) {
			        return true;
			 }
		}
	    return false;
	},

	/**
	 * 유효한(존재하는) 월(月)인지 체크
	 * @param mm :검증할 월(형식"01" ~ "12")
	 * @returns : true, false
	 * @example : MobDate.isValidMonth(mm)
	 */
	this.isValidMonth = function(mm){
	    var m = parseInt(mm,10);
	    return (m >= 1 && m <= 12);
	},

	/**
	 * 유효한(존재하는) 일(日)인지 체크
	 *
	 * @param yyyy :검증할 년(형식"2009")
	 * @param mm :검증할 월(형식"01" ~ "12")
	 * @param dd :검증할 일(형식"01" ~ "31")
	 * @returns : true, false
	 * @예제 : MobDate.isValidDay(yyyy, mm, dd)
	 */
	this.isValidDay = function(yyyy, mm, dd){
	    var m = parseInt(mm,10) - 1;
	    var d = parseInt(dd,10);
	    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
	        end[1] = 29;
	    }
	    return (d >= 1 && d <= end[m]);
	},

	/**
	 * 입력받은 날에 해당하는 달의 말일이 몇일인지 알려줌. 아래의 예제를 실행하면 1월이 31일까지 있기 때문에 31을 return
	 *
	 * @param yy : 년
	 * @param mm : 월
	 * @param dd : 일
	 * @returns : 해당월의 마지막 날짜
	 * @example : MobDate.getLastDay("2012","01","27");
	 */
	this.getLastDay = function(yy,mm,dd){
	      var lastDay = new Date(yy,mm-1,dd);
	      lastDay.setMonth(lastDay.getMonth() + 1, 0);
	      return lastDay.getDate();
	};
};

var _mobUtil = function(){

	/**
	 * MobUtil.menuLink() 를 호출하여 메뉴이동이 가능합니다.
	 * parameter의 경우 key와 value만 넣어주면 자동으로 url 형태로 만들어줍니다. ex) ../fxg/fxg020101.html?crnc_cd=USD&inqy_base_day=2013-05-29
	 * @param path
	 * @param pageName
	 * @param options
	 * 		params			: link를 통해 넘길 data  ex) [{"key":"age","value":16},{"key":"name","value":"웹케시"}]
	 *		iMenuId			: iphone 메뉴id
	 * 		aMenuId			: android 메뉴id
	 *
	 *
	 */
	this.menuLink = function(path, pages, options){
		var strLink = path+pages;
		var params = "";
		var inputParams = undefined;
		var iphoneMenuId = undefined;
		var androidMenuId = undefined;

		if( undefined != options){
			inputParams = (undefined == options['params'])? undefined : options['params'];
			iphoneMenuId = (undefined == options['iMenuId'])? undefined : options['iMenuId'];
			androidMenuId = (undefined == options['aMenuId'])? undefined : options['aMenuId'];
		}

		if(undefined != inputParams){
			for(var i = 0; i < inputParams.length; i++){
				if(i == 0){
					params += inputParams[i]['key']+"="+inputParams[i]['value'];
				}else{
					params = params + "&"+inputParams[i]['key']+"="+inputParams[i]['value'];
				}
			}
		}

		if (typeof(MobPopup) != "undefined") {
			MobPopup.hideAllDialog();
		}

		nativeDimm.hide();
		var menuId = "";
		if(_isIphone()){
			menuId = iphoneMenuId;
		}else if(_isAndroid()){
			menuId = androidMenuId;
		}
		
		comWebkey_goMenu("5005", menuId, strLink, params);
	},

	/**
	 * MobUtil.menuLinkOnly() 를 호출하여 메뉴이동이 가능합니다.
	 * parameter의 경우 key와 value만 넣어주면 자동으로 url 형태로 만들어줍니다. ex) ../fxg/fxg020101.html?crnc_cd=USD&inqy_base_day=2013-05-29
	 * @param path
	 * @param pageName
	 * @param options
	 * 		params			: link를 통해 넘길 data  ex) [{"key":"age","value":16},{"key":"name","value":"웹케시"}]
	 *		iMenuId			: iphone 메뉴id
	 * 		aMenuId			: android 메뉴id
	 *
	 *
	 */
	this.menuLinkOnly = function(path, pages, options){
		var strLink = path+pages;
		var params = "";
		var inputParams = undefined;
		var iphoneMenuId = undefined;
		var androidMenuId = undefined;

		if( undefined != options){
			inputParams = (undefined == options['params'])? undefined : options['params'];
			iphoneMenuId = (undefined == options['iMenuId'] && pages.indexOf('.html')>0)? pages.replace('.html','') : options['iMenuId'];
			androidMenuId = (undefined == options['aMenuId'] && pages.indexOf('.html')>0)? pages.replace('.html','') : options['aMenuId'];
		}


		if(undefined != inputParams){
			for(var i = 0; i < inputParams.length; i++){
				if(i == 0){
					params += inputParams[i]['key']+"="+inputParams[i]['value'];
				}else{
					params = params + "&"+inputParams[i]['key']+"="+inputParams[i]['value'];
				}
			}
		}

		comWebkey_goMenu("5005", options['iMenuId'], strLink, params);




	},

	/**
	 * 빈값인지 여부 check
	 * @param val empthCheck를 위한 값
	 * @return isEmpty : true,false;
	 */
	this.isEmpty = function (val){
		var isEmpty = false;

		if(undefined == val || null == val || "" == val){
			isEmpty = true;
		}
		return isEmpty;
	},

	/**
	 * target 하위에 있는 모든 값을 지운다.
	 * input - 값을 지움
	 * select - 첫번째값을 default로 변경
	 * @params $target
	 */
	this.clearVal = function ($target){
		$target.find("input").val("");
		$target.find("select").each(function(){
			$(this).find("option").removeAttr("selected");
			$(this).find("option:first").attr("selected","selected").trigger('change');
		});
		//$target.find("select").find("option:first").attr("selected","selected").trigger('change');
	},

	/**
	 * 스텝영역의 상위로 화면을 올려줍니다.
	 */
	this.moveScrollTop = function(){
		$("html,body").animate({
			scrollTop:0
		}, 100, function(){
			$("html,body").clearQueue();
		});
	},

	/**
	 * 스텝영역의 화면을 이동합니다.
	 */
	this.moveScroll = function(px){
		$("html,body").animate({
			scrollTop:px
		}, 100, function(){
			$("html,body").clearQueue();
		});
	},

	/**
	 * 특정영역으로 화면을 이동
	 */
	this.moveScrollTarget = function(obj_target){
		$(document.body).scrollTop($(obj_target).offset().top);
	},

	/**
	 * 로그인 여부 return
	 * @return isLogin - true,false;
	 */
	this.isLogin = function(){
		var data = comCsbUtil.getIsLogin();
		var strIsLogin = data['_tran_res_data'][0]['resultDat'];
		var isLogin = false;
		if("true" == strIsLogin){
			isLogin = true;
		}
		return isLogin;
	};
	/**
	 * 로딩화면 start - ajax 여러번 호출시 개별처으로 처리할경우 사용
	 */
	this.startLoading = function(){
		nativeIndicator.show();
	};

	/**
	 * 로딩화면 end - ajax 여러번 호출시 개별처으로 처리할경우 사용
	 */
	this.endLoading = function(){
		nativeIndicator.hide();
	}
};

var MobStringUtil = new _mobStringUtil();
var MobDate = new _mobDate();
var MobUtil = new _mobUtil();

var ComCalendarPlugin = {
        calendar	: "JEX_MOBILE_CALENDAR",
        get : function($object, pluginId){
            var obj = jex.getJexObj($object, pluginId);

            if ( obj != null )           return obj;
            else                         return $object;
        }
};

/**
 * 오류메세지 출력
 * @param exection
 * @param funName
 * @return
 */
function bizException(e, funName) {
	alert("("+funName+") "+e);
	if(typeof _thisSForm_ExeBtn != "undefined") _thisSForm_ExeBtn = true;	//W클릭 방지 2013.05.10 [secretForm이체성거래 Button able]

	// showErrorPage(funName, "BIZ9999", e, false, 0);
} /* end of bizException */

$(function(){
	$.nativeCall('headerSize').done(function(dat){
		_headerSize = Number(dat['headerSize']);
	});

	if(_isRealApp){
		window.open_original = window.open;
		window.open = function(url,target,option){
			if(target == '_system'){
				$.nativeCall('openExBrowser',[url]);
			}else{
				window.open_original(url,target,option);
			}
		}
	}

	if(_isAndroid()){
		$.nativeCall('mobileNumber').done(function(dat){
			window._devicePhoneNum = dat['mobileNumber'];
		});

	}else{
		window._devicePhoneNum='';
	}
	
	//html파일의 title태그에 앱에 있는 네비게이션 타이틀(메뉴명)을 세팅함
	if($("html title").length == 0) {
		$("html head").prepend("<title></title>");
	}

	comWebkey_getTitle(function() {
		var $title_result = this;
		$("html title").text($title_result.title);
	});
});

function getImgUrl(imgName){
	return 'https://www.ibk.co.kr'+imgName;
}
function getCardImgUrl(imgName){
	return 'https://www.ibk.co.kr'+imgName;
}
function getPdfUrl(pdfName){
	return 'https://www.ibk.co.kr' +pdfName;
}

/**
 * 웹서비스 호출, 응답 일반화 함수(※ 기본값 : 동기 호출, 메지시 자체 처리하지 않음)
 * [ 용법 ]
 *     _this = {
 *         service : serviceHandler    // 함수 핸들러 등록
 *         ...
 *     };
 *     
 *     # CHECK 3가지
 *         1. 전달인자 유무
 *         2. 서비스 오류 시
 *             - 오류 메시지 출력 후 종료인지
 *             - 오류에 대해 별도 처리할 내용이 있는지
 *         3. 서비스 호출 결과를 꼭 받아야 하는지
 * 
 *     (1) 전달인자(없음), 응답결과(필요)
 *         var result = _this.service("cmc_cir_010301_1", {});
 *         
 *     (2) 전달인자(있음), 응답결과(필요)
 *         var arg = { a : "a", b : "b"...};
 *         var result = _this.service("cmc_cir_010301_1", arg);
 *         
 *         if(result._is_error == "true") {...}
 *         else {...}
 *         
 *     (3) 응답결과(불필요), 서비스오류(서비스 오류 단순 메시지 출력)
 *         if(_this.service("cmc_cir_010301_1", {}, true)) {
 *             // 서비스 호출이 정상적으로 종료된 경우... 처리할 부분
 *         }
 *         
 *     (4) 꼭 '비동기' 호출을 해야 하는 경우
 *         let callback_function = function() {...};
 *         _this.service("cmc_cir_010301_1", {}, false, callback_function, true); 
 * 
 * @param _serviceID 호출하고자 하는 서비스ID (ex) "cmc_cir_010301_1"
 * @param _params 전달하고자 하는 정보. javascript literal object
 * @param _isMessageProcess 서버 오류에 대한 메시지 처리를 serviceHandler가 할 지를 결정. 기본값 false(응답을 업무로직에 받아 처리)
 * @param _isAsync 비동기 여부. 대표적인 비동기 서비스로 '목록조회'. 일반적으로 동기 호출이 많아 기본값을 false로 처리
 * @param _callback 비동기 호출을 원하는 경우 전달. 서버 응답 수신 후 callback함수 호출
 * @author 박성권(seton3@naver.com)
 * @since 2024-07-09
 */
function serviceHandler(_serviceID, _params, _isMessageProcess = false, _callback, _isAsync = false) {
	let packages = _serviceID.match(/^([a-z]{3})_([a-z]{3})/);
	
	let ajax = jex.createAjaxUtil(_serviceID);
	ajax.setAsync(_isAsync);
	ajax.setErrTrx(false);
	ajax.set("task_package",    packages[1]);
	ajax.set("task_subpackage", packages[2]);

	_params = _params || {};
	for(let fieldName of Object.keys(_params)) ajax.set(fieldName, _params[fieldName]);

	if(_isAsync) {																// 비동기
		if(! _callback) {
			MobPopup.showAlertPopup("비동기 호출 방식은 'callback'함수를 정의해야 합니다.");
			return null;
		}
		
		ajax.execute(function(_ajaxResult) {
			let data		= _ajaxResult["_tran_res_data"][0] || {};
			let isError		= data["_is_error"] == "true" ? true : false;
			let errorCd		= data["_error_cd"] || "";
			let errorMsg	= data["_error_msg"] || "";
			
			if(isError) {
				if(_isMessageProcess) {
					MobPopup.showAlertPopup(errorMsg, "", function() { _callback(data, isError, errorCd, errorMsg); });
					return;
				}
			}
			
			_callback(data, isError, errorCd, errorMsg);
		});
	}
	else {																		// 동기 (기본값)
		let resultAjax	= ajax.execute() || {};
		let data		= resultAjax["_tran_res_data"][0] || {};
		let isError		= data["_is_error"] == "true" ? true : false;
		let errorCd		= data["_error_cd"] || "";
		let errorMsg	= data["_error_msg"] || "";

		if(! data) {
			data  = data || {};
			data._is_error	= "true";
			data._error_msg	= "서비스 호출이 불안정합니다. 잠시 후 다시 시도해주십시요.";

			return data;
		}
		
		if(isError) {
			switch(errorCd) {
				case "FRD99999" : errorMsg = "시스템 처리중 오류가 발생했습니다.[SQL Error]"; break;
				case ""         : errorMsg = "시스템 처리중 오류가 발생했습니다.[Server log check]"; break;
			}
		}

		if(_callback) {
			if(isError && _isMessageProcess) {
				MobPopup.showAlertPopup(errorMsg, "", function() { _callback(data, isError, errorCd, errorMsg); });
			}
			else {
				_callback(data, isError, errorCd, errorMsg);
			}
		}
		else {
			if(isError) {
				if(_isMessageProcess) {
					MobPopup.showAlertPopup(errorMsg);
					return null;
				}
				else {
					return data;
				}
			}
			else {
				return data;
			}
		}
	}
}

/**
 * 스텝 관리자
 *     - 스텝을 Double Linked List 구조로 연결
 *     - 특정 스텝에서 어느 스텝으로 이동할지를 하드 코딩하는 것을 방지하고, 일관성있는 코딩을 유도하기 위함
 *     
 *     - 스텝 외에 순차적으로 진행되는 구조에 모두 사용 가능.
 *     
 * [ 용법 ]
 *     ※ '/js/phone/cmc/cir/cmc_cir_010301_1.js' 소스 참조 (개인용 인증서 연동 서비스 - 총 15스텝 구성)
 *     ※ '/js/phone/com/wpl/com_wpl_010101_1.js' 소스 참조 (전환 사업장 관리 - 총 3스텝 구성)
 * 
 * var user_instance = new (Jex.extend({
 *     steps : new StepManager(),
 *     
 *     스텝정의함수 : function() {		// 별도 구현 또는 onload에 구현
 *         this.steps.append(step_1);	// 스텝 연결 1 --> 2 --> 3
 *         this.steps.append(step_2);
 *         this.steps.append(step_3);
 *     }
 *     
 *     step_1 : {
 *         run() {
 *             uf_goStep(1);
 *         },
 *         ...
 *         terminate : function() {
 *             this.steps.next().run();  // 다음 스텝의 run()을 실행
 *         }
 *     },
 *     step_2 : {
 *         run() {
 *             ...
 *             uf_goStep(2);  // 공통 함수 실행(현재 스텝의 화면을 활성화 시킴. 일반적으로 필수 호출)
 *         },
 *         ...
 *     },
 *     step_3 : {...}
 * }))();
 *     
 *     
 * @author 박성권(seton3@naver.com)
 * @since 2024-07-09
 */
function StepManager()
{
	let __breaker	= {
		name : "breaker",
		run  : function() { _webViewExit(); }
	};
	let __root		= null;														// 시작 스텝 포인터
	let __leaf		= null;														// 마지막 스텝 포인터
	let __current	= __root;													// 현재 스텝 포인터

	// 시작 스텝 얻기
	this.root = function() {
		return __root;
	};
	// 마지막 스텝 얻기
	this.leaf = function() {
		return __leaf;
	};
	// 현재 스텝 얻기
	this.current = function() {
		return __current;
	};
	this.getStepNo = function(_step) {
		return Number(_step.name.match(/\d+/g));
	};
	// 이전 스텝 얻기(현재 스텝 포인터 이동 포함)
	this.prev = function(_baseStep) {
		__current = _baseStep ? _baseStep.__prev : __current.__prev;
		return __current;
	};
	// 다음 스텝 얻기(현재 스텝 포인터 이동 포함)
	this.next = function(_baseStep) {
		__current = _baseStep ? _baseStep.__next : __current.__next;
		return __current;
	};
	// _prevStep(전달되지 않은 경우 leaf으로 처리)다음 스텝으로 _steps를 추가한다.
	//
	// _steps : 추가하고자 하는 스텝 또는 StepManager(스텝 그룹)
	// isConnect : 삽입되는 _steps(스텝 또는 스텝 그룹)을 마지막으로(삽입된 이후 스텝을 연결하지 않는)하고자 할지 여부
	//     true : insert(기본값), false : last append
	//
	// [예] 'd'를 추가하는 경우. instance.append(d) : a->b->c ==> a->b->c->d
	// [예] 'b' 다음에 'd'를 추가하는 경우. instance.append(d, b) : a->b->c ==> a->b->d->c
	// [예] 'a->b->c' 스텝 중의 'b'스텝 다음에 'e->f' 스텝 그룹을 추가하는 경우. instance.append(steps, b) : a->b->c ==> a->b->e->f->c
	// [예] 'a->b->c' 스텝 중의 'b'스텝 다음에 'e->f' 스텝 그룹을 추가 후 기존 스텝과의 연결을 끊을 경우. instance.append(steps, b, false) : a->b->c ==> a->b->e->f
	this.append = function(_steps, _prevStep, isConnect = true) {
		if(! _prevStep) {														// 일반적인 스텝 추가(마지막)
			if(! __root) {														// 추가되는 스텝이 최초 스텝인 경우
				let step = (_steps instanceof StepManager) ? _steps.root() : _steps;

				__root		= step;
				__leaf		= step;
				__current	= __root;
			}
			else {																// 일반적인 스텝 추가(마지막)
				let step = (_steps instanceof StepManager) ? _steps.root() : _steps;

				__leaf.__next	= step;
				step.__prev		= __leaf;
				__leaf			= (_steps instanceof StepManager) ? _steps.leaf() : step;
			}
		}
		else {																	// 지정된(_prevStep) 스텝의 다음 스텝으로 추가하는(insert) 경우
			if(_steps instanceof StepManager) {
				_steps.root().__prev= _prevStep;
				if(isConnect) {
					if(_prevStep.__next) {
						_prevStep.__next.__prev = _steps.leaf();
						_steps.leaf().__next	= _prevStep.__next;
					}
				}
				_prevStep.__next	= _steps.root();

				if(_prevStep === __leaf) __leaf = _steps.leaf();
			}
			else {
				_steps.__prev	= _prevStep;
				if(isConnect) {
					if(_prevStep.__next) {
						_prevStep.__next.__prev = _steps;
						_steps.__next			= _prevStep.__next;
					}
				}
				_prevStep.__next= _steps;

				if(_prevStep === __leaf) __leaf = _steps;						// 마지막 스텝 포인터 설정
			}
		}
		
		return (_steps instanceof StepManager) ? _steps.root() : _steps;
	};
	
	// 전달된 노드번호를 찾아 삭제시킨다. 노드번호에 해당하는 노드 전/후의 노드를 연결.
	// [예] 'b'를 삭제하는 경우. a->b->c ==> a->c
	this.remove = function(_stepNo) {
		let ptr = __root;

		// '스텝 번호'에 해당하는 단일 스텝 제거
		let removeStep = function(_stepNo) {
			while(ptr.__next) {
				if(Number(ptr.name.match(/\d+/g)) == _stepNo) {
					if(__current === ptr) {
						if(ptr.__prev)		__current = ptr.__prev;					// 제거할 스텝이 마지막 스텝 경우
						else if(ptr.__next) __current = ptr.__next;					// 제거할 스텝이 첫 스텝인 경우
						else				__current = null;						// 제거할 스텝의 전/후가 없는 단일 스텝인 경우
					}

					if(ptr.__prev) ptr.__prev.__next = ptr.__next;
					if(ptr.__next) ptr.__next.__prev = ptr.__prev;
					ptr.__prev = null;
					ptr.__next = null;
				}
				else {
					ptr = ptr.__next;
				}
			}
		};
		// '스텝 그룹' 제거
		let removeStepManager = function(_steps) {
			if(_steps.root().__prev) _steps.root().__prev.__next = _steps.leaf().__next;
			if(_steps.leaf().__next) _steps.leaf().__next.__prev = _steps.root().__prev;
			
			_steps.root().__prev = null;
			_steps.leaf().__next = null;
		};
		
		// '_stepNo' 형태에 따른 분기 처리
		if(_stepNo instanceof StepManager) {
			removeStepManager(_stepNo);
			console.log("Remove STEPS...");
			if(_isDevMode) this.view();
		}
		else {
			removeStep(_stepNo);
			console.log("Remove STEP " + _stepNo);
			if(_isDevMode) this.view();
		}
	};
	// 초기화
	this.clear = function() {
		__root		= null;
		__leaf		= null;
		__current	= __root;
		
		if(_isDevMode) this.view();
	},
	// 등록된 스텝 중에서 스텝 번호에 해당하는 스텝 찾기. 해당 스텝이 없는 경우 null (현재 스텝 포인터 이동 포함)
	// 끝에서 앞으로 검색. (스텝을 이력 방식으로 적재하는 경우. 가장 최근의 스텝을 찾기 위함)
	// [예] '1'스텝 검색.  1-->2-->3->4-->5 ==> '1'
	// [예] '1'스텝 검색.  3-->4-->5-->1-->2-->3->4-->5 ==> '1'
	// [예] '3'스텝 검색.  3-->4-->5-->1-->2-->3->4-->5 ==> '3' (오른쪽(끝)에서 왼쪽(처음)으로 검색. 목록에서 두번째 '3'스텝을 검색
	this.find = function(_stepNo) {
		let ptr	= __leaf;
		
		while(true) {
			if(Number(ptr.name.match(/\d+/)) == _stepNo) {
//				comLayerPopUtil.close($(".bottom_popup_wrap.active").prop("id"));
				
				__current = ptr;
				return __current;
			}
			else {
				if(! ptr.__prev) break;
				ptr = ptr.__prev;
			}
		}

		console.log("[steps]Not Found Step...[" + _stepNo + "]");
		return null;
	};
	// 전달된 스텝을 전체 스텝 연결의 마지막으로 설정. current이후 노드가 존재하더라도 전달된 노드를 끝으로 처리
	// [예] 현재 'a'스텝에서 'b'스텝으로 종료하고자 하는 경우. a->c->d ==> a->b
	this.end = function(_step) {
		this.append(_step, this.current(), false);
		
		return this.next();
	};
	// 스텝을 진행하지 않고 강제 종료하기. 지정된 실행 함수(_run)을 전달하는 경우 해당 함수를 수행.
	this.terminate = function(_run) {
		if(_run) {
			if(__current.__next) __current.__next.__prev = null;
			__current.__next = null;
			
			_run();
		}
		else {
			__current.__next = __breaker;
			this.next().run();
		}
	};
	this.view = function() {													// 스텝 연결정보 출력(디버깅용)
		let ptr = __root;
		if(! ptr) {
			console.log("등록된 STEP이 없습니다...");
			return;
		}

		do {
			console.log(ptr.name + ((__current === ptr) ? " <current>" : ""));
			ptr = ptr.__next;
		} while(ptr);
	}
}

/**
 * 약관(동의서) PDF Viewer
 *     - 약관이 존재하는 항목에 대해 이벤트 핸들러 설정
 *     
 *     (단, '개별 약관'을 포함하는 '그룹 약관', '그룹 약관'을 포함하는 '그룹2 약관'이 존재하는 경우,
 *      '그룹2 약관'에 대한 처리는 불가함. 업무에서 별도 이벤트 연결 필요.)
 * 
 * @param _htmlID 약관 영역 전체를 지칭하는 ID('#' 미포함)
 * @param _termsList 약관 정보를 포함하는 배열(
 *         comCacheUtil.getTermUrlList("C131,C132...") 함수에서 return되는 객체
 * @param _callback 약관 Viewer 종료 시 호출
 *         전달인자 : Viewer호출 버튼 type, 해당 약관 checkbox객체, Viewer 응답 값
 */
function TermViewerLink(_htmlID, _termsList, _before, _callback, _after)
{
	let _viewer_callback = null;
	
	_before 	= _before || function(_type, _checkbox) { return true; };		// _before함수는 반드시 true/false를 return해야 함. 후처리 실행여부 판단용
	_callback	= _callback || function(_type, _checkbox, _is_viewer_agree) {};
	_after 		= _after || function(_type, _checkbox, _is_viewer_agree) {};
	
	_viewer_callback = function(_type, _checkbox, _is_viewer_agree) {			// PDF Viewer에서의 callback 처리 시에는 callback내에서 _after를 호출하도록 한다.(실행 선/후를 위함)
		_callback(_type, _checkbox, _is_viewer_agree);
		_after(_type, _checkbox, _is_viewer_agree);
	}
	
	// 약관 ID에 해당하는 약관 정보(_termsList에서 검색)를 찾아 배열로 return
	let __findTerms = function(_termIDList) {
		let findedTermList	= [];
		
		if(_termsList.length) {
			for(let termID of _termIDList.split(",")) {
				let findedTerm = _termsList.find(function(_term) {
					return (_term.term_id == termID);
				});

				if(findedTerm) findedTermList.push(findedTerm);
			}
		}
		
		return findedTermList;
	};
	
	// 'data-term' 속성이 정의된 영역(약관 관련 checkbox, button을 포함하는)
	$("#"+_htmlID+" [data-term]").each(function(_idx, _dom) {
		let termList = _dom.dataset.term.split(",");
		
		// [동의] checkbox
		$(_dom).find("input").on("click", function() {
			let agreeCheckbox	= this;
			let isSkipAfter		= false;
			
			if(! _before('checkbox', agreeCheckbox)) return;
		
			// 약관이 연결된 '동의 checkbox'인 경우
			if(_dom.dataset.term) {
				if(agreeCheckbox.checked) {
					agreeCheckbox.checked = false;	// 약관을 보기 전에 checked되어 있는 경우 해제
				
					// 약관을 찾아 title, url을 조립
					let findedTermList	= __findTerms(_dom.dataset.term);
					let termTitle		= findedTermList.length > 1 ? "" : findedTermList[0].term_title;
					let termURLList		= [];
					
					for(let finedTerm of findedTermList) termURLList.push(finedTerm.term_url);
				
					console.log("click [checkbox]...");
					console.log(termURLList);
					comWebkey_showPdf(termTitle, termURLList, function(_viewer_result) {
						agreeCheckbox.checked = (_viewer_result.result == "true") ? true : false;
						$(agreeCheckbox).trigger("change");
						
						_viewer_callback('checkbox', agreeCheckbox, (_viewer_result.result == "true") ? true : false);
					});
					isSkipAfter = true;
				}
			}
			
			if(! isSkipAfter) _viewer_callback('checkbox', agreeCheckbox, false);
		});
		
		// [보기] button (단, 'acd_btn'(그룹 펼침/축소 버튼) 클래스가 없는 button)
		$(_dom).find("button:not(.acd_btn)").on("click", function() {
			let agreeCheckbox	= $(_dom).find("input").get(0);
			let isSkipAfter		= false;
			
			if(! _before('button', agreeCheckbox)) return;
			
			// 약관이 연결된 '보기 button'인 경우
			if(_dom.dataset.term) {
				let findedTermList	= __findTerms(_dom.dataset.term);
				let termTitle		= findedTermList.length > 1 ? "" : findedTermList[0].term_title;
				let termURLList		= [];
				
				for(let finedTerm of findedTermList) termURLList.push(finedTerm.term_url);
				
				console.log("click [button]...");
				console.log(termURLList);
				comWebkey_showPdf(termTitle, termURLList, function(_viewer_result) {
					if(_viewer_result.result == "true") {
						agreeCheckbox.checked = true;
						$(agreeCheckbox).trigger("change");
					}
					
					_viewer_callback('button', agreeCheckbox, (_viewer_result.result == "true") ? true : false);
				});
				isSkipAfter = true;
			}
			
			if(! isSkipAfter) _viewer_callback('button', agreeCheckbox, false);
		});
	});
}


/**
 * 공유 세션 정보 초기화
 *     - 호출 시기 : 업무를 시작하는 시점(메뉴를 통해 접근하거나, 업무 진행 최초 STEP을 진행하는 시점에 호출)
 */
function initShareData() { serviceHandler("com_utl_900000_1", {}, true); }

var _headerSize=null;

$(document).ready(function(){
	if(typeof cfx != 'undefined'){
		console.log('CFX setLicense#########');
		cfx.Chart.setLicense('O;2015/5/23;0;;IBK ONE Bank$Industrial Bank of Korea;680a98e8166f5680a31d21d1ab1c29a40d8a38b1a416447037b0f5ab0a7427303cbd7e359544301027c9e0acc2d04a471a462927750a3e4e5d6b8f14eec9b169296c70bc23faacf8701803458781ced9a61456e63ce1a77ad756336fc4da63f702c3c33d70526eeec0de3e8ff80bb88793bae63354668ee7684529f7d2ea3b11');
	}
	
	if(_getPhoneType() == "I") { //IOS
		$("div.wrap").addClass("ios");
	}
});

var _cuWinSize = window.innerHeight;
var _cuStepNo  = "";
var _cuIsExe   = false;

window.onresize = function(event) {
	if(_getPhoneType() == "A") { //안드로이드
		var curWinSize = window.innerHeight;
		
		if(curWinSize < _cuWinSize) { //로드 되었을때 보다, 웹뷰의 사이즈가 작아졌을 경우
			//중복 이벤트 방지
			if(_cuIsExe) return;
			
			_cuStepNo = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
			
			$('[data-jx-step-no="' + _cuStepNo + '"]').find('.bottom_btn_area').addClass("static");
			
			_cuIsExe = true;
		}
		else {
			$('[data-jx-step-no="' + _cuStepNo + '"]').find('.bottom_btn_area').removeClass("static");
			
			_cuIsExe = false;
		}
	}
};

var _target_yn = false;
