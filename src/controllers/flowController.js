const { time } = require('../utils/constants');
const { logger } = require("../helpers/logHelper");
const DataController = require('./dataController');
const CollectorController = require('./collectorController');
const IndicatorController = require('./indicatorController');
const AdvisorController = require('./advisorController');
const OperatorController = require('./operatorController');
const StateController = require('./stateController');
const StoplossController = require('../controllers/stoplossController');
const FFTController = require('./fftController');

function FlowController() {
    this.timer = undefined;

    return this;
}

FlowController.prototype.start = async function () {
    logger.info("Starting flow loop");

    this.registerEvents();

    // Start main loop
    this.time = setInterval(() => this.loop(), time.COLLECTOR_INTERVAL * 1000);

    return this;
}

FlowController.prototype.loop = async function () {
    await CollectorController.loop();
    await IndicatorController.loop();
    await AdvisorController.loop();
    await StoplossController.loop();
    await FFTController.loop();
    await OperatorController.loop();
    await StateController.loop();
}

FlowController.prototype.registerEvents = function () {
    if (process.platform === "win32") {
        // Quick work around for windows
        require("readline")
            .createInterface({
                input: process.stdin,
                output: process.stdout
            })
            .on("SIGINT", function () {
                process.emit("SIGINT");
            });
    }
      
    process.on("SIGINT", () => this.exit());
}

FlowController.prototype.exit = async function () {
    // Shut down events
    clearInterval(this.timer);

    await DataController.exit();
    
    logger.info("Exiting application");
    return process.exit(0);
}

module.exports = new FlowController();