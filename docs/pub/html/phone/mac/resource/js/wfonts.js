WebFontConfig = {
		active: function() { sessionStorage.fonts = true; },
	    custom: {
	        families: ['Nanum Gothic'],
	        urls: ['/css/webfont.css']
	    }
	  };
(function() {
	var wf = document.createElement('script');
	wf.src = '/app01/js/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})(); 

