/* 기관(은행/증권사) 선택팝업 공통 유틸 */
var comOrgPopUtil = {
	setterObj  : null,
	setterData : {},
	params : {
		title           : "", //팝업제목
		selectedOrgName : "", //선택한 기관명을 적용할 Target Element ID
		selectedOrgCode : "", //선택한 기관코드를 적용할 Target Element ID
		excludeOrg      : "", //제외할 기관코드
		taxYn           : "", //국세,지방세,국고금 포함여부
		callbackCancel  : "", //취소 후 호출할 콜백함수
		callbackConfirm : ""  //선택 후 호출할 콜백함수
	},
	/* 초기화 */
	init : function() {
		this.setterObj  = null;
		this.setterData = {};
		this.params     = {};
	},
	/* 선택팝업 열기 */
	open : function(params) {
		this.init();
		
		if(isEmpty(params.title)) params.title = "기관 선택";
		
		this.params = params;
		
		this.drawUI(params); //UI 생성
		
		comLayerPopUtil.open("com_org_pop"); //레이어팝업 열기
	},
	/* UI 생성 */
	drawUI : function(params) {
		var html = '';
		html += '<div class="bottom_popup_wrap" id="com_org_pop" data-log-desc="' + params.title + ' 팝업">';
		html += '	<div class="bottom_popup">';
		html += '		<div class="bottom_popup_header">';
		html += '			<h2 class="tit">' + params.title + '</h2>';
		html += '			<button type="button" class="btn_close" onclick="comOrgPopUtil.cancel();">닫기</button>';
		html += '		</div>';
		html += '		<div class="bottom_popup_body agency_select_popup">';
		html += '			<div class="agency_select_wrap">';
		html += '				<div class="agency_select_wrap_title">은행</div>';
		html += '				<ul class="agency_select_list" id="com_org_pop_bank_list" data-jx-list="com_org_pop_bank_list" role="listbox">';
		html += '					<li role="option" aria-selected="false"';
		html += '						data-jx-execute="click"';
		html += '						data-jx-setter=""';
		html += '						data-jx-setter-handler="comOrgPopUtil.selectData()"';
		html += '						data-jx-setter-source="this">';
		html += '						<div id="logo" class="ico_box ty1"></div>';
		html += '						<span class="name" id="bank_nm"></span>';
		html += '					</li>';
		html += '				</ul>';
		html += '				<div class="agency_select_wrap_title">증권사</div>';
		html += '				<ul class="agency_select_list" id="com_org_pop_stock_list" data-jx-list="com_org_pop_stock_list" role="listbox">';
		html += '					<li role="option" aria-selected="false"';
		html += '						data-jx-execute="click"';
		html += '						data-jx-setter=""';
		html += '						data-jx-setter-handler="comOrgPopUtil.selectData()"';
		html += '						data-jx-setter-source="this">';
		html += '						<div id="logo" class="ico_box ty1"></div>';
		html += '						<span class="name" id="bank_nm"></span>';
		html += '					</li>';
		html += '				</ul>';
		
		if(params.taxYn == "Y") {
			html += '				<div class="agency_select_wrap_title">국세/국고금/지방세입</div>';
			html += '				<ul class="agency_select_list" id="com_org_pop_tax_list" data-jx-list="com_org_pop_tax_list" role="listbox">';
			html += '					<li role="option" aria-selected="false"';
			html += '						data-jx-execute="click"';
			html += '						data-jx-setter=""';
			html += '						data-jx-setter-handler="comOrgPopUtil.selectData()"';
			html += '						data-jx-setter-source="this">';
			html += '						<div id="logo" class="ico_box ty1"></div>';
			html += '						<span class="name" id="bank_nm"></span>';
			html += '					</li>';
			html += '				</ul>';
		}
		
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
		if($("#com_org_pop").length == 0) {
			$(".container_wrap").append(html);
			
			jex.setJexObj($("#com_org_pop"));
		}
		
		var excludeOrgList = []; //제외기관 목록
		
		if(isEmpty(params.excludeOrg) == false) {
			excludeOrgList = params.excludeOrg.split(",");
		}
		
		var orgList = this.getOrgList(); //기관목록 조회
		
		var bankList  = new Array();
		var stockList = new Array();
		
		for(var i = 0; i < orgList.length; i++) {
			var org = orgList[i];
			
			if(this.isExcludeOrg(excludeOrgList, org["bank_cd"]) == false) {
				if(org["bank_cd"].startsWith("0")) { //은행
					bankList.push(org);
				}
				else { //증권사
					stockList.push(org);
				}
			}
		}
		
		var ulBankList = jex.getJexObj($("#com_org_pop_bank_list"), "JEX_MOBILE_LIST");
		ulBankList.setAll(bankList);
		
		var ulStockList = jex.getJexObj($("#com_org_pop_stock_list"), "JEX_MOBILE_LIST");
		ulStockList.setAll(stockList);
		
		if(params.taxYn == "Y") {
			var ulTaxList = jex.getJexObj($("#com_org_pop_tax_list"), "JEX_MOBILE_LIST");
			ulTaxList.setAll([{"bank_cd":"0126", "bank_nm":"국세"}, {"bank_cd":"485", "bank_nm":"국고금"}, {"bank_cd":"481", "bank_nm":"지방세입"}]);
		}
		
		$("#com_org_pop").find(".agency_select_list li").each(function(idx, obj) {
			var rowData = $(obj).data("_JEX_GETALL_DATA_");
			
			$(obj).find("#logo").addClass(comOrgPopUtil.getOrgLogoClass(rowData["bank_cd"]));
		});
		
	},
	/* 클래스  */
	getOrgLogoClass : function(orgCd) {
		return "ico_bank_" + orgCd;
	},
	/* 옵션 선택 */
	selectData : function($tg, data) {
		this.setterObj  = $tg;
		this.setterData = data;
		
		comLayerPopUtil.close("com_org_pop"); //팝업 닫기
		
		this.setTargetData("bank_nm", this.params.selectedOrgName, this.setterData); //선택한 기관의 이름을 타겟에 설정
		this.setTargetData("bank_cd", this.params.selectedOrgCode, this.setterData); //선택한 기관의 코드를 타겟에 설정
		
		if(isEmpty(this.params.callbackConfirm) == false) { //선택 후 호출할 콜백함수가 있을경우
			eval(this.params.callbackConfirm(this.setterObj, this.setterData));
		}
		
		return {};
	},
	/* 선택팝업 닫기 */
	cancel : function() {
		comLayerPopUtil.close("com_org_pop"); //팝업 닫기
		
		if(isEmpty(this.params.callbackCancel) == false) { //취소 후 호출할 콜백함수가 있을경우
			eval(this.params.callbackCancel()); //콜백함수 호출
		}
	},
	/* 선택항목 타켓에 설정 */
	setTargetData : function(dataKey, targetId, data) {
		if(!isEmpty(targetId) && $(targetId).length > 0) {
			$(targetId).setTagValue(data[dataKey]);
		}
	},
	isExcludeOrg : function(excludeOrgList, orgCd) {
		var result = false;
		
		for(var i = 0; i < excludeOrgList.length; i++) {
			var excludeOrg = excludeOrgList[i];
			
			if(excludeOrg == orgCd) {
				result = true;
				break;
			}
		}
		
		return result;
	},
	/* 기관목록 조회 */
	getOrgList : function() {
		var orgList = [];
		
		comUtil_getBasicInfo({"need_item" : "bank_list"}, function() {
			orgList = this.bank_list;
		});
		
		return orgList;
	}
}