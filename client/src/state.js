import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext, useReducer } from 'react'
import { reducer, initState } from './reducer.js'

const State = createContext()

function StateProvider({ children }){
	useEffect(()=>{
		localStorage.setItem('theme', 'light')
	},[])
	return (
		<>
		<State.Provider value={useReducer(reducer, initState)}>
		{children}
		</State.Provider>
		</>
	)

}

export { StateProvider, State } 
export const useStateValue = ()=> useContext(State) 

