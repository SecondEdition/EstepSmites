const Pool = require("pg").Pool;

let pool;

const config = {
    user: "esauth",
    password: "U7cFDn4WpNGrhD68j7doom8F", 
    host: "localhost",
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