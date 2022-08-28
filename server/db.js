const { Pool } = require("pg");

const pool = new Pool({
  connectionTimeoutMillis: 2000,
  database: "samslist",
  host: "localhost",
  idleTimeoutMillis: 30000,
  max: 20,
  password: "01financelist",
  port: 0001,
  user: "postgres",
});

module.exports = pool;
