import React from "react";
import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

export function useProvider(){
    const context = useContext(UserContext);
    if(context === undefined)throw new Error('Use within Provider');
    return context;
}

export const UserProvider = ({children}) => {

    const [channelValues, setChannelValues] = useState([{}]);
    const [activeChannel, setActiveChannel] = useState({});
    const sessionRef = useRef(null);

    const navigate = useNavigate();

    async function fetchSession(){
        const sessionJson = await fetch('/session');
        const session = await sessionJson.json();

        
        sessionRef.current = session;
        console.log(sessionRef.current);
        if(!session.isLogged)navigate('/');
    }

    useEffect(() => {
        fetchSession();
    }, []);


    const values = {channelValues, setChannelValues, sessionRef, activeChannel, setActiveChannel};

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}