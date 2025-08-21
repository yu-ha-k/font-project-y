/**
 * class.list.js
 * class기반 (list)를 가진 element에 대한 interaction
 **/
(function() {
	var list = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);					}
		,onload	 	: function()		{ this.tmpl = this.$e.first().html();	}
		,clear		: function()		{ this.draw([]);						}
		,findEl		: function(str, $e) {
			if (!str) return $(str);
			var splstr	= str.split("/");
			var lengt	= splstr.length;
			var $basc	= $e;
			for (var i=0;i<lengt;i++) {
				if (splstr[i] == "parent"	)	$basc = (!$basc)?$e:$basc.parent();
				else if (splstr[i] == "this")	$basc = $e;
				else							$basc = (!$basc)?$(splstr[i]):$basc.find(splstr[i]);
			}
			return $basc;
		}
		,getValue 	: function() 		{
			var jng = this.$e.attr("data-jng");
			if (jng) {
				var $list	= this.$e.find("[data-row-num]");
				var listlen = $list.length;
				var ret		= [];
				
				for (var ii=0; ii<listlen; ii++) {
					var $row = $($list.get(ii));
					var $jng = this.findEl(jng, $row);
					ret.push(_attrUtil.getIn($jng));
				}
				return ret;
			} else {
				return this.value;				
			}
		}
		,setValue 	: function(list) 	{ list && typeof list.length === "number" && this.draw(list);	}
		,filter		: function(filter)	{
			var list = this.value.filter(function(row) {
				var keys = filter.KEY.split(",");
				for (var key in keys) { if (row[keys[key]] && row[keys[key]].indexOf(filter.VAL) > -1) return true; }
				return false;
			});
			this.draw(list, true);
		}
		,draw		: function(list, isFilter)	{
			if (typeof list == "string") list = [];
			if (!isFilter) this.value = list;
			if (!this.$e.hasClass("appendList")) {
				this.rownum = 0;
				this.$e.children().not(".hide").remove();	// 기존 row삭제
			}
			this.rownum = (this.rownum)?this.rownum:0;
			var html 	= this.tmpl;
			
			for (var i=0; i<list.length; i++)	 {
				var $list = $(html);
				$list.attr("data-row-num",this.rownum++);
				$list.appendTo(this.$e);
				$list.hasClass("hide") && $list.removeClass("hide");
			
				var lists =  _attrUtil.setOut(list[i], $list, "data-row");
				
				_setAttrM($list);
				_attrUtil.setOut(lists, $list, "data-row");
			}
			
			var next = this.$e.attr("data-list-af-attrm");
			(next && _setAttrM($(next)));
	
//			var objs = this.$e.data("_nattr");
//			if (objs && objs.length) { for (var ii=0; ii<objs.length; ii++) { if ( objs[ii] != this ) { (objs[ii] && objs[ii]['reload'] && objs[ii].reload()); } } } 
			this.$e.trigger($.Event("change"));
		}
	});
	_nattr['.list'] = list;
})();


