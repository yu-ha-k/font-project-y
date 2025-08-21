(function() {
	/**
	 * 
	 * 
	 */
	var jexMobileExecuter = JexPlugin.extend({
		init : function() {
		},
		initLoad : function(attr, $jq){
			this.action = $jq.attr("data-jx-execute");
			this.target = $jq.attr("data-jx-execute-target");
			this.checker= $jq.attr("data-jx-execute-checker");
		}, load : function(attr, $jq) {
			var _executer_this = this;
			this.initLoad(attr, $jq);
			
			$jq.on(this.action, function(evt) {
				//_executer_this.initLoad("data-jx-execute", $jq);
				//ADD 20130516 from kiup 이벤트 중복방지
				var eventRef = (typeof evt !== "undefined")? evt: event;
				if (eventRef.stopPropagation){
					evt.stopPropagation();
				}
				else {
					eventRef.cancelBubble = true;
				}
				//END 
				
				jex.set("_jex_last_evt",$jq);
				jex.printDebug("Executer :: " + _executer_this.action + ", _executer_this :: "+ _executer_this.checker +", _executer_this.target :: " + _executer_this.target);
				
				if (_executer_this.checker) {
					try {
						jex.bindExecuter(_executer_this.checker,evt,$jq);
					} catch (e) {
						jex.checkException(e);
						return;
					}
				}
				
				var target;
				if (!_executer_this.target)	target = $jq;
				else 							target = _executer_this.target;
				try {
					jex.bindExecuter(target,evt,$jq);
				} catch (e) {
					jex.checkException(e);
					return;
				}
			});
		}
	});
	jex.plugin.add("JEX_MOBILE_EXECUTER",	jexMobileExecuter, "data-jx-execute");
})();