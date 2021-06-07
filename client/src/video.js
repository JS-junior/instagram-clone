import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import ReactDom from 'react-dom'
import { Typography, Button, Input, Avatar } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import Peer from 'simple-peer'
import Webcam from "react-webcam";
import { State } from './state.js'
import './App.css'

function VideoCall(){

	const [ myvideo, setMyVideo ] = useState({})
	const [{ base_url, live_initiator }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)
	const [ MyImage, setMyImage ] = useState("")
	const [ call, setCall ] = useState({})
	const [ callAccepted, setCallAccepted ] = useState(false)
	const connectionRef = useRef()
	const myScreen = useRef()
	const userScreen = useRef()
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState('');
	const [me, setMe] = useState('');

	const videoConstraints = {
		width: 360,
		height: 640,
		facingMode: "user"
	}
	

	const capture = useCallback(() => {
		const imageSrc = myScreen.current.getScreenshot()
		setMyImage(imageSrc)


	},[myScreen])

	return(
		<>
		<Webcam />

	
		</>
	)
}

export default VideoCall
