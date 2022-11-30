import '../styles/LoginPage.css';
import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function LoginPage(){
  const Logo = process.env.PUBLIC_URL + '/images/AppLogo.jpg';
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState({
    error: false,
    message: ''
  });

  useEffect(() => {
    fetch('/session')
    .then(res => res.json())
    .then(session => {
      console.log(session);
      if(session.isLogged)navigate('/app')
    });
  }, [])

  const handleLogin = () => {
      fetch('/login', {
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
          navigate('/app');
        } else setLoginError({
          error: true,
          message: data.message
        });
        
      });
  }

  return (
    <div className='wrapper'>
      <div className="login-container">
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