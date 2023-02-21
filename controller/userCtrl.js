const User = require("../model/User");
const AsyncHandler = require("express-async-handler");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../utils/helper");

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
      res.status(200).json({
        status: "Success",
        message: "Login Successfull",
        data: await generateToken(user._id),
      });
    }
  }
});
