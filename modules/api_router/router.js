'use strict'
const express = require('express')
const router = express.Router()
const ROUTES = './routes'

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function (req, res) {
  res.json({
    message: "Express Rest Server is Working!",
    state: "YEAH! :D"
  })
})

let routers = [
  'categoria',
  'empresa',
  'estabelecimento',
  'marca',
  'produto',
  'valor'
]
for (var i = 0; i < routers.length; i++) {
  router.use(('/' + routers[i]), require((ROUTES + '/' + routers[i])))
}

module.exports = router
