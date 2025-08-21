/**
 * Formatter를 정의합니다.
 */
var formatter = new (Class.extend({
	init : function(){
	}
	/**
	* Trim 기능 
	*/
	, trim : function(dat){
		if(isNull(dat)) return "";
		return $.trim(dat);
	}
	/**
	* 정규식 3자리마다 ,를 붙임
	*/
	, number : function(dat) {
		if(isNull(dat)) return "";
		if(dat==null) return "";
		/*
		if(typeof dat == "string") dat = String(Number(dat));
		else if(typeof dat == "number")	dat = String(dat);
		*/
		
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
		
		dat = dat.replace(",", "");
		
		var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
		dat += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(dat)) 							// dat값의 첫째자리부터 마지막자리까지
			dat = dat.replace(reg, '$1' + ',' + '$2');	// 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	* 정규식 3자리마다 ,를 붙임 ( 뒷 부분에 '원' 글자 추가)
	*/
	, amount : function(dat) {
		if(isNull(dat)) return "";
		if(typeof dat == "string") dat = String(Number(dat));
		else if(typeof dat == "number")	dat = String(dat);
		
		var reg = /(^[+-]?\d+)(\d{3})/;				
		dat += ''; 										
		while (reg.test(dat)) 							
			dat = dat.replace(reg, '$1' + ',' + '$2');	
		
		return dat + " 원"; 
	}
	
	/**
	* 소수점 이하 제거 (int형으로 반환) 
	*/
	, removeDecimal : function(dat) {

		if(isNull(dat)) return "";
		var nums = dat.split('.');
		
		return nums[0].replace(/,/g,""); 		
	}
	
	/**
	* 소수점 이하 제거 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint0 : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		return nums[0]; 				// 바뀐 dat 값을 반환.
	}
	
	
	/**
	* 소수점 자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimal : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 							// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		
		if(isNaN(nums[1])){
			return nums[0];
		}
		
		return nums[0]+"."+nums[1]; 									// 바뀐 dat 값을 반환.
	}
	/**
	* 소수점 2자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint2 : function(dat) {

		if(isNull(dat)) return "";
		if("number" == typeof(dat)){
			dat = String(dat);
		}
		if(dat.indexOf(',')>0) return dat;
		var sign = (dat.substring(0,1)=="-")?"-":"";
		dat = dat.replace(/-/g, "");
		var nums = dat.split('.');
		if (nums[0] == null || nums[0] == undefined) nums[0] = "0";
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		if (Number(nums[0]) < 0) {
			sign = "";
		}
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return sign + nums[0]+"."+"00";				// 소수점이 없을경우 강제로 '0'을 붙임
			else return sign + nums[0]+"."+nums[1].substring(0,2); 				// 바뀐 dat 값을 반환.
	}
	/**
	* 소수점 3자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint3 : function(dat) {

		if(isNull(dat)) return "";
		if("number" == typeof(dat)){
			dat = String(dat);
		}
		if(dat.indexOf(',')>0) return dat;
		var sign = (dat.substring(0,1)=="-")?"-":"";
		dat = dat.replace(/-/g, "");
		
		var nums = dat.split('.');
		if (nums[0] == null || nums[0] == undefined) nums[0] = "0";
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		if (Number(nums[0]) < 0) {
			sign = "";
		}
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return sign + nums[0]+"."+"000";				// 소수점이 없을경우 강제로 '0'을 붙임
		else return sign + nums[0]+"."+nums[1].substring(0,3); 				// 바뀐 dat 값을 반환.
	}
	/**
	* 소수점 4자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint4 : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		return nums[0]+"."+nums[1].substring(0,4); 				// 바뀐 dat 값을 반환.
	}
	/**
	* 소수점 5자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint5 : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		return nums[0]+"."+nums[1].substring(0,5); 				// 바뀐 dat 값을 반환.
	}
	/**
	* 소수점 6자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, decimalPoint6 : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		
		return nums[0]+"."+nums[1].substring(0,6); 				// 바뀐 dat 값을 반환.
	}
	/**
	* '-'부호 있을시 소수점 2자리 표시 + 정규식 3자리마다 ,를 붙임
	*/
	, SigndecimalPoint2 : function(dat) {

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
	}
	/**
	* 숫자만 남기고 문자는 삭제처리
	*/
	, numberOnly : function(dat) {
		var regex = /[^0-9]/g;
		return Number(dat.replace(regex, ''));		
	}
	/**
	* 숫자를 5자리로 늘림
	* ex) 1 ==> 00001, 15 ==> 00015
	*/
	, numberPadding5 : function(dat) {
		if(isNull(dat)) return dat;
		if(dat.length>=5) return dat;
		
		for(var i = dat.length; i<5;i++){
			dat="0"+dat;
		}
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	* 숫자를 12자리로 늘림
	* ex) 1 ==> 00001, 15 ==> 000000000015
	*/
	, numberPadding12 : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length>=12) return "";
		
		for(var i = dat.length; i<12;i++){
			dat="0"+dat;
		}
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	* 숫자를 15자리로 늘림
	* ex) 1 ==> 00001, 15 ==> 000000000015
	*/
	, numberPadding15 : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length>=15) return "";
		
		for(var i = dat.length; i<15;i++){
			dat="0"+dat;
		}
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	* 숫자를 원하는 자리수만큼 늘림
	* ex) 1 ==> 00001, 15 ==> 000000000015
	*/
	, numberPaddingzero : function(dat, num) {
		if(isNull(dat)) return "";
		if(dat.length>=Number(num)) return "";
		
		for(var i = dat.length; i<num;i++){
			dat="0"+dat;
		}
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	 * 숫자를 7자리로 늘림
	 * ex) 1 ==> 0000001 
	 */
	, numberPaddingzero7 : function(dat) {
		if(isNull(dat)) return "";
		
		for(var i = dat.length; i<7;i++){
			dat="0"+dat;
		}
		
		return dat; 									// 바뀐 dat 값을 반환.
	}
	/**
	 * 숫자를 7자리로 늘림
	 * ex) 1 ==> 0000001 
	 */
	, maxlength : function(dat,size) {
		var result='';
		if(dat.length > size){
			result = dat.substring(0,size-2) + '..';
		}else{
			result = dat;
		}
		return result;
	}
	/**
	* 소수점 3자리 표시 + 정규식 3자리마다 
	*/
	, dePoint3num : function(dat) {
		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return nums[0]+"."+"000";				// 소수점이 없을경우 강제로 '0'을 붙임
		else if(nums[1].length<3){
			for(var i=nums[1].length; i<3; i++) nums[1] = nums[1]+"0";
			return nums[0]+"."+nums[1];
		}else return nums[0]+"."+nums[1].substring(0,3); // 바뀐 dat 값을 dat;
	}
	/**
	* 소수점 2자리 표시 + 정규식 3자리마다 , + %를 붙임
	*/
	, dePoint2percent : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return nums[0]+"."+"00"+ " %";		// 소수점이 없을경우 강제로 '0'을 붙임
			else return nums[0]+"."+nums[1].substring(0,2)+ " %"; // 바뀐 dat 값을 dat + " %";
	}
	/**
	* 소수점 6자리 표시 + 정규식 3자리마다 , + %를 붙임
	*/
	, dePoint6percent : function(dat) {

		if(isNull(dat)) return "";
		if(dat.indexOf(',')>0) return dat;
		var nums = dat.split('.');
		if(typeof nums[0] == "string") nums[0] = String(Number(nums[0]));
		else if(typeof nums[0] == "number")	nums[0] = String(nums[0]);
		
		var reg = /(^[+-]?\d+)(\d{3})/;    						// 정규식(3자리마다 ,를 붙임)
		nums[0] += ''; 											// ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(nums[0])) 								// nums[0]값의 첫째자리부터 마지막자리까지
			nums[0] = nums[0].replace(reg, '$1' + ',' + '$2');	// 인자로 받은 nums[0] 값을 ,가 찍힌 값으로 변환시킴
		if(nums[1]==null) return nums[0]+"."+"000000"+ " %";		// 소수점이 없을경우 강제로 '0'을 붙임
			else return nums[0]+"."+nums[1].substring(0,6)+ " %"; // 바뀐 dat 값을 dat + " %";
	}
	/**
	* 계좌번호 인덱싱
	*/
	, accountNumber : function(dat) {
//		if(isNull(dat)) return "";
//		dat = $.trim(dat);
//		if(dat.length != 14) return dat;		
//		dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,14);
//		return dat;
		if(isNull(dat)) return "";
		
		dat = $.trim(dat);
		dat = dat.replace(/-/g, "");
		
		if(dat.length == 16) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,16);
		}
		else if(dat.length == 14) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,14);
		}
		return dat;
	}
	/**
	* 계좌번호 인덱싱 16자리
	*/
	, accountNumber16 : function(dat) {
		if(isNull(dat)) return "";
		dat = $.trim(dat);
		if(dat.length != 16) return dat;		
		dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,16);
		return dat;
	}
	/**
	* 계좌번호 인덱싱 14,16자리
	*/
	, allAccountNumber : function(dat) {
		if(isNull(dat)) return "";
		dat = $.trim(dat);
		if(dat.length == 16) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,16);
		}
		else if(dat.length == 14) {		
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+dat.substring(11,14);
		}
		return dat;
	}
	/**
	* 계좌번호 인덱싱  (신용카드 결제계좌번호)
	*/
	, accountNumber2 : function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length != 14) return dat;		
		dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ dat.substring(9,11)+"-"+"***";
		return dat;
	}
	/**
	* 계좌번호 인덱싱  (신용카드 결제계좌번호) 2012.12.17
	*/
	, accountNumber3 : function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length != 14) return dat;		
		dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+ "**" +"-"+dat.substring(11,14);
		return dat;
	}
	/**
	* 계좌번호 인덱싱  (신용카드 결제계좌번호) 2013.07.16
	*/
	,accountMaskSecond : function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length != 14) return dat;		
		dat = dat.substring(0,3)+"-"+ "******" +"-"+dat.substring(9,11)+"-"+dat.substring(11,14);
		return dat;
	}
	/**
	* 휴대폰 번호 
	*/
	, teltNumber : function(dat) {
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
	}
	, teltNumber2 : function(dat) {
		if(isNull(dat)) return "";
		dat = dat.trim();
		dat = dat.replace(/-/g, "");
		
		if(dat.length == 11){
			dat = dat.substring(0,3)+"-"+dat.substring(3,7)+"-"+ "****";
			return dat;		
		}else if(dat.length == 10){
			var num = dat.substring(0,2);
			
			if(num == "02") {
				dat = dat.substring(0,2)+"-"+dat.substring(2,6)+"-"+ "****";
			}else {
				dat = dat.substring(0,3)+"-"+dat.substring(3,6)+"-"+ "****";
			}
			return dat;		
		}else if(dat.length == 9) {
			dat = dat.substring(0,2)+"-"+dat.substring(2,5)+"-"+ "****";
			return dat;
		}
		
		else return dat;
	}
	, acno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 14) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+ dat.substring(5,7)+"-"+dat.substring(7,14);
		return dat;
	}
	, custno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 10) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,10);
		return dat;
	}
	, currency : function(dat) {
		if(isNull(dat)) return "";
		if(dat == "KRW") return "";
		return dat;
	}
	, cardno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 16) return dat;
		
		dat = dat.substring(0,4)+"-"+"****"+"-"+"****"+"-"+dat.substring(12,16);
		return dat;
	}
	, cardnumber : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 16) return dat;
		
		dat = dat.substring(0,4)+"-"+dat.substring(4,8)+"-"+dat.substring(8,12)+"-"+dat.substring(12,16);
		return dat;
	}
	, lcno : function(dat) {			// 신용장번호
		if(isNull(dat)) return "";
		if(dat.length != 15) return dat;
		dat = dat.substring(0,5)+"-"+dat.substring(5,8)+"-"+dat.substring(8,10)+"-"+dat.substring(10,15);
		return dat;
	}
	, brno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 10) return dat;
		if(dat == "0000000000") return "";
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,10);
		return dat;
	}
	, userno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 8) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,8);
		return dat;
	}
	, zipno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 6) return dat;
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,6);
		return dat;
	}
	, telno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 12) return dat;
		
		dat = $.trim(dat.substring(0,4))+"-"+$.trim(dat.substring(4,8))+"-"+dat.substring(8,12);
		return dat;
	}
	, cancledt : function(dat) {
		if(isNull(dat)) return "";
		if($.trim(dat) == "-  -") return "";
		return dat;
	}
	, month : function(dat) {
		if(isNull(dat)) return "";
		return dat + " 개월";
	}
	, percent : function(dat) {
		if(isNull(dat)) return "";
		return dat + " %";
	}
	, gunsu : function(dat) {
		if(isNull(dat)) return "";
		if(typeof dat == "string") dat = String(Number(dat));
		else if(typeof dat == "number")	dat = String(dat);
		
		var reg = /(^[+-]?\d+)(\d{3})/;				
		dat += ''; 										
		while (reg.test(dat)) 							
			dat = dat.replace(reg, '$1' + ',' + '$2');
		return dat + " 건";
	}
	, date : function(dat) {
		if(isNull(dat)) return "";
		if(dat == "0") return "-";//gro020200
		if(dat.length != 8) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8);
		return dat;
	}
	, dateover : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 8) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8);
		return dat;
	}	
	/**
	 *	 ==> 2011-11-03 10:48 
	 */
	, dateNtime : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 14) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8)+" "+dat.substring(8,10)+":"+dat.substring(10,12);
		return dat;
	}
	/**
	 *	 ==> 11-11-03 10:48 
	 */
	, dateNtime2 : function(dat) {
		if(isNull(dat)) return "";
		dat = dat.substring(0,2)+"-"+dat.substring(2,4)+"-"+dat.substring(4,6)+" "+dat.substring(6,8)+":"+dat.substring(8,10);
		return dat;
	}, dateNtimeNsecond : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 14) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8)+" "+dat.substring(8,10)+":"+dat.substring(10,12)+":"+dat.substring(12,14);
		return dat;
	}, dateNtimeNthird : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length < 14) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8)+" "+dat.substring(8,10)+":"+dat.substring(10,12);
		return dat;
}
	// 위에 동일한 기능의 함수 있어서 주석 처리함
