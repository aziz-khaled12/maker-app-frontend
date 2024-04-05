import React from 'react'
import './Login.css'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://maker-app-backend.vercel.app/api/login', { email, password });
      console.log('User logged in:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/', { replace: true }); // Navigate to home, replace current history
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password. Please try again.');
    }
  };
  return (
    <>
      <div className='big-wrapper-login'>

        <div className='big-container-login'>

          <div className='log-in-container'>
            <header>
              Log In
            </header>
            <div className='login-with-socials'>
              <div className='head'>
                <div className='line'></div>
                <div> Log in with socials </div>
                <div className='line'></div>
              </div>
              <div className='btns'>
                <button className='social-btn'><FaGoogle /> Google</button>
                <button className='social-btn'><FaFacebook /> Facebook</button>
              </div>
            </div>
            <div className='login-with-email'>
              <div className='head'>
                <div className='line'></div>
                <div> Log in with Email </div>
                <div className='line'></div>
              </div>
              <div className='input-container'>
                <input type="string" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' ></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' ></input>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type='submit' className='submit-btn' onClick={handleLogin}>Log in</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login