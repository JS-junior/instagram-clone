import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'
import Stories from 'react-insta-stories';

function Story(){

        const history = useHistory()
	const { id } = useParams()
	const stories = [
	'https://example.com/pic.jpg',
	'data:image/jpg;base64,R0lGODl....',
	'https://mohitkarekar.com/icon.png',
];

	return(                                                                                         <>
		<Stories
			stories={stories}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
		</>                          
	)
}
export default Story
