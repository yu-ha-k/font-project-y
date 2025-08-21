(function() {
	/**
	 * Date: 17. 11. 23
	 * 즉시이체, 간편송금서비스
	 * @namespace JexMobileInputAmount
	 */
	
	var sForm_attrs = {
			"id"                        : "data-jx-inputamt"                 //호출할 svc 명
			,"target"                   : "data-jx-inputamt-target"          //입력 input ID명
			,"calcTarget"               : "data-jx-inputamt-calc-target"     //계산기 노출 영역 step 번호
			,"titleName"                : "data-jx-inputamt-calc-title-name" //입력기 상단 title 변경시
			,"calType"                  : "data-jx-inputamt-calc-type"       //입력기 type ( trn_qck : 간편송금서비스 / trn_ovr : 10억이상이체)
			,"maxTrnAmt"                : "data-jx-inputamt-calc-maxTrnAmt"  //입력기 최대금액 ( trn_qck : 간편송금서비스(1000만원) )
		};
	
	$(document).ready(function(){ 
		$('div['+sForm_attrs.id+']').each(function(idx,$jq){
			$jq = $($jq);
			var targetId   = $jq.attr(sForm_attrs.target)?$jq.attr(sForm_attrs.target):"tran_amt";
			var calcStepNo = $jq.attr(sForm_attrs.calcTarget)?$jq.attr(sForm_attrs.calcTarget):"100";
			var titleName  = $jq.attr(sForm_attrs.titleName)?$jq.attr(sForm_attrs.titleName):"이체금액";
			var calType    = $jq.attr(sForm_attrs.calType)?$jq.attr(sForm_attrs.calType):"default"; //or ["trn_qck"]간편송금서비스
			var maxTrnAmt  = $jq.attr(sForm_attrs.maxTrnAmt)?$jq.attr(sForm_attrs.maxTrnAmt):""; // ["trn_qck"]간편송금서비스(1000만원)
			
			var html = ''
			
	/* 2017.01.25 간편송금'화면 (기획)변경으로 삭제(즉시이체'화면과 동일)
			if(calType == "trn_qck") { //간편송금서비스
	  html += '<div class="dd">'
				+ '<div class="qck_form right">'
					+ '<i class="unit ico_won"><span class="blind">원</span></i>'
					+ '<input id="' + targetId + '" type="tel" name="focus" class="qckinput" required placeholder="숫자만 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"이체금액","nullable":false,"maxLength":7,"charType":"money"}\'>'
					+ '<span class="txt_lang" id="amt_han"></span>' //20180124 한글금액추가
					+ '<button id="btn_del_x" type="reset" class="btn_del"><span class="blind">삭제</span></button>'
				+ '</div>';
			} 
			else { //default (즉시이체)
	  html += '<div for="'+targetId+'" class="dt">'+titleName+' <span class="point">&#91;필수&#93;</span></div>'
			+ '<div class="dd">'
				+ '<div class="won_wrap placeholder_wrap">'
					+ '<input id="' + targetId + '" type="tel" class="num" placeholder="숫자만 입력" title="이체금액 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"이체금액","nullable":false,"maxLength":13,"charType":"money"}\'>'
					+ '<span class="txt_lang" id="amt_han"></span>'
					+ '<button id="btn_del_x2" type="button" class="" title="삭제"></button>'
				+ '</div>';
			}
	*/
	
	html += '<div for="'+targetId+'" class="dt">'+titleName+' <span class="point">&#91;필수&#93;</span></div>'
			+ '<div class="dd">'
				+ '<div class="won_wrap placeholder_wrap">';
				if(calType == "trn_qck") { //간편송금서비스
			  html += '<input id="' + targetId + '" type="tel" class="num" placeholder="숫자만 입력" title="이체금액 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"이체금액","nullable":false,"maxLength":8,"charType":"money"}\'>';
				} else {				//default (즉시이체)
					
					/**
					 * 20240205 웹접근성 추가 판매가 분기 
					 * **/					
					if(titleName == "판매가"){
						html += '<input id="' + targetId + '" type="tel" class="num" placeholder="숫자만 입력" title="판매가 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"판매가","nullable":false,"maxLength":13,"charType":"money"}\'>';
					}else{
						html += '<input id="' + targetId + '" type="tel" class="num" placeholder="숫자만 입력" title="이체금액 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"이체금액","nullable":false,"maxLength":13,"charType":"money"}\'>';		
					}
				}
			  html += '<span class="txt_lang" id="amt_han"></span>'
					+ '<button id="btn_del_x2" type="button" class="" title="삭제" aria-hidden="true"></button>'
						//aria-hidden="true"   X 않보일때
						//aria-hidden="false"  X 보일때
				+ '</div>';
			
			  html += '<div class="btn_con_area click">'
					+ '<input type="hidden" id="Conv_Kor2_to_set_favTrn_amount_btn" value="0"/>'
			
		if(calType == "trn_ovr") { //10억 이상 이체
			html += '<button type="button" id="addInput_btn_100billion">100억</button>'
					+ '<button type="button" id="addInput_btn_50billion">50억</button>'
					+ '<button type="button" id="addInput_btn_30billion">30억</button>'
					+ '<button type="button" id="addInput_btn_10billion">10억</button>';
		} else if (calType == "trn_esc") { //안심이체
			html += '<button type="button" id="addInput_btn_10million">1천만</button>'
				+ '<button type="button" id="addInput_btn_5million">500만</button>'
				+ '<button type="button" id="addInput_btn_500thousand">50만</button>'
				+ '<button type="button" id="addInput_btn_10thousand">1만</button>';
		} else {
			html += '<button type="button" id="addInput_btn_million">100만</button>'
				+ '<button type="button" id="addInput_btn_100thousand">10만</button>'
				+ '<button type="button" id="addInput_btn_fifty_thousand">5만</button>'
				+ '<button type="button" id="addInput_btn_ten_thousand">1만</button>';
		}
		
			if(targetId == "tran_amt_step1" || targetId == "seller_amt_step1" || targetId == "intm_seller_amt_step1") {
				var location_href = location.href.split("?");
				
				if (location_href.toString().indexOf("fnt_trn_010101_1") > -1 || location_href.toString().indexOf("fnt_trn_510101_1") > -1) { // 즉시이체 화면에서만 "전액" 버튼 보임
					html += '<button type="button" id="addInput_btn_all">전액</button>';	
				}
				
//				html += '<button type="button" id="inputamt_clear" class="revise">정정</button>';
				html += '<button type="button" id="inputamt_clear" class="revise mr0">정정</button>'; //2022.10.14_클래스 추가, 운영화면에서 정정버튼 뒤에 숨겨진 다른 요소가  있음
				html += '<input type="hidden" id="inputamt_clear_2" value="Clear"/>';
			} else {
				html += '<button type="button" id="addInput_btn_calculate" class="on" data-jx-execute="click" data-jx-execute-target="this,showStep('+ calcStepNo + ')@#step" data-jx-calculator="#step'+calcStepNo+'" data-jx-calculator-target="#'+targetId+'" data-jx-calculator-target-kor="#amt_han">계산기</button>';
			}
		html += '</div></div>';
		
			$jq.html(html);
			pluginCommon($jq);
			$jq.addClass("item");
			
			var tarnAmtObj = $jq.find("#" + targetId);
			
			$jq.find('#addInput_btn_all').on('click',function(){ 			// "전액" 버튼 클릭시
				uf_amtBtn("all");
			});
			
			$jq.find('#addInput_btn_million').on('click',function(){
				uf_amtBtn(1000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_100thousand').on('click',function(){
				uf_amtBtn(100000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_fifty_thousand').on('click',function(){
				uf_amtBtn(50000);      
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_thirty_thousand').on('click',function(){
				uf_amtBtn(30000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_ten_thousand').on('click',function(){
				uf_amtBtn(10000);
				tarnAmtObj.focusout();
			});
			
			// 10억이상 이체 버튼(Start)
			$jq.find('#addInput_btn_100billion').on('click',function(){
				uf_amtBtn(10000000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_50billion').on('click',function(){
				uf_amtBtn(5000000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_30billion').on('click',function(){
				uf_amtBtn(3000000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_10billion').on('click',function(){
				uf_amtBtn(1000000000);
				tarnAmtObj.focusout();
			});
			// 10억이상 이체 버튼(End)
			
			// 안심이체 이체 버튼(Start)
			$jq.find('#addInput_btn_10million').on('click',function(){
				uf_amtBtn(10000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_5million').on('click',function(){
				uf_amtBtn(5000000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_500thousand').on('click',function(){
				uf_amtBtn(500000);
				tarnAmtObj.focusout();
			});
			$jq.find('#addInput_btn_10thousand').on('click',function(){
				uf_amtBtn(10000);
				tarnAmtObj.focusout();
			});
			// 안심이체 이체 버튼(End)
			
			$jq.find('#inputamt_clear').on('click',function(){ //정정
				tarnAmtObj.val("");
				$("#amt_han").text("");
				$("#btn_del_x2").removeClass("btn_ipt_del");  //btn_del_x2
				$("#btn_del_x2").attr("aria-hidden", "true"); //X 않보일때
				tarnAmtObj.focus();
			});
			//금액'초기화 하기위한hidden
			$jq.find('#inputamt_clear_2').on('click',function(){ //Clear
				tarnAmtObj.val("");
				$("#amt_han").text("");
				$("#btn_del_x2").removeClass("btn_ipt_del");  //btn_del_x2
				$("#btn_del_x2").attr("aria-hidden", "true"); //X 않보일때
			});
			$jq.find('#btn_del_x, #btn_del_x2').on('click',function(){ //삭제 X
				tarnAmtObj.val("");
				$("#amt_han").text("");
				$("#btn_del_x2").removeClass("btn_ipt_del");  //btn_del_x2
				$("#btn_del_x2").attr("aria-hidden", "true"); //X 않보일때
				tarnAmtObj.focus();
			});
			
			//자주쓰는이체'선택 후 셋팅되어지는 금액에 따른 [NEW 금액 한글화] Conv_Kor2
			//$jq.find('#Conv_Kor2_to_set_favTrn_amount_btn').on('click',function(){
			$jq.find('#Conv_Kor2_to_set_favTrn_amount_btn').off("click").on("click", function(e) {
				var favTrnAmt = $("#"+this.id).val();
				Conv_Kor2(favTrnAmt);
			});
			
			var uf_amtBtn = function(val) {
				var tarnAmtObj = $jq.find("#" + targetId);
				var tran_amt = tarnAmtObj.val();

				if (val == "all") { // "전액" 버튼 클릭
					var temp_tranAmt = Number($('#pvamt_for').text().replace(/,/g, ""));
					
					if (!isEmpty(temp_tranAmt)) {
						tran_amt = temp_tranAmt;	
					} else {
						tran_amt = 0;
					}
					
				} else {
					if(tran_amt == "" || tran_amt == null || tran_amt == undefined) {
						tran_amt = val;
					} else {
						//2018.01.24 (수정후) '금액버튼': 입력길이 만큼 입력되도록..
						var tmpAmt = Number(tran_amt.replace(/,/g, "")) + Number(val);
						var tmpLen = 13;           //default (즉시이체)
						if(calType == "trn_qck") { //간편송금서비스
							tmpLen = 8;
						}
						if(String(tmpAmt).length <= tmpLen){
							if("trn_qck" == calType){
								tran_amt = Number(tran_amt.replace(/,/g, "")) + Number(val);
								
								if("" != maxTrnAmt && (tran_amt > maxTrnAmt)){
									tran_amt = maxTrnAmt;
								}
							}else{
								tran_amt = Number(tran_amt.replace(/,/g, "")) + Number(val);
							}
						}
						
						//tran_amt = Number(tran_amt.replace(/,/g, "")) + Number(val); 2018.01.24 (수정전)Default
					}	
				} 
								
				tarnAmtObj.val(formatter.number(tran_amt));
				tarnAmtObj.next().show();
				
				tarnAmtObj.next().attr("class", "txt_lang"); //amt_han
				
				Conv_Kor2(String(tran_amt));
			}
			
			/**
			 * NEW 금액 한글화
			 */
			var Conv_Kor2 = function(val){
				var amtHanObj = $jq.find("#amt_han");
				if(val == "" || val == undefined || val == null) {
					amtHanObj.text("");
					return;
				}else {
					val = val.replace(/,/g, "");
					$("#btn_del_x2").attr("class", "btn_ipt_del"); //btn_del_x2
					$("#btn_del_x2").attr("aria-hidden", "false"); //X 보일때
				}
				
				//1억 1,234만 1,234원
				var arrWon = ["","만","억","조","경","해","자","양","구","간","정"];
				var resultWon = "";
				var pattern = /(-?[0-9]+)([0-9]{4})/;
				while(pattern.test(val)){
					val = val.replace(pattern,"$1,$2");
				}
				var delimitCnt = val.split(",").length-1;
				for(var i=0;i<val.split(",").length; i++){
					if(arrWon[delimitCnt]==undefined){
						console.log("ljy :: 값이 너무 크다");
						break;
					}
					strAmtData = val.split(",")[i];
					numData = Number(strAmtData);
					strNumData = parseInt(numData / 1000) > 0 ? parseInt(numData / 1000) + "," : "";
					strNumData += parseInt(numData / 1000) > 0 ? strAmtData.substring(1) : (numData % 1000);
					if(numData > 0) {
						resultWon += " " + strNumData+arrWon[delimitCnt];
					}
					delimitCnt--;
				}
				if("" != resultWon) resultWon += "원";
				amtHanObj.text(resultWon);
			}
			
			//default
			var Conv_Kor = function(val){
				var amtHanObj = $jq.find("#amt_han");
				if(val == "" || val == undefined || val == null) {
					amtHanObj.text("");
					return;
				}else {
					val = val.replace(/,/g, "");
				}

				var sum = Number(val);
				var len = sum.toString().length;
				var i;
				var remainder, flag;
				var ch = "";

				if (len >= 14) return "";
				
				flag = 0;

				for(i=0; i<len; i++)
				{
					remainder = sum % 10;           // 나머지 계산 즉, '1'의 자리부터 한자리씩 잘라옴
					sum = Math.floor(sum / 10);     // 몫을 계산 즉, '1'의 자리부터 한자리씩 자르고 남은것.

					if ( remainder == 0 ) {
						if ( i == 3 || i == 7 ) flag = 0; else flag ++; // 천단위, 천만단위에서는 flag 리셋, flag는 '0'의 갯수 세는것
						continue;
					}

					switch(i) {
						case  0 :                  break;
						case  1 : ch = "십"  + ch; break;
						case  2 : ch = "백"  + ch; break;
						case  3 : ch = "천"  + ch;
						          flag = 0;        break;
						case  4 : ch = "만 " + ch; break;
						case  5 : if (flag == 1) ch = "십만 "  + ch; else ch = "십"  + ch; // '4'번째 만의 자리가 '0'인경우
						          flag = 0;        break;
						case  6 : if (flag == 2) ch = "백만 "  + ch; else ch = "백"  + ch; // '4/5'번째 만/십만의 자리가 '0'인경우
						          flag = 0;        break;
						case  7 : if (flag == 3) ch = "천만 "  + ch; else ch = "천"  + ch; // '4/5/6'번째 만/십만/백만의 자리가 '0'인경우
						          flag = 0;        break;
						case  8 : ch = "억 " + ch; break;
						case  9 : if (flag == 1) ch = "십억 "  + ch; else ch = "십"  + ch;
						          flag = 0;        break;
						case 10 : if (flag == 2) ch = "백억 "  + ch; else ch = "백"  + ch;
							          flag = 0;        break;
						case 11 : if (flag == 3) ch = "천억 "  + ch; else ch = "천"  + ch;
						          flag = 0;        break;
						case 12 : ch = "조 "  + ch; break;
					}

					switch(remainder) {
						case 1 : ch = "일" + ch; break;
						case 2 : ch = "이" + ch; break;
						case 3 : ch = "삼" + ch; break;
						case 4 : ch = "사" + ch; break;
						case 5 : ch = "오" + ch; break;  
						case 6 : ch = "육" + ch; break;
						case 7 : ch = "칠" + ch; break;
						case 8 : ch = "팔" + ch; break;
						case 9 : ch = "구" + ch; break;
					}
				}

				amtHanObj.text(ch);
			}
			
			$jq.find("#" + targetId).on("keyup", function(event) {
				var $jq = $(event.target);
				var txt = $jq.val().replace(/,/g, "");
				var dat = "";
				var tmpLen = 13; //Default length (즉시이체 등)
				
				if(calType == "trn_qck") { //간편송금서비스 length
					tmpLen = 8;
				}
				
				if(txt.length == 1 && txt == "0") {
					$jq.val("");
				} else {
					if((txt != null || txt != undefined || txt != "") && (txt.length <= tmpLen)) {
						for(var i = 0 ; i < txt.length ; i++) {
							var tmp = txt.charCodeAt(i);
							
							if(!(tmp < 48 || tmp > 57)) {
								dat += txt.charAt(i);
							}
						}
						
						if("" != maxTrnAmt && calType == "trn_qck" && Number(dat) > Number(maxTrnAmt)) { //간편송금서비스
							dat = maxTrnAmt;
						}
						
						Conv_Kor2(dat);
					}else {
						dat = txt.substring(0, txt.length -1);
					}
					
					$(this).val(dat);
				}
			}).on("focusin", function(event) {
				var $jq = $(event.target);
				$jq.val($jq.val().replace(/,/g, ""));
			})
			.on("focusout", function(event) {
				var $jq = $(event.target);
				if($jq.val() != ''){
					$jq.val(formatter.number($jq.val()));
				}
				Conv_Kor2($jq.val());
			});
			
			jex.setJexObj($jq);
		});
	});
})();

