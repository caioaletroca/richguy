const DataController = require("../controllers/dataController");
const { memory } = require("../utils/constants");
const BaseState = require("./baseState");

function Standby () {
    return this;
}

Standby.prototype = Object.create(BaseState.prototype);

Standby.prototype.loop = async function () {
    // Check for minimum requiriments to start
    if(DataController.data.length > memory.MIN_POINTS_SIZE) {
        this.setState("Active");
    }
}

module.exports = Standby;