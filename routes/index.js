// Express Router
const route = require('express').Router();
// Multer
const upload = require('../multer');
// API Functionality Imports
const { uploadData } = require('../api/uploadData');
const { getUserPolicies } = require('../api/fetchUserPolicies')
const { getAggregatedUserPolicies } = require('../api/fetchAggregatedPolicies');

const { getDistinctAccountsByZip } = require('../database/services/userServices');

// API Routes
// API to upload bulk data from csv/elxs
route.post('/upload', upload.single('file'), uploadData);

// Search API to fetch User's policies based on user name
route.get('/users/policies', getUserPolicies);

// Fetch Aggregated policies by users
route.get('/policies/aggregate', getAggregatedUserPolicies);

route.get('/distinct', getDistinctAccountsByZip);

module.exports = route;