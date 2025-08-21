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

/**
 * showErrorPage @Deprecated by minkoo
 * 오류페이지 출력
 * @param errTitle : 에러타이틀
 * @param errCd : 에러코드
 * @param errMsg : 에러메세지
 * @param loadImgYn : 로딩이미지 활성화여부
 * @param backStep : 백버튼시 활성화할 스텝
 * @return
 */
function showErrorPage(errTitle, errCd, errMsg, loadImgYn, backStep) {
	try {
		if(loadImgYn) {
			showLoadImg(false);
		}

		errTitle = errTitle + " 오류";
		errMsg = "(" + errCd + ")" + errMsg;

		$("#_title_").text(errTitle);
		$("#_cntnt_").text(errMsg);
	} catch(e) {
		bizException(e, "showErrorBiz");
	} finally {
		$("#steperror").show();
		$("#loadingimage").hide();
		$("#job_find").hide();
		$("#wrap").hide();
		_backStep_ = backStep;
	}
} /* end of showErrorBiz */

function remComma(n){
	if(isNull(n)) {
		alert("값이 NULL입니다.");
		return 0;
	}
	n=n.replace(/,/g,"");
	if(isNaN(n)){return 0;} else{return n;}
}

function remDash(n){
	if(isNull(n)) {
		alert("값이 NULL입니다.");
		return 0;
	}
	r=n.replace(/-/g,"");
	if(isNaN(r)){return n;} else{return r;}
}

function remPoint(n){
	if(isNull(n)) return "";
	if("number" == typeof(n)) n = String(n);
	var nums = n.split('.');
	if(nums.length == 0) return n;
	else return nums[0];
}

/**
 *
 * @param startDay	<br/>
 * @param endDay<br/>
 * @returns 문제가 없으면 false, 문제가 있으면 true {Boolean}<br/>
 */
function checkDate(startDay, endDay){
	var today = getCurDate("");
	startDay=remDash(startDay);
	endDay=remDash(endDay);

	var isInvalid = true;

	if(parseInt(startDay) > parseInt(today))
		alert("조회시작일이 현재보다 미래날짜입니다.");
	else if(parseInt(endDay) > parseInt(today))
		alert("조회종료일이 현재보다 미래날짜입니다.");
	else if(parseInt(startDay) > parseInt(endDay)){
		alert("조회시작일이 조회종료일보다 미래날짜입니다.");
	}
	else isInvalid = false;


	return isInvalid;
}

/**
 *
 * @param startDay	<br/>
 * @returns 문제가 없으면 false, 문제가 있으면 true {Boolean}<br/>
 */
function checkDate1(startDay){
	var today = getCurDate("");
	startDay=remDash(startDay);

	var isInvalid = true;

	if(parseInt(startDay) > parseInt(today))
		alert("조회기간 선택이 잘못 되었습니다.");
	else isInvalid = false;


	return isInvalid;
}

/**
 *
 *	글자 입력 길이가 limit를 넘으면 true 반환<br/>
 *	그렇지 않으면 false 반환<br/>
 */

function limitCharactor(textId, limit){
	var text = $("#"+textId).val();
	var textlength = $("#"+textId).val().length;
	if(textlength>limit){
		$("#"+textId).val(text.substr(0, limit));
		return true;
	}
	return false;
}

/**
 *
 *	숫자 입력 길이가 limit를 넘으면 true 반환<br/>
 *	숫자가 아니면 true 반환<br/>
 *	그렇지 않으면 false 반환<br/>
 */
function limitCharactorWhNum(textId, limit){
	var text = $("#"+textId).val();
	var textlength = $("#"+textId).val().length;
	if(isNaN(Number(text))){
		return true;
	}else {
		if(textlength>limit){
			$("#"+textId).val(text.substr(0, limit));
			return true;
		}
	}

	return false;
}

/**
 * 금액을 콤마(,)처리한 문자열로 반환.
 * 처리요 : -  숫자가 아닌 문자열
 * @param val - 부호와 ,가 있는 숫자.
 */
function getAmountWithFMT(val) {
	try {
		var org_val = val;
		// 공백일 경우 영('') 초기화
		//if(isEmpty(val)) {
		if(isNull(val)) {

			val = "";
			return val;
		}
		val = new String(val);
		// 콤마제거
		val = remComma(val);
		// 앞에  0을 제거하는 방법
		if (val < 0) {
	        val *= -1;
			val = "-" + val;
	    } else {
			val *= 1;
			val = "" + val;
	    }
		// 금액을 콤마처리(부호포함)
	    var reg = /(^[+-]?\d+)(\d{3})/;

	    while (reg.test(val)) {
	    	val = val.replace(reg, '$1' + ',' + '$2');
	    }
	    if(val == "NaN") {
			val = org_val;
		}
		return val;

	}  catch(e)  {
		bizException(e, "getAmountWithComma");
	}
} /* end of getAmountWithComma */


/**
 * 공인인증서 인증체크
 * @param SignData - 배열데이터(검증에 사용할 숫자필드)
 * @param CertKey - comSession.getCertSerialkey()
 */
function getCertSign(CertKey, SignData) {
	try {
		if(_isRealApp){
			if($.trim(CertKey) == ""){ alert("getCertSerialkey Error"); return false; }
			if (Object.prototype.toString.apply(SignData) === '[object Array]'){
				SignData = SignData.join(":");
			}else{ alert("SignData Type Error"); return false; }
			return callCertSign(SignData, CertKey);
		}else{
			return true;
		}
	}  catch(e)  {
		bizException(e, "getCertSign");
	}
}

/*
 * 문자 길이 체크
 * param str : 문자열
 * param len : 최대 자리수
 * @ 입력문자 길이가 len보다 크면 false, 작으면 true
 *
 * !한글/영문 모두 체크 가능
*/
function stringLengthCheck (str, len) {
	var result = true;
	var retCode = 0;
	var strLenth = 0;
	for (var i = 0; i < str.length ; i++) {
		var code = str.charCodeAt(i);
		var ch = str.substr(i, 1).toUpperCase();
		code = parseInt(code);
		if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0)))
			strLenth += 2;
		else
			strLenth += 1;
	}
	if (strLenth > len) 		// 텍스트 길이가 요청값보다 길때... false
		result = false;
	return result;
}

//영문 전용 필드 체크 - 빈공백 포함
function checkStringEngWithSpace(dat) {
	for (var i in dat) {
		var code = dat.charCodeAt(i);
		var ch = dat.substr(i, 1).toUpperCase();
		code = parseInt(code);
		if ((ch < "A" || ch > "Z") && ch != " ") {
			return false;
		}
	}
	return true;
}

// 숫자만 체크 -
function checkStringNumber(dat) {
	dat = dat.replace(/,/g, "").replace(/-/g, "");
	for (var i in dat) {
		var code = dat.charCodeAt(i);
		var ch = dat.substr(i, 1).toUpperCase();
		code = parseInt(code);
		if (ch < "0" || ch > "9") {
			return false;
		}
	}
	return true;
}

/*
 * 개인 TTS
 * @praram : text
 */
function tts_text (dat) {
	return;
	// 6003
	// tts_ment
	if (dat == null || dat == undefined || dat == "") {
		//멘트가 없음!
		return;
	}

	var _send = {};
	_send["tts_ment"] = dat;
	_send["_action_code"] = "6003";

	var send_data = JSON.stringify(_send);

	if (_isIphone())
		 alert("tts_ment:"+dat);
	else if (_isAndroid())
		window.BrowserBridge.iwebactionneoibk(send_data);
	else {

	}
}

// SMS 인증번호 자동 입력
var g_sms_id = "";		// input id

