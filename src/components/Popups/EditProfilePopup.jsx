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

    useEffect(() => {
        function handleClickOutside(event){
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setTrigger(false);
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
                        }
                    }}
                    />
                </label>

                <h3>Username</h3>
                <input type="text" defaultValue={session.username} ref={usernameRef}/>

                <h3>Email</h3>
                <input type="text" defaultValue={session.email} ref={emailRef}/>

                <input type="button" value="Change password" id="password"/>

                <input type="button" value="EDIT"
                onClick={() => {
                    fetch('/api/updateProfile', {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            newUsername: usernameRef.current.value,
                            newEmail: emailRef.current.value
                        })
                    })
                    .then(res => res.json())
                    .then(newSession => setSession(newSession));
                }}/>
            </div>
        </div>
        : ''
}

export default EditProfilePopup;