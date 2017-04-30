var config = require('config');

var passport = require('passport');
var LocalStrategy = require('passport-json');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var JwtNode = require('jwt-node');

var User = require('../../models').User;

module.exports = {
  initialize: function() {
    passport.use(new LocalStrategy({
        usernameProp: 'email',
        passwordProp: 'password'
      },
      function(username, password, done) {
        User.findOne({ email: username }).then(function(user) {
          if (!user) { return done(null, false) }
          if (!user.verfy_password(password)) { return done(null, false) }
          return done(null, user);
        })
      }
    ));

    passport.use(new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: 'secret',
        issuer: 'petrock.auth',
        audience: 'petrock.com'
      },
      function(jwt, done) {
        User.findById(jwt.sub).then(function(user) {
          if (!user) { return done(null, false) }
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
    return passport.authenticate('jwt', function(err, user, info) {
      if (err) { res.json( { error: err }); return next(); }
      if (!user) { res.json( { error: 'Unauthorised' }); return next(); }
      req.logIn(user, function(err) {
        if (err) { res.json( { error: err }); return next(); }
        next();
      })
    })(req, res, next);
  },

  issueJwt: function(req, res, next) {
    var signingKey = 'secret'; // TODO: make this an actual secret
    var claims = {
      iss: 'petrock.auth',
      aud: 'petrock.com',
      sub: req.user.id,
      scope: 'public'
    }

    var jwt = JwtNode.create(claims, signingKey);
    console.log('Issuing JWT:');
    console.log(jwt);

    var tokens = {
      auth_token: jwt.compact()
    }
    res.json(tokens);
    return next();
  }
}


