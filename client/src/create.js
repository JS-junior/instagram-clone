import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Typography, Card, AppBar, Toolbar,  CardMedia, CardContent, CardHeader, CardActionArea } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import AddBoxIcon from '@material-ui/icons/AddBox'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Components from './components.js'

function Create(){

        const [ caption, setCaption ] = useState("")


        return(
                <>
		<Components />
		<AppBar position="fixed" color='gray'>
		<Toolbar>
		<Typography variant='h6'> New post </Typography>
		</Toolbar></AppBar><Toolbar />
		<Card>
                <CardActionArea>
                <center>
                <CardMedia        
		image='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'     
		component='img'                                                                         style={{ height: 'auto', width: '50%' }}                            
		/></center>                                                                             <CardContent><center>
		<Button component='label'> select image
		<input hidden type='file' /></Button>
                <Typography variant='subtitle1'>
		{caption} 
                </Typography><br /></center>
		<input className='search_input'
		value={caption}
		onChange={ (e)=>{ setCaption(e.target.value) }}
		placeholder='add a caption' />
		<Typography variant='h6'> Tag people    
		<input className='search_input' placeholder='search' /></Typography> 
                </CardContent>
                </CardActionArea>
                </Card><br />
		<center><Button variant='contained'> upload </Button></center>

                </>
        )
}

export default Create 
