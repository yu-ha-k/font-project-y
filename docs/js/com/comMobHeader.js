/* 🔧 배포용(GitHub Pages) 경로 고정: docs 기준 절대경로 사용 */
var _HOST_NAME = "";
var _HOST_IMG_NAME = "";
var _pathName = window.location.pathname;

/* ───────────── repo base 추출: "/font-project-y/" ───────────── */
/* ===== 배포 전용 안전 로더 (docs/ + /font-project-y/ 루트 대응) ===== */
(function () {
  // GitHub Pages 루트 자동판정 (repo pages: /font-project-y/…)
  var ROOT =
    location.pathname.indexOf("/font-project-y/") === 0 ? "/font-project-y/" : "/";

  // JS: 기본은 docs/js/… , 인자로 pub/…가 오면 그대로 붙임
  window.includeJs = function (url) {
    var full = url.indexOf("pub/") === 0 ? ROOT + url : ROOT + "js/" + url;
    document.write("<script src=\"" + full + "\"></script>");
  };

  // CSS: 기본은 docs/pub/css/… , 인자로 pub/… 또는 css/…가 오면 보정
  window.includeCss = function (url) {
    var full;
    if (url.indexOf("pub/") === 0) {
      full = ROOT + url; // e.g. "pub/css/xxx.css"
    } else if (url.indexOf("css/") === 0) {
      full = ROOT + "pub/" + url; // "css/…" -> "pub/css/…"
    } else {
      full = ROOT + "pub/css/" + url; // 파일명만 들어온 경우
    }
    document.write("<link rel=\"stylesheet\" href=\"" + full + "\">");
  };

  // 확장자 보고 자동 라우팅 (안심용)
  window.includeAsset = function (url) {
    if (/\.js(\?|#|$)/i.test(url)) return window.includeJs(url);
    if (/\.css(\?|#|$)/i.test(url)) return window.includeCss(url);
    // 확장자 없으면 JS로 간주
    return window.includeJs(url);
  };
})();


/* ───────────── 경로 헬퍼 (배포 전용) ───────────── */
// 기본 JS는 docs/js/ 아래에서 로드
function includeJs(url) {
  var base_path = window.__REPO_BASE__ + "js/";           // "/font-project-y/js/"
  document.write("<script type='text/javascript' src='" + base_path + url + "'></script>");
}
// (필요시) pub 쪽 JS를 직접 지정해서 로드할 때 사용
function includeJsPub(url) {
  var base_path = window.__REPO_BASE__ + "pub/js/";       // "/font-project-y/pub/js/"
  document.write("<script type='text/javascript' src='" + base_path + url + "'></script>");
}
// CSS는 전부 docs/pub/css/ 아래에서 로드
function includeCss(url) {
  var base_path = window.__REPO_BASE__ + "pub/css/";      // "/font-project-y/pub/css/"
  document.write("<link rel='stylesheet' type='text/css' href='" + base_path + url + "'></link>");
}

/* ───────────── 기존 코드 유지 ───────────── */
document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge" />');
document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />');

includeJs("lib/jquery-3.5.1.min.js");
includeJs("lib/jquery-ui-1.13.3.js");
includeJs("lib/lottie-player.js");
includeJs("lib/swiper.min.js");

includeJs("lib/nativeBridge.js");
includeJs("lib/json2.js");
includeJs("lib/iscroll_old.js"); //사용여부 확인 필요 jex.mobile.dialog.js 241, 258 사용중

includeCss("swiper.min.css");
includeCss("normalize.css");
// includeCss("style.css");
includeCss("common.css");
includeCss("content.css");
includeCss("popup.css");

function isEmpty(val) {
  var result = false;
  if (undefined == val || null == val || "" == val) result = true;
  return result;
}
function isEmptyArray(val) {
  var result = false;
  if (isEmpty(val) || (JSON.stringify(val) == "[]")) result = true;
  return result;
}
function isNull(val) {
  if (val == null || val == undefined) return true;
  return false;
}
function _isIphone() {
  var iFlag = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
  if (iFlag && navigator.userAgent.indexOf("Android") > -1) iFlag = false;
  return iFlag;
}
function _isAndroid() { return (/android/i).test(navigator.userAgent); }
function _isMobile() {
  var Flag = false;
  if ((/(ipod|iphone|ipad)/i).test(navigator.userAgent)) { Flag = true; }
  if ((/android/i).test(navigator.userAgent)) { Flag = true; }
  return Flag;
}

var _isRealApp = false; //브라우저 / 앱 구분
var _userAgentObj = {};

if (navigator.userAgent.indexOf("nma-url=") != -1) {
  _isRealApp = true;
  var arrAgent = navigator.userAgent.split(";");
  var arrAgentKeyValue = [];
  for (var i = 0; i < arrAgent.length; i++) {
    arrAgentKeyValue = arrAgent[i].split("=");
    if (arrAgentKeyValue.length == 2) _userAgentObj[arrAgentKeyValue[0]] = arrAgentKeyValue[1];
  }
}

//console로그 사용 여부 (운영에서는 false로 해야함, 성능이슈 있음)
if (_isRealApp) {
  if (_userAgentObj["islog"] != undefined && _userAgentObj["islog"] == "false") {
    window.console = { log:function(){}, debug:function(){}, info:function(){}, warn:function(){}, error:function(){} }
  }
  _HOST_NAME = _userAgentObj["nma-url"];
  _HOST_IMG_NAME = _userAgentObj["nma-img"];
} else {
  if (location.protocol == "file:" || location.host.match('192.168.224.212')) {
    _HOST_NAME = "http://192.168.224.212:25101";
    _HOST_IMG_NAME = "http://192.168.224.75:80";
  } else {
    _HOST_NAME = location.protocol + "//" + location.host;
    _HOST_IMG_NAME = location.protocol + "//" + location.host;
  }
}

// demo사이트 일경우 서버시간 정보를 조회하는 jsp를 호출하지 않고, js로 처리
includeJs("com/comJavascript_forDemo.js");

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

includeJs("com/comMobCommon.js");
includeJs("com/comMobView.js");
includeJs("com/comDate.js");
includeJs("com/comWebkey.js");
includeJs("com/comLoading.js");
includeJs("com/comMobDateUtil.js");
includeJs("com/comMobValidation.js");
includeJs("com/comUi.js");

// (필요하면) pub 전용 JS 로드 예시
includeJs("pub/js/com/comUi_temp_font_lg.js");

var _isBreak = false;
