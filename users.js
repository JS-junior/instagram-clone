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
const nodemailer = require('nodemailer')
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

	User.findOne({ email: email })
	.then(user =>{
		if(user.length < 1){
			res.status(404).json({ message: 'no account found' })
		} else { 
			bcrypt.compare(password, user.password)
			.then(result =>{
			console.log(result)
				if(result === true){
			const token = jwt.sign({ 
				username: user.username,
				email: user.email,
				photo:  user.photo,
				password: user.password,
				_id: user._id,
				phone_number: user.phone_number,
				followers: user.followers,
				followings: user.followings
			}, process.env.JWT_KEY)
				res.status(200).json({ message: token })
				} else if(result === false){
				res.status(404).json({ message: 'invalid credentials' })
				}
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
	.select('followers followings username _id photo email')
	.then(user =>{
		res.status(200).json({ message: user  })
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
		console.log(err)
	})
})


router.post('/search/:email',auth,(req,res,next)=>{
	let userPattern = new RegExp("^" + req.body.email)
    User.find({email:{$regex:userPattern}})
    .select("_id email photo username")
    .then(user=>{
        res.json({ message: user })
    }).catch(err=>{
        console.log(err)
    })
})


router.put('/follow',auth,(req,res,next)=>{
	User.findByIdAndUpdate(req.body.id,{
        $push:{followers:req.user._id}
	}, { new: true })
	.then(result =>{
		User.findByIdAndUpdate(req.user._id,{
          $push:{followings :req.body.id}
      },{new:true})
		.then(rsp =>{
			res.status(200).json({ message: 'follow successfully' })
		})
		.catch(err =>{
			res.status(500).json({ message: 'server error' })
		})
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error'})
	})
})


router.put('/unfollow',auth,(req,res,next)=>{
	User.findByIdAndUpdate(req.body.id,{
        $pull:{followers:req.user._id}
        }, { new: true })
        .then(result =>{
                User.findByIdAndUpdate(req.user._id,{
          $pull:{followings :req.body.id}
      },{new:true})
                .then(rsp =>{
                        res.status(200).json({ message: 'unfollow successfully' })
                })
                .catch(err =>{
                        res.status(500).json({ message: 'server error' })
                })
        })
        .catch(err =>{
                res.status(500).json({ message: 'server error'})
        })
})


router.put('/updatepic',auth,upload.single('photo'),(req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{photo:req.file.filename}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({ message: "server error" })
         }
         res.status(200).json({ message: 'photo updated' })
    })
})


router.put('/updatename',auth,(req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{username: req.body.username}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({ message: "server error" })
         }
         res.status(200).json({ message: 'username updated' })
    })
})

router.put('/updatemail',auth,(req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{email: req.body.email}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({ message: "server error" })
         }
         res.status(200).json({ message: 'email updated' })
    })
})

router.put('/updatenumber',auth,(req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{phone_number: req.body.phone_number}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({ message: "server error" })
         }
         res.status(200).json({ message: 'phone_number updated' })
    })
})

router.post('/forgotpass',(req,res,next)=>{

	const token = jwt.sign({
		email: req.body.email 
	}, process.env.JWT_KEY, { expiresIn: '1hr' })

	const link = `http://localhost:3000/verify/${token}`

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'arnabgogoi83@gmail.com',
			pass:'ArNaBgOgOi83'
		}
	})

	const mail = {
		from: 'arnabgogoi83@gmail.com',
		to: req.body.email,
		subject: 'Forgot password',
		html: `<a href='${link}'> verify </a>`
	}

	transporter.sendMail(mail, (err, result)=>{

		if(err){
			res.status(500).json({ message: 'server error' })
		} else if(result){
			res.status(200).json({ message: 'check your mail' })
		}

	})
})

router.put('/resetpass',(req,res,next)=>{

	const decoded = jwt.verify(req.body.id, process.env.JWT_KEY)
	
	User.findOne({ email: decoded.email })
	.then(result =>{

		bcrypt.hash(req.body.password, 10)
		.then(hash =>{
		User.findByIdAndUpdate(result._id, { $set: { password: hash }}, { new: true })
		.then(data =>{
			res.status(200).json({ message: 'password updated' })
		})
		.catch(err =>{
			res.status(500).json({ message: 'server error' })
		})
		})
		.catch(err =>{
			res.status(500).json({ message: 'server error' })
		})
	})
	.catch(err =>{
		res.status(500).json({ message: 'server error' })
	})
})

router.get('/followings',auth,(req,res,next)=>{
	User.find()

})

module.exports = router 
