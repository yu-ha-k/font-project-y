/**
 * User: kwakyc
 * Date: 13. 4. 18.
 * Time: 오후 6:28
 *
 * @namespace JexMobileEffect
 *
 * @example <div .. data-jx-effect="It is yours">
 *
 */
(function () {
    var effectAttrs = {
        id: "data-jx-effect"
    };

    var JexMobileEffect = JexPlugin.extend({
        init: function () {
            this.allowedEffect = {
                blind: {},
                bounce: {},
                clip : {},
                drop : {},
                explode : {},
                fade : {},
                fold : {},
                highlight: {},
                puff : {},
                pulsate : {},
                scale : {  	percent : 0  },
                shake : {},
                slide : {
                    "right" :"direction"
                    ,"up"   :"direction"
                    ,"down" :"direction"
                    ,"left" :"direction"
                },
                transfer : {}
            };

            this.effect = "";
            this.optionOfEffect = {};
            this.speed = 100;
        },
        /**
         * @method load
         * data-jx-effect 에 해당하는 속성 값이 읽혀질 때 호출되는 메소드
         */
        load: function (attr, $jq) {
            this.$object = $jq;

            this.initEffect($jq.attr(effectAttrs.id));
        },
        show : function(effect, option){
        	if(typeof effect == "string" && effect.length > 0){
        		this.$object.show(effect, option,this.speed);
        	}else{
        		this.$object.show(this.effect, this.optionOfEffect,this.speed);
        	}
        },
        hide : function(effect, option){
        	if(typeof effect == "string" && effect.length > 0){
        		this.$object.hide(effect, option,this.speed);
        	}else{
        		this.$object.hide(this.effect, this.optionOfEffect,this.speed);
        	}
        },
        /**
         *  private method
         */
        initEffect : function(userEffect){
            if(userEffect == null)			return null;

            var effectWithOptions = userEffect.split("@");

            var effect = effectWithOptions[0];

            if(this.isAllowedEffect(effect)){
                this.effect = effect;

                var option = effectWithOptions[1];

                if (option == null)		return;

                var optionName = this.allowedEffect[effect][option];

                if(optionName != null){
                    this.optionOfEffect[optionName] = option;
                }
            }
        },
        isAllowedEffect : function(effect){
            return effect && this.allowedEffect[effect];
        },
        getOptionOfEffect : function(){
        	return this.optionOfEffect;
        }
    });

    // 페이지에 유일한 객체로 만들고 싶다면 new JexMobileEffect() 로 저장한다.
    jex.plugin.add("JEX_MOBILE_EFFECT", JexMobileEffect, effectAttrs.id);
})();