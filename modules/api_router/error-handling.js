'use strict'
let error = {
  ID_NON_NUMERIC: 'Non-numeric id provided',
  ID_NOT_FOUND: 'The item with the provided id was not found',
  UNKOWN_REASON: 'An unknown error ocurred',
  DATABASE_GET: 'An error ocurred while fetching data from record',
  DATABASE_POST: 'An error ocurred while creating record',
  DATABASE_PUT: 'An error ocurred while updating record',
  DATABASE_DELETE: 'An error ocurred while deleting record',
  PARAMETER_MISSING: 'These parameters are missing from request',
  PARAMETER_WRONG: 'These parameters are not the required types',
  response: (res, message) => { res.json({ 'error': true, 'message': message }) }
}
