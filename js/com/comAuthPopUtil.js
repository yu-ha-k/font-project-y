/* 휴대폰/인증서 본인인증 팝업 공통 유틸 */
var comAuthPopUtil = {
	options : {
		callbackConfirm : "",	//본인인증 완료 후 호출할 콜백함수 (필수)
		loginCheckYn : "",		//(hp/vid) 로그인 체크 여부
		bznDisplayYn : "",		//(hp/vid) 사업자등록번호 input 노출 여부
		nameDisplayYn : "",		//(vid) 이름 input 노출 여부
		hpnoDisplayYn : "",		//(vid) 핸드폰번호 input 노출 여부
		curSelect : ""			//현재 진행중인 본인인증 (필수) (1:휴대폰, 2:공동인증서, 3:금융인증서)
	},
	/* 초기화 */
	init : function() {
		this.id = "hp_vid_select_pop";
		this.index = null;
		this.options = {};
	},
	/* 선택팝업 열기 */
	open : function(options) {
		this.init();
		this.options = options;
		
		this.drawUI(options);    //UI 생성
		
		comLayerPopUtil.open(this.id); //레이어팝업 열기
		
	},
	/* UI 생성 */
	drawUI : function(options) {
		var html = '';
		html += '<div class="bottom_popup_wrap" id="' + this.id + '" data-log-desc="다른 본인인증 방법 선택 팝업">';
		html += '	<div class="bottom_popup">';
		html += '		<div class="bottom_popup_header">';
		html += '			<h2 class="tit">다른 본인인증 방법 선택</h2>';
		html += '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\''+this.id+'\');">닫기</button>';
		html += '		</div>';
		html += '		<div class="bottom_popup_body">';
		html += '			<div class="select_cert clickable" role="radiogroup">';
		html += '				<button type="button" id="btn_cert_1" role="radio" aria-checked="false" class="btn btn_cert btn_cert_phone" onclick="comAuthPopUtil.select(1)"><span class="text">휴대폰</span></button>';
		html += '				<button type="button" id="btn_cert_2" role="radio" aria-checked="false" class="btn btn_cert btn_cert_lock" onclick="comAuthPopUtil.select(2)"><span class="text">공동인증서</span></button>';
		html += '				<button type="button" id="btn_cert_3" role="radio" aria-checked="false" class="btn btn_cert btn_cert_cloud" onclick="comAuthPopUtil.select(3)"><span class="text">금융인증서</span></button>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="bottom_popup_footer">';
		html += '				<button type="button" id="btn_cert_next" class="btn s_5 c_3 r_2" onclick="comAuthPopUtil.next()" disabled="disabled">다음</button>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';

		if($("#" + this.id).length == 0) {
			$(".container_wrap").append(html);
		}else{
			$("#" + this.id).remove();
			$(".container_wrap").append(html);
		}
		
		$("#btn_cert_"+options.curSelect).hide();
		
		var html = '';
		html += '<div id="step8000" data-jx-step-no="8000" data-jx-effect="slide" data-log-desc="휴대폰 본인인증">';
		html += '	<div id="comHpAuthForm"';
		html += '	   data-jx-hpAuthform="comHpAuthForm"';
		html += '	   data-jx-hpAuthform-parent-id="step8000"';
		html += '	   data-jx-hpAuthform-use-other-auth-yn="Y"';
		if(undefined != options.loginCheckYn){
			html += '	   data-jx-hpAuthform-login-check-yn="'+options.loginCheckYn+'"';
		}
		if(undefined != options.bznDisplayYn){
			html += '	   data-jx-hpAuthform-bzn-display-yn="'+options.bznDisplayYn+'"';
			html += '	   data-jx-hpAuthform-vid-bzn-display-yn="'+options.bznDisplayYn+'"';
		}
		if(undefined != options.nameDisplayYn){
			html += '	   data-jx-hpAuthform-vid-name-display-yn="'+options.nameDisplayYn+'"';
		}
		if(undefined != options.hpnoDisplayYn){
			html += '	   data-jx-hpAuthform-vid-hpno-display-yn="'+options.hpnoDisplayYn+'"';
		}
		html += '	   data-jx-hpAuthform-next-execute-function="'+options.callbackConfirm+'">';
		html += '	</div>';
		html += '</div>';
		
		if($("#step8000").length == 0) {
			$("#step").append(html);
			jex.setJexObj($("#step8000"));
		}
		
		var html = '';
		html += '<div id="step8100" data-jx-step-no="8100" data-jx-effect="slide" data-log-desc="공동인증서 본인인증">';
		html += '	<div id="comVidAuthCertForm"';
		html += '	   data-jx-vidform="comVidAuthCertForm"';
		html += '	   data-jx-vidform-step="step8100"';
		html += '	   data-jx-vidform-cert-type="cert"';

		if(undefined != options.loginCheckYn){
			html += '	   data-jx-vidform-login-check-yn="'+options.loginCheckYn+'"';
		}
		if(undefined != options.nameDisplayYn){
			html += '	   data-jx-vidform-name-display-yn="'+options.nameDisplayYn+'"';
		}
		if(undefined != options.bznDisplayYn){
			html += '	   data-jx-vidform-bzn-display-yn="'+options.bznDisplayYn+'"';
		}
		if(undefined != options.hpnoDisplayYn){
			html += '	   data-jx-vidform-hpno-display-yn="'+options.hpnoDisplayYn+'"';
		}
		html += '	   data-jx-vidform-next-execute-function="'+options.callbackConfirm+'"';
		html += '	   data-jx-vidform-btn-text="다음">';
		html += '	</div>';
		html += '</div>';
		
		if($("#step8100").length == 0) {
			$("#step").append(html);
			jex.setJexObj($("#step8100"));
		}
		
		var html = '';
		html += '<div id="step8200" data-jx-step-no="8200" data-jx-effect="slide" data-log-desc="금융인증서 본인인증">';
		html += '	<div id="comVidAuthFinForm"';
		html += '	   data-jx-vidform="comVidAuthFinForm"';
		html += '	   data-jx-vidform-step="step8200"';
		html += '	   data-jx-vidform-cert-type="fin"';
		
		if(undefined != options.loginCheckYn){
			html += '	   data-jx-vidform-login-check-yn="'+options.loginCheckYn+'"';
		}
		if(undefined != options.nameDisplayYn){
			html += '	   data-jx-vidform-name-display-yn="'+options.nameDisplayYn+'"';
		}
		if(undefined != options.bznDisplayYn){
			html += '	   data-jx-vidform-bzn-display-yn="'+options.bznDisplayYn+'"';
		}
		if(undefined != options.hpnoDisplayYn){
			html += '	   data-jx-vidform-hpno-display-yn="'+options.hpnoDisplayYn+'"';
		}
		html += '	   data-jx-vidform-next-execute-function="'+options.callbackConfirm+'"';
		html += '	   data-jx-vidform-btn-text="다음">';
		html += '	</div>';
		html += '</div>';
		
		if($("#step8200").length == 0) {
			$("#step").append(html);
			jex.setJexObj($("#step8200"));
		}
	},
	/* 본인인증 완료 후 실행되는 콜백 */
	callback : function(){
		this.options.callbackConfirm();
	},
	select : function(index){
		this.index = index;
		$("#"+this.id +" #btn_cert_next").attr("disabled", false);
	},
	next : function(){
		//휴대폰본인인증 mo인증 시
		comLayerPopUtil.close("moauth_pop");
		comLayerPopUtil.close(this.id);
		if(this.index === 1){
			var pluginHpAuthForm = jex.getJexObj($("#step8000 #comHpAuthForm"), "JEX_MOBILE_HPAUTHFORM");
			pluginHpAuthForm.getHpAuthForm(function() {
				uf_goStep(8000);
			});
		}
		if(this.index === 2){
			var pluginVidCertForm = jex.getJexObj($("#step8100 #comVidAuthCertForm"), "JEX_MOBILE_VIDFORM");
			pluginVidCertForm.getVidAuthForm(function() {
				uf_goStep(8100);
			});
		}
		if(this.index === 3){
			var pluginVidFinForm = jex.getJexObj($("#step8200 #comVidAuthFinForm"), "JEX_MOBILE_VIDFORM");
			pluginVidFinForm.getVidAuthForm(function() {
				uf_goStep(8200);
			});
		}
	}
}