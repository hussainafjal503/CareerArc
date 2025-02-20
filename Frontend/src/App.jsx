import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home'
import Dashboard from "./Pages/Dashboard";
import Jobs from "./Pages/Jobs";
import PostApplication from "./Pages/PostApplication";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import NotFound from './Pages/NotFound'
import "./App.css";
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice';



function App() {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUser());
  },[]);
  return <>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/post/application/:jobId" element={<PostApplication />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />
  <ToastContainer position='bottom-right' theme="dark"/>
  </BrowserRouter>
  </>;
}

export default App;
