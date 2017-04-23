var restify = require('restify');
var Router = require('restify-router').Router;
var routerInstance = new Router();
var passport = require('passport');


var auth = require('.');

routerInstance.get('/', function(req, res, next) {
  res.redirect(req.url + '/login', next);
})

routerInstance.get('/login', function(req, res, next) {
    res.end('<html><form action="login" method="post"><input name="email"><input name="password"><input type="submit"></form></html>');
    next();
});

routerInstance.post('/login', 
  function(req, res, next) {
    return passport.authenticate('json', function(err, user, info) {
      if (err) { return next(new restify.InternalServerError(err)) }
      if (!user) { return next(new restify.InvalidCredentialsError("Credentials Not Found")) }
      req.logIn(user, function(err) {
        if (err) { return next(new restify.InternalServerError(err)) }
        next();
      })
    })(req, res, next);
  },
  auth.issueJwt)

module.exports = routerInstance;