import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.db = app.firestore();
		this.auth = app.auth();
		this.googleAuthProvider = new app.auth.GoogleAuthProvider();
	}

	/**
	 * Signs in with popup and google using an instance of app.auth.GoogleAuthProvider
	 * @return true if signed in correctly, false if it failed
	 */
	async signInWithGoogle() {
		var result = await this.auth
			.signInWithPopup(this.googleAuthProvider)
			.then((user) => {
				console.log("sign in correct on firebase");
				return true;
			})
			.catch((error) => {
				//TODO: Error handling
				console.log("error signing in");
				return false;
			});
		return result;
	}

	/**
	 * Signs out current Authenticated user in firebase
	 * @returns true if it could sign out, false if it couldn't
	 */
	async logout() {
		var result = await this.auth
			.signOut()
			.then(() => {
				console.log("sucess");
				return true;
			})
			.catch((error) => {
				console.log("error");
				//TODO: Error handling
				return false;
			});
		return result;
	}
}

export default Firebase;
