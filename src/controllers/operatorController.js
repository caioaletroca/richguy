const { logger, operationLog } = require('../helpers/logHelper');
const { mode, operation } = require('../utils/constants');
const { Operation, Order } = require('../models');
const { OperatorView } = require('../view');
const operationHelper = require('../helpers/operationHelper');
const DataController = require('./dataController');
const AdvisorController = require('./advisorController');
const StoplossController = require('../controllers/stoplossController');
const ProfitController = require('./profitController');

function OperatorController () {
    this.data = [];
    return this;
}

/**
 * Stores a new operation
 * @param {Operation} op New Operation to store
 * @returns 
 */
OperatorController.prototype.save = function (op) {
    return this.data.unshift(op);
}

/**
 * Gets the last operation
 * @returns Operation
 */
OperatorController.prototype.last = function () {
    return this.data[0];
}

/**
 * Checks if the likely are good to bought
 * @returns Boolean
 */
OperatorController.prototype.bought = function () {
    return AdvisorController.likely > operation.threshold
}

/**
 * Checks if the likely are good to sold
 * @returns Boolean
 */
OperatorController.prototype.sold = function () {
    return AdvisorController.likely < -operation.threshold
}

/**
 * Checks if the likely are good to operate at all
 * @returns Boolean
 */
OperatorController.prototype.operate = function () {
    return this.bought() || this.sold();
}

/**
 * Execute the operation
 * @param {Order} order The order to be executed
 * @returns 
 */
OperatorController.prototype.execute = async function (order) {
    // Only efetuate operation when running at production
    if(mode !== 'active') return;
    return await OperatorView[order.type](order.value);
}

/**
 * Starts a new operation
 */
OperatorController.prototype.startOperation = async function () {
    let order;
    let lastPoint = DataController.last();

    // Bought
    if(this.bought()) {
        order = new Order({
            type: 'buy',
            value: operation.moneyAmount,
            point: lastPoint
        });
    }
    // Sold
    else if(this.sold()) {
        order = new Order({
            type: 'sell',
            value: operation.cryptoAmount,
            point: lastPoint
        });
    }

    await this.execute(order);

    // Create operation
    let op = new Operation({ start: order });

    // Save
    this.save(op);

    // Set stop loss
    StoplossController.activate(order.type === "buy" ? "down" : "up", lastPoint);

    operationLog.info(`Operation of type ${order.type} and value ${order.value}`);
    console.log(lastPoint);
}

/**
 * Ends the current operation
 */
OperatorController.prototype.endOperation = async function () {
    let order;
    let lastOperation = this.last();
    let lastPoint = DataController.last();

    // Bought
    if(lastOperation.start.type === 'buy') {
        order = new Order({
            type: 'sell',
            value: (operation.moneyAmount / lastOperation.start.point.price),
            point: lastPoint
        });
    }
    // Sold
    else if(lastOperation.start.type === 'sell') {
        order = new Order({
            type: 'buy',
            value: (operation.cryptoAmount * lastPoint.price),
            point: lastPoint
        });
    }

    await this.execute(order);

    // Save in the operation
    lastOperation.end = order;
    
    // Set stop loss
    StoplossController.deactivate();

    operationLog.info(`Operation of type ${order.type} and value ${order.value}`);

    // Call profit
    ProfitController.log(lastOperation);
    console.log(lastPoint);
    // Dump into file
    await operationHelper.save(lastOperation.toString() + '\n');
}

OperatorController.prototype.loop = async function () {
    if(this.data.length > 10) {
        this.data.pop();
    }
}

module.exports = new OperatorController();