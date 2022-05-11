const OperatorController = require("../controllers/operatorController");
const BaseState = require("./baseState");

function Active () {
    return this;
}

Active.prototype = Object.create(BaseState.prototype);

Active.prototype.loop = async function () {
    // If we are good to operate
    if(OperatorController.operate()) {
        await OperatorController.startOperation();

        // Set new state
        this.setState('Operating')
    }
}

module.exports = Active;