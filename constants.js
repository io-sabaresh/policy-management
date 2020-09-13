require('dotenv').config();

module.exports = {
    // Server Port
    PORT: process.env.PORT || 5000,
    // MongoDB connection String
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    // Allowed upload file formats
    ALLOWED_UPLOAD_FILE_FORMATS: ['.csv', '.xlsx']
}