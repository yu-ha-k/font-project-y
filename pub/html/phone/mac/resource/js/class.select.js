/**
 * class.kk-table.js
 * class기반 (kk-table)를 가진 element에 대한 interaction
 **/
(function() {
	var select = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e); this.$tpl=$("<option></option");}
		,onload	 	: function()		{ this.defineEvt();					}
		,clear		: function()		{ this.draw([]);					}
		,getValue 	: function() 		{ return this.$e.val(); }
		,setValue 	: function(list) 	{ list && typeof list.length === "number" && this.draw(list);	}
		,draw		: function(list)	{
			if (typeof(list) == "string") {
				this.$e.val(list);
			} else {
				this.value	= list;
//				var attrFor	= this.$e.attr("data-jnf");
//				var fomt	= (attrFor)?kkFormatter[attrFor]:undefined;
				
				this.$e.find("option").not(".dflt").remove();
				for (var i=0; i<list.length; i++) {
//					var val		= (fomt)?fomt("NM", list[i]):list[i].NM;
					var val		= list[i].NM;
//					this.$tpl.clone().attr("value",list[i].CD).html(val).appendTo(this.$e);
					var $row	= this.$tpl.clone().attr("value",list[i].CD).html(val);
					if (list[i].SEL == "Y") $row.attr("selected", "selected");
					$row.appendTo(this.$e);
				}
			}
			
			
		},defineEvt	: function()	{ 
		}
	});
	_nattr['.select'] = select;
})();


