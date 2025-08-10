import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import Expenses from "./Pages/Expenses";
import About from "./Pages/About";
import MyAccount from "./Pages/MyAccount";
import SignUp from "./Pages/SignUp";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen w-full h-full justify-center items-center"></div>
    );
  }
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
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <SignUp />}
            />
            <Route
              path="/expenses"
              element={isLoggedIn ? <Expenses /> : <SignUp />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/my-account"
              element={isLoggedIn ? <MyAccount /> : <SignUp />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
