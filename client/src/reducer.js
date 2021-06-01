export const initState = {
	theme: localStorage.getItem('theme'),
	base_url: 'http://localhost:8080',
	token: localStorage.getItem('jwt'),
	username: ""
}

export const actionTypes = {
	CHANGE_THEME: 'It changes the theme in the entire app' ,
	SET_USERNAME: 'It sets the username'
}

export const reducer = (state, action)=>{
	switch(action.type){
		case actionTypes.CHANGE_THEME:
			return {
				...state,
				theme: action.theme
			};
		case actionTypes.SET_USERNAME:
			return{
				...state,
				username: action.username
			};
		default:
			return state
	}
}