//function uf_set_sms (dat) {
function uf_onSmsAuthNumber (dat) {
	if (dat == null) return;

	// dat의 길이가 6이 아니면 return
	// 앞에 0이 붙은 숫자가 SMS와 값이 다른 경우가 있음.
	if (("" + dat).length != 6) return;

	// 자리수가 6자리가 아닐경우 앞에 '0' 추가
	// dat = "000000" + dat;
	// dat = dat.substring(dat.length-6, dat.length);

	if (typeof dat === "number") dat = dat.toString();
	if (checkStringNumber(dat) == false) return;

	g_sms_id = "#" + g_sms_id.replace(/#/g, "");

	var _type = $(g_sms_id).prop("tagName").toLowerCase();
	if (_type == "input") {
		$(g_sms_id).val(dat);
	}
	else {
		$(g_sms_id).text(dat);
	}
}

//tablename 으로 파라미터 수정
//테이블 밑에 체크박스 검색후 상위 div 에 이벤트 전달 방지 추가
//flag 추가 -> true 이면 하나만 선택가능, false 이면 다중선택가능.기본은 하나씩 선택가능
function checkboxToRadio(tableid,flag){
	//테이블 안에 있는 체크박스 하나만 선택되게 하는 함수
	//아이디,라벨 속성 셋팅
	//다수 테이블이 하나의 그룹핑이 되야하는 경우가 있어서 name 속성으로 변경
	var targetDiv="";
	var flag = (flag==undefined)?true:flag;

	if($("table[name="+tableid+"]").find("input:checkbox").length > 0){
		$("table[name="+tableid+"]").find("input:checkbox").each(function(){

			targetDiv=$(this).parent().attr("class");
			//체크박스 인덱스
			var index = $(this).index("."+targetDiv+" input");
			$(this).attr("id",tableid+index);
			$(this).attr("name",tableid);
			$(this).next().attr("for",tableid+index);
			$(this).attr("index",index);

			if(flag){
				$(this).on("click",function(e){
					$("table[name="+tableid+"]").find("input:checkbox").removeAttr("checked");
					$(this).attr("checked","checked");
				});
			}
		});

		//체크박스 영역 클릭시 상위객체로 이벤트를 전달하지 않게 합니다.
		$("."+targetDiv).on("click",function(e){
			e.stopPropagation();
		});
	}
}

//td태그 밑에 에 on 주어서 열렸다 닫혔다 하는경우 사용 td에 onclick="listOnOff($(this))" 추가
//하나만 열리도록 수정
function listOnOff(obj){
	//대상인덱스
	var objIndex = obj.parent().attr("data-rownum");
	//대상객체 상위상위 테이블 객체
	var objTable = obj.parent().parent();
	//대상 테이블 td 갯수
	var tdLength = objTable.find("tr").length;

	for(var i=0;i<tdLength;i++){
		if(parseInt(objIndex) != i){
			objTable.find("tr td:eq("+i+")").children().removeClass("on");
		}
	}

	if(obj.children(":eq(0)").hasClass("on")){
		obj.children().removeClass("on");
	}else{
		obj.children().addClass("on");
	}
}

//버튼 태그에 on/off기능 있는 경우 사용 버튼에 onclick="btnListOnOff($(this),'targetId')" 추가
function btnListOnOff(obj,targetId){
	if(obj.hasClass("on")){
		obj.removeClass("on");
		$("#"+targetId).hide();
	}else{
		obj.addClass("on");
		$("#"+targetId).show();
	}
}

//거래기준일시 달기
function setTransDate(id){
	$('#'+id).text(g_getDate('yyyy-mm-dd / HH:mi:ss'));
}

//기존 단건배열-테이블 형태로 뿌리던것을 일반 오브젝트로 셋팅할수 있게 파싱해서 리턴합니다.
//기존 asis에서 단건을 테이블로 뿌리는 경우를 tobe div안에 셋팅할때 쓰세요.
function arrayToObj(arr){
	var data={};
	for(var key in arr[0]){
		data[key]=arr[0][key];
	}
	return data;
}

//해당 스텝에서 해당 배열에 있는 키를 이용해 한번에 list를 만들어서 리턴합니다.
//targetStep = "#step13" 처럼 주어야함
function makeArraytoStep(targetStep,keyArray){
	if(targetStep==undefined || keyArray==undefined){
		console.log("필요변수 부족");
		return false;
	}
	var list = {};
	for(var i=0;i<keyArray.length;i++){
		$obj = $(targetStep).find("#"+keyArray[i]);

		if($obj.prop("tagName") =="SELECT" || $obj.prop("tagName") == "INPUT"){
			list[keyArray[i]] = $obj.val();
		}else{
			list[keyArray[i]] = $obj.text();
		}
	}

	return list;
}

//오늘로부터 다음 이체 가능일자 얻기
function getNextBusinessDay(){
	return comCsbUtil.getNextBusinessDay(1)["resultDat"];
}

//오늘로부터 N 일 지난날 구하기
function getNextDay(day){
	var day = parseInt(g_getDate("dd"))+parseInt(day);
	var nextNday = g_getDate("yyyy")+g_getDate("mm")+((day<10)?"0"+day:day);
	return nextNday;
}

//두 날짜 비교 - 벨리데이션데이트보다 타켓데이트가 이전이면 false 반환
function compareDate(targetDate,valiDate){
	var tarYYYY = targetDate.substring(0,4);
	var tarMM = parseInt(targetDate.substring(4,6)) - 1;
	var tarDD = targetDate.substring(6,8);

	var valYYYY = valiDate.substring(0,4);
	var valMM = parseInt(valiDate.substring(4,6)) - 1;
	var valDD = valiDate.substring(6,8);

	return new Date(tarYYYY,tarMM,tarDD).getTime() >= new Date(valYYYY,valMM,valDD).getTime();

}

/**
 * 앱 메인으로 이동
 */
function goAppHome() {
	$.nativeCall('exit', ["moveHome"]).done(function (dat){});
}

function comUtil_getBasicInfo (params, callback){
	try {
		var ajax = jex.createAjaxUtil("com_utl_010101_1");
		ajax.setAsync(false);
		ajax.set("task_package"   , "com");            //[필수]업무 package
		ajax.set("task_subpackage", "utl");
		ajax.set("need_item"      , params.need_item); //cus_info, pay_acnt_list, bank_list
		ajax.set("inq_acnt_gm"    , params.inq_acnt_gm);   //조회가능계좌 필터링구분값(ex. "93,96,97")
		ajax.set("inq_inout_gb"   , params.inq_inout_gb);  //조회가능계좌 IN-OUT 구분코드(in : 포함된계좌, out ; 포함되지않은계좌)
		ajax.set("pay_acnt_gm"    , params.pay_acnt_gm);   //출금가능계좌 필터링구분값(ex. "93,96,97")
		ajax.set("pay_inout_gb"   , params.pay_inout_gb);  //출금가능계좌 IN-OUT 구분코드(in : 포함된계좌, out ; 포함되지않은계좌)
		ajax.set("acnt_athr_dcd"  , params.acnt_athr_dcd); //계좌권한(1:출금권한, 2:조회권한)
		ajax.set("acnt_dsnc"      , params.acnt_athr_dcd); //계좌구분(1:일반계좌, 2:증권계좌, 3:외화계좌, 4:대출계좌, 5:카드)
		ajax.set("acnt_gm"        , params.acnt_gm);       //전체계좌 필터링구분값(ex, "01,02,03")
		ajax.set("inout_gb"       , params.inout_gb);      //전체계좌 IN-OUT 구분코드(in : 포함된계좌, out ; 포함되지않은계좌)
		ajax.set("my_acnt_gm"     , params.my_acnt_gm);    //내계좌 필터링구분값(ex, "01,02,03")
		ajax.set("my_inout_gb"    , params.my_inout_gb);   //내계좌 IN-OUT 구분코드(in : 포함된계좌, out ; 포함되지않은계좌)
		ajax.execute(function(dat) {
			callback.apply(dat["_tran_res_data"][0]);
		});
	} catch(e) {
		bizException(e, "comUtil_getBasicInfo");
	}
}

//상품 거래제어 체크
function comUtil_chkTrnCntl(strPdcd, callback){
	try {
		var ajax = jex.createAjaxUtil("com_utl_100101_1");
		ajax.setAsync(false);
		ajax.set("task_package"   , "com");            //[필수]업무 package
		ajax.set("task_subpackage", "utl");
		ajax.set("pdcd"      , strPdcd);
		ajax.execute(function(dat) {
			callback.apply(dat["_tran_res_data"][0]);
		});
	} catch(e) {
		bizException(e, "comUtil_chkTrnCntl");
	}
}

//step 이동처리 공통 각각 업무단 js에서 재정의해서 사용
var comUtil_stepHistory = [];

function uf_goStep(stepNo) {
	comUtil_stepHistory.push(stepNo); //uf_goStep으로 호출한 step번호를 쌓아둠
	
	jex.plugin.get("JEX_MOBILE_STEP").showStep(stepNo, "");
	
	if(stepNo == 30) {
		comLottieUtil.play("secret_lottie_30");
	}
	else if(stepNo == 33) {
		comLottieUtil.play("secret_lottie_33");
	}
}

function comUtil_back(stepNo) {
	comUtil_stepHistory.push(stepNo);

	jex.plugin.get("JEX_MOBILE_STEP").showStep(stepNo, "back");
}

function uf_back() {
	if(comUtil_stepHistory.length > 1) {
		prevStepNo = comUtil_stepHistory[comUtil_stepHistory.length - 2];
		comUtil_back(prevStepNo);
		comUtil_stepHistory = comUtil_stepHistory.slice(0, comUtil_stepHistory.length - 2);
	} else if(comUtil_stepHistory.length == 1) {
		uf_goStep(1);
		comUtil_stepHistory = [];
	} else if(comUtil_stepHistory.length == 0) {
		_webViewExit();
	}
}

/* uf_back이 가능한 상태인지 체크 */
function comUtil_isBack() {
	if(MobPopup.isOpenAlertPopup() || MobPopup.isOpenErrorPopup() || MobPopup.isOpenConfirmPopup() || comLayerPopUtil.isOpen(true)) {
		return false;
	} else {
		return true;
	}
}

/* 결재함에서 넘어온 data를 가져옴 */
function comUtil_getSnctData() {
	var snctData = {};	//결재함에서 넘어온 data
	if(comLoading_isQString()) {
		var qstringObj = jex.getQString();
		var fromPage = qstringObj.fromPage;
		if(fromPage == "SNCT" || fromPage == "SNCT_REG" || fromPage == "SNCT_END") {
			snctData["W_BSWR_DSNC_CD"        ] = qstringObj["W_BSWR_DSNC_CD"        ]; //업무구분코드(결재함 pk)
			snctData["W_RYMD"                ] = qstringObj["W_RYMD"                ]; //결재실행내역 등록년월일(결재함 pk)
			snctData["W_RGSN_HMS"            ] = qstringObj["W_RGSN_HMS"            ]; //결재실행내역 등록시분초(결재함 pk)
			snctData["TRN_SCD"               ] = qstringObj["TRN_SCD"               ]; //거래상태코드(1:결재대기(등록), 2:결재대기(진행), 3:실행대기(등록), 4:실행대기(진행))
			snctData["SNCT_ATHR_DCD"         ] = qstringObj["SNCT_ATHR_DCD"         ]; //결재실행구분코드(01:결재대기, 02:실행대기)
			snctData["EBNK_SNCT_EXCN_SRN"    ] = qstringObj["EBNK_SNCT_EXCN_SRN"    ]; //결재일련번호
			snctData["fromPage"              ] = qstringObj["fromPage"              ]; //결재화면구분(SNCT:결재/실행, SNCT_INQ:결재/실행 결과조회)
			snctData["SNCT_EFNC_MNGM_USER_ID"] = qstringObj["SNCT_EFNC_MNGM_USER_ID"]; //관계사관리자아이디
			snctData["SNCT_RLCM_DCD"         ] = qstringObj["SNCT_RLCM_DCD"         ]; //관계사구분코드
		}
	}
	return snctData;
}

/**
 * 원하는 버튼에 결재/실행 완료조회, 결재/실행 등록조회 메뉴이동 이벤트를 연결함
 * @param btn_id    : 이벤트를 연결할 버튼아이디
 * @param go_page   : 등록목록, 완료목록 구분값(SNCT_REG:등록, SNCT_END:완료)
 * @param exit_flag : _webViewExit 호출옵션(close:웹뷰를닫음, refresh:웹류를닫고갱신)
 */
function comUtil_setLinkSnctList(btn_id, go_page, exit_flag) {
	$("#" + btn_id).on("click", function() { comUtil_goMenuSnctList(go_page, exit_flag); });
}

/**
 * 결재/실행 완료조회, 결재/실행 등록조회 메뉴이동
 * @param go_page : 등록목록, 완료목록 구분값(SNCT_REG:등록, SNCT_END:완료)
 * @param exit_flag : _webViewExit 호출옵션(close:웹뷰를닫음, refresh:웹류를닫고갱신)
 */
function comUtil_goMenuSnctList(go_page, exit_flag) {
	if(_isRealApp) {
		if(exit_flag == "close") { //웹뷰닫기
			_webViewExit();
		} else if(exit_flag == "refresh") { //웹뷰닫고 갱신
			_webViewExit("refresh");
		} else { //메뉴이동
			var menu_id = "";
			if(go_page == "SNCT_REG") { //결재/실행 등록조회
				menu_id = "fnt_snt_030101_1";
			} else if(go_page == "SNCT_END") { //결재/실행 완료조회
				menu_id = "fnt_snt_020101_1";
			} else {
				menu_id = "fnt_snt_010101_1";
			}
			
			comWebkey_goMenu("5009", menu_id);
		}
	}
	else {
		var menu_id = "";
		if(go_page == "SNCT_REG") { //결재/실행 등록조회
			menu_id = "fnt_snt_030101_1";
		} else if(go_page == "SNCT_END") { //결재/실행 완료조회
			menu_id = "fnt_snt_020101_1";
		} else {
			menu_id = "fnt_snt_010101_1";
		}
		
		comWebkey_goMenu("5009", menu_id);
	}
}

/**
 * 출금가능액조회(result_id가 존재하면 해당영역을 그려주고 아니면 응답값을 json으로 리턴)
 * @param drot_acn  : 출금계좌번호
 * @param result_id : 출금가능액을 표시할영역의 ID
 */
function comUtil_getPymtAblAmt(drot_acn, result_id) {
	var ajax = jex.createAjaxUtil("com_utl_020101_1");	// 서비스아이디

	ajax.errorTrx = false;
	ajax.set("task_package",    "com");    //업무패키지코드
	ajax.set("task_subpackage", "utl");    //업무서브패키지코드
	ajax.set("DROT_ACN",        drot_acn); //출금계좌번호

	try {
		ajax.execute(function(dat) {
			var output_data = dat["_tran_res_data"][0];

			if(isEmpty(result_id)) {	//출력영역이 없을경우 결과 리턴
				return output_data;
			} else {
				if(output_data["_is_error"] == "true") {
					$("#" + result_id).text("출금가능액 조회오류");
				} else {
					var result_html = '';
					result_html += '출금가능금액  ';
					result_html += '<span class="color ty3">';
					result_html += '<span class="money">';
					result_html += formatter.number(output_data["PYMT_ABL_AMT"]);
					result_html += '</span>';
					result_html += '<span class="txt_unit">원</span>';
					result_html += '</span>';

					$("#" + result_id).html(result_html); //출금가능금액
				}
			}
		});
	}
	catch(e) {
		if(isEmpty(result_id)) {	//출력영역이 없을경우 결과 리턴
			return {};
		} else {
			$("#" + result_id).text("출금가능액 조회오류");
		}
	}
}

/**
 * 2018.08.31 개인정보처리검출조치
 *   [access_yyyymmdd로그] get방식 :: param(계좌번호'등) 조치(암호화)
 *     comUtil_base64._keyStr
 *     comUtil_base64.encode (uft8)
 *     comUtil_base64.decode (uft8)
 */
var comUtil_base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	, encode : function(input){
		var output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
		
		// get keyCode
		function _keyStrCharAt() {
			var ar = arguments, i, ov='';
			for (i = 0; i < ar.length; i++) {
				ov += comUtil_base64._keyStr.charAt(ar[i]);
			}
			return ov;
		}
		
		// get utf8
		function _utf8_encode(string) {
			string = string.replace(/\r\n/g,'\n');
			var utftext = '', c;
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192, (c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
				}
			}
			return utftext;
		}
		
		// main
		input = _utf8_encode(input);
		
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			
			output +=_keyStrCharAt(enc1, enc2, enc3, enc4);
		}
		
		return output;
	}
	, decode : function(input){
		// for optimzing
		function _keyStrindexOfinputcharAt(p) { return comUtil_base64._keyStr.indexOf(input.charAt(p)); }
		
		// put utf8
		function _utf8_decode (utftext) {
			var string = '', i = 0, c, c2, c3;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
		
		// main
		var output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		
		while (i < input.length) {
			enc1 = _keyStrindexOfinputcharAt(i++);
			enc2 = _keyStrindexOfinputcharAt(i++);
			enc3 = _keyStrindexOfinputcharAt(i++);
			enc4 = _keyStrindexOfinputcharAt(i++);
			
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			
			output += String.fromCharCode(chr1);
			
			if (enc3 != 64) output += String.fromCharCode(chr2);
			if (enc4 != 64) output += String.fromCharCode(chr3);
		}
		output = _utf8_decode(output);
		
		return output;
	}
};

