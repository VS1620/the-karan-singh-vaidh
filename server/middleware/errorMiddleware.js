const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const fs = require('fs');
const path = require('path');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    const logMessage = `\n[${new Date().toISOString()}] ${statusCode} - ${err.message}\n${err.stack}\n`;
    const logFile = path.join(__dirname, '../error_log.txt');
    fs.appendFileSync(logFile, logMessage);

    console.error('SERVER ERROR HANDLER:', err.message);
    console.error(err.stack); // ADDED STACK TRACE
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
