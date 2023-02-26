const express = require("express");
const morgan = require("morgan");
const {errorhandler, notFound} = require("../middleware/globalErrorhandler");
const app = express();
const userRouter = require("../routes/userRoutes");
const recipeRouter = require("../routes/recipeRoutes");

//Morgan 
app.use(morgan("dev"));

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//User Route mount
app.use("/api/v1/users/", userRouter)
//Recipe Route mount
app.use("/api/v1/recipes/", recipeRouter)

//not find Middleware
app.use(notFound);
//error handler middleware
app.use(errorhandler);


module.exports = app;
