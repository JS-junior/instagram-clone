import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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

function App() {


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
	  <Route component={Error} />
	  </Switch>
</BrowserRouter>
	
	  </>
  );
}

export default App;
