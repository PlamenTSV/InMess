import React from "react";
import { useEffect } from "react";

import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

import "./ChannelInfo.css"; 

export default function ChannelInfo(){
    const {contextValues} = useContext(UserContext); 

    const [currentChannel, setCurrentChannel] = useState({});

    useEffect(() => {
        contextValues.forEach(channel => {
            if(channel.active === true)setCurrentChannel(channel);
        })
    }, [contextValues])

    return (
        <div className="channel-info">
                <h2>{currentChannel.Channel_name}</h2>
                <img className="server-banner" src={currentChannel.Channel_path} alt="logo"/>
        </div>
    )
}