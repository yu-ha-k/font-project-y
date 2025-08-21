(function() {
	/**
	 * Date: 2017.10.16
	 * 
	 * [즉시이체]전용
	 * 1. 계좌선택 영역 2. 입금정보 3. 선택사항
	 * 
	 * @namespace JexMobileTranForm
	 */
	window._tranForm;
	var sForm_attrs = {
		  "id"    : "data-jx-tranform"                                    // 호출할 svc 명
		, "pvamt" : "data-jx-tranform-pvamt"                              // 계좌리스트 팝업에서 출금가능액 노출 여부
	};
	
	var sFormObj_attrs = {
		  "areaDrotAcnt"       : "data-jx-tranform-area-drot-acnt"        // [출금계좌] 선택된 노출영역
		, "areaDrotAcntTitle"  : "data-jx-tranform-area-drot-acnt-title"  // [출금계좌] 선택된 노출영역-title변경
//		, "areaDrotAcntSelect" : "data-jx-tranform-area-drot-acnt-select" // 출금계좌 select 표현방식여부
		, "btnAcntDetail"      : "data-jx-tranform-btn-acnt-detail"       // [이체한도] 버튼 계좌상세정보 
		, "btnFavTrn"          : "data-jx-tranform-btn-favorite-trn"      // [통합이체-내이체함] 버튼
//		, "btnFavTrn2"         : "data-jx-tranform-btn-favorite-trn2"     // [자주쓰는이체] 버튼(예약이체)
		, "areaBank"           : "data-jx-tranform-area-bank"             // [은행, 증권사]
		, "areaBank4"           : "data-jx-tranform-area-bank4"           // [은행, 증권사]
		, "btnLatelyAcnt"      : "data-jx-tranform-btn-lately-acnt"       // [최근입금계좌] 버튼
		, "btnFavAcnt"         : "data-jx-tranform-btn-favorite-acnt"     // [자주쓰는계좌] 버튼
		, "btnMyAcnt"          : "data-jx-tranform-btn-my-acnt"           // [내계좌] 버튼
		, "areaOption"         : "data-jx-tranform-area-option"           // [선택정보]
		, "btnRgstInfoSel"     : "data-jx-tranform-btn-pay-rgst-info"     // [급여이체]등록내역선택
		, "btnFaxSend"         : "data-jx-tranform-btn-fax-send"          // [팩스(FAX) 전송] 버튼
		, "btnTrnConfCard"     : "data-jx-tranform-btn-trnConfCard"       // [이체확인증] 버튼 
	};
	
	var JexMobileTranForm = JexPlugin.extend({
		init : function() {
			window._tranForm = this;
		},
		formIds : {
			  "drotAcntInfoId"    		: "drotAcntInfo"      // 출금계좌정보영역 ID
			, "acntListTbl"       		: "acntListTbl"       // 출금계좌리스트영역 ID
			, "bankListTbl"       		: "bankListTbl"       // 은행리스트영역 ID
			, "favTrnListTbl"     		: "favTrnListTbl"     // 자주쓰는이체 ID(즉시이체 등)
//			, "favTrnListTbl2"    		: "favTrnListTbl2"    // 자주쓰는이체 ID(예약이체)
			, "latelyAcntListTbl" 		: "latelyAcntListTbl" // 최근입금계좌 ID
			, "myAcntListTbl"     		: "myAcntListTbl"     // [기업은행 내계좌] ID
			, "myOpnDrotAcntListTbl"  	: "myOpnDrotAcntListTbl"  // [다른은행 내계좌 출금가능계좌] ID	
			, "favAcntListTbl"    		: "favAcntListTbl"    // 자주쓰는계좌 ID
			, "rgstInfoListTbl"   		: "rgstInfoListTbl"   // [등록내역]급여이체 ID
		},
		
		/**
		 * 사용자입금계좌지정'서비스 사용하는 업무PAGE
		 */
		trnformUserMractDsgtList : [
			  "fnt_trn_110101_1.html"         //이체 > 즉시이체
//			, "fnt_trn_020101_1.html"         //이체 > 여러계좌이체
//			, "fnt_trn_030101_1.html"         //이체 > 급여이체 -> asis 주석처리됨
//			, "fnt_trn_310101_1.html"         //이체 > 10억초과타행
//			, "fnt_trn_040101_1.html"         //이체 > 예약이체
			, "fnt_trn_250101_1.html"         //이체 > MMT이체
//			, "fnt_qck_020101_1.html"         //간편송금서비스 > 간편송금
			, "fnt_vat_020101_1.html"         //부가세매입자납부거래 > 전용계좌일반이체
		],
		
		trnformUserTypeList : [
			 "fnt_trn_310101_1.html"         //이체 > 타행
		],
		
		/**
		 * @method load data-jx-tranform 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load : function(attr, $jq) {
			this._this  = this;
			this.$jq    = $jq;
			this.id     = $jq.attr('id');
			this.stepNo = $jq.attr('data-jx-step-no');

			this.preapreSvcDiv($jq);
			this.preparePopup ($jq);

			this.isPvamt = this.$jq.attr(sForm_attrs.pvamt) ? eval(this.$jq.attr(sForm_attrs.pvamt)) : false;

			if ($('#drot_acno_hid').length == 0) {
				$('body').append('<input id="drot_acno_hid" type="hidden">');
			}
			
			_this.user_mract_dsgt_y_acnList  = [];    //지정입금계좌'정보LIST 초기화.
			_this.isUserMractDsgt_svcAblPage = false; //사용자입금계좌지정'서비스 사용하는 업무PAGE' [true/false] 초기화.
			
			_this.trnformUserType_svcAblPage = false;
			
			var pgId = window._pathName.split("/");
			if(pgId[pgId.length-1].indexOf("html") > 0){
				pgId = pgId[pgId.length-1].split(".")[0];
			}
			
			_this.pgId = pgId;
			
			//get baseURI
			//var _baseURI = $jq.context.baseURI;
			var _baseURI = document.baseURI;
			
			_baseURI     = _baseURI.split("/");
			
			for (var k = 0; k < this.trnformUserMractDsgtList.length; k++) {
				//if(this.trnformUserMractDsgtList[k].match(_baseURI[_baseURI.length-1].split(".")[0])) {
				if(_baseURI[_baseURI.length-1].match(this.trnformUserMractDsgtList[k])) {
					console.log("ljy :: ["+_baseURI[_baseURI.length-1]+"] and ["+this.trnformUserMractDsgtList[k]+"] is match");
					_this.isUserMractDsgt_svcAblPage = true; //사용자입금계좌지정'서비스 사용하는 업무PAGE'인 경우[true]
					break;
				}
			}
			
			for (var kk = 0; kk < this.trnformUserTypeList.length; kk++) {
				if(_baseURI[_baseURI.length-1].match(this.trnformUserTypeList[kk])) {
					console.log("ljy :: ["+_baseURI[_baseURI.length-1]+"] and ["+this.trnformUserTypeList[kk]+"] is match");
					_this.trnformUserType_svcAblPage = true;
					break;
				}
			}
			
			/**
			 * 입금계좌'번호
			 */
			/*$jq.find("#mnrc_acno").on("click",function(evt) {
				//사용자입금계좌지정여부[Y/N]
				if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
					uf_user_mract_dsgt_showInfo();
				}
			});*/
			
			/**
			 * 2018.04.12 입금계좌를 자주쓰는계좌'로 셋팅하는 이외의 경로인 경우 초기화(1,2,3,5번)
			 *   ['입금계좌'셋팅할 수 있는 모든경로]
			 *     1.자주쓰는이체     uf_setter_favTrnListTbl (즉시), uf_setter_favTrnListTbl2 (예약)
			 *     2.직접입력         $jq.find("#mnrc_acno").on("keyup",function(evt) {
			 *     3.최금입금계좌     uf_setter_latelyAcntListTbl
			 *     4.자주쓰는계좌 *** uf_setter_favAcntTbl ***
			 *     5.내계좌           uf_setter_myAcntTbl
			 */
			$jq.find("#mnrc_acno").on("keyup",function(evt) { //[2.직접입력]
				//console.log("ljy :: blur keypress keyup: " + evt.key);
				_this.setter_favAcntTbl_ebnk_efnc_cpn = ""; //초기화
			});
			
			/**
			 * 계좌 비밀번호 버튼 이벤트 정의
			 */			
			//$jq.find("#drot_acnt_pwd").on("click",function(evt) {				
			//	_callXecureKeypad("drot_acnt_pwd", "1", "4", "4", "계좌비밀번호 4자리", null, "Y");
			//});
			
			/**
			 * [출금계좌정보] 영역
			 */
			var drotAcntArea = $jq.find('[' + sFormObj_attrs.areaDrotAcnt + ']:first');
			if (drotAcntArea.length > 0) {
				this.drawDrocAcntAreaHtml(drotAcntArea);
			}
			
			/**
			 * [출금계좌정보] 영역 
			 * :: 자주쓰는이체 편집 [fnt_trn_080101_1.html], 급여이체[fnt_trn_030101_1.html] 
			 */
			var drotAcntArea2 = $jq.next().find('[' + sFormObj_attrs.areaDrotAcnt + ']:first');
			if (drotAcntArea2.length > 0) {
				this.drawDrocAcntAreaHtml(drotAcntArea2);
			}
			
			/**
			 * [이체한도] 버튼/영역 정의
			 */
			var acntDetailButton = $jq.find('['+ sFormObj_attrs.btnAcntDetail + ']');
			if (acntDetailButton.length > 0) {
				this.drawAcntDetailButtonHtml(acntDetailButton);
			}
			
			/**
			 * [자주쓰는이체] 버튼/영역 정의 (즉시이체 등)
			 */
			var favTrnButton = $jq.find('[' + sFormObj_attrs.btnFavTrn + ']');
			if (favTrnButton.length > 0) {
				this.drawFavTrnButtonHtml(favTrnButton);
			}
			
			/**
			 * [자주쓰는이체] 버튼/영역 정의 (예약이체)
			 */
			//var favTrnButton2 = $jq.find('[' + sFormObj_attrs.btnFavTrn2 + ']');
			//if (favTrnButton2.length > 0) {
			//	this.drawFavTrnButtonHtml2(favTrnButton2);
			//}

			/**
			 * [은행, 증권사] 영역 정의
			 */
			var bankArea = $jq.find('[' + sFormObj_attrs.areaBank + ']:first');
			if (bankArea.length > 0) {
				this.drawBankAreaHtml(bankArea);
			}
			
			var bankArea4 = $jq.next().next().next().find('[' + sFormObj_attrs.areaBank4 + ']:first');
			if (bankArea4.length > 0) {
				this.drawBankAreaHtml(bankArea4);
			}
			
			
			/**
			 * [은행, 증권사] 영역 정의 :: 자주쓰는이체 편집 [fnt_trn_080101_1.html]
			 */
			var bankArea2 = $jq.next().find('[' + sFormObj_attrs.areaBank + ']:first');
			if (bankArea2.length > 0) {
				this.drawBankAreaHtml(bankArea2);
			}

			/**
			 * [최근입금계좌] 버튼
			 */
			var latelyAcntButton = $jq.find('['+ sFormObj_attrs.btnLatelyAcnt + ']:first');
			if (latelyAcntButton.length > 0) {
				this.drawLatelyAcntButtonHtml(latelyAcntButton);
			}
			/**
			 * [최근입금계좌] 버튼 :: 자주쓰는이체 편집 [fnt_trn_080101_1.html]
			 */
			var latelyAcntButton2 = $jq.next().find('['+ sFormObj_attrs.btnLatelyAcnt + ']:first');
			if (latelyAcntButton2.length > 0) {
				this.drawLatelyAcntButtonHtml(latelyAcntButton2);
			}
			
			/**
			 * [자주쓰는계좌] 버튼
			 */
			var favAcntButton = $jq.find('['+ sFormObj_attrs.btnFavAcnt + ']:first');
			if (favAcntButton.length > 0) {
				this.drawFavAcntButtonHtml(favAcntButton);
			}
			/**
			 * [자주쓰는계좌] 버튼 :: 자주쓰는이체 편집 [fnt_trn_080101_1.html]
			 */
			var favAcntButton2 = $jq.next().find('['+ sFormObj_attrs.btnFavAcnt + ']:first');
			if (favAcntButton2.length > 0) {
				this.drawFavAcntButtonHtml(favAcntButton2);
			}
			
			/**
			 * [내계좌] 버튼
			 */
			var myAcntButton = $jq.find('[' + sFormObj_attrs.btnMyAcnt + ']:first');
			if (myAcntButton.length > 0) {
				this.drawMyAcntButtonHtml(myAcntButton);
			}
			
			/**
			 * [선택정보]CMS 영역 정의
			 */
			var optionArea = $jq.find('[' + sFormObj_attrs.areaOption + ']:first');
			if (optionArea.length > 0) {
				this.drawOptionAreaHtml(optionArea);
			}
			
			/**
			 * [선택정보]CMS 영역 정의 :: 자주쓰는이체 편집 [fnt_trn_080101_1.html]
			 */
			var optionArea2 = $jq.next().find('[' + sFormObj_attrs.areaOption + ']:first');
			if (optionArea2.length > 0) {
				this.drawOptionAreaHtml(optionArea2);
			}
			
			/**
			 * [급여이체] 등록내역선택 [fnt_trn_030101_1.html]
			 */
			var rgstInfoSelButton = $jq.find('[' + sFormObj_attrs.btnRgstInfoSel + ']:first');
			if (rgstInfoSelButton.length > 0) {
				this.drawRegistInfoHtml(rgstInfoSelButton);
			}
			
			/**
			 * 팩스(FAX) 전송
			 */
			var faxSendButton = $jq.parent().find('[' + sFormObj_attrs.btnFaxSend + ']');
			if (faxSendButton.length > 0) {
				this.drawFaxSendHtml(faxSendButton);
			}
			
			/**
			 * [이체확인증]
			 */
			var trnConfCardButton = $jq.parent().find('[' + sFormObj_attrs.btnTrnConfCard + ']');
			if (trnConfCardButton.length > 0) {
				this.drawTrnConfCardHtml(trnConfCardButton);
			}
		},
		
		/**
		 * 필요한 서비스 영역 append
		 */
		preapreSvcDiv : function($jq) {
			// [즉시이체]출금가능금액 (초기 진입시) [fnt_trn_010101_1.html]
			var fnt_trn_010101_3 = '<div id="fnt_trn_010101_3" '
					+ 'data-jx-svc="fnt_trn_010101_3_stress" '
					+ 'data-jx-svc-package="fnt_trn" '
					+ 'data-jx-svc-gubn="code_btn_trn0000" '
					+ 'data-jx-svc-target="#step1@_tran_res_data[0]" '
					+ 'data-jx-svc-errtrx="false" '
					+ 'data-jx-svc-handler-in="trnform_fnt_trn_010101_3.uf_in()" '
					+ 'data-jx-svc-handler-out="trnform_fnt_trn_010101_3.uf_out()" '
					+ 'data-jx-svc-execute="FUNC@trnform_fnt_trn_010101_3.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_010101_3);
			jex.setJexObj($("#fnt_trn_010101_3"));
			
			// [급여이체] 등록내역선택 불러오기 [fnt_trn_030101_1.html]
			var fnt_trn_030101_1 = '<div id="fnt_trn_030101_1" '
				+ 'data-jx-svc="fnt_trn_030101_1" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-target="#'+this.formIds.rgstInfoListTbl+'@_tran_res_data[0]" '
				+ 'data-jx-svc-errtrx="false" '
				+ 'data-jx-svc-handler-out="fnt_trn_030101_1.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@fnt_trn_030101_1.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_030101_1);
			
			// [급여이체] 등록내역선택[fnt_trn_030101_1.html] :: 급여이체 파일집계내역조회
			var fnt_trn_030101_2 = '<div id="fnt_trn_030101_2" '
				+ 'data-jx-svc="fnt_trn_030101_2" '
				+ 'data-jx-svc-package="fnt_trn" '
				//+ 'data-jx-svc-target="#step1@_tran_res_data[0]" '
				+ 'data-jx-svc-target="#'+$jq.attr("data-jx-tranform-btn-pay-rgst-info")+'@_tran_res_data[0]" '
				+ 'data-jx-svc-handler-in="fnt_trn_030101_2.uf_in()" '
				+ 'data-jx-svc-handler-out="fnt_trn_030101_2.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@fnt_trn_030101_2.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_030101_2);
			
			// [급여이체] 최근전송내역 목록삭제[fnt_trn_030101_1.html]
			var fnt_trn_030101_3 = '<div id="fnt_trn_030101_3" '
				+ 'data-jx-svc="fnt_trn_030101_3" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-target="#'+$jq.attr("data-jx-tranform-btn-pay-rgst-info")+'@_tran_res_data[0]" '
				+ 'data-jx-svc-handler-in="fnt_trn_030101_3.uf_in()" '
				+ 'data-jx-svc-handler-out="fnt_trn_030101_3.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@fnt_trn_030101_3.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_030101_3);
			
			//[자주쓰는계좌]지정입금계좌 정보 가져오기
			var fnt_trn_090101_1 = '<div id="fnt_trn_090101_1" '
				+ 'data-jx-svc="fnt_trn_090101_1" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-target="@_tran_res_data[0]" '
				+ 'data-jx-svc-handler-in="fnt_trn_090101_1.uf_in()" '
				+ 'data-jx-svc-handler-out="fnt_trn_090101_1.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@fnt_trn_090101_1.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_090101_1);
			
			//[팩스(FAX) 전송]
			var fnt_trn_010101_8 = '<div id="fnt_trn_010101_8" '
				+ 'data-jx-svc="fnt_trn_010101_8" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-target="@_tran_res_data[0]" '
				+ 'data-jx-svc-handler-in="fnt_trn_010101_8.uf_in()" '
				+ 'data-jx-svc-handler-out="fnt_trn_010101_8.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@fnt_trn_010101_8.uf_exec()" style="display:none"></div>';
			$('body').append(fnt_trn_010101_8);
			
			// [공과금]은행선택 > 국세/지압세입/국고금 > 국세상세조회
			var svc_fnt_pbc_030101_3 = '<div id="svc_fnt_pbc_030101_3" '
				+ 'data-jx-svc="fnt_pbc_030101_3" '
				+ 'data-jx-svc-package="fnt_pbc" '
				+ 'data-jx-svc-errtrx="false" '
				+ 'data-jx-svc-handler-in="svc_fnt_pbc_030101_3.uf_in()" '
				+ 'data-jx-svc-handler-out="svc_fnt_pbc_030101_3.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@svc_fnt_pbc_030101_3.uf_exec()" style="display:none"></div>';
			$('body').append(svc_fnt_pbc_030101_3);
			
			// [공과금]은행선택 > 국세/지방세입/국고금 > 지방세상세조회
			var svc_fnt_pbc_020101_4 = '<div id="svc_fnt_pbc_020101_4" '
				+ 'data-jx-svc="fnt_pbc_020101_4" '
				+ 'data-jx-svc-package="fnt_pbc" '
				+ 'data-jx-svc-handler-in="svc_fnt_pbc_020101_4.uf_in()" '
				+ 'data-jx-svc-handler-out="svc_fnt_pbc_020101_4.uf_out()" style="display:none"></div>';
			$('body').append(svc_fnt_pbc_020101_4);
			
			// [공과금]은행선택 > 국세/지압세입/국고금 > 국고금상세조회
			var svc_fnt_pbc_030101_5 = '<div id="svc_fnt_pbc_030101_5" '
				+ 'data-jx-svc="fnt_pbc_030101_5" '
				+ 'data-jx-svc-package="fnt_pbc" '
				+ 'data-jx-svc-errtrx="false" '
				+ 'data-jx-svc-handler-in="svc_fnt_pbc_030101_5.uf_in()" '
				+ 'data-jx-svc-handler-out="svc_fnt_pbc_030101_5.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@svc_fnt_pbc_030101_5.uf_exec()" style="display:none"></div>';
			$('body').append(svc_fnt_pbc_030101_5);
			
			//[초기 진입시] 최근출금계좌 자동 세팅
			var trnform_init_fnt_trn_010101_1 = '<div id="trnform_init_fnt_trn_010101_1" '
				+ 'data-jx-svc="fnt_trn_010101_1" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-target="@_tran_res_data[0]" '
				+ 'data-jx-svc-handler-in="trnform_init_fnt_trn_010101_1.uf_in()" '
				+ 'data-jx-svc-handler-out="trnform_init_fnt_trn_010101_1.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@trnform_init_fnt_trn_010101_1.uf_exec()" style="display:none"></div>';
			$('body').append(trnform_init_fnt_trn_010101_1);
			
			// [MMT 이체] 신규 추가 2022.04.01 추가
			var trnform_fnt_trn_250101_2 = '<div id="trnform_fnt_trn_250101_2" '
				+ 'data-jx-svc="fnt_trn_250101_2" '
				+ 'data-jx-svc-package="fnt_trn" '
				+ 'data-jx-svc-gubn="" '
				+ 'data-jx-svc-target="#step1@_tran_res_data[0]" '
				+ 'data-jx-svc-errtrx="false" '
				+ 'data-jx-svc-handler-in="trnform_fnt_trn_250101_2.uf_in()" '
				+ 'data-jx-svc-handler-out="trnform_fnt_trn_250101_2.uf_out()" '
				+ 'data-jx-svc-execute="FUNC@trnform_fnt_trn_250101_2.uf_exec()" style="display:none"></div>';
			$('body').append(trnform_fnt_trn_250101_2);
		},
		
		/**
		 * 필요 팝업 append
		 */
		preparePopup : function($jq) {
			//반투명 : popOpen
			//풀화면 : fullpopOpen
			// [이체한도] 팝업
			/*var acntDetailPopupHtml = ""
				+ '<div class="popup popupwrap" id="acctDetailView" data-jx-dialog="" data-jx-dialog-close="#popBtmClose" data-jx-dialog-modal="true" data-jx-dialog-position=","  style="display:none;">'
					+ '<div class="m_bgbox" role="alert">'
						+ '<div class="m_poptop"><p class="poptitle">이체한도안내</p></div>'
						+ '<div class="m_popmid2">'
							+ '<div id="IScroller">'
								+ '<ul class="list_ty01 small" id="acctDetailViewInfo">'
									+ '<li>'
										+ '<span>고객 1일 이체한도</span>'
										+ '<span class="right_info">'
											+ '<span id="TRLM_AMT_01" data-jx-formatter="number"></span><span>원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span>고객 1회 이체한도</span>'
										+ '<span class="right_info">'
											+ '<span id="TRLM_AMT_02" data-jx-formatter="number"></span><span>원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li id="acctDetailViewInfo_tr_03">'
										+ '<span>계좌 1일 이체한도</span>'
										+ '<span class="right_info">'
											+ '<span id="TRLM_AMT_03" data-jx-formatter="number"></span><span>원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li id="acctDetailViewInfo_tr_04">'
										+ '<span>고객 1일 잔여한도</span>'
										+ '<span class="right_info">'
											+ '<span id="TRLM_AMT_04" data-jx-formatter="number"></span><span>원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li id="acctDetailViewInfo_tr_05">'
										+ '<span>계좌 1일 잔여한도</span>'
										+ '<span class="right_info">'
											+ '<span id="TRLM_AMT_05" data-jx-formatter="number"></span><span>원</span>'
										+ '</span>'
									+ '</li>'
								+ '</ul>'
							+ '</div>'
						+ '</div>'
						+ '<div class="m_popbtm one">'
							+ '<button type="button" id="popBtmClose">확인</button>'
						+ '</div>' 
					+ '</div>' 
				+ '</div>';
			$('body').append(acntDetailPopupHtml); //[이체한도]
			jex.setJexObj($('#acctDetailView'));
			*/
			var mmtAcntDetailPopupHtml = ""
				+ '	<div class="layer_popup_wrap" id="mmtAcctDetailView">'
				+ '		<div class="layer_popup">'
				+ '	    	<div class="layer_popup_body">'
				+ '				<div class="group_item">'
				+ '             	<div class="group_item_detail">'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">원본금액</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="money" id="ORCP_AMT"></span>'
				+ '								<span class="txt_unit">원</span>'
				+ '							</span>'
				+ '						</p>'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">신탁보수</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="money" id="BSC_RMNR_AMT"></span>'
				+ '								<span class="txt_unit">원</span>'
				+ '							</span>'
				+ '						</p>'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">이자금액</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="money" id="TRPF_AMT"></span>'
				+ '								<span class="txt_unit">원</span>'
				+ '							</span>'
				+ '						</p>'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">신탁보수율</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="rate" id="TRST_RMNR_RT"></span>'
				+ '							</span>'
				+ '						</p>'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">수익률</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="rate" id="MNIE_RT"></span>'
				+ '							</span>'
				+ '						</p>'
				+ '						<p class="line" role="text">'
				+ '							<span class="line_left">'
				+ '								<span class="tit">소득기간</span>'
				+ '							</span>'
				+ '							<span class="line_right">'
				+ '								<span class="date" id="TRSR_YMD"></span>'
				+ '							</span>'
				+ '						</p>'
				+ '					</div>'
				+ '				</div>'
				+ '			</div>'
				+ '			<div class="layer_popup_footer">'
				+ '				<button type="button" class="btn s_4 c_3 r_2" onclick="comLayerPopUtil.close(\'mmtAcctDetailView\');">확인</button>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';
				
			$('body').append(mmtAcntDetailPopupHtml); //[이체한도]
			jex.setJexObj($('#mmtAcctDetailView'));
			
			//[은행, 증권사]목록처리  _this.mnrcBankList를 사용해서 draw
			var bankListPopupHtml = ""
				+'<div id="bankListStep" class="bottom_popup_wrap" style="display:none;">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">기관 선택</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'bankListStep\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body agency_select_popup">'
							+ '<div class="agency_select_wrap">'
								+ '<div class="agency_select_wrap_title">은행</div>'
								+ '<ul class="agency_select_list" role="listbox" id="bankList1">'
								+ '</ul>'
								+ '<div class="agency_select_wrap_title" '+ (/fnt_trn_110101_1.html/.test(document.baseURI)?"":'style="display:none;"') +'>국세/지방세</div>'
								+ '<ul class="agency_select_list" role="listbox" id="bankList2" '+ (/fnt_trn_110101_1.html/.test(document.baseURI)?"":'style="display:none;"') +'>'
								+ '</ul>'
								+ '<div class="agency_select_wrap_title">증권사</div>'
								+ '<ul class="agency_select_list" role="listbox" id="bankList3">'
								+ '</ul>'
							+ '</div>'
						+ '</div>'
					+ '</div>'	
				+'</div>';
			
			// [은행, 증권사]목록처리
			bankListPopupHtml = $(bankListPopupHtml);
			
			$('#step').append(bankListPopupHtml);
			jex.setJexObj($('#bankListStep'));
			
			//[은행, 증권사]목록처리  오픈뱅킹참가기관 목록
			var bankListOpenPopupHtml = ""
				+'<div id="bankListOpenStep" class="bottom_popup_wrap" style="display:none;">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">기관 선택</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'bankListOpenStep\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body agency_select_popup">'
							+ '<div class="agency_select_wrap">'
								+ '<div class="agency_select_wrap_title">은행</div>'
								+ '<ul class="agency_select_list" role="listbox" id="openBankList1">'
								+ '</ul>'
								+ '<div class="agency_select_wrap_title">증권사</div>'
								+ '<ul class="agency_select_list" role="listbox" id="openBankList3">'
								+ '</ul>'
							+ '</div>'
						+ '</div>'
					+ '</div>'	
				+'</div>';
			
			// [은행, 증권사]목록처리
			bankListOpenPopupHtml = $(bankListOpenPopupHtml);
			
			$('#step').append(bankListOpenPopupHtml);
			jex.setJexObj($('#bankListOpenStep'));
			
			// [수수료면제안내]
			/*var feeDutyPopupHtml = ""
				+ '<div class="popup popupwrap" id="feeDutyPopup" data-jx-dialog="" data-jx-dialog-close="#popBtmClose" data-jx-dialog-modal="true" data-jx-dialog-position="," style="display:none;">'
					+ '<div class="m_bgbox">'
						+ '<div class="m_poptop"><p class="poptitle">수수료면제안내</p></div>'
						+ '<div class="m_popmid2" id="feeDutyPopupInfo">'
							+ '<div id="IScroller">'
								+ '<div class="bd_t">'
									+ '<span>기준일시</span>'
									+ '<span id="feeDuty_curdate" data-jx-formatter="date"></span>'
									+ '<span id="feeDuty_curtime" data-jx-formatter="time"></span>'
								+ '</div>'
								+ '<ul class="list_ty01 small">'
									+ '<li>'
										+ '<span>계좌번호</span>'
										+ '<span class="right_info" id="CUS_ACN"></span>'
									+ '</li>'
									+ '<li>'
										+ '<span>면제사유</span>'
										+ '<span class="right_info" id="EXMP_RSN_NM"></span>'
									+ '</li>'
									+ '<li>'
										+ '<span>면제(가능횟수/한도)</span>'
										+ '<span class="right_info" id="LMT_AMT_DISPLAY"></span>'
									+ '</li>'
									+ '<li>'
										+ '<span>잔여(횟수/한도)</span>'
										+ '<span class="right_info" id="REST_LIMIT_DISPLAY"></span>'
									+ '</li>'
									+ '<li>'
										+ '<span>면제율</span>'
										+ '<span class="right_info">'
											+ '<span id="FEEX_RT" data-jx-formatter="number"></span>'
											+ '<span>%</span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span>면제적용시작일</span>'
										+ '<span class="right_info" id="VALD_STTG_YMD" data-jx-formatter="date"></span>'
									+ '</li>'
									+ '<li>'
										+ '<span>면제적용종료일</span>'
										+ '<span class="right_info" id="VALD_FNSH_YMD" data-jx-formatter="date"></span>'
									+ '</li>'
								+ '</ul>'
								+ '<div class="m_popmid">'
									+ '<ul class="dot_txt_s">'
										+ '<li>수수료 면제조건이 변경될 경우 이체시점에 수수료면제가 적용되지 않을 수 있습니다.</li>'
										+ '<li>수수료 면제는 출금계좌별로 다를 수 있으니 수수료면제 가능한 출금계좌를 선택하시기 바랍니다.</li>'
										+ '<li>상품 및 서비스 등은 월별 수수료 우대조건 충족에 따라 수수료면제가 적용되지 않을 수 있습니다.</li>'
										+ '<li>수수료 면제조건 미 충족 시 타행이체 수수료 건당 500원이 발생됩니다.</li>'
									+ '</ul>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="m_popbtm one">'
							+ '<button type="button" id="popBtmClose">확인</button>'
						+ '</div>' 
					+ '</div>' 
				+ '</div>';
			$('body').append(feeDutyPopupHtml); //[수수료면제안내]
			jex.setJexObj($('#feeDutyPopup'));
			*/
		},
		
		/**
		 * [이체한도] 버튼 : 출금가능금액
		 */
		drawAcntDetailButtonHtml : function($jq) {
			$jq.attr('data-jx-execute'         , 'click')
				.attr('data-jx-svc'            , 'fnt_trn_010101_3')
				.attr('data-jx-svc-package'    , 'fnt_trn')
				.attr('data-jx-svc-errtrx'     , 'false')
				.attr('data-jx-svc-target'     , '#acctDetailViewInfo@_tran_res_data[0]')
				.attr('data-jx-svc-handler-in' , 'trnform_fnt_trn_010101_3.uf_in()')
				.attr('data-jx-svc-handler-out', 'trnform_fnt_trn_010101_3.uf_out()')
				.attr('data-jx-svc-execute'    , 'FUNC@trnform_fnt_trn_010101_3.uf_exec()');
			jex.setJexObj($jq);
		},
		
		/**
		 * [내이체함](이체)
		 */
		drawFavTrnButtonHtml : function($jq) {
			_this.setterFavTrnUse = ""; //자주쓰는이체 setter
			_this.trnformUseSvcId = $jq.attr("data-jx-tranform-btn-favorite-trn"); //메뉴ID(서비스하는 페이지)
			
			if("fnt_trn_110101_1" == _this.trnformUseSvcId) { 
				$jq.attr('data-jx-execute'         , 'click');
				$jq.attr('data-jx-svc'            , 'fnt_trn_010101_9');
				$jq.attr('data-jx-svc-package'    , 'fnt_trn');
				$jq.attr('data-jx-svc-target'     , '#' + this.formIds.favTrnListTbl + '@_tran_res_data[0]');
				$jq.attr('data-jx-svc-handler-out', 'fnt_trn_010101_9.uf_out()');
				$jq.attr('data-jx-svc-execute'    , 'FUNC@fnt_trn_010101_9.uf_exec()');
			} else {
				
				$jq.attr('data-jx-execute'         , 'click');
				$jq.attr('data-jx-svc'            , 'fnt_trn_010101_5');
				$jq.attr('data-jx-svc-package'    , 'fnt_trn');
				$jq.attr('data-jx-svc-target'     , '#' + this.formIds.favTrnListTbl + '@_tran_res_data[0]');
				$jq.attr('data-jx-svc-handler-out', 'fnt_trn_010101_5.uf_out()');
				$jq.attr('data-jx-svc-execute'    , 'FUNC@fnt_trn_010101_5.uf_exec()');
			}
			
			/**
			 * 자주쓰는이체 step
			 */
			var favTrnStepHtml = ""
			+ '<div id="favTrnStep" data-jx-step-no="4000" data-jx-effect="slide" style="display:none;">'
				+ '<div class="content_wrap">'
					+ '<div class="group">'
						+ '<div class="transfer_first_input">'
							+ '<div class="input has_search line_ty1">'
								+ '<input id="trnform_search_word" type="text" title="‘내 이체함 제목’으로 검색" placeholder="‘내 이체함 제목’으로 검색" data-jx-chk="true" data-jx-chk-opt=\'{"name":"검색어 입력","nullable":false,"maxLength":10,"charType":"korEngNum","userChar":"-"}\' >'
								+ '<button id="trnform_search_btn" type="submit" class="search" title="검색"></button>'
							+ '</div>'
						+ '</div>'
						+ '<ul id="'+ this.formIds.favTrnListTbl + '" data-jx-list="" class="space_list_ty1 mt_24">'
							+ '<li>'
								+ '<div class="card_item" role="button" class="block" '
									+ 'data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="parent" '
									+ 'data-jx-setter-handler="uf_setter_favTrnListTbl()" '
									+ 'data-jx-setter-target="#' + window._tranForm.id + '" '
									+ 'data-jx-setter-execute="" '
									+ '>'
									+ '<a href="javascript:;" role="button" class="block">'
										+ '<div class="acount_item ty4">'
											+ '<div class="ico_box ty1 ico_bank_000 top"></div>'
											+ '<div class="item">'
												+ '<div class="badge_cont">'
													+ '<span id="uMractDsgtAcnY" class="badge ty3 colorETC5" style="display:none;">입금지정계좌</span>'
												+ '</div>'
												+ '<div class="item_top" id="EBNK_FRUS_TRN_NM"></div>'
												+ '<div class="item_bottom">'
													+ '<span id="BANK_NM"></span>'
													+ '<span id="mnrc_acn"></span>'
												+ '</div>'
											+ '</div>'
										+ '</div>'
										+ '<div class="card_item_detail">'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">이체금액</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="money" id="EBNK_TRN_AMT" data-jx-formatter="number"></span>'
													+ '<span class="txt_unit">원</span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">받는 분 통장 표기</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="EBNK_MNRC_BNPR_CON"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">내 통장 표기</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="EBNK_DROT_BNPR_CON"></span>'
												+ '</span>'
											+ '</p>'
										+ '</div>'
									+ '</a>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
						+ '<ul id="no_search_data"  style="display:none">'
							+ '<li>'
								+ '<div class="no_result_msg">'
									+ '	<div class="msg">조회 결과가 없습니다</div>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
						+ '<ul id="menu_02"  style="display:none">'
							+ '<li>'
								+ '<div class="no_result_msg">'
									+ '<div class="msg">‘내 이체함’에<br />이체정보가 없습니다.</div>'
									+ '<button type="button"  class="btn s_3 c_1 r_3 edit" data-jx-execute="click" data-jx-execute-target="FUNC@uf_goFavTrnEditPage()"><span class="text">이체정보 등록</span></button>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
						+ '<div class="mt_32 ta_c" id="search_data_edit"  style="display:none">'
							+ '<button type="button" class="btn s_3 c_1 r_3 edit" data-jx-execute="click" data-jx-execute-target="FUNC@uf_goFavTrnEditPage()"><span class="text">내 이체함 편집</span></button>'
						+ '</div>'
					+ '</div>'	
				+ '</div>'		
			+ '</div>';
			
			favTrnStepHtml = $(favTrnStepHtml);
			$('#step').append(favTrnStepHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#favTrnStep'));
						
			//[자주쓰는이체](즉시이체 등)
			favTrnStepHtml.find("#trnform_search_btn").on('click', function(evt) { //검색 Click Event
				var search_word = $.trim($("#favTrnStep #trnform_search_word").val());
				var cnt = 0;
				
				$("#favTrnListTbl #EBNK_FRUS_TRN_NM").each(function(idx){
					var targetWord = $.trim($(this).text());
					if (targetWord.indexOf(search_word) < 0) {
						$($("#favTrnListTbl"+" .card_item")[idx]).hide();
						
					} else {
						$($("#favTrnListTbl"+" .card_item")[idx]).show();
						cnt++;
					}
				});
				if(cnt < 1) {
					$("#favTrnStep #no_search_data").show(); //검색 결과가 없습니다.
					$("#favTrnStep #search_data_edit").hide();
				} else {
					$("#favTrnStep #no_search_data").hide();
					$("#favTrnStep #search_data_edit").show();
				}
			});
		},
		
		
		/**
		 * [출금계좌정보 & 선택 리스트] 팝업
		 */
		drawDrocAcntAreaHtml : function($jq) {
			//this.isSelectUI = $jq.attr(sFormObj_attrs.areaDrotAcntSelect) ? eval($jq.attr(sFormObj_attrs.areaDrotAcntSelect)) : false;
			var drotTitle = $jq.attr(sFormObj_attrs.areaDrotAcntTitle) ? $jq.attr(sFormObj_attrs.areaDrotAcntTitle) : "계좌선택";
			
			window._tranForm.drotAcntViewType = $jq.attr(sFormObj_attrs.areaDrotAcnt);
			var acntListPopupHtml = ""
			if("fnt_trn_110101_1" == window._tranForm.drotAcntViewType) {	
				
				acntListPopupHtml = ""
				+ '<div id="acntListPopup" style="display:none;" class="bottom_popup_wrap">'
				+ '<div class="bottom_popup">'
					+ '<div class="bottom_popup_header">'
						+ '<h2 class="tit">출금계좌선택</h2>'
						+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'acntListPopup\');">닫기</button>'
					+ '</div>'
					+ '<div class="bottom_popup_body tab_in">'
						+ '<div class="tab_list ty1" role="tablist">'
							+ '<button type="button" role="tab" aria-selected="true" class="active">기업은행</button>'
							+ '<button type="button" role="tab" aria-selected="false" onclick="uf_opnDrotAcntInfo();">다른은행</button>'
						+ '</div>'

						+ '<div class="tab_cont active" role="tabpanel" aria-expanded="true">'
							+ '<ul class="select_list ty3 mt_24" role="listbox" id="' + this.formIds.acntListTbl + '" data-jx-list="' + this.formIds.acntListTbl + '">'
								+ '<li class="acount_select_item" role="option" aria-selected="false" tabindex="-1"' 
								+ 'data-jx-execute="click" '
								+ 'data-jx-setter="" '
								+ 'data-jx-setter-source="this" '
								+ 'data-jx-setter-handler="p_acntListSetter()" '
								+ 'data-jx-setter-target="#' + window._tranForm.formIds.drotAcntInfoId + '" '
								+ 'data-jx-setter-execute="">'
								//+ 'data-jx-setter-execute="FUNC@uf_back(),FUNC@$(\'#mnrc_acno\').focusout()">'
										+ '<div class="item">'
											+ '<div class="item_top">'
												//+ '<span class="badge ty3 colorB5">개인</span>'//<span class="badge ty3 colorD3">사업자</span> 법인은 없음
												+ '<div class="item_top_text" id="ACNT_NM"></div>'
												//+ '<span class="main_trans">주거래 통장</span>'
											+ '</div>'
											+ '<div class="acount_item ty4 small">'
												+ '<div class="ico_box ty3 ico_bank_003"></div>'
												+ '<div class="item">'
													+ '<div class="item_top">기업 <span id="EBNK_ACN" data-jx-formatter="account"></span></div>'
												+ '</div>'
											+ '</div>'
										+ '</div>'
								+ '</li>'
							+ '</ul>'
							+ '<ul id="EMPTY" style="display:none">'
								+ '<li><div class="no_result_msg"><div class="msg">출금계좌가 없습니다.</div></div></li>'
							+ '</ul>'
						+ '</div>'
						+ '<div class="tab_cont" role="tabpanel" aria-expanded="true">'
							+ '<ul class="select_list ty3 mt_24" role="listbox" id="' + this.formIds.myOpnDrotAcntListTbl + '" data-jx-list="' + this.formIds.myOpnDrotAcntListTbl + '">'
							+ '<li class="acount_select_item" role="option" tabindex="-1" aria-selected="false" '
							+ 'data-jx-execute="click" '
							+ 'data-jx-setter="" '
							+ 'data-jx-setter-source="this" '
							+ 'data-jx-setter-handler="p_openAcntListSetter()" '
							+ 'data-jx-setter-target="#' + window._tranForm.formIds.drotAcntInfoId + '" '
							+ 'data-jx-setter-execute="">'
								+ '<div class="item">'
									+ '<div class="item_top">'
										+ '<div class="item_top_text" id="OPBN_ANM_ACNT_NM"></div>'
									+ '</div>'
									+ '<div class="acount_item ty4 small">'
										+ '<div class="ico_box ty3 ico_bank_000"></div>'
										+ '<div class="item">'
											+ '<div class="item_top"><span id="BANK_NM"></span><span id="RGSN_ACN"></span></div>'
										+ '</div>'
									+ '</div>'
									+ '<div id="skeleton_proc" class="item_top skeleton">'
										+ '<div class="item_top_text" id="OPN_DROT_ABL_AMT"></div>'
									+ '</div>'
								+ '</div>'
									/*
									+ '<div class="acount_select_item" role="button" aria-selected="false">'
										+ '<div class="item">'
											+ '<div class="item_top">'
												+ '<div class="ico_box ty1 ico_bank_000"></div>'
												+ '<span id="BANK_NM"></span><span id="RGSN_ACN"></span>'
												+ '<input id="OPBN_BNCD" type="hidden" value="">'
											+ '</div>'
											+ '<div class="item_bottom"><span id="OPBN_ANM_ACNT_NM"></div>'
										+ '</div>'
									+ '</div>'
									*/
								+ '</li>'
							+ '</ul>'
							+ '<div class="no_result_msg" id="EMPTY1" style="display:none">'
								+ '<div class="msg">다른 은행 계좌를 등록하셔야 이용이 가능합니다</div>'
									+ '<div class="btn_area center">'
										+ '<button type="button" class="btn plus" data-jx-execute="click" data-jx-execute-target="FUNC@goTranResult(\'4\')"><span class="text">다른은행 계좌 등록</span></button>'
									+ '</div>'
									+ '<div class="ps_box">보이스피싱 피해 방지를 위해 오픈뱅킹 최초 계좌 등록일 포함 3일간 이체 거래가 제한됩니다 </div>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
			+ '</div>';
		
			} else {
				acntListPopupHtml = ""
					+ '<div id="acntListPopup" style="display:none;" class="bottom_popup_wrap">'
						+ '<div class="bottom_popup">'
							+ '<div class="bottom_popup_header">'
								+ '<h2 class="tit">출금계좌선택</h2>'
								+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'acntListPopup\');">닫기</button>'
							+ '</div>'
							+ '<div class="bottom_popup_body">'
								+ '<ul class="select_list ty3 mt_24" role="listbox" id="' + this.formIds.acntListTbl + '" data-jx-list="' + this.formIds.acntListTbl + '">'
									+ '<li '
									+ 'data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="this" '
									+ 'data-jx-setter-handler="acntListSetter()" '
									+ 'data-jx-setter-target="#' + window._tranForm.formIds.drotAcntInfoId + '" '
									+ 'data-jx-setter-execute="" class="account_list_item" role="option" tabindex="-1" aria-selected="false">'
										+ '<div class="item">'
											+ '<div class="item_top">'
												+ '<div class="item_top_text" id="ACNT_NM"></div>'
											+ '</div>'
											+ '<div class="item_bottom">'
												+ '<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
												+ '<input id="EFNC_BNCD" type="hidden" value="003">'
												+ '<input id="ECFN_BNNM" type="hidden" value="기업은행">'
											+ '</div>'
										+ '</div>'
									+ '</li>'
								+ '</ul>'
							+ '</div>'
						+ '</div>'
				+ '</div>';
			
			}
			
			$('#step').append(acntListPopupHtml);
			jex.setJexObj($('#acntListPopup'));
		
			var acntAreaHtml = ""; 
			if("fnt_trn_110101_1" == window._tranForm.drotAcntViewType) {
				acntAreaHtml = ""
					+ '<div id="' + this.formIds.drotAcntInfoId + '" class="acount_item_select ty1">'
						+ '<div id="trnform_area_drot" class="acount_item ty3" role="button" title="계좌선택 목록보기">'
							+ '<div class="badge_cont">'
								//+ '<span class="badge ty3 colorB5">개인</span>'
								+ '<span class="txt_style ty6 fw_4"><span id="ACNT_NM"></span></span>'
							+ '</div>'
							+ '<div class="acount_item ty4 small">'
								+ '<div id="drot_bncd_logo" class="ico_box ty3 ico_bank_003"></div>'
								+ '<div class="item">'
								+ '<div class="item_top"><span id="EBNK_NM"></span> <span  id="EBNK_ACN" data-jx-formatter="account"></span></div>'
								+ '<input id="EBNK_CD" type="hidden" value="">'
								//+ '<input id="EBNK_NM" type="hidden" value="">'
							+ '</div>'
						+ '</div>'
					+ '</div>'
					+ '<div class="tooltip_box">'
						+ '<span class="acount_item_select_money">출금가능액 : <span id="pvamt_for" data-jx-formatter="account"></span>원</span>'
						+ '<div class="tooltip_wrap ty1" id="trlm_view">'
							+ '<button data-jx-tranform-btn-acnt-detail="code_trn0001" id="btn_trlm_view" type="button" class="tooltip_open" aria-expanded="false">도움말 보기</button>'
							+ '<div class="tooltip_wrap_container" role="tooltip">'
								+ '<div class="inner">'
									+ '<ul id="drot_trlm_info">'
										+ '<li class="txt_style ty5">고객 1일 이체한도 <span id="TRLM_AMT_01" data-jx-formatter="number"></span>원</li>'
										+ '<li class="txt_style ty5">고객 1회 이체한도 <span id="TRLM_AMT_02" data-jx-formatter="number"></span>원</li>'
										+ '<li class="txt_style ty5">계좌 1일 이체한도 <span id="TRLM_AMT_03" data-jx-formatter="number"></span>원</li>'
										+ '<li class="txt_style ty5">고객 1일 잔여한도  <span id="TRLM_AMT_04" data-jx-formatter="number"></span>원</li>'
										+ '<li class="txt_style ty5">계좌 1일 잔여한도  <span id="TRLM_AMT_05" data-jx-formatter="number"></span>원</li>'
									+ '</ul>'
								+ '</div>'
								+ '<button type="button" class="tooltip_close">도움말 닫기</button>'
							+ '</div>'
						+ '</div>'
						+ '<div class="tooltip_wrap ty1" id="trlm_view_opn"  style="display:none">'
							+ '<button id="btn_trlm_view_opn" type="button" class="tooltip_open" aria-expanded="false">도움말 보기</button>'
							+ '<div class="tooltip_wrap_container" role="tooltip">'
								+ '<div class="inner">'
									+ '<ul>'
										+ '<li class="txt_style ty5">오픈뱅킹 출금한도는 이용기관 통합 1일 1천만원이예요</li>'
									+ '</ul>'
								+ '</div>'
								+ '<button type="button" class="tooltip_close">도움말 닫기</button>'
							+ '</div>'
						+ '</div>'
					//+ '</div>'
				+ '</div>';
			} 
			else if("fnt_trn_030101_1" == window._tranForm.drotAcntViewType) {
				acntAreaHtml = ""
					+ '<div id="' + this.formIds.drotAcntInfoId + '" class="acount_item_select ty1 mt_16">'
						+ '<div id="trnform_area_drot" class="acount_item ty3" role="button" title="계좌선택 목록보기">'
							+ '<div class="badge_cont">'
								//+ '<span class="badge ty3 colorB5">개인</span>'
								+ '<span class="txt_style ty6 fw_4"><span id="ACNT_NM"></span></span>'
							+ '</div>'
							+ '<div class="acount_item ty4 small">'
								//+ '<div class="ico_box ty3 ico_bank_003"></div>'
								+ '<div class="item">'
									+ '<div class="item_top"><span  id="EBNK_ACN" data-jx-formatter="account"></span></div>'
									+ '<input id="EBNK_CD" type="hidden" value="">'
									+ '<input id="EBNK_NM" type="hidden" value="">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<span class="acount_item_select_money">출금가능액 : <span id="pvamt_for" data-jx-formatter="account"></span>원</span>'
					+ '</div>';
				
			} 
			else if("fnt_trn_080101_1" == window._tranForm.drotAcntViewType) { //내이체함 출금계좌번호 영역
				acntAreaHtml = ""
					+ '<div id="' + this.formIds.drotAcntInfoId + '">'
					+ '<div id="trnform_area_drot" class="dropdown ty2" role="button" title="출금계좌 선택 목록 보기">'
						+ '<div id="EBNK_ACN" data-jx-formatter="account" class="dropdown_text">선택</div>'
					+ '</div></div>';
					
				/*+ '<div id="' + this.formIds.drotAcntInfoId + '" >'
					+ '<div class="dt">출금계좌 <span class="point">&#91;필수&#93;</span></div>'
					+ '<div class="dd">'
						+ '<div class="dropdown" role="button" title="출금계좌 선택">'
							+ '<span class="txt_placeholder" id="EBNK_ACN" data-jx-formatter="account">선택하세요</span>'
						+ '</div>'
					+ '</div>'
				+ '</div>';*/
			}
			else if("fnt_trn_250101_1" == window._tranForm.drotAcntViewType) {
				acntAreaHtml = ""
					+ '<div id="' + this.formIds.drotAcntInfoId + '" >'
						+ '<div class="acount_item ty3" role="button" title="계좌선택 목록보기" id="trnform_area_drot">'
							+ '<div class="badge_cont">'
								//+ '<span class="badge ty3 colorB5">개인</span>'
								+ '<span class="txt_style ty6 fw_4"><span id ="ACNT_NM"></span></span>'
							+ '</div>'
							+ '<div class="acount_item ty4 small">'
								//+ '<div class="ico_box ty3 ico_bank_003"></div>'
								+ '<div class="item">'
									+ '<div class="item_top"><span id="EBNK_ACN" data-jx-formatter="account"></span></div>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						//+ '<span class="acount_item_select_money">출금가능액 : <span id="pvamt_for" data-jx-formatter="account"></span>원</span>'
					+ '</div>';
				}
			else { // Default
				acntAreaHtml = ""
					+ '<div class="acount_item_select ty1 mt_0" id="' + this.formIds.drotAcntInfoId + '" >'
						+ '<div class="acount_item ty3" role="button" title="계좌선택 목록보기" id="trnform_area_drot">'
							+ '<div class="badge_cont">'
								//+ '<span class="badge ty3 colorB5">개인</span>'
								+ '<span class="txt_style ty6 fw_4"><span id ="ACNT_NM"></span></span>'
							+ '</div>'
							+ '<div class="acount_item ty4 small">'
								//+ '<div class="ico_box ty3 ico_bank_003"></div>'
								+ '<div class="item">'
									+ '<div class="item_top"><span id="EBNK_ACN" data-jx-formatter="account"></span></div>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<span class="acount_item_select_money">출금가능액 : <span id="pvamt_for" data-jx-formatter="account"></span>원</span>'
						+ '</div>'	
					+ '</div>';
			}
			acntAreaHtml = $(acntAreaHtml);
			
			/*$("#myOpnDrotAcntListTbl").trigger('click');
			acntAreaHtml.find("#EBNK_ACN").on('click', function(evt) {
				//오픈뱅킹잔액조회 별도로 가져온다
				$("#myOpnDrotAcntListTbl").find("li").each(function(idx, obj) {
					var rowData = $(obj).data("_JEX_GETALL_DATA_");
					
					$(obj).find("#skeleton_proc").removeClass("skeleton"); //스켈레톤 삭제처리
					uf_getDrotAblAmt(idx,rowData["OPBN_BNCD"], rowData["RGSN_ACN"]); //오픈뱅킹 계좌잔액조회
					
				});
			});*/

			
			//$jq.on('click', function(evt) {                            //영역전체   Click Event
			//acntAreaHtml.find("#EBNK_ACN").on('click', function(evt) {   //출금계좌만 Click Event
			acntAreaHtml.find("#trnform_area_drot").on('click', function(evt) {   //출금계좌영역Click Event	
				if((undefined != _this.payAcntList && _this.payAcntList.length == 0) || (undefined != _this.openDrotAcntList && _this.openDrotAcntList.length ==0)) { //출금계좌가없을시
					if(undefined != _this.payAcntList && _this.payAcntList.length == 0) {
						$('#acntListPopup #EMPTY').show();
					}
					if(undefined != _this.openDrotAcntList && _this.openDrotAcntList.length == 0) {
						$('#acntListPopup #EMPTY1').show();
					}
					$('#acntListPopup').show();
					comLayerPopUtil.open('acntListPopup');
					//MobPopup.showAlertPopup("출금계좌가 없습니다.");
				} else {
					comSelectPopUtil.setActiveClass($(evt.currentTarget));
					if(undefined != _this.payAcntList && _this.payAcntList.length > 0) {
						$('#acntListPopup #EMPTY').hide();
					}
					if(undefined != _this.openDrotAcntList && _this.openDrotAcntList.length > 0) {
						$('#acntListPopup #EMPTY1').hide();
					}
					
					$('#acntListPopup').show();
					comLayerPopUtil.open('acntListPopup');
				
				}
				/*if("fnt_trn_020101_1" == window._tranForm.drotAcntViewType && $("#trnform_area_drot").attr("class").indexOf("disabled") > -1) {
					MobPopup.showAlertPopup("여러계좌이체의 경우 출금계좌는 한개의 계좌만 선택할 수 있습니다. 출금계좌를 각각 다르게 하고자 하는 경우 즉시이체 이용 부탁드립니다.");
				}
				else { //Default
					if(0 == _this.payAcntList.length) { //출금계좌가없을시
						MobPopup.showAlertPopup("출금계좌가 없습니다.");
					} else {
						
						var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
						if (cur_step != 4006) {
							uf_goStep(4006);
						}
					}
				}*/
			});
			
			acntAreaHtml.find("#btn_trlm_view").on('click', function(evt) { 
				$("#step1 #trlm_view").addClass("active");
				$("#step1 #btn_trlm_view").attr("aria-expanded", "true");
			});
			/*
			acntAreaHtml.find("#btn_trlm_view_opn").on('click', function(evt) { 
				$("#step1 #trlm_view_opn").addClass("active");
				$("#step1 #btn_trlm_view_opn").attr("aria-expanded", "true");
			});*/
			
			$jq.html(acntAreaHtml);
			jex.setJexObj($jq);
		},
		
		/**
		 * [은행, 증권사] 정보
		 */
		drawBankAreaHtml : function($jq) {
			// 버튼영역
			var bankAreaHtml ="";
			
			if("fnt_trn_110101_1" == _this.pgId){
					
				bankAreaHtml = '<div id="bank_area_div" class="dropdown ty3" role="button" title="은행 선택 목록 보기" style="display:none">'
									+'<div class="dropdown_text" id="bank_nm">은행/증권사 선택</div>'
									+'<input id="bank_cd" type="hidden" value="">'
									+'</div>';
			
			} else if("svc_bnk_030101_1" == _this.pgId){	// 자주쓰는계좌관리
				bankAreaHtml = '<div class="dropdown_text" id="bank_nm">은행선택</div>'
							  +'<input id="bank_cd" type="hidden" value="">'
							  
			} else if("fnt_trn_080101_1" == window._tranForm.drotAcntViewType){	// 자주쓰는이체관리
				
				bankAreaHtml = '<div id="bank_area_div" class="dropdown ty2" role="button" title="입금은행 선택 목록 보기">'
								+'<div id="bank_nm" class="dropdown_text">은행/증권사 선택</div>'
								+'<input id="bank_cd" type="hidden" value="">'			
							  +'</div>';
			
			} else {
				
				bankAreaHtml = '<div id="bank_area_div" class="dropdown ty2 mt_12" role="button" title="은행/증권사 선택 목록 보기">'
							  		+'<div id="bank_nm" class="dropdown_text">은행/증권사 선택</div>'
							  		+'<input id="bank_cd" type="hidden" value="">'
							  +'</div>';
			}
			
//			var bankAreaHtml = '<div class="dropdown_text" id="bank_nm">은행선택</div>'
//							+'<input id="bank_cd" type="hidden" value="">'
			
//			var bankAreaHtml = '<div id="bank_area_div" class="dropdown" role="button" title="입금은행 보기">'
//				+ '<span id="bank_nm" class="txt_placeholder">선택하세요</span>'
//				+ '<input id="bank_cd" type="hidden" value="">'
//				+ '</div>';
							
			bankAreaHtml = $(bankAreaHtml);
			$jq.html(bankAreaHtml);
			//$jq.find('a').on('click', function(evt) {
			$jq.on('click', function(evt) {
				//사용자입금계좌지정여부[Y/N]
				if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
					uf_user_mract_dsgt_showInfo();
				} else { //Default
					if("fnt_trn_110101_1" == _this.pgId){
						if($("#step1").find("#EBNK_CD").val() =="003") {
							showBankListPopup();
						} else {
							showBankListOpenPopup();
						}
					} else {
						showBankListPopup();
					}
				}
			});
			jex.setJexObj($jq);
		},
		
		/**
		 * [최근입금계좌]
		 */
		drawLatelyAcntButtonHtml : function($jq) {
			$jq.attr('data-jx-execute'         , 'click')
				.attr('data-jx-svc'            , 'fnt_trn_010101_1')
				.attr('data-jx-svc-package'    , 'fnt_trn')
				.attr('data-jx-svc-target'     , '#' + this.formIds.latelyAcntListTbl + '@_tran_res_data[0]')
				.attr('data-jx-svc-handler-in' , 'trnform_fnt_trn_010101_1.uf_in()')
				.attr('data-jx-svc-handler-out', 'trnform_fnt_trn_010101_1.uf_out()')
				.attr('data-jx-svc-execute'    , 'FUNC@trnform_fnt_trn_010101_1.uf_exec()');
			
			//반투명 : popOpen
			//풀화면 : fullpopOpen
		var latelyAcntStepHtml = '';
		
		latelyAcntStepHtml = '<div id="latelyAcntStep" class="bottom_popup_wrap" style="display:none;">'
					+ '<div class="bottom_popup">'
					+ '<div class="bottom_popup_header">'
						+ '<h2 class="tit">최근 입금계좌 선택</h2>'
						+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'latelyAcntStep\');">닫기</button>'
					+ '</div>'
					+ '<div class="bottom_popup_body">'
						+ '<div class="input has_search">'
							+ '<input type="text" id="trnform_search_word" title="받은 분 이름 입력 후 검색" placeholder="받은 분 이름 입력 후 검색" data-jx-chk="true" data-jx-chk-opt=\'{"name":"검색어 입력","nullable":false,"maxLength":10,"charType":"korEngNum","userChar":"-"}\'>'
							+ '<button id="trnform_search_btn" type="submit" type="button" class="search">검색</button>'
							+ '<button type="button" class="del">텍스트삭제</button>'
						+ '</div>'
						+ '<hr aria-hidden="true" class="divider ty1 full" />'
						+ '<ul class="space_list_ty5" id="' + this.formIds.latelyAcntListTbl + '" data-jx-list="' + this.formIds.latelyAcntListTbl + '">'
							+ '<li data-jx-execute="click" '
							+ 'data-jx-setter="" '
							+ 'data-jx-setter-source="this" '
							+ 'data-jx-setter-handler="uf_setter_latelyAcntListTbl()" '
							+ 'data-jx-setter-target="#' + $jq.attr("data-jx-tranform-btn-lately-acnt") + '" ' //current step id
							+ 'data-jx-setter-execute="">'
								+ '<a href="javascript:;" role="button" class="block">'
									+ '<div class="card_item">'
										+ '<div class="acount_item ty4">'
											+ '<div class="ico_box ty3 ico_bank_000"></div>'
											+ '<div class="item">'
												+ '<div class="item_top"><span id="BANK_NM"></span><span id="MNRC_ACNO"></span></div>'
											+ '</div>'
										+ '</div>'
										+ '<div class="card_item_info">'
											+ '<div class="txt6" id="DRW_NM"></div>'
											+ '<div class="txt6" id="RGSN_YMD" data-jx-formatter="date"></div>'
										+ '</div>'
									+ '</div>'
								+ '</a>'
								+ '<div class="btn_area ty1">'
									+ '<button type="button" class="btn s_2 c_1 r_1" '
									+ 'data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="" '
									+ 'data-jx-setter-handler="uf_setter_latelyAcntListTbl_1()" '
									+ 'data-jx-setter-target="#latelyAcntList" '
									+ 'data-jx-setter-execute="FUNC@uf_goMenuAcntMngPage(2)">자주쓰는 계좌 관리</button>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
						+ '<ul>'
							+ '<li>'
								+ '<div id="no_search_data" class="no_result_msg" style="display:none">'
									+ '<div class="msg">찾으시는 계좌가 없습니다.</div>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
						+ '<ul>'
							+ '<li>'
								+ '<div id="latelyAcntStep_html_1" class="no_result_msg" style="display:none">'
									+ '<div class="msg">최근 입금계좌가 없습니다.</div>'
								+ '</div>'
							+ '</li>'
						+ '</ul>'
					+ '</div>'
				+ '</div>'
			+ '</div>';
		
			latelyAcntStepHtml = $(latelyAcntStepHtml);
			$('#step').append(latelyAcntStepHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#latelyAcntStep'));
			
			//[최근입금계좌] 수취인명 : 검색기능 2019.02.12
			latelyAcntStepHtml.find("#trnform_search_btn").on('click', function(evt) { //검색 Click Event
				var search_word = $.trim($("#latelyAcntStep #trnform_search_word").val());
				var cnt = 0;
				$("#latelyAcntListTbl #DRW_NM").each(function(idx){
					var targetWord = $.trim($(this).text());
					if (targetWord.indexOf(search_word) < 0) {
						$($("#latelyAcntListTbl"+" li")[idx]).hide();
					} else {
						$($("#latelyAcntListTbl"+" li")[idx]).show();
						cnt++;
					}
				});
				if(cnt < 1) {
					$("#latelyAcntStep #latelyAcntStep_html_1").hide();
					$("#latelyAcntStep #no_search_data").show(); //검색 결과가 없습니다.
				}
				else{
					$("#latelyAcntStep #latelyAcntStep_html_1").hide();
					$("#latelyAcntStep #no_search_data").hide();
				}
			});
		},
		
		/**
		 * [자주쓰는계좌] (구: 1U0055_SC0)
		 */
		drawFavAcntButtonHtml : function($jq) {
			$jq.attr('data-jx-execute'         , 'click')
				.attr('data-jx-svc'            , 'fnt_trn_090101_1')
				.attr('data-jx-svc-package'    , 'fnt_trn')
				.attr('data-jx-svc-target'     , '@_tran_res_data[0]')
				.attr('data-jx-svc-handler-out', 'fnt_trn_090101_1.uf_out()')
				.attr('data-jx-svc-execute'    , 'FUNC@fnt_trn_090101_1.uf_exec()');
			
			//getFavAcntRowHtml2() <== [자주쓰는계좌] draw
			var favAcntStepHtml = ""
				+ '<div class="bottom_popup_wrap" id="favAcntStep" style="display:none;">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">자주쓰는 입금계좌 선택</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'favAcntStep\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body">'
							+ '<div class="input has_search">'
								+ '<input type="text" id="trnform_search_word" title="‘계좌관리명’으로 검색해 주세요." placeholder="‘계좌관리명’으로 검색해 주세요." data-jx-chk="true" data-jx-chk-opt=\'{"name":"검색어 입력","nullable":false,"maxLength":10,"charType":"korEngNum","userChar":"-"}\' />'
								+ '<button type="button" class="search" id="trnform_search_btn" type="submit">검색</button>'
								+ '<button type="button" class="del">텍스트삭제</button>'
							+ '</div>'
							+ '<hr aria-hidden="true" class="divider ty1 full" />'
							+ '<div id="favAcntStep_html">'
							+ '</div>'
							+ '<ul>'
								+ '<li>'
									+ '<div id="no_search_data" class="no_result_msg" style="display:none">'
										+ '<div class="msg">찾으시는 계좌가 없습니다.</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
							+ '<ul>'
								+ '<li>'
									+ '<div id="favAcntStep_html_2" class="no_result_msg" style="display:none">'
										+ '<div class="msg">자주쓰는  계좌가 없습니다.</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
						+ '</div>'
						+ '<div class="bottom_popup_footer">'
							+ '<button type="button" class="btn s_5 c_3 r_2"  '
							+ 'data-jx-execute="click" '
							+ 'data-jx-execute-target="FUNC@uf_goMenuAcntMngPage()">자주쓰는 입금계좌 관리</button>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
			
			favAcntStepHtml = $(favAcntStepHtml);
			$('#step').append(favAcntStepHtml);
			
			jex.setJexObj($jq);
			jex.setJexObj($('#favAcntStep'));
			
						
			//[자주쓰는계좌]
			favAcntStepHtml.find("#trnform_search_btn").on('click', function(evt) { //검색 Click Event
				var search_word = $.trim($("#favAcntStep #trnform_search_word").val());
				var cnt = 0;
				$("#favAcntListTbl #ACNT_NM").each(function(idx){
					var targetWord = $.trim($(this).text());
					if (targetWord.indexOf(search_word) < 0) {
						$($("#favAcntListTbl"+" li")[idx]).hide();
					} else {
						$($("#favAcntListTbl"+" li")[idx]).show();
						cnt++;
					}
				});
				if(cnt < 1) { //검색 결과가 없습니다.
					$("#favAcntStep #favAcntStep_html").hide(); //데이타 보이는 영역에 라인 안보이기 위한..
					$("#favAcntStep #no_search_data"  ).show(); //검색 결과가 없습니다.
					$("#favAcntStep #favAcntStep_html_2").hide();
				} else {
					$("#favAcntStep #favAcntStep_html").show();
					$("#favAcntStep #no_search_data"  ).hide();
					$("#favAcntStep #favAcntStep_html_2").hide();
				}
			});
		},
		
		/**
		 * [내계좌]
		 */
		drawMyAcntButtonHtml : function($jq) {
			var myAcntStepHtml = ""
				+ '<div id="myAcntStep" class="bottom_popup_wrap"  style="display:none;">'
				+ '<div class="bottom_popup">'
					+ '<div class="bottom_popup_header">'
						+ '<h2 class="tit">내계좌 선택</h2>'
						+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'myAcntStep\');">닫기</button>'
					+ '</div>'
					+ '<div class="bottom_popup_body">'
						+ '<ul class="select_list ty3" role="listbox" data-jx-list="' + this.formIds.myAcntListTbl + '" id="' + this.formIds.myAcntListTbl + '">'
							+ '<li class="acount_select_item" role="option" tabindex="-1" aria-selected="true"  '
									+ '	data-jx-execute="click" '
									+ 'data-jx-setter="" '
									+ 'data-jx-setter-source="this" '
									+ 'data-jx-setter-handler="uf_setter_myAcntTbl()" '
									+ 'data-jx-setter-target="#' + this.id + '" '
									+ 'data-jx-setter-execute="">'
									+ '<div class="item">'
										+ '<div class="item_top">'
											+ '<div class="item_top_text" id="ACNT_NM"></div>'
										+ '</div>'
										+ '<div class="item_bottom">'
											+ '<div class="item_bottom_text" id="EBNK_ACN" data-jx-formatter="account"></div>'
										+ '</div>'
									+ '</div>'
							+ '</li>'
							+ '<li id = "EMPTY">'
										+ '<div class="no_result_msg">'
											+ '<div class="msg">내 계좌가 없습니다</div>'
										+ '</div>'
							+ '</li>'
						+ '</ul>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
			myAcntStepHtml = $(myAcntStepHtml);
			$('#step').append(myAcntStepHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#myAcntStep'));
			$jq.on('click', function(evt) {
				//사용자입금계좌지정여부[Y/N]
				if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
					uf_user_mract_dsgt_showInfo();
				} else { //Default
					window._tranForm.showmyAcntListPopup();
				}
			});
		},
		
		/**
		 * [내계좌] 리스트 팝업 노출
		 */
		showmyAcntListPopup : function() {
			var list = _this.myAcntList; //내계좌
			var dat = {};
			if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {
				dat[window._tranForm.formIds.myAcntListTbl] = list;
				$("#myAcntStep").find("#menu_01").show();
				$("#myAcntStep").find("#menu_02").hide();
			} else {
				$("#myAcntStep").find("#menu_01").hide();
				$("#myAcntStep").find("#menu_02").show();
			}
			comLayerPopUtil.open('myAcntStep');
			$("#myAcntStep").show();
			//uf_goStep(4002);
		},
		
		/**
		 * 선택사항(통장표시, CMS코드, 자금코드)설정 영역
		 */
		drawOptionAreaHtml : function($jq) {
			window._tranForm.optinViewType = $jq.attr(sFormObj_attrs.areaOption);
			
			var optionAreaHtml ="";
			if("fnt_trn_110101_1" == window._tranForm.optinViewType || "fnt_trn_030101_1" == window._tranForm.optinViewType || "fnt_trn_210101_1" == window._tranForm.optinViewType|| "fnt_trn_210201_1" == window._tranForm.optinViewType|| "fnt_vat_020101_1" == window._tranForm.optinViewType) {      //통합이체
			 
			 optionAreaHtml =""	
				 +'<span id = "trn_option_area">'
				 		+'<ul class="d_list ty3">'
							+'<li id="trn_opt_area_1" style="display:none;">'
								+'<span class="d_list_l">받는 분 통장 표기</span>'
								+'<span class="d_list_r">'
									+'<div class="input line_ty2 no_del">'
										+'<input type="text" name="" id="mnrc_smr_cntn" title="출금계좌 실명 입력" placeholder="출금계좌 실명" data-jx-chk="true" data-jx-chk-opt=\'{"name":"받는통장표시","nullable":false,"maxLength":10,"charType":"korEngNumSpec"}\'/>'
									+'</div>'
								+'</span>'
							+'</li>'
							+'<li id="trn_opt_area_2" style="display:none;">'
								+'<span class="d_list_l">내 통장 표기</span>'
								+'<span class="d_list_r">'
									+'<div class="input line_ty2 no_del">'
										+'<input type="text" name="" id="drot_smr_cntn"  title="미 입력시 받는 분 이름 입력" placeholder="미 입력시 받는 분 이름" data-jx-chk="true" data-jx-chk-opt=\'{"name":"내통장표시","nullable":false,"maxLength":10,"charType":"korEngNumSpec"}\'/>'
									+'</div>'
								+'</span>'
							+'</li>'
							+'<li id="trn_opt_area_2_opn" style="display:none;">'
								+'<span class="d_list_l">내 통장 표기</span>'
								+'<span class="d_list_r mark_case1">'
									+'<span class="mark_txt">기업오픈</span>'
									+'<div class="input line_ty2 no_del">'
										+'<input type="text" maxlength="3" name="" id="opn_drot_smr_cntn"  title="3자리 입력" placeholder="미입력 시 수취인명" data-jx-chk="true" data-jx-chk-opt=\'{"name":"내통장표시","nullable":false,"maxLength":3,"charType":"korEngNumSpec"}\'/>'
									+'</div>'
								+'</span>'
							+'</li>'
						+'</ul>'
						+'<div id="accodian_wrap_disp" class="acd_wrap accodian_wrap ty2 etc1">'
							+'<div class="acd_head accodian_head">'
								+'<button type="button" title="[컨텐츠내용] 상세보기" aria-expanded="false" class="acd_btn">'
									+'<span class="title">더보기</span>'
									+'<span class="title sub">접기</span>'
								+'</button>'
							+'</div>'
							+'<div class="acd_cont accodian_cont">'
								+'<div class="inner">'
									+'<ul class="d_list ty3 bdt_none">'
										+'<li id="trn_opt_area_3" style="display:none;">'
											+'<span class="d_list_l">CMS</span>'
											+'<span class="d_list_r">'
												+'<div class="input line_ty2 no_del">'
													+'<input type="text" name="" id="cms_intt_cd" title="요청 코드 입력" placeholder="요청 코드" data-jx-chk="true" data-jx-chk-opt=\'{"name":"CMS","charType":"engNum","userChar":"-","maxLength":24}\'>'
												+'</div>'
											+'</span>'
										+'</li>'
										+'<li id="trn_opt_area_4" style="display:none;">'
											+'<span class="d_list_l">자금코드</span>'
											+'<span class="d_list_r">'
												+'<div id="fndsCodeSel" class="dropdown ty6" role="button" title="자금코드 선택 목록 보기" onclick="comLayerPopUtil.open(\'fndsCodeList_layer\');">'
													+'<div id="_FNDS_SEL" class="dropdown_text" >자금코드</div>'
													+'<input type="hidden" id="EFNC_FNDS_CD">'
												+'</div>'
											+'</span>'
											+'<ul class="d_list ty4 mt_24">'
												+'<li>'
													+'<span class="d_list_l">자금항목(대)</span>'
													+'<span class="d_list_r" id="_FNDS_LRDV_NM"></span>'
													+'<input type="hidden" id="FNDS_LRDV_NM">'
												+'</li>'
												+'<li>'
													+'<span class="d_list_l">자금항목(소)코드</span>'
													+'<span class="d_list_r" id="_FNDS_SMDV_NM"></span>'
													+'<input type="hidden" id="FNDS_SMDV_NM">'
												+'</li>'
											+'</ul>'
										+'</li>'
									+'</ul>'
								+'</div>'
							+'</div>'
						+'</div>'
				+'</span>';
			} else if("fnt_trn_080101_1" == window._tranForm.optinViewType) {
				optionAreaHtml ="" 
					+'<div class="group" id="trn_opt_area" style="display:none;">'
						+'<div class="title_text ty1">선택정보</div>'
						+'<div class="form_group">'
							+'<div class="input_label ty2">출금계좌 표기</div>'
							+'<div class="input">'
								+'<input type="text" name="" id="drot_smr_cntn" title="출금계좌 표기 10자 이내 입력" placeholder="10자 이내 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"내통장표시","nullable":false,"maxLength":10,"charType":"korEngNumSpec"}\' />'
								+'<button type="button" class="del">텍스트삭제</button>'
							+'</div>'
							+'<div class="input_label ty2">입금계좌 표기</div>'
							+'<div class="input">'
								+'<input type="text" id="mnrc_smr_cntn" title="출금계좌 표기 10자 이내 입력" placeholder="10자 이내 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"받는통장표시","nullable":false,"maxLength":10,"charType":"korEngNumSpec"}\' />'
								+'<button type="button" class="del">텍스트삭제</button>'
							+'</div>'
							+'<div class="input_label ty2">CMS코드</div>'
							+'<div class="input">'
								+'<input type="text" id="cms_intt_cd" title="CMS코드 10자 이내 입력" placeholder="10자 이내 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"CMS","charType":"engNum","userChar":"-","maxLength":24}\'/>'
								+'<button type="button" class="del">텍스트삭제</button>'
							+'</div>'
						+'</div>'
					+'</div>';
				
			} 
			// 자금코드 리스트 팝업
			var fndsCodeListPopupHtml = ""
				+ '<div id="fndsCodeList_layer" class="bottom_popup_wrap" style="display:none">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">자금코드 선택</h2>'
								+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'fndsCodeList_layer\');">닫기</button>'
						+ '</div>'
						+ '<div id="menu_01" class="bottom_popup_body">'
							+ '<ul class="select_list ty1" role="listbox" id="fndsCodeListTbl" data-jx-list="fndsCodeListTbl">'
								+ '<li '
								+ 'data-jx-setter="" '
								+ 'data-jx-setter-source="this" '
								+ 'data-jx-setter-handler="uf_setter_fndsCodeListTbl()" '
								+ 'data-jx-setter-execute="FUNC@comLayerPopUtil.close(\'fndsCodeList_layer\')" '
								+ 'data-jx-execute="click">'
									+ '<a role="button">'
										+ '<span id="EBNK_FNDS_CD_NM"></span>'
										+ '<span id="EFNC_FNDS_CD_COVER"></span>'
									+ '</a>'
								+ '</li>'
								+ '<li class="item" id="EMPTY">'
									+ '<div class="no_result_msg">'
										+ '<div class="msg">자금코드 정보가 없습니다.</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
						+ '</div>'
					+ '</div>'
				+ '</div>';	
		
			fndsCodeListPopupHtml = $(fndsCodeListPopupHtml);
			$('#step').append(fndsCodeListPopupHtml);
			
			jex.setJexObj($jq);
			jex.setJexObj($('#fndsCodeList_layer'));
			
			optionAreaHtml = $(optionAreaHtml);
			
			//자금코드
			optionAreaHtml.find("#fndsCodeSel").on('click', function(evt) {
				if(null != _this.fndsCodeList && _this.fndsCodeList.length > 0){
					$("#fndsCodeList_layer").find("#menu_01").show();
					$("#fndsCodeList_layer").find("#menu_02").hide(); //자금코드 정보가 없습니다.
				}
				else {
					$("#fndsCodeList_layer").find("#menu_01").hide();
					$("#fndsCodeList_layer").find("#menu_02").show(); //자금코드 정보가 없습니다.
				}
				//uf_goStep(4005);
				comLayerPopUtil.open('fndsCodeList_layer');
				$('#fndsCodeList_layer').show();
			});
			
			optionAreaHtml.find("#cms_intt_cd").on('keyup', function(evt) {
				var dat = $(this).val().replace(/[^0-9a-zA-Z\-]/g, "");
				$(this).val(dat.toUpperCase());
			});

			$jq.html(optionAreaHtml);
			jex.setJexObj($jq);
			
			if("fnt_trn_110101_1" == window._tranForm.optinViewType) {      //즉시이체
				$("#trn_option_area #trn_opt_area_1").show();     //입금계좌표시 내용
				$("#trn_option_area #trn_opt_area_2").show();     //출금계좌표시 내용
				$("#trn_option_area #trn_opt_area_3").show();     //CMS코드
				$("#trn_option_area #trn_opt_area_4").show();     //자금관리
				$("#trn_option_area #trn_opt_area_txt_2").show(); //(예금주명)
				$("#trn_option_area #trn_opt_area_txt_3").show(); //착오송금 방지를 위한 경우 상대예금주명 입력
			}
			else if("fnt_trn_030101_1" == window._tranForm.optinViewType) { //급여이체
				$("#trn_option_area #trn_opt_area_4").show();     //자금관리
			}
			else if("fnt_trn_080101_1" == window._tranForm.optinViewType) { //자주쓰는 이체 관리
				$("#trn_opt_area").show();     								//전체항목 보여줌
			}
			else if("fnt_trn_210101_1" == window._tranForm.optinViewType) { //자동이체등록
				$("#trn_option_area #trn_opt_area_1").show();     //출금계좌표시 내용
				$("#trn_option_area #trn_opt_area_2").show();     //입금계좌표시 내용
				$("#trn_option_area #trn_opt_area_4").show();     //자금관리
			
			}
			else if("fnt_trn_210201_1" == window._tranForm.optinViewType) { //자동이체 변경
				$("#trn_option_area #trn_opt_area_1").show();     //출금계좌표시 내용
				$("#trn_option_area #trn_opt_area_2").show();     //입금계좌표시 내용
				$("#trn_option_area #accodian_wrap_disp").hide();     //아코디언 더보기 숨기기
				
			}
			else if ("fnt_trn_250101_1" == window._tranForm.optinViewType) {
				/**/
			} else {                                                        //Default
				$("#trn_option_area #trn_opt_area_1").show();     //출금계좌표시 내용
				$("#trn_option_area #trn_opt_area_2").show();     //입금계좌표시 내용
				$("#trn_option_area #trn_opt_area_3").show();     //CMS코드
				$("#trn_option_area #trn_opt_area_4").show();     //자금관리
			}
		},
		
		/**
		 * [급여이체] 등록내역선택
		 */
		drawRegistInfoHtml : function($jq) {
			$jq.attr('data-jx-execute'        , 'click')
				.attr('data-jx-execute-target', 'FUNC@uf_goRegistInfo()');
			
			/**
			 * 등록내역선택
			 */
			var registInfoHtml = ""
				+ '<div class="bottom_popup_wrap" id="registInfo" style="display:none;">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">등록내역 가져오기</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'registInfo\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body">'
							+ '<ul class="space_list_ty1" role="listbox" id="'+ this.formIds.rgstInfoListTbl + '" data-jx-list="" >'
								+ '<li '
								+ 'data-jx-execute="click" '
								+ 'data-jx-setter="" '
								+ 'data-jx-setter-source="this" '
								+ 'data-jx-setter-handler="uf_setter_rgstInfoListTbl()" '
								+ 'data-jx-setter-target="#' + window._tranForm.id + '" '
								+ '>'
									+ '<div class="card_item_wrap ty2">'
										+ '<div class="card_chkbox">'
											+ '<input type="radio" name="radio_rgstInfoListTbl" id="" />'
											+ '<label for="" aria-labelledby="testitem91" onclick="uf_radioCk(this)"></label>'
										+ '</div>'
										+ '<div class="card_item" id="testitem91">'
											+ '<div class="card_item_wrap_head">'
												+ '<div class="tit title_text ty1" id="EBNK_ATCH_NM_TXT"></div>'
											+ '</div>'
											+ '<div class="card_item_detail">'
												+ '<p class="line" role="text">'
													+ '<span class="line_left">'
														+ '<span class="tit">출금계좌</span>'
													+ '</span>'
													+ '<span class="line_right">'
														+ '<span class="account_no" id="EBNK_DROT_ACN" data-jx-formatter="account"></span>'
													+ '</span>'
												+ '</p>'
												+ '<p class="line" role="text">'
													+ '<span class="line_left">'
														+ '<span class="tit">총 금액</span>'
													+ '</span>'
													+ '<span class="line_right">'
														+ '<span class="money" id="ALL_RMTN_AMT" data-jx-formatter="number"></span>'
														+ '<span class="txt_unit">원</span>'
													+ '</span>'
												+ '</p>'
												+ '<p class="line" role="text">'
													+ '<span class="line_left">'
														+ '<span class="tit">등록일</span>'
													+ '</span>'
													+ '<span class="line_right">'
														+ '<span class="date" id="RGSN_YMD" data-jx-formatter="date"></span>'
													+ '</span>'
												+ '</p>'
												+ '<p class="line" role="text">'
													+ '<span class="line_left">'
														+ '<span class="tit">이체일</span>'
													+ '</span>'
													+ '<span class="line_right">'
														+ '<span class="date" id="TRANDATE_TXT" data-jx-formatter="date"></span>'
													+ '</span>'
												+ '</p>'
												+ '<p class="line" role="text">'
													+ '<span class="line_left">'
														+ '<span class="tit">처리결과</span>'
													+ '</span>'
													+ '<span class="line_right">'
														+ '<span class="txt" id="RESULT_TXT"></span>'
													+ '</span>'
												+ '</p>'
											+ '</div>'
											+ '<div class="btn_area ty1 btn_del mt_16">'
												+ '<button type="button" class="btn s_4 c_1 r_2" '
												+ 'data-jx-execute="click" '
												+ 'data-jx-setter="" '
												+ 'data-jx-setter-source="this" '
												+ 'data-jx-setter-handler="uf_goRegistInfoDel()" '
												+ 'data-jx-setter-target="" '
												+ '>삭제</button>'
											+ '</div>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
								+ '<li class="item" id="EMPTY">'
									+ '<div class="no_result_msg">'
										+ '<div class="msg">급여이체 내역이 없습니다.</div>'
									+ '</div>'
								+ '</li>'	
						+ '</ul>'
					+ '</div>'
					+ '<div class="bottom_popup_footer ty1">'
						+ '<button type="button" class="btn s_5 c_3 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@uf_goRegistInfoSel()">가져오기</button>'
					+ '</div>'
				+ '</div>'
			+ '</div>';
			
			registInfoHtml = $(registInfoHtml);
			$('#step').append(registInfoHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#registInfo'));
		}
		
		/**
		 * 팩스(FAX) 전송
		 */
		, drawFaxSendHtml : function($jq) {
			$jq.attr('data-jx-execute'        , 'click')
				.attr('data-jx-execute-target', 'FUNC@uf_getFaxSendInfo()');
			
			//이체결과 FAX 전송
			var faxSendHtml = ""
				+ '<div id="faxSendInfo" class="bottom_popup_wrap">'
					+ '<div class="bottom_popup">'
						+ '<div class="bottom_popup_header">'
							+ '<h2 class="tit">이체확인 팩스 전송</h2>'
							+ '<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'faxSendInfo\');">닫기</button>'
						+ '</div>'
						+ '<div class="bottom_popup_body">'
							+ '<div class="form_group">'
								+ '<div class="input_label ty2">팩스 보내는분</div>'
								+ '<div class="input">'
									+ '<input type="text" name="" id="SENDER" value="홍길동" title="팩스 보내는분" disabled />'
								+ '</div>'
								+ '<div class="input_label ty2">팩스 받는분</div>'
								+ '<div class="input">'
									+ '<input type="text" name="" id="recipient" title="FAX 발신인 10자 이내 입력" placeholder="10자 이내" data-jx-chk="true" data-jx-chk-opt=\'{"name":"FAX 수신인","nullable":false,"maxLength":10,"charType":"korEngNum","userChar":"-"}\'>'
									+ '<button type="button" class="del">텍스트삭제</button>'
								+ '</div>'
								+ '<div class="input_label ty2">받는분 팩스번호</div>'
								+ '<div class="comp_wrap phone">'
									+ '<div class="input no_del">'
										+ '<input type="number" id="fax_no" placeholder="‘-’ 없이 입력" title="수신 FAX 번호 입력" data-jx-chk="true" data-jx-chk-opt=\'{"name":"수신 FAX 번호","nullable":false,"maxLength":12,"charType":"num","userChar":""}\'>'
									+ '</div>'
								+ '</div>'
								+ '<div class="input_label ty2">출금계좌번호 표시 여부</div>'
								+ '<div class="btn_area clickable ty1" role="radiogroup" id="faxSend_acnoMaskYn">'
									+ '<button type="button" role="radio" aria-checked="true"  value="Y" onclick="uf_faxSend_acnoMaskYn(\'Y\')" class="active"><span class="text">표기</span></button>'
									+ '<button type="button" role="radio" aria-checked="false" value="N" onclick="uf_faxSend_acnoMaskYn(\'N\')"><span class="text">표기안함</span></button>'
								+ '</div>'
							+ '</div>'
							+ '<ul class="space_list_ty5 mt_32">'
								+ '<li>'
									+ '<div class="group_item">'
										+ '<div class="group_item_info">'
											+ '<div class="txt4">출금정보</div>'
										+ '</div>'
										+ '<div class="group_item_detail">'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">출금계좌번호</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="bank_name">기업은행</span>'
													+ '<span class="account_no" id="DROT_ACNO" data-jx-formatter="account"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">출금계좌 예금주</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="CUST_NM"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">이체금액</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="money" id="TRAN_AMT" data-jx-formatter="number"></span>'
													+ '<span class="txt_unit">원</span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">수수료</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="money" id="TRFE" data-jx-formatter="number"></span>'
													+ '<span class="txt_unit">원</span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">내 통장 표기</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="DROT_SMR_CNTN"></span>'
												+ '</span>'
											+ '</p>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
								+ '<li>'
									+ '<div class="group_item">'
										+ '<div class="group_item_info">'
											+ '<div class="txt4">입금정보</div>'
										+ '</div>'
										+ '<div class="group_item_detail">'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">받는분</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="MNRC_ACNT_DPSR_NM"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">입금계좌</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="bank_name" id="MNRC_BANM"></span>'
													+ '<span class="account_no" id="mnrc_acno_txt"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">받는분 통장 표기</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="MNRC_SMR_CNTN"></span>'
												+ '</span>'
											+ '</p>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
								+ '<li>'
									+ '<div class="group_item">'
										+ '<div class="group_item_info">'
											+ '<div class="txt4">부가항목</div>'
										+ '</div>'
										+ '<div class="group_item_detail">'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">CMS코드</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="CMS_NO"></span>'
												+ '</span>'
											+ '</p>'
											+ '<p class="line" role="text">'
												+ '<span class="line_left">'
													+ '<span class="tit">거래고유번호</span>'
												+ '</span>'
												+ '<span class="line_right">'
													+ '<span class="txt" id="EFF_TGNO"></span>'
												+ '</span>'
											+ '</p>'
										+ '</div>'
									+ '</div>'
								+ '</li>'
							+ '</ul>'
						+ '</div>'
						+ '<div class="bottom_popup_footer ty2">'
							+ '<button type="button" class="btn s_5 c_1 r_2" onclick="comLayerPopUtil.close(\'faxSendInfo\')">취소</button>'
							+ '<button type="button" class="btn s_5 c_3 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@uf_goFaxSend()">전송하기</button>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
				
			faxSendHtml = $(faxSendHtml);
			$('#step').append(faxSendHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#faxSendInfo'));
		}
		
		/**
		 * [이체확인증]
		 */
		, drawTrnConfCardHtml : function($jq) {
			$jq.attr('data-jx-execute'        , 'click')
				.attr('data-jx-execute-target', 'FUNC@uf_getTrnConfCardInfo()');
			
			//이체확인증
			var trnConfCardHtml = ""
				+ '<div id="trnConfCardInfo" data-jx-step-no="20002" data-jx-effect="slide" style="display:none;">'
					+ '<div class="content_wrap ty3">'
						+ '<div class="group">'
							+ '<div class="title_text ty1 ta_c">이체확인증</div>'
							+ '<div class="transfer_confirm_cert">'
								+ '<ul class="d_list ty1">'
									+ '<li>'
										+ '<span class="d_list_l">이체일시</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="trn_ymd_hms"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">출금계좌</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="DROT_ACN"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">입금계좌 예금주명</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="MRACT_DPSR_NM"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">입금은행</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="txt_bank_nm"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">입금계좌</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="txt_mnrc_acno"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">이체금액</span>'
										+ '<span class="d_list_r">'
											+ '<span class="money" id="TRAN_AMT"></span>'
											+ '<span class="txt_unit">원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">수수료</span>'
										+ '<span class="d_list_r">'
											+ '<span class="money" id="TRAN_FEE"></span>'
											+ '<span class="txt_unit">원</span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">받는분 통장 표기</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="MNRC_BNPR_CON"></span>'
										+ '</span>'
									+ '</li>'
									+ '<li>'
										+ '<span class="d_list_l">내 통장 표기</span>'
										+ '<span class="d_list_r">'
											+ '<span class="text" id="DROT_BNPR_CON"></span>'
										+ '</span>'
									+ '</li>'
								+ '</ul>'
								+ '<ul class="list_bullet ty1">'
									+ '<li>위 내용대로 이체되었습니다.</li>'
									+ '<li>이 확인증은 고객 편의를 위해 제공되는 것으로 참고용으로만 사용할 수 있습니다.</li>'
								+ '</ul>'
								+ '<div class="transfer_confirm_cert_logo_img">'
									+ '<img src="../../../../img/fnt/img_fnt_trn_010101_1_01.png" alt="IBK 기업은행" />'
								+ '</div>'
							+ '</div>'
						+ '</div>'	
						+ '<div class="bottom_btn_area">'
							+ '<div class="btn_area ty2" >'
								+ '<button type="button" class="btn s_5 c_1 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@uf_back()">취소</button>'
								+ '<button type="button" class="btn s_5 c_3 r_2" data-jx-execute="click" data-jx-execute-target="FUNC@uf_goTrnShare()">공유하기</button>'
							+ '</div>'
						+ '</div>'	
					+ '</div>'	
				+ '</div>';
				
			trnConfCardHtml = $(trnConfCardHtml);
			$('#step').append(trnConfCardHtml);
			jex.setJexObj($jq);
			jex.setJexObj($('#trnConfCardInfo'));
		}
	});
	jex.plugin.add("JEX_MOBILE_TRANFORM", JexMobileTranForm, "data-jx-tranform");
})();

/**
 * [자금코드리스트] 선택
 * @param $jq
 * @param data
 * @returns {___anonymous40526_40527}
 */
function uf_setter_fndsCodeListTbl($jq, data) {
	//var index = $jq.find("#index").val();
	var dat = {};
	//EFNC_FNDS_CD
	//EFNC_MNGM_USER_ID
	//FNDS_SMDV_NM
	//EBNK_FNDS_CD_NM
	//FNDS_LRDV_NM
	
	dat["EFNC_FNDS_CD" ] = data["EFNC_FNDS_CD"   ];
	dat["FNDS_LRDV_NM" ] = data["FNDS_LRDV_NM"   ];
	dat["FNDS_SMDV_NM" ] = data["FNDS_SMDV_NM"   ];
	dat["_FNDS_SEL"    ] = data["EBNK_FNDS_CD_NM"] + "(" + data["EFNC_FNDS_CD"] +")";
	dat["_FNDS_LRDV_NM"] = data["FNDS_LRDV_NM"   ];
	dat["_FNDS_SMDV_NM"] = data["FNDS_SMDV_NM"   ];
	
	comSelectPopUtil.setActiveClass($jq); //선택됨 표시
	
	return dat;
}

/**
 * 거래에러여부 CHECK_TRAN_ERROR
 */
var CHECK_TRANERROR = {
	uf_out : function($jq, data, index) {
		if("true" == data["_tran_res_data"][0]["_is_error"]){
			//data["_tran_res_data"][0]["_is_error"]
			//data["_tran_res_data"][0]["_error_msg"]
			//data["_tran_res_data"][0]["_error_cd"]
			
			//주메세지, title, callback[확인], 서브메세지
			MobPopup.showAlertPopup(data["_tran_res_data"][0]["_error_msg"], "", function() {
				/** 
				 * 1. [업무       ]단에서는 '홈'으로.
				 * 2. [결재함 상세]단에서는 '결재함 목록'으로.(이전메뉴로 이동은 앱에서 처리함 ** //결재함 상세(결재,승인,반송 및 (완료/등록조회)상태))
				 */
				_webViewExit();
			}, "오류코드 : " + data["_tran_res_data"][0]["_error_cd"]);
			return "STOP_SVC"; //[data-jx-procedure-svc]중지
		}
		else { //정상
			return {};
		}
	}
};

/**
 * 외부 은행 거래 (장애은행) 처리
 */
var CHECK_BANKERROR = {
	uf_out : function($jq, data, index) {
		if("true" == data["_tran_res_data"][0]["_is_error"]){
			//data["_tran_res_data"][0]["_is_error"]
			//data["_tran_res_data"][0]["_error_msg"]
			//data["_tran_res_data"][0]["_error_cd"]
			
			//주메세지, title, callback[확인], 서브메세지
			MobPopup.showAlertPopup(data["_tran_res_data"][0]["_error_msg"], "", function() {
				/** 
				 * 1. [업무       ]단에서는 '홈'으로.
				 * 2. [결재함 상세]단에서는 '결재함 목록'으로.(이전메뉴로 이동은 앱에서 처리함 ** //결재함 상세(결재,승인,반송 및 (완료/등록조회)상태))
				 */
				_webViewExit();
			}, "오류코드 : " + data["_tran_res_data"][0]["_error_cd"]);
			return "STOP_SVC"; //[data-jx-procedure-svc]중지
		}
		else { //정상
			var list      = data["_tran_res_data"][0]["list_error_bank"       ]; // AP 또는 전문으로 조회한 장애은행 목록(실제사용하는 목록)
			var list2     = data["_tran_res_data"][0]["list_error_bank_nebsoa"]; // DB에 저장되어 있는 은행정보 조회
			var nowDat    = data["_tran_res_data"][0]["now"                   ]; // 현재 시간
			var errBankTf = false;
			var bankMsg   = "";
			
			if (!(JSON.stringify(list) == "[]" || list == "" || list == undefined || list == null)) {
				var bankCd  = "";
				var bankNm  = "";
				var errBank = "";
				
				for (var i = 0; i < list.length; i++) {
					bankCd = list[i]["bankCd"];
					bankNm = list[i]["bankNm"];
					
					if (i == (list.length - 1)) {
						errBank += bankNm + "(" + bankCd + ") ";
					} else {
						errBank += bankNm + "(" + bankCd + "), ";
					}
				}
				
				bankMsg = nowDat + " 장애은행은 " + errBank + " 입니다.";
				
				errBankTf = true; // 1.초기 진입시(O), 2.출금계좌 선택시 잔액조회시(이건 사용X )
				
			} else {
				errBankTf = false;
				bankMsg = nowDat + "<br/>모든 은행으로 이체가 가능합니다.";
			}
			
			if (errBankTf) {
				MobPopup.showAlertPopup(bankMsg);
			}
			
			_this.errBankList       = list;  //장애은행 목록(AP 또는 전문)
			_this.errBankListNebsoa = list2; //Nebsoa DB에서 관리하는 장애은행목록
			
			bankErrorList = list2;           // 1.입금계좌 변경시(?), 2.은행선택시(O), 3.수취조회시(O)
			MobPopup.isWebViewExitForError = false;
			return {};
		}
	}
};

//-------------------------------------------------------------------------------
var fnt_trn_010101_9_gubn = ""; // 통합이체에서 [자주쓰는이체 편집]으로 링크될 경우
//-------------------------------------------------------------------------------
/**
 * [내이체함] (통합이체) 
 */
var fnt_trn_010101_9 = {
	uf_out : function($jq, data, index) {
		var dat = {};
		
		if (data["list"] == "" || data["list"] == undefined || data["list"] == null) {
			if("fnt_trn_080101_1" == $jq.attr("data-jx-svc-gubn")){ //자주쓰는이체 편집 [fnt_trn_080101_1.html]
				fnt_trn_010101_9_gubn = $jq.attr("data-jx-svc-gubn");
			}
			else {
				$("#favTrnStep").hide();
				$("#favTrnStep").find("#menu_02").show(); //자주쓰는 이체정보가 없습니다.
				$("#favTrnStep").find("#search_data_edit").hide();
			}
		} 
		else {
			_this.favtrn_list = data["list"]; //[fnt_trn_080101_1.js]
			
			var list = data["list"];
			
			//자주쓰는이체 편집 [fnt_trn_080101_1.html]
			if("fnt_trn_080101_1" == $jq.attr("data-jx-svc-gubn")){
				fnt_trn_010101_9_gubn = $jq.attr("data-jx-svc-gubn");
				
				var _list_080101 = jex.getJexObj($("#step1").find("#list_080101"), "JEX_MOBILE_LIST");
				_list_080101.setAll(list);
			
			}
			else { //Default :: [자주쓰는이체] (통합이체) 자주쓰는이체 목록조회
								
				$("#favTrnStep").show();
				$("#favTrnStep").find("#menu_02").hide();
				$("#favTrnStep").find("#search_data_edit").show();
				dat[window._tranForm.formIds.favTrnListTbl] = list;
				
			}
		}
		return dat;   
	},
	uf_exec : function() {
		if(fnt_trn_010101_9_gubn == "fnt_trn_080101_1"){ //자주쓰는이체 편집 [fnt_trn_080101_1.html]
			// 통합이체에서 [자주쓰는이체 편집]으로 링크될 경우
			if(null == _this.favtrn_list || undefined == _this.favtrn_list){
				$("#menu_02").show(); //자주쓰는 이체정보가 없습니다.
			} 
		}
		else {
			//사용자입금계좌지정
			if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
				//[자주쓰는이체]그려진 후  [입금지정계좌]표시 show() 다시 셋팅
				$("#" + window._tranForm.formIds.favTrnListTbl).find(".badge_cont").each(function(i, val) {
					//사용자지정입금계좌' 정보 일치여부.
					var bool = uf_user_mract_dsgt_check(_this.favtrn_list[i]["MNRC_ACN"]);
					if (bool) {
						console.log("ljy :: uMractDsgtAcnY["+i+"] :: "+ _this.favtrn_list[i]["MNRC_ACN"]);
						$(this).find("#"+this.children[0].id).show(); //입금지정계좌
					
					}
					
				});
				
			}
			
			//은행별 icon 세팅
			$("#" + window._tranForm.formIds.favTrnListTbl).find(".ico_box").each(function(i, val) {
				var bankCd = _this.favtrn_list[i]["EFNC_BNCD"];
				if(!MobUtil.isEmpty(uf_getTrnBankName(bankCd))){
				    $(this).removeClass("ico_box ty1 ico_bank_000");
			        $(this).addClass("ico_box ty1 ico_bank_"+bankCd);
			    } 
				
			});
			$("#favTrnStep #trnform_search_word").val(""); //검색어' 초기화
			uf_goStep(4000); //[자주쓰는이체] (즉시이체 등)
		}
	}
};

//-------------------------------------------------------------------------------
var fnt_trn_010101_5_gubn = ""; // 즉시이체에서 [자주쓰는이체 편집]으로 링크될 경우
//-------------------------------------------------------------------------------
/**
 * [자주쓰는이체] (즉시이체 등) 자주쓰는이체 목록조회
 */
var fnt_trn_010101_5 = {
	uf_out : function($jq, data, index) {
		var dat = {};
		//EBNK_FRUS_TRN_NM
		//EBNK_DROT_ACN
		//MNRC_ACN
		//BANK_NM
		//EFNC_BNCD
		//EBNK_TRN_AMT
		//EBNK_DROT_BNPR_CON
		//EBNK_MNRC_BNPR_CON
		//EBNK_CMS_CD_CON
		//EFNC_FNDS_CD
		//TRAN_MSG_CON
		
		if (data["list"] == "" || data["list"] == undefined || data["list"] == null) {
			if("fnt_trn_080101_1" == $jq.attr("data-jx-svc-gubn")){ //자주쓰는이체 편집 [fnt_trn_080101_1.html]
				fnt_trn_010101_5_gubn = $jq.attr("data-jx-svc-gubn");
			}
			else {
				$("#favTrnStep").find("#menu_01").hide();
				$("#favTrnStep").find("#menu_02").show(); //자주쓰는 이체정보가 없습니다.
				$("#favTrnStep").find("#search_data_edit").hide();
			}
		} 
		else {
			_this.favtrn_list = data["list"]; //[fnt_trn_080101_1.js]
			
			var list = data["list"];
			
			//자주쓰는이체 편집 [fnt_trn_080101_1.html]
			if("fnt_trn_080101_1" == $jq.attr("data-jx-svc-gubn")){
				fnt_trn_010101_5_gubn = $jq.attr("data-jx-svc-gubn");
				
				var _list_080101 = jex.getJexObj($("#step1").find("#list_080101"), "JEX_MOBILE_LIST");
				_list_080101.setAll(list);
			}
			else { //Default :: [자주쓰는이체] (통합이체) 자주쓰는이체 목록조회
								
				$("#favTrnStep").find("#menu_01").show();
				$("#favTrnStep").find("#menu_02").hide();
				$("#favTrnStep").find("#search_data_edit").show();
				dat[window._tranForm.formIds.favTrnListTbl] = list;
				
			}
		}
		return dat;   
	},
	uf_exec : function() {
		if(fnt_trn_010101_5_gubn == "fnt_trn_080101_1"){ //자주쓰는이체 편집 [fnt_trn_080101_1.html]
			// 즉시이체에서 [자주쓰는이체 편집]으로 링크될 경우
			if(null == _this.favtrn_list || undefined == _this.favtrn_list){
				$("#menu_02").show(); //자주쓰는 이체정보가 없습니다.
				$("#favTrnStep").find("#search_data_edit").hide();
			} else {
				//은행별 icon 세팅
				$("#list_080101").find(".ico_box").each(function(i, val) {
					var bankCd = _this.favtrn_list[i]["EFNC_BNCD"];
					if(!MobUtil.isEmpty(uf_getTrnBankName(bankCd))){
					    $(this).removeClass("ico_box ty1 ico_bank_000 top");
				        $(this).addClass("ico_box ty1 ico_bank_"+bankCd + " top");
				    } 
					
				});
			}
		}
		else {
			//사용자입금계좌지정
			if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
				//[자주쓰는이체]그려진 후  [입금지정계좌]표시 show() 다시 셋팅
				$("#" + window._tranForm.formIds.favTrnListTbl).find(".badge_cont").each(function(i, val) {
					//사용자지정입금계좌' 정보 일치여부.
					var bool = uf_user_mract_dsgt_check(_this.favtrn_list[i]["MNRC_ACN"]);
					if (bool) {
						console.log("ljy :: uMractDsgtAcnY["+i+"] :: "+ _this.favtrn_list[i]["MNRC_ACN"]);
						$(this).find("#"+this.children[0].id).show(); //입금지정계좌
					
					}
					
				});
				
			}
			
			//은행별 icon 세팅
			$("#" + window._tranForm.formIds.favTrnListTbl).find(".ico_box").each(function(i, val) {
				var bankCd = _this.favtrn_list[i]["EFNC_BNCD"];
				if(!MobUtil.isEmpty(uf_getTrnBankName(bankCd))){
				    $(this).removeClass("ico_box ty1 ico_bank_000");
			        $(this).addClass("ico_box ty1 ico_bank_"+bankCd);
			    } 
				
			});
			$("#favTrnStep #trnform_search_word").val(""); //검색어' 초기화
			uf_goStep(4000); //[자주쓰는이체] (즉시이체 등)
		}
	}
};

