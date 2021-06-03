require('dotenv').config()
const http = require('http')
const fs = require('fs')
const app = require('./app.js')
const mongoose = require('mongoose')
const db = mongoose.connection
const users = []

db.once('open',()=>{

const messageCollection = db.collection('rooms')
const changeStream = messageCollection.watch()

changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'update'){
                const user = change.updateDescription.updatedFields
		console.log('This is change stream data \n \n \n')
		console.log(user) 
	

        } else {
		
                console.log('pusher error')
        }
})
})

const server = http.createServer(app)
const io = require("socket.io")(server)

io.on("connection", (socket) => {
  socket.on('user-joined',({ username })=>{
	  const user = {
		  username: username,
		  id: socket.id
	  }

	  io.emit('new-user', users)
  })

})

server.listen(process.env.PORT || 8080)
