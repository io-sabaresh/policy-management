'use strict';
const { FETCH_DEFAULT } = require('../constants');
const { ErrorHandler } = require('../errorHandler/index');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { fetchAggregatedUserPolicies } = require('../database/services/userServices');

/**
 * Fetch aggregated User results with policy details
 * @param {*} req 
 * @param {*} res 
 */
const getAggregatedUserPolicies = async(req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || FETCH_DEFAULT.PAGE;
        const limit = parseInt(req.query.limit, 10) || FETCH_DEFAULT.LIMIT;
        const skip = (page - 1) * limit;

        // Fetching aggregated user policy details
        const userPolicies =  await fetchAggregatedUserPolicies({ limit, skip });

        res.status(OK).json({ success: true, userPolicies, limit, page });
    } catch (error) {
        if (typeof error !== ErrorHandler)
        error = new ErrorHandler(error.statusCode || INTERNAL_SERVER_ERROR, error.message || error);
        next(error);
    }
}


module.exports = {
    getAggregatedUserPolicies
}