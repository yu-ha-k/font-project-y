/** 
 * from S02234
 * 
 * started 20181120 ~
 * Simple Explanation for component.getToggle.js
 * 
 * There are wbs', bbs', and btnallagr as btn.
 * if user click btnallagr, all wbs' turn out bbs',
 * and click wbs', all wbs' turn out bbs'.
 * Plus, element product get hided and showed, as user clicks 4th wb. 
 * 
 * and the others not explained, is continuing added that needed ones for 
 * completing on join_0001_01.html.
 *
 * what i want to : 
 *    get simple on variables 
 *    how can? why can't those to be managed as arrays.????????
 *
 */

(function() {
	
	console.log("component.getToggle.js started");


	var getToggle = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{
			
/*			
			var $tojoin01 = this.$e.find('.tojoin01'); var $join01 = this.$e.find('.join01');
			$tojoin01.click(function(){
				$join01.removeClass('hide');
			});
			

			var $tojoin02 = this.$e.find('.tojoin02'); var $join02 = this.$e.find('.join02');
			$tojoin02.click(function(){
				$join01.addClass('hide'); $join02.removeClass('hide');
			});
			
			var $join0201 = this.$e.find('.join0201'); var $join0202 = this.$e.find('.join0202');
			var $tojoin0202 = this.$e.find('.tojoin0202');
			$tojoin0202.click(function(){
				$join0201.addClass('hide'); $join0202.removeClass('hide');
			});
			
			
			var $tojoin0203 = this.$e.find('.tojoin0203'); var $join0203 = this.$e.find('.join0203');
			$tojoin0203.click(function(){
				$join0202.addClass('hide'); $join0203.removeClass('hide');
			});
			
			var $tojoin0204 = this.$e.find('.tojoin0204'); var $join0204 = this.$e.find('.join0204');
			$tojoin0204.click(function(){
				$join0203.addClass('hide'); $join0204.removeClass('hide');
			});
			
			var $tojoin0205 = this.$e.find('.tojoin0205'); var $join0205 = this.$e.find('.join0205');
			$tojoin0205.click(function(){
				$join0204.addClass('hide'); $join0205.removeClass('hide');
			});
			
			var $tojoin03 = this.$e.find('.tojoin03'); var $join03 = this.$e.find('.join03');
			$tojoin03.click(function(){
				$join02.addClass('hide'); $join03.removeClass('hide');
			});*/
			
	/*		var $jumptojoin03 = this.$e.find('.jumptojoin03'); 
			$jumptojoin03.click(function(){
				$join02.addClass('hide'); $join03.removeClass('hide');
			});
			
			var $product = this.$e.find(".product");
	
			var $btnallagr = this.$e.find(".btnallagr");*/
			
/*			var $btnallagr00 = this.$e.find(".btnallagr00");var $btnallagr01 = this.$e.find(".btnallagr01");
			var $btnallagr02 = this.$e.find(".btnallagr02");var $btnallagr03 = this.$e.find(".btnallagr03");
			var $btnallagr04 = this.$e.find(".btnallagr04");var $btnallagr05 = this.$e.find(".btnallagr05");
			var $btnallagr06 = this.$e.find(".btnallagr06");var $btnallagr07 = this.$e.find(".btnallagr07");
			
			var $wb01 = this.$e.find(".wb01");var $wb02 = this.$e.find(".wb02");
			var $wb03 = this.$e.find(".wb03");var $wb04 = this.$e.find(".wb04");
		
			
			var $bb01 = this.$e.find(".bb01");var $bb02 = this.$e.find(".bb02");
			var $bb03 = this.$e.find(".bb03");var $bb04 = this.$e.find(".bb04");
		
			$btnallagr.click(function(){
				$btnallagr00.addClass("hide");$btnallagr01.removeClass("hide");
				$btnallagr02.addClass("hide");$btnallagr03.removeClass("hide");
				$btnallagr04.addClass("hide");$btnallagr05.removeClass("hide");
				$btnallagr06.addClass("hide");$btnallagr07.removeClass("hide");
				$product.removeClass("hide");
			});
			
			
			$bb01.click(function(){$bb01.addClass("hide");$wb01.removeClass("hide");});
			
			$bb02.click(function(){$bb02.addClass("hide");$wb02.removeClass("hide");});
			
			$bb03.click(function(){$bb03.addClass("hide");$wb03.removeClass("hide");});
			
			$bb04.click(function(){$bb04.addClass("hide");$wb04.removeClass("hide");$product.addClass("hide");});
	
			$wb01.click(function(){$wb01.addClass("hide");$bb01.removeClass("hide");});
			
			$wb02.click(function(){$wb02.addClass("hide");$bb02.removeClass("hide");});
			
			$wb03.click(function(){$wb03.addClass("hide");$bb03.removeClass("hide");});
			
			$wb04.click(function(){$wb04.addClass("hide");$bb04.removeClass("hide");$product.removeClass("hide");});
	*/
		}
		,clear		: function()		{									} ,getValue 	: function() 		{									}
		,setValue 	: function(list) 	{									} });
	_nattr['.getToggle'] = getToggle;
})();