'use strict'

const db = require('APP/db')
const Sub = db.model('subs')

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    isUserAdmin,
    (req, res, next) =>
      Sub.findAll({
        include: [ {all: true} ]
      })
        .then(subs => res.json(subs))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Sub.create(req.body)
      .then(sub => res.status(201).json(sub))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Sub.findById(req.params.id)
      .then(sub => res.json(sub))
      .catch(next))
