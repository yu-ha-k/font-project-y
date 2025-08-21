/**
 * data.kk-href.js
 * custom attribute 기반 (data-kk-href)를 가진 element에 대한 interaction
 **/
(function() {
	var radio = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ this.defineEvt();		}
		,setValue	: function(val)	{
			var jno = this.$e.attr("data-jno");	
			var grp = this.$e.attr("data-radio");
			var $g	= $("[data-radio="+grp+"]").filter("[data-jno="+jno+"]");
		
			$g.prop("checked", false);							// 기존 check 되어 있던 것들을 해제.
			$g.filter("[value="+val+"]").prop('checked', true);	// 새로 check 
		} ,getValue	: function()	{
			var jni = this.$e.attr("data-jni");	
			var grp = this.$e.attr("data-radio");
			var $g	= $("[data-radio="+grp+"]").filter("[data-jni="+jni+"]");
			
			return $g.filter(":checked").val();
		} ,defineEvt	: function()	{
			var val	= this.getValue();
			var jni = this.$e.attr("data-jni");	
			var grp = this.$e.attr("data-radio");
			this.$e.click(function() {
				if (!$(this).prop('checked')) $(this).prop('checked', true);
				$(grp).filter("[data-jni="+jni+"]:checked").not(this).prop("checked", false);
			});
		}
	});
	_nattr['[data-radio]'] = radio;
})();


