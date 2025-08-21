(function() {
	/**
	 * Date: 2017.10.16
	 * 
	 * 1. 계좌선택 영역 2. 입금정보 3. 선택사항
	 * 
	 * @namespace JexMobileTranForm
	 */
	window._b2bForm;
	
	var corpCertLogin = b2bChkCorpCertLogin();
	
	if(corpCertLogin != "Y"){
		setTimeout(function () {
			nativeDimm.hide();
			comWebkey_goMenu("5005", "fnt_b2b_000000_0", "");
		}, 500);
	}
	
	var sForm_attrs = {
		  "id"    : "data-jx-b2bform"                                   // 호출할 svc 명
	};
	var sFormObj_attrs = {
			 "areaDrotCrd"        : "data-jx-b2bform-area-drot-crd"          	// 구매카드 서비스목록 
		   , "areaDrotStlmAcn"    : "data-jx-b2bform-area-drot-stlmacn"         // 입금계좌번호(당좌계좌번호) 서비스목록
		   , "areaDrotStlmAcnKind": "data-jx-b2bform-area-drot-stlmacn_kind"    // 입금계좌번호(당좌계좌번호) 서비스 구분
		   , "areaDrotEbnkAcn"    : "data-jx-b2bform-area-drot-ebnkacn"         // 전자어음 계좌조회 서비스목록
		   , "areaDrotCrdTrigger"		: "data-jx-b2bform-area-drot-crd_trigger"    		// 구매카드 서비스 조회 완료 트리거
		   , "areaDrotStlmAcnTrigger"	: "data-jx-b2bform-area-drot-stlmacn_trigger"    	// 입금계좌번호(당좌계좌번호) 서비스 조회 완료 트리거
		   , "areaDrotEbnkAcnTrigger"   : "data-jx-b2bform-area-drot-ebnkacn_trigger"       // 전자어음 계좌조회 서비스목록 완료 트리거
	};
	
	var JexMobileB2bForm = JexPlugin .extend({
		init : function() {
			window._b2bForm = this;
		},
		formIds : {
			 "drotCrdInfoId"    	: "drotCrdInfo"       		// 구매카드정보영역 ID
			,"crdListTbl"       	: "crdListTbl"        		// 구매카드리스트영역 ID
			,"drotStlmAcnInfoId"    : "drotStlmAcnInfo"       	// 입금계좌번호(당좌계좌번호) 정보영역 ID
			,"stlmAcnListTbl"       : "stlmAcnListTbl"        	// 입금계좌번호(당좌계좌번호) 리스트영역 ID	
			,"drotEbnkAcnInfoId"    : "drotEbnkAcnInfo"       	// 전자어음 계좌조회 정보영역 ID
			,"ebnkAcnListTbl"       : "ebnkAcnListTbl"        	// 전자어음 계좌조회 리스트영역 ID	
		},
		/**
		 * @method load data-jx-b2bform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {

			this._this = this;

			this.$jq = $jq;
			this.id = $jq.attr(sForm_attrs.id);
			this.stepNo = $jq.attr('data-jx-step-no');
			
			this.B2B_NEW_SVC_USE_YN;		
			
			this.b2bform_fnt_b2b_020301_1_List;
			this.b2bform_fnt_b2b_020401_1_List;
			this.b2bform_fnt_b2b_041211_1_List;
			this.b2bform_fnt_b2b_043412_1_List;
			this.b2bform_fnt_b2b_010101_1_bankList;
			this.b2bform_fnt_b2b_010101_1_bankList2;
			this.b2bform_fnt_b2b_041701_1;
			
			//45 : "NOTE_BSWR_DCD": "0045" || "PDM": "전자어음발행서비스"
			//46 : "NOTE_BSWR_DCD": "0046" || "PDM": "전자어음수취서비스"
			//45,46 : 45 + 46
			this.b2bform_fnt_b2b_041211_1_List_Kind = $jq.attr(sFormObj_attrs.areaDrotStlmAcnKind);
			this.drotCrdTrigger = $jq.attr(sFormObj_attrs.areaDrotCrdTrigger);
			this.drotStlmAcnTrigger = $jq.attr(sFormObj_attrs.areaDrotStlmAcnTrigger);
			this.drotEbnkAcnTrigger = $jq.attr(sFormObj_attrs.areaDrotEbnkAcnTrigger);
			
			this.preapreSvcDiv();
			
			/**
			 * [구매카드] 영역
			 */				
			var drotCrdArea = $jq.find('[' + sFormObj_attrs.areaDrotCrd + ']:first');
			if (drotCrdArea.length > 0) {
				this.drawDrotCrdAreaHtml(drotCrdArea);
			}
			
			/**
			 * [입금계좌번호(당좌계좌번호)] 영역
			 */				
			var drotStlmAcnArea = $jq.find('[' + sFormObj_attrs.areaDrotStlmAcn + ']:first');
			if (drotStlmAcnArea.length > 0) {
				this.drawDrotStlmAcnAreaHtml(drotStlmAcnArea);
			}
			
			/**
			 * [전자어음 계좌조회] 영역
			 */				
			var drotEbnkAcnArea = $jq.find('[' + sFormObj_attrs.areaDrotEbnkAcn + ']:first');
			if (drotEbnkAcnArea.length > 0) {
				this.drawDrotEbnkAcnAreaHtml(drotEbnkAcnArea);
			}
		},
		
		/**
		 * 필요한 서비스 영역 append
		 */	
		preapreSvcDiv : function() {
			var svcList = this.id;
			var svcListSplit = svcList.split(",");
			
			for (var i=0; i<svcListSplit.length; i++) {
				if (svcListSplit[i] == "fnt_b2b_020301_1") {					// 구매카드 카드목록조회
					$('body').append('<input id="CDN_VAL" type="hidden"/>');
					
					var fnt_b2b_020301_1 = '<div id="b2bform_fnt_b2b_020301_1" '
							+ 'data-jx-svc="fnt_b2b_020301_1" '
							+ 'data-jx-svc-package="fnt_b2b" '
							+ 'data-jx-svc-target="#crdListTbl@_tran_res_data[0]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_020301_1.uf_in()" '
							+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_020301_1.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_020301_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_020301_1);
					jex.setJexObj($("#b2bform_fnt_b2b_020301_1").attr("data-jx-svc-onload","true"));
				} else if(svcListSplit[i] == "fnt_b2b_020401_1") {				// 구매카드 로그인 서비스
					var fnt_b2b_020401_1 = '<div id="b2bform_fnt_b2b_020401_1" '
						+ 'data-jx-svc="fnt_b2b_020401_1" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_020401_1.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_020401_1.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_020401_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_020401_1);
					jex.setJexObj($("#b2bform_fnt_b2b_020401_1").attr("data-jx-svc-onload","true"));
				} else if(svcListSplit[i] == "fnt_b2b_041501_2") {				// 전자어음 회원정보 목록조회
					var fnt_b2b_041501_2 = '<div id="b2bform_fnt_b2b_041501_2" '
						+ 'data-jx-svc="fnt_b2b_041501_2" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="#resList@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_041501_2.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_041501_2.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_041501_2.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041501_2);
				} else if(svcListSplit[i] == "fnt_b2b_041501_3") {				// 전자어음 회원정보 삭제
					var fnt_b2b_041501_3 = '<div id="b2bform_fnt_b2b_041501_3" '
						+ 'data-jx-svc="fnt_b2b_041501_3" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_041501_3.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_041501_3.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_041501_3.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041501_3);
				} else if(svcListSplit[i] == "fnt_b2b_041501_4") {				// 전자어음 회원정보 등록전 조회
					var fnt_b2b_041501_4 = '<div id="b2bform_fnt_b2b_041501_4" '
						+ 'data-jx-svc="fnt_b2b_041501_4" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="step3@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_041501_4.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_041501_4.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_041501_4.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041501_4);
				} else if(svcListSplit[i] == "fnt_b2b_041501_5") {				// 전자어음 회원정보 등록
					var fnt_b2b_041501_5 = '<div id="b2bform_fnt_b2b_041501_5" '
						+ 'data-jx-svc="fnt_b2b_041501_5" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_041501_5.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_041501_5.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_041501_5.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041501_5);
				} else if(svcListSplit[i] == "fnt_b2b_041211_1") {				// 입금계좌번호(당좌계좌번호) 리스트
					$('body').append('<input id="STLM_ACN_VAL" type="hidden"/>');
					
					var fnt_b2b_041211_1 = '<div id="b2bform_fnt_b2b_010101_1" '
						+ 'data-jx-svc="fnt_b2b_010101_1" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="#stlmAcnListTbl@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_010101_1.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_010101_1.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_010101_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041211_1);
					jex.setJexObj($("#b2bform_fnt_b2b_010101_1").attr("data-jx-svc-onload","true"));
				} else if (svcListSplit[i] == "fnt_b2b_043412_1") {					// 전자어음 계좌조회
					$('body').append('<input id="EBNK_ACN_VAL" type="hidden"/>');
					
					var fnt_b2b_043412_1 = '<div id="b2bform_fnt_b2b_043412_1" '
						+ 'data-jx-svc="fnt_b2b_043412_1" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="#ebnkAcnListTbl@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_043412_1.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_043412_1.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_043412_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_043412_1);
					jex.setJexObj($("#b2bform_fnt_b2b_043412_1").attr("data-jx-svc-onload","true"));
				} else if (svcListSplit[i] == "fnt_b2b_041701_2") {					// 교부량조회		
					$('body').append('<input id="CRAC_ACN_VAL" type="hidden"/>');
					
					var fnt_b2b_041701_2 = '<div id="b2bform_fnt_b2b_041701_2" '
						+ 'data-jx-svc="fnt_b2b_041701_2" '
						+ 'data-jx-svc-package="fnt_b2b" '
						+ 'data-jx-svc-target="#divCRAC_ACNInfo@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="b2bform_fnt_b2b_041701_2.uf_in()" '
						+ 'data-jx-svc-handler-out="b2bform_fnt_b2b_041701_2.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@b2bform_fnt_b2b_041701_2.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_b2b_041701_2);
				}
			}
			
		},
		
		/**
		 * [구매카드 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#CDN\').focusout() 확인
		 */
		drawDrotCrdAreaHtml : function($jq) {
			window._b2bForm.drotCrdViewType = $jq.attr(sFormObj_attrs.areaDrotCrd);
			var crdListPopupHtml;
			crdListPopupHtml = ""
				+ '<div class="bottom_popup_wrap" id="crdListPopup" title="약정번호" data-jx-effect="slide" data-log-desc="약정번호선택 팝업">' // step 4010
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">약정번호</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'crdListPopup\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body">'
				+ '			<ul class="select_list ty1" role="listbox" id="' + this.formIds.crdListTbl + '" data-jx-list="' + this.formIds.crdListTbl + '">'
				+ '				<li role="option" tabindex="-1" aria-selected="false"'
				+ '					data-jx-execute="click" '
				+ '					data-jx-setter="" '
				+ '					data-jx-setter-source="this" '
				+ '					data-jx-setter-handler="b2bform_crdListSetter()" '
				+ '					data-jx-setter-target="#' + window._b2bForm.formIds.drotCrdInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'crdListPopup\')" > '
				+ '					<span id="CDN" data-jx-formatter="card"></span> '
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
				
				
//				'<div class="fullpop" id="crdListPopup" data-jx-step-no="4010" data-jx-effect="slide" style="display:none;">'
//				+ '<h2>약정번호 선택</h2>'
//					+ '<ul class="list_ty02" id="' + this.formIds.crdListTbl + '" data-jx-list="' + this.formIds.crdListTbl + '">'
//					+ '<li '
//					+ 'data-jx-execute="click" '
//					+ 'data-jx-setter="" '
//					+ 'data-jx-setter-source="this" '
//					+ 'data-jx-setter-handler="b2bform_crdListSetter()" '
//					+ 'data-jx-setter-target="#' + window._b2bForm.formIds.drotCrdInfoId + '" '
//					+ 'data-jx-setter-execute="FUNC@uf_back()" > '
//						+ '<a href="#" role="button"> '
//							+ '<span id="CDN" data-jx-formatter="card"></span> '
//						+ '</a>'
//					+ '</li>'
//				+ '</ul>'
//			+ '</div>';
			$('#step').append(crdListPopupHtml);
			jex.setJexObj($('#crdListPopup'));
			
			var crdAreaHtml;
			if("fnt_b2b_020301_1" == window._b2bForm.drotCrdViewType) {
				crdAreaHtml =
					'<div id="' + this.formIds.drotCrdInfoId + '" >'
						+ '<h3 class="input_label ty1">약정번호</h3>'
						+ '<div class="dropdown ty2" role="button" title="약정번호 목록보기">'
							+ '<div class="dropdown_text" id="crdList"><span class="txt" id="CDN">선택가능 정보가 없습니다</span></div>'
						+ '</div>'
					+ '</div>';
					
					
//					'<div id="' + this.formIds.drotCrdInfoId + '" >'
//					+ '<div class="dt"><label for="b2b01">약정번호</label></div>'
//						+ '<div class="dd">'
//							+ '<div class="dropdown" role="button" title="약정번호 선택">'	
//								+ '<a href="#crdListPopup" id="crdListPopup" role="button"><span class="txt_placeholder" id="CDN">선택가능 정보가 없습니다</span></a>'
//							+ '</div>'
//						+ '</div>'
//					+ '</div>'
//				+ '</div>';
			} 
			
			crdAreaHtml = $(crdAreaHtml);
//			$jq.find("#"+this.formIds.drotCrdInfoId).on('click', function(evt) {				
////				var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
////				if (cur_step != 4010 && window._b2bForm.b2bform_fnt_b2b_020301_1_List.length > 0) {
//				if (window._b2bForm.b2bform_fnt_b2b_020301_1_List.length > 0) {
////					b2bform_uf_goStep(4010);
//					comLayerPopUtil.open(this.formIds.drotCrdInfoId);
//				}
//			});
//			$jq.find("#crdList").on('click', function(evt) {				
//				if (window._b2bForm.b2bform_fnt_b2b_020301_1_List.length > 0) {
//					comLayerPopUtil.open("crdListPopup");
//				}
//			});
			$jq.on('click', function(evt) {
				if (window._b2bForm.b2bform_fnt_b2b_020301_1_List.length > 0) {
					comLayerPopUtil.open("crdListPopup");
				}
			});
			$jq.html(crdAreaHtml);
			jex.setJexObj($jq);			
		},
		
		/**
		 * [입금계좌번호(당좌계좌번호) & 선택 리스트] 팝업
		 * ,FUNC@$(\'#STLM_ACN\').focusout() 확인
		 */
		drawDrotStlmAcnAreaHtml : function($jq) {
			window._b2bForm.drotStlmAcnViewType = $jq.attr(sFormObj_attrs.areaDrotStlmAcn);
			
			var divTitle="입금계좌번호 선택";
			if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "45") divTitle = "당좌계좌번호(발행) 선택";
			else if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "46") divTitle = "당좌계좌번호(수취) 선택";
			else if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "45,46") divTitle = "당좌계좌번호(수취,발행) 선택";
			
			var stlmAcnListPopupHtml;
			stlmAcnListPopupHtml = 
				'<div class="bottom_popup_wrap" id="stlmAcnListPopup" data-jx-effect="slide" data-log-desc="당좌계좌번호선택 팝업">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">'+divTitle+'</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'stlmAcnListPopup\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body">'
							+ '<ul class="select_list ty1" id="' + this.formIds.stlmAcnListTbl + '" data-jx-list="' + this.formIds.stlmAcnListTbl + '">'
								+ '<li role="option" tabindex="-1"'
									+ 'data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="this" '
									+ 'data-jx-setter-handler="b2bform_stlmAcnListSetter()" '
									+ 'data-jx-setter-target="#' + window._b2bForm.formIds.drotStlmAcnInfoId + '" '
