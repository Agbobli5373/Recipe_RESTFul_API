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

//@Desc Get by ID the recipe controller
//@Route GET /api/v1/recipes/:Id
//@Access Private
exports.getRecipe = AsyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    throw new Error("Recipe not found");
  } else {
    res.status(200).json({
      status: "Success",
      message: "Get recipe successfull",
      data: recipe,
    });
  }
});

//@Desc Delete the recipe controller
//@Route DELETE /api/v1/recipes/:Id
//@Access Private
exports.deleteRecipe = AsyncHandler(async (req, res) => {
  const recipeUser = await Recipe.find({ createdBy: req.userAuth._id });
  if (!recipeUser) {
    throw new Error("You can't delete this recipe");
  } else {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Recipe deleted successfull",
    });
  }
});

//@Desc Update the recipe controller
//@Route PUT /api/v1/recipes/:Id
//@Access Private
exports.updateRecipe = AsyncHandler(async (req, res) => {
  const { name, description, incredients } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    throw new Error("Recipe not found");
  } else {
    recipe.name = name;
    recipe.description = description;
    recipe.incredients = incredients;
    await recipe.save();
    res.status(200).json({
      status: "Success",
      message: "Recipe updated successfull",
      data: recipe,
    });
  }
});
