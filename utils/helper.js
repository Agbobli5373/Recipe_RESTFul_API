const bcrypt = require("bcryptjs");
//Function for password hashing
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
  }
};
// Function for comparing password with hash password
exports.verifyPassword = async (password, hashPasswod) => {
  return await bcrypt.compare(password, hashPasswod);
};
