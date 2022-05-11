function Operation ({
    start = undefined,
    end = undefined
} = {}) {
    this.start = start;
    this.end = end
    return this;
}

Operation.prototype.toString = function () {
    return `${this.start.toString()},${this.end.toString()}`;
}

module.exports = Operation;