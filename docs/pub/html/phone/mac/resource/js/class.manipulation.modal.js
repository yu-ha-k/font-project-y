/**/


(function() {
	var manipulationModal = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{
		
			console.log('class.manipulation.modal.js is working now.');
			
			var _this = this; var $modal	= this.$e.find(">.createModal");	
			var $modalIn = this.$e.find(">.createModal").children(); var $close = $modalIn.find('.closebutton');
			var $jumptolast =  $modalIn.find(".jumptolast"); 
			$close.bind('click', function(){
				var closeModal = $(this).closest('.createModal');
				closeModal.addClass('hide'); closeModal.next().removeClass('hide');
			});
			$jumptolast.bind('click', function(){
				var closeModal = $(this).closest('.createModal');
				closeModal.addClass('hide'); 
				var $last = $modal.last(); $last.removeClass('hide');
			});
			
		}
		,clear		: function()		{									}
		,getValue 	: function() 		{									}
		,setValue 	: function(list) 	{									}
	});
	_nattr['.manipulationModal'] = manipulationModal;
})();


