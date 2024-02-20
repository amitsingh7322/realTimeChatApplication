const mongoose = require("mongoose");

exports.connetionMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("conneted to MongoDB");
  } catch (err) {
    console.log("ERROR while connetion to mongoDB", err.message);
  }
};