/* 추후 comUi.js에 병합 예정 */
/*s: 큰글씨 ==========================================================================*/
$(function () {
  const fontLgToggleInput = $(".font_lg_toggle_inp");
  const fontLgToggleInputState = $(".font_lg_state");
  // 저장
  if (localStorage.getItem("fontLgOn") === "true") {
    $("body").addClass("font_lg_on");
    fontLgToggleInput.prop("checked", true);
    fontLgToggleInputState.text("모드 켜짐");
    fontLgToggleInput.closest("label").attr("aria-checked", "true");
    window.rafReflow(); // 250819 test 추가 _토글 후 레이아웃 재계산
  } else {
    fontLgToggleInputState.text("모드 꺼짐");
    fontLgToggleInput.closest("label").attr("aria-checked", "false");
  }
  // 토글
  fontLgToggleInput.on("change", function () {
    const isLarge = $(this).is(":checked");
    $("body").toggleClass("font_lg_on", isLarge);
    $(this).closest("label").attr("aria-checked", isLarge);
    fontLgToggleInputState.text(isLarge ? "모드 켜짐" : "모드 꺼짐");
    localStorage.setItem("fontLgOn", isLarge);
    window.rafReflow(); // 250819 test 추가 _토글 후 레이아웃 재계산
  });
});

/*==========================s: test ================================================*/

/*s: 성능 보강 공통 유틸(캐시/스케줄러) ================================================*/
(function () {
  // 1회 재계산 사이클 동안만 유지되는 측정 캐시
  var _nwCache = new WeakMap(); // element -> natural width(px)
  var _bbCache = new WeakMap(); // element -> getBoundingClientRect() 결과(width/height 등)
  var _cacheEpoch = 0;

  function resetMeasureCache() {
    // WeakMap은 명시 clear가 없어 epoch만 증가(동일 런에서만 캐시 사용)
    _cacheEpoch++;
    _nwCache = new WeakMap();
    _bbCache = new WeakMap();
  }
  window.__BT_resetMeasureCache__ = resetMeasureCache;

  // 레이아웃 읽기(측정) 헬퍼
  window.__BT_bb__ = function (el) {
    if (!el) return { width: 0, height: 0, top: 0 };
    var c = _bbCache.get(el);
    if (c) return c;
    var b = el.getBoundingClientRect();
    _bbCache.set(el, b);
    return b;
  };

  // 자연폭: scrollWidth(빠른 경로) → 0/엣지일 때만 클론
  window.__BT_natW__ = function (el) {
    if (!el) return 0;
    var c = _nwCache.get(el);
    if (c != null) return c;

    var prev = el.style.whiteSpace;
    el.style.whiteSpace = "nowrap";
    var w = el.scrollWidth || 0;
    el.style.whiteSpace = prev;

    if (!w) {
      var clone = el.cloneNode(true),
        s = clone.style;
      s.position = "absolute";
      s.left = "-99999px";
      s.top = "0";
      s.visibility = "hidden";
      s.whiteSpace = "nowrap";
      s.width = "auto";
      s.maxWidth = "none";
      s.minWidth = "0";
      s.display = "inline";
      s.flex = "none";
      s.flexBasis = "auto";
      document.body.appendChild(clone);
      w = clone.getBoundingClientRect().width | 0;
      document.body.removeChild(clone);
    }
    _nwCache.set(el, w);
    return w;
  };

  // 단일 스케줄러(raf + 1회 지연) – 중복 호출 방지
  var _scheduled = false;
  var _raf =
    window.requestAnimationFrame ||
    function (cb) {
      return setTimeout(cb, 0);
    };
  function _run() {
    _scheduled = false;
    // 새 사이클 측정 캐시 초기화
    resetMeasureCache();
    try {
      if (typeof window.reflowBigTextLines === "function")
        window.reflowBigTextLines();
    } catch (e) {}
  }
  window.__BT_scheduleReflow__ = function () {
    if (_scheduled) return;
    _scheduled = true;
    _raf(_run);
    setTimeout(_run, 80); // 느린 레이아웃 안정화 보조(1회)
  };

  // 외부에서 호출하는 안전 훅
  window.rafReflow =
    window.rafReflow ||
    function () {
      window.__BT_scheduleReflow__();
    };
})();

