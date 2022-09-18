import React from 'react';
import { useState } from 'react';
import firebaseAuthService from '../firebaseAuthServices';

const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await firebaseAuthService.loginUser(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  }
  function handleLogout() {
    firebaseAuthService.logoutUser();
  }
  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert('Missing username!');
      return;
    }
    try {
      await firebaseAuthService.sendPasswordResetEmail(username);
      alert('send the password reset email');
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleLoginWithGoogle() {
    try {
      await firebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className='login-form-container'>
      {
        existingUser ?
          <div className='row'>
            <h3>Welcome, {existingUser.email}</h3>
            <button type='button' className='primary-button' onClick={handleLogout}>Logout</button>
          </div>
          : <form onSubmit={handleSubmit} className='login-form'>
            <label className='input-label login-label'>Username (email):
              <input
                type="email"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className='input-text' />
            </label>
            <label className='input-label login-label'>Password:
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='input-text' />
            </label>
            <div className='button-box'>
              <button className='primary-button'>Login</button>
              <button type='button' onClick={handleSendResetPasswordEmail} className='primary-button'>Reset password</button>
              <button type='button' onClick={handleLoginWithGoogle} className='primary-button'>Login with google</button>
            </div>
          </form>
      }
    </div>
  );
};

export default LoginForm;