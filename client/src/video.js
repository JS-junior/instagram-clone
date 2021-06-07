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
//	const [ stream, setStream ] = useState("")
	const [{ base_url, live_initiator }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)
	const [ MyImage, setMyImage ] = useState("")
	const [ call, setCall ] = useState({})
	const myScreen = useRef()
	const userScreen = useRef()

	const videoConstraints = {
		width: 360,
		height: 640,
		facingMode: "user"
	}
	

	const capture = useCallback(() => {
		const imageSrc = myScreen.current.getScreenshot()
		setMyImage(imageSrc)

	},[myScreen])

	useEffect(()=>{

		const socket = socketIOClient(base_url)

		navigator.mediaDevices.getUserMedia({ video: true })
		.then(streams =>{
			userScreen.current.srcObject = streams

			var peer1 = new Peer({ initiator: true, stream: streams })
			var peer2 = new Peer()
			peer1.on('signal', data => {
				peer2.signal(data)
			})
			peer2.on('signal', data => {
				peer1.signal(data)
			
			})
			
		
			peer2.on('stream', stream => {
			var video = document.querySelector('#video')
				if ('srcObject' in video) {
					video.srcObject = stream
				} else {
					video.src = window.URL.createObjectURL(stream)
				}
				video.play()
			})
			
		})
		.catch(err =>{
			console.log(err)
		})
	},[])

	return(
		<>{/*
		<Webcam 
		audio={false}
		height={800}
		ref={myScreen}
		screenshotFormat="image/jpeg"
		width={800}
		videoConstraints={videoConstraints}
      />*/}

		{!live_initiator ? 
	<video style={{ height: 'auto', width: '80%', border: 'solid 1px black' }}
	ref={userScreen} id='video'  autoplay>
	</video>:  <Webcam />}

	
		</>
	)
}

export default VideoCall
