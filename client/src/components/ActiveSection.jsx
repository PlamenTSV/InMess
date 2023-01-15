import React from "react";
import { useProvider } from "../contexts/UserContext";
import '../styles/componentStyles/ActiveSection.css';

export default function ActiveSection(){
    const {activeUsers} = useProvider();
    return (
        <div className="members-section">
            {activeUsers}
        </div>
    )
}