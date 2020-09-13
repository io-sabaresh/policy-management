const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../constants');

module.exports = mongoose.connect(MONGO_CONNECTION_STRING, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, data) => {
    if (err) console.log("Error while connecting to mongo db ! \n", err);
    else console.log("Mongo DB connected!");
});