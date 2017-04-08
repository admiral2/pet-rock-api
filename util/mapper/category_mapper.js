var Promise = require('bluebird');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;

exports.toHomeView = function(item) {
  var category = {};
  category.id = item.id;
  category.name = item.name;
  category.slug = item.slug;
  category.color = item.color;
  category.links = {};
  category.links.apps = "http://locahost/"
  return category;
}