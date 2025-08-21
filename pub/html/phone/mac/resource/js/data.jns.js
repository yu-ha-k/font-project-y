/**
 * data.jns.js
 * custom attribute 기반 (data-jns)를 가진 element에 대한 interaction
 * Jnut서비스를 호출.
 * data-jns				// 서비스 지정					(( ssem:// , app:// , wskking01://, !element(jquery) ))
 * data-jns-onload		// 페이지 로드시 실행되는 서비스
 * data-jni				// 서비스 input
 * data-jno				// 서비스 output 정의
 * data-jng				// 서비스 input group
 * data-jne				// 서비스 event
 * data-jns-next		// 서비스 이후 역할 지정
 * data-jns-onerror		// 오류시 서비스 이후 역할 지정
 **/
//jnut.domain("mac", "http://172.18.202.92:29080");	// 임시로 넣음.
window.jnsFns = (!window.jnsFn)?{}:window.jnsFn;
(function() { 
	var jttrs	= {
						 "onload"		: "data-jns-onload"
						,"service"		: "data-jns"
						,"element"		: "data-jns-element"
						,"event"		: "data-jne"
						,"input"		: "data-jni"
						,"clear"		: "data-jns-clear"
						,"group"		: "data-jng"
						,"output"		: "data-jno"
						,"outRoot"		: "data-jno-root"
						,"next"			: "data-jns-next"
						,"onerror"		: "data-jns-onerror"
						,"loading"		: "data-jns-loading"
						,"spread"		: "data-jns-spread"
	};
	
	var _tmpObj;

	// Ajax 공통 처리 
	jnut.ajaxOption( {
		onError:function(err, obj) {
		
			console.log(err);
			
			($(".show_lgn").length > 0 && $(".show_lgn").click());
				
			if (obj && obj.unsetLoading) obj.unsetLoading();
			if (obj && obj.$e && obj.$e.attr(jttrs.onerror)) { $(obj.$e.attr(jttrs.onerror)).click(); }
				$(".modal-load-close").click();
				$(".full-modal-load-close").click();
			console.log(err);
			switch(err.Exception) {
				case "NiceException":

					if ( "E00" == err.CODE ) {
						alert("(주)나이스 Jini 데이터와 통신중\n오류가 발생 하였습니다. \n잠시 후 다시 실행 해주십시오. \n[ 통신 결과값 오류 ]");
					} else if ( "E01" == err.CODE ) {
						alert("(주)나이스 Jini 데이터와 통신중\n오류가 발생 하였습니다. \n잠시 후 다시 실행 해주십시오. \n[ 일자값 오류 ]");
					} else if ( "E02" == err.CODE ) {
						$(".upjongAlert").removeClass("hide");
					} else if ( "E03" == err.CODE ) {
						$(".jusoAlert").removeClass("hide");
					} else if ( "E99" == err.CODE ) {
						alert("(주)나이스 Jini 데이터와 통신중\n오류가 발생 하였습니다. \n잠시 후 다시 실행 해주십시오. \n[ 기타오류 ]");
					}

					return false;
					
				case "SessionException":
					
					if ( "VER_ERR" == err.CODE ) {
						$(".versionErrMsg").html(err.MSG);
						$(".versionAlert").removeClass("hide");
						
					} else {

						$(".sessionEndCall").text(err.CODE);										
						$(".sessionErrMSg").html(err.MSG);
						//모달 덮히는 현상 때문에 딜레이 줌
						setTimeout( function(){ $(".sessionAlert").removeClass("hide"); } , 300);
					}
					
					return true;

				case "InputCheckException":
					window._attrUtil.alert.show(err.MSG);
					return true;
					
				case "TrxException":
					window._attrUtil.alert.show(err.MSG);
					return true;
					
				default :
					(err.MSG==null)?window._attrUtil.alert.show("처리중 오류가 발생하였습니다.<br/>잠시 후 다시 시도하여 주시기 바랍니다."):window._attrUtil.alert.show(err.MSG);
					// window._attrUtil.alert.show("처리중 오류가 발생하였습니다.<br/>잠시 후 다시 시도하여 주시기 바랍니다.");
//					alert(err.MSG);
//					alert("예상하지 못한 오류가 발생하였습니다. 불편을 드려 대단히 죄송합니다.\n\n해당 오류는 SSEM 개발팀으로 전달되었으며, 곧 조치될 예정입니다.\n처리 상태가 궁금하시면,\n우측하단 메신저나 고객센터(02-739-9101)로 연락주세요.");
//					location.href=(window._app)?"./m001_02.html":"./m001_01.html";
					return true;
			}
		}
	});
	
	var findEl	= function(dat) {
		if (findEl.indexOf("/") > -1) {
			
		}
	}
	
	var	jns		= _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();					}
		,getValue	: function()	{
			if (this.$e.data("_nattr").length > 1) return undefined;
			if ("input" == this.$e.get(0).tagName.toLowerCase()) {
				return this.$e.val();
			} else {
				return this.$e.html();
			}
		}
		,defineEvt	: function()	{
			var _this	= this;
			this.onload	= this.$e.attr(jttrs.onload		);
			this.jns	= this.$e.attr(jttrs.service	);
			this.jng	= this.$e.attr(jttrs.group		);
			this.jno	= this.$e.attr(jttrs.output		);
			this.event	= this.$e.attr(jttrs.event		);
			this.element= this.$e.attr(jttrs.element	);
			this.next	= this.$e.attr(jttrs.next		);		
			this.outRoot= this.$e.attr(jttrs.outRoot	);
			this.event	= (!this.event)?"click":this.event;
			this.loading= this.$e.attr(jttrs.loading	);
			this.spread = this.$e.attr(jttrs.spread	);
			
		
			this.spread	= ("true"==this.spread)?true:false;
			this.$ele	= (this.element)?$(this.element):this.$e;
			
			this.isClear= (this.$e.attr(jttrs.clear) != undefined)?true:false;
		
			
			this.outRoot= (this.outRoot)?(this.outRoot):"body";
			
			if (!!this.onload || this.onload == "") {
				var target = this.jns.substring(0, this.jns.indexOf(":"));
				if (typeof(this["execute_"+target]) === "function") this["execute_"+target]();
			}			
			
			this.event && this.$ele.bind(this.event, function(event) {
				if (_this.$e.hasClass("disable")) return;
				_this.curEvt = this;
				setTimeout(function() {
					if (_this.jns) {
						var target = _this.jns.substring(0, _this.jns.indexOf(":"));
						if (typeof(_this["execute_"+target]) == "function") _this["execute_"+target](); 
					} else {
						_this.nullExecute();
					}
				},0);
				!_this.spread && event.stopPropagation();
			});
			
		}, unbind : function() {
			this.event && this.$e.unbind(this.event);
		}, _executeNext : function(next, data) {
			//console.log("_executeNext", this, next ,data)
			var $nexts;
			if (next.indexOf(":")>-1) {
				var rows = next.split(":");
				var key	 = rows[0];
				var not	 = false;
				if (rows[0].substring(0,1) == "!") {
					not = true;
					key = rows[0].substring(1);
				}
				if (data &&   data[key] && "N" != data[key]  && !not)  $nexts = this.findEl(rows[1]); // ($(rows[1])[0] && $(rows[1])[0].click)?$(rows[1])[0].click():$(rows[1]).click();
				if (data && (!data[key] || "N" == data[key]) && not )  $nexts = this.findEl(rows[1]); // ($(rows[1])[0] && $(rows[1])[0].click)?$(rows[1])[0].click():$(rows[1]).click();
			} else {
				$nexts = this.findEl(next);
			}
			if ($nexts && $nexts.length)	$($nexts[0]).click(); //for (var ii=0; ii<$nexts.length; ii++) $nexts[ii].click();
			else							if ($nexts) $nexts.click();
		
			return ($nexts && $nexts.length);
			
		}, executeNext : function(data) {
			if (this.next) {
				if (this.next.indexOf(",") > -1) {
					/* data-next='aValue:.Class,!:.Class2,bValue:#id' */
					var nexts	= this.next.split(",");
					var len		= nexts.length;
					for (var i=0; i<len; i++) {
						if (this._executeNext(nexts[i], data)) break;
					}
				} else {
					this._executeNext(this.next, data);
				}
			}
//			(this.next && $(this.next).click());
		}, nullExecute : function() {
			this.executeNext();
		}, execute_sleep : function() {
			var tm		= this.jns.substring(this.jns.indexOf(":")+3);
			var _this	= this;
			setTimeout(function() { _this.executeNext({}); }, tm);
		}, execute_element : function() {
			var svc		= this.jns.substring(this.jns.indexOf(":")+3);
			console.log("execute_element :: " + svc);
//			($(svc)[0] && $(svc)[0].click)?$(svc)[0].click():$(svc).click();
			$svc = this.findEl(svc);
			for (var ii=0; ii<$svc.length; ii++) {
				$svc[ii].click();
			}
			this.executeNext();
		}, findEl : function(str) {
			if (!str) return $(str);
			var splstr	= str.split("/");
			var lengt	= splstr.length;
			var $basc	= undefined;
			for (var i=0;i<lengt;i++) {
				if (splstr[i] == "parent"	)	$basc = (!$basc)?this.$e.parent():$basc.parent();
				else if (splstr[i] == "this")	$basc = this.$e;
				else								$basc = (!$basc)?$(splstr[i]):$basc.find(splstr[i]);
			}
			return $basc;
		}, execute_fn	: function() {
			if (window.jnsFns) {
				var $jng		= this.findEl(this.jng);//$(this.jng);
				var inp			= _attrUtil.getIn($jng);
				
				var svc		= this.jns.substring(this.jns.indexOf(":")+3);
//				console.log(svc, inp);
			
				var rslt	= window.jnsFns[svc].call(this, inp)
				
//				(this.isClear && _attrUtil.clearIn($jng));
				
				if (rslt) _attrUtil.setOut(rslt,$(this.outRoot));
				this.executeNext(rslt); 
			}
		}, execute_app	: function() {
			if (window._app) {
				var _this	= this;
				var $jng	= this.findEl(this.jng);//$(this.jng);
				var inp		= _attrUtil.getIn($jng);
				var svc		= this.jns.substring(this.jns.indexOf(":")+3); 
				var isArr   = false;
				
				if(svc == "openExBrowser") inp = inp['url'];
				else if(svc == "saveProperty"){
					inp = [inp['prop_key'],inp['prop_val']];
					isArr = true;
				}
				else if(svc == "loadProperty") inp = inp['prop_key'];
				else if(svc == "loadSecureKeyBoard"){
					inp["_type"] = parseInt(inp._type);
					inp["_minlength"] = parseInt(inp._minlength);
					inp["_maxlength"] = parseInt(inp._maxlength);
					inp["_displaypos"] = parseInt(inp._displaypos);
					if(inp["isKdfType"] === "false"){
						inp["isKdfType"] = Boolean(""); // boolean 타입으로 변환
					}
					else{
						inp["isKdfType"] = Boolean("true");
					}
				}
				else if(svc == "pdfViewer"){
					inp["_urlList"] = [[
						{"url" : inp._urlList}
					]];
				}
				else if(svc == "wizvera"){
					if(inp["type"] == "signWithCertificateToAlphaBriefing"){
						var param = {
								"type"						: inp["type"]
								,"title"					: "공동인증서 비밀번호를 입력해 주세요"
								,"hint"						: "인증서 비밀번호를 입력해 주세요."
								,"keypad_type"				: 5
								,"keypad_maxlength"			: 52
								,"isKdfType"				: false
								,"plain_text"				: "sign"
								,"subType"					: "sign"
								,"cert_info"            	: inp
								,"show_cert_list_yn"		: "N"
								,"use_cert_info_yn"			: "N"
								,"use_ibksignedtime_yn"		: "N"
						}
						
						inp = {};
						inp = param;
					}
				}
				
				console.log(svc, inp);
				console.log("------------------------------");
				console.log(JSON.stringify(inp));
				
				try {
					_app.service(
							svc, 
							inp, 
							function(data) {
								if(svc == "loadSecureKeyBoard"){
									(_this.isClear && _attrUtil.clearIn($jng)); 
									_attrUtil.setOut(data,$(_this.outRoot)); 
									_tmpObj = inp;
									_this.uf_iwebkey(data);
								}
								else{
									(_this.isClear && _attrUtil.clearIn($jng)); 
									_attrUtil.setOut(data,$(_this.outRoot)); 
									_this.executeNext(data); 
								}
							},
							true,
							isArr
					);
				} catch(error) {
					alert(error);
				}
			} else {
			}
		}, setLoading : function() {
			if (!this.loading) return;
			var $load	= $(this.loading);
			if(!$load.hasClass("loading")) $load.addClass("loading");
		}, unsetLoading : function() {
			if (!this.loading) return;
			var $load	= $(this.loading);
			if($load.hasClass("loading")) $load.removeClass("loading");
		}, execute_mac : function() {
			var _this	= this;
			this.setLoading();
			var $jng	= this.findEl(this.jng);//$(this.jng);
			var inp		= _attrUtil.getIn($jng);
			inp['_JNG']	= this.jng;
			var sm 		= jnut.getServiceManager(this.jns.substring(0, this.jns.indexOf(":")), "/mac", ".jsp");
//			var sm 		= jnut.getServiceManager(this.jns.substring(0, this.jns.indexOf(":")));
			var svc		= this.jns.substring(this.jns.indexOf(":")+2);
			console.log(svc, inp);
			sm.add(svc, inp, function(data) { (_this.isClear && _attrUtil.clearIn($jng)); _attrUtil.setOut(data, $(_this.outRoot)); _this.unsetLoading(); _this.executeNext(data); console.log("service end :: ", svc, " :: ", data); }, function() {}).execute(undefined, _this);
			
		}, uf_iwebkey : function(data) {
			if(data == null || typeof data == 'undefined') return false;
			
			var jsonObj = data;
			
			var _key			= _tmpObj._elkey;					// input 에서 받은값
			var _type			= _tmpObj._type;					// input 에서 받은값
			var _minlength		= parseInt(_tmpObj._minlength);		// input 에서 받은값
			var _maxlength		= parseInt(_tmpObj._maxlength);		// input 에서 받은값
			var _displaytext	= _tmpObj._displaytext;				// input 에서 받은값

			var _inputlength  	= parseInt(jsonObj._inputlength);	// 사용자가 입력한 자릿수
			var _encryptdata  	= jsonObj._encryptdata;				// 사용자가 입력한 데이타를 암호화한 값

			var _pad			= jsonObj._pad	;					// 로그인 전상태일 경우만 암호화 키값 전달
			var _errcode      	= jsonObj._errcode;					// '0000' 정상, 그외 오류
			var _errmsg       	= jsonObj._errmsg;
			var _nextin       	= _tmpObj._nextinput;

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
				//alert(_errmsg);
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
					target.val(_str);
					
					if(_key == "keypad1"){
						$(".cdn2").text(_encryptdata);
					}
					else if(_key == "keypad2"){
						$(".cdn3").text(_encryptdata);
					}
					else if(_key == "card_pwd"){
						$("p[class='pwd_leng display_cert add_card_input']").text(_encryptdata);
					}
					// target.attr("realValue", _encryptdata );

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
//					if(_bool) {
//						if(typeof _callXecureKeypad_SecretForm == "function") {	// from SecretForm
//							//_callXecureKeypad_SecretForm(_nextin);
//						}
//					} else {
						if(_inputlength != null && typeof _inputlength != 'undefined' && _inputlength != ''){
							var nextTarget = $("#"+_nextin);

							if(nextTarget.attr('type') == 'hidden'){
								nextTarget.parent().find('.' + _nextin + ':first').trigger("click");
							}else{
								nextTarget.trigger("click");
							}

						}
//					}
				} else {
					// 보안매체 입력 결과 콜백 호출
					//_uf_executeSecretOtp("_iweb_key", data);
					
				}

			}
			
			this.executeNext(data);
		}
	});
	_nattr['[data-jns]'] = jns;
})();


