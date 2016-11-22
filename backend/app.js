const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const loginControl = require('./controllers/login.controller');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/login', loginControl);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

module.exports = app;