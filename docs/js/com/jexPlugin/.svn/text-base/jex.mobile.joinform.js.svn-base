var _joinform_var = {
		"thisSForm"			: ""
		,"parentObj"		: ""
		,"parentStepNo"		: ""
		,"bankStepNo"		: 71
		,"emplStepNo"		: 72
		,"bankStepId"		: ""
		,"emplStepId"		: ""
		,"bankListIndex"	: ""
		,"type"				: "" // E(관리직원), B(관리점)
		,"data"				: {}
		,"bankPageNo"		: 0
		,"bankPageLength"	: 20
		,"emplPageNo"		: 0
		,"emplPageLength"	: 20
		,"isBankLastPage"	: false
		,"isEmplLastPage"	: false
		,"searchText"		: ""
		,"openCheckYn"		: "Y"
		,"callbackMngmEmn"	: ""
		,"callbackConfirm"	: ""
};

// 개발DB는 지점코드와 지점코드명이 1:N, QA는 1:1
(function() {
	var sForm_attrs = {
			"id"				: "data-jx-joinform"					// [required] 관리직원/관리점 정보 Element ID
			,"areaMngmEmn"		: "data-jx-joinform-area-mngm-emn"		// [option] 관리직원 정보 노출 영역
			,"areaMngmBrcd"		: "data-jx-joinform-area-mngm-brcd"		// [option] 관리점 정보 노출 영역
			,"openCheckYn"		: "data-jx-joinform-open-check-yn"		// [option] 영업 가능한 지점인지 체크 여부 (default : Y)
			,"callbackMngmEmn"	: "data-jx-joinform-callback-mngm-emn"	// [option] 관리직원 선택 시 실행되는 callback
			,"callbackConfirm"	: "data-jx-joinform-callback-confirm"	// [option] 관리직원/관리점 선택 시 실행되는 callback
	};
	
	var JexMobileTranForm = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			_joinform_var.thisSForm 	= this;
			_joinform_var.parentObj 	= $jq ;
			_joinform_var.parentStepNo 	= $jq.attr("data-jx-step-no");
			_joinform_var.bankStepId = "#step" + _joinform_var.bankStepNo;
			_joinform_var.emplStepId = "#step" + _joinform_var.emplStepNo;
			_joinform_var.openCheckYn = $jq.attr(sForm_attrs.openCheckYn) == undefined ? _joinform_var.openCheckYn : $jq.attr(sForm_attrs.openCheckYn);
			_joinform_var.callbackMngmEmn = $jq.attr(sForm_attrs.callbackMngmEmn);
			_joinform_var.callbackConfirm = $jq.attr(sForm_attrs.callbackConfirm);
			_joinform_var.thisSForm.drawJoinForm();
		},
		drawJoinForm : function() {
			var formFilePath = "../../com/joinform.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/joinform.html";
			}
			$.ajax({
				url:formFilePath,
				type:'get',
				async: false,
				success: function(dat){
					var $joinform_html = $(dat);
					var areaMngmEmn = _joinform_var.parentObj.find('[' + sForm_attrs.areaMngmEmn + ']:first');
					if (areaMngmEmn.length > 0) {
						areaMngmEmn.html($joinform_html.find("#joinform_mngm_emn_area").html());
					}
					var areaMngmBrcd = _joinform_var.parentObj.find('[' + sForm_attrs.areaMngmBrcd + ']:first');
					if (areaMngmBrcd.length > 0) {
						areaMngmBrcd.html($joinform_html.find("#joinform_mngm_brcd_area").html());
					}
					
					if($(_joinform_var.bankStepId).length == 0) {
						$("#step").append($joinform_html.find(_joinform_var.bankStepId));
						jex.setJexObj($(_joinform_var.bankStepId));
						_joinform_var.thisSForm.addBankStepEvent();
					}
					if($(_joinform_var.emplStepId).length == 0) {
						$("#step").append($joinform_html.find(_joinform_var.emplStepId));
						jex.setJexObj($(_joinform_var.emplStepId));
						_joinform_var.thisSForm.addEmplStepEvent();
					}
				}
			});
		},
		goBankStep : function(_type){
			_joinform_var.type = _type;
			
			var searchText = "";
			if("E" == _type){
				searchText = _joinform_var.parentObj.find("#search_emn_text").val();
			}
			if("B" == _type){
				searchText = _joinform_var.parentObj.find("#search_brcd_text").val();
			}
			
			$(_joinform_var.bankStepId).find("#joinform_search_text").val(searchText);
			if(searchText.length < 1 ){
				MobPopup.showAlertPopup("지점명을 입력 후 검색해 주세요","");
				return "";
			}
			_joinform_var.thisSForm.search('B')
			uf_goStep(_joinform_var.bankStepNo);
		},
		goEmplStep : function(_index){
			var bankInfo = _joinform_var.data.bank_brnc_list[_index];
			_joinform_var.thisSForm.isOpenBranch(bankInfo.BRCD,
				function(){
					_joinform_var.thisSForm.addEmplStepEvent();
					_joinform_var.thisSForm.getEmplList(_index);
					
					//지점 step과 동일하도록
					var searchText = $.trim($(_joinform_var.bankStepId).find("#joinform_search_text").val());
					$(_joinform_var.emplStepId).find("#joinform_search_text").val(searchText);
					uf_goStep(_joinform_var.emplStepNo);
				}
			)
		},
		search : function(_type){
			_joinform_var.bankPageNo = 0;
			_joinform_var.emplPageNo = 0;
			_joinform_var.isBankLastPage = false;
			_joinform_var.isEmplLastPage = false;
			var searchText = "";
			if(_type == "B"){
				searchText = $.trim($(_joinform_var.bankStepId).find("#joinform_search_text").val());
			}
			if(_type == "E"){
				searchText = $.trim($(_joinform_var.emplStepId).find("#joinform_search_text").val());
			}
			_joinform_var.searchText = searchText;

			if(_joinform_var.searchText.length < 1 ){
				MobPopup.showAlertPopup("검색하실 단어를 한 글자 이상 입력해 주세요","");
				return "";
			}

			_joinform_var.thisSForm.getData();
			if(_type == "E"){
				$(_joinform_var.bankStepId).find("#joinform_search_text").val(searchText);
				uf_goStep(_joinform_var.bankStepNo)
			}
		},
		addBankStepEvent: function(){
			_joinform_var.parentObj.find("#search_brcd_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					_joinform_var.thisSForm.goBankStep('B')
				}
			});
			
			_joinform_var.parentObj.find("#btn_reset_brcd").off("click").on("click", function(e) {
				_joinform_var.parentObj.find("#mngm_bank_brcd").val("");
				_joinform_var.parentObj.find("#search_brcd_text").val("");
				_joinform_var.parentObj.find("#btn_reset_brcd").prop("disabled", true);
				_joinform_var.parentObj.find("#btn_search_brcd").prop("disabled", false);
				_joinform_var.parentObj.find("#search_brcd_text").prop("disabled", false);
			});
			
			_joinform_var.data = {};
			
			$(_joinform_var.bankStepId).find("#joinform_search_text").val("");
			$(_joinform_var.bankStepId).find("#joinform_search_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					$(_joinform_var.bankStepId).find("#joinform_btn_search").click();
				}
			});
			
			$(_joinform_var.bankStepId).find("#joinform_list_area").hide();
			$(_joinform_var.bankStepId).find("#joinform_list_more").hide();
		},
		addEmplStepEvent: function(){
			_joinform_var.parentObj.find("#search_emn_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					_joinform_var.thisSForm.goBankStep('E')
				}
			});
			
			_joinform_var.parentObj.find("#btn_reset_emn").off("click").on("click", function(e) {
				_joinform_var.parentObj.find("#mngm_empl_emn").val("");
				_joinform_var.parentObj.find("#mngm_empl_brcd").val("");
				_joinform_var.parentObj.find("#search_emn_text").val("");
				_joinform_var.parentObj.find("#btn_reset_emn").prop("disabled", true);
				_joinform_var.parentObj.find("#btn_search_emn").prop("disabled", false);
				_joinform_var.parentObj.find("#search_emn_text").prop("disabled", false);
			});
			
			$(_joinform_var.emplStepId).find("#joinform_search_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					$(_joinform_var.emplStepId).find("#joinform_btn_search").click();
				}
			});
		},
		getBankList : function(){
			_joinform_var.thisSForm.overrideUfBack();
			if(_joinform_var.type == "E"){
				$(_joinform_var.bankStepId).find("#joinform_list_desc").html("지점을 먼저 선택해 주세요");
			}
			if(_joinform_var.type == "B"){
				$(_joinform_var.bankStepId).find("#joinform_list_desc").html("지점을 선택해 주세요");
			}
			$(_joinform_var.bankStepId).find("#joinform_list_more").hide();
			if(_joinform_var.data.bank_brnc_list.length == 0){
				$(_joinform_var.bankStepId).find("#joinform_list_desc").hide();
				var liHtml = '';
				liHtml += '<li class="no_data" id="EMPTY">';
				liHtml += '	<div class="no_result_msg">';
				liHtml += '		<div class="msg">검색 결과가 없습니다.<br>지점명을 다시 확인 해주세요.</div>';
				liHtml += '	</div>';
				liHtml += '</li>';
				$(_joinform_var.bankStepId).find("#joinform_lst01").html(liHtml);
			}else{
				$(_joinform_var.bankStepId).find("#joinform_list_desc").show();
				var liHtml = '';
				var linkItemClass = '';
				var linkItemFunc = '';
				
				//더보기 처리하기
				var dataList = _joinform_var.data.bank_brnc_list;

				var rowCnt;
				if(_joinform_var.bankPageLength >= dataList.length ||
						(_joinform_var.bankPageNo+1) * _joinform_var.bankPageLength >= dataList.length){
					rowCnt = dataList.length;
					_joinform_var.isBankLastPage = true;
				}else {
					rowCnt = (_joinform_var.bankPageNo+1) * _joinform_var.bankPageLength;
				}
				//-----------
				for(var i = (_joinform_var.bankPageNo * _joinform_var.bankPageLength); i < rowCnt; i++){
					var brcd = dataList[i].BRCD;
					var bank_brnc_nm = dataList[i].BANK_BRNC_NM;
					if(_joinform_var.type == "B"){
						linkItemClass = 'link_item_ty2';
						linkItemFunc = '_joinform_var.thisSForm.setBank('+i+')'
					}
					if(_joinform_var.type == "E"){
						linkItemClass = "link_item_ty2 link";
						linkItemFunc = '_joinform_var.thisSForm.goEmplStep('+i+')';
					}
					liHtml += '<li>';
					liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="'+linkItemFunc+'">'
					liHtml += '		<div class="'+linkItemClass+'" id="joinform_list_div">';
					liHtml += '			<div class="inner">';
					liHtml += '				<div class="link_item_left">';
					liHtml += '					<div class="item_text1" id="BANK_BRNC_NM">'+bank_brnc_nm+'</div>';
					liHtml += '				</div>';
					liHtml += '			</div>';
					liHtml += '		</div>';
					liHtml += '	</a>';
					liHtml += '</li>';
				}
				
				if(!_joinform_var.isBankLastPage && _joinform_var.bankPageNo * _joinform_var.bankPageLength < dataList.length){
					$(_joinform_var.bankStepId).find("#joinform_list_more").show();
				}
				if(_joinform_var.bankPageNo == 0){
					$(_joinform_var.bankStepId).find("#joinform_lst01").html(liHtml);
				}else{
					$(_joinform_var.bankStepId).find("#joinform_lst01").append(liHtml);
				}
				jex.setJexObj($(_joinform_var.bankStepId).find("#joinform_lst01"));
			}
			$(_joinform_var.bankStepId).find("#joinform_lst01").show();
			$(_joinform_var.bankStepId).find("#joinform_list_area").show();
		},
		getEmplList : function(_index){
			$(_joinform_var.emplStepId).find("#joinform_list_more").hide();
			_joinform_var.data.bank_brnc_emn_list = [];
			_joinform_var.data.bank_emno_list.some(function(item, index) {
				if(_joinform_var.data.bank_brnc_list[_index].BANK_BRNC_NM == item["BANK_BRNC_NM"]) {
					_joinform_var.data.bank_brnc_emn_list.push(item);
				}
			});
			_joinform_var.bankListIndex = _index;
			var liHtml = '';
			var linkItemClass = '';
			var linkItemFunc = '';
			
			//더보기 처리하기
			var dataList = _joinform_var.data.bank_brnc_emn_list;
			var rowCnt;
			if(_joinform_var.emplPageLength >= dataList.length ||
					(_joinform_var.emplPageNo+1) * _joinform_var.emplPageLength >= dataList.length){
				rowCnt = dataList.length;
				_joinform_var.isEmplLastPage = true;
			}else {
				rowCnt = (_joinform_var.emplPageNo+1) * _joinform_var.emplPageLength;
			}
			//-----------
			for(var i = (_joinform_var.emplPageNo * _joinform_var.emplPageLength); i < rowCnt; i++){
				linkItemClass = "link_item_ty2";
				linkItemFunc = '_joinform_var.thisSForm.setEmpl('+i+')';
				liHtml += '<li>';
				liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="'+linkItemFunc+'">'
				liHtml += '		<div class="'+linkItemClass+'" id="joinform_list_div">';
				liHtml += '			<div class="inner">';
				liHtml += '				<div class="link_item_left">';
				liHtml += '					<div class="item_text1" id="BANK_BRNC_NM">'+_joinform_var.data.bank_brnc_emn_list[i].EBNK_E_MORE_EMPL_NM+'</div>';
				liHtml += '				</div>';
				liHtml += '			</div>';
				liHtml += '		</div>';
				liHtml += '	</a>';
				liHtml += '</li>';
			}
			if(!_joinform_var.isEmplLastPage && _joinform_var.emplPageNo * _joinform_var.emplPageLength < dataList.length){
				$(_joinform_var.emplStepId).find("#joinform_list_more").show();
			}
			if(_joinform_var.emplPageNo == 0){
				$(_joinform_var.emplStepId).find("#joinform_lst02").html(liHtml);
			}else{
				$(_joinform_var.emplStepId).find("#joinform_lst02").append(liHtml);
			}
		},
		getMoreBankList : function() {
			_joinform_var.bankPageNo++;
			_joinform_var.thisSForm.getBankList();
		},
		getMoreEmplList : function() {
			_joinform_var.emplPageNo++;
			_joinform_var.thisSForm.getEmplList(_joinform_var.bankListIndex);
		},
		setBank : function(_index) {
			var bankInfo = _joinform_var.data.bank_brnc_list[_index];
			_joinform_var.thisSForm.isOpenBranch(bankInfo.BRCD,
				function(){
					_joinform_var.parentObj.find("#mngm_bank_brcd").val(bankInfo.BRCD);
					_joinform_var.parentObj.find("#search_brcd_text").val(bankInfo.BANK_BRNC_NM.trim());
					_joinform_var.parentObj.find("#search_brcd_text").prop("disabled", true);
					_joinform_var.parentObj.find("#btn_search_brcd").prop("disabled", true);
					_joinform_var.parentObj.find("#btn_reset_brcd").prop("disabled", false);
					
					comUtil_back(_joinform_var.parentStepNo);
					if(_joinform_var.callbackConfirm != undefined && _joinform_var.callbackConfirm.length > 0) {
						eval(_joinform_var.callbackConfirm)(bankInfo);
					}
				}
			);
		},
		setEmpl : function(_index) {
			if(_joinform_var.callbackMngmEmn != undefined && _joinform_var.callbackMngmEmn.length > 0) {
				eval(_joinform_var.callbackMngmEmn)(_joinform_var.data.bank_brnc_emn_list[_index]);
			}else{
				var emn = _joinform_var.data.bank_brnc_emn_list[_index].EMN;
				var brcd = _joinform_var.data.bank_brnc_emn_list[_index].BRCD;
				var bankBrncNm = _joinform_var.data.bank_brnc_emn_list[_index].BANK_BRNC_NM.trim();
				var maskEmplNm = _joinform_var.data.bank_brnc_emn_list[_index].EBNK_E_MORE_EMPL_NM.trim();
				_joinform_var.parentObj.find("#mngm_empl_emn").val(emn);
				_joinform_var.parentObj.find("#mngm_empl_brcd").val(brcd);
				_joinform_var.parentObj.find("#search_emn_text").val(maskEmplNm +"("+bankBrncNm+")");
				_joinform_var.parentObj.find("#search_emn_text").prop("disabled", true);
				_joinform_var.parentObj.find("#btn_search_emn").prop("disabled", true);
				_joinform_var.parentObj.find("#btn_reset_emn").prop("disabled", false);
				
				comUtil_back(_joinform_var.parentStepNo);
				if(_joinform_var.callbackConfirm != undefined && _joinform_var.callbackConfirm.length > 0) {
					eval(_joinform_var.callbackConfirm)(_joinform_var.data.bank_brnc_emn_list[_index]);
				}
			}
		},
		setData : function(_data) {
			_joinform_var.data.bank_emno_list = _data;
			
			_joinform_var.data.bank_brnc_list = _data.filter(function(item,idx){
				return _data.findIndex(function(item2){
					return item.BANK_BRNC_NM == item2.BANK_BRNC_NM;
				}) == idx;
			});
			
			_joinform_var.data.bank_brnc_emn_list = [];

		},
		getData : function() {
			var ajax = jex.createAjaxUtil("com_utl_030201_1");

			ajax.set("task_package",    "com");
			ajax.set("task_subpackage", "utl");
			ajax.set("SEARCH_TYPE",     "3"); //지점명으로 검색
			ajax.set("SEARCH_TEXT",     _joinform_var.searchText);
			ajax.errorTrx = false;

			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];
				
				if(res_data["_is_error"] == "true") {
					if(res_data["_error_cd"] == "SQL010") {
						res_data["list"] = [];
						_joinform_var.thisSForm.setData(res_data["list"]);
					} else {
						MobPopup.showErrorPopupForData(res_data);
					}
				}else{
					_joinform_var.thisSForm.setData(res_data["list"]);
				}

				_joinform_var.thisSForm.getBankList();
			});
		},
		/* 영업 가능한 지점인지 체크 */
		isOpenBranch : function(_brcd, callback) {
			if("N" == _joinform_var.openCheckYn){
				callback();
				return;
			}
			var ajax = jex.createAjaxUtil("nff_acn_010501_1");

			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			ajax.set("BRCD",            _brcd); //부점코드

			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];

				if(res_data && res_data.BRNC_YN == "Y") {
					callback();
				} else {
					MobPopup.showAlertPopup("해당 지점은 거래지점(직원)으로 지정할 수 없습니다. 다른 지점을 선택해주세요.");
				}
			});
		},
		//기존 업무 페이지의 uf_back 유지하면서 uf_back 재정의하기
		overrideUfBack : function (){
			var joinform_prev_uf_back = uf_back;
			if(joinform_prev_uf_back.toString().indexOf("joinform_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
					
					if(curStepNo == _joinform_var.bankStepNo || curStepNo == _joinform_var.emplStepNo){
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
						return;
					}
					joinform_prev_uf_back.apply(this, arguments);
				}
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_JOINFORM", JexMobileTranForm, "data-jx-joinform");
})();