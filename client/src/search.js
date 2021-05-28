import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Input } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import './App.css'
import Components from './components.js'

function Search(){

	const history = useHistory()
	const [ query, setQuery ] = useState("")

        return(
                <>
	<Components />
	<input className='search_input'
	placeholder='search'
	value={query}
	onChange={ (e)=>{ setQuery(e.target.value)} } />

                </>
        )
}

export default Search
