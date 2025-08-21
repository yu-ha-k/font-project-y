/**
 * Copyright (c) 2022 STCLab. All rights reserved.
 * Code licensed under the STCLab License
 * Version 2.3.15
 *
 * @author jaybi<jaybi@stclab.com>
 */

var NetFunnel = {};
NetFunnel.Skin = {};
//EditZoneStart ----------------------------------------------------------------
if (typeof window !== 'undefined') {
    NetFunnel.TS_HOST = 'netfunnel.ibk.co.kr'; // Default TS host
    NetFunnel.TS_PORT = 443; // Default TS port
    NetFunnel.TS_PROTO = 'https'; // Default TS protocol [http|https]
    NetFunnel.TS_QUERY = 'ts.wseq'; // Default request query
    NetFunnel.TS_SERVICE_ID = 'service_2'; // Default TS Service id
    NetFunnel.TS_ACTION_ID = 'ucnm_trans'; // Default TS Action id
    NetFunnel.TS_MAX_TTL = 30; // Default max ttl (second) 5~30
    NetFunnel.TS_CONN_TIMEOUT = 1; // Default connect timeout (second)
    NetFunnel.TS_CONN_RETRY = 2; // Default connect retry count
    NetFunnel.TS_COOKIE_ID = 'NetFunnel_ID'; // Default Cookie ID
    NetFunnel.TS_COOKIE_TIME = 10; // Default Cookie Time (minute)
    NetFunnel.TS_COOKIE_DOMAIN = ''; // Default Cookie Domain
    NetFunnel.TS_BYPASS = false; // NetFunnel Routine Bypass [true|false]
    NetFunnel.TS_POPUP_TOP = false; // Popup Top Position ( "false" is center )
    NetFunnel.TS_POPUP_LEFT = false; // Popup Left Position ( "false" is center )
    NetFunnel.TS_AUTO_COMPLETE = false; // Auto setComplete [true|false]
    NetFunnel.TS_DEBUG_MODE = false; // Debug Mode
    NetFunnel.TS_SHOWTIME_LIMIT = 300; // Show WaitTime Limit (second, 0 is Unlimited)
    NetFunnel.TS_SHOWCNT_LIMIT = 2000; // Show WaitUser Limit (0 is Unlimited)
    NetFunnel.TS_SHOWNEXT_LIMIT = 2000; // Show NextWaitUser Limit (0 is Unlimited)
    NetFunnel.TS_LIMIT_TEXT = '다수'; // SHOWCNT,SHOWNEXT Limit를 넘었을때 출력되는 문자열
    NetFunnel.TS_IFRAME_RESIZE = false; // true | false
    NetFunnel.TS_USE_UNFOCUS = true; // object unfocus after netfunnel call
    NetFunnel.TS_VIRT_WAIT = 10000; // virtual wait time (millisecond)
    NetFunnel.TS_USE_MOBILE_UI = true; // Mobile UI
    NetFunnel.TS_POPUP_TARGET = window; // Popup target window
    NetFunnel.TS_USE_FRAME_BLOCK = false; // Block FrameSet Page
    NetFunnel.TS_FRAME_BLOCK_LIST = []; // Frame Block Window List
    NetFunnel.TS_USE_PRE_WAIT = false; // Pre waiting popup use
    NetFunnel.TS_USER_DATA_KEYS = []; // Input UserData Key & Type(c=cookie,v=variable)
    // ex) [ {"key":<user_data_key>, "type":<c|v>}, ... ]
    NetFunnel.TS_CONFIG_USE = true; // 무조건 Config에 있는 IP 와 PORT로 사용
    NetFunnel.TS_POPUP_ZINDEX = 32000; // 대기 Popup창의 z-index 값.
    // 대기창이 뒤로 숨지 않도록 적당한 값을 넣어줘야 한다.
    NetFunnel.TS_IP_ERROR_RETRY = true; // Retry(Re-Issue) Where IP Validation Error
    NetFunnel.TS_SUCCESS_POPUP_VISIBILITY = false;
    NetFunnel.TS_TARGET_ELEMENT_ID = '';

    //일정 기간 동안 대기인원 변함 없을시 Bypass 처리
    NetFunnel.TS_NWAIT_BYPASS = false; // 사용 유무
    NetFunnel.TS_MAX_NWAIT_COUNT = 100; // 대기인원 반복 체크 기준값
    NetFunnel.TS_PREVENT_WAIT_TIME_INCREASE = true; // 예상 대기 시간 증가 방지 옵션 : true일 경우 예상 대기 시간이 증가하지 않음.

    //Server Block
    NetFunnel.TS_BLOCK_MSG = 'ONE뱅크 접속이 원할하지 않습니다. 잠시 후 이용해 주시기 바랍니다. 불편을 드려 죄송합니다.'; // Server Block시 팝업에 표시할 문구
    NetFunnel.TS_BLOCK_URL = ''; // Server Block시 등록된 url로 이동(미등록시 경고창 후 서비스 진입 불가)
    NetFunnel.TS_IPBLOCK_WAIT_COUNT = 20; // Server IP Block 가상대기창 반복 횟수
    NetFunnel.TS_IPBLOCK_WAIT_TIME = 10000; // Server IP Block 가상대기시간

    //대기창 미리보기
    NetFunnel.TS_SHOW_WAIT_POPUP = false; //대기창 보기

    //event skin 지정
    NetFunnel.TS_SKIN_ID = 'net_skin'; // Skin ID (미지정시 default 대기창)

    // Variable for MProtect
    NetFunnel.MP_USE = false; // 매크로방지기능 사용유무 (true|false)
    NetFunnel.MP_TIMELIMIT = 20000; // 사용자의 요청을 체크하기 위한 단위 시간 (ms)
    NetFunnel.MP_MAXREQLIMIT = NetFunnel.MP_TIMELIMIT / 1100; // TIMELIMIT 시간 내에 getTidChkEnter를 요청가능한 최대값
    NetFunnel.MP_DEVLIMIT = 20; // 요청주기의 표준편차 제한값 (ms)
    NetFunnel.MP_DEVCNTLIMIT = 7; // 표준편차 계산을 위한 item숫자
    NetFunnel.MP_REQONLYLIMIT = 10; // setComplete 없이 getTidChkEnter만 요청한 횟수 제한값(횟수)
    NetFunnel.MP_MINCOUNT = 5; // 계산을 하지 않는 자료개수

    /* eslint-disable indent */
    /* eslint-disable max-len */
    /* eslint-disable no-unused-vars */
    // Logo Image Data -------------------------------------------------------------
    //   - height:16 pixel
    //   - GIF Format Data (Base64 Encoding)
    NetFunnel.gLogoData = 'R0lGODlhJgAQAOe/AB5vlR5ykh9zkyNymCF0lC1xkiN1lSR2liZ3lyd4mDN1lyh5mSp6mjN4lCt7my18nDh5myt+mC59nTd7ly9+njF/nzp+mjKAoDt/mzOBoT+CnkCDn0KFoUOGokSHo0iLpk+SrlSWsl2ZsF6asWeYsWCbsmGcs2OetWSftla4Q1e5RFi6RVm7Rl+6TWK6RnaowXuou3WqvHipwmG8TmS9SGK9T2W+SWq8T2O+UH6rvmS/UX+sv2y+UWXAUoCtwIKuwYOvw4SwxIWxxW/DXYayxnfCXYezx3XDZXbEZom1yY21w4q2you4y3rIaXvJao67zoLKcpq6yonJcpe/zZu/1IrNfY3Nd6C/z5zA1ZrC0KHA0I7QgJ/D2KPD04/SgZbQgZDTgqPH0KbG1pbUiqvH0azM3LDM16PZkaLamLPP2q7Zn7bS3KncobfT3bHcorrW4LnfrbPirrrgrsTY5Lvhr7jkqsba5rzjsLrkt73kscjc6Mvc4rzluMzd49Dg59Hh6MfpvtLi6dPk6s3qxtfk5dTl687rx9Xm7Nbn7dPrz9Ts0Nfo79Xt0dnp8N3q69fv097r7OHq8uXq7d/s7eDt7uDw1ePs9Obs7uTt9eft79/y3uLw8Onu8ODz3+vw8+H14Ozx9O3y9er14u306e7z9uj26u/26+/19+n46/D37PD2+PL3+fL57vP4+/T67/T5/Pf59vX6/fj69/L89/X88Pn7+Pr8+ff9//v9+v78///9+//9//n///z/+/7//P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAmABAAAAj+AH2hSuXLl61SsHzp8pVLIcOHBSNKnDgxFY8VnXwlckHH1y2PBiuJakixZElUOlrocGWoBRxfuBS58vWpxRZbJnNKRKXSpqIWdB6x0JFCUZMWKhjpXMrTypkUTlzgWXHkjgsko3R4wbk0J08ovoq0aMEmxZAvW6rM0jGmq05TOqT4MpWiBR8oLfL0UOPqxphbC91SnFUHUMFHcTTJcgMGjShccgYtDUyxYSguWq5EWdXFjq9WWNp4mlJG4ZwrqvRcQVRQTBZfUbRkyULqDZWEug5RcLAAACUIQHxBIkAiUIIFYXz9cHApyQQJBT1Q8CVAwgIGiGAgIJXrlu4RBgXsUQjiKxKBEn8WOMCgCgiDS0okMBDhSzp1AxFjbGd4SH4BDpFQENwkBIzwBwIgSLCBD+8lIcEHC6TxwXQBSCCAAZ68gMApBenmQRBPIEIBDL40ct6BP5AhQQUMSLKEBH5wsGIFvgzQgBFCvCLDhgyJWEJBjkigQRonJADDHwns4EsIDDBASRIR9AGKBBNMJ4ACa5jRSgwM/EAEJIhcYEJEKEhgpgaq9OHADwVxQAEmTFDQhy9lLJCBLwdYQIEFjeRAwZ973LIJKBI5QkghqtwSSyYc+kIKJ7eowkktH2XCiS+WcKKpLadomkksAQEAOw==';
    NetFunnel.gLogoText = '';
    NetFunnel.gLogoURL = 'http://www.netfunnel.co.kr/net/html/netfunnel_info.html';

    NetFunnel.gPreWaitData = 'R0lGODlhKAAoALMMAPj4+MTExPT09NTU1NPT08XFxcbGxsLCwtXV1cPDw/X19b+/v////wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSAABcv0qQRLvwQCyc73C5YGxB5BgkwuS4nk4iCJJqlQKdZKxJII0ifYaRLwfECJmZg2AQaFwqA2ecfnrry+dJvR80NoRi5NRE8uXD5eLYk9iyxjhnprgnt2cn97mpucnZ6foKGio3oRACH5BAkFAAwALAAAAAAoACgAAASAkMlJq7046827/2AojmRpnmiqrmwLAohhIAAFy/SpBEu/BALJzvcLlgbEHkGCTC5LieTiIIkmqVAp1krEkgjSJ9hpEvB8QImZmDYBBoXCoDZ5x+euvP4Vm9HzQ2hGLk1ETy5cPl4tiT2LLGOGemuCe3Zyf3uam5ydnp+goaKjnREAIfkECQUADAAsAAAAACgAKAAABICQyUmrvTjrzbv/YCiOZGmeaKqubAsCiGEgAAXL9KkES78EAsnO9wuWBsQeQYJMLkuJ5OIgiSapUCnWSsSSCNIn2GkS8HxAiZmYNgEGhcKgNnnH5668fnOb0fNDaEYuTURPLlw+Xi2JPYssY4Z6a4J7dnJ/e5qbnJ2en6ChoqOiEQAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkQJTEY7CXK7ngQn1JoAg0JhUJMEj1GX8dhUL9uk6azMeKJN3KyPce3uSWdCaWBiZCdrQnAsiDuKK3aCP316PwyEY3SVmpucnZ6foKGio6IRACH5BAkFAAwALAAAAAAoACgAAAR9kMlJq7046827/2AojmRpnmiqrmwLAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRtBGWRJsgt+v9GIBBoTCoXb/gDUxGo4xn3hJOaGWsq75S8BidC6Mk47GpFzbzS3yBJk90EoV3JlNscYtwJ1lbXWZaXGlhmJmam5ydnp+goBEAIfkECQUADAAsAAAAACgAKAAABH2QyUmrvTjrzbv/YCiOZGmeaKqubFsCiGEggDspwaIvgWAzg92O8EsIdYficZG0EZZEmyC36/0YgEGhMKhdv2ALTEajjGfeEk5oZayrvlLwGJ0LoyTjsakXNvNLfIEmT3QShXcmU2xxi3AnWVtdZlpcaWGYmZqbnJ2en6CgEQAh+QQJBQAMACwAAAAAKAAoAAAEfZDJSau9OOvNu/9gKI5kaZ5oqq5sqwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkSbILfr/RiAQaEwqF2/YGxs5pXAZLQTTmhlrKu+UvAYnQujJOOxqRc280t8gSZPdBKFdyZTbHGLcCdZW10UkVxlYZiZmpucnZ6foKARACH5BAUFAAwALAAAAAAoACgAAASBkMlJq7046827/2AojmRpnmiqrmyrAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRNMFktAlhSSzhhD2JILfLloLHKgMwKBQGNZPx2HSthe3WNDx5ztKlLdbHuHb5JWRmaBNgQmItbztxLIpIP3OHP3p/P2NlZ3iWm5ydnp+goaKjpD8RADs=';

    NetFunnel.gTextDecoration = false;
    NetFunnel.gFixelData = 'R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
}
//EditZoneEnd ------------------------------------------------------------------

