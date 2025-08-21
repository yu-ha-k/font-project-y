/* 추후 comUi.js에 병합 예정 */
/*s: 큰글씨 ==========================================================================*/
$(function () {
    const fontLgToggleInput = $('.font_lg_toggle_inp');
    const fontLgToggleInputState = $('.font_lg_state');
    // 저장
    if (localStorage.getItem('fontLgOn') === 'true') {
        $('body').addClass('font_lg_on');
        fontLgToggleInput.prop('checked', true);
        fontLgToggleInputState.text('모드 켜짐');
        fontLgToggleInput.closest('label').attr('aria-checked', 'true');
        window.rafReflow(); // 250819 test 추가 _토글 후 레이아웃 재계산
    } else {
        fontLgToggleInputState.text('모드 꺼짐');
        fontLgToggleInput.closest('label').attr('aria-checked', 'false');
    }
    // 토글
    fontLgToggleInput.on('change', function () {
        const isLarge = $(this).is(':checked');
        $('body').toggleClass('font_lg_on', isLarge);
        $(this).closest('label').attr('aria-checked', isLarge);
        fontLgToggleInputState.text(isLarge ? '모드 켜짐' : '모드 꺼짐');
        localStorage.setItem('fontLgOn', isLarge);
        window.rafReflow(); // 250819 test 추가 _토글 후 레이아웃 재계산
    });
});
/*.container_wrap으로 개별 적용*/
/* $(function(){
    $('.container_wrap').each(function(index){
        const fontLgToggleInput = $(this).find('.font_lg_toggle_inp'); //toggle input
        const fontLgToggleInputState = $(this).find('.font_lg_state'); //state
        const storageKey = 'fontLgOn_container_' + index; //save key
        // 저장
        if(localStorage.getItem(storageKey) === 'true'){
            $(this).addClass('font_lg_on');
            fontLgToggleInput.prop('checked', true);
            fontLgToggleInputState.text('모드 켜짐');
            fontLgToggleInput.closest('label').attr('aria-checked', 'true');
        }else{
            fontLgToggleInputState.text('모드 꺼짐');
            fontLgToggleInput.closest('label').attr('aria-checked', 'false');
        }
        //토글
        fontLgToggleInput.on('change',function(){
            const isLarge = $(this).is(':checked');
            $(this).closest('.container_wrap').toggleClass('font_lg_on', isLarge);
            $(this).closest('label').attr('aria-checked', isLarge);
            fontLgToggleInputState.text(isLarge ? '모드 켜짐' : '모드 꺼짐');
            localStorage.setItem(storageKey, isLarge);
        });
    });
}); */


/*s: test ==========================================================================*/

/* ============================================================================
 * Big-Text line wrap detector  (토글과 완전 분리)
 * 구조  : <p class="line"><span class="line_left">…</span><span class="line_right">…</span></p>
 * 범위  : .js-wrapscope, .card_item_detail, .card_item_sub_info
 * 조건  : ① 행 가용폭 < (left자연폭 + right자연폭 + gap)
 *         ② 실제 줄바꿈(2줄 이상) 발생
 *         ③ 라벨(A)·값(B) 2행 페어에서 B가 넘치면 A/B 동시 전개
 *         ④ 금액(.money) 행은 임계 비율(75%) 이상일 때 미리 전개
 * 공개훅: window.reflowBigTextLines()
 * 안전훅: window.rafReflow()  // 레이아웃/데이터 갱신 직후 한 줄 호출
 * 의존성: jQuery (ES5)
 * ========================================================================== */
