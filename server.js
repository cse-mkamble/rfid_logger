require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnection = require('./src/config/databaseConnection');

const server = require('https').Server(app)

// Database Connection
databaseConnection();

// Conifg
app.use(express.json())

// Run Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log("🚀🚀 Server is running on 🔥 ", PORT);
});