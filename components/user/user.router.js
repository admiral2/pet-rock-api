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

routerInstance.get('/apps', Auth.protectRoute, function(req, res, next) {
  controller.getApps(req.user)
    .then(function(res) {
      res.json(res);
      next();
    })
    .catch(function(err) {
      if (err.httpCode == 404) {
        return next(new restify.NotFoundError(err.message));
      }
      next(new restify.InternalServerError(err));
    })
})

routerInstance.post('/apps', Auth.protectRoute, function(req, res, next) {
  controller.addApp(req.user, req.params['id'])
    .then(function(apps) {
      res.status(201)
      res.json(apps);
      next();
    })
    .catch(function(err) {
      if (err.httpCode == 404) {
        return next(new restify.NotFoundError(err.message));
      }
      next(new restify.InternalServerError(err));
    })
})


module.exports = routerInstance;
