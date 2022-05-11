const { logger } =  require('../helpers/logHelper');
const DataController = require('./dataController');
const { DashboardView } = require('../view');

function CollectorController() {
    return this;
}

CollectorController.prototype.start = async function () {
    logger.info("Starting data collection");

    return this;
};

CollectorController.prototype.loop = async function () {
    const point = await DashboardView.query();
    
    DataController.push(point);
}

module.exports = new CollectorController();