var Promise = require('bluebird');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;

function mapImageMeta(imageMeta) {
  var img = {}
  img[imageMeta.dimentions] = imageMeta.url;
  return img;
}

function reduceMapArray(result, item) {
  var key = Object.keys(item)[0];
  result[key] = item[key];
  return result;
}

exports.toDetailView = function(item) {
  var app = {};
  app.id = item.id;
  app.title = item.title;
  app.description = item.description;
  
  app.category_id = item.categoryId;
  app.category_name = item.Category.name
  app.category_color = item.Category.color;

  app.hearts = item.hearts;
  app.screenshot_hardware = item.screenshotHardware;

  app.companions = {
    ios: item.iosCompanion,
    android: item.androidCompanion
  };

  app.list_image = item.listImages.map(mapImageMeta).reduce(reduceMapArray);
  app.screenshot_images = item.screenshots.map(mapImageMeta);

  app.source = item.source;
  app.website = item.website;

  app.created_at = item.createdAt;

  app.developer_id = item.developerId;
  app.author = item.Developer.name;

  return app;
}

exports.toSimpleView = function(item) {
  var app = {};
  app.id = item.id;
  app.title = item.title;
  app.description = item.description;

  app.hearts = item.hearts;

  app.developer_id = item.developerId;
  return app;
}

exports.toHomeView = function(item) {
  var app = {};
  app.id = item.id;
  app.title = item.title;
  app.description = item.description;
  app.category_id = item.categoryId;
  app.hearts = item.hearts;
  app.screenshot_hardware = item.screenshotHardware;

  app.companions = {
    ios: item.iosCompanion,
    android: item.androidCompanion
  };

  app.list_image = item.listImages.map(mapImageMeta).reduce(reduceMapArray);
  app.screenshot_images = item.screenshots.map(mapImageMeta);

  return app;
}