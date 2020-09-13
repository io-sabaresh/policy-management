'use strict';
const Users = require('../modals/users');

const updateUser = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await Users.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateUser
}