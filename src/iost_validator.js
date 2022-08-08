module.exports = {
    isValidAddress: function (address) {
        if (/^[A-Za-z0-9_]{5,11}$/.test(address)) {
            return true;
        }

        return false;
    },
};
