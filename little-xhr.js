/*
Copyright (c) 2012, Robert Lemon
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Little XHR
by: rlemon        http://github.com/rlemon/
see README for useage.
*/
var xhr = {
	xmlhttp: (function() {
		var xmlhttp;
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (er) {
				try {
					xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (err) {
					xmlhttp = false;
				}
			}
		}
		return xmlhttp;
	}()),
	 /* https://github.com/Titani/SO-ChatBot/blob/ccf6cfe827aee2af7b2832e48720a8e24a8feeed/source/bot.js#L110 */
	urlstringify: (function() {
		var simplies = {
			'number': true,
			'string': true,
			'boolean': true
		};
		var singularStringify = function(thing) {
			if (typeof thing in simplies) {
				return encodeURIComponent(thing.toString());
			}
			return '';
		};
		var arrayStringify = function(array, keyName) {
			keyName = singularStringify(keyName);
			return array.map(function(thing) {
				return keyName + '=' + singularStringify(thing);
			});
		};
		return function(obj) {
			return Object.keys(obj).map(function(key) {
				var val = obj[key];
				if (Array.isArray(val)) {
					return arrayStringify(val, key);
				} else {
					return singularStringify(key) + '=' + singularStringify(val);
				}
			}).join('&');
		};
	}()),
	post: function(options) {
		this.request.apply(this, ['POST', options]);
	},
	get: function(options) {
		this.request.apply(this, ['GET', options]);
	},
	request: function(type, options) {
		if (this.xmlhttp && options && 'url' in options) {
			var xhr = this.xmlhttp,
				enctype = ('enctype' in options) ? options.enctype : 'application/x-www-form-urlencoded';
			xhr.open(type, options.url, true);
			xhr.setRequestHeader('Content-Type', enctype);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						if ('success' in options && options.success.apply) {
							options.success.apply(this, [xhr]);
						}
					} else if (xhr.status && xhr.status != 200) {
						if ('failure' in options && options.failure.apply) {
							options.failure.apply(this, [xhr]);
						}
					}
				}
			};
			var data = null;
			if ('data' in options) {
				data = this.urlstringify.apply(this, [options.data]);
			}
			xhr.send(data);
		}
	}
};
