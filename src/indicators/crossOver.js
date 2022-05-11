const { CrossUp, CrossDown } = require('../helpers/indicatorsHelper');

class CrossOver {
    constructor ({
        lineA = [],
        lineB = []
    } = {}) {
        // Check for errors
        // if(values.length < 2) throw new Error("CrossOver needs at least values property");

        this.crossUp = undefined;
        this.crossDown = undefined;
        
        this.lineA = lineA;
        this.lineB = lineB;
        
        this.start({ lineA, lineB });

        return this;
    }

    _merge(up, down) {
        return up.map((v, i) => v || down[i]);
    }

    start(data) {
        this.crossUp = new CrossUp(data);
        this.crossDown = new CrossDown(data);
    }

    getResult() {
        const up = this.crossUp.getResult();
        const down = this.crossDown.getResult();

        // Merge arrays
        return this._merge(up, down);
    }
    
    nextValue(u, d) {
        const up = this.crossUp.nextValue(u, d);
        const down = this.crossDown.nextValue(u, d);

        // Merge arrays
        return this._merge([ up ], [ down ])[0];
    }
}

module.exports = CrossOver;