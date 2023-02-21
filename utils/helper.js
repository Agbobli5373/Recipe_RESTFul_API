const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Function for password hashing
exports.hashPassword = AsyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

// Function for comparing password with hash password
exports.verifyPassword = AsyncHandler(async (password, hashPasswod) => {
  return await bcrypt.compare(password, hashPasswod);
});

// Function for generating json web token
exports.generateToken = AsyncHandler(async (id) => {
  return await jwt.sign({ id }, process.env.secretKey, { expiresIn: "48h" });
});