//									+ 'data-jx-setter-execute="FUNC@b2bform_uf_clearResult(event)" > '
									+ 'data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'stlmAcnListPopup\');" > '
									+ '<div class="item">'
										+ '<div class="item_top">'
											+ '<div class="item_top_text">'
												+ '<span class="accouont_no" id="STLM_ACN" data-jx-formatter="account"></span>&nbsp'
												+ '<span class="txt" id="STLM_ACN_NM"></span>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
//				'<div class="fullpop" id="stlmAcnListPopup"  data-jx-step-no="4011" data-jx-effect="slide" style="display:none;">'
//				+ '<h2>'+divTitle+'</h2>'
//					+ '<ul class="list_ty02" id="' + this.formIds.stlmAcnListTbl + '" data-jx-list="' + this.formIds.stlmAcnListTbl + '">'
//					+ '<li '
//					+ 'data-jx-execute="click" '
//					+ 'data-jx-setter="" '
//					+ 'data-jx-setter-source="this" '
//					+ 'data-jx-setter-handler="b2bform_stlmAcnListSetter()" '
//					+ 'data-jx-setter-target="#' + window._b2bForm.formIds.drotStlmAcnInfoId + '" '
//					+ 'data-jx-setter-execute="FUNC@b2bform_uf_clearResult()" > '
//						+ '<a href="#" role="button"> '
//							+ '<span class="txt_accout" id="STLM_ACN" data-jx-formatter="account"></span>'
//							+ '<span class="txt_accout_tit tit_nick" id="STLM_ACN_NM"></span>'
//						+ '</a>'
//					+ '</li>'
//				+ '</ul>'
//			+ '</div>';
			$('#step').append(stlmAcnListPopupHtml);
			jex.setJexObj($('#stlmAcnListPopup'));
			
			var stlmAcnAreaHtml;
			if("fnt_b2b_041211_1" == window._b2bForm.drotStlmAcnViewType) {
				stlmAcnAreaHtml =
					'<div class="dropdown ty2" id="' + this.formIds.drotStlmAcnInfoId + '" role="button" title="당좌계좌번호 목록보기">'
						+ '<div class="dropdown_text" id="STLM_ACN">선택가능 정보가 없습니다</div>'
					+ '</div>';
				
//					'<div id="' + this.formIds.drotStlmAcnInfoId + '" >'
//					+ '<div class="dd">'
//						+ '<div class="dropdown" role="button" title="'+divTitle+'">'	
//							+ '<a href="#stlmAcnListPopup" role="button"><span class="txt_placeholder" id="STLM_ACN">선택가능 정보가 없습니다</span></a>'
//						+ '</div>'
//					+ '</div>'
//				+ '</div>';
			} 			
				
			stlmAcnAreaHtml = $(stlmAcnAreaHtml);
			$jq.on('click', function(evt) {
				
				var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
				if (cur_step != 4011 && window._b2bForm.b2bform_fnt_b2b_041211_1_List.length > 0) {
//					b2bform_uf_goStep(4011);
					
					var selStlmAcn = $("#STLM_ACN_VAL").val();
					
					// 이미 선택된 당좌계좌를 선택표시 하는 로직
					$("#stlmAcnListPopup").find('ul').children().each(function(idx, item){
					    var stlmAcn = $(item).find("#STLM_ACN").text().replace(/[^0-9]/g,'');
					    if(selStlmAcn == stlmAcn){
					        comSelectPopUtil.setActiveClass($(item));
					    }
					})
					
					comLayerPopUtil.open("stlmAcnListPopup");
				}
			});
			$jq.html(stlmAcnAreaHtml);
			jex.setJexObj($jq);			
		},
		
		/**
		 * [전자어음 계좌조회 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#EBNK_ACN\').focusout() 확인
		 */
		drawDrotEbnkAcnAreaHtml : function($jq) {
			window._b2bForm.drotEbnkAcnViewType = $jq.attr(sFormObj_attrs.areaDrotEbnkAcn);
			
			var ebnkAcnListPopupHtml;
			ebnkAcnListPopupHtml = 
				'<div class="bottom_popup_wrap" id="ebnkAcnListPopup" data-jx-effect="slide" data-log-desc="전자어음계좌번호선택 팝업">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">전자어음 계좌목록</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'ebnkAcnListPopup\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body">'
							+ '<ul class="select_list ty1" id="' + this.formIds.ebnkAcnListTbl + '" data-jx-list="' + this.formIds.ebnkAcnListTbl + '">'
								+ '<li role="option" tabindex="-1"'
									+ 'data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="this" '
									+ 'data-jx-setter-handler="b2bform_ebnkAcnListSetter()" '
									+ 'data-jx-setter-target="#' + window._b2bForm.formIds.drotEbnkAcnInfoId + '" '
		//								+ 'data-jx-setter-execute="FUNC@b2bform_uf_clearResult(event)" > '
									+ 'data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'ebnkAcnListPopup\');" > '
									+ '<div class="item">'
										+ '<div class="item_top">'
											+ '<div class="item_top_text">'
												+ '<span class="accouont_no" id="EBNK_ACN" data-jx-formatter="account"></span>&nbsp'
												+ '<span class="txt" id="EBNK_ACN_NM"></span>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
				
//				'<div class="fullpop" id="ebnkAcnListPopup"  data-jx-step-no="4012" data-jx-effect="slide" style="display:none;">'
//				+ '<h2>전자어음 계좌목록</h2>'
//					+ '<ul class="list_ty02" id="' + this.formIds.ebnkAcnListTbl + '" data-jx-list="' + this.formIds.ebnkAcnListTbl + '">'
//					+ '<li '
//					+ 'data-jx-execute="click" '
//					+ 'data-jx-setter="" '
//					+ 'data-jx-setter-source="this" '
//					+ 'data-jx-setter-handler="b2bform_ebnkAcnListSetter()" '
//					+ 'data-jx-setter-target="#' + window._b2bForm.formIds.drotEbnkAcnInfoId + '" '
////					+ 'data-jx-setter-execute="FUNC@b2bform_uf_clearResult(event)" > '
//					+ 'data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'ebnkAcnListPopup\');" > '
//						+ '<a href="#" role="button"> '
//							+ '<span class="txt_accout" id="EBNK_ACN" data-jx-formatter="account"></span> '
//							+ '<span class="txt_accout_tit tit_nick" id="EBNK_ACN_NM"></span>'
//						+ '</a>'
//					+ '</li>'
//				+ '</ul>'
//			+ '</div>';
			$('#step').append(ebnkAcnListPopupHtml);
			jex.setJexObj($('#ebnkAcnListPopup'));
			
			var ebnkAcnAreaHtml;
			if("fnt_b2b_043412_1" == window._b2bForm.drotEbnkAcnViewType) {
				ebnkAcnAreaHtml =
					'<div class="dropdown ty2" id="' + this.formIds.drotEbnkAcnInfoId + '" role="button" title="전자어음 계좌목록">'
						+ '<div class="dropdown_text" id="EBNK_ACN">선택가능 정보가 없습니다</div>'
					+ '</div>';
					
//					'<div id="' + this.formIds.drotEbnkAcnInfoId + '" >'
//					+ '<div class="dd">'
//						+ '<div class="dropdown" role="button" title="전자어음 계좌목록">'	
//							+ '<a href="#ebnkAcnListPopup" role="button"><span class="txt_placeholder" id="EBNK_ACN">선택가능 정보가 없습니다</span></a>'
//						+ '</div>'
//					+ '</div>'
//				+ '</div>';
			} 			
				
			ebnkAcnAreaHtml = $(ebnkAcnAreaHtml);
			$jq.on('click', function(evt) {
				
				var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
				if (cur_step != 4012 && window._b2bForm.b2bform_fnt_b2b_043412_1_List.length > 0) {
//					b2bform_uf_goStep(4012);
					comLayerPopUtil.open("ebnkAcnListPopup");
				}
			});
			$jq.html(ebnkAcnAreaHtml);
			jex.setJexObj($jq);			
		}		
	});

	jex.plugin.add("JEX_MOBILE_B2BFORM", JexMobileB2bForm, "data-jx-b2bform");
})();

