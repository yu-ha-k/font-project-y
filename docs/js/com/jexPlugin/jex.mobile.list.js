(function() {
	var lst_attrs = {
		"id"      : "data-jx-list",
		"onclick" : "data-jx-list-onclick"
	};
	
	var PLUGIN_JEXLIST = JexPlugin.extend({
		init : function(obj) {
			this.dat       = [];
			this.obj       = $(obj);
			this.drawCnt   = -1;
			this.layout    = {};
			this.formatter = jex.getSetAllFormatter();
			this.dfltStr   = "DEFAULT";
			this.emptyStr  = "EMPTY";
			this.rowNumStr = "data-rowNum";
			this.onclick   = {};
			this.jm        = jex.getJobManager();
		},
		load : function(attr, $jq) {
			this.obj = $jq;
			this.key = this.obj.attr(attr);
			
			if(undefined != this.obj.attr(lst_attrs.onclick)) {
				this.parseOnclick(this.obj.attr(lst_attrs.onclick));
			}
			
			this.getLayout();
		},
		parseOnclick : function(userInput) {
			var onclickList = userInput.split(";");
			
			for(var i = 0, length = onclickList.length; i < length; i++) {
				var keyValue = onclickList[i].split(":");
				var objectId = undefined;
				var method = undefined;
				
				if (keyValue.length == 1) {
					method = keyValue[0].trim();
				}
				else if (keyValue.length == 2) {
					objectId = keyValue[0].trim();
					objectId = (objectId.startsWith("#"))? objectId.substring(1) : objectId;
					method = keyValue[1].trim();
				}
				
				var pageMethods = method.split(".");
				method = window[pageMethods[0]];
				
				if(typeof(method) != "object" && typeof(method) != "function") continue;

				for(var indexOfPageMethods = 1, lengthOfPageMethods = pageMethods.length; indexOfPageMethods < lengthOfPageMethods; indexOfPageMethods++) {
					method = method[pageMethods[indexOfPageMethods]];
					
					if(typeof(method) == "object") continue;
					if(typeof(method) == "function") break;
				}
				
				if(typeof(method) == "function") {
					if(objectId != undefined) {
						this.onClick(objectId, method);
					}
					else {
						this.onClick(method);
					}
				}
			}
		},
		getData : function(idx) {
			return this.dat[idx];
		},
		clearList : function(b) {
			if(!b) this.dat = [];
			this.obj.children("li").remove();
		},
		addFormatter : function(key, fn) {
			this.formatter[key] = fn;
		},
		onClick : function() {
			if(arguments.length == 1) this.onclick[this.dfltStr] = arguments[0];
			else this.onclick[arguments[0]] = arguments[1];
		},
		addLayOut : function(key, str) {
			this.layout[key] = str;
		},
		getLayout : function() {
			var lilist = this.obj.children("li");
			lilist.hide();
			
			if(lilist.length == 0) return;

			for(var i = 0; i < lilist.length; i++) {
				var liid = $(lilist[i]).attr("id");
				var rowstr =  $('<p>').append($(lilist[i]).eq(0).clone()).html();

				if(!liid || liid =="") {
					if(!this.layout[this.dfltStr]) this.addLayOut(this.dfltStr, rowstr);
				}
				else {
					if(!this.layout[liid]) {
						this.addLayOut(liid, rowstr);
					}
					else {
						this.addLayOut(liid, this.layout[liid]+rowstr);
					}
				}
			}

			lilist.remove();
		},
		setDrawCnt : function(cnt) {
			this.drawCnt = cnt;
		},
		setAll : function(data,layout) {
			this.clearList();
			
			if(data && 0 != data.length) {
				if(data[this.key] != null) {
					this.dat = data[this.key];
				}
				else {
					this.dat = data;
				}
				
				this.drawLst(layout);
			}
			else {
				if(this.layout[this.emptyStr]) {
					this.addRow({}, 0, this.emptyStr);
				}
			}
		},
		append : function(data) {
			this.dat.concat(data);
			this.drawLst();
		},
		getRowNum : function(r) {
			return $(this.getParentLi(r)).attr(this.rowNumStr);
		},
		getParentLi : function(r) {
			while ($(r).get(0).tagName.toUpperCase() != "LI") r = $(r).parent().get(0);
			return r;
		},
		update : function(rowNum, dat) { //자신의 상위 LI을 찾아줌.
			this.dat[rowNum] = dat;
			this.obj.find("["+this.rowNumStr+"="+rowNum+"]").setAll(dat,this.formatter);
		},
		addNRow : function(data) {
			for(var i = 0; i < data.length; i++) {
				this.addRow(data[i]);
			}
		},
		addRow : function(data,i,layout) {
			var lo = (layout) ? layout : this.dfltStr;
			
			if(typeof data === "object" && data["JEX_LAYOUT"]) lo = data["JEX_LAYOUT"];
			if(!this.layout[lo]) lo = this.dfltStr;

			var nRow = $(this.layout[lo]);
			var _lstthis = this;
			
			if(i == undefined) {
				i = this.dat.length;
				this.dat.push(data);
			}
			
			try {
				var nRowHtml = nRow.html();
				nRowHtml = nRowHtml.replace(/\*LI_ROW_INDEX\*/gi, i); //LI 하위에 인덱스를 추가
				nRow.html(nRowHtml);
			}
			catch(e) {}

			jex.setJexObj(nRow);
			nRow.setAll(data,this.formatter);
			nRow.show();
			nRow = nRow.appendTo(this.obj);
			nRow.attr(this.rowNumStr,i);
			nRow.data("_JEX_GETALL_DATA_",data);

			for(var kkey in this.onclick) {
				var evtObj;
				if(kkey==this.dfltStr) evtObj = nRow;
				else evtObj = nRow.find("#"+kkey);
				
				evtObj.click(function(e) {
					var eventRef = (typeof e !== "undefined") ? e: event;
					
					if(eventRef.stopPropagation) {
						e.stopPropagation();
					}
					else {
						eventRef.cancelBubble = true;
					}
					
					_lstthis.onclick[jex.isNull($(this).attr("id"))?_lstthis.dfltStr:$(this).attr("id")].apply(this, [_lstthis.dat[$(_lstthis.getParentTr(this)).attr(_lstthis.rowNumStr)]]);
				});
			}
		},
		deleteRow : function(rowNum) {
			this.dat[rowNum] = {};
			this.obj.find("["+this.rowNumStr+"="+rowNum+"]").remove();
		},
		isEmptyJSON : function(obj) {
			for(var i in obj) { return false; }
			return true;
		},
		getAll : function() {
			var rslt = [];
			
			for(var i = 0; i < this.dat.length; i++) {
				if(!this.isEmptyJSON(this.dat[i])) rslt.push(this.dat[i]);
			}
			
			return rslt;
		},
		drawLst: function(layout) {
			var strIdx = 0;
			var endIdx = this.dat.length;
			
			if(this.drawCnt > 0) endIdx = this.drawCnt;
			
			for(var i = strIdx; i < endIdx; i++) {
				this.addRow(this.dat[i],i,layout);
			}
		}
	});

	jex.plugin.add("JEX_MOBILE_LIST", PLUGIN_JEXLIST, "data-jx-list");
})();
