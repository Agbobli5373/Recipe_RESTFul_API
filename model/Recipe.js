const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
    },
    incredients: [],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require : true
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
