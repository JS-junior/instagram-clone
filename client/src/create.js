import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, Card, AppBar, Toolbar,  CardMedia, CardContent, CardHeader, CardActionArea } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
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
	const fileInput = useRef()
	const history = useHistory()
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

        return(
                <>
		<Components />
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
		<input className='search_input' placeholder='search' /></Typography> 
                </CardContent>
                </CardActionArea>
                </Card><br />
		<center><Button onClick={post} variant='contained'> upload </Button></center>
		<br /><br /><br /><br />
                </>
        )
}

export default Create 
