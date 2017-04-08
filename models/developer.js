'use strict';
module.exports = function(sequelize, DataTypes) {
  var Developer = sequelize.define('Developer', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        Developer.hasMany(models.App, {
          foreignKey: 'developerId',
          as: 'apps'
        });
      }
    }
  });
  return Developer;
};