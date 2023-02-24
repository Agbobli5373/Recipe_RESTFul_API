const AsyncHandler = require("express-async-handler");
const User = require("../model/User");
const Recipe = require("../model/Recipe");

//@Desc Create Recipe
//@Route POST /api/v1/recipes
//@Access Private
exports.createRecipe = AsyncHandler(async (req, res) => {
  const { name, description, incredients } = req.body;
  const recipeFound = await Recipe.findOne({ name });
  if (recipeFound) {
    throw new Error("Recipe is already Created");
  }
  const createdRecipe = await Recipe.create({
    name,
    description,
    incredients,
    createdBy: req.userAuth._id,
  });

  const user = await User.findById(req.userAuth._id);
  await user.receipes.push(createdRecipe);
  await user.save();
  res.status(200).json({
    status: "Success",
    message: "Recipes created Successfull",
    data: createdRecipe,
  });
});

//@Desc Get all the recipe controller
//@Route GET /api/v1/recipes/
//@Access Private
exports.getRecipesCtrl = AsyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json({
    status: "Success",
    message: "Get All recipes successfull",
    data: recipes,
  });
});

//@Desc Get current user the recipe controller
//@Route GET /api/v1/recipes/user
//@Access Private
exports.getRecipeByUser = AsyncHandler(async (res, req) => {
  const recipes = await Recipe.find({ createdBy: req.userAuth._id });
  res.status(200).json({
    status: "Success",
    message: "Get User recipes successfull",
    data: recipes,
  });
});
