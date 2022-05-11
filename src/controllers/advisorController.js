const { logger } = require("../helpers/logHelper");
const DataController = require("./dataController");
const { MeanReversionTrigger, BBTrigger, StochRSITrigger } = require('../triggers');
const { triggerWeights } = require("../utils/constants");

function AdvisorController() {
    this.likely = 0;
    return this;
}

AdvisorController.prototype.start = async function () {
    logger.info("Starting advisor");

    return this;
}

AdvisorController.prototype.loop = function () {
    let lastPoint = DataController.last();

    if(!lastPoint) return;

    lastPoint.mr = MeanReversionTrigger.calculate(lastPoint);
    lastPoint.bb = BBTrigger.calculate(lastPoint);
    lastPoint.stoch = StochRSITrigger.calculate(lastPoint);

    const weights = [
        lastPoint.mr * triggerWeights.mr,
        lastPoint.bb * triggerWeights.bb,
        lastPoint.stoch * triggerWeights.stoch
    ];

    lastPoint.likely = weights.reduce((sum, n) => sum + n, 0);

    this.likely = lastPoint.likely;
}

module.exports = new AdvisorController();