/**
 * reload
 */
function uf_reLoad() {
	location.reload(true);
}


//오픈뱅킹고도화
var ajaxComVar = {
	isCallExitErrorPop : false
};
var ajaxComUtil = function(svc) {
	this.svcId = (svc != undefined) ? svc : "";
	this.async = true;
	this.error = false;
	this.cache = false;
	this.loading = true;
	this.input = {};
	this.fn = {};
	this.header = {
		"charset" : "utf-8"
	};
	this.errFn = function(xhr, textStatus, errorThrown) {
		console.log("오류 발생!!!")
		return false;
	};
	// ajax 응답 성공 후 처리 함수
	this.executeFn = function(msg, _ajaxUthis, jm) {
		try {
			if(ajaxComVar.isCallExitErrorPop) {
				return false;
			}

			var input = msg;
			input = unescape(msg);
			if (typeof (msg) == "string") {
				try{
					input = JSON.parse(input); // input = JSON.parse(msg);
				}catch(e){
					input = JSON.parse(msg);
				}
			} else {
				input = msg;
			}

			var errorCode = input["_tran_res_data"][0]["_error_cd"];
			errorCode = $.trim(errorCode);
			var errorMsg = input["_tran_res_data"][0]["_error_msg"];

			if($.trim(errorCode)=="9999" || $.trim(errorCode)=="100" || $.trim(errorCode)=="CI1001") { // 세션 타임아웃
				ajaxComVar.isCallExitErrorPop = true;
				MobPopup.showAlertPopup(errorMsg, "", function() {
					_webViewExit('sessionOut');
				});
				return false;
			}
			else if($.trim(errorCode)=="9993") {
				ajaxComVar.isCallExitErrorPop = true;
				MobPopup.showAlertPopup(errorMsg, "", function() {
					_webViewExit('sessionOut');
				});
				return false;
			}
			else if($.trim(errorCode)=="702"){	//중복로그인
				ajaxComVar.isCallExitErrorPop = true;
				MobPopup.showAlertPopup(errorMsg, "", function() {
					_webViewExit('sessionOut');
				});
				return false;
			}
			else if($.trim(errorCode)=="9991"){	//일자전환
				ajaxComVar.isCallExitErrorPop = true;
				MobPopup.showAlertPopup(errorMsg, "", function() {
					_webViewExit('sessionOut');
				});
				return false;
			}

			if(typeof(_ajaxUthis.fn) == "function") {
				_ajaxUthis.fn(input);
			} else {
				return input;
			}
		} catch (e) {
			bizException(e, "ajaxComUtil.executeFn");
		} finally {

		};
	};
};
ajaxComUtil.prototype.set = function(key, value) {
	this.input[key] = value;
};
ajaxComUtil.prototype.setAsync = function(value) {
	this.async = value;
};
ajaxComUtil.prototype.setLoading = function(value) {
	this.loading = value;
};
ajaxComUtil.prototype.execute = function(fn) {
	var _ajaxUthis = this;

	if (typeof (fn) == "function"){
		_ajaxUthis.fn = fn;
	}
	var rslt = {
		_tran_res_data : [{}]
	};

	if(ajaxComVar.isCallExitErrorPop) {
		rslt["_tran_res_data"][0]["_is_error"] = "true";
		if(typeof(_ajaxUthis.fn) == "function") {
			_ajaxUthis.fn(rslt);
		} else {
			return rslt;
		}
	}

	var JSONData = {
		"_tran_cd" : _ajaxUthis.svcId,
		"_tran_req_data" : [ _ajaxUthis.input ]
	};
	var tranData = "JSONData=" + escape(encodeURIComponent(JSON.stringify(JSONData)));
	
	if(isEmpty(_ajaxUthis.input['referer_url'])==false){
		var loc_path =  _ajaxUthis.input['referer_url'];
	}else{
		var loc_path = $(location).attr("pathname");
		loc_path = loc_path.substring(loc_path.indexOf("/jsp"));
	}
	
	var stepNo = 0;
	if(!isEmpty(jex.plugin.get("JEX_MOBILE_STEP"))) {
		stepNo = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
	}
	if(comLoading_isQString()) {
		var qstringObj = jex.getQString();
		_ajaxUthis.header['from_page'] = qstringObj.fromPage;
	}
	
	_ajaxUthis.header['referer_url'] = loc_path;
	_ajaxUthis.header['step_no'    ] = stepNo;

	$.ajax({
		type : "POST",
		url : _HOST_NAME+"/jsp/gateway/gateway.jsp",
		crossDomain : true,
		data  :  tranData,
		cache : _ajaxUthis.cache,
		async : _ajaxUthis.async,
		error : function(xhr, textStatus, errorThrown) {
			_ajaxUthis.errFn();
		},
		headers : _ajaxUthis.header,
		beforeSend : function(request){
			console.log("요청시간=["+_ajaxUthis.time()+"]");
			if(_ajaxUthis.loading) {
			}
		},
		success : function(msg) {
			console.log("ajax Success \n svc => " + _ajaxUthis.svcId + " \n data => " + JSON.stringify(JSONData) + "\n\n result => " +JSON.stringify(msg));
			console.log("응답시간=["+_ajaxUthis.time()+"]");

			rslt = _ajaxUthis.executeFn(msg, _ajaxUthis, this);
		},
		complete :function(response,status) {
			console.log("최종응답시간=["+_ajaxUthis.time()+"]");

			if(_ajaxUthis.loading) {
			}
			$.nativeCall('refreshSession');
		}
	});

	return rslt;
};