//[구매카드 & 선택 리스트]
function b2bform_crdListSetter($jq, data) {
	var dat = {};
	
	if("fnt_b2b_020301_1" == window._b2bForm.drotCrdViewType) { 
		$('#CDN').text(mobFormatter.card(data["CDN"]));
		$('#CDN_VAL').val(data["CDN"]);
		$('#CTLM_AMT').text(mobFormatter.number(data["CTLM_AMT"])); 					//총 한도
		$('#BUCA_USE_AMT').text(mobFormatter.number(data["BUCA_USE_AMT"])); 			//총 사용금액
		$('#USE_ABL_AMT').text(mobFormatter.number(data["USE_ABL_AMT"]));			//총 사용가능금액
		$('span[id=TRN_AMT]').text(mobFormatter.number(data["TRN_AMT"])); 					//구매기업약정한도
		$('span[id=ALNC_NM]').text(data["ALNC_NM"]); 					//구매기업명
		$('span[id=CARD_NM]').text(data["CARD_NM"]); 					//카드명
		$('span[id=OLD_TRN_LMEH_AMT]').text(mobFormatter.number(data["OLD_TRN_LMEH_AMT"])); 	//구매기업약정사용금액
		$('span[id=USE_ABL_AMT_01]').text(mobFormatter.number(data["USE_ABL_AMT_01"])); 		//구매기업약정사용가능금액
	} 
	
	//  화면 진입시 자동 조회 되도록 트리거 발생
	if(window._b2bForm.drotCrdTrigger == "Y"){
		setTimeout(function () {
			$("#CDN_VAL").triggerHandler("change");
		}, 500);
	}
	
	if(!(typeof $jq == 'undefined')){
		comSelectPopUtil.setActiveClass($jq);
	}

	return dat;
}

