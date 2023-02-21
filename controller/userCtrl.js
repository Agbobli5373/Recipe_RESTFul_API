const User = require("../model/User");
const AsyncHandler = require("exppress-async-handler");
const { hashPassword, verifyPassword } = require("../utils/helper");

//@Desc Register controller
//@Route /api/v1/users/register
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
