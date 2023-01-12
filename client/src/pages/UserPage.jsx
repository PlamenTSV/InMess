import React from "react";

import '../styles/pageStyles/UserPage.css';

import { UserProvider } from "../contexts/UserContext";

import ChannelNav from "../components/ChannelNav";
import ChannelInfo from "../components/Channellnfo";
import ChatPage from "../components/ChatPage";
import HomePage from "../components/HomePage";
import ActiveSection from "../components/ActiveSection";

const UserPage = ({isHomePage}) => {
    return (
        <UserProvider>
            <div className="wrapper-app">
                <ChannelNav/>
                <ChannelInfo isHomePage={isHomePage}/>

                {
                !isHomePage? 
                <ChatPage/>
                : 
                <HomePage/>
                }

                <ActiveSection/>
            </div>
        </UserProvider>
    )
}

export default UserPage;