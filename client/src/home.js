import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Card, CardMedia, CardContent, CardHeader, CardActionArea,  AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import AddBoxIcon from '@material-ui/icons/AddBox'
import Components from './components.js'


function Home(){

 
	return(
		<>
		<Components />

		<div className='appbar_home'>
		<AddBoxIcon className='appbar_home_create_icon' />
		<center>
		<img 
src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'  
	className='insta_logo_png' />
	</center>
	<ForumRoundedIcon className='messenger_icon' />
		</div>
		



		<Card>
		<CardHeader 
		title={<Typography variant='h6'> Instagram Clone </Typography>}
		avatar={<Avatar src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b' />}
		subheader='posted on 28 june 2021'
		/>
		<CardActionArea>
		<center>
		<CardMedia 
		image='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'
		component='img'
		style={{ height: 'auto', width: '50%' }} 
		/></center>
		<CardContent><center>
		<Typography variant='subtitle1'>
		Building instagram clone, wish me
		</Typography><br /></center>
		<FavoriteBorderIcon className='navbar_icons'  />
		<ChatRoundedIcon className='navbar_icons' />
		<ShareIcon className='navbar_icons' />
		</CardContent>
		</CardActionArea>
		</Card>
		</>
	)
}

export default Home
