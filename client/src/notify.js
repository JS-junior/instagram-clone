import React, { useState, useEffect, useRef, useContext } from 'react';
import { Avatar, Button, Input, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import './App.css'
import Components from './components.js'
import { State } from './state.js'
import jwt_decode from 'jwt-decode'
function Notify (){

	const history = useHistory()
	const [ notification, setNotification ] = useState([])
	const [{ base_url }, dispatch ] = useContext(State)

	useEffect(()=>{
                const token = localStorage.getItem('jwt');
		const decoded = jwt_decode(token)

		if(!token){
                        history.push('/login')
                } else {
                        fetch(`${base_url}/notification`,{
				method: 'GET',
				headers: { authorization: 'bearer ' + token },
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				console.log(data)
				setNotification(data.message)
			})
			.catch(err =>{
				console.log(err)
			})
                }
        },[])

        return(
                <>
		<Components />
		<Typography variant='h6'> Activity </Typography>

		{notification.map((val, index)=>{
			return(
				<>
		<div className='notification_bar'>
	<Avatar className='notification_text' src={`${base_url}/${val.triggeredBy.photo}`}
		id='notification_avatar'  /> 
		<Typography variant='subtitle5'>
		<Typography className='notification_text' id='notification_text'
		variant='h6'> {val.triggeredBy.username} </Typography> {val.message}
		</Typography>
		</div>
				</>
			)
		})}

                </>
        )
}

export default Notify
