var restify = require('restify');
var Router = require('restify-router').Router;
var routerInstance = new Router();

var controller = require('./store.controller');

routerInstance.get('/', function(req, res, next) {
  controller.index()
  .then(function(result) {
    res.end(result);
    next();
  }).catch(function(err) {
    next(new restify.InternalServerError(err));
  });
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
