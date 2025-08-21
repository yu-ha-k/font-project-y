/**
 * class.btn-checker.js
 * btn-checker js
 **/
(function() {
	var btn_checker = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);		}
		,onload	 	: function()		{ this.defineEvt();		}
		,setValue	: function(val)	{ }
		,getValue	: function()		{ }
		,defineEvt	: function()		{
			var _this = this;
			this.$e.find(".chk-agree").click(function() {
				
				if (!$(this).hasClass("on")) {
					$(this).addClass("on");
					$($(this).attr("data-agree-value")).html("Y");
				} else {
					$(this).removeClass("on");
					$($(this).attr("data-agree-value")).html("N");
				}
				
				
				var $agreebox = $(this).closest(".btn-checker");
				if ($agreebox.find(".chk-agree").not(".e-select").not(".on").length == 0) {
					$agreebox.addClass("pass");
					if ($agreebox.find(".chk-agree").not(".on").length == 0)	{		
						$agreebox.find(".chk-all-agree").addClass("on");
					} else {
						$agreebox.find(".chk-all-agree").removeClass("on");
					}
				} else {
					$agreebox.removeClass("pass");
					$agreebox.find(".chk-all-agree").removeClass("on");
				}
			});
			
			this.$e.find(".chk-all-agree").click(function() {
				var $agreebox	= $(this).closest(".btn-checker");
				var $chkAllAgr	= $agreebox.find(".chk-all-agree");
				
				if (!$chkAllAgr.hasClass("on")) {
					$chkAllAgr.addClass("on");
					$agreebox.find(".chk-agree").addClass("on");
					$agreebox.addClass("pass");
					$agreebox.find(".for_spag_yn").html("Y");
				} else {
					$chkAllAgr.removeClass("on");
					$agreebox.find(".chk-agree").removeClass("on");
					$agreebox.removeClass("pass");
					$agreebox.find(".for_spag_yn").html("N");
				}
			});
		}
	});
	_nattr['.btn-checker'] = btn_checker;
})();
