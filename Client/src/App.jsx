import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import Expenses from "./Pages/Expenses";
import About from "./Pages/About";
import MyAccount from "./Pages/MyAccount";
import SignUp from "./Pages/SignUp";
import Test from "./Pages/Test";

const App = () => {
  return (
    <div className="overflow-y-auto min-h-screen">
      <BrowserRouter>
        <div className="background">
          <img src="bg.gif" alt="Background" className="pt-10" />
        </div>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
