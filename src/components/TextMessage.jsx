import React from "react";
import '../styles/componentStyles/TextMessage.css';

export default function TextMessage({icon, sender, message}){
    console.log(icon);
    return(
        <div className="message-container">
            <img src={icon} alt="icon of message sender" className="pfp"/>
            <div className="content">
                <p className="sender">{sender}</p>
                <p className="message">{message}</p>
            </div>
        </div>
    )
}