ajaxComUtil.prototype.time = function() {
	var _date = new Date();
	var d = _date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = _date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = _date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;

	var hh0 = _date.getHours();
	var hh = (hh0 < 10) ? '0' + hh0 : hh0;
	var mi0 = _date.getMinutes();
	var mi = (mi0 < 10) ? '0' + mi0 : mi0;
	var ss0 = _date.getSeconds();
	var ss = (ss0 < 10) ? '0' + ss0 : ss0;

	var ms0 = _date.getMilliseconds();
	var ms = (ms0 < 10) ? '000' + ms0 : (ms0 < 100) ? '00' + ms0 : (ms0 < 100) ? '0' + ms0 : ms0;

	return year + "" + month + "" + day + "" + hh + "" + mi + "" + ss + "" + ms;
};


/**
 * @description : 전각 -> 반각 변환 처리함수
 * 종류 : 알파벳(소문자, 대문자), 숫자, 소괄호, 공백(‘ ’), 하이픈(-)
 */
function convert2ByteChar2(x_char) {
	var x_2bytechar = new String;
	var len = x_char.length;

	for (var i=0; i<len; i++) {
		var c = x_char.charCodeAt(i);
				
		/**
		 *   65281:: [！], 65282:: [＂], 65283:: [＃], 65284:: [＄], 65285:: [％], 65286:: [＆], 65287:: [＇],
		 *   65288:: [（], 65289:: [）], 65290:: [＊], 65291:: [＋], 65292:: [，], 65293:: [－], 65294:: [．], 65295:: [／],
		 *   65296:: [０], 65297:: [１], 65298:: [２], 65299:: [３], 65300:: [４], 65301:: [５],
		 *   65302:: [６], 65303:: [７], 65304:: [８], 65305:: [９],
		 *   65306:: [：], 65307:: [；], 65308:: [＜], 65309:: [＝], 65310:: [＞], 65311:: [？], 65312:: [＠],
		 *   65313:: [Ａ], 65314:: [Ｂ], 65315:: [Ｃ], 65316:: [Ｄ], 65317:: [Ｅ], 65318:: [Ｆ], 65319:: [Ｇ], 65320:: [Ｈ],
		 *   65321:: [Ｉ], 65322:: [Ｊ], 65323:: [Ｋ], 65324:: [Ｌ], 65325:: [Ｍ], 65326:: [Ｎ], 65327:: [Ｏ], 65328:: [Ｐ],
		 *   65329:: [Ｑ], 65330:: [Ｒ], 65331:: [Ｓ], 65332:: [Ｔ], 65333:: [Ｕ], 65334:: [Ｖ], 65335:: [Ｗ], 65336:: [Ｘ],
		 *   65337:: [Ｙ], 65338:: [Ｚ],
		 *   65339:: [［], 65340:: [＼], 65341:: [］], 65342:: [＾], 65343:: [＿], 65344:: [｀],
		 *   65345:: [ａ], 65346:: [ｂ], 65347:: [ｃ], 65348:: [ｄ], 65349:: [ｅ], 65350:: [ｆ], 65351:: [ｇ], 65352:: [ｈ],
		 *   65353:: [ｉ], 65354:: [ｊ], 65355:: [ｋ], 65356:: [ｌ], 65357:: [ｍ], 65358:: [ｎ], 65359:: [ｏ], 65360:: [ｐ],
		 *   65361:: [ｑ], 65362:: [ｒ], 65363:: [ｓ], 65364:: [ｔ], 65365:: [ｕ], 65366:: [ｖ], 65367:: [ｗ], 65368:: [ｘ],
		 *   65369:: [ｙ], 65370:: [ｚ], 65371:: [｛], 65372:: [｜], 65373:: [｝], 65374:: [～],
		 *
		 *   8217:: [’], 8221:: [”], 12288:: [　], 65507:: [￣], 65509:: [￥]
		 */

		if ((c >= 65296 && c <= 65305) || (c >= 65313 && c <= 65338) || (c >= 65345 && c <= 65370)) {
			// 알파벳(소문자, 대문자), 숫자
			x_2bytechar += String.fromCharCode(c - 65248);
			
		} else if (c == 65288) { // 소괄호 '('
			x_2bytechar += String.fromCharCode(40);
			
		} else if (c == 65289) { // 소괄호 ')'
			x_2bytechar += String.fromCharCode(41); 
			
		} else if (c == 12288) { // 공백(‘ ’)
			x_2bytechar += String.fromCharCode(32); 
			
		} else if (c == 65293) { // 하이픈(-)
			x_2bytechar += String.fromCharCode(45);
			
		} else {
			x_2bytechar += x_char.charAt(i);
		}
	}
	
	return x_2bytechar;
}

var comLottieUtil = {
	play : function(id) {
		var $lottie = $("#" + id);
		if($lottie.length > 0) {
			$lottie[0].stop();
			$lottie[0].play();
		}
	}
}

/* 레이어팝업 공통 유틸 */
var comLayerPopUtil = {
	checkId   : "",
	scrollPos : 0,
	$rtnFocus : {},
	$popFocus : null, //레이어팝업 오픈 후 포커스를 받을 사용자 지정 객체
	open : function(layerId) {
		var $layerPop = $("#" + layerId);
		
		if($layerPop.length == 1 && this.checkId != layerId) {
			this.checkId = layerId;
			
			comLayerPopUtil.scrollPos = $(window).scrollTop();
			$("html").addClass("scroll_lock");
			$("body").css("top", "-" + comLayerPopUtil.scrollPos + "px");
			
			this.$rtnFocus = $("*:focus");
			
			$(".content_wrap").attr("aria-hidden", "true");
			
			$layerPop.attr("aria-hidden", "false").addClass("active");
			
			var $focusTg = null;
			
			if(this.$popFocus != null) { //사용자가 지정한 포커스를 받을 객체가 있을경우
				$focusTg = this.$popFocus;
			}
			else { //사용자가 지정한 포커스를 받을 객체가 없을경우
				if($layerPop.find(".bottom_popup_header .tit:visible").length > 0) {
					$focusTg = $layerPop.find(".bottom_popup_header .tit");
				}
				else if($layerPop.find(".bottom_popup").length > 0) {
					$focusTg = $layerPop.find(".bottom_popup");
				}
				else if($layerPop.find(".layer_popup_header .tit:visible").length > 0) {
					$focusTg = $layerPop.find(".layer_popup_header .tit");
				}
				else if($layerPop.find(".layer_popup").length > 0) {
					$focusTg = $layerPop.find(".layer_popup");
				}
			}
			
			if($focusTg != null) {
				var phoneType = _getPhoneType();
				
				if(phoneType == "A") { //안드로이드
					setTimeout(function() {
						$focusTg.attr("tabindex", "0").focus();
					}, 500);
				}
				else if(phoneType == "I") { //아이폰
					setTimeout(function() {
						$focusTg.attr("tabindex", "0").focus();
					}, 300);
				}
			}
		}
	},
	close : function(layerId, cbClose) {
		this.checkId = "";
		
		var $layerPop = $("#" + layerId);
		
		if($layerPop.length == 1) {
			$layerPop.attr("aria-hidden", "true").removeClass("active");
			
			$(".content_wrap").attr("aria-hidden", "false");
			
			var $focusTg = null;
			
			if(this.$popFocus != null) { //사용자가 지정한 포커스를 받을 객체가 있을경우
				$focusTg = this.$popFocus;
			}
			else { //사용자가 지정한 포커스를 받을 객체가 없을경우
				if($layerPop.find(".bottom_popup_header .tit").length > 0) {
					$focusTg = $layerPop.find(".bottom_popup_header .tit");
				}
				else if($layerPop.find(".bottom_popup").length > 0) {
					$focusTg = $layerPop.find(".bottom_popup");
				}
			}
			
			if($focusTg != null) {
				$focusTg.removeAttr("tabindex");
			}
			
			$("html").removeClass("scroll_lock");
			$("body").css("top", "0px");
			$(window).scrollTop(comLayerPopUtil.scrollPos);
			
			this.$popFocus = null;
			
			if(!isEmpty(cbClose) && ("function" == typeof(cbClose))) { //콜백함수가 있을경우
				setTimeout(function() {
					cbClose.apply();
				}, 500);
			}
			else {
				setTimeout(function() {
					if(this.$rtnFocus != undefined && typeof this.$rtnFocus.focus == "function") {
						this.$rtnFocus.focus();
						this.$rtnFocus = {};
					}
					else {
						var phoneType = _getPhoneType();
						
						if(phoneType == "I") { //아이폰
							$("body").attr("tabindex", "-1").focus().removeAttr("tabindex");
						}
					}
				}, 300);
			}
		}
	},
	closeAll : function(cbClose) {
		this.checkId = "";
		
		$(".bottom_popup_wrap").each(function(idx, obj) {
			$(obj).attr("aria-hidden", "true").removeClass("active");
		});
		
		$(".layer_popup_wrap").each(function(idx, obj) {
			$(obj).attr("aria-hidden", "true").removeClass("active");
		});
		
		$(".content_wrap").attr("aria-hidden", "false");
		
		$("html").removeClass("scroll_lock");
		$("body").css("top", "0px");
		$(window).scrollTop(comLayerPopUtil.scrollPos);
		
		if(!isEmpty(cbClose) && ("function" == typeof(cbClose))) { //콜백함수가 있을경우
			setTimeout(function() {
				cbClose.apply();
			}, 200);
		}
	},
	isOpen : function(isClose) {
		if($(".bottom_popup_wrap.active").length > 0) {
			if(isClose) this.closeAll();
			return true;
		}
		
		if($(".layer_popup_wrap.active").length > 0) {
			if(isClose) this.closeAll();
			return true;
		}
		
		return false;
	}
}

