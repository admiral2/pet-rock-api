var config = require('config');

var passport = require('passport');
var passportLocal = require('passport-local');

var User = require('../../models').User;


module.exports = {
  initialize: function() {
    passport.use(new passportLocal({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
      function(username, password, done) {
        User.findOne({ email: username }).then(function(user) {
          if (!user) { return done(null, false) }
          if (!user.verfy_password(password)) { return done(null, false) }
          return done(null, user);
        })
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    return passport.initialize();
  },

  protectRoute: function(req, res, next) {
    return passport.authenticate('local', function(err, user, info) {
      if (err) { res.json( { error: err }); return next(); }
      if (!user) { res.json( { error: 'Unauthorised' }); return next(); }
      req.logIn(user, function(err) {
        if (err) { res.json( { error: err }); return next(); }
        next();
      })
      // res.json(req.user);
    })(req, res, next);
  }
}


