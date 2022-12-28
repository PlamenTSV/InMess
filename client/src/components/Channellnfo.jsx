import React from "react";

import { useProvider } from "../contexts/UserContext";

import "../styles/ChannelInfo.css"; 

export default function ChannelInfo({isHomePage}){
    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';

    const {activeChannel} = useProvider(); 

    return (
        <div className="channel-info">
            {!isHomePage ?
                <>
                    <h2>{activeChannel.Channel_name}</h2>
                    <img className="server-banner" src={activeChannel.Channel_path} alt="logo"/>
                    <button className="delete-button" onClick={() => {
                        fetch('/channels/delete/' + activeChannel.id, {
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