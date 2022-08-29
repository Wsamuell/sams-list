const { Pool } = require("pg");

// remember to figure out the env for this
const pool = new Pool({
  connectionTimeoutMillis: 2000,
  database: "samslist",
  host: "localhost",
  idleTimeoutMillis: 30000,
  max: 20,
  password: "01financelist",
  port: 5432,
  user: "postgres",
});

module.exports = pool;
