module.exports = {
    isValidAddress: function (address) {
        if (/^[a-z0-9_-]{1}[a-z0-9_.-]{0,62}[a-z0-9_-]{1}$/.test(address)) {
            return true;
        }

        return false;
    },
};
