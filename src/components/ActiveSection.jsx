import React from "react";
import { useProvider } from "../contexts/UserContext";
import '../styles/componentStyles/ActiveSection.css';

export default function ActiveSection(){
    const {activeUsers} = useProvider();
    return (
        <div className="members-section">
            <p>Currently online:</p>
            <div className="users">
                {activeUsers.map((user, index) => {
                    return (<div key={index} className="user">
                                <img className="avatar" src={process.env.PUBLIC_URL + '/images/UserIcon.png'} alt="avatar for user"/>
                                <p>{user}</p>
                            </div>)
                })}
            </div>
        </div>
    )
}