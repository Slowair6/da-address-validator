module.exports = {
    isValidAddress: function (address) {
        if (/^[A-Z][0-9a-z-A-Z]{44,50}$/.test(address)) {
            return true;
        }

        return false;
    },
};
