var Promise = require('bluebird');
var config = require('config');
var Sequelize = require('Sequelize');

// var Errors = require('../../util/errors');
var errors = require('restify-errors');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;
var Release = require('../../models').Release;
var Developer = require('../../models').Developer;

var AppMapper = require('../../util/mapper/app_mapper');
var CategoryMapper = require('../../util/mapper/category_mapper');
var DeveloperMapper = require('../../util/mapper/developer_mapper');

exports.getApps = function(user) {
    return user.getApps().map(AppMapper.toSimpleView);
}

exports.addApp = function(user, appId) {
  return user.addApp(appId)
    .catch(e => e.name == new Sequelize.ForeignKeyConstraintError().name, function(err) {
      throw new errors.NotFoundError();
    })
}

exports.removeApp = function(user, appId) {
  return user.removeApp(appId)
  .catch(e => e.name == new Sequelize.ForeignKeyConstraintError().name, function(err) {
      throw new errors.NotFoundError();
    })
}