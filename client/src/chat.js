import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ReactDom from 'react-dom'
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
	const [ friends, setFriends ] = useState([])
	const { creator, room } = useParams()
	const history = useHistory()
	const [{ base_url }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)
	const bottomRef = useRef();
	const [ open, setOpen ] = useState(false)

	const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }

	useEffect(()=>{
		fetch(`${base_url}/messages/${room}`, {
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
	},[chat])

	useEffect(()=>{
		fetch(`${base_url}/user/${decoded._id}`,{
                                headers: {
                                        authorization: 'bearer ' + token
                                }})
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setFriends(data.message.followers)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
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

	function AddUserModal(){

		return ReactDom.createPortal(
			<>
			{!open ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Add your friends</Typography>

		{friends.map((val, index)=>{
			return(
				<>
		<Button>{val}</Button><br />
				</>
			)
		})}

                <Button onClick={()=>{ setOpen(false) }}> close </Button>
                </div></div>
                }
			</>, document.getElementById('modal')
		)
	}
				

	return(
		<>
		<div className='chat'>
		<AddUserModal />
		<div className='chat_header'>
		<Avatar src={`${base_url}/${user.photo}`}/>
		
		<div className='chat_header_info'>
		<Typography variant='h6'> {user.name} </Typography>
		<p> group created by gauranga </p>
		</div>

		<div className='chat_header_icons'>
		<MoreVertIcon onClick={()=>{ setOpen(true) }}/>
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
