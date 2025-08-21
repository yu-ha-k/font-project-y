/**
 * class.modal.js
 * class기반 (modal)를 가진 element에 대한 interaction
 **/
(function() {
	var modal = _attrM.extend({
		 key_close	: ".modal-close"
		,key_lock	: "modal-lock"
		,key_scroll	: "scroll-lock"
		,key_menu	: "data-modal-menu"
		,menu_on	: "data-modal-on"
		,init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();					}
		,onHide		: function()	{ !this.$e.hasClass("nclear") && _attrUtil.clear(this.$e);			}
		,hide	 	: function()	{ (!this.$e.hasClass("hide") && this.hideAct()); this.onHide();	}
		,hideAct 	: function()	{
					var _this = this;
					if (_this.$e.hasClass("ltor") || _this.$e.hasClass("rtol") || _this.$e.hasClass("btot") || _this.$e.hasClass("ttob") || _this.$e.hasClass("fadeOut"))	{
						(!_this.$e.hasClass("bfhide") && _this.$e.addClass("bfhide"));
						(_this.$e.hasClass("no-ani")  && _this.$e.removeClass("no-ani"));
						setTimeout(function(){
							_this.$e.addClass("hide");
							_this.$e.removeClass("bfhide");
							(this.$e && this.$e.attr(this.key_menu) && $(this.$e.attr(this.key_menu)).hasClass(this.menu_on) && $(this.$e.attr(this.key_menu)).removeClass(this.menu_on) );
						}, 300);
					} else {
						window.$eeee = _this.$e;
						(!this.$e.hasClass("hide") && this.$e.addClass("hide"));
						(this.$e.attr(this.key_menu) && $(this.$e.attr(this.key_menu)).hasClass(this.menu_on) && $(this.$e.attr(this.key_menu)).removeClass(this.menu_on) );
					}
					if (_this.$e.hasClass(_this.key_scroll)) {
						(_this.$lock_eles && _this.$lock_eles.length > 0 && _this.$lock_eles.removeClass("hide"));
						$("body").removeClass("overh");
					}
					if (this.$lockbox) this.$lockbox.remove();
		}
		,show	 	: function()	{
										var _this = this;
										if (this.$e.hasClass("hide")) {
											if (this.$e.hasClass(this.key_lock)) {
												this.$lockbox	= $("<div class='lock'></div>").appendTo(document.body);
												this.$lockbox.click(function(e) {
													console.log(e);
													e.stopPropagation();
													_this.$e.find(".modal-close").click();
												});
											}

											(this.$e && this.$e.attr(this.key_menu) && !$(this.$e.attr(this.key_menu)).hasClass(this.menu_on) && $(this.$e.attr(this.key_menu)).addClass(this.menu_on) );
											(_this.$e.hasClass("no-ani")  && _this.$e.removeClass("no-ani"));
											(this.$e.removeClass	("hide"));
											
											if (_this.$e.hasClass(_this.key_scroll)) {
												_this.$lock_eles = $("body").find(".modal").not(".hide").not(".boxMsgAlert").not(_this.$e);
												(_this.$lock_eles && _this.$lock_eles.length > 0 && _this.$lock_eles.addClass("hide"));
												$("body").addClass("overh");
											}
										}
										
									}
		,defineEvt	: function()	{
			var _this	= this;
			this.$e.bind('click',function(e) {
				if (_this.$e.hasClass("hide")) {
					_this.show();
				} else {
					if (!_this.$e.hasClass("no-close")) {
						var $ele_close = _this.$e.find(_this.key_close);
						if ($ele_close.length > 0)  $ele_close.click();
						else						_this.hide();
					}
				}
			});
			this.$e.children(0).bind('click',function(e) { e.stopPropagation(); });
			this.$e.find(_this.key_close).bind("click", function(e) {
				if ($(this).closest(".modal").get(0) === _this.$e.get(0)) _this.hide();
			});
		}
	});
	_nattr['.modal'] = modal;
})();


