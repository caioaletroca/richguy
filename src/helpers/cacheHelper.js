const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const { cache } = require('../utils/constants');
const { logger } =  require('./logHelper');

module.exports = {
    async exists(date) {
        try {
            await fs.access(
                path.join(
                    process.cwd(), cache.path, cache.filenameFormat(date) + cache.extension
                )
            );
            return true;
        } catch (e) {
            return false;
        }
    },

    async list() {
        const dir = path.join(process.cwd(), cache.path);
        
        try {
            // Check if cache folder exists
            await fs.access(dir);

            return await fs.readdir(dir);
        } catch (e) {
            logger.warn("Cache folder does not exists");
            return [];
        }
    },

    async save(date, data) {
        let fileName = cache.filenameFormat(moment());
        
        if(typeof date === "string")
            fileName = date + cache.extension;
        else
            fileName = cache.filenameFormat(date) + cache.extension
        
        return await fs.writeFile(
            path.join(process.cwd(), cache.path, fileName),
            data,
            { flag: 'a+' },
            err => {
                logger.error(`Error when writing on the file ${fileName}`)
                logger.error(err);
            }
        );
    },

    async load(date) {
        let fileName = cache.filenameFormat(moment());
        
        if(typeof date === "string")
            fileName = date + cache.extension;
        else
            fileName = cache.filenameFormat(date) + cache.extension

        try {
            const filePath = path.join(process.cwd(), cache.path, fileName)

            // Checks if file exists
            await fs.access(filePath);

            return await fs.readFile(filePath, { encoding: 'utf-8' });
        } catch (e) {
            logger.error(`Could not load file ${fileName}, file does not exists`);
            return "";
        }
    }
}