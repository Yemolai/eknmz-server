'use strict'
const Model = require('../../database/db.js').model
const Valor = Model.Valor
const Estabelecimento = Model.Estabelecimento
const Produto = Model.Produto
const Marca = Model.Marca
const express = require('express')
const valor = express.Router()
const error = require('../error-handling.js')

/**
 *
 *
 *
 */
valor.get('/', (req, res)=>{
  // recebe lista de produtos e par de coordenadas
  // retorna lista de valor de cada produto nos estabelecimentos próximos
})

/**
 *
 *
 *
 */
valor.get('/:estabelecimento/:produto', (req, res)=>{
  //  retorna os últimos valores deste produto neste estabelecimento (qualquer marca)
 })

 /**
  *
  *
  *
  */
valor.get('/:marca/:produto', (req, res)=>{
  // retorna os preços deste produto desta marca na região
})

/**
 *
 *
 *
 */
valor.get('/:marca/:produto/:n', (req, res)=>{
  // recebe par de coordenadas
 // retorna os n últimos valores deste produto desta marca na região
})

/**
 *
 *
 *
 */
valor.get('/:estabelecimento/:marca/:produto', (req, res)=>{
  // retorna o valor deste produto específico neste estabelecimento
})

/**
 *
 *
 *
 */
valor.get('/:estabelecimento/:marca/:produto/:n', (req, res)=>{
  // retorna os n últimos valores deste produto específico neste estabelecimento
})

/**
 *
 *
 *
 */
 valor.post('/:estabelecimento/:marca/:produto', (req, post)=>{
   // recebe dados de novo valor para o produto especificado
 })

 /**
  *
  *
  *
  */
valor.put('/:id', (req, res)=>{
  // altera registro do valor
})

/**
 *
 *
 *
 */
valor.delete('/:id', (req, res)=>{
  // apaga registro do valor
  // TODO alterar modelos para modo paranóico
})

module.exports = valor
