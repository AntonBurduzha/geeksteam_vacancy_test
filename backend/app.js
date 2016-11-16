var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

let loginControl = require('./controllers/login.controller');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/login', loginControl);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

module.exports = app;