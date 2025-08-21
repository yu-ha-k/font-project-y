/**
 * Form Checker
 * 
 * HTML 내용을 Check를 해야 하므로, html attribute를 검증하는것을 염두에 두고 코딩
 * Key의 정의는 data- 라는 prefix를 붙여주어야 한다.
 * 
 * 현재는 Jquery를 사용하는데 Jquery를 사용하지 않는 곳도 있을수 있으니 그것을 염두에 두어야 한다.
 * 
 * 일단 Jquery로 코딩
 * 
 * @author 김학길
 */
(function() {
	var plugin_checkForm = JexPlugin.extend({
		init : function() {
			this.checker	= "[data-chk]";
			this.option	= "data-chk-name";
			this.chkList	= {};
			this.msgList	= {};
			this.dfltMsg	= "[%MSG%] 을(를) 확인하여 주십시오. [%CHK%]검증시 오류";
		}, addCheckList : function(key, fn) {
			if (typeof(key) != "string" || typeof(fn) != "function") {
				jex.printError("잘못된 폼정의!!");		// 차후에 Code, Msg정의해서 넣자
				return false;
			}
			this.chkList[key] = fn;
		}, setDfltMsg: function(msg) {
			this.dfltMsg = msg;
		}, addMsg: function(key, msg) {
			this.msgList[key] = msg;
		}, checkItem : function(obj) {
			var r		= this;
			var rslt	= [];
			var sel		= false;
			$.each($(obj), function(i,v) {
				var c	= $(this).attr("data-chk").split(",");
				for (var i=0;i<c.length;i++) {
					if (!r.chkList[c[i]]($(this).getTagValue())) {
						var p = {};
						if (!sel) {
							$(this).focus();
							sel = true;
						}
						p['id'	 ]	= $(this).attr("id");
						p['check']	= c[i];
						p['name' ]	= $(this).attr(r.option);
						rslt.push(p);
					}
				}
			});
			var msg = "";
			for (var i=0; i<rslt.length; i++) {
				var m = (rslt[i].name!=undefined)?rslt[i].name:rslt[i].id;
				var m2= this.msgList[rslt[i].check];
				if (jex.isNull(m2))	msg += this.dfltMsg.replace(/%MSG%/g,m).replace(/%CHK%/g, rslt[i].check).replace(/%IDX%/g,i);
				else				msg += m2.replace(/%MSG%/g,m).replace(/%CHK%/g, rslt[i].check).replace(/%IDX%/g,i);
				msg+="\n";
			}
			if (rslt.length>0) jex.printInfo("WE0026",msg);
			return (rslt.length==0);
		}, check : function(obj) {
			var r		= this;
			var rslt	= [];
			var sel		= false;
			$.each($(obj).find(this.checker), function(i,v) {
				var c	= $(this).attr("data-chk").split(",");
				for (var i=0;i<c.length;i++) {
					if (!r.chkList[c[i]]($(this).getTagValue())) {
						var p = {};
						if (!sel) {
							$(this).focus();
							sel = true;
						}
						p['id'	 ]	= $(this).attr("id");
						p['check']	= c[i];
						p['name' ]	= $(this).attr(r.option);
						rslt.push(p);
					}
				}
			});
			var msg = "";
			for (var i=0; i<rslt.length; i++) {
				var m = (rslt[i].name!=undefined)?rslt[i].name:rslt[i].id;
				var m2= this.msgList[rslt[i].check];
				if (jex.isNull(m2))	msg += this.dfltMsg.replace(/%MSG%/g,m).replace(/%CHK%/g, rslt[i].check).replace(/%IDX%/g,i);
				else				msg += m2.replace(/%MSG%/g,m).replace(/%CHK%/g, rslt[i].check).replace(/%IDX%/g,i);
				msg+="\n";
			}
			if (rslt.length		>	0) 		jex.printInfo("WE0026",msg);
			
			return msg;
			//return (rslt.length==0);
		}
	});

	jex.plugin.add("MOBILE_FORM_CHECKER", new plugin_checkForm());
}());