(function ($) {
    'use strict';

    /* ---------------------------------- 설정 --------------------------------- */
    var SCOPE = '.js-wrapscope, .card_item_detail, .card_item_sub_info, .group_item_detail'; // 검사 범위 .js-wrapscope 는 헬퍼클래스로 줄바꿈 감지/처리 의 적용 범위를 한정하기 위해 사용한다.
    var ROW = '.line';
    var LEFT = '.line_left';
    var RIGHT = '.line_right';

    /* ------------------------ 안전 호출(외부에서 사용) ------------------------ */
    window.rafReflow = window.rafReflow || function () {
        var call = function () {
            if (typeof window.reflowBigTextLines === 'function') window.reflowBigTextLines();
        };
        if (window.requestAnimationFrame) requestAnimationFrame(call);
        else setTimeout(call, 0);
    };

    /* -------- 자연폭 측정: flex/nowrap 제약을 제거한 “진짜 폭” 계산 -------- */
    function naturalWidth(el) {
        if (!el) return 0;
        var clone = el.cloneNode(true),
            s = clone.style;
        s.position = 'absolute';
        s.left = '-99999px';
        s.top = '0';
        s.visibility = 'hidden';
        s.whiteSpace = 'nowrap';
        s.width = 'auto';
        s.maxWidth = 'none';
        s.minWidth = '0';
        s.display = 'inline';
        s.flex = 'none';
        s.flexBasis = 'auto';
        document.body.appendChild(clone);
        var w = clone.getBoundingClientRect().width;
        document.body.removeChild(clone);
        return w || 0;
    }

    /* ------------------ 행 가용폭 기준 + 보수적 overflow 보조 ------------------ */
    // nowrap/pre 계열의 overflowX는 “전개 사유”로 보지 않도록 보수적으로 처리
    function needStackByRow(rowEl) {
        var cs = getComputedStyle(rowEl);
        var paddingX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;

        var L = rowEl.querySelector(LEFT);
        var R = rowEl.querySelector(RIGHT);

        var rowInnerW = rowEl.getBoundingClientRect().width - paddingX;

        var lNat = naturalWidth(L);
        var rNat = naturalWidth(R);
        var sumNat = lNat + rNat + (lNat && rNat ? gap : 0);

        function overAllowed(el) {
            if (!el) return false;
            var s = getComputedStyle(el);
            var ws = s.whiteSpace;
            var wrapPossible = !(ws === 'nowrap' || ws === 'pre' || ws === 'pre-line' || ws === 'pre-wrap');
            return wrapPossible && ((el.scrollWidth - el.clientWidth) > 1);
        }

        var lOver = overAllowed(L);
        var rOver = overAllowed(R);

        return sumNat > (rowInnerW + 1) || lOver || rOver;
    }

    function isWrapped(el) {
        if (!el) return false;

        var cs = getComputedStyle(el);
        var ws = cs.whiteSpace;

        // 1) 줄바꿈 불가 상태는 바로 제외
        if (ws === 'nowrap' || ws === 'pre' || ws === 'pre-line' || ws === 'pre-wrap') {
            return false;
        }

        // 내부 텍스트 없음/폭 0은 제외
        if (((el.textContent || '').trim() === '') || el.getBoundingClientRect().width < 1) {
            return false;
        }

        // 2) 높이로 대략적 2줄 이상 판정 (너무 낮으면 바로 false)
        var fs = parseFloat(cs.fontSize) || 16;
        var lhRaw = cs.lineHeight;
        var lh = (lhRaw === 'normal' || !lhRaw) ? (fs * 1.3) : (parseFloat(lhRaw) || fs * 1.3); // 좀 더 보수적
        var h = el.getBoundingClientRect().height;
        var MIN_TWO_LINES = 1.85; // 1.8~1.9 사이 추천
        if (h < lh * MIN_TWO_LINES) return false;

        // 3) Range 라인박스에서 '서로 다른 줄 수' 계산 (같은 줄의 분절은 같은 top으로 묶음)
        try {
            var range = document.createRange();
            range.selectNodeContents(el);
            var rects = range.getClientRects && range.getClientRects();
            if (rects && rects.length) {
                var lineTops = [];
                for (var i = 0; i < rects.length; i++) {
                    var t = Math.round(rects[i].top);
                    // ±1px 내 오차는 같은 줄로 간주
                    var found = false;
                    for (var j = 0; j < lineTops.length; j++) {
                        if (Math.abs(lineTops[j] - t) <= 1) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        lineTops.push(t);
                        if (lineTops.length >= 2) break;
                    }
                }
                if (lineTops.length < 2) return false; // 라인박스가 실제 2줄 미만이면 false
            }
        } catch (e) {
            // Range 불가 환경에서는 아래 4) 조건만으로는 부족하므로 보수적으로 false
            return false;
        }

        // 4) 정말 가로가 빠듯한 상황인지 보조 검증
        var overflowX = (el.scrollWidth - el.clientWidth) > 1;
        if (!overflowX) {
            // 자연폭과 가용폭 비교 (flex/nowrap 영향 제거)
            var row = el.closest('.line') || el.parentElement;
            var rowW = row ? row.getBoundingClientRect().width : el.getBoundingClientRect().width;
            // 왼쪽 라벨 폭을 빼서 실제 오른쪽 가용폭 근사
            var L = row ? row.querySelector('.line_left') : null;
            var leftW = L ? L.getBoundingClientRect().width : 0;
            var gap = 0;
            if (row) {
                var rcs = getComputedStyle(row);
                gap = parseFloat(rcs.columnGap || rcs.gap || 0) || 0;
            }
            var avail = Math.max(1, rowW - leftW - gap);
            var nat = (function naturalWidth(elm) {
                var clone = elm.cloneNode(true),
                    s = clone.style;
                s.position = 'absolute';
                s.left = '-99999px';
                s.top = '0';
                s.visibility = 'hidden';
                s.whiteSpace = 'nowrap';
                s.width = 'auto';
                s.maxWidth = 'none';
                s.minWidth = '0';
                s.display = 'inline';
                s.flex = 'none';
                s.flexBasis = 'auto';
                document.body.appendChild(clone);
                var w = clone.getBoundingClientRect().width;
                document.body.removeChild(clone);
                return w || 0;
            })(el);

            var TIGHT = 0.97; // 97% 이상 채우면 빡빡하다고 간주
            if (nat / avail < TIGHT) return false;
        }

        return true;
    }

    /* --------------------------- 보조: 비어있는지 ---------------------------- */
    function isEmptyText(el) {
        if (!el) return true;
        var txt = (el.textContent || '').replace(/\s+/g, '');
        return txt.length === 0 || el.getBoundingClientRect().width < 1;
    }

    /* ----------------- 스코프별 전개(라벨/값 페어 + 금액 보강) ---------------- */
    function reflowScope($scope) {
        var inBig = document.body.classList.contains('font_lg_on');
        var rows = $scope.find(ROW).toArray();

        if (!inBig) {
            $(rows).removeClass('full-line');
            return;
        }
        $(rows).removeClass('full-line');

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var $row = $(row);
            var l = $row.find(LEFT)[0];
            var r = $row.find(RIGHT)[0];

            /* ① 기본 전개 판단(가용폭 + 정밀 줄바꿈) */
            var stack = needStackByRow(row) || (l && isWrapped(l)) || (r && isWrapped(r));

            /* [ADD-1] 금액(.money) 임계 비율로 사전 전개 (money 없으면 스킵) */
            if (!stack && r) {
                var moneyEl = r.querySelector('.money'); // ← 반드시 .money 요소가 있을 때만
                if (moneyEl) {
                    var cs = getComputedStyle(row);
                    var paddingX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
                    var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;
                    var rowInnerW = row.getBoundingClientRect().width - paddingX;
                    var rNat = naturalWidth(moneyEl);
                    var lNow = l ? l.getBoundingClientRect().width : 0;
                    var availW = Math.max(1, rowInnerW - lNow - gap);
                    var THRESHOLD = 0.70; // 0.70~0.80에서 미세 조정

                    if (rNat / availW >= THRESHOLD) stack = true;
                }
            }

            if (stack) {
                $row.addClass('full-line');

                /* [ADD-2] 값행이면 바로 위 ‘진짜 라벨행’으로 전파 */
                var curIsValueOnly = (!l || isEmptyText(l)) && (r && !isEmptyText(r));
                if (curIsValueOnly && i - 1 >= 0) {
                    var $prev = $(rows[i - 1]);
                    var lp = $prev.find(LEFT)[0],
                        rp = $prev.find(RIGHT)[0];
                    var prevIsLabelOnly = (lp && !isEmptyText(lp)) && (!rp || isEmptyText(rp));
                    if (prevIsLabelOnly) $prev.addClass('full-line');
                }
                continue; // 이 줄 처리 완료
            }

            /* ② 라벨(A) → 값(B) 페어 처리(정방향) */
            var isLabelOnly = l && !isEmptyText(l) && (!r || isEmptyText(r));
            if (isLabelOnly && i + 1 < rows.length) {
                var next = rows[i + 1],
                    $next = $(next);
                var l2 = $next.find(LEFT)[0],
                    r2 = $next.find(RIGHT)[0];
                var isValueOnly = (!l2 || isEmptyText(l2)) && (r2 && !isEmptyText(r2));

                if (isValueOnly) {
                    var stackB = needStackByRow(next) || (l2 && isWrapped(l2)) || (r2 && isWrapped(r2));

                    /* [ADD-3] 다음 줄이 금액행이면 동일 임계치로 보강 */
                    if (!stackB && r2) {
                        var money2 = r2.querySelector('.money');
                        if (money2) {
                            var cs2 = getComputedStyle(next);
                            var paddingX2 = (parseFloat(cs2.paddingLeft) || 0) + (parseFloat(cs2.paddingRight) || 0);
                            var gap2 = parseFloat(cs2.columnGap || cs2.gap || 0) || 0;
                            var rowInnerW2 = next.getBoundingClientRect().width - paddingX2;
                            var rNat2 = naturalWidth(money2);
                            var lNow2 = l2 ? l2.getBoundingClientRect().width : 0;
                            var availW2 = Math.max(1, rowInnerW2 - lNow2 - gap2);
                            var THRESHOLD2 = 0.75;

                            if (rNat2 / availW2 >= THRESHOLD2) stackB = true;
                        }
                    }

                    if (stackB) {
                        $row.addClass('full-line'); // 라벨행
                        $next.addClass('full-line'); // 값행
                        i++; // B행 스킵
                    }
                }
            }
        }
    }

    /* --------------------------- 공개 훅 & 바인딩 --------------------------- */
    function reflowAll() {
        $(SCOPE).each(function () {
            reflowScope($(this));
        });
    }
    window.reflowBigTextLines = reflowAll;

    $(function () {
        reflowAll();
    }); // 초기 1회
    (function () { // 리사이즈(디바운스)
        var t;
        $(window).on('resize', function () {
            clearTimeout(t);
            t = setTimeout(reflowAll, 120);
        });
    })();

})(window.jQuery);


