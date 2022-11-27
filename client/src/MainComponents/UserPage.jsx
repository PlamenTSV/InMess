import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import './UserPage.css';

import { UserContext } from "./UserContext";

import ChannelNav from "./AppComponents/ChannelNav";
import ChannelInfo from "./AppComponents/Channellnfo"
import HomePage from "./AppComponents/HomePage";

const UserPage = ({isHomePage}) => {
    const [params] = useSearchParams();
    const [channelValues, setChannelValues] = useState([{}]);
    const [userData, setUserData] = useState([{}]);

    useEffect(() => {
        fetch('/channels/load?' + new URLSearchParams({userID: params.get("userID")}))
        .then(res => {return res.json()})
        .then(data => {
            setChannelValues(curr => [...curr, ...data]);
        });

        fetch('/users/load?' + new URLSearchParams({userID: params.get("userID")}))
        .then(res => {return res.json()})
        .then(data => {
            setUserData(data);
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