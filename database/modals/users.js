const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Policies = require('./policies');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    userType: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String
    },
    city: String,
    state: String,
    zip: String,
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female']
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// Policies taken by users
UserSchema.virtual('policies', {
    ref: Policies,
    localField: '_id',
    foreignField: 'user',
    justOne: false,
});

UserSchema.index({ email: 1 });
UserSchema.index({ firstName: 'text' });

module.exports = mongoose.model('Users', UserSchema);