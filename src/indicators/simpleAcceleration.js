class SimpleAcceleration {
    constructor ({
        values = [],
        period = 2
    } = {}) {
        // Check for errors
        // if(values.length < 2) throw new Error("SimpleAcceleration needs at least values property");

        this.period = period;
        this.data = values;
        this.current = 0;
        
        SimpleAcceleration._calculate({ values, period });

        return this;
    }

    static _parseValues(values, period) {
        let out = [];
        for(let i = 0; i <= values.length - period; i++) {
            out.push(values.slice(i, i + period));
        }
        return out;
    }
    
    static _differenciate(values, period) {
        return values.map((i) => 
            (i[i.length - 1] - i[0]) / (2 * period * period)
        );
    }

    static _calculate({ values, period }) {
        // Avoid calculation until minimum number of data
        if(values.length < period) return undefined;

        let space = SimpleAcceleration._parseValues(values, period);

        let velocity = SimpleAcceleration._parseValues(
            SimpleAcceleration._differenciate(space, period),
            period,
        );
        
        return SimpleAcceleration._differenciate(velocity, period);
    }

    static calculate(...args) {
        return SimpleAcceleration._calculate(...args);
    }

    getResult() {
        return SimpleAcceleration._calculate({ values: this.data, period: this.period });
    }
    
    nextValue(next) {
        // Add new item
        this.data.unshift(next);

        // Avoid calculation until minimum number of data
        if(this.data.length < this.period) return undefined;

        // Remove final data
        this.data.pop();
        
        // Slice the data to get only important part
        const values = this.data.slice(0, this.period + 1);
        
        // Calculate acceleration
        const acceleration = SimpleAcceleration
            ._differenciate([ values ], this.period);

        this.current += acceleration[0];

        return acceleration[0];
    }
}

module.exports = SimpleAcceleration;

// class SimpleAcceleration {
//     constructor ({
//         values = [],
//         period = 2
//     } = {}) {
//         // Check for errors
//         // if(values.length < 2) throw new Error("SimpleAcceleration needs at least values property");

//         this.period = period;
//         this.data = values;
        
//         SimpleAcceleration._calculate({ values, period });

//         return this;
//     }

//     static _parseValues(values, period) {
//         let out = [];
//         for(let i = 0; i <= values.length - period; i++) {
//             out.push(values.slice(i, i + period));
//         }
//         return out;
//     }
    
//     static _differenciate(values, period) {
//         return values.map((i) => 
//             (i[i.length - 1] - i[0]) / (2 * period * period)
//         );
//     }

//     static _calculate({ values, period }) {
//         // Avoid calculation until minimum number of data
//         if(values.length < period) return undefined;

//         let space = SimpleAcceleration._parseValues(values, period);

//         let velocity = SimpleAcceleration._parseValues(
//             SimpleAcceleration._differenciate(space, period),
//             period,
//         );
        
//         return SimpleAcceleration._differenciate(velocity, period);
//     }

//     static calculate(...args) {
//         return SimpleAcceleration._calculate(...args);
//     }

//     getResult() {
//         return SimpleAcceleration._calculate({ values: this.data, period: this.period });
//     }
    
//     nextValue(next) {
//         // Add new item
//         this.data.unshift(next);

//         // Avoid calculation until minimum number of data
//         if(this.data.length < this.period) return undefined;

//         // Remove final data
//         this.data.pop();
        
//         // Slice the data to get only important part
//         const values = this.data.slice(0, this.period + 1);
        
//         // Calculate acceleration
//         const acceleration = SimpleAcceleration
//             ._differenciate([ values ], this.period);
        
//         return acceleration[0];
//     }
// }

// module.exports = SimpleAcceleration;