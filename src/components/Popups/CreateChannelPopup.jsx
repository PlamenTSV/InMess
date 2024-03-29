import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../../contexts/UserContext";

import '../../styles/popups/CreateChannelPopup.css';

export default function CreateChannelPopup(props){
    const navigate = useNavigate();
    const {setChannelValues} = useProvider();

    const defaultState = process.env.PUBLIC_URL + '/images/camera.jpg';
    const reader = new FileReader();

    let [image, setImage] = useState(defaultState);
    let [blob, setBlob] = useState(new Blob());
    let [cloudImage, setCloudImage] = useState();

    let name = useRef("Test");

    useEffect(() => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            setCloudImage(reader.result);
        }
    }, [blob]);

    return(
        <div className="create-popup" style={props.style}>
            <h1>Create your channel!</h1>

            <label>
                <img src={image} alt="Camera icon" className="select-image"/>
                <input type="file" id="image" name="img" accept="image/*" onChange={(event) => {
                    if(event.target.files && event.target.files[0]){
                        setImage(URL.createObjectURL(event.target.files[0]));
                        setBlob(event.target.files[0]);
                    }
                }}/>
            </label>
            <h3>Select icon and name for your channel</h3>
            <input type="text" id="text" placeholder="My channel" ref={name}/><br/>
            <input type="button" id="submit" value="CREATE" onClick={async () => {
                    if(blob.type === ""){
                        setCloudImage(process.env.PUBLIC_URL + '/images/button_logo.png');
                        setImage(process.env.PUBLIC_URL + '/images/button_logo.png');
                    }

                    let uniqueID = Math.random().toString().substring(10);
                    
                    fetch('/api/channels/add', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: uniqueID,
                            name: name.current.value,
                            icon: cloudImage,
                        })
                    })
                    .then(res => {
                        if(!res.ok)navigate('/');
                    })
                    
                    setChannelValues(curr => [...curr, {
                        Channel_name: name.current.value,
                        Channel_icon: image,
                        id: uniqueID
                    }]);

                    props.setTrigger(false);
                    setImage(defaultState);
                    name.current.value = "";
                }
            }/>
        </div>
    )
}