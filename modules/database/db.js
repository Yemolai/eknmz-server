'use strict'
const ROOT_DIR = "../..",
      MODULE_DIR = "modules/database",
      MODEL_DIR = __dirname + '/models'

let _ = require('lodash')

let Sequelize = require('sequelize')

let cfg = require(ROOT_DIR + '/.cfg.js')

let dbO = {
  host: cfg.db.host,
  dialect: cfg.db.dialect
}

if (cfg.db.dialect == 'postgres') { dbO.timezone = cfg.db.timezone }

let db = {
  'orm': Sequelize,
  'conn': new Sequelize(cfg.db.database, cfg.db.username, cfg.db.password, dbO),
  'model': {}
}

let models = [
  "categoria",
  "empresa",
  "estabelecimento",
  "marca",
  "produto",
  "valor"
]

let belongsTo = [
  {source: "valor", target: "produto", options: { as:  'Produto' } },
  {source: "valor", target: "estabelecimento", options: { as: 'Loja' } },
  {source: "marca", target: "empresa", options: {as: 'Empresa'} },
  {source: "produto", target: "marca", options: { as: 'Marca' } },
  {source: "produto", target: "categoria", options: { as: 'Categoria' } }
]

console.log('Importando modelos:\n');

// Automated models import process
_(models).forEach(function (model) {
  let name = _.capitalize(_.camelCase(model)),
      path = MODEL_DIR + '/' + model + '.js'
  console.log('\t* ' + name + '\n');
  db.model[name] = db.conn.import(MODEL_DIR + '/'+ model + '.js')
})

// Automated models relation process (only belongsTo)
_(belongsTo).forEach(function (relation) {
  let source = _.capitalize(_.camelCase(relation.source)),
      target = _.capitalize(_.camelCase(relation.source))
  db.model[source].belongsTo(db.model[target], relation.options)
})

db.conn.sync();

module.exports = db;
