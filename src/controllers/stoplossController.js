const { logger } = require('../helpers/logHelper');
const DataController = require('./dataController');

function StoplossController () {
    this.active = false;
    this.mode = "down";
    this.current = 0;
    return this;
}

StoplossController.prototype.activate = function (mode = 'down', point) {
    this.active = true;
    this.mode = mode;
    this.current = mode === 'down' ?
        point.price - (point.bbUpper - point.bbLower) :
        point.price + (point.bbUpper - point.bbLower);

    logger.info(`Stoploss set to ${this.current}`);
}

StoplossController.prototype.deactivate = function () {
    this.active = false;
    this.current = 0;
}

StoplossController.prototype.loop = async function () {
    if(!this.active) return;

    const lastPoint = DataController.last();
    const penultimatePoint = DataController.penultimate();
    const diff = lastPoint.price - penultimatePoint.price;

    if(
        (this.mode === 'down' && diff > 0) ||
        (this.mode === 'up' && diff < 0)
    )
        this.current += diff;
}

module.exports = new StoplossController();