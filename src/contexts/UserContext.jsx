import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

export function useProvider(){
    const context = useContext(UserContext);
    if(context === undefined)throw new Error('Use within Provider');
    return context;
}

export const UserProvider = ({children}) => {
    const navigate = useNavigate();

    const [channelValues, setChannelValues] = useState([{}]);
    const [activeChannel, setActiveChannel] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [session, setSession] = useState(
            {
                id: 0, 
                username: 'Loading...'
            }
        );

    useEffect(() => {
        fetch('/api/session')
        .then(res => {
            if(!res.ok)navigate('/');
            else return res.json();
        })
        .then(sessionData => {
            setSession(sessionData);
        })
    }, [])

    const values = {channelValues, setChannelValues, session, setSession, activeChannel, setActiveChannel, activeUsers, setActiveUsers};

    return <UserContext.Provider value={values}> {children} </UserContext.Provider>
}