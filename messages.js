const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const Room = require('./room.js')
const User = require('./user.js')
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

router.get('/messages/:id',auth,(req,res,next)=>{
	Room.find({ _id: req.params.id })
	.populate('createdBy', 'username photo _id')
	.then(result =>{
		console.log(result[0].createdBy)
		res.status(200).json({ message: result[0].messages, user: result[0] })
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
		res.status(200).json({ message: result })
	})
	.catch(err =>{

		console.log(err)
		res.status(500).json({ message:  err })
	})
})

router.post('/room',auth,upload.single('photo'),(req,res,next)=>{

	const room = {
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		photo: req.file.filename,
		createdBy: req.user._id,
	}

	Room.create(room)
	.then(result =>{
	Room.findByIdAndUpdate(result._id, { $push: { users: req.user._id }},{ new: true })
		.then(data =>{
		res.status(200).json({ message: data })
		})
		.catch(err =>{
			res.status(500).json({ message: 'servee error' })
		})

	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})

})


router.get('/rooms', auth, (req,res,next)=>{
	Room.find()
	.populate('createdBy', 'username photo _id')
	.then(rooms =>{
		console.log(rooms)
		res.status(200).json({ message: rooms  })
	})
	.catch(err =>{
		res.status(500).json({ message: err })
	})
})

router.delete('/room/:id', auth, (req,res,next)=>{
        Room.findByIdAndDelete(req.params.id)
        .then(rooms =>{
                res.status(200).json({ message: 'room deleted' })
        })
        .catch(err =>{
                res.status(500).json({ message: err })
        })
})

router.put('/adduser/:id/:userId', auth, (req,res,next)=>{
Room.findByIdAndUpdate(req.params.id, { $push: { users: req.params.userId }}, { new: true })
	.then(result =>{
		res.status(200).json({ message: 'user added' })
	})
	.catch(err =>{
		res.status(500).json({ message: err })
	})
})

router.put('/removeuser/:id/:userId', auth, (req,res,next)=>{
Room.findByIdAndUpdate(req.params.id, { $pull: { users: req.params.userId }}, { new: true })
        .then(result =>{
		if(req.params.userId !== req.user._id){
                res.status(200).json({ message: 'user removed' })
		} else if(req.params.userId === req.user._id){
			res.status(200).json({ message: 'self removed' })
	}
        })
        .catch(err =>{
                res.status(500).json({ message: err })
        })
})

router.get('/friends', auth, (req,res,next)=>{
	User.findOne({ _id: req.user._id })
        .then(user =>{
		User.find({ _id: { $in: user.followers } })
			.then(friends =>{
				res.status(200).json({ message: friends })
			})
			.catch(err =>{
				res.status(500).json({ message: 'server error' })
			})
	})
        .catch(err =>{
                res.status(500).json({ message: 'server error' })
                console.log(err)
        })
})

router.get('/users/:id', auth, (req,res,next)=>{
        Room.findOne({ _id: req.params.id })
        .then(room =>{
                User.find({ _id: { $in: room.users } })
                        .then(friends =>{
                                res.status(200).json({ message: friends })
                        })
                        .catch(err =>{
                                res.status(500).json({ message: 'server error' })
                        })
        })
        .catch(err =>{
                res.status(500).json({ message: 'server error' })
                console.log(err)
        })
})

module.exports = router
