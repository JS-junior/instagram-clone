import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Input, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import './App.css'
import Components from './components.js'

function Notify (){



        return(
                <>
		<Components />
		<Typography variant='h6'> Activity </Typography>


		<div className='notification_bar'>
		<Avatar className='notification_text' id='notification_avatar'  /> 
		<Typography variant='subtitle5'>
		<Typography className='notification_text' id='notification_text'
		variant='h6'> little_champ.Jr </Typography> 
	started to follow you . You can also follow back him. Check out his profile 
		</Typography>
		</div>

                </>
        )
}

export default Notify
