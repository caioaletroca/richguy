const { NOVADAX } = require('../utils');

/**
 * Logs the user in
 * @param {String} email E-mail for authentication
 * @param {String} password Password for authentication
 * @param {Boolean} gAuth Flags that defines if the user needs Google Authentication
 */
module.exports = async function (email, password, gAuth = false) {
    await page.goto('https://www.novadax.com.br/login?return_path=/');
  
    await page.type('.input', NOVADAX.credentials.email);
    await page.type('input[type=password]', NOVADAX.credentials.password);

    await page.click('.Button.primary.large');

    if(gAuth)
        await page.waitForSelector('.gp_hidden_input');
}