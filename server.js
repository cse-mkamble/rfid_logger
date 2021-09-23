const express = require("express");
const cors = require("cors");
const HttpException = require('./src/utils/HttpExceptionUtils');
const errorMiddleware = require('./src/middleware/errorMiddleware');

// Init express
const app = express();
// Init environment
require("dotenv").config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

// Simple Route
// app.use(`/`, (req, res) => {
//     res.send("🚀🚀 Server is running 🔥");
// });

// Routes
app.use(`/api/v1/users`, require('./src/routes/userRoute'));

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("🚀🚀 Server is running 🔥 on", PORT);
});