const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')
const connection = knex(config);

/*
this is just a breakdown of:
const connection = knex(require('../knexfile.js')[process.env.NODE_ENV || 'development'])
*/
module.exports = connection
