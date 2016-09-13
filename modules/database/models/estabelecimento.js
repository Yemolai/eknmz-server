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
      allowNull: true, // CAN BE NULL
      unique: true,
    },
    cnpj: {
      type: tipo.STRING,
      allowNull: true, // CAN BE NULL
      unique: true,
      validate: {
        isNumeric: true,
        len: [14, 14],
      },
    },
    endereco: {
      type: tipo.STRING,
      allowNull: true, // CAN BE NULL
    },
    latitude: {
      type: tipo.DOUBLE,
      allowNull: false,
      unique: 'positionIDX'
    },
    longitude: {
      type: tipo.DOUBLE,
      allowNull: false,
      unique: 'positionIDX'
    },
    ativo: {
      type: tipo.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  })
