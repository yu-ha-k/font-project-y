(function() {
	/**
	 * User: kwakyc
	 * Date: 13. 4. 30.
	 * Time: 오전 9:41
	 *
	 * @namespace JexMobileFormatter
	 *
	 * @example <input .. data-jx-formatter="It is yours">
	 *
	 */
	var formatter_attrs = {
			id		: "data-jx-formatter"				//어떤 formatter를 사용할 것인지를 선언합니다.
			,params  : "data-jx-formatter-params" 		//formatter에 대한 parameter
		};

		var JexMobileFormatter = JexPlugin.extend({
			init: function () {
			},
			/**
			 * @method load
			 * data-jx-formatter 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
			 */
			load: function (attr, $jq) {
				this.$object = $jq;
				this.format = $jq.attr(attr);
				this.params = $jq.attr(formatter_attrs.params)?JSON.parse($jq.attr(formatter_attrs.params)):undefined;
			},
			/**
			 * @method setAll
			 * Service 가 호출된 후 data 값이 설정될 때 호출되는 메소드
			 */
			setAll: function (dat) {
				this.$object.setTagValue(getFormattedData(dat, this.format, this.params));
			},
			/**
			 * @method getAll
			 */
/*			getAll: function () {
				//return jex.getAll(this.$object);
				return this.$object.getTagValue();
			}*/
		});

		function getFormattedData(data, format, params){
			return {
				 "number"			: mobFormatter.number
				,"decimal"			: mobFormatter.decimal
				,"decimalPoint0"	: mobFormatter.decimalPoint0
				,"account"			: mobFormatter.account
				,"accountMask"		: mobFormatter.accountMask
				,"accountMask2"		: mobFormatter.accountMask2
				,"accountMaskMid" 	: mobFormatter.accountMaskMid
				,"phone"			: mobFormatter.phone
				,"phoneMask"		: mobFormatter.phoneMask
				,"date"				: mobFormatter.date
				,"dateYm"			: mobFormatter.dateYm
				,"time"				: mobFormatter.time
				,"time2"			: mobFormatter.time2
				,"dateTime"			: mobFormatter.dateTime
				,"cardMask" 		: mobFormatter.cardMask
				,"cardMaskEnd" 		: mobFormatter.cardMaskEnd   //신규 추가(2017.11.06)
				,"card"				: mobFormatter.card
				,"rrnBrnMask"		: mobFormatter.rrnBrnMask
				,"rrnBrnCut"		: mobFormatter.rrnBrnCut
				,"rrnBrn"			: mobFormatter.rrnBrn
				,"zipCode"			: mobFormatter.zipCode
				,"length"			: mobFormatter.length
				,"pymnTmbt"			: mobFormatter.pymnTmbt
				,"fexRefNo"			: mobFormatter.fexRefNo
				,"fexSeqForm"		: mobFormatter.fexSeqForm
				,"lcnForm"			: mobFormatter.lcnForm
				,"toBankNameAbbr"	: mobFormatter.toBankNameAbbr
			}[format](data,params);
		};
	
	// 페이지에 유일한 객체로 만들고 싶다면 new JexMobileFormatter() 로 저장한다.
	jex.plugin.add("JEX_MOBILE_FORMATTER", JexMobileFormatter, formatter_attrs.id);
	
})();

/**
 * 날짜 포맷팅
 * ex) yyyymmdd => yyyy-mm-dd
 *     20120801 => 2012-08-01
 */

