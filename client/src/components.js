import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDom from 'react-dom'
import { Avatar, Button, Input } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddBoxIcon from '@material-ui/icons/AddBox';
import jwt_decode from 'jwt-decode'
import { State } from './state.js'

function Components(){

	const history = useHistory()
	const [ user, setUser ] = useState([])
	const [{ base_url }, dispatch ] = useContext(State)
	useEffect(()=>{
                const token = localStorage.getItem('jwt');
                const decoded = jwt_decode(token)

                if(!token){
                        history.push('/login')
                } else {
			fetch(`${base_url}/user/${decoded._id}`,{ 
				headers: {
                                  authorization: 'bearer ' + token
                              }})
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setUser(data.message)
                                console.log(data.message)
                        })                                                                                              .catch(err =>{
                                console.log(err)
                        })
                }
        },[])

	return ReactDom.createPortal
        (
                <>
		
		<div className='navbar_container'>
		<HomeIcon
		onClick={()=>{ history.push('/')}}
		className='navbar_icons'  />
		<SearchIcon  
		onClick={()=>{ history.push('/search')}}
		className='navbar_icons' />
		<AddBoxIcon 
		onClick={()=>{ history.push('/create')}}
		className='navbar_icons' />
		<FavoriteBorderIcon
		onClick={()=>{ history.push('/notifications')}}
		className='navbar_icons' />
		<Avatar src={`${base_url}/${user.photo}`}
		onClick={()=>{ history.push('/profile')}}
		className='navbar_avatar' />
		</div>
                </>, document.getElementById('navbar_portal')
        )
}

export default Components
