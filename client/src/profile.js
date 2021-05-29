import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, Card, Menu, MenuItem, CardMedia, CardContent,  CardActionArea, CardHeader } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';               
import ShareIcon from '@material-ui/icons/Share';                                     
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import SettingsIcon from '@material-ui/icons/Settings';
import { State } from './state.js'
import { actionTypes } from './reducer.js'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Profile(){

	const history = useHistory()
	const [{ base_url }, dispatch ] = useContext(State)
	const [ open, setOpen ] = useState(false)
	const [ user, setUser ] = useState([])

	const openModal = ()=> setOpen(true)
	const closeModal = ()=> setOpen(false)
	const logout = ()=>{ localStorage.removeItem('jwt'); history.push('/signup') }

	useEffect(()=>{

		const token = localStorage.getItem('jwt');
        
		if(!token){
                        history.push('/login')
                } else if(token){

                const decoded = jwt_decode(token)
			console.log(token)
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
			})
			.catch(err =>{
				console.log(err)
			})		
                }
        },[])

        return(
                <>
		<Components />
		{!open ?
		<SettingsIcon className='settings_icon' 
			onClick={openModal} />
			:
		<SettingsIcon className='settings_icon' 
			onClick={closeModal} />
		}


		<div className='appbar_profile'>
		<Typography variant='h6'> {user.username} </Typography>
		<Avatar src={`${base_url}/${user.photo}`} />
		<div className='appbar_profile_info'>
		<Typography
                className='appbar_profile_head'      
		id='follower_text'
		variant='h6'>  </Typography>
                <Typography          
		id='following_text'
		className='appbar_profile_head'                                                         variant='h6'> </Typography> <br />
		<Typography
		className='appbar_profile_text'
		variant='subtitle5'> Followers </Typography>
		<Typography 
		className='appbar_profile_text'
		variant='subtitle5'> Followings </Typography>
		</div>
		<Typography variant='h6'> {user.username}</Typography>
		<Typography variant='subtitle3'> my bio </Typography><br />
		<center>
		<Menu open={open} onClose={closeModal}>
		<MenuItem><Button variant='contained'>account</Button> </MenuItem>
		<MenuItem><Button onClick={logout}
		variant='contained'>logout</Button> </MenuItem>
		<MenuItem><Button
		variant='contained'> dark mode
		</Button> </MenuItem>
		<MenuItem><Button variant='contained'>terms and conditions </Button> 
		</MenuItem>
		</Menu>
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
