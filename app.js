require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const users = require('./users.js')
const posts = require('./posts.js')
const messages = require('./messages.js')
const server = require('http').createServer(app)
const db = mongoose.connection
const fetch = require("node-fetch")
const webpush = require('web-push');

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cors())
app.use(morgan('dev'))
app.use(users)
app.use(posts)
app.use(messages)
app.use(express.static('./uploads'))
app.use(cors())
mongoose.connect(`mongodb+srv://hitartha:H6pnk72QnpWR8zqj@cluster0.2vlug.mongodb.net/data?retryWrites=true&w=majority`,{
	useNewUrlPaser: true,
	useUnifiedTopology: true
})
.then(()=>{ console.log("db connected") })
.catch((err)=>{ console.log("failed to connect db" + err) })



app.post('/notification',(req,res,next)=>{

webpush.setVapidDetails('mailto:test@test.com', 'BNoAY4FHCfjkHIQFZi0xkz20rdLJwCvSOK2YUI2kNpwGmup0RJ51g2NGj_utoj0JeNip6cvkz4NrBuM5Cml8hgI', 'IGtDsm0bvTdevK2SbYxAx6V_d7IlZQ0LUacIC51SDWs')

// This is the same output of calling JSON.stringify on a PushSubscription
	
	res.status(200).json({})

	const pushSubscription = req.body

const payload = JSON.stringify({ title: "Hello world" })
webpush.sendNotification(pushSubscription, payload)

})


module.exports = app
