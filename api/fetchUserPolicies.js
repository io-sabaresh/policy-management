'use strict';
const { FETCH_DEFAULT } = require('../constants');
const { ErrorHandler } = require('../errorHandler/index');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { fetchUserPolicies } = require('../database/services/userServices');

/**
 * Fetches the user policy details
 * @param {String} req.query.select user name text
 * @param {Number} req.query.page page number
 * @param {Number} req.query.limit page limit
 */
const getUserPolicies = async (req, res, next) => {
    const { search: searchText } = req.query;
    try {
        // Search Query
        const query = {
            $text: { 
                "$search": searchText || "",
                "$caseSensitive": false
            }
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || FETCH_DEFAULT.PAGE;
        const limit = parseInt(req.query.limit, 10) || FETCH_DEFAULT.LIMIT;
        const skip = (page - 1) * limit;

        // Fetch users and their policies
        const userAndPolicyDetails = await fetchUserPolicies(query, FETCH_DEFAULT.SELECT, limit, skip);

        res.status(OK).json({ success: true, userAndPolicyDetails, page, limit });
    } catch (error) {
        if (typeof error !== ErrorHandler)
        error = new ErrorHandler(error.statusCode || INTERNAL_SERVER_ERROR, error.message || error);
        next(error);
    }
}

module.exports = {
    getUserPolicies
}