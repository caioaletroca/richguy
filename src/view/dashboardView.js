const { getPage } = require('../helpers/puppeteerHelper');
const { logger } =  require('../helpers/logHelper');
const { mode, NOVADAX } = require('../utils/constants');
const { Point } = require('../models');
const generator = require('../../tests/priceGenerator');

module.exports = {
    priceElement: null,

    async start(pair) {
        logger.info(`Crawling into ${pair} pair dashboard`);

        await getPage().goto(NOVADAX.dashboard(pair));

        // Wait full load
        await getPage().waitForTimeout(2000);

        // Get price DOM node
        this.priceElement = await getPage().$(".price");
    },

    async query() {
        if(mode === 'full_simulated') {
            return new Point({
                price: parseFloat(generator.get())
            });
        }

        return new Point({
            price: parseFloat(
                (await getPage().evaluate(el => el.textContent, this.priceElement)).replace('.', '').replace(',', '.')
            )
        })
    }
}