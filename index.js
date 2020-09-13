const express = require('express');
const app = express();
// Imports
const morgan = require("morgan");
const router = require('./routes');
const { PORT } = require('./constants');
const bodyParser = require("body-parser");
const dbConnection = require('./database/config');
const { handleError } = require('./errorHandler');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Logger for requests
app.use(morgan("dev"));

// API Routes
app.use(router);

// Error Handler
app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, (error, data) => {
    if (error) console.log("Error Occurred while startign the server");
    else {
        console.log("Connected to the server");
        dbConnection; // Database connection 
    }
});