/* 금액 키패드 옵션형 */
function uf_callKeypadOption(event) {
	var title    = "금액 입력";
	var $target  = $(event.target);
	var targetId = $target.attr("id");
	var btnList  = [];
	var allAmt   = $('#step1 #pvamt_for').text().replace(/,/g, ""); //전액
	
	btnList = [
		{"name" : "+1만",   "pay" : "10000",   "allin" : "N"},
		{"name" : "+5만",   "pay" : "50000",   "allin" : "N"},
		{"name" : "+10만",  "pay" : "100000",  "allin" : "N"},
		{"name" : "+100만", "pay" : "1000000", "allin" : "N"},
		{"name" : "전액",   "pay" : allAmt,    "allin" : "Y"} //금액 더하기가 아닐경우 allin : Y
	];
	
	var option = {
		formatterYn     : "Y",  //포맷팅여부
		appendStr       : "원", //금액 뒤 연결문자
		callbackConfirm : function(resData) {
			
			//if (dat["inputData"] != "") {
				//실제이체금액 세팅
				//var num_real_tran_amt = Number(dat["inputData"]) + Number($("#TXAT_TRPF_AMT").text().replace(/,/g, ""));
				//$("#real_tran_amt").text(mobFormatter.number(num_real_tran_amt));
 				//$("#mmtTrnAmtdiv1").removeClass('fill_line'); // 이체금액(원금) 밑줄 지우기
				//$("#mmtTrnAmtdiv2").removeClass('fill_line'); // 이체금액 밑줄 지우기
				//$("#showMmtField3").animate({borderColor:'#333'}, 500);    // MMT 계좌번호 밑줄 (진하게)
				//uf_set_mmt_filed(); // 초단기MMT 화면 세팅
			//}
			//MobPopup.showAlertPopup("결과값:" + JSON.stringify(resData));
		}
	};
	//$("#tran_amt_step1").text(mobFormatter.number("1"));
	//title    : 제목
	//targetId : 키패드로 입력한 금액을 적용할 객체의 아이디 또는 객체
	//btnList  : 버튼목록
	//option   : 옵션
	comKeypadUtil.callAmt(title, targetId, btnList, option);
}

