var Promise = require('bluebird');

var App = require('../../models').App;
var Image = require('../../models').Image;
var Category = require('../../models').Category;
var Release = require('../../models').Release;

exports.toLatestRelease = function(item) {
  var release = {};
  release.id = item.id;
  release.publish_date = item.publishDate;
  release.release_notes = item.releaseNotes;
  release.file = item.url;
  release.sha256 = item.sha256;
  return release;
}