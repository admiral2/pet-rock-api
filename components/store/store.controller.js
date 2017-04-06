var Promise = require('bluebird');
var config = require('config');

exports.index = function() {
  return new Promise(function (resolve, reject) {
    resolve('<a href="pebble://custom-boot-config-url/http%3A%2F%2F192.168.0.108%3A8080%2Fapi%2Fconfig%2F1%2F2%2F3%2F4">Set Pebble Store Route</a>');
  });
};

exports.faces = function(image_ratio, platform, hardware, firmware_version) {
  return new Promise(function(resolve, reject) {
    resolve([]);
  });
}
