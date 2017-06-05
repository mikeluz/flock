'use strict'

const db = require('APP/db')
const Call = db.model('calls')
const Pub = db.model('pubs')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    isUserAdmin,
    (req, res, next) =>
      Call.findAll({
        include: [Pub]
      })
        .then(calls => res.json(calls))
        .catch(next))
  .post('/',
    isUserAdmin,
    (req, res, next) =>
      Call.create(req.body)
      .then(call => res.status(201).json(call))
      .catch(next))
  .put('/:id',
    isUserAdmin,
    (req, res, next) =>
      Call.update(req.body, {
          where: {
            id: req.params.id
          },
          returning: true
        })
      .spread((numOfUpdatedCalls, updatedCalls) => res.json(updatedCalls[0]))
      .catch(next))
  .get('/search',
    mustBeLoggedIn,
    (req, res, next) =>
      Call.findByName(req.query.search)
      .then(results => res.json(results))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Call.findOne({
        where: {
          id: req.params.id
        },
        include: [Pub]
      })
      .then(call => res.json(call))
      .catch(next))
  .delete('/:id',
    isUserAdmin,
    (req, res, next) =>
      Call.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(countOfDeletedRecords => res.json({}))
      .catch(next))
