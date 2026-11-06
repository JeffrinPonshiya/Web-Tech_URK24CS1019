
// Experiment 8: Server-side application using Node.js

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve portfolio files
app.use(express.static(path.join(__dirname, "public")));

// Sample portfolio data
const portfolio = {
    name: "Jeffrin Ponshiya M",
    role: "Aspiring Freelance Web Developer",
    course: "B.Tech CSE",
    location: "Coimbatore, Tamil Nadu"
};

// Sample items
let items = [
    { id: 101, name: "Website Design", status: "Available" },
    { id: 102, name: "Frontend Development", status: "Available" }
];

// Route 1: Home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Route 2: Portfolio JSON API
app.get("/api/portfolio", function (req, res) {
    res.status(200).json({
        success: true,
        message: "Node.js server is running successfully.",
        details: [
            "Name: " + portfolio.name,
            "Role: " + portfolio.role,
            "Course: " + portfolio.course,
            "Location: " + portfolio.location
        ],
        data: portfolio
    });
});

// Route 3: Get all items
app.get("/api/items", function (req, res) {
    res.status(200).json({
        success: true,
        count: items.length,
        data: items
    });
});

// Route 4: Add a new item
app.post("/api/items", function (req, res) {
    const name = req.body.name;
    const status = req.body.status;

    if (!name || !status) {
        return res.status(400).json({
            success: false,
            message: "Please provide item name and status."
        });
    }

    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 101,
        name: name,
        status: status
    };

    items.push(newItem);

    res.status(201).json({
        success: true,
        message: "New item added successfully.",
        data: newItem
    });
});

// Route 5: 404 error handling
app.use(function (req, res) {
    res.status(404).json({
        success: false,
        message: "Resource Not Found"
    });
});

// Handle server errors
app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// Start server
app.listen(PORT, function () {
    console.log("Portfolio server running at http://localhost:" + PORT);
});
