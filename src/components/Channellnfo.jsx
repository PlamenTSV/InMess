import React from "react";
import { useNavigate } from "react-router-dom";

import { useProvider } from "../contexts/UserContext";

import "../styles/componentStyles/ChannelInfo.css"; 

export default function ChannelInfo({isHomePage}){
    const channelImage = process.env.PUBLIC_URL + '/images/LogoButton.png';

    const navigate = useNavigate();
    const {activeChannel, setChannelValues, session} = useProvider();

    return (
        <div className="channel-info">
            {!isHomePage ?
                <>
                    <h2>{activeChannel.Channel_name}</h2>
                    <img className="server-banner" src={activeChannel.Channel_icon} alt="logo"/>
                    {
                        (activeChannel.Owner === session.id && session !== undefined) ? 
                            <button className="delete-button" onClick={() => {
                                fetch('/api/channels/delete/' + activeChannel.id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-type': 'application/json'
                                    }
                                })
                                .then(() => {
                                    setChannelValues(channels => channels.filter(ch => ch.id !== activeChannel.id));
                                    navigate('/app/home');
                                })
                            }}>DELETE</button>
                        : ""
                    }
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