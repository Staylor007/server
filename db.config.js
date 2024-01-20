const { DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT } = require('./config');


module.exports = {
  host: DB_HOST,
  port:DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  timezone: 'UTC'
};