/* ============================================================================
 * Big-Text line wrap detector  (동작 동일, 성능 개선)
 * 구조  : <p class="line"><span class="line_left">…</span><span class="line_right">…</span></p>
 * 범위  : .js-wrapscope, .card_item_detail, .card_item_sub_info, .group_item_detail
 * 조건  : ① 행 가용폭 < (left자연폭 + right자연폭 + gap)
 *         ② 실제 줄바꿈(2줄 이상) 발생
 *         ③ 라벨(A)·값(B) 페어에서 B가 넘치면 A/B 동시 전개
 *         ④ 금액(.money) 임계 비율(0.7~0.75)일 때 사전 전개
 * 공개훅: window.reflowBigTextLines()
 * 안전훅: window.rafReflow()
 * 의존성: jQuery (ES5)
 * ========================================================================== */
(function ($) {
  "use strict";

  var SCOPE =
    ".js-wrapscope, .card_item_detail, .card_item_sub_info, .group_item_detail";
  var ROW = ".line";
  var LEFT = ".line_left";
  var RIGHT = ".line_right";

  // 기존 유틸 그대로 유지
  function _isVisible(el) {
    if (!el) return false;
    var cur = el;
    while (cur && cur !== document.body) {
      var cs = getComputedStyle(cur);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      cur = cur.parentElement;
    }
    var r = __BT_bb__(el);
    return r.width > 0 && r.height > 0;
  }

  function _whenVisible(node, cb) {
    if (_isVisible(node)) {
      cb();
      return;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting && en.target) {
              try {
                io.unobserve(en.target);
              } catch (e) {}
              cb();
            }
          });
        },
        { threshold: 0.01 }
      );
      try {
        io.observe(node);
      } catch (e) {
        cb();
      }
    } else {
      var tries = 30;
      (function poll() {
        if (_isVisible(node)) {
          cb();
          return;
        }
        if (--tries > 0) setTimeout(poll, 80);
      })();
    }
  }

  // 자연폭/크기 헬퍼(캐시 사용)
  var natW = window.__BT_natW__;
  var bb = window.__BT_bb__;

  // nowrap/pre 계열 overflow 보수 처리 포함
  function needStackByRow(rowEl) {
    var cs = getComputedStyle(rowEl);
    var paddingX =
      (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;

    var L = rowEl.querySelector(LEFT);
    var R = rowEl.querySelector(RIGHT);

    var rowInnerW = bb(rowEl).width - paddingX;

    var lNat = natW(L);
    var rNat = natW(R);
    var sumNat = lNat + rNat + (lNat && rNat ? gap : 0);

    function overAllowed(el) {
      if (!el) return false;
      var s = getComputedStyle(el);
      var ws = s.whiteSpace;
      var wrapPossible = !(
        ws === "nowrap" ||
        ws === "pre" ||
        ws === "pre-line" ||
        ws === "pre-wrap"
      );
      return wrapPossible && el.scrollWidth - el.clientWidth > 1;
    }
    return sumNat > rowInnerW + 1 || overAllowed(L) || overAllowed(R);
  }

  function isWrapped(el) {
    if (!el) return false;
    var cs = getComputedStyle(el);
    var ws = cs.whiteSpace;
    if (
      ws === "nowrap" ||
      ws === "pre" ||
      ws === "pre-line" ||
      ws === "pre-wrap"
    )
      return false;

    if ((el.textContent || "").trim() === "" || bb(el).width < 1) return false;

    var fs = parseFloat(cs.fontSize) || 16;
    var lhRaw = cs.lineHeight;
    var lh =
      lhRaw === "normal" || !lhRaw ? fs * 1.3 : parseFloat(lhRaw) || fs * 1.3;
    var h = bb(el).height;
    var MIN_TWO_LINES = 1.85;
    if (h < lh * MIN_TWO_LINES) return false;

    try {
      var range = document.createRange();
      range.selectNodeContents(el);
      var rects = range.getClientRects && range.getClientRects();
      if (rects && rects.length) {
        var lineTops = [];
        for (var i = 0; i < rects.length; i++) {
          var t = Math.round(rects[i].top);
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
        if (lineTops.length < 2) return false;
      }
    } catch (e) {
      return false;
    }

    var overflowX = el.scrollWidth - el.clientWidth > 1;
    if (!overflowX) {
      var row = el.closest(".line") || el.parentElement;
      var rowW = row ? bb(row).width : bb(el).width;
      var L = row ? row.querySelector(".line_left") : null;
      var leftW = L ? bb(L).width : 0;
      var gap = 0;
      if (row) {
        var rcs = getComputedStyle(row);
        gap = parseFloat(rcs.columnGap || rcs.gap || 0) || 0;
      }
      var avail = Math.max(1, rowW - leftW - gap);
      var nat = natW(el);
      if (nat / avail < 0.97) return false;
    }
    return true;
  }

  function isEmptyText(el) {
    if (!el) return true;
    var txt = (el.textContent || "").replace(/\s+/g, "");
    return txt.length === 0 || bb(el).width < 1;
  }

  function reflowScope($scope) {
    var inBig = document.body.classList.contains("font_lg_on");
    var rows = $scope.find(ROW).toArray();

    if (!inBig) {
      // 있는 곳만 지움(불필요 DOM write 최소화)
      for (var k = 0; k < rows.length; k++) {
        if (rows[k].classList.contains("full-line"))
          rows[k].classList.remove("full-line");
      }
      return;
    }

    // 먼저 모두 초기화(있을 때만)
    for (var k = 0; k < rows.length; k++) {
      if (rows[k].classList.contains("full-line"))
        rows[k].classList.remove("full-line");
    }

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var $row = $(row);
      var l = $row.find(LEFT)[0];
      var r = $row.find(RIGHT)[0];

      var stack =
        needStackByRow(row) || (l && isWrapped(l)) || (r && isWrapped(r));

      // 금액(.money) 사전 전개
      if (!stack && r) {
        var moneyEl = r.querySelector(".money");
        if (moneyEl) {
          var cs = getComputedStyle(row);
          var paddingX =
            (parseFloat(cs.paddingLeft) || 0) +
            (parseFloat(cs.paddingRight) || 0);
          var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;
          var rowInnerW = bb(row).width - paddingX;
          var rNat = natW(moneyEl);
          var lNow = l ? bb(l).width : 0;
          var availW = Math.max(1, rowInnerW - lNow - gap);
          if (rNat / availW >= 0.7) stack = true;
        }
      }

      if (stack) {
        if (!row.classList.contains("full-line"))
          row.classList.add("full-line");

        // 값행이면 바로 위 라벨행 동시 전개
        var curIsValueOnly = (!l || isEmptyText(l)) && r && !isEmptyText(r);
        if (curIsValueOnly && i - 1 >= 0) {
          var prev = rows[i - 1];
          var lp = prev.querySelector(LEFT);
          var rp = prev.querySelector(RIGHT);
          var prevIsLabelOnly =
            lp && !isEmptyText(lp) && (!rp || isEmptyText(rp));
          if (prevIsLabelOnly && !prev.classList.contains("full-line"))
            prev.classList.add("full-line");
        }
        continue;
      }

      // 라벨(A) → 값(B) 페어 처리
      var isLabelOnly = l && !isEmptyText(l) && (!r || isEmptyText(r));
      if (isLabelOnly && i + 1 < rows.length) {
        var next = rows[i + 1];
        var l2 = next.querySelector(LEFT);
        var r2 = next.querySelector(RIGHT);
        var isValueOnly = (!l2 || isEmptyText(l2)) && r2 && !isEmptyText(r2);

        if (isValueOnly) {
          var stackB =
            needStackByRow(next) ||
            (l2 && isWrapped(l2)) ||
            (r2 && isWrapped(r2));
          if (!stackB && r2) {
            var money2 = r2.querySelector(".money");
            if (money2) {
              var cs2 = getComputedStyle(next);
              var paddingX2 =
                (parseFloat(cs2.paddingLeft) || 0) +
                (parseFloat(cs2.paddingRight) || 0);
              var gap2 = parseFloat(cs2.columnGap || cs2.gap || 0) || 0;
              var rowInnerW2 = bb(next).width - paddingX2;
              var rNat2 = natW(money2);
              var lNow2 = l2 ? bb(l2).width : 0;
              var availW2 = Math.max(1, rowInnerW2 - lNow2 - gap2);
              if (rNat2 / availW2 >= 0.75) stackB = true;
            }
          }
          if (stackB) {
            if (!row.classList.contains("full-line"))
              row.classList.add("full-line");
            if (!next.classList.contains("full-line"))
              next.classList.add("full-line");
            i++;
          }
        }
      }
    }
  }

  function reflowAll() {
    // 사이클 시작 시 캐시 초기화(보장)
    window.__BT_resetMeasureCache__();
    $(SCOPE).each(function () {
      var node = this;
      if (!_isVisible(node)) {
        _whenVisible(node, function () {
          reflowScope($(node));
        });
      } else {
        reflowScope($(node));
      }
    });
  }
  window.reflowBigTextLines = reflowAll;

  $(function () {
    reflowAll();
  });
  (function () {
    var t;
    $(window).on("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        window.__BT_scheduleReflow__();
      }, 120);
    });
  })();
})(window.jQuery);

