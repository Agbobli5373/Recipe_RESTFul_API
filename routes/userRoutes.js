const express = require("express");
const {
  registerCtrl,
  userLogin,
  userProfile,
  updateProfile,
  deleteProfile,
} = require("../controller/userCtrl");

const { isLogin } = require("../middleware/auth");

const userRouter = express.Router();

//Registration of user
userRouter.post("/signup", registerCtrl);

// User Login
userRouter.post("/login", userLogin);

//View user profile
userRouter.get("/profile", isLogin, userProfile);

//update user profile
userRouter.put("/", isLogin, updateProfile);

//Delete user profile
userRouter.delete("/", isLogin, deleteProfile);

module.exports = userRouter;
