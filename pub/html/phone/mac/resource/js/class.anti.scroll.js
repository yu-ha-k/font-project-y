/**
 * class.anti.scroll.js
 * DIV 이중 스크롤을 방지해준다.
 * 일단 모바일 전용. (PC에서는 스크롤바 생겨서 보기 흉하다..)
 **/
(function() {
	var antiscroll = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{
			this.$e.bind("DOMMouseScroll scroll mousewheel touchmove", function(e) {
				if		(e.originalEvent.wheelDelta >=  120) this.scrollTop -= 50;
				else if (e.originalEvent.wheelDelta <= -120) this.scrollTop += 50;
				return false;
			});

		}
		,clear		: function()		{									}
		,getValue 	: function() 		{									}
		,setValue 	: function(list) 	{									}
	});
	_nattr['.antiscroll'] = antiscroll;
})();


