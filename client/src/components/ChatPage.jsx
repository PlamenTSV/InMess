import React from "react";
import '../styles/ChatPage.css';
import io from 'socket.io-client';
import { useState } from "react";
import { useEffect } from "react";

const socket = io();

export default function ChatPage(){
    const [messages, setMessages] = useState([{
        text: '',
        sender: ''
    }])

    useEffect(() => {
        socket.on('receivedMessage', (message) => {
            setMessages(curr => [...curr, {
                text: message,
                sender: 'kekw'
            }]);
        })
    }, [])

    // useEffect(() => {
    //     console.log(messages);
    // }, [messages])

    return(
        <div className="chat-container">
            <div className="chat">
                <h1>ui</h1>
                {messages.map((mess, index) => <h2 key={index}>{mess.text}</h2>)}
            </div>
            <div className="input-area">
                <input type="text" autoFocus onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        socket.emit('message', event.target.value);
                        event.target.value = '';
                    }
                }}></input>
            </div>
        </div>
    )
}