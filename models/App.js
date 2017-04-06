module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define("App", {
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    hearts: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // App.hasMany(models.Task)
      }
    }
  });

  return User;
};