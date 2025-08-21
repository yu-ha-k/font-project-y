var webDevUtil = {
	getLocalPath : function() {
		return "../../../";
	},
	getAdminText : function(user_dcd) {
		return (user_dcd == "1" || user_dcd == "2") ? "관리자만 이용 가능" : ""
	},
	getIndvCorpText : function(indv_corp_dcd) {
		var indv_corp_text = "개인사업자/법인사업자 이용 가능";
		
		if(indv_corp_dcd == "1") { //개인사업자
			indv_corp_text = "개인사업자만 이용 가능";
		}
		else if(indv_corp_dcd == "2") { //법인사업자
			indv_corp_text = "법인사업자만 이용 가능";
		}
		
		return indv_corp_text;
	},
	/* 메뉴정보 조회 */
	getMenuList : function(demo_yn) {
		var ajax = jex.createAjaxUtil("com_app_010101_2"); //메뉴정보 조회
		
		ajax.set("task_package",    "com");
		ajax.set("task_subpackage", "app");
		
		ajax.setErrTrx(false);
		ajax.setAsync(false);
		
		var res_data = ajax.execute();
		
		var menu_list = [];
		
		if(isEmpty(res_data) == false) {
			res_data = res_data["_tran_res_data"][0];
			
			if(res_data["_is_error"] != "true") { //정상거래
				$.each(res_data["sub_menu"]["_menu_info"], function(idx, obj1) {
					var dp1_tit = obj1.c_menu_title; //Depth1 제목
					var dp1_url = obj1.c_menu_url;   //메뉴url
					var is_demo = true;
					
					if(demo_yn == "Y" && obj1.c_demo != true) is_demo = false;
					
					
					if(isEmpty(dp1_url) == false && is_demo) {
						var menu_info = {
							"dp1_tit"  : dp1_tit,
							"dp2_tit"  : "",
							"dp3_tit"  : "",
							"dp4_tit"  : "",
							"menu_url" : dp1_url,
							"menu_id"  : obj1.c_menu_id,
							"hidden"   : obj1.c_hidden_yn,
							"admin"    : webDevUtil.getAdminText(obj1.c_user_dcd),
							"ic_type"  : webDevUtil.getIndvCorpText(obj1.c_indv_corp_dcd),
							"depth"    : "1"
						};
						
						menu_list.push(menu_info);
					}
					
					//Depth2 반복
					if(obj1["_menu_info"] != undefined) {
						$.each(obj1["_menu_info"], function(idx2, obj2) {
							var dp2_tit = obj2.c_menu_title; //Depth2 제목
							var dp2_url = obj2.c_menu_url;   //메뉴url
							var is_demo  = true;
							
							if(demo_yn == "Y" && obj2.c_demo != true) is_demo = false;
							
							if(isEmpty(dp2_url) == false && is_demo) {
								var menu_info = {
									"dp1_tit"  : dp1_tit,
									"dp2_tit"  : dp2_tit,
									"dp3_tit"  : "",
									"dp4_tit"  : "",
									"menu_url" : dp2_url,
									"menu_id"  : obj2.c_menu_id,
									"hidden"   : obj2.c_hidden_yn,
									"admin"    : webDevUtil.getAdminText(obj2.c_user_dcd),
									"ic_type"  : webDevUtil.getIndvCorpText(obj2.c_indv_corp_dcd),
									"depth"    : "2"
								};
								
								menu_list.push(menu_info);
							}
							
							//Depth3 반복
							if(obj2["_menu_info"] != undefined) {
								$.each(obj2["_menu_info"], function(idx3, obj3) {
									var dp3_tit = obj3.c_menu_title; //Depth3 제목
									var dp3_url = obj3.c_menu_url;   //메뉴url
									var is_demo  = true;
									
									if(demo_yn == "Y" && obj3.c_demo != true) is_demo = false;
									
									if(isEmpty(dp3_url) == false && is_demo) {
										var menu_info = {
											"dp1_tit"  : dp1_tit,
											"dp2_tit"  : dp2_tit,
											"dp3_tit"  : dp3_tit,
											"dp4_tit"  : "",
											"menu_url" : dp3_url,
											"menu_id"  : obj3.c_menu_id,
											"hidden"   : obj3.c_hidden_yn,
											"admin"    : webDevUtil.getAdminText(obj3.c_user_dcd),
											"ic_type"  : webDevUtil.getIndvCorpText(obj3.c_indv_corp_dcd),
											"depth"    : "3"
										};
										
										menu_list.push(menu_info);
									}
									
									//Depth4 반복
									if(obj3["_menu_info"] != undefined){
										$.each(obj3["_menu_info"], function(idx4, obj4) {
											var dp4_tit = obj4.c_menu_title; //Depth4 제목
											var dp4_url = obj4.c_menu_url;   //메뉴url
											var is_demo  = true;
											
											if(demo_yn == "Y" && obj4.c_demo != true) is_demo = false;
											
											if(isEmpty(dp4_url) == false && is_demo) {
												var menu_info = {
													"dp1_tit"  : dp1_tit,
													"dp2_tit"  : dp2_tit,
													"dp3_tit"  : dp3_tit,
													"dp4_tit"  : dp4_tit,
													"menu_url" : dp4_url,
													"menu_id"  : obj4.c_menu_id,
													"hidden"   : obj4.c_hidden_yn,
													"admin"    : webDevUtil.getAdminText(obj4.c_user_dcd),
													"ic_type"  : webDevUtil.getIndvCorpText(obj4.c_indv_corp_dcd),
													"depth"    : "4"
												};
												
												menu_list.push(menu_info);
											}
										});
									}
								});
							}
						});
					} else {
						var is_demo = true;
						
						if(demo_yn == "Y" && obj1.c_demo != true) is_demo = false;
						
						if(is_demo) {
							var menu_info = {
								"dp1_tit"  : dp1_tit,
								"dp2_tit"  : "",
								"dp3_tit"  : "",
								"dp4_tit"  : "",
								"menu_url" : dp1_url,
								"menu_id"  : obj1.c_menu_id,
								"hidden"   : obj1.c_hidden_yn,
								"admin"    : webDevUtil.getAdminText(obj1.c_user_dcd),
								"ic_type"  : webDevUtil.getIndvCorpText(obj1.c_indv_corp_dcd),
								"depth"    : "1"
							};
							
							menu_list.push(menu_info);
						}
					}
				});
			}
		}
		
		this.setStorageMenuList(menu_list);
		
		return menu_list;
	},
	/* 메뉴 이동 */
	goMenu : function(action_code, menu_id, param) {
		var menu_list = this.getStorageMenuList();
		var menu_url  = "";
		
		if(isEmpty(menu_list) || menu_list.length == 0) {
			menu_list = webDevUtil.getMenuList();
		}
		
		if(isEmpty(menu_list) == false && menu_list.length > 0) {
			for(var i = 0; i < menu_list.length; i++) {
				if(menu_list[i].menu_id == menu_id) {
					menu_url = menu_list[i].menu_url;
					
					webDevUtil.historyPush(action_code, menu_list[i]); //히스토리 저장
					
					break;
				}
			}
			
			if(isEmpty(param)) {
				location.href = webDevUtil.getLocalPath() + menu_url;
			}
			else {
				location.href = webDevUtil.getLocalPath() + menu_url + "?" + param;
			}
		}
		else {
			alert("메뉴정보가 존재하지 않습니다");
		}
	},
	/* 세션스토리지에 메뉴정보 저장 */
	setStorageMenuList : function(menu_list) {
		if(sessionStorage) {
			sessionStorage.setItem("MENU_LIST", JSON.stringify(menu_list));
		}
	},
	/* 세션스토리지 메뉴정보 조회 */
	getStorageMenuList : function() {
		var menu_list = null;
		
		if(sessionStorage) {
			menu_list = JSON.parse(sessionStorage.getItem("MENU_LIST"));
		}
		
		return menu_list;
	},
	isExistHistory : function() {
		var localHistoryList = sessionStorage.getItem("LOCAL_HISTORY_LIST");
		
		if(isEmpty(localHistoryList)) {
			return false;
		}
		else if(JSON.parse(localHistoryList).length == 0) {
			return false;
		}
		
		return true;
	},
	historyPush : function(actionCode, menuInfo) {
		var historyList = new Array();
		
		if(actionCode == "5005") {
			if(this.isExistHistory()) {
				historyList = JSON.parse(sessionStorage.getItem("LOCAL_HISTORY_LIST"));
			}
			
			historyList.push(menuInfo)
			
			sessionStorage.setItem("LOCAL_HISTORY_LIST", JSON.stringify(historyList));
		}
		else if(actionCode == "5009") { //이전 스택 초기화 후 저장
			sessionStorage.removeItem("LOCAL_HISTORY_LIST");
			
			historyList.push(menuInfo)
			
			sessionStorage.setItem("LOCAL_HISTORY_LIST", JSON.stringify(historyList));
		}
	},
	historyPop : function() {
		var historyList = JSON.parse(sessionStorage.getItem("LOCAL_HISTORY_LIST"));
		var menuInfo    = historyList.pop();
		
		sessionStorage.setItem("LOCAL_HISTORY_LIST", JSON.stringify(historyList));
		
		return menuInfo;
	},
	setKeypadAmt : function(amt, allYn) {
		if(allYn == "Y") {
			$("#com_keypad_amt_input").val(formatter.number(amt));
		}
		else {
			var inputAmt = $("#com_keypad_amt_input").val().replace(/,/g, "");
			
			if(isEmpty(inputAmt) || isNaN(inputAmt)) {
				inputAmt = "0";
			}
			
			inputAmt = Number(inputAmt) + Number(amt);
			
			$("#com_keypad_amt_input").val(formatter.number(inputAmt));
		}
	},
	cbKeypadAmt : null,
	returnKeypadAmt : function() {
		var inputAmt = $("#com_keypad_amt_input").val().replace(/,/g, "");
		
		comLayerPopUtil.close("com_keypad_amt_pop", function() {
			var resData = {"inputData" : inputAmt};
			
			if(!isEmpty(webDevUtil.cbKeypadAmt) && ("function" == typeof(webDevUtil.cbKeypadAmt))) { //콜백함수가 있을경우
				webDevUtil.cbKeypadAmt.apply(this, [resData]);
			}
		});
	},
	callKeypadAmt : function(title, btnList, cb) {
		this.cbKeypadAmt = cb;
		
		if($("#com_keypad_amt_pop").length > 0) {
			$("#com_keypad_amt_pop").remove();
		}
		
		var html = '';
		html += '<div class="bottom_popup_wrap" id="com_keypad_amt_pop">';
		html += '	<div class="bottom_popup">';
		html += '		<div class="bottom_popup_header">';
		html += '			<h2 class="tit">' + title + '</h2>';
		html += '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'com_keypad_amt_pop\');">닫기</button>';
		html += '		</div>';
		html += '		<div class="bottom_popup_body">';
		html += '			<div class="group">';
		html += '				<div class="form_group">';
		html += '					<div class="comp_wrap">';
		html += '						<div class="input">';
		html += '							<input type="text" id="com_keypad_amt_input" />';
		html += '						</div>';
		html += '					</div>';
		html += '					<div class="search_group mt_24">';
		html += '						<div class="btn_area clickable ty2" role="radiogroup">';
		
		for(var i = 0; i < btnList.length; i++) {
			html += '	<button type="button" role="radio" aria-checked="false" onclick="webDevUtil.setKeypadAmt(' + btnList[i]["pay"] + ', \'' + btnList[i]["allin"] + '\');"><span class="text">' + btnList[i]["name"] + '</span></button>';
		}
		
		html += '						</div>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="bottom_popup_footer">';
		html += '			<button type="button" class="btn s_5 c_3 r_2" onclick="webDevUtil.returnKeypadAmt();">확인</button>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
		$(".container_wrap").append(html);
		
		comLayerPopUtil.open("com_keypad_amt_pop");
	},
	showIndicator : function(param) {
		if($("#com_full_loading").length == 0) {
			var html = '';
			html += '<div class="full_loading" id="com_full_loading">';
			html += '	<div class="loading_item">';
			html += '		<span class="loading_item_spin"></span>';
			html += '	</div>';
			html += '</div>';
			
			$(".wrap").append(html);
		}
	},
	hideIndicator : function() {
		$("#com_full_loading").remove();
	}
}