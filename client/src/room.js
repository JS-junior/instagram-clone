import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Avatar, Button, CardActionArea, AppBar, Toolbar, Input, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import './App.css'
import { State } from './state.js'

function Rooms(){

        const [ rooms, setRooms ] = useState([1,2,3])
	const [ user, setUser ] = useState([])
        const history = useHistory()
	const { id } = useParams()
        const [{ base_url }, dispatch ] = useContext(State)
	const [ term, setTerm ] = useState("")
        const token = localStorage.getItem('jwt')
        const user_id = jwt_decode(token)

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

        return(
                <>
		<Typography variant='h6'>{user.username}</Typography>{/*
		<Avatar className='room_avatar' src={`${base_url}/${user.photo}`} />*/}
		<AppBar position='sticky' color='white'>
		<input className='search_input' value={term} placeholder='search'
		onChange={ (e)=>{ setTerm(e.target.value) }} />
		<Avatar className='room_avatar' src={`${base_url}/${user.photo}`} />
			</AppBar><Toolbar />

		{rooms.map((val,index)=>{
			return(
				<>
		<div className='notification_bar'>
        <Avatar className='notification_text' src={`${base_url}/${user.photo}`}
                id='notification_avatar'  />
                <Typography variant='subtitle5'>
                <Typography className='notification_text' id='notification_text'
                variant='h6'> {user.username} </Typography><br /> Hello there
                </Typography>
                </div>
				</>
			)
		})}

		
                </>
        )
}

export default Rooms