/**
 * [자주쓰는이체 편집] (즉시이체 등) 페이지 이동
 */
function uf_goFavTrnEditPage() {
	
	MobPopup.showConfirmQckPopup("'내 이체함' 등록 화면으로 이동할까요?", "안내", function() {
		comWebkey_goMenu("5005", "fnt_trn_080101_1", ""); 
	},function() {					
	},"나중에","이동");
	
}

/**
 * [내 이체함자주쓰는이체 - row 선택]
 */
function uf_setter_favTrnListTbl($jq, data) {
	
	var dat = {};
	//EBNK_FRUS_TRN_NM
	//EBNK_DROT_ACN
	//MNRC_ACN
	//BANK_NM
	//EFNC_BNCD
	//EBNK_TRN_AMT
	//EBNK_DROT_BNPR_CON
	//EBNK_MNRC_BNPR_CON
	//EBNK_CMS_CD_CON
	//EFNC_FNDS_CD
	//TRAN_MSG_CON
	
	if(0 == _this.payAcntList.length) { //출금계좌가없을시
		console.log("ljy :: 출금계좌가 없습니다.");
	}
	else {
		//사용자지정입금계좌' 정보 일치여부. 및 입금계좌지정등록' 하지않은경우도 계속 거래할수있게 return true.
		var bool = uf_user_mract_dsgt_check(data["MNRC_ACN"]);
		if (bool) {
			$("#" + window._tranForm.id).find("drot_smr_cntn").val("");
			$("#" + window._tranForm.id).find("mnrc_smr_cntn").val("");
			
			_this.setterFavTrnUse = "Y"; //자주쓰는이체 setter
			
			dat["tran_amt_step1"] = formatter.number(data["EBNK_TRN_AMT"    ]); //이체금액
			dat["mnrc_acno"     ] = $.trim(data["MNRC_ACN"].replace(/-/g, "")); //입금계좌
			dat["bank_cd"       ] = data["EFNC_BNCD"                 ]; //입급은행코드
			dat["bank_nm"       ] = data["BANK_NM"                   ]; //입급은행
			dat["drot_smr_cntn" ] = $.trim(data["EBNK_DROT_BNPR_CON"]); //출금계좌표시 내용
			dat["mnrc_smr_cntn" ] = $.trim(data["EBNK_MNRC_BNPR_CON"]); //입금계좌표시 내용
			dat["cms_intt_cd"   ] = $.trim(data["EBNK_CMS_CD_CON"   ]); //CMS code
			
			$("#step1 #mnrc_acno").val($.trim(data["MNRC_ACN"].replace(/-/g, "")));
			$("#step1 #bank_cd").val(data["EFNC_BNCD"]);
			$("#step1 #bank_nm").text(data["BANK_NM"]);
			
			$("#step2 #mnrc_acno").text($.trim(data["MNRC_ACN"].replace(/-/g, ""))); 
			$("#step2 #bank_cd").val(data["EFNC_BNCD"]);
			$("#step2 #bank_nm").text(data["BANK_NM"]);
			
			$("#step2 #tran_amt_step1").text(formatter.number(data["EBNK_TRN_AMT"]) +"원");
			//$("#step2 #live_input_msg1").text();한글금액 추가
			$("#step1 #EBNK_CD").val("003");
			$("#step2 #EBNK_CD").val("003");
			$("#step1 #EBNK_NM").text(uf_getTrnBankName("003"));
			$("#step2 #EBNK_NM").text(uf_getTrnBankName("003"));
			$("#step1 #EBNK_ACN").text($.trim(data["EBNK_DROT_ACN"]));
			$("#step2 #EBNK_ACN").text($.trim(data["EBNK_DROT_ACN"]));
			$("#step1 #ACNT_NM").text(" ");
			$("#step2 #ACNT_NM").text(" ");
			$("#step2 #drot_smr_cntn").val($.trim(data["EBNK_DROT_BNPR_CON"])); //출금계좌표시 내용
			$("#step2 #mnrc_smr_cntn").val($.trim(data["EBNK_MNRC_BNPR_CON"])); //입금계좌표시 내용
			$("#step2 #cms_intt_cd").val($.trim(data["EBNK_CMS_CD_CON"   ])); //CMS code
			// 금액한글표기
			//Conv_Kor1(data["EBNK_TRN_AMT"],'2');
			
			//자금코드 초기화
			$("#EFNC_FNDS_CD").val("");
			$("#FNDS_LRDV_NM").val("");
			$("#FNDS_SMDV_NM").val("");
			$("#_FNDS_SEL").text("선택하세요");
			$("#_FNDS_LRDV_NM").val("");
			$("#_FNDS_SMDV_NM").val("");
			
			$("#drot_acnt_pwd").val("");
			
			//메뉴ID(서비스하는 페이지)
			if("fnt_trn_210101_1" == _this.trnformUseSvcId) { //[자동이체]
				if(undefined != _this.tranList && _this.tranList.length == 0) { //[여러계좌이체]최초 '이체추가'시 한번사용(출금계좌'최초한번만 set)
					$('#drot_acno_hid').val(data["EBNK_DROT_ACN"]); //출금계좌
					jex.setJexObj($("#fnt_trn_010101_3")); //출금가능금액
				}
			} else { //Default
				$('#drot_acno_hid').val(data["EBNK_DROT_ACN"]); //출금계좌
				
				// 출금가능금액
				//$("#fnt_trn_010101_3").attr("data-jx-svc-onload", "true");
				jex.setJexObj($("#fnt_trn_010101_3"));
				
			}
			
			//자주쓰는이체'선택 후 셋팅되어지는 금액에 따른 [NEW 금액 한글화] Conv_Kor2 [js/com/jexPlugin/jex.mobile.inputamount.js]
			//$("#Conv_Kor2_to_set_favTrn_amount_btn").val(data["EBNK_TRN_AMT"]);
			//$("#Conv_Kor2_to_set_favTrn_amount_btn").trigger("click");
			if("fnt_trn_110101_1" == _this.trnformUseSvcId) {
				
				$('#transfer_reser').show();    //이체함 선택시에는 옵션과 예약이체항목을 보여준다
				$('#step2_next1').hide();
				$('#step2_next2').show();
							
				uf_preSelectInq(); 				//이체함에서 선택후 예금주조회실행
				//uf_goStep('2'); // 금액입력받는 영역으로 이동
			} else {
				uf_back();
			}
			
		} 
		else {
			uf_user_mract_dsgt_showInfo2();
		}
	}
	_this.setter_favAcntTbl_ebnk_efnc_cpn = ""; //초기화
	return dat;
}

