'use strict';
const PolicyCarriers = require('../modals/policyCarriers');

const updatePolicyCarrier = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await PolicyCarriers.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updatePolicyCarrier
}