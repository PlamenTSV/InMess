import React from "react";
import { useEffect } from "react";

import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

import "./ChannelInfo.css"; 

export default function ChannelInfo({isHomePage}){
    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';

    const {contextValues} = useContext(UserContext); 
    const [currentChannel, setCurrentChannel] = useState({});

    useEffect(() => {
        contextValues.forEach(channel => {
            if(channel.active === true)setCurrentChannel(channel);
        })
        console.log(Object.keys(currentChannel).length);
    }, [contextValues])

    return (
        <div className="channel-info">
            {!isHomePage ?
                <>
                    <h2>{currentChannel.Channel_name}</h2>
                    <img className="server-banner" src={currentChannel.Channel_path} alt="logo"/>
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