/* 거래제어 알림팝업 공통 유틸 */
var comTrnCntlPopUtil = {
	id : "",
	data : {
		res : false,
		tit : "",
		con : "",
		url : "",
		ppup : "",
		no : ""
	},
	check : function(){
		if(this.data && this.data.res == true){
			comTrnCntlPopUtil.open();
		}
	},
	open : function() {
		this.id = "com_trnCntl_pop_" + this.data.no;
		var html = '';
		
		if(this.data.url != ""){
			$.get('../../../'+this.data.url).done(function(dat){
				html += '<div class="full_popup_wrap active" id="comErrorPopup" style="z-index:1500;">';
				html += '	<div class="content_wrap ty4">';
				html +=         dat
				html += '		<div class="bottom_btn_area ty3">';
				html += '			<div class="bottom_btn_area_box">';
				html += '				<div class="btn_area ty1">';
				html += '					<button type="button" class="btn s_5 c_3 r_2" onclick="comTrnCntlPopUtil.hide();">확인</button>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				
				$("#comErrorPopup").remove();
				$(".wrap").prepend(html);
			});
		}else{
			// 팝업유형 1:바텀시트, 2:레이어, 3:풀팝업
			if(this.data.ppup == "3"){
				html += '<div class="full_popup_wrap active" id="comErrorPopup" style="z-index:1500;">';
				html += '	<div class="content_wrap ty4">';
				html += '		<div class="group">';
				html += '			<div class="layout_error">';
				html += '				<div class="ico_txt ty1 fail">';
				html +=                     this.data.tit;
				html += '					<div class="note_cmt" id="comErrorMsg">';
				html += 						this.data.con;
				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '		<div class="bottom_btn_area ty3">';
				html += '			<div class="bottom_btn_area_box">';
				html += '				<div class="btn_area ty1">';
				html += '					<button type="button" class="btn s_5 c_3 r_2" onclick="comTrnCntlPopUtil.hide();">확인</button>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				
				$("#comErrorPopup").remove();
				$(".wrap").prepend(html);
			}else{
				var ppupType = this.data.ppup == "1" ? "bottom" : "layer";
				
				html += '<div class="'+ppupType+'_popup_wrap" id="'+this.id+'" data-log-desc="'+this.data.tit+' 알림 팝업">';
				html += '<div class="'+ppupType+'_popup">';
				html += '	<div class="'+ppupType+'_popup_header">';
				html += '		<h2 class="tit">'+this.data.tit+'</h2>';
				html += '	</div>';
				html += '	<div class="'+ppupType+'_popup_body">';
				html += 		this.data.con;
				html += '	</div>';
				html += '	<div class="'+ppupType+'_popup_footer">';
				html += '		<button type="button" class="btn s_4 c_3 r_2" onclick="comTrnCntlPopUtil.close();">확인</button>';
				html += '	</div>';
				html += '</div>';
				html += '</div>';

				$(".container_wrap").append(html);
				comLayerPopUtil.open(this.id); //팝업 열기
			}
		}
	},
	close : function() {
		comLayerPopUtil.close(this.id, function(){
			$("#"+this.id).remove();
		});
	},
	hide : function() {
		$("#comErrorPopup").removeClass("active");
		var stepNo = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		jex.plugin.get("JEX_MOBILE_STEP").setPrevStepNo(stepNo);
		jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
	}
}

/* 선택팝업 공통 유틸 */
var comSelectPopUtil = {
	id : "",
	setterObj : null,
	setterData : {},
	options : {
		selectType : "A",                 //팝업유형(A:기본)
		title : "",                       //팝업제목
		optionNameKey : "",               //옵션명으로 설정 할 데이터키
		optionValueKey : "",              //옵션값으로 설정 할 데이터키
		defaultOptionValue : "",          //기본 선택 옵션값
		selectedOptionNameTargetId : "",  //선택한 결과의 옵션명을 적용할 Target Element ID
		selectedOptionValueTargetId : "", //선택한 결과의 옵션값을 적용할 Target Element ID
		callbackCancel : "",              //취소 후 호출할 콜백함수
		callbackConfirm : ""              //선택 후 호출할 콜백함수
	},
	/* 초기화 */
	init : function() {
		this.id = "";
		this.setterObj = null;
		this.setterData = {};
		this.options = {};
	},
	/* 선택팝업 열기 */
	open : function(data, options) {
		this.init();
		this.options = options;
		
		if(isEmpty(this.options.selectType)) {
			this.options.selectType = "A";
		}
		
		this.drawUI(data, options);    //UI 생성
		this.setDefaultData(options);  //기본값 설정
		
		comLayerPopUtil.open(this.id); //레이어팝업 열기
		
		this.scrollMoveToFocus();      //선택한 항목으로 포커스 이동
	},
	/* 선택한 항목으로 포커스 이동 */
	scrollMoveToFocus : function() {
		if(!isEmpty(this.setterObj)) {
			var $tg = this.setterObj.find("span");
			
			if($tg.length > 0) {
				$tg.get(0).scrollIntoView(); //선택된 값으로 포커스 이동
			}
		}
	},
	/* UI 생성 */
	drawUI : function(data, options) {
		this.id = "com_select_pop_" + options.selectType;
		
		var html = '';
		html += '<div class="bottom_popup_wrap" id="' + this.id + '" data-log-desc="' + this.options.title + ' 선택 팝업">';
		html += '	<div class="bottom_popup">';
		html += '		<div class="bottom_popup_header">';
		html += '			<h2 class="tit">' + this.options.title + '</h2>';
		html += '			<button type="button" class="btn_close" onclick="comSelectPopUtil.cancel();">닫기</button>';
		html += '		</div>';
		html += '		<div class="bottom_popup_body">';
		html += '			<div class="sel_slide">';
		html += '				<ul class="select_list ty1" id="ul_' + this.id + '" data-jx-list="ul_' + this.id + '" role="listbox">';
		html += '					<li role="option" aria-selected="false" tabindex="-1"';
		html += '						data-jx-execute="click"';
		html += '						data-jx-setter=""';
		html += '						data-jx-setter-handler="comSelectPopUtil.selectData()"';
		html += '						data-jx-setter-source="this">';
		html += '						<span id="' + this.options.optionNameKey + '"></span>';
		html += '					</li>';
		html += '				</ul>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
		if($("#ul_" + this.id).length == 0) {
			$(".container_wrap").append(html);
			
			jex.setJexObj($("#ul_" + this.id));
		}
		
		var ulComSelectPop = jex.getJexObj($("#ul_" + this.id), "JEX_MOBILE_LIST");
		
		ulComSelectPop.setAll(data);
	},
	/* 선택됨 표시 */
	setActiveClass : function($tg) {
		$tg.attr("aria-selected", "true").addClass("active");
		$tg.siblings("li").attr("aria-selected", "false").removeClass("active");
	},
	/* 선택됨 표시 초기화 */
	initActiveClass : function($tg) {
		if(isEmpty($tg)) $tg = $("#" + this.id);
		
		$tg.find("li").attr("aria-selected", "false").removeClass("active");
	},
	/* 기본값 설정 */
	setDefaultData : function(options) {
		var valueTargetId = "";
		
		if(isEmpty(options.selectedOptionValueTargetId) == false) {
			valueTargetId = options.selectedOptionValueTargetId;
		}
		
		var defaultOptionValue = options.defaultOptionValue;
		
		if(!isEmpty(valueTargetId) && !isEmpty($(valueTargetId).getTagValue().trim())) {
			defaultOptionValue = $(valueTargetId).getTagValue().trim();
		}
		
		if(!isEmpty(defaultOptionValue)) {
			$("#ul_" + this.id + " li").each(function(idx) {
				var data = $(this).getAll();
				var optionValue = data[options.optionValueKey];
				
				if(defaultOptionValue == optionValue) {
					comSelectPopUtil.setActiveClass($(this));
					comSelectPopUtil.setterObj = $(this);
					comSelectPopUtil.setterData = data;
				}
			});
		}
	},
	/* 옵션 선택 */
	selectData : function($tg, data) {
		this.setterObj  = $tg;
		this.setterData = data;
		
		comLayerPopUtil.close(this.id); //팝업 닫기
		
		this.setTargetData(this.options.optionValueKey, this.options.selectedOptionValueTargetId, this.setterData); //선택한 옵션값을 타겟에 설정
		this.setTargetData(this.options.optionNameKey, this.options.selectedOptionNameTargetId, this.setterData);   //선택한 옵션명을 타겟에 설정
		
		if(isEmpty(this.options.callbackConfirm) == false) { //선택 후 호출할 콜백함수가 있을경우
			eval(this.options.callbackConfirm(this.setterObj, this.setterData));
		}
		
		return {};
	},
	/* 선택팝업 닫기 */
	cancel : function() {
		comLayerPopUtil.close(this.id); //팝업 닫기
		
		if(isEmpty(this.options.callbackCancel) == false) { //취소 후 호출할 콜백함수가 있을경우
			eval(this.options.callbackCancel()); //콜백함수 호출
		}
	},
	/* 선택항목 타켓에 설정 */
	setTargetData : function(dataKey, targetId, data) {
		if(!isEmpty(dataKey) && !isEmpty(targetId)) {
			$(targetId).setTagValue(data[dataKey]);
		}
	}
}

