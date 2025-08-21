$(document).ready(function(){
	$(function(){
        // YYYY-MM-DD
		$(".autoHypen").keydown(function(event){
			var key = event.charCode || event.keyCode || 0;
			$text = $(this);
			if (key !== 8 && key !== 9) {
				if($text.val().length == 4) { $text.val($text.val()+'-')}
				if($text.val().length == 7) { $text.val($text.val()+'-')}
			}
			// return (key == 8 || key == 9 || key == 46 || (key >=48&&key<=57)||(key>=96&&key<=105));
        });
        $(".phoneHypen").keydown(function(){
            var textVal = $(".phoneHypen").val();
            textVal = textVal.replace(/[^0-9]/g,'');
            var tmp = '';

            if (textVal.length > 3 && textVal.length<=7) {
                tmp += textVal.substr(0,3);
                tmp += '-';
                tmp += textVal.substr(3);
                return $(".phoneHypen").val(tmp);
            } else if (textVal.length > 7) {
                tmp += textVal.substr(0,3);
                tmp += '-';
                tmp += textVal.substr(3,4);
                tmp += '-';
                tmp += textVal.substr(7);
                return $(".phoneHypen").val(tmp);
            }
        });
         
	});
});