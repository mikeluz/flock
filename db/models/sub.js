'use strict'

const { STRING, DATE, ENUM, TEXT } = require('sequelize')

module.exports = db => db.define('subs', {
  sub_date: DATE,
  sub_status: ENUM('in process', 'accepted', 'rejected', 'withdrawn'),
  sub_notes: TEXT
}, {
	// need hook to get length of time since submission
	// need hook to set pub_name
	instanceMethods: {
		setPubName: (pubName) => {
			this.pub_name = pubName;
		}
	}
},{
  hooks: {
    beforeCreate: (sub) => {
      sub.pub_name = 'TEST';
    },
  }
})

module.exports.associations = (Sub, {User, Poem, Call, Pub}) => {
  Sub.belongsToMany(Poem, {through: 'sub_detail'})
  Sub.belongsTo(Call)
  Sub.belongsTo(User)
  Sub.belongsTo(Pub)
}
