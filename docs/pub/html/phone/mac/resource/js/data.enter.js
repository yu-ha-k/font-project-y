/**
 * data.enter.js
 * custom attribute 기반 (data-enter)를 가진 element에 대한 interaction
 **/
(function() {
	var enter = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e); this.target = 	this.$e.attr("data-enter");			}
		,onload	 	: function()	{ this.defineEvt();		}
		,getValue	: function()	{ return this.$e.val(); }
		,defineEvt	: function()	{
			var val		= this.getValue();
			var _this	= this;
			this.$e.keyup(function(e) {
				if (e.keyCode == '13') $(_this.target).click();
			});
		}
	});
	_nattr['[data-enter]'] = enter;
})();