/* 풀팝업을 Step 이동으로 처리 */
var comStepPopUtil = {
	prevTitle : "", //이전 title
	prevStep  : "", //이전 스텝 번호
	/**
	 * 풀팝업 네비게이션 바 UI로 변경
	 * @param title       : 타이틀명 [필수]
	 * @param stepNo      : 이동할 스텝 번호 [필수]
	 * @param closeBtnFun : 닫기 버튼 클릭 시, 호출할 함수 [선택]
	 */
	open : function(title, stepNo, closeBtnFun) {
		this.prevStep = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		
		if(!_isRealApp) {
			uf_goStep(stepNo);
		}
		else {
			if(isEmpty(closeBtnFun)) closeBtnFun = "comStepPopUtil.close()";
			
			$.nativeCall("changeNavigationBarType", [{"type" : "popup", "title" : title, "closeBtnFun" : closeBtnFun}]).done(function(data) {
				comStepPopUtil.prevTitle = data.title; //현재 title을 저장
				
				uf_goStep(stepNo);
			});
		}
	},
	/**
	 * 일반 네비게이션 바 UI로 변경
	 * @param title    : 타이틀명 [선택]
	 * @param stepNo   : 이동할 스텝 번호 [선택]
	 * @param callback : 네이게이션 바 UI변경 후 호출할 함수 [선택]
	 */
	close : function(title, stepNo, callback) {
		if(isEmpty(title)) {
			title = this.prevTitle;
			this.prevTitle = "";
		}
		
		if(isEmpty(stepNo)) {
			stepNo = this.prevStep;
			this.prevStep = "";
		}
		
		if(!_isRealApp) {
			if(!isEmpty(callback) && typeof callback == "function") {
				callback.apply();
			}
			else {
				uf_goStep(stepNo);
			}
		}
		else {
			$.nativeCall("changeNavigationBarType", [{"type" : "sub", "title" : title}]).done(function(data) {
				if(!isEmpty(callback) && typeof callback == "function") {
					callback.apply();
				}
				else {
					uf_goStep(stepNo);
				}
			});
		}
	}
}

/**
 * 새로운 웹뷰로 띄우는 팝업
 * @param url 페이지 URL
 * @param title NavigationBar 제목
 * @param confirmCallback _callFullPopup.close()의 콜백함수
 * @param cancelCallback X버튼의 콜백함수
 * @param options
 *   - hideTopNavigationBar  ( Y:navigationbar 숨김, N:navigationbar 보임 )
 *   - transparentBackground ( Y:백그라운드 투명, N:백그라운드 불투명 )
 */
var _callFullPopup = {
	open : function(url, title, param, confirmCallback, cancelCallback, options) {
		var queryStr = this.buildQString(param);	// JSON Object -> Query String 변환
		var hideTopNavigationBar = "";
		var transparentBackground = "";
		if(!isEmpty(options)) {
			hideTopNavigationBar = isEmpty(options.hideTopNavigationBar)?"":options.hideTopNavigationBar;
			transparentBackground = isEmpty(options.transparentBackground)?"":options.transparentBackground;
		}
		var nativeParam = {
			"url" : url
			, "argParam" : queryStr
			, "title" : title
			, "hideTopNavigationBar" : hideTopNavigationBar
			, "transparentBackground" : transparentBackground
		};
		$.nativeCall('fullPopup', [JSON.stringify(nativeParam)]).done(function(dat){
			var cancelKey = dat.cancelKey == undefined? false:dat.cancelKey;

			if(cancelKey && cancelCallback != undefined) {
				eval(cancelCallback)({});
			} else if(!cancelKey && confirmCallback != undefined) {
				var receiveParam = dat.receiveParam == undefined?"":dat.receiveParam;
				eval(confirmCallback)(_callFullPopup.parseQString(receiveParam));
			}
		});
	},
	close : function(param) {
		var queryStr = this.buildQString(param);
		var nativeParam = {
			callbackParam : queryStr
		}
		$.nativeCall('fullPopupCallback', [JSON.stringify(nativeParam)]).done(function(dat){});
	},
	closePop : function(param) {
		$.nativeCall('fullPopupClose', []).done(function(dat){});
	},
	getQString : function(callback) {
		var resultObj = {};
		$.nativeCall('parentParam', []).done(function(dat){
			if( !isEmpty(dat)
					&& !isEmpty(dat.argParam) ) {
				resultObj = _callFullPopup.parseQString(dat.argParam);
			}
			eval(callback)(resultObj);
		});
	},
	// JSON Object -> Query String 변환
	buildQString : function(param) {
		var queryStr = "";
		if(!isEmpty(param)) {
			var i = 0;
			for(var key in param) {
				var paramKey = encodeURIComponent(encodeURIComponent(key));
				var paramValue = encodeURIComponent(encodeURIComponent(param[key]));
				if(i==0) {
					buildQueryStr = paramKey + "=" + paramValue;
				} else {
					buildQueryStr = "&" + paramKey + "=" + paramValue;
				}

				queryStr += buildQueryStr;
				i++
			}
		}

		return queryStr;
	},
	// Query String ->  JSON Object 변환
	parseQString : function(queryStr) {
		var jsonObj = {};
		if(!isEmpty(queryStr)) {
			var queryStrList = queryStr.split("&");
			for ( var i = 0; i < queryStrList.length; i++) {
				var query = queryStrList[i].split("=");
				jsonObj[decodeURIComponent(decodeURIComponent(query[0]))] = decodeURIComponent(decodeURIComponent(query[1]));
			}
		}
		return jsonObj;
	}
}

function getCertIssuerName(rdn) {
	
	var issuerName = "";
	
	if(rdn.indexOf("yessign") >= 0) {
		issuerName = "금결원";
	} else if(rdn.indexOf("tradesign") >= 0) {
		issuerName = "무역정보";
	} else if(rdn.indexOf("crosscert") >= 0) {
		issuerName = "전자인증";
	} else if(rdn.indexOf("signkorea") >= 0) {
		issuerName = "코스콤";
	} else if(rdn.indexOf("kica") >= 0) {
		issuerName = "정보인증";
	} 
	
	return issuerName;
	
}

