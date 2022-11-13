import React from "react";
import { useSearchParams } from "react-router-dom";

import './UserPage.css';

import { UserContext } from "./UserContext";

import ChannelNav from "./AppComponents/ChannelNav";

const UserPage = () => {
    const LogoButton = process.env.PUBLIC_URL + '/images/button_logo.png';
    const [params] = useSearchParams();

    // useEffect(() => {
    //     fetch('/channels/load?' + new URLSearchParams({userID: params.get("userID")}))
    //     .then(res => {return res.json()})
    //     .then(data => console.log(data));
    // }, []);

    return (
        <UserContext.Provider value={params.get("userID")}>
            <ChannelNav/>
            <div className="channel-info">
                <h2>Test channel</h2>
                <img className="server-banner" src={LogoButton} alt="logo"/>
            </div>

            <div className="chat-container">
                <div className="chat">
                    <h1>hui</h1>
                </div>
                <div className="input-area">
                    <input type="text" autoFocus></input>
                </div>
            </div>

            <div className="members-section">
            </div>
        </UserContext.Provider>
    )
}

export default UserPage;