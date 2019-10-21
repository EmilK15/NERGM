const winston = require('winston');
var appRoot = require('app-root-path');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/info.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true
    }
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false, //do not exit on handled exceptions
});

//this should get morgan generated output into the winston log files
logger.stream = {
    write: function(message, encoding) {
        // logger.info(message);
    },
};

module.exports = logger;