const { operationLog } = require("../helpers/logHelper");

function ProfitController() {
    return this;
}

ProfitController.prototype.log = function (operation) {
    let diff = operation.end.point.price - operation.start.point.price;

    if(operation.start.type === 'sell') {
        diff = Math.abs(diff);
    }

    const profit = diff / operation.start.point.price * 100;

    operationLog.info(`Profit earned as ${profit.toFixed(2)}% over last operation from ${operation.start.value.toFixed(2)}`);
}

module.exports = new ProfitController();