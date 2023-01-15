import React from "react";
import '../styles/TextMessage.css';

export default function TextMessage({sender, message}){
    const UserIcon = process.env.PUBLIC_URL + '/images/UserIcon.png';

    return(
        <div className="message-container">
            <img src={UserIcon} alt="icon of message sender" className="pfp"/>
            <div className="content">
                <p className="sender">{sender}</p>
                <p className="message">{message}</p>
            </div>
        </div>
    )
}