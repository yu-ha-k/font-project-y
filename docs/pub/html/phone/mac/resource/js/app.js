(function() {
  'use strict';

	// TODO add service worker code here
  if ('serviceWorker' in navigator) {
	  console.log("Will the service worker register?");
	    navigator.serviceWorker.register('/mac/smpl/service-worker.js?2018103003')
	      .then(function(reg){
	        console.log("Yes, it did.");
	     }).catch(function(err) {
	        console.log("No it didn't. This happened:", err)
	    });
	}
})();
