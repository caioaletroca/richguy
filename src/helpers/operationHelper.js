const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const { operation } = require('../utils/constants');

module.exports = {
    async save(data) {
        let fileName = operation.filenameFormat(moment()) + operation.extension;
        
        return await fs.writeFile(
            path.join(process.cwd(), operation.path, fileName),
            data,
            { flag: 'a+' },
            err => {
                logger.error(`Error when writing on the file ${fileName}`)
                logger.error(err);
            }
        );
    },
}