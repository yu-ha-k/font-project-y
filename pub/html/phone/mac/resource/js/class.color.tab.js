/**
 * class.color.tab.js
 * 대시보드 탭 전환 관련 js
 **/
$(document).ready(function () {
    $(".tab-allBank").click(function () {
        $(this).parents(".bg").removeClass("b-pink");
        $(this).parents(".bg").removeClass("b-purple");
        $(this).parents(".bg").removeClass("b-green");
        $(this).parents(".bg").removeClass("b-dark-gn");
        $(this).parents(".bg").addClass("b-skyblue");
    });
    $(".tab-tl").click(function () {
        $(this).parents(".bg").removeClass("b-skyblue");
        $(this).parents(".bg").removeClass("b-purple");
        $(this).parents(".bg").removeClass("b-green");
        $(this).parents(".bg").removeClass("b-dark-gn");
        $(this).parents(".bg").addClass("b-pink");
    });
    $(".tab-cashIn").click(function () {
        $(this).parents(".bg").removeClass("b-skyblue");
        $(this).parents(".bg").removeClass("b-pink");
        $(this).parents(".bg").removeClass("b-green");
        $(this).parents(".bg").removeClass("b-dark-gn");
        $(this).parents(".bg").addClass("b-purple");
    });
    $(".tab-cashOut").click(function () {
        $(this).parents(".bg").removeClass("b-skyblue");
        $(this).parents(".bg").removeClass("b-pink");
        $(this).parents(".bg").removeClass("b-purple");
        $(this).parents(".bg").removeClass("b-dark-gn");
        $(this).parents(".bg").addClass("b-green");
    });
    $(".tab-More").click(function () {
        $(this).parents(".bg").removeClass("b-skyblue");
        $(this).parents(".bg").removeClass("b-pink");
        $(this).parents(".bg").removeClass("b-purple");
        $(this).parents(".bg").removeClass("b-green");
        $(this).parents(".bg").addClass("b-dark-gn");
    });
});