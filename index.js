var restify = require('restify');

var db = require('./models');

var configurationRouter = require('./components/configuration/configuration.router');
var storeRouter = require('./components/store/store.router');

var server = restify.createServer();

server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.102:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


configurationRouter.applyRoutes(server, '/api/config');
storeRouter.applyRoutes(server, '/');

server.listen(8090, function() {
  console.log('%s listening at %s', server.name, server.url);
});
