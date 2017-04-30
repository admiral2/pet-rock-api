var restify = require('restify');
var bodyParser = require('body-parser');

var auth = require('./components/auth');

var configurationRouter = require('./components/configuration/configuration.router');
var authRouter = require('./components/auth/auth.router');
var userRouter = require('./components/user/user.router');
var storeRouter = require('./components/store/store.router');

var server = restify.createServer();

restify.CORS.ALLOW_HEADERS.push("authorization");
restify.CORS.ALLOW_HEADERS.push("content-type");

server.use(restify.CORS());
server.use(restify.fullResponse());

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(auth.initialize());

authRouter.applyRoutes(server, '/auth');
userRouter.applyRoutes(server, '/user');
configurationRouter.applyRoutes(server, '/api/config');
storeRouter.applyRoutes(server, '/');

server.listen(8090, function() {
  console.log('%s listening at %s', server.name, server.url);
});
