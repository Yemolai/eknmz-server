'use strict'
const Model = require('../../database/db.js').model
const Valor = Model.Valor
const Estabelecimento = Model.Estabelecimento
const Produto = Model.Produto
const Marca = Model.Marca
const express = require('express')
const produto = express.Router()
const error = require('../error-handling.js')

/**
 *
 *
 *
 */
produto.get('/', (req, res)=>{
  // recebe par de coordenadas por query
  // retorna valores dos produtos nos estabelecimentos próximos
})

/**
 *
 *
 *
 */
produto.get('/id/:id', (req, res)=>{
  //recebe id
  //retorna detalhes de produto
})

/**
 *
 *
 *
 */
produto.get('/:estabelecimento', (req, res)=>{
  // recebe estabelecimento
  // retorna este produto de várias marcas com seus valores
})

/**
 *
 *
 *
 */
produto.get('/:marca', (req, res)=>{
  // recebe marca e par de coordenadas
  // retorna valor médio para este produto nos estabelecimentos próximos
})

/**
 *
 *
 *
 */
produto.post('/', (req, res)=>{
  // recebe dados do produto e registra no banco
  // retorna id e createdAt
})

/**
 *
 *
 *
 */
produto.put('/:id', (req, res)=>{
  // recebe id de produto e corpo com dados a substituir
  // retorna id e updatedAt
})

/**
 *
 *
 *
 */
produto.delete('/:id', (req, res)=>{
  // recebe id e destrói registro de produto
  // retorna id e destroyedAt
})

module.exports = produto