var comKeypadUtil = {
	/**
	 * 금액입력 에디터
	 * @param title 타이틀
	 * @param target 금액설정 객체 또는 객체의 아이디
	 * @param btnList 버튼 리스트
	 * @param option 옵션
	 */
	callAmt : function(title, target, btnList, option) {
		var unitYn = "Y";
		var minAmt = "";
		var maxAmt = "";
		var addMsg = "";
		
		if(!isEmpty(option)) {
			if(option.isUnit == "N") {
				unitYn = "N";
			}
			
			if(!isEmpty(option.minAmt)) {
				minAmt = option.minAmt;
			}
			
			if(!isEmpty(option.maxAmt)) {
				maxAmt = option.maxAmt;
			}
			
			if(!isEmpty(option.addMsg)) {
				addMsg = option.addMsg;
			}
		}
		
		var param = {
			title      : title,
			_moneyList : btnList,
			isUnit     : unitYn,
			minAmt     : minAmt,
			maxAmt     : maxAmt,
			addMsg     : addMsg
		}
		
		if(_isRealApp) { //앱
			$.nativeCall("inputMoneyEditor", [JSON.stringify(param)]).done(function(resData) {
				comKeypadUtil.setAmt(target, option, resData);
			}).fail(function() {
				MobPopup.showAlertPopup("금액키패드 오류");
			});
		}
		else { //웹
			webDevUtil.callKeypadAmt(title, btnList, function(resData) {
				comKeypadUtil.setAmt(target, option, resData);
			});
		}
	},
	setAmt : function(target, option, resData) {
		var oriVal = resData["inputData"];
		var rtnVal = "";
		
		if(isEmpty(oriVal) == false) {
			if(isEmpty(option) == false && option.formatterYn == "N") {
				rtnVal = oriVal;
			}
			else {
				rtnVal = mobFormatter.decimal(oriVal);
			}
			
			if(isEmpty(option) == false && isEmpty(option.appendStr) == false) {
				rtnVal += option.appendStr;
			}
			
			if(isEmpty(target) == false) {
				if(typeof(target) == "string") {
					$("#" + target).setTagValue(rtnVal);
					$("#" + target).parent(".live_input").addClass("enter");
				}
				else if(typeof(target) == "object") {
					$(target).setTagValue(rtnVal);
					$(target).parent(".live_input").addClass("enter");
				}
			}
			
			if(isEmpty(option) == false) {
				var korVal = "";
				
				if(isEmpty(option.korTarget) == false) {
					korVal = comKeypadUtil.convertKorAmt(oriVal);
					
					if(typeof(option.korTarget) == "string") {
						$("#" + option.korTarget).setTagValue(korVal);
					}
					else if(typeof(option.korTarget) == "object") {
						$(option.korTarget).setTagValue(korVal);
					}
				}
				
				if(isEmpty(option.callbackConfirm) == false) {
					var cbData = {};
					
					cbData["rtnVal"] = rtnVal; //옵션들이 적용된 금액
					cbData["oriVal"] = oriVal; //옵션들이 적용안된 금액
					cbData["korVal"] = korVal; //한글로 변환된 금액
					
					eval(option.callbackConfirm)(cbData);
				}
			}
		}
	},
	convertKorAmt : function(val) {
		val = val.replace(/,/g, "");
		
		if(isEmpty(val)) return "";
		
		var korAmt  = "";
		var arrWon  = ["", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
		var pattern = /(-?[0-9]+)([0-9]{4})/;
		
		while(pattern.test(val)) {
			val = val.replace(pattern, "$1,$2");
		}
		
		var delimitCnt = val.split(",").length - 1;
		
		for(var i = 0; i < val.split(",").length; i++) {
			if(arrWon[delimitCnt] == undefined) {
				break;
			}
			strAmtData = val.split(",")[i];
			numData = Number(strAmtData);
			strNumData = parseInt(numData / 1000) > 0 ? parseInt(numData / 1000) + "," : "";
			strNumData += parseInt(numData / 1000) > 0 ? strAmtData.substring(1) : (numData % 1000);
			if(numData > 0) {
				korAmt += " " + strNumData + arrWon[delimitCnt];
			}
			delimitCnt--;
		}
		
		if("" != korAmt) korAmt += "원";
		
		return korAmt;
	}
}

/* 버튼 활성화 상태체크 공통 유틸 */
var comBtnStateUtil = {
	$target  : null, //검증영역 대상 객체
	$btn     : null, //활성화여부 버튼 객체
	userFunc : null, //사용자 체크 함수
	/**
	 * 버튼 활성화 상태체크 초기화
	 * 
	 * @param $target  검증영역 대상 객체
	 * @param $btn     활성화여부 버튼 객체
	 * @param userFunc 사용자 체크 함수(return true or false)
	 */
	init : function($target, $btn, userFunc) {
		var _this = this;
		
		_this.$target  = $target;
		_this.$btn     = $btn;
		_this.userFunc = userFunc;
		
		$btn.prop("disabled", true); //버튼 비활성화
		
		$target.find('[data-btn-chk="true"]').each(function(idx, obj) {
			var $chkObj = $(obj);
			
			if(_this.isShowElement($chkObj)) {
				var tagName = $chkObj.prop("tagName").toUpperCase();
				
				if(tagName == "INPUT") {
					var type = $chkObj.prop("type").toUpperCase();
					
					if(type == "CHECKBOX") {
						$chkObj.on("change", function() {
							_this.update();
						});
					}
					else {
						$chkObj.on("keyup", function() {
							_this.update();
						});
					}
				}
			}
		});
	},
	/**
	 * 버튼 활성화 상태 갱신 - 기본 이벤트(input keyup, checkbox change)가 아닌경우 직접 호출함
	 */
	update : function() {
		var _this  = this;
		var blnChk = true;
		
		_this.$target.find('[data-btn-chk="true"]').each(function(idx, obj) {
			var $chkObj = $(obj);
			
			if(_this.isShowElement($chkObj)) {
				var tagName = $chkObj.prop("tagName").toUpperCase();
				
				if(tagName == "INPUT") {
					var type = $chkObj.prop("type").toUpperCase();
					
					if(type == "CHECKBOX") {
						if($chkObj.is(":checked") == false) {
							blnChk = false;
							return false;
						}
					}
					else {
						if(isEmpty($chkObj.val())) {
							blnChk = false;
							return false;
						}
					}
				}
			}
		});
		
		var blnUserChk = true;
		
		if(typeof _this.userFunc == "function") {
			blnUserChk = _this.userFunc.apply();
		}
		
		if(blnChk && blnUserChk) {
			_this.$btn.prop("disabled", false);
		}
		else {
			_this.$btn.prop("disabled", true);
		}
	},
	isShowElement : function($elem) {
		var isShow = true;
		
		if($elem.is(":visible") == false) isShow = false;
		else if($elem.css("display") == "none") isShow = false;
		else if($elem.attr("disabled") == "disabled") isShow = false;
		else if($elem.attr("readonly") == "readonly") isShow = false;
		
		return isShow;
	}
}

/**
 * 
 * @param stepNo
 * @param divId
 * @param certType : 인증서 유형 P:개인용,C:사업자용, A:개인/사업자용
 * @param clickFncNm
 * @param taxCertYn : 세금계산서 인증서 포함 여부 Y/N
 * @param listType : 목록타입 1:로그인(default), 2:인증센터
 * @returns 
 */
function comUtil_showPuclibCertList(stepNo, divId, certType, clickFncNm, taxCertYn, listType) { 
	var formFilePath = "../../com/comCertUi.html";
	if(window.location.href.indexOf("guide") > -1){
		formFilePath = "../../../../html/phone/com/comCertUi.html";
	}
	$.get(formFilePath).done(function(dat){
		
		$certUi = $(dat);

		var certListDivNm = "public_certList_div";
		if(listType == "2"){
			certListDivNm = "public_certList_div2";
		}
		
		$("#step" + stepNo).find("#" + divId).html($certUi.find("#" + certListDivNm));
		
		if("C" == certType) {
			$("#step" + stepNo + " #cert_type_name").text("사업자용 공동인증서");
			$("#step" + stepNo + " #cert_reg_btn").show();
		} else if("P" == certType) {
			$("#step" + stepNo + " #cert_type_name").text("개인용 공동인증서");
			$("#step" + stepNo + " #cert_reg_btn").hide();
			
		} else {
			$("#step" + stepNo + " #cert_type_name").text("공동인증서");
		}
		
		//함수명 설정
		$("#step" + stepNo + " #cert_click_link").attr("data-jx-execute-target",clickFncNm);
		
		jex.setJexObj($("#step" + stepNo + " #" + certListDivNm));
		
		if(_isRealApp) {
			//인증서 목록 가져오고
			comWebkey_getDeviceLoginInfo(function() {
				_this.loginData = this;
				
				//인증서 목록을 그린다
				var cert_list = [];
				
				if(_this.loginData.cert_list != null && _this.loginData.cert_list != undefined) {
					_this.loginData.cert_list.forEach(function(element, index) {
						//세금계산서용 인증서 제거
						if($.trim(element["sm_cert_policy_id"]) == "1.2.410.200005.1.1.6.8" && "N" == taxCertYn) {
							return;
						}
						
						element["sm_cert_type"] = _oidInfo[element["sm_cert_policy_id"]]["용도"] + _oidInfo[element["sm_cert_policy_id"]]["타입"];
						element["sm_cert_o_name"] = _oidInfo[element["sm_cert_policy_id"]]["발급기관"];
						
						var certTypeName = comUtil_getCertType($.trim(element["sm_cert_policy_id"]));
						element["sm_cert_type"] = certTypeName;
						
						if("C" == certType) {
							if(certTypeName == "사업자용") {
								
								cert_list.push(element);
							}
							
						} else if("P" == certType) {
							if(certTypeName == "개인용") {
								
								cert_list.push(element);
							}
						} else if("A" == certType) {
							cert_list.push(element);
						}
						
						
					});
				}
				
				var jex_list = jex.getJexObj($("#step" + stepNo + " #com_pub_cert_list"), "JEX_MOBILE_LIST");
				jex_list.setAll(cert_list);
				
				if(cert_list.length == 0) {
					//인증서가 없음 화면이동
					if("C" == certType) {
						$("#step" + stepNo + " #public_no_cert_list").show();
						$("#step" + stepNo + " #com_pub_cert_list").hide();
					} else {
						$("#step" + stepNo + " #public_no_cert_list_pri").show();
						$("#step" + stepNo + " #com_pub_cert_list").hide();
					}
				} else {
					if("C" == certType) {
						$("#step" + stepNo + " #public_no_cert_list").hide();
						$("#step" + stepNo + " #com_pub_cert_list").show();
					} else {
						$("#step" + stepNo + " #public_no_cert_list_pri").hide();
						$("#step" + stepNo + " #com_pub_cert_list").show();
					}
					//jylee 작업할것
					comUtil_setCertStatusInfo(stepNo);
				}
			});
		} else {
			
			//var cert_list_temp = [];
			
			var cert_list_temp       =  [
				//기업용
				{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2024-06-25 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2025-06-24 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.5"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			//만료 당일
			,{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2024-06-25 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2024-10-11 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.5"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			//만료 30일 내
			,{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2024-06-25 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2024-10-25 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.5"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			//만료 상태는 1인데 날짜가 지만
			,{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2017-09-05 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200004.5.1.1.7"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장4()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			//만료 
			,{
				sm_cert_status            : 2                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2017-06-17 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200004.5.1.1.7"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장4()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			
			//개인용
			//만료 30일 내
			,{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2024-07-17 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.1"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장2()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}//내일 만료 됨
			,{
				sm_cert_status            : 1                        //인증서 상태 (1 : 정상
				, sm_cert_serial            : "415c72"                 //인증서 시리얼 번호 (16진수)
				, sm_cert_from_date         : "2017-05-19 00:00:00"    //인증서 발급일 yyyy-MM-dd HH:mm:ss
				, sm_cert_to_date           : "2024-06-26 23:59:59"    //인증서 폐기일 yyyy-MM-dd HH:mm:ss
				, sm_cert_policy_id         : "1.2.410.200005.1.1.4"   //인증서 정책
				, sm_cert_subject_rdn       : "cn=광먹장()0003041201606171422578,ou=IBK,ou=personal4IB,o=yessign,c=kr" //인증서 subject rdn
				, sm_cert_display_cn        : "광먹장3()0003041201606171422578" //인증서 subject cn
				, sm_cert_display_issuer_cn : "yessignCA-Test Class 3" //인증서 issuer cn
			}
			];
			
			var cert_list = [];
			var jex_list = jex.getJexObj($("#step" + stepNo + " #com_pub_cert_list"), "JEX_MOBILE_LIST");
			
			cert_list_temp.forEach(function(element, index) {
				//세금계산서용 인증서 제거
				if($.trim(element["sm_cert_policy_id"]) == "1.2.410.200005.1.1.6.8") {
					return;
				}
				

				
				if(_oidInfo[element["sm_cert_policy_id"]] != undefined) {
					
					element["sm_cert_type"] = _oidInfo[element["sm_cert_policy_id"]]["용도"] + _oidInfo[element["sm_cert_policy_id"]]["타입"];
					element["sm_cert_o_name"] = _oidInfo[element["sm_cert_policy_id"]]["발급기관"];
					
				} else {
					
					console.log("element[sm_cert_policy_id]" + element["sm_cert_policy_id"]);
					element["sm_cert_type"] = ""
					element["sm_cert_o_name"] = "";
					
					
				}

				
				var certTypeName = comUtil_getCertType($.trim(element["sm_cert_policy_id"]));
				
				if("C" == certType) {
					if(certTypeName == "사업자용") {
						cert_list.push(element);
					}
					
				} else if("P" == certType) {
					if(certTypeName == "개인용") {
						
						cert_list.push(element);
					}
				} else if("A" == certType) {
					cert_list.push(element);
				}
				
				
			});
			
			
			jex_list.setAll(cert_list);
			
			if(cert_list.length == 0) {
				//인증서가 없음 화면이동
				$("#step" + stepNo + " #public_no_cert_list").show();
				$("#step" + stepNo + " #com_pub_cert_list").hide();
				$("#step" + stepNo + " #login_title").hide();
			} else {
				$("#step" + stepNo + " #public_no_cert_list").hide();
				$("#step" + stepNo + " #com_pub_cert_list").show();
				$("#step" + stepNo + " #login_title").show();
				//jylee 작업할것
				comUtil_setCertStatusInfo(stepNo);
			}
		}
		
		uf_goStep(stepNo);
		
	});
	
	
}

function comUtil_setCertStatusInfo(stepNo) {
	$("#step" + stepNo + " #com_pub_cert_list > li").each(function () {
		let $liObj = $(this);
		let row_data = $liObj.data("_JEX_GETALL_DATA_");
		var mangiDate;
		var nowDate;
		var dateStr = "";
		var sm_cert_to_date = new Date(Date.parse(row_data["sm_cert_to_date"].substring(0, 10))); //yyyy-mm-dd
		var nowDate         = new Date(Date.parse(g_getDate('yyyy-mm-dd')));
		var diffDay         = (sm_cert_to_date.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000);
		
		
		//oid로 발급기관명 조회
		var certIssuerName = getCertIssuerName(row_data["sm_cert_display_issuer_cn"]);
		//$liObj.find("#sm_cert_o_name").text(certIssuerName);
		
		//사업자/개인 구분 설정
		var certTypeName = comUtil_getCertType(row_data["sm_cert_policy_id"]);
		//$liObj.find("#sm_cert_type").text(certTypeName);
		
		
		//만료된 인증서
		if(row_data["sm_cert_status"] == "2" || diffDay < 0) {
			/**
			$liObj.find("#div_sm_cert_status").removeClas
			$liObj.find("#div_sm_cert_status").addClass("ico_cert_disable"); //만료 아이콘으로 변경
			$liObj.find("#sm_cert_status_nm").text("만료"); //만료
			**/
			$liObj.find("#sm_cert_expire").show();
			$liObj.find("#sm_cert_btns").hide();
			$liObj.find("#cert_item").addClass("disabled");
			//$liObj.addClass("expiration");
			
		}
		
		 
		else if(diffDay < 31){ //갱신 대상인 인증서
			//$liObj.find("#li_expire_date span").addClass("point_red"); //만료일 영역의 글씨를 빨간색으로 처리
			var expire_date = $liObj.find("#sm_cert_to_date").text();
			if(diffDay == 0){ // 만료일
				$liObj.find("#sm_cert_to_date").text(expire_date + "(만료일)");
				//list type2
				$liObj.find("#expire_date_msg").text("(만료일)");
			} else{ // 만료 30일전
				$liObj.find("#sm_cert_to_date").text(expire_date + "(만료 " + diffDay + "일전)");
				//list type2
				$liObj.find("#expire_date_msg").text("(만료 " + diffDay + "일전)");
			}
			//$liObj.find("#li_expire_date_msg").show(); //만료일 메시지 영역 show
			//$liObj.find("#div_sm_cert_status").removeClass("ico_cert_normal"); //정상 아이콘 제거
			//$liObj.find("#div_sm_cert_status").addClass("ico_cert_update"); //갱신 아이콘으로 변경
			//$liObj.find("#sm_cert_status_nm").text("갱신"); //갱신

			//list type2
			$liObj.find("#li_expire_date_msg").show(); //만료일 메시지 영역 show

		}
		
		
		
		if(row_data["pin"] == true) {
			$liObj.find("#sm_cert_btns").show();
			$liObj.find("#sm_cert_pin_btns").show();
		}
		
		if(row_data["pattern"] == true) {
			$liObj.find("#sm_cert_btns").show();
			$liObj.find("#sm_cert_pattern_btns").show();
		}
		
		if(row_data["bio"] == true) {
			
			$liObj.find("#bio_type").show();
			$liObj.find("#bio_type").addClass("bio");
			$liObj.find("#bio_type").text("바이오인증");
			
//			if(_isAndroid()) {
//				$liObj.find("#bio_type").addClass("fingerprint");
//				$liObj.find("#bio_type").text("지문");
//			} else {
//				$liObj.find("#bio_type").addClass("face");
//				$liObj.find("#bio_type").text("얼굴인식");
//			}
		}
		
	});
}

/**
 * 개인/기업 구분
 * @param oid
 * @returns
 */
function comUtil_getCertType(oid) {
	if(    "1.2.410.200005.1.1.1" == oid 			//# 금결원,   개인, 상호연동
    		|| "1.2.410.200005.1.1.4" == oid 		//# 금결원,   개인, 용도제한(은행/보험/카드/민원)
    		|| "1.2.410.200005.1.1.4.8" == oid 		//# 금결원,   개인, 조합번호용
    		|| "1.2.410.200005.1.1.1.10" == oid    	//# 금결원,   개인, 금융인증서
    		|| "1.2.410.200004.5.1.1.5" == oid 		//# 코스콤,   개인, 상호연동
    		|| "1.2.410.200004.5.2.1.2" == oid 		//# 정보인증, 개인, 상호연동
    		|| "1.2.410.200004.5.2.1.7.1" == oid 	//# 정보인증, 개인, 용도제한(은행/보험)
    		|| "1.2.410.200004.5.4.1.1" == oid 		//# 전자인증, 개인, 상호연동
    		|| "1.2.410.200004.5.4.1.101" == oid   	//# 전자인증, 개인, 용도제한(은행/보험)
    		|| "1.2.410.200012.1.1.1" == oid 		//# 무역정보, 개인, 상호연동
    		|| "1.2.410.200012.1.1.101" == oid   	//# 무역정보, 개인, 용도제한(은행/보험), 별도협의필요
    		|| "1.2.410.200004.5.5.1.1" == oid 		//# 이니텍,   개인, 상호연동
    		|| "1.2.410.200004.5.3.1.9" == oid 		//# 전산원    개인 범용
			) {
		return "개인용";
		
	} else if(
			"1.2.410.200005.1.1.5" == oid 		//# 금결원,   법인, 상호연동
    	 || "1.2.410.200004.5.1.1.7" == oid 	//# 코스콤,   법인, 상호연동
    	 || "1.2.410.200004.5.2.1.1" == oid	//# 정보인증, 법인, 상호연동
    	 || "1.2.410.200004.5.4.1.2" == oid	//# 전자인증, 법인, 상호연동
    	 || "1.2.410.200012.1.1.3" == oid		//# 무역정보, 법인, 상호연동
    	 || "1.2.410.200005.1.1.2" == oid		//# 금결원,   법인, 용도제한(은행/보험/카드/민원)
    	 || "1.2.410.200005.1.1.6.1" == oid	//# 금결원,   법인, 용도제한(기업뱅킹)
    	 || "1.2.410.200005.1.1.6.8" == oid	//# 금결원,   법인, 용도제한(세금계산서)
    	 || "1.2.410.200005.1.1.8.11" == oid	//# 금결원, 법인, 금융인증서, 금융거래용/1년 
    	 || "1.2.410.200005.1.1.8.12" == oid	//# 금결원, 법인, 금융인증서, 금융거래용/2년 
    	 || "1.2.410.200005.1.1.8.13" == oid	//# 금결원, 법인, 금융인증서, 금융거래용/3년 
    	 || "1.2.410.200005.1.1.6.10" == oid	//# 금결원, 법인, 금융인증서, 행별/3년
    	 || "1.2.410.200004.5.3.1.2" == oid	//# 전산원, 법인 범용
    	 
    	 ) {
    	 
			
		return "사업자용";
		
	} else {
		
		return "";
	}
}

//공동 인증서 oid 정보
var _oidInfo = {
    "1.2.410.200004.5.1.1.5" : {

        "발급기관" : "SignKorea"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.1.1.7" : {

        "발급기관" : "SignKorea"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.2.1.1" : {

        "발급기관" : "KICA한국정보인증"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.2.1.2" : {

        "발급기관" : "KICA한국정보인증"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.2.1.7.1" : {

        "발급기관" : "KICA한국정보인증"
        ,"타입"    : "개인"
        ,"용도"    : "은행용"
    }

    , "1.2.410.200004.5.4.1.1" : {

        "발급기관" : "한국전자인증"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.4.1.101" : {

        "발급기관" : "한국전자인증"
        ,"타입"    : "개인"
        ,"용도"    : "은행용"
    }

    , "1.2.410.200004.5.4.1.2" : {

        "발급기관" : "한국전자인증"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.5.1.1" : {

        "발급기관" : "INIPASS이니텍"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200004.5.5.1.2" : {

        "발급기관" : "INIPASS이니텍"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }

    , "1.2.410.200005.1.1.1" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200005.1.1.2" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "사업자"
        ,"용도"    : "은행/보험"
    }

    , "1.2.410.200005.1.1.4" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "개인"
        ,"용도"    : "은행/보험"
    }

    , "1.2.410.200005.1.1.4.8" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "개인"
        ,"용도"    : "은행/보험(조합번호용)"
    }

    , "1.2.410.200005.1.1.4.88" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "개인"
        ,"용도"    : "은행/보험(조합번호용)"
    }

    , "1.2.410.200005.1.1.5" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }

    , "1.2.410.200005.1.1.6.1" : {

        "발급기관" : "금융결제원"
        ,"타입"    : "사업자"
        ,"용도"    : "은행용"
    }

    , "1.2.410.200012.1.1.1" : {

        "발급기관" : "무역정보"
        ,"타입"    : "개인"
        ,"용도"    : "범용"
    }

    , "1.2.410.200012.1.1.101" : {

        "발급기관" : "무역정보"
        ,"타입"    : "사업자"
        ,"용도"    : "은행용"
    }

    , "1.2.410.200012.1.1.3" : {

        "발급기관" : "무역정보"
        ,"타입"    : "사업자"
        ,"용도"    : "범용"
    }
    
    , "1.2.410.200005.1.1.6.8" : {

        "발급기관" : "금융결재원"
        ,"타입"    : "사업자"
        ,"용도"    : "세금계산서용"
    }

}