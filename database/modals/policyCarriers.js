const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PolicyCarrierSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

PolicyCarrierSchema.index({ companyName: 1 });

module.exports = mongoose.model('PolicyCarriers', PolicyCarrierSchema);