/* 계좌번호로 계좌번호목록 인덱스값 찾기 */
function searchAcnoIdx(acntListTbl, acno, gubun) { //gubun 1 : 당행출금계좌 구분 2:오픈뱅킹 출금계좌구분
	var idx = 0;
	if(gubun =="1") {
		acntListTbl.some(function(item, index) {
			if(acno.trim() == item["EBNK_ACN"].trim()) {
				idx = index;
				return true;
			}
		});
	} else {
		acntListTbl.some(function(item, index) {
			if(acno.trim() == item["RGSN_ACN"].trim()) {
				idx = index;
				return true;
			}
		});
	}
	return idx;
}
/**
 * [출금계좌정보 & 선택 리스트] 사용함
 * @param $jq
 * @param data
 * @returns {___anonymous48262_48263}
 */
function acntListSetter($jq, data) {
	var dat = {};
	
	comSelectPopUtil.setActiveClass($jq); //선택됨 표시
	
	$('#drot_acno_hid').val(data['EBNK_ACN']);
	//즉시이체, 여러계좌이체, 급여이체
	if("fnt_trn_110101_1" == window._tranForm.drotAcntViewType || "fnt_trn_020101_1" == window._tranForm.drotAcntViewType || "fnt_trn_030101_1" == window._tranForm.drotAcntViewType) { 
		jex.setJexObj($("#fnt_trn_010101_3")); // 출금가능금액 조회
	} 
	else if("fnt_trn_080101_1" == window._tranForm.drotAcntViewType) { // 자주쓰는이체편집
		$('#EBNK_ACN').text(formatter.account(data["EBNK_ACN"]));	   //출금계좌번호
	}
	else if ("fnt_trn_250101_1" == window._tranForm.drotAcntViewType) {
		$('#EBNK_ACN').text(formatter.account(data["EBNK_ACN"])); //출금계좌번호
	}
	else { // Default
		$('#EBNK_ACN').text(formatter.account(data["EBNK_ACN"])); //출금계좌번호
	}
	$("#drot_acnt_pwd").val("");
	
	comLayerPopUtil.close('acntListPopup');
	return dat;
}
/**
 * [통합이체 당행 출금계좌정보 & 선택 리스트]
 * @param $jq
 * @param data
 * @returns {___anonymous48262_48263}
 */
