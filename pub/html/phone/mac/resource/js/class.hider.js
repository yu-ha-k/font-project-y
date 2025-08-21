/**
 * class.hider.js
 * class기반 (hider)를 가진 element에 대한 interaction
 **/
(function() {
	var hider = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{ /*this.defineEvt();*/				}
		,clear		: function()		{ this.value=undefined;				}
		,getValue 	: function() 		{ return this.value;				}
		,setValue 	: function(dat) 	{
			this.value=dat;
		
			console.log("===> hider :: ", this.$e, dat);
			
			if ("Y" === dat &&  this.$e.hasClass("hide")) {
				if (this.$e.hasClass("fadeOut")) {
					_this = this;
					this.$e.fadeIn(300, function() { _this.$e.removeClass("hide"); });
				} else{
					this.$e.removeClass("hide");
				}
			}
			
			if ("N" === dat && !this.$e.hasClass("hide")) {
				if (this.$e.hasClass("fadeOut")) {
					_this = this;
					this.$e.fadeOut(300, function() { _this.$e.addClass("hide"); });
				} else {
					this.$e.addClass("hide");
				}
			}
		}
	});
	_nattr['.hider'] = hider;
})();


