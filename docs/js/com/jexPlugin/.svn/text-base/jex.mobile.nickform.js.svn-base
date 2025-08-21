(function() {
	window._nickform_flag = true;
	window._nickform_flag2 = true;
	window._nickform_list = [];
	window._nickform_cnt = 0;
	window._nickform_cur = 0;
	window._nickform;
	var sForm_attrs = {
		   "id"    : "data-jx-nickform"                               // 호출할 svc 명
		  ,"gbn"   : "data-jx-nickform-gbn"                           // 카드5, 계좌1
	};
	var sFormObj_attrs = {
		  "btnNickNm"   : "data-jx-nickform-btn-nicknm"     // [별명수정] 버튼
		 ,"nickObjId"	: "data-jx-nickform-nicknm-id"	 
		 ,"acnoObjId"	: "data-jx-nickform-acno-id"
		 ,"callback"    : "data-jx-nickform-callback" 
	};

	var JexMobileNickForm = JexPlugin.extend({
		init : function() {
			window._nickform = this;
			window._nickform_list.push(window._nickform);
		},
		formIds : {
			  "divId"    : "plugin91"      // 별칭정보영역 ID
		},
		/**
		 * @method load data-jx-tranform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			
			window._nickform_list[window._nickform_cnt].$jq = $jq;
			
			//this.id = this.$jq.attr('id');
			window._nickform_list[window._nickform_cnt].id = window._nickform_list[window._nickform_cnt].$jq.data("type");
			window._nickform_list[window._nickform_cnt].stepNo = window._nickform_list[window._nickform_cnt].$jq.attr('data-jx-step-no');

			if ( window._nickform_flag ){
				window._nickform_list[window._nickform_cnt].preapreSvcDiv(window._nickform_list[window._nickform_cnt].$jq);
				window._nickform_flag = false;
			}
			window._nickform_list[window._nickform_cnt].DRACT_DCD = (window._nickform_list[window._nickform_cnt].$jq.attr(sForm_attrs.gbn)=="")?1:window._nickform_list[window._nickform_cnt].$jq.attr(sForm_attrs.gbn);
			//this.id = this.$jq.attr(sForm_attrs.id);
			
			window._nickform_list[window._nickform_cnt].nickObjId = window._nickform_list[window._nickform_cnt].$jq.attr(sFormObj_attrs.nickObjId);
			window._nickform_list[window._nickform_cnt].acnoObjId = window._nickform_list[window._nickform_cnt].$jq.attr(sFormObj_attrs.acnoObjId);
			window._nickform_list[window._nickform_cnt].callback  = window._nickform_list[window._nickform_cnt].$jq.attr(sFormObj_attrs.callback);
			
			window._nickform_list[window._nickform_cnt].CDN = "";
			
			var NickNmButton = window._nickform_list[window._nickform_cnt].$jq.find('[' + sFormObj_attrs.btnNickNm + ']');
			if (NickNmButton.length > 0) {				
				window._nickform_list[window._nickform_cnt].drawNickNmAreaHtml(NickNmButton);
			}
			
			window._nickform_list[window._nickform_cnt].num = window._nickform_cnt;
			window._nickform_cnt++;
		},
		
		/**
		 * 필요한 서비스 영역 append
		 */
		preapreSvcDiv : function($jq) {
			// UIB_COM_SC1221_000001
			var fnt_inq_010501_2 = '<div id="nickform_svc_fnt_inq_010501_2" '
					+ 'data-jx-svc="fnt_inq_010501_2" '
					+ 'data-jx-svc-package="fnt_inq" '
					+ 'data-jx-svc-target=".plugin91@_tran_res_data[0]"'
					+ 'data-jx-svc-errtrx="false" '
					+ 'data-jx-svc-handler-in="nickform_svc_fnt_inq_010501_2.uf_in()" '
					+ 'data-jx-svc-handler-out="nickform_svc_fnt_inq_010501_2.uf_out()" '
					+ 'data-jx-svc-execute="FUNC@nickform_svc_fnt_inq_010501_2.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_inq_010501_2);
			jex.setJexObj($("#nickform_svc_fnt_inq_010501_2"));
			
		},
		
		/**
		 * 
		 */
		drawNickNmAreaHtml : function($jq) {
			$jq.attr('data-jx-execute',       'click')
			   .attr('data-jx-execute-target','FUNC@uf_nickform_edtform('+window._nickform_cnt+')');
			jex.setJexObj($jq);
			
			if( window._nickform_flag2 ){
				// 자주쓰는이체 step
				var nickEditStepHtml = 
					'<div id="plugin91Step" data-jx-step-no="4091" data-jx-effect="slide" style="display:none;">'
					+'<div class="content_wrap ty3 all_account_inquiry">';
				
				
				if(window._nickform.DRACT_DCD=="5"){
					nickEditStepHtml += '<div class="group edit_nickname">'
									 +	'<h3 class="title_text ty1">별명등록/변경</h3>'
									 +	'<div class="form_group">'
									 +	'<div class="card_img"><img src="../../../../img/temp/img_dmp_photo.png" alt="" class="img" /></div>'
									 +	'<div class="input_label ty2">카드별명</div>'
									 +	'<div class="comp_wrap">'
									 +	'<div class="input">'
									 +	'<input type="text" name="" id="plugin91_ACNT_NM" maxlength="15" value="" title="카드별명 내용" />'
									 +	'<button type="button" class="del">텍스트삭제</button>'
									 +	'</div>'
									 +	'</div>'
									 +	'</div>'
									 +	'<ul class="list_bullet ty1 mt_8">'
									 +	'<li>최대 한글 7자, 영문/숫자/특수문자 15자까지 입력</li>'
									 +	'</ul>'
									 +	'</div>';
						
						
						
//						'<div class="bd_t"></div>'
//						+ '<div class="group full_h">'
//						+ '<div class="card_box">'
//						+ '<div class="card_bg">'
//						+ '<p class="nick" id="plugin91_ACNT_NM_before"></p>'
//						+ '<p class="tit" >Card Number</p>'
//						+ '<p class="num" id="plugin91_CDN_mask" data-jx-formatter="cardMask" ></p>'
//						+ '<p class="tit" >Vaild Date</p>'
//						+ '<p class="date" id="plugin91_VALD_MMYY"></p>'
//						+ '<p class="logo_s">iONE뱅크</p>'
//						+ '</div>'
//						+ '</div>'
//						+ '<ul class="list_form01">'
//						+ '<li>'
//						+ '<div class="dt"><label for="plugin91_ACNT_NM">카드별명</label></div>'
//						+ '<div class="dd">'
//						+ '<div class="placeholder_wrap">'
//						+ '<input type="text" id="plugin91_ACNT_NM" maxlength="15" class="vl_name" title="카드별명 내용" >'
//						+ '</div>'
//						+ '<p class="dot_txt">최대 한글7자, 영문/숫자/특수문자 15자까지 입력</p>'
//						+ '</div>'
//						+ '</li>'
//						+ '</ul>'
//						+ '</div>';		
				}else{
					nickEditStepHtml+= '<div class="group edit_nickname">'
									+ '<h3 class="title_text ty1">별명등록/변경</h3>'
									+ '<div class="form_group">'
									+ '	<div class="input_label ty2">계좌번호</div>'
									+ '	<div class="comp_wrap">'
									+ '		<div class="input">'
									+ '			<input type="text" name="" id="plugin91_CDN" value="" title="계좌번호" disabled />'
									+ '			<button type="button" class="del">텍스트삭제</button>'
									+ '		</div>'
									+ '	</div>'
									+ '	<div class="input_label ty2">계좌별명</div>'
									+ '	<div class="comp_wrap">'
									+ '		<div class="input">'
									+ '			<input type="text" name="" id="plugin91_ACNT_NM" value="" title="계좌별명" maxlength="15" />'
									+ '			<button type="button" class="del">텍스트삭제</button>'
									+ '		</div>'
									+ '	</div>'
									+ '</div>'
									+ '	<ul class="list_bullet ty1 mt_8">'
									+ '		<li>최대 한글 7자, 영문/숫자/특수문자 15자까지 입력</li>'
									+ '		<li>계좌별명등록 시 기존 상품명이 별명으로 대체되며 기존 상품명으로 변경을 원하시는 경우에는 해당계좌를 재등록 해야합니다.</li>'
									+ '	</ul>'
									+ '</div>';
				}
				
				nickEditStepHtml+= '<div class="bottom_btn_area">'
					+ '<div class="btn_area ty2">'
					+ '<button type="button" class="btn s_5 c_1 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@uf_nickform_cancel()">취소</button>'
					+ '<button type="button" class="btn s_5 c_3 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@nickform_svc_fnt_inq_010501_2.uf_run()">등록/변경하기</button>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>';
				
				nickEditStepHtml = $(nickEditStepHtml);
				$('#step').append(nickEditStepHtml);
				//jex.setJexObj($jq);
				jex.setJexObj($('#plugin91Step'));
				
				window._nickform_flag2 = false;
			}
		}
		
		
	});

	jex.plugin.add("JEX_MOBILE_NICKFORM", JexMobileNickForm, sForm_attrs.id);
})();

