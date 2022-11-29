import React from 'react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/app/:id' element={<UserPage isHomePage={false}/>}/>
      <Route path='/app' element={<UserPage isHomePage={true}/>}/>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
