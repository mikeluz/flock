'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/print', require('./print'))
  .use('/users', require('./users'))
  .use('/pubs', require('./pubs'))
  .use('/subs', require('./subs'))
  .use('/poems', require('./poems'))
  .use('/calls', require('./calls'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
