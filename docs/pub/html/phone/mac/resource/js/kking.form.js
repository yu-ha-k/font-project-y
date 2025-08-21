$(function() {
	var chkAttrs	= "data-kk-chk";
	var checkList	= {
		  "phone"				: function($input) { $input.val($input.val().substr(0, 11));	return !!$input.val().match(/^0\d{9,10}$/); }
		, "businessNumber"		: function($input) { $input.val($input.val().substr(0, 10));    return !!$input.val().match(/^\d{10}$/);	}
		, "pwd"					: function($input) { $input.val($input.val().substr(0, 6));		return !!$input.val().match(/^\d{6}$/);	 	}
		, "phoneCode"			: function($input) { $input.val($input.val().substr(0, 4));		return !!$input.val().match(/^\d{4}$/);     }
	};
	var chkNext = function($thisForm) {
		var $layer = $($thisForm.closest("[data-kk-layer]"));
		var $nextBtn = $($layer.find(".kk-btn-next"));
		$nextBtn.removeClass("disable").removeClass("enable");
		
		var arrForm = [];
		var chk = true;
		$layer.find(".kk-check").each(function() { arrForm.push(this); });
		$layer.find("[data-kk-chk]").each(function() { arrForm.push(this); });
		
		console.log(arrForm.length);
		for (var ii = 0 ; ii < arrForm.length; ii++) {
			if($(arrForm[ii]).hasClass("kk-check")) {
				if($(arrForm[ii]).find(".kk-check-active").length == 0) {chk=false; break;}
			} else {
				if($(arrForm[ii]).attr(chkAttrs) && !checkList[$(arrForm[ii]).attr(chkAttrs)]($(arrForm[ii]))) {chk=false; break;}
				console.log($nextBtn);
			}
		};
		
		if(!chk) 	{$nextBtn.addClass("disable");}		
		else		{$nextBtn.addClass("enable");}
		
	};
	$("body").on("focus",	 "input", function() { $(this).closest("label").addClass("kk-focused");});
	$("body").on("focusout keyup", "input", function() {
		$(this).closest("label").removeClass("kk-focused");
		if ($(this).val() && $(this).attr(chkAttrs) && !checkList[$(this).attr(chkAttrs)]($(this))) { $(this).closest("label").addClass("kk-error"); }
		else 																						{ $(this).closest("label").removeClass("kk-error");	}
		
		chkNext($(this));
	});
	
	$("body").on("click", ".kk-check-item", function() {	chkNext($(this));	});
	$(".kk-input-open").focus();
});
