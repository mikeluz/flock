'use strict'

const db = require('APP/db')
const Poem = db.model('poems')
const User = db.model('users')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    isUserAdmin,
    (req, res, next) =>
      Poem.findAll({
        include: [User]
      })
        .then(poems => res.json(poems))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Poem.create(req.body)
      .then(poem => res.status(201).json(poem))
      .catch(next))
  .get('/search',
    mustBeLoggedIn,
    (req, res, next) =>
      Poem.findAll({
        where: {
          name: {
            $iLike: `%${req.query.search}%`
          }
        },
        include: [User]
      })
      .then(results => {
        res.json(results)
      })
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Poem.findById(req.params.id)
      .then(poem => res.json(poem))
      .catch(next))
  .put('/:id',
    isUserAdmin,
    (req, res, next) =>
      Poem.update(req.body, {
          where: {
            id: req.params.id
          },
          returning: true
        })
      .spread((numOfUpdatedPoems, updatedPoems) => res.json(updatedPoems[0]))
      .catch(next))
  .delete('/:id',
    isUserAdmin,
    (req, res, next) =>
      Poem.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(countOfDeletedRecords => res.json({}))
      .catch(next))
