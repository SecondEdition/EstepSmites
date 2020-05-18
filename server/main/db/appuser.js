const db = require('./connection');

const pool = db.getPool();

module.exports = {
    userExists: async function (email){
        const user = await pool.query("SELECT EXISTS (SELECT TRUE FROM appuser WHERE email=($1))",[email]);
        return user.rows[0].exists;
    }

}