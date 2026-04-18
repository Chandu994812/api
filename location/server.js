require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Andhra Pradesh location API is running.",
    databaseStatus:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.get("/health", (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    status: isDatabaseConnected ? "ok" : "degraded",
    databaseStatus: isDatabaseConnected ? "connected" : "disconnected"
  });
});

app.use("/api", locationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Application startup failed: ${error.message}`);
    process.exit(1);
  }
};

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled rejection: ${error.message}`);
});

process.on("uncaughtException", (error) => {
  console.error(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

startServer();
