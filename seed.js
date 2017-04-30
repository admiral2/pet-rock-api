var Promise = require('bluebird');
const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./models'); 

let modelList = [
  models.App,
  models.Category,
  models.Image,
  models.Developer,
  models.Release,
  models.User
]

Promise.each(modelList, function(model) {
  return model.destroy({where: {}});
})
.then(sequelize_fixtures.loadFile('fixtures/*.yaml', models))
.then(function(){
  console.log("Done");
})
.catch(function(err) {
  console.log(err);
})

