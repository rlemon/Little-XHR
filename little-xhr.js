/* Little XHR
 * by: rlemon		http://github.com/rlemon/
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
                            options.success.apply(this, [_xhr.responseText]);
                        }
                    } else if (_xhr.status && _xhr.status != 200) {
                        if (typeof options.failure === 'function') {
                            options.failure.apply(this);
                        }
                    }
                }
            };
            var data = null;
            if ('data' in options) {
                /* this depends on a function by Titani (@Zirak)
                 * https://github.com/Titani
                 * */
                data = urlstringify(options.data);
                
                /* use if you do not want to pull urlstringify() */
                // data = "json=" + JSON.stringify(options.data);
            }
            _xhr.send(data);
        }
    }
};
