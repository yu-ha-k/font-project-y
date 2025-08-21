var _onlineguide_var = {
	
};

(function() {
	var sForm_attrs = {
		 "id"         : "data-jx-onlineguide"             //호출할 svc 명
		,"module"	  : "data-jx-onlineguide-module"
		,"stepNo"     : "data-jx-onlineguide-step-no"      //진행 stepNo
		,"prevStepNo" : "data-jx-onlineguide-prev-step-no" //이전 stepNo
		,"callback"   : "data-jx-onlineguide-callback"     //이후 진행
	};
	
	var JexMobileOnlineguide = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			this.$object = $jq;
		},
		setVar : function() {
			//모듈 호출하는 stepNo
			_onlineguide_var.thisSForm  = this;
			_onlineguide_var.parentObj  = this.$object;
			_onlineguide_var.id         = this.$object.attr('id');
			_onlineguide_var.module     = this.$object.attr('data-jx-onlineguide-module');
			_onlineguide_var.stepNo     = this.$object.attr('data-jx-onlineguide-step-no');
			_onlineguide_var.prevStepNo = this.$object.attr('data-jx-onlineguide-prev-step-no');
			_onlineguide_var.callback   = this.$object.attr('data-jx-onlineguide-callback');
			
			//화면 마지막 step 추가
			_onlineguide_var.lastStepNo = jex.plugin.get("JEX_MOBILE_STEP").getLastStepNo();			
		},
		execute	: function(evt,$jq) {
			this.setVar();
			
			var formFilePath = "../../com/onlineguide.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/onlineguide.html";
			}
			$.get(formFilePath).done(function(dat) {
				$onlineguide_html = $(dat);
				
				if(_onlineguide_var.module == "step300"){
					//step300 화면그리기
					_onlineguide_var.parentObj.html($onlineguide_html.find("#onlineguide300").html());
					jex.setJexObj($("#step300"));
					//이벤트 바인딩
					_onlineguide_var.thisSForm.setEventStep300();
					
					uf_goStep(_onlineguide_var.stepNo);
				}
				
				if(_onlineguide_var.module == "step302"){
					//step302 화면그리기
					_onlineguide_var.parentObj.html($onlineguide_html.find("#onlineguide302").html());
					jex.setJexObj($("#step302"));
					//이벤트 바인딩
					_onlineguide_var.thisSForm.setEventStep302();
					
					uf_goStep(_onlineguide_var.stepNo);
				}
				
			});	
		},
		setEventStep300 : function(){
			
			// TODO PDF보기
//			_onlineguide_var.parentObj.find('#div_view_pdf_exp input[name=chk_view_pdf_exp]').on("click", function(e) {
//				if ($(this).is(":checked")) {
//					console.log("PDF 보기 [" + this.id + "]");
//					MobPopup.showAlertPopup("PDF 보기 [" + this.id + "]");
//				}
//			});
//			
//			_onlineguide_var.parentObj.find('#div_view_pdf_exp .btn_view').on("click", function(e) {
//				var chk_idx = $(this).attr('data-idx');
//				console.log("chk_idx:"+chk_idx + " PDF 보기 [" + this.id + "]");
//				
//				$("#chk_view_pdf_exp"+ chk_idx ).prop("checked",true);
//				MobPopup.showAlertPopup("PDF 보기 [" + this.id + "]");
//			});
			
			//이후 진행 callback 이벤트
			_onlineguide_var.parentObj.find('#btn_next_300').on("click", function(e) {
				_onlineguide_var.thisSForm.nextStep300();
			});
						
		},
		setEventStep302 : function(){
			_onlineguide_var.parentObj.find('#div_acn_qna .btn_area button').off("click").on("click", function(e) {
				// 기대 답변과 다를 경우
				if ($(this).val() == "N") {
					MobPopup.showAlertPopup("선택하신 문의에 대해 이해되지 않은 상태에서는 상품이용이 불가합니다.", "", function() {});
				}
			});
			
			
			//이후 진행 callback 이벤트
			_onlineguide_var.parentObj.find('#btn_next_302').on("click", function(e) {
				_onlineguide_var.thisSForm.nextStep302();
			});
			
		},
		nextStep300 : function($jq){
			
			var isConfirm = true;

			$("#div_view_pdf_exp input[name=chk_view_pdf_exp]").each(function() {
				if($(this).is(":checked") == false) {
					isConfirm = false;
					return false;
				}
			});

			//내용확인
			if(isConfirm == false) {
				MobPopup.showAlertPopup("모든 내용을 확인해 주시기 바랍니다.");
				return false;
			}
			
			eval(_onlineguide_var.callback);
			
		},
		nextStep302 : function($jq){
			var _cnt = 0;
			$("#div_acn_qna .btn_area").each(function(idx, obj) {
				// 기대 답변과 다를 경우
				if (String($(obj).find('.active').val()) == "Y") {
					_cnt++;
				}
			});
			
			if(_cnt < 8) {
				MobPopup.showAlertPopup("이해여부 확인이 되지 않은 항목이 있습니다. 다시한번 확인해 주시기 바랍니다.", "", function() { });
			} else {
				MobPopup.showConfirmPopup("설명내용을 이해하지 못하였음에도 이해했다고 확인하는 경우, 추후 권리구제가 어려울수 있습니다. 모든 내용을  이해하고 확인하셨습니까?", "안내", function() {
					//jex.setJexObj($("#fnt_lon_070101_0").attr("data-jx-svc-onload", "true")); //2019.01.11 비대면전자약정서'관련
					eval(_onlineguide_var.callback);
				});
			}
		},
		isOnlineguideStep : function(){
			var curStepNo  = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();     //현재스텝
			
			if(_onlineguide_var.stepNo == curStepNo) return true;

			return false;
		}
	});
	
	jex.plugin.add("JEX_MOBILE_ONLINEGUIDE", JexMobileOnlineguide, "data-jx-onlineguide");
})();

