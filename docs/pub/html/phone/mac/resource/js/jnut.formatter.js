/**
 * data-jno='ABC' data-jnf='money'
 */
(function() {
    
	var fnMoneyKorean = function(val) {
		var levA	= new Array("","일","이","삼","사","오","육","칠","팔","구","십");
		var levB	= new Array("","십","백","천");
		var levC	= new Array("", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극", "항", "아", "라", "불", "무");
		var splNum	= (val+"").replace(/[^0-9\.]+/g, '').split( /(?=(?:....)*$)/ ) ;
		var spllen	= splNum.length;
		var ret		= [];

		for (var ii=0; ii<spllen; ii++) {
			var strsub	= splNum[ii];
			var strlen	= strsub.length;
			var retsub	= "";
			for (var jj=0; jj<strlen; jj++) {
				var strA = levA[strsub.charAt(jj)];
				retsub += strA;
				if (strA != "") retsub += levB[strlen - 1 - jj];
			}
			if (retsub != "") ret.push((retsub += levC[spllen-1-ii])+" ");
		}
		return ret.join('');
	}

	var $not_grade = document.querySelector(".not-first");
	window.jnut_formatter	= {
			 money				: function(key,val, $e) { return ((val[key])?parseInt((val[key]+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0); }
			,telno				: function(key,val) { return (val[key].length == 10)?val[key].replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"):val[key].replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); }
			,strYear			: function(key,val) { return (new Date().getYear(val)-100) + "년 "; }
			,strMD				: function(key,val) { return (new Date().getMonth(val)+1) + "월 " + (new Date().getDate(val)) + "일"; }
			,corpNo				: function(key,val) { return (val[key])?val[key].replace(/(\d{3})(\d{2})(\d)/, "$1-$2-$3"):""; }
			,setTime			: function(key,val) { return val[key].replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3"); }
			,cardNo				: function(key,val) { return val[key].replace(/(\d{4})(\d{4})(\d{4})(\d)/, "$1-$2-$3-$4"); } 
			,cardNoMask			: function(key,val) { return val[key].replace(/(\d{4})(\d{4})(\d{4})(\d)/, "$1-****-****-$4"); } 
			,acctNo				: function(key,val) { return val[key].replace(/(\d{3})(\d{7})(\d{2})(\d)/, "$1-$2-$3-$4"); }
			,moneyKorean		: function(key,val) { return fnMoneyKorean(val[key]); }
			,rate				: function(key,val) { return (Number(val[key]) == NaN) ? val[key] + " %" : Number(val[key]).toFixed(2) + " %"; }
			,addPercent			: function(key,val) { return (Number(val[key]) == NaN) ? val[key] + " %" : val[key] + " %"; }
			,zero2Y				: function(key,val) { return (parseInt(val[key]) != 0)?"N":"Y";}
			,zero2N				: function(key,val) { return (parseInt(val[key]) != 0)?"Y":"N";}
			,hasValue			: function(key,val) { return (val[key])?"Y":"N"; }
			,notHasValue		: function(key,val) { return (val[key])?"N":"Y"; }
			,reverseYN			: function(key,val) { return (val[key] == "N")?"Y":"N"; }
			,nullArray			: function(key,val) { return val[key]?val[key]:[]; }
			,toHeight			: function(key,val,$e) { $e.height(val[key]+"px") }
			,labelColor			: function(key,val,$e) { $e.css("background-color","#"+val[key])}
			,toWidthHeight		: function(key,val,$e) { $e.height(val[key]+"%"), $e.width(val[key]+"%") }
			,colorFmt			: function(key,val,$e) { $e.css("background-color",val[key])}
			,toRvsHeight		: function(key,val,$e) { $e.height((80-val[key])+"px") }
			,gradePos			: function(key,val,$e) { $e.css("left",val[key]+"%")}
			,nl2br				: function(key,val) { return val[key].replace(/\\n/g,"<br />"); }
			,parseFloor			: function(key,val) { return Math.floor((val[key])); }
			,removeZeroToStr	: function(key,val) { return parseInt(val[key].substring(4,6));} //"201901" 타입의 val을 1로
			,removeZeroToStr2	: function(key,val) { return parseInt(val[key].substring(4,6));} //"20190112" 타입의 val을 1로
			,strYYYYFromDtm		: function(key,val) { return (typeof val[key] != 'number')?val[key]: new Date(val[key]).getFullYear(); }
			,strYYFromDtm		: function(key,val) { return (typeof val[key] != 'number')?val[key]: new Date(val[key]).getYear()-100;}
			,strMMFromDtm		: function(key,val) { return (typeof val[key] != 'number')?val[key]: new Date(val[key]).getMonth()+1; }
			,strDDFromDtm		: function(key,val) { return (typeof val[key] != 'number')?val[key]: new Date(val[key]).getDate(); }
			,strYYYYFromStr		: function(key,val) { return (typeof val[key] != 'string')?val[key]: parseInt(val[key].substring(0,4)); }
			,strYYFromStr		: function(key,val) { return (typeof val[key] != 'string')?val[key]: strUtil.lpad(parseInt(val[key].substring(2,4)),'0', 2); }
			,strMMFromStr		: function(key,val) { return (typeof val[key] != 'string')?val[key]: strUtil.lpad(parseInt(val[key].substring(4,6)),'0', 2); }
			,strDDFromStr		: function(key,val) { return (typeof val[key] != 'string')?val[key]: strUtil.lpad(parseInt(val[key].substring(6,8)),'0', 2); }
			,strSELYYMMFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})/, "$1년 $2월"); }
			,strDOTYYMMFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})/, "$1. $2"); }
			,strSELYYMMDDFromStr: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1년 $2월 $3일"); }
			,strYYYYMMDDFromStr : function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"); }
			,strYYYYMMDDHHMMFromStrN : function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5"); }
			,strYYYYMMDDHHMMFromStr : function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5 기준"); }
			,strYYYYMMDDHHMMFromStrForAcct : function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5 기준"); }
			,strDOTYYMMDDFromStr: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3"); }
			,strDOTHMSFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3"); }
			,strSELDDFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$3일"); }
            ,strSELMMDDFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$2월 $3일"); }
			,strDOTMMDDFromStr	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$2.$3."); }
			,strYYYYMMFromStr 	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{4})(\d{2})/, "$1-$2"); }
			,strMMDDFromStr 	: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].replace(/(\d{2})(\d{2})/, "$1월 $2일"); }
			,strMMDDSlice		: function(key,val) { return (typeof val[key] != 'string')?val[key]:val[key].substring(4,8);}
			,strMMDD		: function(key,val) { return (typeof val[key] != 'string')?val[key]:parseInt(val[key].substring(0,2))+"월 "+parseInt(val[key].substring(2,4))+"일";}
			,checkChartbaseAtZero: function(key,val,$e) {
				var $chart	= $($e.attr("data-chart-target"));
				var objs	= $chart.data("_nattr");
				var chart;
				for (var idx in objs) {	if (objs[idx].q == "[data-chart]") {	chart = objs[idx];	}}

				if (chart) {
					//chart.chart.config.options.scales.yAxes[0].ticks.beginAtZero
					var cmpDat;
					for (var ck in val[key]) { // chart data는 json 일단 무조검 1개만 있다고 보자.
						var list = val[key][ck];
						for (var idx in list) {
							if (!cmpDat) cmpDat = list[idx]['VAL'];
							if (cmpDat != list[idx]['VAL']) {
								console.log("checkChartbaseAtZero :: false" );
								chart.chart.config.options.scales.yAxes[0].ticks.beginAtZero = false;
								return;
							}
							cmpDat = list[idx]['VAL'];
						}
						break;
					}
					console.log("checkChartbaseAtZero :: true" );
					chart.chart.config.options.scales.yAxes[0].ticks.beginAtZero = true;		// default false
				}
			}
			,listAppender		: function(key,val,$e) {
				var $tgt = $($e.attr("data-target-list"));
				if (val[key] == "Y")	 $tgt.hasClass("appendList") && $tgt.removeClass("appendList");
				else 					!$tgt.hasClass("appendList") && $tgt.addClass	("appendList");
			} 
			,formatURL			: function(key,val,$e) {
				var inps = {};
				inps['ONLOAD_ACN'] = (val['ACN'])?val['ACN']:val['IBTR_ACN'];
				inps['ONLOAD_SMR'] = (val['SMR'])?val['SMR']:val['IBTR_NM'];
				return $e.attr("data-dflt-url") + "&inps="+ encodeURIComponent(JSON.stringify(inps));
			}
			,formatURL2		: function(key,val,$e) { // 카드매출 최근
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var ymd		= val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
				var inps	= {"GO_YMD":ymd};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL3		: function(key,val,$e) { // 세금계산서 매출 전월
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var ym		= val[key].replace(/(\d{4})(\d{2})/, "$1-$2");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_YM1":ym,"GO_YY1":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL4		: function(key,val,$e) { //세금계산서 매입 전월
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var ym		= val[key].replace(/(\d{4})(\d{2})/, "$1-$2");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_YM2":ym,"GO_YY2":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL5		: function(key,val,$e) { //현금영수증 매출 최근
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var md		= val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_MD1":md,"GO_YY1":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL6		: function(key,val,$e) { //현금영수증 매출 전월
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var md		= val[key].replace(/(\d{4})(\d{2})/, "$1-$2");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_MD2":md, "GO_YY2":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL7		: function(key,val,$e) { //현금영수증 매입 최근
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var md		= val[key].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_MD3":md, "GO_YY3":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL8		: function(key,val,$e) { //현금영수증 매입 전월
				var $tgt 	= $($e.attr("data-jno-target"));
				var org		= $tgt.attr("data-dflt-url");
				var md		= val[key].replace(/(\d{4})(\d{2})/, "$1-$2");
				var yy		= val[key].substr(0,4);
				var inps	= {"GO_MD4":md, "GO_YY4":yy};
				$tgt.val(org+"&inps="+ encodeURIComponent(JSON.stringify(inps)));
			}
			,formatURL9			: function(key,val,$e) {
				var inps = {};
				return $e.attr("data-dflt-url") + "&inps="+ encodeURIComponent(JSON.stringify(inps));
			}
			,groupBy			: function(key,val,$e) {
				var groupByVal = val[key]?val[key].trim():val[key];
				if (!window.groupBy						)	window.groupBy 		= {};
				if ($e.closest("[data-row-num]"			).attr("data-row-num") == 0) window.groupBy[key] 	= undefined;
				if ( window.groupBy[key] == groupByVal	) 	$e.addClass("hide");
				else										window.groupBy[key] 	= groupByVal;				// 이전 값으로 세팅
			}
			,groupByReverse		: function(key,val,$e) {
				var groupByVal = val[key]?val[key].trim():val[key];
				var key2   = "BNNM";
				var chkVal = val[key2]?val[key2].trim():val[key2];
								
				if (!window.rvsKey   ) 	window.rvsKey 		= {};
				if (!window.groupBy3 )	window.groupBy3		= {};
				
				if ($e.closest("[data-row-num]"			).attr("data-row-num") == 0) window.rvsKey[key2] 	= undefined;
				if ($e.closest("[data-row-num]"			).attr("data-row-num") == 0) window.groupBy3[key] 	= undefined;
				
				if ( window.groupBy3[key] == groupByVal && ( window.rvsKey[key2] == chkVal )) {
					(window.rvsVal).addClass("hide");
					(window.rvsVal).parent().removeClass("underline");
				}
				window.groupBy3[key]  = groupByVal;				
				window.rvsKey[key2] = chkVal;
				window.rvsVal = $e;
				}
			,groupByCustom		: function(key,val,$e) {
				var groupByVal = val[key]?val[key].trim():val[key];
				var key2   = "BNNM";
				var chkVal = val[key2]?val[key2].trim():val[key2];
								
				if (!window.findKey) 	window.findKey 		= {};
				if (!window.groupBy2)	window.groupBy2 	= {};
				
				if ($e.closest("[data-row-num]"			).attr("data-row-num") == 0) window.findKey[key2] 	= undefined;
				if ($e.closest("[data-row-num]"			).attr("data-row-num") == 0) window.groupBy2[key] 	= undefined;
				
				if ( window.groupBy2[key] == groupByVal && window.findKey[key2] == chkVal ) {
					$e.addClass("hide");
				}
				window.groupBy2[key]  = groupByVal;				
				window.findKey[key2] = chkVal;
				
			}
			,groupBySum			: function(key,val,$e) {
				var groupByKey = $e.attr("data-jnf-groupBySum");
				
				if (!window.groupByStr				) window.groupByStr 		= {};
				if (!window.groupBySum				) window.groupBySum 		= {};
				if (!window.groupBySumEle			) window.groupBySumEle		= {};
				
				// console.log("groupByKey :: [", val[groupByKey],"]", window.groupBySum[groupByKey]);
				
				if ($e.closest("[data-row-num]"		).attr("data-row-num") == 0) {
					window.groupByStr[groupByKey]		= undefined;	
					window.groupBySum[groupByKey]		= 0;
					window.groupBySumEle[groupByKey]	= undefined;
				}
				
				if ( window.groupByStr[groupByKey] != val[groupByKey]) {
					var sum = jnut_formatter.money(groupByKey, groupBySum);
					
					// console.log("sum :: ", window.groupByStr[groupByKey], " / ", sum);
					
					window.groupBySumEle[groupByKey] && window.groupBySumEle[groupByKey].length && window.groupBySumEle[groupByKey].html(sum);
					window.groupBySumEle[groupByKey] = $e;
					window.groupBySum	[groupByKey] = 0;
					window.groupByStr	[groupByKey] = val[groupByKey];
				}
				window.groupBySum[groupByKey] += val[key];
			}
			,fromSMRfmt				: function(key,val,$e) { 
				if (val[key] == "" || null) $e.text("적요없음");
				else $e.text(val[key]);
			}
			,fromSMRfmt2				: function(key,val,$e) { // 출금일때 (적요(으)로), 입금일때 (적요에서)
				var toStr = val[key]+"";
				if (toStr.substr(0,1) == "-") $e.text("(으)로");
				else $e.text("에서");
			}
			,hideBtnFromSMR			: function(key,val,$e) {
				if (val[key]=="") $e.addClass("hide");
				else $e.removeClass("hide");
			}
			,fmtSMR				: function(key,val,$e) {
				if (val[key] == "" || null) $e.text("적요없음");
				else $e.text(val[key]);
			}
			,isFirstRowAddSelect: function(key,val,$e) {
				var $row	= $e.closest("[data-row-num]");
				var rownum	= $row.attr("data-row-num");
				if (rownum == 0) $row.addClass("selected");
				else 			 $row.removeClass("selected");
			}
			,certStatus : function(key,val,$e) {
				$e.removeClass("normal").removeClass("expire").removeClass("update").removeClass("error");
				if (val[key] == "0") $e.addClass ("normal"), $e.text("정상"); // cert_status = 0 정상
				if (val[key] == "1") $e.addClass ("update"), $e.text("갱신"); 
				if (val[key] == "2") $e.addClass ("expire "), $e.text("만료");
				// if (val[key] == "3") $e.addClass ("error"), $e.text("오류");
			}
			,certStatusImg : function(key,val,$e) {
				$e.removeClass("icon-cert").removeClass("icon-cert-update").removeClass("icon-cert-error").removeClass("icon-cert-expire"); 
				var expYMD = val[key].substring(0,10); 									// val[key]가 YYYY-MM-DD hh:mm:ss 형태이므로 년월일만 가져옴
				var expArr = expYMD.split("-"); 								// YYYY,MM,DD를 나누어 줌
				var expSetDate = new Date(expArr[0], expArr[1]-1, expArr[2]); 	// 날짜차이를 계산하기 위해 Date 객체에 만료일자를 넣어준다
				// var nnow = new Date();
				var startDate = new Date().toISOString().slice(0,10); 						// YYYY-MM-DD 형태를 가지고 오기 위한 코드
				var startArr = startDate.split("-");
				var startSetDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
				var betweenDate = (expSetDate.getTime() - startSetDate.getTime())/(1000*60*60*24); // 24시*60분*60초*millisecond 을 계산해주면 일자가 나온다.
				if (betweenDate < 0){
					$e.addClass ("icon-cert-expire");
				} 
				else if ( betweenDate <= 30 ) {
					$e.addClass ("icon-cert-update");	 
				} 
				else{
					$e.addClass("icon-cert");
				}
//				if (val[key] == "0") $e.addClass("icon-cert");
//				if (val[key] == "1") $e.addClass ("icon-cert-update");
//				if (val[key] == "2") $e.addClass ("icon-cert-expire ");
//				// if (val[key] == "3") $e.addClass ("icon-cert-error");
			}
			,expireText : function(key,val,$e) {
				$e.removeClass("normal").removeClass("expire").removeClass("update").removeClass("error");
				var expYMD = val[key].substring(0,10); 									// val[key]가 YYYY-MM-DD hh:mm:ss 형태이므로 년월일만 가져옴
				var expArr = expYMD.split("-"); 								// YYYY,MM,DD를 나누어 줌
				var expSetDate = new Date(expArr[0], expArr[1]-1, expArr[2]); 	// 날짜차이를 계산하기 위해 Date 객체에 만료일자를 넣어준다
				// var nnow = new Date();
				var startDate = new Date().toISOString().slice(0,10); 						// YYYY-MM-DD 형태를 가지고 오기 위한 코드
				var startArr = startDate.split("-");
				var startSetDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
				var betweenDate = (expSetDate.getTime() - startSetDate.getTime())/(1000*60*60*24); // 24시*60분*60초*millisecond 을 계산해주면 일자가 나온다.
				if (betweenDate < 0){
					$e.addClass ("expire "), $e.text("만료");
				} 
				else if ( betweenDate <= 30 ) {
					$e.addClass ("update"), $e.text("갱신");	 
				} 
				else{
					$e.addClass ("normal"), $e.text("정상");
				}
//				if (val[key] == "0") $e.addClass ("normal"), $e.text("정상"); // cert_status = 0 정상
//				if (val[key] == "1") $e.addClass ("update"), $e.text("갱신"); 
//				if (val[key] == "2") $e.addClass ("expire "), $e.text("만료");
//				// if (val[key] == "3") $e.addClass ("error"), $e.text("오류");
			}
			,expireYYYYMMDDText : function(key,val,$e) {
				var expYMD = val[key].substring(0,10); 									// val[key]가 YYYY-MM-DD hh:mm:ss 형태이므로 년월일만 가져옴
				var expArr = expYMD.split("-"); 								// YYYY,MM,DD를 나누어 줌
				var expSetDate = new Date(expArr[0], expArr[1]-1, expArr[2]); 	// 날짜차이를 계산하기 위해 Date 객체에 만료일자를 넣어준다
				// var nnow = new Date();
				var startDate = new Date().toISOString().slice(0,10); 						// YYYY-MM-DD 형태를 가지고 오기 위한 코드
				var startArr = startDate.split("-");
				var startSetDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
				var betweenDate = (expSetDate.getTime() - startSetDate.getTime())/(1000*60*60*24); // 24시*60분*60초*millisecond 을 계산해주면 일자가 나온다.
				if (betweenDate < 0){
					$e.addClass("hide");
				} 
				else if ( betweenDate == 0 ) {
					$e.removeClass("hide").addClass("t-dred");	 
					$e.text("인증서를 갱신하세요. (만료일)");
				} 
				else if ( betweenDate <= 30 ) {
					$e.removeClass("hide").addClass("t-dred");	 
					$e.text("인증서를 갱신하세요. (만료 " + betweenDate + "일 전)");
				} 
				
			} 
			,expireYYYYMMDDred : function(key,val,$e) {												
				var expYMD = val[key].substring(0,10); 					 
				var expArr = expYMD.split("-"); 								 
				var expSetDate = new Date(expArr[0], expArr[1]-1, expArr[2]); 	 
				var startDate = new Date().toISOString().slice(0,10); 						 
				var startArr = startDate.split("-");
				var startSetDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
				var betweenDate = (expSetDate.getTime() - startSetDate.getTime())/(1000*60*60*24);
				if (betweenDate < 0){
					$e.addClass("t-black");
					return expYMD;
				}
				if (betweenDate == 0){
					$e.addClass("t-dred");
					return expYMD;
				}
				else if ( betweenDate <= 30 )  {
					$e.addClass("t-dred"); 
					return expYMD;
				} 
				else if (betweenDate >= 30) {
					$e.addClass("t-black");
					return expYMD;
				}
				
				
			}
			,todayCheck  		: function(key,val,$e) {
				//var ttoday 	= new Date();
				//var mon		= parseInt(val.YMD.substring(4,6));
				//if (val.DAY == ttoday.getDate() && mon == (ttoday.getMonth()+1)) {
				console.log(val);
				var selected = val['SEL_YMD'];
				var date	 = (selected)?selected.substring(6,8):(new Date()).getDate();
				if (date == val[key]) {
					$e.parent().addClass('selected');
					
					/**
					 * 20240201 웹접근성 추가 
					 * */									
					$e.prev("p[role='radio']").attr("aria-checked",true);
					
					var $d = $e.closest("[data-jno=DAY_LIST]");
					$d.scrollLeft($d.get(0).scrollWidth);
				}
				//} 
			}
			,gradeCheck         : function(key,val,$e) { 
				if (val[key] == "Y") $e.removeClass ("hide");
				if (val[key] == "N") $e.addClass 	("hide");
			}
			,hider              : function(key,val,$e) {
                if (val[key] == "Y") $e.removeClass ("hide");
                if (val[key] == "N") $e.addClass 	("hide");
			}
			,rvsHider              : function(key,val,$e) {
                if (val[key] == "N") $e.removeClass ("hide");
                if (val[key] == "Y") $e.addClass 	("hide");
			}
			,nullHider			: function(key,val,$e) {
                if (val[key].length!==0) $e.addClass 	("hide");
                if (val[key].length==0)  $e.removeClass ("hide");
			}	
			,notNullHider			: function(key,val,$e) {
                if (val[key].length!==0) $e.removeClass ("hide");
                if (val[key].length==0)  $e.addClass 	("hide");
			}		
			,zeroHider		: function(key,val,$e) {
                if (val[key] == 0) $e.removeClass ("hide");
                if (val[key] !== 0)  $e.addClass 	("hide");
			}	
			,blockEvent		: function(key,val,$e) {
				if (val[key] == 0) {
					$e.text("대출"); 
					$e.bind("click" , function(){
						$(".loan_popup").removeClass("hide");
						$(".dash_acct").click(); 
					});
				}
				else $e.text("대출");
			}
			,notZeroHider		: function(key,val,$e) {
                if (val[key] !== 0) $e.removeClass ("hide");
                if (val[key] == 0)  $e.addClass 	("hide");
			}
			,loanZeroHider		: function(key,val,$e) {
                if (val[key]["대출 잔액"].length == 0) $e.removeClass ("hide");
                if (val[key]["대출 잔액"].length !== 0)  $e.addClass  ("hide");
			} 
			,crdsChartZero		: function(key,val,$e) {
                if (val[key]["카드매출"].length == 0) $e.removeClass ("hide");
                if (val[key]["카드매출"].length !== 0)  $e.addClass  ("hide");
			} 
			,crdsChartNotZero		: function(key,val,$e) {
                if (val[key]["카드매출"].length !== 0) $e.removeClass ("hide");
                if (val[key]["카드매출"].length == 0) $e.addClass  ("hide");
			} 
			,loanNotZeroHider		: function(key,val,$e) {
                if (val[key]["대출 잔액"].length == 0) $e.addClass ("hide");
                if (val[key]["대출 잔액"].length !== 0)  $e.removeClass  ("hide");
			}
			,crdeListZero		: function(key,val,$e) {
                if (val[key]["카드청구"].length == 0) $e.addClass ("hide");
                if (val[key]["카드청구"].length !== 0)  $e.removeClass  ("hide");
			}
			,checker             : function(key,val,$e) {
                if (val[key] == "Y") $e.prop("checked",true);
				if (val[key] == "N") $e.prop("checked",false);
			} 
			,pinkBlue			: function(key,val,$e) {
				if (val[key] == "FEMALE") {
					(!$e.hasClass("female") && $e.addClass		("female"	));
					( $e.hasClass("male")   && $e.removeClass	("male"		));
				} else {
					(!$e.hasClass("male")   && $e.addClass		("male"		));
					( $e.hasClass("female") && $e.removeClass	("female"	));
				} 
			}
			,upAndDown              : function(key,val,$e) {
                if (val[key] == "0") $e.text("감소");
                if (val[key] == "1") $e.text("증가");
			}
			,YTChange               : function(key,val,$e) {
                if (val[key] == "Y") $e.text("어제");
                if (val[key] == "T") $e.text("오늘");
			}
			,cashInOut              : function(key,val,$e) {
                if (val[key] == "Y") $e.removeClass("hide"), $e.addClass('t-red');
				if (val[key] == "N") $e.removeClass("hide");
			}
			,minusText              : function(key,val,$e) {
				var toStr = val[key]+"";
				if (toStr.substr(0,1) == "-") {
					 $e.text("출금");
				}
				else  $e.text("입금")
			}
			,minusCardText              : function(key,val,$e) {
				var toStr = val[key]+"";
				if (toStr.substr(0,1) == "-") {
					 $e.text("결제취소");
				}
				else  $e.text("결제")
			}
			,redText              : function(key,val,$e) {
				var vkey = val[key];
				var toSStr = String(vkey);
				if (toSStr.substr(0,1) == "-") {
					 $e.addClass("t-red");
				}
				return ((toSStr)?parseInt((toSStr+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0);
			}
			,redBlueText              : function(key,val,$e) {
				var vkey = val[key];
				var toSStr = String(vkey);
				if (toSStr.substr(0,1) == "-") {
					 $e.addClass("t-red");
				}
				else {
					$e.addClass("t-skyblue");
				}
				return ((toSStr)?parseInt((toSStr+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0);
			}
			,removeMinus              : function(key,val,$e) {
				var toStr = val[key]+"";
				if (toStr.substr(0,1) == "-") {
					return ((toStr)?parseInt((toStr+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace(/-/,""):0);
			   } else {
					return ((toStr)?parseInt((toStr+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0);
			   }
			}
			,BNTR_BIG			: function(key,val,$e) {
				if (val[key] == "DROT") $e.text("출금이 입금보다");
				if (val[key] == "BNTR") $e.text("입금이 출금보다");
			}
			,svcHider			: function(key,val,$e) {
				if (val[key] == "Y") $e.removeClass ("hide");
				if (val[key] == "N") {
					$e.removeClass ("hide");
					var denySvc = "<div class='bg b-white pt30'><div class='bg b-lnavy ml20 mr20'><p class='text t-center lh60'><span class='icon-exclamation-mark'></span></p><p class='text t-lnavy lh20 t-center pb20'>해당 서비스를 이용하시려면<br><span class='bold underlinen' data-jns='element://.tab-More'>더보기</span>에서 구독을 신청해주세요</p></div>";
					$e.html(denySvc);
					_setAttrM($e);
				}
				if (val[key] == "T") {
					$e.removeClass ("hide");
					var denySvc = "<div class='bg b-white pt30'><div class='bg b-lnavy ml20 mr20'><p class='text t-center lh60'><span class='icon-exclamation-mark'></span></p><p class='text t-lnavy lh20 t-center pb20'>해당 정보는 내일부터 확인이 가능합니다</p></div>";
					$e.html(denySvc);
					_setAttrM($e);
				}
			}
			,moneyRemoveMinus	: function(key,val, $e) { return ((val[key])?parseInt((val[key]+"").replace(/-,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace(/-/,''):0); }
			,excNice			: function(key,val,$e) {
				if (val[key] == "Y") {
					alert("Nice 호출");
				}
			}
			,excSetup			: function(key,val,$e) {
				if (val[key] == "Y") {
					alert("설정 호출");
					$("div").append($("<div data-jns-onload data-jns='element://.masu_0009_01'></div>"));
				}
			}
			,excSetupTest			: function(key,val,$e) {
				if (val[key] == "Y") {
					alert("설정 호출");
					var str = val["roadAddrPart1"];
					
					$("#url").text("http://www.juso.go.kr/addrlink/addrLinkApi.do");
					$("#param").text("confmKey=U01TX0FVVEgyMDE4MTIwOTIzMjUyMDEwODM1NTI=&resultType=json&currentPage=1&countPerPage=20&keyword=" + encodeURI(str));
				}
			}
			,JOIN_YN         : function(key,val,$e) { 
				if(val[key] == "Y"){
				$e.prepend("<div class='hide answerY' data-jns='element://.open_pop_joined_Y' data-jne='change'>");
				/*console.log($e.parent().parent().parent().find('.pop_joined_Y'));*/
				}
			}
			,usingYN : function(key,val,$e){
				switch(val[key]){
				case 'Y' : 		var $aa = $e.next().filter('.row');
								$aa.removeClass('hide');
								$e.addClass('hide'); 
								break;
				case 'N' : break;
				default  : break;
				}
			},whenN : function(key,val,$e){
				if(val[key] != ""){
				console.log(val[key]);
				}
			},alramCheck             : function(key,val,$e) {
                if (val[key] == "Y") $e.prop("checked",true);
				if (val[key] == "N") $e.prop("checked",false);
				if (val[key] != "Y","N") $e.prop("disabled",false);
			},calendar_day           : function(key,val,$e) {
				if (val[key] == val['base']) 								{$e.closest("td").addClass("selected");}
				if (val[key] == val['today']) 								{$e.closest("td").addClass("today");}
				if (val[key].substring(0,6) != val['base'].substring(0,6))	{$e.closest("td").addClass("not-cur");}
				return val[key].substring(6,8);
			},aselSelected : function(key,val,$e) {
				if (val[key] == "Y") $e.parent().addClass("selected");
			}
			,moneyDP		: function(key,val, $e) {
				var basic 		 = val[key]+"";
				var money 		 = ((val[key])?parseInt((val[key]+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0); 
				var decimalPoint = basic.substr(basic.indexOf("."));
				if (basic.indexOf(".") == -1) return money;
				return money + decimalPoint;  
			},LGN_CRTC_DCD : function(key,val,$e) {
				if (val[key] == "10") 		{ $e.removeClass ("hide"); }
				else if (val[key] == "20")  { $e.removeClass ("hide"); }
				else						{ $e.addClass("hide");}
			}, SET_ADDR_FMT : function(key,val,$e) {
				if (val[key] == "설정된 주소가 없습니다.") 	{ $e.text("검색"); }			
				else								{ $e.text("변경"); }
			}
			,backORexit              : function(key,val,$e) {
                if 		(val[key] == "Y") {
                	$e.parent().parent().parent().addClass("main")
                	$e.attr("data-jns","app://exit");
                }
                else if (val[key] == "N") {
                	$e.parent().parent().parent().removeClass("main")
                	$e.attr("data-jns","element://.this-modal-close");
                }
                _setAttrMObj("[data-jns]", $e);
			}
			,textLenOverCut              : function(key,val,$e) {
				var txt = val[key]; 
				var len = 10;
				//var len = $e.closest("[max-len]").attr("max-len");
				
				if ( txt == null || txt == "") 	{ 
					if   ( key == "MEMO_SBJC_CON" )	txt = "메모";
					else 							txt = "";
				}
				if ( txt.length > len)      	{ txt = txt.substring(0, len) + "..."; }
				
				return txt;
			} 
			, getRowNum : function(key,val,$e) {
				return $e.closest("[data-row-num]").attr("data-row-num");
			}
			, replaceHttp : function(key,val) {
				return val[key].replace("http://", "https://");
			}
    };
})();