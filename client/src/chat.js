import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Avatar, Button, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import jwt_decode from 'jwt-decode'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { State } from './state.js'
import './App.css'
import Pusher from 'pusher-js'

function Chat(){

	const [ reply, setReply ] = useState("")
	const [ messages,setMessages ] = useState([])
	const { name, room } = useParams()
	const history = useHistory()
	const [{ base_url }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)

	useEffect(()=>{
		fetch(`${base_url}/messages`, {
			method: 'GET',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			setMessages(data.message)
			console.log(data.message)
		})
		.catch(err =>{
			console.log(err)
		})
	},[])

	useEffect(()=>{

    var pusher = new Pusher('20db7d21b19977b8feef', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {;
	setMessages([ ...messages, newMessage])
	    console.log(messages)
    })
	return ()=>{
		channel.unbind_all()
		channel.unsubscribe()
	}
	},[messages])

	const sendMessage = ()=>{
		
		fetch(`${base_url}/messages`,{
			method: 'PUT',
			headers: { 
				authorization: 'bearer ' + token,
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ text: reply })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
			setReply("")
		})
		.catch(err =>{
			console.log(err)
		})
	}
				

	return(
		<>
		<div className='chat'>
		<div className='chat_header'>
		<Avatar />

		<div className='chat_header_info'>
		<Typography variant='h6'> room name </Typography>
		<p> Last seen @ 1:40am </p>
		</div>

		<div className='chat_header_icons'>
		<MoreVertIcon />
		</div>
		</div>

		<div className='chat_body'>
		{messages.map((val, index)=>{
			return(
				<>
		{val.name === name ?
		<>
		<p className='chat_message_receive'>
                <span className='chat_name'> You  </span> {val.text}
                <span className='chat_timestamp'> 11:50</span></p> </>
			:
		<>
                <p className='chat_message'>
                <span className='chat_name'> {val.name} </span> {val.text}
                <span className='chat_timestamp'> 11:50</span></p>
                </>}

				</>
			)
		})}
		</div>
	

		<div className='chat_footer'> 
		<InsertEmoticonIcon />
		<form>
		<input placeholder='type a message' value={reply} 
		onChange={ (e)=>{ setReply(e.target.value) }} />
		<SendIcon onClick={sendMessage} />
		</form>
		<PhotoCameraIcon />
		<MicIcon />
		</div>

		</div>
		</>
	)
}

export default Chat
