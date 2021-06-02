const mongoose = require('mongoose')

const model = mongoose.Schema({
	_id:  mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	photo: { type: String, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	messages: [{
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String },
	text: { type: String },
	isReceived: { type: Boolean },
	timestamp: { type: Date  }
	}]
})

module.exports = mongoose.model('Room', model)

