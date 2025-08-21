/**
 * class.anti.scroll.js
 * DIV 이중 스크롤을 방지해준다.
 * 일단 모바일 전용. (PC에서는 스크롤바 생겨서 보기 흉하다..)
 **/
(function() {
	var arrowToggle = _attrM.extend({
		 init	 	: function(q,$e)	{ this._super(q,$e);				}
		,onload	 	: function()		{
			this.$e.on('click', function(){
                this.$e.child(".icon-down-b").toggleClass("icon-up-b");
            }); 

		}
		,clear		: function()		{									}
		,getValue 	: function() 		{									}
		,setValue 	: function(list) 	{									}
	});
	_nattr['.arrowToggle'] = arrowToggle;
})();


