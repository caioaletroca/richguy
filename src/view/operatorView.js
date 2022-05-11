const { logger, operationLog } =  require('../helpers/logHelper');
const { getPage } = require('../helpers/puppeteerHelper');
const { NOVADAX } = require('../utils/constants');

module.exports = {
    buyValueInputElement: null,    
    buyButtonElement: null,
    sellValueInputElement: null,
    sellButtonElement: null,

    async start() {
        logger.info("Getting OperatorView DOM elements");

        // Get elements
        this.buyValueInputElement = (await getPage().$x(`//*[@id="__next"]/div[2]/div[1]/div[2]/div[3]/div/div[2]/div/div[1]/div[1]/form/div/div[2]/div[1]/div[1]/div[2]/input`))[0]
        this.buyButtonElement = (await getPage().$x(`//*[@id="__next"]/div[2]/div[1]/div[2]/div[3]/div/div[2]/div/div[1]/div[1]/div/button`))[0];
        this.sellValueInputElement = (await getPage().$x(`//*[@id="__next"]/div[2]/div[1]/div[2]/div[3]/div/div[2]/div/div[1]/div[2]/form/div/div[2]/div[1]/div[1]/div[2]/input`)[0])
        this.sellButtonElement = (await getPage().$x(`//*[@id="__next"]/div[2]/div[1]/div[2]/div[3]/div/div[2]/div/div[1]/div[2]/div/button`)[0])
    },

    async buy(value) {
        logger.info(`Efetuating a buy operation of ${NOVADAX.pair} as ${value}`);

        await this.buyValueInputElement.type(value.toString());
        await this.buyButtonElement.click();

        operationLog.info(`Buy operation efetuated in pair ${NOVADAX.pair} with ${value}`);
    },

    async sell(value) {
        logger.info(`Efetuating a sell operation of ${NOVADAX.pair} as ${value}`);

        await this.sellValueInputElement.type(value.toString());
        await this.sellButtonElement.click();

        operationLog.info(`Sell operation efetuated in pair ${NOVADAX.pair} with ${value}`);
    }
}