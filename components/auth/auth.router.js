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
    return passport.authenticate('local', function(err, user, info) {
      if (err) { res.json( { error: err }); return next(); }
      if (!user) { res.json( { error: 'Unauthorised' }); return next(); }
      req.logIn(user, function(err) {
        if (err) { res.json( { error: err }); return next(); }
        next();
      })
    })(req, res, next);
  },
  auth.issueJwt)

module.exports = routerInstance;