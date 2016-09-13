'use strict'

const db = require('../../database/db.js')
const express = require('express')
const estab = express.Router()
const error = require('../error-handling.js')

/**
 * Busca de estabelecimentos em uma área quadrada dada por latitude e longitude
 *
 * necessira de argumentos de query lat e lng (/?lat=0.0000&lng=0.0000)
*/
estab.get('/', function (req, res) {
  if ('lat' in req.query && 'lng' in req.query && 'var' in req.query) {
    let lat = parseFloat(req.query.lat),
        lng = parseFloat(req.query.lng),
        vrn = parseFloat(req.query.var)
        wrong = []

    if (isNaN(lat)) wrong.push('latitude')
    if (isNaN(lng)) wrong.push('longitude')
    if (isNaN(vrn)) wrong.push('variation')

    let limit = 100, V = 0.01; // TODO variate from zoom, set limit from cfg
    // Definition of V (the variation of square area from center point provided)
    if ('perimeter' in req.query) {
      let peri = parseFloat(req.query.area)
      if (!isNaN(peri)) {
        if (peri > 4)
          V = 1
        else if (peri > 0.00004)
          V = 0.00001
        else
          V = peri/4
      } else {

      }
    } else if ('variation' in req.query) {
      let vari = parseFloat(req.query.variation)
      if (!isNaN(vari) && (vari <= 1 && vari > 0.000009)) V = vari
    }
    db.model.Estabelecimento.findAll({
      where: {
        $and: [
          { 'latitude':  { $and: [ { $gte: lat - V }, { $lte: lat + V } ] } },
          { 'longitude': { $and: [ { $gte: lng - V }, { $lte: lng + V } ] } },
          { 'ativo': true }
        ]
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

/**
 * Rota de adição de registro de estabelecimetno através de POST
 * os dados devem ser recebidos em JSON no corpo da requisição
 */
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
    if (missing.length > 0)
      res.json({error: true, message: "Missing fields: " + missing.join(', '),})
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
    }).catch(function (err) {
      console.log("Erro ao adicionar estabelecimento: ", err),
      res.json({
        error: true,
        message: 'Error while creating data: ' + err.message
      })
    })
  } else {
    res.json({
      error: true,
      message: "No data received"
    })
  }
})

estab.get('/id/{id}', function (req, res) {
  let Id = parseInt(req.params.id)
  if (isNaN(Id)) {
    res.json(NON_NUMERIC_ID_ERROR)
  } else {
    db.model.Estabelecimento.findOne({
      where: { id: Id },
      attributes: ['nome', 'razao', 'cnpj', 'endereco', 'latitude', 'longitude']
    }).then(function (estabelecimento) {
      if (estabelecimento == null)
        res.json({
          error: true,
          message: '"Estabelecimento" with id ' + Id + ' not found'
        })
      else
        res.json({
          error: false,
          data: estabelecimento.dataValues
        })
    }).catch(function (err) {
      console.log("Problema ao buscar Estabelecimento com id " + Id + ": ", err)
      res.json({
        error: true,
        message: 'Error while trying to fetch data: ' + err.message
      })
    })
  }
})

estab.put('/id/{id}', function (req, res) {
  let id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.json({
      error: true,
      message: ERROR_NON_NUMERIC_ID
    })
  }
  db.model.Estabelecimento.findOne({ where: {id: }})

})

module.exports = estab
