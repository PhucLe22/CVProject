module.exports = {
    sum: (a, b) => a + b,

    ifEquals: (a, b, options) => {
        return a === b ? options.fn(this) : options.inverse(this);
    },
};
