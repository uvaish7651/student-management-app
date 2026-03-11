const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "studentsdb",
  password: "uvaishraza7651",
  port: 3000,
});

module.exports = pool;