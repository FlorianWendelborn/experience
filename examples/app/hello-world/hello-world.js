var experience = require('../../../');
var express = require('express');
var app = express.Router();

app.use('/', function (req, res) {
    res.send('hello world');
})

module.exports = {
    experience: {
        router: app,
        init: function () {

        }
    }
}
