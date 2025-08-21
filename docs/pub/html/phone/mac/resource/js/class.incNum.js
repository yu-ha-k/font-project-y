/**
 * 값을 증가시켜준다.
 **/
(function() {
	var incNum = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{ /*this.defineEvt();*/				}
		,clear		: function()		{ this.value=undefined;				}
		,getValue 	: function() 		{ return this.value;				}
		,setValue 	: function(dat) 	{
			var step	= 10;
			var _this	= this;
			dat = (dat)?dat.replace(/,/g,""):"";
			var intValue= parseInt(dat);
			this.value	= dat;
		
			console.log("inc:::", dat, " :: int :: ", dat);
			
			if (isNaN(intValue)) {
				this.setElement(dat);
			} else {
				$({someValue: 0}).animate({someValue: intValue}, {
				    duration: 500,
				    easing:'swing', 
				    step: function(now) { _this.setElement(now); },
					complete:function() { _this.setElement(_this.value); }
				});
			}
		}, setElement : function(dat) {
			if (["input","select"].indexOf(this.$e.get(0).tagName.toLowerCase()) > -1)	this.$e.val(kkFormatter.money("dat", {"dat":Math.round(dat)}));
			else																		this.$e.html(kkFormatter.money("dat", {"dat":Math.round(dat)}));
		}
	});
	_nattr['.incNum'] = incNum;
})();


