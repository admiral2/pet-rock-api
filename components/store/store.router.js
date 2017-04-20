var restify = require('restify');
var Router = require('restify-router').Router;
var routerInstance = new Router();
var Errors = require('../../util/errors');

var controller = require('./store.controller');

routerInstance.get('/', function(req, res, next) {
  console.log(req);
  controller.index()
  .then(function(result) {
    res.end(result);
    next();
  }).catch(function(err) {
    next(new restify.InternalServerError(err));
  });
});

// Returns a changelog (as an array) for the given app
routerInstance.get('/applications/:id/changelog', function(req, res, next) {
  next(new restify.NotFoundError());  
});

// Returns details about the given category
routerInstance.get('/apps/category/:id', function(req, res, next) {
  next(new restify.NotFoundError());
});

// Returns a single app
routerInstance.get('/apps/id/:id', function(req, res, next) {
  let appId = req.params['id'];
  controller.getAppById(appId)
    .then(function(result) {
      res.json(result)
      next();
    }).catch(function(err) {
      if (err.httpCode == 404) {
        return next(new restify.NotFoundError(err.message));
      }
      next(new restify.InternalServerError(err));
    })
});

// Returns all apps by the given developer id
routerInstance.get('/apps/dev/:id', function(req, res, next) {
  let developerId = req.params['id'];
  controller.getAppsByDeveloper(developerId)
    .then(function(result) {
      res.json(result)
      next();
    }).catch(function(err) {
      next(new restify.InternalServerError(err));
    })
});


routerInstance.get('/home/faces', function(req, res, next) {
  //image_ratio=1&platform=all&hardware=basalt&firmware_version=3&filter_hardware=true
  let image_ratio = req.params['image_radio'];
  let platform = req.params['platforms'];
  let hardware = req.params['hardware'];
  let firmware_version = req.params['firmware_version'];
  let filter_hardware = req.params['filter_hardware'];

  if (filter_hardware == 'false') hardware = null;

  controller.faces(image_ratio, platform, hardware, firmware_version)
    .then(function(result) {
      res.json(result);
      next();
    }).catch(function(err) {
      next(new restify.InternalServerError(err));
    })

});

module.exports = routerInstance;
