const path = require('path');
const parseArgs = require('minimist');
const dotenv = require('dotenv');

const args = parseArgs(process.argv.slice(2));

dotenv.config({
    path: path.join(process.cwd(), '.env' + (args.env !== '' ? `.${args.env}` : ''))
});

module.exports = dotenv;