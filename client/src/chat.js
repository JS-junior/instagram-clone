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

function Chat(){

	const [ reply, setReply ] = useState("")
	const [ chat,setChat ] = useState([])
	const [ user, setUser ] = useState({})
	const { creator, room } = useParams()
	const history = useHistory()
	const [{ base_url }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)

	useEffect(()=>{
		fetch(`${base_url}/messages/${creator}`, {
			method: 'GET',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			setUser(data.user)
			setChat(data.message)
			console.log(data)
		})
		.catch(err =>{
			console.log(err)
		})
	},[])

	useEffect(()=>{

	},[])

	const sendMessage = ()=>{
		
		fetch(`${base_url}/messages`,{
			method: 'PUT',
			headers: { 
				authorization: 'bearer ' + token,
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ text: reply, id: room })
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
		<Avatar src={`${base_url}/${user.photo}`}/>
		
		<div className='chat_header_info'>
		<Typography variant='h6'> {user.name} </Typography>
		<p> group created by gauranga </p>
		</div>

		<div className='chat_header_icons'>
		<MoreVertIcon />
		</div>
		</div>
		
		<div className='chat_body'>
		{chat.map((val, index)=>{
			return(
				<>
		{val.name === decoded.username ?
		<>
		<p className='chat_message_receive' key={index} id={index}>
                <span className='chat_name'> You  </span> {val.text}
                <span className='chat_timestamp'> 11:50</span></p> </>
			:
		<>
                <p className='chat_message' key={index} id={index}>
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
