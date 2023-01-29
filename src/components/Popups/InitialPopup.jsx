import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/popups/InitialPopup.css'

export default function InitialPopup({setCreateDisplay}){
    const navigate = useNavigate();

    const [style, setStyle] = useState({});
    const enteredCode = useRef(null);

    const PopupIcon = process.env.PUBLIC_URL + '/images/PopupIcon.png';

    return(
        <div className="initial-popup" style={style}>
            <h2>A channel is where you meet and talk with your friends or even strangers!</h2>
            <img className="popup-icon" src={PopupIcon} alt="icon to display"/>
            <h3>You can either choose to create your own channel or join someone else's</h3>
            
            <div className="options">
                <button onClick={() => {
                    setCreateDisplay({
                        display: "flex"
                    });
                    setStyle({
                        display: "none"
                    })
                }}>Create my own</button>

                <div className="join">
                    <input type="text" ref={enteredCode}/>
                    <button onClick={() => {
                        fetch('/api/channels/join', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                channelID: enteredCode.current.value
                            })
                        })
                        .then(res => {
                            if(!res.ok)navigate('/');
                            else return res.json()
                        })
                        .then(response => {
                            if(response.message === 'dublicate')alert('already in channel');
                            else console.log('joined');
                        })
                    }}>Join</button>
                </div>
            </div>
        </div>
    )
}