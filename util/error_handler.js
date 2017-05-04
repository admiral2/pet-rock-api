var errors = require('restify-errors');
var log = require('./logger');

exports.handle = function(err, next) {
    if (err instanceof errors.HttpError || err instanceof errors.RestError) {
      log.debug(err);
      next(err);
    } else {
      var error = new errors.InternalServerError(err, 'Unknown Error');
      log.error(error);
      next(err);
    }
}