import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import '../styles/HomePage.css';

const HomePage = () => {
    const [wordsLeft, setWordsLeft] = useState(250);

    const {userData} = useContext(UserContext);

    return (
        <>
            <div className="account-section">
                <div className="info">
                    <h1>MY ACCOUNT</h1>
                    <h2>Username: {userData.Username}</h2>
                    <h2>Email: {userData.Email}</h2>
                    <button className="change-password">Change Password</button>
                </div>
                <div className="about">
                    <h1>About me:</h1>
                    <div className="text">
                        <textarea name="ab" maxLength={250} cols="20" rows="10" onChange={e => setWordsLeft(250 - e.target.value.length)}></textarea>
                    </div>
                    <p>{wordsLeft}/250</p>
                </div>
            </div>
        </>
    );
}

export default HomePage;