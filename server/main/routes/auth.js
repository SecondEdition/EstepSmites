const express = require('express');
const db = require('../db');

const router = express.Router();
const pool = db.getPool();

router.get("/", async(req,res) => {
    res.json({
        message: 'get request to /api/auth is working'
    })
});

function validUser(user){
    const validEmail = typeof user.email == "string" && 
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

async function userExists(email){
    const user = await pool.query("SELECT EXISTS (SELECT TRUE FROM appuser WHERE email=($1))",[email]);
    return Boolean(user.rows[0].exists);
}

router.post("/signup", async(req, res, next) => {
    if(validUser(req.body)) {
        if(userExists(req.body.email) == true) {
            res.json({
                message: 'post request to /api/auth/signup is working'
            });
        } else {
            res.json({
                message: 'user does not exist'
            })
        }
    } else {
        // send an error
        next(new Error('Invalid User'));
    }
});

module.exports = router;