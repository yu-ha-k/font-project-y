(function() {
	var JexMobileGuideTip = JexPlugin.extend({
		/**
		 * @method load
		 * data-jx-guideTip 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			this.$thisObj = $jq;
			
			if($jq.attr("data-jx-guideTip-onloadYn") != "N") {
				this.execute();
			}
		},
		execute : function() {
			var $thisObj = this.$thisObj;
			var id       = $thisObj.attr("data-jx-guideTip");          //유의사항 id
			var onloadYn = $thisObj.attr("data-jx-guideTip-onloadYn"); //자동실행여부
			var addClass = $thisObj.attr("data-jx-guideTip-addClass"); //추가 Class 명
			
			var res_data = comCacheUtil.getGuideTip(id); //유의사항 캐시데이터 조회
			
			if(isEmpty(res_data) == false) {
				var content = res_data["content"]; //유의사항 내용
				var open_yn = res_data["open_yn"]; //펼침여부
				var html    = '';
				
				if(isEmpty(content)) {
					content = "<li>관리자에 유의사항을 등록해 주세요.</li>";
					open_yn = "Y";
				}
				
				html += '<div class="acd_head accodian_head">';
				html += '	<button type="button" aria-expanded="true" class="acd_btn">';
				html += '		<span class="title">꼭 알아두세요!</span>';
				html += '	</button>';
				html += '</div>';
				html += '<div class="acd_cont accodian_cont">';
				html += '	<div class="inner">';
				html += '		<ul class="list_bullet ty1">';
				html += content; //유의사항 내용
				html += '		</ul>';
				html += '	</div>';
				html += '</div>';
				
				$thisObj.append(html);
				
				$thisObj.attr("class", "acd_wrap accodian_wrap ty3");
				
				if(open_yn == "Y") { //펼침상태
					$thisObj.addClass("active");
					$thisObj.find(".acd_btn").attr("aria-expanded", "true");
				}
				else {
					$thisObj.find(".acd_btn").attr("aria-expanded", "false");
					$thisObj.find(".inner").css("display", "none");
				}
				
				if(isEmpty(addClass) == false) { //추가 Class가 있을경우
					$thisObj.addClass(addClass);
				}
			}
			else {
				return;
			}
		}
	});
	
	jex.plugin.add("JEX_MOBILE_GUIDETIP", JexMobileGuideTip, "data-jx-guideTip");
})();