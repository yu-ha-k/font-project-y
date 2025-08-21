includeJs("../../../../js/com/atonCrypto.js");
includeJs("../../../../js/com/kicaCrypto.js");
includeJs("../../../../js/com/partnerCert.js");


// Iframe으로부터 전달받는 PostMessage에 대한 공통 처리 
var ibkCertCom = {
	wsafeboxUrl : "",
	callbackFunc : null,  // 개별 업무 페이지에서 수행하는 함수로 공통로직 수행 후 실행
	/*-----------------------------------------------------------------------------
	 * wsafebox 호출 - aton솔루션을 iframe으로 띄운다.
	 *- path : 경로 ex) /issueCert
	 *- iframeParam : wsafebox에 넘길 param
	 *- messageFunc : 서버저장형 솔루션에서 전달한 PostMessage를 처리하는 개별 업무쪽 함수(공통 함수에서 처리 후, 실행) 
	 * return : wsafebox 완료 후 실행해야할 함수
	 -----------------------------------------------------------------------------*/
	wsafeboxIframe : function(path, iframeParam, messageFunc) {
		ibkCertCom.setDomStorageEnabled().then(function(){
			var iframeSector = document.createElement("iframe");
	        iframeSector.id = "iframe_sector";
	        Object.assign(iframeSector.style, {"z-index": 10000, width:"100vw", height:"100%", position:"fixed", top:0, left:0})
	        document.body.appendChild(iframeSector);
	        ibkCertCom.callbackFunc = messageFunc;
	        
	        if("KICA" == _this.openType){
		 		ibkCertCom.wsafeboxUrl = getIbkCertConfig().IBK_IDS_CERT_URL.SCP_DOMAIN;
		 		partnerCert.urlInit("", ibkCertCom.wsafeboxUrl);
			}else{
				ibkCertCom.wsafeboxUrl = getIbkCertConfig().IBK_CERT_URL.SCR_DOMAIN ;
			}
			
	        if(_isDevMode && !location.protocol.includes("https")) { //개발이면서 https가 아닐 경우
				
				if("KICA" == _this.openType){
					$("#step").hide();
		        	partnerCert.openCertSvc(iframeSector, path.replace("/",""), {partnerData : iframeParam}, ibkCertCom.messageEventListener);
				}else{
					
					iframeSector.src = ibkCertCom.wsafeboxUrl + path;
			        iframeSector.onload = function(){
			            $("#step").hide();
			            document.querySelector('#iframe_sector').contentWindow.postMessage({partnerData : iframeParam}, ibkCertCom.wsafeboxUrl);
			        }
			      
					window.addEventListener("message", ibkCertCom.messageEventListener);
				}
					
			}else{
				  
				$("#step").hide();
				partnerCert.urlInit("", ibkCertCom.wsafeboxUrl);
		        partnerCert.openCertSvc(iframeSector, path.replace("/",""), {partnerData : iframeParam}, ibkCertCom.messageEventListener);
			}
	    });
	    
	    //후처리에 필요한 처리 return
	    return ibkCertCom.close;
	},
	// 서버저장형 솔루션에서 전달하는 PostMessage를 처리하는 공통함수
	messageEventListener : function(messageData, event) {
		
		// 서버저장형에서 Native 모듈실행 후 반환 
		if(messageData.nativeCallId) {
			$.nativeCall(messageData.nativeCallId, [JSON.stringify(messageData.nativeCallData)]).always(function(resultData){
				var result = {
					nativeCallId : messageData.nativeCallId,
					nativeCallData : resultData
				}
				if(_isDevMode && !location.protocol.includes("https")) { //개발이면서 https가 아닐 경우
					event.source.postMessage(result, ibkCertCom.wsafeboxUrl);
				}else{
					partnerCert.send(result);
				}
			})
			return;
		}
		if(typeof ibkCertCom.callbackFunc === "function") {
			// 솔루션 구간 암복호화 로직 적용하면서 개별업무의 콜백함수에서는 복호화된 데이터만 반환(event 객체가 아님)
			// 기존 event 객체는 3번째 파라메터로 분리하여 반환
			var response = {
				data : messageData
			};
			ibkCertCom.callbackFunc.call(this, response, event);
		}
	},
	// 서버저장형 솔루션 화면과 Message 이벤트 제거
	close : function() {
	    $("#iframe_sector").remove(); //iframe 제거
	    $("#step").show();
	    window.removeEventListener("message", this.messageEventListener); //이벤트 제거.
	    ibkCertCom.callbackFunc = null;
	},
	setDomStorageEnabled : function() {
		var dfd = $.Deferred();
		if(_isRealApp && _isAndroid()){ //안드로이드일 경우 네이티브호출
			//tobe 앱에서는 디폴트로 true 되어 있음
//			$.nativeCall('setDomStorageEnabled',[{'isEnabled':true}]).done(function(){
//				dfd.resolve();
//			});
			dfd.resolve();
		}else{
			dfd.resolve();
		}
		return dfd.promise();
	},
	// 폐기 후 자동로그인 연결 끊기
	disConnectLocalAutoLogin: function () {
		partnerCert.removeAccountKey('corporation');
	}
};