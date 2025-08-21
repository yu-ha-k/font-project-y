// 키패드보안필드가 들어있을 폼을 지정
var iwebkeyFrm;
var iwebkeyId;
var frmAction;

// 태블릿 스크롤 탑 인덱스
var _scrollTopIndex;

function _getPhoneType() {	//2013.04.03
	if(_isIphone()) return "I";
	if(_isAndroid()) return "A";
	return "X";
}

/**********************************************
*	Device Type 가져오기
***********************************************/
function _getAppType () {
	var _appType = "";
	var nAppKindIdx = navigator.userAgent.indexOf("nma-app-type=");
	if (nAppKindIdx != -1) _appType = navigator.userAgent.substring(nAppKindIdx + 13).split(";")[0];

    return _appType;
}

function _isMini () {
    if (_getAppType() === "mini") return true;

    return false;
}

function _isIphone() {
	if((navigator.userAgent.indexOf("iPhone") != -1) ||
		(navigator.userAgent.indexOf("iPod") != -1) ||
		(navigator.userAgent.indexOf("iPad") != -1)) return true;
	else return false;
} /* end of _isIphone */

function _isAndroid() {
	if (navigator.userAgent.indexOf("Android") != -1) return true;
	else return false;
} /* end of _isAndroid */

/* 웹뷰 종료 */
function _webViewExit(option) {
	comWebkey_exit(option);
}

function comWebkey_exit(option) {
	// "" 빈스트링 이전메뉴로 이동, 메뉴의 홈이 있을경우 홈으로 이동, 예:인증서홈
	//sessionOutWithAlert (장시간 사용하지 않아 접속 종료),
	//sessionOut2 (다른기기에서 로그인, 중복로그인),
	//moveHome (메인화면으로 무조건 이동)
	//close (이전메뉴로 이동)
	//refresh (gomenu 6001일경우 웹뷰닫고 새로고침)
	if(isEmpty(option)) option = "";
	else if(option == "refresh") option = "refreshWebViewAfterExit";
	
	if(_isRealApp) {
		$.nativeCall("exit", [{"type" : option}]);
	}
	else {
		if(option == "") {
			alert("_webViewExit : 빈스트링 (이전메뉴로 이동)");
			history.go(-1);
		} else if(option == "sessionOutWithAlert") {
			alert("_webViewExit : sessionOutWithAlert (장시간 사용하지 않아 접속 종료)");
		} else if(option == "sessionOut2") {
			alert("_webViewExit : sessionOut2 (다른기기에서 로그인, 중복로그인)");
		} else if(option == "sessionOutWithAlert") {
			alert("_webViewExit : moveHome (메인화면으로 무조건 이동)");
		} else if(option == "close") {
			alert("_webViewExit : close (이전메뉴로 이동)");
			history.go(-1);
		} else if(option == "refreshWebViewAfterExit") {
			alert("_webViewExit : refresh (gomenu 6001일경우 웹뷰닫고 새로고침)");
			window.close();
		} else {
			alert("_webViewExit : " + option + " <--- 정의되지 않음 확인필요");
		}
	}
}

/**
 * _webViewExitPopup
 *
 * 웹뷰 종료(팝업)
 */
function _webViewExitPopup(option){
	var param = [];
	if(!isEmpty(option)){
		param.push(option);
	}
	$.nativeCall('mrkexit',param);

} /* end of _webViewExitPopup */

/**
 * 네이티브 영역 dimm 처리
 */
var nativeDimm = {
	show : function(){
		$.nativeCall('showDimm');
	},
	hide : function(){
		$.nativeCall('hideDimm');
	}
}

/**
 * 네이티브 영역 인디케이터 처리
 */
var nativeIndicator = {
	show : function(time_out, msg) {
		if(typeof time_out == "undefined") {
			time_out = 100;

			if(_isDevMode === true) { //개발서버
				time_out = 180; //3분
			}
		}

		if(_isRealApp) { //앱
			$.nativeCall("showIndicator", [{"time_out" : time_out, "message" : msg || ""}]);
		}
		else { //웹
			webDevUtil.showIndicator({"time_out" : time_out, "message" : msg || ""});
		}
	},
	hide : function() {
		if(_isRealApp) { //앱
			$.nativeCall("hideIndicator");
		}
		else { //웹
			webDevUtil.hideIndicator();
		}
	}
}

function nativeChangeTitle(title){
	$.nativeCall('changeTitle',[title]);
}

function nativeCallApp(title,scheme,url){
	$.nativeCall('callApp',[title,scheme,url]);
}

/**
 * @description 메뉴이동
 * @param actionCode
 *  - 5005(기본형)
 *  - 5009(이전 모든 스택 내용 삭제 후 현재 메뉴부터 쌓기)
 *  - 5010(현재 메뉴 id를 스택에 쌓지 마라) ex) 결재함 상세 -> 취소
 *  - 6001(웹뷰 하나 더 띄우기)
 * @param menuId : 메뉴ID
 * @param param : 전달 파라미터 문자열
 */
function comWebkey_goMenu(actionCode, menuId, param) {
	if(isEmpty(param)) {
		param = "";
	} else {
		param = comUtil_base64.encode(param);
	}

	if(_isRealApp) { //앱
		$.nativeCall("openMenu", [{"actionCode":actionCode, "menuId":menuId, "param":param}]);
	} else { //웹
		webDevUtil.goMenu(actionCode, menuId, param);
	}
}

/* 새로운 웹뷰 풀팝업 */
function comWebkey_fullPopup(menuUrl, title, param) {
	if(isEmpty(param)) param = "";
	
	$.nativeCall("openMenu", [{"actionCode":"6001", "menuUrl":menuUrl, "title":title, "showCloseBtn":true, "param":param}]);
}

/**
 * 클라이언트에서 암호화된 데이터를 리턴받음
 */
/*-----------------------------------------------------------------------------
 *클라이언트에서 암호화된 데이터를 리턴받음
 *target.value = _str;	필드의 value에 암호화된 데이터를 자릿수에 맞게 끊어 보여줌
 *target.realValue = _encryptdata;	리얼밸류에는 암호화된 값을 할당
 *-----------------------------------------------------------------------------*/
function uf_iwebkey(data) {
	if(data == null || typeof data == 'undefined') return false;
	
	var jsonObj = data;
	
	var _key			= jsonObj._iweb_key[0]._key;					// input 에서 받은값
	var _type			= jsonObj._iweb_key[0]._type;					// input 에서 받은값
	var _minlength		= eval(jsonObj._iweb_key[0]._minlength);		// input 에서 받은값
	var _maxlength		= eval(jsonObj._iweb_key[0]._maxlength);		// input 에서 받은값
	var _displaytext	= jsonObj._iweb_key[0]._displaytext;			// input 에서 받은값

	var _inputlength  	= eval(jsonObj._iweb_key[0]._inputlength);		// 사용자가 입력한 자릿수
	var _encryptdata  	= jsonObj._iweb_key[0]._encryptdata;			// 사용자가 입력한 데이타를 암호화한 값

	var _pad			= jsonObj._iweb_key[0]._pad	;					// 로그인 전상태일 경우만 암호화 키값 전달
	var _errcode      	= jsonObj._iweb_key[0]._errcode;				// '0000' 정상, 그외 오류
	var _errmsg       	= jsonObj._iweb_key[0]._errmsg;
	var _nextin       	= jsonObj._iweb_key[0]._nextinput;

	//alert(_encryptdata);

	// 안드로이드를 위한 최소값 체크
	// 입력값과 다른 경우, iphone 같은 에러코드와 메세지를 설정한다.

	if((_inputlength != null || typeof _inputlength != 'undefined') && (_minlength != null || typeof _minlength != 'undefined')){
		if(_inputlength < _minlength){
			if (_key == 'otp_num' || _key == "otp_num") {
				_errcode = '0001';
				_errmsg = 'OTP 발생번호 입력을 '+ _minlength +'자리로 해주십시오.';

			} else {
				_errcode = '0001';
				_errmsg = '입력글자 수는 '+ _minlength +'자리 수입니다.';
			}
		}
	}

	//var target = eval('iwebkeyFrm.' + _key);
	var target = $("#" + _key);

	if(typeof(target) == 'undefined' || target == null){
		return false;
	}

	if(_errcode != '0000'){ // 오류
		alert(_errmsg);
		/*
		target.value = '';
		target.realValue = '';
		*/
		target.val("").removeAttr("realValue");
		if(target.attr('type') == 'hidden'){
			target.parent().find('.' + _key).val('');
		}

		return false;
	}else {		// 정상

		if(_type == '2'){	//보안카드 일련번호 입력인 경우
			$('#secret_no_input_1').val('*').attr("realValue", _encryptdata[0]);
			$('#secret_no_input_2').val('*').attr("realValue", _encryptdata[1]);
			$('#secret_no_input_3').val('*').attr("realValue", _encryptdata[2]);
			_encryptdata[0]
		}else{
			var _str = '';
			// 앱에서 내려준 웹인풋렝쓰값
			if(_inputlength != null && typeof _inputlength != 'undefined' && _inputlength != ''){
				/* 아이폰의 경우 인증서 비밀번호를 다시 리턴해 주지 않는다
				 * _encryptdata의 값이 ''로 리턴되므로 화면에 *출력과 벨리데이션통과를 위해
				 * _encryptdata가 없는 경우 인풋렝스에 담겨오는 값으로 *를 출력해줌 */
				//if(_encryptdata != ''){
				//	_str = _encryptdata.substr(0,_inputlength);
				//}else{
					for(var idx=0; idx< parseFloat(_inputlength); idx++){
						_str = _str + '*';
					}
				//}
			}
			//alert("_str : " + _str);
			//target.value = _str;
			//target.realValue = _encryptdata;
			target.val(_str);
	//		target.attr("realValue", _encryptdata+"||"+_pad );
			target.attr("realValue", _encryptdata );

			target.parent().find('.'+_key).val('*');
		}
		if(_nextin != undefined) {	// 연속 키패드를 띄울경우
			//$("#"+_nextin).trigger("click");
			var _bool = false;
			if(typeof _thisSForm_arr_nextin != "undefined") {	// from SecretForm
				for(var i in _thisSForm_arr_nextin){
					if(_thisSForm_arr_nextin[i] == _nextin){
						_bool = true;
						break;
					}
				}
			}
			if(_bool) {
				if(typeof _callXecureKeypad_SecretForm == "function") {	// from SecretForm
					_callXecureKeypad_SecretForm(_nextin);
				}
			} else {
				if(_inputlength != null && typeof _inputlength != 'undefined' && _inputlength != ''){
					var nextTarget = $("#"+_nextin);

					if(nextTarget.attr('type') == 'hidden'){
						nextTarget.parent().find('.' + _nextin + ':first').trigger("click");
					}else{
						nextTarget.trigger("click");
					}

				}
			}
		} else {
			// 보안매체 입력 결과 콜백 호출
			_uf_executeSecretOtp("_iweb_key", data);
			
		}

	}
}

