module.exports = {
    isValidAddress: function (address) {
        if (/^0[.]0[.]\d{1,6}$/.test(address)) {
            return true;
        }

        return false;
    },
};
