/* ===================== 배포용(GitHub Pages) 전용 comMobHeader.js ===================== */
/* 루트 자동판정: 사용자/프로젝트 Pages 모두 대응 */
(function () {
  // repo pages 예: /font-project-y/..., 사용자 pages 예: /
  var REPO = (function () {
    var m = location.pathname.match(/^\/([^\/]+)\/?/);
    // GitHub Pages에서 repo 이름이 path 첫 세그먼트로 오므로, docs 구조면 다음이 안전
    return location.pathname.indexOf("/font-project-y/") === 0 ? "/font-project-y/" : "/";
  })();

  // 캐시버스터(필요시 버전만 갱신)
  var VER = "v=20250821a";

  // JS 로더: 기본은 docs/js/..., "pub/"로 시작하면 그대로 붙임
  window.includeJs = function (url) {
    var full = url.indexOf("pub/") === 0 ? (REPO + url) : (REPO + "js/" + url);
    if (full.indexOf("?") === -1) full += "?" + VER; else full += "&" + VER;
    document.write('<script src="' + full + '"></' + 'script>');
  };

  // CSS 로더: 기본은 docs/pub/css/..., "pub/"로 시작하면 그대로, "css/"로 시작하면 "pub/css/"로 보정
  window.includeCss = function (url) {
    var full;
    if (url.indexOf("pub/") === 0) {
      full = REPO + url;
    } else if (url.indexOf("css/") === 0) {
      full = REPO + "pub/" + url; // css/xxx.css -> pub/css/xxx.css
    } else {
      full = REPO + "pub/css/" + url; // 파일명만 온 경우
    }
    if (full.indexOf("?") === -1) full += "?" + VER; else full += "&" + VER;
    document.write('<link rel="stylesheet" href="' + full + '">');
  };

  // 확장자 자동 라우팅(안전장치)
  window.includeAsset = function (url) {
    return /\.css(\?|#|$)/i.test(url) ? window.includeCss(url) : window.includeJs(url);
  };
})();
/* ============================================================================= */

/* 기존 코드 (로직/순서 동일) */
var _HOST_NAME = "";
var _HOST_IMG_NAME = "";
var _pathName = window.location.pathname;

document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge" />');
document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />');

/* 라이브러리 */
includeJs("lib/jquery-3.5.1.min.js");
includeJs("lib/jquery-ui-1.13.3.js");
includeJs("lib/lottie-player.js");
includeJs("lib/swiper.min.js");

includeJs("lib/nativeBridge.js");
includeJs("lib/json2.js");
includeJs("lib/iscroll_old.js"); // jex.mobile.dialog.js 241, 258 사용중

/* CSS */
includeCss("swiper.min.css");
includeCss("normalize.css");
includeCss("common.css");
includeCss("content.css");
includeCss("popup.css");

/* 유틸 */
function isEmpty(val){var r=false;if(undefined==val||null==val||""==val)r=true;return r;}
function isEmptyArray(val){var r=false;if(isEmpty(val)||(JSON.stringify(val)=="[]"))r=true;return r;}
function isNull(val){if(val==null||val==undefined)return true;return false;}
function _isIphone(){var iFlag=/(ipod|iphone|ipad)/i.test(navigator.userAgent);if(iFlag&&navigator.userAgent.indexOf("Android")>-1)iFlag=false;return iFlag;}
function _isAndroid(){return /android/i.test(navigator.userAgent);}
function _isMobile(){var F=false;if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)){F=true;}if(/android/i.test(navigator.userAgent)){F=true;}return F;}

/* 앱/브라우저 판별 */
var _isRealApp=false;
var _userAgentObj={};
if(navigator.userAgent.indexOf("nma-url=")!=-1){
  _isRealApp=true;
  var arrAgent=navigator.userAgent.split(";");
  var kv=[];
  for(var i=0;i<arrAgent.length;i++){
    kv=arrAgent[i].split("=");
    if(kv.length==2)_userAgentObj[kv[0]]=kv[1];
  }
}

/* 콘솔 로그 제어 & 호스트 설정 */
if(_isRealApp){
  if(_userAgentObj["islog"]!=undefined&&_userAgentObj["islog"]=="false"){
    window.console={log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){}};
  }
  _HOST_NAME=_userAgentObj["nma-url"];
  _HOST_IMG_NAME=_userAgentObj["nma-img"];
}else{
  if(location.protocol=="file:"||location.host.match('192.168.224.212')){
    _HOST_NAME="http://192.168.224.212:25101";
    _HOST_IMG_NAME="http://192.168.224.75:80";
  }else{
    _HOST_NAME=location.protocol+"//"+location.host;
    _HOST_IMG_NAME=location.protocol+"//"+location.host;
  }
}

/* demo 전용 */
includeJs("com/comJavascript_forDemo.js");

/* JEX 플러그인 */
includeJs("com/jex/jex.core.js");
includeJs("com/jexPlugin/jex.formatter.js");
includeJs("com/jexPlugin/jex.mobile.msg.js");
includeJs("com/jexPlugin/jex.mobile.svc.js");
includeJs("com/jexPlugin/jex.mobile.setter.js");
includeJs("com/jexPlugin/jex.mobile.step.js");
includeJs("com/jexPlugin/jex.mobile.effect.js");
includeJs("com/jexPlugin/jex.mobile.procedure.js");
includeJs("com/jexPlugin/jex.mobile.formatter.js");
includeJs("com/jexPlugin/jex.mobile.session.js");
includeJs("com/jexPlugin/jex.mobile.position.js");
includeJs("com/jexPlugin/jex.mobile.calendar.js");
includeJs("com/jexPlugin/jex.mobile.executer.js");
includeJs("com/jexPlugin/jex.mobile.secretform.js");
includeJs("com/jexPlugin/jex.mobile.authform.js");
includeJs("com/jexPlugin/jex.mobile.inputamount.js");
includeJs("com/jexPlugin/jex.mobile.searchdate.js");
includeJs("com/jexPlugin/jex.mobile.trnform.js");
includeJs("com/jexPlugin/jex.mobile.joinform.js");
includeJs("com/jexPlugin/jex.mobile.list.js");

/* 공통 */
includeJs("com/comMobCommon.js");
includeJs("com/comMobView.js");
includeJs("com/comDate.js");
includeJs("com/comWebkey.js");
includeJs("com/comLoading.js");
includeJs("com/comMobDateUtil.js");
includeJs("com/comMobValidation.js");
includeJs("com/comUi.js");

/* pub 전용 JS(필요 시) – pub/로 시작하므로 그대로 /pub/js/... 에서 로드됨 */
includeJs("pub/js/com/comUi_temp_font_lg.js");

var _isBreak=false;
/* ============================================================================= */