var _formatter = function(){
	
	/**
	* 정규식 3자리마다 , 를 붙임
	* @param dat
	* @param [option] defDat 값이없는 경우 처리할 default값 ex) 공백 or 숫자0 등등..
	* @param [option] addData 값에 추가하여 return 할 값 ex) "원"
	* @example mobFormatter.number(1000000);
	* 	 	   mobFormatter.number("1000000",{"defDat":0});
	* 		   mobFormatter.number(1000000,{"defDat":0,"addData":"원"});
	*/
	var _this = this;
	
	this.number = function(dat, args) {
		
		var defDat = args?args['defDat']:undefined;
		var addData = args?args['addData']:undefined;
		
		// 숫자형으로 0이 들어오면 빈문자로 처리하는 문제가 있어서...
		dat = (typeof dat == "number" && dat == 0) ? "" + dat : dat ;
		
		if( isNull(dat) || "" == dat){
			if(isNull(defDat)){
				return "";
			}else{
				if(isNull(addData)){
					return defDat;
				}else{
					return defDat+addData;
				}
			}
		}
		
		if(typeof dat == "string"){ 
			dat = dat.replace(/[^0-9.-]/g,"");
			if(0 == dat.indexOf("-")){
				dat = dat.replace(/[-]/g,"");
				dat = "-"+dat;
			}else{
				dat = dat.replace(/[-]/g,"");
			}
			dat = String(Number(dat));
		}else if(typeof dat == "number"){
			dat = String(dat);
		}
		
		var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
		dat += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(dat)) 							// dat값의 첫째자리부터 마지막자리까지
			dat = dat.replace(reg, '$1' + ',' + '$2');	// 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
		
		if(!isNull(addData)){
			return dat + addData;
		}
		return dat; 									// 바뀐 dat 값을 반환.
	};
	
	this.length = function(dat, args) {
		
		var size = args?args['size']:undefined;
		
		var result='';
		if(dat.length > size){
			result = dat.substring(0,size-2) + '..';
		}else{
			result = dat;
		}
		return result; 									// 바뀐 dat 값을 반환.
	};
	
	/**
	* 정규식 3자리마다 , 를 붙임 - 값이 없는 경우 " " 공백을 return
	* @param dat
	* @param [option] defDat 값이없는 경우 처리할 default값 ex) 공백 or 숫자0 등등..
	* @param [option] addData 값에 추가하여 return 할 값 ex) "원"
	* @example mobFormatter.number(1000000);
	* 	 	   mobFormatter.number("1000000",{"defDat":0});
	* 		   mobFormatter.number(1000000,{"defDat":0,"addData":"원"});
	*/
	this.numberSpace = function(dat) {
		return _this.number(dat,{"defDat":" "}); 
	};
	
	/**
	 * 날짜 포멧팅
	 * @param dat
	 * @example mobFormatter.date(20040101);  =>2004-01-01
	 * 
	 */
	this.date = function(dat) {
		if(isNull(dat)) return "";
		if(dat == "0") return "-";//gro020200
		if(dat.length != 8) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8);
		return dat;
	};
	
	/**
	 * 날짜 포멧팅(YYYYMM)
	 * @param dat
	 * @example mobFormatter.date(20040101);  =>2004-01-01
	 * 
	 */
	this.dateYm = function(dat) {
		if(isNull(dat)) return "";
		if(dat == "0") return "-";//gro020200
		if(dat.length != 6) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6);
		return dat;
	};
	
	/**
	 * 시간 포맷팅
	 * @param dat
	 * @param opt 옵션
	 */
	this.time = function(dat, opt) {
		var ampm = opt?opt['ampm']:undefined;
		
		if(isNull(dat)) return "";
		dat = dat.replace(/[^0-9]/g, "");
		if(dat.length == 6 || dat.length == 9){	
			dat = dat.substring(0,2)+":"+dat.substring(2,4)+":"+dat.substring(4,6);
		}else if(dat.length == 4){
			dat = dat.substring(0, 2)+":"+dat.substring(2, 4);
		}
		
		if(ampm){
			if(12 > parseInt(dat.substring(0, 2))){
				dat = "오전 "+dat; 
			}else{
				dat = "오후 "+dat;
			}
		}
		
		return dat;
	};
	/**
	 * 날짜+시간 포맷팅
	 * @param date
	 * @param opt 옵션
	 * @example 
	 */
	
	this.dateTime = function(date, opt) {
		var format = opt?opt['format']:undefined;
		
		if(!format){
			alert("날짜 포맷을 입력해주세요");
			return false;
		}
		
		if(!date)	return "";
	
		//이미 포맷팅 되어있는값을 삭제한다.
		date = date.replace(/[^0-9]/g,"");
		
		//입력된 날짜의 길이가 포맷팅되어야 하는 길이보다 작으면 뒤에 0을 붙인다.
		var formatLength = format.replace(/[^a-z]/g, "").length;
		var dateLength = date.length;
		for(var i=0 ; i<formatLength-dateLength ; i++){
			date += '0';
		}
		
		if(format.replace(/[^a-z]/g, "")=="hhmiss" && date.length==6)
		{
			date = "00000000"+date;
		}
		
		var idx = format.indexOf("yyyy");
		if( idx > -1 ){
			format = format.replace("yyyy", date.substring(0,4));
		}
		idx = format.indexOf("yy");
		if( idx > -1 ){
			format = format.replace("yy", date.substring(2,4));
		}
		idx = format.indexOf("mm");
		if( idx > -1 ){
			format = format.replace("mm", date.substring(4,6));
		}
		idx = format.indexOf("dd");
		if( idx > -1 ){
			format = format.replace("dd", date.substring(6,8));
		}
		idx = format.indexOf("hh24");
		if( idx > -1 ){
			format = format.replace("hh24", date.substring(8,10));
		}
		idx = format.indexOf("hh");
		if( idx > -1 ){
			var hours = date.substring(8,10);
			hours = parseInt(hours,10)<=12?hours:"0"+String(parseInt(hours,10)-12);
			format = format.replace("hh", hours);
		}
		idx = format.indexOf("mi");
		if( idx > -1 ){
			format = format.replace("mi", date.substring(10, 12));
		}
		idx = format.indexOf("ss");
		if( idx > -1 ){
			format = format.replace("ss", date.substring(12));
		}
		idx = format.indexOf("EEE");
		if( idx > -1 ){
			var weekstr='일월화수목금토'; // 요일 스트링
			
			var day = weekstr.substr(new Date(date.substring(0,4), new Number(date.substring(4,6))-1, date.substring(6,8)).getDay(), 1);
			format = format.replace("EEE", day);
		}
		return format;
	};
	
	/**
	 * 시간 포멧팅
	 * @param date
	 * @example mobFormatter.time2("013032")
	 */
	this.time2 = function(dat) { 
		if(isNull(dat)) return "";
		
		dat = dat.replace(/:/g, "");
		
		if(dat.length == 6) {
			var tmGb	= "오후";
			var temphh	= dat.substring(0,2);
			
			if(Number(temphh) < 12) {
				tmGb	= "오전";
			}else {
				if(temphh != "12") {
					temphh = (Number(temphh) - 12)+"";
					if(Number(temphh) < 10) {
						temphh = "0"+temphh;
					}
				}
			}
			dat = tmGb+" "+temphh+"시 "+dat.substring(2,4)+"분 "+dat.substring(4,6)+"초";
		}else {
			return dat;
		} 
		return dat;
		
	};
	/**
	 *  카드번호 마스크 포맷팅 - 가온데 8자리 '*' 처리
	 */
	this.cardMask = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 16) return dat;
		
		dat = dat.substring(0,4)+"-"+"****"+"-"+"****"+"-"+dat.substring(12,16);
		return dat;
	};
	/**
	 *  카드번호 마스크 포맷팅 - 마지막 4자리 '*' 처리
	 */
	this.cardMaskEnd = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 16) return dat;
		
		dat = dat.substring(0,4)+"-"+dat.substring(4,8)+"-"+dat.substring(8,12)+"-"+"****";
		return dat;
	};	
	/**
	 * 카드번호 포맷팅
	 */
	this.card = function(dat) {
		if(isNull(dat)) return "";
		dat = $.trim(dat);
		if(dat.length != 16) return dat;
		
		dat = dat.substring(0,4)+"-"+dat.substring(4,8)+"-"+dat.substring(8,12)+"-"+dat.substring(12,16);
		return dat;
	};
	/** 
	 * 주민번호/사업자번호 뒷자리 * 처리한 포멧팅
	 */
	this.rrnBrnMask = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		if(dat.length == 13) return dat = dat.substring(0,6)+"-*******";
		if(dat == "0000000000") return "";
		
		return dat;
	};
	/** 
	 * 주민번호 >> 생년월일 Cut
	 */
	this.rrnBrnCut = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		if(dat.length == 13) return dat = dat.substring(0,6);
		if(dat == "0000000000") return "";
		
		return dat;
	};
	
	/** 
	 * 주민번호/사업자번호 포멧팅
	 */
	this.rrnBrn = function(dat) {
		dat = $.trim(dat);
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,10);
		if(dat.length == 13) return dat = dat.substring(0,6)+"-"+dat.substring(6,13);
		if(dat == "0000000000") return "";
		
		return dat;
	};
	
	/**
	 * 우편번호 포맷팅
	 */
	this.zipCode = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 6) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,6);
		return dat;
	};
	/**
	 * 계좌번호 포맷팅
	 * 이미 포매팅 되어있을경우 제거후 다시 포맷팅함
	 * @param dat : 계좌번호
	 * @param opt : 옵션
	 * 				format : Array형식의 계좌번호 자리수를 입력한다. 해당 자리수별로 파싱해서 포맷팅함
	 */
	this.account = function(dat, opt) {
		var format = opt?opt['format']:undefined;
		
		if(!dat) return dat;

		dat = $.trim(dat);
		if(typeof dat == "number")	dat = String(dat);

		//이미 포매팅되어있을경우 제거한다.
		else if(/[^0-9A-Z]/g.test(dat))
		{
			dat = dat.replace(/[^0-9A-Z*]/g, "");
		}
		
		//format가 없을때 기본포맷을 설정하고자 할 경우, 여기에서 format에 기본포맷을 할당하면됨
		//예)if(!format||!format.length) format=[3,3,4];
		//if(!format||!format.length) return dat;
		if(dat.length==13){
			format = 	[2,1,2,8];
		}else if(dat.length==14){
			format = 	[3,6,2,3];
		}else if(dat.length==15){
			format = 	[5,3,2,5];
		}else if(dat.length==16){
			format = [3,6,2,5];
		}else{
			return dat;
		}

		var rArr = [];
		var startIdx = 0;
		for(var i=0 ; i<format.length ; i++)
		{
			if( !!dat.substr(startIdx, format[i]) )
				rArr.push(dat.substr(startIdx, format[i]));

			startIdx += format[i];
		}
		if( !!dat.substr(startIdx) )
		{
			rArr.push( dat.substr(startIdx) );
		}

		var result = "";
		for(var i=0 ; i<rArr.length ; i++)
		{
			if(i==0)
				result = rArr[i];
			else
				result += "-"+rArr[i];
		}
		return result;
	};
	/**
	* 계좌번호 인덱싱 
	*/
	this.accountMask = function(dat) {
		if(isNull(dat)) return "";
		dat = dat.replace(/-/g, "");
		dat = $.trim(dat);
		if(dat.length == 16) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-*****";
		}
		else if(dat.length == 14) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-***";
		}
		return dat;
	};
	
	/**
	* 계좌번호 인덱싱2
	*   000-0000**-00-***
	*/
	this.accountMask2 = function(dat) {
		if(isNull(dat)) return "";
		dat = dat.replace(/-/g, "");
		dat = $.trim(dat);
		if(dat.length == 16) {
			dat = dat.substring(0,3)+"-"+dat.substring(3,7)+"**-"+ dat.substring(9,11)+"-*****";
		}
		else if(dat.length == 14) {
			dat = dat.substring(0,3)+"-"+dat.substring(3,7)+"**-"+ dat.substring(9,11)+"-***";
		}
		return dat;
	};
	
	/**
	* 계좌번호 인덱싱
	*/
	this.accountMaskMid = function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length != 14) return dat;		
		dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ "**" +"-"+dat.substring(11,14);
		return dat;
	};
	
	/**
	 * 전화번호 포맷팅
	 */
	this.phone = function(dat){
		if(!dat) return dat;

		if(typeof dat == "number"){
			dat = String(dat);
		}
		else if(/[^0-9]/g.test(dat)){
			dat = dat.replace(/[^0-9]/g, "");
		}
		dat = dat.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
		return dat;
	};
	
	/**
	 * 전화번호 포맷팅
	 */
	this.phoneMask = function(dat){
		if(!dat) return dat;

		if(typeof dat == "number"){
			dat = String(dat);
		}
		else if(/[^0-9]/g.test(dat)){
			dat = dat.replace(/[^0-9]/g, "");
		}
		dat = dat.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-****");
		return dat;
	};
	
	/**
	* 정규식 3자리마다 ,를 붙임
	* @param dat
	* @param opt 옵션
	*		 [option] decimal 소수점자릿수
	* 		 [option] decimalZero 지정한 소숫점자릿수보다 작을경우 소수점자리수만큼 0으로표시할지 여부 : true,false
	* 		 [option] addData return시 덧붙치고 싶은 문자열 ex) %
	* @example mobFormatter.decimal(1000000.123,{"decimal":2,"decimalZero":true});
	*/
	this.decimal = function(dat, args ) {

		var decimal = args?args['decimal']:undefined;
		var decimalZero = args?args['decimalZero']:undefined;
		var addData = args?args['addData']:undefined;
		var result = "";
		
		if(isNull(dat) || "" === dat) return "";
		
		if("number" == typeof(dat)){ 
			dat = String(dat);
		}else if("string" == typeof(dat)){
			if((/[0-9]/g).test(dat) == false){
				return dat;
			}
			if(-1 < dat.indexOf("-.")) dat.replace("-.","-0.");
			dat = dat.replace(/[^0-9.-]/g,"");
			// '-'가 중간에 들어가있는 경우 제거 
			if(0 == dat.indexOf("-")){
				dat = dat.replace(/[-]/g,"");
				dat = "-"+dat;
			}else{
				dat = dat.replace(/[-]/g,"");
			}
			
			//'.'이 여러개인경우 앞의 하나만 남기고 제거
			if(-1 != dat.indexOf(".")){
				var tmpNums = new Array();
				tmpNums[0] = dat.substring(0, dat.indexOf("."));
				tmpNums[1] = dat.substring(dat.indexOf("."));
				tmpNums[1] = tmpNums[1].replace(/[.]/g,"");
				dat = tmpNums[0]+"."+tmpNums[1];
			}
			
			dat = String(Number(dat));
		}
			
		if(dat.indexOf(',')>0) return dat;
		
		if(isNull(decimalZero)){
			decimalZero = false;
		}
		
		var nums = dat.split('.');
		/*if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);*/
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		if(null == nums[1]){									// 정수인경우
			if(decimalZero){
				var zero = "";
				for(var i=0; i < decimal; i++){
					zero +="0";
				}
				result = nums[0]+"."+zero;
			}else{
				result =  nums[0];
			}
		}else if(decimal > nums[1].length){						// 실수인데 지정한 소숫점자리보다 적은경우
			if(decimalZero){
				for(var i=nums[1].length; i < decimal; i++){	// 지정한 소숫점자릿수보다 작을 경우 나머지 소숫자릿 수만큼 '0'을 붙임
					nums[1] +="0";
				}
			}
			result = nums[0]+"."+nums[1];
		}else{													// 실수인경우
			result =  nums[0]+"."+nums[1].substring(0,decimal); 	// 바뀐 dat 값을 반환.
		}
		
		
		if(!isNull(addData)){
			return result+addData;
		}
		return result;
	};
	
	/**
	* 소수점 이하 제거 + 정규식 3자리마다 ,를 붙임
	*/
	this.decimalPoint0 = function(dat) {

		if(isNull(dat)) return "";
		if("number" == typeof(dat)) dat = String(dat);
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		/*if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);*/
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		return nums[0]; 				// 바뀐 dat 값을 반환.
	},
	
	
	/**
	* 실수형 formatter
	* @param dat
	* @param opt 옵션
	*		 [option] decimal 소수점자릿수
	* 		 [option] decimalZero 지정한 소숫점자릿수보다 작을경우 소수점자리수만큼 0으로표시할지 여부 : true,false
	* 		 [option] addData return시 덧붙치고 싶은 문자열 ex) %
	* @example mobFormatter.decimal(1000000.123,{"decimal":2,"decimalZero":true});
	*/
	this.float = function(dat, args ) {
		var decimal = args?args['decimal']:undefined;
		var decimalZero = args?args['decimalZero']:undefined;
		var addData = args?args['addData']:undefined;
		var result = "";
		
		if(isNull(dat) || "" === dat) return "";
		
		if("number" == typeof(dat)){ 
			dat = String(dat);
		}else if("string" == typeof(dat)){ 
			if(-1 < dat.indexOf("-.")) dat.replace("-.","-0.");
			dat = dat.replace(/[^0-9.-]/g,"");
			// '-'가 중간에 들어가있는 경우 제거 
			if(0 == dat.indexOf("-")){
				dat = dat.replace(/[-]/g,"");
				dat = "-"+dat;
			}else{
				dat = dat.replace(/[-]/g,"");
			}
			
			//'.'이 여러개인경우 앞의 하나만 남기고 제거
			if(-1 != dat.indexOf(".")){
				var tmpNums = new Array();
				tmpNums[0] = dat.substring(0, dat.indexOf("."));
				tmpNums[1] = dat.substring(dat.indexOf("."));
				tmpNums[1] = tmpNums[1].replace(/[.]/g,"");
				dat = tmpNums[0]+"."+tmpNums[1];
			}
			
			dat = String(Number(dat));
		}
			
		if(dat.indexOf(',')>0) return dat;
		
		if(isNull(decimalZero)){
			decimalZero = false;
		}
		
		var nums = dat.split('.');
		/*if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);*/
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		
		if(null == nums[1]){									// 정수인경우
			if(decimalZero){
				var zero = "";
				for(var i=0; i < decimal; i++){
					zero +="0";
				}
				result = nums[0]+"."+zero;
			}else{
				result =  nums[0];
			}
		}else if(decimal > nums[1].length){						// 실수인데 지정한 소숫점자리보다 적은경우
			if(decimalZero){
				for(var i=nums[1].length; i < decimal; i++){	// 지정한 소숫점자릿수보다 작을 경우 나머지 소숫자릿 수만큼 '0'을 붙임
					nums[1] +="0";
				}
			}
			result = nums[0]+"."+nums[1];
		}else{													// 실수인경우
			result =  nums[0]+"."+nums[1].substring(0,decimal); 	// 바뀐 dat 값을 반환.
		}
		
		
		if(!isNull(addData)){
			return result+addData;
		}
		return result;
	};
	
	/**
	 * 숫자형 - 숫자외의 값은 모두 제거
	 */
	this.getOnlyNum = function(val){
		
		if(isNull(val)) return "";
		if("number" == typeof(val)) val = String(val);
	
		val = val.replace(/[^0-9]/g, "");
		
		return val;
	};
	
	/**
	 * 1회차, 2회차
	 */
	this.pymnTmbt = function(val){
		return val + '회차';
	};
	
	// 신용장번호
	this.fexRefNo = function(dat) {	
		if(isNull(dat)) return "";
		if(dat.length==14){
			dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,7)+"-"+dat.substring(7,14);
		}else if(dat.length==15){
			dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8)+"-"+dat.substring(8,15);
		}else{
			dat;
		}
		
		return dat;
	};
	
	// 신용장번호
	this.fexSeqForm = function(dat) {	
		if(isNull(dat)) return "";
		if(dat.length==15){
			dat = dat.substring(0,5)+"-"+dat.substring(5,8)+"-"+dat.substring(8,10)+"-"+dat.substring(10,15);
		}else if(dat.length==16){
			dat = dat.substring(0,1)+"-"+dat.substring(1,5)+"-"+dat.substring(5,9)+"-"+dat.substring(9,11)+"-"+dat.substring(11,16);
		}else if(dat.length==14){
			dat = dat.substring(0,1)+"-"+dat.substring(1,5)+"-"+dat.substring(5,9)+"-"+dat.substring(9,14);
		}else{
			dat;
		}
		
		return dat;
	};
	
	this.lcnForm = function(dat) {	
		if(isNull(dat)) return "";
		if(dat.length > 13){
			//dat = dat.substring(0,5)+"-"+dat.substring(5,8)+"-"+dat.substring(8,10)+"-"+dat.substr(10);
			//dat.substring(0,1)+"-"+dat.substring(1,5)+"-"+dat.substring(5,9)+"-"+dat.substring(9,11)+"-"+dat.substr(11);
			dat;
		}else{
			dat;
		}
		
		return dat;
	};
	
	/**
	* 은행명 축약
	*/
	this.toBankNameAbbr = function(dat) {
		var bankList = [
			{oriBankNm:"기업은행", abbrBankNm:"기업"}
			, {oriBankNm:"국민은행", abbrBankNm:"국민"}
			, {oriBankNm:"우리은행", abbrBankNm:"우리"}
			, {oriBankNm:"신한은행", abbrBankNm:"신한"}
			, {oriBankNm:"하나은행", abbrBankNm:"하나"}
			, {oriBankNm:"농협은행", abbrBankNm:"농협"}
			, {oriBankNm:"지역농축협", abbrBankNm:"농축협"}
			, {oriBankNm:"SC은행", abbrBankNm:"SC"}
			, {oriBankNm:"한국씨티은행", abbrBankNm:"씨티"}
			, {oriBankNm:"우체국", abbrBankNm:"우체국"}
			, {oriBankNm:"경남은행", abbrBankNm:"경남"}
			, {oriBankNm:"광주은행", abbrBankNm:"광주"}
			, {oriBankNm:"iM(구 대구은행)", abbrBankNm:"iM"}
			, {oriBankNm:"도이치", abbrBankNm:"도이치"}
			, {oriBankNm:"부산은행", abbrBankNm:"부산"}
			, {oriBankNm:"산림조합", abbrBankNm:"산림"}
			, {oriBankNm:"산업은행", abbrBankNm:"산업"}
			, {oriBankNm:"상호저축은행", abbrBankNm:"상호저축"}
			, {oriBankNm:"새마을금고", abbrBankNm:"새마을"}
			, {oriBankNm:"새마을금고중앙회", abbrBankNm:"새마을"}
			, {oriBankNm:"수협", abbrBankNm:"수협"}
			, {oriBankNm:"신협중앙회", abbrBankNm:"신협"}
			, {oriBankNm:"전북은행", abbrBankNm:"전북"}
			, {oriBankNm:"제주은행", abbrBankNm:"제주"}
			, {oriBankNm:"BOA", abbrBankNm:"BOA"}
			, {oriBankNm:"HSBC", abbrBankNm:"HSBC"}
			, {oriBankNm:"JP모간", abbrBankNm:"JP모간"}
			, {oriBankNm:"중국공상은행", abbrBankNm:"중국공상"}
			, {oriBankNm:"중국건설은행", abbrBankNm:"중국건설"}
			, {oriBankNm:"BNP파리바", abbrBankNm:"BNP"}
			, {oriBankNm:"카카오뱅크", abbrBankNm:"카카오"}
			, {oriBankNm:"케이뱅크", abbrBankNm:"케이"}
			, {oriBankNm:"토스은행",abbrBankNm:"토스"}
			, {oriBankNm:"국세", abbrBankNm:"국세"}
			, {oriBankNm:"교보증권",abbrBankNm:"교보"}
			, {oriBankNm:"대신증권",abbrBankNm:"대신"}
			, {oriBankNm:"미래에셋증권",abbrBankNm:"미래에셋"}
			, {oriBankNm:"DB금융투자",abbrBankNm:"DB금융투자"}
			, {oriBankNm:"유안타증권",abbrBankNm:"유안타"}
			, {oriBankNm:"메리츠증권",abbrBankNm:"메리츠"}
			, {oriBankNm:"부국증권",abbrBankNm:"부국"}
			, {oriBankNm:"삼성증권",abbrBankNm:"삼성"}
			, {oriBankNm:"솔로몬투자증권",abbrBankNm:"솔로몬투자"}
			, {oriBankNm:"신영증권",abbrBankNm:"신영"}
			, {oriBankNm:"신한금융투자",abbrBankNm:"신한금융투자"}
			, {oriBankNm:"우리투자증권",abbrBankNm:"우리투자"}
			, {oriBankNm:"유진투자증권",abbrBankNm:"유진투자"}
			, {oriBankNm:"LS증권",abbrBankNm:"LS증권"} //이베스트증권
			, {oriBankNm:"키움증권",abbrBankNm:"키움"}
			, {oriBankNm:"하나증권",abbrBankNm:"하나증권"}
			, {oriBankNm:"아이엠증권",abbrBankNm:"iM증권"}
			, {oriBankNm:"한국투자",abbrBankNm:"한국투자"}
			, {oriBankNm:"한화증권",abbrBankNm:"한화"}
			, {oriBankNm:"KB증권",abbrBankNm:"KB증권"}
			, {oriBankNm:"현대차증권",abbrBankNm:"현대차증권"}
			, {oriBankNm:"케이프투자증권",abbrBankNm:"케이프투자"}
			, {oriBankNm:"NH농협증권",abbrBankNm:"NH증권"}
			, {oriBankNm:"SK증권",abbrBankNm:"SK"}
			, {oriBankNm:"다올투자증권",abbrBankNm:"다올투자"}
			, {oriBankNm:"펀드온라인코리아",abbrBankNm:"펀드온라인"}
			, {oriBankNm:"BNK투자증권",abbrBankNm:"BNK투자증권"}
			, {oriBankNm:"카카오페이증권",abbrBankNm:"카카오증권"}
			, {oriBankNm:"중국은행서울지점",abbrBankNm:"중국은행"}
			, {oriBankNm:"IBK투자증권",abbrBankNm:"IBK증권"}
			, {oriBankNm:"토스증권",abbrBankNm:"토스증권"}
			, {oriBankNm:"상상인증권",abbrBankNm:"상상인"}
		];
		
		var resultDat = "";
		$(bankList).each(function(){
			if(this.oriBankNm == dat) {
		    	resultDat = this.abbrBankNm;		
			}
		});

		if(isEmpty(resultDat)) {
			resultDat = dat;
		}
		
		return resultDat;
	};
};	

