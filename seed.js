var Promise = require('bluebird');
const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./models'); 

let modelList = [
  models.App,
  models.Category,
  models.Image,
  models.Developer,
  models.Release
]

Promise.each(modelList, function(model) {
  return model.destroy({where: {}});
}).then(function() {
  //can use glob syntax to select multiple files
  sequelize_fixtures.loadFile('fixtures/*.yaml', models).then(function(){
    console.log("Done");
  });
}).catch(function(err) {
  console.log(err);
})