/* ============================================================================
 *  d_list 구조 지원 (기존 코드 유지, 하단에 추가)
 * ========================================================================== */
(function ($) {
    'use strict';

    // 1) 한 줄 자연폭(white-space 제약 없는 scrollWidth 기반)
    function dNat(el) {
        if (!el) return 0;
        var old = el.style.whiteSpace;
        el.style.whiteSpace = 'nowrap';
        var w = el.scrollWidth || el.getBoundingClientRect().width || 0;
        el.style.whiteSpace = old;
        return w;
        // 최소수정: clone 사용 없이 성능/호환성 균형
    }

    // 2) 한 컨텍스트에서 d_list 전개/원복
    function reflowDList(ctx) {
        var inBig = document.body.classList.contains('font_lg_on');
        var $items = $(ctx || document).find('ul.d_list li');

        if (!inBig) {
            $items.removeClass('full-line');
            return;
        }

        $items.each(function () {
            var li = this;
            var l = li.querySelector('.d_list_l');
            var r = li.querySelector('.d_list_r');

            // 초기화
            li.classList.remove('full-line');
            if (!l || !r) return;

            // li 가용폭 (패딩 제외)
            var cs = getComputedStyle(li);
            var padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
            var inner = (li.getBoundingClientRect().width - padX);

            // 좌/우 자연폭 합산이 가용폭 초과하면 전개
            var need = (dNat(l) + dNat(r)) > (inner + 1);

            if (need) li.classList.add('full-line');
        });
    }

    // 3) 기존 reflow 훅과 체인 연결
    var _prevReflow = window.reflowBigTextLines;
    window.reflowBigTextLines = function () {
        if (typeof _prevReflow === 'function') _prevReflow();
        reflowDList(document);
    };

    // 4) 초기 1회 + 리사이즈 디바운스
    $(function () {
        reflowDList(document);
        var t;
        $(window).on('resize', function () {
            clearTimeout(t);
            t = setTimeout(function () {
                reflowDList(document);
            }, 120);
        });
    });

    // 5) 동적 생성(ajax/탭전환 등) 대응 – 경량 옵저버
    try {
        var mo = new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var ad = muts[i].addedNodes;
                for (var j = 0; j < ad.length; j++) {
                    var n = ad[j];
                    if (n.nodeType !== 1) continue;
                    // 추가된 트리 내부에 d_list가 있으면 그 파트만 재계산
                    if (n.querySelector && (n.matches('ul.d_list, li') || n.querySelector('ul.d_list'))) {
                        reflowDList(n);
                    }
                }
            }
        });
        mo.observe(document.body, {
            childList: true,
            subtree: true
        });
    } catch (e) {
        /* IE9 등 구형 환경이면 옵저버 생략 */
    }

})(window.jQuery);


