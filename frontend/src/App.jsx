import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Myprofile from './components/myprofile/Myprofile';
import UserProfile from './components/dashboard/UserProfile.jsx';
import Createpost from './components/navbar/Createpost.jsx';
import EditProfile from './components/myprofile/EditProfile.jsx';

function AppWrapper() {
  const location = useLocation(); 
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const hideNavbarPaths = ['/signin', '/signup'];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/createpost" element={<Createpost />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
      <Toaster />
    </Router>
  );
}

export default App;
