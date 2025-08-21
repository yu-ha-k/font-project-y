var KIUP_GLOVAL_DATA = {};
if (!window.pageJobs2) window.pageJobs2 = undefined;
(function() {
	/**
	 * 서비스를 호출합니다.
	 */
	this.option_attr = {
			"id"			: "data-jx-svc"						//호출할 svc 명
			,"onload"		: "data-jx-svc-onload"				//[option] onload시 처리 여부 true/false
			,"source"		: "data-jx-svc-source"				//[option] SVC 호출 전 input
			,"sourceDirect" : "data-jx-svc-source-direct"		//[option] SVC 호출 전 input (JSON)
			,"taskPackage"	: "data-jx-svc-package"				//SVC 호출시 package 명 ex)inq , SubPackage 있는 경우 fnt_inq
			,"target"		: "data-jx-svc-target"				//[option] SVC 호출후 data settnig 영역
			,"targetMethod" : "data-jx-svc-target-method"		//[option] setAll이 아닌 함수를 사용해야하는 경우. target에 대한 method 정의 ex)addNRow
			,"formcheck"	: "data-jx-svc-formcheck"			//[option]
			,"executer"		: "data-jx-svc-execute"				//[option] SVC 호출후 처리사항
			,"handlerIn"	: "data-jx-svc-handler-in"			//[option] SVC 수행전 처리사항을 처리합니다. ajax input data 셋팅
			,"handlerOut"   : "data-jx-svc-handler-out"			//[option] SVC 호출 후 값을 넣어주기 전에 처리할 사항이 있는 경우 사용합니다. ex) ajax output 값 셋팅
			,"saveKey"		: "data-jx-svc-save-key"			//[option] SVC 호출 후 결과값을 KIUP_GLOVAL_DATA[key]로 저장합니다.
			,"errTrx"		: "data-jx-svc-errtrx"				//[option] error 개별처리 여부 
			,"isCall"		: "data-jx-svc-iscall"				//[option] SVC 호출여부 - (def:true)
		};
	
	var jexMobileSvc = JexPlugin.extend({
		init					: function() {
		}, 
		/* 세번째 인자인 jobManager는 procedure에서 플러그인을 생성할 때만 넣어준다. */
		load				: function(attr, $jq, jobManager) {
			this.initLoad(attr, $jq, jobManager);
			if (this.onload) this.execute_service($jq);
		},
		// attribute를 셋팅해줍니다.
	    initLoad : function(attr, $jq , jobManager){
	    	this.$object= $jq;
	    	this.svc = $jq.attr(attr);
	    	this.setSessionAttr();
			this.onload = ("true"==$jq.attr(option_attr.onload));
			var formcheck = $jq.attr(option_attr.formcheck);
			this.formcheck = !(formcheck && formcheck == "false");
						 
			this.taskPackage = $jq.attr(option_attr.taskPackage);
			this.taskPackageOrg = this.taskPackage;
			if(this.taskPackage){
				var packages = this.taskPackage.split("_");
				if(packages.length > 1){
					this.taskPackage = packages[0];
					this.taskSubPackage = packages[1];
				}
			}
			
			this.sourceDirect = $jq.attr(option_attr.sourceDirect);// jsonObject
			this.setSource($jq); 
			this.sourceData = undefined;
			this.targets = !$jq.attr(option_attr.target)?"":$jq.attr(option_attr.target);
			this.targets = this.targets.split(",");
			this.targetKeys = new Array();
			for(var i=0 ; i < this.targets.length; i++){	// target 셋팅
				this.setTarget(this.targets[i],i);
			}
			this.eexecute	= $jq.attr(option_attr.executer);		// #DIV_ID
			if (this.eexecute != null) 	this.eexecuteList = this.eexecute.split(",");
			
			this.targetMethod = !$jq.attr(option_attr.targetMethod)?undefined:$jq.attr(option_attr.targetMethod);
			if(undefined != this.targetMethod){
				this.targetMethod = this.targetMethod.split(",");
			}
			
			this.handlerIn = $jq.attr(option_attr.handlerIn);
			this.handlerOut = $jq.attr(option_attr.handlerOut);
			this.saveKey = $jq.attr(option_attr.saveKey);
			this.errTrx = ("false" == $jq.attr(option_attr.errTrx))?false:true;
			// session 가져오도록 설정하는 경우
			this.isCall = ("false" == $jq.attr(option_attr.isCall))?false:true;
			this.jobManager = jobManager?jobManager:undefined;
		},
		execute : function(evt,$jq) {
			this.execute_service($jq,evt);
		},
		execute_service : function($jq, evt) {
			var self = this;
			
			/* svc 호출 후 */
			var ajaxSuccessFn = function(dat){
				//error발생하면서 개별로 error처리하도록 설정하지 않은 경우, 이후의 서비스 호출을 모두 중단
				if (jex.isError(dat) && this.errTrx) {
					if (self.jobManager != undefined ) {
						self.jobManager.clear();
						self.jobManager.stop();
					}
				}
				
				if(self.saveKey){
					KIUP_GLOVAL_DATA[self.saveKey] = dat;
				}
				
				//각각의 target에 data setting
				for(var i=0; i < self.targets.length; i++){
					var resultData = self.getTargetData(dat, i);
					if(self.handlerOut){							//후처리 함수가 있는 경우
						var afterFunction = self.handlerOut;
						self.handlerOut = afterFunction.substring(0,afterFunction.indexOf("(")) +"($jq, resultData, i)";
						resultData = eval(self.handlerOut);
					}
					//error 인경우 이후의 처리 중단
					if(undefined == resultData || "STOP_SVC" == resultData ){	// STOP_SVC : 서비스 수행을 중단함.
						if (self.jobManager != null) {
							self.jobManager.clear();
							self.jobManager.stop();
						}
						return;
					}
					
					self.initLoad("data-jx-svc", self.$object, self.jobManager);
					if(self.targets[i]){
						if ("undefined" != typeof(self.targetMethod)) {
							jex.setAll(self.targets[i], resultData, undefined, true, self.targetMethod[i]);
						} else {
							jex.setAll(self.targets[i], resultData, undefined, true);
						}
					}
				}
				
				//svc 수행이후 처리되야 하는 것
				jex.bindExecuter(self.eexecute, "Svc Executer", self.$object);
				
				//procedure을 통해 호출된경우  하나의 svc가 모두 처리되었음을 알림.
				if (self.jobManager != null) {
					self.jobManager.stop();
				}
			};
			
			/* 서비스 호출 전 */
			var jobFunction = function(){
				var tmpSourceData = undefined;
				self.sourceData = jex.getAll(self.source);
				if(self.handlerIn){	//ajax 호출 전의 전에 전처리함수가 있는 경우 호출
					var beforeFunction = self.handlerIn;
					self.handlerIn = beforeFunction.substring(0,beforeFunction.indexOf("(")) +"($jq,self.sourceData)";
					tmpSourceData = eval(self.handlerIn);
				}
				
				self.initLoad("data-jx-svc", self.$object, self.jobManager);
				
				//initLoad시 return 된 데이터가 없어져서 임시저장해둠
				self.sourceData = tmpSourceData;
				
				if("ALLSTOP" == self.sourceData){
					if (self.jobManager != null) {
						self.jobManager.clear();
						self.jobManager.stop();
					}
					return;
				}
				
				// 호출하라고 설정된 경우만 ajax svc 호출
				if(self.isCall){
					var service = $.trim(self.svc);
					window.pageJobs2 = self.jobManager;
					var ajax = jex.createAjaxUtil(service);
					/* 입력값 셋팅 */
					if(self.taskPackage){
						ajax.set("task_package",self.taskPackage);
						
						if(self.taskSubPackage){
							ajax.set("task_subpackage",self.taskSubPackage);
						}
					}
					
					// jsonObjectString 형태로 직접 입력받은 경우
					if(self.sourceDirect){ ajax.set(JSON.parse(self.sourceDirect));	}
					// handler in 함수에서 return 받은 데이터가 있는 경우
					if(typeof(self.sourceData)!='undefined'){ ajax.set(self.sourceData); }
					// jquery Object 를 입력받은 경우
					else if(self.source){ ajax.set(jex.getAll(self.source)); } 
					ajax.setErrTrx(self.errTrx);
					
					ajax.execute(ajaxSuccessFn);
				}
				else {
					if(self.jobManager != null) self.jobManager.stop();
				}
			};
			
			jobFunction();
		},
	    getAttrArray : function($jq,attr){
	    	var attrList = new Array();
	    	var attrStr = $jq.attr(attr);
	    	if (null != attrStr){
	    		attrList = attrStr.split(",");
	    		for(var i = 0; i < attrList.length; i++){
	    			console.log("attrList["+i+"]:"+attrList[i]);
	    		}
	    	}
	    	return attrList;
	    },
		checkForm : function(){		
			if(this.formcheck){
				var checker = jex.plugin.get("MOBILE_FORM_CHECKER");
				if(!checker){
					//alert("MOBILE_FORM_CHECKER가 정의되지 않았습니다.");
					//return false;
					return true;
				}
				var msg = checker.check(this.source);
				
				if(!msg || msg.length == 0)			return true;
				else{
					alert(msg);
					return false;
				}
			}else{
				return true;
			}
			
			return false;
		},
		setSource : function( $jq ){
			var source = $jq.attr(option_attr.source);
			if (!source) {
				;
			} else if ("this" == source) { 
				this.source =  $jq;
			}else if (source.startsWith("parent")) {
				if ( "parent" == source ) {
					this.source = $jq.parent();
				} else {
					var parents = source.split(".");
					if (parents.length > 1) {
						var tmpSrc = $jq;
						var check  = true;
						for (var jj=0; jj<parents.length; jj++) {
							tmpSrc = tmpSrc.parent();
							if ("parent" != parents[jj]) {
								check = false;
								break;
							}
						}
						if (check) this.source = tmpSrc;
					}
				}
			}else{
				this.source = source;
			}
		},
		setTarget : function(userInput, index){
			if(userInput == null)       return;
		    var arr = userInput.split("@");
		    
		    // target 설정
		    this.targets[index] = arr[0];	
		    if (!this.targets[index]){	//target이 없는 경우
		    	this.targets[index] = undefined;
		    }else if ("this"==this.targets[index]) { 	// target이 this 인경우
		    	this.target[index] = $jq;
		    }else if (this.targets[index].startsWith("parent")) {
				if ( "parent" == this.targets[index] ) {
					this.targets[index] = $jq.parent();
				} else {
					var parents = this.targets[index].split(".");
					if (parents.length > 1) {
						var tmpSrc = $jq;
						var check  = true;
						for (var jj=0; jj<parents.length; jj++) {
							tmpSrc = tmpSrc.parent();
							if ("parent" != parents[jj]) {
								check = false;
								break;
							}
						}
						if (check) this.targets[index] = tmpSrc;
					}
				}
			}
		    
		    if (arr[1] == null || arr[1] === "")    return;
		    // targetKeys 설정
		    this.targetKeys[index] = arr[1];	
		},
	    getTargetData : function(data, targetIndex){
	    	if (this.targetKeys[targetIndex] == null || data == null)      return data;
	    	var keys = this.targetKeys[targetIndex].split(".");
	    	var result = data;
	    	var index = -1;
	    	for(var i = 0; i < keys.length; i++){
	    		var key = keys[i];
	    		if(0 < key.indexOf("[")){
	    			key = key.substring(0,key.indexOf("["));
	    			index = keys[i].substring(keys[i].indexOf("[")+1,keys[i].length-1);
	    		}
	    		if (result[key] != null){
	    			if( -1 == index){
	    				result = result[key];
	    			}else{
	    				result = result[key][index];
	    			}
	    		} else {
	    			return data;
	    		}
	    	}
	    	return result;
	    },
	    setSessionAttr : function(){
	    	if("@ComSession" == this.svc || 
	    	"@ComUserSession" == this.svc ||
	    	"@BankList" == this.svc ||
	    	"@BankList2" == this.svc
	    	){
	    		var plugin		= jex.plugin.get("JEX_MOBILE_SESSION");
	    		if (typeof(plugin) == "function") plugin = jex.plugin.newInstance("JEX_MOBILE_SESSION");
	    		if (typeof(plugin.load) == "function"){
	    			plugin.load(svc_attr.id, this.$object);
	    		}
	    		this.svc = this.$object.attr(option_attr.id);
			}
	    },
	    clearAttr : function(){
			var self = this;
			for (key in option_attr) {
				var attr = option_attr[key];
				self.$object.removeAttr(attr);
			}
		}
	});
	jex.plugin.add("JEX_MOBILE_SVC",	jexMobileSvc, "data-jx-svc");
})();
