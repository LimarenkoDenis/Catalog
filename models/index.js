const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('./../config');
const sequelize = new Sequelize(
  config.postgres.database,
  config.postgres.username,
  config.postgres.password,
  config.postgres
);
const db = {};

// drop database if "force: true"
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('It worked!');
  }, err => {
    console.log('An error occurred while creating the table:', err);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
