import React from "react";
import './HomePage.css';

const HomePage = () => {
    const placeholder = '{placeholder}';
    return (
        <>
            <div className="account-section">
                <div className="info">
                    <h1>MY ACCOUNT</h1>
                    <h2>Username: {placeholder}</h2>
                    <h2>Password: {placeholder}</h2>
                    <h2>Email: {placeholder}</h2>
                </div>
                <div className="about">
                    <h1>About me:</h1>
                    <div className="text">
                        <textarea name="ab" maxLength={350} cols="20" rows="10"></textarea>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;