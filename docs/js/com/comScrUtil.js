var comScrUtil = {
	/**
	 * @description 쿠콘 스크래핑
	 * @param params    : 파라미터
	 * @param scb       : 정상처리 콜백함수
	 * @param fcd       : 오류처리 콜백함수
	 */
	doScraping : function(params, scb, fcb, dummy){
		var moduleName = {
			"hometax" : "국세청",
			"minwon" : "정부24",
			"cardsales" : "여신금융협회"
		}
		
		var modules = [];
		var resultOutput = {};
		
		var inputParams = [];
		
		try{
			$(params).each(function(i, param) {
				var module = param['Module'].toLowerCase();
				var job = param['Job'];
				
				if(modules.indexOf(moduleName[module]) == -1){
					modules.push(moduleName[module]);
				}
				
				var tempParam = JSON.parse(JSON.stringify(param));
				if(["공인인증서등록", "로그인", "FIN_CERT"].includes(job)){
					tempParam['Input'] = {};
				}
				inputParams.push(tempParam);
				
				if((_isDevMode === true && dummy) || !_isRealApp) {
					
					var tempParam = {};

					if( ["hometax", "minwon"].includes(module) && ["공인인증서등록", "로그인"].includes(job) && param['Input']['로그인방식']=="FIN_CERT"){
						tempParam = comScrUtil.dummyTemplate.hometax['금융인증서'];
					}else if(comScrUtil.dummyTemplate[module][job] != null ){
						tempParam = comScrUtil.dummyTemplate[module][job];
					}else{
						tempParam = comScrUtil.dummyTemplate['default'];
					}
					
					resultOutput["Output"+(i+1)] = tempParam;
				}
			});
		}catch(err){
			comScrUtil.saveScrpLog(inputParams,[err.message]);
			fcb(dat);
		}
		
		
		//로딩바는 하이브리드 로띠로 변경
		if((_isDevMode === true && dummy) || !_isRealApp) {
			if(dummy){
				resultOutput = dummy;
			}
			
			this.saveScrpLog(params, resultOutput);
			setTimeout(function(){
				scb(resultOutput);
			},3000);
			return;
		}
		
		$.nativeCall("doScraping", params).done(function(dat) {
			if(_isDevMode){
				console.log(params);
			}
			comScrUtil.saveScrpLog(inputParams, dat);
			scb(dat);
		}).fail(function(dat) {
			//실패 output 예시
			//{"ErrorMessage":"For Input string:"8000F106""}
			comScrUtil.saveScrpLog(inputParams, dat);
			fcb(dat);
		});
	}

	,saveScrpLog : function(input, output){
		var ajax = jex.createAjaxUtil("com_utl_080101_2");
		ajax.set("task_package", "com");
		ajax.set("task_subpackage", "utl");
		ajax.setAsync(false);
		ajax.errorTrx = false;
		ajax.set("SCRP_LOG_INPUT", JSON.stringify(input));
		ajax.set("SCRP_LOG_OUTPUT", JSON.stringify(output));
		
		//결과값 처리
		ajax.execute(function(dat) {});
	}
	,dummyTemplate : {
		"hometax":{
			"금융인증서" : {
				"ErrorCode": "00000000",
				"ErrorMessage": "",
				"Result": {
					"CallBackfunc":"FIN_CERT",
					"req":{
						"API":"FIN_CERT",
						"SignParam":[
							{
								"signFormat":{
									"type":"PKCS1",
									"PKCS1Info":{
										"includeR":true
									}
								},
								"view":{
									"lastAccessCert":true
								},
								"content":{
									"binary":{
										"binaries":[
											"gM1bEfS0_-kjse1ZhakJRZy_BBU"
										]
									}
								},
								"info":{
									"signType":"01"
								}
							}
						]
					}
				}
			}
		},
		"minwon":{
			"행정구역검색":{
				ErrorCode: "00000000",
				ErrorMessage: "",
				Result: {
					행정구역목록: [
						{
							시도: "서울특별시",
							시군구: ["강남구", "강동구", "강서구"]
						},
						{
							시도: "경기도",
							시군구: ["부천시", "용인시 기흥구", "용인시 수지구"]
						},
						{
							시도: "제주특별자치도",
							시군구: ["서귀포시", "제주시"]
						},
						{
							시도: "세종특별자치시",
							시군구: []
						}
					]
				}
			}
		},
		"cardsales":{
			
		},
		"default": {
			"ErrorCode": "00000000",
			"ErrorMessage": "",
			"Result": {}
		},
	}
}