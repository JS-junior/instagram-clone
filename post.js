const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const model = mongoose.Schema({
	_id: ObjectId,
	photo: { type: String, required: true },
	caption: { type: String, required: true },
	postedOn: { type: String, required: true },
	postedBy: { type: ObjectId, ref: 'User' },
	tags: [{ type: ObjectId, ref: 'User'}],
	likes: [{ type: ObjectId, ref: 'User' }],
	comments: [{ _id: ObjectId, text: String, postedBy: { type: ObjectId, ref: 'User' } }]
})

module.exports = mongoose.model('Post', model)
