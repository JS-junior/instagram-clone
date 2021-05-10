import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Typography, Card  } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import ReactTypingEffect from 'react-typing-effect';
import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';


function Signup(){

	const history = useHistory()

        const SignupWithEmail = ()=>{

	}

	const SignupWithGoogle = ()=>{
		window.location.href = 'http://localhost:8080/'
	}

	const SignupWithFacebook = ()=>{
		window.location.href = 'http://localhost:8080/facebook'
	}


        return(
                <>
		
		<AwesomeSlider animation='cubeAnimation'>
<div data-src='https://firebasestorage.googleapis.com/v0/b/what-sapp-clone-f427e.appspot.com/o/images%20(2).jpeg?alt=media&token=78e89991-41d3-442e-a83d-19321c479416'></div>
 <div data-src='https://firebasestorage.googleapis.com/v0/b/what-sapp-clone-f427e.appspot.com/o/images.jpeg?alt=media&token=ff54d990-8cc6-4200-ab80-4d446a0d3430'></div>
<div data-src='https://firebasestorage.googleapis.com/v0/b/what-sapp-clone-f427e.appspot.com/o/images.png?alt=media&token=1d9692f0-5c6d-4e48-b441-e39e4b4d6217'></div>
<div data-src='https://firebasestorage.googleapis.com/v0/b/what-sapp-clone-f427e.appspot.com/o/images%20(1).jpeg?alt=media&token=aecefcb1-4933-4879-ad0a-9abf2a612562'></div>
		  </AwesomeSlider>
		<br /> <br /> <br />
		<Button style={{ textAlign: 'center'}} > create an account </Button>
	<br />	<Button
style={{ color: 'red', border: 'solid 1px black',width:'100%', borderRadius: '5vh 5vh 5vh 5vh'}}
                onClick={SignupWithEmail}><EmailIcon />  signup with Email</Button>
		<br/><br />
		<Button 
style={{ color: 'black', border: 'solid 1px black', width: '100%',borderRadius: '5vh 5vh 5vh 5vh' }}
		onClick={SignupWithGoogle}> signup with Google</Button>
		<br /><br />
		<Button 
style={{ color: 'blue', border: 'solid 1px black', width: '100%', borderRadius: '5vh 5vh 5vh 5vh'}}
		onClick={SignupWithFacebook}
		><FacebookIcon style={{ color: 'blue' }} /> 
		signup with Facebook</Button>
		<br /><br />
<Button style={{ textAlign: 'center'}}
onClick={()=>{ history.push('/login') }}> Already have an account? sign in </Button>

	
                </>
        )
}

export default Signup
