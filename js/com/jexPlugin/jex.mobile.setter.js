/*
 */
(function() {
	var JexMobileSetter = JexPlugin.extend({
		init : function() {
			this.options = {
					id		: "data-jx-setter",
				source		: "data-jx-setter-source",		// data를 가져올 영역 (jquery 형식) 
				target		: "data-jx-setter-target",		// data를 보여줄 영역 (여러개 가능: ','로 구분)
				onload		: "data-jx-setter-onload",		// onload시 실행할 것인시 여부 true/false
				handler 	: "data-jx-setter-handler",	    // source의 영역의 data를 사용자가 컨트롤하고싶은 경우 사용하는 함수
				executer	: "data-jx-setter-execute"		// data set 이후에 처리하기위한 옵션
			};
			this.source = "body";
		},
		initLoad : function(attr, $jq){
			this.setFromOptions("source", $jq.attr(this.options.source));
			this.setFromListOptions("targets", $jq.attr(this.options.target));
			this.executer = $jq.attr(this.options.executer);
		},
		load : function(attr, $jq) {			
			this.$object = $jq;
			this.onload = ("true" == $jq.attr(this.options.onload))?true:false;
			this.handler = $jq.attr(this.options.handler);
			this.initLoad(attr, $jq);
			if(this.onload)		this.set($jq);
		},
		execute : function(evt, $jq){
			this.set($jq);
		},
		set : function($jq){
			
			var sourceData = jex.getAll(this.source);
			var tempSourceData = {};
			if(undefined != this.handler){	// handler가 있는 경우에만 return된 data를 setAll 함
				var setterFunc = this.handler;
				setterFunc = setterFunc.substring(0,this.handler.indexOf("(")) +"($jq,sourceData)";
				sourceData = eval(setterFunc);
				this.initLoad(this.options.id, $jq);
			}
			
			if( "STOP" == sourceData){
				return;
			}
			
			for(var i=0; i < this.targets.length; i++){
				jex.setAll(this.targets[i], sourceData);
			}
			
			if(undefined != this.executer){
				jex.bindExecuter(this.executer, "Setter Executer", this.$object);
			}
		},
		setFromOptions : function(key, attr){
			if(attr == null)			return;
			if("this" == attr){
				this[key] = this.$object;
			}else if(attr.startsWith("parent")){
				var parents = attr.split(".");
				var $object = this.$object;
				for(var i = 0, length = parents.length; i < length; i++){
					var parent = $object.parent();
					if(parent != null)		$object = parent;
				}
				this[key] = $object;
			}else{
				this[key] = attr;
			}
		},
		setFromListOptions : function(key,userAttr){
			var attrList = "";
			var attr = "";
			this[key] = new Array();
			
			if(undefined != userAttr && null != userAttr){
				attrList = userAttr.split(",");
			}else{
				this[key][0] = "body";
			}
			for(var i=0; i < attrList.length; i++){
				attr = attrList[i];
				if("this" == attr){
					this[key][i] = this.$object;
				}else if(attr.startsWith("parent")){
					var parents = attr.split(".");
					var $object = this.$object;
					for(var i = 0, length = parents.length; i < length; i++){
						var parent = $object.parent();
						if(parent != null)		$object = parent;
					}
					this[key][i] = $object;
				}else{
					this[key][i] = attr;
				}
			}
		}
		
	});
	jex.plugin.add("JEX_MOBILE_SETTER",	JexMobileSetter, "data-jx-setter");
})();