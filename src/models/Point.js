const moment = require('moment');
const { cache } = require('../utils/constants');

function Point({
    time = moment(),
    price = 0,
    sma1 = 0,
    sma2 = 0,
    sma3 = 0,
    sma4 = 0,
    acc = 0,
    bbUpper = 0,
    bbMiddle = 0,
    bbLower = 0,
    stochRSI = 0,
    k = 0,
    d = 0,
    mr = 0,
    bb = 0,
    stoch = 0,
    likely = 0,
    operate = 0,
} = {}) {
    this.time = time;
    this.price = price;
    this.sma1 = sma1;
    this.sma2 = sma2;
    this.sma3 = sma3;
    this.sma4 = sma4;
    this.acc = acc;
    this.bbUpper = bbUpper;
    this.bbMiddle = bbMiddle;
    this.bbLower = bbLower;
    this.stochRSI = stochRSI;
    this.k = k;
    this.d = d;
    this.mr = mr;
    this.bb = bb;
    this.stoch = stoch;
    this.likely = likely;
    this.operate = operate;

    return this;
}

Point.prototype.toString = function () {
    return (
        `${cache.entryDateFormat(this.time)},` + 
        `${this.price.toFixed(6)},` +
        `${this.sma1.toFixed(6)},` + 
        `${this.sma2.toFixed(6)},` + 
        `${this.sma3.toFixed(6)},` + 
        `${this.sma4.toFixed(6)},` + 
        `${this.acc.toFixed(6)},` + 
        `${this.bbUpper.toFixed(6)},` + // H
        `${this.bbMiddle.toFixed(6)},` + // I
        `${this.bbLower.toFixed(6)},` + // J
        `${this.stochRSI.toFixed(6)},` +  // K
        `${this.k.toFixed(6)},` + // L
        `${this.d.toFixed(6)},` + // M
        `${this.mr.toFixed(6)},` +
        `${this.bb.toFixed(6)},` +
        `${this.stoch.toFixed(6)},` +
        `${this.likely.toFixed(6)},` +
        `${this.operate.toFixed(6)}`
    );
}

Point.prototype.fromString = function (string) {
    const raw = string.split(',');
    this.time = moment(raw[0]);
    this.price = parseFloat(raw[1]);
    this.sma1 = parseFloat(raw[2]);
    this.sma2 = parseFloat(raw[3]);
    this.sma3 = parseFloat(raw[4]);
    this.sma4 = parseFloat(raw[5]);
    this.acc = parseFloat(raw[6]);
    this.bbUpper = parseFloat(raw[7]);
    this.bbMiddle = parseFloat(raw[8]);
    this.bbLower = parseFloat(raw[9]);
    this.stochRSI = parseFloat(raw[10]);
    this.k = parseFloat(raw[11]);
    this.d = parseFloat(raw[12]);
    this.mr = parseFloat(raw[13]);
    this.bb = parseFloat(raw[14]);
    this.stoch = parseFloat(raw[15]);
    this.likely = parseFloat(raw[16]);
    this.operate = parseFloat(raw[17]);
    return this;
}

module.exports = Point;