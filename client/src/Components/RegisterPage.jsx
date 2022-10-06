import './RegisterPage.css'
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Logo from '../Images/AppLogo.jpg';

function RegisterPage(){
    const navigate = useNavigate();

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

    const validateEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    useEffect(() => {
        if(Object.keys(data).length !== 0){
            if(confirmedPassword !== password)alert('Passwords dont match!');
            else if(!validateEmail(email))alert('Invalid Email!');
            else {
                fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)   
                }).then(res => {
                    return res.text();
                }).then(data => {
                    if(data !== ''){
                        alert(data + ", redirecting to login page");
                        navigate('/login');
                    }
                    else {
                        alert("Successful register! Redirecting...");
                        navigate('/app');
                    }
                });
            }
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