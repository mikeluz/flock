'use strict'

const { STRING, DATE, ENUM, TEXT, FLOAT, BOOLEAN } = require('sequelize')

module.exports = db => db.define('calls', {
  call_name: STRING,
  call_start: DATE,
  call_end: DATE,
  call_type: ENUM('basic', 'manuscript', 'contest'),
  call_judge: STRING,
  call_detail: TEXT,
  open_or_closed: {
    type: ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  pages_or_poems: ENUM('pages', 'poems'),
  req_length: STRING,
  fee_amt: FLOAT,
  mail_only: {
  	type: BOOLEAN,
  	defaultValue: false
  },
  req_sase: {
  	type: BOOLEAN,
  	defaultValue: false
  },
  mailing_address: TEXT
})

module.exports.associations = (Call, {Pub}) => {
  Call.belongsTo(Pub)
}
