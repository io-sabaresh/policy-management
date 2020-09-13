const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserAccountSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "Users",
        required: true
    },
    accountName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

UserAccountSchema.index({ user: 1, accountName: 1 });

module.exports = mongoose.model('UserAccounts', UserAccountSchema);