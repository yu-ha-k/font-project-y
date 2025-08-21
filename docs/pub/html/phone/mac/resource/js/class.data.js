/**
 * class.modal.js
 * class기반 (modal)를 가진 element에 대한 interaction
 **/
(function() {
	var cls_data = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();					}
		,onHide		: function()	{		}
		,hide	 	: function()	{	}
		,setValue	: function(val)	{ this.$e.data("cls_data", val); }
		,getValue	: function()	{ return this.$e.data("cls_data"); }
		,defineEvt	: function()	{ }
	});
	_nattr['.data'] = cls_data;
})();


