'use strict';
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
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
    source: {
      allowNull: true,
      type: DataTypes.STRING,
      validate:{ isUrl: true }
    },
    website: {
      allowNull: true,
      type: DataTypes.STRING,
      validate:{ isUrl: true }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        App.belongsTo(models.Category, {foreignKey: 'categoryId'});
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