import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../UserContext";

import './ChannelNav.css';
import NewChannelPopup from './NewChannelPopup';

const ChannelNav = () =>{
    const userID = useContext(UserContext);
    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';
    const addImage = process.env.PUBLIC_URL + '/images/add_button.png';
    let [popup, setPopup] = useState(false);

    let [channels, setChannels] = useState([{
        name: "",
        icon: "",
        id: ""
    }]);

    useEffect(() => {
        fetch('/channels/load?' + new URLSearchParams({userID: userID}))
        .then(res => {return res.json()})
        .then(data => {
            console.log(data);
            data.forEach(channel => {
                setChannels(curr => [...curr, {
                    name: channel.Channel_name,
                    icon: channel.Channel_path,
                    id: channel.id
                }])
            })
        });
    }, []);


    return (
        <div className="channel-navigation">
            <ul>
                <li><img className='logo-button' src={channelImage} alt='logo button for acc settings'/></li>

                {channels.filter(el => el.name !== "")
                         .map(el => {
                            return (<li key={el.id}><img className='logo-button' src={el.icon} alt={el.name}/></li>)
                         })}

                <li><img className='logo-button' src={addImage} alt='Add channel button' onClick={() => setPopup(true)}/></li>

                <NewChannelPopup trigger={popup} setTrigger={setPopup} setChannels={setChannels}></NewChannelPopup>
            </ul>
        </div>
   )
}

export default ChannelNav;

