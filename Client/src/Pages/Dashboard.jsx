import React, { useEffect, useState } from "react";
import { ChartAreaInteractive } from "../components/AreaChart";
import { ChartBarLabelCustom } from "../components/BarChart";
import { ChartPieDonutActive } from "../components/PieChart";
import { ChartRadialText } from "../components/RadialChart";
import axios from "axios";
import loadingAnimation from "../animations/loading.json";
import Lottie from "lottie-react";
const API_URL = "http://localhost:3000";

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      withCredentials: true,
    });
    return response.data.transactions;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const Dashboard = () => {
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
    <div className="font-1 bg-[#FFBA08] px-2 mx-1 py-2 my-2">
      <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-rows-2 lg:grid-cols-4 w-full gap-4 justify-center">
        <div className="flex flex-1 row-span-1">
          <div className="flex flex-1 justify-center">
            <ChartPieDonutActive data={data} />
          </div>
        </div>
        <div className="flex flex-1 row-span-1">
          <div className="flex flex-1 justify-center">
            <ChartRadialText data={data} />
          </div>
        </div>
        <div className="flex col-span-1 sm:col-span-2">
          <div className="flex-1">
            <ChartBarLabelCustom data={data} />
          </div>
        </div>
        <div className="flex flex-1 col-span-1 sm:col-span-2 lg:col-span-4">
          <ChartAreaInteractive data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
