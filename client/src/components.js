import React, { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import { Avatar, Button, Input } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddBoxIcon from '@material-ui/icons/AddBox';


function Components(){

	const history = useHistory()

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
		<Avatar 
		onClick={()=>{ history.push('/profile')}}
		className='navbar_avatar' />
		</div>
                </>, document.getElementById('navbar_portal')
        )
}

export default Components