/**
 * [구매카드 조회]
 */
var b2bform_fnt_b2b_020301_1 = {
	uf_in : function($jq, sourceData) {
		var reqData = {};
		reqData["TRN_DCD"] = $("#TRN_DCD").val();
		
		return reqData;
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			
			return "STOP_SVC";
		} else {
			var jsonDat = {};
			var pushData    = [];
			
			for (var i in data["list"]) {
				pushData.push(data["list"][i]);
			}
			
			jsonDat["crdListTbl"] = pushData;
			
			window._b2bForm.b2bform_fnt_b2b_020301_1_List = pushData;
			
			window._b2bForm.B2B_NEW_SVC_USE_YN = data["B2B_NEW_SVC_USE_YN"];	//i-ONE뱅크(기업) B2B신규서비스사용여부   N (구서비스), Y (신서비스)
			
			return jsonDat;
		}
	},
	uf_exec : function() {
		if (window._b2bForm.b2bform_fnt_b2b_020301_1_List.length > 0) {
			b2bform_crdListSetter(undefined, window._b2bForm.b2bform_fnt_b2b_020301_1_List[0]);
		}
		else{
			if(window._b2bForm.drotCrdTrigger == "Y"){
				comLayerPopUtil.open('popup1');
			}
		}
		
		if (typeof(callBack_fnt_b2b_020301_1) =="function") {
			callBack_fnt_b2b_020301_1(window._b2bForm.B2B_NEW_SVC_USE_YN);
		}
	}
}

