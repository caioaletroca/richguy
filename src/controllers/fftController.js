const { logger } =  require('../helpers/logHelper');
const DataController = require('./dataController')

function FFTController() {
    return this;
}

FFTController.prototype.start = async function () {
    logger.info("Starting FFT");

    
    return this;
};

FFTController.prototype.loop = async function () {
    console.log(DataController.data[0].price);
}

module.exports = new FFTController();