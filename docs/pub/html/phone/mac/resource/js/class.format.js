/**
 * data.enter.js
 * custom attribute 기반 (data-enter)를 가진 element에 대한 interaction
 **/
(function() {
	var format = _attrM.extend({
		 init	 	: function(q,$e){
			 							this._super(q,$e);
			 							this.evt	= "focusout";
			 							this.jnf	= this.$e.attr("data-jnf");
			 							this.fomt	= kkFormatter[this.jnf];
		}
		,onload	 	: function()	{ this.defineEvt();		}
		,getValue	: function()	{ return this.$e.val(); }
		,defineEvt	: function()	{
			var _this		= this;
			this.$e.on(this.evt, function() {
				_this.val		 = (_this.fomt)?_this.fomt('dat', {'dat':_this.$e.val()}):_this.$e.val();
				_this.$e.val(_this.val);
			});
		}
	});
	_nattr['.format'] = format;
})();


