'use strict'
// Definição de modelo para tabela de estabelecimento de venda de produtos
module.exports = (db, tipo) =>
  db.define('Estabelecimento', {
    nome: {
      type: tipo.STRING,
      allowNull: false,
    },
    razaoSocial: {
      type: tipo.STRING,
      allowNull: false,
    },
    cnpj: {
      type: tipo.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [14, 14],
      },
    },
    endereco: {
      type: tipo.STRING,
      allowNull: false,
    },
    latitude: {
      type: tipo.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: tipo.FLOAT,
      allowNull: false,
    },
    ativo: {
      type: tipo.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  })
