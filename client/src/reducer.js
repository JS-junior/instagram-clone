export const initState = {
	theme: localStorage.getItem('theme'),
	base_url: 'http://localhost:8080',
	token: localStorage.getItem('jwt')
}

export const actionTypes = {
	CHANGE_THEME: 'It changes the theme in the entire app' 
}

export const reducer = (state, action)=>{
	switch(action.type){
		case actionTypes.CHANGE_THEME:
			return {
				...state,
				theme: action.theme
			};
		default:
			return state
	}
}


