// internal
var Application = require('./application.js');
var debug = require('./utils.js').debug;

// socket.io
var sio = require('socket.io');

// express
var express = require('express');
var compression = require('compression');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');

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
	if (options.compress) {
		debug(this.debug, 'enabled compression');
		this.apps[0].use(compression());
	}

	// session
	debug(this.debug, 'enabled ' + options.mongoose.sessions);
	this.sessionStore = new MongoStore({
		mongooseConnection: mongoose.createConnection(options.mongoose.sessions)
	});

	this.session = expressSession({
		store: this.sessionStore,
		secret: options.sessions.secret || 'mirror image',
		resave: true,
		saveUninitialized: true
	});

	this.apps[0].use(this.session);
}

Experience.prototype.listen = function (port) {
	debug(this.debug, 'listening on ' + port);
	this.apps[0].listen(port);
};

Experience.prototype.add = function (path, app) {
	debug(this.debug, 'mounted as ' + path, app.name);

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