/**   
 * [구매카드로그인]
 */
var b2bform_fnt_b2b_020401_1 = {
	uf_in : function($jq){
	},   
	uf_out : function($jq, data, index){
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			b2bform_fnt_b2b_020401_1_List = data;	
		}
		return {};
	},uf_exec : function(){
		callBack_fnt_b2b_020401_1(b2bform_fnt_b2b_020401_1_List);
	}
}

/**
 * [전자어음 회원정보 목록조회]
 */
var b2bform_fnt_b2b_041501_2 = {
	uf_in : function($jq){
		var dat = {};
		dat["W_SRVR_DMND_PAGE"] = _this.page;	//페이지번호
		dat["EBNK_ELB_DCD"] 	= $("#hEBNK_ELB_DCD").val();			//구분코드(1.발행 2.배서)
		return dat;
	},   
	uf_out : function($jq, data, index){
		if (data["_is_error"] == "true" && data["_error_cd"] != "SQL010") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			_this.W_SRVR_TTCNT = data["W_SRVR_TTCNT"] // 총 페이지 수
			
			var resultList = {};
			var pushData    = [];
			var tempInhbBsnnRtn = "";
			for (var i in data["list"]) {
				pushData.push(data["list"][i]);
			}
			resultList["resList"] = pushData;

			return resultList;	
		}
		
	},uf_exec : function(){
		$("#step1Result").show();

		//업무단으로 빼야 할 소스
		$("#resList").find("li").each(function(){
			var rId = $(this).attr("data-rownum");
			$(this).find("input").attr("id",rId);
			$(this).find("label").attr("for",rId);
		});
		
		if(_this.page * _this.pageSize < _this.W_SRVR_TTCNT){ // 페이징 처리
			$("#btnMore").show();
		}else{
			$("#btnMore").hide();
		}
		
		if (typeof(callBack_fnt_b2b_041501_2) =="function") {
			callBack_fnt_b2b_041501_2();
		}
	}
}

/**
 * [전자어음 회원정보 삭제]
 */
var b2bform_fnt_b2b_041501_3 = {
	uf_in : function($jq){

		var dat = {};
		dat["EBNK_SALE_INHB_BSNN_RTN"] 	=  $.trim(_this.DelData["INHB_BSNN_RTN_MASK"]).replace(/-/g, "");	//실명번호
		dat["EFNC_BNCD"] 				= _this.DelData["hEFNC_BNCD"];									//은행코드
		dat["AGRM_ACN"] 				= $.trim(_this.DelData["CRAC_ACN_MASK"]).replace(/-/g, "");			//계좌번호
		dat["EBNK_ELB_DCD"] 			= $("#hEBNK_ELB_DCD").val();									//구분코드(1.발행 2.배서)
		
		return dat;
	},   
	uf_out : function($jq, data, index){
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			if (_isBreak) {
				return;
			}

			_this.error = data["_is_error"];
			var _error_cd = data["_error_cd"];
			
			return data;
		}
	},uf_exec : function(){
		MobPopup.showAlertPopup("정상적으로 삭제되었습니다.", "", function() {
			uf_reLoad();
		});
	}
}
/**
 * [전자어음 회원정보 등록전조회]
 */
var b2bform_fnt_b2b_041501_4 = {
	uf_in : function($jq){
		var dat = {};
		var bankCd = isEmpty($("#bank_cd").val()) ? $("#org_code").val() : $("#bank_cd").val();
		
		dat["ELB_RNN"] 	= $.trim($("#ELB_RNN").val()).replace(/-/g, ""); //주민사업자등록번호
		dat["BNCD"]		= bankCd;										 //은행코드
		dat["MNRC_ACN"]	= $.trim($("#MNRC_ACN").val()).replace(/-/g, "");//입금계좌번호
		
		if(dat["ELB_RNN"].length == "10"){
			_this.sSrch_cndt_dsnc = "1";
		} else {
			_this.sSrch_cndt_dsnc = "2";
		}
		dat["SRCH_CNDT_DCD"]		= _this.sSrch_cndt_dsnc;			 //검색조건구분
		
		return dat;
	},   
	uf_out : function($jq, data, index){
		if (data["_is_error"] == "true") {  // && data["_error_cd"] != "KFTCELB313"
			MobPopup.showErrorPopupForData(data, function() { 
				$("#ELB_RNN").val("");
				$("#bank_nm").text("기업은행");
				$("#bank_cd").val("003");
				$("#MNRC_ACN").val("");
				
				if (typeof($("#in_entp_nm").val()) != "undefined") {
					$("#in_entp_nm").val("");
				}
				
				b2bform_uf_goStep(2);
			});
			
			return "STOP_SVC";
		} else {
			if (_isBreak) {
				return;
			}
			_this.error = data["_is_error"];
			var _error_cd = data["_error_cd"];
			
			var setName  = $("#in_entp_nm").val();
			_this.KFTC_DRW_CGN = data["KFTC_DRW_CGN"];
				
			data["KFTC_DRW_CGN"] = getJuminFormNote(data["KFTC_DRW_CGN"],"B"); // 사업자,주민번호 마스킹 처리
			
			//사업자번호, 주민번호 input 별 법인(대표자)명 변경
			if(_this.sSrch_cndt_dsnc == "1"){
				$("#KFTC_DRW_NAME").text(data["KFTC_DRW_CPM"]);
			} else {
				if(data["KFTC_DRW_CPM"] != ""){
					$("#KFTC_DRW_NAME").text(data["KFTC_DRW_NM"] + "("+data["KFTC_DRW_CPM"]+")");
				} else {
					if(setName != "" && setName != undefined){
						$("#KFTC_DRW_NAME").text(data["KFTC_DRW_NM"] + "("+setName+")");
					}else{
						$("#KFTC_DRW_NAME").text(data["KFTC_DRW_NM"]);
					}
				}
			}
			if(data["DRW_CUS_DCD"] == "1"){
				data["DRW_CUS_DCD"] = "발행인";
				_this.DRW_CUS_DCD	= "1";
	        } else if(data["DRW_CUS_DCD"] == "2"){
	        	data["DRW_CUS_DCD"] = "수취.배서인";
	        	_this.DRW_CUS_DCD	= "2";
	        } else if(data["DRW_CUS_DCD"] == "3"){
	        	data["DRW_CUS_DCD"] = "보증인";
	        	_this.DRW_CUS_DCD	= "3";
	        }
			if(_this.DRW_CUS_DCD == "1" || _this.DRW_CUS_DCD == "2"){
				$("#step3_commit_button").show();
			} else {
				$("#step3_commit_button").hide();
			}
			
			$("#step3").setAll(data);
			

			return data;	
		}
	},uf_exec : function(){
		/*if(_this.error){
			MobPopup.showAlertPopup("입력하신 회원정보가 일치하지 않습니다. 다시 확인해주시기 바랍니다.", "알림", null);
			return;
		} else {*/
			b2bform_uf_goStep('3');
		//}
	}
}

