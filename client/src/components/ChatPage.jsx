import React from "react";
import '../styles/ChatPage.css';

export default function ChatPage(){
    return(
        <div className="chat-container">
            <div className="chat">
                <h1>ui</h1>
            </div>
            <div className="input-area">
                <input type="text" autoFocus></input>
            </div>
        </div>
    )
}