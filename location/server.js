require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Andhra Pradesh location API is running."
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok"
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
