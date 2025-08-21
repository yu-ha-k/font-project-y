/**
 * class.kk-table.js
 * class기반 (kk-table)를 가진 element에 대한 interaction
 **/
(function() {
	var table = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{ 									}
		,clear		: function()		{ this.draw([]);					}
		,getValue 	: function() 		{
			if (this.$e.hasClass("selectable") || this.$e.hasClass("clickable")) {
				if (this.$e.hasClass("multi")) {
					var rslt		= [];
					var $selects	= this.$e.find(".selected");
					var len 		= $selects.length;
					for (var ii=0; ii<len;ii++) rslt.push(this.value[$($selects.get(ii)).attr("data-tr")]);
					return rslt;
				} else {
					return this.$e.find(".selected").length?this.value[this.$e.find(".selected").attr("data-tr")]:{};
				}
			} else {
				return this.value;					
			}
		},setValue 	: function(list) 	{ list && typeof list.length === "number" && this.draw(list);	}
		,draw		: function(list)	{
			this.value = list;
			this.$e.find("tbody").find("tr").not(".hide:first").remove();	// 기존 row삭제
			var html = this.$e.find("tbody").html();
			for (var i=0; i<list.length; i++)	 {
				var $list = $(html);
				$list.attr("data-tr",i);
				$list.appendTo(this.$e.find("tbody"));
				$list.hasClass("hide") && $list.removeClass("hide");
				_attrUtil.setOut(list[i], $list, "data-td");
			}
			_setAttrM(this.$e.find("tbody"));
			this.defineEvt();
		},defineEvt	: function()	{ 
			if (this.$e.hasClass("selectable") || this.$e.hasClass("clickable")) {
				var $tbody = this.$e.find("tbody");
				var _this = this;
				$tbody.find("tr").click(function() {
					if (!_this.$e.hasClass("multi"))	$tbody.find(".selected").removeClass("selected");
					if (!$(this).hasClass("selected")) {
						$(this).addClass("selected");
						$(this).find(".select_yn").html("Y");
					} else {
						$(this).removeClass("selected");
						$(this).find(".select_yn").html("N");
					}
				});
			}
		}
	});
	_nattr['.table'] = table;
})();


