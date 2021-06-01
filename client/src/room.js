import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Avatar, Button, CardActionArea, AppBar, Toolbar, Input, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import './App.css'
import { State } from './state.js'

function Rooms(){

        const [ rooms, setRooms ] = useState([])
        const history = useHistory()
	const { id } = useParams()
        const [{ base_url, username }, dispatch ] = useContext(State)
	const [ term, setTerm ] = useState("")
        const token = localStorage.getItem('jwt')
        const user_id = jwt_decode(token)

        return(
                <>
		<AppBar>
		<Toolbar><Typography variant='h6'>{username}</Typography></Toolbar>

		<input className='search_input' value={term}
		onChange={ (e)=>{ setTerm(e.target.value) }} />
		</AppBar><Toolbar />
                </>
        )
}

export default Rooms
