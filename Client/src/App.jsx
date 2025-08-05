import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import Expenses from "./Pages/Expenses";
import About from "./Pages/About";
import MyAccount from "./Pages/MyAccount";
import SignUp from "./Pages/SignUp";
import loadingAnimation from "../animations/loading.json";
import Lottie from "lottie-react";
import axios from "axios";

const API_URL = "https://budgify-hjq2.vercel.app";
axios.defaults.withCredentials = true;

const App = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await axios.get(`${API_URL}/get-account-info`, {
          withCredentials: true,
        });
        setSignedUp(true);
      } catch (err) {
        setSignedUp(false);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-screen w-full h-full justify-center items-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
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
              element={
                signedUp ? <Dashboard /> : <SignUp signedUpFunc={setSignedUp} />
              }
            />
            <Route
              path="/expenses"
              element={
                signedUp ? <Expenses /> : <SignUp signedUpFunc={setSignedUp} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/my-account"
              element={
                signedUp ? <MyAccount /> : <SignUp signedUpFunc={setSignedUp} />
              }
            />
            <Route
              path="/signup"
              element={<SignUp signedUpFunc={setSignedUp} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
