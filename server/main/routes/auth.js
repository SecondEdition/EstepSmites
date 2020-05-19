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

router.post("/signup", (req, res, next) => {
    if(validUser(req.body)) {
        appuser.getUser(req.body.email).then((user) => {
            if(!user){
                const saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                    const user = {
                        email: req.body.email,
                        password: hash
                    }
                    appuser.createUser(user).then((newuser) => {
                        
                        // redirect to login
                        // TBD

                        res.json({
                            message: 'Email is unique',
                            id: newuser.id,
                            email: newuser.email,
                            dbhash: hash,
                            created: newuser.created_on
                        });
                    })
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

router.post('/login', (req, res, next) => {
    if (validUser(req.body)) {
        appuser.getUser(req.body.email).then((user) => {
            if(user){
                bcrypt.compare(req.body.password, user.password).then(function(result) {
                    if(result){
                        // result == true
                        res.json({
                            message: "logging in...",
                            validpass: result,
                            userinfo: user
                        });
                    } else {
                        next(new Error('Invalid login'));
                    }
                });
            } else {
                next(new Error('Invalid login'));
            }
        });
    } else {
        next(new Error('Invalid User'));
    }
});

module.exports = router;