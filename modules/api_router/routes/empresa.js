'use strict'
const Model = require('../../database/db.js').model
const Empresa = Model.Empresa
const express = require('express')
const empresa = express.Router()
const error = require('../error-handling.js')

/**
 *
 *
 *
*/
empresa.get("/:id", (req, res)=>{
  // retorna detalhes da empresa
})

/**
 *
 *
 *
*/
empresa.get("/:marca", (req, res)=>{
  // empresa dona de uma marca
})

/**
 *
 *
 *
*/
empresa.get("/:produto", (req, res)=>{
  // empresas que produzem este produto
})

/**
 *
 *
 *
*/
empresa.post("/", (req, res)=>{
  // nova empresa
})

/**
 *
 *
 *
*/
empresa.put("/:id", (req, res)=>{
  // alterar empresa
})

/**
 *
 *
 *
*/
empresa.delete("/:id", (req, res)=>{
  // remover empresa
})

module.exports = empresa
