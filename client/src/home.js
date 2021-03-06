import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Card, CardMedia, CardContent, CardHeader, CardActionArea,  AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import ReactDom from 'react-dom'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import AddBoxIcon from '@material-ui/icons/AddBox'
import Components from './components.js'
import { toast, ToastContainer } from 'react-toastify'
import Heart from "react-animated-heart";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { State } from './state.js'
import { actionTypes } from './reducer.js'
import { messaging } from './firebase.js'
import GroupIcon from '@material-ui/icons/Group';
import jwt_decode from 'jwt-decode'

function Home(){

	const [{ base_url }, dispatch ] = useContext(State)
	const [ posts, setPosts ] = useState([])
	const [ stories, setStories ] = useState([])
	const [ tags, setTags ] = useState([])
	const [ userPopup, setUserPopup ] = useState(false)
	const [ user, setUser ] = useState("")
	const [ isClick, setClick ] = useState(false)
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const history = useHistory()

	useEffect(()=>{
		const token = localStorage.getItem('jwt')
		if(!token){
			history.push('/login')
		} else {
			fetchPost()
			fetch(`${base_url}/user/${user_id._id}`,{
                                method: 'GET',
                                headers: { authorization: 'bearer ' + token }
                        })
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setUser(data.message.username)
                                console.log(data.message)
			})
			.catch(err =>{
                                console.log(err)
                        })
                
		}
	 },[])



			const fetchPost = ()=>{
			fetch(`${base_url}/subpost`,{
				method: 'GET',
				headers: { authorization: 'bearer ' + token }
			})
			.then(res =>{
				return res.json()
			})
			.then(data =>{
				setPosts(data.message)
				console.log(data.message)
			})
			.catch(err =>{
				console.log(err)
			})
		}

	const fetchTags = (id)=>{
                        fetch(`${base_url}/tags/${id}`,{
                                method: 'GET',
                                headers: { authorization: 'bearer ' + token }
                        })
                        .then(res =>{
                                return res.json()
                        })
                        .then(data =>{
                                setTags(data.message)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
                }


	useEffect(()=>{
                const token = localStorage.getItem('jwt')
		if(!token){
			history.push('/login')
		} else {
                        fetch(`${base_url}/substory`,{
				method: 'GET',
				headers: { authorization: 'bearer ' + token }
                        })
                        .then(res =>{
				return res.json()
                        })
				.then(data =>{
					setStories(data.message)
                                console.log(data.message)
                        })
                        .catch(err =>{
                                console.log(err)
                        })
                }
        },[])

	const unlikePost = (id)=>{

                fetch(`${base_url}/unlike`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
                        body: JSON.stringify({ id: id  })
       })
                        .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        if(data.message === 'unliked successfully'){
                        console.log(data)
                        fetchPost()
                        } else {
                                toast.error('error occured')
                        }
                })
        }

        const likePost = (id, notify)=>{
                fetch(`${base_url}/like`,{
                        method: 'PUT',
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
			body: JSON.stringify({ id: id, notifyId: notify })
      })

                        .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        if(data.message === 'liked successfully'){
                        console.log(data)
                        fetchPost()
                        } else {
                                toast.error('error occured')
                        }
                })
        }


	function UsersModal(){

                return ReactDom.createPortal(
                        <>
                        {!userPopup ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Tagged users </Typography>
                                <center>
                        {tags.map((val, index)=>{
                                return(
                                        <>
                <div className='adduser_modal'>
                <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
                <Button className='adduser_modal_username'>{val.username}</Button>
                </div><br />
                                        </>
                                )
                        })}
                 </center>
                <Button onClick={()=>{ setUserPopup(false) }}> close </Button>
                </div></div>}

                        </>, document.getElementById('modal')
                )
        }

	return(
		<>
		<Components />
		<UsersModal />
		<ToastContainer />
		<div className='appbar_home'>
		<AddBoxIcon 
		onClick={ ()=>{ history.push('/createstory')  }} 
		className='appbar_home_create_icon' />
		<center>
		<img 
src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'  
	className='insta_logo_png' />
	</center>
	<ForumRoundedIcon onClick={ ()=>{ history.push(`/room/${user_id._id}`)}}
	className='messenger_icon' />
		</div>

		<div className='stories_container'>
		{stories.map((val,index)=>{
			return(
				<>
		<Avatar className='story_avatar'
		onClick={()=>{ history.push(`/story/${val.postedBy._id}`) }}
		src={`${base_url}/${val.postedBy.photo}`} />
				</>
			)
				})}
		</div>
		
		{posts.map((val, index)=>{
			return(
				<>
		<Card>
		<CardHeader 
		title={<Typography variant='h6'> {val.postedBy.username} </Typography>}
		avatar={<Avatar src={`${base_url}/${val.postedBy.photo}`} />}
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
		<Typography variant='subtitle1'>
			{val.caption}
		</Typography><br /></center>
		{val.likes.includes(user_id._id) ?  <Heart isClick={true}
                onClick={ ()=>{ unlikePost(val._id) }}
                className='navbar_icons'  />
                : <Heart isClick={false}
                onClick={ ()=>{ likePost(val._id, val.postedBy._id) }}
                className='navbar_icons' />
                } 
<ChatRoundedIcon onClick={ ()=>{ history.push(`/comments/${val._id}/${val.postedBy._id}`) }}
		className='navbar_icons' />

		<GroupIcon className='navbar_icons'
		onClick={()=>{ fetchTags(val._id); setUserPopup(true) }} />
		<ShareIcon onClick={ ()=>{ 
		
	if (navigator.canShare) {
				navigator.share({
					title: val.postedBy.username,
					text: val.caption,
				})
					.then(() => console.log('Share was successful.'))
					.catch((error) => console.log('Sharing failed', error))
			} else {
				console.log(`Your system doesn't support sharing files.`);
			}
		}}
		className='navbar_icons' /><br />
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

export default Home
