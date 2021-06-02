require('dotenv').config()
const http = require('http')
const fs = require('fs')
const app = require('./app.js')
const Pusher = require('pusher')
const mongoose = require('mongoose')
const db = mongoose.connection

const pusher = new Pusher({
  appId: "1213152",
  key: "20db7d21b19977b8feef",
  secret: "de796ca9bb2fdc97bdde",
  cluster: "ap2",
  useTLS: true
});


db.once('open',()=>{
const messageCollection = db.collection('rooms')
const changeStream = messageCollection.watch()

changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'update'){
                const user = change.updateDescription
		console.log('This is change stream data \n \n \n')
		console.log(user)
		/*
                pusher.trigger('rooms', 'inserted', {
                        
                
                })*/

        } else {
		//const user = change.fullDocument
               // console.log(user.message[user.messages.length].text)
                console.log('pusher error')
        }
})
})

const server = http.createServer(app)

server.listen(process.env.PORT || 8080)
