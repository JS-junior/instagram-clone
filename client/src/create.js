import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, Card, AppBar, Toolbar,  CardMedia, CardContent, CardHeader, CardActionArea } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import ReactDom from 'react-dom'
import './App.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import AddBoxIcon from '@material-ui/icons/AddBox'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { State } from './state.js'
import Components from './components.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create(){

        const [ caption, setCaption ] = useState("")
	const [ photo, setPhoto ] = useState({})
	const [ users, setUsers ] = useState([])
	const [ friends, setFriends ] = useState([])
	const [ results, setResults ] = useState([])
	const [ query, setQuery ] = useState("")
	const fileInput = useRef()
	const history = useHistory()
	const [ userPopup, setUserPopup ] = useState(false)
	const [{ base_url }, dispatch ] = useContext(State)
	const token = localStorage.getItem('jwt')

	const loadFile = function(event) {
		const reader = new FileReader();
		reader.onload = function(){
			fileInput.current.src = reader.result;
		}
		reader.readAsDataURL(event.target.files[0]);
		setPhoto(event.target.files[0])
	}

	const post = ()=>{

		const form = new FormData()
		form.append('photo', photo)
		form.append('caption', caption)
		form.append('tags', users)

		fetch(`${base_url}/post`,{
			method: 'POST',
			headers: { authorization: 'bearer ' + token },
			body: form
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			if(data.message === 'post created successfully'){
				console.log(data)
				toast.success(data.message)

			} else {
				toast.error('server error, try again')
			}
		})
		.catch(err =>{
			console.log(err)
			toast.error('error occured')
		})
		}

	useEffect(()=>{
                const token = localStorage.getItem('jwt');
		if(!token){
                        history.push('/login')
                } else {
			console.log('user accepted')
                }
        },[])


	function UsersModal(){

                return ReactDom.createPortal(
                        <>
                        {!userPopup ? null :
                <div className='outer_modal'>
                <div className='inner_modal'>
                <Typography variant='h6'> Total users </Typography>
                                <center>
                        {friends.map((val, index)=>{
                                return(
                                        <>
                <div className='adduser_modal'>
                <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.image}`} />
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

	const search = ()=>{
                fetch(`${base_url}/search/${query}`,{
                        method: 'POST',
                        body: JSON.stringify({ email: query.toLowerCase() }),
                        headers: {
                                authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        }
                })
                .then(res =>{
                        return res.json()
                })
                .then(data =>{
                        console.log(data)
                        setResults(data.message)
                })
                .catch(err =>{
                        console.log(err)
                })
        }

	const adduser = (id, username, image) =>{
		setUsers((prevdata)=>{
			return [...prevdata, id] 
		})
		console.log(users)

		const user = {
			username: username,
			image: image
		}

		setFriends((prevdata)=>{
			return [...prevdata, user]
		})
	}

        return(
                <>
		<Components />
		<UsersModal />
		<AppBar position="fixed" color='gray'>
		<Toolbar>
		<Typography variant='h6'> New post </Typography>
		</Toolbar></AppBar><Toolbar />
		<ToastContainer />
		<Card>
                <CardActionArea>
                <center>
		<img src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'                 style={{ height: 'auto', width: '50%'}}  ref={fileInput} />
		</center>                                                                             <CardContent><center>
		<Button component='label'> select image
	<input hidden type='file'  onChange={loadFile} /></Button>
                <Typography variant='subtitle1'>
		{caption} 
                </Typography><br /></center>
		<input className='search_input'
		value={caption}
		onChange={ (e)=>{ setCaption(e.target.value) }}
		placeholder='add a caption' />
		<Typography variant='h6'> Tag people    
		<input className='search_input' value={query} placeholder='search' 
		onChange={(e)=>{ setQuery(e.target.value); search()}}/></Typography> 
		{results.map((val, index)=>{
			return(
				<>
		{users.includes(val._id) ? null : <>
	    <Avatar className='adduser_modal_avatar' src={`${base_url}/${val.photo}`} />
                <Button className='adduser_modal_username'>{val.username}</Button><br />
                <AddBoxIcon onClick={()=>{ adduser(val._id, val.username, val.photo) }} />
			</>}
				</>
			)
		})}
                </CardContent>
                </CardActionArea>
                </Card><br />
		<center><Button onClick={post} variant='contained'> upload </Button>
		<br /><Button onClick={()=>{ setUserPopup(true) }}> selected users </Button>
		</center>
		<br /><br /><br /><br />
                </>
        )
}

export default Create 
