const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRouter = require('./routes/auth');

// init objects 
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routing
app.get("/api/auth", authRouter);

// define port and run node server 
// call using "node index" (nodemon during development)
app.listen(5000, () => {
    console.log("server has started on port 5000")
})