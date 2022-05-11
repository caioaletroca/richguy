const indicators = require('../indicators');
const Data = require("../models/Data");

function CrossStochRSI({
    dataset = [],
    ...options
} = {}) {
    this.name = 'CrossOver';
    this.indicator = undefined;
    this.current = 0;

    // if(dataset.length > 0)
        this.start(dataset, options);

    return this;
}

CrossStochRSI.prototype.start = function (dataset, options) {
    this.indicator = new indicators[this.name]({ lineA: dataset.map(i => i.k), lineB: dataset.map(i => i.d), ...options });
    return this;
}

CrossStochRSI.prototype.calculate = function (newPoint) {
    this.indicator.getResult();
    
    this.current = new Data({
        value: this.indicator.nextValue(newPoint.k, newPoint.d)
    });

    return this.current;
}

module.exports = CrossStochRSI;