import React, { useState, useEffect, useRef, useContext } from 'react'    
import ReactDom from 'react-dom'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Input, Avatar, Button, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import './App.css'
import { State } from './state.js'

function Modal({ open, onClose, success }){

        const history = useHistory()
        const [{ base_url }, dispatch ] = useContext(State)
	const [ email, setEmail ] = useState("")

	const forgotpass = ()=>{
		fetch(`${base_url}/forgotpass`,{
			method: 'POST',
			headers: { 'Content-Type':'application/json' },
			body: JSON.stringify({ email: email })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'check your mail'){
				onClose()
				success()
			} else {
				console.log('server error')
			}
		})
		.catch(err =>{
			console.log(err)
		})
	}
	
        return ReactDom.createPortal(
                <>
		{!open ? null :
		<div className='outer_modal'>
		<div className='inner_modal'>
		<Typography variant='h6'>
		Hey, type your email  </Typography>
		<Input style={{ display: 'inline-block' }}
		value={email} onChange={(e)=>{ setEmail(e.target.value)}} />
		<Button style={{ display: 'inline-block'  }}
		onClick={forgotpass}> verify  </Button>
		</div></div>
		}

                </>, document.getElementById('modal')
        )
}

export default Modal
