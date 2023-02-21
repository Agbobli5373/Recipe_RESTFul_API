const express = require("express");
const { registerCtrl, userLogin } = require("../controller/userCtrl");

const userRouter = express.Router();

//Registration of user
userRouter.post("/signup", registerCtrl);

// User Login
userRouter.post("/login", userLogin );

//View user profile
userRouter.get("/profile", async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Get User Profile Successfull",
    data: "User Details",
  });
});

//update user profile
userRouter.put("/", async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Update User Successfull",
    data: "User Details",
  });
});

//Delete user profile
userRouter.delete("/", async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "User deleted Successfull",
    data: "User Details",
  });
});

module.exports = userRouter;
