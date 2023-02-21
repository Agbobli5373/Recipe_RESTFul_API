const User = require("../model/User");
const AsyncHandler = require("exppress-async-handler");

//@Desc Register controller
//@Route /api/v1/users/register
//@Access Public
exports.registerCtrl = AsyncHandler( async (req,res) => {
    const {} = req.body ;
    res.status(201).json({
        status :"Success",
        message : "User Sign up Successfull",
        data : "User Details"
    })
})