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
        App.belongsTo(models.Category, {foreignKey: 'categoryId'});
        App.belongsTo(models.Developer, {foreignKey: 'developerId'});
        App.hasMany(models.Image, {
          foreignKey: 'appListImageId',
          as: 'listImages'
        });
        App.hasMany(models.Image, {
          foreignKey: 'appScreenshotId',
          as: 'screenshots'
        });
        App.hasMany(models.Release, {
          foreignKey: 'appId',
          as: 'releases'
        });
        App.belongsToMany(models.User, {through: 'UserApp'})
      }
    }
  });
  return App;
};