const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const users = require('./users.js')
const posts = require('./posts.js')

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cors())
app.use(morgan('dev'))
app.use(users)
app.use(posts)
mongoose.connect(`mongodb+srv://hitartha:H6pnk72QnpWR8zqj@cluster0.2vlug.mongodb.net/data?retryWrites=true&w=majority`,{
	useNewUrlPaser: true,
	useUnifiedTopology: true
})
.then(()=>{ console.log("db connected") })
.catch((err)=>{ console.log("failed to connect db" + err) })

app.get('/test',(req,res)=>{
	res.send('successfully hosted whatsapp clone')
})

module.exports = app
