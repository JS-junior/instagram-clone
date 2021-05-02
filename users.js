const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/users',(req,res,next)=>{
	res.json({ message: 'hello world!'})
})

module.exports = router 
