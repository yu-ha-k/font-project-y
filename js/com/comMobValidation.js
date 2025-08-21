/**
 * formCheck를 위한 함수
 * @option nullable : true,false  - 필수여부 체크
 * @option length   : integer     - 길이체크
 *
 */
var _mobValidation = function(){
	/**
	 * validation check 함수
	 * 필수입력 여부, 길이체크
	 */
	this.check = function ($target){
		var _this = this;
		var isValid = true;
		$target.find('[data-jx-chk="true"]').each(function(e,i){
			var eachThis = this;
			var tagName = $(this).prop("tagName");
			tagName = tagName.toUpperCase();
			
			if( _this.isShowElement($(this)) ){
				var checkOption = _this.parseOption( $(this).attr("data-jx-chk-opt") );
				var val = "";
				if("INPUT" == tagName || "SELECT" == tagName){
					val = $.trim($(this).val()); 
				}
				
				//필수입력인경우
				if( !checkOption['nullable'] ){
					if(MobUtil.isEmpty(val)){
						isValid =  false;
						MobPopup.showAlertPopup(checkOption['name']+"은(는) 필수입력사항 입니다.", undefined, function() {
							$(eachThis).focus();
						});
						return isValid;
					}
				}
				
				//길이체크
				if( undefined != checkOption['length'] ){
					if(checkOption['length'] != val.length){
						isValid =  false;
						MobPopup.showAlertPopup(checkOption['name']+"입력을 "+checkOption['length']+"자리로 해주십시오.", undefined, function() {
							$(eachThis).focus();
						});
						return isValid;
					};
				}
				
				//최소길이체크
				if( undefined != checkOption['minLength'] ){
					if(checkOption['minLength'] > val.length){
						isValid =  false;
						MobPopup.showAlertPopup(checkOption['name']+"입력을 "+checkOption['minLength']+"자리 이상으로 해주십시오.", undefined, function(){
							$(eachThis).focus();
						});
						return isValid;
					};
				}
				
				//최소길이체크(한글포함인경우)
/*				if( undefined != checkOption['minByte'] ){
					if(checkOption['minByte'] > MobStringUtil.getByte(val)){
						isValid =  false;
						console.log("isValid최소길이:"+isValid);
						MobPopup.showAlertPopup(checkOption['name']+"입력을 "+checkOption['minByte']+"자리 이상으로 해주십시오.", undefined, function(){
							$(eachThis).focus();
						});
						return isValid;
					};
				}*/
			}
		});
		
		return isValid;
	},

	/**
	 * validation 이벤트 초기화
	 */
	this.start = function($userTarget){
		var _this = this;
		
		var $target = $('[data-jx-chk="true"]');
		
		if(undefined != $userTarget){
			$target = $userTarget.find('[data-jx-chk="true"]');
		}
		
		$target.each(function(e,i){
			var tagName = $(this).prop("tagName");
			tagName = tagName.toUpperCase();
			
			if("INPUT" == tagName || "SELECT" == tagName){	// input, select 태그인경우만 수행
				var checkOption = _this.parseOption( $(this).attr("data-jx-chk-opt") );
				
				//문자타입 셋팅
				if( undefined != checkOption['charType'] ){
					_this.initSetChartype($(this), checkOption);
				}
				
				//최대길이 설정
				if( 999999 != checkOption['maxLength'] ){
					_this.initSetMaxLength($(this),checkOption['maxLength']);
				}
				
				//최대길이 설정 (한글 포함시 byte 계산)
				if( 999999 != checkOption['maxByte'] ){
					_this.initSetMaxByte($(this),checkOption['maxByte']);
				}
			}
		});
	},
	
	/**
	 * 보이는 element 인지 확인
	 */
	this.isShowElement = function($elem){
		var isShow = true;
		
		if("none" == $elem.css("display")){
			isShow = false;
		}else if("disabled" == $elem.attr("disabled")){
			isShow = false;
		}else if("readonly" == $elem.attr("readonly")){
			isShow = false;
		}
		
		return isShow; 
	},
	
	/**
	 * 옵션 parsing
	 */
	this.parseOption = function(strOption){
		//TODO minByte
		//TODO fullChar 전각, 반각처리 여부
		var userOption = JSON.parse(strOption);
		var option = {
				name				: ""			// 필드명
				,nullable			: true			// null check 여부
				,length				: undefined		// 길이체크
				,minLength			: undefined		// 최소길이체크
				,maxLength			: 999999		// 최대길이체크
				,minByte			: undefined		// 최소길이체크 (byte단위 : 한글포함인경우 사용) - 미구현
				,maxByte			: 999999		// 최대길이체크 (byte단위 : 한글포함인경우 사용)
				,charType			: undefined		// kor, koreng, kornum, korengnum, money ,zeroMoney, post, account, phone
				,format				: undefined		// format
				,userChar			: undefined		// 사용가능한 특수문자
				,fullChar			: false			// 전각문자로 처리여부
		};
		
		if("undefined" != typeof(userOption.name)){option.name = userOption.name;}
		if("undefined" != typeof(userOption.nullable)){option.nullable = userOption.nullable;}
		if("undefined" != typeof(userOption.length)){option.length = userOption.length;}
		if("undefined" != typeof(userOption.minLength)){option.minLength = userOption.minLength;}
		if("undefined" != typeof(userOption.maxLength)){option.maxLength = userOption.maxLength;}
		if("undefined" != typeof(userOption.minByte)){option.minByte = userOption.minByte;}
		if("undefined" != typeof(userOption.maxByte)){option.maxByte = userOption.maxByte;}
		if("undefined" != typeof(userOption.charType)){option.charType = userOption.charType;}
		if("undefined" != typeof(userOption.userChar)){option.userChar = userOption.userChar;}
		if("undefined" != typeof(userOption.fullChar)){option.fullChar = userOption.fullChar;}
		
		return option;
	},
	
	/**
	 * Max Length 셋팅
	 */
	this.initSetMaxLength = function($elem, maxLength){
		$elem.on("keyup",function(event){
			var val = $(this).val();
			if(val.length > maxLength){
				val = val.substring(0,maxLength);
				$(this).val(val);
			};
		});
		var _this = this;
		//금액기' 버그로 인해 삭제 : ex)12,123,123,123 ==> 12,123,123,1
		//붙여넣기로 입력시 길이초과 오류가 발생해서, 이벤트 다시 추가하고, charType으로 제한함.
		$elem.on("blur",function(event){
			var charType = (_this.parseOption( $(this).attr("data-jx-chk-opt") )['charType']);
			charType = (undefined != charType && "" != charType)? charType.toLowerCase():"";
			var eleName = _this.parseOption( $(this).attr("data-jx-chk-opt") )['name'];
			eleName = (undefined != eleName && "" != eleName)? eleName : "";
			if(charType == "korengnum" || charType=="engnum" || charType=="num" || charType=="kor"){
				var val = $(this).val();
				if(val.length > maxLength){
					//alert( eleName +" 입력을 "+ maxLength +"자리로 해주세요");
					MobPopup.showAlertPopup(eleName +" 입력을 "+ maxLength +"자리로 해주세요","","");
					$(this).focus();
					//val = val.substring(0,maxLength);
					//$(this).val(val);
				}
			}	
		});
	},
	
	/**
	 * Max Byte 셋팅
	 */
	this.initSetMaxByte = function($elem, maxByte){
		var _this = this;
		$elem.on("blur",function(event){
			var val = $(this).val();
			var valByte = MobStringUtil.getByte(val);
			if(valByte > maxByte){
				//alert( _this.parseOption( $(this).attr("data-jx-chk-opt") )['name'] +"maxbyte초과");
				val = _this.cutStringToByte(val,maxByte);
				$(this).val(val);
			};
		});
	},
	
	/**
	 * chartype 셋팅
	 * 특수문자형식 \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"
	 */
	this.initSetChartype = function($elem, checkOption){
		var _this = this;
		var chartype = checkOption['charType'];
		//TODO $._data($("#frcy_amt2").get(0), "events");
		
		if("kor" == chartype){					/* 한글 */
			var allowChar = "ㄱ-ㅎㅏ-ㅣ가-힣";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("eng" == chartype){			/* 영문만 */
			var allowChar = "a-zA-Z";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("num" == chartype){			/*숫자 */
			var allowChar = "0-9";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("korNum" == chartype){			/* 한글+숫자 */
			var allowChar = "0-9ㄱ-ㅎㅏ-ㅣ가-힣";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("korEng" == chartype){			/* 한글+영문 */
			var allowChar = "ㄱ-ㅎㅏ-ㅣ가-힣";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("engNum" == chartype){			/* 영문+숫자 */
			var allowChar = "0-9a-zA-Z";
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("korEngNum" == chartype){		/* 한글+영문+숫자 */
			var allowChar = "0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z \u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55"; //"0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ㆍᆞᆢ•‥a·﹕"
			$elem.on("keyup",function(event){ _this.setLetterOnlyExpKeyup($elem, allowChar, checkOption); });
			$elem.on("change",function(event){ _this.setLetterOnlyExpChange($elem, allowChar, checkOption); });
		}else if("money" == chartype){			/* 금액표시 (음수 미포함) default:"" 값이 없는경우 아무표시안함*/
			$elem.on("keypress",function(event){ _this.setLetterOnlyNum($elem, checkOption, event); });		// 숫자 외의 모든 문자는 제거
			$elem.on("focus",function(event){ _this.getOnlyNum($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setIntMoneyFormat($elem); });							// 금액형태로 변환
			$elem.on("change",function(event){ _this.setLetterOnlyNum($elem, checkOption, event); });
		}else if("zeroMoney" == chartype){			/* 금액표시 (음수 미포함) default:0*/
			$elem.on("keypress",function(event){ _this.setLetterOnlyNum($elem, checkOption, event); });		// 숫자 외의 모든 문자는 제거
			$elem.on("focus",function(event){ _this.getOnlyNum($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setIntZeroMoneyFormat($elem); });							// 금액형태로 변환
		}else if("intMoney" == chartype){		/* 정수금액표시 (음수포함) */
			$elem.on("keypress",function(event){ _this.setLetterOnlyInt($elem, checkOption, event); });		// 숫자, '-' 외의 모든 문자는 제거
			$elem.on("focus",function(event){ _this.getOnlyInt($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setIntMoneyFormat($elem); });							// 금액형태로 변환
		}else if("floatMoney" == chartype){		/* 실수금액 (음수포함) */
			$elem.on("keypress",function(event){ _this.setLetterOnlyFloat($elem, checkOption, event); });
			$elem.on("focus",function(event){ _this.getOnlyFloat($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setFloatMoneyFormat($elem); });
		}else if("float" == chartype){			/* 전화번호 */
			$elem.on("keypress",function(event){ _this.setLetterOnlyFloat($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setFloat($elem, checkOption, event); });
		}else if("phone" == chartype){			/* 전화번호 */
			$elem.on("keypress",function(event){ _this.setLetterOnlyNum($elem, checkOption, event); });
			$elem.on("focus",function(event){ _this.getOnlyNum($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setPhoneFormat($elem); });
		}else if("rate" == chartype){
			$elem.on("keypress",function(event){ _this.setLetterOnlyRate($elem, checkOption, event); });
			$elem.on("focus",function(event){ _this.getOnlyFloat($elem, checkOption, event); });
			$elem.on("blur",function(event){ _this.setFloatMoneyFormat($elem); });
		} else if("korEngNumSpec" == chartype){ /* 한글+영문+숫자+(키보드 內 특수문자) */
			$elem.on("change",function(event){ //blur, change
				var rateReg = /[^0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z \u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55 \\~`!@#$%^&*()_+-=:;"'{}\[\]<>,.?\/|]/g; //확정
				if(!rateReg.test($elem.val())){
					return true;
				}
				$elem.val($elem.val().replace(rateReg, ""));
			});
		}
	},
	/**
	 * 정규식을 이용한 입력글자 제한 처리 (keyup 이벤트로 처리한다)
	 */
	this.setLetterOnlyExpKeyup = function($elem, allowChar, checkOption){
		if(checkOption["userChar"] != undefined && checkOption["userChar"].length > 0) {
			allowChar += checkOption["userChar"];
		}
		var regExp = new RegExp("[^" + allowChar +  "]", "g");
		//return true로 해줘야 한글입력식 ㅎㅏㄴㅏㄷㅏ  이런식으로 되는 문제를 피할수 있음
		if(!regExp.test($elem.val())){
			return true;
		}
		//허용글자(allowChar)가 아닌 글자는 "" (공백)처리
		$elem.val($elem.val().replace(regExp, ""));
	},
	/**
	 * 정규식을 이용한 입력글자 제한 처리 (change 이벤트로 처리한다)
	 */
	this.setLetterOnlyExpChange = function($elem, allowChar, checkOption){
		if(checkOption["userChar"] != undefined && checkOption["userChar"].length > 0) {
			allowChar += checkOption["userChar"];
		}
		var regExp = new RegExp("[^" + allowChar +  "]", "g");
		
		//허용글자(allowChar)가 아닌 글자는 "" (공백)처리
		$elem.val($elem.val().replace(regExp, ""));
	},
	/**
	 * 키입력시 한글만 입력받음
	 */
	this.setLetterOnlyKor = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
		
		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
		if(!((pKey.charCodeAt() > 0x3130 && pKey.charCodeAt() < 0x318F) || (pKey.charCodeAt() >= 0xAC00 && pKey.charCodeAt() <= 0xD7A3))) {
	    	this.turnOffEventFunc(event);
	    	return false;
	    }
	   
	},
	
	/**
	 * 키입력시 영문만 입력받음
	 */
	this.setLetterOnlyEng = function($elem, checkOption, event){
		 var pKey = String.fromCharCode(event.which);
	   
		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
		if ((event.which < 65 || event.which > 122) ||  (90 < event.which && event.which < 97) ){ /* 문자 키코드값 */
	        /*  enter, tab, backspace 방향키(앞,뒤)는 예외처리 */
	        this.turnOffEventFunc(event);
	        return false;
	    }
	},
	
	/**
	 * 키입력시 숫자만 입력받음
	 */
	this.setLetterOnlyNum= function($elem, checkOption, event){
		
		if($elem.is('input') || $elem.is('textarea')){
			$elem.val($elem.val().replace(/[^0-9]/g, ""));
		}else{
			$elem.text($elem.text().replace(/[^0-9]/g, ""));
		}
		/*if(event.shiftKey == true){
			this.turnOffEventFunc(event);
			return false;
		}
	    
		if ( event.which < 48 || event.which > 57 ) { 숫자 키코드값 
	          enter, tab, backspace 방향키(앞,뒤)는 예외처리 
	        if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 || event.which == 37 ){	// || event.which == 39 - 작은따옴표 안들어가도록 제거
	            return true;
	        }
	        this.turnOffEventFunc(event);
	        return false;
	    }*/
	},
	
	/**
	 * 키입력시 숫자만 입력받음( .점 추가)
	 */
	this.setLetterOnlyRate= function($elem, checkOption, event){
		if(event.shiftKey == true){
			this.turnOffEventFunc(event);
			return false;
		}
	    
		 /*  enter, tab, backspace 방향키(앞,뒤)는 예외처리 */
        if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 || event.which == 37 ){	// || event.which == 39 - 작은따옴표 안들어가도록 제거
            return true;
        }
        
		var pKey = String.fromCharCode(event.which);
	    var rateReg = /[0-9\\.\\]/g;
	    
	    if(pKey!="\r" && !rateReg.test(pKey)){
	    	this.turnOffEventFunc(event);

	    }
	},
	
	
	/**
	 * 키입력시 한글+숫자만 입력받음
	 */
	this.setLetterOnlyKorNum = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
	    if(!((pKey.charCodeAt() > 0x3130 && pKey.charCodeAt() < 0x318F) || (pKey.charCodeAt() >= 0xAC00 && pKey.charCodeAt() <= 0xD7A3)
	    || !this.setLetterOnlyNum($elem, checkOption, event))) {
	    	this.turnOffEventFunc(event);
	    	return false;
	    }
	},
	
	/**
	 * 키입력시 한글+영문만 입력받음
	 */
	this.setLetterOnlyKorEng = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
	    if(!((pKey.charCodeAt() > 0x3130 && pKey.charCodeAt() < 0x318F) || (pKey.charCodeAt() >= 0xAC00 && pKey.charCodeAt() <= 0xD7A3)
	        || !(pKey!="\r" && this.setLetterOnlyEng($elem, checkOption, event)))) {
	    	this.turnOffEventFunc(event);
	    	return false;
	    }
	},
	
	/**
	 * 키입력시 영문+숫자만 입력받음
	 */
	this.setLetterOnlyEngNum = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
	    
		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
		
		if ( (event.which < 65 || event.which > 122) ||   (90 < event.which && event.which < 97) ) {/* 문자 키코드값 */
	        if((47 < event.which && event.which < 58) && !event.shiftKey) { /* 숫자허용 */
	            return true;
	        }
	        
	        this.turnOffEventFunc(event);
	        return false;
	    }
	},
	
	
	/**
	 * 키입력시 한글+영문+숫자만 입력받음
	 */
	this.setLetterOnlyKorEngNum = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);

		//  enter, tab, backspace 방향키(앞,뒤)는 예외처리
		if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 ||  event.which == 39){
			return true;
		}
		// 허용한 특수문자 인경우
		if(this.isUserChar($elem, checkOption, event, pKey)){
			return true;
		}
		
	    if(!((pKey.charCodeAt() > 0x3130 && pKey.charCodeAt() < 0x318F) || (pKey.charCodeAt() >= 0xAC00 && pKey.charCodeAt() <= 0xD7A3))
	    && ( (event.which < 65 || event.which > 122) ||   (90 < event.which && event.which < 97))) {
	        if((47 < event.which && event.which < 58) && !event.shiftKey) { /* 숫자허용 */
	            return true;
	        }
	        this.turnOffEventFunc(event);
	        return false;
	    }
		
		return true;
		
	},
	
	/**
	 * 키입력시 정수만 입력받음 (음수포함)
	 */
	this.setLetterOnlyInt = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
	    var intReg = /[0-9\\-]/g;

	    /*  enter, tab, backspace 방향키(앞,뒤)는 예외처리 */
        if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 || event.which == 39) {
           return true;
        }
        
	    if(pKey!="\r" && !intReg.test(pKey)){
	    	this.turnOffEventFunc(event);
	    }
	},
	
	
	/**
	 * 키입력시 실수만 입력받음 (음수포함)
	 */
	this.setLetterOnlyFloat = function($elem, checkOption, event){
		var pKey = String.fromCharCode(event.which);
	    var floatReg = /[0-9\\.\\-]/g;
	   
	    /*  enter, tab, backspace 방향키(앞,뒤)는 예외처리 */
        if(event.which == null || event.which == 0 || event.which == 8 || event.which == 9 || event.which == 39) {
           return true;
        }
	    
	    if(pKey!="\r" && !floatReg.test(pKey)) /* 엔터키 및 regkey가 아닐경우 리턴 */
	    	this.turnOffEventFunc(event);
		
	},
	
	
	/**
	 * 키입력시 userChar에 입력된 특수문자가 입력가능하도록 처리
	 */
	this.isUserChar = function($elem, checkOption, event, pKey){
		if( undefined != checkOption['userChar']) {
	        var userKey = checkOption['userChar'];
	        if(userKey.toLowerCase()=="all"){
	            userKey = this.getUserCharAll();
	        }
	        for(var i=0;i< userKey.length;i++) {
	            if(pKey == userKey.charAt(i)) {
	                return true;
	            }
	        }
	    }
		
		return false;
	},
	
	
	/**
	 * 숫자형 - 숫자외의 값은 모두 제거
	 */
	this.getOnlyNum = function($elem, checkOption, event){
		var val = $elem.val();
		
		if(isNull(val)) return "";
		if("number" == typeof(val)) val = String(val);
	
		val = val.replace(/[^0-9]/g, "");
		$elem.val(val);
	},
	
	/**
	 * 정수형 - 숫자,'-'외의 모든 문자를 제거
	 */
	this.getOnlyInt = function($elem, checkOption, event){
		var val = $elem.val();
		
		if(isNull(val)) return "";
		if("number" == typeof(val)) val = String(val);
		
		val = val.replace(/[^0-9\-]/g, "");
		$elem.val(val);
	},
	
	/**
	 * 실수형 - 숫자,'.','-' 외의 문자 모두 제거, 소수점이 여러개인경우 앞의 하나만 남기고 제거
	 */
	this.getOnlyFloat = function($elem, checkOption, event){
		var val = $elem.val();
		
		if(isNull(val)) return "";
		if("number" == typeof(val)) val = String(val);
		
		val = val.replace(/[^0-9.-]/g, "");
		
		if(-1 < val.indexOf(".")){
			var num = val.substring(0,val.indexOf("."));
			var decimal = val.substring(val.indexOf("."));
			decimal = decimal.replace(/[.]/g, "");
			val = num+"."+decimal;
		}
		$elem.val(val);
	},
	
	/**
	 * 알파벳 외의 값은 모두 지움
	 */
	this.getOnlyEng = function($elem, checkOption, event){
		var val = $elem.val();
		if(isNull(val)) return "";
		if("number" == typeof(val)) val = String(val);
		val = val.replace(/[^a-zA-z]/g, "");
		$elem.val(val);
	},
	
	/**
	 * 실수형 format
	 */
	
	this.setFloat = function($elem){
		var val = $elem.val();
		val = mobFormatter.float(val);
		$elem.val(val);
	},
	
	/**
	 * 금액 format - 정수형
	 */
	this.setIntMoneyFormat = function($elem){
		var val = $elem.val();
		val = mobFormatter.number(val);
		$elem.val(val);
	},
	
	this.setIntZeroMoneyFormat = function($elem){
		var val = $elem.val();
		val = mobFormatter.number(val,{"defDat":0});
		$elem.val(val);
	},
	
	/**
	 * 금액 format - 실수형
	 */
	this.setFloatMoneyFormat = function($elem){
		var val = $elem.val();
		val = mobFormatter.decimal(val);
		$elem.val(val);
	},
	
	/**
	 * 전화번호 format
	 */
	this.setPhoneFormat = function($elem){
		var val = $elem.val();
		val = mobFormatter.phone(val);
		$elem.val(val);
	},
	
	/**
	 * 한글이 들어있는지 여부 check
	 */
	this.checkNotKor = function($elem, checkOption){
		var _this = this;
		var isNotKor = true;
		
		isNotKor = this.isNotKor($elem);
		
		//한글이 들어있는 경우
		if(!isNotKor){
			MobPopup.showAlertPopup(checkOption['name']+"은(는) 한글을 입력할 수 없습니다.", undefined, function(){
				_this.clearVal($elem);
				$elem.focus();
			});
		};
	},
	
	/**
	 * 한글을 포함하지 않았는지 여부 
	 * @return true	 : 한글없음
	 * 		   false : 한글이 포함되어있음.
	 */
	this.isNotKor = function($elem){
		var isNotKor = true;
		var val = $elem.val();
		
		if(MobUtil.isEmpty(val)){
			return isNotKor;
		}
		
		for(var idx=0;idx < val.length;idx++){
	        var c = escape(val.charAt(idx));
	        if ( c.indexOf("%u") > -1 ) {
	        	isNotKor = false;
	            break;
	        }
	    }
		return isNotKor;
	},
	
	/**
	 * 모두 한글인지 여부 체크
	 */
	this.isAllKor = function($elem){
		var isAllKor = true;
		var val = $elem.val();
		
		if(MobUtil.isEmpty(val)){
			return isAllKor;
		}
		   
	    for(var idx=0;idx < val.length;idx++){
	      var c = escape(val.charAt(idx));
	      if ( c.indexOf("%u") == -1) {
	    	  isAllKor = false;
	    	  break;
	      }
	    }
	    return isAllKor;
	},
	
	/**
	 * byte 단위로 string을 자릅니다.
	 */
	this.cutStringToByte = function(strValue,cutByte){
		 var sumLength = 0;
	    var cutStr = "";
	    for(var i= 0;i < strValue.length; i++){
	    	
	        if( escape(strValue.charAt(i)).length > 3 ) {
	        	strLength = 2; 
	        }else if (strValue.charAt(i) == '<' || strValue.charAt(i) == '>') { 
	        	strLength = 4; 
	        }else { 
	        	strLength = 1 ; 
	        }
	        
	        if ( cutByte < (sumLength + strLength) ) { break; }
	        
	        sumLength += strLength;
	        cutStr += strValue.charAt(i);
	    }
	    return cutStr;
	},
	
	/**
	 * event 발생시 브라우저별로 자체 제공하는 특별기능 끄기.
	 */ 
	this.turnOffEventFunc = function(event) {
	    event = event || window.event;
	    if (event.preventDefault) {
	        event.preventDefault();   // firefox/모질라에서 event 발생시 자체 제공하는 특별기능 끄기.
	    } else {
	        returnValue(event);
	    }
	},
	
	/**
	 * 입력가능한 모든 특수문자
	 */
	this.getUserCharAll = function(){
		 return "~!@#$%^&*()_+|-=.,? ";
	},
	/**
	 * 값을 삭제
	 */
	this.clearVal = function($elem){
		$elem.val("");
		$elem.next().css("display", "none");
	},
	
	/**
	 * 정확한 핸드폰 번호인지 여부 return 
	 */
	this.isValidCellPhone = function(phoneNo){
		var isValid = true;
		var regExp = /^01[016789]{1}[1-9]{1}[0-9]{6,7}$/;
		isValid = regExp.test(phoneNo);
		return isValid;
	}
};

var MobValidation = new _mobValidation();