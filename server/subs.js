'use strict'

const db = require('APP/db')
const Sub = db.model('subs')
const Call = db.model('calls')
const SubDetail = db.model('sub_detail')

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
  .get('/current/clear', 
    (req, res, next) => {
      req.session.submission = {}
      res.send();
  })
  .get('/current/:id',
    isUserAdmin,
    (req, res, next) => {
      req.session.submission.id = req.params.id
      Sub.findOne({
        where: {
          id: req.params.id
        },
        include: [ {all: true} ]
      })
        .then(subs => res.json(subs))
        .catch(next)})
  .post('/current/poems',
    isUserAdmin,
    (req, res, next) => {
      req.session.submission.poems.push(req.body)
      SubDetail.create({
        poem_id: req.body.id,
        sub_id: req.session.submission.id 
      })
      .then(subDetails => res.json(subDetails))
      .catch(next)})
  .post('/new/user', 
    (req, res, next) => {
      req.session.submission.user = req.body
      req.session.submission.poems = []
      console.log("session", req.session);
      res.send()
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
  .put('/:id',
    isUserAdmin,
    (req, res, next) => {
      Sub.update({
        sub_date: req.body.sub_date,
        sub_status: req.body.sub_status,
        sub_notes: req.body.sub_notes
      }, {
          where: {
            id: req.body.id
          },
          returning: true
        })
      .spread((numOfUpdatedSubs, updatedSubs) => {
        req.session.submission.id = 0
        res.json(updatedSubs[0])
      })
      .catch(next)})

  // this PUT route is for adding the current sub (stored in the session) to the chosen call AND pub
  .put('/',
    isUserAdmin,
    (req, res, next) => {
      Call.findById(req.body.call_id)
        .then(call => {
          Sub.update({
            call_id: req.body.call_id,
            pub_id: call.dataValues.pub_id
          }, {
            where: {
              id: req.session.submission.id
            },
            returning: true
          })
        .spread((numOfUpdatedSubs, updatedSubs) => {
          // req.session.submission.id = 0
          res.json(updatedSubs[0])
        })
        .catch(next)})
      })
  .delete('/:id',
    isUserAdmin,
    (req, res, next) =>
      Sub.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(countOfDeletedRecords => res.json({}))
      .catch(next))
