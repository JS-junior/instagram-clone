import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './home.js'
import Search from './search.js'
import Profile from './profile.js'
import User from './user.js'
import CaptureVideo from './capture.js'
import Signup from './signup.js'
import Login from './login.js'

function App() {


  return (
	  <>
<BrowserRouter>
	  <Switch>
	  <Route path='/' component={Home} />
	  <Route path='/profile' component={Profile} />
	  <Route path='/user/:id' component={User} />
	  <Route path='/search' component={Search} />
	  <Route path='/create' component={CaptureVideo} />
	  <Route path='/signup' component={Signup} />
	  <Route path='/login' component={Login} />
	
	  </Switch>
</BrowserRouter>
	
	  </>
  );
}

export default App;
