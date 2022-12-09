import React from "react";
import { useState, useEffect } from "react";

import '../styles/HomePage.css';

const HomePage = () => {
    const [username, setUsername] = useState("");

    async function fetchSession() {
        const sessionJSON = await fetch('/session');
        const session = await sessionJSON.json();

        setUsername(session.user.username);
    }

    useEffect(() => {
        fetchSession();
    }, [])

    return (
        <>
            <div className="account-section">

                <div className="header">
                    <img className="profile-pic" alt="pfp" src="https://i.kym-cdn.com/photos/images/newsfeed/001/399/667/664.jpg"/>
                    <div className="greetings">
                        <h1>Welcome!</h1>
                        <h2>{username}</h2>
                    </div>
                    <button className="edit-button">Edit profile</button>
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