const indicators = require('../indicators');
const Data = require("../models/Data");

function Indicator({
    name = 'SMA',
    dataset = [],
    period = 10,
    ...options
} = {}) {
    this.name = name;
    this.indicator = undefined;
    this.current = 0;
    this.period = period;

    // if(dataset.length > 0)
        this.start(dataset, options);

    return this;
}

Indicator.prototype.start = function (dataset, options) {
    this.indicator = new indicators[this.name]({ values: dataset.map(i => i.price), period: this.period, ...options });
    return this;
}

Indicator.prototype.calculate = function (newPoint) {
    this.indicator.getResult();
    
    this.current = new Data({
        value: this.indicator.nextValue(newPoint.price)
    });

    return this.current;
}

module.exports = Indicator;