import '../styles/pageStyles/RegisterPage.css'
import '../styles/pageStyles/Wrapper.css'

import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function RegisterPage(){
    const Logo = process.env.PUBLIC_URL + '/images/FinalLogo.png';
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [email, setEmail] = useState('');

    const [registerError, setRegisterError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        fetch('/api/session')
        .then(res => res.json())
        .then(sess => {
           if(sess.message === 'Authorized')navigate('/app/home')
        })
      }, [])

    const validateEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    const handleRegister = () => {
        if(username === '' || password === '' || confirmedPassword === '' || email === ''){
            setRegisterError({error: true, message: 'Please fill out all fields!'})
            return
        }
        if(!validateEmail(email)){
            setRegisterError({error: true, message: 'Invalid email address!'})
            return
        }
        if(password !== confirmedPassword){
            setRegisterError({error: true, message: 'Passwords don\'t match!'})
            return
        }
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === 'Success')navigate('/app/home')
            else setRegisterError({
                error: true,
                message: data.message
            })
        })
    }

    return (
        <div className='wrapper'>
            <div className='register' id='container'>
                <img src={Logo} alt="logo of the app"/>

                <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" name="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" name="confirm-password" placeholder="Confirm password..." onChange={(e) => setConfirmedPassword(e.target.value)}/>

                <Link to='/' className='toLogin'>Already have an account?</Link>

                {registerError.error? <label className='registerError'><WarningAmberIcon/>{registerError.message}</label> : '' }
                
                <button onClick={() => handleRegister()}>Register</button>
            </div>
        </div>
    )
}

export default RegisterPage;