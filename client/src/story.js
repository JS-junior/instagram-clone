import React, { useState, useEffect, useRef, useContext  } from 'react'
import { Avatar, Button, Input } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import { State } from './state.js'
import jwt_decode from 'jwt-decode'
import Stories from 'react-insta-stories';

function Story(){

        const history = useHistory()
	const { id } = useParams()
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const [ stories, setStories ] = useState([])
	const [{ base_url }, dispatch ] = useContext(State)
	const [ user, setUser ] = useState([])

	useEffect(()=>{
		fetch(`${base_url}/story/${id}`,{
			method: 'GET',
			headers: { authorization: 'bearer ' + token }
			})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
			setStories(data)
		})
		.catch(err =>{
			console.log(err)
		})
	},[])

	return(                                                                                         <> 
	
		
		<Stories
			stories={stories}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
		</>                          
	)
}
export default Story
