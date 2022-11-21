import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../layaout/Dashboard';
import DashBoardHome from '../views/DashBoardHome';
import Gestion from '../views/Gestion';
import Home from '../views/Home';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Shopping from '../views/Shopping';
import SignUp from '../views/SignUp';

export default function RouteApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<DashBoardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="gestion" element={<Gestion />} />
          <Route path="shopping" element={<Shopping />} />
        </Route>
      </Routes>
    </Router>
  );
}
