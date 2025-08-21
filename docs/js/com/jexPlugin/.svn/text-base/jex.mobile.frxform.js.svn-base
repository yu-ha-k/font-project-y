(function() {
	/**
	 * Date: 2017.10.16
	 *
	 * 1. 계좌선택 영역 2. 입금정보 3. 선택사항
	 *
	 * @namespace JexMobilefrxForm
	 */
	window._frxForm;
	var gubn = "";
	var fnt_frx_010101_5_List;
	var sForm_attrs = {
		  "id"      : "data-jx-frxform"                                   // 호출할 svc 명
		, "pvamt"   : "data-jx-frxform-pvamt"                             // 계좌리스트 팝업에서 출금가능액 노출 여부
		//, "comGbn"  : "data-jx-frxform-comgbn"
	};
	var sFormObj_attrs = {
			 "areaDrotCust"         : "data-jx-frxform-area-drot-cust"           // 고객번호 선택된 노출영역
			,"areaDrotCustSelect"   : "data-jx-frxform-area-drot-cust-select"    // 고객번호 select 표현방식여부
			,"areaDrotAcno"         : "data-jx-frxform-area-drot-acno"           // 원화출금계좌 선택된 노출영역
			,"areaDrotAcnoSelect"   : "data-jx-frxform-area-drot-acno-select"    // 원화출금계좌 select 표현방식여부
			,"areaDrotFeeAcno"      : "data-jx-frxform-area-drot-feeAcno"        // 수수료계좌 선택된 노출영역
			,"areaDrotFeeAcnoSelect": "data-jx-frxform-area-drot-feeAcno-select" // 수수료계좌 select 표현방식여부
			,"areaDrotFacno"        : "data-jx-frxform-area-drot-facno"          // 외화출금계좌 선택된 노출영역
			,"areaDrotFacnoSelect"  : "data-jx-frxform-area-drot-facno-select"   // 외화출금계좌 select 표현방식여부
			,"btnExchangeRate"      : "data-jx-frxform-btn-exc-rate"             // [환율조회] 버튼
			,"btnMyAccNo"           : "data-jx-frxform-btn-my-accno"             // [내계좌] 버튼
			,"btnFavAcnt"           : "data-jx-frxform-btn-favorite-acnt"        // [자주쓰는계좌] 버튼
			,"btnFacnoBalc"         : "data-jx-frxform-btn-facno-balc"           // [환율조회] 버튼
			,"areaDrotCrcd"         : "data-jx-frxform-area-drot-crcd"           // 통화 선택된 노출영역
			,"areaDrotCrcdSelect"   : "data-jx-frxform-area-drot-crcd-select"    // 통화 select 표현방식여부
			,"areaDrotBankCd"       : "data-jx-frxform-area-drot-bankCd"         // 지급은행 선택된 노출영역
			,"areaDrotBankCdSelect" : "data-jx-frxform-area-drot-bankCd-select"  // 지급은행 select 표현방식여부
			,"areaDrotRmtnNtCd"         : "data-jx-frxform-area-drot-rmtnntcd"           // 수취인 소재국 국가 선택된 노출영역
			,"areaDrotRmtnNtCdSelect"   : "data-jx-frxform-area-drot-rmtnntcd-select"    // 수취인 소재국 국가 select 표현방식여부
			,"areaDrotCntpNtCd"         : "data-jx-frxform-area-drot-cntpntcd"           // 지급은행 소재국 국가 선택된 노출영역
			,"areaDrotCntpNtCdSelect"   : "data-jx-frxform-area-drot-cntpntcd-select"    // 지급은행 소재국 국가 select 표현방식여부
			,"areaDrotBankUiqCd"        : "data-jx-frxform-area-drot-bankuiqcd"          // 은행고유번호 선택된 노출영역
			,"areaDrotBankUiqCdSelect"  : "data-jx-frxform-area-drot-bankuiqcd-select"   // 은행고유번호 select 표현방식여부
			,"areaDrotCountryCd"        : "data-jx-frxform-area-drot-countrycd"          // 국가 선택된 노출영역
			,"areaDrotCountryCdSelect"  : "data-jx-frxform-area-drot-countrycd-select"   // 국가 select 표현방식여부
	};

	var JexMobileFrxForm = JexPlugin .extend({
		init : function() {
			window._frxForm = this;
		},
		formIds : {
			 "drotCustInfoId"       : "drotCustInfo"         // 고객번호정보영역 ID
			,"custListTbl"          : "custListTbl"          // 고객번호리스트영역 ID
			,"drotAcnoInfoId"       : "drotAcnoInfo"         // 원화출금계좌정보영역 ID
			,"acnoListTbl"          : "acnoListTbl"          // 원화출금계좌리스트영역 ID
			,"feeAcnoListTbl"       : "feeAcnoListTbl"       // 수수료계좌리스트영역 ID
			,"drotFeeAcnoInfoId"    : "drotFeeAcnoInfo"      // 수수료계좌정보영역 ID
			,"drotFacnoInfoId"      : "drotFacnoInfo"        // 외화출금계좌정보영역 ID
			,"facnoListTbl"         : "facnoListTbl"         // 외화출금계좌리스트영역 ID
			,"drotMyAccNoInfoId"    : "drotMyAccNoInfo"      // 내계좌정보영역 ID
			,"myAccNoListTbl"       : "myAccNoListTbl"       // [내계좌] ID
			,"favoriteAcntListTbl"  : "favoriteAcntListTbl"  // 최근입금계좌 ID
			,"drotCrcdInfoId"       : "drotCrcdInfo"         // 통화정보영역 ID
			,"crcdListTbl"          : "crcdListTbl"          // 통화리스트영역 ID
			,"drotBankCdInfoId"     : "drotBankCdInfo"       // 지급은행정보영역 ID
			,"bankCdListTbl"        : "bankCdListTbl"        // 지급은행리스트영역 ID
			,"drotRmtnNtCdInfoId"   : "drotRmtnNtCdInfo"     // 수취인 소재국 정보영역 ID
			,"rmtnNtCdListTbl"      : "rmtnNtCdListTbl"      // 수취인 소재국 리스트영역 ID
			,"drotCntpNtCdInfoId"   : "drotCntpNtCdInfo"     // 지급은행 소재국 정보영역 ID
			,"cntpNtCdListTbl"      : "cntpNtCdListTbl"      // 지급은행 소재국 리스트영역 ID
			,"drotBankUiqCdInfoId"  : "drotBankUiqCdInfo"    // 은행고유구분 은행정보영역 ID
			,"bankUiqCdListTbl"     : "bankUiqCdListTbl"     // 은행고유구분 은행리스트영역 ID
			,"drotCountryCdInfoId"  : "drotCountryCdInfo"    // 국가 은행정보영역 ID
			,"countryCdListTbl"     : "countryCdListTbl"     // 국가 은행리스트영역 ID
				,"facnoBalcTbl"     : "facnoBalcTbl"     
		},
		/**
		 * @method load data-jx-frxform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {

			this._this = this;

			this.$jq = $jq;
			this.id = $jq.attr(sForm_attrs.id);
			this.stepNo = $jq.attr('data-jx-step-no');

			this.preapreSvcDiv();
			//this.preparePopup();
			
			this.isPvamt = this.$jq.attr(sForm_attrs.pvamt) ? eval(this.$jq.attr(sForm_attrs.pvamt)) : false;

			if ($('#drot_cust_hid').length == 0) {
				$('body').append('<input id="drot_cust_hid" type="hidden"/>');
			}

			/**
			 * [고객번호] 영역
			 */
			var drotCustArea = $jq.find('[' + sFormObj_attrs.areaDrotCust + ']:first');
			if (drotCustArea.length > 0) {
				this.drawDrocCustAreaHtml(drotCustArea);
			}

			/**
			 * [원화출금계좌번호] 영역
			 */
			var drotAcnoArea = $jq.find('[' + sFormObj_attrs.areaDrotAcno + ']:first');
			if (drotAcnoArea.length > 0) {
				this.drawDrocAcnoAreaHtml(drotAcnoArea);
			}
			var drotAcnoArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotAcno + ']:first');
			if (drotAcnoArea2.length > 0) {
				this.drawDrocAcnoAreaHtml(drotAcnoArea2);
			}
			var drotAcnoArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotAcno + ']:first');
			if (drotAcnoArea3.length > 0) {
				this.drawDrocAcnoAreaHtml(drotAcnoArea3);
			}
			var drotAcnoArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaDrotAcno + ']:first');
			if (drotAcnoArea4.length > 0) {
				this.drawDrocAcnoAreaHtml(drotAcnoArea4);
			}

			/**
			 * [수수료계좌번호] 영역
			 */
			var drotFeeAcnoArea = $jq.find('[' + sFormObj_attrs.areaDrotFeeAcno + ']:first');
			if (drotFeeAcnoArea.length > 0) {
				this.drawDrocFeeAcnoAreaHtml(drotFeeAcnoArea);
			}
			var drotFeeAcnoArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotFeeAcno + ']:first');
			if (drotFeeAcnoArea2.length > 0) {
				this.drawDrocFeeAcnoAreaHtml(drotFeeAcnoArea2);
			}
			var drotFeeAcnoArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotFeeAcno + ']:first');
			if (drotFeeAcnoArea3.length > 0) {
				this.drawDrocFeeAcnoAreaHtml(drotFeeAcnoArea3);
			}
			var drotFeeAcnoArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaDrotFeeAcno + ']:first');
			if (drotFeeAcnoArea4.length > 0) {
				this.drawDrocFeeAcnoAreaHtml(drotFeeAcnoArea4);
			}
			
			/**
			 * [외화출금계좌번호] 영역
			 */
			var drotFacnoArea = $jq.find('[' + sFormObj_attrs.areaDrotFacno + ']:first');
			if (drotFacnoArea.length > 0) {
				this.drawDrocFacnoAreaHtml(drotFacnoArea);
			}
			var drotFacnoArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotFacno + ']:first');
			if (drotFacnoArea2.length > 0) {
				this.drawDrocFacnoAreaHtml(drotFacnoArea2);
			}
			var drotFacnoArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotFacno + ']:first');
			if (drotFacnoArea3.length > 0) {
				this.drawDrocFacnoAreaHtml(drotFacnoArea3);
			}
			var drotFacnoArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaDrotFacno + ']:first');
			if (drotFacnoArea4.length > 0) {
				this.drawDrocFacnoAreaHtml(drotFacnoArea4);
			}

			/**
			 * [외화출금계좌 잔액보기] 버튼/영역 정의
			 */
			/*var facnoBalcButton = $jq.find('['+ sFormObj_attrs.btnFacnoBalc + ']');
			if (facnoBalcButton.length > 0) {
				this.drawFacnoBalcButtonHtml(facnoBalcButton);
			}
			var facnoBalcButton = $jq.next().find('['+ sFormObj_attrs.btnFacnoBalc + ']');
			if (facnoBalcButton.length > 0) {
				this.drawFacnoBalcButtonHtml(facnoBalcButton);
			}*/

			/**
			 * [내계좌] 버튼
			 */
			var myAccNoButton = $jq.find('[' + sFormObj_attrs.btnMyAccNo + ']:first');
			if (myAccNoButton.length > 0) {
				this.drawMyAccNoButtonHtml(myAccNoButton);
			}


			/**
			 * [자주쓰는계좌] 버튼
			 */
			
			var favAcntButton = $jq.find('['+ sFormObj_attrs.btnFavAcnt + ']:first');
			if (favAcntButton.length > 0) {
				this.drawFavAcntButtonHtml(favAcntButton);
			}

			/**
			 * [환율조회] 버튼/영역 정의
			 */
			var exchangeRateButton = $jq.find('['+ sFormObj_attrs.btnExchangeRate + ']');
			if (exchangeRateButton.length > 0) {
				this.drawExcRateButtonHtml(exchangeRateButton);
			}
			var exchangeRateButton2 = $jq.next().find('['+ sFormObj_attrs.btnExchangeRate + ']');
			if (exchangeRateButton2.length > 0) {
				this.drawExcRateButtonHtml(exchangeRateButton2);
			}
			var exchangeRateButton3 = $jq.next().next().find('['+ sFormObj_attrs.btnExchangeRate + ']');
			if (exchangeRateButton3.length > 0) {
				this.drawExcRateButtonHtml(exchangeRateButton3);
			}
			/**
			 * [통화] 영역
			 */
			var drotCrcdArea = $jq.find('[' + sFormObj_attrs.areaDrotCrcd + ']:first');
			if (drotCrcdArea.length > 0) {
				this.drawDrocCrcdAreaHtml(drotCrcdArea);
			}

			var drotCrcdArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotCrcd + ']:first');
			if (drotCrcdArea2.length > 0) {
				this.drawDrocCrcdAreaHtml(drotCrcdArea2);
			}

			var drotCrcdArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotCrcd + ']:first');
			if (drotCrcdArea3.length > 0) {
				this.drawDrocCrcdAreaHtml(drotCrcdArea3);
			}
			/**
			 * [지급은행] 영역
			 */
			var drotBankCdArea = $jq.find('[' + sFormObj_attrs.areaDrotBankCd + ']:first');
			if (drotBankCdArea.length > 0) {
				this.drawDrocBankCdAreaHtml(drotBankCdArea);
			}
			
			/**
			 * [수취인 소재국] 영역
			 */
			var drotRmtnNtCdArea = $jq.find('[' + sFormObj_attrs.areaDrotRmtnNtCd + ']:first');
			if (drotRmtnNtCdArea.length > 0) {
				this.drawDrocRmtnNtCdAreaHtml(drotRmtnNtCdArea);
			}
			
			var drotRmtnNtCdArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotRmtnNtCd + ']:first');
			if (drotRmtnNtCdArea2.length > 0) {
				this.drawDrocRmtnNtCdAreaHtml(drotRmtnNtCdArea2);
			}
			
			/**
			 * [지급은행 소재국] 영역
			 * 
			 */ 
			var drotCntpNtCdArea = $jq.find('[' + sFormObj_attrs.areaDrotCntpNtCd + ']:first');
			if (drotCntpNtCdArea.length > 0) {
				this.drawDrocCntpNtCdAreaHtml(drotCntpNtCdArea);
			}
			
			var drotCntpNtCdArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotCntpNtCd + ']:first');
			if (drotCntpNtCdArea2.length > 0) {
				this.drawDrocCntpNtCdAreaHtml(drotCntpNtCdArea2);
			}
			var drotCntpNtCdArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotCntpNtCd + ']:first');
			if (drotCntpNtCdArea3.length > 0) {
				this.drawDrocCntpNtCdAreaHtml(drotCntpNtCdArea3);
			}
			var drotCntpNtCdArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaDrotCntpNtCd + ']:first');
			if (drotCntpNtCdArea4.length > 0) {
				this.drawDrocCntpNtCdAreaHtml(drotCntpNtCdArea4);
			}
			
			//외화송금조건변경 step이 많은 관계로 강제로 항목 그리는 로직 추가
			if ( drotCntpNtCdArea.length == 0 && drotCntpNtCdArea2.length == 0 && drotCntpNtCdArea3.length == 0 && drotCntpNtCdArea4.length == 0 )	{
				var drotCntpNtCdArea5 = $('[' + sFormObj_attrs.areaDrotCntpNtCd + ']:first');
				if (drotCntpNtCdArea5.length > 0) {
					this.drawDrocCntpNtCdAreaHtml(drotCntpNtCdArea5);
				}
			}
			
			/**
			 * [은행고유구분] 영역
			 */
			var drotBankUiqCdArea = $jq.find('[' + sFormObj_attrs.areaDrotBankUiqCd + ']:first');
			if (drotBankUiqCdArea.length > 0) {
				this.drawDrocBankUiqCdAreaHtml(drotBankUiqCdArea);
			}
			
			var drotBankUiqCdArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotBankUiqCd + ']:first');
			if (drotBankUiqCdArea2.length > 0) {
				this.drawDrocBankUiqCdAreaHtml(drotBankUiqCdArea2);
			}
			var drotBankUiqCdArea3 = $jq.next().next().find('[' + sFormObj_attrs.areaDrotBankUiqCd + ']:first');
			if (drotBankUiqCdArea3.length > 0) {
				this.drawDrocBankUiqCdAreaHtml(drotBankUiqCdArea3);
			}
			var drotBankUiqCdArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaDrotBankUiqCd + ']:first');
			if (drotBankUiqCdArea4.length > 0) {
				this.drawDrocBankUiqCdAreaHtml(drotBankUiqCdArea4);
			}
			// 외화송금조건변경 step이 많은 관계로 강제로 항목 그리는 로직 추가
			if ( drotBankUiqCdArea.length == 0 && drotBankUiqCdArea2.length == 0 && drotBankUiqCdArea3.length == 0 && drotBankUiqCdArea4.length == 0 )	{
				var drotBankUiqCdArea5 = $('[' + sFormObj_attrs.areaDrotBankUiqCd + ']:first');
				if (drotBankUiqCdArea5.length > 0) {
					this.drawDrocBankUiqCdAreaHtml(drotBankUiqCdArea5);
				}
			}
			
			/**
			 * [국가선택] 영역
			 */
			var drotCountryCdArea = $('[' + sFormObj_attrs.areaDrotCountryCd + ']:first');
			if (drotCountryCdArea.length > 0) {
				this.drawDrocCountryCdAreaHtml(drotCountryCdArea);
			}
			
			/**
			 * [선택정보] 출금계좌, 입금계좌 표시 2022-10-11 SR반영
			 */
			var optionArea = $jq.find('[' + sFormObj_attrs.areaOption + ']:first');
			if (optionArea.length > 0) {
				this.drawOptionAreaHtml(optionArea);
			}
		},

		/**
		 * 필요한 서비스 영역 append
		 */
		preapreSvcDiv : function() {
			var svcList = this.id;
			var svcListSplit = svcList.split(",");
			var facnoBalcPopupHtml =
			'<div class="bottom_popup_wrap" id="facnoBalcView"  style="display:none;">'
			+ '	<div class="bottom_popup">'
			+ '		<div class="bottom_popup_header">'
			+ '			<h2 class="tit">외화잔액조회</h2>'
			+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'facnoBalcView\');">닫기</button>'
			+ '		</div>'
			+ '		<div class="bottom_popup_body">'
			+ '			<div class="tbl ty2">'
			+ '				<table id="facnoBalcViewInfo" data-jx-table="facnoBalcViewInfo">'
			+ '					<caption>캡션 필수 입력</caption>' 
			+ '					<colgroup>'
			+ '						<col style="width: auto" />'
			+ '						<col style="width: 35%" />'
			+ '						<col style="width: 35%" />'
			+ '					</colgroup>'
			+ '					<thead>'
			+ '						<tr>'
			+ '							<th scope="col">구분</th>'
			+ '							<th scope="col">출금가능액</th>'
			+ '							<th scope="col">계좌잔액</th>'
			+ '						</tr>'
			+ '					</thead>'
			+ '					<tbody >'
			+ '						<tr>'
			+ '							<td id="CRCD"></td>'
			+ '							<td class="ta_r" id="PYMT_ABL_AMT_FORM"></td>'
			+ '							<td class="ta_r" id="BAL_FORM"></td>'
			+ '						</tr>'
			+ '					</tbody>'
			+ '				</table>'
			+ '			</div>'
			+ '		</div>'
			+ '		<div class="bottom_popup_footer">'
			+ '			<button type="button" class="btn s_5 c_3 r_2" onclick="comLayerPopUtil.close(\'facnoBalcView\');">확인</button>'
			+ '		</div>'
			+ '	</div>'
			+ '</div>';
			
			$('body').append(facnoBalcPopupHtml);
			jex.setJexObj($('#facnoBalcView'));
			
			for (var i=0; i<svcListSplit.length; i++) {
				if (svcListSplit[i] == "fnt_frx_010101_1") {
					// 출금가능금액 (초기 진입시) [fnt_frx_010101_1.html]
					var fnt_frx_010101_1 = '<div id="fnt_frx_010101_1" '
							+ 'data-jx-svc="fnt_frx_010101_1" '
							+ 'data-jx-svc-package="fnt_frx" '
							+ 'data-jx-svc-gubn="code_btn_frx0000" '
							+ 'data-jx-svc-target="#step1@_tran_res_data[0]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="frxform_fnt_frx_010101_1.uf_in()" '
							+ 'data-jx-svc-handler-out="frxform_fnt_frx_010101_1.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_010101_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_010101_1);
					//jex.setJexObj($("#fnt_frx_010101_1").attr("data-jx-svc-onload","true"));
				}
				else if (svcListSplit[i] == "fnt_frx_fee_list") {
					// 출금가능금액 (초기 진입시) [fnt_frx_010101_1.html]
					var fnt_frx_fee_list = '<div id="fnt_frx_fee_list" '
							+ 'data-jx-svc="fnt_frx_010101_1" '
							+ 'data-jx-svc-package="fnt_frx" '
							+ 'data-jx-svc-gubn="code_btn_frxfee" '
							+ 'data-jx-svc-target="#step1@_tran_res_data[0]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="frxform_fnt_frx_fee_list.uf_in()" '
							+ 'data-jx-svc-handler-out="frxform_fnt_frx_fee_list.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_fee_list.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_fee_list);
					//jex.setJexObj($("#fnt_frx_fee_list").attr("data-jx-svc-onload","true"));
				}
				else if (svcListSplit[i] == "fnt_frx_010101_8") {
					// SelectBox
					var fnt_frx_010101_8 = '<div id="frxform_fnt_frx_010101_8" '
							+ 'data-jx-svc="fnt_frx_010101_8" '
							+ 'data-jx-svc-package="fnt_frx" '
							+ 'data-jx-svc-gubn="code_btn_frx0002" '
							+ 'data-jx-svc-target="#step7@_tran_res_data[0]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="frxform_fnt_frx_010101_8.uf_in()" '
							+ 'data-jx-svc-handler-out="frxform_fnt_frx_010101_8.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_010101_8.uf_exec()" style="display:none"></div>';
					$('#body').append(fnt_frx_010101_8);
					
				}
				else if (svcListSplit[i] == "fnt_frx_020101_1") {
					// SelectBox
					var fnt_frx_020101_1 = '<div id="frxform_fnt_frx_020101_1" '
							+ 'data-jx-svc="fnt_frx_020101_1" '
							+ 'data-jx-svc-package="fnt_frx" '
							+ 'data-jx-svc-gubn="code_btn_frx0001" '
							+ 'data-jx-svc-target="#step8@_tran_res_data[0]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="frxform_fnt_frx_020101_1.uf_in()" '
							+ 'data-jx-svc-handler-out="frxform_fnt_frx_020101_1.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_020101_1.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_020101_1);
					//jex.setJexObj($("#frxform_fnt_frx_020101_1").attr("data-jx-svc-onload","true"));
				}
				else if (svcListSplit[i] == "fnt_frx_010101_3") {
					var fnt_frx_010101_3 = '<div id="frxform_fnt_frx_010101_3" '
						+ 'data-jx-svc="fnt_frx_010101_3" '
						+ 'data-jx-svc-package="fnt_frx" '
						+ 'data-jx-svc-target="#excRateViewInfo@_tran_res_data[0], #excRate@_tran_res_data[0]" '
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="frxform_fnt_frx_010101_3.uf_in()" '
						+ 'data-jx-svc-handler-out="frxform_fnt_frx_010101_3.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_010101_3.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_010101_3);
					jex.setJexObj($("#frxform_fnt_frx_010101_3").attr("data-jx-svc-onload","true"));
				}
				else if (svcListSplit[i] == "fnt_frx_010101_2") {
					var fnt_frx_010101_2 = '<div id="frxform_fnt_frx_010101_2" '
						+ 'data-jx-svc="fnt_frx_010101_2" '
						+ 'data-jx-svc-package="fnt_frx" '
						+ 'data-jx-svc-target="#facnoBalcViewInfo@_tran_res_data[0]"'
						+ 'data-jx-svc-errtrx="false" '
						+ 'data-jx-svc-handler-in="frxform_fnt_frx_010101_2.uf_in()" '
						+ 'data-jx-svc-handler-out="frxform_fnt_frx_010101_2.uf_out()" '
						+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_010101_2.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_010101_2);
					//jex.setJexObj($("#frxform_fnt_frx_010101_3").attr("data-jx-svc-onload","true"));
				}
				else if (svcListSplit[i] == "fnt_frx_150101_8") {
					// SelectBox
					var fnt_frx_150101_8 = '<div id="frxform_fnt_frx_150101_8" '
							+ 'data-jx-svc="fnt_frx_150101_4" '
							+ 'data-jx-svc-package="fnt_frx" '
							+ 'data-jx-svc-gubn="code_btn_frx0002" '
							+ 'data-jx-svc-target="#crcdListTbl@_tran_res_data[0], #rmtnNtCdListTbl@_tran_res_data[1], #cntpNtCdListTbl@_tran_res_data[2], #countryCdListTbl@_tran_res_data[3], #bankUiqCdListTbl@_tran_res_data[4], #bankCdListTbl@_tran_res_data[5]" '
							+ 'data-jx-svc-errtrx="false" '
							+ 'data-jx-svc-handler-in="frxform_fnt_frx_150101_8.uf_in()" '
							+ 'data-jx-svc-handler-out="frxform_fnt_frx_150101_8.uf_out()" '
							+ 'data-jx-svc-execute="FUNC@frxform_fnt_frx_150101_8.uf_exec()" style="display:none"></div>';
					$('body').append(fnt_frx_150101_8);
					
				}
			}
		},
		/**
		 * [고객번호 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#EBNK_ACN\').focusout()확인
		 *
		 */
		drawDrocCustAreaHtml : function($jq) {
			this.isSelectUI = $jq.attr(sFormObj_attrs.areaDrotCustSelect) ? eval($jq.attr(sFormObj_attrs.areaDrotCustSelect)) : false;
			window._frxForm.drotCustViewType = $jq.attr(sFormObj_attrs.areaDrotCust);
			var custListPopupHtml;
			if (true || this.isSelectUI) {
				custListPopupHtml =
					'<div class="bottom_popup_wrap" id="custListPopup" data-log-desc="고객번호 선택 리스트 팝업">'
					+ '	<div class="bottom_popup">'
					+ '		<div class="bottom_popup_header">'
					+ '			<h2 class="tit">고객번호</h2>'
					+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'custListPopup\');">닫기</button>'
					+ '		</div>'
					+ '		<div class="bottom_popup_body">'
					+ '			<ul class="select_list ty1" role="listbox" id="' + this.formIds.custListTbl + '" data-jx-list="' + this.formIds.custListTbl + '">'
					+ '				<li role="option" tabindex="-1" aria-selected="false"'
					+ '					data-jx-execute="click" '
					+ '					data-jx-setter="" '
					+ '					data-jx-setter-source="this" '
					+ '					data-jx-setter-handler="custListSetter()" '
					+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotCustInfoId + '" '
					+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'custListPopup\');" > '
					+ '					<a href="#none" role="button"> '
					+ '						<span class="" id="CSN" data-jx-formatter="account"></span>('
					+ '						<span class="" id="BRM"></span>)'
					+ '					</a>'
					+ '				</li>'
					+ '			</ul>'
					+ '		</div>'
					+ '</div>'
				+ '</div>';
			}
			$('#step').append(custListPopupHtml);
			jex.setJexObj($('#custListPopup'));

			var acntAreaHtml;
			if("fnt_frx_080101_1" == window._frxForm.drotCustViewType) {
				custAreaHtml =
					'<div id="' + this.formIds.drotCustInfoId + '" >'
					+ '<div class="input_label ty1 top">고객번호</div>'
						//id="ACNT_NM" 계좌명
							+ '<div class="dropdown ty2" role="button" title="고객번호 목록보기" id="CSN_NM_title">'
								+ '<div class="dropdown_text" id="CSN_NM">선택하세요</div>'
								+ '<input id="CSN" type="hidden"/>'
							+ '</div>'
							//+ '<div class="sub_info">'
					+ '</div>'
				+ '</div>';
			}

			custAreaHtml = $(custAreaHtml);

			$jq.on('click', function(evt) {
				var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
				if(evt.target.id == "CSN_NM" || evt.target.id == "CSN_NM_title"){
					if(_this.custNoList.length > 0){
						if (cur_step != 8001) {
							//uf_goStep(8001);
							comLayerPopUtil.open('custListPopup');
						}
					}else{
						MobPopup.showAlertPopup("등록된 고객번호가 없습니다.", "알림", function(){ $("#CSN_NM").focus() });
						return;
					}
				}
			});
			$jq.html(custAreaHtml);
			jex.setJexObj($jq);
		},

		/**
		 * [원화출금계좌번호 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#EBNK_ACN\').focusout() 확인
		 */
		drawDrocAcnoAreaHtml : function($jq) {
			this.isSelectUI = $jq.attr(sFormObj_attrs.areaDrotAcnoSelect) ? eval($jq.attr(sFormObj_attrs.areaDrotAcnoSelect)) : false;
			window._frxForm.drotAcnoViewType = $jq.attr(sFormObj_attrs.areaDrotAcno);
			var acnoListPopupHtml;
			if (true || this.isSelectUI) {
				acnoListPopupHtml =
				 '<div id="acnoListPopup" class="bottom_popup_wrap">'
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">계좌선택</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'acnoListPopup\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body">'
				+ '			<ul class="select_list ty3" role="listbox" id="' + this.formIds.acnoListTbl + '" data-jx-list="' + this.formIds.acnoListTbl + '">'
				+ '				<li class="account_list_item" role="option" tabindex="-1"'
				+ '					data-jx-execute="click" '
				+ '					data-jx-setter="" '
				+ '					data-jx-setter-source="this" '
				+ '					data-jx-setter-handler="acnoListSetter()" '
				+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotAcnoInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'acnoListPopup\');" > '
				+ '					<div class="item">'
				+ '						<div class="item_top">'
				+ '							<div class="item_top_text" id="ACNT_NM"></div>'
				+ '						</div>'
				+ '						<div class="item_bottom">'
				+ '							<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
				+ '						</div>'
				+ '					</div>'
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
			}
			
			
			$('#step').append(acnoListPopupHtml);
			jex.setJexObj($('#acnoListPopup'));

			var acnoAreaHtml;
			if("fnt_frx_wonAcnt_list" == window._frxForm.drotAcnoViewType) {
				acnoAreaHtml =
					  '<div id="' + this.formIds.drotAcnoInfoId + '" >'
					+ '	<div class="input_label ty2">계좌번호<span class="ess_text ty2">필수</span></div>'
					+ '	<div class="dropdown ty2" role="button" id="EBNK_ACN_VIEW_title" title="원화출금계좌 선택 목록 보기">'
					+ '		<div class="dropdown_text" id="EBNK_ACN_VIEW" data-jx-formatter="account">선택</div>'
					+ '		<input id="EBNK_ACN"  type="hidden">'
					+ '	</div>'
					+ '	<div class="form_desc_info">출금가능액'
					+ '		<span class="color ty3">'
					+ '			<span class="money" id="pvamt_for" data-jx-formatter="account"></span>'
					+ '			<span class="txt_unit" id="won">원</span>'
					+ '		</span>'
					+ '	</div>'
					+ '</div>';
			}

			acnoAreaHtml = $(acnoAreaHtml);

			$jq.on('click', function(evt) {
				if(evt.target.id == "EBNK_ACN_VIEW" || evt.target.id == "EBNK_ACN_VIEW_title"){
					if(_this.payAcntList.length > 0){
						if(!$("#acnoListPopup li").hasClass("active")){
							$("#acnoListPopup").find("li").eq(0).attr("aria-selected", "true").addClass("active"); //선택됨 표시
						}	
						comLayerPopUtil.open("acnoListPopup");
						//$("#acnoListPopup").show();
					}else{
						MobPopup.showAlertPopup("원화출금계좌가 없습니다.", "알림", function(){ $("#EBNK_ACN_VIEW").focus() });
						return;
					}
				}
			});
			$jq.html(acnoAreaHtml);
			jex.setJexObj($jq);
		},

		/**
		 * [수수료계좌번호 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#EBNK_ACN\').focusout() 확인
		 */
		drawDrocFeeAcnoAreaHtml : function($jq) {
			this.isSelectUI = $jq.attr(sFormObj_attrs.areaDrotFeeAcnoSelect) ? eval($jq.attr(sFormObj_attrs.areaDrotFeeAcnoSelect)) : false;
			window._frxForm.drotFeeAcnoViewType = $jq.attr(sFormObj_attrs.areaDrotFeeAcno);
			var feeAcnoListPopupHtml;
			if (true || this.isSelectUI) {
				feeAcnoListPopupHtml =
				 '<div id="feeAcnoListPopup" class="bottom_popup_wrap">'
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">계좌선택</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'feeAcnoListPopup\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body">'
				+ '			<ul class="select_list ty3" id="' + this.formIds.feeAcnoListTbl + '" data-jx-list="' + this.formIds.feeAcnoListTbl + '">'
				+ '				<li class="account_list_item" role="option" tabindex="-1" aria-selected="false"'
				+ '					data-jx-execute="click" '
				+ '					data-jx-setter="" '
				+ '					data-jx-setter-source="this" '
				+ '					data-jx-setter-handler="feeAcnoListSetter()" '
				+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotFeeAcnoInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'feeAcnoListPopup\');" > '
				+ '					<div class="item">'
				+ '						<div class="item_top">'
				+ '							<div class="item_top_text" id="ACNT_NM"></div>'
				+ '						</div>'
				+ '						<div class="item_bottom">'
				+ '							<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
				+ '						</div>'
				+ '					</div>'
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
				
			}
			$('#step').append(feeAcnoListPopupHtml);
			jex.setJexObj($('#feeAcnoListPopup'));

			var feeAcnoAreaHtml;
			if("fnt_frx_feeAcnt_list" == window._frxForm.drotFeeAcnoViewType) {
				feeAcnoAreaHtml =
					'<div id="' + this.formIds.drotFeeAcnoInfoId + '" >'
					+ '	<div class="input_label ty2" id="">수수료결제계좌<span class="ess_text ty2" id="feeAccnoNM2">필수</span></div>'
					+ '	<div class="dropdown ty2" role="button" id="FEE_EBNK_ACN_VIEW_title" title="수수료결제계좌 목록 보기">'
					+ '		<a href="#acnoListPopup" class="" role="button"><div class="dropdown_text" id="FEE_EBNK_ACN_VIEW" data-jx-formatter="account">선택</div></a>'
					+ '		<input id="FEE_EBNK_ACN"  type="hidden">'
					+ '	</div>'
					+ '	<div class="form_desc_info">출금가능액'
					+ '		<span class="color ty3">'
					+ '			<span class="money" id="fee_pvamt_for" data-jx-formatter="account"></span>'
					+ '			<span class="txt_unit" id="won">원</span>'
					+ '		</span>'
					+ '	</div>'
					+ '</div>';
			}

			feeAcnoAreaHtml = $(feeAcnoAreaHtml);

			$jq.on('click', function(evt) {
				if(evt.target.id == "FEE_EBNK_ACN_VIEW" || evt.target.id == "FEE_EBNK_ACN_VIEW_title"){
					if(_this.payAcntList.length > 0){
						if(!$("#feeAcnoListPopup li").hasClass("active")){
							$("#feeAcnoListPopup").find("li").eq(0).attr("aria-selected", "true").addClass("active"); //선택됨 표시
						}	
						comLayerPopUtil.open('feeAcnoListPopup');
					}else{
						MobPopup.showAlertPopup("수수료결제계좌가 없습니다.", "알림", function(){ $("#FEE_EBNK_ACN_VIEW").focus() });
						return;
					}
				}
			});
			$jq.html(feeAcnoAreaHtml);
			jex.setJexObj($jq);
		},

		/**
		 * [외화출금계좌번호 & 선택 리스트] 팝업
		 * ,FUNC@$(\'#EBNK_ACN\').focusout() 확인
		 */
		drawDrocFacnoAreaHtml : function($jq) {
			this.isSelectUI = $jq.attr(sFormObj_attrs.areaDrotFacnoSelect) ? eval($jq.attr(sFormObj_attrs.areaDrotFacnoSelect)) : false;
			window._frxForm.drotFacnoViewType = $jq.attr(sFormObj_attrs.areaDrotFacno);
			var facnoListPopupHtml;
			if (true || this.isSelectUI) {
				facnoListPopupHtml =
					 '<div class="bottom_popup_wrap" id="facnoListPopup">'
					+ '	<div class="bottom_popup">'
					+ '		<div class="bottom_popup_header">'
					+ '			<h2 class="tit">계좌선택</h2>'
					+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'facnoListPopup\');">닫기</button>'
					+ '		</div>'
					+ '		<div class="bottom_popup_body">'
					+ '			<ul class="select_list ty3" role="listbox" id="' + this.formIds.facnoListTbl + '" data-jx-list="' + this.formIds.facnoListTbl + '">'
					+ '				<li class="account_list_item" role="option" tabindex="-1" aria-selected="false"'
					+ '					data-jx-execute="click" '
					+ '					data-jx-setter="" '
					+ '					data-jx-setter-source="this" '
					+ '					data-jx-setter-handler="facnoListSetter()" '
					+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotFacnoInfoId + '" '
					+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'facnoListPopup\');" > '
					+ '					<div class="item">'
					+ '						<div class="item_top">'
					+ '							<div class="item_top_text" id="ACNT_NM"></div>'
					+ '						</div>'
					+ '						<div class="item_bottom">'
					+ '							<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
					+ '						</div>'
					+ '					</div>'
					+ '				</li>'
					+ '			</ul>'
					+ '		</div>'
					+ '	</div>'
					+ '</div>';
			}
			$('#step').append(facnoListPopupHtml);
			jex.setJexObj($('#facnoListPopup'));

			var facnoAreaHtml;
			if("fnt_frx_fxAnct_list" == window._frxForm.drotFacnoViewType) {
				facnoAreaHtml =
					'<div id="' + this.formIds.drotFacnoInfoId + '" >'
					+ '<div class="input_label ty2">계좌번호<span class="ess_text ty2">필수</span></div>'
					+ '<div class="with_option">'
						+ '	<div class="btn_area ty1">'
						+ '		<button class="btn s_2 c_1 r_3" id="trnLimit" data-jx-execute="click" data-jx-execute-target="FUNC@uf_trnLimitSearch()" style="display:none;">이체한도조회</button>'
						+ '		<button class="btn s_2 c_1 r_3" onclick="uf_goFxBalc()">외화잔액조회</button>'
						+ '	</div>'
						+ '	<div class="cont">'
						+ '		<div class="dropdown ty2" role="button" title="원화출금계좌 선택 목록 보기" id="FEBNK_ACN_VIEW_title">'
						+ '			<div class="dropdown_text" id="FEBNK_ACN_VIEW">선택</div>'
						+ '			<input id="FEBNK_ACN"  type="hidden">'
						+ '		</div>'
						+ '	</div>'
					+ '</div>'
				+ '</div>';
			}

			facnoAreaHtml = $(facnoAreaHtml);

			$jq.on('click', function(evt) {
				if(evt.target.id == "FEBNK_ACN_VIEW" || evt.target.id == "FEBNK_ACN_VIEW_title"){
					if(_this.frxpayAcntList.length > 0){
						if(!$("#facnoListPopup li").hasClass("active")){
							$("#facnoListPopup").find("li").eq(0).attr("aria-selected", "true").addClass("active"); //선택됨 표시
						}	
						comLayerPopUtil.open("facnoListPopup");
					}else{
						MobPopup.showAlertPopup("외화출금계좌가 없습니다.", "알림", function(){ $("#FEBNK_ACN_VIEW").focus() });
						return;
					}
				}

			});
			$jq.html(facnoAreaHtml);
			jex.setJexObj($jq);
		},
		/**
		 * 외화잔액보기
		 */
		/*drawFacnoBalcButtonHtml : function($jq) {
			$jq.attr('data-jx-execute', 'click')
				.attr('data-jx-svc','fnt_frx_010101_2')
				.attr('data-jx-svc-gubn','code_btn_frx0001')
				.attr('data-jx-svc-package', 'fnt_frx')
				.attr('data-jx-svc-errtrx', 'false')
				.attr('data-jx-svc-target','#facnoBalcViewInfo@_tran_res_data[0]')
				.attr('data-jx-svc-handler-in', 'frxform_fnt_frx_010101_2.uf_in()')
				.attr('data-jx-svc-handler-out','frxform_fnt_frx_010101_2.uf_out()')
				.attr('data-jx-svc-execute','FUNC@frxform_fnt_frx_010101_2.uf_exec()');
			jex.setJexObj($jq);
		},*/

		/**
		 * 환율보기
		 */
		drawExcRateButtonHtml : function($jq) {

			var excRateButtonHtml =
				 '<div id="excRateListPopup"  data-jx-step-no="4001" data-jx-effect="slide" style="display:none;">'
				+ '	<div class="content_wrap ty3 foreign_currency_trans">'
				+ '		<div class="group">'
				+ '			<div class="title_text ty1">일반고시환율 정보</div>'
				+ '			<div class="bg_box ty1">'
				+ '				<ul class="list_bullet ty1">'
				+ '					<li>조회 일시: <span id="inqTime"></span></li>'
				+ '				</ul>'
				+ '			</div>'
				+ '			<ul class="space_list_ty5" id="excRateViewInfo" data-jx-list="excRateViewInfo">'
				+ '				<li>'
				+ '					<div class="group_item">'
				+ '						<div class="group_item_info">'
				+ '							<div class="txt3">'
				+ '								<strong id="BASE_CRCD"></strong>'
				+ '								<span id="BASE_CRCD_NM"></span>'
				+ '							</div>'
				+ '						</div>'
				+ '						<div class="group_item_detail">'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">매매기준율</span>'
				+ '							</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="BRGN_BASE_RT1"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">송금받을 때</span>'
				+ '								</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="TLCB_RT"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">송금보낼 때</span>'
				+ '								</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="TLCH_SELL_RT"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">현찰팔 때</span>'
				+ '								</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="CSH_BNG_RT"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">현찰살 때</span>'
				+ '								</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="CSH_SELL_RT"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '							<p class="line" role="text">'
				+ '								<span class="line_left">'
				+ '									<span class="tit">대미환산율</span>'
				+ '								</span>'
				+ '								<span class="line_right">'
				+ '									<span class="money" id="TSCN_RT"></span>'
				+ '								</span>'
				+ '							</p>'
				+ '						</div>'
				+ '					</div>'
				+ '				</li>'
				+ '				<li id="EMPTY">'
				+ '					<div class="no_result_msg">'
				+ '						<div class="msg">검색 결과가 없습니다.</div>'
				+ '					</div>'
				+ '				</li>'				
				+ '			</ul>'
				+ '			<ul class="" id="excRate"data-jx-list="excRate" style="display:none;">'
				+ '			</ul>'
				+ '		</div>'
				+ '		<hr aria-hidden="true" class="divider ty1" />'
				+ '		<div class="group">'
				+ '			<ul class="list_bullet ty1">'
				+ '				<li>환율은 영업점 거래보다 30% 우대 적용됩니다.</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '		<div class="bottom_btn_area">'
				+ '			<div class="btn_area ty1">'
				+ '				<button type="button" class="btn s_5 c_3 r_2" onclick="fn_goPage();"">확인</button>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';

			excRateButtonHtml = $(excRateButtonHtml);
			$('#step').append(excRateButtonHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#excRateListPopup'));
			$jq.on('click', function(evt) {
				//window._frxForm.showExcRateListPopup();
				uf_goStep(4001);
			});


		},

		/**
		 * [환율] 리스트 팝업 노출
		 */
		showExcRateListPopup : function() {
			$("#excRateListPopup").show();
			uf_goStep(4001);
		},

		/**
		 * [내계좌]
		 */
		drawMyAccNoButtonHtml : function($jq) {

			var myAccNoViewHtml =
				'<div class="bottom_popup_wrap" id="myAccNoView" data-log-desc="내계좌 선택 팝업">'
				+ '		<div class="bottom_popup">'
				+ '			<div class="bottom_popup_header">'
				+ '				<h2 class="tit">내계좌 선택</h2>'
				+ '				<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'myAccNoView\');">닫기</button>'
				+ '			</div>'
				+ '			<div class="bottom_popup_body">'
				+ '				<ul class="select_list ty3" role="listbox" data-jx-list="' + this.formIds.myAccNoListTbl + '" id="' + this.formIds.myAccNoListTbl + '">'
				+ '					<li class="account_list_item" role="option" tabindex="-1"'
				+ '						data-jx-execute="click" '
				+ '						data-jx-setter="" '
				+ '						data-jx-setter-source="this" '
				+ '						data-jx-setter-handler="myAccNoListSetter()" '
				+ '						data-jx-setter-target="#' + window._frxForm.formIds.drotMyAccNoInfoId + '" '
				+ '						data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'myAccNoView\');">'
				+ '						<div class="item">'
				+ '							<div class="item_top">'
				+ '								<div class="item_top_text" id="ACNT_NM"></div>'
				+ '							</div>'
				+ '							<div class="item_bottom">'
				+ '								<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
				+ '							</div>'
				+ '						</div>'
								
				+ '					</li>'
				+ '				</ul>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';

			myAccNoViewHtml = $(myAccNoViewHtml);
			$('#step').append(myAccNoViewHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#myAccNoView'));
			$jq.on('click', function(evt) {
				//window._frxForm.showMyAccNoListPopup();
				if(_this.myAccNoList.length > 0){
					//window._frxForm.showMyAccNoListPopup();
					comLayerPopUtil.open('myAccNoView');

				}else{
					MobPopup.showAlertPopup("보유하신 외화계좌가 없습니다.", "알림", function(){ $("#drw_acno").focus() });
					return;
				}
			});


		},
		/**
		 * [내계좌] 리스트 팝업 노출
		 */
		showMyAccNoListPopup : function() {
			var list = _this.myAccNoList;
			var dat = {};

			if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {

				dat[window._frxForm.formIds.myAccNoListTbl] = list;

				$("#myAcntView").find("#menu_01").show();
				$("#myAcntView").find("#menu_02").hide();
			} else {
				$("#myAcntView").find("#menu_01").hide();
				$("#myAcntView").find("#menu_02").show();
			}
			uf_goStep(4005);
		},

		/**
		 * [자주쓰는계좌]
		 */
		drawFavAcntButtonHtml : function($jq) {
			$jq.attr('data-jx-execute', 'click')
				.attr('data-jx-svc','fnt_trn_090101_1')
				.attr('data-jx-svc-package', 'fnt_trn')
				.attr('data-jx-svc-target', '@_tran_res_data[0]')
				.attr('data-jx-svc-handler-out', 'fnt_favAcntView.uf_out()')
				.attr('data-jx-svc-execute', 'FUNC@fnt_favAcntView.uf_exec()');

			//getFavAcntRowHtml2()
			var favAcntViewHtml =
				'<div id="favAcntView" class="bottom_popup_wrap" data-log-desc="자주쓰는입금계좌 선택 팝업" style="display:;">'
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">자주쓰는입금계좌 선택</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'favAcntView\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body" id="favAcntView_html">'
				+ '		</div>'
				+ '		<div class="bottom_popup_body" id="favAcntView_html_2">'
				+ '			<p>자주쓰는 계좌가 없습니다.</p>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';

			favAcntViewHtml = $(favAcntViewHtml);
			$('#step').append(favAcntViewHtml);
			
			jex.setJexObj($jq);
			jex.setJexObj($('#favAcntView'));
		},
		/**
		 * [통화]Select
		 */
		drawDrocCrcdAreaHtml : function($jq) {
			window._frxForm.drotCrcdViewType = $jq.attr(sFormObj_attrs.areaDrotCrcd);
			var crcdListPopupHtml;
			crcdListPopupHtml =
				'<div id="crcdListPopup" class="bottom_popup_wrap" style="display:none;">'
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">통화 선택</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'crcdListPopup\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body">'
				+ '			<ul class="select_list ty4 currency_list" role="listbox" id="' + this.formIds.crcdListTbl + '" data-jx-list="' + this.formIds.crcdListTbl + '">'
				+ '				<li role="option" tabindex="-1" class="item"'
				+ '					data-jx-execute="click"'
				+ '					data-jx-setter=""'
				+ '					data-jx-setter-source="this"'
				+ '					data-jx-setter-handler="crcdListNewSetter()"'
				+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotCrcdInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'crcdListPopup\');" >'
				+ '					<div class="ico_box ty1 flag_usd"></div>'
				+ '					<strong class="eng" id="VALUE">USD</strong>'
				+ '					<span class="kor" id="NAME">(미국 달러)</span>'
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
			
			$('#step').append(crcdListPopupHtml);
			jex.setJexObj($('#crcdListPopup'));

			var crcdAreaHtml;
			if("fnt_frx_010101_8" == window._frxForm.drotCrcdViewType) {
				crcdAreaHtml =
					'<div id="' + this.formIds.drotCrcdInfoId + '" >'
					+ '<div class="input_label ty2">통화<span class="ess_text ty2">필수</span></div>'
					+ '<div class="with_option">'
					+ '	<div class="cont">'
					+ '		<div class="dropdown ty2" role="button" title="통화 목록보기" id="CRCDNAME_title">'
					+ '			<div class="dropdown_text">'
					+ '				<a href="#crcdListPopup" class="" role="button"><div class="currency_item"  id="CRCDNAME">선택하세요</div></a>'
					+ '				<input id="CRCDVALUE"  type="hidden">'
					+ '				<input id="selCRCD"  type="hidden">'
					+ '			</div>'
					+ '		</div>'
					+ '	</div>'
					+ '</div>'
				+ '</div>'
			}
			crcdAreaHtml = $(crcdAreaHtml);
			$jq.on('click', function(evt) {

				//if(evt.target.id == "CRCDNAME" || evt.target.id == "CRCDNAME_title"){
				//	var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
				//	if (cur_step != 4007) {
						uf_goStep(4007);
				//	}
				//}
			});
			$jq.html(crcdAreaHtml);
			jex.setJexObj($jq);
		},

		/**
		 * [지급은행]Select
		 */
		drawDrocBankCdAreaHtml : function($jq) {
			window._frxForm.drotBankCdViewType = $jq.attr(sFormObj_attrs.areaDrotBankCd);
			var bankCdListPopupHtml;
			bankCdListPopupHtml =
				'<div class="fullpop" id="bankCdListPopup"  data-jx-step-no="4009" data-jx-effect="slide" style="display:none;">'
				+ '<h2 class="bd_t">은행선택</h2>'
					//+ '<ul class="list_ty02" id="' + this.formIds.frusListTbl + '" data-jx-list="' + this.formIds.frusListTbl + '">'
					+ '<ul class="list_ty02" id="' + this.formIds.bankCdListTbl + '" data-jx-list="' + this.formIds.bankCdListTbl + '">'
					+ '<li '
					+ 'data-jx-execute="click" '
					+ 'data-jx-setter="" '
					+ 'data-jx-setter-source="this" '
					+ 'data-jx-setter-handler="bankCdListSetter()" '
					+ 'data-jx-setter-target="#' + window._frxForm.formIds.drotBankCdInfoId + '" '
					+ 'data-jx-setter-execute="FUNC@uf_back()" > '
						+ '<a href="#none" role="button"> '
							+ '<span id="NAME"></span> '
						+ '</a>'
					+ '</li>'
				+ '</ul>'
			+ '</div>';
			$('#step').append(bankCdListPopupHtml);
			jex.setJexObj($('#bankCdListPopup'));

			var bankCdAreaHtml;
			if("fnt_frx_020101_1" == window._frxForm.drotBankCdViewType) {
				bankCdAreaHtml =
					'<div id="' + this.formIds.drotBankCdInfoId + '" >'
					+ '<div class="dt">지급은행</div>'
						+ '<div class="dd" id="bankList" tabindex="100">'
							+ '<div class="dropdown" role="button" title="지급은행 선택" id="BANKNAME_title">'
								+ '<a href="#bankCdListPopup" class="" role="button"><span class="txt_placeholder" id="BANKNAME" >선택하세요</span></a>'
								+ '<input id="BANKVALUE"  type="hidden">'
							+ '</div>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
			}
			bankCdAreaHtml = $(bankCdAreaHtml);
			$jq.on('click', function(evt) {
				if(evt.target.id == "BANKNAME" || evt.target.id == "BANKNAME_title") {
					var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
					if (cur_step != 4009) {
						uf_goStep(4009);
					}
				}
			});
			$jq.html(bankCdAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [수취인 소재국]Select
		 */
		drawDrocRmtnNtCdAreaHtml : function($jq) {
			window._frxForm.drotRmtnNtCdViewType = $jq.attr(sFormObj_attrs.areaDrotRmtnNtCd);
			var rmtnNtCdPopupHtml;
			rmtnNtCdPopupHtml =
				'<div class="bottom_popup_wrap" id="rmtnNtCdListPopup"  data-jx-effect="slide" style="display:none;">'
				+'	<div class="bottom_popup">'
				+'		<div class="bottom_popup_header">'
				+'			<h2 class="tit">소재국 선택</h2>'
				+'			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'rmtnNtCdListPopup\');">닫기</button>'
				+'		</div>'
				+'		<div class="bottom_popup_body">'
				+'			<ul class="select_list ty1" role="listbox" id="' + this.formIds.rmtnNtCdListTbl + '" data-jx-list="' + this.formIds.rmtnNtCdListTbl + '">'
				+'				<li role="option" class="" aria-selected=""'
				+'					data-jx-execute="click" '
				+'					data-jx-setter="" '
				+'					data-jx-setter-source="this" '
				+'					data-jx-setter-handler="rmtnNtCdListSetter()" '
				+'					data-jx-setter-target="#' + window._frxForm.formIds.drotRmtnNtCdInfoId + '" '
				+'					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'rmtnNtCdListPopup\');" > '
				+'					<span class="txt_accout" id="VALUE"></span> '
				+'					<span class="txt_accout_tit" id="NAME"></span> '
				+'				</li>'
				+'			</ul>'
				+'		</div>'
				+'	</div>'
				+'</div>';
			$('#step').append(rmtnNtCdPopupHtml);
			jex.setJexObj($('#rmtnNtCdListPopup'));
			
			
			var rmtnNtCdAreaHtml;
			if("fnt_frx_150101_8_2" == window._frxForm.drotRmtnNtCdViewType) {
				rmtnNtCdAreaHtml =
					  '<div id="' + this.formIds.drotRmtnNtCdInfoId + '">'
					+ '	<div class="input_label ty2">수취인 소재국 <span class="ess_text ty2">&#91;필수&#93;</span></div>'
					+ '	<div class="dropdown ty2">'
					+ '		<div class="dropdown" role="button" title="수취인 소재국 선택" id="RMTNNTCDNAME_title">'
					+ '			<div class="dropdown_text" id="RMTNNTCDNAME" >선택해주세요</div>'
					+ '			<input id="RMTNNTCDVALUE"  type="hidden" value="">'
					+ '			<input id="selRMTNNTCDNAME"  type="hidden" value="">'
					+ '		</div>'
					+ '	</div>'
					+ '</div>';
			}
			rmtnNtCdAreaHtml = $(rmtnNtCdAreaHtml);
			$jq.on('click', function(evt) {
				//if(evt.target.id == "RMTNNTCDNAME" || evt.target.id == "RMTNNTCDNAME_title"){
					//var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
					//if (cur_step != 4011) {
						//uf_goStep(4011);
						comLayerPopUtil.open("rmtnNtCdListPopup");
						$("#rmtnNtCdListPopup").show();
					//}
				//}
			});
			$jq.html(rmtnNtCdAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [지급은행 소재국]Select
		 */
		drawDrocCntpNtCdAreaHtml : function($jq) {
			window._frxForm.drotCntnNtCdViewType = $jq.attr(sFormObj_attrs.areaDrotCntpNtCd);
			var cntpNtCdPopupHtml;
			cntpNtCdPopupHtml =
				'<div id="cntpNtCdListPopup"  data-jx-step-no="4012" data-jx-effect="slide" style="display:none;">'
				+ '	<div class="content_wrap ty3">'
				+ '		<div class="group">'
				+ '			<ul class="select_list ty4 country_list" id="' + this.formIds.cntpNtCdListTbl + '" data-jx-list="' + this.formIds.cntpNtCdListTbl + '">'
				+ '				<li role="option" tabindex="-1" class="item" '
				+ '					data-jx-execute="click" '
				+ '					data-jx-setter="" '
				+ '					data-jx-setter-source="this" '
				+ '					data-jx-setter-handler="cntpNtCdListSetter()" '
				+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotCntpNtCdInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@uf_back()" > '
				+ '						<strong class="eng" id="VALUE"></strong>'
				+ '						<span class="kor" id="NAME"></span>'
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
			$('#step').append(cntpNtCdPopupHtml);
			jex.setJexObj($('#cntpNtCdListPopup'));

			var cntpNtCdAreaHtml;
			if("fnt_frx_150101_8_3" == window._frxForm.drotCntnNtCdViewType) {
				cntpNtCdAreaHtml =
					'<div id="' + this.formIds.drotCntpNtCdInfoId + '" >'
				+'		<div class="input_label ty2">지급은행 소재국 <span class="ess_text ty2">&#91;필수&#93;</span></div>'
				+'		<div class="dropdown ty2" role="button" title="소재국 선택 목록 보기" id="CNTPNTCDNAME_title">'
				+'			<div class="dropdown_text">'
				+'				<div class="currency_item">'
				+'					<div class="item">'
				+'						<div class="item_top">'
				+'							<div class="item_top_text" id="CNTPNTCDNAME">소재국 선택</div>'
				+'						</div>'
				+'					</div>'
				+'				<input id="CNTPNTCDVALUE"  type="hidden">'
				+'				<input id="selCNTPNTCDNAME"  type="hidden">'
				+'				</div>'
				+'			</div>'
				+'		</div>'
				+'	</div>';
			}
			cntpNtCdAreaHtml = $(cntpNtCdAreaHtml);
			$jq.on('click', function(evt) {

				if(evt.target.id == "CNTPNTCDNAME" || evt.target.id == "CNTPNTCDNAME_title"){
					var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
					if (cur_step != 4012) {
						uf_goStep(4012);
						//comLayerPopUtil.open('cntpNtCdListPopup');
					}
				}
			});
			$jq.html(cntpNtCdAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [은행고유구분]Select
		 */
		drawDrocBankUiqCdAreaHtml : function($jq) {
			window._frxForm.drotBankUiqCdViewType = $jq.attr(sFormObj_attrs.areaDrotBankUiqCd);
			var bankUiqCdPopupHtml;
			bankUiqCdPopupHtml =
				'<div class="bottom_popup_wrap" id="bankUiqCdListPopup" title="은행고유구분 선택" style="display:none;">'
				+ '	<div class="bottom_popup">'
				+ '		<div class="bottom_popup_header">'
				+ '			<h2 class="tit">은행고유구분</h2>'
				+ '			<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'bankUiqCdListPopup\');">닫기</button>'
				+ '		</div>'
				+ '		<div class="bottom_popup_body">'
				+ '			<ul class="select_list ty1" role="listbox" id="' + this.formIds.bankUiqCdListTbl + '" data-jx-list="' + this.formIds.bankUiqCdListTbl + '">'
				+ '				<li role="option" '
				+ '					data-jx-execute="click" '
				+ '					data-jx-setter="" '
				+ '					data-jx-setter-source="this" '
				+ '					data-jx-setter-handler="bankUiqCdListSetter()" '
				+ '					data-jx-setter-target="#' + window._frxForm.formIds.drotBankUiqCdInfoId + '" '
				+ '					data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'bankUiqCdListPopup\');" > '
				+ '					<span class="txt" id="VALUE" style="display:none;"></span> '
				+ '					<span class="txt" id="NAME"></span> '
				+ '				</li>'
				+ '			</ul>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>';
			$('#step').append(bankUiqCdPopupHtml);
			jex.setJexObj($('#bankUiqCdListPopup'));

			var bankUiqCdAreaHtml;
			if("fnt_frx_150101_8_4" == window._frxForm.drotBankUiqCdViewType) {
				bankUiqCdAreaHtml =
					'<div id="' + this.formIds.drotBankUiqCdInfoId + '" >'
					//+ '<div class="dt"><label for="dpm2_01">지급은행 소재국</label> <span class="point">&#91;필수&#93;</span></div>'
					// 2022-09-02 감리테스트 결함으로 인뱅과 동일하게 선택해주세요에서 선택안함으로 변경
					+ '<div class="input_label ty2">은행고유구분/지급은행 코드</div>'
							+ '<div class="dropdown ty2" role="button" title="은행고유구분 선택 목록 보기" id="BANKUIQCDNAME_title">'
								+ '<div class="dropdown_text" id="BANKUIQCDNAME" >은행고유구분 선택</div>'
								+ '<input id="BANKUIQCDVALUE"  type="hidden">'
								+ '<input id="selBANKUIQCDNAME"  type="hidden">'
							+ '</div>'
					+ '</div>'
				+ '</div>';
			}
			bankUiqCdAreaHtml = $(bankUiqCdAreaHtml);
			$jq.on('click', function(evt) {

				if(evt.target.id == "BANKUIQCDNAME" || evt.target.id == "BANKUIQCDNAME_title"){
					var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
					if (cur_step != 4013) {
						//uf_goStep(4013);
						comLayerPopUtil.open("bankUiqCdListPopup");
						$("#bankUiqCdListPopup").show();
					}
				}
			});
			$jq.html(bankUiqCdAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [국가선택]Select
		 */
		drawDrocCountryCdAreaHtml : function($jq) {
			window._frxForm.drotCountryCdViewType = $jq.attr(sFormObj_attrs.areaDrotCountryCd);
			var countryCdPopupHtml;
			countryCdPopupHtml =
				'<div class="bottom_popup_wrap" id="countryCdListPopup" title="국가선택" style="display:none;">'
			
				+ '<div class="bottom_popup">'
				+ '	<div class="bottom_popup_header">'
				+ '		<h2 class="tit">국가 선택</h2>'
				+ '		<button type="button" class="btn_close"  onclick="comLayerPopUtil.close(\'countryCdListPopup\');">닫기</button>'
				+ '	</div>'
				+ '	<div class="bottom_popup_body">'
				+ '		<ul class="select_list ty1" role="listbox" id="' + this.formIds.countryCdListTbl + '" data-jx-list="' + this.formIds.countryCdListTbl + '">'
				+ '			<li role="option"'
				+ '				data-jx-execute="click" '
				+ '				data-jx-setter="" '
				+ '				data-jx-setter-source="this" '
				+ '				data-jx-setter-handler="countryCdListSetter()" '
				+ '				data-jx-setter-target="#' + window._frxForm.formIds.drotCountryCdInfoId + '" '
				+ '				data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'countryCdListPopup\');" > '
				+ '				<span class="txt_accout" id="VALUE"></span> '
				+ '				<span class="txt_accout_tit" id="NAME"></span> '
				+ '			</li>'
				+ ' 	</ul>'
				+ ' </div>'
				+ '</div>'
			
				+ '</div>';
			$('#step').append(countryCdPopupHtml);
			jex.setJexObj($('#countryCdListPopup'));

			var countryCdAreaHtml;
			if("fnt_frx_150101_8_5" == window._frxForm.drotCountryCdViewType) {
				countryCdAreaHtml =
					'<div id="' + this.formIds.drotCountryCdInfoId + '" >'
					+ '<div class="title_text ty2">국가선택</div>'
						+ '<div class="dropdown ty2" role="button" title="국가 선택 목록 보기" id="COUNTRYCDNAME_title">'
							+ '<div class="dropdown_text" id="COUNTRYCDNAME" >선택해주세요</div>'
							+ '<input id="COUNTRYCDVALUE"  type="hidden">'
							+ '<input id="selCOUNTRYCDNAME"  type="hidden">'
						+ '</div>'
					+ '</div>'
				+ '</div>';
			}
			countryCdAreaHtml = $(countryCdAreaHtml);
			$jq.on('click', function(evt) {

				//if(evt.target.id == "COUNTRYCDNAME" || evt.target.id == "COUNTRYCDNAME_title"){
					//var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
					//if (cur_step != 4014) {
					//	uf_goStep(4014);
						comLayerPopUtil.open("countryCdListPopup");
						$("#countryCdListPopup").show();
					//}
				//}
			});
			$jq.html(countryCdAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [선택정보] 출금,임금통장표시 2022-10-11 SR반영
		 */
		drawOptionAreaHtml : function($jq) {
			window._frxForm.optinViewType = $jq.attr(sFormObj_attrs.areaOption);
			var optionAreaHtml = '<legend>선택정보 입력</legend>'
				+ '<div id="frx_option_area" class="group">'
					+ '<a href="#none" class="txt_toggle" role="button"><span>선택정보</span></a>'
					+ '<ul class="list_form01 toggle_info">'
						+ '<li id="frx_opt_area_1" style="display:none;">'
							+ '<div class="dt"><label for="drot_smr_cntn">내통장표시<span id="trn_opt_area_txt_2" style="display:none;">(예금주명)</span></label></div>'
							+ '<div class="dd placeholder_wrap">'
								+ '<input type="text" id="drot_smr_cntn" placeholder="최대 7자리" title="내통장표시" data-jx-chk="true" data-jx-chk-opt=\'{"name":"내통장표시","nullable":false,"maxLength":7,"charType":"korEngNumSpec"}\' >'
							+ '</div>'
						+ '</li>'
						+ '<li id="frx_opt_area_2" style="display:none;">'
							+ '<div class="dt"><label for="mnrc_smr_cntn">받는통장표시</label></div>'
							+ '<div class="dd placeholder_wrap">'
								+ '<input type="text" id="mnrc_smr_cntn" placeholder="최대 8자리" title="받는통장표시" data-jx-chk="true" data-jx-chk-opt=\'{"name":"받는통장표시","nullable":false,"maxLength":8,"charType":"korEngNumSpec"}\' >'
							+ '</div>'
						+ '</li>'
					+ '</ul>'
				+ '</div>';
			optionAreaHtml = $(optionAreaHtml);
			$jq.html(optionAreaHtml);
			jex.setJexObj($jq);
			if("fnt_frx_020101_1" == window._frxForm.optinViewType) {      //즉시이체
				$("#frx_option_area #frx_opt_area_1").show();     //출금계좌표시 내용
				$("#frx_option_area #frx_opt_area_2").show();     //입금계좌표시 내용
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_FRXFORM", JexMobileFrxForm, "data-jx-frxform");
})();

//[고객번호 & 선택 리스트]
function custListSetter($jq, data) {
	var dat = {};

	if("fnt_frx_080101_1" == window._frxForm.drotCustViewType) {
		var preCSN = $("#CSN").val();
		$('#CSN_NM').text(formatter.account(data["CSN"])+" ("+data["BRM"]+")"); //고객번호
		$("#CSN").val(data["CSN"]);//고객번호
		$("#drot_cust_hid").val(data["BRM"]);

		if(preCSN != $("#CSN").val()){
			$("#divResult").css("display","none");
		}
	}
	
	uf_custListChange();
	
	return dat;
}

//[원화출금번호 & 선택 리스트]
function acnoListSetter($jq, data) {
	var dat = {};

	$('#EBNK_ACN_VIEW').text(formatter.account(data["EBNK_ACN"])); //계좌번호
	$("#EBNK_ACN").val(data["EBNK_ACN"])//계좌번호
	$("#drot_cust_hid").val(data["BRM"])

	//계좌선택 상태 
	$("#acnoListPopup").find("li").attr("aria-selected", "false").removeClass("active");
	$jq.addClass("active");
	
	acnoPwdInit("W");
	jex.setJexObj($("#fnt_frx_010101_1")); // 출금가능금액 조회
	return dat;
}

/**
 * [출금계좌 선택시 잔액 조회]
 */
var frxform_fnt_frx_010101_1 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var jsonDat = {};
		var index = "";
		var drot_acno = "";

		if ($('#acnoListPopup').is(':visible')) {	//[출금계좌정보 & 선택 리스트]
			//index = $jq.attr("data-rownum");
			//drot_acno = $('#drot_acno_hid').val().replace(/-/g, "");
			drot_acno = $.trim($('#EBNK_ACN').val());
			jsonDat["DROT_ACN"] = drot_acno;

			//$('#ACNT_NM').text(" "); //대표상품명
			$('#pvamt_for').text(" "); //지불가능금액
		}
		else { // [초기진입, 자주쓰는이체]
			if(_this.setterFavTrnUse == "Y"){ //자주쓰는이체 setter
				drot_acno = $.trim($('#drot_acno_hid').val());	// [자주쓰는이체] 선택시
				_this.setterFavTrnUse = "";  //초기화
			} else {
				//drot_acno = $.trim($("#step2").find("#EBNK_ACN").val()); //[초기진입]
				drot_acno = $.trim($('#EBNK_ACN').val());
				jsonDat["DROT_ACN"] = drot_acno;
			}
		}

		$jq.attr("data-jx-svc-source-direct", JSON.stringify({
			"DROT_ACN" : drot_acno
		}));


		return {};
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			if("code_btn_frx0000" == $jq.attr("data-jx-svc-gubn")) { // 출금가능금액 [초기 진입시]
				$("#drotAcntInfo").find("#pvamt_for").next().hide();
				$("#drotAcntInfo").find("#pvamt_for").text("조회오류");
				$(this).find("#won").hide();
			}
			else {
				MobPopup.showErrorPopupForData(data);
				return;
			}
			return "STOP_SVC";
		} else {
			var jsonDat = {};

			$('#drot_acno_hid').val(data["DROT_ACN"]);
			if (window._frxForm.isSelectUI) {

				//기존 단건배열-테이블 형태로 뿌리던것을 일반 오브젝트로 셋팅할수 있게 파싱해서 리턴합니다.
				//기존 asis에서 단건을 테이블로 뿌리는 경우를 tobe div안에 셋팅할때 쓰세요.
//					jsonDat = arrayToObj(data);
//					jsonDat['acct_nm2'] = jsonDat['RPRS_PDM'];
			} else {

				jsonDat = data;

				$("#drotAcntInfo").find("#pvamt_for").next().show();

				//$('#ACNT_NM').text(data["RPRS_PDM"]); //대표상품명
				$('#EBNK_ACN').text(formatter.account(data["DROT_ACN"])); //출금계좌번호
				$('#pvamt_for').text(formatter.number(data["PYMT_ABL_AMT"])); //지불가능금액
			}
		}
		return jsonDat;

	},
	uf_exec : function() {

	}
}

//[수수료결제계좌 & 선택 리스트]
function feeAcnoListSetter($jq, data) {
	var dat = {};
	//$('#FEE_EBNK_ACN_VIEW').text(formatter.account(data["EBNK_ACN"])+" "+data["ACNT_NM"]); //계좌번호
	$('#FEE_EBNK_ACN_VIEW').text(formatter.account(data["EBNK_ACN"])); //계좌번호
	$("#FEE_EBNK_ACN").val(data["EBNK_ACN"])//고객번호
	$("#drot_cust_hid").val(data["BRM"])

	//계좌선택 상태 
	$("#feeAcnoListPopup").find("li").attr("aria-selected", "false").removeClass("active");
	$jq.addClass("active");
	
	acnoPwdInit("E");
	jex.setJexObj($("#fnt_frx_fee_list")); // 출금가능금액 조회
	return dat;
}

/**
 * [수수료결제계좌 선택시 잔액 조회]
 */
var frxform_fnt_frx_fee_list = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var jsonDat = {};
		var index = "";
		var drot_acno = "";

		if ($('#feeAcnoListPopup').is(':visible')) {	//[출금계좌정보 & 선택 리스트]
			//index = $jq.attr("data-rownum");
			//drot_acno = $('#drot_acno_hid').val().replace(/-/g, "");
			drot_acno = $.trim($('#FEE_EBNK_ACN').val());
			jsonDat["DROT_ACN"] = drot_acno;

			$('#FEE_ACNT_NM').text(" "); //대표상품명
			$('#fee_pvamt_for').text(" "); //지불가능금액
		}
		else { // [초기진입, 자주쓰는이체]
			if(_this.setterFavTrnUse == "Y"){ //자주쓰는이체 setter
				drot_acno = $.trim($('#drot_acno_hid').val());	// [자주쓰는이체] 선택시
				_this.setterFavTrnUse = "";  //초기화
			} else {
				//drot_acno = $.trim($("#step2").find("#FEE_EBNK_ACN").val()); //[초기진입]
				drot_acno = $.trim($('#FEE_EBNK_ACN').val());
			}
		}

		$jq.attr("data-jx-svc-source-direct", JSON.stringify({
			"DROT_ACN" : drot_acno
		}));


		return {};
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			if("code_btn_frxfee" == $jq.attr("data-jx-svc-gubn")) { // 출금가능금액 [초기 진입시]
				$("#drotFeeAcntInfo").find("#fee_pvamt_for").next().hide();
				$("#drotFeeAcntInfo").find("#fee_pvamt_for").text("조회오류");
				$(this).find("#won").hide();
			}
			else {
				MobPopup.showErrorPopupForData(data);
				return;
			}
			return "STOP_SVC";
		} else {
			var jsonDat = {};

			$('#drot_acno_hid').val(data["DROT_ACN"]);
			if (window._frxForm.isSelectUI) {

				//기존 단건배열-테이블 형태로 뿌리던것을 일반 오브젝트로 셋팅할수 있게 파싱해서 리턴합니다.
				//기존 asis에서 단건을 테이블로 뿌리는 경우를 tobe div안에 셋팅할때 쓰세요.
//					jsonDat = arrayToObj(data);
//					jsonDat['acct_nm2'] = jsonDat['RPRS_PDM'];
			} else {

				jsonDat = data;

				$("#drotFeeAcntInfo").find("#fee_pvamt_for").next().show();

				//$('#FEE_ACNT_NM').text(data["RPRS_PDM"]); //대표상품명
				$('#FEE_EBNK_ACN').text(formatter.account(data["DROT_ACN"])); //출금계좌번호
				$('#fee_pvamt_for').text(formatter.number(data["PYMT_ABL_AMT"])); //지불가능금액
				$('#fee_pvamt_for').focus();
			}
		}
		return jsonDat;

	},
	uf_exec : function() {

	}
}

//[외화출금번호 & 선택 리스트]
function facnoListSetter($jq, data) {
	var dat = {};
	//$('#FEBNK_ACN_VIEW').text(formatter.account(data["EBNK_ACN"])+" "+data["ACNT_NM"]); //계좌번호
	$('#FEBNK_ACN_VIEW').text(formatter.account(data["EBNK_ACN"])); //계좌번호
	$("#FEBNK_ACN").val(data["EBNK_ACN"])//고객번호
	$("#drot_cust_hid").val(data["BRM"])

	//계좌선택 상태 
	//$("#acnoListPopup").find("li").attr("aria-selected", "false").removeClass("active");
	$("#facnoListPopup").find("li").attr("aria-selected", "false").removeClass("active");
	$jq.addClass("active");
	
	acnoPwdInit("F");

	return dat;
}

/**
 * [외화잔액보기]
 */
var frxSearchFlag = true;
function uf_goFxBalc(){
	if($.trim($('#FEBNK_ACN').val()) == ""){
		MobPopup.showAlertPopup("외화계좌를 선택하여 주시기 바랍니다.", "", function() {
		});
	}else{
		if (frxSearchFlag) {
			jex.setJexObj($("#frxform_fnt_frx_010101_2").attr("data-jx-svc-onload","true")); // 출금가능금액 조회
		}
	}
}
var frxform_fnt_frx_010101_2 = {
	uf_in : function($jq, sourceData) {
		//frxSearchFlag = false;	//TOBE 현행화. 잔액조회 되도록 수정
		//frxSearchFlag = false;
		$("#tbody").css("display","none");
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();

		var reqData = {};
		reqData["DROT_ACN"] = $.trim($('#FEBNK_ACN').val());
		return reqData;

	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			var resultList = {};
			var pushData    = [];
			var loop_list = data["list"];
			for (var i in loop_list) {
				loop_list[i]["PYMT_ABL_AMT_FORM"] = mobFormatter.decimal(loop_list[i]["PYMT_ABL_AMT"],{"decimal":2,"decimalZero":true});
				loop_list[i]["BAL_FORM"] = mobFormatter.decimal(loop_list[i]["BAL"],{"decimal":2,"decimalZero":true});
				pushData.push(loop_list[i]);
			}
			
			$("#tbody").css("display","");
			$("#facnoBalcView").attr("aria-hidden", "true");
			resultList["facnoBalcViewInfo"] = pushData;
			
			$("#facnoBalcView").show();
			comLayerPopUtil.open('facnoBalcView');
			return resultList;
		}
	},
	uf_exec : function() {
		setTimeout(function() {
			frxSearchFlag = true;
		}, 1000);
	}
}



/**
 * [환율조회]
 */
var frxform_fnt_frx_010101_3 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();

	},
	uf_out : function($jq, data, index) {
		var _is_error = data["_is_error"];
		if (data["_is_error"] == "true") {
			/*if(_error_cd != "EMCAGA000090" ) {
				MobPopup.showErrorPopupForData(data, function() {
					_webViewExit();
				});

				return "STOP_SVC";
			}*/
			//alert(data["_error_cd"]);
			if($.trim(data["_error_cd"]) == "9992" ) {
				//return;
				MobPopup.showErrorPopupForData(data);
			}else{
				var snctData = _this.snctData || {};
				var fromPage = snctData.fromPage || "";
				if(	fromPage == "SNCT" || fromPage == "SNCT_REG" || fromPage == "SNCT_END") {
					
				}else{
					MobPopup.showAlertPopup("환율조회 중 오류가 발생했습니다.<br />화면을 리로드해주시기 바랍니다.");
				}
				return;
			}
			
		} else {
			var resultList = {};
			var pushData    = [];
			var pushData1    = [];
			var loop_list = data["list"];
			
			_this.excRateAll = data["list"];
			
			for (var i in loop_list) {
				loop_list[i]["BRGN_BASE_RT1"] = mobFormatter.decimal(loop_list[i]["BRGN_BASE_RT1"],{"decimal":2,"decimalZero":true});
				loop_list[i]["TLCB_RT"] = mobFormatter.decimal(loop_list[i]["TLCB_RT"],{"decimal":2,"decimalZero":true});
				loop_list[i]["TLCH_SELL_RT"] = mobFormatter.decimal(loop_list[i]["TLCH_SELL_RT"],{"decimal":2,"decimalZero":true});
				loop_list[i]["CSH_BNG_RT"] = mobFormatter.decimal(loop_list[i]["CSH_BNG_RT"],{"decimal":2,"decimalZero":true});
				loop_list[i]["CSH_SELL_RT"] = mobFormatter.decimal(loop_list[i]["CSH_SELL_RT"],{"decimal":2,"decimalZero":true});
				loop_list[i]["TSCN_RT"] = mobFormatter.decimal(loop_list[i]["TSCN_RT"],{"decimal":4,"decimalZero":true});
				
				pushData.push(loop_list[i]);
				
			}
			
			for( var i=0; i<21; i++) {
				
				pushData1.push(loop_list[i]);
			}
			resultList["excRateViewInfo"] = pushData1;
			resultList["excRate"] = pushData;
			
			var excRateListTbl = jex.getJexObj($("#excRateViewInfo"), "JEX_MOBILE_LIST");
			excRateListTbl.setAll(resultList);

			return resultList;
		}
		//return jsonDat;

	},
	uf_exec : function() {
		$("#inqTime").text(g_getDate('yyyy-mm-dd HH:mi:ss'));
		
		//jex.getJexObj($("#excRateListPopup"), "JEX_MOBILE_DIALOG").execute();
		jex.setJexObj($("#frxform_fnt_frx_010101_8").attr("data-jx-svc-onload","true"));
	}
}

/**
 * [내계좌]
 */
function myAccNoListSetter($jq, data) {
	var index = $jq.index();

	var dat = {};
	$("#drw_acno").val($.trim(data["EBNK_ACN"].replace(/-/g, "")));//입금계좌번호
	$("#BANK_CD").val("003");//은행코드
	$("#BANK_NM").val("기업은행");//은행명
	myAcntSetter("003","기업은행");
	
	//계좌선택 상태 
	$("#myAccNoView").find("li").attr("aria-selected", "false").removeClass("active");
	$jq.addClass("active");
	
	//자주쓰는입금계좌 선택표시 해제
	$("#favAcntView").find("li").attr("aria-selected", "false").removeClass("active");
	
	return dat;
}

/**
* [자주쓰는계좌] 리스트 선택
*/
function favAcntSetter($jq, data) {
	var index = $jq.find("#index").val();
	var dat = {};
	$("#myAccNoView").find("li").attr("aria-selected", "false").removeClass("active");
	
	$("#drw_acno").val($.trim(data.mnrc_acno.replace(/-/g, "")));//입금계좌번호
	var bankCode = data.hid_mnrc_acno_cd.substr(1,2);
	var bankCodeDat = jex.getJexObj($("#bankCdListPopup").find("#bankCdListTbl"), "JEX_MOBILE_LIST").dat;
	for(var i=0; i<bankCodeDat.length; i++){
		
		var bankCd = bankCodeDat[i]["VALUE"].split(";")[1]

		if(bankCode == bankCd){
			dat["BANKVALUE"] =  bankCode;
			dat["BANKNAME"] =  bankCodeDat[i]["NAME"];
			favAcnoBankSet(bankCodeDat[i]["NAME"],bankCode);
		}

		if(bankCode == "03"){
			myAcntSetter("003","기업은행");
		}
	}

	
	if(bankCode == "03"){
		myAcntSetter("003","기업은행");
	}
	
	return dat;
}

/**
* [자주쓰는계좌]
*/
var fnt_favAcntView = {
	uf_out : function($jq, data, index) {
		$("#favAcntView_html").html("");
		$("#favAcntView_html").show();
		var list = data["list"];

		if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {
			var htmlDat = getFavAcntRowHtml2($jq, list);
			
			if("" == htmlDat){ //리스트는 있지만 계좌가 빈값이 내려올 경우.
				$("#favAcntStep").find("#favAcntStep_html").hide();
				$("#favAcntStep").find("#favAcntStep_html_2").show();
			}
			else {
				$("#favAcntView #favAcntView_html").append(htmlDat);
				
				$("#favAcntView").find("#favAcntView_html").show();
				$("#favAcntView").find("#favAcntView_html_2").hide(); //자주쓰는 계좌가 없습니다.
				
				$('[id^="favAcntView_html"]').each(function() {
					jex.setJexObj($(this));
				});
			}

		} else {
			$("#favAcntView").find("#favAcntView_html").hide();
			$("#favAcntView").find("#favAcntView_html_2").show();
		}

		return {};
	},
	uf_exec : function() {
		//uf_goStep(4006);
		comLayerPopUtil.open('favAcntView');
	}
}

//[자주쓰는계좌] draw
function getFavAcntRowHtml2($jq, list) {
	
	//화면에 선택된 계좌
	var acn = $.trim($("#drw_acno").val());
	
	//EFNC_GRP_CD   , E금융그룹코드
	//GRP_NM        , 그룹명
	//EFNC_BNCD     , E금융은행코드
	//EBNK_ACN      , E뱅킹계좌번호
	//ACNT_NM       , 계좌명
	//EBNK_DCD      , E뱅킹구분코드
	//EBNK_EFNC_CPN , E뱅킹E금융휴대폰번호
	//CMS_NO        , CMS번호
	//EFNC_USER_ID  , E금융사용자ID
	//COUNT         , 카운트
	//ACNT_DCD      , 계좌구분코드
	var emptyCnt = 0; //리스트는 있지만 계좌가 빈값이 내려올 경우.
	//var htmlDat = "<ul class='list_ty01'>";
	var htmlDat = "<ul class='select_list ty3' role='listbox'>";	//tobe
	
	for (var i = 0; i < list.length; i++) {
		var ACNT_NM = $.trim(list[i]["ACNT_NM"]);
		var EBNK_ACN = $.trim(list[i]["EBNK_ACN"]);
		var EFNC_BNCD = $.trim(list[i]["EFNC_BNCD"]);
		var BANK_NM = $.trim(list[i]["BANK_NM"]);
		
		if("" == ACNT_NM){
			emptyCnt++;
		} else {
			if(acn == EBNK_ACN){	// 기존에 선택된 계좌가 있을때
				htmlDat += "<li class=\"account_list_item active\" role=\"option\" tabindex=\"-1\" aria-selected=\"false\" id='" + window._frxForm.formIds.favAcntListTbl + "_tr" + i + "' >";
			}else{
				htmlDat += "<li class=\"account_list_item\" role=\"option\" tabindex=\"-1\" id='" + window._frxForm.formIds.favAcntListTbl + "_tr" + i + "' >";
			}
				htmlDat += "<a href=\"#javascript:;\" class=\"block\" role=\"button\""
					htmlDat += "data-jx-execute=\"click\" ";
					htmlDat += "data-jx-setter=\"\" ";
					htmlDat += "data-jx-setter-source=\"parent\" ";
					htmlDat += "data-jx-setter-handler=\"favAcntSetter()\" ";
					htmlDat += "data-jx-setter-target=\"\" ";
					htmlDat += "data-jx-setter-execute=\"FUNC@comLayerPopUtil.close(\'favAcntView\'),FUNC@$('#mnrc_acno').focusout()\" ";
					htmlDat += ">";
					
					htmlDat += "<div class=\"item\">";
					htmlDat += "	<div class=\"item_top\">";
					htmlDat += "		<div class=\"item_top_text\"  id=\"ACNT_NM\">"+ ACNT_NM +"</div>";
					htmlDat += "	</div>";
					htmlDat += "	<div class=\"item_bottom\">";
					htmlDat += "		<div class=\"item_bottom_text\" id=\"mnrc_acno\">" + EBNK_ACN + "</div>";
					htmlDat += "	</div>";
					htmlDat += "</div>";
					htmlDat += '<input type="hidden" id="hid_mnrc_acno_cd" value="'+ EFNC_BNCD +'"/>';
				htmlDat += "</a>";
			htmlDat += "</li>";
		}
	}
	htmlDat += "</ul>";
	if(list.length == emptyCnt) htmlDat = ""; //리스트는 있지만 계좌가 빈값이 내려올 경우.
	
	return htmlDat;
}

/**
 * [통화]
 */
var frxform_fnt_frx_010101_8 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var prevStepNo = jex.plugin.get("JEX_MOBILE_STEP").getPrevStepNo(); //이전스텝
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data);
			return "STOP_SVC";
		} else {
			if(window._frxForm.drotBankCdViewType == "fnt_frx_020101_1"){
				var resultList = {};
				return resultList;
				
			} else if(window.location.pathname.indexOf('fnt_frx_200101_1.html') > -1){
				// 기업 실시간 금결원송금 화면일경우, 송금통화 리스트 변경
				var resultList = {};
				var pushData    = [];
				var loop_list = data["list4"];
				for (var i in loop_list) {
					if(i>0) pushData.push(loop_list[i]);
				}
				resultList["crcdListTbl"] = pushData;
				var crcdListTbl = jex.getJexObj($("#crcdListPopup").find("#crcdListTbl"), "JEX_MOBILE_LIST");
				crcdListTbl.setAll(resultList);
	
				return resultList;
				
			} else{
				var resultList = {};
				var pushData    = [];
				var loop_list = data["list1"];
				_this.banklist = data["list1"];
				for (var i in loop_list) {
					if(i>0) pushData.push(loop_list[i]);
				}
				resultList["crcdListTbl"] = pushData;
				var crcdListTbl = jex.getJexObj($("#crcdListPopup").find("#crcdListTbl"), "JEX_MOBILE_LIST");
				crcdListTbl.setAll(resultList);
	
				return resultList;
			}
		}
		//return jsonDat;

	},
	uf_exec : function() {
		/*if(_this.serviceFlag == "Y"){
			jex.setJexObj($("#frxform_fnt_frx_020101_1").attr("data-jx-svc-onload","true"));
		}*/
		
		$("#crcdListTbl").find(".ico_box").each(function(i, val){
			var bankCd = _this.banklist[i]["VALUE"].split(";")[1];
			$(this).removeClass("ico_box ty3 ico_bank_003");
		    $(this).addClass("ico_box ty3 ico_bank_0"+bankCd);
		});
		
		
		
		if(window._frxForm.drotBankCdViewType == "fnt_frx_020101_1"){
			jex.setJexObj($("#frxform_fnt_frx_020101_1").attr("data-jx-svc-onload","true"));
		}
	}
}

