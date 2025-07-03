module.exports = {
    sum: (a, b) => a + b,

    ifEquals: (a, b, options) => {
        return a === b ? options.fn(this) : options.inverse(this);
    },

    ifCond: function (v1, operator, v2, options) {
        switch (operator) {
            case '===':
                return v1 === v2 ? options.fn(this) : options.inverse(this);
            // có thể bổ sung các operator khác nếu cần
        }
    },
};