/* ============================================================================
 *  d_list 구조 지원 (동일 동작, 성능 개선)
 * ========================================================================== */
(function ($) {
  "use strict";

  function dNat(el) {
    return window.__BT_natW__(el);
  }

  function reflowDList(ctx) {
    var inBig = document.body.classList.contains("font_lg_on");
    var $items = $(ctx || document).find("ul.d_list li");

    if (!inBig) {
      // 붙어있는 것만 제거
      $items.each(function () {
        this.classList.remove("full-line");
      });
      return;
    }

    $items.each(function () {
      var li = this;
      var l = li.querySelector(".d_list_l");
      var r = li.querySelector(".d_list_r");

      // 초기화(있을 때만)
      if (li.classList.contains("full-line")) li.classList.remove("full-line");
      if (!l || !r) return;

      var cs = getComputedStyle(li);
      var padX =
        (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      var inner = window.__BT_bb__(li).width - padX;
      if (inner <= 0) return;

      var need = dNat(l) + dNat(r) > inner + 1;
      if (need && !li.classList.contains("full-line"))
        li.classList.add("full-line");
    });
  }

  var _prevReflow = window.reflowBigTextLines;
  window.reflowBigTextLines = function () {
    try {
      if (typeof _prevReflow === "function") _prevReflow();
    } catch (e) {}
    reflowDList(document);
  };

  $(function () {
    reflowDList(document);
    var t;
    $(window).on("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        window.__BT_scheduleReflow__();
      }, 120);
    });
  });

  try {
    var mo = new MutationObserver(function (muts) {
      // 추가 노드가 많아도 1회만 스케줄 (성능)
      var hit = false;
      for (var i = 0; i < muts.length; i++) {
        var ad = muts[i].addedNodes;
        for (var j = 0; j < ad.length; j++) {
          var n = ad[j];
          if (
            n &&
            n.querySelector &&
            ((n.matches && n.matches("ul.d_list, li")) ||
              n.querySelector("ul.d_list"))
          ) {
            hit = true;
            break;
          }
        }
        if (hit) break;
      }
      if (hit) window.__BT_scheduleReflow__();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  } catch (e) {}
})(window.jQuery);

