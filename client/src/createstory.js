import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar,Button, Input, Typography, AppBar, Toolbar, Card, CardHeader, CardActionArea, CardContent } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './App.css'
import { State } from './state.js'
import { ToastContainer, toast } from 'react-toastify'

function CreateStory(){

	const history = useHistory()
	const token = localStorage.getItem('jwt')
	const user_id = jwt_decode(token)
	const [{ base_url }, dispatch ] = useContext(State)
	const [ photo, setPhoto ] = useState({})
	const [ media, setMedia ] = useState("")
	const [ user, setUser ] = useState([])
	
	const fileInput = useRef()

	const loadFile = function(event) {                                                                      const reader = new FileReader();
                reader.onload = function(){
                        fileInput.current.src = reader.result;                                                  }
                reader.readAsDataURL(event.target.files[0]);                                                    setPhoto(event.target.files[0])
		console.log(event.target.files[0])
        }

	useEffect(()=>{
		fetch(`${base_url}/user/${user_id._id}`,{
			method: 'GET',
                        headers: { authorization: 'bearer ' + token }
                })
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
	},[])

	const post = ()=>{

		const form = new FormData()
                form.append('photo', photo)          

                fetch(`${base_url}/story`,{                                                                             method: 'POST',
                        headers: { authorization: 'bearer ' + token },                                                  body: form                                                                              })
                .then(res =>{                                                                                           return res.json()                                                                       })
                .then(data =>{
                        if(data.message === 'story created successfully'){
				console.log(data.message)
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

	return(
		<>

		<AppBar position="fixed" color='gray'>
                <Toolbar>
                <Typography variant='h6'> story </Typography>
		</Toolbar></AppBar><Toolbar />                                                                  <ToastContainer />
		<Card>                                                                                          <CardActionArea>
                <center>                                                                                        <img src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-0000.appspot.com/o/Instagram-Logo.png?alt=media&token=076d4f57-316e-4bf8-a072-31c0db80cf8b'
  style={{ height: 'auto', width: '50%'}}  ref={fileInput} />                                                   </center>                                                                             <CardContent><center>
                <Button component='label'> select image
        <input hidden type='file'  onChange={loadFile} /></Button>
		<Typography variant='h6'> Tag people                                                            <input className='search_input' placeholder='search' /></Typography>   
		</center>
		</CardContent>                                                                                  </CardActionArea>                                                                               </Card><br />
		<center><Button onClick={post} variant='contained'> upload </Button></center>

		</>
	)
}

export default CreateStory
