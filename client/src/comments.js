import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, AppBar, Toolbar, Card, CardMedia, CardHeader, CardActionArea, CardContent } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import { State } from './state.js'
import jwt_decode from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'

function Comments(){

        const history = useHistory()
        const { id } = useParams()
	const token = localStorage.getItem('jwt')
	const [{ base_url }, dispatch ] = useContext(State)
	const [ comment, setComment ] = useState("")
	const [ comments, setComments ] = useState([])
	const user_id = jwt_decode(token)


	const fetchPost = ()=>{
		fetch(`${base_url}/comments/${id}`,{
			method: 'GET',
			headers: { authorization: 'bearer ' + token }
		})
		.then(res =>{
			return res.json()
		})
		.then(data =>{
			console.log(data)
			setComments(data.message)
		})
		.catch(err =>{
			console.log(err)
		})
	}

	useEffect(()=>{                                                                                         fetchPost()                                                                             },[])

	const commentPost = ()=>{                                                                             fetch(`${base_url}/comment`,{
                        method: 'PUT',                                                                                  headers: {                                                                                              authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
                        body: JSON.stringify({ comment: comment, id: id })
                })                                                                                              .then(res =>{
                        return res.json()                                                                       })                                                                                              .then(data =>{
                        if(data.message  === 'comment posted successfully'){
                        console.log(data)
                        toast.success(data.message)
                        } else {                                                                                                toast.error('error occured')                                                            }                                                                                       })                                                                                      }




	return(                                                                                         <>
		<AppBar position="fixed" color='gray'>
                <Toolbar>
                <Typography variant='h6'> New post </Typography>
                </Toolbar></AppBar><Toolbar />
                <ToastContainer />
		{comments.map((post, index)=>{
			return(
				<>
			
				{post.comments.map((val,index)=>{
					return(
						<>
			<Card>
			<CardHeader
			avatar={<Avatar src={`${base_url}/${val.postedBy.photo}`} />}
		title={<Typography variant='h6'>{val.postedBy.username}</Typography>}
			subheader={<Typography variant='subtitle6'>{val.text}</Typography>}
			/></Card>
			<br /> <br /> <br /> <br /> <br />
			
						</>
					)
				})}
				</>
			)
		})}
			<input className='search_input' value={comment}
				onChange={ (e)=>{ setComment(e.target.value) }}
				/>
			<Button onClick={commentPost}> post </Button>
	</>
        )
}
export default Comments
