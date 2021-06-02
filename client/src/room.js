import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDom from 'react-dom'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Avatar, Button, CardActionArea, AppBar, Toolbar, Input, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import './App.css'
import { State } from './state.js'
import RateReviewIcon from '@material-ui/icons/RateReview';
import ClearIcon from '@material-ui/icons/Clear';

function Rooms(){

        const [ rooms, setRooms ] = useState([])
	const [ user, setUser ] = useState([])
        const history = useHistory()
	const { id } = useParams()
        const [{ base_url }, dispatch ] = useContext(State)
	const [ term, setTerm ] = useState("")
	const [ photo, setPhoto ] = useState({})
	const [ roomname, setRoomName ] = useState("")
	const [ open, setOpen ] = useState(false)
        const token = localStorage.getItem('jwt')
        const user_id = jwt_decode(token)
	const fileInput = useRef()

	const loadFile = function(event) {
                const reader = new FileReader();
                reader.onload = function(){
                        fileInput.current.src = reader.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                setPhoto(event.target.files[0])
		console.log('it works')
        }

	useEffect(()=>{
                fetch(`${base_url}/rooms`, {
                        method: 'GET',                                                                                  headers: { authorization: 'bearer ' + token }
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        setRooms(data.message)
                        console.log(data.message)
                })
                .catch(err =>{
                        console.log(err)
                })
        },[])

	useEffect(()=>{
	fetch(`${base_url}/user/${user_id._id}`,{
                                method: 'GET',
                                headers: { authorization: 'bearer ' + token }
                        })
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setUser(data.message)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
	},[])

	const createRoom = ()=>{

		const form = new FormData()
		form.append('name', roomname)
		form.append('photo', photo)

		fetch(`${base_url}/room`,{
			method: 'POST',
			headers: { 'authorization' : 'bearer ' + token },
			body: form
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data.message)
			setOpen(false)
		})
		.catch(err =>{
			console.log(err)
		})
	}

	function Modal(){

		return ReactDom.createPortal(
			<>
			{!open ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Create a room
                <ClearIcon className='create_room_cross'
		onClick={()=>{ setOpen(false) }} /></Typography>
		<Input style={{ display: 'inline-block' }}
		value={roomname} onChange={(e)=>{ setRoomName(e.target.value)}} />
                <Button style={{ display: 'inline-block'  }} component='label'
                > choose file <input hidden type='file'
		onChange={loadFile} />
                </Button><br />
		<center>
		<Button variant='contained' onClick={createRoom}> create </Button><br />
		<img style={{ height: 'auto', width: '70%' }} ref={fileInput} />
		</center>
                </div></div>}
			</>, document.getElementById('modal')
		)
	}

                

        return(
                <>
	

		<AppBar position='sticky' color='white'>
		<Typography variant='h6'>{user.username}</Typography><br />

		<Modal />

	
		{!open ? <RateReviewIcon onClick={()=>{ setOpen(true) }} /> :
                <RateReviewIcon onClick={()=>{ setOpen(false) }} />}


		
		<div className='room_appbar_div'>
		<input className='search_input_room' value={term} placeholder='search'
		onChange={ (e)=>{ setTerm(e.target.value) }} />
		<Avatar className='room_avatar' src={`${base_url}/${user.photo}`} />
		</div>
		</AppBar>

		{rooms.map((val,index)=>{
			return(
				<>
		<div className='notification_bar' 
		onClick={ ()=>{ history.push(`/chat/${val.createdBy._id}/${val._id}`) }}>
        <Avatar className='notification_text' src={`${base_url}/${val.photo}`}
                id='notification_avatar'  />
                <Typography variant='subtitle5'>
                <Typography className='notification_text' id='notification_text'
                variant='h6'> {val.name} </Typography><br />
		<span style={{ fontWeight: '800' }}>
		{val.messages[val.messages.length - 1].name}</span>
		: {val.messages[val.messages.length - 1].text}
                </Typography>
                </div>
				</>
			)
		})}

		
                </>
        )
}

export default Rooms
