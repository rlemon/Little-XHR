/* urlstringify(object)
 * by: Titani		https://github.com/Titani
 * All questions, concerns, or comments should be directed towards him.
 * 
 * I have included this source for referece, as it is required for my script.
 * 
 * Thankyou @Zirak (Titani) for showing me this script. It has proved very useful.
 * */

var urlstringify = (function() {
    //simple types, for which toString does the job
    //used in singularStringify
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
}());
