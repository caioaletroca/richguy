module.exports = {
    strigify(data) {
        return data.reduce(
            (sum, item) => sum + `${item.toString()}\n`,
            ''
        )
    },

    parse(type, data) {
        return data.split('\n').map(line => 
            (new type()).fromString(line)
        );
    }
}