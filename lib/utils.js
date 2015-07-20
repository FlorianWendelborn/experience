module.exports = {
    debug: function debug (show, message, appName) {
        if (show) {
            if (appName) {
                console.log('experience: ' + appName + ' ' + message);
            } else {
                console.log('experience: ' + message);
            }
        }
    }
};
