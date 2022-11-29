import React from "react";
import { useEffect, useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";

import { useSearchParams } from "react-router-dom";

import '../styles/NewChannelPopup.css';

const NewChannelPopup = (props) => {
    const {channelValues, setChannelValues} = useContext(UserContext);

    const defaultState = process.env.PUBLIC_URL + '/images/camera.jpg';
    const reader = new FileReader();

    const [params] = useSearchParams();
    const currUser = params.get("userID");

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

    useEffect(() => {
        console.log(channelValues);
    }, [channelValues])

    return (props.trigger) ? (
        <div className="container">
            <div className="popup">
                <h1>Create your channel!</h1>

                <label htmlFor="img"><img src={image} alt="Camera icon" className="select-image"/></label>
                <input type="file" id="img" name="img" accept="image/*" onChange={(event) => {
                    if(event.target.files && event.target.files[0]){
                        setImage(URL.createObjectURL(event.target.files[0]));
                        setBlob(event.target.files[0]);
                    }
                }}/>
                <h3>Select icon and name for your channel</h3>
                <input type="text" id="text" placeholder="My channel" ref={name}/><br/>
                <input type="button" id="submit" value="CREATE" onClick={() => {
                    let uniqueID = Math.random().toString().substring(10);
                    
                    fetch('/channels/add', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: uniqueID,
                            name: name.current.value,
                            icon: cloudImage,
                            creator: currUser
                        })
                    })
                    
                    setChannelValues(curr => [...curr, {
                        name: name.current.value,
                        icon: image,
                        active: false,
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