/**
* [통화] 리스트 선택
*/
function crcdListSetter($jq, data) {
//	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["CRCDNAME"] = data.NAME;
	dat["CRCDVALUE"] = data.VALUE;

	viewSetter(data);


	return dat;
}


/**
 * [지급은행]
 */
var frxform_fnt_frx_020101_1 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();

	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			if($.trim(data["_error_cd"]) == "9992" ) {
				//return;
				MobPopup.showErrorPopupForData(data);
			}else{
				MobPopup.showErrorPopupForData(data);
				return "STOP_SVC";
			}
		} else {
			var resultList = {};
			var pushData1    = [];
			var pushData2    = [];
			var loop_list1 = data["list1"];
			var loop_list2 = data["list2"];
			
			_this.crcdlist = data["list1"];
			_this.banklist = data["list2"];
			
			for (var i in loop_list1) {
				if(i>0) pushData1.push(loop_list1[i]);
			}
			resultList["crcdListTbl"] = pushData1;
			
			for (var i in loop_list2) {
				if(i>0){
					//TODO SR //은행명 은행코드 노출 제외	
					loop_list2[i].NAME = loop_list2[i].NAME.split("(")[0];
					pushData2.push(loop_list2[i]);
				}
				
			}
			resultList["bankCdListTbl"] = pushData2;
			_this.banklist = pushData2;
			
			var crcdListTbl = jex.getJexObj($("#crcdListPopup").find("#crcdListTbl"), "JEX_MOBILE_LIST");
			crcdListTbl.setAll(resultList);

			var bankCdListTbl = jex.getJexObj($("#bankCdListPopup").find("#bankCdListTbl"), "JEX_MOBILE_LIST");
			bankCdListTbl.setAll(resultList);

			return resultList;
		}
		//return jsonDat;

	},
	uf_exec : function() {
		
		//TODO SR 통화코드 로고
		$("#crcdListTbl").find(".ico_box").each(function(i, val){
			var crdcd = _this.crcdlist[i+1]["VALUE"].toLocaleLowerCase();
			$(this).removeClass("ico_box ty1 flag_usd");
			$(this).addClass("ico_box ty1 flag_"+ crdcd);
		});
		
		
		//TODO SR  해외은행 로고 노출여부 8/16 박철민부장님 확인예정
		//은행로고
		$("#bankCdListTbl").find(".ico_box").each(function(i, val){
			var bankCd = _this.banklist[i]["VALUE"].split(";")[1];
			 $(this).removeClass("ico_box ty3 ico_bank_003");
		     $(this).addClass("ico_box ty3 ico_bank_0"+bankCd);
		     
		     var bankNm = _this.banklist[i]["NAME"].split("(")[0];
		     //$("#BANKNAME").text(bankNm);
		});		
		
	}
}

