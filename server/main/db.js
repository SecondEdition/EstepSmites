const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "es_authusr",
    password: "U7cFDn4WpNGrhD68j7doom8F", 
    host: "localhost",
    port: 5432,
    database: "es_dbmain"
})

module.exports = pool;