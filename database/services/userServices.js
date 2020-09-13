'use strict';
const Users = require('../modals/users');
const { FETCH_DEFAULT } = require('../../constants');

const updateUser = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await Users.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}


const fetchUserPolicies = async (
    query,
    selectProp = FETCH_DEFAULT.SELECT,
    limit = FETCH_DEFAULT.LIMIT,
    skip = FETCH_DEFAULT.SKIP
) => {
    try {
        const users = await Users.find(query)
            .populate("policies")
            .skip(skip)
            .limit(limit)
            .select(selectProp)
            .lean().exec()

        return users;
    } catch (error) {
        throw error;
    }
}


const fetchAggregatedUserPolicies = async ({
    match = {},
    sort = { createdAt: -1 },
    select = { email: 1, firstName: 1 },
    skip = FETCH_DEFAULT.SKIP,
    limit = FETCH_DEFAULT.LIMIT
}) => {
    try {
        const result = await Users.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            { $project: select },
            {
                $lookup: {
                    from: "policies",
                    localField: '_id',
                    foreignField: 'user',
                    as: 'policies'
                }
            }
        ]);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateUser,
    fetchUserPolicies,
    fetchAggregatedUserPolicies
}