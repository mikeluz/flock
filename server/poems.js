'use strict'

const db = require('APP/db')
const Poem = db.model('poems')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    isUserAdmin,
    (req, res, next) =>
      Poem.findAll()
        .then(poems => res.json(poems))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Poem.create(req.body)
      .then(poem => res.status(201).json(poem))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Poem.findById(req.params.id)
      .then(poem => res.json(poem))
      .catch(next))