if (typeof window !== 'undefined') {
    (function (top) {
        /*
         * Request Type.
         */
        NetFunnel.RTYPE_NONE = 0; /**< 0:Type 없음				*/
        NetFunnel.RTYPE_GET_TID = 5001; /**< 5101:ID요청		*/
        NetFunnel.RTYPE_CHK_ENTER = 5002; /**< 5002:진입요청				*/
        NetFunnel.RTYPE_ALIVE_NOTICE = 5003; /**< 5003:Alive Notice 			*/
        NetFunnel.RTYPE_SET_COMPLETE = 5004; /**< 5004:완료 요청				*/
        NetFunnel.RTYPE_GET_TID_CHK_ENTER = 5101; /**< 5101:ID요청 + 진입요청		*/
        NetFunnel.RTYPE_INIT = 5105; /**< 5106:초기화 요청 			*/
        NetFunnel.RTYPE_STOP = 5106; /**< 5107:정지 요청				*/

        /**
         * Return Codes constants
         */
        NetFunnel.kSuccess = 200; /* < 200: 정상처리					*/
        NetFunnel.kContinue = 201; /* < 201: 대기(잠시후 다시시도)		*/
        NetFunnel.kContinueDebug = 202; /* < 202: debug대기(debug 대기 mode )*/

        NetFunnel.kTsBypass = 300; /* < 300: ServerSide Bypass		*/
        NetFunnel.kTsBlock = 301; /* < 301: ServerSide Block		*/
        NetFunnel.kTsIpBlock = 302; /* < 302: ServerSide Ip Block	*/
        NetFunnel.kTsExpressNumber = 303; /* < 303: ServerSide Express Number	*/

        NetFunnel.kTsErrorNoUservice = 500; /* < 500: Uservice 없음			*/
        NetFunnel.kTsErrorNoAction = 501; /* < 501: Action 없음				*/
        NetFunnel.kTsErrorAComplete = 502; /* < 502: 이미 종료된 key			*/
        NetFunnel.kTsErrorWrongServer = 503; /* < 503: 다른 서버에서 발급된키	*/
        NetFunnel.kTsErrorTooRecreate = 504; /* < 504: 너무 많은 재발급 횟수	*/
        NetFunnel.kTsErrorNoKey = 505; /* < 505: Key가 존재하지 않는다.	*/
        NetFunnel.kTsErrorInvalidID = 506; /* < 506: 잘못된 ID입력			*/
        NetFunnel.kTsErrorInvalidKey = 507; /* < 507: 잘못된 Key입력			*/
        NetFunnel.kTsErrorInvalidIdStr = 508; /* < 508: 잘못된 ID 문자열			*/
        NetFunnel.kTsErrorDuplicate = 509; /* < 509: id가 이미존재한다.		*/
        NetFunnel.kTsErrorDelAction = 510; /* < 510: Action삭제중 에러발생	*/
        NetFunnel.kTsErrorUserviceExist = 511; /* < 511: Uservice가 이미 존재함	*/
        NetFunnel.kTsErrorActionExist = 512; /* < 512: Action이 이미 존재함		*/
        NetFunnel.kTsErrorLicenseOver = 513; /* < 513: 라이센스수를 넘는요청		*/
        NetFunnel.kTsErrorSize = 514; /* < 514: Limit Size Over		*/
        NetFunnel.kTsErrorNoUserAction = 515; /* < 515: NoUserAction		*/
        NetFunnel.kTsErrorTooBigKey = 516; /* < 516: Current값보다 큰 Key값	*/
        NetFunnel.kTsErrorInvalidIp = 517; /* < 517: 잘못된 IP로부터의 요청	*/

        NetFunnel.kErrorAuth = 900; /* < 900 :인증처리 오류(실폐)		*/
        NetFunnel.kErrorNotFound = 901; /* < 901 :찾기못함					*/
        NetFunnel.kErrorNoinit = 902; /* < 502: 초기화 되지 않음			*/
        NetFunnel.kErrorCode = 903; /* < 903 :코드에러					*/
        NetFunnel.kErrorParam = 904; /* < 904: 잘못된 Parameter		*/
        NetFunnel.kErrorData = 905; /* < 905 :데이타오류				*/
        NetFunnel.kErrorUnknownType = 906; /* < 906: 알수없는 Type			*/
        NetFunnel.kErrorAlready = 907; /* < 907 :이미진행상태				*/
        NetFunnel.kErrorService = 908; /* < 908 :서비스 불가				*/
        NetFunnel.kErrorExecution = 909; /* < 909 :실행 실폐				*/

        NetFunnel.kErrorSock = 920; /* < 920 :시스템소켓에러			*/
        NetFunnel.kErrorSockSend = 921; /* < 921 :시스템소켓 전송에러		*/
        NetFunnel.kErrorSockRecv = 922; /* < 922 :시스템소켓 수신에러		*/
        NetFunnel.kErrorNotFoundLocalIP = 925; /* < 923 :로칼ip취득에러			*/
        NetFunnel.kErrorSockConnect = 926; /* < 924 :접속에러					*/
        NetFunnel.kErrorNoConnect = 927; /* < 925 :미접속상태				*/
        NetFunnel.kErrorSockData = 928; /* < 926 :올바른 데이타가 아님		*/

        NetFunnel.kErrorIO = 991; /* < 991: i/o 에러				*/
        NetFunnel.kErrorArunning = 992; /* < 992: 이미 실행중				*/
        NetFunnel.kErrorPermission = 993; /* < 993: 권한이 없음.				*/
        NetFunnel.kErrorExpiredTime = 994; /* < 994 :만료날짜					*/
        NetFunnel.kErrorOverCounter = 995; /* < 995 :수제한 초과				*/
        NetFunnel.kErrorSecurity = 996; /* < 996: 보안 에러				*/
        NetFunnel.kErrorSystemStopping = 997; /* < 997 :시스템 중지중임			*/
        NetFunnel.kErrorNotSupport = 998; /* < 998 :지원하지 않는 기능		*/
        NetFunnel.kErrorSystem = 999; /* < 999 :시스템에러				*/

        /**
         * Process Status Constants
         */
        NetFunnel.PS_N_RUNNING = 0; /* < 0:실행중이지 않은 상태		*/
        NetFunnel.PS_RUNNING = 1; /* < 1:실행중 상태				*/
        NetFunnel.PS_CONTINUE = 2; /* < 2:계속 실행중 상태			*/
        NetFunnel.PS_TIMEOUT = 3; /* < 3:접속 제한시간 초과 		*/
        NetFunnel.PS_ERROR = 99; /* < 99:에러 상태				*/

        /**
         * Etc
         */
        NetFunnel.CONN_TIMEOUT_KEY = 'connection_timeout';

        /**
         * Easy interface를 위한 Global 객체
         */
        NetFunnel.gControl = null;
        NetFunnel.gShowtimeLimit = false;
        NetFunnel.gShowcntLimit = false;
        NetFunnel.gShownextLimit = false;
        NetFunnel.gSkinId = '';
        NetFunnel.gPopupTop = false;
        NetFunnel.gPopupLeft = false;
        NetFunnel.gTotWait = -1;
        NetFunnel.gPrevWaitTime = -1;
        NetFunnel.gLastSkinID = 'default';
        NetFunnel.gUseMobileUI = false;
        NetFunnel.gUseUnfocus = false;
        NetFunnel.gAlreadyProc = 0;
        NetFunnel.gWaitPop = null;
        NetFunnel.gIPBlockWaitCount = 0;
        NetFunnel.gNWaitCount = 0;
        NetFunnel.gNWaitTemp = 0;
        NetFunnel.gReTimer = null;
        NetFunnel.gDebugflag = false;

        /*
         * Using a browser that does not support bind functions.
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
         */
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis ?
                            this :
                            oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        /**
         * NetFunnel Utilities
         *  Static functions
         */
        NetFunnel.Util = {
            /**
             * Event 에 의해 전달된 Data를 Debug 메세지 형태의 문자열로 만들어준다.
             *
             * @memberOf NetFunnel.Util
             * @param {String} callback Callback Event 이름
             * @param {Number} rtype Request Type
             * @param {Number} code Return Code
             * @param {Object} data Return Data
             * @param {Boolean} isHtml HTML 형태 여부
             * @return {String} 입력값에 의해 작성된 문자열
             */
            makeDebugMsg: function (callback, rtype, code, data, isHtml) {
                var nl = "\n";
                var space = "       ";
                if (isHtml == true) {
                    nl = "<br>";
                    space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                }

                var rtypeS = "Unknown";
                var codeS = "Unkonwn Error";

                switch (rtype) {
                    case NetFunnel.RTYPE_GET_TID:
                        rtypeS = "getTicketID";
                        break;
                    case NetFunnel.RTYPE_CHK_ENTER:
                        rtypeS = "chkEnter";
                        break;
                    case NetFunnel.RTYPE_ALIVE_NOTICE:
                        rtypeS = "aliveNotice";
                        break;
                    case NetFunnel.RTYPE_SET_COMPLETE:
                        rtypeS = "setComplete";
                        break;
                    case NetFunnel.RTYPE_GET_TID_CHK_ENTER:
                        rtypeS = "getTID+ChkEnter";
                        break;
                    case NetFunnel.RTYPE_INIT:
                        rtypeS = "Init";
                        break;
                    case NetFunnel.RTYPE_STOP:
                        rtypeS = "stop";
                        break;
                    default:
                        rtypeS = "Unknown";
                        break;
                }

                switch (code) {
                    case NetFunnel.kSuccess:
                        codeS = "Normal";
                        break;
                    case NetFunnel.kContinue:
                        codeS = "Continue";
                        break;
                    case NetFunnel.kContinueDebug:
                        codeS = "Debug Continue mode";
                        break;
                    case NetFunnel.kTsBypass:
                        codeS = "ServerSide Bypass";
                        break;
                    case NetFunnel.kTsBlock:
                        codeS = "ServerSide Block";
                        break;
                    case NetFunnel.kTsIpBlock:
                        codeS = "ServerSide Ip Block";
                        break;

                    case NetFunnel.kErrorSystem:
                        codeS = "System Error";
                        break;
                    case NetFunnel.kErrorSecurity:
                        codeS = "Security Error";
                        break;
                    case NetFunnel.kErrorIO:
                        codeS = "I/O Error";
                        break;
                    case NetFunnel.kErrorSockConnect:
                        codeS = "Connection Timeout";
                        break;
                    case NetFunnel.kErrorAlready:
                        codeS = "Already Running";
                        break;
                    case NetFunnel.kErrorNoinit:
                        codeS = "Init Error";
                        break;
                    case NetFunnel.E_INSERT:
                        codeS = "Insert Error";
                        break;
                    case NetFunnel.kErrorPermission:
                        codeS = "No Permission";
                        break;
                    case NetFunnel.kErrorExpiredTime:
                        codeS = "Key Expire";
                        break;
                    case NetFunnel.kErrorParam:
                        codeS = "Parameter Error";
                        break;
                    case NetFunnel.E_NOT_STARTED:
                        codeS = "No service time";
                        break;
                    case NetFunnel.kTsErrorNoUserAction:
                        codeS = "No action Error";
                        break;
                    default:
                        codeS = "Unknown Error";
                        break;
                }

                var tStr = callback + " " + nl + nl + "  - type : " + rtypeS + " (" + rtype + ")" + nl + " - Code : " + codeS + " (" + code + ")" + nl + " - Params" + nl;
                for (var i in data) {
                    tStr += space + i + " ---> " + data[i] + nl;
                }
                return tStr;
            },

            /**
             * Event 에 의해 전달된 Data를 다음 url 로 전달
             *
             * @memberOf NetFunnel.Util
             * @param {String} url 이동할 URL
             * @param {Object} data Return Data
             * @return {null}
             */
            goNextPage: function (url, data) {
                var tUrl = url;
                for (var i in data) {
                    tUrl += "&" + i + "=" + data[i];
                }
                document.location.href = tUrl;
            },

            /**
             * 디버그 메세지를 출력한다. ( flash 에 의해 호출 된다. )
             *
             * @memberOf NetFunnel.Util
             * @param {String} msg 출력될 문자열
             */
            alertDebugMsg: function (msg) {
                alert(msg);
            },

            decodeBase64: function (input) {
                var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9+/=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output += String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output += String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output += String.fromCharCode(chr3);
                    }
                } while (i < input.length);
                return output;
            },
            isSmartPhone: function () {
                var mobileKeyWords = ['iPhone', 'iPod', 'iPad', 'BlakBerry', 'Android', 'WindowsCE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'Nokia', 'Webos', 'Opera mini', 'Opera mobi', 'Iemobile'];
                try {
                    for (var i = 0; i < mobileKeyWords.length; i++) {
                        if (navigator.userAgent.match(mobileKeyWords[i]) !== null) {
                            return true;
                        }
                    }
                } catch (e) {
                    window.console && window.console.log('is smartphone failed. ', e);
                    // continue regardless of error
                }
                return false;
            },
            calcStdDev: function (inArr, s) {
                if (typeof inArr != "object") {
                    return false;
                }
                if (inArr.length < 2) {
                    return false;
                }
                if (s > 1 || s < 0) {
                    s = 0;
                }

                // Calc Mean Value
                var sum = 0,
                    i = 0;
                for (i = 0; i < inArr.length; i++) {
                    sum += parseInt(inArr[i], 10);
                }
                var mean = sum / inArr.length;

                // Calc stdDiv
                var temp = 0;
                for (i = 0; i < inArr.length; i++) {
                    temp += ((parseInt(inArr[i], 10) - mean) * (parseInt(inArr[i], 10) - mean));
                }
                var stdDiv = Math.sqrt(temp / (inArr.length - s));
                return stdDiv;
            },
            delFocus: function (win) {
                try {
                    var doc = document;
                    if (typeof win == "object" && typeof win.document == "object") {
                        doc = win.document;
                    }
                    var body = doc.getElementsByTagName("body")[0];
                    var ifrm = doc.createElement("div");
                    ifrm.style.position = "absolute";
                    ifrm.style.width = "0px";
                    ifrm.style.height = "0px";
                    ifrm.style.border = "0px";
                    ifrm.style.top = NetFunnel.PopupUtil.getScrollTop(doc);
                    ifrm.style.left = NetFunnel.PopupUtil.getScrollLeft(doc);
                    body.appendChild(ifrm);
                    ifrm.focus();

                    var pNode = ifrm.parentNode;
                    if (pNode && typeof pNode == "object") {
                        pNode.removeChild(ifrm);
                    }
                } catch (e) {
                    window.console && window.console.log('delete focus failed.', e);
                    // continue regardless of error
                }
            },
            isVirtualWait: function (obj) {
                if (typeof obj != "object") {
                    return false;
                }
                if (typeof obj.mprotect == "number" && obj.mprotect > 0) {
                    return true;
                }
                return false;
            },
            getTimeStr: function (inTime, format, delimiter, force, style) {
                var tTime = parseInt(inTime, 10);
                if (typeof format == "undefined") {
                    format = "%H시간 %M분 %S초";
                }
                if (typeof delimiter == "undefined") {
                    delimiter = " ";
                }
                if (typeof force == "undefined") {
                    force = false;
                }

                var tMin = 0;
                var tHour = 0;
                var tSec = 0;
                var j = 0;

                // Match 항목조사
                var matchStr = false;
                var item = false;
                var h = false;
                var m = false;
                var s = false;
                var matchStrs = format.match(/%[-]*[0-9]*[H|M|S]/g);
                for (j = 0; j < matchStrs.length; j++) {
                    matchStr = matchStrs[j];
                    item = matchStr.charAt(matchStr.length - 1);
                    if (item == "H") h = true;
                    if (item == "M") m = true;
                    if (item == "S") s = true;
                }

                // 시간 계산
                if (h == true) {
                    tHour = Math.floor(tTime / 3600);
                }

                if (m == true) {
                    if (h == true) {
                        tMin = Math.floor((tTime % 3600) / 60);
                    } else {
                        tMin = Math.floor(tTime / 60);
                    }
                }

                if (s == true) {
                    if (h == false && m == false) {
                        tSec = tTime;
                    } else if (m == true) {
                        tSec = tTime % 60;
                    } else if (h == true && m == false) {
                        tSec = Math.floor(tTime % 3600);
                    }
                }

                // Format 치환
                var result = "";
                var formatArr = format.split(delimiter);

                for (var i = 0; i < formatArr.length; i++) {
                    var tStr = formatArr[i];
                    matchStrs = tStr.match(/%[-]*[0-9]*[H|M|S]/g);
                    var printMatch = true;
                    var rStr = '';

                    for (j = 0; matchStrs && j < matchStrs.length; j++) {
                        matchStr = matchStrs[j];

                        var repStr = "";
                        var pad = false;
                        var repadStr = "&nbsp;";
                        var padMinus = false;
                        var ppadSize = 0;
                        item = matchStr.charAt(matchStr.length - 1);

                        if (matchStr.length > 2) {
                            var cnt = "";
                            var start = true;
                            for (var k = 1; k < matchStr.length - 1; k++) {
                                var ss = matchStr[k];

                                if (ss == "-") {
                                    padMinus = true;
                                } else if (ss == "0" && start == true) {
                                    repadStr = "0";
                                    start = false;
                                    pad = true;
                                } else {
                                    cnt += ss;
                                    pad = true;
                                }
                            }
                            ppadSize = parseInt(cnt, 10);
                        }

                        var numberStr = "";
                        if (item == "H") {
                            if (tHour == 0) printMatch = false;
                            numberStr = "" + tHour;
                        } else if (item == "M") {
                            if (tMin == 0) printMatch = false;
                            numberStr = "" + tMin;
                        } else if (item == "S") {
                            numberStr = "" + tSec;
                        }

                        if (pad) {
                            if (padMinus) {
                                repStr = numberStr;
                            }

                            var padDiff = ppadSize - numberStr.length;

                            for (var l = 0; l < padDiff; l++) {
                                repStr += repadStr;
                            }

                            if (!padMinus) {
                                repStr += numberStr;
                            }
                        } else {
                            repStr = numberStr;
                        }
                        if (style) {
                            rStr += repStr + '<span style="' + style + '">' + tStr.substr(matchStr.length, tStr.length - 1) + '</span>';
                        } else {
                            rStr += tStr.replace(matchStr, repStr);
                        }
                        if (j < 2) {
                            rStr += ' ';
                        }
                    }

                    if (force == true || printMatch == true) {
                        if (result.length > 0) {
                            result = result + delimiter + rStr;
                        } else {
                            result = rStr;
                        }
                    }
                }
                return result;
            },
            getFrameWindowList: function (popupTarget) {
                var list = [];

                for (var i = 0; i < top.frames.length; i++) {
                    var tframe = top.frames[i];
                    if (tframe === popupTarget) {
                        continue;
                    }
                    list.push({
                        win: tframe,
                        popup: null
                    });
                }
                return list;
            }
        };

        /**
         * Detect Browser
         */
        NetFunnel.BrowserDetect = {
            init: function () {
                this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                this.version = this.searchVersion(navigator.userAgent) ||
                    this.searchVersion(navigator.appVersion) ||
                    "an unknown version";
                this.OS = this.searchString(this.dataOS) || "an unknown OS";

            },
            searchString: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var dataString = data[i].string;
                    var dataProp = data[i].prop;
                    this.versionSearchString = data[i].versionSearch || data[i].identity;
                    if (dataString) {
                        if (dataString.indexOf(data[i].subString) != -1)
                            return data[i].identity;
                    } else if (dataProp)
                        return data[i].identity;
                }
                return "";
            },
            searchVersion: function (dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index == -1) return 0;
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            },
            dataBrowser: [{
                    string: navigator.userAgent,
                    subString: "Chrome",
                    identity: "Chrome"
                },
                {
                    string: navigator.userAgent,
                    subString: "OmniWeb",
                    versionSearch: "OmniWeb/",
                    identity: "OmniWeb"
                },
                {
                    string: navigator.vendor,
                    subString: "Apple",
                    identity: "Safari"
                },
                {
                    prop: window.opera,
                    identity: "Opera"
                },
                {
                    string: navigator.vendor,
                    subString: "iCab",
                    identity: "iCab"
                },
                {
                    string: navigator.vendor,
                    subString: "KDE",
                    identity: "Konqueror"
                },
                {
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "Firefox"
                },
                {
                    string: navigator.vendor,
                    subString: "Camino",
                    identity: "Camino"
                },
                // for newer Netscapes (6+)
                {
                    string: navigator.userAgent,
                    subString: "Netscape",
                    identity: "Netscape"
                },
                {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "Explorer",
                    versionSearch: "MSIE"
                },
                {
                    string: navigator.userAgent,
                    subString: "Gecko",
                    identity: "Mozilla",
                    versionSearch: "rv"
                },
                // for older Netscapes (4-)
                {
                    string: navigator.userAgent,
                    subString: "Mozilla",
                    identity: "Netscape",
                    versionSearch: "Mozilla"
                }
            ],
            dataOS: [{
                    string: navigator.platform,
                    subString: "Win",
                    identity: "Windows"
                },
                {
                    string: navigator.platform,
                    subString: "Mac",
                    identity: "Mac"
                },
                {
                    string: navigator.platform,
                    subString: "Linux",
                    identity: "Linux"
                }
            ]
        };
        NetFunnel.BrowserDetect.init();

        /**
         * IE5 는 Array 에 pop/push 함수가 없다.
         */
        if (NetFunnel.BrowserDetect.browser == "Explorer") {
            if (typeof Array.push != "function") {
                Array.prototype.push = function () {
                    var n = this.length >>> 0;
                    for (var i = 0; i < arguments.length; i++) {
                        this[n] = arguments[i];
                        n = n + 1 >>> 0;
                    }
                    this.length = n;
                    return n;
                };
            }

            if (typeof Array.pop != "function") {
                Array.prototype.pop = function () {
                    var n = this.length >>> 0,
                        value;
                    if (n) {
                        value = this[--n];
                        delete this[n];
                    }
                    this.length = n;
                    return value;
                };
            }
        }

        /**
         * Debug Mode Function
         *  - mode
         *     : send,recv
         */
        NetFunnel.getCommandStr = function (mode, msg) {
            var cmd = "";
            var code = 0;
            if (mode == "recv") {
                code = parseInt(msg.substring(0, 4), 10);
            } else {
                var myre = /opcode=([0-9]+)&/;
                var rr = myre.exec(msg);
                if (rr.length > 1) {
                    code = parseInt(rr[1], 10);
                }
            }

            switch (code) {
                case 5101:
                    cmd = "getTidchkEnter";
                    break;
                case 5002:
                    cmd = "chkEnter      ";
                    break;
                case 5003:
                    cmd = "aliveNotice   ";
                    break;
                case 5004:
                    cmd = "setComplete   ";
                    break;
                default:
                    cmd = "Unknown       ";
            }
            return cmd;
        };

        NetFunnel.writeDebugMsg = function (win, mode, msg) {
            var d = new Date();
            var hour = parseInt(d.getHours(), 10);
            var min = parseInt(d.getMinutes(), 10);
            var sec = parseInt(d.getSeconds(), 10);
            var msec = parseInt(d.getMilliseconds(), 10);

            var tstr = "";
            if (hour < 10) {
                tstr += "0";
            }
            tstr += hour + ":";
            if (min < 10) {
                min += "0";
            }
            tstr += min + ":";
            if (sec < 10) {
                sec += "0";
            }
            tstr += sec;
            tstr += "." + msec;

            var ptop = "";
            var bgc = "";
            var arrow = "";
            if (mode == "recv") {
                ptop = "padding-left:1px;";
                bgc = "#9E9E9E;";
                arrow = tstr + " | Recv | <b>" + NetFunnel.getCommandStr(mode, msg) + "</b> | ";
            } else {
                ptop = "margin-top:5px;";
                bgc = "#EEEEEE;";
                arrow = tstr + " | Send | <b>" + NetFunnel.getCommandStr(mode, msg) + "</b> | ";
            }
            var str = "<div onload='this.focus()' style='width:650;overflow:hidden;padding:1px;border:1px solid #eeeeee;margin:0px;font-size:10px;font-family:monospace;background-color:" + bgc + ptop + "'>" + arrow + msg.substring(0, 50) + "</div>";
            if (win && win.document && win.document.body) {
                var bodyStr = win.document.body.innerHTML;
                win.document.body.innerHTML = bodyStr + str;
            }
        };

        NetFunnel.printDebugMsg = function (mode, url) {
            NetFunnel.debugWindow = window.open("", "NetFunnel_debugWindow", "status=1,width=700,height=300,resizable=1,scrollbars=1");
            if (typeof NetFunnel.debugWindow == 'object') {
                NetFunnel.writeDebugMsg(NetFunnel.debugWindow, mode, url);
            }
        };

        NetFunnel.Storage = function (inType) {
            this.html5Support = this.supportsHtml5Storage();

            if (typeof inType == "number") {
                this.type = inType;
            }
        };

        NetFunnel.Storage.prototype.supportsHtml5Storage = function () {
            try {
                return 'localStorage' in window && window.localStorage !== null;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.Storage.prototype.html5Support = false;
        NetFunnel.Storage.prototype.length = 0;
        NetFunnel.Storage.prototype.type = 1; // 1:local(Default) | 2:session

        NetFunnel.Storage.prototype.setStorageType = function (inType) {
            if (inType < 1 || inType > 2) {
                this.type = 1;
            } else {
                this.type = inType;
            }
        };

        NetFunnel.Storage.prototype.getStorage = function () {
            if (this.type == 1) {
                return localStorage;
            } else if (this.type == 2) {
                return sessionStorage;
            }
            return localStorage;
        };

        NetFunnel.Storage.prototype.setItem = function (key, value, minutes, domain, isPopup) {
            try {
                if (this.html5Support) {
                    !isPopup && this.getStorage().setItem(key, value);
                    NetFunnel.Cookie.set(key, value, minutes, domain);
                } else {
                    NetFunnel.Cookie.set(key, value, minutes, domain);
                }
                return true;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.Storage.prototype.setItemStorageOnly = function (key, value, minutes, domain) {
            try {
                if (this.html5Support) {
                    this.getStorage().setItem(key, value);
                } else {
                    NetFunnel.Cookie.set(key, value, minutes, domain);
                }
                return true;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.Storage.prototype.getItem = function (key, storageOnly) {
            var retval = false;
            try {
                if (this.html5Support) {
                    if (this.getStorage() && this.getStorage().getItem(key)) {
                        retval = this.getStorage().getItem(key).replace(/(?:\r\n|\r|\n)/g, '');
                    }
                    if (!retval && (storageOnly == undefined || storageOnly == false)) {
                        retval = NetFunnel.Cookie.get(key);
                    }
                } else {
                    retval = NetFunnel.Cookie.get(key);
                }
                return retval;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.Storage.prototype.removeItem = function (key, storageOnly) {
            try {
                if (this.html5Support) {
                    this.getStorage().removeItem(key);
                    if (!storageOnly) {
                        NetFunnel.Cookie.del(key);
                    }
                } else {
                    NetFunnel.Cookie.del(key);
                }
                return true;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.Storage.prototype.clear = function () {
            try {
                if (this.html5Support) {
                    this.getStorage().clear();
                }
                return true;
            } catch (e) {
                return false;
            }
        };

        NetFunnel.MProtect = function () {
            try {
                var Storage = new NetFunnel.Storage();

                // Get Current Time
                var dt = new Date();
                var ct = dt.getTime();

                // Get Stored Data
                var data = Storage.getItem("NFMPT.data", true);
                if (data === null) data = "";

                var stdData = Storage.getItem("NFMPT.stdData", true);
                if (stdData === null) stdData = "";
                //debug_print(stdData);

                var lastTime = parseInt(Storage.getItem("NFMPT.lastTime", true), 10);
                if (isNaN(lastTime) || lastTime === null || lastTime == "") lastTime = 0;

                var reqCnt = parseInt(Storage.getItem("NFMPT.reqCnt", true), 10);
                if (isNaN(reqCnt) || reqCnt === null || reqCnt == "") reqCnt = 0;

                // Insert New Data
                var arrData = [];
                var arrStdData = [];
                if (data != "") {
                    arrData = data.split(',');
                }
                if (stdData != "") {
                    arrStdData = stdData.split(',');
                }
                if (lastTime != 0) {
                    arrData[arrData.length] = ct - lastTime;
                    arrStdData[arrStdData.length] = ct - lastTime;
                }
                lastTime = ct;

                // Remove Old Data
                var i = arrData.length - 1;
                var tsum = 0;
                for (; i >= 0; i--) {
                    tsum += parseInt(arrData[i], 10);
                    if (tsum > NetFunnel.MP_TIMELIMIT) {
                        break;
                    }
                }

                var j = arrStdData.length - NetFunnel.MP_DEVCNTLIMIT;
                if (j < 0) {
                    j = 0;
                }

                var tArrStdData = arrStdData.slice(j);
                var tArrData = arrData.slice(i + 1);
                Storage.setItemStorageOnly("NFMPT.data", tArrData.join(","));
                Storage.setItemStorageOnly("NFMPT.stdData", tArrStdData.join(","));
                Storage.setItemStorageOnly("NFMPT.lastTime", lastTime + "");
                Storage.setItemStorageOnly("NFMPT.reqCnt", (++reqCnt) + "");

                var stdDev = NetFunnel.Util.calcStdDev(tArrStdData, 0);

                // check standard deviation limit
                if (stdDev != false && stdDev < NetFunnel.MP_DEVLIMIT) {
                    return 2; // Small Standard Deviation over
                }

                if (tArrData.length < NetFunnel.MP_MINCOUNT) {
                    return 0; // Noraml
                }

                // check count per unit time
                if (tArrData.length + 1 > NetFunnel.MP_MAXREQLIMIT) {
                    return 1; // Request/UnitTime Exceed
                }

                // check reqonly count
                if (reqCnt > NetFunnel.MP_REQONLYLIMIT) {
                    Storage.setItemStorageOnly("NFMPT.reqCnt", "0");
                    return 3; // Request Only, No Complete
                }
            } catch (e) {
                window.console && window.console.log('MProtect run failed. ', e);
                // continue regardless of error
            }
            return 0;
        };

        /**
         * Busy Alert Box
         */
        NetFunnel.ProgressBar = function (oID, oConfig, doc) {
            this._bar = null;
            this._bar2 = null;
            this._config = {};

            if (typeof oID == "string") {
                this._obj = doc.getElementById(oID);
            } else {
                this._obj = oID;
            }

            this._config["interval"] = 50;
            this._config["color"] = this._color;
            this._config["bgcolor"] = this._bgcolor;
            this._config["waitchk"] = 0;

            if (typeof oConfig == "object") {
                for (var i in oConfig) {
                    this._config[i] = oConfig[i];
                }
            }

            this._tBody = doc.createElement('div');
            this._tBody.style.width = '100%';
            this._tBody.style.height = '100%';
            this._tBody.style.borderRadius = parseInt(this._obj.style.height, 10) / 2 + 'px';
            this._tBody.style.overflow = 'hidden';
            this._tBody.style.position = 'relative';
            this._tBody.style.backgroundColor = this._config["bgcolor"];

            this._tRun = doc.createElement('div');
            this._tRun.style.width = '0%';
            this._tRun.style.height = '100%';
            this._tRun.style.overflow = 'visible';
            this._tRun.style.position = 'relative';
            this._tRun.style.borderRadius = parseInt(this._obj.style.height, 10) / 2 + 'px';
            this._tRun.style.backgroundColor = this._config["color"];

            this._tBody.appendChild(this._tRun);
            this._obj.appendChild(this._tBody);

            this.show = function () {
                this._obj.style.visibility = "visible";
                var myself = this;
                this._timer = setInterval(function () {
                    myself._action(0);
                }, this._config["interval"]);
                return;
            };

            this.hide = function () {
                this._obj.style.visibility = "hidden";
                if (this._timer) {
                    clearTimeout(this._timer);
                    this._timer = null;
                }
                return;
            };

            this._action = function () {
                try {
                    if (this._config["waitchk"] != 0) {
                        if (parseInt(this._config["waitchk"], 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
                            NetFunnel.gLastData.nwait = this._config["waitchk"];
                        }
                    }

                    if (NetFunnel.gTotWait <= 0) {
                        NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
                    }
                    if (parseInt(NetFunnel.gLastData.nwait, 10) > parseInt(NetFunnel.gTotWait, 10)) {
                        NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
                    }
                    // 프로그래스 진행바의 사이즈를 percent로 증가 시키기 위해 계산 값 구하기
                    var barSize = 100 - (NetFunnel.gLastData.nwait / NetFunnel.gTotWait * 100);
                    if (barSize < 0) {
                        barSize = 0;
                    }
                    if (barSize > 100) {
                        barSize = 100;
                    }

                    this._tRun.style.width = barSize + '%';

                    this._config["waitchk"] = NetFunnel.gLastData.nwait;
                } catch (e) {
                    window.console && window.console.log('progress bar action failed.', e);
                    // continue
                }
                return true;
            };
        };

        NetFunnel.ProgressBar.prototype._mmm = 0;
        NetFunnel.ProgressBar.prototype._curr = 0;
        NetFunnel.ProgressBar.prototype._direct = 0;
        NetFunnel.ProgressBar.prototype._obj = null;
        NetFunnel.ProgressBar.prototype._cells = null;
        NetFunnel.ProgressBar.prototype._timer = null;
        NetFunnel.ProgressBar.prototype._oTable = null;
        NetFunnel.ProgressBar.prototype._config = null;
        NetFunnel.ProgressBar.prototype._color = "#4F7FF9";
        NetFunnel.ProgressBar.prototype._bgcolor = "#CACACA";

        /**
         * Cookie 관리
         */
        NetFunnel.Cookie = {
            set: function (key, value, minutes, domain) {
                var tStr = key + "=" + escape(value);

                if (typeof minutes != "undefined" && (minutes.constructor == Number) && minutes > 0) {
                    var expire = new Date();
                    expire.setMinutes(expire.getMinutes() + minutes);
                    tStr += ";expires=" + expire.toGMTString();
                }

                if (typeof domain != "undefined" && domain.constructor == String && domain != "") {
                    tStr += ";domain=" + domain;
                } else if (NetFunnel.TS_COOKIE_DOMAIN != "") {
                    tStr += ";domain=" + NetFunnel.TS_COOKIE_DOMAIN;
                }

                if (location.protocol.indexOf('https') > -1) {
                    tStr += ";path=/; samesite=none; secure;";
                } else {
                    tStr += ";path=/;";
                }

                document.cookie = tStr;
            },

            del: function (key) {
                NetFunnel.Cookie.set(key, "", -1);
            },

            get: function (key) {
                function filterValue(value) {
                    // 필요에 따라 값을 필터링하는 로직을 여기에 추가
                    // 예시: 값 중에 '<' 또는 '>' 문자가 있으면 삭제
                    return value.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;');
                }

                if (document.cookie.length > 0) {
                    var cStart = document.cookie.indexOf(key + "=");
                    if (cStart != -1) {
                        cStart = cStart + key.length + 1;
                        var cEnd = document.cookie.indexOf(";", cStart);
                        if (cEnd == -1) cEnd = document.cookie.length;
                        var rawValue = document.cookie.substring(cStart, cEnd).replace(/(?:\r\n|\r|\n)/g, '');
                        var decodedValue = decodeURIComponent(rawValue);
                        return filterValue(decodedValue);
                    }
                }
                return "";
            }
        };

        /**
         * Complete from URL Parameters
         **/
        NetFunnel.getUrlParameters = function (key) {
            if (typeof key != "string" || key == "") {
                return "";
            }

            var strReturn = "";
            var strHref = document.location.href;
            if (strHref.indexOf("?") > -1) {
                var strQueryString = strHref.substr(strHref.indexOf("?"));
                var aQueryString = strQueryString.split("&");
                for (var iParam = 0; iParam < aQueryString.length; iParam++) {
                    if (aQueryString[iParam].indexOf(key + "=") > -1) {
                        var idx = aQueryString[iParam].indexOf(key + "=") + key.length + 1;
                        strReturn = aQueryString[iParam].substr(idx);
                        break;
                    }
                }
            }
            return unescape(strReturn);
        };

        /*
        NetFunnel.paramNetFunnelID = NetFunnel.getUrlParameters(NetFunnel.TS_COOKIE_ID);
        if(NetFunnel.paramNetFunnelID  != ""){
        		var tStorage     = new NetFunnel.Storage(2);

            var done_value = tStorage.getItem(NetFunnel.TS_COOKIE_ID+"_done");
            if(done_value != NetFunnel.paramNetFunnelID){
            	tStorage.setItem(NetFunnel.TS_COOKIE_ID,NetFunnel.paramNetFunnelID,NetFunnel.TS_COOKIE_TIME,NetFunnel.TS_COOKIE_DOMAIN);
            	tStorage.setItem(NetFunnel.TS_COOKIE_ID+"_done",NetFunnel.paramNetFunnelID,NetFunnel.TS_COOKIE_TIME,NetFunnel.TS_COOKIE_DOMAIN);
            }
        }
        */

        /**
         * Default Callback Function
         */
        NetFunnel.gPop = null;
        NetFunnel.gTimer = null;
        NetFunnel.gLastData = null;

        NetFunnel.countdown_stop = function () {
            try {
                if (!NetFunnel.Util.isVirtualWait(NetFunnel.gLastData)) {
                    NetFunnel.gControl.fireEvent(null, NetFunnel.gControl, 'onStop', {
                        next: NetFunnel.gControl.next.stop
                    });

                    NetFunnel_sendStop();
                    if (NetFunnel.gPop) {
                        NetFunnel.gPop.hide();
                        NetFunnel.gPop.destroy();
                        delete NetFunnel.gPop;
                        NetFunnel.gPop = null;
                    }

                    // Block List Process
                    if (NetFunnel.gControl.getConfig("use_frame_block") == true) {
                        NetFunnel.PopupUtil.hideBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
                    }
                }
            } catch (e) {
                window.console && window.console.log('countdown stop failed. ', e);
                // continue
            }
        };

        NetFunnel.countdown = function () {
            if (NetFunnel.gLastData && NetFunnel.gLastData.time_left >= 0) {
                // 대기 정보를 출력한다.
                if (NetFunnel.gPop) {
                    var tTime = NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_TimeLeft");
                    var tCount = NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_Count");
                    var tNext = NetFunnel.gPop.getObj("NetFunnel_Loading_Popup_NextCnt");

                    if (this._gNWaitView != 0) {
                        if (parseInt(this._gNWaitView, 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
                            NetFunnel.gLastData.nwait = this._gNWaitView;
                        }
                    }

                    this._gNWaitView = NetFunnel.gLastData.nwait;

                    var numWithCommas = function (x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    };
                    var tformat = "";
                    var tformatArr = null;
                    var shownextLimit = 0;
                    var showcntLimit = 0;

                    if (tCount) {
                        showcntLimit = NetFunnel.gControl.getConfig("showcnt_limit");
                        if (showcntLimit > 0 && NetFunnel.gLastData.nwait > showcntLimit) {
                            tformat = tCount.className;
                            if (tformat.length > 0) {
                                tCount.innerHTML = tformat;
                            } else {
                                tCount.innerHTML = NetFunnel.TS_LIMIT_TEXT;
                            }
                        } else {
                            tCount.innerHTML = String(numWithCommas(NetFunnel.gLastData.nwait));
                        }
                    }

                    if (tNext) {
                        shownextLimit = NetFunnel.gControl.getConfig("shownext_limit");
                        if (NetFunnel.gLastData.nnext == undefined) {
                            tNext.innerHTML = "0";
                        } else if (shownextLimit > 0 && NetFunnel.gLastData.nnext > shownextLimit) {
                            tformat = tNext.className;
                            if (tformat.length > 0) {
                                tNext.innerHTML = tformat;
                            } else {
                                tNext.innerHTML = NetFunnel.TS_LIMIT_TEXT;
                            }
                        } else {
                            tNext.innerHTML = String(numWithCommas(NetFunnel.gLastData.nnext));
                        }
                    }

                    if (tTime) {
                        var showtimeLimit = NetFunnel.gControl.getConfig("showtime_limit");
                        if (showtimeLimit > 0 && NetFunnel.gLastData.real_time_left > showtimeLimit) {
                            tformat = tTime.className;
                            tformatArr = tformat.split("^");
                            if (tTime.innerHTML.length >= 5) {
                                tTime.innerHTML = ".";
                            } else {
                                tTime.innerHTML += ".";
                            }
                        } else {
                            tformat = tTime.className;
                            if (tformat.length > 0) {
                                tformatArr = tformat.split("^");
                                tTime.innerHTML = NetFunnel.Util.getTimeStr(NetFunnel.gLastData.real_time_left, tformatArr[0], tformatArr[1], tformatArr[2].toLowerCase() === 'true' ? true : false, tformatArr[3]);
                            } else {
                                tTime.innerHTML = NetFunnel.Util.getTimeStr(NetFunnel.gLastData.real_time_left);
                            }
                        }
                    }

                    if (NetFunnel.gTextDecoration) {
                        try {
                            if (typeof tTime == "object") {
                                if (tTime.style.textDecoration == "none") {
                                    tTime.style.textDecoration = "underline";
                                } else {
                                    tTime.style.textDecoration = "none";
                                }
                            }

                            if (typeof tNext == "object") {
                                if (tNext.style.textDecoration == "none") {
                                    tNext.style.textDecoration = "underline";
                                } else {
                                    tNext.style.textDecoration = "none";
                                }
                            }

                            if (typeof tCount == "object") {
                                if (tCount.style.textDecoration == "none") {
                                    tCount.style.textDecoration = "underline";
                                } else {
                                    tCount.style.textDecoration = "none";
                                }
                            }
                        } catch (e) {
                            window.console && window.console.log('countdown error', e);
                            // continue
                        }
                    }
                }
            }

            if (NetFunnel.gLastData.time_left <= 0 && NetFunnel.gTimer) {
                if (NetFunnel.gPop) {
                    //NetFunnel.gPop.hide();
                }
                return;
            }

            var leftPerc = 0;
            var skinObj = NetFunnel.SkinUtil.get(NetFunnel.gSkinId, NetFunnel.Util.isSmartPhone());
            if (typeof skinObj.updateCallback == "function") {
                if (parseInt(NetFunnel.gTotWait, 10) <= 0) {
                    leftPerc = 0;
                } else {
                    if (parseInt(NetFunnel.gTotWait, 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
                        NetFunnel.gTotWait = parseInt(NetFunnel.gLastData.nwait, 10);
                    }
                    leftPerc = parseInt(((NetFunnel.gTotWait - NetFunnel.gLastData.nwait) * 100) / NetFunnel.gTotWait, 10);
                }
                skinObj.updateCallback(leftPerc, NetFunnel.gLastData.nwait, NetFunnel.gTotWait, NetFunnel.gLastData.real_time_left, true);
            }

            NetFunnel.gLastData.time_left--;
            //NetFunnel.gTimer = setTimeout("NetFunnel.countdown()",1000);
            var self = this;
            NetFunnel.gTimer = setTimeout(function () {
                self.countdown();
            }, 500);
        };

        NetFunnel.SkinUtil = {
            prevID: "",
            add: function (id, obj, type) {
                'use strict';
                try {
                    if (typeof id != "string" || id == "") {
                        return false;
                    }
                    if (typeof obj != "object") {
                        return false;
                    }
                    if (typeof type != "string" || type == "") {
                        type = "normal";
                    }

                    if (typeof NetFunnel.Skin[id] != "object") {
                        NetFunnel.Skin[id] = {};
                    }
                    NetFunnel.Skin[id][type] = obj;
                    NetFunnel.gLastSkinID = id;
                    return true;
                } catch (e) {
                    return false;
                }
            },
            get: function (id, isMobile) {
                'use strict';
                try {
                    if (typeof id != "string" || id == "") {
                        id = NetFunnel.gLastSkinID;
                    }
                    var type = "normal";
                    if (NetFunnel.gUseMobileUI == true && isMobile == true) {
                        type = "mobile";
                    }

                    if (typeof NetFunnel.Skin[id] == "object" && typeof NetFunnel.Skin[id][type] == "object") {
                        return NetFunnel.Skin[id][type];
                    }

                    if (NetFunnel.TS_SKIN_ID != "" && NetFunnel.TS_SKIN_ID != id) {
                        if (typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID] == "object" && typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type] == "object") {
                            return NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type];
                        }
                    }
                    return NetFunnel.Skin["default"][type];
                } catch (e) {
                    window.console && window.console.log('get skin failed', e);
                    // continue
                }
                return NetFunnel.Skin["default"]["normal"];
            }
        };

        NetFunnel.mtstr = '\
<div id="NetFunnel_Skin_Top" style="background-color:#ffffff; width:290px; height:280px; font-family:sans-serif !important; overflow: visible !imporatnt; white-space: normal !imporatnt;"> \
    <div style="padding: 10px 10px 0px 20px; overflow: visible !imporatnt; position: relative !imporatnt; white-space: normal !imporatnt;"> \
		<div style="padding-top:5px; padding-right:5px; line-height:25px; overflow: visible !imporatnt; position: relative !imporatnt; white-space: normal !imporatnt;"> \
    		<span style="text-align: left;"><a href="' + NetFunnel.gLogoURL + '" target="_blank" style="cursor:pointer;text-decoration:none;">';
        if ((NetFunnel.BrowserDetect.browser == "Explorer" && NetFunnel.BrowserDetect.version == "6") || NetFunnel.gLogoData == "") {
            NetFunnel.mtstr += '<b style="font-size:12px !important;">' + NetFunnel.gLogoText + '</b></a>';
        } else {
            NetFunnel.mtstr += '<b style="font-size:12px !important;">' + NetFunnel.gLogoText + '</b><img style="width:50px; height:25px; color:black; font-size:11px !important; position: relative;" border=0 src="data:image/gif;base64,' + NetFunnel.gLogoData + '" ></a>';
        }
        NetFunnel.mtstr += '</span> \
    		<b style="text-align:right;"><span id="NetFunnel_Loding_Popup_Debug_Alerts" style="color:#ff0000;"></span></b> \
        </div> \
    </div> \
    <div style="padding-top:0px; padding-left:5px; padding-right:5px; line-height: initial !important; overflow: visible !important; position: relative !important; white-space: normal !important;"> \
        <div style="box-sizing:initial; text-align:center; overflow: visible !important; position: relative !important; white-space: normal !important;"> \
            <b style="font-size:16px !important; color:#525252;font-family:sans-serif !important;">서비스 <span style="color:#4F7FF9;">접속대기 중</span>입니다.</b> \
        </div> \
        <div style="box-sizing:initial;text-align:center;font-size:15px !important;color:#525252;padding-top:4px;white-space:nowrap; text-overflow:ellipsis; overflow:hidden;font-family:sans-serif !important; position: relative; white-space: normal;"> \
            <b>예상대기시간 :</b> \
                <span id="NetFunnel_Loading_Popup_TimeLeft" class="%H시간 %M분 %02S초^ ^false^font-size:15px !important;color:#525252;" style="color: #4F7FF9; font-size: 21px !important;"></span> \
        </div> \
        <div style="margin:auto; box-sizing: initial; padding-top: 6px; padding-bottom: 6px; width:190px; height:8px; visibility: visible; overflow: visible; position: relative;" id="NetFunnel_Loading_Popup_Progressbar"></div> \
        <div style="box-sizing:initial; width:100%; padding-bottom:8px; overflow:hidden; color:#6C6C6C; text-align:center; font-size:12px !important; overflow: visible; white-space: normal;"> \
            <div style="padding-left:5px; overflow: visible !imporatnt; position: relative !imporatnt; white-space: normal !imporatnt;"> \
                <div style="box-sizing:initial;text-align:center;padding:3px;padding-top:10px;white-space:nowrap; text-overflow:ellipsis; overflow:hidden;font-size:11px !important;font-weight:normal !important;font-family:sans-serif !important; position: relative;">고객님 앞에 \
                    <span style="color:#00BF08; font-size:11px !important; font-weight: bold !important;"> \
                        <span id="NetFunnel_Loading_Popup_Count" class="' + NetFunnel.TS_LIMIT_TEXT + '"></span><span style="font-weight:normal !important;font-size:11px !important;">명</span>\
                    </span> \
                    의 대기자가 있습니다. \
                </div> \
                <div style="padding:1px;font-size:11px !important; overflow: visible; position: relative;">현재 접속 사용자가 많아 대기 중이며, </div> \
                <div style="padding:1px;font-size:11px !important; overflow: visible; position: relative;">잠시만 기다리시면 </div> \
                <div style="padding:1px;font-size:11px !important; overflow: visible; position: relative;">서비스로 자동 접속 됩니다.</div> \
                <div style="padding-top:10px; overflow: visible; position: relative; white-space: normal;"> \
                    <div id="NetFunnel_Countdown_Stop" style="position:relative;box-sizing:initial; cursor:pointer; margin:auto; width:40px; height:25px; border:1px solid #e8e8e8; padding-left:15px; line-height:22px;font-size:11px !important; overflow: visible; position: relative;"> \
                        <div class="NetFunnel_stop_x" style="position:absolute; width:25px; height:25px; top:0; left:0; color:#CCC;"></div>\
                    중지</div> \
                    </div> \
                <div style="padding-top:5px;font-size:11px !important; overflow: visible; position: relative; white-space: normal;"> \
                    재 접속하시면 대기시간이 더 길어집니다. </div> \
            </div> \
        </div> \
        <div style="height:5px;"></div> \
    </div> \
    <style>.NetFunnel_stop_x:after{content:\'\\d7\'; font-size:14px !important;}</style> \
</div> ';

        NetFunnel.SkinUtil.add('default', {
            htmlStr: NetFunnel.mtstr
        }, 'mobile');

        NetFunnel.tstr = '\
<div id="NetFunnel_Skin_Top" style="background-color:#ffffff; width:438px; height:376px; font-family:sans-serif; overflow: visible !important; white-space: normal !important;"> \
    <div style="padding: 10px 10px 0px 20px; position: relative !important; overflow: visible !important; white-space: normal !important;"> \
		<div style="padding-top:5px; padding-right:5px; font-size:10px !important; overflow: visible !important; white-space: normal !important;"> \
    		<span style="text-align: left;"><a href="' + NetFunnel.gLogoURL + '" target="_blank" style="cursor:pointer;text-decoration:none;">';
        if ((NetFunnel.BrowserDetect.browser == "Explorer" && NetFunnel.BrowserDetect.version == "6") || NetFunnel.gLogoData == "") {
            NetFunnel.tstr += '<b style="font-size:12px !important;">' + NetFunnel.gLogoText + '</b></a>';
        } else {
            NetFunnel.tstr += '<b style="font-size:12px !important;">' + NetFunnel.gLogoText + '</b>\
            <img style="width:65px; height:30px; color:black; font-size:11px !important; position: relative !important;" border=0 src="data:image/gif;base64,' + NetFunnel.gLogoData + '" ></a>';
        }
        NetFunnel.tstr += '</span> \
    		<b style="text-align:right; white-space: normal;"><span id="NetFunnel_Loding_Popup_Debug_Alerts" style="color:#ff0000;"></span></b> \
        </div> \
    </div> \
    <div style="padding-top:0px; padding-left:5px; padding-right:5px; line-height: initial !important; overflow: visible !important; white-space: normal !important;"> \
        <div style="box-sizing:initial; text-align:center; font-size:21px !important; color:#525252; overflow: visible; position: relative; white-space: normal;"> \
            <b>서비스 <span style="color:#4F7FF9;">접속대기 중</span>입니다.</b> \
        </div> \
        <div style="box-sizing:initial;text-align:center;font-size:18px !important;color:#525252;padding-top:4px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; position: relative; white-space: normal;"> \
            <b>예상대기시간 :</b> \
                <span id="NetFunnel_Loading_Popup_TimeLeft" class="%H시간 %M분 %02S초^ ^false^font-size:18px !important;color:#525252;" style="color: #4F7FF9; font-size: 32px !important;"></span> \
        </div> \
        <div style="margin:auto; box-sizing: initial; padding-top: 6px; padding-bottom: 6px; width:270px; height:8px; visibility: visible; overflow: visible; position: relative;" id="NetFunnel_Loading_Popup_Progressbar"></div> \
        <div style="box-sizing:initial; width:100%; padding-bottom:8px; overflow:hidden; color:#6C6C6C; text-align:center; overflow: visible; white-space: normal;"> \
            <div style="padding-left:5px; overflow: visible !important; white-space: normal !important;"> \
                <div style="box-sizing:initial;font-size:14px !important;text-align:center;padding:3px;padding-top:10px;white-space:nowrap; text-overflow:ellipsis; overflow:hidden; position: relative;">고객님 앞에 \
                    <span style="color:#00BF08; font-size:24px !important; font-weight: bold;"> \
                        <span id="NetFunnel_Loading_Popup_Count" class="' + NetFunnel.TS_LIMIT_TEXT + '"></span><span style="font-weight:normal;font-size:14px !important;">명</span>\
                    </span>\
                    , 뒤에 \
                    <b> \
                        <span style="color:#00BF08;  font-weight: bold;"> \
                            <span id="NetFunnel_Loading_Popup_NextCnt" class="' + NetFunnel.TS_LIMIT_TEXT + '"></span><span style="font-weight:normal;font-size:14px !important;">명</span>\
                        </span> \
                    </b> \
                    의 대기자가 있습니다. \
                </div> \
                <div style="box-sizing:initial;padding:3px;font-size:14px !important; overflow: visible; position: relative;">현재 접속 사용자가 많아 대기 중이며, 잠시만 기다리시면 </div> \
                <div style="box-sizing:initial;padding:3px;font-size:14px !important; overflow: visible; position: relative;">서비스로 자동 접속 됩니다.</div> \
                <div style="box-sizing:initial;padding-top:25px;font-size:14px !important; overflow: visible; position: relative; white-space: normal;"> \
                    <div id="NetFunnel_Countdown_Stop" style="box-sizing:initial; position:relative; cursor:pointer; margin:auto; width:50px; height:30px; border:1px solid #e8e8e8;padding-left:15px;line-height:27px;font-size:14px !important;"> \
                        <div class="NetFunnel_stop_x" style="position:absolute; width:30px; height:30px; top:0; left:0; color:#CCC;"></div>\
                    중지</div> \
                    </div> \
                <div style="box-sizing:initial;padding-top:10px;font-size:14px !important; overflow: visible; position: relative; white-space: normal;"> \
                    재 접속하시면 대기시간이 더 길어집니다. </div> \
            </div> \
        </div> \
        <div style="height:5px;"></div> \
    </div> \
    <style>.NetFunnel_stop_x:after{content:\'\\d7\'; font-size:17px !important; line-height:27px !important;}#NetFunnel_Countdown_Stop:hover{background-color:#f7f7f7;}</style> \
</div> ';

        NetFunnel.SkinUtil.add('default', {
            htmlStr: NetFunnel.tstr
        }, 'normal');

        /**
         * 지정된 skinid 값의 팝업창을 설정 및 기능을 실행한다.
         *
         * @param {String} type 팝업창 종류(continue:대기창, vcontinue:가상대기창, alert:일반팝업창)
         * @param {String} skinid 사용할 팝업창 id
         */
        NetFunnel.PopupSetup = function (type, ret, skinid) {
            if (skinid === null || skinid == "") {
                skinid = NetFunnel.gSkinId;
            }
            var skinObj = NetFunnel.SkinUtil.get(skinid, NetFunnel.Util.isSmartPhone());

            switch (type) {
                case "vcontinue": // 가상대기창
                    ret.data.nwait = 1000000;
                    ret.data.ttl = "2";
                    ret.data.tps = 30;
                    break;
                case "continue": // 대기창
                    break;
                case "alert": // alert창
                    break;
                default:
                    break;
            }

            if (type != "alert" && typeof ret == "object") {
                var tps = ret.data.tps
                NetFunnel.gLastData = ret.data;
                NetFunnel.gLastData.time_left = parseInt(ret.data.ttl, 10);
                NetFunnel.gLastData.tps = parseFloat(tps);
                // 완료 TPS의 최소값을 0.05로 설정
                if (NetFunnel.gLastData.tps < 0.05) NetFunnel.gLastData.tps = 0.05;

                // wait time adjust
                // ------------------------------------------------
                NetFunnel.gLastData.real_time_left = parseInt(ret.data.nwait) / NetFunnel.gLastData.tps;
                if (NetFunnel.gLastData.real_time_left < 1) {
                    NetFunnel.gLastData.real_time_left = 1;
                }

                if (NetFunnel.TS_PREVENT_WAIT_TIME_INCREASE && NetFunnel.gPrevWaitTime > -1 && NetFunnel.gLastData.real_time_left > NetFunnel.gPrevWaitTime) {
                    NetFunnel.gLastData.real_time_left = NetFunnel.gPrevWaitTime;
                }

                NetFunnel.gPrevWaitTime = NetFunnel.gLastData.real_time_left;
                // ------------------------------------------------

                if (NetFunnel.gTotWait < 0) {
                    NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
                }
            }

            if (!NetFunnel.gPop) {
                NetFunnel.gPop = new NetFunnel.Popup(skinObj.htmlStr, NetFunnel.gPopupTop, NetFunnel.gPopupLeft, NetFunnel.gControl.getConfig("popup_target"), false, false, NetFunnel.gControl.getConfig("popup_zindex"));
                if (typeof skinObj.prepareCallback == "function") {
                    skinObj.prepareCallback();
                }
                this._gNWaitView = 0;
            }

            NetFunnel.gPop.show();

            var tDAlert = null;
            if (NetFunnel.gPop.getObj("NetFunnel_Loding_Popup_Debug_Alerts")) {
                if (NetFunnel.gDebugflag) {
                    tDAlert = NetFunnel.gPop.getObj("NetFunnel_Loding_Popup_Debug_Alerts");
                    tDAlert.innerHTML = " Debug Mode ";
                } else {
                    tDAlert = NetFunnel.gPop.getObj("NetFunnel_Loding_Popup_Debug_Alerts");
                    tDAlert.innerHTML = "";
                }
            }

            // Block List Process
            if (NetFunnel.gControl.getConfig("use_frame_block") == true) {
                NetFunnel.PopupUtil.showBlockList(NetFunnel.gControl.getConfig("frame_block_list"));
            }

            if (type != "alert") {
                NetFunnel.countdown();
            }
        };

        NetFunnel.DefaultCallback = {
            onSuccess: function (ev, ret, obj) {
                if (NetFunnel.gTimer) {
                    clearTimeout(NetFunnel.gTimer);
                }
                if (NetFunnel.gPop && !obj.getConfig("success_popup_visibility")) {
                    NetFunnel.gPop.hide();
                    NetFunnel.gPop.destroy();
                    delete NetFunnel.gPop;
                    NetFunnel.gPop = null;
                }

                // Block List Process
                if (obj.getConfig("use_frame_block") == true) {
                    NetFunnel.PopupUtil.hideBlockList(obj.getConfig("frame_block_list"));
                }

                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                } else if (typeof ret.next == "function") {
                    DefaultCallback_onSuccess(ev, ret, obj);
                }

                // NetFunnel.gPop = null;
            },
            onContinued: function (ev, ret) {
                if (typeof ret.next == "string") {
                    document.location.href = ret.next;
                    return;
                }

                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }

                if (ret.rtype == NetFunnel.RTYPE_CHK_ENTER || ret.rtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
                    if (NetFunnel.gTimer) {
                        clearTimeout(NetFunnel.gTimer);
                    }
                    NetFunnel.PopupSetup("continue", ret, NetFunnel.gSkinId);
                }
            },
            onError: function (ev, ret, obj) {
                if (NetFunnel.gPop) {
                    NetFunnel.gPop.hide();
                    NetFunnel.gPop.destroy();
                    delete NetFunnel.gPop;
                    NetFunnel.gPop = null;
                }

                // Block List Process
                if (obj.getConfig("use_frame_block") == true) {
                    NetFunnel.PopupUtil.hideBlockList(obj.getConfig("frame_block_list"));
                }

                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                    return;
                }
                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }
            },
            onStop: function (ev, ret) {
                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                    return;
                }
                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }
            },
            onBypass: function (ev, ret, obj) {
                if (NetFunnel.gTimer) {
                    clearTimeout(NetFunnel.gTimer);
                }
                if (NetFunnel.gPop) {
                    NetFunnel.gPop.hide();
                    NetFunnel.gPop.destroy();
                    delete NetFunnel.gPop;
                    NetFunnel.gPop = null;
                }

                if (obj.getConfig("use_frame_block") == true) {
                    NetFunnel.PopupUtil.hideBlockList(obj.getConfig("frame_block_list"));
                }

                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                    return;
                }
                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }
            },
            onExpressnumber: function (ev, ret, obj) {
                if (NetFunnel.gTimer) {
                    clearTimeout(NetFunnel.gTimer);
                }
                if (NetFunnel.gPop) {
                    NetFunnel.gPop.hide();
                    NetFunnel.gPop.destroy();
                    delete NetFunnel.gPop;
                    NetFunnel.gPop = null;
                }

                if (obj.getConfig("use_frame_block") == true) {
                    NetFunnel.PopupUtil.hideBlockList(obj.getConfig("frame_block_list"));
                }
                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                    return;
                }
                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }
            },
            onBlock: function (ev, ret, obj) {
                if (NetFunnel.gTimer) {
                    clearTimeout(NetFunnel.gTimer);
                }
                if (NetFunnel.gPop) {
                    NetFunnel.gPop.hide();
                    NetFunnel.gPop.destroy();
                    delete NetFunnel.gPop;
                    NetFunnel.gPop = null;
                }

                if (typeof ret.next == "string" && ret.next != "") {
                    document.location.href = ret.next;
                    return;
                }

                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }

                if (typeof obj.getConfig("block_url") != 'string' || obj.getConfig("block_url") == "") {
                    if (obj.getConfig("block_msg") == "" || typeof obj.getConfig("block_msg") != 'string') {
                        alert("[NetFUNNEL]Service Block!");
                    } else {
                        alert(obj.getConfig("block_msg"));
                    }
                    return;
                }
                document.location.href = obj.getConfig("block_url");
            },
            onIpBlock: function (ev, ret) {
                if (typeof ret.next == "string") {
                    document.location.href = ret.next;
                    return;
                }

                if (typeof ret.next == "function") {
                    if (ret.next(ev, ret) == false) {
                        return;
                    }
                }

                if (NetFunnel.gTimer) {
                    clearTimeout(NetFunnel.gTimer);
                }
                NetFunnel.PopupSetup("vcontinue", ret, NetFunnel.gSkinId);
            }
        };

        /**
         * Event Class 의 생성자
         *
         * @classDescription	새로운 Event클래스를 생성한다.
         * @return {Object}	새로생성된 Event객체
         * @constructor
         */
        NetFunnel.Event = function () {
            this.events = [];
            this.builtinEvts = [];
        };

        /**
         * 해당 Element에 대한 주어진 Action의 번호를 얻어온다.
         *
         * @memberOf NetFunnel.Event
         * @param {Object} obj action 이 연결된 element
         * @param {String} evt 이벤트 이름
         * @param {Function} action 이벤트가 발생했을때 실행된 action
         * @param {Object} binding The object to scope the action to.
         * @return {Number} 정수값
         */
        NetFunnel.Event.prototype.getActionIdx = function (obj, evt, action, binding) {
            if (obj && evt) {
                var curel = this.events[obj][evt];
                if (curel) {
                    var len = curel.length;
                    for (var i = len - 1; i >= 0; i--) {
                        if (curel[i].action == action && curel[i].binding == binding) {
                            return i;
                        }
                    }
                } else {
                    return -1;
                }
            }
            return -1;
        };

        /**
         * Listener 추가
         *
         * @memberOf NetFunnel.Event
         * @param {Object} obj action 이 연결된 element
         * @param {String} evt 이벤트 이름
         * @param {Function} action 이벤트가 발생했을때 실행된 action
         * @param {Object} binding The object to scope the action to.
         * @return {null} 없음.
         */
        NetFunnel.Event.prototype.addListener = function (obj, evt, action, binding) {
            if (this.events[obj]) {
                if (this.events[obj][evt]) {
                    if (this.getActionIdx(obj, evt, action, binding) == -1) {
                        var curevt = this.events[obj][evt];
                        curevt[curevt.length] = {
                            action: action,
                            binding: binding
                        };
                    }
                } else {
                    this.events[obj][evt] = [];
                    this.events[obj][evt][0] = {
                        action: action,
                        binding: binding
                    };
                }
            } else {
                this.events[obj] = [];
                this.events[obj][evt] = [];
                this.events[obj][evt][0] = {
                    action: action,
                    binding: binding
                };
            }
        };

        /**
         * Listener 제거
         *
         * @memberOf NetFunnel.Event
         * @param {Object} obj action 이 연결된 element
         * @param {String} evt 이벤트 이름
         * @param {Function} action 이벤트가 발생했을때 실행된 action
         * @param {Object} binding The object to scope the action to.
         * @return {null} 없음
         */
        NetFunnel.Event.prototype.removeListener = function (obj, evt, action, binding) {
            if (this.events[obj]) {
                if (this.events[obj][evt]) {
                    var idx = this.actionExists(obj, evt, action, binding);
                    if (idx >= 0) {
                        this.events[obj][evt].splice(idx, 1);
                    }
                }
            }
        };

        /**
         * 이벤트 발생
         *
         * @memberOf NetFunnel.Event
         * @param e [(event)] 내장 이벤트객체 전달
         * @param {Object} obj action 이 연결된 element
         * @param {String} evt 이벤트 이름
         * @param {Object} args 이벤트에 전달된 인자
         * @return {null} 없음.
         */
        NetFunnel.Event.prototype.fireEvent = function (e, obj, evt, args) {
            if (!e) {
                e = window.event;
            }
            if (obj && this.events) {
                var evtel = this.events[obj];
                if (evtel) {
                    var curel = evtel[evt];
                    if (curel) {
                        for (var act = 0; curel.length > act; act++) {
                            var action = curel[act].action;
                            if (curel[act].binding) {
                                action = action.bind(curel[act].binding);
                            }
                            action(e, args, obj);
                        }
                    }
                }
            }
        };

        NetFunnel.gPopup = [];
        NetFunnel.PopupUtil = {
            getViewportHeight: function (win, doc) {
                if (win.innerHeight != win.undefined) return win.innerHeight;
                if (doc.compatMode == 'CSS1Compat') return doc.documentElement.clientHeight;
                if (doc.body) return doc.body.clientHeight;
                return win.undefined;
            },
            getViewportWidth: function (win, doc) {
                if (win.innerWidth != win.undefined) return win.innerWidth;
                if (doc.compatMode == 'CSS1Compat') return doc.documentElement.clientWidth;
                if (doc.body) return doc.body.clientWidth;
                return 0;
            },
            getScrollTop: function (doc) {
                if (doc.pageYOffset) {
                    return doc.pageYOffset;
                } else if (doc.documentElement && typeof doc.documentElement.scrollTop == "number") {
                    return doc.documentElement.scrollTop;
                } else if (doc.body) {
                    return doc.body.scrollTop;
                }
                return 0;
            },
            getScrollLeft: function (doc) {
                if (doc.pageXOffset) {
                    return doc.pageXOffset;
                } else if (doc.documentElement && typeof doc.documentElement.scrollLeft == "number") {
                    return doc.documentElement.scrollLeft;
                } else if (doc.body) {
                    return doc.body.scrollLeft;
                }
                return 0;
            },
            resizePopup: function () {
                for (var i = 0; NetFunnel.gPopup.length > i; i++) {
                    NetFunnel.gPopup[i]._centerPopWin();
                }
            },
            getObjWidth: function (obj) {
                if (!obj) return 0;

                var width = 0;
                if (parseInt(obj.style.width, 10) > parseInt(obj.offsetWidth, 10)) {
                    width = parseInt(obj.style.width, 10);
                } else {
                    width = obj.offsetWidth;
                }
                return width;
            },
            getObjHeight: function (obj) {
                if (!obj) return 0;
                var height = 0;
                if (parseInt(obj.style.height, 10) > parseInt(obj.offsetHeight, 10)) {
                    height = parseInt(obj.style.height, 10);
                } else {
                    height = obj.offsetHeight;
                }
                return height;
            },
            showBlockList: function (blockList) {
                for (var i = 0; i < blockList.length; i++) {
                    try {
                        var tdata = blockList[i];
                        tdata.popup = new NetFunnel.Popup("", NetFunnel.gPopupTop, NetFunnel.gPopupLeft, tdata.win, false, false, NetFunnel.gControl.getConfig("popup_zindex"));
                        tdata.popup.show();
                    } catch (e) {
                        window.console && window.console.log('show block list failed.', e);
                        // continue
                    }
                }
            },
            hideBlockList: function (blockList) {
                for (var i = 0; i < blockList.length; i++) {
                    try {
                        var tdata = blockList[i];
                        if (tdata.popup) {
                            tdata.popup.hide();
                            tdata.popup.destroy();
                            delete tdata.popup;
                            tdata.popup = null;
                        }
                    } catch (e) {
                        window.console && window.console.log('hide block list failed.', e);
                        // continue
                    }
                }
            },
            hideWaitPopup: function () {
                if (typeof NetFunnel == "object") {
                    if (NetFunnel.gWaitPop) {
                        NetFunnel.gWaitPop.hide();
                        NetFunnel.gWaitPop.destroy();
                        NetFunnel.gWaitPop = null;
                    }
                }
            },
            showWaitPopup: function () {
                if (typeof NetFunnel == "object") {
                    var tstr = '<div style="padding:2px;border:1px solid darkgray;"> \
				<table> \
					<tr>';
                    if (NetFunnel.BrowserDetect.browser == "Explorer" && NetFunnel.BrowserDetect.version == "6") {
                        tstr += '<td></td>';
                    } else {
                        tstr += '<td><img style="" border=0 src="data:image/gif;base64,' + NetFunnel.gPreWaitData + '" ></td>';
                    }
                    tstr += '	<td style="valign:middle;font-size:9pt">wait...</td> \
					</tr> \
				</table> \
			</div>';

                    NetFunnel.gWaitPop = new NetFunnel.Popup(tstr, false, false, NetFunnel.gControl, true, "NetFunnel_Waiting_Popup", NetFunnel.gControl.getConfig("popup_zindex"));
                    NetFunnel.gWaitPop.show();
                }
            },
            getDocumentEntireHeight: function (doc) {
                var body = doc.body,
                    html = doc.documentElement;
                var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

                return height;
            }

        };

        /**
         * Modal Popup Window
         */
        NetFunnel.Popup = function (content, top, left, winobj, waiting, objId, zindex) {
            // Window/Document setting
            var targetElementId = NetFunnel.gControl.getConfig('target_element_id');
            var targetElement = null;
            if (targetElementId !== '') {
                targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    if (targetElement.style.position !== '') {
                        this.oldStyle = targetElement.style.position;
                    }
                    targetElement.style.position = 'relative';
                }
            } else if (typeof winobj == "object") {
                this._mWin = winobj;
                if (typeof winobj.document == "object") {
                    this._mDoc = winobj.document;
                } else {
                    this._mWin = window;
                    this._mDoc = document;
                }
            } else {
                this._mWin = window;
                this._mDoc = document;
            }

            if (typeof waiting != "boolean") {
                waiting = false;
            }

            if (typeof objId != "string") {
                objId = "NetFunnel_Loading_Popup";
            }

            if (typeof zindex != "undefined" && !isNaN(zindex)) {
                this._mZindex = zindex;
            }

            // Find Document Body
            var theBody = this._mDoc.getElementsByTagName('BODY')[0];
            if (!theBody) {
                return;
            }

            // Content Div Create
            var tObj = this._mDoc.getElementById(objId);
            if (!tObj || NetFunnel.SkinUtil.prevID != NetFunnel.gSkinId) {
                tObj = this._mDoc.createElement('div');
                tObj.id = objId;
                tObj.style.display = "none";
                tObj.style.top = 0;
                tObj.style.left = 0;
                tObj.style.overflow = 'visible';
                tObj.style.whiteSpace = 'normal';
                tObj.innerHTML = content;

                if (targetElement) {
                    targetElement.appendChild(tObj);
                } else {
                    theBody.appendChild(tObj);
                }

                var tObjCtBusy = this._mDoc.getElementById("NetFunnel_Loading_Popup_Progressbar");
                if (tObjCtBusy) {
                    var tConfig = {
                        count: 50,
                        interval: 50
                    };
                    var busyWidth = parseInt(tObjCtBusy.style.width, 10);
                    var busyHeight = parseInt(tObjCtBusy.style.height, 10);

                    if (!isNaN(busyWidth)) {
                        tConfig.width = busyWidth;
                    }
                    if (!isNaN(busyHeight)) {
                        tConfig.height = busyHeight;
                    }

                    var busybox = new NetFunnel.ProgressBar(tObjCtBusy, tConfig, this._mDoc);
                    busybox.show();
                    this._mProgress = busybox;
                }

                var tObjStopBtn = this._mDoc.getElementById("NetFunnel_Countdown_Stop");
                if (tObjStopBtn) {
                    tObjStopBtn.onclick = NetFunnel.countdown_stop;
                }
                this.new_draw = true;
            }
            NetFunnel.SkinUtil.prevID = NetFunnel.gSkinId;

            var popmask = this._mDoc.getElementById('mpopup_bg');
            var popiframe = this._mDoc.getElementById('pop_iframe');

            if (!popmask) {
                popmask = this._mDoc.createElement('div');
                popmask.id = 'mpopup_bg';
                //popmask.innerHTML="<table width='100%' height='100%'><tr><td>&nbsp;</td></tr></table>";
                popmask.innerHTML = "<div style='width:100%; height:100%'>&nbsp;</div>";

                popmask.style.zIndex = (this._mZindex + 1);
                popmask.style.top = "0px";
                popmask.style.left = "0px";
                popmask.style.width = "100%";
                var browser = NetFunnel.BrowserDetect.browser;
                if (browser == 'Mozilla' || browser == 'Explorer') {
                    popmask.style.backgroundColor = 'rgb(80,80,80)';
                    popmask.style.filter = 'alpha(opacity=30)';
                    popmask.style.opacity = '0.3';
                    popmask.style.position = "absolute";
                    popmask.style.height = NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc) + "px";
                } else {
                    if (targetElement) {
                        popmask.style.position = "absolute";
                    } else {
                        popmask.style.position = "fixed";
                    }
                    popmask.style.height = "100%";
                    popmask.style.backgroundColor = 'rgba(80,80,80,0.3)';
                }
                popmask.style.margin = "0";
                popmask.style.padding = "0";
                popmask.style.border = "0px solid black";
                popmask.fontSize = "0";
                if (targetElement) {
                    targetElement.appendChild(popmask);
                } else {
                    theBody.appendChild(popmask);
                }
            }

            if (!popiframe) {
                //IE 6.0 Select 처리
                popiframe = this._mDoc.createElement('div');
                // popiframe = this._mDoc.createElement('iframe');
                popiframe.id = 'pop_iframe';
                popiframe.frameborder = "0";
                popiframe.border = "0";
                popiframe.framespacing = "0";
                popiframe.marginheight = "0";
                popiframe.marginwidth = "0";
                if (waiting) {
                    popiframe.style.opacity = "0";
                    popiframe.style.filter = "alpha(opacity=0)";
                } else {
                    popiframe.style.opacity = "0.5";
                    popiframe.style.filter = "alpha(opacity=50)";
                }
                popiframe.style.zIndex = this._mZindex;
                popiframe.style.top = "0px";
                popiframe.style.left = "0px";
                popiframe.style.width = "100%";
                if (targetElement) {
                    popiframe.style.position = "absolute";
                } else {
                    popiframe.style.position = "fixed";
                }
                popiframe.style.border = "0px solid #FFFFFF";
                popiframe.style.backgroundColor = "#FFFFFF";
                var browser = NetFunnel.BrowserDetect.browser;
                if (browser == 'Mozilla' || browser == 'Explorer') {
                    popiframe.style.backgroundColor = 'rgb(80,80,80)';
                    if (waiting) {
                        popiframe.style.opacity = "0";
                        popiframe.style.filter = "alpha(opacity=0)";
                    } else {
                        popiframe.style.opacity = "0.5";
                        popiframe.style.filter = "alpha(opacity=50)";
                    }
                    popiframe.style.height = NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc) + "px";
                } else {
                    if (waiting) {
                        popiframe.style.backgroundColor = 'rgba(80,80,80,0)';
                    } else {
                        popiframe.style.backgroundColor = 'rgba(80,80,80,0.3)';
                    }
                    popiframe.style.height = "100%";
                }

                theBody = this._mDoc.getElementsByTagName('BODY')[0];
                if (targetElement) {
                    targetElement.appendChild(popiframe);
                } else {
                    theBody.appendChild(popiframe);
                }
            }

            tObj.style.position = "absolute";
            tObj.style.visibility = "hidden";

            this._mCount++;
            this._mMask = popmask;
            this._mPopIFrame = popiframe;
            this._mObj = tObj;

            this._mTop = top;
            this._mLeft = left;
            this.mid = "mpopup_" + this._mCount;

            this.addListener(this._mWin, "resize", NetFunnel.PopupUtil.resizePopup);
            NetFunnel.gPopup.push(this);
        };

        NetFunnel.Popup.prototype = new NetFunnel.Event();
        NetFunnel.Popup.prototype._mCount = 0;
        NetFunnel.Popup.prototype._mid = "";
        NetFunnel.Popup.prototype._mWin = window;
        NetFunnel.Popup.prototype._mDoc = document;
        NetFunnel.Popup.prototype._mObj = null;
        NetFunnel.Popup.prototype._mMask = null;
        NetFunnel.Popup.prototype._mPopIFrame = null;
        NetFunnel.Popup.prototype._mIsShown = false;
        NetFunnel.Popup.prototype._mIframeResize = NetFunnel.TS_IFRAME_RESIZE;
        NetFunnel.Popup.prototype._mProgress = null;
        NetFunnel.Popup.prototype._mZindex = NetFunnel.TS_POPUP_ZINDEX;
        NetFunnel.Popup.prototype.oldStyle = '';

        NetFunnel.Popup.prototype._centerPopWin = function () {
            if (this._mIsShown) {
                var theBody = this._mDoc.getElementsByTagName("BODY")[0];
                if (!theBody) {
                    return;
                }
                var targetElementId = NetFunnel.gControl.getConfig('target_element_id');
                var targetElement = null;
                if (targetElementId !== '') {
                    targetElement = document.getElementById(targetElementId);
                }
                var doc;
                if (NetFunnel.Util.isSmartPhone() == true) // smartPhone
                    doc = window;
                else if (NetFunnel.BrowserDetect.browser == "Explorer") // browser = IE
                    doc = this._mDoc;
                else
                    doc = this._mWin;

                var scTop = parseInt(NetFunnel.PopupUtil.getScrollTop(doc), 10);
                var scLeft = parseInt(theBody.scrollLeft, 10);
                if (targetElement) {
                    scTop = parseInt(NetFunnel.PopupUtil.getScrollTop(targetElement), 10);
                    scLeft = parseInt(targetElement.scrollLeft, 10);
                }

                var fullHeight = 0;
                if (targetElement) {
                    fullHeight = targetElement.offsetHeight;
                } else {
                    if (NetFunnel.Util.isSmartPhone() == true)
                        fullHeight = NetFunnel.PopupUtil.getViewportHeight(window, this._mDoc);
                    else
                        fullHeight = NetFunnel.PopupUtil.getViewportHeight(this._mWin, this._mDoc);
                }

                var fullWidth = NetFunnel.PopupUtil.getViewportWidth(this._mWin, this._mDoc);
                if (targetElement) {
                    fullWidth = targetElement.offsetWidth;
                }

                if (typeof this._mTop == "number") {
                    this._mObj.style.top = this._mTop + "px";
                } else {
                    this._mObj.style.top = (scTop + ((fullHeight - NetFunnel.PopupUtil.getObjHeight(this._mObj)) / 2)) + "px";
                }

                if (typeof this._mLeft == "number") {
                    this._mObj.style.left = this._mLeft + "px";
                } else {
                    this._mObj.style.left = (scLeft + ((fullWidth - NetFunnel.PopupUtil.getObjWidth(this._mObj)) / 2)) + "px";
                }

                if (this._mIframeResize && typeof this._mPopIFrame == "object") {
                    this._mPopIFrame.style.top = this._mObj.style.top;
                    this._mPopIFrame.style.left = this._mObj.style.left;

                    this._mPopIFrame.style.width = this._mObj.style.width;
                    this._mPopIFrame.style.height = parseInt(this._mObj.style.height, 10) + 6;
                }
            }
        };

        NetFunnel.Popup.prototype.getObj = function (id) {
            return this._mDoc.getElementById(id);
        };

        NetFunnel.Popup.prototype.show = function () {
            var theBody = this._mDoc.getElementsByTagName("BODY")[0];
            if (!theBody) {
                return;
            }
            theBody.style.overflow = "auto";
            this._mObj.style.zIndex = this._mZindex + 2;
            this._mObj.style.visibility = "visible";
            this._mObj.style.display = "block";
            this._mMask.style.visiblity = "visible";
            this._mMask.style.display = "block";
            this._mPopIFrame.style.visiblity = "visible";
            this._mPopIFrame.style.display = "block";
            // this._mMask.style.height=NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc)+"px";
            // this._mPopIFrame.style.height=NetFunnel.PopupUtil.getDocumentEntireHeight(this._mDoc)+"px";
            this._mIsShown = true;
            this._centerPopWin();
            var loadingPopup = document.getElementById('NetFunnel_Loading_Popup');
            loadingPopup.tabIndex = 0;
            loadingPopup.focus();
        };

        NetFunnel.Popup.prototype.hide = function () {
            var theBody = this._mDoc.getElementsByTagName("BODY")[0];
            if (!theBody) {
                return;
            }
            theBody.style.overflow = "auto";
            this._mObj.style.visibility = "hidden";
            this._mObj.style.display = "none";
            this._mMask.style.visiblity = "hidden";
            this._mMask.style.display = "none";
            this._mPopIFrame.style.visiblity = "hidden";
            this._mPopIFrame.style.display = "none";
            this._mIsShown = false;

            var targetElementId = NetFunnel.gControl.getConfig('target_element_id');
            var targetElement = null;
            if (targetElementId !== '') {
                targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    if (this.oldStyle === '') {
                        targetElement.style.position = '';
                    } else {
                        targetElement.style.position = this.oldStyle;
                    }
                }
            }
        };

        NetFunnel.Popup.prototype.destroy = function () {
            // remove event handler;
            //removeEvent(window,"resize",NetFunnel.PopupUtil.resizePopup);
            //this.removeListener(window,"resize",NetFunnel.PopupUtil.resizePopup);
            //removeEvent(window,"scroll",NetFunnel.PopupUtil.resizePopup);

            // global list 에서 삭제
            var theBody = this._mDoc.getElementsByTagName("BODY")[0];
            if (!theBody) {
                return;
            }
            var tsize = NetFunnel.gPopup.length;

            try {
                var popmask = this._mDoc.getElementById('mpopup_bg');
                theBody.removeChild(popmask);
            } catch (e) {
                window.console && window.console.log('popup destory failed. ', e);

                // continue
            }

            try {
                var popiframe = this._mDoc.getElementById('pop_iframe');
                theBody.removeChild(popiframe);
            } catch (e) {
                window.console && window.console.log('popup destory failed. ', e);
                // continue
            }

            for (var i = 0; i < tsize; i++) {
                var tObj = NetFunnel.gPopup.pop();
                if (tObj.mid == this.mid) {
                    try {
                        theBody.removeChild(tObj._mObj);
                    } catch (e) {
                        window.console && window.console.log('popup destory failed. ', e);
                        // continue
                    }
                    //delete tObj;
                    continue;
                }
                NetFunnel.gPopup.push(tObj);
            }
            if (this._mProgress) {
                this._mProgress.hide();
            }
        };

        /**
         * RetVal Class 의 생성자.
         *
         * @classDescription NetFunnel에서 받아온 결과값을 Parsing해 준다.
         * @param {String} 결과 문자열
         */
        NetFunnel.RetVal = function (str) {
            this._mParam = {};
            this._mRtype = parseInt(str.substr(0, 4), 10);
            this._mCode = parseInt(str.substr(5, 3), 10);
            this._mRetStr = str.substr(9, str.length - 9);

            this._parse();
        };

        //-----------------------------------------------------------------------------
        // NetFunnel.RetVal private variable
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        // NetFunnel.RetVal public variable
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        // NetFunnel.RetVal private member function
        //-----------------------------------------------------------------------------
        /**
         * left trim
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} str Input String
         * @return {String} processed String
         */
        NetFunnel.RetVal.prototype._ltrim = function (str) {
            var k = 0;
            for (; k < str.length && this._isWhitespace(str.charAt(k)); k++) {
                continue;
            }
            return str.substring(k, str.length);
        };
        /**
         * right trim
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} str Input String
         * @return {String} processed String
         */
        NetFunnel.RetVal.prototype._rtrim = function (str) {
            var j = str.length - 1;
            for (; j >= 0 && this._isWhitespace(str.charAt(j)); j--) {
                continue;
            }
            return str.substring(0, j + 1);
        };

        /**
         * String trim
         *   - 문자열 앞뒤의 공백 제거
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} str Input String
         * @return {String} processed String
         */
        NetFunnel.RetVal.prototype._trim = function (str) {
            return this._ltrim(this._rtrim(str));
        };

        /**
         * 공백문자 여부 판다.
         *    - 공백문자 = " \t\n\r\f"
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} charToCheck 테스트 char
         * @return {Boolean} 공백여부
         */
        NetFunnel.RetVal.prototype._isWhitespace = function (charToCheck) {
            var whitespaceChars = " \t\n\r\f";
            return (whitespaceChars.indexOf(charToCheck) != -1);
        };

        /**
         * 입력된 결과값을 파싱해서 사용하기 편리한 형태로 저장 한다.
         *
         * @memberOf NetFunnel.RetVal
         * @return {null} 없음
         */
        NetFunnel.RetVal.prototype._parse = function () {
            var temp = "";
            var key = "";
            var value = "";
            var titem = this._mRetStr.split('&');
            for (var i = 0; titem.length > i; i++) {
                temp = titem[i].split('=');

                if (temp.length > 1) {
                    key = this._trim(temp[0]);
                    value = this._trim(temp[1]);

                    this._mParam[key] = value;
                }
            }
        };

        //-----------------------------------------------------------------------------
        // NetFunnel.RetVal public member function
        //-----------------------------------------------------------------------------
        /**
         * Return Code 전달
         *
         * @memberOf NetFunnel.RetVal
         * @return {Number} Return Code 값
         */
        NetFunnel.RetVal.prototype.getRetCode = function () {
            return this._mCode;
        };
        NetFunnel.RetVal.prototype.setRetCode = function (inCode) {
            this._mCode = inCode;
            return this._mCode;
        };
        /**
         * 요청 타입 (Request Type) 전달
         *
         * @memberOf NetFunnel.RetVal
         * @return {Number} Request Type 값
         */
        NetFunnel.RetVal.prototype.getReqType = function () {
            return this._mRtype;
        };
        NetFunnel.RetVal.prototype.setReqType = function (inType) {
            this._mRtype = inType;
            return this._mRtype;
        };
        /**
         * 결과 문자열 전달
         *
         * @memberOf NetFunnel.RetVal
         * @return {String} 생성시 입력되었던 결과 문자열
         */
        NetFunnel.RetVal.prototype.getRetStr = function () {
            return this._mRetStr;
        };

        /**
         * 결과값 요청
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} key 찾으려는 값의 key 문자열
         * @return {String} key에 해당하는 value 문자열
         */
        NetFunnel.RetVal.prototype.getValue = function (key) {
            try {
                return this._mParam[key];
            } catch (e) {
                return null;
            }
        };

        /**
         * 결과값 설정
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} key 설정하려는 값의 key 문자열
         * @param {String} value 설정하려는 값의 value 문자열
         * @return {String} 이전 Value 값
         */
        NetFunnel.RetVal.prototype.setValue = function (key, value) {
            var oldValue = null;
            try {
                if (this.isKeyExist(key)) {
                    oldValue = this.getValue(key);
                }

                this._mParam[key] = value;
                return oldValue;
            } catch (e) {
                return null;
            }
        };

        /**
         * 숫자형 결과값 요청
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} key 찾으려는 값의 key 문자열
         * @return {Number} key에 해당하는 value 숫자
         */
        NetFunnel.RetVal.prototype.getNumber = function (key) {
            try {
                return parseInt(this._mParam[key], 10);
            } catch (e) {
                return 0;
            }
        };

        /**
         * key 존재 여부 확인
         *
         * @memberOf NetFunnel.RetVal
         * @param {String} key 찾으려는 값의 key 문자열
         * @return {Boolean} key의 존재여부
         */
        NetFunnel.RetVal.prototype.isKeyExist = function (key) {
            try {
                if (this._mParam[key] !== null) {
                    return true;
                }
            } catch (e) {
                window.console && window.console.log('is key exist failed. ', e);
                // continue
            }
            return false;
        };

        /**
         * 전체 Parameter Object 요청
         *
         * @memberOf NetFunnel.RetVal
         * @return {Object} parameter들의 저장된 Object
         */
        NetFunnel.RetVal.prototype.getParam = function () {
            return this._mParam;
        };

        /**
         * TsClient Contructor
         *
         */
        NetFunnel.TsClient = function (oConfigs, oCallbacks) {
            this.mConfig = {};
            this.mConfig["host"] = NetFunnel.TS_HOST;
            this.mConfig["port"] = NetFunnel.TS_PORT;
            this.mConfig["proto"] = NetFunnel.TS_PROTO;
            this.mConfig["query"] = NetFunnel.TS_QUERY;
            this.mConfig["max_ttl"] = NetFunnel.TS_MAX_TTL;
            this.mConfig["conn_timeout"] = NetFunnel.TS_CONN_TIMEOUT;
            this.mConfig["conn_retry"] = NetFunnel.TS_CONN_RETRY;
            this.mConfig["cookie_id"] = NetFunnel.TS_COOKIE_ID;
            this.mConfig["cookie_time"] = NetFunnel.TS_COOKIE_TIME;
            this.mConfig["cookie_domain"] = NetFunnel.TS_COOKIE_DOMAIN;
            this.mConfig["showcnt_limit"] = NetFunnel.TS_SHOWCNT_LIMIT;
            this.mConfig["showtime_limit"] = NetFunnel.TS_SHOWTIME_LIMIT;
            this.mConfig["shownext_limit"] = NetFunnel.TS_SHOWNEXT_LIMIT;
            this.mConfig["popup_top"] = NetFunnel.TS_POPUP_TOP;
            this.mConfig["popup_left"] = NetFunnel.TS_POPUP_LEFT;
            this.mConfig["skin_id"] = NetFunnel.TS_SKIN_ID;
            this.mConfig["use_unfocus"] = NetFunnel.TS_USE_UNFOCUS;
            this.mConfig["virt_wait"] = NetFunnel.TS_VIRT_WAIT;
            this.mConfig["use_mobile_ui"] = NetFunnel.TS_USE_MOBILE_UI;
            this.mConfig["mp_use"] = NetFunnel.MP_USE;
            this.mConfig["use_frame_block"] = NetFunnel.TS_USE_FRAME_BLOCK;
            this.mConfig["frame_block_list"] = NetFunnel.TS_FRAME_BLOCK_LIST;
            this.mConfig["use_pre_wait"] = NetFunnel.TS_USE_PRE_WAIT;
            this.mConfig["popup_target"] = NetFunnel.TS_POPUP_TARGET;
            this.mConfig["user_data"] = false;
            this.mConfig["user_data_keys"] = NetFunnel.TS_USER_DATA_KEYS;
            this.mConfig["block_msg"] = NetFunnel.TS_BLOCK_MSG;
            this.mConfig["block_url"] = NetFunnel.TS_BLOCK_URL;
            this.mConfig["ipblock_wait_count"] = NetFunnel.TS_IPBLOCK_WAIT_COUNT;
            this.mConfig["ipblock_wait_time"] = NetFunnel.TS_IPBLOCK_WAIT_TIME;
            this.mConfig["service_id"] = NetFunnel.TS_SERVICE_ID;
            this.mConfig["action_id"] = NetFunnel.TS_ACTION_ID;
            this.mConfig["show_wait_popup"] = NetFunnel.TS_SHOW_WAIT_POPUP;
            this.mConfig["config_use"] = NetFunnel.TS_CONFIG_USE;
            this.mConfig["popup_zindex"] = NetFunnel.TS_POPUP_ZINDEX;
            this.mConfig["ip_error_retry"] = NetFunnel.TS_IP_ERROR_RETRY;
            this.mConfig["success_popup_visibility"] = NetFunnel.TS_SUCCESS_POPUP_VISIBILITY;
            this.mConfig["target_element_id"] = NetFunnel.TS_TARGET_ELEMENT_ID;

            this.mConfig["_host_changed"] = false;
            this.mConfig["_port_changed"] = false;
            this.mConfig["is_popup"] = false;

            // Validate configs
            if (typeof oConfigs == "object") {
                for (var sConfig in oConfigs) {
                    this.mConfig[sConfig] = oConfigs[sConfig];
                    if (sConfig == "host") {
                        this.mConfig["_host_changed"] = true;
                    }
                    if (sConfig == "port") {
                        this.mConfig["_port_changed"] = true;
                    }
                }
            }

            NetFunnel.gPopupLeft = this.mConfig["popup_left"];
            NetFunnel.gPopupTop = this.mConfig["popup_top"];
            // NetFunnel.gPopupLeft	= this.mConfig["popup_left"];
            NetFunnel.gBlockList = this.mConfig["block_list"];
            if (this.mConfig["skin_id"] == "") {
                NetFunnel.gSkinId = NetFunnel.TS_SKIN_ID;
            } else {
                NetFunnel.gSkinId = this.mConfig["skin_id"];
                var browserCheck = this.mConfig["skin_id"].split('|');
                if (browserCheck.length > 2) {
                    if (NetFunnel.BrowserDetect.browser == browserCheck[1] && parseInt(NetFunnel.BrowserDetect.version, 10) < parseInt(browserCheck[2], 10)) {
                        NetFunnel.gSkinId = 'default';
                    }
                }
            }

            if (typeof this.mConfig["use_unfocus"] != "boolean") {
                if (typeof this.mConfig["use_unfocus"] == "string" && this.mConfig["use_unfocus"] == "true") {
                    this.mConfig["use_unfocus"] = true;
                } else {
                    this.mConfig["use_unfocus"] = false;
                }
            }
            NetFunnel.gUseUnfocus = this.mConfig["use_unfocus"];

            if (typeof this.mConfig["use_mobile_ui"] != "boolean") {
                if (typeof this.mConfig["use_mobile_ui"] == "string" && this.mConfig["use_mobile_ui"] == "true") {
                    this.mConfig["use_mobile_ui"] = true;
                } else {
                    this.mConfig["use_mobile_ui"] = false;
                }
            }
            NetFunnel.gUseMobileUI = this.mConfig["use_mobile_ui"];

            if (typeof this.mConfig["use_frame_block"] != "boolean") {
                if (typeof this.mConfig["use_frame_block"] == "string" && this.mConfig["use_frame_block"] == "true") {
                    this.mConfig["use_frame_block"] = true;
                } else {
                    this.mConfig["use_frame_block"] = false;
                }
            }

            if (this.mConfig["use_frame_block"] == true) {
                if (this.mConfig["frame_block_list"].length < 1) {
                    // Select All
                    this.mConfig["frame_block_list"] = NetFunnel.Util.getFrameWindowList(this.mConfig["popup_target"]);
                }
            } else {
                this.mConfig["frame_block_list"] = [];
            }

            this.id = 0;
            NetFunnel.TsClient._Objects[this.id] = this;
            NetFunnel.TsClient._Count += 1;

            // Add Event Listener
            if (oCallbacks["onSuccess"]) {
                this.addListener(this, "onSuccess", oCallbacks["onSuccess"]);
            }
            if (oCallbacks["onContinued"]) {
                this.addListener(this, "onContinued", oCallbacks["onContinued"]);
            }
            if (oCallbacks["onBypass"]) {
                this.addListener(this, "onBypass", oCallbacks["onBypass"]);
            }
            if (oCallbacks["onBlock"]) {
                this.addListener(this, "onBlock", oCallbacks["onBlock"]);
            }
            if (oCallbacks["onIpBlock"]) {
                this.addListener(this, "onIpBlock", oCallbacks["onIpBlock"]);
            }
            if (oCallbacks["onError"]) {
                this.addListener(this, "onError", oCallbacks["onError"]);
            }
            if (oCallbacks["onStop"]) {
                this.addListener(this, "onStop", oCallbacks["onStop"]);
            }
            if (oCallbacks["onExpressnumber"]) {
                this.addListener(this, "onExpressnumber", oCallbacks["onExpressnumber"]);
            }

            this.counter[NetFunnel.RTYPE_NONE] = 0;
            this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER] = 0;
            this.counter[NetFunnel.RTYPE_GET_TID] = 0;
            this.counter[NetFunnel.RTYPE_CHK_ENTER] = 0;
            this.counter[NetFunnel.RTYPE_ALIVE_NOTICE] = 0;
            this.counter[NetFunnel.RTYPE_SET_COMPLETE] = 0;
            this.counter[NetFunnel.RTYPE_INIT] = 0;
            this.counter[NetFunnel.RTYPE_STOP] = 0;

            this.connTimeout = function connTimeout() {
                if (this != NetFunnel.gControl) {
                    return connTimeout.apply(NetFunnel.gControl, arguments);
                }
                if (NetFunnel.gAlreadyProc != 0) {
                    return false;
                }
                this._resetScript();

                if (this.counter[this._mReqType] < this.mConfig["conn_retry"]) {
                    this._mStatus = NetFunnel.PS_TIMEOUT;
                    this.counter[this._mReqType] += 1;

                    switch (this._mReqType) {
                        case NetFunnel.RTYPE_GET_TID:
                            this.getTicketID(this.user_id, this.user_tid, false);
                            return true;
                        case NetFunnel.RTYPE_CHK_ENTER:
                            this.chkEnter(this.key, false);
                            return true;
                        case NetFunnel.RTYPE_GET_TID_CHK_ENTER:
                            this.getTidChkEnter(this.user_id, this.user_tid, false);
                            return true;
                        case NetFunnel.RTYPE_ALIVE_NOTICE:
                            this.aliveNotice(this.key, "", "", false);
                            return true;
                        case NetFunnel.RTYPE_SET_COMPLETE:
                            this.setComplete(this.key, "", "", false);
                            return true;
                        default:
                    }
                }
                NetFunnel.PopupUtil.hideWaitPopup();

                if (this._mReqType == NetFunnel.RTYPE_CHK_ENTER || this._mReqType == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
                    var tStorage = new NetFunnel.Storage(2);
                    tStorage.setItem(this.mConfig["cookie_id"], "5002:200:key=" + NetFunnel.CONN_TIMEOUT_KEY, 1, this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                }

                if (NetFunnel.gAlreadyProc >= 1) {
                    return false;
                }

                this.fireEvent(null, this, 'onError', {
                    rtype: this._mReqType,
                    code: NetFunnel.kErrorSockConnect,
                    data: {
                        msg: "Connection Timeout"
                    },
                    next: this.next.error
                });
                this._mStatus = NetFunnel.PS_ERROR;
                return true;
            };
        };

        //-----------------------------------------------------------------------------
        // NetFunnelTsClient private variable
        //-----------------------------------------------------------------------------
        NetFunnel.TsClient._Count = 0;
        NetFunnel.TsClient._Objects = {};

        /**
         * NetFunnel.Event Class 상속
         */
        NetFunnel.TsClient.prototype = new NetFunnel.Event();

        /**
         * Init Done flag
         */
        NetFunnel.TsClient.prototype._initDone = false;

        //-----------------------------------------------------------------------------
        // NetFunnelTsClient public variable
        //-----------------------------------------------------------------------------
        /**
         * Object ID
         */
        NetFunnel.TsClient.prototype.id = null;

        /**
         * 설정정보

         */
        NetFunnel.TsClient.prototype.mConfig = null;

        /**
         * TS 서버 접속을 위한 key
         */
        NetFunnel.TsClient.prototype.key = null;

        /**
         * Script Object
         */
        NetFunnel.TsClient.prototype.script = null;

        /**
         * Alarm Object
         */
        NetFunnel.TsClient.prototype.alarm = null;

        /**
         * Alarm Object
         */
        NetFunnel.TsClient.prototype._mReqType = NetFunnel.RTYPE_NONE;

        /**
         * Previous Mouse Position
         */
        NetFunnel.TsClient.prototype._mMousePos = 0;

        /**
         * Action 이 없었던 누적 시간
         */
        NetFunnel.TsClient.prototype._mNoActTime = 0;

        /**
         * Process Status
         */
        NetFunnel.TsClient.prototype._mStatus = NetFunnel.PS_N_RUNNING;

        NetFunnel.TsClient.prototype.counter = {};

        /**
         * 성공및 실패시 이동할 경로
         */
        NetFunnel.TsClient.prototype.next = {
            success: "",
            error: ""
        };

        //-----------------------------------------------------------------------------
        // NetFunnel.TsClient Private member function
        //-----------------------------------------------------------------------------
        /**
         * 초기화
         *   - 객체를 생성한 후에 최초 1번 꼭 실행시켜 주어야 한다.
         *   - 초기화 성공여부는 isInitDone() 함수를 통해서 확인 활 수 있다.
         *
         * @memberOf NetFunnel.TsClient
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.init = function () {
            this._nCount++;
            this._initDone = true;
        };

        NetFunnel.TsClient.prototype.getConfig = function (key) {
            return this.mConfig[key];
        };

        /**
         * 사용자의 Action 이 있는지 여부 확인
         *   - 마우스의 움직으로 확인한다.
         *
         * @memberOf NetFunnel.TsClient
         * @return {Boolean} Action여부.
         */
        NetFunnel.TsClient.prototype._isNoAction = function () {
            if (this._mMousePos == NetFunnel.MouseX) {
                return true;
            }
            this._mMousePos = NetFunnel.MouseX;
            return false;
        };

        /**
         * Connection Timeout 을 체크하기 위한 타이머를 Reset
         *
         * @memberOf NetFunnel.TsClient
         * @return {Null} 없음
         */
        NetFunnel.TsClient.prototype._resetAlarm = function () {
            if (this.alarm !== null) {
                clearTimeout(this.alarm);
            }
            this.alarm = null;
        };

        /**
         * Ipblock 이벤트에 의한 재시도를 위한 타이머를 Reset
         *
         * @memberOf NetFunnel.TsClient
         * @return {Null} 없음
         */
        NetFunnel.TsClient.prototype._resetReTimer = function () {
            if (NetFunnel.gReTimer !== null) {
                clearTimeout(NetFunnel.gReTimer);
            }
            NetFunnel.gReTimer = null;
        };

        /**
         * Continued 이벤트에 의한 재시도를 위한 타이머를 Reset
         *
         * @memberOf NetFunnel.TsClient
         * @return {Null} 없음
         */
        NetFunnel.TsClient.prototype._resetRetryTimer = function () {
            if (this.retryTimer !== null) {
                clearTimeout(this.retryTimer);
            }
            this.retryTimer = null;
        };

        /**
         * Script Object를 초기화 한다.
         *
         * @memberOf NetFunnel.TsClient
         * @return {Null} 없음
         */
        NetFunnel.TsClient.prototype._resetScript = function () {
            try {
                if (this.script && typeof this.script == "object") {
                    var pNode = this.script.parentNode;
                    if (pNode && typeof pNode == "object") {
                        pNode.removeChild(this.script);
                    }
                }
            } catch (e) {
                window.console && window.console.log('reset script failed. ', e);
                // continue
            }
            this.script = null;
        };

        /**
         * user data를  리턴해 준다.
         *
         * @memberOf NetFunnel.TsClient
         * @return {string} userdata
         */
        NetFunnel.TsClient.prototype.getUserdata = function () {
            try {
                var userdata = "";
                var uKey = this.mConfig["user_data_keys"];

                if (typeof this.mConfig["user_data"] == "string") {
                    return this.mConfig["user_data"];
                }

                if (Object.prototype.toString.call(uKey).slice(8, -1) != "Array") {
                    return false;
                }

                for (var i = 0; i < uKey.length; i++) {
                    var keydata = uKey[i];
                    if (typeof keydata != "object") {
                        continue;
                    }

                    if (keydata.type == "v") {
                        try {
                            userdata = keydata.key;
                            if (userdata != "") {
                                break;
                            }
                        } catch (e) {
                            window.console && window.console.log('get user data failed. ', e);
                            // continue
                        }
                    }
                    if (keydata.type == "c") {
                        userdata = NetFunnel.Cookie.get(keydata.key);
                        if (userdata != "") {
                            break;
                        }
                    }
                }
                return userdata;
            } catch (e) {
                return false;
            }
        };

        /**
         * 사용자의 요청에 의한 결과 값을 Parsing 하고 알맞는 이벤트를 사용자에게
         * 돌려준다.
         *
         * @memberOf NetFunnel.TsClient
         * @return {Null} 없음
         */
        NetFunnel.TsClient.prototype._showResult = function () {
            // 팝업 재실행 방지
            if (NetFunnel.gIsPopupStarted && !NetFunnel.gPop) {
                NetFunnel.gIsPopupStarted = false;
                return;
            }
            NetFunnel.gIsPopupStarted = true;
            this._resetAlarm();
            if (NetFunnel.gAlreadyProc == 1 && NetFunnel.gRtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
                return;
            }
            NetFunnel.gAlreadyProc = 1;
            NetFunnel.PopupUtil.hideWaitPopup();
            this.retval = new NetFunnel.RetVal(this.result);
            // 받아온 값을 쿠키에 저장
            if (this.retval.getReqType() == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
                this.retval.setReqType(NetFunnel.RTYPE_CHK_ENTER);
            }
            if (NetFunnel.TS_DEBUG_MODE) NetFunnel.printDebugMsg("recv", this.result);

            NetFunnel.ttl = 0;
            this.counter[this._mReqType] = 0;
            if (this.retval.getRetCode() == NetFunnel.kContinueDebug) {
                NetFunnel.gDebugflag = true;
            } else {
                NetFunnel.gDebugflag = false;
            }

            switch (this.retval.getReqType()) {
                case NetFunnel.RTYPE_GET_TID:
                    this._showResultGetTicketID(this.retval);
                    break;
                case NetFunnel.RTYPE_CHK_ENTER:
                    this._showResultChkEnter(this.retval);
                    break;
                case NetFunnel.RTYPE_ALIVE_NOTICE:
                    this._showResultAliveNotice(this.retval);
                    break;
                case NetFunnel.RTYPE_SET_COMPLETE:
                    this._showResultSetComplete(this.retval);
                    break;
                default:
                    var tStorage = new NetFunnel.Storage(2);
                    tStorage.removeItem(this.mConfig["cookie_id"]);
                    this.fireEvent(null, this, 'onError', {
                        rtype: NetFunnel.RTYPE_NONE,
                        code: this.retval.getRetCode(),
                        data: this.retval.getParam(),
                        next: this.next.error
                    });
                    this._mStatus = NetFunnel.PS_ERROR;
            }
        };

        NetFunnel.TsClient.prototype._showResultGetTicketID = function (retval) {
            var tStorage = new NetFunnel.Storage(2);
            switch (retval.getRetCode()) {
                case NetFunnel.kSuccess:
                case NetFunnel.kTsBypass:
                case NetFunnel.kTsExpressNumber:
                    // Success Event
                    tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onSuccess', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.success
                    });
                    break;
                default:
                    // Fail Event
                    tStorage.removeItem(this.mConfig["cookie_id"]);
                    this._mStatus = NetFunnel.PS_ERROR;
                    this.fireEvent(null, this, 'onError', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.error
                    });
            }
            return;
        };

        NetFunnel.TsClient.prototype._showResultChkEnter = function (retval) {
            var self = this;
            var tStorage = new NetFunnel.Storage(2);
            switch (retval.getRetCode()) {
                case NetFunnel.kSuccess:
                    // Success Event
                    tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    NetFunnel.gNWaitTemp = 0;
                    NetFunnel.gNWaitCount = 0;
                    this.fireEvent(null, this, 'onSuccess', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.success
                    });
                    break;
                case NetFunnel.kContinueDebug:
                case NetFunnel.kContinue:
                    // Continued Event
                    this._mStatus = NetFunnel.PS_CONTINUE;

                    // ReTry
                    var ttl = retval.getNumber('ttl');
                    if (ttl > this.mConfig["max_ttl"]) {
                        ttl = this.mConfig["max_ttl"];
                        retval.setValue('ttl', ttl);
                    }

                    // NWait Bypass Process
                    var nwait = retval.getNumber('nwait');

                    if (NetFunnel.TS_NWAIT_BYPASS) {
                        if (NetFunnel.gNWaitTemp == nwait) {
                            NetFunnel.gNWaitCount += 1;
                        } else {
                            NetFunnel.gNWaitTemp = nwait;
                            NetFunnel.gNWaitCount = 0;
                        }

                        if (NetFunnel.TS_MAX_NWAIT_COUNT <= NetFunnel.gNWaitCount) {
                            this.fireEvent(null, this, 'onSuccess', {
                                rtype: retval.getReqType(),
                                code: retval.getRetCode(),
                                data: retval.getParam(),
                                next: this.next.success
                            });
                            break;
                        }
                    }

                    this.fireEvent(null, this, 'onContinued', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.continued
                    });
                    NetFunnel.gAlreadyProc = 0;

                    if (ttl > 0 && this._mStatus != NetFunnel.PS_N_RUNNING) {
                        if (this.retryTimer) {
                            clearTimeout(this.retryTimer);
                        }
                        NetFunnel.ttl = ttl;
                        this.retryTimer = setTimeout(function () {
                            self.chkEnterCont(self.retval.getValue("key"));
                        }, ttl * 1000);
                    }

                    break;
                case NetFunnel.kTsBlock:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                    this.fireEvent(null, this, 'onBlock', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.block
                    });
                    if (this.retryTimer) {
                        clearTimeout(this.retryTimer);
                    }
                    NetFunnel.ttl = ttl;

                    break;
                case NetFunnel.kTsIpBlock:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    if (this.retryTimer) {
                        clearTimeout(this.retryTimer);
                    }

                    NetFunnel.gAlreadyProc = 0;
                    if (this.mConfig["ipblock_wait_count"] >= NetFunnel.gIPBlockWaitCount + 1) {
                        //NetFunnel.gReTimer = setTimeout("NetFunnel.gControl.getTidChkEnter('','','true')",this.mConfig["ipblock_wait_time"]);
                        NetFunnel.gReTimer = setTimeout(function () {
                            self.getTidChkEnter(self.user_id, self.user_tid, true);
                        }, this.mConfig["ipblock_wait_time"]);
                    } else {
                        tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                        this._mStatus = NetFunnel.PS_N_RUNNING;
                        this.fireEvent(null, this, 'onSuccess', {
                            rtype: retval.getReqType(),
                            code: retval.getRetCode(),
                            data: retval.getParam(),
                            next: this.next.success
                        });
                        break;
                    }

                    this.fireEvent(null, this, 'onIpBlock', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.ipblock
                    });

                    if (this.mConfig["ipblock_wait_count"] != 0) {
                        NetFunnel.gIPBlockWaitCount += 1;
                    }
                    break;
                case NetFunnel.kTsBypass:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                    this.fireEvent(null, this, 'onBypass', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.bypass
                    });
                    break;
                case NetFunnel.kTsExpressNumber:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);
                    this.fireEvent(null, this, 'onExpressnumber', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.expressnumber
                    });
                    break;
                default:
                    // Fail Event
                    tStorage.removeItem(this.mConfig["cookie_id"]);
                    this._mStatus = NetFunnel.PS_ERROR;

                    if (retval.getRetCode() == NetFunnel.kTsErrorInvalidIp && this.mConfig["ip_error_retry"] == true) {
                        // 만약 Invalid IP일 경우 (스마트폰, 노트북의 경우) 처음부터 다시 디기를 시작한다.
                        NetFunnel.gAlreadyProc = 0;
                        this._mStatus = NetFunnel.PS_N_RUNNING;
                        NetFunnel.gReTimer = setTimeout(function () {
                            self.getTidChkEnter(self.user_id, self.user_tid, true, NetFunnel.gTotWait);
                        }, 100);
                    } else {
                        this._mStatus = NetFunnel.PS_ERROR;
                        this.fireEvent(null, this, 'onError', {
                            rtype: retval.getReqType(),
                            code: retval.getRetCode(),
                            data: retval.getParam(),
                            next: this.next.error
                        });
                    }
            }
            return;
        };

        NetFunnel.TsClient.prototype._showResultAliveNotice = function (retval) {
            var tStorage = new NetFunnel.Storage(2);
            switch (retval.getRetCode()) {
                case NetFunnel.kSuccess:
                    // Success Event
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onSuccess', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.success
                    });
                    break;
                case NetFunnel.kContinueDebug:
                case NetFunnel.kContinue:
                    // Continued Event
                    this._mStatus = NetFunnel.PS_CONTINUE;
                    if (this._mNoActTime > this.mConfig["no_action"]) {
                        this.fireEvent(null, this, 'onError', {
                            rtype: retval.getReqType(),
                            code: NetFunnel.kTsErrorNoUserAction,
                            data: retval.getParam(),
                            next: this.next.error
                        });
                        this._mNoActTime = 0;
                        this._mStatus = NetFunnel.PS_ERROR;
                        break;
                    }

                    var ttl = retval.getNumber('ttl');
                    if (ttl > this.mConfig["max_ttl"]) {
                        ttl = this.mConfig["max_ttl"];
                        retval.setValue('ttl', ttl);
                    }

                    this.fireEvent(null, this, 'onContinued', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.continued
                    });
                    NetFunnel.gAlreadyProc = 0;

                    if (ttl > 0 && this._mStatus != NetFunnel.PS_N_RUNNING) {
                        if (this.retryTimer) {
                            clearTimeout(this.retryTimer);
                        }
                        if (this._isNoAction()) {
                            this._mNoActTime += ttl;
                        } else {
                            this._mNoActTime = 0;
                        }

                        // ***** AliveNotice 요청후 Return된 Key를 Storage(Cookie)에 Update하는 루틴 추가
                        tStorage.setItem(this.mConfig["cookie_id"], this.result, this.mConfig["cookie_time"], this.mConfig["cookie_domain"], this.mConfig["is_popup"]);

                        var self = this;
                        //this.retryTimer = setTimeout("NetFunnel.aliveNoticeCont("+this.id+")",ttl*1000);
                        this.retryTimer = setTimeout(function () {
                            var key = tStorage.getItem(self.mConfig["cookie_id"]);
                            key && self.aliveNoticeCont(self.retval.getValue("key"), self.retval.getValue("ip"), self.retval.getValue("port"), self.retval.getValue("first"));
                        }, ttl * 1000);
                    }

                    break;
                case NetFunnel.kTsBlock:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onBlock', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.block
                    });
                    break;
                case NetFunnel.kTsExpressNumber:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onExpressnumber', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.expressnumber
                    });
                    break;
                case NetFunnel.kTsBypass:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onBypass', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.bypass
                    });
                    break;
                case NetFunnel.kTsIpBlock:
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onIpBlock', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.ipblock
                    });
                    break;
                default:
                    // Fail Event
                    if (retval.getRetCode() == NetFunnel.kErrorExpiredTime) {
                        tStorage.removeItem(this.mConfig["cookie_id"]);
                    }
                    this._mStatus = NetFunnel.PS_ERROR;
                    this.fireEvent(null, this, 'onError', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.error
                    });

            }
            return;
        };

        NetFunnel.TsClient.prototype._showResultSetComplete = function (retval) {
            var tStorage = new NetFunnel.Storage(2);
            tStorage.removeItem(this.mConfig["cookie_id"]);

            switch (retval.getRetCode()) {
                case NetFunnel.kSuccess:
                    // Success Event
                    this._mStatus = NetFunnel.PS_N_RUNNING;
                    this.fireEvent(null, this, 'onSuccess', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.success
                    });
                    break;
                default:
                    // Fail Event
                    this._mStatus = NetFunnel.PS_ERROR;
                    this.fireEvent(null, this, 'onError', {
                        rtype: retval.getReqType(),
                        code: retval.getRetCode(),
                        data: retval.getParam(),
                        next: this.next.error
                    });
            }
            return;
        };

        /**
         * 신규 접속을 위한 접속정보 초기화
         *
         * @memberOf NetFunnelTsClient
         * @param {Number} rtype 요청 타입
         * @return {Boolean} 초기화 성공여부
         */
        NetFunnel.TsClient.prototype._connInit = function (rtype) {
            this.result = null;
            this._mReqType = rtype;
            this._resetAlarm();
            this._resetScript();
            this._resetRetryTimer();
            //this.alarm = setTimeout("NetFunnel.connTimeout("+this.id+")",parseInt(this.mConfig["conn_timeout"])*1000);
            var self = this;
            this.alarm = setTimeout(function () {
                self.connTimeout(0);
            }, parseInt(this.mConfig["conn_timeout"], 10) * 1000);

            if (!this.mConfig["host"] || this.mConfig["host"] == "") {
                return false;
            }
            if (!this.mConfig["port"] || this.mConfig["port"] == "") {
                return false;
            }
            if (!this.mConfig["query"] || this.mConfig["query"] == "") {
                return false;
            }
            if (!this.mConfig["service_id"] || this.mConfig["service_id"] == "") {
                return false;
            }
            if (!this.mConfig["action_id"] || this.mConfig["action_id"] == "") {
                return false;
            }
            this._mStatus = NetFunnel.PS_RUNNING;
            return true;
        };

        /**
         * TS 서버로 요청 전송
         *
         * @memberOf NetFunnelTsClient
         * @param {String} url 요청 URL
         * @return {Boolean} 요청 성공여부
         */
        NetFunnel.TsClient.prototype._sendRequest = function (url) {
            // 1. Script 객체 생성
            this.script = document.createElement("script");

            // 2. Script 객체에 URL 등록, Head에 Script 등록
            this.script.src = url;
            var head = document.getElementsByTagName("head").item(0);

            if (NetFunnel.TS_DEBUG_MODE) NetFunnel.printDebugMsg("send", url);
            head.appendChild(this.script);
            return true;
        };

        /**
         * 에러 전달
         *
         * @memberOf NetFunnelTsClient
         * @param {Number} eRType 요청 타입
         * @param {Number} eCode 결과값 코드
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype._sendError = function (eRType, eCode) {
            var tMsg = "";
            switch (eCode) {
                case NetFunnel.kErrorAlready:
                    tMsg = "Already running";
                    break;
                case NetFunnel.kErrorNoinit:
                    tMsg = "Uninitialized object";
                    break;
                case NetFunnel.kErrorSystem:
                default:
                    tMsg = "System error";

            }
            this.fireEvent(null, this, 'onError', {
                rtype: eRType,
                code: eCode,
                data: {
                    msg: tMsg
                },
                next: this.next.error
            });
        };

        //-----------------------------------------------------------------------------
        // NetFunnel.TsClient public member function
        //-----------------------------------------------------------------------------

        /**
         * 명령 성공시 이동하게될 URL를 설정한다.
         *   - DefaultCallback 을 사용할때만 유효하며 Callback 함수를 지정했다면
         *     사용되지 않는다.
         *
         * @memberOf NetFunnelTsClient
         * @param {String} success 명령 성공시 이동할 URL
         * @param {String} error 명령 실패시 이동할 URL
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.setNext = function (next) {
            if (typeof next == "object") {
                this.next = next;
            } else {
                try {
                    this.next.success = undefined;
                    this.next.continued = undefined;
                    this.next.bypass = undefined;
                    this.next.expressnumber = undefined;
                    this.next.block = undefined;
                    this.next.ipblock = undefined;
                    this.next.error = undefined;
                    this.next.stop = undefined;
                } catch (e) {
                    this.next.success = window.undefined;
                    this.next.continued = window.undefined;
                    this.next.bypass = window.undefined;
                    this.next.expressnumber = window.undefined;
                    this.next.block = window.undefined;
                    this.next.ipblock = window.undefined;
                    this.next.error = window.undefined;
                    this.next.stop = window.undefined;
                }
            }
        };

        /**
         * 실행중인 명령 멈춤 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.sendStop = function (first) {
            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }

            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_STOP] = 0;
            }

            this._resetReTimer();
            this._resetAlarm();
            this._resetRetryTimer();
            this._resetScript();
            this.fireEvent(null, this, 'onSuccess', {
                rtype: this._mReqType,
                code: NetFunnel.kSuccess,
                data: {},
                next: this.next.success
            });

            this._mStatus = NetFunnel.PS_N_RUNNING;
            return true;
        };

        /**
         * TicketID 요청 명령 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @param {String} userId 사용자ID
         * @param {String} userTid 사용자TID (서비스에 사용되는 Ticket에 대한 식별자)
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.getTicketID = function (userId, userTid, first) {
            NetFunnel.gPrevWaitTime = -1;
            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }

            if (this.mConfig["use_unfocus"] == true) {
                NetFunnel.Util.delFocus(this.getConfig("popup_target"));
            }

            NetFunnel.gTotWait = -1;
            NetFunnel.retryData = null;
            var ret = (this.mConfig["mp_use"] == true) ? NetFunnel.MProtect() : 0;

            if (ret != 0) {
                // Virtual Wait alert!!
                this.fireEvent(null, this, 'onContinued', {
                    rtype: NetFunnel.RTYPE_CHK_ENTER,
                    code: NetFunnel.kContinue,
                    data: {
                        tps: 1,
                        eps: 2,
                        nwait: (NetFunnel.gControl.getConfig("showcnt_limit") * 2),
                        mprotect: ret,
                        ttl: 10
                    }
                });

                // retry Command
                if (this.retryTimer) {
                    clearTimeout(this.retryTimer);
                }
                NetFunnel.retryData = {
                    user_id: userId,
                    user_tid: userTid,
                    first: first
                };
                //this.retryTimer = setTimeout("NetFunnel.retryFunction("+NetFunnel.RTYPE_GET_TID+")",this.mConfig["virt_wait"]);
                var self = this;
                this.retryTimer = setTimeout(function () {
                    self.retryFunction(NetFunnel.RTYPE_GET_TID);
                }, this.mConfig["virt_wait"]);
                return false;
            }

            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_GET_TID] = 0;
            }

            // 0. 실행중인지 여부 확인
            if (this._mStatus == NetFunnel.PS_RUNNING) {
                this._sendError(NetFunnel.RTYPE_GET_TID, NetFunnel.kErrorAlready);
                return false;
            }

            this.user_id = userId;
            this.user_tid = userTid;

            // 2. URL 생성
            var url = this.mConfig['proto'] + "://" + this.mConfig["host"] + ":" + this.mConfig["port"] + "/" + this.mConfig["query"] + "?opcode=" + NetFunnel.RTYPE_GET_TID + "&nfid=" + this.id + "&prefix=NetFunnel.gRtype=" + NetFunnel.RTYPE_GET_TID + ";";
            url += "&sid=" + this.mConfig['service_id'] + "&aid=" + this.mConfig["action_id"];

            var userdata = this.getUserdata();

            if (userdata != "") {
                url += "&user_data=" + userdata;
            }

            url += "&js=yes";

            var tdate = new Date();
            url += "&" + tdate.getTime();

            // 1. 초기화
            if (!this._connInit(NetFunnel.RTYPE_GET_TID)) {
                this._sendError(NetFunnel.RTYPE_GET_TID, NetFunnel.kErrorNoinit);
                return false;
            }

            this._sendRequest(url);

            return true;
        };

        /**
         * 진입 요청 명령 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @param {String} key getTicketID를 통해 전달받은 식별자
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.chkEnter = function (key, first) {
            // 0. 실행중인지 여부 확인
            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }

            if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
                this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
                return false;
            }
            return this.chkEnterProc(key, first);
        };

        NetFunnel.TsClient.prototype.chkEnterCont = function (key, first) {
            // 0. 실행중인지 여부 확인
            if (this._mStatus == NetFunnel.PS_RUNNING) {
                this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
                return false;
            }
            return this.chkEnterProc(key, first);
        };

        NetFunnel.TsClient.prototype.chkEnterProc = function (key, first) {
            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_CHK_ENTER] = 0;
            }

            if (!key || key == "") {
                if (this.key) {
                    key = this.key;
                } else {
                    this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorParam);
                    return false;
                }
            }

            this.key = key;
            var ip = this.retval.getValue("ip");

            if (this.mConfig["conn_retry"] > 1 && this.counter[this._mReqType] == (this.mConfig["conn_retry"])) {
                ip = this.mConfig["config_use"];
            }
            var port = this.retval.getValue("port");

            var url = "";
            if (ip && ip != "" && port && port != "" && !this.mConfig["config_use"]) {
                url = this.mConfig['proto'] + "://" + ip + ":" + port + "/";
            } else {
                url = this.mConfig['proto'] + "://" + this.mConfig["host"] + ":" + this.mConfig["port"] + "/";
            }
            url = url + this.mConfig["query"] + "?opcode=" + NetFunnel.RTYPE_CHK_ENTER + "&key=" + key + "&nfid=" + this.id + "&prefix=NetFunnel.gRtype=" + NetFunnel.RTYPE_CHK_ENTER + ";";
            //var url = this.mConfig['proto']+"://"+this.mConfig["host"]+":"+this.mConfig["port"]+"/"+this.mConfig["query"]+"?opcode="+NetFunnel.RTYPE_CHK_ENTER+"&key="+key+"&nfid="+this.id+"&prefix=NetFunnel.gRtype="+NetFunnel.RTYPE_CHK_ENTER+";";

            if (NetFunnel.ttl > 0) {
                url = url + "&ttl=" + NetFunnel.ttl;
            }
            url += "&sid=" + this.mConfig['service_id'] + "&aid=" + this.mConfig["action_id"];
            var userdata = this.getUserdata();

            if (userdata != "") {
                url += "&user_data=" + userdata;
            }

            url += "&js=yes";
            var tdate = new Date();
            url += "&" + tdate.getTime();

            // 1. 초기화
            if (!this._connInit(NetFunnel.RTYPE_CHK_ENTER)) {
                this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorNoinit);
                return false;
            }

            this._sendRequest(url);
            return true;
        };

        /**
         * ID발급 + 진입 요청 명령 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @param {String} user_id 사용자ID
         * @param {String} user_tid 사용자TID (서비스에 사용되는 Ticket에 대한 식별자)
         * @return {null} 없음.
         */
        NetFunnel.retryData = null;
        NetFunnel.retryFunction = function (type) {
            if (typeof NetFunnel.retryData == "object") {
                var t = NetFunnel.retryData;
                if (type == NetFunnel.RTYPE_GET_TID) {
                    NetFunnel.gControl.getTicketID(t.user_id, t.user_tid, t.first);
                } else if (type == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
                    NetFunnel.gControl.getTidChkEnter(t.user_id, t.user_tid, t.first);
                }
            }
        };
        NetFunnel.TsClient.prototype.getTidChkEnter = function (userId, userTid, first, totalWait) {
            NetFunnel.gPrevWaitTime = -1;
            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }

            // 0. 실행중인지 여부 확인
            if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
                this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
                return false;
            }

            if (this.mConfig["use_unfocus"] == true) {
                NetFunnel.Util.delFocus(this.getConfig("popup_target"));
            }

            NetFunnel.gTotWait = (totalWait == undefined || isNaN(totalWait)) ? -1 : totalWait;
            NetFunnel.retryData = null;
            var ret = (this.mConfig["mp_use"] == true) ? NetFunnel.MProtect() : 0;
            if (ret == 0 && this.mConfig["show_wait_popup"] == false) {
                // Debug code --------------------------------------------------------
                //var mmm = document.getElementById("debug_print");
                //mmm.innerHTML = "";
                // Debug code --------------------------------------------------------

                if (this.getConfig("use_pre_wait")) {
                    NetFunnel.PopupUtil.showWaitPopup();
                }
                return (this.getTidChkEnterProc(userId, userTid, first));
            }
            // Virtual Wait alert!!
            this.fireEvent(null, this, 'onContinued', {
                rtype: NetFunnel.RTYPE_CHK_ENTER,
                code: NetFunnel.kContinue,
                data: {
                    tps: 1,
                    eps: 2,
                    nwait: (NetFunnel.gControl.getConfig("showcnt_limit") * 2),
                    mprotect: ret,
                    ttl: 10
                }
            });

            // retry Command
            if (this.retryTimer) {
                clearTimeout(this.retryTimer);
            }
            NetFunnel.retryData = {
                user_id: userId,
                user_tid: userTid,
                first: first
            };

            this.retryTimer = setTimeout(function () {
                NetFunnel.retryFunction(NetFunnel.RTYPE_GET_TID_CHK_ENTER);
            }, this.mConfig["virt_wait"]);

            //this.retryTimer = setTimeout("NetFunnel.retryFunction("+NetFunnel.RTYPE_GET_TID_CHK_ENTER+")",this.mConfig["virt_wait"]);
            return false;
        };

        NetFunnel.TsClient.prototype.getTidChkEnterProc = function (userId, userTid, first) {
            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER] = 0;
            }

            this.user_id = userId;
            this.user_tid = userTid;

            var url = this.mConfig['proto'] + "://" + this.mConfig["host"] + ":" + this.mConfig["port"] + "/" + this.mConfig["query"] + "?opcode=" + NetFunnel.RTYPE_GET_TID_CHK_ENTER + "&nfid=" + this.id + "&prefix=NetFunnel.gRtype=" + NetFunnel.RTYPE_GET_TID_CHK_ENTER + ";";
            if (NetFunnel.ttl > 0) {
                url = url + "&ttl=" + NetFunnel.ttl;
            }
            url += "&sid=" + this.mConfig['service_id'] + "&aid=" + this.mConfig["action_id"];
            url += "&js=yes";

            var userdata = this.getUserdata();

            if (userdata != "") {
                url += "&user_data=" + userdata;
            }

            var tdate = new Date();
            url += "&" + tdate.getTime();

            // 1. 초기화
            if (!this._connInit(NetFunnel.RTYPE_GET_TID_CHK_ENTER)) {
                this._sendError(NetFunnel.RTYPE_GET_TID_CHK_ENTER, NetFunnel.kErrorNoinit);
                return false;
            }

            this._sendRequest(url);

            return true;
        };

        /**
         * Alive Notice 요청 명령 전송
         *  - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
         *    client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
         *    알려 주게 되며 flash client에서 자동으로 재전송하게 된다.
         *
         *   - Event
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @param {String} key chkEnter를 통해 전달받은 식별자
         * @param {String} ip TS서버 IP 정보
         * @param {Number} port TS서버 Port 정보
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.aliveNoticeProc = function (key, ip, port, first) {
            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_ALIVE_NOTICE] = 0;
            }

            if (!key || key == "") {
                if (this.key) {
                    key = this.key;
                } else {
                    this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorParam);
                    return false;
                }
            }

            this.key = key;
            this.ip = ip;
            this.port = port;

            if (this.mConfig["conn_retry"] > 1 && (this.counter[this._mReqType] == this.mConfig["conn_retry"])) {
                ip = this.mConfig["config_use"];
            }

            var url = "";
            if (ip && ip != "" && port && port != "" && !this.mConfig["config_use"]) {
                this.ip = (this.mConfig["_host_changed"] == false) ? ip : this.mConfig["host"];
                this.port = (this.mConfig["_port_changed"] == false) ? port : this.mConfig["port"];
                url = this.mConfig['proto'] + "://" + this.ip + ":" + this.port + "/";
            } else {
                url = this.mConfig['proto'] + "://" + this.mConfig["host"] + ":" + this.mConfig["port"] + "/";
            }
            url = url + this.mConfig["query"] + "?opcode=" + NetFunnel.RTYPE_ALIVE_NOTICE + "&key=" + key + "&nfid=" + this.id + "&prefix=NetFunnel.gRtype=" + NetFunnel.RTYPE_ALIVE_NOTICE + ";";
            url += "&sid=" + this.mConfig['service_id'] + "&aid=" + this.mConfig["action_id"];

            var userdata = this.getUserdata();

            if (userdata != "") {
                url += "&user_data=" + userdata;
            }

            url += "&js=yes";
            var tdate = new Date();
            url += "&" + tdate.getTime();

            // 1. 초기화
            if (!this._connInit(NetFunnel.RTYPE_ALIVE_NOTICE)) {
                this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorNoinit);
                return false;
            }

            this._sendRequest(url);
            return true;
        };

        NetFunnel.TsClient.prototype.aliveNotice = function (key, ip, port, first) {
            // 0. 실행중인지 여부 확인
            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }
            if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
                this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorAlready);
                return false;
            }
            return this.aliveNoticeProc(key, ip, port, first);
        };

        NetFunnel.TsClient.prototype.aliveNoticeCont = function (key, ip, port, first) {
            // 0. 실행중인지 여부 확인
            if (this._mStatus == NetFunnel.PS_RUNNING) {
                this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorAlready);
                return false;
            }
            return this.aliveNoticeProc(key, ip, port, first);
        };

        /**
         * 완료 요청 명령 전송
         *   - 모든 프로세스가 종료 되었을때 호출 한다.
         *   - 완료 후 이명령을 호출하지 않으면 시스템의 가용성이 저하되며, 정확한 통계정보를 얻을 수 없다.
         *
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @memberOf NetFunnelTsClient
         * @param {String} key chkEnter를 통해 전달받은 식별자
         * @param {String} ip TS서버 IP 정보
         * @param {Number} port TS서버 Port 정보
         * @return {null} 없음.
         */
        NetFunnel.TsClient.prototype.setComplete = function (key, ip, port, first) {
            var Storage = new NetFunnel.Storage();
            Storage.setItemStorageOnly("NFMPT.reqCnt", "0");

            if (NetFunnel.TS_BYPASS == true) {
                this.fireEvent(null, this, 'onSuccess', {
                    rtype: this._mReqType,
                    code: NetFunnel.kSuccess,
                    data: {},
                    next: this.next.success
                });
                return true;
            }

            if (first == 'undefined') {
                first = true;
            }
            if (first) {
                this.counter[NetFunnel.RTYPE_SET_COMPLETE] = 0;
            }

            // 0. 실행중인지 여부 확인
            if (this._mStatus == NetFunnel.PS_RUNNING) {
                this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorAlready);
                return false;
            }

            if (!key || key == "") {
                if (this.key) {
                    key = this.key;
                } else {
                    this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorParam);
                    return false;
                }
            }
            this.key = key;
            this.ip = ip;
            if (this.mConfig["conn_retry"] > 1 && this.counter[this._mReqType] == (this.mConfig["conn_retry"] - 1)) {
                ip = this.mConfig["config_use"];
            }
            this.port = port;

            if (key == NetFunnel.CONN_TIMEOUT_KEY) {
                var retval = new NetFunnel.RetVal(NetFunnel.RTYPE_SET_COMPLETE + ':' + NetFunnel.kSuccess + ":utime=1");
                this._showResultSetComplete(retval);
                return true;
            }

            var url = "";

            if (ip && ip != "" && port && port != "" && !this.mConfig["config_use"]) {
                this.ip = (this.mConfig["_host_changed"] == false) ? ip : this.mConfig["host"];
                this.port = (this.mConfig["_port_changed"] == false) ? port : this.mConfig["port"];
                url = this.mConfig['proto'] + "://" + this.ip + ":" + this.port + "/";
            } else {
                url = this.mConfig['proto'] + "://" + this.mConfig["host"] + ":" + this.mConfig["port"] + "/";
            }
            url = url + this.mConfig["query"] + "?opcode=" + NetFunnel.RTYPE_SET_COMPLETE + "&key=" + key + "&nfid=" + this.id + "&prefix=NetFunnel.gRtype=" + NetFunnel.RTYPE_SET_COMPLETE + ";";

            var userdata = this.getUserdata();

            if (userdata != "") {
                url += "&user_data=" + userdata;
            }

            url += "&js=yes";
            var tdate = new Date();
            url += "&" + tdate.getTime();

            // 1. 초기화
            if (!this._connInit(NetFunnel.RTYPE_SET_COMPLETE)) {
                this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorNoinit);
                return false;
            }

            this._sendRequest(url);
            return true;
        };

        /**
         * NetFunnel 쿠키 존재 여부
         *
         * @memberOf NetFunnelTsClient
         * @return {boolean} 쿠키존재 여부
         */
        NetFunnel.TsClient.prototype.cookieExist = function () {
            var tStorage = new NetFunnel.Storage(2);
            var result = tStorage.getItem(this.mConfig["cookie_id"]);
            if (result == false || result == "") {
                return false;
            }

            var retval = new NetFunnel.RetVal(result);
            var key = retval.getValue("key");
            if (!key) {
                tStorage.removeItem(this.mConfig["cookie_id"]);
                return false;
            }
            return true;
        };

        /**
         * NetFunnel 구동중 여부
         *
         * @memberOf NetFunnelTsClient
         * @return {boolean} 구동중 여부
         */
        NetFunnel.TsClient.prototype.isRunning = function () {
            if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
                return true;
            }
            return false;
        };

        /**
         * 초기화 요청
         *
         *  - CallBack
         *		* onSuccess   : 성공시 호출되는 함수
         *		* onContinued : ttl 이 전달된 경우 호출되는 함수 ( 호출후에 ttl 만큼 sleep 한다. )
         *		* onError     : 에러 발생시 호출되는 함수
         *
         *
         * @param {Object|String} oFlash Flash Object에 대한 이름이나 Object 객체
         * @param {Object} oConfigs 설정정보
         * @param {Object} oCallbacks 이벤트에 대한 Callback 함수 정의
         * @return {Boolean} 객체생성 성공 여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_init(oFlash, oConfigs, oCallbacks) {
            'use strict';
            NetFunnel.gIsPopupStarted = false; // 팝업 재실행 방지 플래그

            if (NetFunnel.gControl) {
                NetFunnel.gControl._resetScript();
                NetFunnel.gControl = null;
            }

            if (typeof oCallbacks == "undefined") {
                oCallbacks = NetFunnel.DefaultCallback;
            } else {
                if (!oCallbacks["onSuccess"]) {
                    oCallbacks["onSuccess"] = NetFunnel.DefaultCallback["onSuccess"];
                }
                if (!oCallbacks["onContinued"]) {
                    oCallbacks["onContinued"] = NetFunnel.DefaultCallback["onContinued"];
                }
                if (!oCallbacks["onError"]) {
                    oCallbacks["onError"] = NetFunnel.DefaultCallback["onError"];
                }
                if (!oCallbacks["onStop"]) {
                    oCallbacks["onStop"] = NetFunnel.DefaultCallback["onStop"];
                }
                if (!oCallbacks["onBypass"]) {
                    oCallbacks["onBypass"] = NetFunnel.DefaultCallback["onBypass"];
                }
                if (!oCallbacks["onBlock"]) {
                    oCallbacks["onBlock"] = NetFunnel.DefaultCallback["onBlock"];
                }
                if (!oCallbacks["onExpressnumber"]) {
                    oCallbacks["onExpressnumber"] = NetFunnel.DefaultCallback["onExpressnumber"];
                }
                if (!oCallbacks["onIpBlock"]) {
                    oCallbacks["onIpBlock"] = NetFunnel.DefaultCallback["onIpBlock"];
                }
            }

            NetFunnel.gControl = new NetFunnel.TsClient(oConfigs, oCallbacks);
            return true;
        }

        /**
         * 실행중인 명령 멈춤 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_sendStop(next) {
            'use strict';
            try {
                if (!NetFunnel.gControl) {
                    NetFunnel_init();
                }

                NetFunnel.gAlreadyProc = 0;

                NetFunnel.gControl.setNext(next);
                NetFunnel.gControl.sendStop();
                return true;
            } catch (err) {
                return false;
            }
        }

        /**
         * TicketID 요청 명령 전송
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @param {String} userId 사용자 아이디
         * @param {String} userTid 사용자 ticket 아이디
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_getTicketID(next, userId, userTid) {
            'use strict';
            if (!NetFunnel.gControl) {
                NetFunnel_init();
            }

            NetFunnel.gAlreadyProc = 0;

            NetFunnel.gControl.setNext(next);
            NetFunnel.gControl.getTicketID(userId, userTid);
            return true;
        }

        /**
         * 진입 요청 명령 전송
         *   - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
         *     client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
         *     알려 주게 되며 flash client에서 자동으로 재전송하게 된다.
         *
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @param {Object} data 접속 Data (Optional)
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_chkEnter(next, data) {
            'use strict';
            if (!NetFunnel.gControl) {
                NetFunnel_init();
            }

            NetFunnel.gAlreadyProc = 0;
            var key;
            if (typeof data != "undefined" && data.constructor == Object) {
                key = data["key"];
                if (!key) {
                    return false;
                }
            } else {
                // Cookie 에서 값을 가져온다.
                var tStorage = new NetFunnel.Storage(2);
                var result = tStorage.getItem(NetFunnel.gControl.mConfig["cookie_id"]);
                if (result === null || result == "") {
                    return false;
                }

                var retval = new NetFunnel.RetVal(result);
                key = retval.getValue("key");
                if (!key) {
                    tStorage = new NetFunnel.Storage(2);
                    tStorage.removeItem(this.mConfig["cookie_id"]);
                    return false;
                }
            }

            NetFunnel.gControl.setNext(next);
            NetFunnel.gControl.chkEnter(key);

            return true;
        }

        /**
         * 발급요청 + 진입 요청 명령 전송
         *   - Key 발급요청과 chkEnter 요청을 동시에 수행한다.
         *   - chkEnter 명령을 통해서 시스템에 진입 허가를 받은후에는 이 명령을 전송해 줘야만 현재의
         *     client가 프로세스를 진행 하는지를 TS 서버에서 알 수 있게 된다. 반복 주기는 TS 서버에서
         *     알려 주게 되며 client에서 자동으로 재전송하게 된다.
         *
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @param {String} userId 사용자 아이디
         * @param {String} userTid 사용자 ticket 아이디
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_getTidChkEnter(next, userId, userTid) {
            if (!NetFunnel.gControl) {
                NetFunnel_init();
            }

            NetFunnel.gAlreadyProc = 0;

            NetFunnel.gControl.setNext(next);
            NetFunnel.gControl.getTidChkEnter(userId, userTid);
        }

        /**
         * Alive Notice 요청 명령 전송
         *   - Event
         *     - onContinued(evt,oArg.rtype,oArg.code,oArg.data) : 대기
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @param {Object} data 접속 Data (Optional)
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_aliveNotice(next, data) {
            'use strict';
            try {
                if (!NetFunnel.gControl) {
                    NetFunnel_init();
                }

                NetFunnel.gAlreadyProc = 0;

                var key = "";
                var ip = "";
                var port = "";

                if (typeof data != "undefined" && data.constructor == Object) {
                    key = data["key"];
                    if (!key) {
                        return false;
                    }
                    ip = data["ip"];
                    port = data["port"];
                } else {
                    // Cookie 에서 값을 가져온다.
                    var tStorage = new NetFunnel.Storage(2);
                    var result = tStorage.getItem(NetFunnel.gControl.mConfig["cookie_id"]);
                    if (result === null || result == "") {
                        return false;
                    }

                    var retval = new NetFunnel.RetVal(result);
                    key = retval.getValue("key");
                    if (!key) {
                        tStorage.removeItem(this.mConfig["cookie_id"]);
                        return false;
                    }

                    ip = retval.getValue("ip");
                    port = retval.getValue("port");
                }

                NetFunnel.gControl.setNext(next);
                NetFunnel.gControl.aliveNotice(key, ip, port);
                return true;
            } catch (err) {
                return false;
            }
        }

        /**
         * 완료 요청 명령 전송
         *   - 모든 프로세스가 종료 되었을때 호출 한다.
         *   - 완료 후 이명령을 호출하지 않으면 시스템의 가용성이 저하되며, 정확한 통계정보를 얻을 수 없다.
         *
         *   - Event
         *     - onSuccess(evt,oArg.rtype,oArg.code,oArg.data) : 성공시
         *     - onError(evt,oArg.rtype,oArg.code,oArg.data) : 실패시
         *
         * @param {String|Function} next 명령 성공시 이동할 URL or 실행할 Function (Optional)
         * @param {Object} data 접속 Data (Optional)
         * @return {boolean} 성공여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_setComplete(next, data) {
            'use strict';
            if (!NetFunnel.gControl) {
                NetFunnel_init();
            }

            NetFunnel.gAlreadyProc = 0;

            NetFunnel.gControl.setNext(next);

            var key = "";
            var ip = "";
            var port = "";

            if (NetFunnel.gPop) {
                NetFunnel.gPop.hide();
                NetFunnel.gPop.destroy();
                delete NetFunnel.gPop;
                NetFunnel.gPop = null;
            }

            if (typeof data != "undefined" && data.constructor == Object) {
                key = data["key"];
                if (!key) {
                    // call a ErrorCallback
                    NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
                    return false;
                }
                ip = data["ip"];
                port = data["port"];
            } else {
                // Storage 에서 값을 가져온다.
                var tStorage = new NetFunnel.Storage(2);
                var result = tStorage.getItem(NetFunnel.gControl.mConfig["cookie_id"]);

                if (result === null || result == "") {
                    NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
                    return false;
                }
                var retval = new NetFunnel.RetVal(result);
                var retCode = retval.getRetCode();
                var retType = retval.getReqType();
                if (retCode != NetFunnel.kSuccess && retCode != NetFunnel.kTsBypass &&
                    !(retType == NetFunnel.RTYPE_ALIVE_NOTICE && retCode == NetFunnel.kContinue)) {
                    var tRetval = new NetFunnel.RetVal(NetFunnel.RTYPE_SET_COMPLETE + ":200:msg=\"Success\"");
                    NetFunnel.gControl._showResultSetComplete(tRetval);
                    return true;
                }

                key = retval.getValue("key");
                if (!key) {
                    tStorage = new NetFunnel.Storage(2);
                    tStorage.removeItem(NetFunnel.gControl.mConfig["cookie_id"]);
                    // call a ErrorCallback
                    NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
                    return false;
                }
                ip = retval.getValue("ip");
                port = retval.getValue("port");
            }

            NetFunnel.gControl.setComplete(key, ip, port);
            return true;
        }

        /**
         * NetFunnel 쿠키 존재 여부
         *
         * @return {boolean} 쿠키존재 여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_cookieExist() {
            if (!NetFunnel.gControl) {
                return false;
            }
            return NetFunnel.gControl.cookieExist();
        }

        /**
         * NetFunnel 구동중 여부
         *
         * @return {boolean} 구동중 여부
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_isRunning() {
            if (!NetFunnel.gControl) {
                return false;
            }
            return NetFunnel.gControl.isRunning();
        }

        /**
         * NetFunnel EasyInterface
         */

        /**
         * NetFunnel_goForm
         *   - NetFunnel 리소스 사용요청 후 입력된 form을 Submit 시켜준다.
         *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Object|String} form Submit될 form의 객채나 객채의ID
         * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_goForm(oConfig, form, stop) {
            'use strict';
            var oForm = null;
            if (typeof form == "string") {
                oForm = document.getElementById(form);
                if (typeof oForm != "object" || oForm === null) {
                    var tForm = document.getElementsByName(form);
                    oForm = tForm[0];
                    if (typeof oForm != "object" || oForm === null) {
                        alert("[NetFUNNEL] Invalid input form");
                        return false;
                    }
                }
            } else if (typeof form == "object") {
                oForm = form;
            } else {
                alert("[NetFUNNEL] Invalid input form");
                return false;
            }

            if (typeof stop != "function") {
                stop = function (ev, ret) {
                    return false;
                };
            }

            NetFunnel_init(null, oConfig);
            NetFunnel_getTidChkEnter({
                success: function (ev, ret) {
                    if (oForm !== null) {
                        oForm.submit();
                    }
                },
                error: function (ev, ret) {
                    if (oForm !== null) {
                        oForm.submit();
                    }
                },
                bypass: function (ev, ret) {
                    if (oForm !== null && navigator.onLine) {
                        oForm.submit();
                    }
                },
                stop: stop
            });
            return false;
        }

        /**
         * NetFunnel_goUrl
         *   - NetFunnel 리소스 사용요청 후 입력된 url로 이동시켜준다.
         *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
         *
         * @param {Object} oConfig 설정정보
         * @param {String} url NetFunnel 요청 후 이동할 경로
         * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_goUrl(oConfig, url, stop) {
            'use strict';
            if (typeof url != "string") {
                alert("[NetFUNNEL] Invalid input url");
                return false;
            }
            if (typeof stop != "function") {
                stop = function (ev, ret) {
                    return false;
                };
            }
            NetFunnel_init(null, oConfig);
            NetFunnel_getTidChkEnter({
                success: url,
                error: url,
                bypass: url,
                stop: stop
            });
            return false;
        }

        /**
         * NetFunnel_goFunc
         *   - NetFunnel 리소스 사용요청 후 입력된 func을 실행시켜준다.
         *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Function} func NetFunnel 요청 후 이동할 경로
         * @param {Function} stop "중지"버튼 클릭시 실행될 함수 Callback  (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_goFunc(oConfig, func, stop) {
            'use strict';
            if (typeof func != "function") {
                alert("[NetFUNNEL] Invalid input function");
                return false;
            }
            if (typeof stop != "function") {
                stop = function (ev, ret) {
                    return false;
                };
            }
            NetFunnel_init(null, oConfig);
            NetFunnel_getTidChkEnter({
                success: func,
                error: func,
                bypass: func,
                stop: stop
            });
            return false;
        }

        /**
         * NetFunnel_goComplete
         *   - NetFunnel 리소스 사용 완료요청 후 입력된 func을 실행시켜준다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_goComplete(oConfig, func) {
            'use strict';
            if (typeof func != "function") {
                func = function (ev, ret) {
                    return false;
                };
            }
            NetFunnel_init(null, oConfig);
            NetFunnel_setComplete({
                success: func,
                error: func,
                bypass: func
            });
            return false;
        }

        /**
         * NetFunnel_goAliveNotice
         *   - NetFunnel 리소스 사용이 계속됨을 알려준다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_goAliveNotice(oConfig, func) {
            'use strict';
            if (typeof func != "function") {
                func = function (ev, ret) {
                    return false;
                };
            }
            NetFunnel_init(null, oConfig);
            NetFunnel_aliveNotice({
                success: func,
                error: func,
                bypass: func
            });
            return false;
        }

        /**
         * NetFunnel_Action (2.0 NetFunnel Service Call Function)
         *   - NetFunnel 리소스 사용요청 후 입력된 값의 타입에 따라 NetFunnel 요청 후 다음 작업을 실행시켜준다.
         *   - 대기창 출력중에 "중지" 버튼을 누르게 되면 입력된 stop Callback이 실행된다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Object | Function | String} next NetFunnel 요청 후 다음 작업
         * @param {Object} oCallbacks Callback 이벤트에 대한 Callback 함수 정의
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_Action(oConfig, oCallbacks) {
            'use strict';
            var oForm = null;
            var success, continued, stop, error, bypass, block, ipblock, expressnumber;
        
            if (typeof oCallbacks === "function") {
                success = oCallbacks;
                error = function(ev, ret) {
                    if (navigator.onLine) {
                        oCallbacks(ev, ret); // 익명 함수 호출
                    }
                };
                bypass = success;
                expressnumber = success;
            } else {
                success = oCallbacks["success"];
                continued = oCallbacks["continued"];
                stop = oCallbacks["stop"];
                error = oCallbacks["error"];
                bypass = oCallbacks["bypass"];
                block = oCallbacks["block"];
                ipblock = oCallbacks["ipblock"];
                expressnumber = oCallbacks["expressnumber"];
        
                if (typeof success === "object") {
                    oForm = success;
                }
                if (typeof stop === "undefined") {
                    stop = function (ev, ret) {
                        return false;
                    };
                }
                if (typeof error === "undefined") {
                    error = success;
                }
                if (typeof bypass === "undefined") {
                    bypass = success;
                }
                if (typeof expressnumber === "undefined") {
                    expressnumber = success;
                }
            }
        
            NetFunnel_init(null, oConfig);
        
            if (oForm === null) {
                NetFunnel_getTidChkEnter({
                    success: success,
                    error: error,
                    stop: stop,
                    bypass: bypass,
                    block: block,
                    ipblock: ipblock,
                    expressnumber: expressnumber,
                    continued: continued
                });
            } else {
                NetFunnel_getTidChkEnter({
                    success: function (ev, ret) {
                        if (oForm !== null) {
                            oForm.submit();
                        }
                    },
                    error: function (ev, ret) {
                        if (oForm !== null) {
                            oForm.submit();
                        }
                    },
                    bypass: function (ev, ret) {
                        if (oForm !== null) {
                            oForm.submit();
                        }
                    },
                    expressnumber: function (ev, ret) {
                        if (oForm !== null) {
                            oForm.submit();
                        }
                    },
                    stop: stop,
                    block: block,
                    ipblock: ipblock,
                    continued: continued
                });
            }
            return false;
        }
        

        /**
         * NetFunnel_Complete
         *   - NetFunnel 리소스 사용 완료요청 후 입력된 func을 실행시켜준다.
         *
         * @param {Object} oConfig 설정정보
         * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_Complete(oConfig, func) {
            'use strict';
            if (typeof func != "function") {
                func = function (ev, ret) {
                    return false;
                };
            }
            NetFunnel_init(null, oConfig);
            NetFunnel_setComplete({
                success: func,
                error: func,
                bypass: func
            });
            return false;
        }

        /**
         * NetFunnel_AliveNotice
         *   - NetFunnel 리소스 사용이 계속됨을 알려준다.
         * @param {Object} oConfig 설정정보
         * @param {Function} func NetFunnel 요청 후 실헹될 함수 (Optional)
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function NetFunnel_AliveNotice(oConfig, func) {
            'use strict';
            NetFunnel_init(null, oConfig);
            if (typeof func == "function") {
                NetFunnel_aliveNotice({
                    success: func,
                    error: func,
                    bypass: func,
                    continued: func
                });
            } else if (typeof func == "object") {
                var success = func["success"];
                var continued = func["continued"];
                var stop = func["stop"];
                var error = func["error"];
                var bypass = func["bypass"];
                var block = func["block"];
                var ipblock = func["ipblock"];
                var expressnumber = func["expressnumber"];

                NetFunnel_aliveNotice({
                    success: success,
                    error: error,
                    stop: stop,
                    bypass: bypass,
                    block: block,
                    ipblock: ipblock,
                    expressnumber: expressnumber,
                    continued: continued
                });
            } else {
                func = function (ev, ret) {
                    return false;
                };
                NetFunnel_aliveNotice({
                    success: func,
                    error: func,
                    bypass: func,
                    continued: func
                });
            }
            return false;
        }

        /**
         * DefaultCallback_onSuccess
         *   - 대기창 popup일 경우 브라우저에 따라 처리한다.
         *   - chrome 일 경우만 예외적으로 동작
         *
         * @param {String} evt 이벤트 이름
         * @param {Object} NetFunnel.TsClient
         * @param {Object} popup object
         * @return {boolean} 항상 false를 반환한다.
         */
        // eslint-disable-next-line camelcase
        function DefaultCallback_onSuccess(ev, ret, obj) {
            'use strict';
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > 0) { //브라우저 이름 chrome 일 경우
                if (NetFunnel.gPop) { // 대기창 popup 됐을 경우만 실행
                    var docobj = obj.getConfig("popup_target").document;
                    var tmp = document.createElement("IMG");
                    tmp.src = 'data:image/gif;base64,' + NetFunnel.gFixelData;
                    tmp.style.position = "absolute";
                    tmp.style.top = "-10px";
                    tmp.style.left = "-10px";
                    tmp.style.display = "none";
                    // tmp.onload=function(){
                    tmp.onload = tmp.onerror = function () {
                        ret.next(ev, ret);
                        var body = docobj.getElementsByTagName("body")[0];
                        body.removeChild(tmp);
                    };

                    var body = docobj.getElementsByTagName("body")[0];
                    body.appendChild(tmp);
                } else {
                    ret.next(ev, ret);
                }
            } else {
                ret.next(ev, ret);
            }
            return false;
        }

        /**
         * Auto setComplete
         */
        if (NetFunnel.TS_AUTO_COMPLETE == true) {
            NetFunnel_Complete();
        }

        /**
         * Modules support
         */
        if (typeof window.Function.bind == 'function') {
            top.NetFunnel = NetFunnel.NetFunnel = NetFunnel;
            top.NetFunnel_init = NetFunnel.NetFunnel_init = NetFunnel_init.bind(this);
            top.NetFunnel_sendStop = NetFunnel.NetFunnel_sendStop = NetFunnel_sendStop.bind(this);
            top.NetFunnel_getTicketID = NetFunnel.NetFunnel_getTicketID = NetFunnel_getTicketID.bind(this);
            top.NetFunnel_chkEnter = NetFunnel.NetFunnel_chkEnter = NetFunnel_chkEnter.bind(this);
            top.NetFunnel_getTidChkEnter = NetFunnel.NetFunnel_getTidChkEnter = NetFunnel_getTidChkEnter.bind(this);
            top.NetFunnel_aliveNotice = NetFunnel.NetFunnel_aliveNotice = NetFunnel_aliveNotice.bind(this);
            top.NetFunnel_setComplete = NetFunnel.NetFunnel_setComplete = NetFunnel_setComplete.bind(this);
            top.NetFunnel_cookieExist = NetFunnel.NetFunnel_cookieExist = NetFunnel_cookieExist.bind(this);
            top.NetFunnel_isRunning = NetFunnel.NetFunnel_isRunning = NetFunnel_isRunning.bind(this);
            top.NetFunnel_goForm = NetFunnel.NetFunnel_goForm = NetFunnel_goForm.bind(this);
            top.NetFunnel_goUrl = NetFunnel.NetFunnel_goUrl = NetFunnel_goUrl.bind(this);
            top.NetFunnel_goFunc = NetFunnel.NetFunnel_goFunc = NetFunnel_goFunc.bind(this);
            top.NetFunnel_goComplete = NetFunnel.NetFunnel_goComplete = NetFunnel_goComplete.bind(this);
            top.NetFunnel_goAliveNotice = NetFunnel.NetFunnel_goAliveNotice = NetFunnel_goAliveNotice.bind(this);
            top.NetFunnel_Action = NetFunnel.NetFunnel_Action = NetFunnel_Action.bind(this);
            top.NetFunnel_Complete = NetFunnel.NetFunnel_Complete = NetFunnel_Complete.bind(this);
            top.NetFunnel_AliveNotice = NetFunnel.NetFunnel_AliveNotice = NetFunnel_AliveNotice.bind(this);
            top.DefaultCallback_onSuccess = NetFunnel.DefaultCallback_onSuccess = DefaultCallback_onSuccess.bind(this);
        } else {
            top.NetFunnel = NetFunnel;
            top.NetFunnel_init = NetFunnel_init;
            top.NetFunnel_sendStop = NetFunnel_sendStop;
            top.NetFunnel_getTicketID = NetFunnel_getTicketID;
            top.NetFunnel_chkEnter = NetFunnel_chkEnter;
            top.NetFunnel_getTidChkEnter = NetFunnel_getTidChkEnter;
            top.NetFunnel_aliveNotice = NetFunnel_aliveNotice;
            top.NetFunnel_setComplete = NetFunnel_setComplete;
            top.NetFunnel_cookieExist = NetFunnel_cookieExist;
            top.NetFunnel_isRunning = NetFunnel_isRunning;
            top.NetFunnel_goForm = NetFunnel_goForm;
            top.NetFunnel_goUrl = NetFunnel_goUrl;
            top.NetFunnel_goFunc = NetFunnel_goFunc;
            top.NetFunnel_goComplete = NetFunnel_goComplete;
            top.NetFunnel_goAliveNotice = NetFunnel_goAliveNotice;
            top.NetFunnel_Action = NetFunnel_Action;
            top.NetFunnel_Complete = NetFunnel_Complete;
            top.NetFunnel_AliveNotice = NetFunnel_AliveNotice;
            top.DefaultCallback_onSuccess = DefaultCallback_onSuccess;
        }
        // eslint-disable-next-line no-undef
        "object" == typeof module && "object" == typeof module.exports && (module.exports = NetFunnel)

    })(typeof window !== "undefined" ? window : this);
}