'use strict'
// Definição de modelo para tabela de marca de produtos
module.exports = (db, tipo) =>
  db.define('Marca', {
    nome: {
      type: tipo.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /[0-9a-zà-úA-ZÀ-Ú\s\-\/\:\.\,]+/i
      }
    }
  })
