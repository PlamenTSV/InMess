import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import './ChannelNav.css';
import NewChannelPopup from './NewChannelPopup';

const ChannelNav = () =>{
    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';
    const addImage = process.env.PUBLIC_URL + '/images/add_button.png';
    let [popup, setPopup] = useState(false);

    let [channels, setChannels] = useState([{
        name: "",
        icon: "",
        id: ""
    }]);

    useEffect(() => {
        channels.map(element => {
            console.log(element);
        });
    }, [channels]);

    return (
        <div className="channel-navigation">
            <ul>
                <li><img className='logo-button' src={channelImage} alt='logo button for acc settings'/></li>

                {channels.filter(el => el.name !== "")
                         .map(el => {
                            return (<li><img className='logo-button' src={el.icon} alt={el.name}/></li>)
                         })}

                {/* <li><img className='logo-button' src={channelImage} alt='channel 1'/></li>
                <li><img className='logo-button' src={channelImage} alt='channel 2'/></li> */}

                <li><img className='logo-button' src={addImage} alt='Add channel button' onClick={() => setPopup(true)}/></li>

                <NewChannelPopup trigger={popup} setTrigger={setPopup} setChannels={setChannels}></NewChannelPopup>
            </ul>
        </div>
   )
}

export default ChannelNav;