/**
* [지급은행] 리스트 선택
*/
function bankCdListSetter($jq, data) {
	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["BANKNAME"] = data.NAME;
	dat["BANKVALUE"] = data.VALUE;

	bankCodeSet(data);

	return dat;
}

var frxform_fnt_frx_150101_8 = {
		uf_in : function($jq){
			
		},   
		uf_out : function($jq, data, index){
			
			var resultList = {};
			var pushData1    = [];
			var pushData2    = [];
			var pushData3    = [];
			var pushData5    = [];
			var loop_list1 = data["list1"];
			var loop_list2 = data["list2"];
			var loop_list3 = data["list3"];
			var loop_list5 = data["list5"];
			_this.crcdlist = data["list1"];
			for (var i in loop_list1) {
				/*if ( loop_list1[i].VALUE == "0" || loop_list1[i].VALUE == "00" || loop_list1[i].VALUE == "" ) {
					loop_list1[i].VALUE = "";
					loop_list1[i].NAME = "선택하세요";
				}*/
				pushData1.push(loop_list1[i]);
			}
			resultList["crcdListTbl"] = pushData1;	//통화 코드
			
			for (var i in loop_list2) {
				if ( loop_list2[i].VALUE == "0" || loop_list2[i].VALUE == "00" || loop_list2[i].VALUE == "" ) {
					loop_list2[i].VALUE = "";
					loop_list2[i].NAME = "선택하세요";
				}
				pushData2.push(loop_list2[i]);
			}
			resultList["rmtnNtCdListTbl"] = pushData2;	//수취인 소재국 코드
			resultList["cntpNtCdListTbl"] = pushData2;	//지급은행 소재국 코드
			resultList["countryCdListTbl"] = pushData2;	//국가 코드
			
			for (var i in loop_list3) {
				if ( loop_list3[i].VALUE == "0" || loop_list3[i].VALUE == "00" || loop_list3[i].VALUE == "" ) {
					// 2022-09-02 감리테스트 결함으로 인뱅과 동일하게 선택해주세요에서 선택안함으로 변경
					loop_list3[i].VALUE = "";
					loop_list3[i].NAME = "선택안함";
				}
				pushData3.push(loop_list3[i]);
			}
			resultList["bankUiqCdListTbl"] = pushData3;	//은행고유구분 코드
			
			for (var i in loop_list5) {
				if ( loop_list5[i].VALUE == "0" || loop_list5[i].VALUE == "00" || loop_list5[i].VALUE == "" ) {
					loop_list5[i].VALUE = "";
					loop_list5[i].NAME = "선택하세요";
				}
				pushData5.push(loop_list5[i]);
			}
			resultList["bankCdListTbl"] = pushData5;	//송금지급은행
			
			
			var crcdListTbl = jex.getJexObj($("#crcdListPopup").find("#crcdListTbl"), "JEX_MOBILE_LIST");
			if ( crcdListTbl ){
				crcdListTbl.setAll(resultList);
			}

			var rmtnNtCdListTbl = jex.getJexObj($("#rmtnNtCdListPopup").find("#rmtnNtCdListTbl"), "JEX_MOBILE_LIST");
			if ( rmtnNtCdListTbl ){
				rmtnNtCdListTbl.setAll(resultList);
			}
			
			var cntpNtCdListTbl = jex.getJexObj($("#cntpNtCdListPopup").find("#cntpNtCdListTbl"), "JEX_MOBILE_LIST");
			if ( cntpNtCdListTbl ){
				cntpNtCdListTbl.setAll(resultList);
			}
			
			var bankUiqCdListTbl = jex.getJexObj($("#bankUiqCdListPopup").find("#bankUiqCdListTbl"), "JEX_MOBILE_LIST");
			if ( bankUiqCdListTbl ){
				bankUiqCdListTbl.setAll(resultList);
			}
			
			var countryCdListTbl = jex.getJexObj($("#countryCdListPopup").find("#countryCdListTbl"), "JEX_MOBILE_LIST");
			if ( countryCdListTbl ){
				countryCdListTbl.setAll(resultList);
			}
			
			var bankCdListTbl = jex.getJexObj($("#bankCdListPopup").find("#bankCdListTbl"), "JEX_MOBILE_LIST");
			if ( bankCdListTbl ){
				bankCdListTbl.setAll(resultList);
			}
			//return resultList;
				
		},uf_exec : function(){
			
		}
};

