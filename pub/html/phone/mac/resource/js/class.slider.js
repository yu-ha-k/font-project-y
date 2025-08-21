/**
 * class.slider.js
 * slider UI를 제공한다.
 **/
(function() {
	var slider = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	: function()		{
			var _this = this;
//			this.$parent	= this.$e.parent();
			this.widthSlider= this.$e.width();
			this.$container	= this.$e.find("div").first();
			this.$sliders	= this.$container.find(">div").not(".hide");
			this.sliderlen	= this.$sliders.length;
			this.$slidefirst= $(this.$sliders.get(0));

			this.$e.width	("100%");

			this.$container	.width((100 * this.sliderlen)+"%");
			this.$sliders	.width((100 / this.sliderlen)+"%");
			this.$container	.height(this.$sliders.first().height());

			this.$container.find("[data-row-num=0]").addClass("selected");
			
			this.$container.data("jnut.slider.obj", this);
		
			this.$container.bind('change', function() { _this.reload(); });
			this.$container.on('touchstart mousedown',					this.start	);
			this.$container.on('touchmove mousemove',					this.move	);
			this.$container.on('touchend touchout mouseup mouseout',	this.end	);
			
			this.$e.bind("goto-next", function() {_this.goto(1);	});
			this.$e.bind("goto-prev", function() {_this.goto(-1);	});

		}
		,reload: function() {
			var _this = (this.$e)?this:$(this).data("jnut.slider.obj");
			
			_this.widthSlider	= this.$e.width();
			_this.$container	= this.$e.find("div").first();
			_this.$sliders		= this.$container.find(">div").not(".hide");
			_this.sliderlen		= this.$sliders.length;
			_this.$slidefirst	= $(this.$sliders.get(0));

			_this.$e.width	("100%");
			
			_this.$container	.width((100 * this.sliderlen)+"%");
			_this.$sliders		.width((100 / this.sliderlen)+"%");
			_this.$container	.height(this.$sliders.first().height());

			
			_this.$container.animate({"left":"0px"},"fast");
			_this.$container.find(".selected").removeClass("selected");
			_this.$container.find("[data-row-num=0]").addClass("selected");

			_this.$e.trigger($.Event("change"));
			_this.$container.data("page", 1);
		}
		,start: function(e) {
			$(this).data("onTouch", true);

			var offsetX = e.pageX;
			var offsetY = e.pageY;
			if (!offsetX) offsetX = event.touches[0].pageX;
			if (!offsetY) offsetY = event.touches[0].pageY;
			
			$(this).data("StartTM",	(new Date).getMilliseconds());
			$(this).data("StartL",	$(this).offset().left);
			$(this).data("StartEL",	offsetX);
			$(this).data("StartET",	offsetY);
			
		}
		,move	: function(e) {
			if (!$(this).data("onTouch")) { return true; }
		
			var offsetX = e.pageX;
			var offsetY = e.pageY;
			if (!offsetX) offsetX = event.touches[0].pageX;
			if (!offsetY) offsetY = event.touches[0].pageY;
			
			var startET 	= $(this).data("StartET");
			var startEL 	= $(this).data("StartEL");
			var startL 		= $(this).data("StartL");
			var betL		= offsetX - startEL;
			var betT		= offsetY - startET;
			var moveCnt		= $(this).data("MoveCnt");
			moveCnt 		= (!moveCnt)?1:(moveCnt+1);
			$(this).data("MoveCnt",moveCnt);

//			console.log("betL :: ", betL , " / betT :: ", betT);
			
			if (/*moveCnt<2 &&*/ Math.abs(betL) < Math.abs(betT)) {
				$(this).data("onTouch", false);
				var obj = $(this).data("jnut.slider.obj");
				obj.end.call(this, e, true);
				return true;
			} else {
				e.preventDefault();
				$(this).offset({left:startL+betL});
			}
		}
		,end	: function(e, force) {
			if (!$(this).data("onTouch") && !force) return;
			$(this).data("onTouch", false);
			$(this).data("MoveCnt", 0);
		
			var eleWidth	= $(this).closest(".slider").width();//$(this).children(":first").width();
			var startL		= $(this).data("StartL");
			var page		= $(this).data("page");
			var offsetL		= $(this).offset().left;
			var betL		= offsetL - startL;
			var strTM		= $(this).data("StartTM");
			var endTM		= (new Date()).getMilliseconds();
			var betTM		= endTM-strTM;
			var speed		= Math.abs(betL)/betTM*100;
			var $sliders	= $(this).find(">div").not(".hide");
		
			page = (!page)?1:page;

			if (((eleWidth/2) < Math.abs(betL)) || speed > 3) {
				page = (betL>0)?page-1:page+1;
				if (page < 1 || page > $sliders.length) page = (betL>0)?page+1:page-1;
				$(this).data("page",page);
			}
			
			if (startL != offsetL) {
				$(this).animate({"left":((page-1)*eleWidth*-1)+"px"},"fast");
			
				$(this).find(".selected").removeClass("selected");
				$(this).find("[data-row-num="+(page-1)+"]").addClass("selected");

				var _this = $(this).data("jnut.slider.obj");
				setTimeout(function() { _this.$e.trigger( $.Event("change")); }, 200);
			}
		},goto	: function(val) {
			var $cont		= this.$container;
			var eleWidth	= this.$e.width();//$(this).children(":first").width();
			var page		= $cont.data("page");
			var $sliders	= $cont.find(">div").not(".hide");
			
			page = (!page)?1:page;

			if ((page+val) < 1 || (page+val) > $sliders.length) return; 

			page = page+val;
			$cont.data("page",page);
			
			$cont.animate({"left":((page-1)*eleWidth*-1)+"px"},"fast");
			
			$cont.find(".selected").removeClass("selected");
			$cont.find("[data-row-num="+(page-1)+"]").addClass("selected");

			var _this = this;
			setTimeout(function() { _this.$e.trigger( $.Event("change")); }, 200);
		}
		,clear	: function()		{									}
		,getValue 	: function() 		{
			
		}
		,setValue 	: function(list) 	{
			return undefined;
		}
	});
	_nattr['.slider'] = slider;
})();