/* ----- Device Toolbar / VisualViewport / WebFont 대책: 늦은 재계산 훅 ----- */
(function () {
    function lateRecalc() {
        // 연속 2~3프레임 돌려서 늦게 들어오는 폰트/레이아웃도 캐치
        var n = 3;

        function tick() {
            if (typeof window.reflowBigTextLines === 'function') {
                window.reflowBigTextLines();
            }
            if (--n > 0) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // 디바이스 툴바가 주로 쏘는 이벤트: visualViewport
    if (window.visualViewport) {
        visualViewport.addEventListener('resize', lateRecalc, {
            passive: true
        });
        visualViewport.addEventListener('scroll', lateRecalc, {
            passive: true
        }); // 모바일 키보드 등
    }

    // 방향 전환/세션 복원
    window.addEventListener('orientationchange', lateRecalc, {
        passive: true
    });
    window.addEventListener('pageshow', lateRecalc, {
        passive: true
    });

    // load 이후 지연 패스(초기 한 번 더) + 폰트 로드 완료 시 한 번 더
    window.addEventListener('load', function () {
        lateRecalc();
        setTimeout(lateRecalc, 200);
        setTimeout(lateRecalc, 600); // 느린 폰트/저성능 기기 보정
    });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(lateRecalc).catch(function () {});
    }
})();


/* ======================= iOS(특히 iPhone 12 Pro) 전용 보강 패치 =======================
   - 기존 reflowBigTextLines() 완료 후, iOS에서만 줄바꿈을 못 잡은 행을 별도 재검출
   ================================================================================ */
(function () {
    var ua = navigator.userAgent || "";
    var isiOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
    if (!isiOS) return; // iOS만 보정

    // 오프스크린 클론으로 "실제 줄바꿈"을 강제 판별(사파리 Range 버그 회피)
    function isWrappedIOS(el) {
        if (!el) return false;

        var cs = getComputedStyle(el);
        var base = document.createElement('div');
        base.style.cssText = [
            'position:absolute', 'left:-99999px', 'top:0', 'visibility:hidden',
            'contain:layout', 'box-sizing:border-box',
            // 원본과 동일 폭에서 줄바꿈 판단
            'width:' + el.clientWidth + 'px',
            // 줄바꿈 가능 상태로 강제
            'white-space:normal', 'word-break:normal', 'overflow-wrap:normal',
            // flex 영향 제거
            'display:block', 'flex:none', 'flex-basis:auto'
        ].join(';');

        var clone = el.cloneNode(true);
        // 클론에도 줄바꿈 가능 상태로
        clone.style.whiteSpace = 'normal';
        clone.style.wordBreak = 'normal';
        clone.style.overflowWrap = 'normal';
        clone.style.display = 'inline-block';
        clone.style.flex = 'none';
        clone.style.flexBasis = 'auto';

        base.appendChild(clone);
        document.body.appendChild(base);

        var fs = parseFloat(cs.fontSize) || 16;
        var lhR = cs.lineHeight;
        var lh = (lhR === 'normal' || !lhR) ? fs * 1.2 : (parseFloat(lhR) || fs * 1.2);

        // 한 줄 높이보다 충분히 크면(≈1.25줄 이상) 줄바꿈으로 간주
        var wrapped = base.scrollHeight > (lh * 1.25);

        document.body.removeChild(base);
        return wrapped;
    }

    // 라벨/값 셀렉터 (기존 구조 + d_list 계열도 포함)
    var ROW = '.line, .d_list li';
    var LEFT = '.line_left, .d_list_l';
    var RIGHT = '.line_right, .d_list_r';

    // iOS 보정 재검출 → 전개
    function reflowIOSFix() {
        var scopes = document.querySelectorAll('.js-wrapscope, .card_item_detail, .card_item_sub_info, .group_item_detail, .d_list');
        if (!document.body.classList.contains('font_lg_on')) {
            // 큰글씨 모드가 아니면 관여하지 않음
            return;
        }

        Array.prototype.forEach.call(scopes, function (scope) {
            var rows = scope.querySelectorAll(ROW);
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.classList.contains('full-line')) continue; // 이미 전개된 행은 건너뜀

                var l = row.querySelector(LEFT);
                var r = row.querySelector(RIGHT);
                if (!r) continue;

                // iOS 전용 강제 판별로 줄바꿈이 확인되면 전개
                if (isWrappedIOS(r)) {
                    row.classList.add('full-line');
                    // 바로 위가 라벨-전용이면 같이 전개(원 코드 규칙 유지)
                    if ((!l || (l.textContent || '').trim() === '') && i - 1 >= 0) {
                        var prev = rows[i - 1];
                        var lp = prev && prev.querySelector(LEFT);
                        var rp = prev && prev.querySelector(RIGHT);
                        var prevIsLabelOnly = lp && (lp.textContent || '').trim() !== '' && (!rp || (rp.textContent || '').trim() === '');
                        if (prevIsLabelOnly) prev.classList.add('full-line');
                    }
                }
            }
        });
    }

    // 기존 훅 뒤에 한 번 더 실행 (레이아웃 안정된 뒤에도 여러 번 시도)
    function lateBurst() {
        // 2~3 프레임 정도 나눠서 재시도(웹폰트/뷰포트 지연 대비)
        var n = 3;
        (function tick() {
            reflowIOSFix();
            if (typeof window.reflowBigTextLines === 'function') window.reflowBigTextLines(); // 재동기화
            if (--n > 0) requestAnimationFrame(tick);
        })();
    }

    // 초기 구동 & 뷰포트/방향/폰트/페이지 표시 이벤트에 연결
    window.addEventListener('load', lateBurst, {
        passive: true
    });
    window.addEventListener('pageshow', lateBurst, {
        passive: true
    });
    window.addEventListener('orientationchange', lateBurst, {
        passive: true
    });
    if (window.visualViewport) {
        visualViewport.addEventListener('resize', lateBurst, {
            passive: true
        });
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(lateBurst).catch(function () {});
    }

    // 기존 public 훅이 있으면 거기에 체인 연결
    var _orig = window.reflowBigTextLines;
    window.reflowBigTextLines = function () {
        if (typeof _orig === 'function') _orig();
        reflowIOSFix();
    };
})();


