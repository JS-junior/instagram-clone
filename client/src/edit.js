import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Avatar, Card, CardActionArea, CardMedia, CardHeader, CardContent, AppBar, Grid, Menu, MenuItem, Input, Typography } from '@material-ui/core'
import './App.css'
import { State } from './state.js'
import jwt_decode from 'jwt-decode'

function Edit(){

	const { id } = useParams()
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const [{ base_url }, dispatch ] = useContext(State)

	return(
		<>


		</>
	)
}

export default Edit