//	, date : function(dat) {
//		if(isNull(dat)) return "";
//		dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8);
//		return dat;
//		
//	}
	, valid : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 6) return dat;
		dat = dat.substring(0,4)+"-"+dat.substring(4,6);
		return dat;
	}
	, time : function(dat) {
		if(isNull(dat)) return "";
		dat = dat.substring(0,2)+":"+dat.substring(2,4)+":"+dat.substring(4,6);
		return dat;
		
	}
	// 오전 11시 43분 25초
	, time2 : function(dat) { 
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
		
	}
	, timeShort : function(dat) {
		if(isNull(dat)) return "";
		dat = dat.substring(0,2)+":"+dat.substring(2,4);
		return dat;
		
	}
	, yearday : function(dat) {
		if(isNull(dat)) return "";
		
		if(dat.length != 8) {
			return dat;
		}else {
			dat = dat.substring(0,4)+"-"+dat.substring(4,6)+"-"+dat.substring(6,8);
		}
		return dat;
		
	}
	, datetime : function(date, format) {
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
	}
	, accountAster : function(dat, arg) {
		if(dat.length == 14)
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+dat.substring(9,11)+"-***";
		else if(dat.length == 16)
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+dat.substring(9,11)+"-*****";
		return dat;
	}
	, account : function(dat, arg) {
		if(isNull(dat)) return "";
		dat = $.trim(dat);
		
		if(dat.length == 14)
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+dat.substring(9,11)+"-"+dat.substring(11,14);
		else if(dat.length == 16)
			dat = dat.substring(0,3)+"-"+dat.substring(3,9)+"-"+dat.substring(9,11)+"-"+dat.substring(11,16);
		else return dat;
		if(!dat) return dat;
		
		//arg가 없을때 기본포맷을 설정하고자 할 경우, 여기에서 arg에 기본포맷을 할당하면됨
		//예)if(!arg||!arg.length) arg=[3,3,4];
		if(!arg||!arg.length) return dat;
		
		if(typeof dat == "number")	dat = String(dat);
		
		//이미 포매팅되어있을경우 제거한다.
		else if(/[^0-9]/g.test(dat))
		{	
			dat = dat.replace(/[^0-9]/g, "");
		}
		
		var rArr = [];
		var startIdx = 0;
		for(var i=0 ; i<arg.length ; i++)
		{
			if( !!dat.substr(startIdx, arg[i]) )
				rArr.push(dat.substr(startIdx, arg[i]));
			
			startIdx += arg[i];
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
	}
	, brnoAster : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 10) return dat;
		if(dat == "0000000000") return "";
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		return dat;
	}
	// 주민번호
	, rrno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,10);
		if(dat.length == 13) return dat = dat.substring(0,6)+"-*******";
		if(dat == "0000000000") return "";
		
		return dat;
	}
	// 사업자번호 주민번호 포맷
	, rrnobrno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		if(dat.length == 13) return dat = dat.substring(0,6)+"-*******";
		if(dat == "0000000000") return "";
		
		return dat;
	}
	// 사업자번호 주민번호 * 없이포맷 
	, brnornno2 : function(dat) {
		dat = $.trim(dat);
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-"+dat.substring(5,10);
		if(dat.length == 13) return dat = dat.substring(0,6)+"-"+dat.substring(6,13);
		if(dat == "0000000000") return "";
		
		return dat;
	}
	// 주민번호 >> 생년월일 Cut
	, rrnBrnCut : function(dat) {
		dat = $.trim(dat);
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		if(dat.length == 13) return dat = dat.substring(0,6);
		if(dat == "0000000000") return "";
		
		return dat;
	}
	
	// 주민번호6자리 >> 생년월일 
	, rrnBrnCut2 : function(dat) {
		dat = $.trim(dat);
		if(isNull(dat)) return "";
		if(dat.length == 10) return dat = dat.substring(0,3)+"-"+dat.substring(3,5)+"-*****";
		if(dat.length == 6) return dat = dat+"-*******";
		if(dat == "0000000000") return "";
		
		return dat;
	}
	
	
	// 계좌번호 465-0********** 
	, cracno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 14) return dat;
		if(dat == "00000000000000") return "";
		
		dat = dat.substring(0,3)+"-"+dat.substring(3,4)+"**********";
		return dat;
	}
	// 계좌번호 4650********** 
	, new_cracno : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 14) return dat;
		if(dat == "00000000000000") return "";
		
		dat = dat.substring(0,4)+"**********";
		return dat;
	}
	// 계좌번호 4650********** 
	, new_cracno1 : function(dat) {
		if(isNull(dat)) return "";
		if(dat == "00000000000000") return "";
		
		dat = dat.substring(0,4)+"*********";
		return dat;
	}
	
	// 법인번호 465-0********** 
	, cracno2 : function(dat) {
		if(isNull(dat)) return "";
		if(dat.length != 13) return dat;
		if(dat == "00000000000000") return "";
		
		dat = dat.substring(0,6)+dat.substring(6,7)+"**********";
		return dat;
	}
	
	/**
	* 맥조소 
	* 9FEBB777-F145-496D-A71C-C47B81033F7E 	==> 9FEBB777-****-****-A71C-************
	*/
	, mac_Handler : function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length == 17) return dat = dat.substring(0,2)+"-"+dat.substring(3,5)+"-**-**-**-"+ dat.substring(15,17);
		if(dat.length == 36) return dat = dat.substring(0,8)+"-****-****-"+dat.substring(19,23)+"-************";
		return dat;
	}
	
	/**
	* 하드웨어정보 :HDD_SRL_NO
	* 0C9A36A9-D96E-4757-8FFC-2D9D28D70809 	==> 9FEBB777-****-****-A71C-************
	*/
	, hdd_Handler : function(dat) {
		if(isNull(dat)) return "";		
		if(dat.length == 15) return dat = dat.substring(0,4)+"*******"+dat.substring(11,15);		
		if(dat.length == 36) return dat = dat.substring(0,8)+"-****-****-"+dat.substring(19,23)+"-************";
		return dat;
	}
	
	
}))();