var mobFormatter = new _formatter();





/**
 ############################## 참고용 ( 아직적용안함 )###################################
*/
	custno = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 10) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,10);
		return dat;
	};
	userno = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 8) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,8);
		return dat;
	};
	currency = function(dat) {
		if(isNull(dat)) return "";
		if(dat == "KRW") return "";
		return dat;
	};
	lcno = function(dat) {			// 신용장번호
		if(isNull(dat)) return "";
		if(dat.length != 15) return dat;
		dat = dat.substring(0,5)+"-"+dat.substring(5,8)+"-"+dat.substring(8,10)+"-"+dat.substring(10,15);
		return dat;
	};
	brno= function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 10) return dat;
		if(dat == "0000000000") return "";
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,10);
		return dat;
	};
	cancledt = function(dat) {
		if(isNull(dat)) return "";
		if($.trim(dat) == "-  -") return "";
		return dat;
	};
	// 법인번호 465-0********** 
	cracno2 = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 13) return dat;
		if(dat == "00000000000000") return "";
		
		dat = dat.substring(0,6)+dat.substring(6,7)+"**********";
		return dat;
	};
	percent = function(dat) {
		if(isNull(dat)) return "";
		return dat + " %";
	};

	/**
	* 휴대폰 번호
	*/
	teltNumber = function(dat) {
		if(isNull(dat)) return "";
		dat = dat.trim();
		dat = dat.replace(/-/g, "");
		
		if(dat.length == 11){
			dat = dat.substring(0,3)+"-"+dat.substring(3,7)+"-"+ dat.substring(7,11);
			return dat;		
		}else if(dat.length == 10){
			dat = dat.substring(0,3)+"-"+dat.substring(3,6)+"-"+ dat.substring(6,10);
			return dat;		
		}else return dat;
	};
	telno = function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 12) return dat;
		
		dat = $.trim(dat.substring(0,4))+"-"+$.trim(dat.substring(4,8))+"-"+dat.substring(8,12);
		return dat;
	};
	
	/**
	* '-'부호 있을시 소수점 2자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	signDecimalPoint = function(dat) {
	
		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		var reg = /(^[+-]?\d+)(\d{3})/;    								// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 													// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 										// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');			// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return nums[0]+"."+"00";						// 소수점이 없을경우 강제로 '0'을 붙임
		else if(nums[1].length == 1) return nums[0]+"."+nums[1]+"0";
		else return nums[0]+"."+nums[1].substring(0,2); 				// 바뀐 dat 값을 반환.
		
	};