import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input, Card, AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import { useParams, useHistory } from 'react-router-dom'
import MoreVert from '@material-ui/icons/MoreVert'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Logs from './logs.js'


function Home(){

 
	return(
		<>
<AppBar  style={{ display: 'inline-block', backgroundColor: 'green'}} position='fixed'>
	
		<Menu  style={{ display: 'inline-block'}} />

<Toolbar style={{ display: 'inline-block'}}><Typography variant='h6'>Whatsapp</Typography></Toolbar>
		<Search style={{ display: 'inline-block'}} />
		<MoreVert style={{ display: 'inline-block'}} />
		<br />
	<Tooltip title='hi'>
	<CameraAltIcon />
	</Tooltip>
	<Tooltip title='hi' placement='left'>
	<Button> hi</Button>
	</Tooltip>
		<Tooltip title='hi' arrow='true'>
        <Button> hi</Button>
        </Tooltip>
		<Tooltip title='hi' placement='right'>
        <Button> hi</Button>
        </Tooltip>
</AppBar>
<Logs />
<Logs />
<Logs />
<Logs />
<Logs />
<Logs />
		</>
	)
}

export default Home
