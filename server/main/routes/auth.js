const express = require('express');
const router = express.Router();

router.get("/", async(req,res) => {
    try {
       console.log("ohfuckallhell"); 
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;