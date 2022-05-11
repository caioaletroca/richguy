const { indicators, customIndicators } = require('../utils/constants');
const { Indicator, CrossStochRSI } = require('../adapters');
const DataController = require('./dataController');
const { logger } = require('../helpers/logHelper');

function IndicatorController() {
    return this;
}

IndicatorController.prototype.start = async function () {
    logger.info("Starting indicators");

    const dataset = DataController.data;
    
    // Instantiate Indicators
    Object.keys(indicators).map(i => {
        this[i] = new Indicator({
            ...indicators[i],
            dataset: dataset.slice(0, indicators[i].size)
        });
    });
    this.crossStochRSI = new CrossStochRSI({
        dataset: dataset.slice(0, customIndicators.crossStochRSI.size)
    });
    
    return this;
}

IndicatorController.prototype.loop = async function () {
    let lastPoint = DataController.last();
    
    if(!lastPoint) return;

    lastPoint.sma1 = this.sma1.calculate(lastPoint).value || 0;
    lastPoint.sma2 = this.sma2.calculate(lastPoint).value || 0;
    lastPoint.sma3 = this.sma3.calculate(lastPoint).value || 0;
    lastPoint.sma4 = this.sma4.calculate(lastPoint).value || 0;
    lastPoint.acc = this.acc.calculate(lastPoint).value || 0;

    const { upper, middle, lower } = this.bb.calculate(lastPoint).value;
    lastPoint.bbUpper = upper || 0;
    lastPoint.bbMiddle = middle || 0;
    lastPoint.bbLower = lower || 0;

    const { stochRSI, k, d } = this.stochRSI.calculate(lastPoint).value;
    lastPoint.stochRSI = stochRSI || 0;
    lastPoint.k = k || 0;
    lastPoint.d = d || 0;

    lastPoint.crossStochRSI = this.crossStochRSI.calculate(lastPoint).value || 0;

    // console.log(Math.atan(lastPoint.acc) * 180 / Math.PI);
    // console.log(DataController.data.length);

    return this;
}

module.exports = new IndicatorController();