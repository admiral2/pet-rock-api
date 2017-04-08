var Promise = require('bluebird');
var config = require('config');

var Errors = require('../../util/errors');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;
var Developer = require('../../models').Developer;

var AppMapper = require('../../util/mapper/app_mapper');
var CategoryMapper = require('../../util/mapper/category_mapper');


exports.index = function() {
  return new Promise(function (resolve, reject) {
    resolve('<a href="pebble://custom-boot-config-url/http%3A%2F%2F192.168.0.108%3A8080%2Fapi%2Fconfig%2F1%2F2%2F3%2F4">Set Pebble Store Route</a>');
  });
};


exports.getAppById = function(id) {
  let appPromise = App.findById(id, {
      include: [
        {model: Image, as: 'listImages'},
        {model: Image, as: 'screenshots'},
        {model: Developer, where: {
          id: {$col: 'App.developerId'}
        }},
        {model: Category, where: {
          id: {$col: 'App.categoryId'}
        }}
      ],
    }).then(function(app) {
      if (app == null) {
        throw new Errors.NotFoundError();
      }
      return app;
    }).then(AppMapper.toDetailView);

    return appPromise;
}

// Does not yet support app capabilities
exports.faces = function(image_ratio, platform, hardware, firmware_version) {
  let categoryPromise = Category.all()
    .map(CategoryMapper.toHomeView);

  let appPromise = App.all({
    include: [
      {model: Image, as: 'listImages'},
      {model: Image, as: 'screenshots'}
    ],
  })
  .map(AppMapper.toHomeView);

  return Promise.join(categoryPromise, appPromise)
    .then(function(response) {
      return {
        categories: response[0],
        applications: response[1]
      };
    });
}
