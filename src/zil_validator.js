module.exports = {
    isValidAddress: function (address) {
        if (/^zil1[0-9A-Za-z]{38}$/.test(address)) {
            return true;
        }

        return false;
    },
};