/* ----- Device Toolbar / VisualViewport / WebFont 대책: 늦은 재계산 훅 (경량) ----- */
(function () {
  function lateRecalc() {
    var n = 2; // 프레임 수축(중복 줄이기)
    function tick() {
      window.__BT_scheduleReflow__();
      if (--n > 0) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (window.visualViewport) {
    visualViewport.addEventListener("resize", lateRecalc, { passive: true });
    visualViewport.addEventListener("scroll", lateRecalc, { passive: true });
  }

  window.addEventListener("orientationchange", lateRecalc, { passive: true });
  window.addEventListener("pageshow", lateRecalc, { passive: true });

  window.addEventListener("load", function () {
    lateRecalc();
    setTimeout(lateRecalc, 200);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(lateRecalc).catch(function () {});
  }
})();

/* ======================= iOS 전용 보강(동작 동일, 호출 축소) ======================= */
(function () {
  var ua = navigator.userAgent || "";
  var isiOS =
    /iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && "ontouchend" in document);
  if (!isiOS) return;

  function isWrappedIOS(el) {
    if (!el) return false;

    var cs = getComputedStyle(el);
    var base = document.createElement("div");
    base.style.cssText = [
      "position:absolute",
      "left:-99999px",
      "top:0",
      "visibility:hidden",
      "contain:layout",
      "box-sizing:border-box",
      "width:" + el.clientWidth + "px",
      "white-space:normal",
      "word-break:normal",
      "overflow-wrap:normal",
      "display:block",
      "flex:none",
      "flex-basis:auto",
    ].join(";");

    var clone = el.cloneNode(true);
    clone.style.whiteSpace = "normal";
    clone.style.wordBreak = "normal";
    clone.style.overflowWrap = "normal";
    clone.style.display = "inline-block";
    clone.style.flex = "none";
    clone.style.flexBasis = "auto";

    base.appendChild(clone);
    document.body.appendChild(base);

    var fs = parseFloat(cs.fontSize) || 16;
    var lhR = cs.lineHeight;
    var lh = lhR === "normal" || !lhR ? fs * 1.2 : parseFloat(lhR) || fs * 1.2;

    var wrapped = base.scrollHeight > lh * 1.25;
    document.body.removeChild(base);
    return wrapped;
  }

  var ROW = ".line, .d_list li";
  var LEFT = ".line_left, .d_list_l";
  var RIGHT = ".line_right, .d_list_r";

  function reflowIOSFix() {
    if (!document.body.classList.contains("font_lg_on")) return;

    var scopes = document.querySelectorAll(
      ".js-wrapscope, .card_item_detail, .card_item_sub_info, .group_item_detail, .d_list"
    );

    Array.prototype.forEach.call(scopes, function (scope) {
      var rows = scope.querySelectorAll(ROW);
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.classList.contains("full-line")) continue;

        var l = row.querySelector(LEFT);
        var r = row.querySelector(RIGHT);
        if (!r) continue;

        if (isWrappedIOS(r)) {
          row.classList.add("full-line");
          if ((!l || (l.textContent || "").trim() === "") && i - 1 >= 0) {
            var prev = rows[i - 1];
            var lp = prev && prev.querySelector(LEFT);
            var rp = prev && prev.querySelector(RIGHT);
            var prevIsLabelOnly =
              lp &&
              (lp.textContent || "").trim() !== "" &&
              (!rp || (rp.textContent || "").trim() === "");
            if (prevIsLabelOnly) prev.classList.add("full-line");
          }
        }
      }
    });
  }

  var n = 2;
  (function tick() {
    reflowIOSFix();
    if (--n > 0) requestAnimationFrame(tick);
  })();

  var _orig = window.reflowBigTextLines;
  window.reflowBigTextLines = function () {
    if (typeof _orig === "function") _orig();
    reflowIOSFix();
  };
})();

