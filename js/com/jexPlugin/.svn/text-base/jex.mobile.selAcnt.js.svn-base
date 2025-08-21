var selAcntVar = {
	thisObj : null //plugin 객체
};

(function() {
	var JexMobileSelAcnt = JexPlugin.extend({
		init : function() {
		},
		/* data-jx-selAcnt 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드 */
		load : function(attr, $jq) {
			this.$object = $jq;
		},
		execute : function(cb) {
			var thisObj      = this;
			var $selAcnt     = thisObj.$object;
			this.selAcntId   = $selAcnt.attr("data-jx-selAcnt");             //계좌선택 플러그인ID
			this.sessionId   = $selAcnt.attr("data-jx-selAcnt-sessionId");   //계좌목록 세션ID
			this.optionData  = $selAcnt.attr("data-jx-selAcnt-optionData");  //계좌목록 세션 옵션
			this.callFuncNm  = $selAcnt.attr("data-jx-selAcnt-callFuncNm");  //계좌 선택 후 호출할 콜백함수명
			this.defaultText = $selAcnt.attr("data-jx-selAcnt-defaultText"); //계좌번호 선택영역 기본문구(미설정 시 '선택')
			
			var sessionId     = this.sessionId
			var optionData    = this.optionData
			var selAcntPopId  = this.selAcntId + "_pop";
			var selAcntListId = this.selAcntId + "_list";
			var defaultText   = this.defaultText;
			var defaultSelYn  = $selAcnt.attr("data-jx-selAcnt-defaultSelYn"); //계좌번호 기본선택여부(미설정 시 'Y')
			var noAnctMsg     = $selAcnt.attr("data-jx-selAcnt-noAcntMsg");    //계좌목록 없을경우 선택영역 보여질 문구(미 설정 시 '계좌목록이 존재하지 않습니다')
			
			if(isEmpty(defaultSelYn)) {
				defaultSelYn = "Y";
			}
			
			if(isEmpty(defaultText)) {
				defaultText = "선택";
			}
			
			if(isEmpty(noAnctMsg)) {
				noAnctMsg = "계좌목록이 존재하지 않습니다.";
			}
			
			var acntList = [];
			
			if(isEmpty(sessionId)) { //세션조회가 아닐경우
				acntList = thisObj.acntList;
			}
			else {
				var reqData = {"need_item" : sessionId};
				
				if(isEmpty(optionData) == false) {
					optionData = JSON.parse(optionData);
					
					$.extend(reqData, optionData);
				}
				
				acntList = this.getAcntList(sessionId, reqData); //계좌목록 조회
			}
			
			var acnoIdx = this.searchAcnoIdx(acntList, this.defaultAcno); //계좌번호 인덱스
			
			$.get("../../../../html/phone/com/selAcntForm.html").done(function(dat) {
				var $selAcntForm = $(dat);
				
				$selAcnt.html($selAcntForm.find("#sel_acnt_plgn_area").html());
				$selAcnt.attr("class", "dropdown ty2");
				
				if(isEmpty(acntList) == false && acntList.length > 0) { //계좌가 있을경우
					$selAcnt.attr("role", "button");
					
					if(defaultSelYn == "N") {
						$selAcnt.find("#sel_acnt_plgn_sel_area").hide();
						$selAcnt.find("#sel_acnt_plgn_default_text").text(defaultText).show();
					}
					else {
						$selAcnt.addClass("active");
						
						$selAcnt.find("#sel_acnt_plgn_sel_area").show();
						$selAcnt.find("#sel_acnt_plgn_default_text").hide();
						
						var acntData = acntList[acnoIdx];
						
						thisObj.setAcnt($selAcnt, acntData);
					}
					
					$selAcnt.on("click", function() {
						comLayerPopUtil.open(selAcntPopId);
						
						selAcntVar.thisObj = thisObj;
					});
				}
				else { //계좌가 없을경우
					$selAcnt.find(".dropdown_text").empty().text(noAnctMsg);
				}
				
				if($("#" + selAcntPopId).length == 0) {
					var $selAcntPop = $selAcntForm.find("#sel_acnt_plgn_pop_area").find(".bottom_popup_wrap");
					
					$selAcntPop.attr("id", selAcntPopId);
					$selAcntPop.find(".select_list").attr("id", selAcntListId).attr("data-jx-list", selAcntListId);
					$selAcntPop.find("#btn_sel_acnt_pop_close").on("click", function() {
						comLayerPopUtil.close(selAcntPopId);
					});
					
					$(".container_wrap").append($selAcntPop);
					
					jex.setJexObj($selAcntPop);
				}
				
				var ulSelAcnt = jex.getJexObj($("#" + selAcntListId), "JEX_MOBILE_LIST");
				
				ulSelAcnt.setAll(acntList);
				
				$("#" + selAcntListId).find("li").each(function(idx, obj) {
					var rowData = $(obj).data("_JEX_GETALL_DATA_");
					
					if(rowData["INDV_YN"] == "Y") {
						$(obj).find("#indv_ico").text("개인").attr("class", "badge ty3 colorB5").show();
					}
					else if(rowData["INDV_YN"] == "N") {
						$(obj).find("#indv_ico").text("기업").attr("class", "badge ty3 colorETC11").show();
					}
					else {
						$(obj).find("#indv_ico").text("").attr("class", "badge ty3").hide();
					}
					
					if(defaultSelYn != "N" && (idx == acnoIdx)) {
						$(obj).attr("aria-selected", "true").addClass("active"); //선택됨 표시
					}
				});
				
				if(typeof cb == "function") {
					cb.apply(this, [acntList]);
				}
			});
		},
		/* 계좌목록 설정 */
		setAcntList : function(acntList, keyData) {
			var rtnAcntList = [];
			
			if(isEmpty(acntList) == false && acntList.length > 0) {
				$.each(acntList, function(idx, obj) {
					var acntData = {};
					
					acntData.EBNK_ACN = obj[keyData.ACNT_NO];
					acntData.ACNT_NM  = obj[keyData.ACNT_NM];
					
					rtnAcntList.push(acntData);
				});
			}
			
			this.acntList = rtnAcntList;
		},
		/* 계좌목록 조회 */
		getAcntList : function(sessionId, reqData) {
			var sessionIdList = [];
			
			sessionId.split(",").forEach(function(id) {
				sessionIdList.push({"id" : id});
			});
			
			var acntList = [];
			
			comUtil_getBasicInfo(reqData, function() {
				if(sessionIdList.length == 1) {
					acntList = this[sessionId];
				}
				else if(sessionIdList.length > 1) {
					var rtnData = this;
					
					$.each(sessionIdList, function(idx, obj) {
						if(idx == 0) {
							acntList = rtnData[obj["id"]];
						}
						else {
							acntList = acntList.concat(rtnData[obj["id"]]);
						}
					});
				}
			});
			
			return acntList;
		},
		/* 계좌 선택 */
		selectAcnt : function($tg, data) {
			var $selAcnt   = this.$object;
			var callFuncNm = this.callFuncNm;
			
			comLayerPopUtil.close($tg.closest(".bottom_popup_wrap").attr("id")); //팝업 닫기
			
			comSelectPopUtil.setActiveClass($tg); //선택됨 표시
			
			this.setAcnt($selAcnt, data);
			
			if(isEmpty(callFuncNm) == false) { //계좌선택 후 호출할 콜백함수가 있을경우
				eval(callFuncNm)(data);
			}
			
			return {};
		},
		setAcnt : function($tg, data) {
			$tg.addClass("active");
			$tg.find("#EBNK_ACN").text(mobFormatter.account(data["EBNK_ACN"]));
			$tg.find("#ACNT_NM").text(data["ACNT_NM"]);
			
			if(data["INDV_YN"] == "Y") {
				$tg.find("#indv_ico").text("개인").attr("class", "badge ty3 colorB5").show();
			}
			else if(data["INDV_YN"] == "N") {
				$tg.find("#indv_ico").text("기업").attr("class", "badge ty3 colorETC11").show();
			}
			else {
				$tg.find("#indv_ico").text("").attr("class", "badge ty3").hide();
			}
			
			$tg.find("#sel_acnt_plgn_sel_area").show();
			$tg.find("#sel_acnt_plgn_default_text").hide();
		},
		setDefaultAcno : function(acno) {
			this.defaultAcno = acno;
		},
		/* 계좌번호로 계좌번호목록 인덱스값 찾기 */
		searchAcnoIdx : function(acntList, acno) {
			var idx = 0;

			acntList.some(function(item, index) {
				if(acno == item["EBNK_ACN"].trim()) {
					idx = index;
					return true;
				}
			});
			
			return idx;
		},
		setDefaultText : function(text) {
			if(isEmpty(text) == false) {
				this.defaultText = text;
			}
			
			this.$object.find("#sel_acnt_plgn_sel_area").hide();
			this.$object.find("#sel_acnt_plgn_default_text").text(this.defaultText).show();
		},
		setDisabled : function(blnDisabled) {
			var thisObj = this;
			
			if(blnDisabled) {
				thisObj.$object.attr("aria-disabled", "true").addClass("disabled").off("click");
			}
			else {
				thisObj.$object.removeAttr("aria-disabled").removeClass("disabled").on("click", function() {
					comLayerPopUtil.open(thisObj.selAcntId + "_pop");
					
					selAcntVar.thisObj = thisObj;
				});
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_SELACNT", JexMobileSelAcnt, "data-jx-selAcnt");
})();