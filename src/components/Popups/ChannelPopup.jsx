import React from "react";
import InitialPopup from "./InitialPopup";
import CreateChannelPopup from "./CreateChannelPopup";

import CloseIcon from '@mui/icons-material/Close';
import '../../styles/ChannelPopup.css';
import { useState } from "react";

const ChannelPopup = (props) => {
    const [createDisplay, setCreateDisplay] = useState({
        display: "none"
    });
    
    return (props.trigger) ? (
        <div className="popup-container">
            <div className="popup">
                <CloseIcon className="close-button" onClick={() => {
                    props.setTrigger(false);
                    setCreateDisplay({
                        display: "none"
                    });
                }}/>
                <CreateChannelPopup setTrigger={props.setTrigger} style={createDisplay}/>
                <InitialPopup setCreateDisplay={setCreateDisplay}/>
                
            </div>
        </div>
    ) : "";
}

export default ChannelPopup;