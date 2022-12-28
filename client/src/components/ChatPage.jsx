import React from "react";
import '../styles/ChatPage.css';
import io from 'socket.io-client';
import { useState } from "react";
import { useEffect } from "react";
import { useProvider } from "../contexts/UserContext";

import TextMessage from "./TextMessage";

const socket = io();

export default function ChatPage(){
    const {sessionRef, activeChannel} = useProvider();

    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('receivedMessage', message => {
            setMessages(curr => [...curr, message]);
        })
    }, [])

    function validate2Digits(number){
        return (number < 10) ? `0${number}` : number;
    }

    return(
        <div className="chat-container">
            <div className="chat">
                {messages.map((mess, index) => <TextMessage key={index} sender={mess.sender} message={mess.text}/>)}
            </div>
            <div className="input-area">
                <input type="text" autoFocus onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        const date = new Date();

                        const month = validate2Digits(date.getMonth() + 1);
                        const day = validate2Digits(date.getDate());
                        const hours = validate2Digits(date.getHours());
                        const minutes = validate2Digits(date.getMinutes());
                        const seconds = validate2Digits(date.getSeconds());

                        const sentAt = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        console.log(sentAt);
                        socket.emit('message', {
                            message: event.target.value,
                            sender: sessionRef.current.user.id,
                            sentAt: sentAt,
                            channel: activeChannel.id
                        });
                        event.target.value = '';
                    }
                }}></input>
            </div>
        </div>
    )
}