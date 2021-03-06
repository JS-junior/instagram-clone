import React, { useState, useEffect, useRef, useContext } from 'react'
import logo from './logo.svg'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import jwt_decode from 'jwt-decode'
import { State } from './state.js'
import { database, messaging } from './firebase.js'
import './App.css'
import Home from './home.js'
import Search from './search.js'
import Profile from './profile.js'
import User from './user.js'
import Create from './create.js'
import Signup from './signup.js'
import Login from './login.js'
import Notify from './notify.js'
import Error from './error.js'
import Story from './story.js'
import Edit from './edit.js'
import CreateStory from './createstory.js'
import Chat from './chat.js'
import Rooms from './room.js'
import VideoCall from './video.js'
import Verify from './verify.js'
import Comments from './comments.js'

function App() {

	const [{ base_url }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)

	useEffect(()=>{
                const socket = socketIOClient(base_url,  { transports: ["websocket"] })
                socket.emit('user-connected', { username: decoded.username, id: decoded._id })
                socket.on('user-joined',
                ({ message })=>{ console.log('New user connected to socket.io ' + message) })
        })

	useEffect(()=>{
	var connectedRef = database.ref(".info/connected");
                connectedRef.on("value", (snap) => {
                        if (snap.val() === true) {
                                console.log("connected");

                fetch(`${base_url}/status`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,                                                               'Content-Type':'application/json'
                        },
                        body: JSON.stringify({ status: 'online' })
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        console.log(data)

		})
                .catch(err =>{
                        console.log(err)
                })                                                                                                      } else {                                                                                                console.log('user is offline')                                                          }
                })
	},[navigator.onLine])


  return (
	  <>
<BrowserRouter>
	  <Switch>
	  <Route exact path='/' component={Home} />
	  <Route path='/profile' component={Profile} />
	  <Route path='/user/:id' component={User} />
	  <Route path='/search' component={Search} />
	  <Route path='/create' component={Create} />
	  <Route path='/signup' component={Signup} />
	  <Route path='/login' component={Login} />
	  <Route path='/notifications' component={Notify} />
	  <Route path='/comments/:id/:postId' component={Comments} />
	  <Route path='/story/:id' component={Story} />
	  <Route path='/createstory' component={CreateStory} />
	  <Route path='/edit/:id' component={Edit} />
	  <Route path='/chat/:creator/:room' component={Chat} />
	  <Route path='/room/:id' component={Rooms} />
	  <Route path='/verify/:id' component={Verify} />
	  <Route path='/video/:id' component={VideoCall} />
	  <Route component={Error} />
	  </Switch>
</BrowserRouter>
	
	  </>
  );
}

export default App;
