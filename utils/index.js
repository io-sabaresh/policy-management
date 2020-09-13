'use strict';
const { ObjectId } = require('mongoose').Types;

/**
 * Checks If an id is valid MongoDB ObjectId or not
 */
const isValidObjectId = (id) => {
    return ObjectId.isValid(id);
};

/**
 * Creates a MongoDB ObjectId
 */
const mongoId = (string) => {
    if (!isValidObjectId(string)) throw `Invalid String to convert into Mongo ObjectId`;

    return new ObjectId(string);
};

module.exports = {
    isValidObjectId,
    mongoId
}