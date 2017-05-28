'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('poems', {
  name: STRING,
})

module.exports.associations = (Poem, {User, Sub}) => {
  Poem.belongsTo(User)
  Poem.belongsToMany(Sub, {through: 'sub_detail'})
}
