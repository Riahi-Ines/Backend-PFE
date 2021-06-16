const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Asteel', 'test', 'test', {
  host: 'localhost',
  dialect: 'mssql',
  port: '1433',
  dialectOptions: {
    encrypt: true,
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

exports.sequelize = sequelize;
exports.DataTypes = DataTypes;