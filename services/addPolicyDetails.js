'use strict';
const { mongoId } = require('../utils');
const { updateUser } = require('../database/services/userServices');
const { updateAgent } = require('../database/services/agentServices');
const { createPolicy } = require('../database/services/policyServices');
const { updateUserAccount } = require('../database/services/userAccountServices');
const { updatePolicyCarrier } = require('../database/services/policyCarrierServices');
const { updatePolicyCategory } = require('../database/services/policyCategoryServices');

/**
 * Get Agent details, If not present create one
 * @param {*} data 
 */
const getAgentDetails = async (data) => {
    try {
        const { agent } = data;

        return await updateAgent({ agentName: agent.trim() }, {});
    } catch (error) {
        throw error;
    }
}

/**
 * Get User details, If not present create one
 * @param {*} data 
 */
const getUserDetails = async (data) => {
    try {
        const { email, firstname, dob, address, city, state, zip, gender, userType } = data;

        return updateUser({ email }, {
            firstName: firstname,
            dob,
            address,
            city,
            state,
            zip,
            gender,
            userType
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Get Polict carrier details, If not present create one
 * @param {*} data 
 */
const getPolicyCarrierDetails = async (data) => {
    try {
        const { company_name } = data;

        return updatePolicyCarrier({ companyName: company_name.trim() }, {});
    } catch (error) {
        throw error;
    }
}

/**
 * Get Policy category details, If not present create one
 * @param {*} data 
 */
const getPolicyCategoryDetails = async (data) => {
    try {
        const { category_name } = data;

        return updatePolicyCategory({ categoryName: category_name.trim() }, {});
    } catch (error) {
        throw error;
    }
}


/**
 * Get user account details, If not present create one
 * @param {*} data 
 */
const getUserAccountDetails = async (data, user ) => {
    try {
        const { account_name } = data;
        const { _id } = user;

        return await updateUserAccount({ 
            accountName: account_name.trim(), 
            user: mongoId(_id) 
        }, {});

    } catch (error) {
        throw error;
    }
}


const addPolicyDetails = async (data) => {
    try {
        // Fetch all details required from DB
        const [
            agentDetails,
            userDetails,
            carrierDetails,
            categoryDetails
        ] = await Promise.all([
            getAgentDetails(data),
            getUserDetails(data),
            getPolicyCarrierDetails(data),
            getPolicyCategoryDetails(data)
        ]);

        const userAccountDetails = await getUserAccountDetails(data, userDetails);

        const {policy_number, policy_start_date, policy_end_date, premium_amount } = data;

        // Create new policy
        return await createPolicy({
            policyNumber: policy_number,
            startDate: policy_start_date,
            endDate: policy_end_date,
            premiumAmount: premium_amount,
            policyCategory: mongoId(categoryDetails._id),
            policyCarrier: mongoId(carrierDetails._id),
            user: mongoId(userDetails._id),
            userAccount: mongoId(userAccountDetails._id),
            agent: mongoId(agentDetails._id)
        });

    } catch (error) {
        throw error;
    }
}

module.exports = {
    addPolicyDetails
}