import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Chat from './pages/Chat/Chat';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import Login from './pages/login/login';

const App = () => {
  return (
    <>
      <Routes> {/* Wrap your routes in the Routes component */}
        <Route path="/login" element={<Login />} /> {/* Route for Login */}
        <Route path="/chat" element={<Chat />} /> {/* Route for Chat */}
        <Route path="/profile" element={<ProfileUpdate />} /> {/* Route for ProfileUpdate */}
      </Routes>
    </>
  );
};

export default App;
