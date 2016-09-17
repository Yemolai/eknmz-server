'use strict'
const Model = require('../../database/db.js').model
const Valor = Model.Valor
const Estabelecimento = Model.Estabelecimento
const Produto = Model.Produto
const Marca = Model.Marca
const express = require('express')
const marca = express.Router()
const error = require('../error-handling.js')

/**
 *
 *
 *
 *
*/
marca.get('/:produto', (req, res)=>{
  // recebe produto e par de coordenadas
  // retorna lista de marcas que vendem este produto nos arredores
})

/**
 *
 *
 *
 *
*/
marca.get('/:estabelecimento/:produto', (req, res)=>{
  // recebe estabelecimento e produto
  // retorna marcas que vendem este produto neste estabelecimento
})

/**
 *
 *
 *
 *
*/
marca.get('/:estabelecimento', (req, res)=>{
  // recebe estabelecimento
  // retorna produtos vendidos por esta marca neste estabelecimento
})

/**
 *
 *
 *
 *
*/
marca.get('/:id', (req, res)=>{
  // retorna detalhes da marca
})

/**
 *
 *
 *
 *
*/
marca.post('/', (req, res)=>{
  // registra nova marca
})

/**
 *
 *
 *
 *
*/
marca.put('/:id', (req, res)=>{
  // altera uma marca
})

/**
 *
 *
 *
 *
*/
marca.delete('/:id', (req, res)=>{
  // apaga uma marca
})

module.exports = marca
