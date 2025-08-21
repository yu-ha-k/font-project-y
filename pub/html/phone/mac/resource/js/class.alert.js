/**
 * class.kk-alert.js
 * class기반 (kk-alert)를 가진 element에 대한 interaction
 **/
(function() {
	if (!window._attrUtil) window._attrUtil = {};
	window._attrUtil['alert'] = new (Class.extend({
		create : function() {
			this.$abox	= $("<div class='underpop modal hide w100p no-close alert-box antiscroll'>"
						        +"<div class='pop-alert overh'>"
						            +"<div class='bg b-white'>"
						                +"<div class='row pt30 pb20 lh50 mb00'>"
						                    +"<div class='col s12 lh30 mt10 mb10 text t-center alert-msg'></div>"
						                +"</div>"
						            +"</div>"
						            +"<div class='row no-mg no-pd'>"
						                +"<div class='col s12 btn text semi-normal pop-leri modal-close close'>확인</div>"
						            +"</div>"
						        +"</div>"
							+"</div>").appendTo(document.body);
			
			var _this = this;
			this.$abox.find(".close" ).on('click',	function() { _this.hide(); });
			this.$abox.find(".dialog").on('click',	function() { event.stopPropagation();});
		}, show : function(message) {
			if (!this.$abox) this.create();
			this.$abox.find(".alert-msg"	).html(message);
			_attrUtil.show(this.$abox);
			this.$abox.find(".close").attr("tabindex", -1).focus();
			this.$abox.find(".close").bind('keydown', function(e) { if (e.keyCode == '13' || e.keyCode=='27') $(this).click(); });
		}, hide: function() {
			this.$abox.find(".alert-msg"	).html("");
			_attrUtil.hide(this.$abox);
			this.$abox.unbind("keydown");
			this.$abox.removeAttr("tabindex");
		}
	}))();
	var alert = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();					}
		,getOption	: function(s)	{ return this.q.substring(1)+"-"+s;	}
		,getQuery	: function(s)	{ return this.q+"-"+s;				}
		,getMsg		: function(s)	{ return this.$e.attr("data-"+this.getOption("msg"));	}
		,getTitle	: function(s)	{ return this.$e.attr("data-"+this.getOption("title"));	}
		,getValue	: function()	{ return this.getMsg(); }
		,defineEvt	: function()	{ var _this	= this; this.$e.click(function() { _attrUtil.alert.show(_this.getTitle(), _this.getMsg()); }); }
	});
	_nattr['.alert'] = alert;
})();


