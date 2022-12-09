import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../contexts/UserContext";
import CloseIcon from '@mui/icons-material/Close';

import '../styles/NewChannelPopup.css';

const NewChannelPopup = (props) => {
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

    return (props.trigger) ? (
        <div className="container">
            <div className="popup">
                <h1>Create your channel!</h1>
                <CloseIcon className="close-button" onClick={() => {
                    props.setTrigger(false);
                }}/>

                <label htmlFor="img"><img src={image} alt="Camera icon" className="select-image"/></label>
                <input type="file" id="img" name="img" accept="image/*" onChange={(event) => {
                    if(event.target.files && event.target.files[0]){
                        setImage(URL.createObjectURL(event.target.files[0]));
                        setBlob(event.target.files[0]);
                    }
                }}/>
                <h3>Select icon and name for your channel</h3>
                <input type="text" id="text" placeholder="My channel" ref={name}/><br/>
                <input type="button" id="submit" value="CREATE" onClick={async () => {
                    const sessionJSON = await fetch('/session');
                    const session = await sessionJSON.json();

                    if(!session.isLogged)navigate('/');
                    else {
                        if(blob.type === ""){
                            setCloudImage(process.env.PUBLIC_URL + '/images/button_logo.png');
                            setImage(process.env.PUBLIC_URL + '/images/button_logo.png');
                        }

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
                    }
                }}/>
            </div>
        </div>
    ) : "";
}

export default NewChannelPopup;