const moment = require('moment');

function Data({
    key = moment(),
    value = 0,
} = {}) {
    this.key = key;
    this.value = value;
}

module.exports = Data;