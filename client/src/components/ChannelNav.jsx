import React from "react";
import { useState } from "react";
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

    function goToHomePage(){
        const altered = channelValues.filter(el => el !== {}).map(el => {
            return {...el, active: false};
        })
        setChannelValues(altered);
        navigate('/app/home');
    }

    function toggleActive(activatedChannel){
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
            <ul>
                <li onClick={() => goToHomePage()}><img className='logo-button' src={channelImage} alt='logo button for acc settings/home page'/></li>

                {channelValues.filter(el => el.Channel_name !== undefined && el.Channel_name !== "")
                         .map(el => {
                            return (<li key={el.id} onClick={() => toggleActive(el)}><img className='logo-button' src={el.Channel_path} style={(el.active)? activeBorder : {}} alt={el.Channel_name}/></li>)
                         })}

                <li><img className='logo-button' src={addImage} alt='Add channel button' onClick={() => setPopup(true)}/></li>

                <NewChannelPopup trigger={popup} setTrigger={setPopup}></NewChannelPopup>
            </ul>
        </div>
   )
}

export default ChannelNav;

