import React from "react";
import '../styles/componentStyles/ChatPage.css';
import io from 'socket.io-client';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import TextMessage from "./TextMessage";

let socket;

export default function ChatPage(){
    const navigate = useNavigate();
    const {sessionRef, activeChannel, setActiveUsers} = useProvider();
    
    const [messages, setMessages] = useState([])

   useEffect(() => {
        socket = io();
        
        socket.on('chat', msg => {
            console.log(msg);
            setMessages(old => [...old, msg]);
        })

        socket.on('active_users', usernames => {
            setActiveUsers(usernames);
        })

        return () => {
            if(socket) socket.disconnect();
        }
   }, [])

    useEffect(() => {
        if(activeChannel.id !== undefined){
            socket.emit('join', {channel: activeChannel.id, userInfo: sessionRef.current.user});

            fetch('/message/loadAll/' + activeChannel.id)
            .then(res => res.json())
            .then(mess => {
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
                        .then(res => res.json())
                        .then(data => {
                            socket.emit('message', {
                                senderUsername: data.username,
                                content: event.target.value,
                                sent_at: sentAt,
                                channel_id: activeChannel.id
                            })
                            event.target.value = '';
                        })
                        
                    }
                }}></input>
            </div>
        </div>
    )
}