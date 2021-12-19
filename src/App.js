import React from 'react'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import Login from './components/auth/login';
import Dash from './components/dashboard/dash';
import Dashboard from './components/dashboard/dashboard';
import Accepted from './components/dashboard/tabs/Accepted';
import NotAllowed from './components/dashboard/tabs/NotAllowed';
import Manager from './components/dashboard/tabs/Manager';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dash" element={<Dash />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accepted" element={<Accepted />} />
        <Route path="notallowed" element={<NotAllowed />} />
        <Route path="manager" element={<Manager />} />

    </Routes>

  );
}

export default App;
