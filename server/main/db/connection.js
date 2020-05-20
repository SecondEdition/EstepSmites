const Pool = require("pg").Pool;

let pool;

const config = {
    user: "esauth",
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: "esdb_main"
};

module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new Pool(config);
      return pool;
    }
};