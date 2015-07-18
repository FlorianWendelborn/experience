var express = require('express');
var sio = require('socket.io');

var debug = false;

var mainApp = express();

var subApps = [];

function addApplication (options) {
	if (debug) console.log('exp mount ' + options.name + ' as ' + options.mountPoint + ' (' + options.script + ')');
	var router = express.Router();
	subApps.push(router);
	var script = require(options.script);
	script.init(router);
	mainApp.use(options.mountPoint, router);
}

function enableWebUI (options) {
	if (debug) console.log('exp enable webui');
	var router = express.Router();
	router.get('/', function (req, res) {
		res.send('admin ui goes here');
	});
	mainApp.use(options.mountPoint, router);
}

function listen (port) {
	if (debug) console.log('exp listen ' + port);
	mainApp.listen(port);
}

module.exports = {
	enableWebUI: enableWebUI,
	addApplication: addApplication,
	listen: listen,
	debug: function (value) {
		debug = value;
	}
};