function uf_nickform_edtform(num, p_acno, p_nicknm){	
	if("undefined" != typeof(num) && num != null ){
		window._nickform_cur = num;
	}
	
	var $_this = window._nickform_list[window._nickform_cur].$jq;
	var nickObj = window._nickform_list[window._nickform_cur].nickObjId;
	var acnoObj = window._nickform_list[window._nickform_cur].acnoObjId;
	var plugin91Obj = window._nickform_list[window._nickform_cur].id;
	
	if(("string"==typeof(p_nicknm))){
		if(typeof $_this.find("#"+nickObj) == "input"){
			$_this.find("#"+nickObj).val(p_nicknm);
		}else{
			$_this.find("#"+nickObj).text(p_nicknm);
		}
		uf_nickform_back(p_acno, p_nicknm);
	}else{
		
		if(typeof $_this.find("#"+nickObj) == "input"){
			$("#plugin91_ACNT_NM").val($_this.find("#"+nickObj).val());
		}else{
			$("#plugin91_ACNT_NM").val($_this.find("#"+nickObj).text());
		}	
		//카드인경우
		if(window._nickform_list[window._nickform_cur].DRACT_DCD=="5"){
			window._nickform_list[window._nickform_cur].CDN = $_this.find("#"+acnoObj).attr("CDN_ORI");
			$("#plugin91_CDN_mask").text($_this.find("#"+acnoObj).text());
			$("#plugin91_ACNT_NM_before").text($_this.find("#"+nickObj).text());
			$("#plugin91_VALD_MMYY").text($_this.find("#"+acnoObj).attr("VALD_MMYY"));
		}else{
			if(typeof $_this.find("#"+acnoObj) == "input"){
				window._nickform_list[window._nickform_cur].CDN = $_this.find("#"+acnoObj).val();
			}else{
				window._nickform_list[window._nickform_cur].CDN = $_this.find("#"+acnoObj).text();
			}	
			$("#plugin91_CDN").val(window._nickform_list[window._nickform_cur].CDN);
		}
		
		jex.plugin.get("JEX_MOBILE_STEP").showStep(4091);
	}
}

