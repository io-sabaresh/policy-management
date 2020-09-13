require('dotenv').config();

module.exports = {
    // Server Port
    PORT: process.env.PORT || 5000,
    // MongoDB connection String
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    // Allowed upload file formats
    ALLOWED_UPLOAD_FILE_FORMATS: ['.csv', '.xlsx'],
    // Default Fetch params
    FETCH_DEFAULT: {
        PAGE: 1,
        LIMIT: 10,
        SKIP: 0,
        SELECT: ""
    }
}