function p_acntListSetter($jq, data) {
	
	var acno = $.trim(data['EBNK_ACN']); //출금계좌번호
	uf_isVatAccount(acno); //부가세 매입자 납부전용계좌'이면 해당메뉴로 링크
	
	var dat = {};
	
	//당행본인출금계좌선택시
	$('#drot_acno_hid').val(data['EBNK_ACN']);
	$("#drot_acnt_pwd").val("");
	//통합이체
	if("fnt_trn_110101_1" == window._tranForm.drotAcntViewType || "fnt_trn_210101_1" == window._tranForm.drotAcntViewType) { 
		jex.setJexObj($("#fnt_trn_010101_3")); // 출금가능금액 조회
	} 
	$('#step1 #EBNK_ACN').text(formatter.account(data["EBNK_ACN"])); //출금계좌번호
	$('#step2 #EBNK_ACN').text(formatter.account(data["EBNK_ACN"])); 
	$('#step1 #ACNT_NM').text(data["ACNT_NM"]);  //계좌명
	$('#step2 #ACNT_NM').text(data["ACNT_NM"]); 
	$('#step1 #EBNK_CD').val("003");  //은행코드
	$('#step2 #EBNK_CD').val("003"); 
	$('#step1 #EBNK_NM').text(uf_getTrnBankName("003"));  //은행명
	$('#step2 #EBNK_NM').text(uf_getTrnBankName("003")); 
		
	$('#step1 #trlm_view_opn').hide(); 
	$('#step1 #trlm_view').show(); 
	$('#step2 #transfer_reser_cont').show(); //예약이체 영역 보임
	$('#step2 #trn_opt_area_4').show();      //자금코드 영역 보임
	
	$("#trn_option_area #trn_opt_area_2").show();     //출금계좌표시 내용
	$("#trn_option_area #trn_opt_area_2_opn").hide(); //출금계좌표시 내용
	
	$('#step1 #drot_bncd_logo').removeClass("class");
	$('#step1 #drot_bncd_logo').attr("class", "ico_box ty3 ico_bank_003");
	
	$('#step2 #drot_bncd_logo').removeClass("class");
	$('#step2 #drot_bncd_logo').attr("class", "ico_box ty2 ico_bank_003");
	
	var acnoIdx = searchAcnoIdx(_this.payAcntList, data["EBNK_ACN"],'1'); //계좌번호 인덱스
	
	$("#acntListTbl").find("li").each(function(idx, obj) {
		var rowData = $(obj).data("_JEX_GETALL_DATA_");
		if(idx == acnoIdx) {
			$(obj).attr("aria-selected", "true").addClass("active"); //선택됨 표시
		} else {
			$(obj).attr("aria-selected", "false").removeClass("active"); //선택해제
		}
	});
		
	comLayerPopUtil.close('acntListPopup');
	
	return dat;
}

/**
 * [통합이체 오픈뱅킹 출금계좌정보 & 선택 리스트]
 * @param $jq
 * @param data
 * @returns {___anonymous48262_48263}
 */
function p_openAcntListSetter($jq, data) {
	var dat = {};
	
	var indx = $jq.index();
	
	comSelectPopUtil.setActiveClass($jq); //선택됨 표시
	
	//오픈뱅킹 본인출금계좌선택시
	$('#drot_acno_hid').val(data['RGSN_ACN']);
	$("#drot_acnt_pwd").val("");
	//통합이체
	if("fnt_trn_110101_1" == window._tranForm.drotAcntViewType) { 
		//출금계좌선택시 출금가능액을 가져오는걸로 변경
		//var opn_pvamt_for = $("#myOpnDrotAcntListTbl").find("li:eq("+indx+")").find("#OPN_DROT_ABL_AMT").text().replace(/원/g, ""); 
		//$('#step1 #pvamt_for').text(formatter.number(opn_pvamt_for)); //지불가능금액
		//$('#step2 #pvamt_for').text(formatter.number(opn_pvamt_for)); //지불가능금액
		uf_getDrotAblAmt_sel(data["OPBN_BNCD"], data["RGSN_ACN"]); //오픈뱅킹 계좌잔액조회
	} 
	$('#step1 #EBNK_ACN').text(formatter.account(data["RGSN_ACN"])); //출금계좌번호
	$('#step2 #EBNK_ACN').text(formatter.account(data["RGSN_ACN"])); 
	$('#step1 #ACNT_NM').text(data["OPBN_ANM_ACNT_NM"]);  //계좌명
	$('#step2 #ACNT_NM').text(data["OPBN_ANM_ACNT_NM"]); 
	$('#step1 #EBNK_CD').val(data["OPBN_BNCD"]);  //은행코드
	$('#step2 #EBNK_CD').val(data["OPBN_BNCD"]); 
	$('#step1 #EBNK_NM').text(data["BANK_NM"]);  //은행명
	$('#step2 #EBNK_NM').text(data["BANK_NM"]); 
	
	$('#step1 #trlm_view_opn').show(); 
	$('#step1 #trlm_view').hide(); 
	$('#step2 #transfer_reser_cont').hide(); //예약이체 영역 히든
	$('#step2 #trn_opt_area_4').hide();      //자금코드 영역 히든	
	
	$("#trn_option_area #trn_opt_area_2").hide();     //출금계좌표시 내용
	$("#trn_option_area #trn_opt_area_2_opn").show(); //출금계좌표시 내용
	
	$('#step1 #drot_bncd_logo').removeClass("class");
	$('#step1 #drot_bncd_logo').attr("class", "ico_box ty3 ico_bank_"+data["OPBN_BNCD"]);
	$('#step1 #drot_bncd_logo').find(".ico_box ty3 ico_bank_").removeClass("class");
	$('#step1 #drot_bncd_logo').attr("class", "ico_box ty3 ico_bank_000");
	
	$('#step2 #drot_bncd_logo').removeClass("class");
	$('#step2 #drot_bncd_logo').attr("class", "ico_box ty2 ico_bank_"+data["OPBN_BNCD"]);
	$('#step2 #drot_bncd_logo').find(".ico_box ty2 ico_bank_").removeClass("class");
	$('#step2 #drot_bncd_logo').attr("class", "ico_box ty2 ico_bank_000");
	
	var acnoIdx = searchAcnoIdx(_this.openDrotAcntList, data["RGSN_ACN"],'2'); //계좌번호 인덱스
	
	$("#myOpnDrotAcntListTbl").find("li").each(function(idx, obj) {
		var rowData = $(obj).data("_JEX_GETALL_DATA_");
		if(idx == acnoIdx) {
			$(obj).attr("aria-selected", "true").addClass("active"); //선택됨 표시
		} else {
			$(obj).attr("aria-selected", "false").removeClass("active"); //선택해제
		}
		
	});
	
	comLayerPopUtil.close('acntListPopup');
	
	return dat;
}

var trnform_fnt_trn_250101_2 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		
		var jsonDat  = {};
		var index    = "";
		var drot_acno= "";
		
		if ($('#acntListPopup').is(':visible')) {
			drot_acno = $('#drot_acno_hid').val().replace(/-/g, "");
		} else {
			drot_acno = $("#step" + cur_step).find("#EBNK_ACN").text().replace(/-/g, ""); //[초기진입]
		}
		
		jsonDat["DROT_ACN"] = drot_acno;
		
		return jsonDat;
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			MobPopup.showErrorPopupForData(data, function() {
				uf_goStep(jex.plugin.get("JEX_MOBILE_STEP").getStepNo());
			});
			
			return "STOP_SVC";
		} else {
			var jsonDat = {};
			jsonDat = data;
			
			$("#mmtAcctDetailView").find("#ORCP_AMT"     ).text(formatter.number(data["ORCP_AMT"     ]));
			$("#mmtAcctDetailView").find("#BSC_RMNR_AMT" ).text(formatter.number(data["BSC_RMNR_AMT" ]));
			$("#mmtAcctDetailView").find("#TRPF_AMT"     ).text(formatter.number(data["TRPF_AMT"     ]));
			$("#mmtAcctDetailView").find("#TRST_RMNR_RT" ).text(formatter.number(data["TRST_RMNR_RT" ]));
			$("#mmtAcctDetailView").find("#MNIE_RT"      ).text(formatter.number(data["MNIE_RT"      ]));
			
			$("#mmtAcctDetailView").find("#TRSR_YMD"     ).text(formatter.date(data["TRSR_YMD"     ]) + " ~ "+ formatter.date(data["TRFS_YMD"]));
			$("#mmtAcctDetailView").find("#LAST_INOT_YMD").text(formatter.date(data["LAST_INOT_YMD"]));
			
			return jsonDat;
		}
	},
	uf_exec : function() {
		comLayerPopUtil.open('mmtAcctDetailView');
		//$('#mmtAcctDetailView').show();
		//jex.getJexObj($("#mmtAcctDetailView"), "JEX_MOBILE_DIALOG").execute();
	}
};

/**
 * [출금계좌 선택시 잔액 조회]
 */
var trnform_fnt_trn_010101_3 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var jsonDat  = {};
		var index    = "";
		var drot_acno= "";
		
		if("code_trn0001" == $jq.attr("data-jx-tranform-btn-acnt-detail")){ //[이체한도]
			drot_acno = $("#step1").find("#EBNK_ACN").text().replace(/-/g, "");
			
			if(isEmpty(drot_acno) || isNaN(drot_acno)){ //Check :: (drot_acno == "선택하세요")등 숫자가 아닐경우
				//주메세지, title, callback[확인], 서브메세지
				MobPopup.showAlertPopup("출금계좌를 선택하세요.", "", function() { }, "");
				return "ALLSTOP";
			}
		}
		else {
			if ($('#acntListPopup').is(':visible')) { //[출금계좌정보 & 선택 리스트]
				//index = $jq.attr("data-rownum");
				drot_acno = $('#drot_acno_hid').val().replace(/-/g, "");
				jsonDat["DROT_ACN"] = drot_acno;
				
				//$('#ACNT_NM').text(" ");   //계좌별명'
				$('#pvamt_for').text(" "); //지불가능금액
			}
			else { // [초기진입, 자주쓰는이체]
				if(_this.setterFavTrnUse == "Y"){ //자주쓰는이체 setter
					drot_acno = $('#drot_acno_hid').val(); //[자주쓰는이체] 선택시
					_this.setterFavTrnUse = ""; //초기화
				} else {
					drot_acno = $("#step" + cur_step).find("#EBNK_ACN").text().replace(/-/g, ""); //[초기진입]
					$('#drot_acno_hid').val(drot_acno); //[초기진입]시 출금가능액['조회오류']이지만, 본인이 선택한 계좌는 셋팅한다..
				}
				
				if(isEmpty(drot_acno) || isNaN(drot_acno)){
					console.log("ljy :: [초기진입, 자주쓰는이체]출금가능액 : 계좌없거나 숫자아님[NaN] ALLSTOP");
					return "ALLSTOP";
				}
			}
		}
		
		$jq.attr("data-jx-svc-source-direct", JSON.stringify({
			"DROT_ACN" : drot_acno
		}));
		
		// 자주쓰는이체 편집 [fnt_trn_080101_1.html]
		if (drot_acno == "" || drot_acno == undefined || drot_acno == null) {
			$jq.attr("data-jx-svc-iscall", "false");
			return "ALLSTOP";
		} else {
			$jq.attr("data-jx-svc-iscall", "true");
			return {};
		}
	},
	uf_out : function($jq, data, index) {
		if (data["_is_error"] == "true") {
			if("code_btn_trn0000" == $jq.attr("data-jx-svc-gubn")) { // 출금가능금액 [초기 진입시]
				$("#drotAcntInfo").find("#pvamt_for").next().hide();
				$("#drotAcntInfo").find("#pvamt_for").text("-"); //"조회오류"
				$(this).find("#won").hide();
				
				//출금가능액['조회오류']이지만, 본인이 선택한 계좌는 셋팅한다..
				$('#EBNK_ACN').text(formatter.account($('#drot_acno_hid').val())); //출금계좌번호
			} 
			else {
				//수정전
				//MobPopup.showAlertPopup(data["_error_msg"], "", function() {
				//	_webViewExit();
				//});
				
				/**
					GatewayUtil.java :: 공통에러필드 리턴
					["_is_error"    ]
					["_error_cd"    ]
					["_error_msg"   ]
					["_error_action"]
					data-jx-svc-errtrx="false" 설정시 jsp에서 에러코드필드 재정의 하지 않았으면 위의 필드값 리턴
				*/
				//[ Pattern 1 ] :: param(Object, callback Function);
				MobPopup.showErrorPopupForData(data, function() {
					//_webViewExit();
					//목표 1 : [이체한도]팝업' Close
					//목표 2 : [이체한도]팝업' 이전화면으로..
					uf_goStep(jex.plugin.get("JEX_MOBILE_STEP").getStepNo());
				});
				
				//[ Pattern 2 ]
				//MobPopup.showErrorPopup(code, msg, function() { });
			}
			return "STOP_SVC";
		} 
		else {
			var jsonDat = {};
			
			if("code_trn0001" == $jq.attr("data-jx-tranform-btn-acnt-detail")){ //[이체한도]팝업
				jsonDat['TRLM_AMT_01'] = data["TRLM_AMT_01"]; //고객1일이체한도
				jsonDat['TRLM_AMT_02'] = data["TRLM_AMT_02"]; //고객1회이체한도
				jsonDat['TRLM_AMT_03'] = data["TRLM_AMT_03"]; //계좌1일이체한도
				jsonDat['TRLM_AMT_04'] = data["TRLM_AMT_04"]; //고객1일잔여한도
				jsonDat['TRLM_AMT_05'] = data["TRLM_AMT_05"]; //계좌1일잔여한도
				
				if("Y"==data["ITBK_DRACT_YN"]){ //96펀드계좌
					$("#step1 #TRLM_AMT_03").hide();
					$("#step1 #TRLM_AMT_04").hide();
					$("#step1 #TRLM_AMT_05").hide();
					$("#step2 #TRLM_AMT_03").hide();
					$("#step2 #TRLM_AMT_04").hide();
					$("#step2 #TRLM_AMT_05").hide();
				} else {
					$("#step1 #TRLM_AMT_03").show();
					$("#step1 #TRLM_AMT_04").show();
					$("#step1 #TRLM_AMT_05").show();
					$("#step2 #TRLM_AMT_03").show();
					$("#step2 #TRLM_AMT_04").show();
					$("#step2 #TRLM_AMT_05").show();
				}
				//jex.getJexObj($("#acctDetailView"), "JEX_MOBILE_DIALOG").execute(); //[이체한도] 팝업
				
			} 
			else {
				jsonDat = data;
				$('#drot_acno_hid').val(data["DROT_ACN"]);
				$("#drotAcntInfo").find("#pvamt_for").next().show();
				
				//$('#ACNT_NM').text(data["RPRS_PDM"]); //계좌별명.text( 대표상품명 )
				$('#EBNK_ACN').text(formatter.account(data["DROT_ACN"])); //출금계좌번호
				$('#step1 #pvamt_for').text(formatter.number(data["PYMT_ABL_AMT"])); //지불가능금액
				$('#step2 #pvamt_for').text(formatter.number(data["PYMT_ABL_AMT"])); //지불가능금액
				$("#step1 #TRLM_AMT_01").text(formatter.number(data["TRLM_AMT_01"]));
				$("#step1 #TRLM_AMT_02").text(formatter.number(data["TRLM_AMT_02"]));
				$("#step1 #TRLM_AMT_03").text(formatter.number(data["TRLM_AMT_03"]));
				$("#step1 #TRLM_AMT_04").text(formatter.number(data["TRLM_AMT_04"]));
				$("#step1 #TRLM_AMT_05").text(formatter.number(data["TRLM_AMT_05"]));
				$("#step2 #TRLM_AMT_01").text(formatter.number(data["TRLM_AMT_01"]));
				$("#step2 #TRLM_AMT_02").text(formatter.number(data["TRLM_AMT_02"]));
				$("#step2 #TRLM_AMT_03").text(formatter.number(data["TRLM_AMT_03"]));
				$("#step2 #TRLM_AMT_04").text(formatter.number(data["TRLM_AMT_04"]));
				$("#step2 #TRLM_AMT_05").text(formatter.number(data["TRLM_AMT_05"]));
			}
			return jsonDat;
		}
	},
	uf_exec : function() {		
		
		/*
		 * 웹접근성 추가 20240117
		 * */

		$("#acctDetailView>div").focus();
		
		console.log("ljy :: 출금가능액 : uf_exec()");
	}
};

