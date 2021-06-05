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
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { toast, ToastContainer } from 'react-toastify'
import * as Ably from "ably";
import { Doughnut } from "react-chartjs-2";
import { db, database, storage }  from './firebase.js'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import socketIOClient from 'socket.io-client'
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
	const [ rm, setRm ] = useState(false)
	const [ snapshot  ,setSnapshot ] = useState({})
	const [ userPopup, setUserPopup ] = useState(false)
	const [ roomusers, setRoomUsers ] = useState([])
	const [ menubar, setMenuBar ] = useState(false)
	const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }



	useEffect(()=>{	
		const socket = socketIOClient(base_url,  { transports: ["websocket"] })
		socket.emit('user-connected', { username: decoded.username, id: decoded._id })
		socket.on('user-joined',
		({ message })=>{ console.log('New user connected to socket.io ' + message) })
		socket.emit('chat-messages', { id: room })
                socket.on('receive-chat-message', ({ message })=>{ console.log(message) })
	})

	const fetchRoom = ()=>{
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
	}

	const fetchUsers = ()=>{
		fetch(`${base_url}/users/${room}`, {
                        method: 'GET',
                        headers: { authorization: 'bearer ' + token }
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        setRoomUsers(data.message)
                        console.log(data.message)
                })
                .catch(err =>{
                        console.log(err)
                })
	}

	useEffect(()=>{
		fetch(`${base_url}/friends`,{
                                headers: {
                                        authorization: 'bearer ' + token
                                }})
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setFriends(data.message)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
	},[])

	useEffect(()=>{
		fetchRoom()
		fetchUsers()
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
			fetchRoom()
		})
		.catch(err =>{
			console.log(err)
		})
	}

	const adduser = (id)=>{
		fetch(`${base_url}/adduser/${room}/${id}`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        }
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
			if(data.message === 'user added'){
			setOpen(false)
			toast.success(data.message)
                        console.log(data)
			fetchRoom()
			fetchUsers()
			}
                })
                .catch(err =>{
                        console.log(err)
                })
	}

	const removeuser = (id)=>{
                fetch(`${base_url}/removeuser/${room}/${id}`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        }
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        if(data.message === 'user removed'){
                        setRm(false)
                        toast.success(data.message)
                        console.log(data)
			fetchRoom()
			fetchUsers()
                        } else if(data.message === 'self removed'){
				history.push(`/room/${decoded._id}`)
			}
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
				<center>
		{friends.map((val, index)=>{
			return(
				<>
				{user.users.includes(val._id) ? null : 
		<div className='adduser_modal'>
		<Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
		<Button className='adduser_modal_username'>{val.username}</Button><br />
		<AddBoxIcon onClick={()=>{ adduser(val._id) }} />
		</div>}
				</>
			)
		})}
				</center>
                <Button onClick={()=>{ setOpen(false) }}> close </Button>
                </div></div>
                }
			</>, document.getElementById('modal')
		)
	}
				
	function RemoveUserModal(){

                return ReactDom.createPortal(
                        <>
                        {!rm ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> remove your friends</Typography>
                                <center>
                {friends.map((val, index)=>{
                        return(
                                <>
                                {user.users.includes(val._id) ?
                <div className='adduser_modal'>
                <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
                <Button className='adduser_modal_username'>{val.username}</Button><br />
                <RemoveCircleIcon onClick={()=>{ removeuser(val._id) }} />
                </div>: null }
                                </>
                        )
                })}
                                </center>
                <Button onClick={()=>{ setRm(false) }}> close </Button>
                </div></div>
                }
                        </>, document.getElementById('modal')
                )
        }


	function UsersModal(){

                return ReactDom.createPortal(
                        <>
			{!userPopup ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Total users </Typography>
                                <center>
			{roomusers.map((val, index)=>{
				return(
					<>
			<div className='adduser_modal'>
                <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
                <Button className='adduser_modal_username'>{val.username}</Button>
		<Button className='adduser_modal_username'>{val.status}</Button>
                </div><br />
					</>
				)
			})}

                                </center>
		<Button onClick={()=>{ setUserPopup(false) }}> close </Button>
                </div></div>}
                
                        </>, document.getElementById('modal')
                )                                                                                       }




	const deletegroup = ()=>{
		fetch(`${base_url}/room/${room}`,{
			method: 'DELETE',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'room deleted' ){
				history.push(`/room/${decoded._id}`)
				console.log(data.message)
			} else {
				toast.error('an error occured')
				}
		})
		.catch(err =>{
			console.log(err)
			toast.error('an error occured')
		})
	}

	const deleteMessage = (id)=>{
		fetch(`${base_url}/messages/${room}/${id}`, {
			method: 'DELETE',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			fetchRoom()
		})
		.catch(err =>{
			console.log(err)
		})
	}


	const updateStatus = ()=>{

		var connectedRef = database.ref(".info/connected");
		connectedRef.on("value", (snap) => {
			if (snap.val() === true) {
				console.log("connected");

		fetch(`${base_url}/status`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
			body: JSON.stringify({ status: 'online' })
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        console.log(data)
                        setReply("")
                        fetchRoom()
                })
                .catch(err =>{
                        console.log(err)                                                                        })
			} else {
				fetch(`${base_url}/status`,{
                        method: 'PUT',
                        headers: {                                                                                              authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
                        body: JSON.stringify({ status: 'offline' })
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        console.log(data)
                        setReply("")
                        fetchRoom()
                })
                .catch(err =>{
                        console.log(err)
                })

	}
		})
	}




	useEffect(()=>{
		updateStatus()
	},[navigator.onLine])



	return(
		<>
		<ToastContainer />
		<div className='chat'>
		<AddUserModal />
		<RemoveUserModal />
		<UsersModal />
		<div className='chat_header'>
		<Avatar src={`${base_url}/${user.photo}`}/>
		<div className='chat_header_info'>
		<Typography variant='h6'> {user.name} </Typography>
		<p> group created by gauranga </p>
		</div>

		<div className='chat_header_icons'>
		<MoreVertIcon onClick={()=>{ setMenuBar(true) }}/>
		{creator === decoded._id ? 
		<Menu open={menubar} onClose={()=>{ setMenuBar(false) }}>
                <MenuItem><Button onClick={()=>{ setOpen(true) }}
                variant='contained'>add users</Button> </MenuItem>
                <MenuItem><Button onClick={()=>{ setRm(true) }}
                variant='contained'> remove users
                </Button> </MenuItem>
                <MenuItem><Button onClick={deletegroup}
		variant='contained'>delete group </Button>
		</MenuItem>
		<MenuItem><Button variant='contained' 
		onClick={()=>{ setUserPopup(true) }}> all users </Button>
                </MenuItem>
		</Menu>: 
		<Menu open={menubar} onClose={()=>{ setMenuBar(false) }}>
		<MenuItem><Button onClick={()=>{ removeuser(decoded._id) }}>
		leave group </Button></MenuItem>
		<MenuItem><Button variant='contained'
                onClick={()=>{ setUserPopup(true) }}> all users </Button>
                </MenuItem>
		</Menu>}
		</div>
		</div>
		
		<div className='chat_body'>
	
		{chat.map((val, index)=>{
			return(
				<>

		{val.name === decoded.username ?
		<>
		<p className='chat_message_receive' key={index} id={index}
		onDoubleClick={()=>{ deleteMessage(val._id) }}>
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
