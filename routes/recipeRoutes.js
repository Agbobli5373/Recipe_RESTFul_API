const express = require("express");
const { createRecipe } = require("../controller/recipeCtrl");
const { isLogin } = require("../middleware/auth");

const recipeRouter = express.Router();

//creating Recipe route
recipeRouter.post("/", isLogin, createRecipe);

module.exports = recipeRouter;
