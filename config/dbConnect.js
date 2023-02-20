const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  //db connection
    try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connect Successfull");
  } catch (err) {
    console.log(err);
  }
};

dbConnect();
