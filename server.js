require('dotenv').config()
const http = require('http')
const fs = require('fs')
const app = require('./app.js')
const mongoose = require('mongoose')
const User = require('./user.js')
const Room = require('./room.js')
const db = mongoose.connection
const users = {}

db.once('open',()=>{

const messageCollection = db.collection('rooms')
const changeStream = messageCollection.watch()

changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'update'){
                const user = change.updateDescription.updatedFields
		const field = Object.keys(user)
		const mainField = field[0]
		console.log('This is change stream data \n \n \n')
		console.log(change.updateDescription.updatedFields.mainField)

        } else {
		
                console.log('pusher error')
        }
})
})

const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket)=>{

	socket.on('user-connected', ({ username, id })=>{
		users[socket.id] = id
		socket.broadcast.emit('user-joined', { message: username })
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
		console.log(users)
		const lastOnline = new Date().getHours() + ':' + new Date().getMinutes()
User.findByIdAndUpdate(users[socket.id],{$set:{status:'last seen at '+ lastOnline}},{new:true })
		.then(result =>{
			delete user[socket.id]

			console.log(user[socket.id] + 'is offline')
		})
		.catch(err =>{
			console.log(err)
		})
	})
	
})

server.listen(process.env.PORT || 8080)
