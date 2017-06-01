'use strict'

const { STRING, ENUM } = require('sequelize')

module.exports = db => db.define('pubs', {
  pub_name: STRING,
  editor_name: STRING,
  editor_email: {
  	type: STRING,
  	isEmail: true
  },
  web_address: {
  	type: STRING,
  	isUrl: true
  },
  submittable_link: {
  	type: STRING,
  	isUrl: true
  },
  pub_format: ENUM('online', 'print', 'both'),
  pub_type: ENUM('lit mag', 'press', 'org')
})

module.exports.associations = (Pub, {Call}) => {
  Pub.hasMany(Call)
}
