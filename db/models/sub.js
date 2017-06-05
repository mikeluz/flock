'use strict'

const { STRING, DATE, ENUM, TEXT } = require('sequelize')

module.exports = db => db.define('subs', {
  sub_date: DATE,
  sub_status: ENUM('in process', 'accepted', 'rejected', 'withdrawn'),
  sub_notes: TEXT
}, {
	// need hook to get length of time since submission
})

module.exports.associations = (Sub, {User, Poem, Call, Pub}) => {
  Sub.belongsToMany(Poem, {through: 'sub_detail'})
  Sub.belongsTo(Call)
  Sub.belongsTo(Pub)
  Sub.belongsTo(User)
}