function uf_iwebkey_withCallback(data,callback) {
	if(data == null || typeof data == 'undefined') return false;
	
	var jsonObj = data;
	
	var _key			= jsonObj._iweb_key[0]._key;					// input 에서 받은값
	var _type			= jsonObj._iweb_key[0]._type;					// input 에서 받은값
	var _minlength		= eval(jsonObj._iweb_key[0]._minlength);		// input 에서 받은값
	var _maxlength		= eval(jsonObj._iweb_key[0]._maxlength);		// input 에서 받은값
	var _displaytext	= jsonObj._iweb_key[0]._displaytext;			// input 에서 받은값

	var _inputlength  	= eval(jsonObj._iweb_key[0]._inputlength);		// 사용자가 입력한 자릿수
	var _encryptdata  	= jsonObj._iweb_key[0]._encryptdata;			// 사용자가 입력한 데이타를 암호화한 값

	var _pad			= jsonObj._iweb_key[0]._pad	;					// 로그인 전상태일 경우만 암호화 키값 전달
	var _errcode      	= jsonObj._iweb_key[0]._errcode;				// '0000' 정상, 그외 오류
	var _errmsg       	= jsonObj._iweb_key[0]._errmsg;
	var _nextin       	= jsonObj._iweb_key[0]._nextinput;

	//alert(_encryptdata);

	// 안드로이드를 위한 최소값 체크
	// 입력값과 다른 경우, iphone 같은 에러코드와 메세지를 설정한다.

	if((_inputlength != null || typeof _inputlength != 'undefined') && (_minlength != null || typeof _minlength != 'undefined')){
		if(_inputlength < _minlength){
			if (_key == 'otp_num' || _key == "otp_num") {
				_errcode = '0001';
				_errmsg = 'OTP 발생번호 입력을 '+ _minlength +'자리로 해주십시오.';

			} else {
				_errcode = '0001';
				_errmsg = '입력글자 수는 '+ _minlength +'자리 수입니다.';
			}
		}
	}

	//var target = eval('iwebkeyFrm.' + _key);
	var target = $("#" + _key);

	if(typeof(target) == 'undefined' || target == null){
		return false;
	}

	if(_errcode != '0000'){ // 오류
		alert(_errmsg);
		/*
		target.value = '';
		target.realValue = '';
		*/
		target.val("").removeAttr("realValue");
		if(target.attr('type') == 'hidden'){
			target.parent().find('.' + _key).val('');
		}

		return false;
	}else {		// 정상

		if(_type == '2'){	//보안카드 일련번호 입력인 경우
			$('#secret_no_input_1').val('*').attr("realValue", _encryptdata[0]);
			$('#secret_no_input_2').val('*').attr("realValue", _encryptdata[1]);
			$('#secret_no_input_3').val('*').attr("realValue", _encryptdata[2]);
			_encryptdata[0]
		}else{
			var _str = '';
			// 앱에서 내려준 웹인풋렝쓰값
			if(_inputlength != null && typeof _inputlength != 'undefined' && _inputlength != ''){
				/* 아이폰의 경우 인증서 비밀번호를 다시 리턴해 주지 않는다
				 * _encryptdata의 값이 ''로 리턴되므로 화면에 *출력과 벨리데이션통과를 위해
				 * _encryptdata가 없는 경우 인풋렝스에 담겨오는 값으로 *를 출력해줌 */
				//if(_encryptdata != ''){
				//	_str = _encryptdata.substr(0,_inputlength);
				//}else{
					for(var idx=0; idx< parseFloat(_inputlength); idx++){
						_str = _str + '*';
					}
				//}
			}
			//alert("_str : " + _str);
			//target.value = _str;
			//target.realValue = _encryptdata;
			target.val(_str);
	//		target.attr("realValue", _encryptdata+"||"+_pad );
			target.attr("realValue", _encryptdata );

			target.parent().find('.'+_key).val('*');
		}
		if(_nextin != undefined) {	// 연속 키패드를 띄울경우
			//$("#"+_nextin).trigger("click");
			var _bool = false;
			if(typeof _thisSForm_arr_nextin != "undefined") {	// from SecretForm
				for(var i in _thisSForm_arr_nextin){
					if(_thisSForm_arr_nextin[i] == _nextin){
						_bool = true;
						break;
					}
				}
			}
			if(_bool) {
				if(typeof _callXecureKeypad_SecretForm == "function") {	// from SecretForm
					_callXecureKeypad_SecretForm(_nextin);
				}
			} else {
				if(_inputlength != null && typeof _inputlength != 'undefined' && _inputlength != ''){
					var nextTarget = $("#"+_nextin);

					if(nextTarget.attr('type') == 'hidden'){
						nextTarget.parent().find('.' + _nextin + ':first').trigger("click");
					}else{
						nextTarget.trigger("click");
					}

				}
			}
		} else {
			// 보안매체 입력 결과 콜백 호출
			//_uf_executeSecretOtp("_iweb_key", data);
			_uf_executeSecretOtp_withCallback("_iweb_key", data,callback);
		}

	}
}

//앱으로부터 호출되는 키패드가 올라와 있는 상태에서 소프트벡 클릭시 호출되는 함수(안드로이드)
function comWebkey_bid_keypad_back(type) {
	if(type == "open") {
		//하단고정버튼 위치 고정 해제
		comUi_bottom_fixed_button_focus();
	} else {
		//하단고정버튼 위치 고정
		// 2018.02.14 박종운 테스트
		//comUi_bottom_fixed_button_blur();
		//jylee 일단 주석 처리 otp 입력창 관련 오류 발생
		//comUi_bottom_fixed_button_blur2();
	}
}
function comWebkey_hideSoftKey() {
	if(_isRealApp) {
		$.nativeCall('hideSoftKey');
	}
}
/**
 * 보안키패드 [취소]button click [2013.04.29]
 */
function uf_iwebkey_cancel(data) {
	if(data == null || typeof data == 'undefined') return false;

	var jsonObj = data;
	var _key    = jsonObj._iwebkey_cancel[0]._key; //input 에서 받은값
	var target  = $("#" + _key);
	
	if(typeof(target) == 'undefined' || target.length == 0) {
		return false;
	}

	target.val("").removeAttr("realValue");

	if(typeof _thisSForm_ExeBtn != "undefined") _thisSForm_ExeBtn = true;	//W클릭 방지 2013.05.10 [secretForm이체성거래 Button able]
}

//보안매체입력인 경우 - 키패드 입력이 완료되면  다음 로직 수행
function _uf_executeSecretOtp(type, data) {
	var _key = data[type][0]["_key"]; // "ex)#step #secretform_W_OTP_OCRN_NO"
	
	var _keyArrList = _key.split("#");
	var _keyCompare = _keyArrList[_keyArrList.length - 1];
	var _secKeyKind = data[type][0]['sec_key_kind'];
	
	// 디지털 OTP 인앱
	if(_keyCompare == "secretform_W_OTP_OCRN_NO" && "ssc" == _secKeyKind) {
		if(type == "_iweb_key") {	// 입력완료
			_secretFormDigitalOtpInApp.makeSmartcardInappActive(_key, function(){	// 디지털 OTP 인앱 활성화 및 OTP 번호 설정
				
				console.log("디지털 OTP 인앱 활성화!!");
				
//				if(!isEmpty(sf_post_function)) {
//					var encriptData = _secretFormUtil.getEncriptData();
//					eval(sf_post_function)(encriptData);	// 콜백 호출 시에는 유효성 체크를 업무쪽에서 처리해야된다.
//				}
			});
		}
	} 
}

function _uf_executeSecretOtp_withCallback(type, data,callback) {
	var _key = data[type][0]["_key"]; // "ex)#step #secretform_W_OTP_OCRN_NO"
	
	var _keyArrList = _key.split("#");
	var _keyCompare = _keyArrList[_keyArrList.length - 1];
	var _secKeyKind = data[type][0]['sec_key_kind'];
	
	// 디지털 OTP 인앱
	if(_keyCompare == "secretform_W_OTP_OCRN_NO" && "ssc" == _secKeyKind) {
		if(type == "_iweb_key") {	// 입력완료
			_secretFormDigitalOtpInApp.makeSmartcardInappActive(_key, function(){	// 디지털 OTP 인앱 활성화 및 OTP 번호 설정
				
				console.log("디지털 OTP 인앱 활성화!!");
				
				if(typeof callback == "function") {
					callback.apply(data);
				}
				
//				if(!isEmpty(sf_post_function)) {
//					var encriptData = _secretFormUtil.getEncriptData();
//					eval(sf_post_function)(encriptData);	// 콜백 호출 시에는 유효성 체크를 업무쪽에서 처리해야된다.
//				}
			});
		}
	} else {
		if(typeof callback == "function") {
			callback.apply(data);
		}
	}
}


/*-----------------------------------------------------------------------------
 *인자값 - this, '키패드 타입', '최소길이', '최대길이', '입력 화면의 label 값
 *- vKey : 비밀번호 형식의 id
 *-	vType 키패드 타입 : 5-영문/숫자/특수기호(쿼티), 4-숫자
 *-	vMinLength 최소 길이 : 0일 경우 제한 없음(안드로이드일 경우 지원하지 않음)
 *-	vMaxLength 최대 길이 : 0일 경우 제한 없음(안드로이드일 경우 1~16자리)
 *-	vDisplayText 입력 화면의 label 값
 *-	cert_proc
 *- islogin : 로그인 여부 Y/N
 *- vPos : 보안키패드 위치 0:상단, 1:하단, 2:중단
 *- nextIn : 다음 포커스를 이동해야할 input의 id
 *- isKdfType : 스크래핑일경우 true
 *- sec_key_kind : 암호화키 종류 (스마트보안카드(in-app)일 경우, value는 ssc)
 *ex) _callXecureKeypad('drot_acnt_pwd', '1', '4', '4', '계좌비밀번호를 입력하세요.', null, 'Y');
 -----------------------------------------------------------------------------*/
function _callXecureKeypad(vKey, vType, vMinLength, vMaxLength, vDisplayText, cert_proc, islogin, vPos, nextIn, isKdfType, sec_key_kind) {
	// 스마트뱅킹 전면개편 타입변경
	if(vType == "1") vType = "4";
	else if(vType == "0") vType = "5";
	
	if(!_isRealApp){
		$("#" + vKey).val('').removeAttr("realValue");
		
		var value = prompt(vDisplayText);
		if(!MobUtil.isEmpty(value)){
			if(value.length >=Number(vMinLength) && value.length<=Number(vMaxLength)){
				var t = '';
				for(var i=0;i<value.length;i++){
					t += '*';
				}
				$("#" + vKey).val(t).attr('realValue',value);
			}else{
				alert('자릿수 확인 요망!');
				return;
			}
		}else{
			return;
		}

		var dataArr = new Array();
		var dataWrap = {};
		var data = {};
		data['_errcode'] = '0000';
		data['_encryptdata'] = value;
		data['_inputlength'] = value.length;
		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['_cert_proc'] = cert_proc;
		data['isKdfType'] = isKdfType;
		data['sec_key_kind'] = sec_key_kind;
		dataArr.push(data);
		dataWrap['_iweb_key'] = dataArr;
		uf_iwebkey(dataWrap);
		
		return;
	}

	var target = $("#" + vKey).val('').removeAttr("realValue");

	iwebkeyId = vKey;
	isKdfType = (isKdfType == undefined || isKdfType == null)?false:isKdfType;

	var data = {};
	if(_isIphone()) {

		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = (vPos == null) ? "" : vPos;
		data['_nextinput'] = (nextIn == null) ? "" : nextIn;
		data['_cert_proc'] = (cert_proc == null) ? "" : cert_proc;
		data['isKdfType'] = isKdfType;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;

	} else if(_isAndroid()) {
		data['_key'] = vKey;
		data['_type'] = Number(vType);
		data['_minlength'] = Number(vMinLength);
		data['_maxlength'] = Number(vMaxLength);
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['isKdfType'] = isKdfType;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;
	}

	var func = "loadSecureKeyBoard";
		
	// 스마트보안카드(in-app)일 경우,
	// 보안키패드 플러그인 호출 시, 금결원에서 받은 암호화키로 암호화 처리를 해야하므로,
	// 그 여부를 구분할 수 있는 파라미터를 추가
	if (sec_key_kind === 'ssc') {
		func = "digitalOTP";
		data['type'] = "loadSecureKeyBoard";
		data['sec_key_kind'] = sec_key_kind;
	}

//	// OTP, 디지털OTP일 경우 키패드 색깔 다르게
//	if (vKey == "otp_num" || vKey == "smart_card_inapp_num") {
//		var otpName = "";
//		
//		if (vKey == "otp_num") { // OTP
//			otpName = "OTP번호";
//		} else if (vKey == "smart_card_inapp_num") { // 디지털OTP
//			otpName = "디지털OTP PIN번호";
//		}
//		
//		data['_displaytext_html' ] = "<font color=#ffffff>" + otpName+ "를 입력하세요.</font>";
//		data['bg_color'          ] = "#ff7326";
//		data['warning_msg_color' ] = "#b43d12";
//		data['before_input_color'] = "#ff9256";
//		data['after_input_color' ] = "#ffffff";
//	}
	console.log("otp 입력창 네이티브 호출1", data);
	
	$.nativeCall(func, [data]).done(function(res){
		var dataArr = new Array();
		var dataWrap = {};
		res['_key'] = vKey;
		res['_type'] = vType;
		res['_minlength'] = vMinLength;
		res['_maxlength'] = vMaxLength;
		res['_displaytext'] = vDisplayText;
		res['_islogin'] = islogin;
		res['_displaypos'] = vPos;
		res['_nextinput'] = nextIn;
		res['_cert_proc'] = cert_proc;
		res['sec_key_kind'] = sec_key_kind;
		dataArr.push(res);
		
		if(res._errcode == "0000"){
			dataWrap['_iweb_key'] = dataArr;
			uf_iwebkey(dataWrap);
		}else if(res._errcode == "9999"){
			dataWrap['_iwebkey_cancel'] = dataArr;
			uf_iwebkey_cancel(dataWrap);
		}
	});
}

