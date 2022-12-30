import React from "react";
import '../styles/ChatPage.css';
import io from 'socket.io-client';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import TextMessage from "./TextMessage";

//const socket = io();

export default function ChatPage(){
    const navigate = useNavigate();
    const {sessionRef, activeChannel} = useProvider();

    const [messages, setMessages] = useState([])

    // useEffect(() => {
    //     setMessages([]);

    //     socket.emit('loadMessages', {
    //         channel: activeChannel.id
    //     })
    // }, [activeChannel])

    useEffect(() => {
        // socket.on('receivedMessage', message => {
        //     setMessages(curr => [...curr, message]);
        // })
        // socket.on('messagesForCurrentChannel', db_messages => {
        //     console.log(db_messages);
        //     setMessages(db_messages);
        // })
        if(activeChannel.id !== undefined){
            fetch('/message/loadAll/' + activeChannel.id)
            .then(res => res.json())
            .then(mess => {
                console.log(mess);
                setMessages(mess);
            })
        } else {
            navigate('/');
        }
    }, [activeChannel])

    function format2Digits(number){
        return (number < 10) ? `0${number}` : number;
    }

    return(
        <div className="chat-container">
            <div className="chat">
                {messages.map((mess, index) => <TextMessage key={index} sender={mess.senderUsername} message={mess.content}/>)}
            </div>
            <div className="input-area">
                <input type="text" autoFocus onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        const date = new Date();

                        const month = format2Digits(date.getMonth() + 1);
                        const day = format2Digits(date.getDate());
                        const hours = format2Digits(date.getHours());
                        const minutes = format2Digits(date.getMinutes());
                        const seconds = format2Digits(date.getSeconds());

                        const sentAt = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        console.log(sentAt);

                        fetch('/messages/add', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                senderID: sessionRef.current.user.id,
                                content: event.target.value,
                                sent_at: sentAt,
                                channel_id: activeChannel.id
                            })
                        })
                        // socket.emit('message', {
                        //     senderID: sessionRef.current.user.id,
                        //     content: event.target.value,
                        //     sent_at: sentAt,
                        //     channel_id: activeChannel.id
                        // });
                        event.target.value = '';
                    }
                }}></input>
            </div>
        </div>
    )
}