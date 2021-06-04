import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, Card, CardMedia, CardContent, Menu, MenuItem, CardActionArea, CardHeader } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import GroupIcon from '@material-ui/icons/Group';                                               import ReactDom from 'react-dom'
import Components from './components.js'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';         
import ShareIcon from '@material-ui/icons/Share';                                  
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import SettingsIcon from '@material-ui/icons/Settings';
import jwt_decode from 'jwt-decode'
import { State } from './state.js'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { toast, ToastContainer } from 'react-toastify'
import Heart from 'react-animated-heart'

function User(){

	const { id } = useParams()
	const history = useHistory()
	const [ user, setUser ] = useState([])
	const [ open, setOpen ] = useState(false)
	const token = localStorage.getItem('jwt')
	const decoded = jwt_decode(token)
	const [{ base_url }, dispatch ] = useContext(State)
	const [ posts, setPosts ] = useState([])
	const [ followers, setFollowers ] = useState([])
	const [ followings, setFollowings ] = useState([])
	const [ tags, setTags ] = useState([])
        const [ userPopup, setUserPopup ] = useState(false)
        const logout = ()=>{ localStorage.removeItem('jwt'); history.push('/signup') }

	useEffect(()=>{
		const token = localStorage.getItem('jwt');

                if(!token){
                        history.push('/login')
		} else {
			fetchUser()
                }
	},[])
			const fetchUser = ()=>{
                        console.log(token)
                        fetch(`${base_url}/user/${id}`,{
                                headers: {
                                        authorization: 'bearer ' + token
                                }})
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setUser(data.message)
                                console.log(data.message)
				setFollowers(data.message.followers)
				setFollowings(data.message.followings)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
                }
	

	const likePost = (uid, notify)=>{
		fetch(`${base_url}/like`, {
			method: 'PUT',
			headers: { authorization: 'bearer ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: uid, notifyId: notify })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'liked successfully'){
				console.log(data.message)
				fetchPost()
			} else {
				toast.error('an error occured')
			}
		})
		.catch(err =>{
			toast.error('client error')
		})
	}

	const unlikePost = (uid)=>{
		fetch(`${base_url}/unlike`,{
			method: 'PUT',
			headers: {
				authorization: 'bearer ' + token,
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ id: uid })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'unliked successfully'){
				console.log(data.message)
				fetchPost()
			} else {
				toast.error('server error')
			}
		})
		.catch(err =>{
			toast.error('client error')
		})
	}

	const fetchPost = ()=>{
                const token = localStorage.getItem('jwt')
                const decoded = jwt_decode(token)
                fetch(`${base_url}/posts/${id}`,{
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

	const follow = (uid)=>{
		fetch(`${base_url}/follow`,{
			method: 'PUT',
			headers: {
				authorization: 'bearer ' + token,
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ id: uid })
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'follow successfully'){
				console.log(data.message)
				toast.success(data.message)
				fetchUser()
			} else {
				toast.error('server error')
			}
		})
		.catch(err =>{
			toast.error('client error')
		})
	}

	const unfollow = (uid)=>{
		fetch(`${base_url}/unfollow`,{
			method: 'PUT',
			body: JSON.stringify({ id: uid }),
			headers : {
				authorization: 'bearer ' + token,
				'Content-Type' : 'application/json'
			}
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'unfollow successfully'){
				toast.success(data.message)
				console.log(data.message)
				fetchUser()

			} else {
				toast.error('server error')
			}
		})
		.catch(err =>{
			toast.error('client error')
		})
	}

	function UsersModal(){

                return ReactDom.createPortal(
                        <>                                                                                              {!userPopup ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Tagged users </Typography>
                                <center>
                        {tags.map((val, index)=>{
                                return(                                                                                                 <>
                <div className='adduser_modal'>                                                                 <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
                <Button className='adduser_modal_username'>{val.username}</Button>
                </div><br />
                                        </>
                                )
                        })}
                 </center>
                <Button onClick={()=>{ setUserPopup(false) }}> close </Button>                                  </div></div>}

                        </>, document.getElementById('modal')
                )
        }

	const fetchTags = (uid)=>{
                        fetch(`${base_url}/tags/${uid}`,{
                                method: 'GET',                                                                                  headers: { authorization: 'bearer ' + token }                                           })                                                                                              .then(res =>{
                                return res.json()
                        })
                        .then(data =>{                                                                                          setTags(data.message)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
                }


        useEffect(()=>{
                fetchPost()
        },[posts])


        
        return(
                <>
		<Components />
		<UsersModal />
		<ToastContainer />

		<div className='appbar_profile'>
                <Typography variant='h6'> {user.username} </Typography>
                <Avatar src={`${base_url}/${user.photo}`} />
                <div className='appbar_profile_info'>                                                                                                <Typography
                className='appbar_profile_head'
                id='follower_text'
                variant='h6'> {followers.length}</Typography>
                <Typography
                id='following_text'
                className='appbar_profile_head'
                variant='h6'>{followings.length}</Typography> <br />
                <Typography
                className='appbar_profile_text'
                variant='subtitle5'> Followers </Typography>
                <Typography
                className='appbar_profile_text'                                                                                                 
		variant='subtitle5'> Followings </Typography>
                </div>                                                                                                                          
		<Typography variant='h6'> {user.username}</Typography>
                <Typography variant='subtitle3'> my bio </Typography><br />                                     <center>
		{followers.includes(decoded._id) ? 
                <Button onClick={ ()=>{ unfollow(user._id) }}> unfollow </Button>:
		<Button onClick={ ()=>{ follow(user._id) }}> follow </Button>}
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
		{val.likes.includes(decoded._id) ?  <Heart isClick={true}
                onClick={ ()=>{ unlikePost(val._id) }}
                className='navbar_icons'  />
                : <Heart isClick={false}
                onClick={ ()=>{ likePost(val._id, val.postedBy._id) }}
                className='navbar_icons' />
                }
                <ChatRoundedIcon
                onClick={ ()=>{ history.push(`/comments/${val._id}`)}}
                className='navbar_icons' />
                <ShareIcon className='navbar_icons' />
		<GroupIcon className='navbar_icons'
                onClick={()=>{ fetchTags(val._id); setUserPopup(true) }} />
		<br />
		<span style={{ marginLeft: '13%',fontWeight: '600'}}> {val.likes.length}</span>
	
		</CardContent>
		</CardActionArea>
                </Card>
                </>
			)
		})}

		<br /><br /><br />
		</>
        )
}



export default User
