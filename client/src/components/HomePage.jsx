import React from "react";
import { useState } from "react";
import { useProvider } from "../contexts/UserContext";
import '../styles/HomePage.css';

const HomePage = () => {
    const [wordsLeft, setWordsLeft] = useState(250);

    const {userData} = useProvider();

    return (
        <>
            <div className="account-section">

                <div className="header">
                    <img className="profile-pic" alt="pfp" src="https://i.kym-cdn.com/photos/images/newsfeed/001/399/667/664.jpg"/>
                    <div className="greetings">
                        <h1>Welcome!</h1>
                        <h2>Placeholder username</h2>
                    </div>
                    <button className="edit-button">Edit profile</button>
                </div>

                <div className="tips">
                    <p>Here are some quick tips to get you started!</p>
                    <div className="cards">
                        <div className="card1"></div>
                        <div className="card2"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;