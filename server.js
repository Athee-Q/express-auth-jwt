const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./config/connectDB");
const routes = require("./routes/authRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server connected on PORT http://localhost:${PORT}`);
});
