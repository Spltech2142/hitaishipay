const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Enable CORS for all domains
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contacts");

// Use Routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
