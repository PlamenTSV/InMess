import React from "react";
import { useEffect, useState } from "react";

import '../styles/UserPage.css';

import { UserContext } from "../contexts/UserContext";

import ChannelNav from "../components/ChannelNav";
import ChannelInfo from "../components/Channellnfo"
import HomePage from "../components/HomePage";

const UserPage = ({isHomePage}) => {
    const [channelValues, setChannelValues] = useState([{}]);
    const [userData, setUserData] = useState([{}]);

    useEffect(() => {
        fetch('/channels/load')
        .then(res => res.json())
        .then(data => {
            setChannelValues(curr => [...curr, ...data]);
        });
    }, []);

    const values = {channelValues, setChannelValues, userData, setUserData};
    return (
        <UserContext.Provider value={values}>
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
        </UserContext.Provider>
    )
}

export default UserPage;