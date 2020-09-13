const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PolicySchema = new Schema({
    policyNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    premiumAmount: {
        type: Number,
        required: true,
        min: 0
    },
    policyCategory: {
        type: ObjectId,
        required: true,
        ref: "PolicyCategories"
    },
    policyCarrier: {
        type: ObjectId,
        required: true,
        ref: "PolicyCarriers"
    },
    user: {
        type: ObjectId,
        required: true,
        ref: "Users"
    },
    userAccount: {
        type: ObjectId,
        required: true,
        ref: "UserAccounts"
    },
    agent: {
        type: ObjectId,
        required: true,
        ref: "Agents"
    }
}, { timestamps: true });

PolicySchema.index({ policyNumber: 1 });
PolicySchema.index({ user: 1 });

module.exports = mongoose.model('Policies', PolicySchema);