'use strict'
let debug = require('../../.cfg.js').debug

let error = {
  ID_NON_NUMERIC: 'Non-numeric id provided',
  ID_NOT_FOUND: 'The item with the provided id was not found',
  UNKOWN_REASON: 'An unknown error ocurred',
  DATABASE_GET: 'An error ocurred while fetching data from record',
  DATABASE_POST: 'An error ocurred while creating record',
  DATABASE_PUT: 'An error ocurred while updating record',
  DATABASE_DELETE: 'An error ocurred while deleting record',
  DATABASE_VALIDATION: 'An validation error ocurred',
  PARAMETER_MISSING: 'These parameters are missing from request: ',
  PARAMETER_WRONG: 'These parameters are not the required types: ',
  PARAMETER_DENY: 'Those parameter aren\'t allowed: ',
  NO_BODY: 'Needed data wasn\'t received',
  response: (res, err, message) => {
    let responseObj = { "error": true };
    if (debug && typeof err != 'undefined') {
      responseObj.message = (typeof err == 'object') ?
        ((typeof message == 'undefined')? err.message : message ) : err;
      console.error("Erro: ", err);
    }
    return res.json(responseObj)
  }
}
module.exports = error;
