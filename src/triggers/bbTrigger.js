const { interpolate } = require('../utils');
const BaseTrigger = require('./baseTrigger');

const smooth = 3;

module.exports = {
    ...BaseTrigger,

    calculate(point) {
        // Price lower than the average
        // Better be bought
        if(point.price <= point.sma1) {
            return this.clamp(
                -interpolate.polinomial(point.bbMiddle, point.bbUpper, smooth, point.price),
                -1,
                1
            )
        }
        // Price higher than the average
        // Better be sold
        else {
            return this.clamp(
                -interpolate.polinomial(point.bbMiddle, point.bbUpper, smooth, point.price),
                -1,
                1
            );
        }
    }
}