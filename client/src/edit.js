import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Avatar, Card, CardActionArea, CardMedia, CardHeader, Toolbar, CardContent, AppBar, Grid, Menu, MenuItem, Input, Typography } from '@material-ui/core'
import './App.css'
import { State } from './state.js'
import { ToastContainer, toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

function Edit(){

	const { id } = useParams()
	const history = useHistory()
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const [{ base_url }, dispatch ] = useContext(State)
	const [ username, setUsername ] = useState("")
	const [ photo, setPhoto ] = useState({})
	const [ email, setEmail ] = useState("")
	const [ phone_number, setPhone_number ] = ("")

	const update = (action)=>{
		if(action === 'photo'){
			const form = new FormData()
			form.append('photo', photo)
			fetch(`${base_url}/updatepic`,{
				method: 'PUT',
				headers: { authorization: 'bearer ' + token },
				body: form
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				if(data.message === 'photo updated'){
					console.log(data.message)
					history.push('/profile')
				} else {
					console.log('server error')
					toast.error('an error occured')
				}
			})
			.catch(err =>{
				console.log(err)
				toast.error('an error occured')
			})
		} else if(action === 'username'){
			fetch(`${base_url}/updatename`,{
				method: 'PUT',
				headers: {
					authorization: 'bearer ' + token,
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					username: username 
				})
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				if(data.message === 'username updated'){
					console.log(data.message)
					history.push('/profile')
				} else {
					console.log('server error')
					toast.error('an error occured')
				}
			})
			.catch(err =>{
				console.log(err)
				toast.error('an error occured')
			})
		} else if(action === 'email'){
			fetch(`${base_url}/updatemail`,{
				method: 'PUT',
				headers: {
					authorization: 'bearer ' + token,
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					email: email
				})
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				if(data.message === 'email updated'){
					console.log(data.message)
					history.push('/profile')
				} else {
					toast.error('server error')
				}
			})
			.catch(err =>{
				toast.error('an error occcured')
			})
		} else if(action === 'phone_number'){
			fetch(`${base_url}/updatenumber`,{
				method: 'PUT',
				headers: {
					authorization: 'bearer ' + token,
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					phone_number: phone_number
				})
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				if(data.message === 'phone_number updated'){
					console.log(data.message)
					history.push('/profile')
				} else {
					toast.error('server error')
				}
			})
			.catch(err =>{
				toast.error('an error occured')
			})
		}
	}

	return(
		<>
		<AppBar position="fixed" color='gray'>                                                          <Toolbar>
                <Typography variant='h6'> My account </Typography>                                                </Toolbar></AppBar><Toolbar />

		<Button component='label'>
		<Avatar /> Choose pic 
		<input hidden type='file'
		onChange={ (e)=>{ setPhoto(e.target.files[0]) } }
		/></Button>
		<Button onClick={ ()=>{update('photo')}}> 
		update</Button>
		<input placeholder='username'
		className='search_input' value={username}
                onChange={ (e)=>{ setUsername(e.target.value) } }                                               /><Button onClick={ ()=>{update('username')}}>                                                  update</Button>
		<input placeholder='email'
		className='search_input' value={email}
                onChange={ (e)=>{ setEmail(e.target.value) } }                                 
		/><Button onClick={ ()=>{update('email')}}>                                   
		update</Button>
		<input placeholder='phone number'
		className='search_input' value={phone_number}
                onChange={ (e)=>{ setPhone_number(e.target.value) } }                         
		/><Button onClick={ ()=>{update('phone_number')}}>                                              update</Button>
		</>
	)
}

export default Edit
