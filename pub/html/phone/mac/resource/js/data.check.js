/**
 * data.kk-href.js
 * custom attribute 기반 (data-kk-href)를 가진 element에 대한 interaction
 **/
(function() {
	var check = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();                 }
		,setValue	: function(val)	{
			if (val == "Y") 		{ this.$e.prop('disabled', false); this.$e.prop('checked', true); 
                              		  //20240116 웹접근성 추가
                                      this.$e.attr("aria-checked",true);
			                        }
			else if (val == "N") 	{ this.$e.prop('disabled', false); this.$e.prop('checked', false); 
                                	  //20240116 웹접근성 추가
                                      this.$e.attr("aria-checked",false);
			                        }
			else if (val == "F")	{ this.$e.prop('disabled', true); 
			                          //20240116 웹접근성 추가
                                      this.$e.attr("aria-checked",false);
			                        }
		} ,getValue	: function()	{
			return (this.$e.prop('checked'))?"Y":"N";
		} ,defineEvt	: function()	{
		}
	});
	_nattr['[data-check]'] = check;
})();


