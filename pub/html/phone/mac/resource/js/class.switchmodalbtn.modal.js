/**/


(function(){
	var switchmodalbtn = _attrM.extend({
	
		init : function(q,$e){this._super(q,$e);}
	   ,onload : function(){
			 
			var _this = this; 
			var $modalbtns = this.$e.find(">.modalbtn");
			var $on = $modalbtns.get(0); 
			var $off = $modalbtns.get(1);

			var policybtns = this.$e.find(".show_policy_checkbtn");
			var pon = policybtns.get(0);
			var poff = policybtns.get(1);
			
			$($on).bind("click", function(){
				$(this).addClass('hide'); $($off).removeClass('hide');
			});
			
			$($off).bind("click", function(){
				$(this).addClass('hide'); $($on).removeClass('hide');
			});

			$(pon).bind("click", function(){
				$(this).addClass('hide'); $(poff).removeClass('hide'); 
			});

			// $(poff).bind("click", function(){
			// 	$(this).addClass('hide'); $(poff).removeClass('hide');
			// });
		}
		
	});	
	_nattr['.switchmodalbtn'] = switchmodalbtn;
})();