function uf_goFxBalc() {
	jex.setJexObj($("#trnform_fnt_trn_250101_2").attr("data-jx-svc-onload", "true"));
}

/**
 * [은행, 증권사] 리스트 :: fnt_trn_110101_1.js
 */
function trnform_drawMnrcBankList(mnrcBankList) {
	var bankList1html = '';
	var bankList2html = '';
	var bankList3html = '';
	
	if (JSON.stringify(mnrcBankList) != []) {
		for (var i = 0; i < mnrcBankList.length; i++) {
			var bank = mnrcBankList[i];
			if (i == 0) {
				_this.defaultBank = bank;
			}
			if (bank['bank_cd'].startsWith('0')) { // [은행]인경우
				bankList1html += '<li role="option" tabindex="-1" onclick="selectBank(\''
								    + bank["bank_cd"] + '\',\'' + bank["bank_nm"] + '\')">'
									+ '<div class="ico_box ty1 ico_bank_'+ bank["bank_cd"]+'"></div>'
										+ '<span class="name">' + bank["bank_nm"] +'</span>'
								+ '</li>';
			} 
			else {                                 // [증권사]인경우
				bankList3html += '<li role="option" tabindex="-1" onclick="selectBank(\''
					                + bank["bank_cd"] + '\',\'' + bank["bank_nm"] + '\')">'
									+ '<div class="ico_box ty1 ico_bank_'+ bank["bank_cd"]+'"></div>'
										+ '<span class="name">' + bank["bank_nm"] +'</span>'
								+ '</li>';
			}
		}
		
		bankList2html += '<li role="option" tabindex="-1" onclick="selectBank(\'0126\',\'국세\')">'
							+ '<div class="ico_box ty1 ico_government"></div>'
							+ '<span class="name">국세</span>'
							+ '</li>'
						 +'<li role="option" tabindex="-1" onclick="selectBank(\'485\',\'국고금\')">'
							+ '<div class="ico_box ty1 ico_government"></div>'
							+ '<span class="name">국고금</span>'
							+ '</li>'
						 +'<li role="option" tabindex="-1" onclick="selectBank(\'481\',\'지방세입\')">'
							+ '<div class="ico_box ty1 ico_government"></div>'
							+ '<span class="name">지방세입</span>'
							+ '</li>';
		
		$('#bankListStep #bankList1').html("");
		$('#bankListStep #bankList2').html("");
		$('#bankListStep #bankList3').html("");
		$('#bankListStep #bankList1').append(bankList1html);
		$('#bankListStep #bankList2').append(bankList2html);
		$('#bankListStep #bankList3').append(bankList3html);
		//$('#' + window._tranForm.id + ' #bank_cd').val(_this.defaultBank['bank_cd']);
		//$('#' + window._tranForm.id + ' #bank_nm').text(_this.defaultBank['bank_nm']);
	}
}


/**
 * [은행, 증권사] 리스트 :: 오픈뱅킹 참가기관목록
 */
function trnform_drawMnrcOpenBankList(opn_bank_list) {
	var openBankList1html = '';
	var openBankList3html = '';
	
	if (JSON.stringify(opn_bank_list) != []) {
		for (var i = 0; i < opn_bank_list.length; i++) {
			var bank = opn_bank_list[i];
			if (i == 0) {
				_this.defaultBank = bank;
			}
			if (bank['bank_cd'].startsWith('0')) { // [은행]인경우
				openBankList1html += '<li role="option" tabindex="-1" onclick="openSelectBank(\''
								    + bank["OPBN_BNCD"] + '\',\'' + bank["OPBN_BNCD_NM"] + '\')">'
									+ '<div class="ico_box ty1 ico_bank_'+ bank["OPBN_BNCD"]+'"></div>'
										+ '<span class="name">' + bank["OPBN_BNCD_NM"] +'</span>'
								+ '</li>';
			} 
			else {                                 // [증권사]인경우
				openBankList3html += '<li role="option" tabindex="-1" onclick="openSelectBank(\''
					                + bank["OPBN_BNCD"] + '\',\'' + bank["OPBN_BNCD_NM"] + '\')">'
									+ '<div class="ico_box ty1 ico_bank_'+ bank["OPBN_BNCD"]+'"></div>'
										+ '<span class="name">' + bank["OPBN_BNCD_NM"] +'</span>'
								+ '</li>';
			}
		}
		
		$('#bankListOpenStep #openBankList1').html("");
		$('#bankListOpenStep #openBankList3').html("");
		$('#bankListOpenStep #openBankList1').append(openBankList1html);
		$('#bankListOpenStep #openBankList3').append(openBankList3html);
		
	}
}
/**
 * 입금[은행,증권사] 리스트 팝업 노출
 */
function showBankListPopup() {
	
	comLayerPopUtil.open('bankListStep');
	$('#bankListStep').show();
	//uf_goStep(20000);
}

/**
 * 입금[은행,증권사] 리스트 팝업 노출 오픈뱅킹참가기관목록
 */
function showBankListOpenPopup() {
	
	comLayerPopUtil.open('bankListOpenStep');
	$('#bankListOpenStep').show();
	//uf_goStep(20000);
}

/**
 * 입금[은행,증권사] 리스트 선택
 * 
 * @param bankCd
 * @param bankNm
 */
function selectBank(bankCd, bankNm) {
	$('#bank_area_div #bank_nm').text(bankNm);
	$('#bank_area_div #bank_cd').val(bankCd);
		
	//국세.지방세.국고금 납부을 위해 버튼을 바꿔준다
	if("fnt_trn_110101_1" == _this.pgId){
		if($('#bank_cd').val() != "0126" && $('#bank_cd').val() != "481" && $('#bank_cd').val() != "485"){
			$("#step1_next1").show(); //다음
			$("#step1_next2").hide(); //즉시납부
			
		} else {
			$("#step1_next1").hide(); //다음
			$("#step1_next2").show(); //즉시납부
		}
	
		comBtnStateUtil.update(); //버튼 활성화 상태 갱신 - 기본 이벤트(input keyup, checkbox change)가 아닌경우 직접 호출함
	}
/*
	[comMobValidation.js']의 옵션변경 후 MobValidation.start() 하는 문제(여러번 사용시 이전 이벤트들 잔류등의..문제점) :: 사용제한함.
	if (bankCd == "003") {
		$("#cms_intt_cd").attr("data-jx-chk-opt",'{"name":"CMS","charType":"engNum","userChar":"-","maxLength":24}');
	} else {
		$("#cms_intt_cd").attr("data-jx-chk-opt",'{"name":"CMS","charType":"engNum","userChar":"","maxLength":24}');
	}
	jex.setJexObj($("#cms_intt_cd"));
*/
	comLayerPopUtil.close('bankListStep');
}

/**
 * 입금[은행,증권사] 오픈뱅킹 참기기관선택
 * 
 * @param bankCd
 * @param bankNm
 */
function openSelectBank(bankCd, bankNm) {
	$('#bank_area_div #bank_nm').text(bankNm);
	$('#bank_area_div #bank_cd').val(bankCd);
	
	comLayerPopUtil.close('bankListOpenStep');
}

/**
 * [공과금]은행선택 > 국세간편계좌납부서비스
 */
function uf_kor_page() {
	var notErr   = true;
	var err_msg  = "";
	var mnrc_acn = $('#step1').find('#mnrc_acno').val();
	var tmpTaxType = $("#bank_cd").val();
	//var mnrc_acn = $('#bankListStep').find('#kor_number').val();
	//var tmpTaxType = $("#tax_type").val();
	
	if (mnrc_acn.length < 19) {
		err_msg = "전자납부번호 19자리를 입력해 주세요.";
		notErr = false;
	}
	
	if (tmpTaxType == "485") {
		if (mnrc_acn.substring(0,4) == "0126" || mnrc_acn.substring(0,4) == "0127") { // '0126': 국세  '0127': 관세
			err_msg = "국고금 전자납부번호만 입력 가능합니다. 전자납부번호를 확인해주세요.";
			notErr = false;
		}
	}
	
	if (!notErr) {
		//주메세지, title, callback[확인], 서브메세지
		MobPopup.showAlertPopup(err_msg);
	} else {
		var objId = "";

		if (tmpTaxType == "0126") { // 국세납부 조회 서비스 호출
			objId = "#svc_fnt_pbc_030101_3";
			
		} else if (tmpTaxType == "481") { // 지방세납부 조회 서비스 호출
			objId = "#svc_fnt_pbc_020101_4";
			
		} else if (tmpTaxType == "485") { // 국고금납부 조회 서비스 호출
			objId = "#svc_fnt_pbc_030101_5";
		}
		
		jex.setJexObj($(objId).attr("data-jx-svc-onload","true"));		
	}
}

/**
 * [공과금]국세상세조회
 */
var svc_fnt_pbc_030101_3 = {
	uf_in : function($jq){
		var dat = {};
		dat["ELCR_PMNT_NO"  ] = $('#step1').find('#mnrc_acno').val(); // 전자납부번호
		dat["W_TRNS_TOT_AMT"] = "0";
		return dat;
	},
	uf_out : function($jq, data) {
		_this.pbc_030101_3 = data["_tran_res_data"][0];
		
		var _is_error  = _this.pbc_030101_3["_is_error" ];
		var _error_cd  = _this.pbc_030101_3["_error_cd" ];
		var _error_msg = _this.pbc_030101_3["_error_msg"];
		var GIRO_TLGR_SLDT_PYTG_EN = _this.pbc_030101_3.GIRO_TLGR_SLDT_PYTG_EN; //연대납부 유무
		
		// 연대납부유무 Y 이면 납부를 못하게 한다.
		if(GIRO_TLGR_SLDT_PYTG_EN == "Y" || _error_cd == "ECBKAGN00636") {
			MobPopup.showAlertPopup("고객님께서 납부하실 건은 연대납부입니다.", "", "", "가까운 영업점 및 인터넷지로 사이트<br>http://www.giro.or.kr 에서 납부하시길 바랍니다.");
			return "STOP_SVC";
		} else if(_is_error == "true") {
			MobPopup.showErrorPopup(_error_cd, _error_msg);
			return "STOP_SVC";
		}
		
		return data;
	},
	uf_exec : function() {
		// 거래총금액 구하기
		var payAmt = "";
		var tmpm_bfaf_dscd = _this.pbc_030101_3.GIRO_TLGR_PPIN_AF_DSNC_NM;
		
		if(tmpm_bfaf_dscd == "A") { //납기후 (A면 납기후)
			payAmt = formatter.number(_this.pbc_030101_3.PPAF_AMT).replace(/,/g,"");
		} else {                    //납기전 (B면 납기전)
			payAmt = formatter.number(_this.pbc_030101_3.PPIN_AMT).replace(/,/g,"");
		}
		
		var ebnkNm   = $("#step1 #EBNK_NM").text();
		var taxType  = $("#step1 #bank_cd").val();
		var mnrc_acn = $('#step1').find('#mnrc_acno').val();
		var ebnk_acn = $('#step1').find('#EBNK_ACN').text();
		var param    = "MNRC_ACN=" + mnrc_acn + "&EBNK_ACN=" + encodeURI(encodeURIComponent(ebnk_acn)) + "&payAmt=" + payAmt + "&taxType=" + taxType + "&ebnkNm=" + ebnkNm;
		comWebkey_goMenu("5009", "fnt_trn_090101_1", param);
	}
};

/**
 * [공과금]지방세상세조회
 */
var svc_fnt_pbc_020101_4 = {
	uf_in : function($jq){
		var dat = {};
		var elcrPmntNo   = $('#step1').find('#mnrc_acno').val();
		var localTaxType = elcrPmntNo.substring(5,6);
		
		dat["ELCR_PMNT_NO"] = elcrPmntNo;   // 전자납부번호
		dat["TAX_TYPE"    ] = localTaxType; // 1: 지방세, 2: 세외수입, 9: 환경개선부담금, 0: 상하수도요금
		
		return dat;
	},
	uf_out : function($jq, data) {
		
		var _is_error  = data["_tran_res_data"][0]["_is_error"];
		var _error_msg = data["_tran_res_data"][0]["_error_msg"];

		if (_is_error == "true") {
			
			MobPopup.showAlertPopup(_error_msg);
	
			return "STOP_SVC";
			
		} else {
			var resultData = data["_tran_res_data"][0];
			
			// 거래총금액 구하기
			var payAmt = "";
			// A:납기후, B:납기내, C:납기무관
			var tmpm_bfaf_dscd = resultData.GIRO_TLGR_PPIN_AF_DSNC_NM;
			
			if(tmpm_bfaf_dscd == "A") { //납기후 (A면 납기후)
				payAmt = formatter.number(resultData.PPAF_AMT).replace(/,/g,"");
			} else {                    //납기전 (B면 납기전)
				payAmt = formatter.number(resultData.PPIN_AMT).replace(/,/g,"");
			}
			
			var ebnkNm   = $("#step1 #EBNK_NM").text();
			var taxType  = $("#step1 #bank_cd").val();
			var mnrc_acn = $('#step1').find('#mnrc_acno').val();
			var ebnk_acn = $('#step1').find('#EBNK_ACN').text();
			var param    = "MNRC_ACN=" + mnrc_acn + "&EBNK_ACN=" + encodeURI(encodeURIComponent(ebnk_acn)) + "&payAmt=" + payAmt + "&taxType=" + taxType+ "&ebnkNm=" + ebnkNm;
			comWebkey_goMenu("5009", "fnt_trn_090101_1", param);			
		}
		
		return data;
	},
	uf_exec : function() {

	}
};


/**
 * [공과금]국고금상세조회
 */
var svc_fnt_pbc_030101_5 = {
	uf_in : function($jq){
		var dat = {};
		dat["ELCR_PMNT_NO"  ] = $('#step1').find('#mnrc_acno').val(); // 전자납부번호
		dat["W_TRNS_TOT_AMT"] = "0";
		return dat;
	},
	uf_out : function($jq, data) {
		_this.pbc_030101_5 = data["_tran_res_data"][0];
		
		var _is_error  = _this.pbc_030101_5["_is_error" ];
		var _error_cd  = _this.pbc_030101_5["_error_cd" ];
		var _error_msg = _this.pbc_030101_5["_error_msg"];
//		var GIRO_TLGR_SLDT_PYTG_EN = _this.pbc_030101_5.GIRO_TLGR_SLDT_PYTG_EN; //연대납부 유무
		
//		// 연대납부유무 Y 이면 납부를 못하게 한다.
//		if(GIRO_TLGR_SLDT_PYTG_EN == "Y" || _error_cd == "ECBKAGN00636") {
//			MobPopup.showAlertPopup("고객님께서 납부하실 건은 연대납부입니다.", "", "", "가까운 영업점 및 인터넷지로 사이트<br>http://www.giro.or.kr 에서 납부하시길 바랍니다.");
//			return "STOP_SVC";
//		} else if(_is_error == "true") {
//			MobPopup.showErrorPopup(_error_cd, _error_msg);
//			return "STOP_SVC";
//		}
		
		if(_is_error == "true") {
			MobPopup.showErrorPopup(_error_cd, _error_msg);
			return "STOP_SVC";
		}
		
		return data;
	},
	uf_exec : function() {
		// 거래총금액 구하기
		var payAmt = "";
		var tmpm_bfaf_dscd = _this.pbc_030101_5.GIRO_TLGR_PPIN_AF_DSNC_NM;
		
		if(tmpm_bfaf_dscd == "A") { //납기후 (A면 납기후)
			payAmt = formatter.number(_this.pbc_030101_5.PPAF_AMT).replace(/,/g,"");
		} else {                    //납기전 (B면 납기전)
			payAmt = formatter.number(_this.pbc_030101_5.PPIN_AMT).replace(/,/g,"");
		}
		
		var ebnkNm   = $("#step1 #EBNK_NM").text();
		var taxType  = $("#step1 #bank_cd").val();
		var mnrc_acn = $('#step1').find('#mnrc_acno').val();
		var ebnk_acn = $('#step1').find('#EBNK_ACN').text();
		var param    = "MNRC_ACN=" + mnrc_acn + "&EBNK_ACN=" + encodeURI(encodeURIComponent(ebnk_acn)) + "&payAmt=" + payAmt + "&taxType=" + taxType+ "&ebnkNm=" + ebnkNm;
		comWebkey_goMenu("5009", "fnt_trn_090101_1", param);
	}
};



/**
 * [초기 진입시] 최근출금계좌 자동 세팅
 * 
 *** 요건 : 다음 4가지인 경우 기존 프로세스 유지 ***
 *    a.현재 출금계좌리스트가 없는 경우
 *    b.최근이체내역이 없는 경우
 *    c.현재 출금계좌리스트에 최근출금계좌가 없는 경우
 *    d.최근출금계좌가 부가세계좌인 경우
 *    + 추가사항 : 출금계좌 자동세팅 후 출금가능액 셋팅.
 */
var trnform_init_fnt_trn_010101_1 = {
	uf_in : function($jq, data) {
		if(0 == _this.payAcntList.length) {
			//a.현재 출금계좌리스트가 없는 경우
			return "ALLSTOP";
		}
		return data;
	},
	uf_out : function($jq, data, index) {
		var isRun = true;
		var acnt_nm = "";
		if (!(data["list"] == null || data["list"] == undefined || data["list"] == "" || JSON.stringify(data["list"]) == [])) {
			var list = data["list"];
			
			for(var i=0; i<_this.payAcntList.length; i++){                //출금계좌
				if($.trim(list[0]["EBNK_DROT_ACN"]) == $.trim(_this.payAcntList[i]["EBNK_ACN"])) {
					acnt_nm = $.trim(_this.payAcntList[i]["ACNT_NM"]); //최근출금계좌정보에는 계좌별명이 없는 관계로 출금계좌목록에서 가져옴
					isRun = true;
					
					for(var j=0; j<_this.forAsdDrotAcntList.length; j++){ //부가세계좌
						if($.trim(list[0]["EBNK_DROT_ACN"]) == _this.forAsdDrotAcntList[j]["CUS_ACN"] ) {
							acnt_nm = $.trim(_this.payAcntList[i]["ACNT_NM"]); //최근출금계좌정보에는 계좌별명이 없는 관계로 출금계좌목록에서 가져옴
							isRun = false; //d.최근출금계좌가 부가세계좌인 경우
							break;
						}
					}
					break;
				} else {
					acnt_nm = "";
					isRun = false; //c.현재 출금계좌리스트에 최근출금계좌가 없는 경우
				}
			}
		} else {
			acnt_nm = "";
			isRun = false; //b.최근이체내역이 없는 경우
		}
		
		if(isRun) { //“최근출금계좌” 자동 세팅
			if((undefined == _this.q_acno || "" == _this.q_acno) && (undefined == _this.drot_acn || "" == _this.drot_acn)){
				$("#drotAcntInfo").find("#EBNK_ACN").text(formatter.accountNumber($.trim(list[0]["EBNK_DROT_ACN"])));
				$("#drotAcntInfo").find("#ACNT_NM").text($.trim(acnt_nm));
				jex.setJexObj($("#fnt_trn_010101_3"));
			}
		} else {
			//최근출금계좌가 없으면 첫번째 계좌를 보여준다
			if((undefined == _this.q_acno || "" == _this.q_acno) && (undefined == _this.drot_acn || "" == _this.drot_acn)){
				jex.setAll($("#step1").find("#drotAcntInfo"), _this.payAcntList[0]);
				jex.setJexObj($("#fnt_trn_010101_3"));
			}
		}
		return data;
	},
	uf_exec : function() {
		
	}
};

/**
 * [최근입금계좌] 정보
 */

var trnform_fnt_trn_010101_1 = {
	uf_in : function($jq, data) {
		//사용자입금계좌지정여부[Y/N]
		if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
			uf_user_mract_dsgt_showInfo();
			return "ALLSTOP";
		} 
		else { //Default
			return data;
		}
	},
	uf_out : function($jq, data, index) {
		var jsonDat = {};
		var latelyList = [];
		
		if (!(data["list"] == null || data["list"] == undefined || data["list"] == "" || JSON.stringify(data["list"]) == [])) {
			var list = data["list"];
			//EFNC_MNRC_BNCD      E금융입금은행코드
			//MNRC_ACN            입금계좌번호
			//EBNK_DROT_ACN       E뱅킹출금계좌번호
			//RGSN_YMD            등록년월일
			//EBNK_EFNC_RGSN_HMS  E뱅킹E금융등록시각
			//DRW_NM              수취인명
			for (var i = 0; i < list.length; i++) {
				var EFNC_MNRC_BNCD        = $.trim(list[i]["EFNC_MNRC_BNCD"]);
				list[i]["MNRC_ACNO"     ] = $.trim(list[i]["MNRC_ACN"      ]);
				list[i]["ECFN_MNRC_BNNM"] = $.trim(list[i]["EFNC_MNRC_BNCD"]);
				list[i]["EFNC_MNRC_BNCD"] = $.trim(list[i]["EFNC_MNRC_BNCD"]);
				if (EFNC_MNRC_BNCD == "003") {
					list[i]["MNRC_ACNO"] = formatter.accountNumber($.trim(list[i]["MNRC_ACN"]));
				}
				latelyList.push(list[i]);
				
			}
			
			jsonDat[window._tranForm.formIds.latelyAcntListTbl] = latelyList;
			$("#latelyAcntStep #no_search_data").hide();
			$("#latelyAcntStep #latelyAcntStep_html_1").hide(); //최근입금계좌 조회 내역이 없습니다.
		}
		else {
			$("#latelyAcntStep #no_search_data").hide();
			$("#latelyAcntStep #latelyAcntStep_html_1").show(); //최근입금계좌 조회 내역이 없습니다.
		}
		return jsonDat;
	},
	uf_exec : function() {
		/*var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		if (cur_step != 4001) {
			$("#latelyAcntStep #trnform_search_word").val(""); //검색어' 초기화
			uf_goStep(4001);
		}*/
		

		$("#latelyAcntStep #trnform_search_word").val(""); //검색어' 초기화
		comLayerPopUtil.open('latelyAcntStep');
		$('#latelyAcntStep').show();
		
		
		//은행별 icon 세팅
		$("#latelyAcntListTbl").find("li").each(function(idx, item){
			var bankCd = $(item).data('_JEX_GETALL_DATA_').EFNC_MNRC_BNCD;
			var target = $(item).find(".ico_box")[0];
			if(!MobUtil.isEmpty(uf_getTrnBankName(bankCd))){
			    $(target).removeClass("ico_box ty3 ico_bank_000");
		        $(target).addClass("ico_box ty3 ico_bank_"+bankCd);
		    } 
		});
		
	}
};

/**
 * [최근입금계좌] setter
 * 
 * @param $jq
 * @param data
 */
function uf_setter_latelyAcntListTbl($jq, data) {
	var index = $jq.index();
	//BANK_NM
	//DRW_NM
	//EBNK_DROT_ACN
	//EBNK_EFNC_RGSN_HMS
	//ECFN_MNRC_BNNM
	//EFNC_MNRC_BNCD
	//MNRC_ACN
	//MNRC_ACNO
	//RGSN_YMD

	_this.setter_favAcntTbl_ebnk_efnc_cpn = ""; //초기화
	
	var dat = {};
	console.log(_this.trnformUserType_svcAblPage);
	if (_this.trnformUserType_svcAblPage) {
		if (data["EFNC_MNRC_BNCD"] == '003' || data["EFNC_MNRC_BNCD"] == '') {
			dat["mnrc_acno"] = "";
			dat["bank_cd"  ] = "004";
			dat["bank_nm"  ] = "국민은행";
		} else {
			dat["mnrc_acno"] = $.trim(data["MNRC_ACNO"].replace(/-/g, ""));
			dat["bank_cd"  ] = data["EFNC_MNRC_BNCD"];
			dat["bank_nm"  ] = data["BANK_NM"       ];
		}
	} else {
		dat["mnrc_acno"] = $.trim(data["MNRC_ACNO"].replace(/-/g, ""));
		dat["bank_cd"  ] = data["EFNC_MNRC_BNCD"];
		dat["bank_nm"  ] = data["BANK_NM"       ];
	}
	
	comSelectPopUtil.setActiveClass($jq); //선택됨 표시
	comLayerPopUtil.close('latelyAcntStep');
			
	return dat;
}

