import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Typography, Card, CardMedia, CardContent,  CardActionArea, CardHeader } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';                     import ShareIcon from '@material-ui/icons/Share';                                       import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import SettingsIcon from '@material-ui/icons/Settings';

function Profile(){

        

        return(
                <>
		<Components />
		<SettingsIcon className='settings_icon' />

		<div className='appbar_profile'>
		<Typography variant='h6'> Little_champ.Jr </Typography>
		<Avatar />
		<div className='appbar_profile_info'>
		<Typography
                className='appbar_profile_head'      
		id='follower_text'
		variant='h6'> 923 </Typography>
                <Typography          
		id='following_text'
		className='appbar_profile_head'                                                         variant='h6'> 66 </Typography> <br />
		<Typography
		className='appbar_profile_text'
		variant='subtitle5'> Followers </Typography>
		<Typography 
		className='appbar_profile_text'
		variant='subtitle5'> Followings </Typography>
		</div>
		<Typography variant='h6'> Little_champ.Jr</Typography>
		<Typography variant='subtitle3'> my bio </Typography><br />
		<center>
		<Button> edit profile </Button>
		</center>
		</div>



		<Card>
                <CardHeader
                title={<Typography variant='h6'> Instagram Clone </Typography>}
                avatar={<Avatar src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b' />}
                subheader='posted on 28 june 2021'
                />
                <CardActionArea>
                <center>                                                                                <CardMedia
                image='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'
                component='img'
                style={{ height: 'auto', width: '50%' }}
                /></center>                                                                             <CardContent><center>                                                                   <Typography variant='subtitle1'>
                Building instagram clone, wish me
                </Typography><br /></center>
                <FavoriteBorderIcon
		onClick={ ()=>{ console.log('hi')}}
		className='navbar_icons'  />
                <ChatRoundedIcon 
		onClick={ ()=>{ console.log('hi')}}
		className='navbar_icons' />
                <ShareIcon className='navbar_icons' />
                </CardContent>
                </CardActionArea>                                                                       </Card>

                </>
        )
}

export default Profile
