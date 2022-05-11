const DataController = require('../controllers/dataController');
const OperatorController = require("../controllers/operatorController");
const StoplossController = require('../controllers/stoplossController');
const BaseState = require("./baseState");

function Operating () {
    return this;
}

Operating.prototype = Object.create(BaseState.prototype);

Operating.prototype.loop = async function () {
    let lastPoint = DataController.last();
    let lastOperation = OperatorController.last();
    let stop = StoplossController.current;

    // Check if we are bought
    if(lastOperation.start.type === 'buy') {
        lastPoint.operate = 1;

        // If inverted condition or we reached stoploss
        if(OperatorController.sold() || lastPoint.price < stop) {
        // if(lastPoint.price < stop) {
            await OperatorController.endOperation();

            // Set new state
            this.setState('Satiated');  
        }
    }
    // Check if we are sold
    else if(lastOperation.start.type === 'sell') {
        lastPoint.operate = -1;

        // If inverted condition
        if(OperatorController.bought() || lastPoint.price > stop) {
        // if(lastPoint.price > stop) {
            await OperatorController.endOperation();

            // Set new state
            this.setState('Satiated');
        }
    }
}

module.exports = Operating;