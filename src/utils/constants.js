module.exports = Object.freeze({
    mode: process.env.MODE || "simulated",
    sleep: {
        active: process.env.SLEEP || false,
        wakeTime: "",
        sleepTime: ""
    },

    puppeteer: {
        headless: false,
        handleSIGINT: false
    },

    memory: {
        MAX_POINTS_SIZE: process.env.CYCLE_TIME * 60 * 75,
        MIN_POINTS_SIZE: process.env.CYCLE_TIME * 60 * 65,
    },

    indicators: {
        sma1: {
            name: 'SMA',
            period: process.env.CYCLE_TIME * 60 * 5,
            size: process.env.CYCLE_TIME * 60 * 6,
        },
        sma2: {
            name: 'SMA',
            period: process.env.CYCLE_TIME * 60 * 10,
            size: process.env.CYCLE_TIME * 60 * 12,
        },
        sma3: {
            name: 'SMA',
            period: process.env.CYCLE_TIME * 60 * 20,
            size: process.env.CYCLE_TIME * 60 * 22,
        },
        sma4: {
            name: 'SMA',
            period: process.env.CYCLE_TIME * 60 * 30,
            size: process.env.CYCLE_TIME * 60 * 32,
        },
        acc: {
            name: 'SimpleAcceleration',
            period: process.env.CYCLE_TIME * 20,
            size: process.env.CYCLE_TIME * 20
        },
        bb: {
            name: "BollingerBands",
            period: process.env.CYCLE_TIME * 60 * 30,
            size: process.env.CYCLE_TIME * 60 * 35,
            stdDev: 2
        },
        stochRSI: {
            name: "StochasticRSI",
            rsiPeriod: process.env.CYCLE_TIME * 21 * 60,
            stochasticPeriod: process.env.CYCLE_TIME * 21 * 60,
            kPeriod: process.env.CYCLE_TIME * 6 * 60,
            dPeriod: process.env.CYCLE_TIME * 6 * 60
        }
    },
    customIndicators: {
        crossStochRSI: {
            size: process.env.CYCLE_TIME * 60 * 20
        }
    },

    triggers: {
        meanReversion: {
            maxAngle: 30
        },
        stochRSI: {
            upper: 75,
            lower: 25,
            decay: 0.08
        }
    },

    triggerWeights: {
        mr: 0,
        bb: 0.5,
        stoch: 0.5
    },

    operation: {
        path: './operation',
        extension: ".csv",
        entryDateFormat: (date) => date.format("YYYY-MM-DD HH:mm:ss"),
        filenameFormat: (date) => date.format("YYYYMMDD"),

        threshold: 0.5,
        moneyAmount: 150,
        cryptoAmount: 50,
        stoploss: 100
    },

    states: {
        Satiated: {
            cooldown: 10
        }
    },

    time: {
        DATA_INTERVAL: process.env.CYCLE_TIME * 60,
        COLLECTOR_INTERVAL: process.env.CYCLE_TIME || 1
    },

    NOVADAX: {
        pair: "BTT_BRL",
        login: 'https://www.novadax.com.br/login?return_path=/',
        dashboard: (pair) => `https://www.novadax.com.br/product/orderbook?pair=${pair}`,
        credentials: {
            email: process.env.NOVADAX_EMAIL,
            password: process.env.NOVADAX_PASSWORD
        }
    },

    cache: {
        path: './cache',
        extension: ".csv",
        entryDateFormat: (date) => date.format("YYYY-MM-DD HH:mm:ss"),
        filenameFormat: (date) => date.format("YYYYMMDD"),
    },

    logs: {
        path: './logs',
        filenameFormat: (date) => date.format("YYYYMMDD"),
    }
})