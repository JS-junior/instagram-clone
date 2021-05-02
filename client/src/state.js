import React, { createContext, useContext, useReducer } from 'react'

const State = createContext()

function StateProvider({ children}){
	return(
		<>
		<State.Provider value={'tik-tok-clone'}>
		{children}
		</State.Provider>
		</>
	)
}


export default StateProvider
export const useStateValue = ()=> useContext(State) 
