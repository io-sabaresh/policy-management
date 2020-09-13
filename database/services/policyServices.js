'use strict';
const Policies = require('../modals/policies');

const createPolicy = async (policyDetails) => {
    try {
        return await new Policies(policyDetails).save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPolicy
}