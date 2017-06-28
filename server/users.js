'use strict'

const db = require('APP/db')
const User = db.model('users')
const Sub = db.model('subs')
const {setEmailAndPassword} = require('../db/models/user').setPassword;

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    isUserAdmin,
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .get('/:id/subs',
    mustBeLoggedIn,
    (req, res, next) =>
      Sub.findAll({
        where: {
          user_id: req.params.id
        },
        include: [ {all: true} ]
      })
      .then(subs => res.json(subs))
      .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => {
        setEmailAndPassword(user)
        res.status(201).json(user)
      })
      .catch(next))
  .put('/:id',
    isUserAdmin,
    (req, res, next) =>
      User.update(req.body, {
        where: {
          id: req.body.id
        },
        returning: true
      })
      .spread((numOfUpdatedUsers, updatedUsers) => {
        var updatedUser = updatedUsers[0];
        setEmailAndPassword(updatedUsers[0]);
        res.json(updatedUser);
      })
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .delete('/:id',
    isUserAdmin,
    (req, res, next) =>
      User.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(countOfDeletedRecords => res.json({}))
      .catch(next))
