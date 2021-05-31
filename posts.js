const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const Post = require('./post.js')
const auth = require('./auth.js')
const path = require('path')
const Story = require('./story.js')

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

router.get('/comments/:id',auth,(req,res,next)=>{
        Post.find({ _id: req.params.id })
        .populate('postedBy','username _id photo')
        .populate('comments.postedBy','username _id photo')
        .then(result =>{
                res.status(200).json({ message: result })
        })
        .catch(err =>{
                res.status(500).json({ message: 'server error' })
        })
})


router.get('/subpost',auth,(req,res,next)=>{
Post.find({postedBy:{$in:req.user.followings}})
    .populate("postedBy","_id username photo")
    .populate("comments.postedBy","_id username photo")
    .sort('postedOn')
    .then(posts=>{
        res.status(200).json({ message: posts })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/substory',auth,(req,res,next)=>{
Story.find({postedBy:{$in:req.user.followings}})
    .populate("postedBy","_id username photo")
    .sort('postedOn')
    .then(stories =>{
        res.status(200).json({ message: stories })
    })
    .catch(err=>{
        console.log(err)
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

router.get('/story/:id',auth,(req,res,next)=>{
	Story.find({ postedBy: req.user._id })
	.populate('postedBy', 'username _id photo')
	.then(result =>{
		res.status(200).json({ message: result })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error'})
	})
})

router.post('/story',auth,upload.single('photo'),(req,res,next)=>{

	console.log(req.file)

	const model = new Story({
		_id: new mongoose.Types.ObjectId(),
		url: 'http://localhost:8080/' + req.file.filename,
		postedBy: req.user._id,
		postedOn: new Date(),
		type: req.file.mimetype,
		heading: req.user.username,
		profileImage: 'http://localhost:8080/' + req.user.photo
	})

	model.save()
	.then(result =>{
		res.status(200).json({ message: 'story created successfully' })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error'})
	})
})

module.exports = router
