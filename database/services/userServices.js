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

module.exports = {
    updateUser,
    fetchUserPolicies
}