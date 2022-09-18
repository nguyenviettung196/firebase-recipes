import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";

const config = {
	// apiKey: "AIzaSyBBaiKc4S5ga1n1KNlVZXe9B16Cazpx4NI",
	// authDomain: "fir-recipes-79d59.firebaseapp.com",
	// projectId: "fir-recipes-79d59",
	// storageBucket: "fir-recipes-79d59.appspot.com",
	// messagingSenderId: "1022436894781",
	// appId: "1:1022436894781:web:e1699957e132bf9b3ba254",
	// measurementId: "G-JRZSY0BFD3",
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(config);
const auth = getAuth(firebaseApp);

const firebaseConfig = {
	auth,
};

export default firebaseConfig;
