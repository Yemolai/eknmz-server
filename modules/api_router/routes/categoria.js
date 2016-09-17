'use strict'

const db = require('../../database/db.js')
const express = require('express')
const cat = express.Router()
const error = require('../error-handling.js')

cat.get('/', function (req, res) {
  db.model.Categoria.findAll({
    limit: 100,
    attributes: ['id', 'nome', 'descricao']
  })
    .then(function (categorias) {
      let list = []
      for (var i in categorias) list.push(categorias[i].dataValues)
      res.json({
        'error': false,
        'data': list
      })
    })
})

cat.get('/id/:id', function (req, res) {
  let Id = parseInt(req.params.id)
  if (isNaN(Id)) { return error.response(res, error.ID_NON_NUMERIC) }
  db.model.Categoria.findOne({
    'where': {
      'id': Id
    },
    'attributes': [
      'nome',
      'descricao'
    ]
  }).then(function (categoria) {
    if (categoria == null) { return error.response(res, error.ID_NOT_FOUND) }
    return res.json({ 'error': false, 'data': categoria })
  })
})

cat.post('/', function (req, res) {
  if ('body' in req) {
    // TODO the model define the required fields
    let required = ['nome', 'descricao']
    let missing = []
    for (var i in required) {
      if (!(required[i] in req.body)) {
        missing.push(required[i])
      }
    }
    if (missing.length > 0) {
      error.response(res, error.PARAMETER_MISSING + missing.join(', '))
    }
    let data = req.body;
    let createData = {
      'nome': data.nome,
      'descricao': data.descricao
    }
    db.model.Categoria.create(createData)
    .then(function (categoria, created) {
      res.json({
        error: false,
        data: {
          id: categoria.dataValues.id,
          created: created
        }
      })
    })
    .catch((e)=>error.response(res, e, error.DATABASE_POST))
  } else {
    return error.response(res, error.NO_BODY)
  }
})

/**
 *
 *
 *
*/
cat.put("/:id", (req, res)=>{
  res.json({
    error: false,
    data: {}
  })
})

/**
 *
 *
 *
*/
cat.delete("/:id", (req, res)=>{
  res.json({
    error: false,
    data: {}
  })
})

module.exports = cat
