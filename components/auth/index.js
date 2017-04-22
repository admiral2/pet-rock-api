var config = require('config');

var passport = require('passport');
var passportLocal = require('passport-local');

var User = require('../../models').User;


module.exports = {
  initialize: function() {
    passport.use(new passportLocal(
      function(username, password, done) {

      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    return passport.initialize();
  }
}

