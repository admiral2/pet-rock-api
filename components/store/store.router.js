var restify = require('restify');
var errors = require('restify-errors');
var errorHandler = require('../../util/error_handler');
var Router = require('restify-router').Router;
var routerInstance = new Router();

var controller = require('./store.controller');

routerInstance.get('/', function(req, res, next) {
  console.log(req);
  controller.index()
  .then(function(result) {
    res.end(result);
    next();
  }).catch(function(err) {
    next(err);
  });
});

// // Returns a changelog (as an array) for the given app
// routerInstance.get('/apps/:id/changelog', function(req, res, next) {
//   next(new restify.NotFoundError());  
// });

// Returns details about the given category
routerInstance.get('/category/:id', function(req, res, next) {
  errorHandler.handle(new errors.NotFoundError(), next);
});

// Returns all apps
routerInstance.get('/apps', function(req, res, next) {
  controller.getApps()
    .then(function(result) {
      res.json(result)
      next();
    }).catch(function(err) {
      errorHandler.handle(err, next);
    })
});

// Returns a single app
routerInstance.get('/apps/:id', function(req, res, next) {
  let appId = req.params['id'];
  controller.getAppById(appId)
    .then(function(result) {
      res.json(result)
      next();
    }).catch(function(err) {
      errorHandler.handle(err, next);
    })
});

// Returns all apps by the given developer id
routerInstance.get('/developer/:id', function(req, res, next) {
  let developerId = req.params['id'];
  controller.getAppsByDeveloper(developerId)
    .then(function(result) {
      res.json(result)
      next();
    }).catch(function(err) {
      errorHandler.handle(err, next);
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
      errorHandler.handle(err, next);
    })

});

module.exports = routerInstance;
