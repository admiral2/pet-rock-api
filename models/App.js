'use strict';
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    hearts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    description: DataTypes.STRING,
    screenshotHardware: {
      type: DataTypes.STRING,
      defaultValue: "basalt"
    },
    androidCompanion: DataTypes.STRING,
    iosCompanion: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        App.hasMany(models.Image, {
          foreignKey: 'appListImageId',
          as: 'listImages'
        });
        App.hasMany(models.Image, {
          foreignKey: 'appScreenshotId',
          as: 'screenshots'
        });
      }
    }
  });
  return App;
};