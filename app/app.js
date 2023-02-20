const express = require("express");
const morgan = require("morgan");
const {errorhandler, notFound} = require("../middleware/globalErrorhandler");
const app = express();
const userRouter = require("../routes/userRoutes");

app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.send("Hello World");
})

//User Route mount
app.use("/api/v1/users/", userRouter)

//error handler middleware
app.use(errorhandler);
//not find Middleware
app.use(notFound);

module.exports = app;
