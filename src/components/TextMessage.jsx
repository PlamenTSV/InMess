import React from "react";
import '../styles/componentStyles/TextMessage.css';

export default function TextMessage({message}){
    return(
        <div className="message-container">
            <img src={message.senderIcon} alt="icon of message sender" className="pfp"/>
            <div className="content">

                <div className="info">
                    <p className="sender">{message.senderUsername}</p>
                    <p className="date"> {message.sent_at.split('T')[0]}</p>
                    <p className="time"> {message.sent_at.split('T')[1].split(':')[0] + ':' + message.sent_at.split('T')[1].split(':')[1]}</p>
                </div>

                <div className="message">
                    <p>{message.content}</p>
                </div>
            </div>
        </div>
    )
}