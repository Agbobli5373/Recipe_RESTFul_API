const express = require("express");

const userRouter = express.Router();


//Registration of user
userRouter.post("/signup", async (req,res) => {
    res.status(201).json({
        status :"Success",
        message : "User Sign up Successfull",
        data : "User Details"
    })
})

// User Login 
userRouter.post("/login", async (req,res) => {
    res.status(200).json({
        status :"Success",
        message : "User Login Successfull",
        data : "User Details"
    })
})

//View user profile
userRouter.get("/profile", async (req,res) => {
    res.status(201).json({
        status :"Success",
        message : "Get User Profile Successfull",
        data : "User Details"
    })
})

//update user profile
userRouter.put("/:userID", async (req,res) => {
    res.status(201).json({
        status :"Success",
        message : "Update User Successfull",
        data : "User Details"
    })
})

//Delete user profile
userRouter.delete("/:userID", async (req,res) => {
    res.status(201).json({
        status :"Success",
        message : "User deleted Successfull",
        data : "User Details"
    })
})

module.exports = userRouter ;
