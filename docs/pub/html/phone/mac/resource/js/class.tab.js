/**
 * class.tab.js
 * class기반 (tab)를 가진 element에 대한 interaction
 **/
(function() {
	var tab = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{
			var initval	= this.$e.attr("data-tab-selected");
			var $body	= this.$e.find(">.tab-body");
			var $tabs	= this.$e.find(">.tab-head").find(">[data-tab]");
			var $bodys	= this.$e.find(">.tab-body").children();
			
			initval		= (initval)?parseInt(initval):0;

			$bodys.addClass		("hide");		// 기존에 있던 body들을 숨긴다.
			$tabs.removeClass	("selected");	// 기존에 선택된 tab을 ...
			
			$tabs.click(function() {
				$bodys.addClass		("hide");		// 기존에 있던 body들을 숨긴다.
				$tabs.removeClass	("selected");	// 기존에 선택된 tab을 ...
				
				$(this).addClass("selected");
				var $t = $($body.find($(this).attr("data-tab")));
				$t.removeClass("hide");
			});
			
			$($tabs.get(initval)).click();
		}
		,clear		: function()		{									}
		,getValue 	: function() 		{									}
		,setValue 	: function(list) 	{									}
	});
	_nattr['.tab'] = tab;
})();


