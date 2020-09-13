const path = require('path');
const multer = require('multer');
const { BAD_REQUEST } = require('http-status-codes');
const { ALLOWED_UPLOAD_FILE_FORMATS } = require('./constants');

// Defining the desitnation and file name
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    },
});

// File format validation
const fileFilter = (req, file, cb) => {
    const isSupportedFormat = ALLOWED_UPLOAD_FILE_FORMATS.includes(path.extname(file.originalname));

    if(isSupportedFormat) return cb(null, true);
    cb({ statusCode: BAD_REQUEST, message: 'File Format not supported!'});
}

module.exports = multer({ 
    dest: "uploads", 
    storage: storage, 
    fileFilter: fileFilter 
});