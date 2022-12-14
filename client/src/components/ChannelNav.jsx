import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";

import '../styles/ChannelNav.css';
import NewChannelPopup from './NewChannelPopup';

const ChannelNav = () =>{
    const navigate = useNavigate();

    const channelImage = process.env.PUBLIC_URL + '/images/button_logo.png';
    const addImage = process.env.PUBLIC_URL + '/images/add_button.png';
    let [popup, setPopup] = useState(false);

    const activeBorder = {
        borderRadius: "28%",
    };

    const {channelValues, setChannelValues} = useProvider();

    async function loadChannels(){
        const activeID = parseInt(sessionStorage.getItem('Active Channel'));

        const response = await fetch('/channels/load');
        const data = await response.json();

        if(data.hasOwnProperty('isLogged'))navigate('/');
        else {
            const altered = data.filter(el => el !== {}).map(el => {
                return (el.id === activeID) ? {...el, active: true} : {...el, active: false};
            })
            setChannelValues(altered);
        }
    }

    useEffect(() => {
        loadChannels();
    }, [])

    function goToHomePage(){
        const altered = channelValues.filter(el => el !== {}).map(el => {
            return {...el, active: false};
        })
        setChannelValues(altered);
        navigate('/app/home');
    }

    function toggleActive(activatedChannel){
        sessionStorage.setItem('Active Channel', activatedChannel.id);
        const altered = channelValues.filter(el => el !== {}).map(el => {
            return (el.id === activatedChannel.id) ? {...el, active: true} : {...el, active: false};
        })
        setChannelValues(altered);
        fetch('/session')
        .then(res => res.json())
        .then(session => {
            if(session.isLogged)navigate(`/app/${activatedChannel.id}`);
            else navigate('/');
        })
        
    }

    return (
        <div className="channel-navigation">
            <img onClick={() => goToHomePage()} className='logo-button' src={channelImage} alt='logo button for acc settings/home page'/>

            {channelValues.filter(el => el.Channel_name !== undefined && el.Channel_name !== "")
                        .map(el => {
                        return (<img key={el.id} onClick={() => toggleActive(el)} className='logo-button' src={el.Channel_path} style={(el.active)? activeBorder : {}} alt={el.Channel_name}/>)
                        })}

            <img className='logo-button' src={addImage} alt='Add channel button' onClick={() => setPopup(true)}/>

            <NewChannelPopup trigger={popup} setTrigger={setPopup}></NewChannelPopup>
        </div>
   )
}

export default ChannelNav;

