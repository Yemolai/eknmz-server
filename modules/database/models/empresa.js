'use strict'
// Definição do modelo para tabela de empresas donas de marcas
module.exports = (db, tipo) =>
  db.define('Empresa', {
    fantasia: {
      type: tipo.STRING,
      allowNull: true,
      validate: {
        is: /[0-9a-zà-úA-ZÀ-Ú\s\-\/\:\.\,]+/i,
      },
    },
    razaoSocial: {
      type: tipo.STRING,
      allowNull: false,
      validate: {
        is: /[0-9a-zà-úA-ZÀ-Ú\s\-\/\:\.\,]+/i,
        notEmpty: true,
      },
    },
    cnpj: {
      type: tipo.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },
    endereco: {
      type: tipo.STRING,
    },
    telefone: {
      type: tipo.STRING,
      validate: {
        isNumeric: true,
        len: [8, 13],
      },
    },
  })
