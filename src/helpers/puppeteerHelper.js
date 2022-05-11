const constants = require('../utils/constants');
const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

let browser, page;

// Instantiate variables
async function start() {
    browser = await puppeteer.launch(constants.puppeteer);
    page = (await browser.pages())[0];
};

module.exports = {
    puppeteer,
    start,
    getPage: () => page
};