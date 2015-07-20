var experience = require('../../../');
var express = require('express');
var app = express.Router();

app.get('/', function (req, res) {
    res.send('hello ' + req.session.id);
});

app.use(express.static(__dirname));

module.exports = {
    experience: {
        router: app,
        init: function () {

        }
    }
}
