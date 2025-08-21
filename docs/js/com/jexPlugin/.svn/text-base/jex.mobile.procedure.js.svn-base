(function() {
	/**
	 * 서비스 여러개를 호출할 수 있도록 해주는 플러그인입니다.
	 */
	this.procedure_attr = {
		 "id"		: "data-jx-procedure",
		 "svc"		: "data-jx-procedure-svc",				//[required] svc에 대한 모든 설정값이 들어있는 attribute. svc의 개수대로 뒤에 1,2,3... 숫자를 붙여진 attribute에 각 svc의 설정을 해줍니다.
		 "onload"	: "data-jx-procedure-onload"			//[option] procedure onload 여부 true/false
	};
	
	this.svc_attr = {
		"id"			: "data-jx-svc"						//[required] action명
		,"taskPackage"	: "data-jx-svc-package"				//[required] SVC 호출시 package 명 ex)inq
		,"onload"		: "data-jx-svc-onload"				//[option] onload시 처리 여부 true/false
		,"source"		: "data-jx-svc-source"				//[option] SVC 호출 전 input
		,"sourceDirect" : "data-jx-svc-source-direct"		//[option] SVC 호출 전 input (JSON)
		,"target"		: "data-jx-svc-target"				//[option] SVC 호출후 data settnig 영역
		,"formcheck"	: "data-jx-svc-formcheck"		
		,"executer"		: "data-jx-svc-execute"				//[option] SVC 호출후 처리사항
		,"handlerIn"	: "data-jx-svc-handler-in"			//[option] SVC 수행전 처리사항을 처리합니다. ajax input data 셋팅
		,"handlerOut"   : "data-jx-svc-handler-out"			//[option] SVC 호출 후 값을 넣어주기 전에 처리할 사항이 있는 경우 사용합니다. ex) ajax output 값 셋팅
		,"saveKey"		: "data-jx-svc-save-key"			//[option] SVC 호출 후 결과값을 GIUP_GLOVAL_DATA[key]로 저장합니다.
		,"sync"			: "data-jx-svc-sync"				//[option] SVC가 여러개인 경우 sync 여부 true/false
	};
	
	var JexMobileProcedure = JexPlugin.extend({
		init : function() {
			this.svcList = [];
		}, 
		load : function(attr, $jq) {
			this.$object = $jq;
			this.jobManager = new _JexJobManager();
//			this.ouload = "true" == $jq.attr(procedure_attr.onload)?true:false;
			this.initSvc();
			
			if ("true" == $jq.attr(procedure_attr.onload)){
				this.execute();
			}
		},
		execute : function(){
			var self = this;
			
			/**
			 *  jex.core 에서 job.apply() 이후에 _this.trans:true 는 누가 바꿔주나? true라서 finally가 실행이 안됨.
			 */
			
			this.jobManager.onFinally(function(){
			  // 각 job이 종료될 때마다 실행될 핸들러
				if("undefined" != typeof(jex.getJexObj(self.$object,"JEX_MOBILE_PROCEDURE"))){
					jex.rmJexObj(self.$object, "JEX_MOBILE_SVC");
					self.clear();
				}
			});
			
			$.each(self.svcList, function(i, v){
				var service = function(){
					var plugin;
					self.jobManager.start();
					self.clear();
					
					self.parse(svc_attr.id, v);
					
					plugin		= jex.plugin.get("JEX_MOBILE_SVC");
					if (typeof(plugin) == "function") plugin = jex.plugin.newInstance("JEX_MOBILE_SVC");
					if (typeof(plugin.initLoad) == "function"){
						plugin.load(svc_attr.id, self.$object, self.jobManager);
					}
					
				};
				//service();
				self.jobManager.add(service);
			});
			
		},
		initSvc : function(){
			var i = 1;
			while (true) {
				var svc = this.$object.attr(procedure_attr.svc + i);
				if (null == svc)		break;
				
				this.svcList.push(svc);
				
				i = i + 1;
			}
		},
		parse : function(prefix, userInput){
			var attrList = userInput.split(";");
			var self = this;
			
			for (var indexOfAttrList = 0, lengthOfAttrList = attrList.length; indexOfAttrList < lengthOfAttrList; indexOfAttrList++ ){
				var item = attrList[indexOfAttrList].trim();
				
				var attr = [];
				if (item.startsWith("source-direct")){
					var index = item.indexOf(":");
					attr.push("source-direct");
					attr.push(item.substring(index + 1).trim());
				} else {
					attr = item.split(":");
				}
				
				if (attr.length != 2)	continue;
				
				var attrKey = attr[0].trim();
				var attrValue = attr[1].trim();
				
				if ("svc" == attrKey) {
					attrKey = prefix;
				} else {
					attrKey = prefix + "-" + attrKey;
				}
				
				self.$object.attr(attrKey, attrValue);
			}
			
			self.$object.attr(prefix + "-sync", "true");
			self.$object.attr(prefix + "-onload", "true");
			//self.$object.attr(prefix + "-onload", this.onload);
		},
		service : function(){
			var plugin		= jex.plugin.get("JEX_MOBILE_SVC");
			if (typeof(plugin) == "function") plugin = jex.plugin.newInstance("JEX_MOBILE_SVC");
			
			if (typeof(plugin.initLoad) == "function"){
				plugin.initLoad(svc_attr.id, this.$object, this.jobManager);
			}
		},
		clear : function(){
			var self = this;
			for (key in svc_attr) {
				var attr = svc_attr[key];
				self.$object.removeAttr(attr);
			}
		}
	});
	
	jex.plugin.add("JEX_MOBILE_PROCEDURE",	JexMobileProcedure, procedure_attr.id);
})();
