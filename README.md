#Little XHR

###A light-weight XmlHttpRequest Object
*For when you just need to do the little things.*

###Sample Usage:
	
	xhr.get({
		url: "http://example.com/some/page", /* URL String */
		success: function(xhrObject) { }, /* Optional Success Function */
		failure: function(xhrObject) { }, /* Optional Failure Function */
		enctype: "multipart/form-data" /* Optional Content-Type [default: application/x-www-form-urlencoded] */
	});
	
	xhr.post({
		url: "http://example.com/some/page", /* URL String */
		success: function(xhrObject) { }, /* Optional Success Function */
		failure: function(xhrObject) { }, /* Optional Failure Function */
		enctype: "multipart/form-data", /* Optional Content-Type [default: application/x-www-form-urlencoded] */
		data: {"json":"data"} /* Optional data */
	});
	
	xhr.request("POST" /* Request Type: GET or POST */, {
		url: "http://example.com/some/page", /* URL String */
		success: function(xhrObject) { }, /* Optional Success Function */
		failure: function(xhrObject) { }, /* Optional Failure Function */
		enctype: "multipart/form-data", /* Optional Content-Type [default: application/x-www-form-urlencoded] */
		data: {"json":"data"} /* Optional data */
	});
	

Please report any bugs or suggested improvements. Keep in mind this is meant to be a barebones xhr object and not some bloated AJAX library.
