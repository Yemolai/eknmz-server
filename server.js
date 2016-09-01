'use strict'
const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')
const cfg = require('./.cfg.js')

const DEFAULT_PORT = 8080
const UNDEF = 'undefined'

var spa = express();
var api = express();

spa.use(express.static(__dirname + "/public"));

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.get('/', function (req, res) {
  res.json({
    message: "Express Rest Server is Working!",
    state: "YEAH! :D"
  })
})

var db = new Sequelize(cfg.db.database, cfg.db.username, cfg.db.password, {
  host: cfg.db.host,
  dialect: cfg.db.dialect
});

var serverPort;
// verificação e definição de porta de servidor
if (typeof process.ENV != UNDEF && typeof process.ENV.port != UNDEF) {
  serverPort = process.ENV.port;
} else if (typeof cfg != UNDEF &&
            typeof cfg.server != UNDEF &&
              typeof cfg.server.port != UNDEF) {
  serverPort = cfg.server.port;
} else {
  serverPort = DEFAULT_PORT;
}

// Aplicação de página única WEB na porta 80
var app = spa.listen(80, function () {
  console.log("Aplicação rodando na porta 80");
})

// Servidor REST via API rodando na porta serverPort
var server = api.listen(serverPort, function () {
  console.log("Servidor rodando na porta " + serverPort);
});
