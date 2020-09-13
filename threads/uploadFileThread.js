'use strict';
const XLSX = require('xlsx');
const dbConnection = require('../database/config');
const { ErrorHandler } = require('../errorHandler/index');
const { workerData, parentPort } = require("worker_threads");
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const dataValidation = require('../validations/uploadPolicySchema');
const { addPolicyDetails } = require('../services/addPolicyDetails');

try {
    // Convert the xlsx/csv file to JSON
    const workbook = XLSX.readFile(workerData.filePath, { cellDates: true, dateNF: "DD-MM-YYYY" });
    const sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // Failed records
    let errorRecords = [];

    // DB connection for worker thread, since it works on a separate event loop
    dbConnection;

    (async () => {
        await Promise.all(xlData.map(async data => {
            try {
                const { error } = dataValidation.validate(data);
                // If validation fails
                if (error) {
                    errorRecords.push({ ...data, error });
                    return;
                }
                // Add Policy details in database
                await addPolicyDetails(data);
            } catch (error) {
                errorRecords.push({ ...data, error: JSON.stringify(error) });
            }
        }));
        // If there are any error records, partial success
        if(errorRecords.length) {
            parentPort.postMessage({ completelySuccess: false, failedContent: errorRecords });
        } else { // else success
            parentPort.postMessage({ completelySuccess: true });
        }
    })();

} catch (error) {
    if (typeof error !== ErrorHandler)
        error = new ErrorHandler(error.statusCode || INTERNAL_SERVER_ERROR, error.message || error);
    throw error;
}