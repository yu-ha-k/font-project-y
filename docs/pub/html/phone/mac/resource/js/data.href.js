/**
 * data.kk-href.js
 * custom attribute 기반 (data-kk-href)를 가진 element에 대한 interaction
 **/
(function() {
	var href = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();					}
		,getValue	: function()	{
			return this.$e.attr("data-href");
		}
		,defineEvt	: function()	{
			var _this = this;
			this.$e.click(function() {
				var val		= _this.getValue();
				var val2	= val.split("#");
				var url = val;
				if (val2.length > 2) {
					for (var ii=1; ii<val2.length; ii+=2) {
						var ref = val2[ii].split(".");
						var vvv = window;
						for (var jj=0; jj<ref.length; jj++) {
							if (vvv) vvv = vvv[ref[jj]];
						}
						url = url.replace("#"+val2[ii]+"#", vvv);
					}
				}
				location.href=url;
			});
		}
	});
	_nattr['[data-href]'] = href;
})();


