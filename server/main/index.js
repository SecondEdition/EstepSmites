const express = require("express");
const cors = require("cors");
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// init objects 
const app = express();

// middleware
app.use(cors({
    origin: process.env.SVR_ORIGIN,
    credentials: true
}));
app.use(express.json()); // creates req object (?)
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing
app.use("/api/auth", authRouter);

// define port and run node server 
// call using "node index" (nodemon during development)
app.listen(5000, () => {
    console.log("server has started on port 5000")
})

// error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});