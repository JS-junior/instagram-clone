import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, Card, Menu, MenuItem, CardMedia, CardContent,  CardActionArea, CardHeader } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';               
import ShareIcon from '@material-ui/icons/Share';                                     
import DeleteIcon from '@material-ui/icons/Delete';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import SettingsIcon from '@material-ui/icons/Settings';
import { State } from './state.js'
import { actionTypes } from './reducer.js'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Profile(){

	const history = useHistory()
	const [{ base_url }, dispatch ] = useContext(State)
	const [ open, setOpen ] = useState(false)
	const [ user, setUser ] = useState([])
	const [ posts, setPosts ] = useState([])
	const [ comment, setComment ] = useState("")
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const openModal = ()=> setOpen(true)
	const closeModal = ()=> setOpen(false)
	const logout = ()=>{ localStorage.removeItem('jwt'); history.push('/signup') }

	const deletePost = (id)=>{
		fetch(`${base_url}/post/${id}`,{
			method: 'DELETE',
			headers: { authorization : 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
		})
		.catch(err =>{
			console.log(err)
			toast.error('an error occured, try again')
		})
	}


	        const unlikePost = (id)=>{
		
		fetch(`${base_url}/unlike`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'                                                       },
                        body: JSON.stringify({ id: id  })                                              })                                                              
			.then(res =>{
                        return res.json()
                })
                .then(data =>{
                        if(data.message === 'unliked successfully'){
                        console.log(data)
                        toast.success('likwd')
			fetchPost()
                        } else {
                                toast.error('error occured')
                        }
		})
	}

	const likePost = (id)=>{
		fetch(`${base_url}/like`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'                                                       },
                        body: JSON.stringify({ id: id })                                              })                                                                                            
			.then(res =>{
                        return res.json()
                })
                .then(data =>{
                        if(data.message === 'liked successfully'){
                        console.log(data)
                        toast.success(data.message)
			fetchPost()
                        } else {
                                toast.error('error occured')
                        }
		})
	}


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

		const fetchPost = ()=>{
		const token = localStorage.getItem('jwt')
		const decoded = jwt_decode(token)
		fetch(`${base_url}/posts/${decoded._id}`,{
			method: 'GET',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
			setPosts(data.message)
		})
		.catch(err =>{
			console.log(err)
		})
	}
		
	useEffect(()=>{
		fetchPost()
	},[])


        return(
                <>
		<Components />
		<ToastContainer />
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
		className='appbar_profile_head'                                                  
		variant='h6'> </Typography> <br />
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
		<MenuItem><Button onClick={ ()=>{ history.push(`/edit/${user_id._id}`) }}
		variant='contained'>account</Button> </MenuItem>
		<MenuItem><Button onClick={logout}
		variant='contained'>logout</Button> </MenuItem>
		<MenuItem><Button
		variant='contained'> dark mode
		</Button> </MenuItem>
		<MenuItem><Button variant='contained'>terms and conditions </Button> 
		</MenuItem>
		</Menu>
		<Button onClick={ ()=>{ history.push(`/edit/${user_id._id}`) }}>
		 edit profile </Button>
		</center>
		</div>

		{posts.map((val, index)=>{
			return(
				<>
		<Card>
                <CardHeader
                title={<Typography variant='h6'> {val.postedBy.username} </Typography>}
                avatar={<Avatar src={`${base_url}/${val.postedBy.photo}`}/>}
                subheader={`posted on ${val.postedOn}`}
                />
                <CardActionArea>
                <center>                                                                       
		<CardMedia
                image={`${base_url}/${val.photo}`}
                component='img'
                style={{ height: 'auto', width: '50%' }}
                /></center>                                                                       
		<CardContent><center>                                                                  
		<Typography variant='subtitle1'>{val.caption}</Typography>
		<br /></center>
		{val.likes.includes(user_id) ?  <FavoriteIcon
		onClick={ ()=>{ unlikePost(val._id) }}
		className='navbar_icons'  />
		: <FavoriteBorderIcon
		onClick={ ()=>{ likePost(val._id) }}
		className='navbar_icons' />
		}

                <ChatRoundedIcon 
		onClick={ ()=>{ history.push(`/comments/${val.postedBy._id}`) }}
		className='navbar_icons' />
                <ShareIcon className='navbar_icons' />
		<DeleteIcon className='navbar_icons' 
		onClick={()=>{ deletePost(val._id) }} />
                </CardContent>
                </CardActionArea>                                                             
		</Card>
				</>
			)
			})}

                </>
        )
}

export default Profile
