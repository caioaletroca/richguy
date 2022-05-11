const { CacheController } = require("../src/controllers");
const { Point } = require("../src/models");

const price = 2.5;
const size = 172800;

(async () => {
    let cache = [];

    for(let i = 0; i < size; i++)
        cache.push(new Point( price ));

    await CacheController.save(cache);
})();