// 휙서비스
/*-----------------------------------------------------------------------------
 *인자값 - this, '키패드 타입', '최소길이', '최대길이', '입력 화면의 label 값
 *- vKey : 비밀번호 형식의 id
 *-	vType 키패드 타입 : 5-영문/숫자/특수기호(쿼티), 4-숫자
 *-	vMinLength 최소 길이 : 0일 경우 제한 없음(안드로이드일 경우 지원하지 않음)
 *-	vMaxLength 최대 길이 : 0일 경우 제한 없음(안드로이드일 경우 1~16자리)
 *-	vDisplayText 입력 화면의 label 값
 *-	cert_proc
 *- islogin : 로그인 여부 Y/N
 *- vPos : 보안키패드 위치 0:상단, 1:하단, 2:중단
 *- nextIn : 다음 포커스를 이동해야할 input의 id
  *- sec_key_kind : 암호화키 종류 (스마트보안카드(in-app)일 경우, value는 ssc)
 *ex) _callXecureKeypad_withCallback('drot_acnt_pwd', '1', '4', '4', '계좌비밀번호를 입력하세요.', null, 'Y', cbFunc);
 -----------------------------------------------------------------------------*/
function _callXecureKeypad_withCallback(vKey, vType, vMinLength, vMaxLength, vDisplayText, cert_proc, islogin, vPos, nextIn, callback, sec_key_kind) {
	// 스마트뱅킹 전면개편 타입변경
	if(vType == "1") vType = "4";
	else if(vType == "0") vType = "5";
	
	if(!_isRealApp){
		$("#" + vKey).val('').removeAttr("realValue");
		
		var value = prompt(vDisplayText);
		if(!MobUtil.isEmpty(value)){
			if(value.length >=Number(vMinLength) && value.length<=Number(vMaxLength)){
				var t = '';
				for(var i=0;i<value.length;i++){
					t += '*';
				}
				$("#" + vKey).val(t).attr('realValue',value);
				
				if(MobUtil.isEmpty(nextIn) && typeof callback == 'function'){
					var data = {};
					data['_errcode'] = '0000';
					
					var dataArr = new Array();
					var dataWrap = {};
					dataArr.push(data);
					dataWrap['_iweb_key'] = dataArr;
					callback.apply(dataWrap);
				}
			}else{
				alert('자릿수 확인 요망!');
				var data = {};
				data['_errcode'] = '9999';
				
				var dataArr = new Array();
				var dataWrap = {};
				dataArr.push(data);
				dataWrap['_iweb_key'] = dataArr;
				callback.apply(dataWrap);
				return;
				return;
			}
		}else{
			var data = {};
			data['_errcode'] = '9999';
			
			var dataArr = new Array();
			var dataWrap = {};
			dataArr.push(data);
			dataWrap['_iweb_key'] = dataArr;
			callback.apply(dataWrap);
			return;
		}
		
		var dataArr = new Array();
		var dataWrap = {};
		var data = {};
		data['_errcode'] = '0000';
		data['_encryptdata'] = value;
		data['_inputlength'] = value.length;
		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['_cert_proc'] = cert_proc;
		data['sec_key_kind'] = sec_key_kind;
		dataArr.push(data);
		dataWrap['_iweb_key'] = dataArr;
		uf_iwebkey(dataWrap);
		
		return;
	}

	var target = $("#" + vKey).val('').removeAttr("realValue");

	iwebkeyId = vKey;

	var data = {};
	if(_isIphone()) {
		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = (vPos == null) ? "" : vPos;
		data['_nextinput'] = (nextIn == null) ? "" : nextIn;
		data['_cert_proc'] = (cert_proc == null) ? "" : cert_proc;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;

	} else if(_isAndroid()) {
		data['_key'] = vKey;
		data['_type'] = Number(vType);
		data['_minlength'] = Number(vMinLength);
		data['_maxlength'] = Number(vMaxLength);
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;
	}
	
	var func = "loadSecureKeyBoard";
		
	// 스마트보안카드(in-app)일 경우,
	// 보안키패드 플러그인 호출 시, 금결원에서 받은 암호화키로 암호화 처리를 해야하므로,
	// 그 여부를 구분할 수 있는 파라미터를 추가
	if (sec_key_kind === 'ssc') {
		func = "digitalOTP";
		data['type'] = "loadSecureKeyBoard";
		data['sec_key_kind'] = sec_key_kind;
	}
	console.log(data);
	
	$.nativeCall(func, [data]).done(function(res){
		var dataArr = new Array();
		var dataWrap = {};
		res['_key'] = vKey;
		res['_type'] = vType;
		res['_minlength'] = vMinLength;
		res['_maxlength'] = vMaxLength;
		res['_displaytext'] = vDisplayText;
		res['_islogin'] = islogin;
		res['_displaypos'] = vPos;
		res['_nextinput'] = nextIn;
		res['_cert_proc'] = cert_proc;
		res['sec_key_kind'] = sec_key_kind;
		
		dataArr.push(res);
		
		if(res._errcode == "0000"){
			dataWrap['_iweb_key'] = dataArr;
			//uf_iwebkey(dataWrap);
			uf_iwebkey_withCallback(dataWrap,callback);
//				if(typeof callback == "function") {
//					callback.apply(res);
//				}
			//});
		}else if(res._errcode == "9999"){
			dataWrap['_iwebkey_cancel'] = dataArr;
			uf_iwebkey_cancel(dataWrap);
			
			//콜백에서 동일한 응답을 받기 위해서
			dataWrap['_iweb_key'] = dataArr;
			if(typeof callback == "function") {
				callback.apply(dataWrap);
			}
		}
		
//		if(typeof callback == "function") {
//			callback.apply(res);
//		}
	}).fail(function(res){
		console.log(" _callXecureKeypad_withCallback fail");
		dataWrap['_iwebkey_cancel'] = dataArr;
		uf_iwebkey_cancel(dataWrap);
	});
}

/*-----------------------------------------------------------------------------
 * 콜백에 데이터를 같이 리턴함, 기존의 함수는 성공인 경우만 콜백 받음
 *인자값 - this, '키패드 타입', '최소길이', '최대길이', '입력 화면의 label 값
 *- vKey : 비밀번호 형식의 id
 *-	vType 키패드 타입 : 5-영문/숫자/특수기호(쿼티), 4-숫자
 *-	vMinLength 최소 길이 : 0일 경우 제한 없음(안드로이드일 경우 지원하지 않음)
 *-	vMaxLength 최대 길이 : 0일 경우 제한 없음(안드로이드일 경우 1~16자리)
 *-	vDisplayText 입력 화면의 label 값
 *-	cert_proc
 *- islogin : 로그인 여부 Y/N
 *- vPos : 보안키패드 위치 0:상단, 1:하단, 2:중단
 *- nextIn : 다음 포커스를 이동해야할 input의 id
  *- sec_key_kind : 암호화키 종류 (스마트보안카드(in-app)일 경우, value는 ssc)
 *ex) _callXecureKeypad_withCallback('drot_acnt_pwd', '1', '4', '4', '계좌비밀번호를 입력하세요.', null, 'Y', cbFunc);
 -----------------------------------------------------------------------------*/
function _callXecureKeypad_withCallbackWithData(vKey, vType, vMinLength, vMaxLength, vDisplayText, cert_proc, islogin, vPos, nextIn, callback, sec_key_kind) {
	// 스마트뱅킹 전면개편 타입변경
	if(vType == "1") vType = "4";
	else if(vType == "0") vType = "5";
	
	if(!_isRealApp){
		//$("#" + vKey).val('').removeAttr("realValue");
		var value = prompt(vDisplayText);
		if(!MobUtil.isEmpty(value)){
			if(value.length >=Number(vMinLength) && value.length<=Number(vMaxLength)){
				var t = '';
				for(var i=0;i<value.length;i++){
					t += '*';
				}
				$("#" + vKey).val(t).attr('realValue',value);
				
				if(MobUtil.isEmpty(nextIn) && typeof callback == 'function'){
					callback.apply();
				}
			}else{
				alert('자릿수 확인 요망!');
				return;
			}
		}else{
			return;
		}
		
		var dataArr = new Array();
		var dataWrap = {};
		var data = {};
		data['_errcode'] = '0000';
		data['_encryptdata'] = value;
		data['_inputlength'] = value.length;
		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['_cert_proc'] = cert_proc;
		data['sec_key_kind'] = sec_key_kind;
		dataArr.push(data);
		dataWrap['_iweb_key'] = dataArr;
		uf_iwebkey(dataWrap);
		
		return;
	}

	var target = $("#" + vKey).val('').removeAttr("realValue");

	iwebkeyId = vKey;

	var data = {};
	if(_isIphone()) {
		data['_key'] = vKey;
		data['_type'] = vType;
		data['_minlength'] = vMinLength;
		data['_maxlength'] = vMaxLength;
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = (vPos == null) ? "" : vPos;
		data['_nextinput'] = (nextIn == null) ? "" : nextIn;
		data['_cert_proc'] = (cert_proc == null) ? "" : cert_proc;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;

	} else if(_isAndroid()) {
		data['_key'] = vKey;
		data['_type'] = Number(vType);
		data['_minlength'] = Number(vMinLength);
		data['_maxlength'] = Number(vMaxLength);
		data['_displaytext'] = vDisplayText;
		data['_islogin'] = islogin;
		data['_displaypos'] = vPos;
		data['_nextinput'] = nextIn;
		data['title'] = vDisplayText;
		data['hint'] = vDisplayText;
	}
	
	var func = "loadSecureKeyBoard";
		
	// 스마트보안카드(in-app)일 경우,
	// 보안키패드 플러그인 호출 시, 금결원에서 받은 암호화키로 암호화 처리를 해야하므로,
	// 그 여부를 구분할 수 있는 파라미터를 추가
	if (sec_key_kind === 'ssc') {
		func = "digitalOTP";
		data['type'] = "loadSecureKeyBoard";
		data['sec_key_kind'] = sec_key_kind;
	}
	console.log(data);
	
	$.nativeCall(func, [data]).done(function(res){
		var dataArr = new Array();
		var dataWrap = {};
		res['_key'] = vKey;
		res['_type'] = vType;
		res['_minlength'] = vMinLength;
		res['_maxlength'] = vMaxLength;
		res['_displaytext'] = vDisplayText;
		res['_islogin'] = islogin;
		res['_displaypos'] = vPos;
		res['_nextinput'] = nextIn;
		res['_cert_proc'] = cert_proc;
		res['sec_key_kind'] = sec_key_kind;
		dataArr.push(res);
		
		/**
		if(res._errcode == "0000"){
			dataWrap['_iweb_key'] = dataArr;
			uf_iwebkey(dataWrap);
		}else if(res._errcode == "9999"){
			dataWrap['_iwebkey_cancel'] = dataArr;
			uf_iwebkey_cancel(dataWrap);
		}
		**/
		if(typeof callback == 'function'){
			callback.apply(res);
		}
	}).fail(function(res){
		console.log("fail");
		if(typeof callback == 'function'){
			callback.apply(res);
		}
	});
}

/**
 * callCertSign
 *
 * @param plain
 * @param serialkey
 * @returns
 */
