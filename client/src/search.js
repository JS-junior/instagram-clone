import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography  } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import { State } from './state.js'
import Components from './components.js'

function Search(){

	const history = useHistory()
	const [ query, setQuery ] = useState("")
	const [{ base_url }, dispatch ] = useContext(State)
	const [ results, setResults ] = useState([])
	const token = localStorage.getItem('jwt')

	useEffect(()=>{
                const token = localStorage.getItem('jwt');
		if(!token){
                        history.push('/login')
                } else {
                        console.log('user accepted')
                }
        },[])

	const search = ()=>{
		fetch(`${base_url}/search/${query}`,{
			method: 'POST',
			body: JSON.stringify({ email: query.toLowerCase() }),
			headers: {
				authorization: 'bearer ' + token, 
				'Content-Type':'application/json'
			}
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
			setResults(data.message)
		})
		.catch(err =>{
			console.log(err)
		})
	}

	const refer = (id)=>{
		history.push(`/user/${id}`)
	}

        return(
                <>
	<Components />
	<input className='search_input'
	placeholder='search'
	value={query}
	onChange={ (e)=>{ setQuery(e.target.value); search() }} />

		{results.map((user, val) =>{
			return (
				<>
				<Avatar src={`${base_url}/${user.photo}`}/>
		<Typography onClick={()=>{ refer(user._id)}}
		variant='subtitle6'>{user.username}</Typography><br />
				</>
			)
		})}

                </>
        )
}

export default Search
