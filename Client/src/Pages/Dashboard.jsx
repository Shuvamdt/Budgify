import React from "react";
import { ChartAreaInteractive } from "../components/AreaChart";
import { ChartBarLabelCustom } from "../components/BarChart";
import { ChartPieDonutActive } from "../components/PieChart";
import { ChartRadialText } from "../components/RadialChart";

const Dashboard = () => {
  return (
    <div className="font-1 bg-[#FFBA08] px-2 mx-1 py-2 my-2">
      <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-rows-2 lg:grid-cols-4 w-full gap-4 justify-center">
        <div className="flex flex-1 row-span-1">
          <div className="flex flex-1 justify-center">
            <ChartPieDonutActive />
          </div>
        </div>
        <div className="flex flex-1 row-span-1">
          <div className="flex flex-1 justify-center">
            <ChartRadialText />
          </div>
        </div>
        <div className="flex col-span-1 sm:col-span-2">
          <div className="flex-1">
            <ChartBarLabelCustom />
          </div>
        </div>
        <div className="flex flex-1 col-span-1 sm:col-span-2 lg:col-span-4">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
