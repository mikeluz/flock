'use strict'

const db = require('APP/db')
const Call = db.model('calls')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    isUserAdmin,
    (req, res, next) =>
      Call.findAll()
        .then(calls => res.json(calls))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Calls.create(req.body)
      .then(call => res.status(201).json(call))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Calls.findById(req.params.id)
      .then(call => res.json(call))
      .catch(next))
