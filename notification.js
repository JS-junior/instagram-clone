const mongoose = require('mongoose')
const model = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	message: { type: String, required: true },
	triggeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	triggeredTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Notification', model)
