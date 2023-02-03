import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import EditProfilePopup from "./Popups/EditProfilePopup";

import '../styles/componentStyles/HomePage.css';

const HomePage = () => {
    const {session} = useProvider();
    
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(process.env.PUBLIC_URL + '/images/UserIcon.png');
    const [editingProfile, setEditingProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/profileIcon')
        .then(res => {
            if(!res.ok)navigate('/');
            else return res.json();
        })
        .then(pfp => {
            setProfilePicture(pfp);
        })
    }, [])

    useEffect(() => {
        setUsername(session.username);
    }, [session])

    return (
        <>
            <div className="account-section">

                <div className="header">
                    <img className="profile-pic" alt="pfp" src={profilePicture}/>
                    <div className="greetings">
                        <h1>Welcome!</h1>
                        <h2>{username}</h2>
                    </div>
                    <div className="account-controls">
                        <button className="edit-button" 
                        onClick={() => {
                            setEditingProfile(true);
                        }}>Edit profile</button>

                        <button className="logout-button" 
                        onClick={() => {
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

            <EditProfilePopup trigger={editingProfile} setTrigger={setEditingProfile}/>
        </>
    );
}

export default HomePage;