var _XECURE = false;

$(function() {
	jex.addAjaxBefore	(function(xhr,setting) 		{ xhr.setRequestHeader("charset", "utf-8");});
	jex.addAjaxComplete	(function(xhr,textstatus) 	{});
});

jex.addAjaxBefore(function(dat, svt){
	//nativeIndicator.show();

	if (!_XECURE) return dat;
});
jex.setAjaxBeforeData(function(dat,svc) {
	nativeIndicator.show();

	if (!_XECURE) return dat;
});

jex.setAjaxCompleteData(function(dat,svc) {
	//_callAppAction(5889, false);
	//nativeIndicator.hide();

	if (!_XECURE) return dat;
	
});

// 쿼리스트링 존재여부 체크. 2016.03.23
function comLoading_isQString() { 

	if (jex.getQString() == null 		|| 
		jex.getQString() == undefined 	|| 
		jex.getQString() == "" 			|| 
		JSON.stringify(jex.getQString()) == "{}") {
	
		return false;
	}
	
	return true;
}