function uf_setter_latelyAcntListTbl_1($jq, data) {
	var row_data = $(event.target).parents("li").data("_JEX_GETALL_DATA_");
	
	//BANK_NM
	//DRW_NM
	//EBNK_DROT_ACN
	//EBNK_EFNC_RGSN_HMS
	//ECFN_MNRC_BNNM
	//EFNC_MNRC_BNCD
	//MNRC_ACN
	//MNRC_ACNO
	//RGSN_YMD
	_this.setter_favAcntTbl_ebnk_efnc_cpn = ""; //초기화
	
	jex_date = {};
	jex_date["mnrc_acno"] = $.trim(row_data["MNRC_ACNO"].replace(/-/g, ""))
	jex_date["bank_cd"  ] = row_data["EFNC_MNRC_BNCD"];
	jex_date["bank_nm"  ] = row_data["BANK_NM"       ];
	
	return jex_date;
}

/**
 * [자주쓰는계좌] 리스트 선택 todo
 */
function uf_setter_favAcntTbl($jq, data) {
	var dat  = {};
	var bool = false;
	
	//사용자입금계좌지정여부[Y/N]
	if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
		if("2" == data.acnt_dcd){ //입금계좌구분[1:일반 2:업체] ==> 2:사용자입금계좌'지정
			bool = false;
		} else {
			bool = true; //사용자입금계좌지정'신청했지만, 입금지정계좌가 아닐경우.
		}
	} else { //Default
		bool = false;
	}
	
	if(bool){
		//uf_back();
		uf_user_mract_dsgt_showInfo();
	} 
	else { //Default
		if(undefined != data.mnrc_acno){
			if (_this.trnformUserType_svcAblPage) {
				if (data.hid_mnrc_acno_cd == '003' || data.hid_mnrc_acno_cd == '') {
					dat["bank_cd"  ] = "004";
					dat["bank_nm"  ] = "국민은행";
					dat["mnrc_acno"] = "";
					dat["acnt_dcd" ] = data.acnt_dcd;
				} else {
					dat["bank_cd"  ] = data.hid_mnrc_acno_cd;
					dat["bank_nm"  ] = data.bank_nm;
					dat["mnrc_acno"] = data.mnrc_acno.replace(/-/g, "");
					dat["acnt_dcd" ] = data.acnt_dcd;
				}
			} else {
				dat["bank_cd"  ] = data.hid_mnrc_acno_cd;
				dat["bank_nm"  ] = data.bank_nm;
				dat["mnrc_acno"] = data.mnrc_acno.replace(/-/g, "");
				dat["acnt_dcd" ] = data.acnt_dcd;
			}
			
			_this.setter_favAcntTbl_ebnk_efnc_cpn = data.ebnk_efnc_cpn; //2018.04.12 이체완료시 '문자전송'할 경우 [받는 사람 연락처]에 셋팅될 휴대폰번호.
		}

		comSelectPopUtil.setActiveClass($jq); //선택됨 표시
		comLayerPopUtil.close('favAcntStep');
		//uf_back();
		
	}
	
	return dat;
}

//-------------------------------------------------------------------------------
var fnt_trn_090101_1_type = ""; //[초기 진입시]'
//-------------------------------------------------------------------------------

/**
 * [자주쓰는계좌]
 */
var fnt_trn_090101_1 = {
		uf_in : function($jq, data) { //[초기 진입시]지정입금계좌 정보 가져오기
			//사용자입금계좌지정여부[Y/N]
			if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage){
				fnt_trn_090101_1_type = "init";       //[초기 진입시]
				data["type"    ]      = "init";       //[초기 진입시]
				data["ACNT_DCD"]      = "2";          //2:사용자입금계좌지정
				_this.user_mract_dsgt_y_acnList = []; //지정입금계좌'정보LIST 초기화.:: [자주쓰는이체](즉시이체, 예약이체 등)사용하기 위함..
			}
			return data;
		},
		uf_out : function($jq, data, index) {
			//사용자입금계좌지정여부[Y/N]
			if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage && fnt_trn_090101_1_type == "init"){
				//[자주쓰는계좌]지정입금계좌 정보 가져오기
				_this.user_mract_dsgt_y_acnList = data["list"];
			}
			else { //Default
				$("#favAcntStep_html").html("");
				$("#favAcntStep_html").show();
				var list = data["list"];
				// EFNC_GRP_CD
				// GRP_NM
				// CMS_NO
				// EBNK_ACN
				// EFNC_USER_ID
				// EBNK_DCD
				// BANK_NM 
				// ACNT_NM 
				// EFNC_BNCD 
				// ACNT_DCD         입금계좌구분[1:일반 2:업체] ==> 2:사용자입금계좌지정
				// EBNK_EFNC_CPN
				
				$("#favAcntStep").find("#favAcntStep_html_2").hide();
				$("#favAcntStep #no_search_data").hide();
				
				if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {
					var htmlDat = getFavAcntRowHtml2($jq, list);
					
					if("" == htmlDat){ //리스트는 있지만 계좌가 빈값이 내려올 경우.
						$("#favAcntStep").find("#favAcntStep_html").hide();
						$("#favAcntStep").find("#favAcntStep_html_2").show();
						$("#favAcntStep #no_search_data").hide();
					}
					else {
						$("#favAcntStep #favAcntStep_html").append(htmlDat);
						
						$("#favAcntStep").find("#favAcntStep_html").show();
						$("#favAcntStep").find("#favAcntStep_html_2").hide(); //자주쓰는 계좌가 없습니다.
						$("#favAcntStep #no_search_data").hide();
						
						$('[id^="favAcntStep_html"]').each(function() {
							jex.setJexObj($(this));
						});
					}
				} 
				else {
					$("#favAcntStep").find("#favAcntStep_html").hide();
					$("#favAcntStep").find("#favAcntStep_html_2").show();
					$("#favAcntStep #no_search_data").hide();
				}
			}
			return {};
		},
	uf_exec : function() {
		//사용자입금계좌지정여부[Y/N]
		if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage && fnt_trn_090101_1_type == "init"){
			fnt_trn_090101_1_type = ""; //초기화
			console.log("ljy :: [초기 진입시]지정입금계좌 정보 가져오기");
		} else { //Default
			$("#favAcntStep #trnform_search_word").val(""); //검색어' 초기화
			comLayerPopUtil.open('favAcntStep');
			$('#favAcntStep').show();
			//uf_goStep(4003); //자주쓰는계좌
		
			//은행별 icon 세팅
			$("#favAcntListTbl").find("li").each(function(idx, item){
				var bankCd = $(item).find('#hid_mnrc_acno_cd').val();
			    var target = $(item).find(".ico_box")[0];
				
			    if(!MobUtil.isEmpty(uf_getTrnBankName(bankCd))){
				    $(target).removeClass("ico_box ty1 ico_bank_000");
			        $(target).addClass("ico_box ty1 ico_bank_"+bankCd);
			    } 
			});
			
		}
	}
};

/**
 * [뱅킹관리 > 자주쓰는계좌관리] 페이지 이동
 */
function uf_goMenuAcntMngPage(param) {
	if(undefined == param) { //Default
		//주메세지, title, [확인], [취소], 서브메세지
		MobPopup.showConfirmPopup("자주쓰는 계좌관리 화면으로 이동하시겠습니까?", "", function() {
			comLayerPopUtil.close('favAcntStep');
			comWebkey_goMenu("5005", "svc_bnk_030101_1", "");
		});
	}
	else {                   //2018.04.17 이체완료 후 자주쓰는계좌'등록
		if(1 == param) {
			var mnrc_acn = _this.tranData["MNRC_ACN" ]; //입금계좌번호
			var bank_cd  = _this.tranData["MNRC_BNCD"]; //입금은행코드
			var bank_nm  = _this.tranData["MNRC_BANM"]; //입금은행

			//아이폰'에서 메뉴이동 문제(한글)로 encodeURI & decodeURI
			var url = "../../svc/bnk/svc_bnk_030101_1.html"
					+ "?mnrc_acn=" + mnrc_acn
					+ "&bank_cd="  + bank_cd
					+ "&bank_nm="  + encodeURI(encodeURIComponent(bank_nm));
			
			MobPopup.showConfirmPopup("자주쓰는 계좌관리 화면으로 이동하시겠습니까?", "", function() {
				comLayerPopUtil.close('favAcntStep');
				comWebkey_goMenu("5009", "svc_bnk_030101_1", url.split("?")[1]);
			});
		} else if(2 == param) {
			var mnrc_acn = jex_date["mnrc_acno"]; //입금계좌번호
			var bank_cd  = jex_date["bank_cd"  ]; //입금은행코드
			var bank_nm  = jex_date["bank_nm"  ]; //입금은행
			
			//아이폰'에서 메뉴이동 문제(한글)로 encodeURI & decodeURI
			var url = "../../svc/bnk/svc_bnk_030101_1.html"
					+ "?mnrc_acn=" + mnrc_acn
					+ "&bank_cd="  + bank_cd
					+ "&bank_nm="  + encodeURI(encodeURIComponent(bank_nm));
			
			MobPopup.showConfirmPopup("자주쓰는 계좌관리 화면으로 이동하시겠습니까?", "", function() {
				comLayerPopUtil.close('favAcntStep');
				comWebkey_goMenu("5009", "svc_bnk_030101_1", url.split("?")[1]);
			});
		}
	}
}

/**
 * [급여이체] 등록내역선택(불러오기) :: 최근전송내역
 */
var fnt_trn_030101_1 = {
	uf_out : function($jq, data, index) {
		if("true" == data["_is_error"]){
			if("SQL010" == data["_error_cd"]){ //_error_msg : "조회 내역이 없습니다."
				//$("#registInfo").find("#menu_01").hide();
				//$("#registInfo").find("#menu_02").show(); //급여이체 등록내역정보가 없습니다.
				return "";
			} else {
				//주메세지, title, callback[확인], 서브메세지
				MobPopup.showAlertPopup(data["_error_msg"], "", function() {
					console.log("ljy :: SQL010이외의 에러는 중지(STOP_SVC).");
				}, "오류코드 : "+data["_error_cd"]);
				return "STOP_SVC";
			}
		}
		else { //정상
			var dat = {};
			var list = data["list"];
			
			if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {
				//$("#registInfo").find("#menu_01").show();
				//$("#registInfo").find("#menu_02").hide();
				//var rgstInfoListTbl = jex.getJexObj($("#registInfo").find("#rgstInfoListTbl"), "JEX_MOBILE_LIST");
				//rgstInfoListTbl.setAll(list);
				dat[window._tranForm.formIds.rgstInfoListTbl] = list;
			} 
			else {
				//$("#registInfo").find("#menu_01").hide();
				//$("#registInfo").find("#menu_02").show(); //급여이체 등록내역정보가 없습니다.
			}
			return dat;
		}
	},
	uf_exec : function() {
		// radio id, label for 다시 셋팅
		$("#" + window._tranForm.formIds.rgstInfoListTbl).find("input").each(function(i, val) {
			$(this).attr("id","radio_"+i);
			$(this).next("label").attr("for","radio_"+i);
		});
		
		comLayerPopUtil.open('registInfo');
		$('#registInfo').show();
		//uf_goStep(4007);
	}
};

/**
 * [급여이체] 등록내역선택 setter
 */
function uf_setter_rgstInfoListTbl($jq, data) {
	var dat = {};

	/**
	 * 웹접근성 20240117
	 */
	$jq.find("label").attr("aria-checked", true).parents("li").siblings().find("label").attr("aria-checked", false);	
	// 등록내역선택(선택) 급여이체 :: 파일집계내역조회
	_this.SetterData_fnt_trn_030101_1 = data;
	$("#step1 #EMPTY").hide();
	$("#step1 #item_content").show();
	return dat;
}

/**
 * [급여이체] 등록내역선택 불러오기
 */
function uf_goRegistInfo(){
	if(_this.tranList.length > 0) {
		
		var msg2 = "가져오기를 하면 입력한 내용이 삭제돼요.<br>가져오기를 계속할까요?";
		/**
		 * function(msg, title, callback, callback2, btnTitleCancel, btnTitleConfirm, 서브메세지)
		 */
		MobPopup.showConfirmQckPopup("", "가져오기 안내", function() {
			//예
			jex.setJexObj($("#fnt_trn_030101_1").attr("data-jx-svc-onload", "true"));
			
		}, function(){
			//아니오
			
		}, "아니오", "예", msg2,"Y");
	
	} 
	else {
		jex.setJexObj($("#fnt_trn_030101_1").attr("data-jx-svc-onload", "true"));
	}
}

/**
 * [급여이체]삭제 (등록내역)
 */
function uf_goRegistInfoDel($jq, data) {
	
	var row_data = $(event.target).parents("li[data-rownum]").data("_JEX_GETALL_DATA_");
	_this.SetterData_fnt_trn_030101_1 = row_data;
    
	MobPopup.showConfirmQckPopup("선택한 목록을 삭제할까요?", "안내", function() {
		jex.setJexObj($("#fnt_trn_030101_3").attr("data-jx-svc-onload", "true"));
	},function() {					
	},"취소","삭제");
	
}

/**
 * [급여이체]확인 (등록내역)
 * 선택값 조회 후 리턴
 */
function uf_goRegistInfoSel() {
	var radio_rgstInfoListTbl = $('input:radio[name=radio_rgstInfoListTbl]:checked').attr("id");
	if(undefined == radio_rgstInfoListTbl || null == radio_rgstInfoListTbl || "" == radio_rgstInfoListTbl) {
		MobPopup.showAlertPopup("목록을 선택해 주세요.", "", function() { });
	} 
	else {
		//$("#mid_list_chk_all").prop("checked",false); //[checkbox]전체선택'체크해지.(등록내역 가져오기전 이전에 불러왔던 목록에 전체선택'체크되있는경우 초기화)
		jex.setJexObj($("#fnt_trn_030101_2").attr("data-jx-svc-onload", "true"));
	}
}

/**
 * [급여이체]등록내역선택(선택) :: 파일집계내역조회
 */
var fnt_trn_030101_2 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var jsonDat = {};
		jsonDat = _this.SetterData_fnt_trn_030101_1;
		return jsonDat;
	},
	uf_out : function($jq, data, index) {
		var dat = {};
		var list = data["list"];

		if (!(list == null || list == undefined || list == "" || JSON.stringify(list) == [])) {
			uf_drawPayTranList($jq, list, index); //[fnt_trn_030101_1.js]
		} 
		return dat;
	},
	uf_exec : function() {
		comLayerPopUtil.close('registInfo');
		//uf_back();
	}
};

/**
 * [급여이체]최근전송내역 목록삭제
 */
var fnt_trn_030101_3 = {
	uf_in : function($jq, sourceData) {
		var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
		var jsonDat = {};
		jsonDat = _this.SetterData_fnt_trn_030101_1;
		return jsonDat;
	},
	uf_out : function($jq, data, index) {
		var dat = {};
		
		_this.SetterData_fnt_trn_030101_1 = {}; //초기화
		
		MobPopup.showAlertPopup("선택한 목록을 삭제했어요.", "", function() {
			comLayerPopUtil.close('registInfo');
			//uf_back();
			jex.setJexObj($("#fnt_trn_030101_1").attr("data-jx-svc-onload", "true"));
		});
		return dat;
	},
	uf_exec : function() {
		
	}
};

/**
 * [자주쓰는계좌] draw
 * @param $jq
 * @param list
 * @returns {String}
 */
function getFavAcntRowHtml2($jq, list) {
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
	var htmlDat  = '<ul id="favAcntListTbl" role="listbox" class="list ty1">';

	for (var i = 0; i < list.length; i++) {
		var ACNT_NM       = $.trim(list[i]["ACNT_NM"      ]);
		var EBNK_ACN      = $.trim(list[i]["EBNK_ACN"     ]);
		var EFNC_BNCD     = $.trim(list[i]["EFNC_BNCD"    ]);
		var BANK_NM       = $.trim(list[i]["BANK_NM"      ]);
		var acnt_dcd      = $.trim(list[i]["ACNT_DCD"     ]); //입금계좌구분[1:일반 2:업체] ==> 2:사용자입금계좌지정
		var ebnk_efnc_cpn = $.trim(list[i]["EBNK_EFNC_CPN"]); //휴대폰번호
		
		if("" == ACNT_NM){
			emptyCnt++;
		} else {
			htmlDat += "<li id='" + window._tranForm.formIds.favAcntListTbl + "_tr" + i + "' >";
				htmlDat += "<a href=\"#none\" role=\"button\" ";
					htmlDat += "data-jx-execute=\"click\" ";
					htmlDat += "data-jx-setter=\"\" ";
					htmlDat += "data-jx-setter-source=\"parent\" ";
					htmlDat += "data-jx-setter-handler=\"uf_setter_favAcntTbl()\" ";
					htmlDat += "data-jx-setter-target=\"#" + $jq.attr("data-jx-tranform-btn-favorite-acnt") + "\" "; //current step id
					htmlDat += "data-jx-setter-execute=\"\" ";
					htmlDat += ">";
					htmlDat += "<div class=\"acount_item ty4\" role=\"button\">";
						htmlDat += "<div class=\"ico_box ty1 ico_bank_000\"></div>";
						htmlDat += "<div class=\"item\">";
							//사용자입금계좌지정여부[Y/N]
							//if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage && "2" == acnt_dcd){
								//htmlDat += '<span class="badge small red_line">입금지정계좌</span>';
							//}
							htmlDat += "<div class='item_top' id='ACNT_NM'>"+ ACNT_NM +"</div>";
							htmlDat += "<div class='item_bottom'><span id='bank_nm'>"+ BANK_NM +"</span><span id='mnrc_acno'>"+ ( (EFNC_BNCD == '003') ? formatter.account(EBNK_ACN) : EBNK_ACN ) +"</span></div>";
							htmlDat += "<input type='hidden' id='hid_mnrc_acno_cd' value="+ EFNC_BNCD     +" >";
							htmlDat += "<input type='hidden' id='acnt_dcd'         value="+ acnt_dcd      +" >";
							htmlDat += "<input type='hidden' id='ebnk_efnc_cpn'    value="+ ebnk_efnc_cpn +" >";
						htmlDat += '</div>';
					htmlDat += '</div>';
				htmlDat += '</a>';
			htmlDat += '</li>';
		}
	}
	htmlDat += '</ul>';
	
	if(list.length == emptyCnt) htmlDat = ""; //리스트는 있지만 계좌가 빈값이 내려올 경우.
	
	return htmlDat;
}

/**
 * [내계좌]
 */
function uf_setter_myAcntTbl($jq, data) {
	var index = $jq.index();
	//$("#" + window._tranForm.formIds.myAcntListTbl + " tr").removeClass("on");
	//$("#" + window._tranForm.formIds.myAcntListTbl + " tr:eq(" + index + ")").addClass("on");

	_this.setter_favAcntTbl_ebnk_efnc_cpn = ""; //초기화
	
	var dat = {};
	dat["mnrc_acno"] = $.trim(data["EBNK_ACN"].replace(/-/g, ""));
	dat["bank_cd"  ] = "003";
	dat["bank_nm"  ] = "기업은행";
	
	var acnoIdx = searchAcnoIdx(_this.myAcntList, data["EBNK_ACN"],'1'); //계좌번호 인덱스
	
	$("#" + window._tranForm.formIds.myAcntListTbl).find("li").each(function(idx, obj) {
		var rowData = $(obj).data("_JEX_GETALL_DATA_");
		if(idx == acnoIdx) {
			$(obj).attr("aria-selected", "true").addClass("active"); //선택됨 표시
		} else {
			$(obj).attr("aria-selected", "false").removeClass("active"); //선택해제
		}
	});
	
	comLayerPopUtil.close('myAcntStep');
	return dat;
}

/**
 * [이체확인증] 정보데이타 get
 * 
 *   (이하 [이체확인증]전송'에 필요한 data :: 사용하는 메뉴에선 아래 _this.tranData["필드"]에 set)
 *      _this.tranData["TRN_YMD"      ]; //거래일               20231130
 *      _this.tranData["EBNK_TRN_HMS" ]; //뱅킹거래시각         16:30:34
 *      _this.tranData["DROT_ACN"     ]; //출금계좌번호
 *      _this.tranData["MRACT_DPSR_NM"]; //입금계좌 예금주
 *      _this.tranData["MNRC_BANM"    ]; //입금은행
 *      _this.tranData["MNRC_BNCD"    ]; //입금은행코드
 *      _this.tranData["MNRC_ACN"     ]; //입금계좌번호
 *      _this.tranData["TRAN_AMT"     ]; //이체금액
 *      _this.tranData["TRAN_FEE"     ]; //수수료
 *      _this.tranData["MNRC_BNPR_CON"]; //받는분 통장 표시내용
 *      _this.tranData["DROT_BNPR_CON"]; //내 통장 표시내용
 */
function uf_getTrnConfCardInfo() {
	
	var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
	_this.trnConfCardData = {}; //[이체확인증]전송데이터
		
	if(cur_step == 34){ //여러계좌이체 전결에서 사용
			
		_this.trnConfCardData["trn_ymd_hms"  ] = formatter.date(_confirmTranList[0]["TRN_YMD"]) + " " + _confirmTranList[0]["EBNK_TRN_HMS"]; //거래일, 뱅킹거래시각
		_this.trnConfCardData["DROT_ACN"     ] = mobFormatter.accountMask2(_confirmTranList[0]["DROT_ACN"]); //출금계좌번호    000-0000**-00-***
		_this.trnConfCardData["MRACT_DPSR_NM"] = _confirmTranList[0]["MRACT_DPSR_NM"]; //입금계좌 예금주명
		_this.trnConfCardData["txt_bank_nm"  ] = _confirmTranList[0]["MNRC_BANM"] + "("+_confirmTranList[0]["MNRC_BNCD"]+")"; //입금은행(입금은행코드)
		_this.trnConfCardData["txt_mnrc_acno"] = _confirmTranList[0]["MNRC_BNCD"] == "003" ? mobFormatter.account(_confirmTranList[0]["MNRC_ACN"]) : _confirmTranList[0]["MNRC_ACN"]; //입금계좌번호
		_this.trnConfCardData["TRAN_AMT"     ] = mobFormatter.number(_confirmTranList[0]["TRAN_AMT"]); //이체금액
		_this.trnConfCardData["TRAN_FEE"     ] = mobFormatter.number(_confirmTranList[0]["TRAN_FEE"]); //수수료
		_this.trnConfCardData["DROT_BNPR_CON"] = _confirmTranList[0]["DROT_BNPR_CON"]; //내 통장 표시내용
		_this.trnConfCardData["MNRC_BNPR_CON"] = _confirmTranList[0]["MNRC_BNPR_CON"]; //받는분 통장 표시내용
	} else {
		_this.trnConfCardData["trn_ymd_hms"  ] = formatter.date(_this.tranData["TRN_YMD"]) + " " + _this.tranData["EBNK_TRN_HMS"]; //거래일, 뱅킹거래시각
		_this.trnConfCardData["DROT_ACN"     ] = mobFormatter.accountMask2(_this.tranData["DROT_ACN"]); //출금계좌번호    000-0000**-00-***
		_this.trnConfCardData["MRACT_DPSR_NM"] = _this.tranData["MRACT_DPSR_NM"]; //입금계좌 예금주명
		_this.trnConfCardData["txt_bank_nm"  ] = _this.tranData["MNRC_BANM"] + "("+_this.tranData["MNRC_BNCD"]+")"; //입금은행(입금은행코드)
		_this.trnConfCardData["txt_mnrc_acno"] = _this.tranData["MNRC_BNCD"] == "003" ? mobFormatter.account(_this.tranData["MNRC_ACN"]) : _this.tranData["MNRC_ACN"]; //입금계좌번호
		_this.trnConfCardData["TRAN_AMT"     ] = mobFormatter.number(_this.tranData["TRAN_AMT"]); //이체금액
		_this.trnConfCardData["TRAN_FEE"     ] = mobFormatter.number(_this.tranData["TRAN_FEE"]); //수수료
		_this.trnConfCardData["DROT_BNPR_CON"] = _this.tranData["DROT_BNPR_CON"]; //내 통장 표시내용
		_this.trnConfCardData["MNRC_BNPR_CON"] = _this.tranData["MNRC_BNPR_CON"]; //받는분 통장 표시내용
		
	}
	jex.setAll($("#trnConfCardInfo"), _this.trnConfCardData);
	
	//comLayerPopUtil.open('trnConfCardInfo');
	uf_goStep(20002);
	
	/*if(_isRealApp){
		//이체확인증 앱버전체크
		comWebkey_isVerTrnConfCard(function(dat) {
			// # Android : 3.1.3
			// # iOS     : 3.1.0
			//'이체확인증'가능버전만 리턴 / dat = {result: "true"}
			// if(dat["result"] == "true"){ }
			uf_goStep(20002);
		});
	} else { //앱이 아닐때..
		uf_goStep(20002);
	}*/
}

/**
 * [이체확인증] 공유'button
 * 
 *  @ 배포 앱 버전 : 이체확인증(가능버전)
 *    # Android : 3.1.3
 *    # iOS     : 3.1.0 (dataType : String)
 *    # iOS     : 3.1.1 (dataType : String, JsonObject)
 */
function uf_goTrnShare() {
	
	setTimeout(function(){
		
		$("#trnConfCardInfo .bottom_btn_area").hide(0, "", function(){
			setTimeout(function(){
				// 네이티브 콜
				$.nativeCall('bankBookCopy',[{'type':'share'}]).done(function(dat){
					//$("#trnConfCardInfo .bottom_btn_area").show(); //취소, 공유 버튼 둘다 있는 영역
				}).fail(function(dat){
					
					$("#trnConfCardInfo .bottom_btn_area").show();
				});
			}, 500);
		});
	}, 500);
	
	setTimeout(function(){
		$("#trnConfCardInfo .bottom_btn_area").show();
	}, 3000);
}

