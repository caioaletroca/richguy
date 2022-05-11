const { states } = require('../utils/constants');
const { logger } = require("../helpers/logHelper");
const BaseState = require("./baseState");

function Satiated () {
    return this;
}

Satiated.prototype = Object.create(BaseState.prototype);

Satiated.prototype.start = async function () {
    logger.info(`Cooldown to new operations for ${states.Satiated.cooldown} seconds`);

    setTimeout(() => {
        this.setState("Active");
    }, states.Satiated.cooldown * (1 + Math.random()) * 1000);
}

module.exports = Satiated;