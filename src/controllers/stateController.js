const { logger } = require("../helpers/logHelper");
const states = require("../states");

function StateController () {
    this.state = undefined;
    return this;
}

StateController.prototype.start = async function () {
    logger.info("Starting application states");

    this.setState("Standby");
}

StateController.prototype.setState = function (newState) {
    // Check for invalid state
    let newStateClass = states[newState];
    if(!newStateClass) throw new Error(`StateController: trying to set a invalid state called ${newState}`);

    // Instantiate new state
    this.state = new newStateClass();
    
    // Bind lifecycle methods
    this.state.setState = this.setState.bind(this);

    logger.info(`State set to ${newState}`);

    // Run state start method
    this.state.start();
}

StateController.prototype.loop = async function () {
    if(!this.state) throw new Error("StateController: state is invalid and not defined");

    await this.state.loop();
}

module.exports = new StateController();