const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const Room = require('./room.js')
const auth = require('./auth.js')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
                cb(null, path.join(__dirname, '/uploads'))
        },
        filename: (req,file,cb)=>{
                cb(null, new Date().toISOString() + file.originalname)
        }
})

const upload = multer({ storage: storage })

router.get('/messages',auth,(req,res,next)=>{
	Room.find({ createdBy: req.body.id })
	.then(result =>{
		res.status(200).json({ message: result.message })
	})
	.catch(err =>{
		res.status(500).json({ message: err })
	})
})

router.put('/messages',auth,(req,res,next)=>{

	const message = {
		_id: new mongoose.Types.ObjectId(),
		name: req.user.username,
		text: req.body.text,
		timestamp: new Date().toUTCString(),
		isReceived: false
	}
	
	Room.findByIdAndUpdate(req.body.id, { $push: { messages: message } },{ new: true })
	.then(result =>{
		res.status(200).json({ message: result.message })
	})
	.catch(err =>{
		res.status(500).json({ message:  err })
	})
})

router.post('/room',auth,upload.single('photo'),(req,res,next)=>{

	const room = {
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		photo: req.file.filename
	}

	Room.create(room)
	.then(result =>{
		res.status(200).json({ message: result })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})

})


router.get('/rooms', auth, (req,res,next)=>{

	Room.find({ createdBy: req.user._id })
	.then(rooms =>{
		res.status(200).json({ message: rooms })
	})
	.catch(err =>{
		res.status(500).json({ message: err })
	})
})


module.exports = router