function callCertSign(plain, serialkey) {
	if(isEmpty(plain)) {
		alert("전자서명 값이 없습니다.");
		return false;
	}

		$.nativeCall('signWithCertificate',[false,plain]).done(function(dat){
			_secretform_var.isExcuted = false;
			secretform_signdata(dat['signedData']);
		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
		return true;
//    } else if(_isAndroid()){
//    	obj = $("#cert_signed_msg");
//
//    	try {
//    		if(plain.indexOf("|") > -1) {
//        		//다건서명
//        		if(serialkey == "" || serialkey == "000000") {
//        			alert("인증서 정보가 올바르지 않습니다.");
//            	} else {
//            		obj.val(Sign_with_option_multi(serialkey, 0, 0, plain, false, "|"));
//
//            		//2013.06.28 다건일경우 공인인증서팝업 취소시  | 가(delimeter) 리턴되기때문..에 위처럼 처리했으나
//            		//false 를 리턴하므로 secretform 에서 "전자서명이 올바르지 않습니다." alert 이 띄워져서 ==> alert뜨지않게처리하기 위함
//            		if(obj.val()=="multi_sign_cancel") return "multi_sign_cancel";
//            	}
//        	} else {
//        		//단건서명
//        		if(serialkey == "" || serialkey == "000000") {
//            		obj.val(Sign_with_option(0, plain));
//
//            	} else { obj.val(Sign_with_serial(serialkey, 0, plain, 0)); }
//
//        		//2013.06.28 단건일경우 공인인증서팝업 취소시  "" 리턴되기때문
//        		//false 를 리턴하므로 secretform 에서 "전자서명이 올바르지 않습니다." alert 이 띄워져서 ==> alert뜨지않게처리하기 위함
//        		if(obj.val()=="single_sign_cancel") return "single_sign_cancel";
//
//        	}
//
//    	} catch(e){alert(e);}
//
//    	if(isEmpty(obj.val())) return false;
//    	return true;
//    }
//
//	return false;
}

/**
 * callCertSignKFTC @Deprecated by minkoo
 *
 * @param plain
 * @param serialkey
 * @returns {Boolean}
 */
function callCertSignKFTC(plain, serialkey) {
	if(isEmpty(plain)) {
		alert("전자서명 값이 없습니다.");
		return false;
	}
	if(isEmpty(serialkey)) {
		alert("로그인한 인증서 정보가 없습니다.");
		return false;
	}
	if(_isIphone()) {
		if(isPAD()) {
			window.location = 'iwebactionneoibkt:{\"_action_code\":\"cs_signdataKFTC()\",\"_sign_data\":\"'+plain+'\"}';
		}else{
			window.location = 'iwebactionneoibk:{\"_action_code\":\"cs_signdataKFTC()\",\"_sign_data\":\"'+plain+'\"}';
		}
        return true;
    } else if(_isAndroid()){
    	obj = $("#cert_signed_msg");
    	try {
    		if(plain.indexOf("|") > -1) {
        		obj.val(Sign_with_option_multi(serialkey, 0, 2+256+65536, plain, false, "|"));
        	} else {
        		obj.val(Sign_with_serial(serialkey, 0, plain, 2+256+65536));
        	}
    	} catch(e) {alert(e);}

    	if(isEmpty(obj.val())) return false;
    	return true;
    }

	return false;
}
/**
 * showLoadImg @Deprecated by minkoo
 * 로딩이미지 활성화 토글
 * @param isShow : 활성화여부
 * @param backKey : 뒤로가기 여부
 * @return
 */
function showLoadImg(isShow, backKey){

	if(isEmpty(backKey)){
		backKey = false;
	}

	if(isIphone()) {
		if(isShow) {
			$("#wrap").hide();
			$("#loadingimage").show();
		} else {
			$("#loadingimage").hide();
			$("#wrap").show();
		}
	} else if(isAndroid()) {
		if(isShow) {
		    window.BrowserBridge.iwebactionneoibk("{\"_action_code\":\"5888\",\"_action_back\":\""+ backKey+"\"}");
		} else {
		    window.BrowserBridge.iwebactionneoibk("{\"_action_code\":\"5889\",\"_action_back\":\""+ backKey+"\"}");
		}
	}
} /* end of webViewExit */

/**
 * 아이패드이면서 6.0 이상이면 true
 * @returns {Boolean}
 */
function isPAD(){
	var userAgent = navigator.userAgent;
	if(_isIphone){
		if(userAgent.indexOf("nma-app-type=iPad") > -1){
			return true;
		} else {
			return false;
		}
	} else if(_isAndroid()) {
		if(userAgent.indexOf("nma-app-type=tab") > -1){
			return true;
		} else {
			return false;
		}
	}
	return false;
}

/**
 * 앱의 완료버튼을 보여줄지 숨길지여부를 정하고, 완료버튼 클릭시 해당 함수를 호출
 * @param {JSONObject} params
 * 			isShow 완료버튼을 보여줄지말지 여부 : "Y" or "N"
 * 			functionName 완료버튼을 클릭했을 경우 호출해줄 함수
 * 			btnCalendar calendar 버튼 id ( calendar attribute가 설정된 id)
 * @example _callBtnCompleteAction({"isShow":"Y","functionName":"uf_calendar_complate_test"})
 *
 * TODO 사용여부 체크 필요 by Chominkoo
 */
function _callBtnCompleteAction(params){
	var phoneType = _getPhoneType();
	var data={};

	data["_action_code"]		= "6009";
	data["_isComplete"]			= params['isShow'];
	data["_func_name"] 			= params['functionName'];
	data["_btn_calendar"]		= params['btnCalendar'];

	//alert("임시확인용 alert\nisShow:"+data['_isComplete']+"\nfunctionName:"+data['_func_name']+"\nbtnCalendar:"+data['_btn_calendar']);
	if(phoneType == "I") {
		window.location	= "iwebactionneoibk:"+JSON.stringify(data);
	}else if(phoneType == "A") {
		window.BrowserBridge.iwebactionneoibk(JSON.stringify(data));
	}

}

// 2015.04.07 앱버젼 체크 추가

function comWebkey_getAppVersion() {
	var userAgent = navigator.userAgent;
	var agentKey = "";
	var appVer = "1.0.0";
	var _phoneType = _getPhoneType();

	if(_phoneType == "I") {
		agentKey = "nma-app-ver=";
	}else {
		agentKey = "app-ver=";
	}
	var agentpos = userAgent.lastIndexOf(agentKey);
	if (agentpos > -1) {
		appVer   = userAgent.substring(userAgent.lastIndexOf(agentKey)+agentKey.length, userAgent.lastIndexOf(agentKey)+agentKey.length+5);

		return appVer;
	} else {
		return appVer;
	}
}
/**
 * 네이티브에 있는 FDS 디바이스 정보를 가져온다
 *
 **/
var wdata = "";
var natip = "";
function _getFdsInfo() {
	$.nativeCall('getFdsInfo').done(function(dat) {
		wdata = dat["WDATA"];
		natip = dat["NATIP"];
	});
}

function _getFWdata() {
	return wdata;
}
function _getFNIP() {
	return natip;
}

/**
 * 네이티브에 있는 스크레핑 함수 호출
 *
**/
var mwSniperData;

function _getMWSniper(serviceId, regNo) {
	var dat = $.nativeCall('getMWSniper',[serviceId,regNo]);

	return dat;
}

/**
 * 네이티브 -->  호출하는 함수 (iPhone만)  userAgent를 초기화 화기 위한 처리
 *
**/
function comWebkey_callDummyHtml() {
	$("body").append($('<iframe style="display:none;" width="0px" height="0px" src="../../dummy.html"></iframe>'));
}

//로그인정보 조회 (인증서목록, aaplus 앱위변조 검증데이터)
function comWebkey_getDeviceLoginInfo(callback) {
	if(_isRealApp) {
		var obj = {};
		$.nativeCall('getDeviceLoginInfo', []).done(function(dat){
			obj.cert_list             = dat['cert_list'            ]; //인증서목록
			obj.login_level           = dat['login_level'          ]; //인증서로그인
			obj.aaplus_verfication_yn = dat['aaplus_verfication_yn']; //aaplus 데이터 생성여부
			obj.current_login_tab     = dat['current_login_tab'    ]; //최종 로그인 타입 code[공동인증서:01, 금융인증서:08]
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.cert_list       =  [{
				  sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2017-06-17 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.4"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			},{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
			  , sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
			  , sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
			  , sm_cert_to_date           : "2017-06-17 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
			  , sm_cert_policy_id         : "1.2.410.200005.1.1.4"   //인증서 정책
			  , sm_cert_subject_rdn       : "cn=사업자()0003041201606171422578,ou=IBK,ou=corp4IB,o=yessign,c=kr" //인증서 subject rdn
			  , sm_cert_display_cn        : "사업자()0003041201606171422578" //인증서 subject cn
			  , sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
		  }];
		obj.login_level           = "1"   ; //인증서로그인
		obj.aaplus_verfication_yn = "N"   ; //aaplus  (인증서 검증 값이 Y이면 검증이 끝난 것이고, N이면 검증 중이란 걸 나타냄)
		obj.current_login_tab     = "01"  ; //최종 로그인 타입 code[공동인증서:01, 금융인증서:08]
		callback.apply(obj);
	}
}
//전자서명
/**
 * 
 * @param plain_text
 * @param cert_info
 * @param show_cert_list_yn
 * @param use_cert_info_yn
 * @param use_ibksignedtime_yn
 * @param callback
 * @returns
 */
function comWebkey_signWithCertificate(plain_text, cert_info, show_cert_list_yn, use_cert_info_yn, use_ibksignedtime_yn, callback,kftcSign) {
	if(isEmpty(plain_text)) {
		alert("전자서명 값이 없습니다.");
		return false;
	}
	
	var subType = "";
	if("login" == plain_text || "cert" == plain_text || "rnc" == plain_text 
			|| "scrappingSign" == plain_text || "scraping" == plain_text || "vid_verify" == plain_text) {
		subType = plain_text;
	} else {

		subType = "sign";
		
		//로그인 후 전자사명시 간편인증으로 로그인한 경우 간편인증 파라메터를 넣어준다.
		//1. 로그인 패턴 -> 전자서명 PIN
		//2. 로그인 생체 -> 전자서명 생체
		if("" != LGN_PIN_TYPE) {
//			if("3" == LGN_PIN_TYPE) {
//				cert_info["sm_pin_cert_type"] = "3";//바이오
//			} else {
//				cert_info["sm_pin_cert_type"] = "1";//패턴
//			}
			cert_info["sm_pin_cert_type"] = LGN_PIN_TYPE;
		}
	}
	
	var isKdfType = false;
	
	if("scrappingSign" == plain_text || "scraping" == plain_text) {
		isKdfType = true;
	}
	
	//전자어음인 경우 subType 추가
	if(kftcSign != undefined && kftcSign == "kftcSign") {
		subType = "kftcSign";
	}
	
	//인증서 본안확인
	if(kftcSign != undefined && kftcSign == "kftcSign") {
		subType = "kftcSign";
	}
			
	
	if(_isRealApp) {
		var obj = {};
		$.nativeCall('wizvera',[{"type" : "signWithCertificate"
								, "subType" : subType
								, "title" : "공동인증서 비밀번호를 입력해 주세요"
								, "hint" : "인증서 비밀번호를 입력해 주세요."
								, "keypad_type" : 5
								, "keypad_maxlength" : 52
								, "_minlength" : 1
								, "isKdfType" : isKdfType  
								, "plain_text" : plain_text
								, "cert_info" : cert_info
								, "show_cert_list_yn" : show_cert_list_yn
								, "use_cert_info_yn" : use_cert_info_yn
								, "use_ibksignedtime_yn" : use_ibksignedtime_yn}]).done(function(dat){
			_secretform_var.isExcuted = false;
			obj.signed_msg = dat['signed_msg'];
			
			if(dat["_errcode"] != undefined && dat["_errmsg"] != undefined) {
				return callback.apply(dat);
			}

			// 2018.10.16, add by Jung, 비대면계좌개설 스크래핑으로 인한 추가
			if (plain_text == 'scraping') {
				obj['vidRandom'] = dat['vidRandom'];
				obj['display'] = dat['display'];
				obj['subject_rdn'] = dat['subject_rdn'];
				obj['issuercn'] = dat['issuercn'];
				obj['key_data'] = dat['key_data'];
				obj['cert_data'] = dat['cert_data'];
				
				var ecrypt_data = dat ? (dat['_encryptdata'] || '') : '';
				if (ecrypt_data) {
					obj['_encryptdata'] = ecrypt_data;
					obj['_inputlength'] = dat['_inputlength']; // 암호화전 비밀번호 길이, only 안드로이드, by 서영준대리님 요청
					return callback(obj);
				}
			}
			
			//전자서명인 경우 항상 vidRandom을 내려준다.
			if(subType == "sign" || subType == "vid_verify") {
				obj["vidRandom"] = dat["vidRandom"];
			}
			
			if(subType == "login" && obj.signed_msg == "block") {
				obj["login_type"] = dat["login_type"];
				obj["fail_cnt"] = dat["fail_cnt"];
			}
			

			callback.apply(obj);
		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
	} else {
		var obj = {};
		obj.signed_msg = plain_text;
		_secretform_var.isExcuted = false;
		callback.apply(obj);
	}
	return true;
}

function comWebkey_signWithCertificate_ASIS(plain_text, cert_info, show_cert_list_yn, use_cert_info_yn, use_ibksignedtime_yn, callback) {
	if(isEmpty(plain_text)) {
		alert("전자서명 값이 없습니다.");
		return false;
	}
	if(_isRealApp) {
		var obj = {};
		$.nativeCall('signWithCertificate',[{"plain_text":plain_text
								, "cert_info":cert_info
								, "show_cert_list_yn":show_cert_list_yn
								, "use_cert_info_yn":use_cert_info_yn
								, "use_ibksignedtime_yn":use_ibksignedtime_yn}]).done(function(dat){
			_secretform_var.isExcuted = false;
			obj.signed_msg = dat['signed_msg'];

			// 2018.10.16, add by Jung, 비대면계좌개설 스크래핑으로 인한 추가
			if (plain_text == 'scraping') {
				var ecrypt_data = dat ? (dat['_encryptdata'] || '') : '';

				if (ecrypt_data) {
					obj['_encryptdata'] = ecrypt_data;
					obj['_inputlength'] = dat['_inputlength']; // 암호화전 비밀번호 길이, only 안드로이드, by 서영준대리님 요청
					return callback(obj);
				}
			}

			callback.apply(obj);
		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
	} else {
		var obj = {};
		obj.signed_msg = plain_text;
		_secretform_var.isExcuted = false;
		callback.apply(obj);
	}
	return true;
}

/**
 * 2019.01.11 비대면전자약정서'관련 :: PDF hash값 전자서명
 *
 *   signFileInfo (전자서명)처리 데이타형식(다건처리)
 *     1.호출부(예시) ::  서버 ==> 앱
 *        [{"pdfkey":"hashvalue1"},{"pdfkey":"hashvalue2"},{"pdfkey":"hashvalue3"}]
 *
 *     2.응답부(예시) ::  앱   ==> 서버
 *        {"signed_msg_list":[{"signed_msg":"786959a8sdf"},{"signed_msg":"5896d5fb087"},{"signed_msg":"sd9g876ns89"}]};
 *
 * @param callback
 * @returns {Boolean}
 */
function comWebkey_signFileInfo(plain_list, callback) {
	if(isEmptyArray(plain_list)) {
		alert("비대면전자약정서 전자서명 값이 없습니다.");
		return false;
	}
	if(_isRealApp) {
		var obj = {};
		
		//간편인증 전자서명 추가
		var cert_info = {};
		if("" != LGN_PIN_TYPE) {
			cert_info["sm_pin_cert_type"] = LGN_PIN_TYPE;
		} else {
			cert_info["sm_pin_cert_type"] = "";
		}

		$.nativeCall('wizvera', [{"type" : "signFileInfo", "sign_list" : plain_list, "cert_info" : cert_info}]).done(function(dat){
			
			$sign_result = dat;
			
			if($sign_result.signed_msg == "cancel" || $sign_result.signed_msg == "CANCEL"){ //2013.07.18
				//인증서팝업 취소 button  click 시
				_secretform_var.isExecuted = false;	//W클릭 방지
				return;
			}  else if($sign_result.signed_msg == "block") {
				
				MobPopup.showConfirmQckPopup('간편인증 5회 잘못 입력했습니다.\재설정 할까요?', "",
					function(){ //재설정
							
						comWebkey_goMenu("5005","cmc_sim_010101_1");
						return;
						
						
					},
					function(){//다음에
						_secretform_var.isExecuted = false;	//W클릭 방지
						return;
					},
					"다음에",
					"재설정",
					""
					);
				return;
				
				
			}
			
			if(_isAndroid()) {
				
				if($sign_result["_errcode"] != undefined) {

					_secretform_var.isExecuted = false;	//W클릭 방지
					
					if($sign_result["_errcode"] == "-907" || $sign_result["_errcode"] == "-908") {
						//사용자 취소
						console.log("사용자취소");
						return;
					}
					
					//바이오 변경
					else if($sign_result["_errcode"] == "-902" ) {
						MobPopup.showAlertPopup("바이오인증 정보가 변경되었습니다<br><br>[인증.보안 > 간편인증수단관리 >바이오인증 재설정] 메뉴에서 다시 설정해 주세요.","",null, "");
						return;
						
					}
					
					else if($sign_result["_errcode"] == "-915" ) {
						MobPopup.showAlertPopup("바이오인증 오류로 일시 잠겼습니다. 잠시후 이용해 주세요,",null, "");
						return;
						
					}
					
					else if($sign_result["_errcode"] == "-917") {
						MobPopup.showAlertPopup("기기에서 발생한 오류 횟수 초과로 i-ONE뱅크 기업의 바이오 인증을 사용하실 수 없습니다.<br><br>기기 설정에서 오류 초기화 진행 후 다시 이용해 주세요",null,null,null);
						return;
					}
					
					else if($sign_result["_errcode"] == "-919" ) {
						MobPopup.showAlertPopup("휴대폰에 등록 된 지문정보가 정보가 존재하지 않습니다.<br><br>지문 등록 후 다른 방법으로 로그인 후 인증.보안 > 공동인증서> 간편인증수단관리 메뉴에서 다시 설정해 주세요.","",null, "");
						return;
						
					} else {
						MobPopup.showAlertPopup("바이오인증시 오류가 발생하였습니다.\n" + $sign_result["_errmsg"] + "(" + $sign_result["_errcode"] + ")","",null, "");
						return;
					}
					
					
				}
				
			}
			
			if(_isIphone()) {
				if($sign_result["_errcode"] != undefined) {

					_secretform_var.isExecuted = false;	//W클릭 방지
					
					if($sign_result["_errcode"] == "-906") {
						MobPopup.showAlertPopup("기기에서 발생한 오류 횟수 초과로 i-ONE뱅크 기업의 바이오 인증을 사용하실 수 없습니다.<br><br>기기 설정에서 오류 초기화 진행 후 다시 이용해 주세요",null,null,null);
						return;
					}
					
					if($sign_result["_errcode"] == "-907" || $sign_result["_errcode"] == "-908") {
						return;
					}
					
					//바이오 변경
					else if($sign_result["_errcode"] == "-902" ) {
						MobPopup.showAlertPopup("바이오인증 정보가 변경되었습니다<br><br>[인증.보안 > 간편인증수단관리 >바이오인증 재설정] 메뉴에서 다시 설정해 주세요.","",null, "");
						return;
					} else {
						MobPopup.showAlertPopup("바이오인증시 오류가 발생하였습니다.\n" + $sign_result["_errmsg"] + "(" + $sign_result["_errcode"] + ")","",null, "");
						return;
					}
					
				}
				
			}
			
			
			_secretform_var.isExcuted = false;

			obj.signed_msg_list = dat['signed_msg_list'];

			callback.apply(obj);

		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
	} else {
		var obj = {};
		obj.signed_msg_list = plain_list;
		_secretform_var.isExcuted = false;
		callback.apply(obj);
	}
	return true;
}


/**
 * 2020.07.01  비대면전자약정서'관련 :: PDF hash값 [개인인증서]전자서명
 *
 * signFileWithVid  개인인증서(전자서명)처리 데이타형식(다건처리)
 *     1.호출부(예시) ::  서버 ==> 앱
 *        [{sign_list:[{"pdfkey":"hashvalue1"},{"pdfkey":"hashvalue2"}, ..], cert_info:{}, server_cert:{}}]
 *
 *     2.응답부(예시) ::  앱   ==> 서버
 *        {"vid": "..", signed_msg : "..", signed_msg_list: [{"signed_msg":"786959a8sdf"},{"signed_msg":"5896d5fb087", ..], _encryptdata: ".."}
 *
 * @param callback
 * @returns
 */
function comWebkey_signFileWithVid(paramOjb, callback) {
	if(undefined == paramOjb) {
		alert("비대면전자약정서 전자서명 값이 없습니다.");
		return false;
	}
	if(_isRealApp) {
		var obj = {};
		var reqObj = {};
		reqObj["signed_key" ] = paramOjb["signed_key" ];
		reqObj["sign_list"  ] = paramOjb["sign_list"  ];
		reqObj["cert_info"  ] = paramOjb["cert_info"  ];
		reqObj["server_cert"] = paramOjb["server_cert"]; //vid검증을 위한 server_cert :: [certCreateVidInfo를 참조해서 "server_cert"]

		$.nativeCall('wizvera', [{"type" : "signFileWithVid", "sign_list" : reqObj}]).done(function(dat){
			_secretform_var.isExcuted = false;

			obj.signed_msg_list = dat['signed_msg_list'];
			obj.signed_msg      = dat['signed_msg'     ];
			obj.vid             = dat['vid'            ];
			obj._encryptdata    = dat['_encryptdata'   ];

			callback.apply(obj);

		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
	} else {
		var obj = {};
		obj.signed_msg_list = paramOjb["sign_list"];
		_secretform_var.isExcuted = false;
		callback.apply(obj);
	}
	return true;
}

/**
 * 2020.09.14  비대면전자약정서'관련 :: PDF hash값 [개인인증서]전자서명 2회->1회
 *
 * signFileWithCertInfo  개인인증서(전자서명)처리 데이타형식(다건처리)
 *     1.호출부(예시) ::  서버 ==> 앱
 *        [{sign_list:[{"pdfkey":"hashvalue1"},{"pdfkey":"hashvalue2"}, ..], cert_info:{}, server_cert:{}}]
 *
 *     2.응답부(예시) ::  앱   ==> 서버
 *        {"vid": "..", signed_msg : "..", signed_msg_list: [{"signed_msg":"786959a8sdf"},{"signed_msg":"5896d5fb087", ..], _encryptdata: ".."}
 *
 * @param callback
 * @returns
 */
function comWebkey_signFileWithCertInfo(paramOjb, callback) {
	if(undefined == paramOjb) {
		alert("비대면전자약정서 전자서명 값이 없습니다.");
		return false;
	}
	if(_isRealApp) {
		var obj = {};
		var reqObj = {};
		reqObj["signed_key" ] = paramOjb["signed_key"];
		reqObj["sign_list"  ] = paramOjb["sign_list"  ];
		reqObj["cert_info"  ] = paramOjb["cert_info"  ];
		reqObj["server_cert"] = paramOjb["server_cert"]; //vid검증을 위한 server_cert :: [certCreateVidInfo를 참조해서 "server_cert"]

		$.nativeCall('wizvera', [{"type" : "signFileWithCertInfo", "sign_list" : reqObj}]).done(function(dat){
			_secretform_var.isExcuted = false;

			obj.signed_msg_list = dat['signed_msg_list']; //pdf 전자 서명 결과 리스트
			obj.signed_msg      = dat['signed_msg'     ]; //전자서명 결과값
			obj.vidRandom             = dat['vidRandom'            ]; //vid값

			obj._encryptdata    = dat['_encryptdata'   ]; //인증서암호|^|암호화키
			obj.cert_data       = dat['cert_data'      ]; //인증서 파일(바이트 문자열)
			obj.key_data        = dat['key_data'       ]; //개인키 파일(바이트 문자열)
			obj.display         = dat['display'        ]; //인증서 출력명
			obj.todate          = dat['todate'         ]; //인증서 만료일
			obj.issuercn        = dat['issuercn'       ]; //인증서 코드
			obj.subject_rdn     = dat['subject_rdn'    ]; //인증서 이름

			callback.apply(obj);

		}).fail(function(){
			_secretform_var.isExcuted = false;
		});
	} else {
		var obj = {};
		obj.signed_msg_list = paramOjb["sign_list"];
		_secretform_var.isExcuted = false;
		callback.apply(obj);
	}
	return true;
}

//AAPlus 앱위변조 데이터 조회
function comWebkey_getAaPlus(callback) {
	if(_isRealApp) {
		var obj = {};
		//$.nativeCall('getAaPlus',[]).done(function(dat){
		$.nativeCall('getAppIntegrityToken',[]).done(function(dat){
			obj.appToken = dat["appToken"];
			callback.apply(obj);
		}).fail(function(){
		});
	} else {
		var obj = {};
		obj.aaplus_result_yn    = "Y"; //aaplus 앱위변조 검증완료(위변조된 앱이 아님)
		callback.apply(obj);
	}
	return true;
}
//Login데이터 앱에 올려주기  이후 처리는 앱이 처리함 (메인으로 보낼지, 로그인되지 않은 상태에서 로그인이 필요한 메뉴에 접근했을 때 해당메뉴로 보낼지)
function comWebkey_setLoginData(loginData) {
	if(_isRealApp) {
		var obj = {};
		$.nativeCall('setLoginData', [loginData]).done(function(dat){
		}).fail(function(){
		});
	} else {
		//메뉴화면으로 이동
		location.href = "/html/phone/test/lgn/html_list.html";
	}
	return true;
}

/**
 * 로그인
 * @param callback
 * @param type (로그인타입)
 * 01 - 인증서로그인
 * 02 - 원아이디로그인
 * 03 - 핀로그인
 * 04 - 바이오인증로그인
 */
function comWebkey_login (callback, type){
	type = type ? type : '';
	if(_isRealApp) {
		$.nativeCall('login',[{"type" : type}]).done(function(){
			if(typeof callback == 'function'){
				callback.apply();
			}else{
				location.reload();
			}
		});
	} else {
		//가상로그인 페이지로 이동
		window.open("/jsp/phone/test/lgn/vir_login_view.jsp", "login_page", "target=_blank");
	}
}

//Logout
function comWebkey_logout() {
	if(_isRealApp) {
		$.nativeCall('logout', []).done(function (dat) {
		});
	} else {
		//가상로그인 페이지로 이동
		location.href = "/jsp/phone/test/lgn/vir_login_view.jsp";
	}
}
//세션 갱신을 한다.(~.jsp를 호출하고, 앱에 sessionTimer를 초기화한다.)
function comWebkey_refreshSession() {
	if(_isRealApp) {
		$.nativeCall('refreshSession', []).done(function (dat) {
		});
	} else {
	}
}

//비밀번호 비교
function comWebkey_comparePwd(pwd1, pwd2, callback) {
	if(_isRealApp) {
		$.nativeCall('comparePwd', [{"pwd1" :  pwd1, "pwd2" : pwd2} ]).done(function(dat) {
			var obj = {};
			compareFlag = dat["result"];
			if (compareFlag == "YES") {
				obj.pwdAccordYn = "Y"; //일치
			} else {
				obj.pwdAccordYn = "N"; //불일치
			}
			callback.apply(obj);
		});
	} else {
		var obj = {};
		if(pwd1 == pwd2) {
			obj.pwdAccordYn = "Y"; //일치
		} else {
			obj.pwdAccordYn = "N"; //불일치
		}
		callback.apply(obj);
	}
}
//인증서 발급/재발급에서 사용하는 cmp 통신
function comWebkey_cs_CertIssue(refCode, authCode, cstatus, ATSH_ISNC_DCD, callback) {
	var ca_type = 0 ;
	var ca_ip   = "";
	var ca_port = 0 ;
	try{
		//2015.05.29 테스트,운영 구분 방식 변경
		if (_isDevMode === true) { //개발
			//ATSH_ISNC_DCD 인증서발급 구분코드  //금결원 개인(3 : 기업, 5: 개인)  정보인증 범용 (6: 개인, 7: 기업)
			if(ATSH_ISNC_DCD == "7") {
//				ca_type = 12 + 256;
				ca_type = "kica";
				ca_ip = "211.35.96.115;signGATE CA4";
				ca_port = 4502;
			} else {
//				ca_type = 11 + 256;
				ca_type = "yessign";
				ca_ip = "203.233.91.231;yessignCA-Test Class 1";
				ca_port = 4512;
			}
		}
		else { //운영
			//ATSH_ISNC_DCD 인증서발급 구분코드  //금결원 개인(3 : 기업, 5: 개인)  정보인증 범용 (6: 개인, 7: 기업)
			if(ATSH_ISNC_DCD == "7") {
//				ca_type = 12;
				ca_type = "kica";
				ca_ip = "211.35.96.43;signGATE CA2";
				ca_port = 4502;
			} else {
//				ca_type = 11;
				ca_type = "yessign";
				ca_ip = "203.233.91.71;yessignCA,yessignCA Class 1";
				ca_port = 4512;
			}
		}

		// 2015.03.25 아이폰  범용인증서일 경우 발급, 재발급 사용하는 함수가 다르기때문에 구분값 추가
		// 금결원 YESSIGN 발급, 재발급은 동일
		var _type = "";
		/* ---------------------------------------
		* 조회 return 값에 따른 처리방법     returncode = CSTATUS  사용자 인증서 상태 코드
		* ----------------------------------------
		* returncode  > nextpage > 과금 >  API               > javascript
		*
		* 없다          > 발급    > 비교
		* 10:발급인가   > 발급    > 비교                       > signGATEIssueCert
		* 16:재인가     > 발급    > 비교                       > signGATEIssueCert
		*
		* 25:환불폐지   > 발급    > O    >  registerIssueUser  > signGATEIssueCert
		* 30:만료       > 발급    > O    >  registerIssueUser  > signGATEIssueCert
		*
		* 23:폐지       > 발급    > X    >  registerRenewUser  > signGATEKeyRecovery
		* 13:RA폐지     > 발급    > X    >  registerRenewUser  > signGATEKeyRecovery
		* 24:효력정지   > 발급    > X    >  registerRenewUser  > signGATEKeyRecovery
		* 15:효력회복   > 발급    > X    >  registerRenewUser  > signGATEKeyRecovery
		* 14:RA효력정지 > 발급    > X    >  registerRenewUser  > signGATEKeyRecovery
		*
		* 12:재발급인가 > 재발급  > X    >                     > signGATEKeyRecovery
		*
		* 20:발급       > 재발급  > X    >  registerRenewUser  > signGATEKeyRecovery
		* 22:재발급     > 재발급  > X    >  registerRenewUser  > signGATEKeyRecovery
		* 21:갱신       > 재발급  > X    >  registerRenewUser  > signGATEKeyRecovery
		*
		* 11:RA갱신인가 > 갱신    > 비교 >  registerIssueUser  > signGATEIssueCert
		*/
		//ATSH_ISNC_DCD 인증서발급 구분코드  //금결원 개인(3 : 기업, 5: 개인)  정보인증 범용 (6: 개인, 7: 기업)
		if(ATSH_ISNC_DCD == "7") {
			// 정보인증
			if(cstatus != "" && cstatus != "10" && cstatus != "16") {
				// 재발급
				_type = "K";
			}else {
				// 발급
				_type = "Y";
			}
		}else {
			// 금결원 발급, 재발급
			_type = "Y";
		}

		var data = "";

		data = {"type": "certIssue", "_ca_type": ca_type, "_ca_ip": ca_ip, "_ca_port" : ca_port, "_type" : _type, "_refCode" : refCode, "_authCode" : authCode};

		if(_isRealApp) {
			$.nativeCall('wizvera', [data]).done(function (dat) {
				if(typeof(dat) === 'object'){
					dat["isObject"] = "Y";
				}
				callback.apply(dat);
			});
		} else {
			alert("앱에 보내는 데이터 : " + JSON.stringify(data));
			// CMP 통신이 되지 않은 상태에서 다음단계로 진행 (브라우저일 경우만 테스트를 위해서 진행)
			// KiCA 범용인증서 인경우 cmp 통신이 완료되지 않으면 일련번호(계정계에 등록할 RID에 사용)를 받을 수 없기 때문에 오류 발생
			var obj = 0;
			callback.apply(obj);
		}
	} catch(e){
		MobPopup.showAlertPopup(e, "안내", function() {
		    _webViewExit();
		});
		return;
	}
}

//인증서 갱신에서 사용하는 cmp 통신
function comWebkey_cs_CertRenew(cert_info, callback) {
	var ca_type = 0 ;
	var ca_ip   = "";
	var ca_port = 0 ;
	try{
		if (_isDevMode) {
//			ca_type = 11 + 256;
			ca_type = "yessign";
			ca_ip = "203.233.91.231;yessignCA-Test Class 1";
			ca_port = 4512;
		} else {
//			ca_type = 11;
			ca_type = "yessign";
			ca_ip = "203.233.91.71;yessignCA,yessignCA Class 1";
			ca_port = 4512;
		}

		var data = {"type" : "certRenew", "_ca_type" : ca_type, "_ca_ip" :  ca_ip, "_ca_port" : ca_port, "cert_info" : cert_info};

		if(_isRealApp) {
			$.nativeCall('wizvera', [data]).done(function (dat) {
				if(typeof(dat) === 'object'){
					dat["isObject"] = "Y";
				}
				callback.apply(dat);
			});
		} else {
			alert("앱에 보내는 데이터 : " + JSON.stringify(data));
			// CMP 통신이 되지 않은 상태에서 다음단계로 진행 (브라우저일 경우만 테스트를 위해서 진행)
			var obj = 0;
			callback.apply(obj);
		}
	} catch(e) {
		MobPopup.showAlertPopup(e, "안내", function() {
            _webViewExit();
        });
        return;
	}
}


//타행/타기관 인증서 등록시 vid생성(전자서명 + vid정보를 응답값으로 받음)
function comWebkey_certCreateVidInfo(plain_text, _SERVER_CERT, cert_info, callback) {
	if(isEmpty(plain_text)) {
		alert("전자서명 값이 없습니다.");
		return false;
	}
	if(_isRealApp) {
		var obj = {};
		$.nativeCall('wizvera',[{ "type" : "certCreateVidInfo"
								, "plain_text" : plain_text
								, "cert_info"  : cert_info}]).done(function(dat){
			obj.vid_signed_msg = dat['signed_msg'];
			obj.vid_info       = dat['vidRandom' ];
			callback.apply(obj);
		}).fail(function(){

		});
	} else {
		var obj = {};
		obj.vid_signed_msg = plain_text;
		obj.vid_info       = "vid_info";
		callback.apply(obj);
	}
}


//인증서 가져오기 인증번호 생성  (인증서가져오기 1/2)
function comWebkey_certNumberCreate(callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type": "certNumberCreate"}]).done(function(dat) {
			console.log('certNumberCreate 실행됌')
			var obj = {};
			if(dat["error_code"] == "SC200") {
				obj._is_error = "false";
				obj.confirm_number = dat.confirm_number;
			} else {
				obj._is_error  = "true";
				obj._error_cd  = dat.error_code;
				obj._error_msg = dat.error_msg;
			}
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj._is_error = "false";
		obj.confirm_number = "111122223333";
		callback.apply(obj);
	}
}

//인증서 가져오기 (인증서가져오기 2/2) - 생성된 인증번호를 내보내기에서 입력해서 내보내기 한 후에 호출
function comWebkey_certImport(callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type":"certImport"}]).done(function(dat) {
			var obj = {};
			if(dat["error_code"] == "SC201") {
				obj._is_error = "false";
			} else {
				obj._is_error  = "true";
				obj._error_cd  = dat.error_code;
				obj._error_msg = dat.error_msg;
			}
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj._is_error = "false";
		callback.apply(obj);
	}
}

//QR코드용 인증서 가져오기
function comWebkey_certQRCodeImport(callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type":"certQRCodeImport"}]).done(function(dat) {
			var obj = {};
			if(dat["error_code"] == "000") {
				obj._is_error = "false";
			} else {
				obj._is_error  = "true";
				obj._error_cd  = dat.error_code;
				obj._error_msg = dat.error_msg;
			}
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj._is_error = "false";
		callback.apply(obj);
	}
}

//인증서 내보내기 (인증번호 내보내기)
function comWebkey_certExport(cert_number, callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type":"certExport", "cert_number":cert_number}]).done(function(dat) {
			var obj = {};
			if(dat["error_code"] == "0000") {
				obj._is_error = "false";
			} else {
				obj._is_error  = "true";
				obj._error_cd  = dat.error_code;
				obj._error_msg = dat.error_msg;
			}
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj._is_error = "false";
		callback.apply(obj);
	}
}

//인증서 전체목록 조회 (만료된 인증서까지 조회)
function comWebkey_certGetAllList(callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type":"certGetAllList"}]).done(function(dat) {
			var obj = {};

			obj.cert_list = dat.cert_list;

			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.cert_list       =  [{
				  sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2017-06-17 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.4"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}];
		callback.apply(obj);
	}
}

//인증서 비밀번호 변경
function comWebkey_certPasswordChange(cert_info, callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type": "certPasswordChange", "cert_info": cert_info}]).done(function(dat) {
			var obj = {};

			obj.cert_change_yn = dat["cert_change_yn"];

			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.cert_change_yn = "Y";
		callback.apply(obj);
	}
}

//인증서 삭제
function comWebkey_certDelete(cert_info, callback) {
	if(_isRealApp) {
		$.nativeCall('wizvera', [{"type": "certDelete", "cert_info": cert_info}]).done(function(dat) {
			var obj = {};

			obj.cert_delete_yn = dat["cert_delete_yn"];

			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.cert_delete_yn = "Y";
		callback.apply(obj);
	}
}

//동의 여부를 체크하지 않는 PDF 보기
function comWebkey_showPolicy(policy_title, policy_url) {
	comWebkey_showPdf(policy_title, [[policy_url]], null, "닫기", "Y");
}

/**
 * 2023.11.30 기업스마트뱅킹 이체확인증 공유하기 기능 신설 [M20231017-A24 (R20230925-A78)]
 * 이체확인증 앱버전체크(가능버전)
 *    # Android : 3.1.3
 *    # iOS     : 3.1.0
 * @param callback :: 가능버전만 리턴함.
 * @returns
 */
function comWebkey_isVerTrnConfCard(callback) { //이체확인증 앱버전체크
	eval(callback({result:"true"}));
}

//동의 여부를 체크하는 PDF 보기
function comWebkey_showPdf(title, url_list, callback, btn_name, show_only) {
	
	if(Array.isArray(url_list[0])){
		//2차 배열
	}else{
		//1차 배열
		url_list = [url_list];
	}
	
	if(!_isRealApp) {
		alert("앱에서 확인하세요.");
		if(!isEmpty(callback) && typeof callback == "function") {
			eval(callback({result:"true"}));
		}
		return;
	}

	if(isEmpty(btn_name)) {
		btn_name = "동의";
	}
	
	if(isEmpty(show_only)) {
		show_only = "N";
	}

	var fileUrlList = [];
	for(var i=0; i<url_list.length; i++) {
		var tempFileUrlList = [];
		var urlList = url_list[i];
		for(var j=0; j<urlList.length; j++) {
			var fileUrl = {
				url : urlList[j]
			}
			tempFileUrlList.push(fileUrl);
		}
		fileUrlList.push(tempFileUrlList)
	}
	if(fileUrlList[0][0].url == undefined){
		return;
	}
	var param = {
			title : title,
			_urlList : fileUrlList,
			lastBtnName : btn_name,
			nextBtnName : "다음",
			showOnly : show_only
		};

	$.nativeCall("pdfViewer", [JSON.stringify(param)]).done(function(dat) {
		if(!isEmpty(callback) && typeof callback == "function") {
			if(dat.result) {
				dat.result = "true";
			} else {
				dat.result = "false";
			}
			
			eval(callback(dat));
		}
	})
	.fail(function(dat) {
		//개발에서만 약관 다운로드 불가 시 무조건 동의
		if(_isDevMode === true){
			eval(callback({"result":"true"}));
		}
	});
}

//앱 캐쉬정보 삭제
function comWebkey_deleteCache(callback) {
	if(_isRealApp) {
		$.nativeCall('deleteCache', []).done(function (dat) {
			var obj = {};
			obj.successYn = dat.success_yn;
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.successYn = "Y"; //성공으로 세팅
		callback.apply(obj);
	}
}
//앱 버전 정보 가져오기
//앱의 현재 버전, 최신 버전, 서버 명, 기기모델, OS 버전을 얻을 수 있다.
function comWebkey_getAppInfo(callback) {
	if(_isRealApp) {
		$.nativeCall('getAppInfo', []).done(function (dat) {
			var obj = dat;
			//current_version : 현재 앱 버전
			//last_version    : 최신 앱 버전 (관리자페이지에서 등록된 버전)
			//server_kind     : 현재 접속 서버 이름(테스트 : test / 운영 : 숫자)
			//device_model    : 기기 모델명
			//os_version      : 기기 os 버전
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.current_version  = "2.4.2"  ;
		obj.last_version     = "2.1.0"  ;
		obj.server_kind      = "test"   ;
		obj.device_model     = "sdw-100";
		obj.os_version       = "11.3.1" ;
		callback.apply(obj);
	}
}


//금융인증서
//   -안드로이드 적용된 앱 버전 : 2.4.2
//   -iOS        적용된 앱 버전 : 2.2.8
function comWebkey_getFinAppInfo(callback) {
	// [1] getFinAppInfo
	//    -안드로이드 적용된 앱 버전 : 2.4.2
	//    -iOS 적용된 앱 버전 : 2.2.8
	//    -플러그인 명 : getFinAppInfo
	//                   (아이폰, 안드로이드 공통 동일함)
	//    -콜백데이터 JSON (Android 기준)
	//        {
	//           'app_id'      : 'com.ibk.scbs <-- 운영, com.ibk.scbs.dev <-- 개발(QA)',
	//           'device_id'   : 'android_id 혹은 imei',
	//           'app_ver'     : '2.4.2',
	//           'imei'        : 'imei값 디바이스고유값',
	//           'android_id   : 'android_id 디바이스고유값',
	//           'finance_code': 'DB00030000',
	//           'finance_key' : '3f1c9d25-3414-4563-b08f-edbd7038583f'
	//        }
	//    -데이터 설명
	//        * app_id     : 앱 패키지명
	//        * device_id  : 기기 고유값
	//        * app_ver    : 현재 앱 버전
	//        * imei       : 디바이스고유값(Android OS 10버전 미만)
	//        * android_id : 디바이스고유값(Android OS 10버전 이상)

	if(_isRealApp) {
		$.nativeCall('getFinAppInfo', []).done(function (dat) {
			var obj = dat;
			//app_id           : 앱 패키지명      [운영:com.ibk.scbs, 개발(QA):com.ibk.scbs.dev]
			//device_id        : 기기 고유값      'android_id 혹은 imei'
			//app_ver          : 현재 앱 버전     '2.4.2'
			//finance_code     :                  'DB00030000'
			//finance_key      :                  '3f1c9d25-3414-4563-b08f-edbd7038583f'
			callback.apply(obj);
		});
	} else {
		var obj = {};
		obj.app_id       = "com.ibk.scbs.dev";
		obj.device_id    = ""; //'android_id 혹은 imei'
		obj.app_ver      = "2.4.2";
		obj.finance_code = "DB00030000";
		obj.finance_key  = "3f1c9d25-3414-4563-b08f-edbd7038583f";
		callback.apply(obj);
	}
}

//구글 플레이, 앱 스토어로 이동
function comWebkey_goToStore(callback) {
	if(_isRealApp) {
		$.nativeCall('goToStore', []).done(function (dat) {
			//반환내용 없음
			callback.apply();
		});
	} else {
		//반환내용 없음
		callback.apply();
	}
}

//카카오톡 메시지 전송
function comWebkey_kakaoSendMessage(message) {
	if(_isRealApp) {
		$.nativeCall("shareMessage", [{"type":"kakao", subType:"text", "message":message}]);
	}
}

//네비게이션 타이틀 이름을 받아온다.
function comWebkey_getTitle(callback) {
	if(_isRealApp) {
		try {
			$.nativeCall("getTitle", []).done(function(dat) {
				callback.apply({"title" : dat["title"]});
			});
		}
		catch(e) {
			callback.apply({"title" : "IBK"});
		}
	}
	else {
		callback.apply({"title" : "IBK"});
	}
}

//네비게이션 타이틀 이름을 변경한다.
function comWebkey_changeTitle(title) {
	if(_isRealApp) {
		$.nativeCall("changeTitle", [{"title" : title}]);
	}
	else {
		$("html title").text(title);
	}
}

//Push Token을 가져옴
function comWebKey_getPushToken(callback) {
	if(_isRealApp) {
		try {
			$.nativeCall("getPushToken").done(function(dat) {
				callback.apply(dat);
			});
		}
		catch(e) {
			callback.apply({"pushToken" : ""});
		}
	}
	else {
		callback.apply({"pushToken" : "push_key_test"});
	}
}

//모바일결재 가입여부 저장
function comWebKey_mobilePaymentJoin(is_join, push_token, callback) {
	if(_isRealApp) {
		try {
			$.nativeCall("mobilePaymentJoin", [{"is_join" : is_join, "push_token" : push_token}]).done(function(dat) {
				callback.apply({"success_yn" : "Y"});
			});
		}
		catch(e) {
			callback.apply({"success_yn" : "N"});
		}
	}
	else {
		callback.apply({"success_yn" : "Y"});
	}
}

//보안키패드 암호화 키 갱신 요청   comMobview.js 에서 에러코드 WEB014가 발생하면 엡에 요청함
function comWebKey_updateTempSecureKey() {
	if(_isRealApp) {
		try {
			$.nativeCall("updateTempSecureKey");
		} catch(e) {}
	}
}

//로그인후팝업 : 닫기 처리(-1:닫기/취소, 0:다시보지않기, 7:7일간보지않기)
function comWebKey_setNoticePopupAvailable(type, notice_no) {
	//alert('_isRealApp:'+_isRealApp);
	if(_isRealApp) {
		try {
			$.nativeCall('setNoticePopupAvailable', [{"type" : type, "notice_no" : notice_no}]);
		} catch(e) {
		}
	}
}

//알파세무 인증서정보 추출
function comWebKey_signWithCertificateToAlphaBriefing(certInfo, callback) {
	var param = {
		"type"                 : "signWithCertificateToAlphaBriefing",
		"subType"              : "scraping",
		"title"                : "인증서 비밀번호",
		"hint"                 : "인증서 비밀번호를 입력해 주세요.",
		"keypad_type"          : 5,
		"keypad_maxlength"     : 52,
		"isKdfType"            : true,
		"plain_text"           : "scraping",
		"cert_info"            : certInfo,
		"show_cert_list_yn"    : "N",
		"use_cert_info_yn"     : "Y",
		"use_ibksignedtime_yn" : "Y"
	};
	
	if(_isRealApp) {
		try {
			$.nativeCall("wizvera", [param]).done(function (dat) {
				callback.apply(dat);
			}).fail(function() {});
		}
		catch(e) {
			MobPopup.showAlertPopup("signWithCertificateToAlphaBriefing catch");
		}
	}
}

/**
 * 고객확인의무 이행 대상 여부 확인2
 * 
 * @param type
 * @param callback        callback [필수]
 * @param callbackMenu    콜백메뉴 - 고객확인의무 이행 후 이동할 메뉴id
 * @returns
 */
function callCddEdd2(type, callback, callbackMenu) {
	if(isEmpty(type)) type = "CDDEDD";	// 고객확인대상여부 (CDD,EDD 중 최종 갱신여부)

	_this.cusInfo = {}; //로그인된 사용자의 정보

	comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
		var basicInfo = this; //JSON data
		_this.cusInfo = basicInfo.cus_info; //이용자로그인세션정보
	});

	var id = "svc_bnk_130101_1";
	var path = "../../"+id.split("_")[0] + "/" + id.split("_")[1] + "/";
	var linkMenu = id +".html";
	var param = "CALLBACK_MENU=" + callbackMenu;
	
	// 개인사업자 ==> 거래제어
	if("5" == _this.cusInfo["INDV_CORP_DTL_DCD"]) {		//개인법인상세구분(1:개인,2:법인,5:중소개인,8:외국인,9:외국법인,P:당행임직원)
		if( ("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){
			
				var msg  = "고객님, 「특정금융거래정보의 보고 및 이용 등에 관한 법률」에 따라 고객정보 확인이 필요합니다.<br/>고객확인의무 메뉴로 이동합니다.";
				MobPopup.showAlertPopup(msg, "고객확인의무 이행 대상자 안내", function() {
					// 고객확인의무 이행
					comWebkey_goMenu("5009", id, path+linkMenu, param);
				});
				return;
		}

	// 개인사업자 외 ==> 거래제한
	}else{
		if( ("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){

			var msg  = "고객님, 「특정금융거래정보의 보고 및 이용 등에 관한 법률」에 따라 고객정보 확인이 필요합니다.<br/>신분증을 지참하시어 가까운 영업점을 방문해주시기 바랍니다.";
			MobPopup.showAlertPopup(msg, "고객확인의무 이행 대상자 안내", function() {
				//거래제한
			});
			return;
		}
	}

	if (typeof(callback) =="function") {
		callback.apply();
	}
}

/**
 * 고객확인의무 이행 대상 여부 확인
 * @param type, callback
 * @returns Boolean
 **/
function callCddEdd(type, callback) {

	if(isEmpty(type)) type = "CDDEDD";	// 고객확인대상여부 (CDD,EDD 중 최종 갱신여부)

	_this.cusInfo      = {}; //로그인된 사용자의 정보

	comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
		var basicInfo = this; //JSON data
		_this.cusInfo = basicInfo.cus_info;				//이용자로그인세션정보
	});


	var id = "svc_bnk_130101_1";
	var path = "../../"+id.split("_")[0] + "/" + id.split("_")[1] + "/";
	var linkMenu = id +".html";
	// 개인사업자 ==> 거래제어
	if("5" == _this.cusInfo["INDV_CORP_DTL_DCD"]) {		//개인법인상세구분(1:개인,2:법인,5:중소개인,8:외국인,9:외국법인,P:당행임직원)

		if(("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){

				var msg  = "&#34;고객님, 오랜기간 IBK를 이용해주셔서 감사합니다.&#34;<br/><br/>저희 IBK기업은행은 관련 법령에 따라, 지속적으로 고객님의 정보를 재확인하고 있습니다.<br/>상품 가입을 위해 아래버튼을 클릭하여 고객 정보를 재확인해주시기 바랍니다.";
				MobPopup.showAlertPopup(msg, "알림", function() {
					// 고객확인의무 이행
					comWebkey_goMenu("5009",id,path+linkMenu);
				});
				return;
		}

	// 개인사업자 외 ==> 안내 후 거래 계속
	}else{
		if(("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){

			var msg  = "&#34;고객님, 오랜기간 IBK를 이용해주셔서 감사합니다.&#34;<br/><br/>저희 IBK기업은행은 관련 법령에 따라, 지속적으로 고객님의 정보를 재확인하고 있습니다.<br/>필요 서류를 확인 및 지참하신 후, 영업점을 방문하여 고객정보를 재확인해주시기 바랍니다.";
			MobPopup.showConfirmQckPopup(msg, "알림"
				, function() {
					// 고객확인의무 알아보기
					comWebkey_goMenu("5009",id,path+linkMenu);

				}, function(){

					if (typeof(callback) =="function") {
						callback.apply();
					}
				}, "닫기", "고객확인의무 알아보기");
			return;
		}
	}

	if (typeof(callback) =="function") {
		callback.apply();
	}

}

/**
 * 고객확인의무 이행 대상 여부 확인 + 본인확인서 이행 확인
 * 1. type				: 'CDDEDD', 'EDD' [default : CDDEDD]
 * 2. callback			: callback [필수]
 * 3. fatcaChk			: true, false, "" -fatca 이행 대상상품 여부 [값 없는경우 상품코드, 상품분류그룹코드 필수]
 * 4. callbackMenu	: 콜백메뉴 - 본인확인서 등록 후 이동할 메뉴id
 * 5. pdcd				: 상품코드 - 본인확인서 등록 후 이동할 메뉴에서 조회할 상품코드, 비즈허브 조회시 필요
 * 6. pdGrpCd			: 상품분류그룹코드(예적금-100, 외화-200, ISA-800, 펀드-500)
 * @returns Boolean
 **/
function callCddEddFatca(type, callback, fatcaChk, callbackMenu, pdcd, pdGrpCd) {

	if(isEmpty(type)) type = "CDDEDD";	// 고객확인대상여부 (CDD,EDD 중 최종 갱신여부)

	_this.cusInfo      = {}; //로그인된 사용자의 정보

	comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
		var basicInfo = this; //JSON data
		_this.cusInfo = basicInfo.cus_info;				//이용자로그인세션정보
	});

	// 본인확인서 등록 대상 확인.
	var slcfCd 	= _this.cusInfo["SLCF_CD"];				// 본인확인서수취여부 (유효한등록건이 있음:[1/2/3], 유효한 등록건이 없음:[9/0])
	var rnnVrfcYn 	= _this.cusInfo["RNN_VRFC_YN"];	// 실명번호검증여부   (Y : 거래가능, N : 거래불가)(11-주민등록번호, 22-외국인등록번호 인 경우 Y 그 외 N)
	if(isEmpty(slcfCd))  slcfCd = "0";							// 본인확인서 필요여부 '빈값' : 필요여부 'N'으로 처리

	// 본인확인서 이행 대상 상품 여부( 본인확인서 대상 상품여부 '빈값' : 대상 'N'으로 처리)
	var needFatca = false;
	// fatca 이행 대상 상품 여부 값이 없는 경우
	if(isEmpty(fatcaChk) && !isEmpty(pdcd) && pdcd.length==11){
		// 비즈허브 상품 정보 조회
		try {
			var outData = {};
			var ajax = jex.createAjaxUtil("fnc_dpm_010101_3");
			ajax.setAsync(false); // 동기화 조회
			ajax.setErrTrx(false);
			ajax.set("task_package"			, "fnc");
			ajax.set("task_subpackage"		, "dpm");
			ajax.set("PDLN_CD"					, pdcd.substring(0,2));							// 상품라인코드
			ajax.set("PDGR_CD"					, pdcd.substring(2,4));							// 상품그룹코드
			ajax.set("PDTM_CD"					, pdcd.substring(4,7));							// 상품템플릿코드
			ajax.set("PDCD"						, pdcd.substring(7,11));						// 상품코드
			ajax.set("NFCH_PRCF_GRP_CD"	, isEmpty(pdGrpCd) ? "100" : pdGrpCd);	// 비대면채널상품분류그룹코드(예적금-100, 외화-200, ISA-300, 펀드-500)
			ajax.execute(function (dat) {
				try{
					//「FATCA/CRS」 관련 대상상품 여부 조건 값
					outData = dat["_tran_res_data"][0];
					var isError = ("true" == outData["_is_error"])?true:false;
					var errCd = outData["_error_cd"];
					var errMsg = outData["_error_msg"];
					if(isError) {
						needFatca = false;
					} else {
						if(!isEmpty(outData["INFO_HB013"])){
							needFatca = ("Y"==outData["INFO_HB013"]) ? true:false;
						}else{
							needFatca = false;
						}
					}
				} catch(e) {needFatca = false;}
			});
		} catch(e) {needFatca = false;}

		// 비즈허브 조회 에러인 경우
		if(isEmpty(needFatca)){
			needFatca = false;
		}

	// fatca 이행 대상 상품인 경우
	}else if(fatcaChk){
		needFatca = true;

	// fatca 이행 대상 상품이 아닌 경우
	}else if(!fatcaChk){
		needFatca = false;

	// 에러
	}else{
		needFatca = false;
	}


	var id = "svc_bnk_130101_1";
	var path = "../../"+id.split("_")[0] + "/" + id.split("_")[1] + "/";
	var linkMenu = id +".html";
	// 개인사업자 ==> 거래제어
	if("5" == _this.cusInfo["INDV_CORP_DTL_DCD"]) {		//개인법인상세구분(1:개인,2:법인,5:중소개인,8:외국인,9:외국법인,P:당행임직원)

		if(("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){

				var msg  = "&#34;고객님, 오랜기간 IBK를 이용해주셔서 감사합니다.&#34;<br/><br/>저희 IBK기업은행은 관련 법령에 따라, 지속적으로 고객님의 정보를 재확인하고 있습니다.<br/>상품 가입을 위해 아래버튼을 클릭하여 고객 정보를 재확인해주시기 바랍니다.";
				MobPopup.showAlertPopup(msg, "알림", function() {
					// 고객확인의무 이행
					comWebkey_goMenu("5009",id,path+linkMenu);
				});
				return;

		// fatca 이행 대상 상품
		}else if(needFatca){
			// 본인확인서 등록 대상 고객인 경우
			if("9" != slcfCd && "0" != slcfCd){
				//실명여부 유효 '빈값' : 거래불가
				if(isEmpty(rnnVrfcYn)){
					MobPopup.showAlertPopup('고객님의 본인확인서 관련 정보 조회 중 문제가 발생하였습니다.(실명번호유효여부)<br/>다시 로그인 후 거래하시기 바랍니다.<br/>동일한 문제가 계속 발생할 경우, 고객센터로 문의해주시기 바랍니다.', "알림", function(){
						// 거래불가
					});
					return;

				// 실명번호 유효 - 본인확인서 등록 메뉴로 이동
				}else if("Y" == rnnVrfcYn){
					var msg = "고객님은 FATCA/CRS 본인확인서등록 대상입니다.<br/><br/>뱅킹관리 > 본인확인서등록 화면을 통하여 본인확인서를 제출 하신 후 계좌 개설이 가능합니다.<br/><br/>※ 본인확인서 미작성 시 비대면을 통한 계좌 추가 개설에 제한이 있을 수 있습니다.";
					if("1" == slcfCd){
						msg = "해외거주자 및 해외납세의무자 여부를 확인하기 위한 FATCA/CRS 본인확인서등록 대상입니다.<br/><br/>뱅킹관리 > 본인확인서등록 화면을 통하여 본인확인서를 제출 하신 후 계좌 개설이 가능합니다.<br/><br/>※ 본인확인서 미작성 시 비대면을 통한 계좌 추가 개설에 제한이 있을 수 있습니다.";
					}else if("2" == slcfCd){
						msg = "본인확인서에 필요한 고객정보변경 이력이 확인되어 FATCA/CRS 본인확인서 재등록 대상입니다.<br/><br/>뱅킹관리 > 본인확인서등록 화면을 통하여 본인확인서를 제출 하신 후 계좌 개설이 가능합니다.<br/><br/>※ 본인확인서 미작성 시 비대면을 통한 계좌 추가 개설에 제한이 있을 수 있습니다.";
					}else if("3" == slcfCd){
						msg = "고객님은 해외거주자 또는 해외납세의무자로 FATCA/CRS 본인확인서등록 대상입니다.<br/><br/>뱅킹관리 > 본인확인서등록 화면을 통하여 본인확인서를 제출 하신 후 계좌 개설이 가능합니다.<br/><br/>※ 본인확인서 미작성 시 비대면을 통한 계좌 추가 개설에 제한이 있을 수 있습니다.";
					}

					var slcfId = "svc_bnk_080201_1";
					var slcfPath = "../../"+slcfId.split("_")[0] + "/" + slcfId.split("_")[1] + "/";
					var slcfLinkMenu = slcfId +".html";
					var param = "CALLBACK_MENU=" + callbackMenu;

					MobPopup.showAlertPopup(msg, "알림", function() {
						// 본인확인서 수행 메뉴이동
						comWebkey_goMenu("5005",slcfId,slcfPath+slcfLinkMenu,param);
					});
					return;

				// 실명번호 유효하지 않음  - 거래불가
				}else{
					MobPopup.showAlertPopup('해외거주자 및  해외납세의무자 여부 확인을 위하여 영업점 방문을 통한 증빙자료 제출이 필요합니다.<br/><br/>가까운 영업점을 방문하여 FATCA/CRS 본인확인서 및 증빙자료를 제출해주시기 바랍니다.<br/><br/>* 증빙서류<br/>1) 신분증, 2) 거주 증빙자료(외국인등록증, 거주자증명서, 국내거주신고증+출입국관리기록 등 중 1가지 서류), 3)해외 납세의무 보유시 해당국가의 납세자식별번호(TIN)기재증표<br/><br/>※ 본인확인서 미작성 시 비대면을 통한 계좌 추가 개설에 제한이 있을 수 있습니다.', "알림", function(){
						// 거래불가
					});
					return;
				}
			}

		}

	// 개인사업자 외 ==> 안내 후 거래 계속
	}else{
		if(("CDDEDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN1"])
			|| ("EDD" == type && "Y" == _this.cusInfo["CUS_CHK_UPT_YN2"])){

			var msg  = "&#34;고객님, 오랜기간 IBK를 이용해주셔서 감사합니다.&#34;<br/><br/>저희 IBK기업은행은 관련 법령에 따라, 지속적으로 고객님의 정보를 재확인하고 있습니다.<br/>필요 서류를 확인 및 지참하신 후, 영업점을 방문하여 고객정보를 재확인해주시기 바랍니다.";
			MobPopup.showConfirmQckPopup(msg, "알림"
				, function() {
					// 고객확인의무 알아보기
					comWebkey_goMenu("5009",id,path+linkMenu);

				}, function(){

					if (typeof(callback) =="function") {
						callback.apply();
					}
				}, "닫기", "고객확인의무 알아보기");
			return;
		}
	}

	if (typeof(callback) =="function") {
		callback.apply();
	}

}

function comWebkey_getDefaultLoginType(callback) {
	

	if(_isRealApp) { //앱
		
		$.nativeCall("getDefaultLoginType", []).done(function(dat){
			callback.apply(dat);
		});
		
	} else { //웹
		var dataStr = localStorage.getItem("defaultLoginType");
		if(dataStr != undefined && dataStr != "") {
			callback.apply(JSON.parse(dataStr)); 
		} else {
			callback.apply({});
		}
	}
}


function comWebkey_setDefaultLoginType(jsonData) {
	

	if(_isRealApp) { //앱
		
		$.nativeCall("setDefaultLoginType", [jsonData]).done(function(){
		
		});
		
	} else { //웹
		
		localStorage.setItem("defaultLoginType", JSON.stringify(jsonData));
		
	}
}


function comWebkey_getLastLoginType(callback) {
	

	if(_isRealApp) { //앱
		
		$.nativeCall("getLastLoginType", []).done(function(dat){
			callback.apply(dat);
		});
		
	} else { //웹
		var dataStr = localStorage.getItem("lastLoginType");
		if(dataStr != undefined && dataStr != "") {
			
			callback.apply(JSON.parse(dataStr));
		} else {
			callback.apply({});
			
		}
	}
}

/* 토스트 메세지 출력 */
function comWebkey_toastMsg(msg) {
	if(_isRealApp) { //앱
		$.nativeCall("toastMsg", [{"msg" : msg}]).done(function() {
			
		});
	}
	else { //웹
		MobPopup.showAlertPopup(msg);
	}
}