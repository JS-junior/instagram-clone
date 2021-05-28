import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'

function Login(){

	const history = useHistory()
	const [ username, setUsername ] = useState("")                                 
	const [ email, setEmail ] = useState("")
	const [ phone_number, setPhone_number ] = useState("")
        const [ password, setPassword ] = useState("")
        
        return(
                <>
		<center>
                <Typography variant='subtitle3'> India </Typography> <br />
                <img
src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token
=076d4f57-316e-4bf8-a072-31c0db80cf8b'
style={{ height: 'auto', width: '50%' }}
                />

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
                                                                                                        <Button variant='contained'
                className='signup_button'> login  </Button>
                <br />
                <Button className='login_btn'
                onClick={()=>{ history.push('/signup') }}>
                Don't have an account? sign up 
		</Button>
                <br />
                <Typography variant='h6'>
		Terms and conditions </Typography>
                </center>
                </>
        )
}

export default Login
