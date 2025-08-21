/**
 * 
 */

(function() {

	console.log("component.getToggle.js started");

	var getalert = _attrM.extend({
		init : function(q, $e) {
			this._super(q, $e);
		},
		onload : function() {
		
			var _this = this;
		
			var $cardselectpop = this.$e.find('.cardselectpop'); var $cancel = this.$e.find('.cancel'); var $confirm = this.$e.find('.confirm'); 
 			var $input = this.$e.find('.input'); var $identification = this.$e.find('.identification'); var $password = this.$e.find('.password');
 			var $cardselectpop_re01 = this.$e.find('.cardselectpop_re01');
 			
			this.$e.find(".alert-target").bind('click', function(_this) {		
				
			    //console.log($(this)); console.log(_this);
			  
				
				//issue:!!!!!!!!!!!!! get element '_this' but _this is set for just one selected from user as first.
			    _this = $(this);
			    if (_this.hasClass("selected")) { _this.removeClass("selected");}else {
				
					/*console.log($(this).text().trim());*/
					var cardname = _this.text().trim();
					if(cardname.indexOf('(BC)')>0){/*alert('includes bc so get rid of this text from original one.');  */ cardname = cardname.replace("(BC)", ""); console.log('cardname '+cardname);}
					$('.getcardname').text(cardname); $cardselectpop.removeClass('hide'); 

					
					$cancel.click(function(){
						//alert('cancel clicked!');
						$input.val("");
						$cardselectpop.addClass('hide');    
						
						//should find $alert01's element and remove selected, but here $(this) is not one but $cancel. this is the problem
						_this.removeClass('selected');
					});
					$confirm.click(function(){
						//alert('confirm clicked!');
						var password = $password.val(); var identification = $identification.val();
						console.log(password+' '+identification);
						if(password=""){ 
							$cardselectpop_re01.removeClass('hide'); }
						else if(identification=""){//alert('i');
							$cardselectpop_re01.removeClass('hide'); }
						else{ $cardselectpop.addClass('hide'); _this.addClass("selected"); $input.val(""); /*alert('go to service!');*/ }
					
					});

					
				}
				//if ($(this).hasClass("cardselect")){}
				/*else {
					if (_this.$e.hasClass("asel-only")) _this.$e.find(".asel-target.selected").removeClass("selected");
					$(this).addClass	("selected");
				}*/
				
			});
			
			//var $tocardselectpop_re01 = this.$e.find('.tocardselectpop_re01');
			/*var $cardselectpop_re01 = this.$e.find('.cardselectpop_re01');*/
			/*var $alert01 = this.$e.find('.alert01'); var $alert02 = this.$e.find('.alert02'); var $alert03 = this.$e.find('.alert03');
			var $alert04 = this.$e.find('.alert04'); var $alert05 = this.$e.find('.alert05'); var $alert06 = this.$e.find('.alert06');
			var $alert07 = this.$e.find('.alert07'); var $alert08 = this.$e.find('.alert08'); var $alert09 = this.$e.find('.alert09');
			var $alert10 = this.$e.find('.alert10'); var $alert11 = this.$e.find('.alert11'); var $alert12 = this.$e.find('.alert12');
			var $alert13 = this.$e.find('.alert13'); */
			/*var $cardselectpop = this.$e.find('.cardselectpop'); var $cancel = this.$e.find('.cancel'); var $confirm = this.$e.find('.confirm'); 
 			var $input = this.$e.find('.input'); var $identification = this.$e.find('.identification'); var $password = this.$e.find('.password'); */
	/*		$cancel.click(function(){
				
				$input.val(""); });
				
				$confirm.click(function(){ var password = $password.val(); var identification = $identification.val();
				
				if(password==""){ 
					$cardselectpop_re01.removeClass('hide'); }
				else if(identification==""){//alert('i');
					$cardselectpop_re01.removeClass('hide'); }
				else{ 
				//	alert('user input id and pw so, go to service'); 
				}
				//alert('password: <br>'+password+'identification: '+identification);
				
				//$input.val("");
				
				});
	*/
			//$tocardselectpop_re01.click(function(e){ $cardselectpop.addClass('hide'); $cardselectpop_re01.removeClass('hide'); e.preventDefault(); });
			
			
/*			$alert01.click(function() { 
				var trueornot = $alert01.hasClass('selected');
				console.log(trueornot);
				if($alert01.hasClass('selected')){ 
					alert('has');
					$alert01.removeClass('selected');
				
				}else{
					alert('not');
				var alert01 = $alert01.text().trim(); 
				console.log('1'+alert01); alert01 = alert01.substring(0,5); console.log('2'+alert01); 
				$('.getcardname').text(alert01); $cardselectpop.removeClass('hide'); 
				
				$cancel.click(function(){
					$cardselectpop.addClass('hide'); $alert01.removeClass('selected');
				});
				$confirm.click(function(){
					var password = $password.val(); var identification = $identification.val();
					if(password==""){ 
						$cardselectpop_re01.removeClass('hide'); }
					else if(identification==""){//alert('i');
						$cardselectpop_re01.removeClass('hide'); }
					else{ $cardselectpop.addClass('hide'); }
				
				});
				
				}
				
			});*/
		/*	$alert02.click(function() { var alert02 = $alert02.text(); $('.getcardname').text(alert02.trim()); $cardselectpop.removeClass('hide'); });
			$alert03.click(function() { var alert03 = $alert03.text(); $('.getcardname').text(alert03.trim()); $cardselectpop.removeClass('hide'); });
			$alert04.click(function() { var alert04 = $alert04.text(); $('.getcardname').text(alert04.trim()); $cardselectpop.removeClass('hide'); });
			$alert05.click(function() { var alert05 = $alert05.text(); $('.getcardname').text(alert05.trim()); $cardselectpop.removeClass('hide'); });
			$alert06.click(function() { var alert06 = $alert06.text(); $('.getcardname').text(alert06.trim()); $cardselectpop.removeClass('hide'); });
			$alert07.click(function() { var alert07 = $alert07.text(); $('.getcardname').text(alert07.trim()); $cardselectpop.removeClass('hide'); });
			$alert08.click(function() { var alert08 = $alert08.text().trim();
			console.log('1'+alert08); console.log(alert08.indexOf("하나")); console.log(alert08.substring(0,3));
			//get the bank's name for uppercase only.
			//alert08 = alert08.substring(0,3);
			$('.getcardname').text(alert08.trim()); $cardselectpop.removeClass('hide'); });
			$alert09.click(function() { var alert09 = $alert09.text(); $('.getcardname').text(alert09.trim()); $cardselectpop.removeClass('hide'); });
			$alert10.click(function() { var alert10 = $alert10.text(); $('.getcardname').text(alert10.trim()); $cardselectpop.removeClass('hide'); });
			$alert11.click(function() { var alert11 = $alert11.text(); $('.getcardname').text(alert11.trim()); $cardselectpop.removeClass('hide'); });
			$alert12.click(function() { var alert12 = $alert12.text(); $('.getcardname').text(alert12.trim()); $cardselectpop.removeClass('hide'); });
			$alert13.click(function() { var alert13 = $alert13.text(); $('.getcardname').text(alert13.trim()); $cardselectpop.removeClass('hide'); });*/
			/*
			 * var _this = this; this.$e.find(".alert-target").bind('click',
			 * function() {
			 * 
			 * if ($(this).hasClass("selected")) { $(this).removeClass
			 * ("selected"); } else { if (_this.$e.hasClass("asel-only"))
			 * _this.$e.find(".asel-target.selected").removeClass("selected");
			 * $(this).addClass ("selected"); } });
			 */

			/*console.log('$(this)'); console.log($(this)); console.log('_this'); console.log(_this); console.log('_this.q'); console.log(_this.q);
			console.log('_this.$e'); console.log(_this.$e);*/
			
			
			
			
		},
		clear : function() {
		},
		 getValue : function() {
				var $sels	= this.$e.find(".selected");
				console.log($sels);
				var ret		= [];
				for (var ii=0; ii<$sels.length; ii++) {
					ret.push($($sels.get(ii)).attr("data-value"));
				}
				return ret.join(",");
			}, setValue : function(val) {
				var arr = val.split(",");
				for (var ii=0; ii<arr.length; ii++) {
					this.$e.find("[data-value="+arr[ii]+"]").addClass("selected");
				}
			}
	});
	_nattr['.getalert'] = getalert;
})();