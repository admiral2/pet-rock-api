const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./models'); 

//can use glob syntax to select multiple files
sequelize_fixtures.loadFile('fixtures/*.yaml', models).then(function(){
  console.log("Done");
});