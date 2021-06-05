import React, { useState, useEffect, useRef, useContext } from 'react'
import { Avatar, Button, Input, Typography, AppBar, Toolbar, Card, CardMedia, CardHeader, CardActionArea, CardContent } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import { State } from './state.js'
import jwt_decode from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import ScrollToBottom from 'react-scroll-to-bottom';
import DeleteIcon from '@material-ui/icons/Delete';

function Comments(){

        const history = useHistory()
        const { id, postId } = useParams()
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

	const commentPost = (uid)=>{                   
		fetch(`${base_url}/comment`,{
                        method: 'PUT',                                                                                  headers: {                                                                                              authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
			body: JSON.stringify({ comment: comment, id: id, postId: uid  })
                })                                                                                              .then(res =>{
                        return res.json()                                                                       })                                                                                              .then(data =>{
                        if(data.message  === 'comment posted successfully'){
                        console.log(data)
                        toast.success(data.message)
			fetchPost()
                        } else {                                                                                                toast.error('error occured')                                                            }                                                                                       })                                                                                      }

	const deleteComment = (uid)=>{
                fetch(`${base_url}/comment/${uid}`,{
                        method: 'PUT',                                                                                  headers: {                                                                                              authorization: 'bearer ' + token,
                                'Content-Type':'application/json'
                        },
                body: JSON.stringify({ id: id  })
                })                                                                                              .then(res =>{
                        return res.json()                                                                       })                                                                                              .then(data =>{
                        if(data.message  === 'comment deleted successfully'){
                        console.log(data)
                        toast.success(data.message)
			fetchPost()
                        } else {                                                                                                toast.error('error occured')                                                            }                                                                                       })                                                                                      }




	return(                                                                                         <>
		<AppBar position="fixed" color='gray'>
                <Toolbar>
                <Typography variant='h6'> comments </Typography>
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
			/>

			{val.postedBy._id === user_id._id ? <DeleteIcon 
			onClick={ ()=>{ deleteComment(val._id) }} />: null}
			</Card>
						</>
					)
				})}
				</>
			)
		})}
		<input className='search_input' value={comment}                                                 onChange={ (e)=>{ setComment(e.target.value) }} />                                              <Button onClick={()=>{ commentPost(postId) }}> post </Button>
		
	</>
        )
}
export default Comments