/**
* [수취인 소재국] 리스트 선택
*/
function rmtnNtCdListSetter($jq, data) {
//	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["RMTNNTCDNAME"] = data.NAME;
	dat["RMTNNTCDVALUE"] = data.VALUE;

	rmtnNtCodeSet(data);

	return dat;
}

/**
* [지급은행 소재국] 리스트 선택
*/
function cntpNtCdListSetter($jq, data) {
//	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["CNTPNTCDNAME"] = data.NAME;
	dat["CNTPNTCDVALUE"] = data.VALUE;

	cntpNtCodeSet(data);

	return dat;
}

/**
* [은행고유구분] 리스트 선택
*/
function bankUiqCdListSetter($jq, data) {
//	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["BANKUIQCDNAME"] = data.NAME;
	dat["BANKUIQCDVALUE"] = data.VALUE;

	bankUiqCodeSet(data);

	return dat;
}

/**
* [국가선택] 리스트 선택
*/
function countryCdListSetter($jq, data) {
	var index = $jq.find("#index").val();

//	$("#favAcntView_html").find("tr").removeClass();

	var dat = {};
	dat["COUNTRYCDNAME"] = data.NAME;
	dat["COUNTRYCDVALUE"] = data.VALUE;

	countryCodeSet(data);

	return dat;
}
