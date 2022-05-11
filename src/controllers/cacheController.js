const moment = require('moment');
const { logger } =  require('../helpers/logHelper');
const { cache, memory } = require('../utils/constants');
const { Point } = require('../models');
const cacheHelper = require('../helpers/cacheHelper');
const csvHelper = require('../helpers/csvHelper');

function CacheController() {
    return this;
}

CacheController.prototype.start = async function () {
    logger.info("Starting cache");
}

CacheController.prototype.load = async function (size) {
    let points = [];
    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    // Check if there is cache
    let list = cacheHelper.list();
    if(list.length === 0) {
        log.warn("No cache found");
        return points;
    }

    // Search for a file from today
    if(await cacheHelper.exists(today)) {
        const string = await cacheHelper.load(today);
        points = csvHelper.parse(Point, string).reverse().slice(1);
    }

    // Check if already satisfied minimum size
    if(points.length > size) {
        // Remove extra data
        return points.slice(0, size);
    }
    
    // Search for a file from yesterday
    if(await cacheHelper.exists(yesterday)) {
        const string = await cacheHelper.load(yesterday);
        points = [ ...points, ...csvHelper.parse(Point, string).reverse().slice(1) ];
    }

    // Check if already satisfied minimum size
    if(points.length > size) {
        // Remove extra data
        return points.slice(0, size);
    }

    logger.info("Cached loaded");

    return points;
}

CacheController.prototype.save = async function (points) {
    if(!points || points.length === 0) {
        logger.warn("No data to save into files");
        return;
    }
    
    // Reverse dataset order
    points.reverse();

    // Calculate for multiple dates
    const files = points.reduce(
        (sum, point) => {
            const day = cache.filenameFormat(point.time);
            
            if(sum[day])
                sum[day].push(point)
            else
                Object.assign(sum, { [day]: [point] });

            return sum;
        },
        {}
    );
    
    // Save into files
    await Promise.all(
        Object.keys(files).map(
            key =>
                cacheHelper.save(
                    key,
                    csvHelper.strigify(files[key])
                )
        )
    );
}

module.exports = new CacheController();