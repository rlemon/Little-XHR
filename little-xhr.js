/* Little XHR
 * by: rlemon        http://github.com/rlemon/
 * see README for useage.
 * */
var xhr = {
    xmlhttp: (function() {
        var xmlhttp;
        try {
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (er) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (err) {
                    xmlhttp = false;
                }
            }
        }
        return xmlhttp;
    }()),
    urlstringify: (function() { /* Thankyou https://github.com/Titani */
        var simplies = {
            number: true,
            string: true,
            boolean: true
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
        this.request.apply(this, ["POST", options]);
    },
    get: function(options) {
        this.request.apply(this, ["GET", options]);
    },
    request: function(type, options) {
        if (this.xmlhttp && options && 'url' in options) {
            var _xhr = this.xmlhttp;
            _xhr.open(type, options.url, true);
            _xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            _xhr.onreadystatechange = function() {
                if (_xhr.readyState == 4) {
                    if (_xhr.status == 200) {
                        if (typeof options.success === 'function') {
                            options.success.apply(this, [_xhr]);
                        }
                    } else if (_xhr.status && _xhr.status != 200) {
                        if (typeof options.failure === 'function') {
                            options.failure.apply(this, [_xhr]);
                        }
                    }
                }
            };
            var data = null;
            if ('data' in options) {
                data = this.urlstringify.apply(this, [options.data]);
            }
            _xhr.send(data);
        }
    }
};
