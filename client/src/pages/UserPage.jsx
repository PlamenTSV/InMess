import React from "react";

import '../styles/UserPage.css';

import { UserProvider } from "../contexts/UserContext";

import ChannelNav from "../components/ChannelNav";
import ChannelInfo from "../components/Channellnfo"
import HomePage from "../components/HomePage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = ({isHomePage}) => {
    return (
        <UserProvider>
            <ChannelNav/>
            <ChannelInfo isHomePage={isHomePage}/>

            {!isHomePage? <div className="chat-container">
                <div className="chat">
                    <h1>ui</h1>
                </div>
                <div className="input-area">
                    <input type="text" autoFocus></input>
                </div>
            </div> : <HomePage/>}

            <div className="members-section">
            </div>
        </UserProvider>
    )
}

export default UserPage;