const User = require("../model/User");
const AsyncHandler = require("express-async-handler");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../utils/helper");
const jwt = require("jsonwebtoken");

//@Desc Register controller
//@Route POST  /api/v1/users/register
//@Access Public
exports.registerCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExit = await User.findOne({ email });
  if (isUserExit) {
    throw new Error("User Already Exit with the email");
  } else {
    const createdUser = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });

    res.status(201).json({
      status: "Success",
      message: "User Sign up Successfull",
      data: createdUser,
    });
  }
});

//@Desc Log in controller
//@Route POST /api/v1/users/login
//Access Public
exports.userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User is not found");
  } else {
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid crendential");
    } else {
      const token = generateToken(user._id);
      res.status(200).json({
        status: "Success",
        message: "Login Successfull",
        data: token,
      });
      console.log(user);
    }
  }
});

//@Desc Get user profile
//@Route GET /api/v1/users/profile
//@Access Private
exports.userProfile = AsyncHandler(async (req, res) => {
  const profile = await User.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  //console.log(req.userAuth._id);
  res.status(201).json({
    status: "Success",
    message: "Get User Profile Successfull",
    data: profile,
  });
});

//@Desc Update user profile
//@Route PUT /api/v1/users/profile
//@Access Private
exports.updateProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuth._id);
  //console.log(req.userAuth._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }
  }
  const updatedUser = await user.save();
  res.status(201).json({
    status: "Success",
    message: "Update User Profile Successfull",
    data: updatedUser,
  });
});
