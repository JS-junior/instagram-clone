import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Avatar, Button, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { State } from './state.js'

function Rooms(){

        const [ rooms, setRooms ] = useState([])
        const history = useHistory()
	const { id } = useParams()
        const [{ base_url }, dispatch ] = useContext(State)
        const token = localStorage.getItem('jwt')
        const user_id = jwt_decode(user_id)

        return(
                <>


                </>
        )
}

export default Rooms
