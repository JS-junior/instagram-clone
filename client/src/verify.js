import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Input,  Avatar, Button, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { State } from './state.js'
import { toast, ToastContainer } from 'react-toastify'
import './App.css'

function Verify(){

        const [ password, setPassword ] = useState("")
	const { id } = useParams()
        const history = useHistory()
        const [{ base_url }, dispatch ] = useContext(State)

        const reset = ()=>{
		fetch(`${base_url}/resetpass`,{
			method: 'PUT',
			headers: { 'Content-Type':'application/json' },
			body: JSON.stringify({ password: password, id: id })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{ 
			if(data.message === 'password updated'){
			toast.success('Your password has been reset! Try logging again')
			} else {
				toast.error('an error occured')
			}
		})
		.catch(err =>{
			toast.error('an error occured')
		})
	}

        return(
                <>
		<ToastContainer />
		<center>
		<Typography variant='h6'> Message from instagram clone </Typography>
		</center>
		<Typography variant='subtitle6'> Hello user, <br /> 
		got stuck?
		forgot your password? <br />
		we got you! <br />
		Just type your new password here and login again 🙂</Typography>
		<center>
		<Input value={password} onChange={(e)=>{ setPassword(e.target.value) }} />
		<Button onClick={reset}> reset </Button><br /><br /><br />
		<Typography variant='subtitle5'> Hope it will help you, 😊</Typography>
		</center>
                </>
        )
}

export default Verify
