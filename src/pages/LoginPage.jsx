import '../styles/pageStyles/LoginPage.css';
import '../styles/pageStyles/Wrapper.css'

import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function LoginPage(){
  const Logo = process.env.PUBLIC_URL + '/images/FinalLogo.png';
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState({
    error: false,
    message: ''
  });

  useEffect(() => {
    fetch('/api/session')
    .then(res => res.json())
    .then(session => {
      if(session.isLogged)navigate('/app/home');
    });

    document.addEventListener('keydown', e => {
      if(e.key === 'Enter')handleLogin()
    })

    return (
      document.removeEventListener('keydown', e => {
        if(e.key === 'Enter')handleLogin()
      })
    )
  }, [])

  const handleLogin = () => {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.message === 'Success'){
          navigate('/app/home');
        } else setLoginError({
          error: true,
          message: data.message
        });
        
      });
  }

  return (
    <div className='wrapper'>
      <div className="login" id='container'>
        <img src={Logo} alt="logo of the app"/>

        <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
        <Link to='/register' className='toRegister'><h3>Don't have an account yet?</h3></Link>
        {loginError.error? <label className='loginError'><WarningAmberIcon/>{loginError.message}</label> : '' }

        <button onClick={() => handleLogin()}>Login</button>
      </div>
    </div>
  )
}

export default LoginPage;