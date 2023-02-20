const express = require("express");
const morgan = require("morgan");
const {errorhandler, notFound} = require("../middleware/globalErrorhandler");
const app = express();

app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.send("Hello World");
})

//error handler middleware
app.use(errorhandler);
//not find Middleware
app.use(notFound);

module.exports = app;
