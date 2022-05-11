const { interpolate } = require('../utils');
const { triggers: { stochRSI } } = require('../utils/constants');
const BaseTrigger = require('./baseTrigger');

let current = 0;

module.exports = {
    ...BaseTrigger,

    calculate(point) {
        // Both indicators are in the lower part
        // That means we are good to be bought
        if(point.k < stochRSI.lower && point.d < stochRSI.lower && point.crossStochRSI) {
            // If we make a cross over in this tick
            // current = this.clamp(
            //     interpolate.linear(stochRSI.lower, 0, 0, 1, point.k),
            //     0, 1
            // );
            current = 1;
        }
        // Or both indicators are in the upper part
        // That means we are good to be sold
        else if (point.k > stochRSI.upper && point.d > stochRSI.upper && point.crossStochRSI) {
            // If we make a cross over in this tick
            // current = this.clamp(
            //     interpolate.linear(stochRSI.upper, 100, 0, -1, point.k),
            //     0, -1
            // );
            current = -1;
        }
        // Not interesed in the middle section
        // Decay current value
        else {
            if(current - stochRSI.decay < 0 || current + stochRSI.decay > 0)
                current = 0;
            else
                current = current > 0 ? current -= stochRSI.decay : current += stochRSI.decay
        };

        return current;
    }
}