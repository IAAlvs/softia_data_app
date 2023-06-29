const dotenv = require('dotenv');
dotenv.config()
const dbConfig = JSON.parse(process.env.DB_CONFIG);
module.exports =
{
  "development": {
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "host": dbConfig.host,
    "dialect": dbConfig.dialect,
    "port" : dbConfig.port
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "UsersDb",
    "host": "172.17.0.2",
    "dialect": "postgres",
    "port" : 5432
  },
  "production": {
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "host": dbConfig.host,
    "dialect": dbConfig.dialect,
    "port" : dbConfig.port
  }
}
