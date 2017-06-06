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
  .get('/current',
    isUserAdmin,
    (req, res, next) =>
      Sub.findAll({
        include: [ {all: true} ]
      })
        .then(subs => res.json(subs))
        .catch(next))
  .post('/new/user', 
    (req, res, next) => {
      req.session.submission.user = req.body
      req.session.submission.poems = []
      console.log("session", req.session);
      res.send()
  })
  .post('/current/clear', 
    (req, res, next) => {
      req.session.submission = {}
      res.send();
  })
  .post('/',
    (req, res, next) =>
      Sub.create({
        sub_date: req.body.sub_date,
        sub_status: req.body.sub_status,
        sub_notes: req.body.sub_notes,
        user_id: req.body.user_id
      })
      .then(sub => {
        req.session.submission.id = sub.dataValues.id
        res.status(201).json(sub)
      })
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Sub.findById(req.params.id)
      .then(sub => res.json(sub))
      .catch(next))
  .put('/',
    isUserAdmin,
    (req, res, next) => {
      Sub.update({
        call_id: req.body.call_id
      }, {
          where: {
            id: req.session.submission.id
          },
          returning: true
        })
      .spread((numOfUpdatedSubs, updatedSubs) => {
        req.session.submission.id = 0
        res.json(updatedSubs[0])
      })
      .catch(next)})
