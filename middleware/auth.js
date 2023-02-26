const {verifyToken} = require("../utils/helper");
const User = require("../model/User");

//function to verify token
exports.isLogin = async(req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];  
  if (!token) {
    res.status(401).json({
      status: "Fail",
      message: "Unauthorized",
    });
  } else {
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({
        status: "Fail",
        message: "Unauthorized",
      });
    } else {
      const user = await User.findById(decoded.id);
      req.userAuth = user;
      //console.log(decoded.id);
      next();
    }
  }
}