import './RegisterPage.css'
import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import Logo from '../Images/AppLogo.jpg';

function RegisterPage(){
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmedPassword, setConfirmedPassword] = useState('');
    let [email, setEmail] = useState('');

    let [data, setData] = useState({});

    const  handleRegister = () => {
        setData({
            username: username,
            password: password,
            email: email
        }); 
    }

    useEffect(() => {
        if(confirmedPassword !== password)console.log('Passwords dont match!');
        else {
            console.log(data);
            fetch('/register', {
             method: 'POST',
             headers: {
                'Content-type': 'application/json'
             },
             body: JSON.stringify(data)   
            })
        }
    }, [data]);

    return (
        <div className="register-container">
        <img src={Logo} alt="logo of the app"/>

        <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" name="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" name="confirm-password" placeholder="Confirm password..." onChange={(e) => setConfirmedPassword(e.target.value)}/>
        <Link to='/login' className='toLogin'><h3>Already have an account?</h3></Link>
        <button onClick={() => handleRegister()}>Register</button>
        </div>
    )
}

export default RegisterPage;