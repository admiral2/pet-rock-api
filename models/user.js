'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    display_name: DataTypes.STRING,
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        isLongEnough: function(val) {
          if (val.length < 7) {
            throw new Error("Password must be at lease 7 character long")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1,255]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.App, {through: 'UserApp'})
      }
    },
    instanceMethods: {
      verfy_password: function(value) {
        if (bcrypt.compareSync(value, this.password_hash))
          return this;
        else
          return false;
      }
    }
  });

  var hashPassword = function(user, options, callback) {
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) { return callback(err); }
      user.set('password_hash', hash);
      return callback(null, options);
    });
  };

  User.beforeCreate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      hashPassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });

  User.beforeUpdate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      hashPassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });


  return User;
};