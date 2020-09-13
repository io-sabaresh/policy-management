'use strict';
const PolicyCategories = require('../modals/policyCategories');

const updatePolicyCategory = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await PolicyCategories.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updatePolicyCategory
}