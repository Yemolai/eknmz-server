'use strict'
// Definição do modelo para tabela de produtos
module.exports = (db, tipo) =>
  db.define('Produto', {
    codebar: {
      type: tipo.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    nome: {
      type: tipo.STRING,
      allowNull: false,
      validate: {
        is: /[0-9a-zà-úA-ZÀ-Ú\s\-\/\:\.\,]+/i,
      },
    },
    quantidade: {
      type: tipo.FLOAT,
      allowNull: false,
      defaultValue: 1,
    },
    conteudo: {
      type: tipo.STRING,
      allowNull: false,
      defaultValue: 'un',
      validate: {
        isAlpha: true,
        notEmpty: true,
        len: [1, 3],
      },
    },
    ativo: {
      type: tipo.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pesado: {
      type: tipo.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
