'use strict';
module.exports = function(sequelize, DataTypes) {
  var Release = sequelize.define('Release', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    version: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    releaseNotes: DataTypes.STRING,
    url: {
      type: DataTypes.STRING
    },
    sha256: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Release.belongsTo(models.App, {foreignKey: 'appId'});
      }
    }
  });
  return Release;
};