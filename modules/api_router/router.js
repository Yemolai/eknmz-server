var express = require('express');
var router = express.Router();

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

router.use('/estabelecimento', require('./routes/estabelecimento'))

module.exports = router
