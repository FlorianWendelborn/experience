var express = require('express');
var sio = require('socket.io');
var Application = require('./application.js');

// function enableWebUI (options) {
// 	if (debug) console.log('exp enable webui');
// 	var router = express.Router();
// 	router.get('/', function (req, res) {
// 		res.send('admin ui goes here');
// 	});
// 	mainApp.use(options.mountPoint, router);
// }

function Experience (options) {
	this.apps = [express()];
	if (options.debug) {
		this.debug = true;
	}
}

Experience.prototype.listen = function (port) {
	if (this.debug) {
		console.log('experience: listening on ' + port);
	}
	this.apps[0].listen(port);
};

Experience.prototype.add = function (path, app) {
	if (this.debug) {
		console.log('exp mount ' + app.name + ' as ' + path + ' (' + app.scriptPath + ')');
	}

	if (app.router) {
		this.apps[0].use(path, app.router);
	}
};

module.exports = {
	create: function (options) {
		return new Experience(options);
	},
	Application: Application
};
