require('dotenv').config()
const http = require('http')
const fs = require('fs')
const FCM = require('fcm-node')
const app = require('./app.js')
const mongoose = require('mongoose')
const User = require('./user.js')
const Room = require('./room.js')
const db = mongoose.connection
const users = {}


const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket)=>{

	socket.on('user-connected', ({ username, id })=>{
		users[socket.id] = id
		socket.broadcast.emit('user-joined', { message: socket.id })
	})

	socket.on('chat-messages', ({ id })=>{
		Room.findById(id)
		.populate('createdBy', 'username photo _id')
		.then(result =>{
			io.sockets.emit('receive-chat-message', { message: result })
		})
		.catch(err =>{
			console.log(err)
		})
	})

	socket.on('disconnect',()=>{
		const lastOnline = new Date().getHours() + ':' + new Date().getMinutes()
User.findByIdAndUpdate(users[socket.id],{$set:{status:'last seen at '+ lastOnline}},{new:true })
		.then(result =>{
			delete users[socket.id]
		})
		.catch(err =>{
			console.log(err)
		})
	})
	
})

server.listen(process.env.PORT || 8080)
