/**
 * pack.unsel.date.js
 * input[type=date] 클릭시 기간버튼 asel-target seleceted 를 unselect (거래내역 조회, 전은행 계좌조회 전용)
 **/

$(document).ready(function () {
	// 날짜 직접 선택시 기간버튼 UNSELECT
    $("input[type=text].autoHypen").click(function() {
        $(".sm-btn").removeClass("selected");
        $(".sm-btn").removeAttr("data-jng");
        $(".sm-btn").removeAttr("data-jns");
        $(".sm-btn").attr("data-jni","0")
   });		
   	 
});
