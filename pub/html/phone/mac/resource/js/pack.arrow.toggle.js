/**
 * pack.arrow.toggle.js
 * 검색버튼, 상세내역 클릭시 down-arrow 아이콘 UP/DOWN으로 전환
 **/
$(document).ready(function () {
    $(".search_btn").click(function () { $(this).children(".icon-down-b").toggleClass("icon-up-b"); });
    // $(".toggle-down").click(function () { $(this).find().children(".icon-down").toggleClass("icon-up"); });
    // $(".toggle-down").click(function () { $(this).find().children(".icon-up").toggleClass("icon-down"); });
    // $(".t-wrap ").bind( 'click', function() { $(this).parent().click();  $(this).children().toggleClass("selected");  return false; });
    // $(".gray-tit-wrap.tg").bind('click',function() {$(this).children(".evticon").click(); });
    // $(".tg").click(function () { $(this).next('.tg_con').slideToggle(150); });
    $(".tab-toggle .toggle").click(function () { $(this).parent().find(".toggle").removeClass("selected"); $(this).addClass("selected"); });
});
