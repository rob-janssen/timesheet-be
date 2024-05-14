const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI + process.env.DATABASE);

    console.log(`MongoDB connected: ${conn.connection.host}.`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
