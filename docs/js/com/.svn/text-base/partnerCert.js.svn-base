﻿﻿var partnerCert = (function(module, $) {
   
    "use strict";
    
    const version = '1.0.3';
    
	let global_partnerHost;
	let global_serviceHost;
	let global_iframe;
	let partnerCrypto;
	let serviceCrypto;
	let messageData;
	let global_callback;
	let global_keycallback;
	let keyData = {};
	
	module.getVersion = function() {
		return version;
	}
	
	module.removeRefToken = async function(data) {
		sessionStorage.removeItem(data.removePartner);
	    
	    const resIdbData = await partnerCrypto.deleteIdbData("ref_token", data.removePartner);
	}
	
	module.saveRefToken = async function(data) {
	    let ret = await partnerCrypto.saveIdbData("ref_token", 'deviceId', data.deviceId);
	    
	    if (data.autoConnYn == 'Y') {
	        ret = await partnerCrypto.saveIdbData("ref_token", data.savePartner, data.refToken);
	    } 
		
	    sessionStorage.setItem('refToken', data.refToken);
	}
	
	//kica accoutkey save
	module.saveAccountKey = async function(data) {
	    localStorage.setItem('deviceId', data.deviceId);
	    
	    if (data.autoConnYn == 'Y') {
			localStorage.setItem(data.savePartner, data.accountkey);
			localStorage.setItem('certSerl', data.certSerl);
			localStorage.setItem('custId', data.custId);
	    } else {
			localStorage.removeItem(data.savePartner);
		    localStorage.removeItem('certSerl');
		    localStorage.removeItem('custId');
		}
		
	    sessionStorage.setItem('accountkey', data.accountkey);
	}
	
	module.removeAccountKey = async function(data) {   
		sessionStorage.removeItem('accountkey');
	    
	    localStorage.removeItem(data);
	    localStorage.removeItem('deviceId');
	    localStorage.removeItem('certSerl');
	    localStorage.removeItem('custId');
	}
	
	async function encryptData(crypto, plainData) {
		
		let encryptRes;
		
		if(_this.openType !== "KICA"){
			encryptRes = await crypto.encrypt(crypto.text2hex(JSON.stringify(plainData)));
		} else {
			
			try {
				encryptRes = {
					encrypted: ibk_crypto.encrypt(JSON.stringify(plainData)),
					ResultCode: "0000",				
				}					
			} catch (e){
				encryptRes = {					
					ResultCode: "9999",
					ResultMsg: "ibk_crypto encrypt fail",				
				}
			}
			
		}
		 
		return encryptRes;
	}
	
	async function decryptData(crypto, data) {
		
		let messageData;
		
		if (data.encryptData) {
			if("KICA" !== _this.openType){
				let decryptRes = await crypto.decrypt(data.encryptData);
				
				if(decryptRes.ResultCode !== '0000'){
			        errorAlert(decryptRes.ResultCode, decryptRes.ResultMsg);
			        return;
			    }
				
			    let response = await crypto.hex2text(decryptRes.plainText);
			    messageData = JSON.parse(response);
		    } else {
				try{
					messageData = JSON.parse(ibk_crypto.decrypt(data.encryptData))
				} catch(e){
					errorAlert("9999","ibk_crypto decrypt fail");
				}
			}
			
		} else {
			messageData = data;
		}
		
		return messageData;
	}
	
	/*
	 * indexedDB 에서 REF TOKEN 추출
	 *
	 * @param custType
	 *
	 */
	async function getRefTokenIdb(custType) {
		const refOwner = custType == '10' ? 'private' : 'corporation';
		let refToken = '';
		
		let resTokenIdbData = await partnerCrypto.restoreIdbData("ref_token", refOwner);
		console.log('getRefTokenIdb : ' + resTokenIdbData);
		if (resTokenIdbData.resultCode == '0000') {
	        refToken = resTokenIdbData.data;
		}
		
		return refToken;
	}
	
	/*
	 * localStorage 에서 accountkey 추출
	 *
	 * @param custType
	 *
	 */
	async function getAccoutKeyLocal(custType) {
		const refOwner = custType == '10' ? 'private' : 'corporation';
		let accountkey = '';
		
		if(localStorage.getItem(refOwner)){
	    	accountkey = localStorage.getItem(refOwner);
	    }
		
		return accountkey;
	}
	
	/*
	 * localStorage 에서 accountkey 추출
	 *
	 * @param
	 *
	 */
	async function getCertSerlLocal() {
		let certSerl = '';
		
		if(localStorage.getItem('certSerl')){
	    	certSerl = localStorage.getItem('certSerl');
	    }
	    
		return certSerl;
	}
	
	/*
	 * localStorage 에서 accountkey 추출
	 *
	 * @param
	 *
	 */
	async function getCustIdLocal() {
		let custId = '';
		
		if(localStorage.getItem('custId')){
	    	custId = localStorage.getItem('custId');
	    }
	    
		return custId;
	}
	
	/*
	 * IndexedDb에서 디바이스 정보 조회
	 */
	async function getAccountDeviceId() {
		let deviceId = '';
		
		if(localStorage.getItem('deviceId')){
	    	deviceId = localStorage.getItem('deviceId');
	    }
		
		return deviceId;
	}
	
	/*
	 * 패턴 사용 여부
	 
	 */	
	async function getUsePatternYn() {
		return new Promise(function(resolve, reject){
			resolve("Y"); // TOBE 앱에선 버전이 새로 채번되므로 버전체크 안함
//			if(_isRealApp) {
//				$.nativeCall('getAppInfo', [JSON.stringify([])]).then(function(resultData){
//			
//					var currVer = resultData.current_version;
//					let currentVer = $.trim(currVer).replace(/\./g, ""); 
//					
//					if(_isAndroid()){
//						if(Number(currentVer) >= Number("310")) { // 3.1.0		
//				        	resolve("Y");
//				        } else {		
//				        	resolve("N");
//				        }
//					}else if(_isIphone()){
//						if(Number(currentVer) >= Number("307")) { // 3.0.7
//							resolve("Y");
//					  	} else {			
//							resolve("N");
//						}
//					} else {
//						resolve("N");
//					}
//					
//				}).fail(function(dt) {
//					reject("N");
//				});
//			} else {
//				resolve("N");
//			}
		
		});
		
		
	}
	
	function errorAlert(errorCode, errorMsg) {
		alert('[' + errorCode + '] ' + errorMsg);
	}
	
	/*
	 * 서버저장형 인증서 내부 처리 결과 전달
	 *
	 * @param requestParam
	 *
	 */
	async function sendInner(requestParam) {
		let encryptRes = await encryptData(partnerCrypto, requestParam.partnerData);
		
		if(encryptRes.ResultCode !== '0000'){
	        errorAlert(encryptRes.ResultCode, encryptRes.ResultMsg);
	        return;
	    }
	    
	    let param = {
			partnerData : encryptRes.encrypted
		};
	    
	    //iframe 답장
	    global_iframe.contentWindow.postMessage(param, global_serviceHost);
	}
	
	/*
	 * 서버저장형 인증서 처리 결과 전달
	 *
	 * @param requestParam
	 *
	 */
	module.send = async function(requestParam) {
		
		let encryptRes;
		if (typeof requestParam.partnerData !== 'undefined') {
			
			if("KICA" == _this.openType){
				encryptRes = await encryptData(serviceCrypto, requestParam.partnerData);
				requestParam.partnerData = encryptRes.encrypted;
			}else{
				encryptRes = await encryptData(serviceCrypto, requestParam.partnerData);
				requestParam.partnerData = encryptRes.encrypted;
				
				if(encryptRes.ResultCode !== '0000'){
			        errorAlert(encryptRes.ResultCode, encryptRes.ResultMsg);
			        return;
					
			    }
			}
			
		} else if (typeof requestParam.relayExtLoginTranData !== 'undefined') {
			requestParam.func = 'preExtLoginTran';
			if("KICA" == _this.openType){
				encryptRes = await encryptData(null, requestParam.relayExtLoginTranData);
				requestParam.relayExtLoginTranData = encryptRes.encrypted;
			}else{
				encryptRes = await encryptData(serviceCrypto, requestParam.relayExtLoginTranData);
				requestParam.relayExtLoginTranData = encryptRes.encrypted;
				
				if(encryptRes.ResultCode !== '0000'){
			        errorAlert(encryptRes.ResultCode, encryptRes.ResultMsg);
			        return;
			    }
		    }
		} 
		
	    //iframe 답장
	    global_iframe.contentWindow.postMessage(requestParam, global_serviceHost);
	}
	
	module.postMessage = async function(iframeObj, requestParam) {
		iframeObj.contentWindow.postMessage(requestParam, global_serviceHost);
	}
	
	/*
	 * 서버저장형 인증서 URL 초기화
	 *
	 * @param partnerHost
	 * @param serviceHost
	 *
	 */
	module.urlInit = async function(partnerHost, serviceHost){
	    global_partnerHost = partnerHost
	    global_serviceHost = serviceHost
	    
	    partnerCrypto = new atonCrypto();
	    serviceCrypto = new atonCrypto();
	}
	
	/*
	 * 서버저장형 인증서 키교환
	 *
	 * @param iframeObj
	 * @param apiNm
	 * @param callback
	 *
	 */
	module.keyExchange = async function(iframeObj, apiNm, callback) {
		
		global_keycallback = callback;
		
		//key 생성
	    let ret = await partnerCrypto.keyPairGen();
	    
	    // 생성된 키를 변수(오브젝트)에 추가, 이 때 return에 필요한 url이 필요하므로 partner_url도 추가하면 수월함.
	    let keyExchangeData = {};
	    keyExchangeData.clientNonce = ret.clientNonce;
	    keyExchangeData.clientPubKeyForECDH = ret.clientPubKeyForECDH;
	    keyExchangeData.clientPubKeyForECDSA = ret.clientPubKeyForECDSA;
	    
	    keyData.requestHandshake = keyExchangeData;
	    keyData.partnerUrl = global_partnerHost;
	    
	    //서비스페이지에 전달.
		iframeObj.src = global_serviceHost + "/" + apiNm;
		iframeObj.onload = function() {
			iframeObj.contentWindow.postMessage(keyData, global_serviceHost);
		}
		
		window.addEventListener('message', messageListener);
	}
	
	/*
	 * 서버저장형 인증서 키교환
	 *
	 * @param iframeObj
	 * @param apiNm
	 * @param callback
	 * TODO 함수 생성
	 */
	module.keyExchangeKica = async function(iframeObj, apiNm, callback) {
		
		global_keycallback = callback;		
		
		ibk_crypto.init();
		let keyExchangeData = {};
		keyExchangeData.clientNonce = ibk_crypto.getPub();		
		
	    keyData.requestHandshake = keyExchangeData;
	    keyData.partnerUrl = global_partnerHost;
	    
	    //서비스페이지에 전달.
		iframeObj.src = global_serviceHost + "/" + apiNm;
		iframeObj.onload = function() {
			iframeObj.contentWindow.postMessage(keyData, global_serviceHost);
		}
		
		window.addEventListener('message', messageListener);
	}
	
	
	/*
	 * 서버저장형 인증서 공통 호출
	 *
	 * @param iframeObj
	 * @param apiNm
	 * @param requestParam
	 * @param callback
	 *
	 */
	module.openCertSvc = async function(iframeObj, apiNm, requestParam, callback) {
		global_callback = callback;
		global_iframe = iframeObj;
		
		if("KICA" == _this.openType){
			if(_isRealApp) { 
				// comIbkCert.wsafeboxIframe에는 cmc_ids_common.js 콜 불가능
				$.nativeCall("getPushToken").done(function (dat) {
					requestParam.partnerData.getPushToken = dat["pushToken"];
					iframeObj.getPushToken = dat["pushToken"];
				});
			}else{
				requestParam.partnerData.getPushToken = "";
				iframeObj.getPushToken = "";
			}
			
			requestParam.partnerData.APP_USE_PTN_YN = await getUsePatternYn();
			
			requestParam.partnerData.deviceId = await getAccountDeviceId();
			
			global_iframe.src = global_serviceHost + "/" + apiNm;
			console.log("openCertSvc  global_iframe.src : ", global_iframe.src);
			
			if (apiNm === 'getCerts') {
				requestParam.partnerData.certSerl = await getCertSerlLocal();
				requestParam.partnerData.accountkey = await getAccoutKeyLocal();
				requestParam.partnerData.custId = await getCustIdLocal(); 
			}
			
			if (apiNm === 'renewCert') {
				requestParam.partnerData.accountkey = await getAccoutKeyLocal();
			}
			
			if (apiNm === 'noLoginRegSign') {
				let localCustId = await getCustIdLocal();
				//let localCertNo = await getCertSerlLocal();
				if (requestParam.partnerData.custId == localCustId) {
					requestParam.partnerData.accountkey = await getAccoutKeyLocal();
					requestParam.partnerData.custId = await getCustIdLocal();
				}
			}
			
			// 대외인증 자동연결
			if (apiNm === 'extNoLoginRegSign') {
				let localCustId = await getCustIdLocal();
				if (requestParam.partnerData.custId == localCustId) {
					requestParam.partnerData.certSerl = await getCertSerlLocal();
					requestParam.partnerData.accountkey = await getAccoutKeyLocal();
					requestParam.partnerData.custId = await getCustIdLocal();
				}
			}
			
			if (apiNm === 'corpChangeHpNo') {
				requestParam.partnerData.accountkey = await getAccoutKeyLocal();
			}
			
			module.keyExchangeKica(iframeObj, apiNm, function() {
				sendInner(requestParam);
			});	
			
     		//iframeObj.onload = function() {
			//	iframeObj.contentWindow.postMessage(requestParam, global_serviceHost);
      		//}
			//window.addEventListener("message", messageListener);
		}else{	 
			requestParam.partnerData.deviceId = await partnerCert.getDeviceId();
			if (apiNm === 'getCerts') {
				requestParam.partnerData.ref_token = await getRefTokenIdb(requestParam.partnerData.cust_type);
			}
			
			if (apiNm === 'renewCert') {
				requestParam.partnerData.ref_token = await partnerCert.getRefToken();
			}
		
			module.keyExchange(iframeObj, apiNm, function() {
				sendInner(requestParam);
			});
		}
	}
	
	/*
	 * 서버저장형 인증서 메시지 리스너
	 *
	 * @param event
	 *
	 */
	async function messageListener(event) {
		
		if(event.origin != global_serviceHost){
	    	return;
	    }
		
		messageData = await decryptData(serviceCrypto, event.data);
		console.log('### 서버저장형 인증서 메시지 리스너', messageData);
		
		// PARTNER -> 서비스 키교환
		if(messageData.responseHandshake){
			let keyData = messageData.responseHandshake;
		
			if("KICA" !== _this.openType){
				//ECDH 연산
			    let ret = await partnerCrypto.do_ECDH(keyData.clientPubKeyForECDH, keyData.clientPubKeyForECDSA, keyData.clientNonce);
			    
			    if(ret.ResultCode !== '0000'){
			        errorAlert(ret.ResultCode, ret.ResultMsg);
			        return;
			    }
			} else {
				ibk_crypto.deriveKey(keyData.clientNonce);
			}
			
		    global_keycallback();
		    
		    return;
	    }
	    
	    //서비스 서버 -> PARTNER 키교환
	    if (messageData.requestHandshake) {
			let handshakeData = messageData.requestHandshake;
	        
	        if("KICA" !== _this.openType){
				serviceCrypto = new atonCrypto();
	        
		        //키 생성
		        let keyPairGenData = await serviceCrypto.keyPairGen();
		        let data = {};
		        data.responseHandshake = keyPairGenData;
		        
		        //키 연산
		        let ecdhResponse = await serviceCrypto.do_ECDH_3rdparty(handshakeData.clientPubKeyForECDH, handshakeData.clientPubKeyForECDSA, handshakeData.clientNonce);
		        
		        if(ecdhResponse.ResultCode !== '0000'){
		            console.log('ecdh failed');
		        }else{
		            event.source.postMessage(data, global_serviceHost);
		        }
			} else {
				ibk_crypto.init();
				ibk_crypto.deriveKey(handshakeData.clientNonce);
				
				let data = {};
				data.responseHandshake = {clientNonce: ibk_crypto.getPub()};
				event.source.postMessage(data, global_serviceHost);
			}
	        
	        
	        return;
	    }
	    
	    if (messageData.func == 'saveRefToken') {
			partnerCert.saveRefToken(messageData);
			
			if (messageData.certAlias) {
				global_callback(messageData, event);
			}
			
			return;
	    }
	    
	    if (messageData.func == 'saveAccountKey') {
			partnerCert.saveAccountKey(messageData);
			
			if (messageData.certAlias) {
				global_callback(messageData, event);
			}
			
			return;
	    }
	    
	    // Aton용
	    if(messageData.removePartner && messageData.refToken){
			sessionStorage.removeItem(messageData.removePartner);
	    	
	        const resIdbData = await partnerCrypto.deleteIdbData("ref_token", messageData.removePartner, messageData.refToken);
	        
	        if (messageData.func === 'changeCert') {
		        if (typeof global_callback == 'function') {
					
					global_callback(messageData, event);
					
					window.removeEventListener('message', messageListener);
				}
			}
	        
	        return;
	    }
	    
	    // Kica용
	    if(messageData.removePartner && messageData.accountkey){   
	    	
	        await partnerCert.removeAccountKey(messageData.removePartner);
	        
	        if (messageData.func === 'changeCert') {
		        if (typeof global_callback == 'function') {
					
					global_callback(messageData, event);
					
					window.removeEventListener('message', messageListener);
				}
			}
	        
	        return;
	    }
		
		if (messageData.func) {
			if (typeof global_callback == 'function') {
				
				global_callback(messageData, event);
				
				if (messageData.func === 'close') {
					window.removeEventListener('message', messageListener);
				}
			}
		}
	}
	
    /*
	 * sessionStorage 에서 refToken 조회
	 */
	module.getRefToken = async function() {
		let refToken = '';
		
		if(sessionStorage.getItem('refToken')){
	    	refToken = sessionStorage.getItem('refToken')
	    }
		
		return refToken;
	}
	
	
	
	/*
	 * sessionStorage 에서 accountKey 조회
	 */
	module.getAccountKey = async function() {
		let accountKey = '';
		
		if(sessionStorage.getItem('accountkey')){
	    	accountKey = sessionStorage.getItem('accountkey')
	    }
		
		return accountKey;
	}
	
	/*
	 * IndexedDb에서 디바이스 정보 조회
	 */
	module.getDeviceId = async function() {
		const resDeviceIdbData = await partnerCrypto.restoreIdbData("ref_token", 'deviceId');
		
		let deviceId;
		
		if (resDeviceIdbData.resultCode == '0000') {
	        deviceId = resDeviceIdbData.data;
		} else {
			deviceId = "";
		}
		
		return deviceId;
	}
	
	return module;

}(window.partnerCert || {}, $));