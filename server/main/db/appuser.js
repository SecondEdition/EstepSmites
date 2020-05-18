const db = require('./connection');

const pool = db.getPool();

module.exports = {
    userExists: async function (email){
        const user = await pool.query("SELECT EXISTS (SELECT TRUE FROM appuser WHERE email=($1))",[email]);
        return user.rows[0].exists;
    },
    createUser: async function (user){
        const newuser = await pool.query("INSERT INTO appuser (email, password, is_active, created_on) VALUES(($1), ($2), true, now()) RETURNING *",
                                        [user.email, user.password]);
        return newuser.rows[0];
    }
}