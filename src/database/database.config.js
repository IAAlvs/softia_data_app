const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()
const dbConfig = JSON.parse(process.env.DB_CONFIG);
const {username, password, database, host, dialect, port} = dbConfig;
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    port, // Puerto por defecto de PostgreSQL
  });

module.exports = {
    sequelize : sequelize,
    databaseSetup : () => sequelize
    .authenticate()
    .then(() => {
        console.log('Database conection OK');
    })
    .catch((error) => {
        console.error('Error when try to connect to database, error: ', error);
    })
  };