module.exports = {
    linear(x0, xf, y0, yf, x) {
        return y0 + (yf - y0) * (x - x0) / (xf - x0);
    },

    exponential(x0, xf, y0, yf, smooth, x) {
        // return y0 + (yf - y0) * (Math.pow(x, smooth) - Math.pow(x0, smooth)) / (Math.pow(xf, smooth) - Math.pow(x0, smooth));
        return y0 + yf * Math.exp(smooth * (x - xf));
    },

    polinomial(x0, xf, smooth, x) {
        return Math.pow(x - x0, smooth) / Math.pow(xf - x0, smooth);
    }
}