/**
 * [팩스(FAX) 전송] 정보데이타 get
 * 
 *   (이하 FAX전송'에 필요한 data :: 사용하는 메뉴에선 아래 _this.tranData["필드"]에 set)
 *      _this.tranData["DROT_ACN"     ]; //출금계좌번호
 *      _this.tranData["MNRC_BANM"    ]; //입금은행
 *      _this.tranData["MNRC_BNCD"    ]; //입금은행코드
 *      _this.tranData["MNRC_ACN"     ]; //입금계좌번호
 *      _this.tranData["MRACT_DPSR_NM"]; //입금계좌 예금주
 *      _this.tranData["TRAN_AMT"     ]; //이체금액
 *      _this.tranData["TRAN_FEE"     ]; //수수료
 *      _this.tranData["DROT_BNPR_CON"]; //내 통장 표시내용
 *      _this.tranData["MNRC_BNPR_CON"]; //받는분 통장 표시내용
 *      _this.tranData["CMS_NO"       ]; //CMS코드
 *      _this.tranData["EBNK_OTTR_UQN"]; //거래고유번호 = E뱅킹타행거래고유번호
 */
function uf_getFaxSendInfo() {
	
	var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();

	_this.faxSendData = {}; //팩스(FAX)전송데이터
	
	if(cur_step == 2 || cur_step == 3 || cur_step == 32) {
		
		$("#faxSendInfo").find("#faxSend_acnoMaskYn button:eq(0)").click(); //출금계좌번호 표시  Default [Y]
		
		_this.faxSendData["SENDER"           ] = _this.cusInfo["KRN_CSM"]; //FAX 발신인      = 한글고객명(회사명)
		_this.faxSendData["CUST_NM"          ] = _this.cusInfo["KRN_CSM"]; //출금계좌 예금주 = 한글고객명(회사명)
		_this.faxSendData["RECIPIENT"        ] = ""; //FAX 수신인
		_this.faxSendData["FAX_NO"           ] = ""; //수신 FAX 번호
		_this.faxSendData["MASK_YN"          ] = ""; //출금계좌번호 표시
		_this.faxSendData["DROT_ACNO"        ] = _this.tranData["DROT_ACN"     ]; //출금계좌번호
		_this.faxSendData["MNRC_BANM"        ] = _this.tranData["MNRC_BANM"    ]; //입금은행
		_this.faxSendData["ECFN_MNRC_BNCD"   ] = _this.tranData["MNRC_BNCD"    ]; //입금은행코드
		_this.faxSendData["MNRC_ACNO"        ] = _this.tranData["MNRC_ACN"     ]; //입금계좌번호
		_this.faxSendData["mnrc_acno_txt"    ] = _this.tranData["MNRC_BNCD"    ] == "003" ? mobFormatter.account(_this.tranData["MNRC_ACN"]) : _this.tranData["MNRC_ACN"];
		_this.faxSendData["MNRC_ACNT_DPSR_NM"] = _this.tranData["MRACT_DPSR_NM"]; //입금계좌 예금주
		_this.faxSendData["TRAN_AMT"         ] = _this.tranData["TRAN_AMT"     ]; //이체금액
		_this.faxSendData["TRFE"             ] = _this.tranData["TRAN_FEE"     ]; //수수료
		_this.faxSendData["DROT_SMR_CNTN"    ] = _this.tranData["DROT_BNPR_CON"]; //내 통장 표시내용
		_this.faxSendData["MNRC_SMR_CNTN"    ] = _this.tranData["MNRC_BNPR_CON"]; //받는분 통장 표시내용
		_this.faxSendData["CMS_NO"           ] = _this.tranData["CMS_NO"       ]; //CMS코드
		_this.faxSendData["EFF_TGNO"         ] = _this.tranData["EBNK_OTTR_UQN"]; //거래고유번호 = E뱅킹타행거래고유번호
		_this.faxSendData["TRN_YMD"          ] = _this.tranData["TRN_YMD"      ]; //거래일
		_this.faxSendData["EBNK_TRN_HMS"     ] = _this.tranData["EBNK_TRN_HMS" ]; //뱅킹거래시각
		
		jex.setAll($("#faxSendInfo"), _this.faxSendData);
	} else {
		
		_this.faxSendData["SENDER"           ] = _this.cusInfo["KRN_CSM"]; //FAX 발신인      = 한글고객명(회사명)
		_this.faxSendData["CUST_NM"          ] = _this.cusInfo["KRN_CSM"]; //출금계좌 예금주 = 한글고객명(회사명)
		_this.faxSendData["RECIPIENT"        ] = ""; //FAX 수신인
		_this.faxSendData["FAX_NO"           ] = ""; //수신 FAX 번호
		_this.faxSendData["MASK_YN"          ] = ""; //출금계좌번호 표시
		_this.faxSendData["DROT_ACNO"        ] = _shareFaxList[0]["DROT_ACNO"     ]; //출금계좌번호
		_this.faxSendData["MNRC_BANM"        ] = _shareFaxList[0]["MNRC_BANM"     ]; //입금은행
		_this.faxSendData["ECFN_MNRC_BNCD"   ] = _shareFaxList[0]["ECFN_MNRC_BNCD"]; //입금은행코드
		_this.faxSendData["MNRC_ACNO"        ] = _shareFaxList[0]["MNRC_ACNO"     ]; //입금계좌번호
		_this.faxSendData["mnrc_acno_txt"    ] = _shareFaxList[0]["ECFN_MNRC_BNCD"] == "003" ? mobFormatter.account(_shareFaxList[0]["MNRC_ACNO"]) : _shareFaxList[0]["MNRC_ACNO"];
		_this.faxSendData["MNRC_ACNT_DPSR_NM"] = _shareFaxList[0]["MNRC_ACNT_DPSR_NM"]; //입금계좌 예금주
		_this.faxSendData["TRAN_AMT"         ] = _shareFaxList[0]["TRAN_AMT"     ]; //이체금액
		_this.faxSendData["TRFE"             ] = _shareFaxList[0]["TRFE"     ]; //수수료
		_this.faxSendData["DROT_SMR_CNTN"    ] = _shareFaxList[0]["DROT_SMR_CNTN"]; //내 통장 표시내용
		_this.faxSendData["MNRC_SMR_CNTN"    ] = _shareFaxList[0]["MNRC_SMR_CNTN"]; //받는분 통장 표시내용
		_this.faxSendData["CMS_NO"           ] = _shareFaxList[0]["CMS_NO"       ]; //CMS코드
		_this.faxSendData["EFF_TGNO"         ] = _shareFaxList[0]["EFF_TGNO"]; //거래고유번호 = E뱅킹타행거래고유번호
		_this.faxSendData["TRN_YMD"          ] = _shareFaxList[0]["TRN_YMD"      ]; //거래일
		_this.faxSendData["EBNK_TRN_HMS"     ] = _shareFaxList[0]["EBNK_TRN_HMS" ]; //뱅킹거래시각
		
		jex.setAll($("#faxSendInfo"), _this.faxSendData);
		
	}
	comLayerPopUtil.open('faxSendInfo');
	//uf_goStep(20001);
}

/**
 * [팩스(FAX) 전송] 출금계좌번호 표시 [Y:표시, N:마스킹]
 */
function uf_faxSend_acnoMaskYn(param) {
	var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
	
	if(cur_step == 34){ //여러계좌 전결에서 사용
		if("Y" == param) { //출금계좌번호 표시
			$("#faxSendInfo").find("#DROT_ACNO").text(mobFormatter.account(_shareFaxList[0]["DROT_ACNO"]));
		} else {           //출금계좌번호 마스킹
			$("#faxSendInfo").find("#DROT_ACNO").text(mobFormatter.accountMask(_shareFaxList[0]["DROT_ACNO"]));
		}
	} else {
		if("Y" == param) { //출금계좌번호 표시
			$("#faxSendInfo").find("#DROT_ACNO").text(mobFormatter.account(_this.tranData["DROT_ACN"]));
		} else {           //출금계좌번호 마스킹
			$("#faxSendInfo").find("#DROT_ACNO").text(mobFormatter.accountMask(_this.tranData["DROT_ACN"]));
		}
	}
}

/**
 * [팩스(FAX) 전송] FAX전송'button
 */
function uf_goFaxSend() {
	var cur_step = jex.plugin.get("JEX_MOBILE_STEP").getStepNo();
	var acno 	   ="";
	var notErr     = true;
	var err_msg    = "";
	var recipient  = $("#faxSendInfo").find("#recipient").val(); //FAX 수신인
	var fax_no     = $("#faxSendInfo").find("#fax_no"   ).val(); //수신 FAX 번호
	var acnoMaskYn = $("#faxSendInfo").find("#faxSend_acnoMaskYn").find(".active").val(); //출금계좌번호 표시 [Y:표시, N:마스킹]
	
	_this.faxSendData["RECIPIENT"] = recipient;  //FAX 수신인
	_this.faxSendData["FAX_NO"   ] = fax_no;     //수신 FAX 번호
	_this.faxSendData["MASK_YN"  ] = acnoMaskYn; //출금계좌번호 표시 [Y:표시, N:마스킹]
	
    if(cur_step == 34){ //여러계좌 전결에서 사용
    	acno 		= 		$("#faxSendInfo").find("#DROT_ACNO").text().replace(/-/g, "");
    	_this.faxSendData["DROT_ACNO"] = acnoMaskYn == "Y" ? acno : acno.substring(0, acno.length - 3) + "***"; //출금계좌번호
    } else {
    	_this.faxSendData["DROT_ACNO"] = acnoMaskYn == "Y" ? _this.tranData["DROT_ACN"] : _this.tranData["DROT_ACN"].substring(0, _this.tranData["DROT_ACN"].length - 3) + "***"; //출금계좌번호
    }
	if("" == recipient) {
		err_msg = "팩스 '받는분'을 입력해 주세요.";
		notErr = false;
	} else if("" == fax_no) {
		err_msg = "'받는분 팩스번호'를 정확히 입력해 주세요.";
		notErr = false;
	} else if(fax_no.length < 9) {
		err_msg = "'받는분 팩스번호'를 정확히 입력해 주세요.";
		notErr = false;
	}
	
	if (!notErr) { //유효성체크
		//주메세지, title, callback[확인], 서브메세지
		MobPopup.showAlertPopup(err_msg);
	} else {       //Default : 정상
		jex.setJexObj($("#fnt_trn_010101_8").attr("data-jx-svc-onload", "true")); //[팩스(FAX) 전송] FAX전송
	}
}

/**
 * [팩스(FAX) 전송] FAX전송
 */
var fnt_trn_010101_8 = {
	uf_in : function($jq, data) {
		return _this.faxSendData; //팩스(FAX)전송데이터
	},
	uf_out : function($jq, data, index) {
		return {};
	},
	uf_exec : function() {
		var msg  = "팩스를 전송했어요.";
		var msg2 = "받는분 팩스 상태에 따라 수신 받지 못할 수 있습니다.";
		
		//주메세지, title, callback[확인], 서브메세지
		MobPopup.showAlertPopup(msg, "", function() {
			//초기화
			$("#faxSendInfo").find("#faxSend_acnoMaskYn button:eq(0)").click(); //출금계좌번호 표시  Default [Y]
			$("#faxSendInfo").find("#recipient").val("");                       //FAX 수신인
			$("#faxSendInfo").find("#fax_no"   ).val("");                       //수신 FAX 번호
			
			comLayerPopUtil.close('faxSendInfo');
			//uf_back();
		}, msg2);
	}
};

/*******************************************************************************
 * 이체(trn)에서 사용하는 Util Start
 ******************************************************************************/
/**
 * [MMF 출금계좌 Check]
 * @returns {String}
 */
function uf_mmfWarring() {
	var flag2   = "0";
	var intTime = g_getDate("HHmiss");
	var holiday = _this.IsHoliday; // 휴일여부["true","false"];

	if (!(intTime == null || intTime == undefined || intTime == "") && intTime.length != 4) {
		intTime = intTime.substring(0, 4);
	}

	if ((Number(intTime) < 900 || Number(intTime) > 1700) && holiday != "true") {
		flag2 = "1";
	} else if (holiday == "true") {
		flag2 = "2";
	}

	return flag2;
}

/**
 * 한글 최대10자리, 영문/숫자 조합 최대 20자리입니다.
 * ex) var errCheck = stringLengthCheck(text, 20);
 * @param str
 * @param len
 * @returns {Boolean}
 */
function uf_stringLengthCheck(str, len) {
	var result = true;
	var strLenth = 0;
	for ( var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		var ch = str.substr(i, 1).toUpperCase();
		code = parseInt(code);
		if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0)))
			strLenth += 2;
		else
			strLenth += 1;
	}
	if (strLenth > len) result = false; // 텍스트 길이가 요청값보다 길때... false
	return result;
}

/**
 * ex) uf_lpad("8", 10, "0")
 * param 1 : value
 * param 2 : 총길이
 * param 3 : 왼쪽채워질string
 */
function uf_lpad(src, len, padStr) {
	var retStr = "";
	var padCnt = Number(len) - String(src).length;
	for(var i=0;i < padCnt;i++) retStr += String(padStr);
	return retStr+src;
}

/**
 * 오전, 오후 get
 */
function uf_getAmPm(param) {
	if(parseInt(param) < 12) {
		return "오전 " + (parseInt(param, 10));
	} else if(parseInt(param) ==12){
		return "오후 " + (parseInt(param, 10));
	} else {
		return "오후 " + (parseInt(param, 10) - 12);
	}
}

/**
 * 숫자만 입력할 수 있음
 * @param e
 */
function uf_OnlyNumber(e) {
	if (!(e.which && (e.which > 47 && e.which < 58) || e.which == 8)) {
		e.preventDefault();
	} else {
		var datLen = $(e.target).val();
		if (!(datLen == undefined || datLen == "" || datLen == null) && datLen.length < 13) {
			$(e.target).val($(e.target).val().replace(/[^0-9]/g, ''));
		}
	}
}

/**
 * 자음 체크
 */
function uf_consonant(obj) {
	var format = /[ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ]/g;
	if(obj.search(format) >= 0) {
		return true;
	}
	return false;
}

/**
 * 모음 체크
 */
function uf_vowel(obj) {
	var format = /[ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ]/g;
	if(obj.search(format) >= 0) {
		return true;
	}
	return false;
}

/**
 * 사용자입금계좌지정' 알림팝업.
 */
function uf_user_mract_dsgt_showInfo() {
	
	//입금지정서비스 안내 팝업
	var depositDesPopupHtml = ""
		+'<div class="bottom_popup_wrap" id="depositDes_alim_layer" data-log-desc="입금계좌지정등록 알림 팝업">'
			+'<div class="bottom_popup">'
				+'<div class="bottom_popup_header">'
					+'<h2 class="tit">입금계좌지정등록 알림</h2>'
					+'<button type="button" class="btn_close" onclick="comLayerPopUtil.close(\'depositDes_alim_layer\');">닫기</button>'
				+'</div>'
				+'<div class="bottom_popup_body">'
					+'<div class="popup_msg_txt2">입금계좌가 지정되어 있어 직접 입력할 수 없습니다.</div>'
					+'<div class="popup_msg_txt3">계좌를 직접 입력하시려면 [자주쓰는이체]에서 등록 후 이용해 주세요.</div>'
					+'<div class="bg_box ty1 hoursofuse">'
						+'<ul class="list_bullet ty3">'
							+'<li>관리자가 지정한 계좌로만 입금할 수 있습니다.</li>'
							+'<li>지정 계좌는 [기업인터넷뱅킹 &gt; 뱅킹관리 &gt; 환경관리 &gt; 입금계좌지정등록]에서 확인해 주세요.</li>'
						+'</ul>'
					+'</div>'
				+'</div>'
				+'<div class="bottom_popup_footer">'
					+'<button type="button" class="btn s_5 c_3 r_2" onclick="comLayerPopUtil.close(\'depositDes_alim_layer\');">확인</button>'
				+'</div>'
			+'</div>'
		+'</div>';
	
	$('#step').append(depositDesPopupHtml);
	jex.setJexObj($('#depositDes_alim_layer'));
	
	comLayerPopUtil.open('depositDes_alim_layer');
	
	//var msg  = "입금계좌지정등록이 되어 있으므로 직접입력이 제한됩니다. 자주쓰는 입금계좌를 이용하여 주십시오.";
	//var msg2 = "(모든 사용자는 관리자가 지정한 계좌로만 입금가능) 확인방법 : 기업인터넷뱅킹 > 뱅킹관리 > 환경관리 > 입금계좌지정등록";
	//주메세지, title, callback[확인], 서브메세지
	//MobPopup.showAlertPopup(msg, "", function() { }, msg2);
}

/**
 * 사용자입금계좌지정' 알림팝업 2.
 * [자주쓰는이체] 버튼(즉시이체 등) 사용.
 */
function uf_user_mract_dsgt_showInfo2() {
	var msg = "지정된 입금계좌만 사용가능 합니다.";
	//주메세지, title, callback[확인], 서브메세지
	MobPopup.showAlertPopup(msg, "", function() { });
}

/**
 * 사용자지정입금계좌' 정보 일치여부.
 * 및 
 * 입금계좌지정등록' 하지않은경우도 계속 거래할수있게 return true.
 */
function uf_user_mract_dsgt_check(acno) {
	//사용자입금계좌지정여부[Y/N]
	if(undefined != _this.cusInfo && "Y" == _this.cusInfo["USER_MRACT_DSGT_YN"] && _this.isUserMractDsgt_svcAblPage) {
		var list = _this.user_mract_dsgt_y_acnList; //지정입금계좌'정보LIST
		for (var i = 0; i < list.length; i++) {
			var ebnk_acn = $.trim(list[i]["EBNK_ACN" ].replace(/-/g, ""));
			
			if(ebnk_acn == $.trim(acno.replace(/-/g, ""))){
				return true; //일치
			}
		}
		return false;
	} else {
		return true; //입금계좌지정등록' 하지않은경우도 계속 거래할수있게 return true.
	}
}

/**
 * 은행명 반환. :: param(bank_cd)
 * 단, 결재함업무' step31에서는 사용못함. :: 결재함인 경우 초기화 하지않음(_this.mnrcBankList)
 */
function uf_getTrnBankName(bank_cd) {
	var bank_nm = "";
	for (var i = 0; i < _this.mnrcBankList.length; i++) {
		if($.trim(bank_cd) == _this.mnrcBankList[i]["bank_cd"]) {
			bank_nm = _this.mnrcBankList[i]["bank_nm"];
			break;
		}
	}
	return bank_nm;
}

/**
 * 웹접근성 라디오초점 선택이벤트
 */
function uf_radioCk(obj) {
	$(obj).parent("li").find("input[type='radio']").prop("checked",true).parent("li").siblings().find("input[type='radio']").prop("checked",false);
}

/*******************************************************************************
 * 금액 한글화
 * @param val
 * @returns {String}
 ******************************************************************************/
function Conv_Kor(val) {
	if (val == "" || val == undefined || val == null) {
		$("#amt_han").text("");
		return;
	} else {
		//val = val.replace(/,/g, "");
		val = formatter.numberOnly(val);
	}

	var sum = Number(val);
	var len = sum.toString().length;
	var i;
	var remainder, flag;
	var ch = "";

	if (len >= 14) return "";

	flag = 0;

	for (i = 0; i < len; i++) {
		remainder = sum % 10;       // 나머지 계산 즉, '1'의 자리부터 한자리씩 잘라옴
		sum = Math.floor(sum / 10); // 몫을 계산 즉, '1'의 자리부터 한자리씩 자르고 남은것.

		if (remainder == 0) {
			if (i == 3 || i == 7)
				flag = 0;
			else
				flag++; // 천단위, 천만단위에서는 flag 리셋, flag는 '0'의 갯수 세는것
			continue;
		}

		switch(i) {
			case  0 :                  break;
			case  1 : ch = "십"  + ch; break;
			case  2 : ch = "백"  + ch; break;
			case  3 : ch = "천"  + ch;
			          flag = 0;        break;
			case  4 : ch = "만 " + ch; break;
			case  5 : if (flag == 1) ch = "십만 "  + ch; else ch = "십"  + ch; // '4'번째 만의 자리가 '0'인경우
			          flag = 0;        break;
			case  6 : if (flag == 2) ch = "백만 "  + ch; else ch = "백"  + ch; // '4/5'번째 만/십만의 자리가 '0'인경우
			          flag = 0;        break;
			case  7 : if (flag == 3) ch = "천만 "  + ch; else ch = "천"  + ch; // '4/5/6'번째 만/십만/백만의 자리가 '0'인경우
			          flag = 0;        break;
			case  8 : ch = "억 " + ch; break;
			case  9 : if (flag == 1) ch = "십억 "  + ch; else ch = "십"  + ch;
			          flag = 0;        break;
			case 10 : if (flag == 2) ch = "백억 "  + ch; else ch = "백"  + ch;
				          flag = 0;        break;
			case 11 : if (flag == 3) ch = "천억 "  + ch; else ch = "천"  + ch;
			          flag = 0;        break;
			case 12 : ch = "조 "  + ch; break;
		}

		switch(remainder) {
			case 1 : ch = "일" + ch; break;
			case 2 : ch = "이" + ch; break;
			case 3 : ch = "삼" + ch; break;
			case 4 : ch = "사" + ch; break;
			case 5 : ch = "오" + ch; break;
			case 6 : ch = "육" + ch; break;
			case 7 : ch = "칠" + ch; break;
			case 8 : ch = "팔" + ch; break;
			case 9 : ch = "구" + ch; break;
		}
	}
	$("#amt_han").text(ch);
}

/**
 * 미결재내역취소
 * --------------
 * "A0" 당행이체
 * "A1" 타행이체
 * "A7" 예약이체 등록
 * "A2" 여러계좌이체 (부분/전체)
 * "AC" 대량즉시
 * "AD" 대량예약[개발완료?]<--- [(결재함서비스준비중)******** 서비스제외 ********]
 * "AE" 급여즉시
 * "AF" 급여예약
 * "A3" 그룹이체[개발완료?]<--- [(결재함서비스준비중)******** 서비스제외 ********]
 */
var nonApprCancel = {
	movePage : function(arg1){
		comUtil_getBasicInfo({"need_item" : "cus_info"}, function() {
			var basicInfo = this; //JSON data
			_this.trnform_cusInfo = basicInfo.cus_info;
		});
		
		var usr_no    = _this.trnform_cusInfo["USR_NO"         ]; //이용자번호(현재로그인한)
		var trn_scd   = $.trim(_this.snctData["TRN_SCD"       ]); //TRN_SCD  거래상태코드(1:결재대기(등록), 2:결재대기(진행), 3:실행대기(등록), 4:실행대기(진행))
		var bswr_dcd  = $.trim(_this.snctData["W_BSWR_DSNC_CD"]); //BSWR_DCD           업무구분코드
		var rymd      = $.trim(_this.snctData["W_RYMD"        ]); //RGSN_YMD           결재실행내역 등록년월일
		var rgsn_hms  = $.trim(_this.snctData["W_RGSN_HMS"    ]); //EBNK_EFNC_RGSN_HMS 결재실행내역 등록시분초
		var appr_user = $.trim(_this.snctData["EFNC_USER_ID"  ]); //EFNC_USER_ID       이용자번호(기안'등록한)
		
		if( usr_no != appr_user){ // 현재로그인한 이용자가 기안올린건이 아닐경우..
			MobPopup.showAlertPopup("미결재내역취소는 직접거래를 올리신 이용자만 가능합니다.");
			return;
		}
		
		//이미 취소된건일 경우
		if(trn_scd == "D"){
			MobPopup.showAlertPopup("이미 기안취소된 건입니다.");
			return;
		}
		else {
			if(bswr_dcd != 'A0' && bswr_dcd != 'A1' && bswr_dcd != 'A2' && bswr_dcd != 'A3' && bswr_dcd != 'AC' && bswr_dcd != 'AD' && bswr_dcd != 'AE' && bswr_dcd != 'AF'){
				MobPopup.showAlertPopup("미결재내역취소 거래는 즉시이체(당.타행), 여러계좌이체, 그룹이체, 급여,대량(즉시,예약)이체만 가능합니다.");
			}
			else {
				if(trn_scd != "1"){
					if(trn_scd == "2"){
						MobPopup.showAlertPopup("이미 다른 결재자가 결재를 하여 취소가 불가능합니다.");
						return;
					} else {
						MobPopup.showAlertPopup("미결재내역취소 거래는 거래상태가 '결재대기'인 경우만 취소가능합니다.");
						return;
					}
				} else {
					var url = "../trn/fnt_trn_060101_1.html?rymd="+rymd+"&rgsn_hms="+rgsn_hms;
					comWebkey_goMenu("5005", "fnt_trn_060101_1", url.split("?")[1]); // 이체 > 미결재내역조회/취소
					/**
						comWebkey_goMenu(action_code, menu_id, url, param);
							action_code : 5005(네이티브->메뉴 클릭 시), <--- 메뉴이동은 모두 5005 코드가 들어가야함
							              5007(메뉴의 타이틀 변경 시), <--- 현재는 사용할 일 없음
							              5009(이전 스택 내용 삭제 후 현재 메뉴 쌓기) 
							              5010(현재 메뉴 id를 스택에 쌓지 마라) ex) 결재함 상세 -> 취소 
							              6001(웹뷰 하나 더 띄우기) 
							menu_id     : 메뉴 아이디
							url         : 경로가 포함된 html파일명 
							param       : A=aaa&B=bbb 형태의 querystring 문자열
					*/
				}
			}
		}
	}

	//미결재내역취소'버튼show(가능한업무)
	, checkShowBtn : function(){
		var bswr_dcd  = $.trim(_this.snctData["W_BSWR_DSNC_CD"]); //BSWR_DCD 업무구분코드
		var bool      = false;
		switch(bswr_dcd) {
			case "A0": //당행이체
			case "A1": //타행이체
			case "A7": //예약이체 등록
			case "A2": //여러계좌이체 (부분/전체)
			case "AC": //대량즉시
			case "AE": //급여즉시
			case "AF": //급여예약
				bool = true;
				break;
			default:
				bool = false; //서비스 준비중입니다. 인터넷뱅킹에서 확인하시기 바랍니다.
				break;
		}
		if(bool) $("#secretform_btn_reg_end_SCNT_CANCEL").show(); //미결재내역취소
		else     $("#secretform_btn_reg_end_SCNT_CANCEL").hide();
	}
};