function form_init(){
	$("#plugin91_CDN").val("");
	$("#plugin91_ACNT_NM").val("");
	
	$("#plugin91_CDN_mask").text("");
	$("#plugin91_ACNT_NM_before").text("");
	$("#plugin91_VALD_MMYY").text("");
}

function uf_nickform_cancel(){
	form_init();
	//var length = comUtil_stepHistory.length;
	//comUtil_back(comUtil_stepHistory[length-1]);
	jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep(); 
}

function uf_nickform_back(p_acno, p_nicknm){
	form_init();
	jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep(); 
	
	//사용자함수가 있는 경우에 함수 호출
	if("undefined" != typeof(window._nickform.callback)){
		var executeFunc = window._nickform.callback;
		executeFunc = executeFunc + "({'p_acno':'"+p_acno+"','p_nicknm':'"+p_nicknm+"'})";
		eval(executeFunc);
	}
}

var nickform_svc_fnt_inq_010501_2 = {
		uf_run : function(){
			if(MobStringUtil.getByte($("#plugin91_ACNT_NM").val()) > 15){
				MobPopup.showAlertPopup("등록가능한 길이를 초과하였습니다.");
				return;
			}
				
			MobPopup.showConfirmPopup("별명을 등록/변경할까요?", "", function() {
				jex.setJexObj($("#nickform_svc_fnt_inq_010501_2").attr("data-jx-svc-onload", "true"));
			});
			
			return;
		},
		uf_in : function($jq, dat){
			dat["CDN"] 		= window._nickform_list[window._nickform_cur].CDN.replace(/-/g,"");
			dat["ACNT_NM"]	= $("#plugin91_ACNT_NM").val();
			dat["DRACT_DCD"] = window._nickform_list[window._nickform_cur].DRACT_DCD; //카드5,계좌1
			dat["W_SRVR_DMND_CNT"] = "1"; //요청건수 1 고정
			return dat;
		},
		uf_out : function($jq, data, index){
			
			if (_isBreak) {
				return;
			}
			
			var _is_error = data["_is_error"];
			var _error_cd = data["_error_cd"];

			if (_is_error == "true") {
				MobPopup.showErrorPopupForData(data);
				return;
			} // 에러처리
			
			MobPopup.showAlertPopup("별명을 저장했어요.", "", function() {uf_nickform_edtform(null, data.ACNO, data.ACNT_NM)});
		},uf_exec : function(){
			
		}
}