/* ============================================================
 * [ADD] d_list + linkTo 전개 보강 (어제 최종본 non-destructive patch)
 * - 대상: ul.d_list li  (li 바로 안에 a.linkTo가 있을 수도/없을 수도)
 * - 동작: body.font_lg_on 일 때만 검사/전개
 * - 충돌회피: 모든 심볼은 DL_ 네임스페이스로 로컬화
 * - 기존 window.reflowBigTextLines 훅에 체인 연결
 * ============================================================ */
(function () {
    var THRESHOLD = 0.75; // 금액행 보강용 동일 기준

    // 안전: 기존 공개 훅 보관
    var __prevReflow__ = window.reflowBigTextLines;

    // helper: nowrap 상태 scrollWidth 기반 “간이 자연폭”
    function DL_natural(el) {
        if (!el) return 0;
        var old = el.style.whiteSpace;
        el.style.whiteSpace = 'nowrap';
        // scrollWidth가 0인 레거시 케이스 보조
        var w = el.scrollWidth || (el.getBoundingClientRect().width || 0);
        el.style.whiteSpace = old;
        return w || 0;
    }

    // helper: 실제 줄바꿈(2줄 이상) 보수 판정 – 가볍게
    function DL_wrapped(el) {
        if (!el) return false;
        if (el.getClientRects && el.getClientRects().length > 1) return true;
        var cs = getComputedStyle(el);
        // nowrap/pre 계열은 overflow만으로는 true 주지 않음(기존 정책 준수)
        if (cs.whiteSpace === 'nowrap' || cs.whiteSpace === 'pre'
            || cs.whiteSpace === 'pre-line' || cs.whiteSpace === 'pre-wrap') {
            return false;
        }
        return (el.scrollWidth - el.clientWidth) > 1;
    }

    // core: linkTo 포함 d_list 전개
    /* core: d_list + sub_d_list 전개 (linkTo 포함) */
    function DL_reflowDList(ctx) {
        var inBig = document.body.classList.contains('font_lg_on');
        var root = ctx || document;

        /* [ADD] 하위 리스트까지 포함 */
        var items = root.querySelectorAll('ul.d_list > li');

        /* 큰글씨 OFF → 모두 원복 */
        if (!inBig) {
            items.forEach(function (li) {
                li.classList.remove('full-line');
                var a = li.querySelector('a.linkTo');
                if (a) a.classList.remove('full-line');
            });
            // sub_d_list도 복원
            root.querySelectorAll('ul.sub_d_list > li').forEach(function (sli) {
                sli.classList.remove('full-line');
                var sa = sli.querySelector('a.linkTo');
                if (sa) sa.classList.remove('full-line');
            });

            return;
        }

        items.forEach(function (li) {
            /* [ADD] linkTo가 있으면 그 안을 ‘측정 기준’으로 사용 */
            var a = li.querySelector('a.linkTo');
            var base = a || li;

            /* 좌/우는 기준 컨테이너에서 먼저 찾고, 없으면 li에서 보조 탐색 */
            var L = base.querySelector('.d_list_l') || li.querySelector('.d_list_l');
            var R = base.querySelector('.d_list_r') || li.querySelector('.d_list_r');

            /* 초기화 */
            li.classList.remove('full-line');
            if (a) a.classList.remove('full-line');
            if (!L || !R) return;

            /* 가용폭 계산 */
            var cs = getComputedStyle(base);
            var padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
            var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;
            var inner = Math.max(1, base.getBoundingClientRect().width - padX);

            /* 자연폭 합 + 줄바꿈 감지 */
            var need = (
                (DL_natural(L) + DL_natural(R) + (gap || 0)) > (inner + 1) /* 폭 초과 */
                || DL_wrapped(L) || DL_wrapped(R) /* 실제 줄바꿈 */
            );

            /* 금액 행 보강 (있을 때만) */
            if (!need) {
                var money = R.querySelector('.money');
                if (money) {
                    var lNow = L.getBoundingClientRect().width;
                    var avail = Math.max(1, inner - lNow - gap);
                    var mNat = DL_natural(money);
                    var THRESH = 0.75;
                    if (mNat / avail >= THRESH) need = true;
                }
            }

            if (need) {
                li.classList.add('full-line');
                if (a) a.classList.add('full-line'); /* linkTo 내부도 표시(스타일 분리용) */
            }
        });

        // ---- 보강: sub_d_list도 독립 판정 ----
        var subItems = root.querySelectorAll('ul.sub_d_list > li');
        subItems.forEach(function (li) {
            var a = li.querySelector('a.linkTo');
            var base = a || li;
            var L = base.querySelector('.d_list_l');
            var R = base.querySelector('.d_list_r');

            li.classList.remove('full-line');
            if (a) a.classList.remove('full-line');
            if (!L || !R) return;

            var cs = getComputedStyle(base);
            var padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
            var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;
            var inner = Math.max(1, base.getBoundingClientRect().width - padX);
            var need = (DL_natural(L) + DL_natural(R) + gap) > (inner + 1) || DL_wrapped(L) || DL_wrapped(R);

            if (!need && R) {
                var money = R.querySelector('.money');
                if (money) {
                    var ln = L.getBoundingClientRect().width;
                    var avail = Math.max(1, inner - ln - gap);
                    if (DL_natural(money) / avail >= 0.75) need = true;
                }
            }

        })
    }

    // 공개 훅 체인: 기존 훅 → d_list 훅 순서로 호출
    window.reflowBigTextLines = function () {
        try {
            if (typeof __prevReflow__ === 'function') __prevReflow__();
        } catch (e) {}
        try {
            DL_reflowDList(document);
        } catch (e) {}
    };

    // 최초 1회 + 리사이즈 디바운스: 기존 쪽이 이미 바인딩되어 있으므로 여기선 한 번만
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            try {
                DL_reflowDList(document);
            } catch (e) {}
        });
    } else {
        try {
            DL_reflowDList(document);
        } catch (e) {}
    }
})();

/*e: test ==========================================================================*/


/*e: 큰글씨 ==========================================================================*/
