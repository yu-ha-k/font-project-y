var _step_var = {
	scrollPosition : {}
};

(function() {
	var stepAttrs = {
		id        : "data-jx-step",
		no        : "data-jx-step-no",      //몇번째 step인지를 알려줌 ex) 1,2,3 순으로 증가
		defaultNo : "data-jx-step-default", //onload 되는 경우 처음에 띄워줄 step을 선언합니다. ex) data-jx-step-default="2"
		showYn    : "data-jx-step-showYn"   //step 노출 여부
	};
	
	var externPlugin = {
		effect   : "JEX_MOBILE_EFFECT",
		position : "JEX_MOBILE_POSITION",
		get : function($object, pluginId) {
			var obj = jex.getJexObj($object, pluginId);
			if(obj != null) return obj;
			else return $object;
		}
	};

	var JexMobileStep = JexPlugin.extend({
		init : function() {
			this.setStepNo(1);
			this.stepStack = new Array();
			this.setPrevStepNo(1);
			this.speed = 100;
		},
		load : function(attr, $jq) {
			this.$object = $jq;
			var _this = this;
			this.id	= this.$object.attr(stepAttrs.id);
			this.defaultNo = parseInt(this.$object.attr(stepAttrs.defaultNo));
			if(this.defaultNo){
				this.setStepNo(this.defaultNo);
				this.setPrevStepNo(this.defaultNo);
			}
			this.firstNo = 1;
			this.lastNo = this.getLastStepNo();
			
			if(this.$object.attr(stepAttrs.showYn) == "N") {
				this.hideAll();
			}
			else {
				this.showStep(this.no);
			}
		},
		execute : function(event, $jq) {
			this.showStep(this.no);
		},
		setAll : function(dat){
			jex.setAll(this.$object, dat, this.formatter, false);
		},
		/* 모든 step을 숨김 */
		hideAll : function(){
			var $curStep = this.$object.find("["+stepAttrs.no+"]");
			$curStep.hide();
		},
		/* stepNo에 대한 Step으로 이동 */
		showStep : function(stepNo, effect){
			if("string" == typeof(stepNo)){
				stepNo = parseInt(stepNo);
			}
			
			_step_var.scrollPosition["" + this.getStepNo()] = this.getScrollPosition();
			
			this.setPrevStepNo(this.getStepNo());
			this.setStepNo(stepNo);
			this.hideAll();
			var $curStep = this.$object.children('['+stepAttrs.no+'="'+this.getStepNo()+'"]');
			var effectPlugin = externPlugin.get($curStep, externPlugin.effect);
			
			//함수호출시 직접 effect를 지정한경우
			if(undefined != effect){
				if(effect == "back") {
					effectPlugin.show();
					
					if(isEmpty(_step_var.scrollPosition["" + this.getStepNo()]) == false && _step_var.scrollPosition["" + this.getStepNo()] != 0) {
						this.scrollPositionStep(stepNo);
					}
					else {
						this.moveScrollTop();
					}
					
					return;
				}
				else {
					effect = effect.split("@");
					if(2 == effect.length){
						$curStep.show("slide",{"direction":effect[1]},this.speed);
						
						this.moveScrollTop();
						
						return;
					}
				}
			}// attribute로 effect가 지정되어있는 경우
			else if("function" == typeof(effectPlugin.getOptionOfEffect)){	
				var optionOfEffect = effectPlugin.getOptionOfEffect();
				if("undefined" == typeof(optionOfEffect.direction)){		//호출한 step의 방향으로 slide
					optionOfEffect.direction = "right";
				}
				var option = this.getDirection(optionOfEffect);
				effectPlugin.show("slide",option);
				
				this.moveScrollTop();
				
				return;
			}
			
			effectPlugin.show();
			
			this.moveScrollTop();
		},
		/* 현재 스텝의 스크롤 위치를 반환 */
		getScrollPosition : function() {
			return $(window).scrollTop();
		},
		/* 스크롤 기억 및 기억된 스크롤 위치로 이동 */
		scrollPositionStep : function(idx) {
			if(idx==undefined || idx==""){
				idx = jex.plugin.get("JEX_MOBILE_STEP").getPrevStepNo();
			}
			var ps = _step_var.scrollPosition["" + idx];
			
			if(ps != undefined && ps != 0) {
				$(window).scrollTop(ps);
			}
		},
		/* 이전에 호출했던 페이지로 이동 */
		showPrevCallStep: function(effect){
			MobPopup.hideErrorPopupForBack();
			var preStep = this.getPrevStepNo();
			this.hideAll();
			var $curStep = this.$object.children('['+stepAttrs.no+'="'+this.getStepNo()+'"]');
			var $preStep = this.$object.children('['+stepAttrs.no+'="'+preStep+'"]');
			var effectPlugin = externPlugin.get($curStep, externPlugin.effect);
			var preEffectPlugin = externPlugin.get($preStep, externPlugin.effect);
			this.setStepNo(preStep);
			// 함수 호출시 직접 effect 입력한 경우
			if(undefined != effect){
				effect = effect.split("@");
				if(2 == effect.length){
				//preEffectPlugin.initEffect(effect);
					$preStep.show("slide",{"direction":effect[1]},this.speed);
					this.scrollPositionStep(preStep);
					return;
				}
			}// attribute로 effect가 지정되어있는 경우
			else if("function" == typeof(effectPlugin.getOptionOfEffect)){
				var optionOfEffect = effectPlugin.getOptionOfEffect();
				if("undefined" == typeof(optionOfEffect.direction)){			// 호출한 step의 반대방향으로 slide
					optionOfEffect.direction = "left";
				}
				var option = this.getOppositDirection(optionOfEffect);
				preEffectPlugin.show("slide",option);
				this.scrollPositionStep(preStep);
				return;
			}
			preEffectPlugin.show();
			this.scrollPositionStep(preStep);
		},
		/* step 페이지번호 set */
		setStepNo : function(stepNo){
			this.no = parseInt(stepNo);
			try{
				$.nativeCall('refreshSession');
			}catch(e){}
		},
		/* step 페이지번호 get */
		getStepNo : function(){
			return this.no;
		},
		/* [내부함수] pre step 페이지번호 set */
		setPrevStepNo : function(prevStepNo){
			this.stepStack.push(parseInt(prevStepNo));
			//this.prevNo = parseInt(prevStepNo);
		},
		/* [내부함수] pre step 페이지번호를 get */
		getPrevStepNo : function(){
			if(this.stepStack.length > 0 ){
				return this.stepStack.pop();
			}// 이전 step이 더이상 없는 경우에는 현제 step 반환
			else{
				return this.no;
			}
		}
		,getLastStepNo: function(){
			return parseInt(this.$object.children('['+stepAttrs.no+']').last().attr(stepAttrs.no));
		}
		
		/* showStep 함수 호출시에는 항상 왼쪽->오른쪽, 아래-> 위로 이동하도록 처리 */
		,getDirection: function(optionOfEffect){
			if("left" == optionOfEffect.direction){
				optionOfEffect.direction = "right";
			}else if("right" == optionOfEffect.direction){
				optionOfEffect.direction = "right";
			}else if("up" == optionOfEffect.direction){
				optionOfEffect.direction = "down";
			}else if("down" == optionOfEffect.direction){
				optionOfEffect.direction = "down";
			}
			
			return optionOfEffect;
		}
		/* 이전버튼 클릭한경우는 항상 오른쪽->왼쪽, 위-> 아래로 이동하도록 처리 */
		,getOppositDirection: function(optionOfEffect){
			if("left" == optionOfEffect.direction){
				optionOfEffect.direction = "left";
			}else if("right" == optionOfEffect.direction){
				optionOfEffect.direction = "left";
			}else if("up" == optionOfEffect.direction){
				optionOfEffect.direction = "up";
			}else if("down" == optionOfEffect.direction){
				optionOfEffect.direction = "up";
			}
			
			return optionOfEffect;
		},
		/* 스텝영역의 상위로 화면을 올려줍니다. */
		moveScrollTop : function(){
			var _this = this;
			$("html,body").animate({
				scrollTop:0
			}, 0, function(){
				//_this.resetPositionPopup();
				$("html,body").clearQueue();
			});
		}
	});

	jex.plugin.add("JEX_MOBILE_STEP", new JexMobileStep(), stepAttrs.id);
})();