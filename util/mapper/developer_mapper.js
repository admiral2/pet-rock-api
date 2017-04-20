var Promise = require('bluebird');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;

var AppMapper = require('./app_mapper');

exports.toDeveloperOverview = function(developer) {
  var d = {};
  d['name'] = developer.name;
  d['developer_id'] = developer.id;
  d['apps'] = developer.apps.map(AppMapper.toSimpleView);

  return d;
}