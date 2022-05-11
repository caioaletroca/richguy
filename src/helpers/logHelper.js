const path = require('path');
const moment = require('moment');
const { logs } = require('../utils/constants');
var log4js = require("log4js");

log4js.configure({
    appenders: {
        consoleLog: {
            type: 'stdout'
        },
        normalLog: {
            type: 'file',
            filename: path.join(logs.path, logs.filenameFormat(moment()) + '-log')
        },
        operationLog: {
            type: 'file',
            filename: path.join(logs.path, logs.filenameFormat(moment()) + '-operation')
        }
    },
    categories: {
        default: {
            appenders: [ 'consoleLog', 'normalLog' ],
            level: 'debug'
        },
        operation: {
            appenders: [ 'consoleLog', 'operationLog' ],
            level: 'debug'
        }
    }
})

module.exports = {
    logger: log4js.getLogger('default'),
    operationLog: log4js.getLogger('operation')
};
