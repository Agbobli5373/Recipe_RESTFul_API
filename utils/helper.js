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
exports.generateToken = (id) =>{
  const key = process.env.secretKey;
  return jwt.sign({ id }, key, { expiresIn: "48h" });
};

//function to verify token
exports.verifyToken = (token) => {
  const key = process.env.secretKey;
  return jwt.verify(token, key , (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};
