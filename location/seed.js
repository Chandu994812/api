require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const State = require("./models/State");
const sampleStateData = require("./data/andhra-pradesh.sample.json");

const seedData = async () => {
  let hasError = false;

  try {
    await connectDB();

    await State.deleteMany({ name: sampleStateData.name });
    await State.create(sampleStateData);

    console.log("Sample Andhra Pradesh location data seeded successfully.");
  } catch (error) {
    hasError = true;
    console.error(`Seeding failed: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    process.exit(hasError ? 1 : 0);
  }
};

seedData();
