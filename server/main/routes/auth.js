const express = require('express');
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
            res.json({
                message: exists
            });
        });
    } else {
        next(new Error('Invalid User'));
    }
});

module.exports = router;