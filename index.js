var restify = require('restify');

var db = require('./models');

var configurationRouter = require('./components/configuration/configuration.router');
var storeRouter = require('./components/store/store.router');

var server = restify.createServer();
configurationRouter.applyRoutes(server, '/api/config');
storeRouter.applyRoutes(server, '/');

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
