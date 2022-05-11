const { memory, time } = require('../utils/constants');
const { logger } =  require('../helpers/logHelper');
const CacheController = require('./cacheController');

function DataController(data = []) {
    this.data = data;
    this.cachedLength = 0;

    return this;
}

DataController.prototype.start = async function () {
    logger.info("Searching for cached data");

    this.data = await CacheController.load(memory.MIN_POINTS_SIZE);
    
    // Save how many items has already been cached
    this.cachedLength = this.data.length;

    setInterval(() => this.rebalance(), time.DATA_INTERVAL * 1000);

    return this;
}

DataController.prototype.penultimate = function () {
    return this.data[1];
}

DataController.prototype.last = function () {
    return this.data[0];
}

DataController.prototype.push = function (point) {
    this.data.unshift(point);
    return this;
}

DataController.prototype.save = async function (dump) {
    // Check if there is already cached items in the memory
    if(this.cachedLength > 0) {
        // If the cached size is higher that what we will dump, them cut out the cached items 
        if(this.cachedLength > dump.length) {
            dump.splice(dump.length - this.cachedLength, this.cachedLength);

            // Normal save
            await CacheController.save(dump);

            logger.info("Items saved into the cache");

            // No more cached items in the memory
            this.cachedLength = 0;
        }
        // That means that all items we will dump, has already been cached, so no cache
        else {
            // Also, decrements the already in memory cache count
            this.cachedLength -= dump.length;

            logger.info("No items need to be saved");
        }
    }
    // Saves normally, since there is no already cached items in the memory
    else {
        await CacheController.save(dump);

        logger.info("Items saved into the cache");
    }
}

DataController.prototype.rebalance = async function () {
    if(this.data.length < memory.MAX_POINTS_SIZE) return;
    
    // Get items to dump
    let dump = this.data.slice(memory.MIN_POINTS_SIZE);

    // Save
    await this.save(dump);

    // Clean up memory
    this.data.splice(memory.MIN_POINTS_SIZE, this.data.length - memory.MIN_POINTS_SIZE);
}

DataController.prototype.exit = async function () {
    logger.info("Saving into cache before exit");

    return await this.save(this.data);
}

module.exports = new DataController();