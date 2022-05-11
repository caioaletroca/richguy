const { time } = require('../src/utils/constants')

function noise(offset, tick, frequency) {
    return (offset + 
        Math.sin(tick * Math.PI * 2 / frequency) +
        0.6 * Math.sin(tick * Math.PI * 2 / (frequency / 10)) +
        Math.sin(tick * Math.PI * 2 / (frequency / 0.4)) +
        0.1 * Math.random()
    ).toFixed(6);
}

function pure(offset, tick, frequency) {
    return (offset + Math.sin(tick * Math.PI * 2 / frequency)).toFixed(6);
}

module.exports = {
    f: time.COLLECTOR_INTERVAL * 60 * 20,
    offset: 2,
    count: 0,

    get() {
        const newValue = noise(this.offset, this.count, this.f);

        this.count++;

        return newValue;
    }
}