import './App.css';
import React from 'react';

import LoginPage from './MainComponents/LoginPage';
import RegisterPage from './MainComponents/RegisterPage';
import UserPage from './MainComponents/UserPage';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/app' element={<UserPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
