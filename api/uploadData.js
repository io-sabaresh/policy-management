'use strict';
const XLSX = require('xlsx');
const { ErrorHandler } = require('../errorHandler/index');
const { OK, PARTIAL_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { Worker, workerData, isMainThread } = require("worker_threads");

/**
 * Upload policy details into DB using Worker threads
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const uploadData = (req, res, next) => {
    try {

        if (isMainThread) {
            let thread = new Worker('./threads/uploadFileThread.js', {
                workerData: {
                    file: req.file.filename,
                    filePath: `${req.file.destination}${req.file.filename}`
                }
            });

            thread.on("message", data => {
                // If all records are successfully processed
                if (data.completelySuccess === true) {
                    res.status(OK).json({ message: 'Upload Success' });
                } else { // if any record failed during process
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.json_to_sheet(data.failedContent);
                    XLSX.utils.book_append_sheet(wb, ws, 'failedContent');
                    XLSX.writeFile(wb, `./uploads/error/Error-${req.file.filename}`);

                    res
                        .status(PARTIAL_CONTENT)
                        .json({ message: `Few Records failed! \n Failed records path: "./uploads/error/Error-${req.file.filename}"` });
                }
            });

            thread.on("error", err => { throw err });

            thread.on("exit", code => {
                if (code != 0)
                    throw new ErrorHandler(INTERNAL_SERVER_ERROR, `Worker stopped with exit code ${code}`)
            });

        };
    } catch (error) {
        if (typeof error !== ErrorHandler)
            error = new ErrorHandler(error.statusCode || INTERNAL_SERVER_ERROR, error.message || error);
        next(error);
    }
}

module.exports = {
    uploadData
}