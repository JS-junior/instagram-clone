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

	const files = [
		'https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODMzMTd8MHwxfHNlYXJjaHwyfHxDb2Rpbmd8ZW58MHwyfHx8MTYyMjM4MTQ5OQ&ixlib=rb-1.2.1&q=80&w=1080',
		'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODMzMTd8MHwxfHNlYXJjaHwxfHxDb2Rpbmd8ZW58MHwyfHx8MTYyMjM4MTQ5OQ&ixlib=rb-1.2.1&q=80&w=1080',
		'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODMzMTd8MHwxfHNlYXJjaHw1fHxDb2Rpbmd8ZW58MHwyfHx8MTYyMjM4MTQ5OQ&ixlib=rb-1.2.1&q=80&w=1080',
		'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODMzMTd8MHwxfHNlYXJjaHw0fHxDb2Rpbmd8ZW58MHwyfHx8MTYyMjM4MTQ5OQ&ixlib=rb-1.2.1&q=80&w=1080',{
			url: 'http://www.sololearn.com/uploads/video.ogg',
			type: 'video'
		}
	]


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
			stories={files}
			defaultInterval={1500}
			width={432}
			height={768}
		        onAllStoriesEnd={()=>{ history.push('/') }}
		/>
		</>                 
	)
}
export default Story
