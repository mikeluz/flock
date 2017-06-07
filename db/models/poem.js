'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('poems', {
  name: STRING,
}, {
  classMethods: {
    findByName: function (name) {
      return this.findAll({
        where: {
          name: {
            $iLike: `%${name}%`
          }
        }
      });
    }
  }
})

module.exports.associations = (Poem, {User, Sub}) => {
  Poem.belongsTo(User)
  Poem.belongsToMany(Sub, {through: 'sub_detail'})
}
