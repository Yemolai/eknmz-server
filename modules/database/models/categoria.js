'use strict'
// Definição do modelo para a tabela de categorias de produtos
module.exports = (db, tipo) =>
  db.define('Categoria', {
    nome: tipo.STRING,
    descricao: tipo.TEXT
  })
