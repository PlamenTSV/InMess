import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import '../styles/componentStyles/HomePage.css';

const HomePage = () => {
    const {sessionRef} = useProvider();
    
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    async function fetchSession() {
        const sessionJSON = await fetch('/api/session');
        const session = await sessionJSON.json();

        sessionRef.current = session;

        if(!session.isLogged)navigate('/');
        else setUsername(session.user.username);
    }

    useEffect(() => {
        fetchSession();
    }, [])

    return (
        <>
            <div className="account-section">

                <div className="header">
                    <img className="profile-pic" alt="pfp" src={process.env.PUBLIC_URL + '/images/UserIcon.png'}/>
                    <div className="greetings">
                        <h1>Welcome!</h1>
                        <h2>{username}</h2>
                    </div>
                    <div className="account-controls">
                        <button className="edit-button">Edit profile</button>
                        <button className="logout-button" onClick={() => {
                            fetch('/api/logout', {
                                method: 'DELETE'
                            })
                            .then(res => {
                                if(res.status === 200)navigate('/');
                            });
                        }}>Log out</button>
                    </div>
                </div>

                <div className="tips">
                    <p>Here are some quick tips to get you started!</p>
                    <div className="cards">
                        <div className="card1">
                            <img src={process.env.PUBLIC_URL + '/images/tip1.png'} alt="tip1" className="icon"/>
                            <h4>Use the + icon to create your own channel or join an existing one.</h4>
                        </div>
                        <div className="card2">
                            <img src={process.env.PUBLIC_URL + '/images/tip2.png'} alt="tip2" className="icon"/>
                            <h4>And that's it! Connect with your friends and close ones and have a fun time chatting!</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;