/* ============================================================
 * [ADD] d_list + linkTo 전개 보강 (동작 동일, 스케줄만 경량화)
 * ============================================================ */
(function () {
  var THRESHOLD = 0.75;
  var __prevReflow__ = window.reflowBigTextLines;

  function DL_natural(el) {
    return window.__BT_natW__(el);
  }
  function DL_wrapped(el) {
    if (!el) return false;
    if (el.getClientRects && el.getClientRects().length > 1) return true;
    var cs = getComputedStyle(el);
    if (
      cs.whiteSpace === "nowrap" ||
      cs.whiteSpace === "pre" ||
      cs.whiteSpace === "pre-line" ||
      cs.whiteSpace === "pre-wrap"
    ) {
      return false;
    }
    return el.scrollWidth - el.clientWidth > 1;
  }

  function _isVisible(el) {
    if (!el) return false;
    var cur = el;
    while (cur && cur !== document.body) {
      var cs = getComputedStyle(cur);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      cur = cur.parentElement;
    }
    var r = window.__BT_bb__(el);
    return r.width > 0 && r.height > 0;
  }

  function _whenVisible(node, cb) {
    if (_isVisible(node)) {
      cb();
      return;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) {
              try {
                io.unobserve(en.target);
              } catch (e) {}
              cb();
            }
          });
        },
        { threshold: 0 }
      );
      try {
        io.observe(node);
      } catch (e) {
        cb();
      }
    } else {
      var tries = 30;
      (function poll() {
        if (_isVisible(node)) {
          cb();
          return;
        }
        if (--tries > 0) setTimeout(poll, 80);
      })();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function DL_reflowDList(ctx) {
    var inBig = document.body.classList.contains("font_lg_on");
    var root = ctx || document;
    var $items = $(root).find("ul.d_list li");

    if (!inBig) {
      $items.each(function () {
        this.classList.remove("full-line");
      });
      return;
    }

    $items.each(function () {
      var li = this;
      var a = li.querySelector("a.linkTo");
      var base = a || li;
      var L = base.querySelector(".d_list_l") || li.querySelector(".d_list_l");
      var R = base.querySelector(".d_list_r") || li.querySelector(".d_list_r");

      if (li.classList.contains("full-line")) li.classList.remove("full-line");
      if (a && a.classList.contains("full-line"))
        a.classList.remove("full-line");
      if (!L || !R) return; // 좌/우가 없는 행은 제외

      // --- 내폭 계산을 더 튼튼하게 (fallback 다단계) ---
      var cs = getComputedStyle(base);
      var padX =
        (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);

      // 1차: clientWidth (패딩 포함) → content 폭으로 변환
      var w1 = base.clientWidth; // padding 포함
      var inner = w1 ? w1 - padX : 0;

      // 2차: getBoundingClientRect (일부 환경에서 더 정확)
      if (inner <= 0) {
        var rectW = base.getBoundingClientRect().width; // padding 포함
        inner = rectW ? rectW - padX : 0;
      }

      // 3차: offsetWidth 기반 보조
      if (inner <= 0) {
        var off = base.offsetWidth; // border 포함
        var bwL = parseFloat(cs.borderLeftWidth) || 0;
        var bwR = parseFloat(cs.borderRightWidth) || 0;
        inner = off ? off - padX - bwL - bwR : 0;
      }

      // 4차: 부모로 한 단계 올라가 재계산(ul이 0 폭일 때)
      if (inner <= 0 && base.parentElement) {
        var p = base.parentElement;
        var pcs = getComputedStyle(p);
        var pPadX =
          (parseFloat(pcs.paddingLeft) || 0) +
          (parseFloat(pcs.paddingRight) || 0);
        var pw = p.getBoundingClientRect().width;
        inner = pw ? Math.max(0, pw - pPadX) : 0;
      }

      // 여전히 측정이 불가 → 보일 때 재시도 예약
      if (inner <= 0) {
        _whenVisible(base, function () {
          DL_reflowDList(li);
        });
        return;
      }

      // gap(열 간격) 고려
      var gap = parseFloat(cs.columnGap || cs.gap || 0) || 0;

      // 자연폭(캐시 사용) + 실제 줄바꿈 감지
      var need =
        window.__BT_natW__(L) + window.__BT_natW__(R) + gap > inner + 1 ||
        DL_wrapped(L) ||
        DL_wrapped(R);

      // 금액(.money) 보강(ty1에서도 동일 적용)
      if (!need) {
        var money = R.querySelector(".money");
        if (money) {
          var lNow = window.__BT_bb__(L).width;
          var avail = Math.max(1, inner - lNow - gap);
          if (window.__BT_natW__(money) / avail >= 0.75) need = true;
        }
      }

      if (need) {
        li.classList.add("full-line");
        if (a) a.classList.add("full-line");
      }
    });
  }

  window.reflowBigTextLines = function () {
    try {
      if (typeof __prevReflow__ === "function") __prevReflow__();
    } catch (e) {}
    try {
      DL_reflowDList(document);
    } catch (e) {}
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      DL_reflowDList(document);
    });
  } else {
    DL_reflowDList(document);
  }
})();

