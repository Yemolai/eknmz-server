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

router.use('/estabelecimento', require(ROUTES + '/estabelecimento'))
router.use('/categoria', require(ROUTES + '/categoria'))

module.exports = router
