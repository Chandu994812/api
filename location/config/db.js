const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set.");
  }

  mongoose.connection.on("connected", () => {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on("error", (error) => {
    console.error(`MongoDB runtime error: ${error.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
  });

  return mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  });
};

module.exports = connectDB;
