const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const Post = require('./post.js')
const auth = require('./auth.js')
const path = require('path')

const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
                cb(null, path.join(__dirname, '/uploads'))
        },
        filename: (req,file,cb)=>{
                cb(null, file.originalname + new Date().toISOString())
        }
})

const upload = multer({ storage: storage })


router.get('/posts/:id',auth,(req,res,next)=>{
	Post.find({ postedBy: req.params.id })
	.populate('postedBy','username _id photo')
	.populate('comments.postedBy','username _id photo')
	.then(result =>{
		res.status(200).json({ message: result })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
})

router.post('/post',upload.single('photo'),auth,(req,res,next)=>{

	const { caption } = req.body

	const model = new Post({
		_id: new mongoose.Types.ObjectId(),
		caption: caption,
		photo: req.file.filename,
		postedBy: req.user._id,
		postedOn: new Date().toISOString()
	})

	model.save()
	.then(result =>{
		res.status(200).json({ message: 'post created successfully'})
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
		console.log(err)
	})
})


router.delete('/post/:id',auth,(req,res,next)=>{

	Post.findByIdAndDelete(req.params.id)
	.then(result =>{
		res.status(200).json({ message: 'post deleted successfully' })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
})

router.put('/like',auth,(req,res,next)=>{
	Post.findByIdAndUpdate(req.body.id, { $push: { likes: req.user._id }}, { new: true })
	.then(result =>{
		res.status(200).json({ message: 'liked successfully' })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
})

router.put('/unlike',auth,(req,res,next)=>{
	Post.findByIdAndUpdate(req.body.id, { $pull: { likes: req.user._id }}, { new: true })
        .then(result =>{
                res.status(200).json({ message: 'unliked successfully' })
        })
        .catch(err =>{
                res.status(500).json({ message: 'server error' })
        })

})

router.put('/comment',auth,(req,res,next)=>{
	const comment = { 
		_id: new mongoose.Types.ObjectId(),
		text: req.body.comment, 
		postedBy: req.user._id 
	}

	Post.findByIdAndUpdate(req.body.id, { $push: { comments: comment } }, { new: true })
	.then(result =>{
		res.status(200).json({ message: 'comment posted successfully' })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
})


module.exports = router
