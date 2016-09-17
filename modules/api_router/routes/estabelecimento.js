'use strict'

const db = require('../../database/db.js')
const express = require('express')
const estab = express.Router()
const error = require('../error-handling.js')

/**
 *
 *
 *
 *
 */
estab.get('/id/:id', (req, res)=>{
  let id = req.params.id;
  if (isNaN(id)) {
    error.response(res, error.ID_NON_NUMERIC)
  }
  let exclude = ['id', 'ativo', 'createdAt', 'updatedAt']
  let attribs = db.model.Estabelecimento.rawAttributes
  let select = Object.keys(attribs).filter((v)=>exclude.indexOf(v)<0)

  db.model.Estabelecimento.findOne({
    where: {id: id},
    attributes: select
  })
  .then((estabelecimento)=>{
    if (estabelecimento === null) {
      return error.response(res, error.ID_NOT_FOUND)
    }
    res.json({
      error: false,
      data: estabelecimento.dataValues
    })
  })
  .catch((err)=>error.response(res, err, error.DATABASE_GET))
})

/**
 * Busca de estabelecimentos em uma área quadrada dada por latitude e longitude
 *
 * necessira de argumentos de query lat e lng (/?lat=0.0000&lng=0.0000)
*/
estab.get('/', (req, res)=>{
  if (!('lat' in req.query && 'lng' in req.query && 'var' in req.query)) {
    let Ps = ['lat', 'lng', 'var'],
        missing = []
    for (var i in Ps) if (!(Ps[i] in req.query)) missing.push(Ps[i])
    return error.response(res, error.PARAMETER_MISSING + missing.join(', '))
  }
  let lat = parseFloat(req.query.lat),
      lng = parseFloat(req.query.lng),
      vrn = parseFloat(req.query.var),
      wrong = []
      console.log("lat: ", lat, "\nlng: ", lng, "\nvrn: ", vrn)
  if (isNaN(lat)) { wrong.push('lat'); }
  if (isNaN(lng)) { wrong.push('lng'); }
  if (isNaN(vrn)) { wrong.push('var'); }

  if (wrong.length > 0) {
    return error.response(res, error.PARAMETER_WRONG + wrong.join(', '))
  }

  let limit = 100;
  vrn = parseFloat(vrn);
  // Definition of V (the variation of square area from center point provided)
  if ( vrn > 1 ) vrn = 1;
  if ( vrn < 0.00001) vrn = 0.00001;
  let minLat = lat-vrn, maxLat = lat+vrn, minLng = lng-vrn, maxLng = lng+vrn;
  let exclude = ['id', 'ativo', 'createdAt', 'updatedAt']
  let attribs = db.model.Estabelecimento.rawAttributes
  let select = Object.keys(attribs).filter((v)=>exclude.indexOf(v)<0)
  db.model.Estabelecimento.findAll({
    where: {
      $and: [
        { 'latitude':  { $and: [ { $gte: minLat }, { $lte: maxLat } ] } },
        { 'longitude': { $and: [ { $gte: minLng }, { $lte: maxLng } ] } },
        { 'ativo': true }
      ]
    },
    attributes: select
  }).then((estabelecimentos)=>{
    if (estabelecimentos == null) {
      error.response(res, error.DATABASE_GET)
    }
    let list = [];
    for (var i in estabelecimentos) {
      list.push(estabelecimentos[i].dataValues)
    }
    res.json({
      error: false,
      data: list
    })
  })
  .catch((e)=>error.response(res, e, error.DATABASE_GET))
})

/**
 * Rota de adição de registro de estabelecimetno através de POST
 * os dados devem ser recebidos em JSON no corpo da requisição
 */
estab.post('/', (req, res)=>{
  if ('body' in req) {
    let missing = []
    let attributes = db.model.Estabelecimento.rawAttributes
    let exclude = ['id', 'ativo', 'createdAt', 'updatedAt']
    for (var name in attributes) {
      if (('allowNull' in attributes[name] && !attributes[name].allowNull) ||
      'defaultValue' in attributes[name]) {
        if (!(name in req.body) && exclude.indexOf(name) < 0) {
          missing.push(name)
        }
      }
    }
    if (missing.length > 0) {
      return error.response(res, error.PARAMETER_MISSING + missing.join(', '))
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
    .then((estabelecimento, created)=>{
      res.json({
        error: false,
        data: {
          id: estabelecimento.dataValues.id,
          created: created
        }
      })
    })
    .catch((err)=>error.response(res, err, error.DATABASE_POST))
  } else {
    error.response(res, error.NO_BODY)
  }
})

/**
 *
 *
 *
 */
estab.put('/id/:id', function (req, res) {
  let id = parseInt(req.params.id)
  if (isNaN(id)) {
    return error.response(res, error.ID_NON_NUMERIC)
  }
  return
  db.model.Estabelecimento.findOne({ where: {id: id}})
  .then((estabelecimento)=>{
    if (estabelecimento == null) {
      return error.response(res, error.ID_NOT_FOUND)
    }
    let attribs = Object.keys(db.model.Estabelecimento.rawAttributes);
    let needUpdate = false;
    let wrongAttribs = [];
    let forbiddenAttribs = ["id", "createdAt", "updatedAt"]
    for (var i in attribs) {
      let attrib = attribs[i];
      if (attrib in req.body) {
        if (forbiddenAttribs.indexOf(attrib) > -1) {
          wrongAttribs.push(attrib);
        } else {
          estabelecimento.set(attrib, req.body[attrib])
          needUpdate = true
        }
      }
    }
    if (wrongAttribs.length > 0) {
      return error.response(res, error.PARAMETER_DENY + wrongAttribs.join(', '))
    }
    console.log("\n");
    if (!needUpdate) {
      return error.response(res, error.NO_BODY)
    }
    console.log("validando alterações\n");
    return estabelecimento.validate().then(function(err) {
      console.log("alterações validadas\n")
      if (typeof err != 'undefined') {
        console.log("Nenhum erro encontrado\nSalvando...");
        return estabelecimento.save().then(function (estab) {
          console.log("Atualização realizada");
          return res.json({
            error: false,
            data: {
              id: estab.id,
              updated: estab.updatedAt
            }
          })
        }).catch((err)=>error.response(res, err, error.DATABASE_POST))
      } else {
          return error.response(res, error.DATABASE_VALIDATION);
      }
    }).catch((err)=>error.response(res, err, error.DATABASE_VALIDATION))
  }).catch((err)=>error.response(res, err, error.DATABASE_GET))
})// end of estab put

/**
 *
 *
 *
 */
estab.delete('/id/:id', function (req, res) {
  let id = req.params.id;
  if (isNaN(id)) { return error.response(res, error.ID_NON_NUMERIC) }
  db.model.Estabelecimento.findOne({where: {id: id}})
  .then((estabelecimento)=>{
    if (estabelecimento == null) return error.response(res, error.ID_NOT_FOUND)
    estabelecimento.destroy().then(()=>{
      res.json({
        error: false,
        data: {
          destroyed: id,
          destroyedAt: new Date() + ''
        }
      })
    }).catch((err)=>error.response(res, err, error.DATABASE_DELETE))
  }).catch((err)=>error.response(res, err, error.DATABASE_DELETE))
}) // end of estab delete

module.exports = estab
