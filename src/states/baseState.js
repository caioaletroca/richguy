function BaseState() {
    return this;
}

BaseState.prototype.setState = function () {
    throw new Error("BaseState: setState method not implemented");
}

BaseState.prototype.start = async function () {

}

BaseState.prototype.loop = async function () {
    
}

module.exports = BaseState;