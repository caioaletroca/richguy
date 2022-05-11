const { NOVADAX } = require('../utils/constants')

function Order({
    type = 'buy',
    value = 0,
    pair = NOVADAX.pair,
    point = {},
} = {}) {
    this.type = type;
    this.value = value;
    this.pair = pair;
    this.point = point;
    return this;
}

Order.prototype.toString = function () {
    return (
        `${this.pair},` +
        `${this.type},` +
        `${this.value.toFixed(6)},` +
        `${this.point.toString()}`
    );
}

module.exports = Order;