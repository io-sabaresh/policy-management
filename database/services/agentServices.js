'use strict';
const Agents = require('../modals/agents');

const updateAgent = async (query, updates, options = { new: true, upsert: true }) => {
    try {
        return await Agents.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateAgent
}