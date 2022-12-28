import React from "react";
import '../styles/TextMessage.css';

export default function TextMessage({sender, message}){
    return(
        <div className="message-container">
            <p className="sender">{sender}</p>
            <p className="message">{message}</p>
        </div>
    )
}