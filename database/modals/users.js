const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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


}, { timestamps: true });

UserSchema.index({ email: 1 });

module.exports = mongoose.model('Users', UserSchema);