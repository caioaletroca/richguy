const moment = require('moment');

function Candle({
    time = moment(),
    high = 0,
    low = 0,
    open = 0,
    close = 0
} = {}, dataset = []) {
    this.time = time;
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;

    if(dataset) this.fromPoints(dataset);

    return this;
}

Candle.prototype.fromRaw = function (dataset) {
    this.high = Math.max(dataset);
    this.low = Math.min(dataset);
    this.open = dataset[0];
    this.close = dataset[dataset.length - 1];
    return this;
}

Candle.prototype.fromPoints = function (points) {
    this.fromRaw(points.map(p => p.price));
    this.time = points[0].time;
    return this;
}

module.exports = Candle;