/**
 * [전자어음 회원정보 등록]
 */
var b2bform_fnt_b2b_041501_5 = {
	uf_in : function($jq){
		var dat = {};
		var bankCd = isEmpty($("#bank_cd").val()) ? $("#org_code").val() : $("#bank_cd").val();

		dat["EBNK_SALE_INHB_BSNN_RTN_HALF"] = $.trim($("#ELB_RNN").val()).replace(/-/g, "");	// 판매주민사업자등록번호
		dat["EBNK_SALE_INHB_BSNN_RTN_FULL"] = _this.KFTC_DRW_CGN;								// 판매주민사업자등록번호(full)	
		dat["INHB_BSNN_RTN"] 				= _this.KFTC_DRW_CGN;								// 판매주민사업자등록번호(full)	
		dat["EFNC_BNCD"] 					= bankCd;											// e금융은행코드
		dat["CRAC_ACN"] 					= $.trim($("#MNRC_ACN").val()).replace(/-/g, "");	// 약정계좌번호
		dat["EBNK_ELB_ENTP_NM"] 			= $("#KFTC_DRW_NAME").text();						// 업체명
		dat["MMBR_DCD"] 					= _this.DRW_CUS_DCD									// 회원구분코드
		dat["EBNK_ELB_DCD"] 				= $("#hEBNK_ELB_DCD").val();						//구분코드(1.발행 2.배서)
		
		return dat;
	},   
	uf_out : function($jq, data, index){
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			if (_isBreak) {
				return;
			}

			_this.error = data["_is_error"];
			var _error_cd = data["_error_cd"];
			
			return data;	
		}
	},uf_exec : function(){
		uf_reLoadB2B();
	}
}


//[입금계좌번호(당좌계좌번호) & 선택 리스트]
function b2bform_stlmAcnListSetter($jq, data) {
	var dat = {};
	
	if("fnt_b2b_041211_1" == window._b2bForm.drotStlmAcnViewType) { 
		$('#STLM_ACN').text(mobFormatter.account(data["STLM_ACN"])+" "+data["STLM_ACN_NM"]);
		$('#STLM_ACN_VAL').val(data["STLM_ACN"]);
		
		//  화면 진입시 자동 조회 되도록 트리거 발생
		if(window._b2bForm.drotStlmAcnTrigger == "Y"){
			setTimeout(function () {
				$("#STLM_ACN_VAL").triggerHandler("change");
			}, 500);
		}
		
		if (typeof $("#ICN").val() != "undefined") $("#ICN").val(data["ICN"]);
	} 
	
	if(!(typeof $jq == 'undefined')){
		comSelectPopUtil.setActiveClass($jq);
	}

	return dat;
}

/**
 * [입금계좌번호(당좌계좌번호) 조회]
 */
var b2bform_fnt_b2b_010101_1 = {
	uf_in : function($jq, sourceData) {
		var reqData = {};
		
		if ($("#INQ_RNG_CD").val() != "undefined") {
			reqData["INQ_RNG_CD"] = $("#INQ_RNG_CD").val();
		}
		
		return reqData;
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true" && data["_error_cd"] != "ECBKAGN01846") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			var jsonDat = {};
			var pushData    = [];
		
			for (var i in data["list"]) {
				if (data["list"][i]["STLM_ACN"] != "") {
					if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "45") {
						if ( (data["list"][i]["NTPO_ACSS_CON"] == "활동") && (data["list"][i]["NOTE_BSWR_DCD"] == "0045" || data["list"][i]["PDM"] == "전자어음발행서비스") ){
							pushData.push(data["list"][i]);
						}
					} else if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "46") {
						if ( (data["list"][i]["NTPO_ACSS_CON"] == "활동") && (data["list"][i]["NOTE_BSWR_DCD"] == "0046" || data["list"][i]["PDM"] == "전자어음수취서비스") ){
							pushData.push(data["list"][i]);
						}
					} else if (window._b2bForm.b2bform_fnt_b2b_041211_1_List_Kind == "45,46") {
						if ( (data["list"][i]["NTPO_ACSS_CON"] == "활동") && ( 
										(data["list"][i]["NOTE_BSWR_DCD"] == "0045" || data["list"][i]["PDM"] == "전자어음발행서비스") ||
										(data["list"][i]["NOTE_BSWR_DCD"] == "0046" || data["list"][i]["PDM"] == "전자어음수취서비스")) ) {
							pushData.push(data["list"][i]);
						}
					} 
				}
			}
			
			jsonDat["stlmAcnListTbl"] = pushData;
			
			window._b2bForm.b2bform_fnt_b2b_041211_1_List = pushData;
			
			window._b2bForm.b2bform_fnt_b2b_010101_1_bankList = data.bankList;
			window._b2bForm.b2bform_fnt_b2b_010101_1_bankList2 = data.bankList2;
			return jsonDat;
		}
	},
	uf_exec : function() {
		if (window._b2bForm.b2bform_fnt_b2b_041211_1_List.length > 0) {
			b2bform_stlmAcnListSetter(undefined, window._b2bForm.b2bform_fnt_b2b_041211_1_List[0]);
		}
		else{
			if(window._b2bForm.drotStlmAcnTrigger == "Y"){
				comLayerPopUtil.open('popup1');
			}
		}
		
		if (typeof(callBack_fnt_b2b_041211_1) =="function") {
			callBack_fnt_b2b_041211_1(window._b2bForm.b2bform_fnt_b2b_041211_1_List);
		}
	}
}

