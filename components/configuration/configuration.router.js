var Router = require('restify-router').Router;
var routerInstance = new Router();

var controller = require('./configuration.controller');

routerInstance.get('/', function(req, res, next) {
  controller.config(req.params.platform, req.params.vMajor, req.params.releaseId, req.params.jsVer)
  .then(function(result) {
    console.log("Sending Configuration");
    res.json(result);
    next();
  }).catch(function(err) {
    next(new restify.InternalServerError(err));
  });

});

module.exports = routerInstance;