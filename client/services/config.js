module.exports.baseUrl = "http://localhost:8888";

module.exports.prepareRequest = function (method, path) {
    return {
        method: method,
        url: path,
        extract: function(xhr) {
            if (xhr.status === 401) {
                console.error("Unauthorised method", method, "path", path, "response:",
                    xhr.status, xhr.responseText);
                m.route('/login');
            }
            return xhr.responseText;
        }
    }
};