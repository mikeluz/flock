'use strict'

const db = require('APP/db')
const Pub = db.model('pubs')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) =>
      Pub.findAll()
        .then(pubs => res.json(pubs))
        .catch(next))
  .post('/',
    isUserAdmin,
    (req, res, next) =>
      Pub.create(req.body)
      .then(pub => res.status(201).json(pub))
      .catch(next))
  .put('/:id',
    isUserAdmin,
    (req, res, next) =>
      Pub.update(req.body, {
          where: {
            id: req.params.id
          },
          returning: true
        })
      .spread((numOfUpdatedPubs, updatedPubs) => res.json(updatedPubs[0]))
      .catch(next))
  .get('/search',
    mustBeLoggedIn,
    (req, res, next) =>
      Pub.findByName(req.query.search)
      .then(results => res.json(results))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Pub.findById(req.params.id)
      .then(pub => res.json(pub))
      .catch(next))
  .delete('/:id',
    isUserAdmin,
    (req, res, next) =>
      Pub.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(countOfDeletedRecords => res.json({}))
      .catch(next))

  
