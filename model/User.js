const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    emaill: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    receipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receipe",
      },
    ],
  },
  { timestamps: true }
);

//model
const User = mongoose.model("User", userSchema);

module.exports = User;
