require('./helpers/envHelper');
const { NOVADAX } = require('./utils/constants');
const puppeteerHelper = require('./helpers/puppeteerHelper');
const { logger } =  require('./helpers/logHelper');
const { AdvisorController, IndicatorController, CollectorController, DataController, FlowController, FFTController, StateController } = require('./controllers');
const { DashboardView, OperatorView } = require('./view');

module.exports = async function app() {
    logger.info("Starting application");

    await puppeteerHelper.start();

    logger.info("Booting services");
    await DashboardView.start(NOVADAX.pair);
    await DataController.start();
    await CollectorController.start();
    await IndicatorController.start();
    await FFTController.start();
    await OperatorView.start();
    await AdvisorController.start();
    await StateController.start();
    await FlowController.start();
}