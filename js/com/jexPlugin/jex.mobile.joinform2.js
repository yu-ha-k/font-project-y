var _joinform2_var = {
		"thisSForm"			: ""
		,"parentObj"		: ""
		,"parentStepNo"		: ""
		,"bankStepNo"		: 73
		,"emplStepNo"		: 74
		,"bankStepId"		: ""
		,"emplStepId"		: ""
		,"type"				: "" // E(관리직원), B(관리점)
		,"data"				: {}
		,"bankPageNo"		: 0
		,"bankPageLength"	: 20
		,"emplPageNo"		: 0
		,"emplPageLength"	: 20
		,"isBankLastPage"	: false
		,"isEmplLastPage"	: false
		,"searchText"		: ""
		,"showNoSelEmnYn"	: "N"
		,"openCheckYn"		: "Y"
		,"showTpnYn"		: "N"
		,"brcdType"			: "nff" // nff(비대면), frx(외환) (default : nff)
		,"callbackConfirm"	: ""
		,"curIndex"			: ""
};

// joinform  : 지점/직원을 동시에 검색
// joinform2 : 지점/직원울 따로 검색
(function() {
	var sForm_attrs = {
			"id"				: "data-jx-joinform2"					// [required] 관리직원/관리점 정보 Element ID
			,"areaMngmEmn"		: "data-jx-joinform2-area-mngm-emn"		// [option] 관리직원 정보 노출 영역
			,"areaMngmOnlyEmn"	: "data-jx-joinform2-area-mngm-only-emn"// [option] 관리직원 정보만 선택하는 노출 영역
			,"onlyEmnBrcd"		: "data-jx-joinform2-only-emn-brcd"		// [option] 관리직원 정보만 선택하는 경우 지점코드
			,"onlyEmnBrcdNm"	: "data-jx-joinform2-only-emn-brcd-nm"	// [option] 관리직원 정보만 선택하는 경우 지점명
			,"areaMngmBrcd"		: "data-jx-joinform2-area-mngm-brcd"	// [option] 관리점 정보 노출 영역
			,"brcdType"			: "data-jx-joinform2-brcd-type"			// [option] 관리점 타입 nff(비대면), frx(외환) (default : nff)
			,"showNoSelEmnYn"	: "data-jx-joinform2-show-no-sel-emn-yn"// [option] 관리직원 선택 시 '직원선택 안함' 리스트 노출 여부 (default : N)
			,"showTpnYn"		: "data-jx-joinform2-show-tpn-yn"		// [option] 관리점 전화번호 노출 여부 (default : N)
			,"openCheckYn"		: "data-jx-joinform2-open-check-yn"		// [option] 영업 가능한 지점인지 체크 여부 (default : Y)
			,"callbackConfirm"	: "data-jx-joinform2-callback-confirm"	// [option] 관리직원/관리점 선택 시 실행되는 callback
	};
	
	var JexMobileTranForm = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			_joinform2_var.thisSForm 	= this;
			_joinform2_var.parentObj 	= $jq ;
			_joinform2_var.parentStepNo 	= $jq.attr("data-jx-step-no");
			_joinform2_var.bankStepId = "#step" + _joinform2_var.bankStepNo;
			_joinform2_var.emplStepId = "#step" + _joinform2_var.emplStepNo;
			_joinform2_var.showNoSelEmnYn = $jq.attr(sForm_attrs.showNoSelEmnYn) == undefined ? _joinform2_var.showNoSelEmnYn : $jq.attr(sForm_attrs.showNoSelEmnYn);
			_joinform2_var.openCheckYn = $jq.attr(sForm_attrs.openCheckYn) == undefined ? _joinform2_var.openCheckYn : $jq.attr(sForm_attrs.openCheckYn);
			_joinform2_var.showTpnYn = $jq.attr(sForm_attrs.showTpnYn) == undefined ? _joinform2_var.showTpnYn : $jq.attr(sForm_attrs.showTpnYn);
			_joinform2_var.brcdType = $jq.attr(sForm_attrs.brcdType) == undefined ? _joinform2_var.brcdType : $jq.attr(sForm_attrs.brcdType);
			_joinform2_var.callbackConfirm = $jq.attr(sForm_attrs.callbackConfirm);
			_joinform2_var.thisSForm.drawJoinForm();
		},
		drawJoinForm : function() {
			var formFilePath = "../../com/joinform2.html";
			if(window.location.href.indexOf("guide") > -1){
				formFilePath = "../../../../html/phone/com/joinform2.html";
			}
			$.ajax({
				url:formFilePath,
				type:'get',
				async: false,
				success: function(dat){
					var $joinform_html = $(dat);
					var areaMngmEmn = _joinform2_var.parentObj.find('[' + sForm_attrs.areaMngmEmn + ']:first');
					if (areaMngmEmn.length > 0) {
						areaMngmEmn.html($joinform_html.find("#joinform_mngm_emn_area").html());
					}
					
					var areaMngmOnlyEmn = _joinform2_var.parentObj.find('[' + sForm_attrs.areaMngmOnlyEmn + ']:first');
					if (areaMngmOnlyEmn.length > 0) {
						areaMngmOnlyEmn.html($joinform_html.find("#joinform_mngm_only_emn_area").html());
					}
					
					var areaMngmBrcd = _joinform2_var.parentObj.find('[' + sForm_attrs.areaMngmBrcd + ']:first');
					if (areaMngmBrcd.length > 0) {
						areaMngmBrcd.html($joinform_html.find("#joinform_mngm_brcd_area").html());
					}
					
					if($(_joinform2_var.bankStepId).length == 0) {
						$("#step").append($joinform_html.find(_joinform2_var.bankStepId));
						jex.setJexObj($(_joinform2_var.bankStepId));
						_joinform2_var.thisSForm.addBankStepEvent();
					}
					if($(_joinform2_var.emplStepId).length == 0) {
						$("#step").append($joinform_html.find(_joinform2_var.emplStepId));
						jex.setJexObj($(_joinform2_var.emplStepId));
						_joinform2_var.thisSForm.addEmplStepEvent();
					}
				}
			});
		},
		goBankStep : function(_type){
			_joinform2_var.type = _type;
			
			var searchText = "";
			if("E" == _type){
				searchText = _joinform2_var.parentObj.find("#search_emn_text").val();
			}
			if("B" == _type){
				searchText = _joinform2_var.parentObj.find("#search_brcd_text").val();
			}
			
			$(_joinform2_var.bankStepId).find("#joinform_search_text").val(searchText);
			if(searchText.length < 1 ){
				MobPopup.showAlertPopup("지점명을 입력 후 검색해 주세요","");
				return "";
			}
			_joinform2_var.thisSForm.search('B')
			uf_goStep(_joinform2_var.bankStepNo);
		},
		goEmplStep : function(_index){
			_joinform2_var.thisSForm.isOpenBranch(_index,
				function(){
					_joinform2_var.thisSForm.getEmplData(_index);
				}
			)
		}
		,goOnlyEmplStep : function(){
			var brcd = _joinform2_var.parentObj.find('['+sForm_attrs.areaMngmOnlyEmn+']').attr(sForm_attrs.onlyEmnBrcd);
			_joinform2_var.thisSForm.getEmplData(null, brcd);
		},
		search : function(_type){
			_joinform2_var.bankPageNo = 0;
			_joinform2_var.emplPageNo = 0;
			_joinform2_var.isBankLastPage = false;
			_joinform2_var.isEmplLastPage = false;
			var searchText = "";
			if(_type == "B"){
				searchText = $.trim($(_joinform2_var.bankStepId).find("#joinform_search_text").val());
			}
			if(_type == "E"){
				searchText = $.trim($(_joinform2_var.emplStepId).find("#joinform_search_text").val());
			}
			_joinform2_var.searchText = searchText;

			if(_joinform2_var.searchText.length < 1 ){
				MobPopup.showAlertPopup("검색하실 단어를 한 글자 이상 입력해 주세요","");
				return "";
			}

			_joinform2_var.thisSForm.getBrcdData();
			if(_type == "E"){
				$(_joinform2_var.bankStepId).find("#joinform_search_text").val(searchText);
				uf_goStep(_joinform2_var.bankStepNo)
			}
		},
		addBankStepEvent: function(){
			_joinform2_var.parentObj.find("#search_brcd_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					_joinform2_var.thisSForm.goBankStep('B')
				}
			});
			
			_joinform2_var.parentObj.find("#btn_reset_brcd").off("click").on("click", function(e) {
				_joinform2_var.parentObj.find("#mngm_bank_brcd").val("");
				_joinform2_var.parentObj.find("#search_brcd_text").val("");
				_joinform2_var.parentObj.find("#btn_reset_brcd").prop("disabled", true);
				_joinform2_var.parentObj.find("#btn_search_brcd").prop("disabled", false);
				_joinform2_var.parentObj.find("#search_brcd_text").prop("disabled", false);
			});
			
			_joinform2_var.data = {};
			
			$(_joinform2_var.bankStepId).find("#joinform_search_text").val("");
			$(_joinform2_var.bankStepId).find("#joinform_search_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					$(_joinform2_var.bankStepId).find("#joinform_btn_search").click();
				}
			});
			
			$(_joinform2_var.bankStepId).find("#joinform_list_more").hide();
		},
		addEmplStepEvent: function(){
			_joinform2_var.parentObj.find("#search_emn_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					_joinform2_var.thisSForm.goBankStep('E')
				}
			});
			
			_joinform2_var.parentObj.find("#btn_reset_emn").off("click").on("click", function(e) {
				_joinform2_var.parentObj.find("#mngm_empl_emn").val("");
				_joinform2_var.parentObj.find("#mngm_empl_brcd").val("");
				_joinform2_var.parentObj.find("#search_emn_text").val("");
				_joinform2_var.parentObj.find("#btn_reset_emn").prop("disabled", true);
				_joinform2_var.parentObj.find("#btn_search_emn").prop("disabled", false);
				_joinform2_var.parentObj.find("#search_emn_text").prop("disabled", false);
			});
			
			$(_joinform2_var.emplStepId).find("#joinform_search_text").off("keypress").on("keypress", function(e) {
				if(e.keyCode === 13){
					$(_joinform2_var.emplStepId).find("#joinform_btn_search").click();
				}
			});
		},
		getBankList : function(){
			_joinform2_var.thisSForm.overrideUfBack();
			$(_joinform2_var.bankStepId).find("#joinform_list_more").hide();
			if(_joinform2_var.data.bank_brnc_list.length == 0){
				var liHtml = '';
				liHtml += '<li class="no_data" id="EMPTY">';
				liHtml += '	<div class="no_result_msg">';
				liHtml += '		<div class="msg">검색 결과가 없습니다.<br>지점명을 다시 확인 해주세요.</div>';
				liHtml += '	</div>';
				liHtml += '</li>';
				$(_joinform2_var.bankStepId).find("#joinform_lst01").html(liHtml);
			}else{
				var liHtml = '';
				var linkItemClass = '';
				var linkItemFunc = '';
				
				//더보기 처리하기
				var dataList = _joinform2_var.data.bank_brnc_list;

				var rowCnt;
				if(_joinform2_var.bankPageLength >= dataList.length ||
						(_joinform2_var.bankPageNo+1) * _joinform2_var.bankPageLength >= dataList.length){
					rowCnt = dataList.length;
					_joinform2_var.isBankLastPage = true;
				}else {
					rowCnt = (_joinform2_var.bankPageNo+1) * _joinform2_var.bankPageLength;
				}
				//-----------
				for(var i = (_joinform2_var.bankPageNo * _joinform2_var.bankPageLength); i < rowCnt; i++){
					var brnc_nm = "";
					var brnc_adr = "";
					var new_brnc_adr = "";
					var new_tpn = "";
					if(_joinform2_var.brcdType == "nff"){
						brnc_nm = dataList[i].EBNK_EFNC_BRNC_NM;
						brnc_adr = dataList[i].EBNK_BRNC_ADR;
						new_brnc_adr = dataList[i].NEW_EBNK_BRNC_ADR;
						new_tpn = dataList[i].NEW_TPN;
					}else{
						brnc_nm = dataList[i].KRN_BRM;
						brnc_adr = dataList[i].NW_ADR;
						new_brnc_adr = dataList[i].ADDR_TEXT;
						new_tpn = dataList[i].OTPT_TPN;
					}
					
					if(_joinform2_var.showTpnYn=="Y"){
						linkItemClass = 'group_item';
						if(_joinform2_var.type == "B"){
							linkItemFunc = '_joinform2_var.thisSForm.setBank('+i+')';
						}
						if(_joinform2_var.type == "E"){
							linkItemFunc = '_joinform2_var.thisSForm.goEmplStep('+i+')';
						}
						liHtml += '<li>';
						liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="'+linkItemFunc+'">'
						liHtml += '		<div class="'+linkItemClass+'">';
						liHtml += '			<div class="group_item_info"><div class="txt3">'+brnc_nm+'</div></div>';
						liHtml += '			<div class="group_item_detail ty2">';
						liHtml += '				<p class="line" role="text">';
						liHtml += '					<span class="line_left">';
						liHtml += '						<span class="tit">전화번호</span>';
						liHtml += '					</span>';
						liHtml += '					<span class="line_right">';
						liHtml += '						<span class="txt">'+new_tpn+'</span>';
						liHtml += '					</span>';
						liHtml += '				</p>';
						liHtml += '				<p class="line" role="text">';
						liHtml += '					<span class="line_left">';
						liHtml += '						<span class="tit">주소</span>';
						liHtml += '					</span>';
						liHtml += '					<span class="line_right">';
						liHtml += '						<span class="txt">'+new_brnc_adr+'</span>';
						liHtml += '					</span>';
						liHtml += '				</p>';
						liHtml += '			</div>';
						liHtml += '		</div>';
						liHtml += '	</a>';
						liHtml += '</li>';
					}else{
						linkItemClass = 'link_item_ty4';
						if(_joinform2_var.type == "B"){
							linkItemFunc = '_joinform2_var.thisSForm.setBank('+i+')';
						}
						if(_joinform2_var.type == "E"){
							linkItemFunc = '_joinform2_var.thisSForm.goEmplStep('+i+')';
						}
						liHtml += '<li>';
						liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="'+linkItemFunc+'">'
						liHtml += '		<div class="'+linkItemClass+'">';
						liHtml += '			<div class="link_item_ty4_title">'+brnc_nm+'</div>';
						liHtml += '			<div class="link_item_ty4_detail">';
						liHtml += '				<span class="tit">주소</span>';
						liHtml += '				<div class="cont">';
						liHtml += '					<span class="link_item_ty4_item">'+new_brnc_adr+'</span>';
						liHtml += '				</div>';
						liHtml += '			</div>';
						liHtml += '		</div>';
						liHtml += '	</a>';
						liHtml += '</li>';
					}
				}
				
				if(!_joinform2_var.isBankLastPage && _joinform2_var.bankPageNo * _joinform2_var.bankPageLength < dataList.length){
					$(_joinform2_var.bankStepId).find("#joinform_list_more").show();
				}
				if(_joinform2_var.bankPageNo == 0){
					$(_joinform2_var.bankStepId).find("#joinform_lst01").html(liHtml);
				}else{
					$(_joinform2_var.bankStepId).find("#joinform_lst01").append(liHtml);
				}
				jex.setJexObj($(_joinform2_var.bankStepId).find("#joinform_lst01"));
			}
			$(_joinform2_var.bankStepId).find("#joinform_lst01").show();
		},
		getEmplList : function(_isOnlyEmn){
			$(_joinform2_var.emplStepId).find("#joinform_list_more").hide();
			var liHtml = '';
			var linkItemClass = '';
			var linkItemFunc = '';
			
			//더보기 처리하기
			var dataList = _joinform2_var.data.bank_brnc_emn_list;
			var rowCnt;
			if(_joinform2_var.emplPageLength >= dataList.length ||
					(_joinform2_var.emplPageNo+1) * _joinform2_var.emplPageLength >= dataList.length){
				rowCnt = dataList.length;
				_joinform2_var.isEmplLastPage = true;
			}else {
				rowCnt = (_joinform2_var.emplPageNo+1) * _joinform2_var.emplPageLength;
			}
			
			if(_joinform2_var.emplPageNo == 0 && _joinform2_var.showNoSelEmnYn == "Y"){//직원선택 없음 체크
				liHtml += '<li>';

				if(_isOnlyEmn){
					liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="_joinform2_var.thisSForm.setOnlyEmpl()">';
				}else{
					liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="_joinform2_var.thisSForm.setEmpl()">';
				}
				liHtml += '		<div class="link_item_ty2">';
				liHtml += '			<div class="inner">';
				liHtml += '				<div class="link_item_left">';
				liHtml += '					<div class="item_text1">직원 선택안함</div>';
				liHtml += '				</div>';
				liHtml += '			</div>';
				liHtml += '		</div>';
				liHtml += '	</a>';
				liHtml += '</li>';
			}
			
			//-----------
			for(var i = (_joinform2_var.emplPageNo * _joinform2_var.emplPageLength); i < rowCnt; i++){
				linkItemClass = "link_item_ty2";
				if(_isOnlyEmn){
					linkItemFunc = '_joinform2_var.thisSForm.setOnlyEmpl(\''+_joinform2_var.data.bank_brnc_emn_list[i].EMN+'\',\''+_joinform2_var.data.bank_brnc_emn_list[i].EBNK_E_MORE_EMPL_NM+'\')';
				}else{
					linkItemFunc = '_joinform2_var.thisSForm.setEmpl('+i+')';
				}
				liHtml += '<li>';
				liHtml += '	<a href="javascript:;" id="joinform_list_a" role="button" class="block" onclick="'+linkItemFunc+'">'
				liHtml += '		<div class="'+linkItemClass+'">';
				liHtml += '			<div class="inner">';
				liHtml += '				<div class="link_item_left">';
				liHtml += '					<div class="item_text1">'+_joinform2_var.data.bank_brnc_emn_list[i].BANK_BRNC_NM+'</div>';
				liHtml += '				</div>';
				liHtml += '				<div class="link_item_right">';
				liHtml += '					<div class="item_text1">'+_joinform2_var.data.bank_brnc_emn_list[i].EBNK_E_MORE_EMPL_NM+'</div>';
				liHtml += '				</div>';
				liHtml += '			</div>';
				liHtml += '		</div>';
				liHtml += '	</a>';
				liHtml += '</li>';
			}
			if(!_joinform2_var.isEmplLastPage && _joinform2_var.emplPageNo * _joinform2_var.emplPageLength < dataList.length){
				$(_joinform2_var.emplStepId).find("#joinform_list_more").off("click").on("click", function(e) {
					if(_isOnlyEmn){
						_joinform2_var.thisSForm.getMoreBankList(_isOnlyEmn);
					}else{
						_joinform2_var.thisSForm.getMoreBankList();
					}
				});
			}
			if(_joinform2_var.emplPageNo == 0){
				$(_joinform2_var.emplStepId).find("#joinform_lst02").html(liHtml);
			}else{
				$(_joinform2_var.emplStepId).find("#joinform_lst02").append(liHtml);
			}
		},
		getMoreBankList : function() {
			_joinform2_var.bankPageNo++;
			_joinform2_var.thisSForm.getBankList();
		},
		getMoreEmplList : function(_isOnlyEmn) {
			_joinform2_var.emplPageNo++;
			if(_isOnlyEmn){
				_joinform2_var.thisSForm.getEmplList(_isOnlyEmn);
			}else{
				_joinform2_var.thisSForm.getEmplList();
			}
		},
		setBank : function(_index) {
			var bankInfo = _joinform2_var.data.bank_brnc_list[_index];
			var brcd = "";
			var bankBrncNm = "";
			if(_joinform2_var.brcdType == "nff"){
				brcd = bankInfo.EBNK_BRNC_BRCD;
				bankBrncNm = bankInfo.EBNK_EFNC_BRNC_NM.trim();
			}else{
				brcd = bankInfo.BNOR_BRCD.substring(2,6);
				bankBrncNm = bankInfo.KRN_BRM.trim();
			}
			_joinform2_var.thisSForm.isOpenBranch(_index,
				function(){
					_joinform2_var.parentObj.find("#mngm_bank_brcd").val(brcd);
					_joinform2_var.parentObj.find("#search_brcd_text").val(bankBrncNm);
					_joinform2_var.parentObj.find("#search_brcd_text").prop("disabled", true);
					_joinform2_var.parentObj.find("#btn_search_brcd").prop("disabled", true);
					_joinform2_var.parentObj.find("#btn_reset_brcd").prop("disabled", false);
					
					comUtil_back(_joinform2_var.parentStepNo);
					if(_joinform2_var.callbackConfirm != undefined && _joinform2_var.callbackConfirm.length > 0) {
						eval(_joinform2_var.callbackConfirm)(bankInfo);
					}
				}
			);
		},
		setEmpl : function(_index) {
			var bankInfo = {};
			var emn = "";
			var brcd = "";
			var emnText = "";
			var bankBrncNm = "";
			var maskEmplNm = "";
			if(_index != undefined){
				bankInfo = _joinform2_var.data.bank_brnc_emn_list[_index];
				emn = bankInfo.EMN;
				brcd = bankInfo.BRCD;
				bankBrncNm = bankInfo.BANK_BRNC_NM.trim();
				maskEmplNm = bankInfo.EBNK_E_MORE_EMPL_NM.trim();
				emnText = bankBrncNm +"("+maskEmplNm+")";
			}else{
				bankInfo = _joinform2_var.data.bank_brnc_list[_joinform2_var.curIndex];
				if(_joinform2_var.brcdType == "nff"){
					brcd = bankInfo.EBNK_BRNC_BRCD;
					bankBrncNm = bankInfo.EBNK_EFNC_BRNC_NM.trim();
				}else{
					brcd = bankInfo.BNOR_BRCD.substring(2,6);
					bankBrncNm = bankInfo.KRN_BRM.trim();
				}
				emnText = bankBrncNm;
				emn = "000000";
			}
			_joinform2_var.parentObj.find("#mngm_empl_emn").val(emn);
			_joinform2_var.parentObj.find("#mngm_empl_brcd").val(brcd);
			_joinform2_var.parentObj.find("#search_emn_text").val(emnText);
			_joinform2_var.parentObj.find("#search_emn_text").prop("disabled", true);
			_joinform2_var.parentObj.find("#btn_search_emn").prop("disabled", true);
			_joinform2_var.parentObj.find("#btn_reset_emn").prop("disabled", false);
			
			comUtil_back(_joinform2_var.parentStepNo);
			if(_joinform2_var.callbackConfirm != undefined && _joinform2_var.callbackConfirm.length > 0) {
				eval(_joinform2_var.callbackConfirm)(bankInfo);
			}
		},
		setOnlyEmpl : function(_emn, _emplNm) {
			var brcd = _joinform2_var.parentObj.find('['+sForm_attrs.areaMngmOnlyEmn+']').attr(sForm_attrs.onlyEmnBrcd);
			var bankBrncNm = _joinform2_var.parentObj.find('['+sForm_attrs.areaMngmOnlyEmn+']').attr(sForm_attrs.onlyEmnBrcdNm);
			
			var emn = "";
			var emnText = "";
			var maskEmplNm = "";
			if(_emn != undefined){
				emn = _emn;
				maskEmplNm = _emplNm;
				emnText = bankBrncNm +"("+maskEmplNm+")";
			}else{
				emn = "000000";
				emnText = bankBrncNm;
			}
			_joinform2_var.parentObj.find("#mngm_only_empl_emn").val(emn);
			_joinform2_var.parentObj.find("#mngm_only_empl_brcd").val(brcd);
			_joinform2_var.parentObj.find("#search_only_emn_text").val(emnText);
			
			comUtil_back(_joinform2_var.parentStepNo);
			if(_joinform2_var.callbackConfirm != undefined && _joinform2_var.callbackConfirm.length > 0) {
				eval(_joinform2_var.callbackConfirm)({EMN: emn, BANK_BRNC_NM: bankBrncNm, EBNK_E_MORE_EMPL_NM: maskEmplNm, BRCD: brcd});
			}
		},
		getBrcdData : function() {
			var svcId = "";
			if(_joinform2_var.brcdType == "nff"){
				svcId = "nff_acn_010301_1";
			}else{
				svcId = "fnt_frx_150101_3";
			}
			var ajax = jex.createAjaxUtil(svcId); // 지점 검색

			ajax.set("task_package",    svcId.substring(0,3));
			ajax.set("task_subpackage", svcId.substring(4,7));
			ajax.set("EBNK_EFNC_BRNC_NM_ADRS60", _joinform2_var.searchText);
			ajax.errorTrx = false;

			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];
				
				if(res_data["_is_error"] == "true") {
					if(res_data["_error_cd"] == "SQL010" || res_data["_error_cd"] == "ECBKEBK11071") {
						res_data["list"] = [];
					} else {
						MobPopup.showErrorPopupForData(res_data);
					}
				}

				_joinform2_var.data.bank_brnc_list = res_data["list"];
				_joinform2_var.data.bank_brnc_emn_list = [];
				_joinform2_var.thisSForm.getBankList();
			});
		},
		getEmplData : function(_index, _brcd) {
			if(_brcd == null){
				var bankInfo = _joinform2_var.data.bank_brnc_list[_index];
				var brcd = "";
				if(_joinform2_var.brcdType == "nff"){
					brcd = bankInfo.EBNK_BRNC_BRCD;
				}else{
					brcd = bankInfo.BNOR_BRCD.substring(2,6);
				}
			}else{
				// 직원 검색만 하는 경우
				var brcd = _brcd;
			}
			
			var ajax = jex.createAjaxUtil("nff_acn_010601_1"); // 직원 검색
			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			ajax.set("SEARCH_TYPE", "4");
			ajax.set("SEARCH_TEXT", brcd);
			ajax.errorTrx = false;

			ajax.execute(function(dat) {
				var res_data = dat["_tran_res_data"][0];
				
				if(res_data["_is_error"] == "true") {
					if(res_data["_error_cd"] == "SQL010") {
						res_data["list"] = [];
					} else {
						MobPopup.showErrorPopupForData(res_data);
					}
				}

				_joinform2_var.data.bank_brnc_emn_list = res_data["list"];

				_joinform2_var.thisSForm.addEmplStepEvent();
				
				//지점 step과 동일하도록
				if(_brcd == null){
					_joinform2_var.thisSForm.getEmplList();
					var searchText = $.trim($(_joinform2_var.bankStepId).find("#joinform_search_text").val());
					$(_joinform2_var.emplStepId).find("#joinform_search_text").val(searchText);
					$(_joinform2_var.emplStepId).find("#joinform_btn_search").attr("disabled", false);
					$(_joinform2_var.emplStepId).find("#joinform_search_text").attr("disabled", false);
					_joinform2_var.curIndex = _index;
				}else{
					// 직원 검색만 하는 경우
					_joinform2_var.thisSForm.getEmplList(true);
					var brcdNm = _joinform2_var.parentObj.find('['+sForm_attrs.areaMngmOnlyEmn+']').attr(sForm_attrs.onlyEmnBrcdNm);
					$(_joinform2_var.emplStepId).find("#joinform_search_text").val(brcdNm);
					$(_joinform2_var.emplStepId).find("#joinform_btn_search").attr("disabled", true);
					$(_joinform2_var.emplStepId).find("#joinform_search_text").attr("disabled", true);
				}
				
				uf_goStep(_joinform2_var.emplStepNo);
			});
		},
		/* 영업 가능한 지점인지 체크 */
		isOpenBranch : function(_index, callback) {
			var bankInfo = _joinform2_var.data.bank_brnc_list[_index];
			var brcd = "";
			if(_joinform2_var.brcdType == "nff"){
				brcd = bankInfo.EBNK_BRNC_BRCD;
			}else{
				brcd = bankInfo.BNOR_BRCD.substring(2,6);
			}
			if("N" == _joinform2_var.openCheckYn){
				callback();
				return;
			}
			var ajax = jex.createAjaxUtil("nff_acn_010501_1");

			ajax.set("task_package",    "nff");
			ajax.set("task_subpackage", "acn");
			ajax.set("BRCD",            brcd); //부점코드

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
			var joinform2_prev_uf_back = uf_back;
			if(joinform2_prev_uf_back.toString().indexOf("joinform2_prev_uf_back")==-1){
				uf_back = function(){
					if(comUtil_isBack() == false) {
						return;
					}
					
					var curStepNo = jex.plugin.get('JEX_MOBILE_STEP').getStepNo();
					
					if(curStepNo == _joinform2_var.bankStepNo || curStepNo == _joinform2_var.emplStepNo){
						jex.plugin.get("JEX_MOBILE_STEP").showPrevCallStep();
						return;
					}
					joinform2_prev_uf_back.apply(this, arguments);
				}
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_JOINFORM2", JexMobileTranForm, "data-jx-joinform2");
})();