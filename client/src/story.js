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
	const [ stories, setStories ] = useState([{ url:
		'https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODMzMTd8MHwxfHNlYXJjaHwyfHxDb2Rpbmd8ZW58MHwyfHx8MTYyMjM4MTQ5OQ&ixlib=rb-1.2.1&q=80&w=1080', profileImage: 'http://localhost:8080/2021-06-04T12:54:48.357Zimages (5).jpeg'}])
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
			setStories(data.message)
		
		/*	setStories(data.message.map(val =>({
				url: val.url
			})))
			*/

			console.log(stories)
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
		        onAllStoriesEnd={()=>{ history.push('/') }}
		/>
		</>                 
	)
}
export default Story
