/**
 * 
 */

(function() {
	var cardExistsSelected_yn = _attrM.extend({

		init : function(q, $e) {
			this._super(q, $e);
		},
		onload : function() {

			console.log('class.selected.modal.js is working now.');
			var $join0204_con = this.$e.find('.join0204_con');
			var _this = this;
			var c = this.$e.find(">.modal");
			/*console.log(this);
			console.log($(c.get(0)));
			console.log($(c.get(1)));*/

			/*var $cc = $('.CRTC_FLAG').text();
			$($cc).bind("change", function(){
				alert('d');
			});*/
			
			/*$join0204_con.click(function() {
				
				var cc = $('.CRTC_FLAG').text();
				// alert('d');
				switch (cc) {
				case 'Y':
					console.log('y');
					$(c.get(0)).removeClass('hide');
					$(c.get(1)).addClass('hide');

					break;
				case 'N':
					console.log('n');
					break;
				default:
					console.log('de');
					break;

				}

			});*/
			/*
			 * $($join0204_con).bind("click", function() { var cc =
			 * $('.CRTC_FLAG').text(); if ($('.CRTC_FLAG').text()=="Y") {
			 * 
			 * $(c.get(0)).removeClass('hide'); $(c.get(1)).addClass('hide');
			 * alert('d'); return console.log($('.CRTC_FLAG').text());
			 * 
			 * 
			 * 
			 * if ($(c.get(0)).hasClass('hide')) {
			 * $(c.get(0)).removeClass('hide'); $(c.get(1)).addClass('hide');
			 * break; } else if (!$(c.get(0)).hasClass('hide')) { alert('s'); } }
			 * });
			 */

		},
		setValue : function(val) {
			var arr = val.split(",");
			for (var ii = 0; ii < arr.length; ii++) {
				this.$e.find("[data-jno=" + arr[ii] + "]");
			}
		}
	});
	_nattr['.cardExistsSelected_yn'] = cardExistsSelected_yn;
})();
