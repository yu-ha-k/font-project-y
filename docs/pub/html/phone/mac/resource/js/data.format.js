/**
 * data.format.js
 * custom attribute 기반 (data-format)를 가진 element에 대한 interaction
 **/
(function() {
	

	var fnMoneyKorean = function(val) {
		var levA	= new Array("","일","이","삼","사","오","육","칠","팔","구","십");
		var levB	= new Array("","십","백","천");
		var levC	= new Array("","만","억","조","경","해","자","양","구","간","정","재","극","항","아","라","불","무");
		var splNum	= (val+"").replace(/[^0-9\.]+/g, '').split( /(?=(?:....)*$)/ ) ;
		var spllen	= splNum.length;
		var ret		= [];
	
		for (var ii=0; ii<spllen; ii++) {
			var strsub	= splNum[ii];
			var strlen	= strsub.length;
			var retsub	= "";
			for (var jj=0; jj<strlen; jj++) {
				var strA = levA[strsub.charAt(jj)];
				retsub += strA;
				if (strA != "") retsub += levB[strlen - 1 - jj];
			}
			if (retsub != "") ret.push((retsub += levC[spllen-1-ii])+" ");
		}
		return ret.join('');
	}
	
	var _format = {
			 money	: function(val, $e) { 
				var $tgt = $e.closest(".row").find(".moneyKorean");
				if ($tgt.length > 0) {
					var txt = fnMoneyKorean(val);
					if (txt != "")	$tgt.html(txt +"원");
					else			$tgt.html("");
				}
				 return (val)?parseInt((val+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0; 
			}
			,telno	: function(val) { return (val.length == 10)?val.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"):val.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); }
			,corpNo	: function(val) { return  val.replace(/(\d{3})(\d{2})(\d)/, "$1-$2-$3"); }
			,num	: function(val) { return  val; 											 }
			
	};
	
	var format = _attrM.extend({
		 init	 	: function(q,$e){
			 							this._super(q,$e);
			 							this.evtin		= "focusin";
			 							this.evtout		= "focusout";
			 							this.evtkup		= "keydown";
			 							this.onlyNum	= $e.hasClass("onlyNum");
			 							this.fomt		= $e.attr("data-format");
			 							this.value		= "";
		}
		,onload	 	: function()	{ this.defineEvt();		}
		,getValue	: function()	{ return (!this.$e.val() || this.$e.val()=="")?this.$e.val():this.$e.val().replace(/(-|,)/g, ""); }
		,defineEvt	: function()	{
			var _this		= this;
			this.$e.bind(this.evtin,	function(evt) {
				_this.$e.val(_this.$e.val().replace(/(-|,)/g, ""));
			});
			this.$e.bind(this.evtout,	function(evt) { 
				if (_this.$e.val() && !_this.$e.val()=="") _this.$e.val( _format[_this.fomt](_this.$e.val() ,_this.$e) );
			});
			
			if (this.onlyNum) {
				this.$e.bind(this.evtkup,	function(evt) {
					if ((evt.keyCode >= 48 && evt.keyCode <= 57)
					||	(evt.keyCode >= 96 && evt.keyCode <= 105)
					||	 evt.keyCode == '8'
					||	 evt.keyCode == '9'
					||	 evt.keyCode == '37'
					||	 evt.keyCode == '39'
					) {
						if (_this.$e.hasClass("invalid")) _this.$e.removeClass("invalid");
						return true;
					}
					return false;
				});	
			} else {
				this.$e.bind("keyup",	function(evt) { 
					_this.$e.val( _format[_this.fomt](_this.$e.val() ,_this.$e) );
				});
			}
			
		}
	});
	_nattr['[data-format]'] = format;
})();


