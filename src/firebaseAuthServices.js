import firebase from "./firebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";

const auth = firebase.auth;

const registerUser = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
	return auth.signOut();
};

// const sendPasswordResetEmailUser = (email) => {
// 	return sendPasswordResetEmail(email);
// };

const loginWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider);
};

const subcribeToAuthChanges = (handleAuthChange) => {
	onAuthStateChanged(auth, (user) => {
		handleAuthChange(user);
	});
};

const firebaseAuthService = {
	registerUser,
	loginUser,
	logoutUser,
	loginWithGoogle,
	sendPasswordResetEmail: (email) => {
		sendPasswordResetEmail(auth, email);
	},
	subcribeToAuthChanges,
};

export default firebaseAuthService;
