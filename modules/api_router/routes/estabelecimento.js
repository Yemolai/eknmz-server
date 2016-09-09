'use strict'

const db = require('../../database/db.js')
const express = require('express')
const estab = express.Router()

estab.get('/', function (req, res) {
  if ('lat' in req.query && 'lng' in req.query) {
    let limit = 100, variation = 0.01; // TODO variate from zoom, set limit from cfg
    db.model.Estabelecimento.findAll({
      where: {
        $and: [{
          'latitude': {
            $and: [ // (req.lat-variation) < latitude < (req.lat+variation)
              {$gte: req.query.lat - variation}, // latitude > req.lat-variation
              {$lte: req.query.lat + variation} // latitude < req.lat+variation
            ]
          }
        },{
          'longitude': {
            $and: [ // (req.lng-variation) < longitude < (req.lng+variation)
              {$gte: req.query.lng - variation},// longitude > req.lng-variation
              {$lte: req.query.lng + variation} // longitude < req.lng+variation
            ]
          }
        },
        {
          'ativo': true
        }]
      }
    }).then(function (estabelecimentos) {
      let list = [];
      for (var i in estabelecimentos) {
        list.push(estabelecimentos.dataValues)
      }
      res.json({
        error: false,
        data: list
      })
    })
  } else {
    res.json({
      error: true,
      message: 'No coords informed'
    })
  }
})

estab.post('/', function (req, res) {
  if ('body' in req) {
    // TODO model defines it
    let required = ['nome', 'razao', 'cnpj', 'endereco', 'latitude', 'longitude']
    let missing = []
    for (var i in required) {
      if (!(required[i] in req.body)) {
        missing.push(required[i])
      }
    }
    if (missing.length > 0) {
      res.json({
        error: true,
        message: "Data is missing in body: " + missing.join(','),
      })
    }
    let data = req.body;
    let createData = {
      'nome': data.nome,
      'razaoSocial': data.razao,
      'cnpj': data.cnpj,
      'endereco': data.endereco,
      'latitude': data.latitude,
      'longitude': data.longitude,
      'ativo': true
    }
    db.model.Estabelecimento.create(createData)
    .then(function (estabelecimento, created) {
      res.json({
        error: false,
        data: {
          id: estabelecimento.dataValues.id,
          created: created
        }
      })
    })
  } else {
    res.json({
      error: true,
      message: "No body was received"
    })
  }
})

module.exports = estab
