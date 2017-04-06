var Promise = require('bluebird');
var config = require('config');

var configurationTemplate = require('./configuration_template.json');

exports.config = function(platform, vMajor, releaseId, jsVer) {
  return new Promise(function (resolve, reject) {
    // configurationTemplate.config.id = platform + "/" + vMajor + "/" + releaseId + "/" + jsVer;
    // configurationTemplate.config.href = config.Endpoints.bootApiBase + "/" + configurationTemplate.config.id;

    // configurationTemplate.config.authentication.sign_in = config.Endpoints.Authentication.sign_in;
    // configurationTemplate.config.authentication.sign_up = config.Endpoints.Authentication.sign_in;
    // configurationTemplate.config.authentication.refresh_token = config.Endpoints.Authentication.token;

    resolve(configurationTemplate);
  });
};
