import React from "react";
import { useRef } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";

const UserContext = createContext({});

export function useProvider(){
    const context = useContext(UserContext);
    if(context === undefined)throw new Error('Use within Provider');
    return context;
}

export const UserProvider = ({children}) => {

    const [channelValues, setChannelValues] = useState([{}]);
    const [activeChannel, setActiveChannel] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const sessionRef = useRef({user: {id: 0}});

    const values = {channelValues, setChannelValues, sessionRef, activeChannel, setActiveChannel, activeUsers, setActiveUsers};

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}