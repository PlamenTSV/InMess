import './LoginPage.css';
import React from 'react';
import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function LoginPage(){
  const Logo = process.env.PUBLIC_URL + '/images/AppLogo.jpg';
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverData, setServerData] = useState({});

  const handleLogin = () => {
      setServerData({
        username: username,
        password: password
      })
  }

  useEffect(() => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(serverData)
    })
    .then(res => {return res.text()})
    .then(data => {
      if(/^[0-9]+$/.test(data)){
        alert('Login successful, redirecting...');
        navigate({
          pathname: '/app',
          search: `?userID=${data}`
        });
      }
      else alert(data);
    });

  }, [serverData]);

  return (
    <div className="login-container">
    <img src={Logo} alt="logo of the app"/>

    <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
    <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
    <Link to='/' className='toRegister'><h3>Don't have an account yet?</h3></Link>
    <button onClick={() => handleLogin()}>Login</button>
    </div>
  )
}

export default LoginPage;