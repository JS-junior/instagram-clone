const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const users = require('./users.js')
const posts = require('./posts.js')
const server = require('http').createServer(app)

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cors())
app.use(morgan('dev'))
app.use(users)
app.use(posts)
app.use(express.static('./uploads'))
mongoose.connect(`mongodb+srv://hitartha:H6pnk72QnpWR8zqj@cluster0.2vlug.mongodb.net/data?retryWrites=true&w=majority`,{
	useNewUrlPaser: true,
	useUnifiedTopology: true
})
.then(()=>{ console.log("db connected") })
.catch((err)=>{ console.log("failed to connect db" + err) })

app.get('/test',(req,res)=>{
	res.json({ message: 'successfully hosted whatsapp clone'})
})



app.use(cors());


server.listen(8080)
//module.exports = app
