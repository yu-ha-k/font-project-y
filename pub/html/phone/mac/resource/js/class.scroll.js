$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
        $("header.tr").removeClass("transp");
    } else {
        $("header.tr").addClass("transp");
    }
});
 