/*  ===== JEX/SPA 전환 + Ajax + DOM주입 + 리사이즈 대응 재계산 스케줄러(안전가드) ===== */
(function () {
  // __BT_scheduleReflow__가 아직 없더라도 죽지 않게 폴백 제공
  var schedule =
    window.__BT_scheduleReflow__ ||
    function () {
      try {
        if (typeof window.reflowBigTextLines === "function")
          window.reflowBigTextLines();
      } catch (e) {}
    };

  // 이후에 __BT_scheduleReflow__가 정의되면 자동 교체되도록 getter/setter 래핑
  if (!window.__BT___hookBound) {
    Object.defineProperty(window, "__BT_scheduleReflow__", {
      configurable: true,
      set: function (fn) {
        schedule = fn;
      },
      get: function () {
        return schedule;
      },
    });
    window.__BT___hookBound = true;
  }

  // 1) 뷰포트/윈도우 이벤트
  if (window.visualViewport) {
    visualViewport.addEventListener(
      "resize",
      function () {
        schedule();
      },
      { passive: true }
    );
    visualViewport.addEventListener(
      "scroll",
      function () {
        schedule();
      },
      { passive: true }
    );
  }
  window.addEventListener(
    "resize",
    function () {
      schedule();
    },
    { passive: true }
  );
  window.addEventListener(
    "orientationchange",
    function () {
      schedule();
    },
    { passive: true }
  );
  window.addEventListener(
    "pageshow",
    function () {
      schedule();
    },
    { passive: true }
  );
  document.addEventListener("DOMContentLoaded", function () {
    schedule();
  });

  // 2) Ajax 완료 시점
  try {
    if (window.jQuery && jQuery(document)) {
      jQuery(document).on("ajaxComplete", function () {
        schedule();
      });
    }
  } catch (e) {}

  // 3) JEX 네비게이션 훅 (존재할 때만 래핑)
  try {
    if (window.jex && jex.mobile && jex.mobile.svc) {
      var svc = jex.mobile.svc();
      ["load", "goPage", "goPage2", "reload"].forEach(function (name) {
        if (typeof svc[name] === "function") {
          var orig = svc[name];
          svc[name] = function () {
            var ret = orig.apply(this, arguments);
            setTimeout(schedule, 0);
            setTimeout(schedule, 80);
            return ret;
          };
        }
      });
    }
  } catch (e) {}

  // 4) 최초 1회
  try {
    schedule();
  } catch (e) {}
})();



