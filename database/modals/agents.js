const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    agentName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
}, { timestamps: true });

AgentSchema.index({ agentName: 1 });

module.exports = mongoose.model('Agents', AgentSchema);