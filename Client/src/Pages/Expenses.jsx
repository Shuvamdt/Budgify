import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import loadingAnimation from "../animations/loading.json";
import Lottie from "lottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_URL = "http://localhost:3000";
const API_URL = "https://budgify-hjq2.vercel.app";

const Expenses = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`, {
        withCredentials: true,
      });
      return response.data.transactions;
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("Connect your bank account from my account page!");
      navigate("/my-account");
    }
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchData();
      setData(result);
      setLoading(false);
    };
    loadData();
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
    <div>
      <TransactionTable data={data} />
    </div>
  );
};

export default Expenses;
