import React from "react";
import { useRef } from "react";
import { useState } from "react";

import './NewChannelPopup.css';

const NewChannelPopup = (props) => {
    const defaultState = process.env.PUBLIC_URL + '/images/camera.jpg';
    let [image, setImage] = useState(defaultState);
    let name = useRef("Test");

    return (props.trigger) ? (
        <div className="container">
            <div className="popup">
                <h1>Create your channel!</h1>

                <label htmlFor="img"><img src={image} alt="Camera icon" className="select-image"/></label>
                <input type="file" id="img" name="img" accept="image/*" onChange={(event) => {
                    if(event.target.files && event.target.files[0]){
                        setImage(URL.createObjectURL(event.target.files[0]));
                    }
                }}/>
                <h3>Select icon and name for your channel</h3>
                <input type="text" id="text" placeholder="My channel" ref={name}/><br/>
                <input type="button" id="submit" value="CREATE" onClick={() => {
                    let uniqueID = Math.random().toString().substring(2);

                    props.setChannels(curr => [...curr, {
                        name: name.current.value,
                        icon: image,
                        id: uniqueID
                    }]);
                    props.setTrigger(false);
                    setImage(defaultState);
                    name.current.value = "";
                }}/>
            </div>
        </div>
    ) : "";
}

export default NewChannelPopup;