//입금계좌번호(당좌계좌번호) || 전자어음 계좌번호 리스트에서 선택 후 조회 결과값 안보이게..
function b2bform_uf_clearResult() {
	if (typeof(uf_clearResult) =="function") {
		uf_clearResult();
	}
	uf_back();
}

//[전자어음 계좌조회 & 선택 리스트]
function b2bform_ebnkAcnListSetter($jq, data) {
	var dat = {};
	
	if("fnt_b2b_043412_1" == window._b2bForm.drotEbnkAcnViewType) { 
		$('#EBNK_ACN').text(mobFormatter.account(data["EBNK_ACN"]));
		$('#EBNK_ACN_NM').text(data["EBNK_ACN_NM"]);
		$('#EBNK_ACN_VAL').val(data["EBNK_ACN"]);
	} 
	
//  화면 진입시 자동 조회 되도록 트리거 발생
	if(window._b2bForm.drotEbnkAcnTrigger == "Y"){
		setTimeout(function () {
			$("#EBNK_ACN_VAL").triggerHandler("change");
		}, 500);
	}

	if(!(typeof $jq == 'undefined')){
		comSelectPopUtil.setActiveClass($jq);
	}
	
	return dat;
}

/**
 * [전자어음 계좌조회 조회]
 */
var b2bform_fnt_b2b_043412_1 = {
	uf_in : function($jq, sourceData) {
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			var jsonDat = {};
			var pushData    = [];
			var ebnkAcn = "";
			
			for (var i in data["list"]) {
				ebnkAcn = data["list"][i]["EBNK_ACN"];
				
				if( ebnkAcn.substring(9,11)=="01" || ebnkAcn.substring(9,11)=="02" || ebnkAcn.substring(9,11)=="03" || 
					ebnkAcn.substring(9,11)=="04" || ebnkAcn.substring(9,11)=="06" ) {
					pushData.push(data["list"][i]);
				}
			}
			
			jsonDat["ebnkAcnListTbl"] = pushData;
			
			window._b2bForm.b2bform_fnt_b2b_043412_1_List = pushData;

			return jsonDat;
		}
	},
	uf_exec : function() {
		if (window._b2bForm.b2bform_fnt_b2b_043412_1_List.length > 0) {
			b2bform_ebnkAcnListSetter(undefined, window._b2bForm.b2bform_fnt_b2b_043412_1_List[0]);
		}
	}
}

//교부량조회
var b2bform_fnt_b2b_041701_2 = {
		uf_in : function($jq){
			
			var reqData = {};
			
			reqData["CRAC_ACN"] 				= $("#CRAC_ACN_VAL").val();  

			return reqData;
		},   
		uf_out : function($jq, data, index){
						
			if (_isBreak) {
				return;
			}

			var _is_error = data["_is_error"];
			var _error_cd = data["_error_cd"];

			if (_is_error == "true") {
				if(_error_cd != "ECBKEBK00415") { 
					// 공통에러일경우 공통팝업으로 보내기
					MobPopup.showErrorPopupForData(data);
					
					return;
				}
			} // 에러처리
			
			window._b2bForm.b2bform_fnt_b2b_041701_2 = data;
			
			return data;
		},uf_exec : function(){
			if (typeof(callBack_fnt_b2b_041701_2) =="function") {
				callBack_fnt_b2b_041701_2(window._b2bForm.b2bform_fnt_b2b_041701_2);
			}
		}
}

/*************************************************************************************************************************/
function b2bform_uf_getValue(objId) {
	var retValue = "";
	var tarObj = $('button[id='+objId+']');
	for( var i=0; i<tarObj.length; i++) {
		if ( tarObj[i].hasAttribute("class") && tarObj[i].getAttribute("class").indexOf("active") != -1) {
			retValue = tarObj[i].getAttribute("value");
		}
	}
	
	return retValue;
}

function b2bform_uf_goTop() {
	MobUtil.moveScrollTop();
}

function b2bform_uf_goB2BFirstMenu() {
	comWebkey_goMenu("5005", "fnt_b2b_010101_1", "../b2b/fnt_b2b_010101_1.html", "");	//약정현황조회로 이동
}

function b2bform_uf_checkDate(sObjId, eObjId, flag) {
	var startDate = $.trim(eval('$("#'+sObjId+'")').val()).replace(/-/g, "");			//조회시작년월일
	var endDate = $.trim(eval('$("#'+eObjId+'")').val()).replace(/-/g, ""); 	//조회종료년월일
	var today = getCurDate().replace(/-/g,"");
	
	if (typeof(flag) == "undefined") {
		if ( Number(startDate) > Number(today)) {
			MobPopup.showAlertPopup("조회시작일자는 미래일자를 입력할 수 없습니다.", "알림", function(){ eval('$("#'+sObjId+'")').focus() });
			return false;
		}
		if ( Number(endDate) > Number(today)) {
			MobPopup.showAlertPopup("조회종료일자는 미래일자를 입력할 수 없습니다.", "알림", function(){ eval('$("#'+eObjId+'")').focus() });
			return false;
		}
	}
	
	if(startDate == "") {
		MobPopup.showAlertPopup("조회시작일자를 입력해 주십시오.", "알림", function(){ eval('$("#'+sObjId+'")').focus() });
		return false;
	}

	if(endDate == "") {
		MobPopup.showAlertPopup("조회종료일자를 입력해 주십시오.", "알림", function(){ eval('$("#'+eObjId+'")').focus() });
		return false;
	}
	
	if(!setDateChk(true)){	return false; }
	
	return true;
}

function b2bform_uf_setList(svcId){
	_this.page =  parseInt(_this.page) + 1;
	if(_this.page > 1){
		eval('$("#'+svcId+'")').attr("data-jx-svc-target-method","addNRow");
	}
	jex.setJexObj(eval('$("#'+svcId+'")').attr("data-jx-svc-onload","true"));
}

