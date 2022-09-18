import firebaseAuthService from "./firebaseAuthServices";
import { useState } from "react";
import "./App.css";

// eslint-disable-next-line no-unused-vars
// import firebase from "./firebaseConfig";
import LoginForm from "./components/LoginForm";

function App() {
	const [user, setUser] = useState(null);
	firebaseAuthService.subcribeToAuthChanges(setUser);
	return (
		<div className="App">
			<div className="title-row">
				<h1 className="title">Firebase recipesss</h1>
				<LoginForm existingUser={user} />
			</div>
		</div>
	);
}

export default App;
