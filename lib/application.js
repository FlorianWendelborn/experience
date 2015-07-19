var express = require('express');
var io = require('socket.io');

function Application () {
    if (typeof arguments[0] === 'string') {
        var path = arguments[0];
        var config = require(path + '/experience.json');
    }

    this.name = config.name;
    this.scriptPath = path + '/' + config.script;
    this.script = require(this.scriptPath);

    // set the router, if required
    if (config.dependencies.indexOf('express') !== -1) {
        this.router = this.script.experience.router || express.Router();
    }

    // set the socket.io namespace, if required
    if (config.dependencies.indexOf('socket.io') !== -1) {
        
    }

    this.script.experience.init(this);
}

Application.getExpress = function () {
    return this.router;
}

module.exports = Application;
