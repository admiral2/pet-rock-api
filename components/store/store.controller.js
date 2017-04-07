var Promise = require('bluebird');
var config = require('config');
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

exports.index = function() {
  return new Promise(function (resolve, reject) {
    resolve('<a href="pebble://custom-boot-config-url/http%3A%2F%2F192.168.0.108%3A8080%2Fapi%2Fconfig%2F1%2F2%2F3%2F4">Set Pebble Store Route</a>');
  });
};

// Does not support app capabilities
exports.faces = function(image_ratio, platform, hardware, firmware_version) {
  let categoryPromise = Category.all();
  let appPromise = App.all({
    include: [
      {model: Image, as: 'listImages'},
      {model: Image, as: 'screenshots'}
    ],
  }).map(function(item) {
    console.log(item.title);

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
  });

  return Promise.join(categoryPromise, appPromise)
    .then(function(response) {
      return {
        categories: response[0],
        applications: response[1]
      };
    });
}
