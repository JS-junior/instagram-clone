import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext, useReducer } from 'react'

const State = createContext()

function StateProvider({ children }){

	return (
		<>
		<State.Provider value={'hi'}>
		{children}
		</State.Provider>
		</>
	)

}

export { StateProvider, State } 
export const useStateValue = ()=> useContext(State) 

