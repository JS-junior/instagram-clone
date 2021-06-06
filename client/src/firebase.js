import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDrlQ3Rw30witA4BezXlvSYXAHbTNfesSc",
    authDomain: "instagram-clone-0000.firebaseapp.com",
    databaseURL: "https://instagram-clone-0000-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-0000",
    storageBucket: "instagram-clone-0000.appspot.com",
    messagingSenderId: "856101803901",
    appId: "1:856101803901:web:d966421840bc1f50049e14",
    measurementId: "G-JBDLEW0PVE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const db = firebase.firestore()
const database = firebase.database()
const storage = firebase.storage()
const messaging = firebase.messaging()

/*messaging.setBackgroundMessageHandler(payload =>{

	const title = 'Hello  world'
	const options = {
		body: payload.data.status
	}

//	return self.registration.showNotification(title, options)
})*/

export { db, database, storage, messaging }
