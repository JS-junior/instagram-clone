import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import ReactDom from 'react-dom'
import { Typography, Button, Input, Avatar } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import Webcam from "react-webcam";
import { State } from './state.js'
import './App.css'

function VideoCall(){

	const [ myvideo, setMyVideo ] = useState({})
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)
	const myScreen = useRef()
	
	useEffect(()=>{

	},[])

	return(
		<>

		<Webcam />
		</>
	)
}

export default VideoCall
