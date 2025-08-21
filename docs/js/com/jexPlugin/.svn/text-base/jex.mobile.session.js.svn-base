(function() {
	/**
	 * Date: 13. 5. 6.
	 * Time: 오후 10:07
	 *
	 * @namespace JexMobileSession
	 */
	
	var svc_attrs = {
			"id"			: "data-jx-svc"						//호출할 svc 명
			,"source"		: "data-jx-svc-source"				//[option]SVC 호출 전 input
			,"sourceDirect" : "data-jx-svc-source-direct"		//[option]SVC 호출 전 input (JSON)
			,"taskPackage"	: "data-jx-svc-package"				// SVC 호출시 package 명 ex)inq
			,"saveKey"		: "data-jx-svc-save-key"			//[option] SVC 호출 후 결과값을 KIUP_GLOVAL_DATA[key]로 저장합니다.
	};
	
	var JexMobileSession = JexPlugin.extend({
			init: function () {
			},
			/**
			 * @method load
			 * data-jx-session 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
			 */
			load: function (attr, $jq) {
				this.$object = $jq;
				this.svc = $.trim($jq.attr(svc_attrs.id));
				this.sourceDirect = $jq.attr(svc_attrs.sourceDirect); // jsonObject
				
				if("@ComSession" == this.svc){
					this.setComSession($jq);
				}else if("@BankList" == this.svc){
					this.setBankList($jq);
				}else if("@BankList2" == this.svc){
					this.setBankList2($jq);
				}else if("@ComUserSession" == this.svc){
					this.setComUserSession($jq);
				}
			},
			execute				: function(evt,$jq) {
			
			},
			
			/**
			* [계좌리스트가져오기] 
			* 각 업무에 맞는 String 인자값 셋팅
			* 반환 : combo list data
			* [예시]
			* comCsbUtil.getComSessionUtil("cust_no_list") 	: 고객번호 가져오기 
			* comCsbUtil.getComSessionUtil("pay_acntno_list")	: 기업 출금계좌
			* comCsbUtil.getComSessionUtil("pay_acntno")		: 
			* comCsbUtil.getComSessionUtil("listbox_acct_res")	: 전체계좌 가져오기
			* comCsbUtil.getComSessionUtil_2("listbox_acct_terminate", "01,02,03,04,06,07", "in")	: 해지계좌 가져오기
			* 등등.. (인자값들은 인뱅이나 스마트 AS-IS를 참조)
			*/
			setComSession : function($jq){
				$jq.attr(svc_attrs.id,"010101_1");
				$jq.attr(svc_attrs.taskPackage,"com_utl");
				
				//sourceDirect 값이 있는 경우만 처리. 없는 경우는 동적으로 처리하는 경우
				if(undefined != this.sourceDirect){
					var sourceData = JSON.parse(this.sourceDirect);
					
					if(undefined == sourceData['acnt_gm']){
						sourceData['func_name'] = "getComSessionUtil";
						//session_name
						//Async false
						$jq.attr(svc_attrs.saveKey,"ComSession");
					}else {
						sourceData['func_name'] = "getComSessionUtil_2";
						 //session_name
					     //acnt_gm  	- 대상계좌구분코드(ex. "93,96,97")-임의의 구분자로 다수의 코드를 입력가능
					     //inout_gb 	- IN-OUT 구분코드:in-포함된계좌, out-포함되지않은계좌)
						//Async false
					}
					$jq.attr(svc_attrs.sourceDirect,JSON.stringify(sourceData));
				}
			}
			/**
			 * login setComUserSession Setting
			 * 
			 * [예시]
			 * comCsbUtil.setComUserSession()
			 */
			,setComUserSession :function($jq){
				
				$jq.attr(svc_attrs.id,"020101_1");
				$jq.attr(svc_attrs.taskPackage,"com_utl");
				//Async false
		       
		        var sourceData = JSON.parse(this.sourceDirect);
				sourceData['func_name'] = "setComUserSession";
				$jq.attr(svc_attrs.sourceDirect,JSON.stringify(sourceData));
				
				//data setting???
			}
			/**
			 * 은행리스트 [2013.05.04]
			 * [예시]
			 * comCsbUtil.getBankList();
			 */
			, setBankList : function($jq){
				$jq.attr(svc_attrs.id,"010101_1");
				$jq.attr(svc_attrs.taskPackage,"com_utl");
				var sourceData = {};
				sourceData['func_name'] = "getBankList";
				$jq.attr(svc_attrs.sourceDirect,JSON.stringify(sourceData));
			}
			/**
			 * 은행리스트 [2013.05.04]
			 * [예시]
			 * comCsbUtil.getBankList();
			 */
			, setBankList2 : function($jq){
				$jq.attr(svc_attrs.id,"010101_1");
				$jq.attr(svc_attrs.taskPackage,"com_utl");
				var sourceData = {};
				sourceData['func_name'] = "getBankList2";
				$jq.attr(svc_attrs.sourceDirect,JSON.stringify(sourceData));
			}

		});
		
		jex.plugin.add("JEX_MOBILE_SESSION", JexMobileSession, "data-jx-session");
})();