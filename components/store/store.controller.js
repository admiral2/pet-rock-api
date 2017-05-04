var Promise = require('bluebird');
var config = require('config');

var errors = require('restify-errors');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;
var Release = require('../../models').Release;
var Developer = require('../../models').Developer;

var AppMapper = require('../../util/mapper/app_mapper');
var CategoryMapper = require('../../util/mapper/category_mapper');
var DeveloperMapper = require('../../util/mapper/developer_mapper');



exports.index = function() {
  return new Promise(function (resolve, reject) {
    resolve('<a href="pebble://custom-boot-config-url/http%3A%2F%2F192.168.0.102%3A8090%2Fapi%2Fconfig%2Fabc">Set Pebble Store Route</a>');
  });
};

exports.getApps = function() {
  let appPromise = App.all({
    include: [
      {model: Image, as: 'listImages'},
      {model: Image, as: 'screenshots'}
    ],
  })
  .map(AppMapper.toHomeView);

  return appPromise;
}

exports.getAppById = function(id) {
  return App.findById(id, {
      include: [
        {model: Image, as: 'listImages'},
        {model: Image, as: 'screenshots'},
        {model: Release, as: 'releases'},
        {model: Developer, where: {
          id: {$col: 'App.developerId'}
        }},
        {model: Category, where: {
          id: {$col: 'App.categoryId'}
        }}
      ],
    }).then(function(app) {
      if (app == null) {
        throw new errors.NotFoundError();
      }
      return app;
    }).then(AppMapper.toDetailView);
}

exports.getAppsByDeveloper = function(developerId) {
  return Developer.findById(developerId, {
      include: [
        {model: App, as: 'apps'}
      ],
    }).then(function(developer) {
      if (developer == null) {
        throw new errors.NotFoundError();
      }
      return developer;
    }).then(DeveloperMapper.toDeveloperOverview);
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
