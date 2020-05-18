const express = require('express');
const bcrypt = require('bcrypt');
const appuser = require('../db/appuser');

const router = express.Router();

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

router.post("/signup", async (req, res, next) => {
    if(validUser(req.body)) {
        appuser.userExists(req.body.email).then((exists) => {
            if(!exists){
                // email is unique
                // hash password
                const saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                    // insert user into db
                    const user = {
                        email: req.body.email,
                        password: hash,
                    }
                    appuser.createUser(user).then((newuser) => {
                        res.json({
                            message: 'Email is unique',
                            id: newuser.id,
                            email: newuser.email,
                            dbhash: hash,
                            created: newuser.created_on
                        });
                    })
                    // redirect to login
                    // TBD
                });
            } else {
                // email is in use
                next(new Error('Email in use'))
            }
        });
    } else {
        next(new Error('Invalid User'));
    }
});

router.post('/login', async (res, req, next) => {


});

module.exports = router;