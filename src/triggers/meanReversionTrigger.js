const { interpolate } = require('../utils');
const { triggers: { meanReversion } } = require('../utils/constants');
const BaseTrigger = require('./baseTrigger');

module.exports = {
    ...BaseTrigger,

    calculate(point) {
        // Get acceleration as angle
        const angle = Math.atan(point.acc) * 180 / Math.PI;

        // Price lower than the average
        // Better be bought
        if(point.price <= point.sma1) {
            // If we are still going down, return zero
            if(angle < 0) return 0;

            return this.clamp(
                interpolate.linear(0, meanReversion.maxAngle, 0, 1, angle),
                -1,
                1
            )
        }
        // Price higher than the average
        // Better be sold
        else {
            // If we are still going up, return zero
            if(angle > 0) return 0;

            return this.clamp(
                interpolate.linear(0, -meanReversion.maxAngle, 0, -1, angle),
                -1,
                1
            );
        }
    }
}