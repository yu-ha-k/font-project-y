(function () {

	var fns = window.jnsFns = (!window.jnsFn) ? {} : window.jnsFn;
	
//	$(document).focusin(function() {
//		alert("test");
//	});
	fns['ui/TEST'] = function(input) {
		alert(input);
	};
	
	var compareJSON = function(obj1, obj2) {
		var ret = {};
		for(var i in obj2) { if(!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) ret[i] = obj2[i]; }
		return ret;
	};
	 
	var slidechg_filter = {
			"BETWEEN_TYPE1":function(val, inp) {
				var val_key 	= "BASE_YMD";
				var inp_srt_key = "END_BASE_YMD";
				var inp_end_key = "STR_BASE_YMD";
				return (inp[inp_srt_key] <= val[val_key] && inp[inp_end_key] >= val[val_key]);
			}, "EQUAL":function(val, inp) {
				var ret = false;
				// console.log(inp);
				// console.log(inp[key]);
				// console.log(val);
				// console.log(val[key]);
				for (var key in inp) {
					if (val[key] == inp[key]) {
						ret = true;
						break;
					} 				
				}
				
				return ret;
			}
	}
	
	

	//fns['ui/test']			= function(input) {
	//	alert(JSON.stringify(input));
	//}

	fns['ui/memoRefresh']	= function(input) {
		var num  = input.ROW_NUM;
		var memo = input.MEMO_SBJC_CON
		
		$(".tranList").find("[data-row-num="+ num +"]").find(".memoView2").text(memo);
		
		if (memo == "") 		{ memo = "메모"; }
		if (memo.length > 11 )	{ memo = memo.substr(0,10) + "..."; }
		
		$(".tranList").find("[data-row-num="+ num +"]").find(".memoView").text(memo);
	}
	
	fns['ui/executeOnlyOnce']	= function(input) {
		var dat = this.$e.data("executeOnlyOnce_isRun");
		if (dat != true) $(this.$e.attr("data-jns-target")).click();
		this.$e.data("executeOnlyOnce_isRun", true);
	}

	fns['ui/cardAddClear'] = function() {
		$(".masu_0007_add input").val('');
		$(".masu_0007_add .display_cert").text(''); 
	}
	
	fns['ui/getSelText'] = function() {
		var ret = $("select[name=select2] option:selected").text();
		console.log(ret);
		return { "BIZ_NM" : ret};
	}
	
	
	/**
	 * APP?��?�� webview ?��?�� event ?��?�� ?��???주면 ?��?��?�� ...
	 */
	fns['ui/checkPolling']	= function(input) {
//		var isRunning 	= this.$e.data("isRunning");
//		var _this		= this;
//		if (isRunning) return;
//		this.$e.data("isRunning", true);
//		
//		var _intv = setInterval(function(){
//			if (document.hasFocus()) {
//				_this.$e.data("isRunning", false);
//				setTimeout(function() {	_attrUtil.alert.show("LoadCheck","LoadCheck"); $(".onHasFocus").click();},2000);
//				clearInterval(_intv);
//			}
//		},3000);
	}
	
	
	fns['ui/gotoSlidePage']	= function(input) {
		var _this = this;
			var frm			= _this.$e.attr("data-frm-data");			
			var cmp			= _this.$e.attr("data-cmp-data");
			var selYmd 		= $(frm).html();
			var $tgtSlider 	= $(_this.$e.attr("data-target-slider"));
			var rownum 		= $tgtSlider.find(cmp+":contains('"+selYmd+"')").closest("[data-row-num]").attr("data-row-num");
			if (selYmd && rownum && $tgtSlider.length > 0) {
				var objs = $tgtSlider.data("_nattr");
				for (var ii in objs) {
					(rownum && objs[ii].q == '.slider' && objs[ii].goto(parseInt(rownum)));
				}
			}
			$(frm).html("");	
	}

	fns['ui/resetAsel'] = function(input) {
		$(".taxb_0002_02").find(".resetSelected").find(".selected").removeClass("selected");
		$(".taxb_0001_02").find(".resetSelected").find(".selected").removeClass("selected");
	}
	
	fns['ui/closeStransp'] = function(input) {
		this.$e.parent().find(".s-transp").addClass("hide");
		this.$e.removeClass("hide");
	}

	fns['ui/smsTimeChecker']	= function(input) {
		//var chkTm = parseInt(input['SMS_CRTC_TIME']) + ((1000 * 60 * 5) - 1000);	// ?��?��?��?��?��간으�? 1�? ?��?�� 빼주?��.
		if (1==1) return;
		var chkTm = 1000 * 60 * 4;				// 체크 ?��간을 4분으�? ?��?��. (?��버는 5�?)
		var inval = setInterval(function() {
			chkTm -= 1000;
			if (chkTm <=0) {
				clearInterval(inval);
				// ?��기서 next�? call?���??��.
			}
			
			var mm = parseInt(chkTm/(1000*60));			// ?��??? �?.
			var ss = parseInt(chkTm % (1000*60) /1000);	// ?��??? �?.
			
			mm = (mm<10)?"0"+mm:""+mm;
			ss = (ss<10)?"0"+ss:""+ss;

			var str = (mm + "분 "+ ss +"초");
			
		},1000); 
	}
	
	fns['ui/checkBnkList']	= function(input) {
		var next 	= "Y";
		var needcert= "Y";
		var chksize = $("[data-jni='BANK']").find(".selected").length;
		if (chksize == 0) {
			window._attrUtil.alert.show("알림을 구독할 은행을 선택해주세요.");
			next = "N";
		} else if (chksize == 1 && ($("[data-jni='BANK']").find(".selected").attr("data-value") == "003")) {
			next = "N";
			needcert = "N";
		}
		return {"NEXT":next, "NEED_CERT":needcert};
	}
	
	fns['ui/isExecuteTimeLineA'] = function(input) {
		if ($("[data-jno=DAY_LIST]").data("_nattr") && $("[data-jno=DAY_LIST]").data("_nattr")[0] && $("[data-jno=DAY_LIST]").data("_nattr")[0].getValue() && $("[data-jno=DAY_LIST]").data("_nattr")[0].getValue().length > 0) 	return {"EXEC":"N"};
		return {"EXEC":"Y"};
	}
 
	fns['ui/isExit']	= function(input) {
		return {"EXIT":(window._qstr.exit)?"Y":"N"};
	}
	
	fns['ui/getPoliceInfo']	= function(input) {
		return {
			 "policy_title"	:"기업자산관리 서비스 설명서"
			,"policy_type"	:"SaveAndConfirm"
			,"policy_url"	:"https://www.ibk.co.kr/fup/banking/img/kiup/20241011180256102708762049281607.pdf"
				// location.origin+"/jsp/mac/join/IBK_Alphabriefing_Service.pdf"
		}
	}
	

	fns['ui/searchBtnClose']	= function(input) {
		var $tgt = $(this.$e.attr("data-close-target"));
		($tgt.hasClass("icon-up-b") && $tgt.removeClass("icon-up-b"));
	}
	
	fns['data/list/filter']		= function(input) {
		var $tgt		= $(this.$e.attr("data-target-list"));
		var objs		= $tgt.data("_nattr");
		if (objs && objs.length) { for (var ii=0; ii<objs.length; ii++) { (objs[ii].q == ".list" &&  objs[ii].filter(input) ); } }
	}

	
	fns['data/slidechg']		= function(input) {
		var $curdiv = this.$e.find(".selected");
		var inp		= _attrUtil.getIn($curdiv.find("[data-jni]"));
		var $tgt		= _attrUtil.findEl(this.$e, this.$e.attr("data-target-data"));
		var $out		= _attrUtil.findEl(this.$e, this.$e.attr("data-target-list"));
		var filter	= inp['FILTER'];
		var allData	= $tgt.data("cls_data");
		
		if ($tgt.data("filter") == null || Object.keys(compareJSON($tgt.data("filter"), inp)).length > 0 ) {
			allData = (allData)?allData:[];
			
			// ?��?�� 리스?���? 만들?���??��. 
			var sublist = allData.filter(function(val) {
				if (!slidechg_filter[filter]) return false;
				return slidechg_filter[filter](val, inp);
			});
			sublist.push({YMD:'',CDN:'',CD_NM:'',hider:'N', AMT1:0, BANM:'', PSNT_BAL:0, ISS_YMD:''});
			
		}
		$tgt.data("filter", inp);

		var objs	 = $out.data("_nattr");
		if (objs && objs.length) { for (var i=0; i<objs.length; i++) { objs[i].setValue(sublist); } } 
		
	}

	fns['ui/onlyOneClick'] = function(input) {
		var $one		= this.$e;
		var isRunning	= $one.data("isRunning");
		if (isRunning) return {"ONLY_ONE_CLICK":"Y"};

		console.log("TEST isRunning:: ", isRunning);
		
		$one.data("isRunning", true);
		setTimeout(function() {$one.data("isRunning", false);}, 5000);
		return {"ONLY_ONE_CLICK":"N"};
	}
	

	fns['ui/openBrowser'] = function(input) {
		try {
				nativeBridge.exec(function(dat) { //on success
					if (!dat || dat =="") dat = "{}";
					console.log("App result :: ", dat);

					callback(JSON.parse(dat));
				}, function(dat) { // on error
					if (!dat || dat =="") dat = "{}";
				}
				,"openExBrowser"	//svc
				,["https://www.ibk.co.kr/event/ingDetailEvent.ibk?evnt_srno=102459&evnt_dscd=H&pageId=CM01060100"] //input
			);
		} catch(error) {
			console.log("===============================================>",error);
		}
			
	}


	fns['ui/openScreenShot']		= function(input) {

		var $lay		= $(".layer_screen"); 
		var isRunning	= $lay.data("isRunning");
		if (isRunning) return;

		$lay.data("isRunning", true);

		var clss	= this.$e.attr("data-screen-addClass");
		var clsses	= clss.split(" ");
		var $scrtgt	= this.$e.closest(".screen-target");
		var $org	= $scrtgt.parent();
		$org.height($org.height()+"px");

		for (var cls in clsses) $($scrtgt).addClass(clsses[cls]);
		
		// $lay.css("padding-top","70px");
		$lay.find("div:first").children(":first").removeClass("hide");
		$scrtgt.addClass("screen-target-style").appendTo(".layer_center");
		$(".layer_screen").data("org",   $org);
		$scrtgt.find(".scrshotNotShow").addClass("hide");
		$scrtgt.find(".icon-pdf-dark").addClass("hide");
		$scrtgt.find(".icon-pdf").addClass("hide");
		$(".layer_screen").removeClass("hide");

		$(".layer").height($(".layer_center").height());
		$(window).height($(".layer_center").height());
		$(".layer").siblings(".overxh").hide();
		$lay.data("isRunning", false);
	};
	
	fns['ui/closeScreenShot']		= function(input) {

		var $org 	= $(".layer_screen").data("org");
		var $lay	= $(".layer_screen");
		$lay.find(".screen-target").appendTo($org).removeClass("screen-target-style");
		$lay.attr("class", "");
		$lay.find("div:first").children(":first").addClass("hide");
		$lay.addClass("hide").addClass("layer").addClass("layer_screen");
		$org.find(".icon-pdf-dark").removeClass("hide");
		$org.find(".icon-pdf").removeClass("hide");
		$org.find(".scrshotNotShow").removeClass("hide");
		
		$(".layer").siblings(".overxh").show();
	};

	
	fns['ui/sliderNext']		= function(input) {
		var $slider = $(this.$e.attr("data-slider-target"));
		$slider.trigger('goto-next');
	}
	
	fns['ui/sliderPrev']		= function(input) {
		var $slider = $(this.$e.attr("data-slider-target"));
		$slider.trigger('goto-prev');
	}

	fns['ui/focusEle']     = function(input) {
		var $focusEle = $(this.$e.attr("data-focus-target"));
		$(document).scrollTop($focusEle.position().top);		
	}
	
	fns['ui/focusMoveH']     = function(input) {
		var $focusEle = $(this.$e.attr("data-focus-target"));
		setTimeout(function() {
			$(document).scrollTop($focusEle.position().top - 50);
			console.log($focusEle.position().top);
		}, 1500);
	}

	fns['ui/scrollTop']     = function(input) {
		var $scrollEle = $(this.$e.attr("data-scroll-target"));
		$scrollEle.scrollTop("0");		
	}
	
	
	fns['ui/onloadShow']		= function(input) {
		var $tgt = $(this.$e.attr("data-show-target"));
		$tgt.removeClass("hide");
	}
	

	fns['ui/directOpen']		= function(input) {
		var $tgt = $(this.$e.attr("data-open-target"));
		$tgt.addClass("no-ani")
		$tgt.removeClass("hide");
		//$tgt.removeClass("no-ani")
	}
	
	fns['ui/sliderChgBtn']		= function(input) {
		var $ele	= (this.$e.attr("data-jns-element"))?$(this.$e.attr("data-jns-element")):this.$e;
		var $cont	= $ele.find("div").first();
		var pageNo	= $cont.data("page");
		var maxPage	= $cont.find(">div").not(".hide").length;
		var $prev	= $(this.$e.attr("data-slider-prev"));
		var $next	= $(this.$e.attr("data-slider-next"));
		pageNo		= (!pageNo)?1:pageNo;
		
		if (pageNo == 1 && pageNo == maxPage) {
			$prev.hasClass("slider-prev" ) && $prev.removeClass("slider-prev");
			$next.hasClass("slider-next" ) && $next.removeClass("slider-next");
		} else if (pageNo == 1) {
			 $prev.hasClass("slider-prev" ) && $prev.removeClass("slider-prev"); 
			(!$next.hasClass("slider-next"))&& $next.addClass("slider-next");
		} else if (pageNo == maxPage) {
			 $next.hasClass("slider-next" ) && $next.removeClass("slider-next"); 
			(!$prev.hasClass("slider-prev"))&& $prev.addClass("slider-prev");
		} else {
			(!$prev.hasClass("slider-prev"))&& $prev.addClass("slider-prev");
			(!$next.hasClass("slider-next"))&& $next.addClass("slider-next");
		}
		
	}
	fns['ui/cardNumFocus'] = function(input) {
		var next = this.$e.parent().next();
		if (this.$e.val().length == 4) next.find("input").focus();
	}
	fns['ui/mergeCDN'] = function(input) {
		return {
			"MCDN" : input.CDN01+input.CDN02+input.CDN03+input.CDN04
		}
	}

	fns['data/masking'] = function(input) {
		if (input.CDN2) 	{ return { "MASKING_CDN2" : (input.CDN2).substring(0,4) } }
		if (input.CDN3) 	{ return { "MASKING_CDN3" : (input.CDN3).substring(0,4) } }
		if (input.PWD_LENG) { return { "OUT_PW" : (input.WEB_PW).substring(0,input.PWD_LENG) } }
	}

	fns['ui/findFirstRow'] = function(key,val,$e) {
		
		// $(".rcard_list[data-jno='R_CARD_LIST']").find("[data-row-num='0']").click();
		var $firstTgt = this.$e.attr("data-click-target");
		$($firstTgt).find("[data-row-num='0']").click();
	}

	fns['ui/cardAddVali'] = function(input) {
		if (input.BNCD == "000") { return { "CARD_NEXT" : "Y" } }
		if (input.LGN_CRTC_DCD == "20") {
			if 		 (input.BNCD == "-1") $(".pop_card").click();
			else if  	 (input.CDN1 == "" || input.CDN2 == "" || input.CDN3 == "" || input.CDN4 == "")  				  	  $(".crde_pop_cdn").click(); 
			else if  (input.STLM_DD > 31) 				  $(".crde_pop_over").click(); 
			else if  (input.STLM_DD == "" || input.STLM_DD == "0") 				  $(".crde_pop_day").click();  
			else if  (input.WEB_ID == "")  				  $(".crde_pop_id").click();   
			else if  (input.WEB_PW == "")  				  $(".crde_pop_pw").click();   
			else { 
				return {
					"CARD_NEXT" : "Y"
				}
			}
		} 
		else if  (input.LGN_CRTC_DCD == "10") { 
			if 		 (input.BNCD == "-1") $(".pop_card").click();
			else if  	 (input.CDN1 == "" || input.CDN2 == "" || input.CDN3 == "" || input.CDN4 == "")  				  	  $(".crde_pop_cdn").click(); 
			else if  (input.STLM_DD > 31) 				  $(".crde_pop_over").click(); 
			else if  (input.STLM_DD == "" || input.STLM_DD == "0") 				  $(".crde_pop_day").click();  
			else if	 (input.CERTOBJ == "")	   	 	  $(".pop_empcert").click(); 
			else { 
				// alert(JSON.stringify(input));
				return {
					"CARD_NEXT" : "Y"
				}
			}
		} 
	}

	fns['ui/addClass'] = function (input) { for (var key in input) { if (!$(key).hasClass(input[key])) $(key).addClass(input[key]); } };
	fns['ui/removeClass'] = function (input) { for (var key in input) { if ($(key).hasClass(input[key])) $(key).removeClass(input[key]); } };
	fns['ui/refresh'] = function (input) { location.reload(); }
	fns['ui/remove']		= function(input) {
		$target		= $(input['target']);
		var keys	= [];
		$target.val('');
	};
	fns['data/clone']		= function(input) {
		return input;
	};


	fns['ui/join/isIBK'] = function (input) {
		if (this.$e.val() == "003") {
			this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_SELECT']").closest(".row").show();
			this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_TEXT']").closest(".row").addClass('hide');
		} else {

			this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_SELECT']").closest(".row").hide();
			this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_TEXT']").closest(".row").removeClass('hide');
		}
		return;
	}
	
	fns['ui/join/ynFlag'] = function (input) {
		var card_sel = this.$e.parent().parent().parent().parent().parent().parent().parent().find(".card_sel");
		var bankVal = this.$e.parent().parent().parent().parent().find("[data-jni='BNCD']").val();
		var selectVal = this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_SELECT']").val();
//		var credit_sel = this.$e.parent().parent().parent().parent().parent().parent().parent().find(".credit_sel");
		var textVal = this.$e.parent().parent().parent().parent().find("[data-jni='ACNT_TEXT']").val();
		var creditVal = this.$e.parent().parent().parent().parent().parent().parent().parent().parent().find("[data-jni='LON_FNNC_ASCN_YN']");
		if(bankVal=="003" && selectVal=="-1"){
			card_sel.removeClass('hide');
//		}else if(bankVal!="003" && textVal==""){
//			card_sel.removeClass('hide');
		} 
		
	}
	
	fns['ui/join/idpw'] = function (input) {
		var $joinidpw = this.$e.parent().parent().find(".joinidpw");
		var $idpwcheck = this.$e.parent().parent().parent().parent().parent().parent().parent().find(".idpwcheck");
		for(var i=0; i<$joinidpw.length; i++){
			if ($($($joinidpw).get(i)).val() == "") {
				$($idpwcheck).removeClass('hide');
			}
		}	
	}

	
	fns['ui/masu/ynFlag'] = function (input) {
		var card_sel = this.$e.parent().parent().parent().parent().find(".card_sel");
		var bankVal = this.$e.parent().parent().parent().find("[data-jni='BNCD']").val();
		var selectVal = this.$e.parent().parent().parent().find("[data-jni='ACNT_SELECT']").val(); 
		var textVal = this.$e.parent().parent().parent().find("[data-jni='ACNT_TEXT']").val();
		var creditVal = $("[data-jni='LON_FNNC_ASCN_YN']");
		if(bankVal=="003" && selectVal=="-1"){
			card_sel.removeClass('hide');
		}else if(bankVal!="003" && textVal==""){
			card_sel.removeClass('hide');
//		}else if($(creditVal).is(":checked")==false){
//			$(".credit_sel").removeClass('hide');
		}else{
			
		}
	}
	
	fns['ui/join/nmcd'] = function (input) {
		console.log(this.$e.text());
		console.log(this.$e.next().text());
	}
	
	
	var arr = new Array();
	
	fns['ui/join/nmcd02'] = function (input) {
		var aaa = this.$e.parent().parent().parent().parent().find(".cardExistsSelected_df");
		var aaaaaa = this.$e.parent().parent().parent().parent().find(".cardExistsSelected_ob");
		var completePro = this.$e.parent().parent().parent().parent().parent().find(".endOfthis");
		var aaaa = this.$e.prev().text();
		var aaaaa = this.$e.text();		
		
		console.log(arr.indexOf(aaaaa));
		if(arr.indexOf(aaaaa)!=-1){	
		}else if(arr.indexOf(aaaaa)==-1){
			aaa.append('<div class="row forDelete '+aaaaa+'">'
					+'<div class="border h50 lh50 pos-re radius05 ">'+'<div class="col s10 pl20">'+aaaa+'</div>'
					+'<div class="col s02">'+'<div class="icon-position">'
					+'<div class="mt10 icon-border">'+'<div class="icon-x02 pb10 deleteRow">'
					+'<span></span><span></span><span></span></div></div></div></div></div></div>');
			arr.push(aaaaa);
		}
	
		if(aaa.children().length>0){
			aaaaaa.addClass('hide');
		}else if(aaa.children().length==0){ 
			aaaaaa.removeClass('hide');
		}
		
		var bbb = $(aaa.children()).find('.deleteRow');
		var ccc = bbb.closest('.row')
		$(bbb).off("click").bind('click', function(){
			console.log(this);
			$(this).closest('.row').remove();
			if(aaa.children().length==0){
				aaaaaa.removeClass('hide');
			}
			var idx = arr.indexOf(aaaaa);
			arr.splice(idx,1);
		});
		console.log(arr);
		
		completePro.off("click").click(function(){
			console.log(arr); console.log(arr.length);
			if(arr.length>0){
				aaaaaa.append('<div style="display:none;">'+arr+'</div>');
			}else if(arr.length==0){}
			
		});
	}
	
	
	fns['ui/join/getChange'] = function (input) {
		var CRAD_SIZE_FLAG = this.$e.prev().prev().text();
		var CRTC_FLAG = this.$e.prev().text();
		var arr = new Array();
		arr.push(CRAD_SIZE_FLAG); arr.push(CRTC_FLAG);
		console.log(arr);
		var aaaaaa = this.$e.parent().parent().parent().parent().find(".cardExistsSelected_ob");
		console.log(aaaaaa);
		var aaaaa = this.$e.parent().parent().parent().parent().find(".listlist");
		console.log(aaaaa);
		var aaa = aaaaa.children().length;
		console.log(aaa);
		if(CRAD_SIZE_FLAG=='Y'){
			aaaaaa.addClass('hide');
		}else if(CRAD_SIZE_FLAG=='N'){
			aaaaaa.removeClass('hide');
		}
			
		
	}
	
	fns['ui/join/removeText'] = function (input) {
		var ddd = this.$e.prev();
		console.log($(ddd).val());
		
		if($(ddd).val().length>0){
			console.log($(ddd).val().length);
			$(ddd).val('');
		}else{}
		
	}
	
	fns['ui/remove/appendList'] = function (input) {
		var $tgt = $(this.$e.attr("data-target-list"));
		if($tgt.hasClass("appendList")) $tgt.removeClass("appendList");
	}

	fns['ui/add/appendList'] = function (input) {
		var $tgt = $(this.$e.attr("data-target-list"));
		$tgt.addClass("appendList");
	}

	fns['data/chart/test'] = function (input) { return { 'hello': [{ 'RATE': 60, }, { 'RATE': 31 }, { 'RATE': 6 }] }; }
	fns['data/inout'] = function (input) {
		return {
			"list"	: [
				 {"DATE":"20180921", "DATE_TIME" : "14:05:12", "CONAME":"미래무역","COST":"32000000"}
				,{"DATE":"20180920", "DATE_TIME" : "04:05:12", "CONAME":"?���??��?��","COST":"1320000"}
				,{"DATE":"20180915", "DATE_TIME" : "14:05:12", "CONAME":"?��?��카드(�?)","COST":"865050"}
			    ,{"DATE":"20180921", "DATE_TIME" : "14:05:12", "CONAME":"미래무역","COST":"32000000"}
		   ],
		}
	}
	// fns['data/smpl2'] = function (input) {
	// 	return {
	// 		"chart": {
	// 			"매입": [{ "label": "1?��", "val": "0" }
	// 				, { "label": "2?��", "val": "150000" }
	// 				, { "label": "3?��", "val": "260000" }
	// 				, { "label": "4?��", "val": "320000" }
	// 				, { "label": "5?��", "val": "450000" }
	// 				, { "label": "6?��", "val": "166500" }]
	// 		},
	// 		"colorSet" :  "#8cbcfa" ,
	// 		"pie-chart": {
	// 			"매입": [{ "label": "기업????��", "val": "48" }
	// 				, { "label": "�?민�???��", "val": "35" }
	// 				, { "label": "?��?��????��", "val": "10" }
	// 				, { "label": "?��?��????��", "val": "7" }]
	// 		},
	// 		"compare": {
	// 			"차액": [{ "label": "deposit", "val": "40" }
	// 			,{ "label": "withdraw", "val": "60" }
	// 				 ]
	// 		},
	// 		"nothing": {
	// 			"": [{ "label": "A", "val": "100" }]
	// 		},
	// 		"many": {
	// 			"매입": [{ "label": "1?��", "val": "200,000" }
	// 				, { "label": "2?��", "val": "150,000" }
	// 				, { "label": "3?��", "val": "260,000" }
	// 				, { "label": "4?��", "val": "320,000" } 
	// 				, { "label": "?��?��", "val": "166,500" }]
	// 		},
	// 		"double": {
	// 			"?���?": [{ "LABEL": "?��", "VAL": "48" }
	// 				, { "LABEL": "?��", "VAL": "35" }
	// 				, { "LABEL": "?��", "VAL": "10" }
	// 				, { "LABEL": "�?", "VAL": "17" }
	// 				, { "LABEL": "�?", "VAL": "60" }
	// 				, { "LABEL": "?��", "VAL": "77" }],
	// 			"출금": [{ "LABEL": "?��", "VAL": "100" }
	// 				, { "LABEL": "?��", "VAL": "150" }
	// 				, { "LABEL": "?��", "VAL": "20" }
	// 				, { "LABEL": "�?", "VAL": "50" }
	// 				, { "LABEL": "�?", "VAL": "80" }
	// 				, { "LABEL": "?��", "VAL": "30" }]

	// 		},
	// 		"radar": {
	// 			"?��?��": [{ "LABEL": "?��?��?��", "VAL": "50" }
	// 				, { "LABEL": "?��?��?��", "VAL": "21.2" }
	// 				, { "LABEL": "�?집도", "VAL": "40" }
	// 				, { "LABEL": "구매?��", "VAL": "10" }
	// 				, { "LABEL": "집객?��", "VAL": "60" }]				
	// 		},
	// 	}
	// };

	fns['data/smpl2'] = function (input) {
		return {
			"chart": {
				"매입": [{ "label": "1월", "val": "0" }
					, { "label": "2월", "val": "150000" }
					, { "label": "3월", "val": "260000" }
					, { "label": "4월", "val": "320000" }
					, { "label": "5월", "val": "450000" }
					, { "label": "6월", "val": "166500" }]
			},
			"acct-chart": {
				"매입": [{ "label": "20190102", "val": "450000" }
					, { "label": "20190108", "val": "150000" }
					, { "label": "20190114", "val": "260000" }
					, { "label": "20190119", "val": "320000" }
					, { "label": "20190124", "val": "450000" }
					, { "label": "20190129", "val": "166500" }
					, { "label": "20190131", "val": "6500" }]
			},
			"colorSet" :  "#8cbcfa" ,
			"pie-chart": {
				"매입": [{ "label": "기업은행", "val": "48" }
					, { "label": "국민은행", "val": "35" }
					, { "label": "하나은행", "val": "10" }
					, { "label": "신한은행", "val": "7" }]
			},
			"pie-chart2": {
				"매입": [{ "label": "미래인**", "val": "43" }
					, { "label": "하나**", "val": "20" }
					, { "label": "개발자***", "val": "20" }
					, { "label": "케이****", "val": "17" }]
			},
			"compare": {
				"차액": [
					{ "label": "deposit", "val": "40" }
				, { "label": "withdraw", "val": "60" }
				]
			},
			"SUM_LIST": [
                {
                    "DFAM_SUM": "-478716.000",
                    "SLIDE_FLAG": "Y",
                    "MNRC_SUM": "10000.000",
                    "DROT_SUM": "488716.0000",
                    "DATE_TEXT": "202411082359",
                    "BIG_TR": "BNTR",
                    "CHART": {
                        "입출금": [
                            {
                                "VAL": "350.000",
                                "LABEL": "입금"
                            },
                            {
                                "VAL": "600.000",
                                "LABEL": "출금"
                            }
                        ]
                    },
                    "BASE_YMD": "20241108"
                }
			],
			"nothing": {
				"백": [{ "label": "A", "val": "100" }]
			},
			"many": {
				"매입": [{ "label": "1월", "val": "200,000" }
					, { "label": "2월", "val": "150,000" }
					, { "label": "3월", "val": "260,000" }
					, { "label": "4월", "val": "320,000" } 
					, { "label": "현재", "val": "166,500" }]
			},
			"double": {
				"입금": [{ "LABEL": "월", "VAL": "48" }
					, { "LABEL": "화", "VAL": "35" }
					, { "LABEL": "수", "VAL": "10" }
					, { "LABEL": "목", "VAL": "17" }
					, { "LABEL": "금", "VAL": "60" }
					, { "LABEL": "토", "VAL": "77" }],
				"출금": [{ "LABEL": "월", "VAL": "100" }
					, { "LABEL": "화", "VAL": "150" }
					, { "LABEL": "수", "VAL": "20" }
					, { "LABEL": "목", "VAL": "50" }
					, { "LABEL": "금", "VAL": "80" }
					, { "LABEL": "토", "VAL": "30" }]
			},
			"double2": {
				"입금": [{ "LABEL": "06월", "VAL": "100" }
					, { "LABEL": "07월", "VAL": "100" }
					, { "LABEL": "08월", "VAL": "100" }
					, { "LABEL": "09월", "VAL": "100" }
					, { "LABEL": "10월", "VAL": "100" }
					, { "LABEL": "11월", "VAL": "20000" }
					, { "LABEL": "12월", "VAL": "100" }],
				"출금": [{ "LABEL": "06월", "VAL": "100" }
					, { "LABEL": "07월", "VAL": "100" }
					, { "LABEL": "08월", "VAL": "100" }
					, { "LABEL": "09월", "VAL": "100" }
					, { "LABEL": "10월", "VAL": "10000" }
					, { "LABEL": "11월", "VAL": "100" }
					, { "LABEL": "12월", "VAL": "100" }]
			},
			"card_sales": {
				"입금": [{ "LABEL": "월", "VAL": "468" }
				, { "LABEL": "화", "VAL": "6235" }
				, { "LABEL": "수", "VAL": "1150" }
				, { "LABEL": "목", "VAL": "1667" }
				, { "LABEL": "금", "VAL": "9850" }
				, { "LABEL": "토", "VAL": "4879" }],
			},
			"radar": {
				"평점": [{ "LABEL": "성장성", "VAL": "50" }
					, { "LABEL": "안정성", "VAL": "21.2" }
					, { "LABEL": "밀집도", "VAL": "40" }
					, { "LABEL": "구매력", "VAL": "10" }
					, { "LABEL": "집객력", "VAL": "60" }]				
			},
			"chart03": {
				"지출": [{ "LABEL": "비씨카드", "VAL": "50" }
					, { "LABEL": "현대카드", "VAL": "30" }
					, { "LABEL": "삼성카드", "VAL": "10" }
					, { "LABEL": "우리카드", "VAL": "10" }]
			},
		}
	};

	fns['web/hideAllField'] = function(input) {
		var _container = this.$e.closest(".cont_add");
		var _certBtn = _container.find(".cert_hide");

		if (input.BNCD == "000") { // 기업은행일경우
			_container.find(".show_loginfo").addClass("hide");
		} else { // 그 외 은행일 경우
			_container.find(".show_loginfo").removeClass("hide");
			_container.find(".card_id_area").click();
			_container.find(".card_id_area").addClass("selected");

			if	(input.BNCD == "002" || input.BNCD == "003" || input.BNCD == "008" || input.BNCD == "015" || input.BNCD == "019" || input.BNCD == "040") {
					_certBtn.addClass("hide"); 
			} else { 
				_certBtn.removeClass("hide");  
			} 
		}
	}

	fns['loading/on'] = function (key, val, $e) { $('.loading-bar').removeClass("hide"); }
	fns['loading/off'] = function (key, val, $e) { $('.loading-bar').addClass("hide"); }
	fns['ui/IDPWandCert'] = function (input) {
		var _get = this.$e.get(0);
		var _row = this.$e.closest(".row");
		if (input.LGN_CRTC_DCD == "20") {
			_row.siblings(".choice_idpw").removeClass("hide");
			_row.siblings(".choice_cert").addClass("hide");
		} 
		else if (input.LGN_CRTC_DCD == "10") { 
			_row.siblings(".choice_idpw").addClass("hide");
			_row.siblings(".choice_cert").removeClass("hide");
		} 
	}
	fns['data/charts'] = function (input) {
		return {
			"chart01": {
				"매입": [{ "LABEL": "05?��", "VAL": "200000" }
					, { "LABEL": "06?��", "VAL": "150000" }
					, { "LABEL": "07?��", "VAL": "260000" }
					, { "LABEL": "08?��", "VAL": "40000" }
					, { "LABEL": "09?��", "VAL": "320000" }
					, { "LABEL": "?��?��", "VAL": "520000" }
				],

			},
			"chart03": {
				"지출": [{ "LABEL": "비씨카드", "VAL": "50" }
					, { "LABEL": "현대카드", "VAL": "30" }
					, { "LABEL": "삼성카드", "VAL": "10" }
					, { "LABEL": "우리카드", "VAL": "17" }]
			},
			"chart04": {
				"?���?": [{ "LABEL": "?��", "VAL": "48" }
					, { "LABEL": "?��", "VAL": "35" }
					, { "LABEL": "?��", "VAL": "10" }
					, { "LABEL": "�?", "VAL": "17" }
					, { "LABEL": "�?", "VAL": "60" }
					, { "LABEL": "?��", "VAL": "77" }],
				"출금": [{ "LABEL": "?��", "VAL": "100" }
					, { "LABEL": "?��", "VAL": "150" }
					, { "LABEL": "?��", "VAL": "20" }
					, { "LABEL": "�?", "VAL": "50" }
					, { "LABEL": "�?", "VAL": "80" }
					, { "LABEL": "?��", "VAL": "30" }]

			},
			"chart05": {
				"?���?": [{ "LABEL": "?��", "VAL": "48" }
					, { "LABEL": "?��", "VAL": "35" }
					, { "LABEL": "?��", "VAL": "10" }
					, { "LABEL": "�?", "VAL": "17" }
					, { "LABEL": "�?", "VAL": "60" }
					, { "LABEL": "?��", "VAL": "77" }],
				"출금": [{ "LABEL": "?��", "VAL": "100" }
					, { "LABEL": "?��", "VAL": "150" }
					, { "LABEL": "?��", "VAL": "20" }
					, { "LABEL": "�?", "VAL": "50" }
					, { "LABEL": "�?", "VAL": "80" }
					, { "LABEL": "?��", "VAL": "30" }]

			},
			"chart06": {
				"?���?": [{ "LABEL": "?��", "VAL": "18" }
					, { "LABEL": "?��", "VAL": "30" }
					, { "LABEL": "?��", "VAL": "4" }
					, { "LABEL": "�?", "VAL": "60" }
					, { "LABEL": "�?", "VAL": "7" }
					, { "LABEL": "?��", "VAL": "6" }]

			},
			"chart07": {
				"?���?": [{ "LABEL": "?��", "VAL": "48" }
					, { "LABEL": "?��", "VAL": "35" }
					, { "LABEL": "?��", "VAL": "10" }
					, { "LABEL": "�?", "VAL": "17" }
					, { "LABEL": "�?", "VAL": "60" }
					, { "LABEL": "?��", "VAL": "77" }]

			},

		}
	}
	
	fns['ui/etc/exitPop'] = function (input) {
		$(".pop_mtaa_Y").addClass("hide");
		$(".col.s02-5.h60.selected").click();
		if(!this.$e.hasClass('btnExitPop')){
			$(".saveProp").click();
		}
	};
	
	
	fns['data/checkExistCert'] = function (input) {
		var cert_dat = input;
		var strYn = "Y";
		if(input.length){
			cert_dat = input[0];
		}
		
		if(!cert_dat["sm_cert_display_cn"]){
			strYn = "N"
		}
		return { "CERT_EXT_YN" : strYn};
	};

})();