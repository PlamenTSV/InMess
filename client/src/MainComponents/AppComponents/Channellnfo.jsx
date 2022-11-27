import React from "react";
import { useEffect } from "react";

import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

import "./ChannelInfo.css"; 

export default function ChannelInfo({isHomePage}){
    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';

    const {channelValues} = useContext(UserContext); 
    const [currentChannel, setCurrentChannel] = useState({});

    useEffect(() => {
        channelValues.forEach(channel => {
            if(channel.active === true)setCurrentChannel(channel);
        })
    }, [channelValues])

    return (
        <div className="channel-info">
            {!isHomePage ?
                <>
                    <h2>{currentChannel.Channel_name}</h2>
                    <img className="server-banner" src={currentChannel.Channel_path} alt="logo"/>
                    <button className="delete-button" onClick={() => {
                        fetch('/channels/delete/' + currentChannel.id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })
                    }}>DELETE</button>
                </>
                :
                <>
                    <h2>Welcome to Geekscord</h2>
                    <img className="server-banner" src={channelImage} alt="logo"/>
                </>
            }
        </div>
    )
}