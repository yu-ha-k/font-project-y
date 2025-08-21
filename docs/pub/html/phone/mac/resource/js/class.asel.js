/**
 * 원하는 객체에 SELECTED를 넣어준다.
 *
 * asel-only (옵션. 단독 선택)
 * 
 * <div class='asel asel-only' data-jni='ABC'>
 *		<div class='asel-target' data-value='IBK'></div> 
 *		<div class='asel-target' data-value='NULLEE'></div> 
 *		<div class='asel-target' data-value='HEELO~'></div> 
 * </div> 
 * 
 */
(function() {
	var asel = _attrM.extend({
		init : function(q, $e) {
			this._super(q, $e);
		}, onload : function() {
			var _this = this;
			
			var aseldflt = this.$e.find(".aseldflt");
			
			//this.$e.find(".asel-target").bind('click', function() {		
			this.$e.on('click', ".asel-target", function(){
			
				if ($(this).hasClass("selected")&&$(this)!=aseldflt&&!_this.$e.hasClass("asel-only")) { 
					$(this).removeClass("selected");
				} else {
					if (_this.$e.hasClass("asel-only")) _this.$e.find(".asel-target.selected").removeClass("selected");
					$(this).addClass	("selected");
					
					/*
				     *20240116 웹접근성 추가 
				     * */					    
				    //대시보드 타임라인
				    _this.$e.find(".time-mon.asel-target > p[role='radio']").attr("aria-checked",false);					    
				    $(this).find("p[role='radio']").attr("aria-checked",true);
				    //전 은행 계좌조회 > 조회구분
				    $(this).attr("aria-checked",true).siblings().attr("aria-checked",false);
					
				}
			});
		}, clear : function() {
		}, getValue : function() {
			var $sels	= this.$e.find(".selected");
			var ret		= [];
			for (var ii=0; ii<$sels.length; ii++) {
				ret.push($($sels.get(ii)).attr("data-value"));
			}
			return ret.join(",");
		}, setValue : function(val) { 
			this.$e.find(".asel-target").removeClass("selected");
			var arr = val.split(",");
			for (var ii=0; ii<arr.length; ii++) {
				this.$e.find("[data-value="+arr[ii]+"]").addClass("selected");
			}
		}
	});
	_nattr['.asel'] = asel;
})();
