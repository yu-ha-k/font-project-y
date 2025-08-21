$(function() {
	_app.backKey(function() {
		if ($(".layer_screen").not(".hide").length > 0) {

		} else {
			var modal		= $(".modal").not('button').not('.hide').not('.main').not("p").not('.join-check-exit');

			if		(modal.length		> 0 )	{	
				$(modal.get([modal.length-1])).find(".modal-close:first").click();
			}  
			else								{
				$(".icon-arrow").click();
				return "exit";	
			}
		}

	});	
	
//	_app.parent_close(function() {
//		//alert("parent_close!!");
//	});
});