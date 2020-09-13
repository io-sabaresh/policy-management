// Express Router
const route = require('express').Router();
// Multer
const upload = require('../multer');
// API Functionality Imports
const { uploadData } = require('../api/uploadData');


// API Routes
// API to upload bulk data from csv/elxs
route.post('/upload', upload.single('file'), uploadData);



module.exports = route;