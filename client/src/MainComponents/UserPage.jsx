import React from "react";
import './UserPage.css';

import { UserContext } from "./UserContext";
import { useSearchParams } from "react-router-dom";
import ChannelNav from "./AppComponents/ChannelNav";

const UserPage = () => {
    const LogoButton = process.env.PUBLIC_URL + '/images/button_logo.png';
    const [params] = useSearchParams();

    // useEffect(() => {
    //     fetch('', {
            
    //     })
    // }, []);

    return (
        <UserContext.Provider value={params.get("userID")}>
            <ChannelNav/>
            <div className="channel-info">
                <h2>Test channel</h2>
                <img className="server-banner" src={LogoButton} alt="banner for the server, same image as nav button"/>
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