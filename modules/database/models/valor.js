'use strict'
// Definição do modelo para a tabela de valores de produtos
module.exports = (db, tipo) =>
  db.define('Valor', {
    timestamp: {
      type: tipo.DATE,
      defaultValue: tipo.NOW,
      allowNull: false
    },
    valor: {
      type: tipo.FLOAT,
      allowNull: false
    }
  })
