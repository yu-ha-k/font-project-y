(function() {
	/**
	 * Message 정의
	 */
	var _JexMessage = JexMsg.extend({
		init:function() {
		},printInfo	:function(code,msg){
			var m = {};
			m['TYPE'] = "INFO";
			m['CODE'] = code;
			m['MSG' ] = (msg)?msg:jex.getMsg(code);
			this.addMsg(m);
		},printError:function(code,msg){
			//ADD 20130520 from kiup
			
			code = $.trim(code);
			if(code=="9999" || code=="100" || code=="CI1001"){	 
				_webViewExit('sessionOutWithAlert');
			}else if(code == "702"){
				_webViewExit('sessionOut2');
			}else{
				MobPopup.showErrorPopup(code, msg);
			}
			//END
			/*var m = {};
			m['TYPE'] = "ERROR";
			m['CODE'] = code;
			m['MSG' ] = (msg)?msg:jex.getMsg(code);
			this.addMsg(m);*/
		},addMsg:function(m) {
			alert(m['MSG']);
		}
	});
	jex.setMsgObj(new _JexMessage());	
})();