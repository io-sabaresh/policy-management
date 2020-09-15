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


const getDistinctAccountsByZip = async (req, res) => {
    try {
        const users = await Users.aggregate([
            {
                $group: {
                    _id: "$zip",
                    users: { $addToSet: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "policies",
                    localField: 'users',
                    foreignField: 'user',
                    as: 'policies'
                }
            },
            { $unwind: "$policies" },
            {
                $group: {
                    _id: "$_id",
                    carrier: { $addToSet: "$policies.policyCarrier" },
                    category: { $addToSet: "$policies.policyCategory" },
                    account: { $addToSet: "$policies.userAccount" }
                }
            },
            {
                $project: {
                    "_id": 0,
                    zip: "$_id",
                    carriersCount: {
                        $size: "$carrier"
                    },
                    categoriesCount: {
                        $size: "$category"
                    },
                    numberOfAccounts: {
                        $size: "$account"
                    }
                }
            }
        ]);

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
}


module.exports = {
    updateUser,
    fetchUserPolicies,
    fetchAggregatedUserPolicies,

    getDistinctAccountsByZip
}