const express = require("express");
const cors = require("cors");
const pool = require("./db/connection");
const authRouter = require('./routes/auth');

// init objects 
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // creates req object (?)

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