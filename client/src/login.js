import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import { State } from './state.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './modal.js'

function Login(){

	const history = useHistory()
	const [ username, setUsername ] = useState("")                                 
	const [ email, setEmail ] = useState("")
	const [ phone_number, setPhone_number ] = useState("")
        const [ password, setPassword ] = useState("")
	const [{ base_url }, dispatch ] = useContext(State)
	const [ open, setOpen ] = useState(false)

	const login = ()=>{

		fetch(`${base_url}/login`,{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ email: email, password: password })
		})
		.then(res =>{
			return res.json()

		})
		.then(data =>{
			if(data.message === 'no account found'){
			toast.error('Invalid credentials')
			} else {
			console.log(data)
			toast.success('login successful')
			localStorage.setItem('jwt', data.message)
			history.push('/')
			}
		})
		.catch(err =>{
			console.log(err)
		})
	}
        
        return(
                <>
		<center>
                <Typography variant='subtitle3'> India </Typography> <br />
                <img
src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'
style={{ height: 'auto', width: '50%' }}
                />

        <ToastContainer />
		<Modal open={open} success={ ()=>{ toast.success('check your mail') }}
		onClose={()=>{ setOpen(false) }} />
                <input
                className='search_input'
                placeholder='username'
                value={username}
                onChange={ (e)=>{ setUsername(e.target.value) }} />

                <input
                className='search_input'
                placeholder='email'
                value={email}
                onChange={ (e)=>{ setEmail(e.target.value) }} />

                <input
                className='search_input'
                placeholder='password'
                value={password}
                onChange={ (e)=>{ setPassword(e.target.value) }} />

                <input
                placeholder='phone number'
                className='search_input'
                value={phone_number}
                onChange={ (e)=>{ setPhone_number(e.target.value) }} />

                <br />
                                                                                                        <Button variant='contained' onClick={login}
                className='signup_button'> login  </Button>
                <br />
                <Button className='login_btn'
                onClick={()=>{ history.push('/signup') }}>
                Don't have an account? sign up 
		</Button><Button onClick={()=>{ setOpen(true)}}> forgot password </Button>
                <br />
                <Typography variant='h6'>
		Terms and conditions </Typography>
                </center>
                </>
        )
}

export default Login
