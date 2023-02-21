const express = require("express");
const { registerCtrl, userLogin,userProfile,updateProfile } = require("../controller/userCtrl");
const {isLogin} = require("../middleware/auth");

const userRouter = express.Router();

//Registration of user
userRouter.post("/signup", registerCtrl);

// User Login
userRouter.post("/login", userLogin );

//View user profile
userRouter.get("/profile",isLogin, userProfile);

//update user profile
userRouter.put("/", isLogin, updateProfile);

//Delete user profile
userRouter.delete("/", async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "User deleted Successfull",
    data: "User Details",
  });
});

module.exports = userRouter;