function b2bform_uf_setCardInfo(dataObj) {
	$('#CTLM_AMT').text(mobFormatter.number(dataObj["BUY_CTLM_AMT"])); 					//총 한도
	$('#BUCA_USE_AMT').text(mobFormatter.number(dataObj["ISS_AMT"])); 			//총 사용금액
	$('#USE_ABL_AMT').text(mobFormatter.number(dataObj["BUY_ATHZ_ABL_AMT"] ));			//총 사용가능금액
	$('span[id=TRN_AMT]').text(mobFormatter.number(dataObj["BUCA_LMT_AMT"])); 					//구매기업약정한도
	if (dataObj["MCTCO_NM"] != "") $('#CARD_NM').text(dataObj["MCTCO_NM"]); 					//업체명
	$('span[id=OLD_TRN_LMEH_AMT]').text(mobFormatter.number(dataObj["BUCA_USE_AMT"])); 	//구매기업약정사용금액
	$('span[id=USE_ABL_AMT_01]').text(mobFormatter.number(dataObj["BUY_ATHZ_ABL_AMT_01"])); 		//구매기업약정사용가능금액
}

//금액 한글 시작
function b2bform_uf_initAmtHan(inpObjId, hanObjId) {
	$("#btn_del_x2").on('click',function(){ //삭제 X
		eval('$("#'+hanObjId+'")').text("");
		$($.find("#"+inpObjId)).val("");
		$("#btn_del_x2").css("display", "none"); //btn_del_x2
		$($.find("#"+inpObjId)).focus();
	});
	$($.find("#"+inpObjId)).on("keyup", function(event) {
		var targetObj = $(event.target);
		var txt = targetObj.val().replace(/,/g, "");
		var dat = "";
		
		if(txt.length == 1 && txt == "0") {
			targetObj.val("");
		}else {
			if((txt != null || txt != undefined || txt != "") && (txt.length <= 15)) {
				for(var i = 0 ; i < txt.length ; i++) {
					var tmp = txt.charCodeAt(i);
					
					if(!(tmp < 48 || tmp > 57)) {
						dat += txt.charAt(i);
					}
				}
				Conv_Kor2(dat, hanObjId);
			}else {
				dat = txt.substring(0, txt.length -1);
			}
			
			$(this).val(dat);
		}
	}).on("focusin", function(event) {
		var targetObj = $(event.target);
		targetObj.val(targetObj.val().replace(/,/g, ""));
	}).on("focusout", function(event) {
		var targetObj = $(event.target);
		if(targetObj.val() != ''){
			targetObj.val(formatter.number(targetObj.val()));
		}
		Conv_Kor2(targetObj.val(), hanObjId);
	});
}

/**
 * NEW 금액 한글화
 */
var Conv_Kor2 = function(val, hanObjId){
	var amtHanObj = $.find("#"+hanObjId);
	if(val == "" || val == undefined || val == null) {
		$(amtHanObj).text("");
		return;
	}else {
		val = val.replace(/,/g, "");
		$("#btn_del_x2").css("display", ""); //btn_del_x2
	}
	
	//1억 1,234만 1,234원
	var arrWon = ["","만","억","조","경","해","자","양","구","간","정"];
	var resultWon = "";
	var pattern = /(-?[0-9]+)([0-9]{4})/;
	while(pattern.test(val)){
		val = val.replace(pattern,"$1,$2");
	}
	var delimitCnt = val.split(",").length-1;
	for(var i=0;i<val.split(",").length; i++){
		if(arrWon[delimitCnt]==undefined){
			console.log("ljy :: 값이 너무 크다");
			break;
		}
		strAmtData = val.split(",")[i];
		numData = Number(strAmtData);
		strNumData = parseInt(numData / 1000) > 0 ? parseInt(numData / 1000) + "," : "";
		strNumData += parseInt(numData / 1000) > 0 ? strAmtData.substring(1) : (numData % 1000);
		if(numData > 0) {
			resultWon += " " + strNumData+arrWon[delimitCnt];
		}
		delimitCnt--;
	}
	//resultWon += "원";
	$(amtHanObj).text(resultWon);
}
//금액 한글 종료

/*
 * uf_공통함수
 */
function b2bform_uf_goStep(stepNo, effect) {

	uf_goStep(stepNo);
}


function b2bform_uf_getStep () {
	return jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
}

function b2bform_uf_openPopup(popupId){
	comLayerPopUtil.open(popupId);
}

function b2bform_uf_closePopup(popupId){
	comLayerPopUtil.close(popupId);
}

function b2bform_uf_searchDateFormat(dat){
	var dt = dat.replace(/-/g, "");
	var adt = new Array();
	var rt = new Array();

	adt.push(dt.substr(0, 4));
	adt.push(dt.substr(4, 2));
	adt.push(dt.substr(6, 2));

	for (var i = 0; i < adt.length; i++) {
	    if (adt[i].length == 1) 
	        rt.push("0" + adt[i]);
	    else 
	        rt.push(adt[i]);
	}

	return (rt[0] + "." + rt[1] + "." + rt[2]);
}

function b2bform_uf_setSearchCondition(conditionPopupId, setTagId){
	var searchDate = ""; // 조회 기간
	var condition = "";	// 조회 조건 요약
	
	$("#calArea").find("input").each(function(idx, item){
		idx++;
	    var dat = $.trim($(item).val());
	    searchDate += b2bform_uf_searchDateFormat(dat);
	    if($("#calArea").find("input").length > idx){
	    	searchDate += "~";
	    }
	});
	
	$("#searchDate").text(searchDate);
	
	$("#"+conditionPopupId).find(".active").each(function(idx, item){
        idx++;
        condition += $.trim($(item).text());
	    if($("#"+conditionPopupId).find(".active").length > idx){
	    	condition += "・";
	    }
	});
	
	// 조건 버튼이 없는 경우 마지막 .문자 제거
	if($("#"+conditionPopupId).find(".active").length <= 0){
		condition = condition.slice(0, -1)
	}
	
	if(!isEmpty(condition)){
		$("#"+setTagId).text(condition);
	}
}

function b2bform_uf_setActiveBtn(e){
	var selTg =  $(e.target);

	if($(selTg).is("span")){
		selTg = $(e.target).parent();
	}
		
	$(selTg).attr("aria-checked", "true").addClass("active");
	$(selTg).siblings("button").attr("aria-checked", "false").removeClass("active");
}

// 20241119 요건추가: 개인이 접근한 경우 사업자로 다시 로그인 하도록 유도
function b2bChkCorpCertLogin(){
	var result;
	
	comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
		var basicInfo = this;
		result = basicInfo.cus_info["CORP_CERT_LOGIN_YN"];
	});
	
	return result;
}
