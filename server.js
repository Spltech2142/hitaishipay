const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "*", methods: "GET, POST", allowedHeaders: "Content-Type" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection (Replace with your actual InfinityFree MySQL details)
const db = mysql.createConnection({
    host: "sql105.infinityfree.com",  // Replace with actual host from InfinityFree
    user: "if0_38598917",             // Your MySQL username from InfinityFree
    password: "ParamGadi",  // Your MySQL password
    database: "if0_38598917_hitaishipay_db"  // Your created database name
});
 
  
// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to InfinityFree MySQL Database!");
    }
});

// API Endpoint for Form Submission
app.post("/submit", (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: "Email and Name are required!" });
    }

    const sql = "INSERT INTO contacts (email, name) VALUES (?, ?)";
    db.query(sql, [email, name], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.status(200).json({ message: "✅ Form submitted successfully!" });
        }
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
