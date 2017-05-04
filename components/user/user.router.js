var restify = require('restify');
var Router = require('restify-router').Router;
var routerInstance = new Router();
var errorHandler = require('../../util/error_handler');

var Auth = require('../auth');

var controller = require('./user.controller');

routerInstance.get('/', Auth.protectRoute, function(req, res, next) {
  res.json(req.user);
  next();
});

routerInstance.get('/apps', Auth.protectRoute, function(req, res, next) {
  controller.getApps(req.user)
    .then(function(response) {
      res.json(response);
      next();
    })
    .catch(function(err) {
      if (err.httpCode == 404) {
        return next(new restify.NotFoundError(err.message));
      }
      errorHandler.handle(err, next);
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
      errorHandler.handle(err, next);
    })
})

routerInstance.del('/apps/:id', Auth.protectRoute, function(req, res, next) {
  controller.removeApp(req.user, req.params['id'])
  .then(function(apps) {
    res.send(204);
    next();
  })
  .catch(function(err) {
    if (err.httpCode == 404) {
        return next(new restify.NotFoundError(err.message));
      }
      errorHandler.handle(err, next);
  })
})

module.exports = routerInstance;
