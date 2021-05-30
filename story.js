const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const model = mongoose.Schema({
	_id: ObjectId,
	url: { type: String, required: true },
	postedBy: { type: ObjectId, ref: 'User' },
	postedOn: { type: Date, expires: '1440m' },
	type: { type: String, required: true },
	profileImage: { type: String, required: true },
	heading: { type: String, required: true }
})

module.exports = mongoose.model('Story', model)
