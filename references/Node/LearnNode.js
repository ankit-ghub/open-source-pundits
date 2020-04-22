var http = require('http');
exports.myDateTime = function () {
    return Date();
};
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8085);