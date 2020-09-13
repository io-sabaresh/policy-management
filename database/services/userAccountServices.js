'use strict';
const UserAccounts = require('../modals/userAccounts');

const updateUserAccount = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await UserAccounts.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateUserAccount
}