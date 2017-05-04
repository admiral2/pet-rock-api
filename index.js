var log = require('./util/logger');

var restify = require('restify');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var auth = require('./components/auth');

var configurationRouter = require('./components/configuration/configuration.router');
var authRouter = require('./components/auth/auth.router');
var userRouter = require('./components/user/user.router');
var storeRouter = require('./components/store/store.router');

var server = restify.createServer({
  name: 'Pet Rock API'
});

restify.CORS.ALLOW_HEADERS.push("authorization");
restify.CORS.ALLOW_HEADERS.push("content-type");

server.use(morgan('dev'));

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
  log.info('%s listening at %s', server.name, server.url)
});
