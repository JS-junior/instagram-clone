export const initState = {
	base_url: 'http://localhost:8080',
	token: localStorage.getItem('jwt'),
	myScreen: null,
	userScreen: null 
}

export const actionTypes = {
	CHANGE_THEME: 'It changes the theme in the entire app' ,
	SET_USERNAME: 'It sets the username',
	GO_LIVE: 'instagram live',
	live_initiator: false
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
		case actionTypes.GO_LIVE:
			return{
				...state,
				myScreen: action.myScreen,
				userScreen: action.myScreen,
				live_initiator: true
			};
		default:
			return state
	}
}


