$(function() {

	console.log("EXECUTE_POST_API");
	
	var element_wrap	= $(".container_addr").get(0);
	var openPost		= new daum.Postcode({	oncomplete: function(data) {
        											$(".price-amt[data-jno=ADDR]").html(data['jibunAddress']);
        											jnut.getServiceManager("v2ssem").add("/svc/com/com_0004_01", {"ADDR_OBJ":data}, function(data) {
	        											$(".remove_input_bldg_add").click();
	        											setTimeout(function() { openPost.embed(element_wrap, {autoClose:true}); },300);
    												}, function() {}).execute(undefined, this);
									            },
												onresize : function(size) {
										        },
										        width	: '100%',
										        height	: '100%'
											});
	
	openPost.embed(element_wrap, {autoClose:true});
});
