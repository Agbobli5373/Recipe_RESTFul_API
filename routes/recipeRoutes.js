const express = require("express");
const {
  createRecipe,
  getRecipeByUser,
  getRecipesCtrl,
  deleteRecipe,
  updateRecipe,
} = require("../controller/recipeCtrl");
const { isLogin } = require("../middleware/auth");

const recipeRouter = express.Router();

//creating Recipe route
recipeRouter.post("/", isLogin, createRecipe);
//Get created by login user Recipe route
recipeRouter.get("/user", isLogin, getRecipeByUser);
//Get all Recipe route
recipeRouter.get("/", isLogin, getRecipesCtrl);
//Delete Recipe route
recipeRouter.delete("/:Id", isLogin, deleteRecipe);
//Update Recipe route
recipeRouter.put("/:Id", isLogin, updateRecipe);

module.exports = recipeRouter;
