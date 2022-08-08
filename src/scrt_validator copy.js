module.exports = {
    isValidAddress: function (address) {
        if (/^(secret1)[0-9a-z]{38}$/.test(address)) {
            return true;
        }

        return false;
    },
};
