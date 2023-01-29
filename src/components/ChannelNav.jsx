import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import '../styles/componentStyles/ChannelNav.css';
import ChannelPopup from './Popups/ChannelPopup';

const ChannelNav = () =>{
    const navigate = useNavigate();

    const channelImage = process.env.PUBLIC_URL + '/images/LogoButton.png';
    const addImage = process.env.PUBLIC_URL + '/images/AddButton.png';
    let [popup, setPopup] = useState(false);

    const activeBorder = {
        borderRadius: "28%",
    };

    const {channelValues, setChannelValues, activeChannel, setActiveChannel} = useProvider();

    async function loadChannels(){
        const activeID = parseInt(localStorage.getItem('Active Channel'));

        channelValues.forEach(el => {
            if(el.id === activeID)setActiveChannel(el);
        })

        const response = await fetch('/api/channels/load');

        if(!response.ok)navigate('/');
        else {
            const data = await response.json();

            setChannelValues(data);
        }
    }

    useEffect(() => {
        loadChannels();
    }, [])

    function goToHomePage(){
        navigate('/app/home');
    }

    function toggleActive(activatedChannel){
        localStorage.setItem('Active Channel', activatedChannel.id);
        setActiveChannel(activatedChannel);
        
        navigate(`/app/${activatedChannel.id}`)
    }

    return (
        <div className="channel-navigation">
            <img onClick={() => goToHomePage()} className='logo-button' src={channelImage} alt='logo button for acc settings/home page'/>

            {channelValues.filter(el => el.Channel_name !== undefined && el.Channel_name !== "")
                        .map(el => {
                        return (<img key={el.id} onClick={() => toggleActive(el)} className='logo-button' src={el.Channel_path} style={(el.id === activeChannel.id)? activeBorder : {}} alt={el.Channel_name}/>)
                        })}

            <img className='logo-button' src={addImage} alt='Add channel button' onClick={() => setPopup(true)}/>

            <ChannelPopup trigger={popup} setTrigger={setPopup}></ChannelPopup>
        </div>
   )
}

export default ChannelNav;

