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
auth.protectRoute,
function(req, res, next) {
  res.end("Login Allowed");
  next();
})

module.exports = routerInstance;