(function () {
  // 안전 스케줄러: 중복 호출 억제 + 레이아웃 안정까지 2패스
  var scheduled = false;
  function scheduleReflow() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(run);
    setTimeout(run, 80);
  }
  function run() {
    scheduled = false;
    try { if (typeof window.reflowBigTextLines === "function") window.reflowBigTextLines(); } catch (e) {}
  }

  // “보일 때” 한 번만 재계산: 숨김 상태였다가 처음 보이게 되는 컨테이너/리스트를 관찰
  function reflowWhenVisible(root) {
    var targets = (root || document).querySelectorAll(
      // 좌/우 라인 구조 전체 + d_list 계열 전체
      ".group_item_detail, .card_item_detail, .card_item_sub_info, .js-wrapscope, ul.d_list, ul.sub_d_list"
    );
    if (!targets.length) return;

    // 보이는지 판정
    function isVisible(el) {
      if (!el) return false;
      var cur = el;
      while (cur && cur !== document.body) {
        var cs = getComputedStyle(cur);
        if (cs.display === "none" || cs.visibility === "hidden") return false;
        cur = cur.parentElement;
      }
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }

    // IntersectionObserver로 “처음 보일 때” 1회만 재계산
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (ents) {
        var hit = false;
        ents.forEach(function (en) {
          if (en.isIntersecting) {
            try { io.unobserve(en.target); } catch (e) {}
            hit = true;
          }
        });
        if (hit) scheduleReflow();
      }, { threshold: 0.01 });

      targets.forEach(function (node) {
        // 이미 보이는 건 바로 재계산, 숨겨진 건 보일 때까지 대기
        if (isVisible(node)) {
          scheduleReflow();
        } else {
          try { io.observe(node); } catch (e) {}
        }
      });
    } else {
      // 폴백: 보일 때까지 폴링 (최대 30회)
      var tries = 30;
      (function poll() {
        var any = false;
        targets.forEach(function (node) {
          if (isVisible(node)) any = true;
        });
        if (any) scheduleReflow();
        else if (--tries > 0) setTimeout(poll, 80);
      })();
    }
  }

  // 1) 최초 진입
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      reflowWhenVisible(document);
      scheduleReflow();
    });
  } else {
    reflowWhenVisible(document);
    scheduleReflow();
  }

  // 2) 진짜 로드/웹폰트/툴바 등 “늦게 바뀌는” 요인까지 커버
  window.addEventListener("load", function(){
    scheduleReflow();
    setTimeout(scheduleReflow, 200);
    setTimeout(scheduleReflow, 600);
  }, {passive:true});

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleReflow).catch(function(){});
  }
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", scheduleReflow, {passive:true});
    visualViewport.addEventListener("scroll", scheduleReflow, {passive:true}); // 모바일 키보드
  }
  window.addEventListener("orientationchange", scheduleReflow, {passive:true});
  window.addEventListener("pageshow", scheduleReflow, {passive:true});

  // 3) JEX 화면 전환 완료 신호 훅 (있을 때만)
  //   - 너가 말한 “JEX 전환 한 번 해야 정상” 현상을 바로 여기서 끊어줌
  try {
    // 커스텀 이벤트 버전
    document.addEventListener("JEX_PAGE_READY", scheduleReflow);
  } catch (e) {}

  // 4) AJAX/DOM 주입: 리스트가 나중에 붙는 경우 자동 재계산
  try {
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(function (muts) {
        var need = false;
        for (var i = 0; i < muts.length; i++) {
          var ad = muts[i].addedNodes || [];
          for (var j = 0; j < ad.length; j++) {
            var n = ad[j];
            if (!n || !n.querySelector) continue;
            if (
              (n.matches && n.matches("ul.d_list, ul.sub_d_list, .group_item_detail, .card_item_detail, .card_item_sub_info, .js-wrapscope")) ||
              n.querySelector("ul.d_list, ul.sub_d_list, .group_item_detail, .card_item_detail, .card_item_sub_info, .js-wrapscope")
            ) {
              reflowWhenVisible(n);
              need = true;
              break;
            }
          }
          if (need) break;
        }
        if (need) scheduleReflow();
      });
      mo.observe(document.body, {childList:true, subtree:true});
    }
  } catch (e) {}

  // 5) jQuery ajaxComplete (JEX 내부가 Ajax 쓸 때)
  try {
    if (window.jQuery && jQuery(document)) {
      jQuery(document).on("ajaxComplete", function(){
        reflowWhenVisible(document);
        scheduleReflow();
      });
    }
  } catch (e) {}
})();


/*==========================e: test ================================================*/
