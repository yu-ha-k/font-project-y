/**
 * 
 */
(function() {
	
	
	
	window._nattr = {};
	window._attrM = Class.extend({
		 init		:function(q,$e) { this.q = q; this.$e = $e; }
		,onLoad 	:function() 	{}
		,getValue 	:function() 	{return undefined;}
		,setValue 	:function() 	{return true;}
		,clear 		:function() 	{return undefined;}
		,evt		:function(type) {
			var elem = this.$e.get(0);
			var isIE = /*@cc_on!@*/false || !!document.documentMode;
			if (isIE) {
		        elem.fireEvent("on"+type);
			} else {
		        var event = document.createEvent("MouseEvents");
		        event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		        elem.dispatchEvent(event);
		    } 
		}
	});
	
	window._setAttrM = function($root) {
		for (var qry in _nattr) {
			var $eles = $root.find(qry).add($root.filter(qry));
			for (var i=0; i<$eles.length; i++) {
				_setAttrMObj(qry, $($eles.get(i)));
			}
		}
	};
	
	window._setAttrMObj = function(qry, $ele) {
		var _obj	= new _nattr[qry](qry, $ele);
		var _objs	= $ele.data("_nattr");
	
		if (!_objs) {
			_objs = [];
			$ele.data("_nattr", _objs);
		} else {
			for (var ii=0; ii<_objs.length; ii++) {
				if (_objs[ii].q == qry) {
					var _objj = _objs.splice(ii, 1);		// 이미 정의되어 있으면 삭제한다.
					_objj && _objj[0] && _objj[0].unbind && _objj[0].unbind();
				}
			}
		}
		_obj.onload();
		_objs.push(_obj)
	}
	
	strUtil = {
			lpad	: function(val, pad, len) {
				var rslt = val + '';
			    while (rslt.length < len) rslt = pad + rslt;
			    return rslt;
			}	
	}
	
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

	kkFormatter	= (window.jnut_formatter)?window.jnut_formatter:{};
	
	window._attrUtil = {
			 hide		: function($ele) { (!$ele.hasClass("hide")) && $ele.addClass	("hide"); }
			,show		: function($ele) { ( $ele.hasClass("hide")) && $ele.removeClass	("hide"); }
			,hideTopCont: function() 	 { $(".top-cont").addClass("hide"); 						 }
			,findEl : function($this, str) {
				if (!str) return $(str);
				var splstr	= str.split("/");
				var lengt	= splstr.length;
				var $basc	= undefined;
				for (var i=0;i<lengt;i++) {
					if (splstr[i] == "parent"	)	$basc = (!$basc)?$this.parent():$basc.parent();
					else if (splstr[i] == "this")	$basc = $this;
					else							$basc = (!$basc)?$(splstr[i]):$basc.find(splstr[i]);
				}
				return $basc;
			}
			,maxZIDX	: function() {
				var $eles = $('div');
			    var rslt = 0;
			    for (var i = 0; i < $eles .length; i++) {
			        var zidx = parseInt($($eles.get(i)).css('z-index'));
			        if (zidx > rslt) rslt = zidx;
			    }
			    return rslt;
			}, clear	: function($area) {
				var attrs = ['[data-jni]', '[data-jno]'];
				//var attrs = ['[data-jno]'];
				for (var ii=0; ii<attrs.length; ii++) {
					var attrKey = attrs[ii];
					$area 		= $area?$area:$("body");
					var $eles	= $area.find(attrKey);
					
					for (var jj=0; jj<$eles.length; jj++) {
						var $sel	 = $($eles.get(jj));
						var objs	 = $sel.data("_nattr");

						if 		("input" == $sel.get(0).tagName.toLowerCase())  							$sel.val(''); 
						else if ("img" == $sel.get(0).tagName.toLowerCase())								$sel.attr('src','');
						else if	((!objs || objs.length == 0) && $sel.children().length == 0 )				$sel.html("");
						
						if (objs && objs.length) {
							for (var i=0; i<objs.length; i++) objs[i] && objs[i].clear && objs[i].clear();
						}
//							else {
//							if ("input" == $sel.get(0).tagName.toLowerCase()) {
//								$sel.val('');
//							}
//						}
					}
				}
			}, getVal	: function($ele) {
				if ($ele.hasClass("invalid")) $ele.removeClass("invalid");
				var objs	= $ele.data("_nattr");

				if		($ele.hasClass('e-data')) {
					return $ele.data('kk-data');
				} else if (objs && objs.length) {
					var objlen = objs.length;
					for (var ii=0; ii<objlen; ii++) {
						if (objs[ii].getValue() != undefined) return objs[ii].getValue();
					}
				}
				
				if ("input" == $ele.get(0).tagName.toLowerCase()) {
					return $ele.val();
				} else {
//					return $ele.html();
					return $ele.text(); //2019.10.18 JYS 수정
				}
			}, clearIn	: function($eles) {
				var attrKey = "data-jni";
				for (var i=0; i < $eles.length; i++) {
					var $ele	= $($eles.get(i));
					var key		= $ele.attr(attrKey);
					if		($ele.get(0).tagName.toLowerCase() == "input" && ($($ele.get(0)).attr("type") == "checkbox" || $($ele.get(0)).attr("type") == "radio")) $ele.prop("checked", false);
					else if ($ele.get(0).tagName.toLowerCase() == "input") $ele.val("");
					else if ($ele.get(0).tagName.toLowerCase() == "img") $ele.attr("src", "");
				}
			}, getIn	: function($eles) {
				var result	= {};
				var attrKey = "data-jni";
				for (var i=0; i < $eles.length; i++) {
					var $ele	= $($eles.get(i));
					var key		= $ele.attr(attrKey);
					var val		= ($ele.hasClass("invalid"))?undefined:_attrUtil.getVal($ele);
					if (val != undefined)	result[key] = val;
				}
				return result;
			}, setOut	: function(dat, $area, att, prefix, attf) {
				var attrKey = (att)?att:"data-jno";
				var attrFor = (attf)?attf:"data-jnf";
				var lists	= {};
				
				$area = $area?$area:$("body");
				
				for (key in dat) {
					var kkey	 = (prefix)?prefix+"."+key:key;
					var selector = "["+attrKey+"='"+kkey+"']";
					var $sel	 = $area.find(selector);
				
					for (var ii=0; ii<$sel.length; ii++) {
						
						var objs	 = $($sel.get(ii)).data("_nattr");
						var fomt	 = kkFormatter[$($sel.get(ii)).attr(attrFor)];
						var val		 = (fomt)?fomt(kkey, dat, $($sel.get(ii))):dat[kkey];
						var isSet	 = true;
						
						if (val && typeof(val) == 'object' && val.length) {
							lists[kkey] = val;
						}
						
						if (typeof($($sel.get(ii)).attr("data-check")) == 'string') {
							lists[kkey] = val;
						}
					
						if (objs && objs.length) {
							for (var i=0; i<objs.length; i++) {
								isSet = objs[i].setValue(val);
							}
						} 
						
						if (isSet) {
							if (val && typeof(val) == 'object' && val.length) continue;
							
							if ($($sel.get(ii)).hasClass('e-data')) {
								$($sel.get(ii)).data('kk-data', val);
							} else	{
								if (["input","select"].indexOf($sel.get(ii).tagName.toLowerCase()) > -1) {
									$($sel.get(ii)).val(val);
								} else if (["a"].indexOf($sel.get(ii).tagName.toLowerCase()) > -1) {
									($($sel.get(ii))).attr("href", val);
								} else {
									$($sel.get(ii)).html(val);
								}
							}	
						}
					}
				}
				return lists;
			}
	}

	var getQString = function() {
		var url		= document.URL;
		var idxQ	= url.indexOf("?");
		var ret		= {};
		if (idxQ > -1) {
			var qStr	= url.substring(idxQ+1);
			var qss		= qStr.split("&");
			for (var ii=0; ii<qss.length; ii++) {
				var qas = qss[ii].split("=");
				ret[qas[0]] = qas[1];
			}
		}
		return ret;	
	}
	
	$(function() { _setAttrM($(document)); });
	$(function() {
		window._qstr = getQString();

		if (window._qstr && window._qstr.inps) {
			window._inps = JSON.parse(decodeURIComponent(window._qstr.inps));
			_attrUtil.setOut(window._inps);
		}

		var onloads = window._qstr.onload;
		if (onloads) {
			var ols = onloads.split(",");
			for (var ii=0; ii<ols.length; ii++) {
				setTimeout(function(obj) {
					console.log("Yap!======>",obj);
					$(obj).click();
				},200,ols[ii]);
			}
		}
	});
})();
