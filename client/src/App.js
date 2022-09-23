import './App.css';
import React from 'react';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
