import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useProvider } from "../../contexts/UserContext";
import '../../styles/popups/EditProfilePopup.css';

const EditProfilePopup = ({trigger, setTrigger}) => {
    const containerRef = useRef(null);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);

    const {session, setSession} = useProvider();

    const [image, setImage] = useState(process.env.PUBLIC_URL + '/images/UserIcon.png');
    const [cloudImage, setCloudImage] = useState();
    const reader = new FileReader();

    useEffect(() => {
        function handleClickOutside(event){
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setTrigger(false);
                setImage(process.env.PUBLIC_URL + '/images/UserIcon.png');
                setCloudImage();
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return (trigger) ? 
        <div className="profile-popup-wrapper">
            <div className="profile-popup" 
            ref={containerRef}>
                <h1>Edit profile</h1>

                <label>
                    <img src={image} alt='profile pic' className="profile-avatar"/>
                    <input type="file" id="image" name="image" accept="image/*"
                    onChange={(event) => {
                        if(event.target.files && event.target.files[0]){
                            setImage(URL.createObjectURL(event.target.files[0]));

                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => {
                                setCloudImage(reader.result);
                            }
                        }
                    }}
                    />
                </label>

                <h3>Username</h3>
                <input type="text" defaultValue={session.user.username} ref={usernameRef}/>

                <h3>Email</h3>
                <input type="text" defaultValue={session.user.email} ref={emailRef}/>

                <input type="button" value="Change password" id="password"/>

                <input type="button" value="EDIT" className="edit-button"
                onClick={() => {
                    const requestBody = {
                        newUsername: usernameRef.current.value,
                        newEmail: emailRef.current.value,
                        newAvatar: (cloudImage)? cloudImage : null
                    }
                    console.log(requestBody);
                    fetch('/api/updateProfile', {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    })
                    .then(res => res.json())
                    .then(newSession => setSession(newSession));

                    setTrigger(false);
                }}/>
            </div>
        </div>
        : ''
}

export default EditProfilePopup;