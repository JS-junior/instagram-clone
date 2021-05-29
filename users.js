require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const auth = require('./auth.js')
const User = require('./user.js')

const storage = multer.diskStorage({
	destination: (req,file,cb)=>{
		cb(null, path.join(__dirname, '/uploads'))
	},
	filename: (req,file,cb)=>{
		cb(null, file.originalname + new Date().toISOString())
	}
})

const upload = multer({ storage: storage })

router.post('/signup', upload.single('photo'),(req,res,next)=>{
	const { username, password, email, phone_number } = req.body

	if(!username || !password || !email || !phone_number){
		res.status(422).json({ message: 'please enter all details'})
		console.log(req.body)
	} else {

	User.find({ email: email })
	.then(user =>{
		if(user.length > 0){
			res.status(409).json({ message: 'user already exist' })		
		} else {
			bcrypt.hash(password, 10)
			.then(hash =>{
				const model = new User({
					_id: new mongoose.Types.ObjectId(),
					username: username,
					password: hash,
					email: email,
					phone_number: phone_number,
					photo: req.file.filename
				})
				model.save()
				.then(result =>{
				res.status(200).json({ message: 'account created' })
				})
				.catch(err =>{
					res.status(500).json({ message: 'server error'})
				})
			})
			.catch(err =>{
				res.status(500).json({ message: 'server error' })
			})
		}
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
	}
})

router.post('/login',(req,res,next)=>{
	const { email, password } = req.body

	if(!email || !password){
		res.status(409).json({ message: 'please enter all details'})
	} else {

	User.find({ email: email })
	.then(user =>{
		if(user.length < 1){
			res.status(404).json({ message: 'no account found' })
		} else { 
			bcrypt.compare(password, user[0].password)
			.then(result =>{
			const token = jwt.sign({ 
				username: user[0].username,
				email: user[0].email,
				password: user[0].password,
				_id: user[0]._id,
				phone_number: user[0].phone_number,
				followers: user[0].followers,
				followings: user[0].followings
			}, process.env.JWT_KEY)
				res.status(200).json({ message: token })
			})
			.catch(err =>{
				res.status(500).json({ message: 'server error'})
			})
		}
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error'})
	})
	}
})

router.get('/user/:id',auth,(req,res,next)=>{
	User.findOne({ _id: req.params.id  })
	.then(user =>{
		/*
		const result = user.map(doc =>{
			return {
				_id: doc._id,
				username: doc.username,
				email: doc.email,
				phone_number: doc.phone_number,
				photo: doc.photo,
				followers: doc.followers,
				followings: doc.followings,
			}
		})*/
			res.status(200).json({ message: user  })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
		console.log(err)
	})
})


module.exports = router 
