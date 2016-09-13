'use strict'
// Definição do modelo para a tabela de categorias de produtos
module.exports = (db, tipo) =>
  db.define('Categoria', {
    nome: {
      type: tipo.STRING,
      unique: true,
      allowNull: false,
    },
    descricao: {
      type: tipo.TEXT,
      allowNull: true,
    }
  })
