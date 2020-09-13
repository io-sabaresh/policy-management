const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PolicyCategorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, { timestamps: true });

PolicyCategorySchema.index({ categoryName: 1 });

module.exports = mongoose.model('PolicyCategories', PolicyCategorySchema);