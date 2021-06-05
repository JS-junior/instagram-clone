const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const model = mongoose.Schema({
	_id : ObjectId,
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	phone_number : { type: Number, required: true },
	photo: { type: String, required: true },
	status: { type: String, required: true },
	lastOnline: { type: String, required: true },
	followings: [{ type: ObjectId, ref: 'User' }],
	followers: [{ type: ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('User', model)

