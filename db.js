const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASS,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE
});

module.exports = pool.promise();