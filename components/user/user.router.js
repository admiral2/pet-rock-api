var restify = require('restify');
var Router = require('restify-router').Router;
var routerInstance = new Router();
var Errors = require('../../util/errors');

var Auth = require('../auth');

var controller = require('./user.controller');

routerInstance.get('/', Auth.protectRoute, function(req, res, next) {
  res.json(req.user);
  next();
});


module.exports = routerInstance;
